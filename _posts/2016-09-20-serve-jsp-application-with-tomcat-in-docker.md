---
layout: post
key: blog
title: "Serve JSP Application With Tomcat In Docker"
date: 2016-09-20
tags: Docker, Tomcat
categories:
- blog
---

> Guide how to serve Java Servlet/JSP website in Apache Tomcat Container with Kitematic.

## 1. Prerequisite
If you haven’t installed Docker and Kitematic, please install Docker Toolbox by referring to my previous posting [Install Docker Toolbox and Kitematic on Mac]({% link _posts/2016-09-15-install-docker-toolbox-and-kitematic-on-mac.md %}).

## 2. Setup Tomcat Container
### 2.1 Create Tomcat Container
In Kitematic, Search 'tomcat', Click on the 'CREATE' button of the official Tomcat image.
![MIME Type](/public/pics/2016-09-20/search.png)  
Kitematic will download (also known as pull the image) the tomcat image from the Docker Hub immediately.
![MIME Type](/public/pics/2016-09-20/download.png)  
Once it’s done, Kitematic will run a Docker Tomcat container for this image. A Tomcat web server is started up, allowing it to serve website data to your Mac.
![MIME Type](/public/pics/2016-09-20/running.png)  
Click on the preview button to see the result in web browser. If you see the following web page, it means tomcat is working properly.
![MIME Type](/public/pics/2016-09-20/preview.png)  
There is one issue with this Tomcat container, volume is not configured.
![MIME Type](/public/pics/2016-09-20/novolume.png)  
### 2.2 Create Tomcat Container with Bindmounting a Volume
Let's manually create another Tomcat container for the same tomcat image.
In docker terminal, run the following command.
```sh
$ docker run --name=gstomcat -d -v ~/Documents/gstomcat:/usr/local/tomcat/webapps/gamestore -p 31020:8080 tomcat
```
Let's take a moment to examine this command in detail:
* --name=gstomcat names the container so we can refer to it more easily.
* -d detaches the process and runs in the background. Otherwise, we would just be watching an empty Tomcat prompt and wouldn't be able to use this terminal until we killed Tomcat.
* -v ~/Documents/gstomcat:/usr/local/tomcat/webapps/gamestore Sets up a bindmount volume that links the /usr/local/tomcat/webapps/gamestore directory from inside the Tomcat container to the ~/Documents/gstomcat directory on the host machine. Docker uses a : to split the host's path from the container path, and the host path always comes first.
* -p 31020:8080 sets up a port forward. The Tomcat container is listening on port 8080 by default. This flag maps the container's port 8080 to port 31020 on the host system.
* tomcat specifies that the container should be built from the tomcat image

Switch to Kitematic, the new container is running with Volume configured.
![MIME Type](/public/pics/2016-09-20/gstomcat.png)  
Click on the preview button of the new container. You will see a same Tomcat welcome page. Notice, the port is different with the previous one. They are running in different tomcat containers.
![MIME Type](/public/pics/2016-09-20/newpreview.png)  

## 3. Prepare JSP Application
### 3.1 Create Folder for Volume in Host
In your host machine, create new folder gstomcat under ~/Documents.
![MIME Type](/public/pics/2016-09-20/volume.png)  

### 3.2 Publish JSP Application
We will use the same JSP application for [Use Mysql Container for JSP Application]({% link _posts/2016-09-12-use-mysql-container-for-jsp-application.md %}).

Build the project first, and copy all of the files from /GameStoreMysql/WebContent/ to ~/Documents/gstomcat/.
![MIME Type](/public/pics/2016-09-20/webcontent.png)  
Then, copy the entire 'classes' folder from /GameStoreMysql/build/ to ~/Documents/gstomcat/WEB-INF/
![MIME Type](/public/pics/2016-09-20/classes.png)  
The final structure of the volume folder looks like below. All the files are deployed.
![MIME Type](/public/pics/2016-09-20/final.png)  

### 3.3 Check webapps Directory in Tomcat Container
Inspect to tomcat container, and navigate to the default web folder of tomcat.
```sh
$ docker exec -it gstomcat sh
$ cd webapps\gamestore
$ ls
$ pwd
/usr/local/tomcat/webapps/gamestore
```
All files are under webapps/gamestore directory now.
![MIME Type](/public/pics/2016-09-20/webapps.png)  

### 3.4 Access JSP Application
Access the following URL in web browser. Game Store is launched successfully!
* [http://192.168.99.100:31020/gamestore/index.jsp](http://192.168.99.100:31020/gamestore/index.jsp)

![MIME Type](/public/pics/2016-09-20/deployed.png)  

## 4. Source Code
[Source Code for Game Store Mysql on GitHub](https://github.com/jojozhuang/Portfolio/tree/master/GameStoreMysql)

## 5. References
* [How To Share Data between the Docker Container and the Host](https://www.digitalocean.com/community/tutorials/how-to-share-data-between-the-docker-container-and-the-host)
* [Use volumes](https://docs.docker.com/engine/admin/volumes/volumes/)
