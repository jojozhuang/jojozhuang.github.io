---
layout: tutorial
key: note
title: "Setup OpenGrok for Buyer"
index: 9203
subcategory: ariba-workspace
date: 2020-06-08
tags: [Ariba]
---

> Setup OpenGrok with Docker.

## 1. OpenGrok
### 1.1 Install Ubuntu 18.04 in VMware Fusion
Go to https://ubuntu.com/download/alternative-downloads, choose specific version, download the iso image file. Follow the instructions in the video https://www.youtube.com/watch?v=b7JyIf8bmL8 to create ubuntu VM.
### 1.2 Installing Docker on Ubuntu
Follow the steps in https://docs.docker.com/engine/install/ubuntu/ to install Docker on Ubuntu VM.

1). Update the apt package index and install packages to allow apt to use a repository over HTTPS:
```sh
$ sudo apt-get update

$ sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg-agent \
    software-properties-common
```
2) Add Docker’s official GPG key:
```sh
$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
```
3) Verify that you now have the key with the fingerprint `9DC8 5822 9FC7 DD38 854A  E2D8 8D81 803C 0EBF CD88`, by searching for the last 8 characters of the fingerprint.
```sh
$ sudo apt-key fingerprint 0EBFCD88
pub   rsa4096 2017-02-22 [SCEA]
      9DC8 5822 9FC7 DD38 854A  E2D8 8D81 803C 0EBF CD88
uid           [ unknown] Docker Release (CE deb) <docker@docker.com>
sub   rsa4096 2017-02-22 [S]
```
4) Use the following command to set up the stable repository.
```sh
$ sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"
 ```
5) Install Docker
```sh
$ sudo apt-get update
$ sudo apt-get install docker-ce docker-ce-cli containerd.io
```
6) Check docker verion to make sure it is successfully installed.
```sh
$ docker -v
Docker version 19.03.10, build 9424aeaee9
```
7) Add user to sudo group
```sh
# change root password
$ sudo passwd root
[sudo] password for johnny:
Enter new UNIX password:
Retype new UNIX password:
passwd: password updated successfully
# add user to sudo group
$ su -
Password:
$ sudo usermod -aG sudo johnny
$ id -nG
johnny adm cdrom sudo dip plugdev lpadmin sambashare vboxsf
```
8) Add user to docker group  
So we can execute the docker commands without sudo.
```sh
$ sudo usermod -aG docker ${USER}  // add the current user(johnny) to the docker group
$ su - ${USER}                     // apply the new group membership
$ id -nG                           // check user is now added to the docker group
johnny adm cdrom sudo dip plugdev lpadmin sambashare docker
```
9) Pull docker image of opengrok. We will use this image, https://hub.docker.com/r/opengrok/docker/.
```sh
$ docker pull opengrok/docker
```
### 1.3 Create Container for Buyer and Platform
Create folders for opengrok
```sh
$ mkdir -p opengrok/buyer-git/src opengrok/buyer-git/data
```
* `src` - Contains your source files.
* `data` - Used by OpenGrok. OpenGrok will generate indexes for the source files and store them here.

Turn off ssl verify.
```sh
$ git config --global http.sslverify false
```
Clone source files from remote GitHub repository.
```sh
$ cd opengrok/buyer-git/src
$ git clone https://github.wdf.sap.corp/Ariba-Ond/Buyer
$ git clone https://github.wdf.sap.corp/Ariba-Ond/platform
```
Create opengrok container.
```sh
$ docker run --name=buyer-git \
    -v ~/opengrok/buyer-git/src:/opengrok/src \
    -v ~/opengrok/buyer-git/data:/opengrok/data \
    -p 31030:8080 \
    opengrok/docker
```
Wait until opengrok finishes the indexing, then we can access http://localhost:31030/source/.
### 1.4 Update Source Code
Use `git pull` to download the latest source codes. Opengrok will re-index them automatically.
```sh
cd ~
cd opengrok/buyer-git/src/Buyer
git pull
cd opengrok/buyer-git/src/platfrom
git pull
```
### 1.4 Production Customization
Create folders for production customization.
```sh
$ mkdir -p opengrok/buyer-cus/src opengrok/buyer-cus/data
```
Check customization files.
```sh
$ ls ~/Downloads/buyer-cus/
AU-SINV-8721-customizations   RU-SINV-8721-customizations
CN-SINV-8721-customizations   UAE-SINV-8721-customizations
EU-SINV-8721-customizations   USA-SINV-8721-customizations
KSA-SINV-8721-customizations
```
Copy all folders and files into src folder.
```sh
$ cp -r ~/Downloads/buyer-cus/* ~/opengrok/buyer-cus/src
```
Create opengrok container.
```sh
$ docker run --name=buyer-cus \
    -v ~/opengrok/buyer-cus/src:/opengrok/src \
    -v ~/opengrok/buyer-cus/data:/opengrok/data \
    -p 31040:8080 \
    opengrok/docker
```
Wait until opengrok finishes the indexing, then we can access http://localhost:31040/source/.
### 1.5 Expose the Services
Expose the service to be accessed externally.

In Ubuntu, install net-tools so we can use `ifconfig`.
```sh
$ sudo apt install net-tools
```
Find the ip address of Ubuntu VM. For example, it is `192.168.244.131`.
```sh
$ ifconfig
```
Then, we can access the opengrok from host with URL http://192.168.244.131:31040/.
### 1.6 Docker Commands
```sh
docker stop buyer-git
docker start buyer-git
docker rm buyer-git

docker exec -it buyer-git bash
docker exec buyer-git /scripts/index.sh
```

## 2. References
* [Install Docker Engine on Ubuntu](https://docs.docker.com/engine/install/ubuntu/)
* [A Docker container for OpenGrok](https://hub.docker.com/r/opengrok/docker/)
