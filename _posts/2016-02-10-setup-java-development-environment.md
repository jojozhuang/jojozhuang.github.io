---
layout: post
key: blog
title: "Setup Java Development Environment"
date: 2016-02-10
tags: [VirtualBox, Ubuntu, Tomcat, Eclipse, JDK]
---

> Setup JAVA development environment with the most popular OS, web server, IDE, etc.

We will use the following free softwares/tools.
* VirtualBox - Oracle VirtualBox is a cross-platform virtualization application. We will use it to host our Ubuntu system.
* Ubuntu - Ubuntu is an open source operating system software for computers. It is one of the distribution systems of Linux, and is based on the Debian architecture. The rest of the softwares will be installed on it.
* JDK - Java SE Development Kit, a free integrated development kit used to build, test, and deploy Java applications.
* Apache Tomcat - An open source web server.
* Eclipse - One of the most widely used Java IDEs.

## 1. Install VirtualBox on Mac or Windows
### 1.1 Download VirtualBox
Download the latest version of VirtualBox from [https://www.virtualbox.org/wiki/Downloads](https://www.virtualbox.org/wiki/Downloads).
### 1.2 Install VirtualBox
Run the installer and follow the wizard to install it.
### 1.3 VirtualBox
After the installation is finished, launch VirtualBox. In my virtualbox, I have three virtual machines.
![VirtualBox](/public/pics/2016-02-10/VirtualBox.png)  
## 2. Install Ubuntu
### 2.1 Download Ubuntu Desktop
Download the latest version of Ubuntu from [https://www.ubuntu.com/download/desktop](https://www.ubuntu.com/download/desktop). It should be an ISO file with about 1.5 GB in size.
### 2.2 Create Virtual Machine in VirtualBox
1) In VirtualBox, Machine -> New, provide name, for example, Ubuntu. The type would be set to Linux automatically, next.  
![Create_VM_OS](/public/pics/2016-02-10/Create_VM_OS.png)  
2) Set Memory Size = 4096 MB, next.  
![Create_VM_Memory](/public/pics/2016-02-10/Create_VM_Memory.png)  
3) Select 'Create a virtual hard disk now', click Create button.  
![Create_VM_Harddisk](/public/pics/2016-02-10/Create_VM_Harddisk.png)  
4) Set 'Hard disk file type': VDI, Continue.  
![Create_VM_VDI](/public/pics/2016-02-10/Create_VM_VDI.png)  
5) set 'Storage on physical hard disk': Dynamically allocated, Continue.  
![Create_VM_Dynamically](/public/pics/2016-02-10/Create_VM_Dynamically.png)  
6) Set 'File location and size', change hard disk size to 20.00 GB. By default, it is 8 GB, which is properly not enough.  
![Create_VM_Location](/public/pics/2016-02-10/Create_VM_Location.png)  
7) VM Created
![UbuntuVM](/public/pics/2016-02-10/UbuntuVM.png)  
### 2.3 Install Ubuntu in VM
The new virtual machine is created, now start to install Ubuntu OS for it.  
1) In VirtualBox, select the VM named 'Ubuntu' we just created, click Start button.  
2) Specify the location of that ISO file we just downloaded, click Start button.  
![Ubuntu_File](/public/pics/2016-02-10/Ubuntu_File.png)  
3) A new VM window is opened, choose English and click 'Install Ubuntu' button.  
![Ubuntu_Install](/public/pics/2016-02-10/Ubuntu_Install.png)  
4) Follow the steps in the setup wizard. Change the default settings if necessary, and provide User Name and Password for logging into Ubuntu later.  
![Ubuntu_UserPwd](/public/pics/2016-02-10/Ubuntu_UserPwd.png)  
5) The installation is started, and will take several minutes to complete.  
![Ubuntu_Installing](/public/pics/2016-02-10/Ubuntu_Installing.png)  
6) Reboot is required after installation is finished.  
### 2.4 Install Necessary Tools in Ubuntu
To use ubuntu more efficiently, you need to install some highly recommended softwares/tools.  
1) Install Google Chrome  
By default, Ubuntu has Firefox installed as default web browser, but I prefer Chrome.
Go to Google's website, search Chrome and download the installation file. It should have the extension .deb
```sh
sudo dpkg -i google-chrome-stable_current_amd64.deb
```
Note that all of the installation files for Ubuntu have the .deb extension. We always use dpkg to install them.

