---
layout: tutorial
key: tutorial
title: "Installing VirtualBox and Creating Ubuntu VM"
index: 11
category: basis
image: code.png
date: 2016-02-08
tags: [VirtualBox, Ubuntu]
---

> Install VirtualBox and create Ubuntu virtual machine.

We will use the following free softwares/tools.
* VirtualBox - Oracle VirtualBox is a cross-platform virtualization application. We will use it to host our Ubuntu system.
* Ubuntu - Ubuntu is an open source operating system software for computers. It is one of the distribution systems of Linux, and is based on the Debian architecture. The rest of the softwares will be installed on it.

## 1. Installing VirtualBox on Mac or Windows
### 1.1 Downloading VirtualBox
Download the latest version of VirtualBox from [https://www.virtualbox.org/wiki/Downloads](https://www.virtualbox.org/wiki/Downloads).
### 1.2 Installing VirtualBox
Run the installer and follow the wizard to install it.
![VirtualBox](/public/posts/2016-02-10/installvirtualbox.png){:width="600px"}  
### 1.3 Launching VirtualBox
After the installation is finished, launch VirtualBox. There is no Virtual Machine installed yet.
![VirtualBox](/public/posts/2016-02-10/VirtualBox.png){:width="800px"}  
## 2. Installing Ubuntu
### 2.1 Downloading Ubuntu Desktop
Download the latest version of Ubuntu from [https://www.ubuntu.com/download/desktop](https://www.ubuntu.com/download/desktop). It should be an ISO file with about 1.5 GB in size.
### 2.2 Creating Virtual Machine in VirtualBox
1) In VirtualBox, Machine -> New, provide name, for example, Ubuntu. The type would be set to Linux automatically, next.  
![Create_VM_OS](/public/posts/2016-02-10/Create_VM_OS.png){:width="600px"}  
2) Set Memory Size = 8192 MB(8GB), next.  
![Create_VM_Memory](/public/posts/2016-02-10/Create_VM_Memory.png){:width="600px"}  
3) Select 'Create a virtual hard disk now', click Create button.  
![Create_VM_Harddisk](/public/posts/2016-02-10/Create_VM_Harddisk.png){:width="600px"}  
4) Set 'Hard disk file type': VDI, Continue.  
![Create_VM_VDI](/public/posts/2016-02-10/Create_VM_VDI.png){:width="600px"}  
5) set 'Storage on physical hard disk': Dynamically allocated, Continue.  
![Create_VM_Dynamically](/public/posts/2016-02-10/Create_VM_Dynamically.png){:width="600px"}  
6) Set 'File location and size', change hard disk size to 20.00 GB. By default, it is 10 GB, which is properly not enough.  
![Create_VM_Location](/public/posts/2016-02-10/Create_VM_Location.png){:width="600px"}  
7) VM Created
![UbuntuVM](/public/posts/2016-02-10/UbuntuVM.png){:width="800px"}  
### 2.3 Installing Ubuntu in VM
The new virtual machine is created, now start to install Ubuntu OS for it.  
1) In VirtualBox, select the VM named `Ubuntu` we just created, click Start button.  
2) Specify the location of that Ubuntu ISO file we just downloaded, click Start button.  
![Ubuntu_File](/public/posts/2016-02-10/Ubuntu_File.png){:width="800px"}  
3) A new VM window is opened, choose English and click 'Install Ubuntu' button.  
![Ubuntu_Install](/public/posts/2016-02-10/Ubuntu_Install.png){:width="800px"}  
4) Follow the steps in the setup wizard. Change the default settings if necessary, and provide User Name and Password for logging into Ubuntu later.  
![Ubuntu_UserPwd](/public/posts/2016-02-10/Ubuntu_UserPwd.png){:width="800px"}  
5) Click Continue button, the installation starts, and will take several minutes to complete.  
![Ubuntu_Installing](/public/posts/2016-02-10/Ubuntu_Installing.png){:width="800px"}  
6) Reboot is required after installation is finished. You will see the Ubuntu Desktop after reboot.
![ubuntudesktop](/public/posts/2016-02-10/ubuntudesktop.png){:width="800px"}  
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
![chromeicon](/public/posts/2016-02-10/chromeicon.png){:width="700px"}  

## 3. Commands for VirtualBox
### 3.1 List Existing Virtual Machines
```sh
$ VBoxManage list vms
```
### 3.2 Increasing Hard Disk Size of Virtual Machine
Sometimes, hard disk of your VM is out of storage. You need to manually increase the storage. Here is the syntax in VirtualBox.
```sh
VBoxManage modifyhd YOUR_HARD_DISK.vdi --resize SIZE_IN_MB
```
Issue the following command to increase the disk storage of VM Ubuntu to 20GB.
```sh
$ cd /home/johnny/VitualBox VMs/Ubuntu          // navigate to the location of VM
$ VBoxManage modifyhd Ubuntu.vdi --resize 20480 // resize the the storage of Ubuntu.vdi to 20GB.
```

## 4. References
* [How To Increase Virtualbox Disk Size For Dynamically Allocated Disks](https://www.linuxbabe.com/virtualbox/how-to-increase-virtualbox-disk-size-for-dynamically-allocated-disks)
* [Controlling VirtualBox from the Command Line](http://www.oracle.com/technetwork/articles/servers-storage-admin/manage-vbox-cli-2264359.html)
