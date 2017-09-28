---
layout: post
key: blog
title: "Install Jenkins in Docker"
date: 2016-10-08
tags: [Docker, Jenkins]
---

> Introduce how to create Jenkins container in Docker.

## 1. What is Jenkins?
[Jenkins](https://jenkins.io/index.html) is a powerful application that allows continuous integration and continuous delivery of projects, regardless of the platform you are working on. It is a free source that can handle any kind of build or continuous integration. You can integrate Jenkins with a number of testing and deployment technologies.

## 2. Create Jenkins Container in Docker
### 2.1 Install Docker and Kitematic
If you haven’t installed Docker and Kitematic, please install Docker Toolbox by referring to another posting [Install Docker Toolbox and Kitematic on Mac]({% link _posts/2016-09-15-install-docker-toolbox-and-kitematic-on-mac.md %}).
### 2.2 Create Jenkins Container
Search jenkins in Kitematic, select the official image, and click Create button.
![MIME Type](/public/pics/2016-10-08/dockersearch.png)
New Jenkins container will be created and running.
![MIME Type](/public/pics/2016-10-08/dockerkitematic.png)
### 2.3 Setup Jenkins
Click the Preview button, web browser will be opened to access Jenkins application. You need to find the password in the given file to unlock Jenkins.
![MIME Type](/public/pics/2016-10-08/dockerunlock.png)
Open container terminal. Running the following commands to get the password from secret file.
```sh
$ cd var/jenkins_home/secrets/
$ more initialAdminPassword
```
![MIME Type](/public/pics/2016-10-08/dockerpassword.png)
Copy this password and paste it to the input box in Getting Started page, continue.
![MIME Type](/public/pics/2016-10-08/dockersetpassword.png)
In the next page, select 'Install Suggested Plugins'.
![MIME Type](/public/pics/2016-10-08/dockerplugin.png)
Jenkins starts to install plugins.
![MIME Type](/public/pics/2016-10-08/dockerinstallplugin.png)
In the next page, you need to create an admin user.
![MIME Type](/public/pics/2016-10-08/dockercreateuser.png)
Setup is complete, ready for use.
![MIME Type](/public/pics/2016-10-08/dockerready.png)
Finally, we see the homepage of Jenkins, which is hosted in Docker Container.
![MIME Type](/public/pics/2016-10-08/dockerhomepage.png)

### 2.4 Commands for Jenkins
The following commands when appended to the Jenkins instance URL will carry out the relevant actions on the Jenkins instance.
* http://192.168.99.100:32769/cli/ - full list of commands
* http://192.168.99.100:32769/restart - restart jenkins

## 3. References
* [Official Website for Jenkins](https://jenkins.io/index.html)
* [Installing Jenkins](https://jenkins.io/doc/book/getting-started/installing/)
* [Jenkins Tutorial](https://www.tutorialspoint.com/jenkins/index.htm)
