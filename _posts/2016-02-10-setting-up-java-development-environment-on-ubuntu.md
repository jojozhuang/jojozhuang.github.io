---
layout: post
key: blog
title: "Setting up Java Development Environment on Ubuntu"
date: 2016-02-10
tags: [VirtualBox, Ubuntu, Tomcat, Eclipse, JDK]
---

> Setup Java development environment with the most popular OS, web server, IDE, etc.

We will use the following free softwares/tools.
* VirtualBox - Oracle VirtualBox is a cross-platform virtualization application. We will use it to host our Ubuntu system.
* Ubuntu - Ubuntu is an open source operating system software for computers. It is one of the distribution systems of Linux, and is based on the Debian architecture. The rest of the softwares will be installed on it.
* JDK - Java SE Development Kit, a free integrated development kit used to build, test, and deploy Java applications.
* Apache Tomcat - An open source web server.
* Eclipse - One of the most widely used Java IDEs.

## 1. Installing VirtualBox on Mac or Windows
### 1.1 Downloading VirtualBox
Download the latest version of VirtualBox from [https://www.virtualbox.org/wiki/Downloads](https://www.virtualbox.org/wiki/Downloads).
### 1.2 Installing VirtualBox
Run the installer and follow the wizard to install it.
![VirtualBox](/public/pics/2016-02-10/installvirtualbox.png){:width="600px"}  
### 1.3 Launching VirtualBox
After the installation is finished, launch VirtualBox. There is no Virtual Machine installed yet.
![VirtualBox](/public/pics/2016-02-10/VirtualBox.png){:width="800px"}  
## 2. Installing Ubuntu
### 2.1 Downloading Ubuntu Desktop
Download the latest version of Ubuntu from [https://www.ubuntu.com/download/desktop](https://www.ubuntu.com/download/desktop). It should be an ISO file with about 1.5 GB in size.
### 2.2 Creating Virtual Machine in VirtualBox
1) In VirtualBox, Machine -> New, provide name, for example, Ubuntu. The type would be set to Linux automatically, next.  
![Create_VM_OS](/public/pics/2016-02-10/Create_VM_OS.png){:width="600px"}  
2) Set Memory Size = 8192 MB(8GB), next.  
![Create_VM_Memory](/public/pics/2016-02-10/Create_VM_Memory.png){:width="600px"}  
3) Select 'Create a virtual hard disk now', click Create button.  
![Create_VM_Harddisk](/public/pics/2016-02-10/Create_VM_Harddisk.png){:width="600px"}  
4) Set 'Hard disk file type': VDI, Continue.  
![Create_VM_VDI](/public/pics/2016-02-10/Create_VM_VDI.png){:width="600px"}  
5) set 'Storage on physical hard disk': Dynamically allocated, Continue.  
![Create_VM_Dynamically](/public/pics/2016-02-10/Create_VM_Dynamically.png){:width="600px"}  
6) Set 'File location and size', change hard disk size to 20.00 GB. By default, it is 10 GB, which is properly not enough.  
![Create_VM_Location](/public/pics/2016-02-10/Create_VM_Location.png){:width="600px"}  
7) VM Created
![UbuntuVM](/public/pics/2016-02-10/UbuntuVM.png){:width="800px"}  
### 2.3 Installing Ubuntu in VM
The new virtual machine is created, now start to install Ubuntu OS for it.  
1) In VirtualBox, select the VM named `Ubuntu` we just created, click Start button.  
2) Specify the location of that Ubuntu ISO file we just downloaded, click Start button.  
![Ubuntu_File](/public/pics/2016-02-10/Ubuntu_File.png){:width="800px"}  
3) A new VM window is opened, choose English and click 'Install Ubuntu' button.  
![Ubuntu_Install](/public/pics/2016-02-10/Ubuntu_Install.png){:width="800px"}  
4) Follow the steps in the setup wizard. Change the default settings if necessary, and provide User Name and Password for logging into Ubuntu later.  
![Ubuntu_UserPwd](/public/pics/2016-02-10/Ubuntu_UserPwd.png){:width="800px"}  
5) Click Continue button, the installation starts, and will take several minutes to complete.  
![Ubuntu_Installing](/public/pics/2016-02-10/Ubuntu_Installing.png){:width="800px"}  
6) Reboot is required after installation is finished. You will see the Ubuntu Desktop after reboot.
![ubuntudesktop](/public/pics/2016-02-10/ubuntudesktop.png){:width="800px"}  
### 2.4 Installing Tools in Ubuntu
To use ubuntu more efficiently, you need to install some highly recommended softwares/tools.  
1) Install Google Chrome  
By default, Ubuntu has Firefox installed as default web browser, but I prefer Chrome.
Go to Google's website, search Chrome and download the installation file. It should have the extension .deb
```sh
$ sudo dpkg -i google-chrome-stable_current_amd64.deb
```
Note that all of the installation files for Ubuntu have the `.deb` extension. We always use `dpkg` to install them.
If the icon for Chrome is missing after launching. Try to edit file google-chrome.desktop.
```sh
$ nano /usr/share/applications/google-chrome.desktop
```
There is a line specifying the icon location. Change it according to location of google chrome icon (I have google-chrome installed in /opt):
```sh
$ Icon=/opt/google/chrome/product_logo_64.png
```
![chromeicon](/public/pics/2016-02-10/chromeicon.png){:width="700px"}  
## 3. Installing JDK in Ubuntu
### 3.1 Downloading Oracle JDK
In Ubuntu VM, download the latest version of JDK from [http://www.oracle.com/technetwork/java/javase/downloads/index.html](http://www.oracle.com/technetwork/java/javase/downloads/index.html). Select JDK, in the next page, accept the license and choose 'jdk-8u144-linux-x64.tar.gz' to download.
### 3.2 Installing JDK
There is no installer, have to configure JKD manually. Unzip the package and move JDK files to /usr/local/java/
```sh
$ sudo cp -r jdk-8u144-linux-x64.tar.gz /usr/local/java/
$ cd /usr/local/java
$ tar xvzf jdk-8u144-linux-x64.tar.gz
```
Finally, JDK is installed to /usr/local/java/jdk1.8.0_144/.
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

### 3.5 Checking Java Version
```sh
$ java -version
```
You should be able to see the java information like below.
```sh
java version "1.8.0_144"
Java(TM) SE Runtime Environment (build 1.8.0_144-b01)
Java HotSpot(TM) 64-Bit Server VM (build 25.144-b01, mixed mode)
```

## 4. Setting up Apache Tomcat
### 4.1 Downloading Tomcat
In Ubuntu VM, download the latest version of Tomcat from [https://tomcat.apache.org/](https://tomcat.apache.org/).
### 4.2 Installing Tomcat
There is no installer, have to configure Tomcat manually. Unzip the tar file, copy to /opt/tomcat.
```sh
$ tar xvzf apache-tomcat-8.5.23.tar.gz
$ sudo mv apache-tomcat-8.5.23 /opt/tomcat
```
### 4.3 Setting up Environment Variables for Tomcat
1) Open .bashrc for editing
```sh
$ nano ~/.bashrc
```
2) Set CATALINA_HOME environment variable pointing to the installation locations. Add this information to the end of the file:
```sh
$ export CATALINA_HOME=/opt/tomcat
```
3) Simply save and exit .bashrc, then make the changes effective by running the following command:
```sh
$ . ~/.bashrc
```

