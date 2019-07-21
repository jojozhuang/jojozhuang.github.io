---
layout: tutorial
key: tutorial
title: "Installing MongoDB on Ubuntu and Mac"
index: 2132
subcategory: dev-env
date: 2017-11-08
tags: [MongoDB]
---

> Introduce how to install MongoDB Community Edition on Ubuntu.

## 1. What is MongoDB?
[MongoDB](https://www.mongodb.com) is a cross-platform, document oriented database that provides, high performance, high availability, and easy scalability. Key concepts of MongoDB: Database, Collection and Document.
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
```
![image](/public/images/devops/2132/versionubuntu.png){:width="600px"}  
6) Start MongoDB service and using it with `mongo` command.
```sh
$ sudo service mongod start
$ mongo
>
```
7) Generic Commands
```sh
$ sudo service mongod start       // Start MongoDB
$ sudo service mongod stop        // Stop MongoDB
$ sudo service mongod restart     // Restart MongoDB
```
## 3. Installing MongoDB on macOS with Homebrew
1) Update Homebrew’s package database.
```sh
$ brew update
```
2) Installing MongoDB.
```sh
$ brew install mongodb
```
3) Check MongoDB version.
```sh
$ mongo -version
```
![image](/public/images/devops/2132/versionmac.png){:width="600px"}  
4) Create the data directory.
```sh
$ mkdir -p /data/db
```
5) Start MongoDB service.
```sh
$ sudo mongod
```
6) Open another terminal, launch MongoDB Shell with `mongo` command.
```sh
$ mongo
>
```
## 4. Others
### 4.1 How to clear console in MongoDB?
* Ubuntu: CTRL + L
* macOS:  Command + K

## 5. References
* [MongoDB Official Website](https://www.mongodb.com)
* [MongoDB Overview](https://www.tutorialspoint.com/mongodb/mongodb_overview.htm)
* [Install MongoDB Community Edition on Ubuntu](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/)
* [Install MongoDB Community Edition on macOS](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/)
