---
layout: tutorial
key: note
title: "Notes for Ariba"
index: 9021
subcategory: my-space
date: 2020-05-30
tags: [Ariba]
---

> OpenGrok
## 1. Buyer Build

## 2. GitHub
Config user name, email and remote url.
```sh
git config --list  
git config user.name "Rong Zhuang"
git config user.email "r.zhuang@sap.com"
git config remote.origin.url "https://github.wdf.sap.corp/Ariba-Ond/Buyer.git"
```

Generate new ssh key, check https://help.github.com/articles/connecting-to-github-with-ssh/.
```sh
$ ssh-keygen -t rsa -b 4096 -C "r.zhuang@sap.com"
```
When you're prompted to "Enter a file in which to save the key," press Enter. This accepts the default file location.
```sh
> Enter a file in which to save the key (/Users/you/.ssh/id_rsa): [Press enter]
```
Passphrase:001266

//TODO: local2333
```sh
git remote set-url origin git@github.com:jojozhuang/text-compare-angular.git

ssh-keygen -t rsa -b 4096 -C "jojozhuang@gmail.com"
mv jojozhuang_github_rsa ~/.ssh
mv jojozhuang_github_rsa.pub ~/.ssh

open ~/.ssh/config
Host *
  AddKeysToAgent yes
  UseKeychain yes
  IdentityFile ~/.ssh/id_rsa

Host *
  AddKeysToAgent yes
  UseKeychain yes
  IdentityFile ~/.ssh/jojozhuang_github_rsa

ssh-add -K ~/.ssh/jojozhuang_github_rsa

pbcopy < ~/.ssh/jojozhuang_github_rsa.pub

```


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
7) Executing the Docker Command Without Sudo
```sh
$ sudo usermod -aG docker ${USER}  // add the current user(johnny) to the docker group
$ su - ${USER}                     // apply the new group membership
$ id -nG                           // check user is now added to the docker group
johnny adm cdrom sudo dip plugdev lpadmin sambashare docker
```
8) Pull docker image of opengrok.
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

## 3. References
* [Install Docker Engine on Ubuntu](https://docs.docker.com/engine/install/ubuntu/)
