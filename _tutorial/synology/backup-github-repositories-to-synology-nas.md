---
layout: tutorial
key: tutorial
title: "Backup GitHub Repositories to Synology NAS"
index: 9522
subcategory: synology
date: 2020-10-02
tags: [NAS, Synology, Backup]
---

> Set up automated backup of GitHub repositories to Synology NAS.

## 1. GitHub & Git Repos
GitHub provides hosting for software development and version control using Git. Many personal developers and companies has stored huge amount of codes on it. As a cloud service, GitHub is high available and reliable. However, in theory, there is still a chance that GitHub could go down or lose the data. So we still need to backup our repositories to somewhere else.

## 2. Backup Options
### 2.1 Download Manually
You can use "git clone" to download a repository with Git data to local machine. Or, you can download the archive package of the repository. There is one problem with the archive package. It only contains the source files, it doesn't have the git data. Pull request, commits, wiki, etc, will all be lost. The manual downloading approach works well, but how to backup all of repos, if you have hundreds of them under your GitHub account?
### 2.2 Third-party Solutions
There are some third-party solutions(eg. [BackHub](https://github.com/marketplace/backhub)) in the market, which enables you to creates recurring backups of your repositories. However, these services are not free. You will be charged based on how many repositories are required to be backed up.
### 2.3 Custom Scripts
Actually, GitHub provides powerful REST APIs for users. We can use them to create calls to get the data of repositories. Then use these data to backup the repositories. You can use Ruby, Python, Bash, or other languages to create scripts for backup purpose. In this posting, I will create bash script to backup all my repositories.

## 3. Backup Repos with GitHub API
### 3.1 List of All Repos
In [Getting Repositories through GitHub API]({% link _tutorial/synology/backup-github-repositories-to-synology-nas.md %}), I introduced how to use GitHub API and jq to get a list of all repos for a specific user, see the example below.
```sh
curl 'https://api.github.com/users/jojozhuang/repos' | jq -r '.[] | "\(.name),\(.full_name),\(.private),\(.html_url)"'
```
Output.
```raw
algorithm-problems-java,jojozhuang/algorithm-problems-java,false,https://github.com/jojozhuang/algorithm-problems-java
cheatsheets,jojozhuang/cheatsheets,false,https://github.com/jojozhuang/cheatsheets
chinese-dictionary-react,jojozhuang/chinese-dictionary-react,false,https://github.com/jojozhuang/chinese-dictionary-react
code-editor-react,jojozhuang/code-editor-react,false,https://github.com/jojozhuang/code-editor-react
...
```
### 3.2 Bash Script
Create a file named `backup-github.sh` with the following content.
```bash
#!/bin/sh
# A script to backup Github repositories to local by Rong Zhuang.
# https://github.com/jojozhuang/bash-scripts

# where should the files be saved
BACKUP_PATH="/Users/johnny/Downloads/backup"

# GitHub API URL
URL_PUBLIC="https://api.github.com/users/jojozhuang/repos" # public repositories only
URL_PRIVATE="https://api.github.com/user/repos" # including private repositories

# token from https://github.com/settings/tokens
OAUTH_TOKEN=""

# number of repositories
COUNT=0

# create backup directory
NOW=$(date '+%F_%H%M%S')
mkdir "${BACKUP_PATH}/${NOW}" -p
echo "Create backup directory: ${BACKUP_PATH}/${NOW}"

fetch_fromUrl() {
    if [ -z "$OAUTH_TOKEN" ]
    then
      echo "Fetching public respositories from ${URL_PUBLIC}"
      REPOS=`curl "${URL_PUBLIC}" | jq -r '.[] | "\(.name),\(.full_name),\(.private),\(.html_url)"'`
    else
      echo "Fetching all repositories from ${URL_PRIVATE}"
      REPOS=`curl -H "Authorization: token ${OAUTH_TOKEN}" -s "${URL_PRIVATE}" | jq -r '.[] | "\(.name),\(.full_name),\(.private),\(.html_url)"'`
    fi
    for REPO in $REPOS
    do
        let COUNT++
        REPONAME=`echo ${REPO} | cut -d ',' -f1`
        REPOFULLNAME=`echo ${REPO} | cut -d ',' -f2`
        PRIVATEFLAG=`echo ${REPO} | cut -d ',' -f3`
        ARCHIVEURL=`echo ${REPO} | cut -d ',' -f4`
        ARCHIVEURL="${ARCHIVEURL}/archive/master.zip"
        FILEPATH="${BACKUP_PATH}/${NOW}/${REPONAME}.zip"
        echo ${ARCHIVEURL}
        curl -H "Authorization: token ${OAUTH_TOKEN}" -L ${ARCHIVEURL} -o ${FILEPATH}
        echo "Saved to ${FILEPATH}"
    done
}

fetch_fromUrl
echo "$((COUNT)) repositories updated"
```
* Specify the backup directory.
* If you want to backup the private repositories, you need to set `OAUTH_TOKEN`, which is can be generated at https://github.com/settings/tokens.

### 3.3 Run Script
Open terminal, run the bash script.
```raw
$ ./backup-github.sh
Create backup directory: /Users/johnny/Downloads/backup/2020-10-02_200606
Fetching from https://api.github.com/user/repos
https://github.com/jojozhuang/algorithm-problems-java/archive/master.zip
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   139    0   139    0     0    467      0 --:--:-- --:--:-- --:--:--   468
100 2361k    0 2361k    0     0  1995k      0 --:--:--  0:00:01 --:--:-- 7580k
Saved to /Users/johnny/Downloads/backup/2020-10-02_200606/algorithm-problems-java.zip
https://github.com/jojozhuang/archive-repo/archive/master.zip
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   164    0   164    0     0    487      0 --:--:-- --:--:-- --:--:--   488
100 46.1M    0 46.1M    0     0  8310k      0 --:--:--  0:00:05 --:--:-- 9747k
Saved to /Users/johnny/Downloads/backup/2020-10-02_200606/archive-repo.zip
...
```
All repos will be downloaded to the backup directory.

## 4. Automating Backup
Use `Task Scheduler` to automate the backup.
### 4.1 Creating Scheduled Task
Go to DSM -> Control Panel -> Task Scheduler -> Create. Choose Scheduled Task->User-defined script.
![image](/assets/images/synology/9522/task-scheduler.png)
### 4.2 Configuring the Task
Set task name and select user to run this script.
![image](/assets/images/synology/9522/create-task-name.png)
Switch to "Schedule" Tab. Here, you can specify when to run the task. Tasks can be scheduled to run on daily/weekly/monthly basis. In the below example, the task is schedule to run at 2:30am on monthly basis.
![image](/assets/images/synology/9522/create-task-schedule.png)
In "Task Settings", put the script into the script box. You can also set the email address to receive the notification of the run details, click Done.
![image](/assets/images/synology/9522/create-task-script.png)
The task is saved and will be executed as scheduled. You can also click the "Run" button to execute it immediately.
![image](/assets/images/synology/9522/create-task-saved.png)
## 5. Uploading Backup Files
In addition, we can use "Cloud Sync" to automatically upload all the backup files to the specified cloud storage(eg. Google Drive, OneDrive, Baidu Cloud, etc.). Then, we will have two copies of the GitHub repositories.
![image](/assets/images/synology/9522/sync-cloud-storage.png)

## 6. References
* [Synology Task Scheduler](https://www.synology.com/en-us/knowledgebase/DSM/help/DSM/AdminCenter/system_taskscheduler)
* [Backing up a repository](https://docs.github.com/en/enterprise-server@2.20/github/creating-cloning-and-archiving-repositories/backing-up-a-repository)
* [Automated Git repository backups](https://community.synology.com/enu/forum/17/post/117246)
* [Github2Synology](https://github.com/bairwell/github2synology)
* [Pro-tip: How To Backup All Of Your GitHub Repositories In One Go](https://addyosmani.com/blog/backing-up-a-github-account/)
