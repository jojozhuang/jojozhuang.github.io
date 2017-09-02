---
layout: post
key: blog
title: "Install Docker Toolbox and Kitematic on Mac"
date: 2016-09-15
tags: Docker, Kitematic
categories:
- blog
---

> Use Kitematic to easily manage docker containers without using Docker command-line.

## 1. What is Docker Toolbox?
The Docker Toolbox is an installer to quickly and easily install and setup a Docker environment on your computer.  
Toolbox includes these Docker tools:  
* Docker Machine for running docker-machine commands
* Docker Engine for running the docker commands
* Docker Compose for running the docker-compose commands
* Kitematic, the Docker GUI
* a shell preconfigured for a Docker command-line environment
* Oracle VirtualBox

## 2. What is Kitematic?
[Kitematic](https://kitematic.com/) is an open source project built to simplify and streamline using Docker on a Mac or Windows PC. Kitematic automates the Docker installation and setup process and provides an intuitive graphical user interface (GUI) for running Docker containers. Kitematic integrates with Docker Machine to provision a VirtualBox VM and install the Docker Engine locally on your machine.  
You can find its source files repository on [GitHub](https://github.com/docker/kitematic).

## 3. Install Docker Toolbox
Go to https://www.docker.com/products/docker-toolbox, select the installer for Mac. Download and follow the wizard to install.
![MIME Type](/public/pics/2016-09-15/installationtype.png)  
Note:
* If you've already installed Oracle VirtualBox on your Mac, then this component won't be installed.
* You don't need to install Kitematic separately, it is installed as you install Docker Toolbox.

After the installation is finished. You can launch Kitematic.
![MIME Type](/public/pics/2016-09-15/installfinished.png)  

## 4. Use Kitematic
### 4.1 Virtual Machine for Docker Machine
The first time you start Kitematic, it will create a new virtual machine in VirtualBox.
![MIME Type](/public/pics/2016-09-15/virtualbox.png)  
### 4.2 Main Screen
Now, you see the main screen of Kitematic. Since I've used Kitematic for some time, there are already some containers listed at the left side. There is nothing if you've never created any container before.
![MIME Type](/public/pics/2016-09-15/mainscreen.png)  
Options you have here:
* You can search Docker images through search box at top and click CREATE button to run containers for them.
* You can open a Docker-CLI terminal by clicking the whale button at the left bottom corner.

### 4.3 Login
If you've already registered a docker ID, you can use it to login now.
![MIME Type](/public/pics/2016-09-15/login.png)  
Switch to My Repos tab, the images on your Docker Hub will show here.
![MIME Type](/public/pics/2016-09-15/myrepos.png)  

## 5. Work with a Container
Take gsmysql as example, which is a database container I created for previous posting [Use Mysql Container for JSP Application](http://jojozhuang.github.io/blog/2016/09/12/use-mysql-container-for-jsp-application/).
Select gsmysql container, click the Start button.
![MIME Type](/public/pics/2016-09-15/gsmysql.png)  
The container is started. And you see that Access URL, which is the public address can be accessed from outside of the container. For mysql container, this is the url for applications to connect mysql database remotely.
![MIME Type](/public/pics/2016-09-15/started.png)  
### 5.1 Start Terminal in Container
Previously, we have to type the following command to open terminal in container.
```sh
docker exec -i -t <container> sh
```
Now, we just need to click the 'EXEC' button on the top.
### 5.2 Settings of Container
Switch to Settings tab. In general sub tab, you can set environment variables here. See that MYSQL_ROOT_PASSWORD, it was set by command line in docker terminal. Now, you can easily update it in Kitematic.
![MIME Type](/public/pics/2016-09-15/general.png)  
Volumes sub tab, this feature enables you to share files between container and host machine.
![MIME Type](/public/pics/2016-09-15/volume.png)  

## 6. References
* [Install Docker Toolbox on macOS](https://docs.docker.com/toolbox/toolbox_install_mac/)
* [Get Started with Docker Quickly, using Kitematic](https://www.youtube.com/watch?v=dwMcmfZaA6Q)
* [How to uninstall Toolbox](https://docs.docker.com/toolbox/toolbox_install_mac/#how-to-uninstall-toolbox)
