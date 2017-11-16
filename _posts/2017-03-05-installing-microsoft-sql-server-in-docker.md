---
layout: post
key: blog
title: "Installing Microsoft SQL Server in Docker"
date: 2017-03-05
tags: [SQL Server, Docker]
---

> Introduce how to create Microsoft SQL Server in Docker.

## 1. What is SQL Server?
SQL Server is a database.

## 2. Creating SQL Server Container in Docker
### 2.1 Installing Docker and Kitematic
If you haven’t installed Docker and Kitematic, please install Docker Toolbox by referring to another posting [Install Docker Toolbox and Kitematic on Mac]({% link _posts/2016-09-11-installing-docker-toolbox-and-kitematic-on-mac.md %}).
### 2.2 Creating SQL Server Container
Search `mssql-server-linux` in Kitematic, select the official image, and click Create button.
![MIME Type](/public/pics/2017-03-05/dockersearch.png)
SQL Server for Linux image will be downloaded and a container will be created and running.
![MIME Type](/public/pics/2017-03-05/installing.png)
The installation will take several minutes. Finally, the container is created. However, it is stopped. There are some configurations we have to set before using it.
![MIME Type](/public/pics/2017-03-05/containercreated.png)
### 2.3 Add ENVs
Click the Preview button, web browser will be opened to access Jenkins application. You need to find the password in the given file to unlock Jenkins.
![MIME Type](/public/pics/2017-03-05/accepteula.png)
Open container terminal by clicking on the 'EXEC' button in Kitematic. Run the following commands to get the password from secret file `initialAdminPassword`.
```sh
$ cd var/jenkins_home/secrets/
$ more initialAdminPassword
```
![MIME Type](/public/pics/2016-10-08/dockerpassword.png){:width="600px"}
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
* [mssql-server-linux docker hub](https://hub.docker.com/r/microsoft/mssql-server-linux/)
* [Jenkins Tutorial](https://www.tutorialspoint.com/jenkins/index.htm)
