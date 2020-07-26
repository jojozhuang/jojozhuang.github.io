---
layout: tutorial
key: tutorial
title: "Source Code Search with OpenGrok"
index: 9715
subcategory: uncategorized
date: 2018-05-03
tags: [OpenGrok]
---

> Use OpenGrok in docker for search source code.

## 1. OpenGrok
[OpenGrok](https://oracle.github.io/opengrok/) is a fast and usable source code search and cross reference engine, written in Java. It helps you search, cross-reference and navigate your source tree. It can understand various program file formats and version control histories of many source code management systems.

## 2. Docker Image for OpenGrok
You can manually setup OpenGrok from scratch, but it is much easier to use the docker image for OpenGrok. There is one image called '[docker-opengrok](https://hub.docker.com/r/scue/docker-opengrok/)' on Docker Hub.

## 3. Setting up OpenGrok with Docker
### 3.1 Preparing Source Code
Create two directories in local disk.
```raw
$ mkdir -p /opengrok/src /opengrok/data
```
* `src` - Contains your source files.
* `data` - Used by OpenGrok. OpenGrok will generate indexes for the source files and store them here.

Download source code from GitHub to 'src' folder. Here, I cloned my three repositories.
```raw
$ cd /opengrok/src
$ git clone https://github.com/jojozhuang/Algorithm
$ git clone https://github.com/jojozhuang/Portfolio
$ git clone https://github.com/jojozhuang/Tutorials
```
Check directories/files.
```raw
Johnny@Johnny-Mac:~$ ls -all
total 0
drwxr-xr-x   5 Johnny  1694527156   160 May 03 21:34 .
drwxr-xr-x   5 Johnny  1694527156   160 May 03 21:20 ..
drwxr-xr-x  12 Johnny  1694527156   384 May 03 21:31 Algorithm
drwxr-xr-x  24 Johnny  1694527156   768 May 03 21:34 Portfolio
drwxr-xr-x  59 Johnny  1694527156  1888 May 03 21:10 Tutorials
```
### 3.2 Installing Image and Running Container
Pull the OpenGrok docker image.
```raw
$ docker pull opengrok/docker
```
Run a Docker container and mount these two directories: src and data; this will automatically run indexing as a part of startup.
```raw
$ docker run --name=opengrok-git -v /opengrok/src:/src -v /opengrok/data:/data -p 31030:8080 opengrok/docker
```
Later, you can use the following commands to start and stop the container.
```raw
$ docker start opengrok-git
$ docker stop opengrok-git
```
Use the following command to check logs.
```raw
$ docker logs opengrok-git
```
### 3.3 Issues
Sometimes, the opengrok indexer stops working, and you see the following message in the logs.
```raw
Indexer still locked, skipping indexing
```
This is because of the locker check, see here https://github.com/OpenGrok/docker/blob/master/scripts/index.sh.
```sh
#!/bin/bash

LOCKFILE=/var/run/opengrok-indexer
URI="http://localhost:8080"

if [ -f "$LOCKFILE" ]; then
	date +"%F %T Indexer still locked, skipping indexing"
	exit 1
fi
...
```
This issues occurs especially when indexing stops unexpectedly. The solution is to get inside the container and delete the file `/var/run/opengrok-indexer`.
```raw
$ docker exec -it opengrok-git bash
rm /var/run/opengrok-indexer
```
When the next time indexing happens, you won't see this error, and indexer should start working again.
## 4. Searching Code
The OpenGrok application will now be running on http://192.168.99.100:31030/source/. Notice, we have three projects as we cloned three repositories into the 'src' folder.
![image](/assets/images/uncategorized/9715/homepage.png)

Search 'trie' in algorithm, all the questions related to trie are displayed.
![image](/assets/images/uncategorized/9715/searchalgorithm.png)
Search 'course player' in portfolio, all my portfolios related to 'course player' are displayed.
![image](/assets/images/uncategorized/9715/searchportfolio.png)
Search 'docker' in tutorials, all my tutorials related to 'docker' are displayed.
![image](/assets/images/uncategorized/9715/searchtutorials.png)

## 5. References
* [OpenGrok: An Indexing Service for Your Development Code](https://dzone.com/articles/development-teams-personal-google)
* [OpenGrok on GitHub](https://github.com/oracle/opengrok)
* [Docker run reference](https://docs.docker.com/engine/reference/run/#general-form)
* [A Docker container for OpenGrok](https://hub.docker.com/r/opengrok/docker/)
