---
layout: tutorial
key: architecture
title: "Installing Microsoft SQL Server in Docker"
index: 3532
subcategory: docker
date: 2017-11-16
tags: [SQL Server, Docker]
---

> Create Microsoft SQL Server container in Docker and use Oracle SQL Developer as client tool.

## 1. What is SQL Server?
SQL Server is a relational database management system (RDBMS) developed by Microsoft. SQL Server is originally released to Windows platform. Recently, Microsoft released the linux version. In this tutorial, we will use docker to install SQL Server for Linux. Thus, we can use it on Mac.

## 2. Prerequisite
### 2.1 Docker Machine with Large Storage
The SQL Server container requires at least 3.25 GB of RAM and large storage. If you are unable to install it because of the 'no space left on device' error, you have to create a new docker machine with large storage assigned. For more details, refer to [Creating Docker Machine with More Disk Space]({% link _architecture/docker/creating-docker-machine-with-more-disk-space.md %}).

## 3. Creating SQL Server Container in Kitematic
### 3.1 Creating SQL Server Container
Search `mssql-server-linux`(Released by Microsoft) in Kitematic, click Create button.
![image](/assets/images/architecture/3532/dockersearch.png)  
Kitematic will start to download the image and create container for it.
![image](/assets/images/architecture/3532/installing.png)  
The installation takes several minutes. Finally, the container is created but it's in 'stopped' status. We have to make some changes before using it.
![image](/assets/images/architecture/3532/containercreated.png)  
### 3.2 Environment Variables
Switch to Settings tab, add two environment variables. Accept the license by setting ACCEPT_EULA to Y. And create password for default user `sa`.
* ACCEPT_EULA=Y
* MSSQL_SA_PASSWORD=Abc%123456789

![image](/assets/images/architecture/3532/env.png)
### 3.3 Interactive Shell
Click the 'EXEC' button to start an interactive shell.
![image](/assets/images/architecture/3532/exec.png)
Now, we are in the bash shell for sql server.
![image](/assets/images/architecture/3532/terminalmssql.png){:width="600px"}  

## 4. Creating SQL Server Container in Command Line
### 4.1 Creating SQL Server Container
Download mssql-server-linux image and create container for it.
```raw
$ docker pull microsoft/mssql-server-linux
$ docker run -e 'ACCEPT_EULA=Y' -e 'MSSQL_SA_PASSWORD=Abc%123456789' -p 1401:1433 --name mssql -d microsoft/mssql-server-linux
```
What is this command doing?

* Create a mssql-server-linux container named mssql.
* Set environment variable ACCEPT_EULA to Y.
* Set environment variable MSSQL_SA_PASSWORD to Abc%123456789.
* Expose 1433 and map to 1401 for outside world to connect to this SQL Server database.

Check the running containers with following command.
```raw
$ docker ps -a
```
![image](/assets/images/architecture/3532/createcontainer.png)  
In Kitematic, we also see a new container.
![image](/assets/images/architecture/3532/containercreated2.png)  
If the container is not launched properly, check logs with following command to get some clues.
```raw
$ docker logs <containerid>
```
### 4.2 Interactive Shell
Start an interactive bash shell with following command.
```raw
docker exec -it mssql "bash"
```
![image](/assets/images/architecture/3532/terminalmssql2.png){:width="600px"}  

## 5. Using SQL Server
### 5.1 Connecting SQL Server
Inside the interactive shell, connect SQL Server locally with `sqlcmd`.
```raw
$ /opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P 'Abc%123456789'
```
### 5.2 Creating Database
Run the following sql script to create new database named `TestDB`.
```sql
CREATE DATABASE TestDB
SELECT Name from sys.Databases
GO
```
![image](/assets/images/architecture/3532/createdb.png){:width="600px"}  
### 5.3 Creating Table and Inserting Data
Run the following sql script to create new table named `Inventory`, and create two rows for it.
```sql
USE TestDB
CREATE TABLE Inventory (id INT, name NVARCHAR(50), quantity INT)
INSERT INTO Inventory VALUES (1, 'banana', 150); INSERT INTO Inventory VALUES (2, 'orange', 154);
GO
```
![image](/assets/images/architecture/3532/createtable.png){:width="600px"}  
### 5.4 Querying Data
Run the following sql script to find rows whose quantity is larger than 152.
```sql
SELECT * FROM Inventory WHERE quantity > 152;
GO
```
![image](/assets/images/architecture/3532/selectdata.png){:width="600px"}  

