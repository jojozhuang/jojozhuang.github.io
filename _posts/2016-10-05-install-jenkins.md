---
layout: post
key: blog
title: "Install Jenkins"
date: 2016-10-05
tags: Jenkins
categories:
- blog
---

> Introduce how to install Jenkins on Ubuntu and install it in Docker.

## 1. What is Jenkins?
[Jenkins](https://jenkins.io/index.html) is a powerful application that allows continuous integration and continuous delivery of projects, regardless of the platform you are working on. It is a free source that can handle any kind of build or continuous integration. You can integrate Jenkins with a number of testing and deployment technologies.

## 2. Install and Setup Jenkins on Ubuntu
### 2.1 Install Jenkins
Go to https://jenkins.io/download/, choose 'Ubuntu/Debian' in Long-term Support (LTS). Follow the steps mentioned in the page.
Add the key to your system:
```sh
wget -q -O - https://pkg.jenkins.io/debian-stable/jenkins.io.key | sudo apt-key add -
```
Open /etc/apt/sources.list with editor:
```sh
sudo nano /etc/apt/sources.list
```
Add the following entry to the end.
```sh
deb https://pkg.jenkins.io/debian-stable binary/
```
Update your local package index, then finally install Jenkins:
```sh
sudo apt-get update
sudo apt-get install jenkins
```
This package installation will:
* Setup Jenkins as a daemon launched on start. See /etc/init.d/jenkins for more details.
* Create a jenkins user to run this service.
* Direct console log output to the file /var/log/jenkins/jenkins.log. Check this file if you are troubleshooting Jenkins.
* Populate /etc/default/jenkins with configuration parameters for the launch, e.g JENKINS_HOME
* Set Jenkins to listen on port 8080. Access this port with your browser to start configuration.

### 2.2 Launch Jenkins Web
Open a web browser, access the following address.
[http://localhost:8080/](http://localhost:8080/)
![MIME Type](/public/pics/2016-10-05/unlock.png)  

For the first time access Jenkins, you need to find the password in the given file.
```sh
cd /var/lib/jenkins/secrets/
```
If you encounter the permission denied error, use 'sudo su' command (without another user name) to allow you to run commands as the super-user (root).
```sh
sudo su
```
![MIME Type](/public/pics/2016-10-05/secretfile.png)  
Use any text editor to open file initialAdminPassword, you should see the password.
![MIME Type](/public/pics/2016-10-05/secretfile.png)  
Copy this password and paste to password input box in the login page, continue.
![MIME Type](/public/pics/2016-10-05/setpassword.png)  
Login successfully. Select suggested plugins.
![MIME Type](/public/pics/2016-10-05/plugin.png)  
Install plugins.
![MIME Type](/public/pics/2016-10-05/installplugin.png)  
Create user johnny
![MIME Type](/public/pics/2016-10-05/createuser.png)  
Ready for use.
![MIME Type](/public/pics/2016-10-05/ready.png)  
Homepage of Jenkins.
![MIME Type](/public/pics/2016-10-05/homepage.png)  

### 2.3 Commands for Jenkins
The following commands when appended to the Jenkins instance URL will carry out the relevant actions on the Jenkins instance.
* http://localhost:8080/jenkins/exit − shutdown jenkins
* http://localhost:8080/jenkins/restart − restart jenkins
* http://localhost:8080/jenkins/reload − to reload the configuration

## 3. Install and Setup Jenkins in Docker
Search jenkins in Kitematic, select the official image.
![MIME Type](/public/pics/2016-10-05/dockersearch.png)
New Jenkins container will be created and running. Click the Preview button.
![MIME Type](/public/pics/2016-10-05/dockersearch.png)
Again, we need to find the password. The location is different. Open container terminal.
```sh
cd var/jenkins_home/secrets/
more initialAdminPassword
```
![MIME Type](/public/pics/2016-10-05/dockerpassword.png)  
Copy this password and paste to password input box in the login page, continue.
install plugins
Create user johnny
Ready for use.
Homepage of Jenkins.
![MIME Type](/public/pics/2016-10-05/dockerhomepage.png)

## 4. References
* [Official Website for Jenkins](https://jenkins.io/index.html)
* [Installing Jenkins](https://jenkins.io/doc/book/getting-started/installing/)
* [Jenkins Tutorial](https://www.tutorialspoint.com/jenkins/index.htm)