### 4.4 Adding User for Tomcat
```sh
$ nano $CATALINA_HOME/conf/tomcat-users.xml
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

### 4.5 Starting Tomcat  
```sh
$ $CATALINA_HOME/bin/startup.sh
```
Verify that Tomcat is working by visiting http://localhost:8080.
![tomcat](/public/pics/2016-02-10/tomcat.png)  
Tomcat can be stopped by executing the following command:
```sh
$ $CATALINA_HOME/bin/shutdown.sh
```

## 5. Installing Eclipse
### 5.1 Downloading Eclipse
Download the latest version of Eclipse from [https://www.eclipse.org/downloads/](https://www.eclipse.org/downloads/). After downloading is finished, unzip the tar file.
```sh
$ tar xvzf eclipse-inst-linux64.tar.gz
```
### 5.2 Installing Eclipse
Go to the uncompressed folder 'eclipse-installer', double click the installation file 'eclipse-inst'.
![installeclipse](/public/pics/2016-02-10/installeclipse.png)  
In the wizard, select 'Eclipse IDE for Java EE Developers'.
![jee](/public/pics/2016-02-10/jee.png)  
Leave the installation folder unchanged, click 'INSTALL' button.
![location](/public/pics/2016-02-10/location.png)  
Installation should start and wait until it is finished. If you see 'read-only' error, run the following command, and try to install again.
```sh
$ sudo chown -R $USER /opt/  // grant all access of rights for folder /opt/ to current user.
```
### 5.3 Starting Eclipse
Launch Eclipse through UI or run command as follows.
```sh
$ cd /home/johnny/eclipse/jee-oxygen/eclipse/
$ ./eclipse
```
Set workspace.
![eclipse_workspace](/public/pics/2016-02-10/eclipse_workspace.png)  
Close the welcome page, you will get Eclipse ready for use.
![eclipse_launched](/public/pics/2016-02-10/eclipse_launched.png)  

In addition, if your eclipse icon is missing after you launch it, copy `icon.xpm` to `/usr/share/pixmaps/`, and rename it to `eclipse.xpm`.
```sh
$ cp /home/johnny/eclipse/jee-oxygen/eclipse/icon.xpm /usr/share/pixmaps/eclipse.xpm
```

## 6. Others
### 6.1 Increasing Hard Disk Size of Virtual Machine
Sometimes, hard disk of your VM is out of storage. You need to manually increase the storage. Here is the syntax in VirtualBox.
```sh
VBoxManage modifyhd YOUR_HARD_DISK.vdi --resize SIZE_IN_MB
```
Issue the following command to increase the disk storage of VM Ubuntu to 20GB.
```sh
$ cd /home/johnny/VitualBox VMs/Ubuntu          // navigate to the location of VM
$ VBoxManage modifyhd Ubuntu.vdi --resize 20480 // resize the the storage of Ubuntu.vdi to 20GB.
```

## 7. References
* [How to Install Oracle Java JDK on Ubuntu Linux](http://www.wikihow.com/Install-Oracle-Java-JDK-on-Ubuntu-Linux)
* [How To Install Apache Tomcat 7 on Ubuntu 14.04](https://www.liquidweb.com/kb/how-to-install-apache-tomcat-7-on-ubuntu-14-04/)
* [Install Eclipse IDE on Ubuntu Linux 15.04](http://linuxpitstop.com/install-eclipse-ide-on-ubuntu-linux-15-04/)
* [How to Install The Latest Eclipse in Ubuntu 16.04, 15.10](http://ubuntuhandbook.org/index.php/2016/01/how-to-install-the-latest-eclipse-in-ubuntu-16-04-15-10/)
* [How To Increase Virtualbox Disk Size For Dynamically Allocated Disks](https://www.linuxbabe.com/virtualbox/how-to-increase-virtualbox-disk-size-for-dynamically-allocated-disks)
