---
layout: tutorial
key: programming
title: "Sharing Files between Host and Guest in VirtualBox"
index: 2012
subcategory: dev-environment
date: 2016-10-10
tags: [VirtualBox, Ubuntu, macOS]
---

> Introduce how to achieve bidirectional file sharing between macOS host and Ubuntu guest.

## 1. Installing VirtualBox Guest Additions
1) Get VBoxGuestAdditions.iso  
In macOS, Finder->Application->VirtualBox->Show Package Content
![image](/assets/images/programming/2012/virtualbox.png){:width="700px"}  
Find VBoxGuestAdditions.iso in /Contents/macOS/.
![image](/assets/images/programming/2012/iso.png){:width="700px"}  
Copy it to another folder, eg. ~/Downloads/  
2) Insert the Image to Ubuntu VM  
Ubuntu VM->Devices->Optical Drives->Choose disk image..., locate to ~/Downloads/VBoxGuestAdditions.iso.  
![image](/assets/images/programming/2012/addimage.png)  
3) In Ubuntu, select VBoxGuestAdditions.iso, and click 'Run Software' to install.
![image](/assets/images/programming/2012/installguestadditions.png)  
After Guest Additions are installed, a new user group 'vboxsf' has been created.  

## 2. Creating Shared Folder on macOS
In macOS, create a new folder /UbuntuSF/, which is used to share files with Ubuntu.
![image](/assets/images/programming/2012/createsharedfolder.png){:width="800px"}  

## 3. Adding Shared Folder to VM's SharedFolders
In VirtualBox, select Ubuntu VM->Settings->SharedFolders, click 'Add Folder' at the right side. Set path to `/UbuntuSF`, check 'Auto-mount' and 'Make Permanent'.
![image](/assets/images/programming/2012/addshare.png){:width="800px"}  
The shared folder is created for VM now.
![image](/assets/images/programming/2012/sharedfolders.png){:width="800px"}  

## 4. Adding User to Group 'vboxsf' in Ubuntu
In Ubuntu VM, run the following command in terminal.
```raw
$ sudo adduser johnny vboxsf
```
![image](/assets/images/programming/2012/adduser.png){:width="700px"}  
Then, reboot Ubuntu.

## 5. Checking the Shared Folder in Ubuntu
Go to directory /media/, there should be a new shared folder `sf_UbuntuSF`.
![image](/assets/images/programming/2012/ubuntusf.png)  
Create a new file here.
![image](/assets/images/programming/2012/sharedfile.png)  
You will see it in /UbuntuSF on macOS.
![image](/assets/images/programming/2012/macsf.png){:width="800px"}  

## 6. References
* [Manually Installing VirtualBox Guest Additions](https://osquest.com/2012/11/13/tip-manually-installing-virtualbox-guest-additions/)
