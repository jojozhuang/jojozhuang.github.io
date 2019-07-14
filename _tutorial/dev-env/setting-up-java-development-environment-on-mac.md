---
layout: tutorial
key: tutorial
title: "Setting up Java Development Environment on Mac"
index: 2122
subcategory: dev-env
date: 2016-11-01
tags: [JDK, Tomcat, Eclipse]
---

> Install JDK, Apache Tomcat and Eclipse on Mac.

We will use the following free softwares/tools.
* JDK - Java SE Development Kit, a free integrated development kit used to build, test, and deploy Java applications.
* Apache Tomcat - An open source web server.
* Eclipse - One of the most widely used Java IDEs.

## 1. Installing JDK on Mac
### 1.1 Downloading Oracle JDK
Download the latest version of JDK from [http://www.oracle.com/technetwork/java/javase/downloads/index.html](http://www.oracle.com/technetwork/java/javase/downloads/index.html). Select JDK, in the next page, accept the license and choose 'jdk-8u151-macosx-x64.dmg' to download.
### 1.2 Installing JDK
After downloading finish, double click on the installer. Follow the wizard to install JDK.
![installjdk](/public/images/devops/2122/installjdk.png){:width="600px"}  
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

## 2. Setting up Apache Tomcat
### 2.1 Downloading Tomcat
Download the latest version of Tomcat from [https://tomcat.apache.org/](https://tomcat.apache.org/).
### 2.2 Installing Tomcat
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
### 2.3 Starting Tomcat  
Using the following commands to start and stop tomcat:
```sh
$ /Library/Tomcat/bin/startup.sh
$ /Library/Tomcat/bin/shutdown.sh
```

Verify that Tomcat is working by visiting http://localhost:8080.
![tomcat](/public/images/devops/2122/tomcat.png)  

## 3. Installing Eclipse
### 3.1 Downloading Eclipse
Download the latest version of Eclipse from [https://www.eclipse.org/downloads/](https://www.eclipse.org/downloads/).
### 3.2 Installing Eclipse
1) Unzip the tar file. You will get one installer file named 'Eclipse Installer'.
```sh
$ tar xvzf eclipse-inst-mac64.tar.gz
```
2) Double click on 'Eclipse Installer'. Select 'Eclipse IDE for Java EE Developers'.
![eclipseinstaller](/public/images/devops/2122/eclipseinstaller.png){:width="600px"}  
Follow the wizard to finish the installation.
### 3.3 Starting Eclipse
Eclipse is installed to '/Users/<username>/eclipse/jee-oxygen', run following command to launch Eclipse.
```sh
$ open ~/eclipse/jee-oxygen/Eclipse.app
```
Set workspace.
![eclipseworkspace](/public/images/devops/2122/eclipseworkspace.png){:width="600px"}  
Close the welcome page, you will get Eclipse ready for use.
![eclipselaunched](/public/images/devops/2122/eclipselaunched.png)  

## 4. References
* [Installing Tomcat on macOS 10.12 Sierra](https://wolfpaulus.com/mac/tomcat/)
* [Eclipse not recognizing Strings and Classes](https://stackoverflow.com/questions/13422683/eclipse-not-recognizing-strings-and-classes)
