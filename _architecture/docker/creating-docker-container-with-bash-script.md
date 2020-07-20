---
layout: tutorial
key: architecture
title: "Creating Docker Container with Bash Script[Draft]"
index: 3533
subcategory: docker
date: 2018-04-15
tags: [Docker, Bash]
draft: true
---

> Introduce how to create docker container with bash script.

## 1. GitHub Pages & Jekyll
```raw
#!/bin/bash
# a script that create a docker container
MYPATH=$1

echo "USAGE: script.sh [local_path]"

# check input parameters
if [ -z "$MYPATH" ]; then
    echo "Error: local path is not set"
    exit
fi

# create the path
echo "Insert the path of your volume: $MYPATH"

# pull the image
docker pull pierangelo1982/django

# create a volume
docker volume create --name django-test

# connect the volume to the container for can copy the project folder
docker run --name django-test \
	-v django-test:/code \
	-p 8001:8000 \
	-d pierangelo1982/django

# copy project folders in your host
docker cp django-test:/code $MYPATH

# remove the container
docker rm -f django-test

# recreate the container with the volume that point to our local folder where before we have copy the folders of the project.
docker run --name django-test \
	-v $MYPATH:/code \
	-p 8001:8000 \
	-d pierangelo1982/django
```

run
```raw
bash ./script.sh ~/your/local/path/folder
```

Executing Shell Scripts With NodeJS

## 7. Reference
* [create a django docker container with a bash script](https://medium.com/@pierangelo1982/create-a-django-docker-container-with-a-bash-script-fe425b5f0f85)  
* [Docker with shell script or Makefile](https://ypereirareis.github.io/blog/2015/05/04/docker-with-shell-script-or-makefile/)
* [Executing Shell Scripts With NodeJS](https://tutorialedge.net/javascript/nodejs/executing-shell-scripts-with-nodejs/)
* [Build and Deploy a Java Web Application with Docker and Semaphore](https://semaphoreci.com/community/tutorials/build-and-deploy-a-java-web-application-with-docker-and-semaphore)
