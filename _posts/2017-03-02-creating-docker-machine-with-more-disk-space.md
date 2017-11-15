---
layout: post
key: blog
title: "Creating Docker Machine with More Disk Space"
date: 2017-03-02
tags: [Docker]
---

> Create new Docker Machine with more disk space.

## 1. Introduction
When I try to install the image of `SQL Server for Linux` in Kitematic, error occurs as follows.
```sh
failed to register layer: Error processing tar file(exit status 1): write /opt/mssql/lib/system.common.sfp: no space left on device
```
![MIME Type](/public/pics/2017-03-02/error.png)

## 2. Cause
The cause is obvious - disk in docker machine is out of space.
### 2.1 Check Storage of Virtual Machine
In VirtualBox, select the `default` VM, then Settings -> Storage. You see the virtual size is 19.53GB. This VM is initially created when we installing the Docker Toolbox.
![MIME Type](/public/pics/2017-03-02/vmstorageold.png){:width="600px"}  
### 2.2 Check Disk Space of Docker Machine
The docker machine is actually hosted by the `default` virtual machine. In terminal, SSH into docker VM.
```sh
$ docker-machine ssh default
```
Inside the docker VM, run `df -h` or `df -i` to get an overview of the disk space.
```sh
docker@default:~$ df -h
```
![MIME Type](/public/pics/2017-03-02/diskspaceold.png){:width="700px"}  
### 2.3 Solution
Now we are running out of space in the Docker machine, we will need to delete some Docker images and containers. This is just a workaround solution.

The better way is to have more storage for our docker machine. Unfortunately, there is no easy way to increase the disk space for our existing docker machine. Instead, we have to create a new docker machine with more space. Since Kitematic doesn't support change the docker machine, it always connecting to the VM named 'default'. We have to delete the old one and create a VM with the same name 'default'.

## 3. Re-creating Docker Machine
`Warning: The operations below will destroy all docker images and container in 'default' VM. Backup them before proceeding!!!`
### 3.1 Cloning Virtual Machine
Clone the current default VM in case we need to restore the docker machine with it.
### 3.2 Deleting Virtual Machine
In VirtualBox, delete the 'default' VM.
![MIME Type](/public/pics/2017-03-02/deletevm.png){:width="800px"}  
### 3.3 Deleting Docker Machine
Check all existing docker machines.
```sh
$ docker-machine ls
```
![MIME Type](/public/pics/2017-03-02/dockermachine.png)

Delete the docker machine named `default`.
```sh
$ docker-machine rm default
```
![MIME Type](/public/pics/2017-03-02/deletedockermachine.png)

### 3.4 Creating New Docker Machine
Create a new docker machine with name=`default`, memory size=`8GB` and disk size=`100GB`.
```sh
$ docker-machine -D create -d virtualbox --virtualbox-memory 8096 --virtualbox-disk-size "100000" default
```
Check in VirtualBox, a new default VM is created. Notice that the storage of it is changed to `97.66`GB.
![MIME Type](/public/pics/2017-03-02/vmnew.png){:width="800px"}  
Open Kitematic, docker machine is back.
![MIME Type](/public/pics/2017-03-02/kitematic.png)
Check the disk space of the new docker machine, now it has 88GB free space.
![MIME Type](/public/pics/2017-03-02/diskspacenew.png){:width="700px"}  

## 4. References
* [Managing disk space in your Docker VM](http://support.divio.com/local-development/docker/managing-disk-space-in-your-docker-vm)
* [Docker Machine: No space left on device](https://stackoverflow.com/questions/31909979/docker-machine-no-space-left-on-device)
* [Docker for Mac vs. Docker Toolbox](https://docs.docker.com/docker-for-mac/docker-toolbox/#the-docker-for-mac-environment)
