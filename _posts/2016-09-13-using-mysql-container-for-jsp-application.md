---
layout: post
key: blog
title: "Using MySQL Container for JSP Application"
date: 2016-09-13
tags: [JSP, MySQL, Docker]
---

> Introduce how to use MySQL Docker Container as database for JSP Application.

## 1. Introduction
In the posting [Building Website with JSP and MySQL]({% link _posts/2016-02-26-building-website-with-jsp-and-mysql.md %}), we created a JSPTutorial application to manage products. This application is hosted on Tomcat web server, and it uses MySQL for storing data. This MySQL database is running on the same machine with Tomcat. Now, I want to setup a Docker container for this MySQL database. So, it can be easily deployed to other machine/server. Some configuration of my JSP application needs to be updated to connect to new address of the MySQL container.

### 1.1 Database
The instance of MySQL for this JSP application looks like the below structure.  
MySQL/  
├── jsptutorial  
├───── Product    
└── root/jsppassword  
There is one database named `jsptutorial`. This database contains one table `Product`. To access this database, we use `root` user with password `jsppassword`.

### 1.2 Setting Up JSP Project
Get the source files of [JSPTutorial from GitHub](https://github.com/jojozhuang/Tutorials/tree/master/JSPTutorial), rename it to `JSPTutorialContainer`.
The project in Eclipse looks like this.
![MIME Type](/public/pics/2016-09-15/project.png)
Run it in Tomcat. Access http://localhost:8080/JSPTutorialContainer/productlist.jsp in web browser.
![MIME Type](/public/pics/2016-09-15/productlist.png)

## 2. Setting up MySQL Container
### 2.1 Creating MySQL Container
Get official MySQL image.
```sh
$ docker pull mysql
```

Run a MySQL container.
```sh
$ docker run --name=jspmysql mysql
error: database is uninitialized and password option is not specified
  You need to specify one of MYSQL_ROOT_PASSWORD, MYSQL_ALLOW_EMPTY_PASSWORD and MYSQL_RANDOM_ROOT_PASSWORD
```
Failed, try again by providing the MySQL_ROOT_PASSWORD environment variable.
```sh
$ docker run --name=jspmysql --env="MYSQL_ROOT_PASSWORD=jsppassword" mysql
docker: Error response from daemon: Conflict. The container name "/jspmysql" is already in use by container "2b6115f2d2f4865362366d7859a2023d5a1e0f604387d95d737e00baa2066212". You have to remove (or rename) that container to be able to reuse that name.
See 'docker run --help'.
```
Another error occurred. We need to remove the exiting container we just created and try again.
```sh
$ docker rm jspmysql
jspmysql
$ docker run --name=jspmysql --env="MYSQL_ROOT_PASSWORD=jsppassword" mysql
Initializing database
...
Database initialized
Initializing certificates
Generating a 2048 bit RSA private key
...
Certificates initialized
MySQL init process in progress...
...
MySQL init process done. Ready for start up.
...
2016-09-12T02:16:07.965324Z 0 [Note] mysqld: ready for connections.
Version: '5.7.19'  socket: '/var/run/mysqld/mysqld.sock'  port: 3306  MySQL Community Server (GPL)
```
Now, it starts without error.

### 2.2 Running Container in Background
Our MySQL container is now running. However, you are now stuck in the terminal and can’t do anything because the container is running in attach mode (running in foreground). This is so inconvenient. We would expect MySQL to run as a service instead. Let’s consider this as a failed deployment and stop the current container. In another terminal, stop the running container and run it again in detach mode (running as background):
```sh
$ docker stop jspmysql
$ docker rm jspmysql
$ docker run --detach --name=jspmysql --env="MYSQL_ROOT_PASSWORD=jsppassword" mysql
77d6f463c31efc1a62235867e66f576af3f564ef1d03b064de274f813695d159
```
You will get an output of the container ID, indicating the container is successfully running in the background. Let’s verify the status of the container:
```sh
$ docker ps
CONTAINER ID    IMAGE     COMMAND                  CREATED          STATUS            PORTS        NAMES
77d6f463c31e    mysql     "docker-entrypoint..."   9 seconds ago    Up 6 seconds      3306/tcp     jspmysql
```

### 2.3 Exposing MySQL Container to Host
Expose the MySQL container to the outside world by mapping the container’s MySQL port to the host machine port using the publish flag. Now, we can connect to the MySQL container through port 6603.
```sh
$ docker rm -f jspmysql
$ docker run --detach --name=jspmysql --env="MYSQL_ROOT_PASSWORD=jsppassword" --publish 6603:3306 mysql
889aa7224b2544023069559de5bd1f214ddbda9cb327fc3a4771eddc25bb1b7b
```

## 3. Restoring MySQL Database in Container
### 3.1 Copying MySQL backup files from host to container
```sh
$ docker cp ~/JSPTutorialContainer/dbbackup/jsp_backup.sql jspmysql:/jsp_backup.sql
```
Start terminal in gsMySQL container with the following command:
```sh
$ docker exec -i -t gsMySQL sh
```
Use 'ls' to check the files. Our two db restore files are there.
![MIME Type](/public/pics/2016-09-12/sqlfile.png)  

### 3.2 Restoring Database Schema and Data
Create Database
```sh
$ MySQLadmin -u root -p create gamestore
```
Restore Tables and Data
```sh
$ MySQL -u root -p gamestore < gamestore_salesorder.sql
$ MySQL -u root -p gamestore < gamestore_orderitem.sql
```
![MIME Type](/public/pics/2016-09-12/restoredb.png)  

## 4. Connecting to the Container
### 4.1 Getting the Connection URL
In Kitematic, select our MySQL container, check Access URL. It's 192.168.99.100:6603.
![MIME Type](/public/pics/2016-09-12/accessurl.png)  

### 4.2 Connecting MySQL Container with MySQL Workbench
Go to https://dev.MySQL.com/downloads/workbench/, download the installer and install it.
Launch MySQL Workbench and add Connection with the IP address and port.
![MIME Type](/public/pics/2016-09-12/newconnection.png)  
Store the password for root to keychain.
![MIME Type](/public/pics/2016-09-12/benchpassword.png)  
Test Connection
![MIME Type](/public/pics/2016-09-12/testconnection.png)  
A new connection is added to the workbench.
![MIME Type](/public/pics/2016-09-12/workbench.png)  
Check the original data. As you see, there is no entry in table SalesOrder.
![MIME Type](/public/pics/2016-09-12/original.png)  

### 4.3 Configuring the Connection
Edit file /GameStoreMySQL/WebContent/META-INF/context.xml. Specify the usename, password and URL, including the ip address and port to connect MySQL.
```xml
<Resource name="jdbc/murach" auth="Container"
        driverClassName="com.MySQL.jdbc.Driver"
        url="jdbc:MySQL://192.168.99.100:6603/gamestore"
        username="root" password="gspassword"
        maxActive="100" maxIdle="30" maxWait="10000"
        logAbandoned="true" removeAbandoned="true"
        removeAbandonedTimeout="60" type="javax.sql.DataSource" />
```

### 4.4 Restarting the JSP Application
Login as follows:
* User Name: customer
* Password:  customer
* User Type: customer

![MIME Type](/public/pics/2016-09-12/login.png)  

Add some items, console, accessory or game to shopping cart, and place order.
![MIME Type](/public/pics/2016-09-12/cart.png)  

Order is created now.
![MIME Type](/public/pics/2016-09-12/order.png)  
After the above operation, check the data in MySQL workbench. You see there is one new order entry in SalesOrder table.
![MIME Type](/public/pics/2016-09-12/after.png)  

## 5. Publishing MySQL Container
1) First, check the container id.
```sh
$ docker ps
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                    NAMES
889aa7224b25        MySQL               "docker-entrypoint..."   24 hours ago        Up About an hour    0.0.0.0:6603->3306/tcp   gsMySQL
```
2) Secondly, create new image based on this container.
```sh
$ docker commit -m "db restored" -a "Johnny" 889aa7224b25 jojozhuang/gamestore-MySQL
sha256:3437fd76186fbc0fbf3f60bfb902d19d9a735e77d827c5c424b9e99a1828a824
```
3) Push to Docker Hub
```sh
$ docker login -u jojozhuang
Password:
Login Succeeded
$ docker push jojozhuang/gamestore-MySQL
The push refers to a repository [docker.io/jojozhuang/gamestore-MySQL]
197bbcc9bad0: Pushed
```
4) Check the new image on Docker Hub
![MIME Type](/public/pics/2016-09-12/dockerhub.png)  
Now, you can use the following command to install this image.
```sh
$ docker pull jojozhuang/gamestore-MySQL
```

## 6. Source Files
* [Source files for Game Store MySQL on GitHub](https://github.com/jojozhuang/Portfolio/tree/master/GameStoreMySQL)

## 7. References
* [MySQL Docker Containers: Understanding the basics](https://severalnines.com/blog/MySQL-docker-containers-understanding-basics)
* [MySQL - Create Database](https://www.tutorialspoint.com/MySQL/MySQL-create-database.htm)
* [How To Migrate a MySQL Database Between Two Servers](https://www.digitalocean.com/community/tutorials/how-to-migrate-a-MySQL-database-between-two-servers)
* [JDBC Driver class not found: com.MySQL.jdbc.Driver](https://stackoverflow.com/questions/8779631/jdbc-driver-class-not-found-com-MySQL-jdbc-driver)
