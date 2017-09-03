---
layout: post
key: blog
title: "Serve JSP Application in Tomcat with Kitematic"
date: 2016-09-20
tags: Docker, Kitematic, Tomcat
categories:
- blog
---

> Guide how to serve the Servlet/JSP website in Apache Tomcat Container with Kitematic.

## 1. Prerequisite
If you haven’t installed Docker and Kitematic, please install Docker Toolbox by referring to my previous posting [Install Docker Toolbox and Kitematic on Mac](http://jojozhuang.github.io/blog/2016/09/15/install-docker-toolboxand-kitematic-on-mac/).

## 2. Run Tomcat Container
### 2.1 Create Tomcat Container
In Kitematic, Search 'tomcat', Click on the 'CREATE' button of the official Tomcat image.
![MIME Type](/public/pics/2016-09-20/search.png)  
Kitematic will download (also known as pull the image) the tomcat image from the Docker Hub immediately.
![MIME Type](/public/pics/2016-09-20/download.png)  
Once it’s done, Kitematic will run a Docker Tomcat container for this image. A Tomcat web server is started up, allowing it to serve website data to your Mac.
![MIME Type](/public/pics/2016-09-20/running.png)  
Click on the preview button to see the result in your own browser. If you see the below web page, it means tomcat is working properly.
![MIME Type](/public/pics/2016-09-20/preview.png)  
There is one issue with this Tomcat container, no volume is configured.
![MIME Type](/public/pics/2016-09-20/novolume.png)  
### 2.2 Bindmount a Volume
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

Switch to Kitematic, the new container is listed there with the Volumes set.
![MIME Type](/public/pics/2016-09-20/gstomcat.png)  
Click on the preview button to see the result in your own browser. If you see the below web page, it means tomcat is working properly. Notice, the port is different with the previous one.
![MIME Type](/public/pics/2016-09-20/newpreview.png)  

## 3. Prepare JSP Application
### 3.1 Create Volume Folder in Host
In your home directory, create new folder gstomcat under ~/Documents.
![MIME Type](/public/pics/2016-09-20/volume.png)  

### 3.2 Create Volume Folder in Host
We will use the same JSP application for [Use Mysql Container for JSP Application](http://jojozhuang.github.io/blog/2016/09/12/use-mysql-container-for-jsp-application/).

Build the project, copy all of the files from /GameStoreMysql/WebContent/ to ~/Documents/gstomcat/.
![MIME Type](/public/pics/2016-09-20/webcontent.png)  
And copy all of the class files from /GameStoreMysql/build/ to ~/Documents/gstomcat/WEB-INF/
![MIME Type](/public/pics/2016-09-20/classes.png)  
The final stucture of the volume folder looks like below. All the files are deployed.
![MIME Type](/public/pics/2016-09-20/final.png)  

### 3.3 Check JSP
Access the following URL in web browser. Game Store is launched successfully!
http://192.168.99.100:31020/gamestore/index.jsp
![MIME Type](/public/pics/2016-09-20/deployed.png)  

## 4. Source Code
[Source Code for Game Store Mysql on GitHub](https://github.com/jojozhuang/Portfolio/tree/master/GameStoreMysql)

## 5. References
* [How To Share Data between the Docker Container and the Host](https://www.digitalocean.com/community/tutorials/how-to-share-data-between-the-docker-container-and-the-host)
* [Use volumes](https://docs.docker.com/engine/admin/volumes/volumes/)
