---
layout: post
key: blog
title: "Log Analysis with Splunk"
date: 2017-02-14
categories:
- blog
---

> Recently, I was working on a customer ticket regarding performance issue. This customer is using the procurement application which is based on our cloud system. It takes one minute to get the response after he click 'Save' buttont to save the invoice. There is no available tools to debug or useful to identify the cause. I copied some configuration and imported some data, then reproduced the issue somehow in my local sandbox. This performance issue is not caused by a single bottleneck, instead, it is an accumulated time consumption issue, since there are too many line items(over 100) in the invoice. To figure out what exactly the time is consumed, I added logs to the 'save' button event. Later, I will import them to Splunk to analyze.

## 1. Basic
### 1.1 What is Splunk?  
Basically, Splunk is a log management tool. It makes easy to analyze machine-generated logs via a web-style interface.
  * [https://www.splunk.com/](https://www.splunk.com/)  

## 2. Installation on Linux(Redhat)
### 2.1 Install Splunk Enterprise RPM  
1) Download Elasticsearch  
Go to [https://www.splunk.com/en_us/products.html](https://www.splunk.com/en_us/products.html), click 'Free Download' for Splunk Enterprise, choose RPM version.  
2) Install  
In terminal, navigate to the folder which contains the downloaded file, run  

```sh
sudo rpm -i splunk_package_name.rpm
```

When finished, Splunk is installed into /opt/splunk/.

3) Add a SPLUNK_HOME environment variable for the top-level installation directory, and adding $SPLUNK_HOME/bin to your shell's path.

```shell
export SPLUNK_HOME=/opt/splunk
export PATH=$SPLUNK_HOME/bin:$PATH
```

### 2.2 Launch Splunk Web
1) Start Splunk Enterprise
```shell
$SPLUNK_HOME/bin/splunk start
```

2) Useful CLI commands
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
http://ipaddress:8000/

## 3. Search
### 3.1 Import Data
### 3.2 Search
### 3.3 Report
todo

## 4. Free License
When you first download and install Splunk, you are automatically using an Enterprise Trial license. You can continue to use the Enterprise Trial license until it expires. After expiration, switch from Enterprise Trial license to Free license.

Steps to switch to a Free License:
1) Log in to Splunk Web as a user with admin privileges and navigate to Settings > Licensing.  
2) Click Change license group at the top of the page.  
3) Select Free license and click Save.  
4) You are prompted to restart.  

## 5. Reference
* [Install on Linux](http://docs.splunk.com/Documentation/Splunk/6.6.2/Installation/InstallonLinux)  
* [Install Splunk Enterprise](http://docs.splunk.com/Documentation/Splunk/6.6.2/SearchTutorial/InstallSplunk)
* [Splunk Free](http://docs.splunk.com/Documentation/Splunk/6.6.2/Admin/MoreaboutSplunkFree)
