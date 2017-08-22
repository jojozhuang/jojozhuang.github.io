---
layout: post
key: blog
title: "Share files between Host and Guest in VirtualBox"
date: 2016-02-13
categories:
- blog
---

> When using VirtualBox, we properly need to share files between the host machine and the guest machine. This posting guides you how to achieve bidirectional file sharing between MacOS host and Ubuntu guest.

## 1. Install VirtualBox Guest Additions
1) Get VBoxGuestAdditions.iso  
In MacOS, Finder->Application->VirtualBox->Show Package Content
![MIME Type](/public/pics/2016-02-13/virtualbox.png)  
Find VBoxGuestAdditions.iso in /Contents/MacOS/.
![MIME Type](/public/pics/2016-02-13/iso.png)  
Copy it to another folder, eg. ~/Downloads/  
2) Insert the Image to Ubuntu VM  
Ubuntu VM->Devices->Optical Drives->Choose disk image..., locate to ~/Downloads/VBoxGuestAdditions.iso.  
![MIME Type](/public/pics/2016-02-13/addimage.png)  
3) In Ubuntu, select VBoxGuestAdditions.iso, and install.
After Guest Additions are installed, a new user group 'vboxsf' has been created.  

## 2. Create Shared Folder on MacOS
In MacOS, create a new folder /UbuntuSF/, which is used to share files with Ubuntu.

## 3. Add Shared Folder to VM's SharedFolders
In VirtualBox, add /UbuntuSF as Ubuntu VM's SharedFolders, set Auto-mount to Yes.
![MIME Type](/public/pics/2016-02-13/sharedfolders.png)  

## 4. Add User to Group 'vboxsf' in Ubuntu
Run the following command in terminal.
```sh
sudo adduser johnny vboxsf
```
![MIME Type](/public/pics/2016-02-13/adduser.png)  
Then, reboot Ubuntu.

## 5. Check the Shared Folder in Ubuntu.
Go to directory /media/, there should be a new shared folder sf_UbuntuSF.
![MIME Type](/public/pics/2016-02-13/ubuntusf.png)  
Create a new file here.
![MIME Type](/public/pics/2016-02-13/sharedfile.png)  
You will see it in /UbuntuSF on MacOS.
![MIME Type](/public/pics/2016-02-13/macsf.png)  

## 6. References
* [Manually Installing VirtualBox Guest Additions](https://osquest.com/2012/11/13/tip-manually-installing-virtualbox-guest-additions/)
