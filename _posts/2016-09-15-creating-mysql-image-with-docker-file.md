---
layout: post
key: blog
title: "Creating MySQL Image with Docker File"
date: 2016-09-15
tags: [Docker, Dockerfile, MySQL]
---

> Tutorial for how to create MySQL image with Dockerfile.

## 1. What is Dockerfile?
Docker can build images automatically by reading the instructions from a Dockerfile. A Dockerfile is a text document that contains all the commands a user could call on the command line to assemble an image. By using 'docker build', users can create an automated build that executes several command-line instructions in succession.

## 2. What We've Done Until Now?
In posting [Using MySQL Container for JSP Application]({% link _posts/2016-09-13-using-mysql-container-for-jsp-application.md %}), we created a mysql container to store data for our JSP Tutorial application. Previously, we used the following command to create mysql container.
```sh
$ docker run --detach --name=jspmysql --env="MYSQL_ROOT_PASSWORD=jsppassword" --publish 6603:3306 mysql
```
What is this command doing?
* Create a mysql container named `jspmysql`.
* Set environment variable MYSQL_ROOT_PASSWORD to `jsppassword`.
* Expose 3306 and map to `6603` for outside world to connect to this MySQL database.

In addition, we manually created the database `jsptutorial` and table `Product`.
```sh
$ mysqladmin -u root -p create jsptutorial
$ mysql -u root -p jsptutorial < jsp_backup.sql
```

In this posting, we will use Dockerfile to simplify the way how to create MySQL container for our JSP Tutorial application.

Before moving forward, make sure you've already setup folder ~/Documents/gstomcat in local machine, which will be volumed to tomcat container later. And all necessary jsp files and classes are put into this folder.
![MIME Type](/public/pics/2016-09-15/foldermapping.png)  

## 3. Creating MySQL Image with Dockerfile
### 3.1 Creating Docker File
Create docker file in any directory of your local machine. The name of the docker file must be `Dockerfile`.
```sh
$ cd ~/Johnny
$ mkdir Docker
$ cd Docker
$ vim Dockerfile
```
Edit Dockerfile, fill with following content.
```sh
#Create MySQL Image for JSP Tutorial Application
FROM mysql
MAINTAINER jojozhuang@gmail.com

ENV MYSQL_ROOT_PASSWORD jsppassword
ADD jsp_backup.sql /docker-entrypoint-initdb.d

EXPOSE 3306
```
The following points need to be noted about the above file.
* The first line is a comment. You can add comments to the Docker File with the help of the # command
* The FROM keyword tells which base image you want to use. In our example, we are creating an image from the mysql image.
* The next command is the person who is going to maintain this image.
* The ENV command is used to set environment variable. We set MYSQL_ROOT_PASSWORD to `jsppassword` for MySQL database.
* The ADD command copy the database backup file to /docker-entrypoint-initdb.d directory in the Docker container. The docker-entrypoint.sh file will run any files in this directory ending with ".sql" against the MySQL database. In our example, we have only one sql script file `jsp_backup.sql`.
* The EXPOSE command exposes port `3306` of the image.

### 3.2 Getting MySQL Backup File
Download the backup file `jsp_backup.sql` from [My GitHub](https://github.com/jojozhuang/Portfolio/blob/master/GameStoreMysql/document/gs_backup.sql), and put it to the same directory with Dockerfile.
![MIME Type](/public/pics/2016-09-15/dockerfiles.png)  

### 3.3 Creating Image with Dockerfile
Open Docker terminal, navigate to the folder where the Dockerfile and MySQL backup file locates. Run the following command.
```sh
$ docker build -t jsptutorial-mysql:0.1 .
```
Here, `jsptutorial-mysql` is the name we are giving to the Image and 0.1 is the tag number.

Check whether the image is created.
```sh
$ docker images
```
As you see, the new image is created with tag 0.1.
![MIME Type](/public/pics/2016-09-15/imagecreated.png)  

## 4. Testing The New Image
### 4.1 Running Container
In docker terminal, run the following command.
```sh
$ docker run --detach --name=jspmysql --publish 6603:3306 jsptutorial-mysql:0.1
```
Notice we don't need to set the environment variable MYSQL_ROOT_PASSWORD any more.
### 4.2 Verifying Container in Kitematic
A Mysql container named gsmysql is running now. Notice, it's source image is 'gamestore-mysql:0.1'. And environment variable MYSQL_ROOT_PASSWORD has been added to the container.
![MIME Type](/public/pics/2016-09-15/general.png)  
Port 3306 is also exposed.
![MIME Type](/public/pics/2016-09-15/ports.png)  

### 4.3 Verifying From MySQL Workbench
![MIME Type](/public/pics/2016-09-15/workbench.png)  

### 4.4 Verifying JSP Tutorial Website
Open the JSP project which we used for [Using MySQL Container for JSP Application]({% link _posts/2016-09-13-using-mysql-container-for-jsp-application.md %}) in Eclipse, launch itthe following link in web browser. Our Game Store is running now.
* [http://localhost:8080/JSPTutorialContainer/productlist.jsp](http://localhost:8080/JSPTutorialContainer/productlist.jsp)

Type 'customer' for user name, type 'customer' for password, and click Login button.
![MIME Type](/public/pics/2016-09-15/productlist.png)  
Try to add some item to shopping cart and place the order. Order should be created.

## 5. Source Files
* [Database Backup File](https://github.com/jojozhuang/Portfolio/blob/master/GameStoreMysql/document/gs_backup.sql)
* [Source files for Game Store Mysql on GitHub](https://github.com/jojozhuang/Portfolio/tree/master/GameStoreMysql)

## 6. References
* [Dockerfile reference](https://docs.docker.com/engine/reference/builder/)
* [How to Back Up and Restore a MySQL Database](http://webcheatsheet.com/sql/mysql_backup_restore.php)
* [How can I initialize a MySQL database with schema in a Docker container?](https://stackoverflow.com/questions/29145370/how-can-i-initialize-a-mysql-database-with-schema-in-a-docker-container)
* [Initializing a fresh instance of MySQL Docker image docs](https://hub.docker.com/_/mysql/)
* [Setting up MySQL and importing dump within Dockerfile](https://stackoverflow.com/questions/25920029/setting-up-mysql-and-importing-dump-within-dockerfile)
