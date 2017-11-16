---
layout: post
key: blog
title: "Installing Microsoft SQL Server in Docker"
date: 2017-03-05
tags: [SQL Server, Docker]
---

> Introduce how to create Microsoft SQL Server in Docker.

## 1. What is SQL Server?
SQL Server is a relational database management system (RDBMS) developed by Microsoft. SQL Server is originally released on Windows platform. Recently, Microsoft released linux version. In this tutorial, I will use docker to install SQL Server for Linux. Thus, we can use it on Mac.

## 2. Prerequisite
### 2.1 Installing Docker and Kitematic
If you haven’t installed Docker and Kitematic, please install Docker Toolbox by referring to another posting [Install Docker Toolbox and Kitematic on Mac]({% link _posts/2016-09-11-installing-docker-toolbox-and-kitematic-on-mac.md %}).
### 2.2 Docker Machine with Large Storage
The SQL Server container requires at least 3.25 GB of RAM and large storage. If your default docker machine is not able to install it, you need to create a new docker machine. For more details, refer to [Creating Docker Machine with More Disk Space]({% link _posts/2017-03-02-creating-docker-machine-with-more-disk-space.md %}).

## 3. Creating SQL Server Container in Kitematic
### 3.1 Creating SQL Server Container
Search `mssql-server-linux` in Kitematic, select the official image, and click Create button.
![MIME Type](/public/pics/2017-03-05/dockersearch.png)
SQL Server for Linux image will be downloaded and a container will be created and running.
![MIME Type](/public/pics/2017-03-05/installing.png)
The installation will take several minutes. Finally, the container is created. However, it is stopped. There are some configurations we have to set before using it.
![MIME Type](/public/pics/2017-03-05/containercreated.png)
### 3.2 Add Environment Variables
Switch to Settings tab, add two environment variables, accept the license and create a password.
* ACCEPT_EULA=Y
* MSSQL_SA_PASSWORD=Abc%123456789

![MIME Type](/public/pics/2017-03-05/env.png)
### 3.3 Start an interactive bash shell
Click the 'EXEC' button to start a terminal.
![MIME Type](/public/pics/2017-03-05/exec.png)
Terminal is running.
![MIME Type](/public/pics/2017-03-05/terminalmssql.png){:width="600px"}  

## 4. Creating SQL Server Container in Command Line
### 4.1 Creating SQL Server Container
Download mssql-server-linux image and create container based on it.
```sh
$ docker pull microsoft/mssql-server-linux
$ docker run -e 'ACCEPT_EULA=Y' -e 'MSSQL_SA_PASSWORD=Abc%123456789' -p 1401:1433 --name mssql -d microsoft/mssql-server-linux
```
Check the running containers.
```sh
$ docker ps -a
```
![MIME Type](/public/pics/2017-03-05/createcontainer.png)
If the container is not launched properly, check logs with following command.
```sh
$ docker logs <containerid>
```
![MIME Type](/public/pics/2017-03-05/containercreated2.png)
### 4.2 Start an interactive bash shell
start an interactive bash shell
```sh
docker exec -it mssql "bash"
```
![MIME Type](/public/pics/2017-03-05/terminalmssql2.png){:width="600px"}  

## 5. Using SQL Server
### 5.1 Connecting SQL Server
Inside the container, connect SQL Server locally with `sqlcmd`.
```sh
$ /opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P 'Abc%123456789'
```
### 5.2 Creating Database
```sh
CREATE DATABASE TestDB
SELECT Name from sys.Databases
GO
```
![MIME Type](/public/pics/2017-03-05/createdb.png){:width="600px"}  
### 5.3 Creating Table and Inserting Data
```sh
USE TestDB
CREATE TABLE Inventory (id INT, name NVARCHAR(50), quantity INT)
INSERT INTO Inventory VALUES (1, 'banana', 150); INSERT INTO Inventory VALUES (2, 'orange', 154);
GO
```
![MIME Type](/public/pics/2017-03-05/createtable.png){:width="600px"}  
### 5.4 Querying Data
```sh
SELECT * FROM Inventory WHERE quantity > 152;
GO
```
![MIME Type](/public/pics/2017-03-05/selectdata.png){:width="600px"}  

## 6. Using SQL Client Tool
### 6.1 Getting SQL Developer
Go to http://www.oracle.com/technetwork/developer-tools/sql-developer/downloads/index.html, download SQL Developer for Mac OSX. Decompress the zip file, there is only one file named `SQLDeveloper`.
### 6.2 Getting Plugin File
Go to https://sourceforge.net/projects/jtds/files/, downland `jtds-1.3.1-dist.zip`. It is a plugin module for SQL Server and Sybase JDBC. Extract `jtds-1.3.1.jar` from the package file.
### 6.3 Add Plugin to SQL Developer
Launch SQL Developer, go to -> Preferences -> Database -> Third-party JDBC Drivers, add the jar file.
![MIME Type](/public/pics/2017-03-05/addjtds.png){:width="800px"}  
### 6.4 Create Connection
In SQL Developer, New Connection.., provide the password, host and port used above. Test and Connect.
![MIME Type](/public/pics/2017-03-05/createconnection.png){:width="800px"}  
You will see the database and table we created previously.
![MIME Type](/public/pics/2017-03-05/sqldeveloper.png)
### 6.5 Running Query
Right-click on the `TestDB` database, and click `Select Default Database`.
![MIME Type](/public/pics/2017-03-05/defaultdatabase.png){:width="300px"}  
Then, apply.
![MIME Type](/public/pics/2017-03-05/apply.png){:width="350px"}  
In the worksheet, input the following query and run. You will see the result.
```sh
SELECT * FROM Inventory;
```
![MIME Type](/public/pics/2017-03-05/runquery.png)

## 7. References
* [SQL Server at Microsoft](https://www.microsoft.com/en-us/sql-server/)
* [MS SQL Server Tutorial](https://www.tutorialspoint.com/ms_sql_server/)
* [mssql-server-linux on Docker Hub](https://hub.docker.com/r/microsoft/mssql-server-linux/)
* [Installation guidance for SQL Server on Linux](https://docs.microsoft.com/en-us/sql/linux/sql-server-linux-setup)
* [Run the SQL Server 2017 container image with Docker](https://docs.microsoft.com/en-us/sql/linux/quickstart-install-connect-docker)
* [SQL Client for Mac OS X that works with MS SQL Server](https://stackoverflow.com/questions/3452/sql-client-for-mac-os-x-that-works-with-ms-sql-server)
