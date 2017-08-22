---
layout: post
key: blog
title: "Share files between Host and Guest in VirtualBox"
date: 2016-02-21
categories:
- blog
---

> When using VirtualBox, we properly need to share files between the host machine and the guest machine. This posting guides you how to achieve bidirectional file sharing between MacOS host and Ubuntu guest.

## 1. Install VirtualBox Guest Additions
1) Get VBoxGuestAdditions.iso  
In MacOS, Finder->Application->VirtualBox->Show Package Content, find VBoxGuestAdditions.iso in /Contents/MacOS/, copy it to other folder, eg. ~/Downloads/  
2) Insert the Image to Ubuntu VM  
Ubuntu VM->Devices->Optical Drives->Choose disk image.., choose ~/Downloads/VBoxGuestAdditions.iso.  
![MIME Type](/public/pics/2016-02-21/image5.png)  
3) In Ubuntu, select VBoxGuestAdditions.iso, and install.

## 2. Create Shared Folder on MacOS
In MacOS host, create a new folder /UbuntuSF/, which is used to share files with Ubuntu.

## 3. Add Shared Folder to VM's SharedFolders
In VirtualBox, add /UbuntuSF as Ubuntu VM's SharedFolders
![MIME Type](/public/pics/2016-02-21/image6.png)  

## 4. Add User to Group 'vboxsf' in Ubuntu
![MIME Type](/public/pics/2016-02-21/image7.png)  
Then, reboot Ubuntu.

## 5. Check the shared folder in Ubuntu.
Go to directory /media/, there is a new shared folder sf_UbuntuSF.
![MIME Type](/public/pics/2016-02-21/image8.png)  
If you create a new file here, you will see it in /UbuntuSF on MacOS.

## 6. References
* [Manually Installing VirtualBox Guest Additions](https://osquest.com/2012/11/13/tip-manually-installing-virtualbox-guest-additions/)
