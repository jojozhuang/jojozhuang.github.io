---
layout: tutorial
key: tutorial
title: "Creating Docker Machine with More Disk Space"
index: 3131
category: docker
breadcrumb: [Tutorial, Distributed System, Docker]
image: docker.png
date: 2018-04-11
postdate: 2017-11-15
tags: [Docker Machine, Docker]
---

> Create new Docker Machine with more memory and disk space assigned.

## 1. Introduction
When trying to install the image of `mssql-server-linux`(Official SQL Server image from Microsoft) in Kitematic, I got the following error.
```sh
failed to register layer: Error processing tar file(exit status 1): write /opt/mssql/lib/system.common.sfp: no space left on device
```
![image](/public/images/devops/3131/error.png)

## 2. Diagnosis
The cause is obvious - disk in docker machine is out of space.
### 2.1 Storage of Virtual Machine
In VirtualBox, you see the VM named `default`. It was initially created when we install the Docker Toolbox. The storage size is 19.53GB.
![image](/public/images/devops/3131/vmstorageold.png){:width="800px"}  
You can also check this size by selecting the `default` VM, then Settings -> Storage.
![image](/public/images/devops/3131/vmstorageold2.png){:width="600px"}  
### 2.2 Disk Space of Docker Machine
The docker machine is actually hosted by the `default` virtual machine. In terminal, SSH into docker VM.
```sh
$ docker-machine ssh default
```
Inside the docker VM, run `df -h` or `df -i` to get an overview of the disk space. `/dev/sda1` is used by docker.
```sh
docker@default:~$ df -h
```
![image](/public/images/devops/3131/diskspaceold.png){:width="700px"}  
### 2.3 Solution
Now we are running out of space in the Docker machine, we can delete some Docker images and containers to save some room. However, this is just a workaround.

The better solution is to have more storage for our docker machine. Unfortunately, there is no easy way to increase the disk space for the existing docker machine. Instead, we have to create a new docker machine with more space assigned initially. One limitation of Kitematic is, it always connects to the VM named `default`. There is no way to make Kitematic use another docker machine, so we have to delete the old one and create a VM with the same name 'default'.

## 3. Re-creating Docker Machine
`Warning: The operations below will destroy all docker images and container in 'default' VM. Backup them before proceeding!!!`
### 3.1 Cloning Virtual Machine
Clone the current default VM in case we need to restore the docker machine. Backup data if you are using sort of database containers, like MySQL, MongoDB, etc.
### 3.2 Deleting Virtual Machine
In VirtualBox, delete the 'default' VM.
### 3.3 Deleting Docker Machine
Check all existing docker machines.
```sh
$ docker-machine ls
```
![image](/public/images/devops/3131/dockermachine.png){:width="700px"}  

Delete the docker machine named `default`.
```sh
$ docker-machine rm default
```
![image](/public/images/devops/3131/deletedockermachine.png){:width="700px"}  
### 3.4 Creating New Docker Machine
Create a new docker machine with name=`default`, memory size=`8GB` and disk size=`100GB`.
```sh
$ docker-machine -D create -d virtualbox --virtualbox-memory 8096 --virtualbox-disk-size "100000" default
```
After the creation is done, check the disk space of the new docker machine. Now it has 88GB free space.
![image](/public/images/devops/3131/diskspacenew.png){:width="700px"}  
In VirtualBox, a new default VM is created. Notice that the storage of it is changed to `97.66`GB.
![image](/public/images/devops/3131/vmnew.png){:width="800px"}  
Open Kitematic, it is running properly and ready for use.
![image](/public/images/devops/3131/kitematic.png)  
### 3.5 Installing MSSQL Server
Try to install 'mssql-serveer-linux' again. This time, it is successfully installed.
![image](/public/images/devops/3131/containercreated.png)  
Switch to Settings tab, add new Environment Variable `ACCEPT_EULA = Y`, save.
![image](/public/images/devops/3131/accepteula.png)  
Now, the container for MSSQL Server is running. One issue is, the IP address of docker machine becomes 192.168.99.101.
![image](/public/images/devops/3131/mssqlrunning.png)  
If you check with `docker-machine ls` command, you will see the same IP address.
![image](/public/images/devops/3131/dockermachineip.png){:width="700px"}  

## 4. Resetting IP Address for Docker Machine
If you want the original IP address 192.168.99.100 back for the docker machine, take the following actions.
### 4.1 Resetting IP Address
Run the following command to reset the IP address of `default` docker machine to `192.168.99.100`.
```sh
$ echo "ifconfig eth1 192.168.99.100 netmask 255.255.255.0 broadcast 192.168.99.255 up" | docker-machine ssh default sudo tee /var/lib/boot2docker/bootsync.sh > /dev/null
```
### 4.2 Regenerating Certificates
Regenerate TLS certificates and update the machine with new certs.
```sh
$ docker-machine regenerate-certs default
```
![image](/public/images/devops/3131/resetip.png){:width="700px"}  
### 4.3 Verifying IP Address
Reboot the virtual machine. Check the docker machine again, you will see the IP address is changed to `192.168.99.100`.
![image](/public/images/devops/3131/newipaddress.png){:width="700px"}  
In Kitematic, same original IP.
![image](/public/images/devops/3131/newipaddress2.png)  
If you get any error, try to regenerate certificates one more time.

## 5. References
* [Managing disk space in your Docker VM](http://support.divio.com/local-development/docker/managing-disk-space-in-your-docker-vm)
* [Docker Machine: No space left on device](https://stackoverflow.com/questions/31909979/docker-machine-no-space-left-on-device)
* [Running out of space](https://github.com/docker/kitematic/wiki/Common-Issues-and-Fixes#running-out-of-space)
* [Docker for Mac vs. Docker Toolbox](https://docs.docker.com/docker-for-mac/docker-toolbox/#the-docker-for-mac-environment)
* [Is there a way to force docker-machine to create vm with a specific ip?](https://stackoverflow.com/questions/34336218/is-there-a-way-to-force-docker-machine-to-create-vm-with-a-specific-ip)
