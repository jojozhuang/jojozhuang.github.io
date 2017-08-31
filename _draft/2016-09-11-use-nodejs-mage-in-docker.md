---
layout: post
key: blog
title: "Use Node.js Image in Docker"
date: 2016-09-10
tags: Node.js
categories:
- blog
---

> Introduce how to install and use docker.

## 1. What is Docker?
Docker is a container management service. The keywords of Docker are develop, ship and run anywhere. The whole idea of Docker is for developers to easily develop applications, ship them into containers which can then be deployed anywhere.

Key concepts of Docker: Image, Container and Docker Hub.

## 1.1 Image
In Docker, everything is based on Images. An image is a combination of a file system, tools and configurations.

## 1.2 Container
Containers are instances of Docker images that can be run using the Docker run command. The basic purpose of Docker is to run containers.

## 1.3 Docker Hub
Docker Hub is a registry service on the cloud that allows you to download Docker images that are built by other communities. You can also upload your own Docker built images to Docker hub.

Go to https://hub.docker.com/ to create a Docker ID. Then login.
![MIME Type](/public/pics/2016-09-10/hub.png)  

## 2. Install Docker on Ubuntu
First, add the GPG key for the official Docker repository to the system:
```sh
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
```

Add the Docker repository to APT sources:
```sh
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
```

Next, update the package database with the Docker packages from the newly added repo:
```sh
sudo apt-get update
```
Make sure you are about to install from the Docker repo instead of the default Ubuntu 16.04 repo:
```sh
apt-cache policy docker-ce
```

install Docker:
```sh
sudo apt-get install -y docker-ce
```
Docker should now be installed, the daemon started, and the process enabled to start on boot. Check that it's running:
```sh
sudo systemctl status docker
```

## 3. Executing the Docker Command Without Sudo (Optional)
```sh
$ sudo usermod -aG docker ${USER}
$ su - ${USER}
$ id -nG
```

## 4. Using the Docker Command
```sh
docker version
docker info
docker search ubuntu
docker pull ubuntu
docker run ubuntu
docker images
```

Get the access to shell of the ubuntu image
```sh
docker run -it ubuntu
```

## 5. Create New Image
Syntax
```sh
docker commit -m "What did you do to the image" -a "Author Name" container-id repository/new_image_name
```
Example
```sh
docker commit -m "added node.js" -a "Sunday Ogwu-Chinuwa" d9b100f2f636 finid/ubuntu-nodejs
```

Check the new image is created
```sh
docker images
```

In addition, you can use Dockerfile to create new images.

delete image
```sh
docker rmi image_name
```
## 6. containers
list all active docker containers.
```sh
docker ps
docker ps -a
```

Stopping a running or active container is as simple as typing:
```sh
docker stop container-id
```

## 7. Pushing Docker Images to a Docker Repository
1. Register new account at [Docker Hub](https://hub.docker.com/).

2. login to docker hub with user name and password
```sh
docker login -u docker-registry-username
```

3.



You can build linux installer through docker image. Or test the application in Docker containers created in Kitematic.
Go to https://www.docker.com/products/docker-toolbox, Download Docker Toolbox.


## 7. References
* [https://www.docker.com/](https://www.docker.com/)
* [Docker Overview](https://www.tutorialspoint.com/docker/docker_overview.htm)
* [How To Install and Use Docker on Ubuntu 16.04](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-16-04)
