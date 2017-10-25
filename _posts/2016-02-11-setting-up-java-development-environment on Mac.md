---
layout: post
key: blog
title: "Setting up Java Development Environment on Mac"
date: 2016-02-11
tags: [JDK, Eclipse, Tomcat]
---

> Setup Java development environment with the most popular web server, IDE, etc.

We will use the following free softwares/tools.
* JDK - Java SE Development Kit, a free integrated development kit used to build, test, and deploy Java applications.
* Apache Tomcat - An open source web server.
* Eclipse - One of the most widely used Java IDEs.

## 1. Installing JDK on Mac
### 1.1 Downloading Oracle JDK
Download the latest version of JDK from [http://www.oracle.com/technetwork/java/javase/downloads/index.html](http://www.oracle.com/technetwork/java/javase/downloads/index.html). Select JDK, in the next page, accept the license and choose 'jdk-8u151-macosx-x64.dmg' to download.
### 1.2 Installing JDK
After downloading finish, double click on the installer. Follow the wizard to install JDK.
![installjdk](/public/pics/2016-02-11/installjdk.png)  
Finally, JDK is installed to /Library/Java/JavaVirtualMachines/jdk1.8.0_151.jdk/.
### 1.3 Checking Java Version
```sh
$ java -version
```
You should be able to see the java information like below.
```sh
java version "1.8.0_151"
Java(TM) SE Runtime Environment (build 1.8.0_151-b12)
Java HotSpot(TM) 64-Bit Server VM (build 25.151-b12, mixed mode)
```
### 3.3 Setting up Environment Variables for Java
Create new environment variable of JAVA_HOME and add it to PATH.
```sh
$ sudo nano /etc/profile
```
Add the following contents to the end.
```sh
JAVA_HOME=/usr/local/java/jdk1.8.0_144
PATH=$PATH:$JAVA_HOME/bin
export JAVA_HOME
export PATH
```
### 3.4 Informing Ubuntu where Java JDK is located.
```sh
$ sudo update-alternatives --install "/usr/bin/java" "java" "/usr/local/java/jdk1.8.0_144/bin/java" 1
$ sudo update-alternatives --install "/usr/bin/javac" "javac" "/usr/local/java/jdk1.8.0_144/bin/javac" 1
$ sudo update-alternatives --install "/usr/bin/javaws" "javaws" "/usr/local/java/jdk1.8.0_144/bin/javaws" 1
```



## 4. Setting up Apache Tomcat
### 4.1 Downloading Tomcat
Download the latest version of Tomcat from [https://tomcat.apache.org/](https://tomcat.apache.org/).
### 4.2 Installing Tomcat
There is no installer, have to configure Tomcat manually. Unzip the tar file, copy to /opt/tomcat.
```sh
$ tar xvzf apache-tomcat-9.0.1.tar.gz
$ sudo mv apache-tomcat-9.0.1 /usr/local
```
Create a symbolic link that we are going to use when referring to Tomcat
```sh
$ sudo ln -s /usr/local/apache-tomcat-9.0.1 /Library/Tomcat
```
Change ownership of the /Library/Tomcat folder hierarchy:
```sh
sudo chown -R $USER /Library/Tomcat
```
Make all scripts executable:
```sh
sudo chmod +x /Library/Tomcat/bin/*.sh
```
### 4.3 Starting Tomcat  
Using the following commands to start and stop tomcat:
```sh
$ /Library/Tomcat/bin/startup.sh
$ /Library/Tomcat/bin/shutdown.sh
```

Verify that Tomcat is working by visiting http://localhost:8080.
![tomcat](/public/pics/2016-02-11/tomcat.png)  

## 5. Installing Eclipse
### 5.1 Downloading Eclipse
Download the latest version of Eclipse from [https://www.eclipse.org/downloads/](https://www.eclipse.org/downloads/).
### 5.2 Installing Eclipse
1) Unzip the tar file.
```sh
$ tar xvzf eclipse-inst-linux64.tar.gz
```
2) Run Eclipse Installer
Go to the uncompressed folder 'eclipse-installer', double click the installation file 'eclipse-inst'. In the wizard, select 'Eclipse IDE for Java EE Developers', change location to /opt/jee-oxygen/. If you see  'read-only' error, run the following command.
```sh
$ sudo chown -R $USER /opt/  // grant all access of rights for folder /opt/ to current user.
```
Installation should start and wait until it is finished.
### 5.3 Starting Eclipse
Launch Eclipse through UI or run command as follows.
```sh
$ /opt/jee-oxygen/eclipse/eclipse
```
Set workspace.
![eclipse_workspace](/public/pics/2016-02-10/eclipse_workspace.png)  
Close the welcome page, you will get Eclipse ready for use.
![eclipse_launched](/public/pics/2016-02-10/eclipse_launched.png)  

## 6. Others
### 6.1 Increasing Hard Disk Size of Virtual Machine
Sometimes, hard disk of your VM is out of storage. You need to increase the storage.
VBoxManage modifyhd YOUR_HARD_DISK.vdi --resize SIZE_IN_MB
```sh
$ cd /home/johnny/VitualBox VMs/Ubuntu // navigate to the vm location
$ VBoxManage modifyhd Ubuntu.vdi --resize 20480 // resize the the storage of Ubuntu.vdi to 20GB.
```

## 7. References
* [How to Install Oracle Java JDK on Ubuntu Linux](http://www.wikihow.com/Install-Oracle-Java-JDK-on-Ubuntu-Linux)
* [How To Install Apache Tomcat 7 on Ubuntu 14.04](https://www.liquidweb.com/kb/how-to-install-apache-tomcat-7-on-ubuntu-14-04/)
* [Install Eclipse IDE on Ubuntu Linux 15.04](http://linuxpitstop.com/install-eclipse-ide-on-ubuntu-linux-15-04/)
* [How to Install The Latest Eclipse in Ubuntu 16.04, 15.10](http://ubuntuhandbook.org/index.php/2016/01/how-to-install-the-latest-eclipse-in-ubuntu-16-04-15-10/)
* [Installing Tomcat on macOS 10.12 Sierra](https://wolfpaulus.com/mac/tomcat/)
