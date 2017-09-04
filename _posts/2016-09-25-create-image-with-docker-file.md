---
layout: post
key: blog
title: "Create Image with Docker File"
date: 2016-09-25
tags: Dockerfile
categories:
- blog
---

> Tutorial for how to setup remote debugging in Eclipse for tomcat in Docker.

## 1. What is Dockerfile?
Docker can build images automatically by reading the instructions from a Dockerfile. A Dockerfile is a text document that contains all the commands a user could call on the command line to assemble an image. Using docker build users can create an automated build that executes several command-line instructions in succession.

## 2. Create Image with Dockerfile
Previous, we use the following command to create tomcat container, a little bit long string.
```sh
$ docker run --name=gstomcat -d -v ~/Documents/gstomcat:/usr/local/tomcat/webapps/gamestore -p 31020:8080 -p 8000:8000 -e JPDA_ADDRESS=8000 tomcat catalina.sh jpda run
```
What is this command doing?
* Create a tomcat container named gstomcat.
* Mount the folder ~/Documents/gstomcat from host machine to /usr/local/tomcat/webapps/gamestore in container.
* Expose 8080 for outside world to connect to the website.
* Expose 8000 to enable remote debugging for tools like eclipse.
* Set environment variable JPDA_ADDRESS to 8000.
* Start tomcat via command 'catalina.sh jpda run'.

We will use Dockerfile to create a image which containers some of the configuration mentioned above. And use a shorter 'docker run' command later to have a same tomcat container.

Before moving forward, make sure you've already setup a volume folder ~/Documents/gstomcat in local machine. And all necessary jsp files and classes are located there.
![MIME Type](/public/pics/2016-09-25/foldermapping.png)  
### 2.1 Create Docker File
The name must be Dockerfile.
```sh
$ cd ~/Johnny
$ mkdir Docker
$ cd Docker
$ vim Dockerfile
```
### 2.2 Define Image Creation Steps
Edit Dockerfile, fill with following content.
```sh
#Create Tomcat Image for Game Store Application
FROM tomcat AS gstomcat
MAINTAINER jojozhuang@gmail.com

ENV JPDA_ADDRESS 8000
EXPOSE 8000
EXPOSE 8080
ENTRYPOINT ["catalina.sh", "jpda","run"]
CMD echo "gstomcat is launched"
```
The following points need to be noted about the above file.
* The first line is a comment. You can add comments to the Docker File with the help of the # command
* The FROM keyword tells which base image you want to use. In our example, we are creating an image from the tomcat image. The AS keyword define the name of the image.
* The next command is the person who is going to maintain this image.
* The ENV command is used to set environment variable. We set JPDA_ADDRESS to 8000 to enable remote debugging in tomcat container.
* The EXPOSE command exposes port of the image.
* The ENTRYPOINT command launch tomcat with running jpda for remote debugging. Notice, ENTRYPOINT only executes for container not image. To run command when creating image, use CMD keyword.
* The last line prints message to screen indicating container is running.

### 2.3 Create Image
Open Docker terminal, navigate to the folder where the Dockerfile locates. Run the following command.
```sh
$ docker build -t gamestore-tomcat:0.1 .
```
Here, gamestore-tomcat is the name we are giving to the Image and 0.1 is the tag number.

Check the image.
```sh
$ docker images
```
As you see, the new image is created with tag 0.1.
![MIME Type](/public/pics/2016-09-25/imagecreated.png)  

## 3. Test the Image
### 3.1 Run Container For the Image
In docker terminal, run the following command.
```sh
$ docker run --name=gstomcat -d -v ~/Documents/gstomcat:/usr/local/tomcat/webapps/gamestore -p 31020:8080 -p 8000:8000 gamestore-tomcat:0.1
```
Notice we haven't set the environment variable JPDA_ADDRESS, and we haven't specified to execute 'catalina.sh jpda run'.
### 3.2 Check Container in Kitematic
A Tomcat container named gstomcat is running now. Notice, it's source image is 'gamestore-tomcat:0.1'. And environment variable JPDA_ADDRESS is configured correctly.
![MIME Type](/public/pics/2016-09-25/general.png)  
Two ports are also configured.
![MIME Type](/public/pics/2016-09-25/ports.png)  
Volume is also configured correctly.
![MIME Type](/public/pics/2016-09-25/volume.png)  

### 3.3 Access Game Store Website
Access the following URL in web browser. Then, click the Login link on the top right of the page.
* [http://192.168.99.100:31020/gamestore/index.jsp](http://192.168.99.100:31020/gamestore/index.jsp)

Type 'customer' for user name, type 'customer' for password, and click Login button.
![MIME Type](/public/pics/2016-09-22/login.png)  
Switch to Eclipse, the breakpoint is activated. The remote debugging function is working.
![MIME Type](/public/pics/2016-09-22/breakpointdt.png)  

## 4. Source Code
[Source Code for Game Store Mysql on GitHub](https://github.com/jojozhuang/Portfolio/tree/master/GameStoreMysql)

## 5. References
* [Dockerfile reference](https://docs.docker.com/engine/reference/builder/)
* [Docker - File](https://www.tutorialspoint.com/docker/docker_file.htm)
* [How to publish ports in docker files](https://stackoverflow.com/questions/32740344/how-to-publish-ports-in-docker-files)
