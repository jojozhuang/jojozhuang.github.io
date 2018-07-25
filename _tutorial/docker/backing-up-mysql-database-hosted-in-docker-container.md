---
layout: tutorial
key: tutorial
title: "Backing up MySQL Database Hosted in Docker Container"
index: 605
category: docker
image: docker.png
date: 2016-09-16
tags: [MySQL, Docker]
---

> Introduce how to backup MySQL database which is running in container.

## 1. Introduction
In posting [Creating MySQL Image with Docker File]({% link _posts/2016-09-15-creating-mysql-image-with-docker-file.md %}), we created MySQL image `jojozhuang/jspmysql` with Dockerfile, and used this image to run MySQL container. The issue is MySQL image doesn't persist data. Initially, in this MySQL container, there are three rows in table `Product`. If you make some changes(eg. add new product), and create new image based on this container, these changes won't be restored to the new image, they are lost. So each time before creating a new image for MySQL container, we need to backup the database first.

## 2. MySQL Database Backup
### 2.1 General Backup Approaches in MySQL
Some general methods for making backups in MySQL.
* Making Backups with mysqldump
* Making Backups by Copying Table Files
* Making a Hot Backup with MySQL Enterprise Backup
* Making Delimited-Text File Backups
* ...

We will focus on `mysqldump`.  
### 2.2 Dumping Data in SQL Format with mysqldump
Dump all databases and save to file.
```sh
$ mysqldump --all-databases > dump.sql
```
Dump only specific databases and save to file.
```sh
$ mysqldump --databases db1 db2 db3 > dump.sql
```
### 2.3 Using mysqldump for MySQL Container
Dump specific database in container. The format looks as follows.
```sh
$ docker exec CONTAINER /usr/bin/mysqldump -u root --password=PASSWORD DATABASE > backup.sql
```

## 3. Backing up and Restoring
### 3.1 Making Changes
Add one new product, name=iPad, price=399.
![image](/public/tutorials/605/addproduct.png)
Verify that the new product is in the list.
![image](/public/tutorials/605/productlist.png)
### 3.2 Dump Database jsptutorial
Check the container id.
```sh
$ docker ps
CONTAINER ID  IMAGE         COMMAND                CREATED         STATUS         PORTS                   NAMES
f91d97a62086  jspmysql:0.1  "docker-entrypoint..." 28 minutes ago  Up 28 minutes  0.0.0.0:6603->3306/tcp  jspmysql
```
Execute `mysqldump` in docker terminal.
```sh
$ docker exec f91d97a62086 /usr/bin/mysqldump -u root --password=jsppassword jsptutorial > backup.sql
```
Notice `f91d97a62086` is the container id, `jsptutorial` is the database and `backup.sql` is the output file. After running the above command, a new backup.sql file is created.
![image](/public/tutorials/605/mysqldump.png)
### 3.3 Checking the Output File
Notice that new product `(4,'iPad',399)` is added to the sql for restoring table `Product`.
![image](/public/tutorials/605/newsql.png){:width="800px"}
Now you can rename this file to jsp_backup.sql or use it directly in Dockerfile to create MySQL image.
### 3.4 Restoring Data to MySQL Container
You can also restore the data directly to the container. In docker terminal, run the following command.
```sh
$ cat backup.sql | docker exec -i f91d97a62086 /usr/bin/mysql -u root --password=jsppassword jsptutorial
```

## 4. Source Files
* [Source files for JSPTutorialDockerfile on GitHub](https://github.com/jojozhuang/Tutorials/tree/master/JSPTutorialDockerfile)

## 5. References
* [Database Backup Methods](https://dev.mysql.com/doc/refman/5.7/en/backup-methods.html)
* [Dumping Data in SQL Format with mysqldump](https://dev.mysql.com/doc/mysql-backup-excerpt/5.7/en/mysqldump-sql-format.html)
* [ Backup and restore a mysql database from a running Docker mysql container](https://gist.github.com/spalladino/6d981f7b33f6e0afe6bb)