## 3. Install JDK in Ubuntu
### 3.1 Download Oracle JDK
In Ubuntu VM, download the latest version of JDK from [http://www.oracle.com/technetwork/java/javase/downloads/index.html](http://www.oracle.com/technetwork/java/javase/downloads/index.html). Select JDK, in the next page, accept the license and choose 'jdk-8u144-linux-x64.tar.gz' to download.
### 3.2 Install JDK
There is no installer, have to configure JKD manually. Unzip the package and move JDK files to /usr/local/java/
```
sudo cp -r jdk-8u144-linux-i586.tar.gz /usr/local/java/
cd /usr/local/java
tar xvzf jdk-8u144-linux-x64.tar.gz
```
Finally, JDK is installed to /usr/local/java/jdk1.8.0_144/.
### 3.3 Setup Environment Variables for Java
Create new environment variable of JAVA_HOME and add it to PATH.
```sh
sudo nano /etc/profile
```
Add the following contents to the end.
```sh
JAVA_HOME=/usr/local/java/jdk1.8.0_144
PATH=$PATH:$JAVA_HOME/bin
export JAVA_HOME
export PATH
```
### 3.4 Inform Ubuntu where Java JDK is located.
```sh
sudo update-alternatives --install "/usr/bin/java" "java" "/usr/local/java/jdk1.8.0_144/bin/java" 1
sudo update-alternatives --install "/usr/bin/javac" "javac" "/usr/local/java/jdk1.8.0_144/bin/javac" 1
sudo update-alternatives --install "/usr/bin/javaws" "javaws" "/usr/local/java/jdk1.8.0_144/bin/javaws" 1
```

### 3.5 Check Java Version
```sh
java -version
```
You should be able to see the java information like below.
```sh
java version "1.8.0_144"
Java(TM) SE Runtime Environment (build 1.8.0_144-b01)
Java HotSpot(TM) 64-Bit Server VM (build 25.144-b01, mixed mode)
```

## 4. Setup Apache Tomcat
### 4.1 Download Tomcat
In Ubuntu VM, download the latest version of Tomcat from [https://tomcat.apache.org/](https://tomcat.apache.org/).
### 4.2 Install Tomcat
There is no installer, have to configure Tomcat manually. Unzip the tar file, copy to /opt/tomcat.
```sh
tar xvzf apache-tomcat-9.0.0.M26.tar.gz
sudo mv apache-tomcat-9.0.0.M26 /opt/tomcat
```
### 4.3 Setup Environment Variables for Tomcat
1) Open .bashrc for editing
```sh
vim ~/.bashrc
```
2) Set CATALINA_HOME environment variable pointing to the installation locations. Add this information to the end of the file:
```sh
export CATALINA_HOME=/opt/tomcat
```
3) Simply save and exit .bashrc, then make the changes effective by running the following command:
```sh
. ~/.bashrc
```

### 4.4 Add User for Tomcat
```sh
vi $CATALINA_HOME/conf/tomcat-users.xml
```
Add role and admin user to this file.
```xml
<tomcat-users>
<!--
  <role rolename="tomcat"/>
  <role rolename="role1"/>
  <user username="tomcat" password="tomcat" roles="tomcat"/>
  <user username="both" password="tomcat" roles="tomcat,role1"/>
  <user username="role1" password="tomcat" roles="role1"/>
-->

	<role rolename="manager-gui"/>
	<user username="admin" password="admin" roles="manager-gui"/>

</tomcat-users>
```

### 4.5 Start Tomcat  
```sh
$CATALINA_HOME/bin/startup.sh
```
Verify that Tomcat is working by visiting http://localhost:8080.
![tomcat](/public/pics/2016-02-10/tomcat.png)  
Tomcat can be stopped by executing the following command:
```sh
$CATALINA_HOME/bin/shutdown.sh
```

## 5. Install Eclipse
### 5.1 Download Eclipse
Download the latest version of Eclipse from [https://www.eclipse.org/downloads/](https://www.eclipse.org/downloads/).
### 5.2 Install Eclipse
1) Unzip the tar file.
```sh
tar xvzf eclipse-inst-linux64.tar.gz
```
2) Run Eclipse Installer
Go to the uncompressed folder 'eclipse-installer', double click the installation file 'eclipse-inst'. In the wizard, select 'Eclipse IDE for Java EE Developers', change location to /opt/jee-oxygen/. If you see  'read-only' error, run the following command.
```sh
sudo chown -R $USER /opt/  // grant all access of rights for folder /opt/ to current user.
```
Installation should start and wait until it is finished.
### 5.3 Start Eclipse
Launch Eclipse through UI or run command as follows.
```sh
/opt/jee-oxygen/eclipse/eclipse
```
Set workspace.
![eclipse_workspace](/public/pics/2016-02-10/eclipse_workspace.png)  
Close the welcome page, you will get Eclipse ready for use.
![eclipse_launched](/public/pics/2016-02-10/eclipse_launched.png)  

## 6. Others
### 6.1 Increase Hard Disk Size of Virtual Machine
Sometimes, hard disk of your VM is out of storage. You need to increase the storage.
VBoxManage modifyhd YOUR_HARD_DISK.vdi --resize SIZE_IN_MB
```sh
cd /home/johnny/VitualBox VMs/Ubuntu // navigate to the vm location
VBoxManage modifyhd Ubuntu.vdi --resize 20480 // resize the the storage of Ubuntu.vdi to 20GB.
```

## 7. References
* [How to Install Oracle Java JDK on Ubuntu Linux](http://www.wikihow.com/Install-Oracle-Java-JDK-on-Ubuntu-Linux)
* [How To Install Apache Tomcat 7 on Ubuntu 14.04](https://www.liquidweb.com/kb/how-to-install-apache-tomcat-7-on-ubuntu-14-04/)
* [Install Eclipse IDE on Ubuntu Linux 15.04](http://linuxpitstop.com/install-eclipse-ide-on-ubuntu-linux-15-04/)
* [How to Install The Latest Eclipse in Ubuntu 16.04, 15.10](http://ubuntuhandbook.org/index.php/2016/01/how-to-install-the-latest-eclipse-in-ubuntu-16-04-15-10/)
