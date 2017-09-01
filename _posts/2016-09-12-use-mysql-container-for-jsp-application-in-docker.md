---
layout: post
key: blog
title: "Use Mysql Container for JSP Application in Docker"
date: 2016-09-12
tags: Mysql
categories:
- blog
---

> Introduce how to user Mysql Docker Container as database for JSP Application.

## 1. Setup Mysql Container
### 1.1 Create Mysql Container
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

### 1.2 Run Container in Background
Now, it starts without error. Our MySQL container is now running. However, you are now stuck in the terminal and can’t do anything because the container is running in attach mode (running in foreground). This is so inconvenient. We would expect MySQL to run as a service instead. Let’s consider this as a failed deployment and stop the current container. In another terminal, stop the running container and run it again in detach mode (running as background):
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

### 1.3 Expose Mysql Container to Host
Expose the MySQL container to the outside world by mapping the container’s MySQL port to the host machine port using the publish flag.
```sh
$ docker rm -f gsmysql
$ docker run --detach --name=gsmysql --env="MYSQL_ROOT_PASSWORD=gspassword" --publish 6603:3306 mysql
889aa7224b2544023069559de5bd1f214ddbda9cb327fc3a4771eddc25bb1b7b
```

## 2. Restore Mysql Database in Container
### 2.1 Copy Mysql backup files from host to container
```sh
docker cp ~/GameStore/document/gamestore_orderitem.sql gsmysql:/gamestore_orderitem.sql
docker cp ~/GameStore/document/gamestore_salesorder.sql gsmysql:/gamestore_salesorder.sql
```
Open to container's terminal through Kitematic, click 'EXEC' button on the top.
![MIME Type](/public/pics/2016-09-12/kitematic.png)  

A terminal windows opens for mysql container. Check the files.
![MIME Type](/public/pics/2016-09-12/sqlfile.png)  

### 2.2 Restore Database
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

## 3. Connecting to the Container
### 3.1 Get the Connection URL
In Kitematic, select our mysql container, check Access URL. It's 192.168.99.100:6603.
![MIME Type](/public/pics/2016-09-12/accessurl.png)  

### 3.2 Connect Mysql Container with Mysql Workbench
Go to https://dev.mysql.com/downloads/workbench/, download the installer and install it.
Launch MySql Workbench and add Connection with the IP address and port.
![MIME Type](/public/pics/2016-09-12/newconnection.png)  
Store the password for root to keychain.
![MIME Type](/public/pics/2016-09-12/benchpassword.png)  
Test Connection
![MIME Type](/public/pics/2016-09-12/testconnection.png)  
A new connection is added to the workbench.
![MIME Type](/public/pics/2016-09-12/workbench.png)  
Check the original data.
![MIME Type](/public/pics/2016-09-12/original.png)  

### 3.3 Configure the Connection
Edit file /GameStore/src/web/META-INF/context.xml
```xml
<Resource name="jdbc/murach" auth="Container"
        driverClassName="com.mysql.jdbc.Driver"
        url="jdbc:mysql://192.168.99.100:6603/gamestore"
        username="root" password="gspassword"
        maxActive="100" maxIdle="30" maxWait="10000"
        logAbandoned="true" removeAbandoned="true"
        removeAbandonedTimeout="60" type="javax.sql.DataSource" />
```
### 3.4 Start the JSP Application
Go to https://dev.mysql.com/downloads/connector/j/5.1.html, download Mysql Connector/J.
![MIME Type](/public/pics/2016-09-12/mysqlconnectordownload.png)  
unzip it, and copy mysql-connector-java-5.1.44-bin.jar to /GameStore/src/web/WEB-INF/lib/.

Configure tomcat and start application.
Register a new user. Add some items to cart and place the order. check the Order.
everything looks fine.


After the above operation, check the data in mysql workbench. You see a new order is there.
![MIME Type](/public/pics/2016-09-12/after.png)  

## 5. References
* [MySQL Docker Containers: Understanding the basics](https://severalnines.com/blog/mysql-docker-containers-understanding-basics)
* [MySQL - Create Database](https://www.tutorialspoint.com/mysql/mysql-create-database.htm)
* [How To Migrate a MySQL Database Between Two Servers](https://www.digitalocean.com/community/tutorials/how-to-migrate-a-mysql-database-between-two-servers)
* [JDBC Driver class not found: com.mysql.jdbc.Driver](https://stackoverflow.com/questions/8779631/jdbc-driver-class-not-found-com-mysql-jdbc-driver)
