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

## 4. Terminals
It's necessary to understand the structure of docker and what terminal can access it.  
## 4.1 Without Virtual Machine
If you install docker manually, like what I did for Ubuntu mentioned in the posting [Install and Use Docker on Ubuntu]({{ site.baseurl }}{% link _posts/2016-09-10-install-and-use-docker-on-ubuntu.md %}), the docker is hosted directly by host machine. The host terminal can access both docker and host system.
![MIME Type](/public/pics/2016-09-15/terminal-pm.png)  
## 4.2 With Virtual Machine
If you install docker through Docker Toolbox, like what we did in this posting, the structure is different. There is one more VirtualBox VM between host machine and docker machine. In this case, you can only use Docker QuickStart Terminal to access docker.
![MIME Type](/public/pics/2016-09-15/terminal-vm.png)  
## 4.3 Types of Terminal
There are three types of terminal if docker is hosted on virtual machine.  

 Type                       | Description                    |  How to launch?
----------------------------|--------------------------------|----------------------
 Host Terminal              | The system terminal of host OS | Spotlight Search->terminal
 Docker QuickStart Terminal | The terminal for docker        | Spotlight Search->Docker QuickStart Terminal
 Container Terminal         | The terminal within container  | In Docker Terminal, execute 'docker exec -it &lt;container> sh'

Whenever you start to work in command lines, be sure you are in the right terminal. For example, you cannot access docker in host terminal if it's in the virtual machine.
![MIME Type](/public/pics/2016-09-15/terminal-fail.png)  

## 5. Use Kitematic
### 5.1 Virtual Machine for Docker Machine
The first time you start Kitematic, it will create a new virtual machine in VirtualBox.
![MIME Type](/public/pics/2016-09-15/virtualbox.png)  
### 5.2 Main Screen
Now, you see the main screen of Kitematic. Since I've used Kitematic for some time, there are already some containers listed at the left side. There is nothing if you've never created any container before.
![MIME Type](/public/pics/2016-09-15/mainscreen.png)  
Options you have here:
* You can search Docker images through search box at top and click CREATE button to run containers for them.
* You can open a Docker-CLI terminal by clicking the whale button at the left bottom corner.

### 5.3 Login
If you've already registered a docker ID, you can use it to login now.
![MIME Type](/public/pics/2016-09-15/login.png)  
Switch to My Repos tab, the images on your Docker Hub will show here.
![MIME Type](/public/pics/2016-09-15/myrepos.png)  

## 6. Work with Container
Take gsmysql as example, which is a database container I created for previous posting [Use Mysql Container for JSP Application]({{ site.baseurl }}{% link _posts/2016-09-12-use-mysql-container-for-jsp-application.md %}).
Select gsmysql container, click the Start button.
![MIME Type](/public/pics/2016-09-15/gsmysql.png)  
The container is started. And you see that Access URL, which is the public address can be accessed from outside of the container. For mysql container, this is the url for applications to connect mysql database remotely.
![MIME Type](/public/pics/2016-09-15/started.png)  
### 6.1 Start Terminal in Container
Previously, we have to type the following command to open terminal in container.
```sh
docker exec -i -t <container> sh
```
Now, we just need to click the 'EXEC' button on the top.
### 6.2 Settings of Container
Switch to Settings tab. In general sub tab, you can set environment variables here. See that MYSQL_ROOT_PASSWORD, it was set by command line in docker terminal. Now, you can easily update it in Kitematic.
![MIME Type](/public/pics/2016-09-15/general.png)  
Volumes sub tab, this feature enables you to share files between container and host machine.
![MIME Type](/public/pics/2016-09-15/volume.png)  

## 7. References
* [Install Docker Toolbox on macOS](https://docs.docker.com/toolbox/toolbox_install_mac/)
* [Get Started with Docker Quickly, using Kitematic](https://www.youtube.com/watch?v=dwMcmfZaA6Q)
* [How to uninstall Toolbox](https://docs.docker.com/toolbox/toolbox_install_mac/#how-to-uninstall-toolbox)
