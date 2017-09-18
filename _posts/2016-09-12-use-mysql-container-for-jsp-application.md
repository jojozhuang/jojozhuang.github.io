---
layout: post
key: blog
title: "Use Mysql Container for JSP Application"
date: 2016-09-12
tags: Mysql, Docker
categories:
- blog
---

> Introduce how to user Mysql Docker Container as database for JSP Application.

## 1. Project Introduction
There is a JSP web application named [Game Store]({% link _posts/portfolios/2016-05-13-Online-Game-Store.md %}) in my portfolio. Currently, this application is hosted on Tomcat web server, and it uses Mysql for storing data. This Mysql database is running on the same machine with Tomcat. Now, I want to setup a Docker container for this Mysql database. So, it can be easily deployed to other machine/server. Some configuration of my JSP application needs to be updated to connect to new address of the Mysql container. I shared this Mysql container on Docker Hub. You can pull it to your local machine and follow the steps below to setup a Game Store.

### 1.1 Database
The instance of mysql for this JSP application looks like the below structure.  
mysql/  
├── gamestore  
├───── SalesOrder  
├───── OrderItem  
└── root/gspassword  
There is one database named 'gamestore' in mysql. This database contains two tables, SalesOrder and OrderItem. To access this database, we use root user with password 'gspassword'.

### 1.2 Mysql Connector
To let our JSP application access Mysql database, we need mysql connector jar. It is a middleware between our JSP application and Mysql Container. Even though mysql is not required to be installed on our host machine, our JSP application needs to connect to mysql container with it.  
Go to https://dev.mysql.com/downloads/connector/j/5.1.html, download Mysql Connector/J.
![MIME Type](/public/pics/2016-09-12/mysqlconnectordownload.png)  
Unzip it, and copy mysql-connector-java-5.1.44-bin.jar to /GameStore/src/web/WEB-INF/lib/.

I have already put this jar file to WEB-INF. So, actually, you don't need to do again after you download the source files from my GitHub. But, I think it's better to understand how the application works with database. Depends on which platform the JSP application is deployed on, you needs to choose appropriate version of Mysql Connector.

### 1.2 JSP Application
Pull the source files for this JSP application from my GitHub repository.
```sh
$ cd ~
$ mkdir Portfolio
$ cd Portfolio
$ git clone https://github.com/jojozhuang/Portfolio.git
```
The source files are located in ~/Portfolio/GameStoreMysql/GameStoreMysql.

Launch your eclipse, set workspace to ~/Portfolio/.  
File->Open Projects from File System..., set path to ~/Portfolio/GameStoreMysql/GameStoreMysql. The project is imported to eclipse.
![MIME Type](/public/pics/2016-09-12/jspproject.png)  
Now, add Tomcat server to eclipse.  
Window->Show View->Server, click the link to add new server.
![MIME Type](/public/pics/2016-09-12/eclipseserver.png)  
Select Tomcat 9.0.
![MIME Type](/public/pics/2016-09-12/newserver.png)  
Add Our Project to right side.
![MIME Type](/public/pics/2016-09-12/addresource.png)  
In eclipse project, a new server folder for tomcat is added.
![MIME Type](/public/pics/2016-09-12/servers.png)  
Set Targeted Runtimes.  
Right click on the GameStore Project->Properties->Targeted Runtimes, check Tomcat 9.0.
![MIME Type](/public/pics/2016-09-12/targetedruntimes.png)  
Now, we can use 'Run on Server' to start our JSP Application.
![MIME Type](/public/pics/2016-09-12/runonserver.png)  
There will be a browser opened in eclipse, which shows our Game Store website. Or you can directly access http://localhost:8080/GameStoreMysql/ in browser.
![MIME Type](/public/pics/2016-09-12/launched.png)  

## 2. Setup Mysql Container
### 2.1 Create Mysql Container
Get official mysql image.
```sh
docker pull mysql
```

