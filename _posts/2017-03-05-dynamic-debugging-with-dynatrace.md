---
layout: post
key: blog
title: "Dynamic Debugging with Dynatrace"
date: 2017-03-05
tags: Injection, Client
categories: blog
---

> Performance diagnosis tool.

## 1. Basic
### 1.1 What is Dynatrace?  
  * [https://www.dynatrace.com](https://www.dynatrace.com)  

## 2. Installation on Linux(Server) and MaxOS(Client)
### 2.1 Install Dynatrace Application Monitor on Linux  
1) Download Dynatrace  
Go to [https://community.dynatrace.com/community/display/EVAL/My+dynaTrace+Trial](https://community.dynatrace.com/community/display/EVAL/My+dynaTrace+Trial), click 'Download the Installers', select Linux version.
2) Install  
The downloaded file is a jar package.
In terminal, navigate to the folder which contains the downloaded file, run  

```sh
cd /home/Downloads
java -jar dynatrace-full-linux-x86-64.jar
```

By default, it should be installed to the home directory.  

3) start the Dynatrace AppMon server process and Dynatrace AppMon collector process
```sh
cd /~/dynatrace-7.0
./dtserver -bg
./dtfrontendserver -bg
./dtcollector -bg
```
4) Verify the Installation

```bash
 ps -A | grep dt
 3954 ?        00:00:43 dtcollector
 5924 ?        00:01:54 dtserver
 5949 ?        00:00:42 dtfrontendserver
```
Also check if the Dynatrace services ports (8021, 2021, 6699, 9998) are openend and allowed in firewall rules:
```sh
 netstat -an | grep 021
tcp        0      0 :::2021     :::*     LISTEN    (port for Dynatrace client connections)     
tcp        0      0 :::8021     :::*     LISTEN    (the Dynatrace server web interface)

 netstat -an | grep 99
tcp        0      0 :::6699     :::*     LISTEN    (port for Dynatrace collector connections)
tcp        0      0 :::9998     :::*     LISTEN    (port for Dynatrace agent connections)
```

### 2.2 Install Dynatrace Client on MacOS


## 3. Reference
* [https://community.dynatrace.com](https://community.dynatrace.com)  
