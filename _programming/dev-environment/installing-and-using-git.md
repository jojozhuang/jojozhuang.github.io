---
layout: tutorial
key: programming
title: "Installing and Using Git"
index: 2023
subcategory: dev-environment
date: 2017-08-31
tags: [Git, GitHub, SourceTree]
---

> Use Git and GitHub as source control tool to manage code revisions.

## 1. What is Git?
Git is a distributed revision control and source code management system with an emphasis on speed.

## 2. Installing Git
### 2.1 Installing Git on Mac OS
Install [Homebrew](https://brew.sh/) first if it hasn't been installed yet on your Mac.
```raw
$ ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```
Install Git with Homebrew
```raw
$ brew install git
```

Check versions
```raw
$ git --version
git version 2.11.0 (Apple Git-81)
```
Configure your Git username and email using the following commands:
```raw
$ git config --global user.name "Johnny"
$ git config --global user.email "csgeek@mail.com"
```

### 2.2 Installing Git on Ubuntu
Update packages
```raw
$ sudo apt-get update
$ sudo apt-get upgrade
$ sudo apt-get install -f
```

Install Git
```raw
$ sudo apt-get install git
$ sudo git --version
git version 2.7.4
```

## 3. Creating Repository on GitHub
To push your local git repository to remote git server, we need to use GitHub.
### 3.1 Creating GitHub Account
If you haven't already, go to [https://github.com/](https://github.com/) to register and create a new account.

### 3.2 Repositories on GitHub
After login, you will see the page like below. For my GitHub, there are total 9 repositories. Seven of them are mine. One of them(EthanHao/Depaul) is shared by another GitHub Account. And another repository(github-example) is forked from some one's repository.
![image](/assets/images/programming/2023/github.png)  

### 3.3 Creating New Repository
Click the green 'New repository' button. Provide name and description, select public or private.
![image](/assets/images/programming/2023/createrepo.png)  

After creation, some instructions show how to submit files to this repository through command line. Next, we will do that.
![image](/assets/images/programming/2023/repocreated.png)  

## 4. Pushing Local File to GitHub
### 4.1 Creating Local Repository
```raw
$ mkdir GitTutorial
$ cd GitTutorial/
$ vi hello.txt // input 'Hello Git!'
$ git init
Initialized empty Git repository in /Users/johnny/GitHub/GitTutorial/.git/
$ git status -s
?? hello.txt
$ git add hello.txt
$ git status -s
A  hello.txt
$ git commit -m "first commit"
[master (root-commit) 92b8723] first commit
 1 file changed, 1 insertion(+)
 create mode 100644 hello.txt
```
## 4.2 Pushing to GitHub
```raw
$ git remote add origin https://github.com/jojozhuang/github-test.git
$ git push -u origin master
Username for 'https://github.com': jojozhuang
Password for 'https://jojozhuang@github.com':
Counting objects: 3, done.
Writing objects: 100% (3/3), 228 bytes | 0 bytes/s, done.
Total 3 (delta 0), reused 0 (delta 0)
To https://github.com/jojozhuang/github-test.git
 * [new branch]      master -> master
Branch master set up to track remote branch master from origin.
```

## 4.3 Checking on GitHub
File 'hello.txt' is added into repository 'github-test'.
![image](/assets/images/programming/2023/pushed.png)  
Click on the file, check the content of it.
![image](/assets/images/programming/2023/content.png)  

## 5. Pulling Files From GitHub
Below commands show how to pull the files from GitHub repository 'github-test' to local Mac.
```raw
$ cd PullTest/
$ ls
$ git clone https://github.com/jojozhuang/github-test.git
Cloning into 'github-test'...
remote: Counting objects: 3, done.
remote: Total 3 (delta 0), reused 3 (delta 0), pack-reused 0
Unpacking objects: 100% (3/3), done.
$ ls
github-test
$ cd github-test/
$ ls
hello.txt
```

Next time, use the following commands to get latest commits from the same repository.
```raw
$ cd PullTest/
$ git pull origin master
```

## 6. Using Git with SourceTree
SourceTree is a free Git client for Windows or Mac. Instead of using command line, it provides an nice visual Git GUI.
### 6.1 Installing SourceTree
Go to [https://www.sourcetreeapp.com/](https://www.sourcetreeapp.com/), download the installer, and follow the wizard to install it.

### 6.2 Cloning Repository from GitHub
New Repository->Clone From URL
![image](/assets/images/programming/2023/sourcetree-repo.png)  

Input Source URL, which is the url of your repository on GitHub. And specify the local path and name.
![image](/assets/images/programming/2023/sourcetree-clone.png)  

Click the Pull button on the top, then click the Ok button in the prompt dialog.
![image](/assets/images/programming/2023/sourcetree-pull.png)  

File is pulled from GitHub.
![image](/assets/images/programming/2023/sourcetree-pulled.png)  

Check file on mac.
![image](/assets/images/programming/2023/sourcetree-fileonmac.png)  

### 6.3 Pushing Files to GitHub
Open the hello.txt file, add 'Pushed by SourceTree!' to the end, save the file.
Switch to SourceTree, it detects the new changes.
![image](/assets/images/programming/2023/sourcetree-filechanged.png)  

Stage the file by clicking the checkbox just in front the file name. Then, click on the Commit button on the top left, input the commit description, and commit.
![image](/assets/images/programming/2023/sourcetree-stagecommit.png)  

The staged file is committed. Click the Push button. You may be asked for GitHub username and password for the first time you push.
![image](/assets/images/programming/2023/sourcetree-push.png)  

After the push, check the history. You see the second commit is there.
![image](/assets/images/programming/2023/sourcetree-history.png)  

Switch to GitHub, find the file, you see that the content is changed. And click the commit description to see the difference of this commit.
![image](/assets/images/programming/2023/sourcetree-githubfile.png)  

## 7. References
* [Try Git](https://try.github.io/)
* [Git Tutorial](https://www.tutorialspoint.com/git/index.htm)
* [Install Git on Mac OS X](https://www.atlassian.com/git/tutorials/install-git)
* [Install, Configure and Use Git on Ubuntu](http://www.geeksforgeeks.org/how-to-install-configure-and-use-git-on-ubuntu/)