Run a mysql container.
```sh
$ docker run --name=gsmysql mysql
error: database is uninitialized and password option is not specified
  You need to specify one of MYSQL_ROOT_PASSWORD, MYSQL_ALLOW_EMPTY_PASSWORD and MYSQL_RANDOM_ROOT_PASSWORD
```
Failed, try again by providing the MYSQL_ROOT_PASSWORD environment variable.
```sh
$ docker run --name=gsmysql --env="MYSQL_ROOT_PASSWORD=gspassword" mysql
docker: Error response from daemon: Conflict. The container name "/gsmysql" is already in use by container "cc559892604226740d6681412a0b4477d913c00218c4b673a21137216135a646". You have to remove (or rename) that container to be able to reuse that name.
See 'docker run --help'.
```
Another error occurred. We need to remove the exiting container we just created and try again.
```sh
$ docker rm gsmysql
gsmysql
$ docker run --name=gsmysql --env="MYSQL_ROOT_PASSWORD=gspassword" mysql
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

### 2.2 Run Container in Background
Our MySQL container is now running. However, you are now stuck in the terminal and can’t do anything because the container is running in attach mode (running in foreground). This is so inconvenient. We would expect MySQL to run as a service instead. Let’s consider this as a failed deployment and stop the current container. In another terminal, stop the running container and run it again in detach mode (running as background):
```sh
$ docker stop gsmysql
$ docker rm gsmysql
$ docker run --detach --name=gsmysql --env="MYSQL_ROOT_PASSWORD=gspassword" mysql
77d6f463c31efc1a62235867e66f576af3f564ef1d03b064de274f813695d159
```
You will get an output of the container ID, indicating the container is successfully running in the background. Let’s verify the status of the container:
```sh
$ docker ps
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS               NAMES
77d6f463c31e        mysql               "docker-entrypoint..."   9 seconds ago       Up 6 seconds        3306/tcp            gsmysql
```

### 2.3 Expose Mysql Container to Host
Expose the MySQL container to the outside world by mapping the container’s MySQL port to the host machine port using the publish flag. Now, we can connect to the mysql container through port 6603.
```sh
$ docker rm -f gsmysql
$ docker run --detach --name=gsmysql --env="MYSQL_ROOT_PASSWORD=gspassword" --publish 6603:3306 mysql
889aa7224b2544023069559de5bd1f214ddbda9cb327fc3a4771eddc25bb1b7b
```

## 3. Restore Mysql Database in Container
### 3.1 Copy Mysql backup files from host to container
```sh
docker cp ~/GameStore/document/gamestore_orderitem.sql gsmysql:/gamestore_orderitem.sql
docker cp ~/GameStore/document/gamestore_salesorder.sql gsmysql:/gamestore_salesorder.sql
```
Start terminal in gsmysql container with the following command:
```sh
docker exec -i -t gsmysql sh
```
Use 'ls' to check the files. Our two db restore files are there.
![MIME Type](/public/pics/2016-09-12/sqlfile.png)  

### 3.2 Restore Database Schema and Data
Create Database
```sh
$ mysqladmin -u root -p create gamestore
```
Restore Tables and Data
```sh
$ mysql -u root -p gamestore < gamestore_salesorder.sql
$ mysql -u root -p gamestore < gamestore_orderitem.sql
```
![MIME Type](/public/pics/2016-09-12/restoredb.png)  

## 4. Connect to the Container
### 4.1 Get the Connection URL
In Kitematic, select our mysql container, check Access URL. It's 192.168.99.100:6603.
![MIME Type](/public/pics/2016-09-12/accessurl.png)  

### 4.2 Connect Mysql Container with Mysql Workbench
Go to https://dev.mysql.com/downloads/workbench/, download the installer and install it.
Launch MySql Workbench and add Connection with the IP address and port.
![MIME Type](/public/pics/2016-09-12/newconnection.png)  
Store the password for root to keychain.
![MIME Type](/public/pics/2016-09-12/benchpassword.png)  
Test Connection
![MIME Type](/public/pics/2016-09-12/testconnection.png)  
A new connection is added to the workbench.
![MIME Type](/public/pics/2016-09-12/workbench.png)  
Check the original data. As you see, there is no entry in table SalesOrder.
![MIME Type](/public/pics/2016-09-12/original.png)  

### 4.3 Configure the Connection
Edit file /GameStoreMysql/WebContent/META-INF/context.xml. Specify the usename, password and URL, including the ip address and port to connect mysql.
```xml
<Resource name="jdbc/murach" auth="Container"
        driverClassName="com.mysql.jdbc.Driver"
        url="jdbc:mysql://192.168.99.100:6603/gamestore"
        username="root" password="gspassword"
        maxActive="100" maxIdle="30" maxWait="10000"
        logAbandoned="true" removeAbandoned="true"
        removeAbandonedTimeout="60" type="javax.sql.DataSource" />
```

### 4.4 Restart the JSP Application
Login as following user.
* User Name: customer
* Password:  customer
* User Type: customer

![MIME Type](/public/pics/2016-09-12/login.png)  

Add some items, console, accessory or game to shopping cart, and place order.
![MIME Type](/public/pics/2016-09-12/cart.png)  

Order is created now.
![MIME Type](/public/pics/2016-09-12/order.png)  
After the above operation, check the data in mysql workbench. You see there is one new order entry in SalesOrder table.
![MIME Type](/public/pics/2016-09-12/after.png)  

## 5. Publish Mysql Container
1) First, check the container id.
```sh
$ docker ps
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                    NAMES
889aa7224b25        mysql               "docker-entrypoint..."   24 hours ago        Up About an hour    0.0.0.0:6603->3306/tcp   gsmysql
```
2) Secondly, create new image based on this container.
```sh
$ docker commit -m "db restored" -a "Johnny" 889aa7224b25 jojozhuang/gamestore-mysql
sha256:3437fd76186fbc0fbf3f60bfb902d19d9a735e77d827c5c424b9e99a1828a824
```
3) Push to Docker Hub
```sh
$ docker login -u jojozhuang
Password:
Login Succeeded
$ docker push jojozhuang/gamestore-mysql
The push refers to a repository [docker.io/jojozhuang/gamestore-mysql]
197bbcc9bad0: Pushed
```
4) Check the new image on Docker Hub
![MIME Type](/public/pics/2016-09-12/dockerhub.png)  
Now, you can use the following command to install this image.
```sh
$ docker pull jojozhuang/gamestore-mysql
```

## 6. Source Code
[Source Code for Game Store Mysql on GitHub](https://github.com/jojozhuang/Portfolio/tree/master/GameStoreMysql)

## 7. References
* [MySQL Docker Containers: Understanding the basics](https://severalnines.com/blog/mysql-docker-containers-understanding-basics)
* [MySQL - Create Database](https://www.tutorialspoint.com/mysql/mysql-create-database.htm)
* [How To Migrate a MySQL Database Between Two Servers](https://www.digitalocean.com/community/tutorials/how-to-migrate-a-mysql-database-between-two-servers)
* [JDBC Driver class not found: com.mysql.jdbc.Driver](https://stackoverflow.com/questions/8779631/jdbc-driver-class-not-found-com-mysql-jdbc-driver)
