---
layout: post
key: blog
title: "Run Multiple Containers with Docker Compose"
date: 2016-09-30
tags: Docker, Compose
categories:
- blog
---

> Tutorial for how to define and run multiple containers with Docker Compose.

## 1. Recall What've Achieved
Three ways to create containers:
* Run container through command line without creating our own images.
* Create images with Dockerfile and run containers based on customized images.
* Define and run containers with Docker Compose.

We learned how to create mysql and tomcat container through the previous postings. In this posting, we will learn how to use docker compose to simplify the process.

## 2. What is Docker Compose?
Compose is a tool for defining and running multi-container Docker applications. With Compose, you use a Compose file to configure your application’s services. Then, using a single command, you create and start all the services from your configuration.

Using Compose is basically a three-step process.
* Define your app’s environment with a Dockerfile so it can be reproduced anywhere.
* Define the services that make up your app in docker-compose.yml so they can be run together in an isolated environment.
* Lastly, run docker-compose up and Compose will start and run your entire app.

## 3. Create Docker Compose
### 3.1 Get Mysql Backup File
Download the backup file from [My GitHub](https://github.com/jojozhuang/Portfolio/blob/master/GameStoreMysql/document/gs_backup.sql), and put it to some directory, which will be mounted to mysql container.
### 3.2 Create Docker Compose
Create docker compose file in any directory of your local machine. The name must be docker-compose.yml.
```sh
$ cd ~/Johnny
$ mkdir Docker
$ cd Docker
$ vim docker-compose.yml
```
Edit docker-compose.yml, fill with following content.
```sh
version: '3'
services:
  web:
    image: tomcat
    environment:
    - JPDA_ADDRESS=8000
    ports:
    - "31020:8080"
    - "8000:8000"
    volumes:
    - /Users/Johnny/Documents/gstomcat:/usr/local/tomcat/webapps/gamestore
  database:
    image: mysql
    environment:
    - MYSQL_ROOT_PASSWORD=gspassword
    ports:
    - "6603:3306"
    volumes:
    - /Users/Johnny/Docker/dump:/docker-entrypoint-initdb.d
```
The following points need to be noted about the above file.
* The web and database keywords are used to define two separate containers. One will be running our tomcat web server and the other will be our mysql database.
* The image keyword is used to specify the image from Docker Hub for our tomcat and mysql containers.
* The environment keyword is used to configure environment variables.
* The ports keyword is used to mention the ports that need to be exposed for the container.
* The volumes keyword is used to define volumes between local machine and containers.

### 3.3 Run Docker Compose file
Open Docker terminal, navigate to the folder where the Docker compose file locates. Run the following command.
```sh
$ docker-compose up -d
```
This command will take the docker-compose.yml file in your local directory and start building the containers. Option -d makes this process run in background.
Once executed, all the images will start downloading and the containers will start automatically.

Check the containers.
```sh
$ docker ps
```
As you see, two containers are running now.
![MIME Type](/public/pics/2016-09-30/run.png)  

Use the following command to stop the containers.
```sh
$ docker-compose down
```
## 4. Test the Container
### 4.1 Check Container in Kitematic
There are two new containers are running now. Let's check their settings.  
First, the tomcat container. Environment variable for tomcat is set correctly.
![MIME Type](/public/pics/2016-09-30/tomcatgeneral.png)  
Ports are also configured.
![MIME Type](/public/pics/2016-09-30/tomcatport.png)  
Volume is also configured correctly.
![MIME Type](/public/pics/2016-09-30/tomcatvolume.png)  
Second, the mysql container. Environment variable for tomcat is set correctly.
![MIME Type](/public/pics/2016-09-30/mysqlgeneral.png)  
Ports are also configured.
![MIME Type](/public/pics/2016-09-30/mysqlport.png)  
Volume is also configured correctly.
![MIME Type](/public/pics/2016-09-30/mysqlvolume.png)  

### 4.2 Access Game Store Website
Access the following URL in web browser. Then, click the Login link on the top right of the page.
* [http://192.168.99.100:31020/gamestore/index.jsp](http://192.168.99.100:31020/gamestore/index.jsp)

Type 'customer' for user name, type 'customer' for password, and click Login button.
![MIME Type](/public/pics/2016-09-30/login.png)  
Try to add some item to shopping cart and place the order. Order should be created.

## 5. Source Code
* [Database Backup File](https://github.com/jojozhuang/Portfolio/blob/master/GameStoreMysql/document/gs_backup.sql)
* [Source Code for Game Store Mysql on GitHub](https://github.com/jojozhuang/Portfolio/tree/master/GameStoreMysql)

## 6. References
* [Docker Compose](https://docs.docker.com/compose/)
* [Docker - Compose](https://www.tutorialspoint.com/docker/docker_compose.htm)
* [How to name a volume using a docker-compose.yml file?](https://stackoverflow.com/questions/41303760/how-to-name-a-volume-using-a-docker-compose-yml-file)
