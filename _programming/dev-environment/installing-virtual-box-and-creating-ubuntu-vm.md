---
layout: tutorial
key: programming
title: "Installing VirtualBox and Creating Ubuntu VM"
index: 2011
subcategory: dev-environment
date: 2016-10-03
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
![VirtualBox](/assets/images/programming/2011/installvirtualbox.png){:width="600px"}  
### 1.3 Launching VirtualBox
After the installation is finished, launch VirtualBox. There is no Virtual Machine installed yet.
![VirtualBox](/assets/images/programming/2011/VirtualBox.png){:width="800px"}  
## 2. Installing Ubuntu
### 2.1 Downloading Ubuntu Desktop
Download the latest version of Ubuntu from [https://www.ubuntu.com/download/desktop](https://www.ubuntu.com/download/desktop). It should be an ISO file with about 1.5 GB in size.
### 2.2 Creating Virtual Machine in VirtualBox
1) In VirtualBox, Machine -> New, provide name, for example, Ubuntu. The type would be set to Linux automatically, next.  
![image](/assets/images/programming/2011/create_vm_os.png){:width="600px"}  
2) Set Memory Size = 8192 MB(8GB), next.  
![image](/assets/images/programming/2011/create_vm_memory.png){:width="600px"}  
3) Select 'Create a virtual hard disk now', click Create button.  
![image](/assets/images/programming/2011/create_vm_harddisk.png){:width="600px"}  
4) Set 'Hard disk file type': VDI, Continue.  
![image](/assets/images/programming/2011/create_vm_vdi.png){:width="600px"}  
5) set 'Storage on physical hard disk': Dynamically allocated, Continue.  
![image](/assets/images/programming/2011/create_vm_dynamically.png){:width="600px"}  
6) Set 'File location and size', change hard disk size to 20.00 GB. By default, it is 10 GB, which is properly not enough.  
![image](/assets/images/programming/2011/create_vm_location.png){:width="600px"}  
7) VM Created
![image](/assets/images/programming/2011/ubuntuvm.png){:width="800px"}  
### 2.3 Installing Ubuntu in VM
The new virtual machine is created, now start to install Ubuntu OS for it.  
1) In VirtualBox, select the VM named `Ubuntu` we just created, click Start button.  
2) Specify the location of that Ubuntu ISO file we just downloaded, click Start button.  
![image](/assets/images/programming/2011/ubuntu_file.png){:width="800px"}  
3) A new VM window is opened, choose English and click 'Install Ubuntu' button.  
![image](/assets/images/programming/2011/ubuntu_install.png){:width="800px"}  
4) Follow the steps in the setup wizard. Change the default settings if necessary, and provide User Name and Password for logging into Ubuntu later.  
![image](/assets/images/programming/2011/ubuntu_userpwd.png){:width="800px"}  
5) Click Continue button, the installation starts, and will take several minutes to complete.  
![image](/assets/images/programming/2011/ubuntu_installing.png){:width="800px"}  
6) Reboot is required after installation is finished. You will see the Ubuntu Desktop after reboot.
![image](/assets/images/programming/2011/ubuntudesktop.png){:width="800px"}  
### 2.4 Installing Tools in Ubuntu
To use ubuntu more efficiently, you need to install some highly recommended softwares/tools.  
1) Install Google Chrome  
By default, Ubuntu has Firefox installed as default web browser, but I prefer Chrome.
Go to Google's website, search Chrome and download the installation file. It should have the extension .deb
```raw
$ sudo dpkg -i google-chrome-stable_current_amd64.deb
```
Note that all of the installation files for Ubuntu have the `.deb` extension. We always use `dpkg` to install them.
If the icon for Chrome is missing after launching. Try to edit file google-chrome.desktop.
```raw
$ nano /usr/share/applications/google-chrome.desktop
```
There is a line specifying the icon location. Change it according to location of google chrome icon (I have google-chrome installed in /opt):
```raw
$ Icon=/opt/google/chrome/product_logo_64.png
```
![image](/assets/images/programming/2011/chromeicon.png){:width="700px"}  

## 3. Commands for VirtualBox
### 3.1 List Existing Virtual Machines
```raw
$ VBoxManage list vms
```
### 3.2 Increasing Hard Disk Size of Virtual Machine
Sometimes, hard disk of your VM is out of storage. You need to manually increase the storage. Here is the syntax in VirtualBox.
```raw
VBoxManage modifyhd YOUR_HARD_DISK.vdi --resize SIZE_IN_MB
```
Issue the following command to increase the disk storage of VM Ubuntu to 20GB.
```raw
$ cd /home/johnny/VitualBox VMs/Ubuntu          // navigate to the location of VM
$ VBoxManage modifyhd Ubuntu.vdi --resize 20480 // resize the the storage of Ubuntu.vdi to 20GB.
```

## 4. References
* [How To Increase Virtualbox Disk Size For Dynamically Allocated Disks](https://www.linuxbabe.com/virtualbox/how-to-increase-virtualbox-disk-size-for-dynamically-allocated-disks)
* [Controlling VirtualBox from the Command Line](http://www.oracle.com/technetwork/articles/servers-storage-admin/manage-vbox-cli-2264359.html)