## 6. SQL Client Tool
It's more convenient to use UI client tool to manipulate database.
### 6.1 Getting Oracle SQL Developer
Go to http://www.oracle.com/technetwork/developer-tools/sql-developer/downloads/index.html, download SQL Developer for Mac OSX. Unzip the package file, there is only one file named `SQLDeveloper`.
### 6.2 Getting Plugin File
Go to https://sourceforge.net/projects/jtds/files/, downland `jtds-1.3.1-dist.zip`. Extract `jtds-1.3.1.jar` from the package file. It is a plugin module for SQL Server and Sybase JDBC.
### 6.3 Importing Plugin to SQL Developer
Launch SQL Developer, go to -> Preferences -> Database -> Third-party JDBC Drivers, add the jar file.
![image](/assets/images/architecture/3532/addjtds.png){:width="800px"}  
### 6.4 Creating Connection
In SQL Developer, New Connection.., provide the user, password, host and port mentioned when we create the SQL Server container. Test and Connect.
![image](/assets/images/architecture/3532/createconnection.png){:width="800px"}  
Connection is created. After expanding the nodes by level, you will see the database and table we created through bash shell.
![image](/assets/images/architecture/3532/sqldeveloper.png)
### 6.5 Running Query
Right-click on the `TestDB` database, and choose `Select Default Database`.
![image](/assets/images/architecture/3532/defaultdatabase.png){:width="300px"}  
Then, apply.
![image](/assets/images/architecture/3532/apply.png){:width="350px"}  
In the worksheet, input the following sql script and run. You will see all rows in table `Inventory`.
```sql
SELECT * FROM Inventory;
```
![image](/assets/images/architecture/3532/runquery.png)

## 7. Others
### 7.1 Restoring Database with Backup File
The following command copies the backup file named `ShoeStore.bak` to the root directory of SQLServer container named `mssql`.
```raw
$ docker cp ShoeStore.bak mssql:/ShoeStore.bak
```

Go to interactive bash shell and connect to SQL Server.
```raw
$ docker exec -it mssql "bash"
$ /opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P 'Abc%123456789'
```

Use the following sql script to restore the database.
```raw
RESTORE DATABASE ShoeStore
FROM DISK = '/ShoeStore.bak'
WITH MOVE 'ShoeStore' TO '/var/opt/mssql/data/ShoeStore.mdf',
MOVE 'ShoeStore_Log' TO '/var/opt/mssql/data/ShoeStore_Log.ldf'
GO
```
For .Net Applications, the connectionString looks like below. `1401` is the port number.
```xml
<add name="EFDbContext" connectionString="server=192.168.99.100,1401;database=ShoeStore;uid=sa;pwd=Abc%123456789;MultipleActiveResultSets=true;" providerName="System.Data.SqlClient" />
```

## 8. References
* [SQL Server at Microsoft](https://www.microsoft.com/en-us/sql-server/)
* [MS SQL Server Tutorial](https://www.tutorialspoint.com/ms_sql_server/)
* [mssql-server-linux on Docker Hub](https://hub.docker.com/r/microsoft/mssql-server-linux/)
* [Installation guidance for SQL Server on Linux](https://docs.microsoft.com/en-us/sql/linux/sql-server-linux-setup)
* [Run the SQL Server 2017 container image with Docker](https://docs.microsoft.com/en-us/sql/linux/quickstart-install-connect-docker)
* [SQL Client for Mac OS X that works with MS SQL Server](https://stackoverflow.com/questions/3452/sql-client-for-mac-os-x-that-works-with-ms-sql-server)
* [Migrate a SQL Server database from Windows to Linux using backup and restore](https://docs.microsoft.com/en-us/sql/linux/sql-server-linux-migrate-restore-database)
