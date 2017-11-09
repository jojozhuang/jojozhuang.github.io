---
layout: post
key: blog
title: "Installing MongoDB on Ubuntu"
date: 2016-11-20
tags: [MongoDB]
---

> Introduce how to install MongoDB Community Edition on Ubuntu.

## 1. What is MongoDB?
[MongoDB](https://www.mongodb.com) is a cross-platform, document oriented database that provides, high performance, high availability, and easy scalability. MongoDB works on concept of collection and document.

Key concepts of Docker: Database, Collection and Document.
### 1.1 Database
Database is a physical container for collections. Each database gets its own set of files on the file system. A single MongoDB server typically has multiple databases.
### 1.2 Collection
Collection is a group of MongoDB documents. It is the equivalent of an RDBMS table. A collection exists within a single database. Collections do not enforce a schema. Documents within a collection can have different fields. Typically, all documents in a collection are of similar or related purpose.
### 1.3 Document
A document is a set of key-value pairs. Documents have dynamic schema. Dynamic schema means that documents in the same collection do not need to have the same set of fields or structure, and common fields in a collection's documents may hold different types of data.

## 2. Installing MongoDB on Ubuntu
1) Import the MongoDB public GPG Key.
```sh
$ sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6
```
2) Create a list file for MongoDB.
```sh
$ echo "deb [ arch=amd64,arm64 ] http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list
```
3) Reload local package database.
```sh
$ sudo apt-get update
```
4) Install the MongoDB packages.
```sh
$ sudo apt-get install -y mongodb-org
```
5) Check MongoDB version.
```sh
$ mongo -version
MongoDB shell version v3.4.10
git version: 078f28920cb24de0dd479b5ea6c66c644f6326e9
OpenSSL version: OpenSSL 1.0.2g  1 Mar 2016
allocator: tcmalloc
modules: none
build environment:
    distmod: ubuntu1604
    distarch: x86_64
    target_arch: x86_64
```
![MIME Type](/public/pics/2016-11-20/checkversion.png){:width="600px"}  
6) Start MongoDB service.
```sh
$ sudo service mongod start
[sudo] password for johnny:
$ mongo
MongoDB shell version v3.4.10
connecting to: mongodb://127.0.0.1:27017
MongoDB server version: 3.4.10
Welcome to the MongoDB shell.
For interactive help, type "help".
For more comprehensive documentation, see
    http://docs.mongodb.org/
Questions? Try the support group
    http://groups.google.com/group/mongodb-user
>
```

## 3. Generic Commands
```sh
$ sudo service mongod start       // Start MongoDB
$ sudo service mongod stop        // Stop MongoDB
$ sudo service mongod restart     // Restart MongoDB
```

## 4. References
* [MongoDB Official Website](https://www.mongodb.com)
* [MongoDB Overview](https://www.tutorialspoint.com/mongodb/mongodb_overview.htm)
* [Install MongoDB Community Edition on Ubuntu](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/)
