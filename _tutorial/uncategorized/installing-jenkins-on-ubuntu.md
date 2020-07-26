---
layout: tutorial
key: tutorial
title: "Installing Jenkins On Ubuntu"
index: 9706
subcategory: uncategorized
date: 2016-10-05
tags: [Ubuntu, Jenkins]
---

> Introduce how to install Jenkins on Ubuntu.

## 1. What is Jenkins?
[Jenkins](https://jenkins.io/index.html) is a powerful application that allows continuous integration and continuous delivery of projects, regardless of the platform you are working on. It is a free source that can handle any kind of build or continuous integration. You can integrate Jenkins with a number of testing and deployment technologies.

## 2. Installing Jenkins
To use Jenkins, you can either install it on a physical/virtual machine, or create Jenkins container in Docker.
### 2.1 Installing and Setting up Jenkins on Ubuntu
Go to [https://jenkins.io/download/](https://jenkins.io/download/), choose 'Ubuntu/Debian' for Long-term Support (LTS) version. Follow the steps mentioned in the page.  
1) Add the key to your system:
```raw
$ wget -q -O - https://pkg.jenkins.io/debian-stable/jenkins.io.key | sudo apt-key add -
```
2) Open /etc/apt/sources.list with editor:
```raw
$ sudo nano /etc/apt/sources.list
```
Add the following entry to the end.
```raw
$ deb https://pkg.jenkins.io/debian-stable binary/
```
3) Update your local packages, then finally install Jenkins:
```raw
$ sudo apt-get update
$ sudo apt-get install jenkins
```
After running above command, this package installation will:
* Setup Jenkins as a daemon launched on start. See /etc/init.d/jenkins for more details.
* Create a jenkins user to run this service.
* Direct console log output to the file /var/log/jenkins/jenkins.log. Check this file if you are troubleshooting Jenkins.
* Populate /etc/default/jenkins with configuration parameters for the launch, e.g JENKINS_HOME
* Set Jenkins to listen on port 8080. Access this port with your browser to start configuration.

### 2.2 Launching Jenkins Web
Open a web browser, access http://localhost:8080/. You need to find the password in the given file to unlock Jenkins.
![image](/assets/images/uncategorized/9706/unlock.png)  

In terminal, navigate to the given directory.
```raw
$ cd /var/lib/jenkins/secrets/
```
If you encounter the permission denied error, use 'sudo su' command (without another user name) to allow you to run commands as the super-user (root).
![image](/assets/images/uncategorized/9706/secretfile.png){:width="700px"}
Use any text editor to open file initialAdminPassword, you should see the password.
```raw
$ nano initialAdminPassword
```
![image](/assets/images/uncategorized/9706/password.png){:width="700px"}
Copy this password and paste it to the input box in Getting Started page, continue.
![image](/assets/images/uncategorized/9706/setpassword.png)
In the next page, select Install Suggested Plugins.
![image](/assets/images/uncategorized/9706/plugin.png)
Jenkins starts to install plugins.
![image](/assets/images/uncategorized/9706/installplugin.png)
In the next page, you need to create an admin user.
![image](/assets/images/uncategorized/9706/createuser.png)
Setup is complete, ready for use.
![image](/assets/images/uncategorized/9706/ready.png)
Finally, we see the homepage of Jenkins.
![image](/assets/images/uncategorized/9706/homepage.png)

### 2.3 Commands for Jenkins
The following commands when appended to the Jenkins instance URL will carry out the relevant actions on the Jenkins instance.
* http://localhost:8080/cli/ - full list of commands
* http://localhost:8080/restart - restart jenkins

## 3. References
* [Official Website for Jenkins](https://jenkins.io/index.html)
* [Installing Jenkins](https://jenkins.io/doc/book/getting-started/installing/)
* [Jenkins Tutorial](https://www.tutorialspoint.com/jenkins/index.htm)
