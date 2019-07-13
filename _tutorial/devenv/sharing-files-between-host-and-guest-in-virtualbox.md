---
layout: tutorial
key: tutorial
title: "Sharing Files between Host and Guest in VirtualBox"
index: 2112
category: devenv
breadcrumb: [Tutorial, Prerequisites, Dev Environment]
image: code.png
date: 2016-10-10
tags: [VirtualBox, Ubuntu, Mac]
---

> Introduce how to achieve bidirectional file sharing between MacOS host and Ubuntu guest.

## 1. Installing VirtualBox Guest Additions
1) Get VBoxGuestAdditions.iso  
In MacOS, Finder->Application->VirtualBox->Show Package Content
![image](/public/images/devops/2112/virtualbox.png){:width="700px"}  
Find VBoxGuestAdditions.iso in /Contents/MacOS/.
![image](/public/images/devops/2112/iso.png){:width="700px"}  
Copy it to another folder, eg. ~/Downloads/  
2) Insert the Image to Ubuntu VM  
Ubuntu VM->Devices->Optical Drives->Choose disk image..., locate to ~/Downloads/VBoxGuestAdditions.iso.  
![image](/public/images/devops/2112/addimage.png)  
3) In Ubuntu, select VBoxGuestAdditions.iso, and click 'Run Software' to install.
![image](/public/images/devops/2112/installguestadditions.png)  
After Guest Additions are installed, a new user group 'vboxsf' has been created.  

## 2. Creating Shared Folder on MacOS
In MacOS, create a new folder /UbuntuSF/, which is used to share files with Ubuntu.
![image](/public/images/devops/2112/createsharedfolder.png){:width="800px"}  

## 3. Adding Shared Folder to VM's SharedFolders
In VirtualBox, select Ubuntu VM->Settings->SharedFolders, click 'Add Folder' at the right side. Set path to `/UbuntuSF`, check 'Auto-mount' and 'Make Permanent'.
![image](/public/images/devops/2112/addshare.png){:width="800px"}  
The shared folder is created for VM now.
![image](/public/images/devops/2112/sharedfolders.png){:width="800px"}  

## 4. Adding User to Group 'vboxsf' in Ubuntu
In Ubuntu VM, run the following command in terminal.
```sh
$ sudo adduser johnny vboxsf
```
![image](/public/images/devops/2112/adduser.png){:width="700px"}  
Then, reboot Ubuntu.

## 5. Checking the Shared Folder in Ubuntu
Go to directory /media/, there should be a new shared folder `sf_UbuntuSF`.
![image](/public/images/devops/2112/ubuntusf.png)  
Create a new file here.
![image](/public/images/devops/2112/sharedfile.png)  
You will see it in /UbuntuSF on MacOS.
![image](/public/images/devops/2112/macsf.png){:width="800px"}  

## 6. References
* [Manually Installing VirtualBox Guest Additions](https://osquest.com/2012/11/13/tip-manually-installing-virtualbox-guest-additions/)
