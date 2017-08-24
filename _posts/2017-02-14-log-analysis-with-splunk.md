---
layout: post
key: blog
title: "Log Analysis with Splunk"
date: 2017-02-14
categories:
- blog
---

> Recently, I was working on a performance issue in our procurement system, which is running on the cloud platform. It takes one minute to get response after I click the 'Save' button on Invoice. There is no available tools to debug the codes. I was unable to address the cause. So, I copied the configuration into my local sandbox, created some dummy data and reproduced the issue. However, this performance issue is not caused by a single error, instead, it is an accumulated time consumption issue. There are too many line items(over 100) in the invoice. To get the whole picture of how exactly the time is consumed, I added logs to the 'save' button event. Later, I imported these logs to Splunk for analyzing.

## 1. Basic
### 1.1 What is Splunk?  
Basically, Splunk is a log management tool. It makes easy to analyze machine-generated logs via a web-style interface. Official website: [https://www.splunk.com/](https://www.splunk.com/).  
![MIME Type](/public/pics/2017-02-14/splunk.png)  

## 2. Installation on Linux
### 2.1 Install Splunk Enterprise
1) Download Splunk  
Go to [https://www.splunk.com/en_us/products.html](https://www.splunk.com/en_us/products.html), click 'Free Download' for Splunk Enterprise, choose RPM(For RedHat) or DEB(For Ubuntu) version.  
2) Install  
In terminal, navigate to the folder which contains the downloaded file, run  

```sh
sudo rpm -i splunk_package_name.rpm  // for RedHat
sudo dpkg -i splunk_package_name.deb // for Ubuntu
```

When the installation is finished, Splunk is installed into /opt/splunk/.

3) Configure Environment Variable for Splunk  
Add a SPLUNK_HOME environment variable for the top-level installation directory, and adding $SPLUNK_HOME/bin to your shell's path.

```shell
export SPLUNK_HOME=/opt/splunk
export PATH=$SPLUNK_HOME/bin:$PATH
```

### 2.2 Launch Splunk Web
1) Start Splunk
```shell
sudo $SPLUNK_HOME/bin/splunk start
```
The first time you launch splunk, you need to accept its license agreement.

2) Useful CLI Commands
If you need to stop, restart, or check the status of your Splunk Enterprise server, use these CLI commands:
```sh
$ splunk stop
$ splunk restart
$ splunk status
```

3) You can change web server from the default port 8000 to other ports.
```sh
splunk set web-port 8081
```
If you get 'Permission denied' error, grant access to the whole splunk folder.
```sh
sudo chown -R $USER /opt/splunk/
```
In addition, add port to Linux Firewall exception list if necessary.

### 2.3 Login to Splunk Web
Open the following address in web browser. The default user is 'admin'. You need to change the password when you first time login.
[http://localhost:8081/](http://localhost:8081/)
![MIME Type](/public/pics/2017-02-14/login.png)  

## 3. Search
Now, you can import the log file to Splunk and create query for searching.
### 3.1 Import Data
1) In the main page, select 'Add Data'->Upload files from my computer, Choose the file.
![MIME Type](/public/pics/2017-02-14/main.png)  
2) Set Source Type
Choose the source type, eg. log4j, csv, etc.
![MIME Type](/public/pics/2017-02-14/sourcetype.png)  
3) Input Settings
Leave as it is.
![MIME Type](/public/pics/2017-02-14/inputsettings.png)  
4) Review and Submit
![MIME Type](/public/pics/2017-02-14/inputsettings.png)  

### 3.2 Search
After data is imported to splunk, we can now start to search the information from logs.
Input text in the search box. You will see the result immediately.
![MIME Type](/public/pics/2017-02-14/search.png)  
You can use the export function to export the search result to csv file.  
![MIME Type](/public/pics/2017-02-14/export.png)  
For my case, I use Microsoft Excel for the rest analyzing.
Open the csv file in Excel, eliminate the un-relevant columns.
![MIME Type](/public/pics/2017-02-14/eliminate.png)  
Then, sort the 'TimeSpent' column in descending order. Now, we see that field 'LineItems' consumes most of the time.
![MIME Type](/public/pics/2017-02-14/eliminate.png)  
Now, we need to dive to the next level to find how time is spent on fields in LineItems.
the similar step how we find the logs on level 0. This time we need to find the level 1.
Notice that there are two fields consumes lots of time.
cus_SupervisorTotalMismatch
cus_SupervisorTotalMismatchContract
![MIME Type](/public/pics/2017-02-14/level1.png)  

## 4. Free License
When you first download and install Splunk, you are automatically using an Enterprise Trial license. You can continue to use the Enterprise Trial license until it expires. After expiration, switch from Enterprise Trial license to Free license.

Steps to switch to a Free License:  
1) Log in to Splunk Web as a user with admin privileges and navigate to Settings > Licensing.  
2) Click Change license group at the top of the page.  
3) Select Free license and click Save.  
4) You are prompted to restart.  

## 5. Reference
* [Install Splunk on Linux](http://docs.splunk.com/Documentation/Splunk/6.6.2/Installation/InstallonLinux)  
* [Install Splunk Enterprise](http://docs.splunk.com/Documentation/Splunk/6.6.2/SearchTutorial/InstallSplunk)
* [Splunk Free License](http://docs.splunk.com/Documentation/Splunk/6.6.2/Admin/MoreaboutSplunkFree)
