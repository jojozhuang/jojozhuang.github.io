---
layout: post
key: blog
title: "Install Jenkins On Ubuntu and Docker"
date: 2016-10-05
tags: [Docker, Ubuntu, Jenkins]
---

> Introduce how to install Jenkins on Ubuntu and create Jenkins container in Docker.

## 1. What is Jenkins?
[Jenkins](https://jenkins.io/index.html) is a powerful application that allows continuous integration and continuous delivery of projects, regardless of the platform you are working on. It is a free source that can handle any kind of build or continuous integration. You can integrate Jenkins with a number of testing and deployment technologies.

## 2. Install Jenkins
To use Jenkins, you can either install it on a physical/virtual machine, or create Jenkins container in Docker.
### 2.1 Install and Setup Jenkins on Ubuntu
Go to https://jenkins.io/download/, choose 'Ubuntu/Debian' for Long-term Support (LTS) version. Follow the steps mentioned in the page.  
1) Add the key to your system:
```sh
wget -q -O - https://pkg.jenkins.io/debian-stable/jenkins.io.key | sudo apt-key add -
```
2) Open /etc/apt/sources.list with editor:
```sh
sudo nano /etc/apt/sources.list
```
Add the following entry to the end.
```sh
deb https://pkg.jenkins.io/debian-stable binary/
```
3) Update your local packages, then finally install Jenkins:
```sh
sudo apt-get update
sudo apt-get install jenkins
```
After running above command, this package installation will:
* Setup Jenkins as a daemon launched on start. See /etc/init.d/jenkins for more details.
* Create a jenkins user to run this service.
* Direct console log output to the file /var/log/jenkins/jenkins.log. Check this file if you are troubleshooting Jenkins.
* Populate /etc/default/jenkins with configuration parameters for the launch, e.g JENKINS_HOME
* Set Jenkins to listen on port 8080. Access this port with your browser to start configuration.

### 2.2 Launch Jenkins Web
Open a web browser, access the following address. You need to find the password in the given file to unlock Jenkins.
* [http://localhost:8080/](http://localhost:8080/)

![MIME Type](/public/pics/2016-10-05/unlock.png)  

In terminal, navigate to the given directory.
```sh
$ cd /var/lib/jenkins/secrets/
```
If you encounter the permission denied error, use 'sudo su' command (without another user name) to allow you to run commands as the super-user (root).
![MIME Type](/public/pics/2016-10-05/secretfile.png)
Use any text editor to open file initialAdminPassword, you should see the password.
```sh
$ nano initialAdminPassword
```
![MIME Type](/public/pics/2016-10-05/password.png)
Copy this password and paste it to the input box in Getting Started page, continue.
![MIME Type](/public/pics/2016-10-05/setpassword.png)
In the next page, select Install Suggested Plugins.
![MIME Type](/public/pics/2016-10-05/plugin.png)
Jenkins starts to install plugins.
![MIME Type](/public/pics/2016-10-05/installplugin.png)
In the next page, you need to create an admin user.
![MIME Type](/public/pics/2016-10-05/createuser.png)
Setup is complete, ready for use.
![MIME Type](/public/pics/2016-10-05/ready.png)
Finally, we see the homepage of Jenkins.
![MIME Type](/public/pics/2016-10-05/homepage.png)

### 2.3 Commands for Jenkins
The following commands when appended to the Jenkins instance URL will carry out the relevant actions on the Jenkins instance.
* http://localhost:8080/jenkins/exit − shutdown jenkins
* http://localhost:8080/jenkins/restart − restart jenkins
* http://localhost:8080/jenkins/reload − to reload the configuration

## 3. Create Jenkins Container in Docker
### 3.1 Install Docker and Kitematic
If you haven’t installed Docker and Kitematic, please install Docker Toolbox by referring to another posting [Install Docker Toolbox and Kitematic on Mac]({% link _posts/2016-09-15-install-docker-toolbox-and-kitematic-on-mac.md %}).
### 3.2 Create Jenkins Container
Search jenkins in Kitematic, select the official image, and click Create button.
![MIME Type](/public/pics/2016-10-05/dockersearch.png)
New Jenkins container will be created and running.
![MIME Type](/public/pics/2016-10-05/dockerkitematic.png)
### 3.3 Setup Jenkins
Click the Preview button, web browser will be opened to access Jenkins application. Again, we need to find the password.
![MIME Type](/public/pics/2016-10-05/dockerunlock.png)
Open container terminal. Running the following commands.
```sh
$ cd var/jenkins_home/secrets/
$ more initialAdminPassword
```
![MIME Type](/public/pics/2016-10-05/dockerpassword.png)
Copy this password and paste it to the input box in Getting Started page, continue. The same steps as follows to setup Jenkins.
* Install Plugins
* Create Admin User
* Ready For Use
* Homepage of Jenkins

Finally, we see the homepage of Jenkins, which is hosted in Docker Container.
![MIME Type](/public/pics/2016-10-05/dockerhomepage.png)

## 4. References
* [Official Website for Jenkins](https://jenkins.io/index.html)
* [Installing Jenkins](https://jenkins.io/doc/book/getting-started/installing/)
* [Jenkins Tutorial](https://www.tutorialspoint.com/jenkins/index.htm)
