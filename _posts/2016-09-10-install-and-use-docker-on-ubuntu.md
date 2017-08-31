---
layout: post
key: blog
title: "Install and Use Docker on Ubuntu"
date: 2016-09-10
tags: Docker, Docker Hub
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

Go to https://hub.docker.com/ to create a Docker ID. Then login, you will see currently, there is no repository/image. We will create later.
![MIME Type](/public/pics/2016-09-10/hub.png)  

## 2. Install Docker on Ubuntu
1) add the GPG key for the official Docker repository to the system:
```sh
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
```
2) Add the Docker repository to APT sources:
```sh
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
```
3) Update the package database with the Docker packages from the newly added repo:
```sh
sudo apt-get update
```
4) Make sure you are about to install from the Docker repo instead of the default Ubuntu 16.04 repo:
```sh
apt-cache policy docker-ce
```
5) Install Docker:
```sh
sudo apt-get install -y docker-ce
```
6) Check Docker is Running:
```sh
sudo systemctl status docker
```

## 3. Executing the Docker Command Without Sudo (Optional)
By default, running the docker command requires root privileges — that is, you have to prefix the command with sudo. It can also be run by a user in the docker group, which is automatically created during the installation of Docker. If you attempt to run the docker command without prefixing it with sudo or without being in the docker group, you'll get an output like this:
```sh
$ sudo usermod -aG docker ${USER}  // add the current user to the docker group
$ sudo usermod -aG docker username // add a particular user to the docker group
$ su - ${USER}                     // apply the new group membership
$ id -nG                           // check user is now added to the docker group
```

## 4. Using the Docker Commands
Syntax
```sh
$ docker [option] [command] [arguments]
```

## 4.1 General Docker Commands
```sh
docker version        // check version
docker info           // check system-wide information about Docker
docker search ubuntu  // search image which is named 'ubuntu' from Docker Hub
docker pull ubuntu    // download image from Docker Hub to local
```

## 4.2 Commands for Images:
```sh
docker images         // list images
docker rmi image_name // delete image by name
docker rmi image_id   // delete image by id
```

## 4.3 Commands for Containers
```sh
docker ps                      // list all active docker containers
docker ps -a                   // list all docker containers
docker run ubuntu              // run a container with the selected image
docker run -it ubuntu          // run a container with the selected image, and access the interactive shell
docker stop container-id       // stop a running or active container
docker stop $(docker ps -a -q) // stop all of Docker containers
docker rm $(docker ps -a -q)   // remove all of Docker containers
```

## 5. Create New Image
I will use the ubuntu image to install node.js on it, then create new image for the container.
## 5.1 Install Node.js in container
First, check the current images
```sh
docker images
```
![MIME Type](/public/pics/2016-09-10/images1.png)  

Run container and go to the shell
```sh
docker run -it ubuntu
```
![MIME Type](/public/pics/2016-09-10/shell.png)  

Install nodejs in the container.
```sh
$ root@7f5bdefef7ef:/# apt-get update
$ root@7f5bdefef7ef:/# apt-get install -y nodejs
$ root@7f5bdefef7ef:/# nodejs -v
```
Check the version to make sure the installation is finished.
![MIME Type](/public/pics/2016-09-10/installnodejs.png)  

## 5.2 Run Container for Ubuntu Image
First, type exit to quit the container. Then check the container id.
```sh
$ docker ps -a
```
You see there is only one container is running.
![MIME Type](/public/pics/2016-09-10/checkcontainer.png)  

We are ready to create our own image.
Syntax of create new image
```sh
$ docker commit -m "What did you do to the image" -a "Author Name" container-id repository/new_image_name
```

Type the following command to create the new image. Note 'jojozhuang' is my Docker ID which is used to log into Docker Hub.
```sh
$ docker commit -m "added node.js" -a "Johnny" 7f5bdefef7ef jojozhuang/ubuntu-nodejs
```

Check the new image is created
```sh
$ docker images
```
A new image named jojozhuang/ubuntu-nodejs is created. See the size of the new image is bigger than the original ubuntu images, because we install node.js into it.
![MIME Type](/public/pics/2016-09-10/createimage.png)  

In addition, you can use Dockerfile to create new images.


## 6. Pushing Docker Images to a Docker Repository
## 6.1 login to docker hub with user name and password
Syntax
```sh
docker login -u username
```
Type command as follows, then input password.
```sh
docker login -u jojozhuang
```
![MIME Type](/public/pics/2016-09-10/login.png)  

## 6.2 Push the image to Docker Hub
Syntax
```sh
docker push docker-registry-username/docker-image-name
```

```sh
docker push jojozhuang/ubuntu-nodejs
```
The uploading is under progress.
![MIME Type](/public/pics/2016-09-10/push.png)  
When the push is finished.
![MIME Type](/public/pics/2016-09-10/pushfinished.png)  

## 6.3 Check The New Image in Docker Hub
![MIME Type](/public/pics/2016-09-10/newimageonhub1.png)  
Now, you can pull this image from Docker Hub.
```sh
docker pull jojozhuang/ubuntu-nodejs
```
![MIME Type](/public/pics/2016-09-10/newimageonhub2.png)  

## 7. Pull Image From Docker Hub to Local on Mac
Launch Docker Terminal on Mac, run the following command to pull the new image to local.
```sh
docker pull jojozhuang/ubuntu-nodejs
```
Run container and go to the shell
```sh
docker run -it jojozhuang/ubuntu-nodejs
```
Check the nodejs version. Yes, it's our image
```sh
nodejs -v
```
![MIME Type](/public/pics/2016-09-10/pull.png)  


## 8. References
* [https://www.docker.com/](https://www.docker.com/)
* [Docker Overview](https://www.tutorialspoint.com/docker/docker_overview.htm)
* [How To Install and Use Docker on Ubuntu 16.04](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-16-04)
