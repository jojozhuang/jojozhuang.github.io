---
layout: post
key: blog
title: "Android Development Environment Setup on Mac"
date: 2016-06-03
tags: [Android Studio, Genymotion, JDK]
---

> Introduce how to setup Android development environment on Mac.

## 1. Development of Android
In order to develop Android applications, you must have the following software installed on your system:
* Java Development Kit (JDK)
* Android Studio
* Genymotion(Emulator, it is optional)

## 2. Installing JDK on Mac
### 2.1 Downloading Oracle JDK
Download the latest version of JDK from [http://www.oracle.com/technetwork/java/javase/downloads/index.html](http://www.oracle.com/technetwork/java/javase/downloads/index.html). Select JDK, in the next page, accept the license and choose 'jdk-8u151-macosx-x64.dmg' to download.
### 2.2 Installing JDK
After downloading finish, double click on the installer. Follow the wizard to install JDK.
![MIME Type](/public/pics/2016-06-03/installjdk.png){:width="600px"}  
Finally, JDK is installed to /Library/Java/JavaVirtualMachines/jdk1.8.0_151.jdk/.
### 2.3 Checking Java Version
```sh
$ java -version
```
You should be able to see the java information like below.
```sh
java version "1.8.0_151"
Java(TM) SE Runtime Environment (build 1.8.0_151-b12)
Java HotSpot(TM) 64-Bit Server VM (build 25.151-b12, mixed mode)
```

## 3. Installing Android Studio
### 3.1 Downloading Android Studio for Mac
Go to https://developer.android.com/studio/index.html, download Android Studio for Mac, eg. 'android-studio-ide-171.4408382-mac.dmg'.
### 3.2 Installing Android Studio
Installation is simple, just double click on the installer file, and move the Android Studio to Applications folder.
![MIME Type](/public/pics/2016-06-03/installandroidstudio.png){:width="600px"}  
### 3.3 Launch Android Studio
![MIME Type](/public/pics/2016-06-03/launch.png){:width="600px"}  
### 3.4 Configuration of Android Studio
Android SDK
Virtual Devices

## 4. Installing Genymotion
### 4.1 Creating Genymotion Account
Go to https://www.genymotion.com/account/create/, create an account on Genymotion.
### 4.2 Downloading and Installing Genymotion
Go to https://www.genymotion.com/download/, download Genymotion for Mac, eg. 'genymotion-2.11.0.dmg'. Double click on the installer file, and move Genymotion and Genymotion Shell to Applications folder.
![MIME Type](/public/pics/2016-06-03/installgenymotion.png){:width="600px"}  
### 4.3 Launching Genymotion
Login with the account created in previous step, select `free personal use` license.
### 4.4 Adding Virtual Device
Choose `Google Nexus 5X` as device model, and select the proper API version.
![MIME Type](/public/pics/2016-06-03/createvirtualdevice.png){:width="650px"}  
Click Next to confirm the device settings.
![MIME Type](/public/pics/2016-06-03/createvirtualdevice2.png){:width="800px"}  
Create another virtual device for `Google Nexus 9`.
![MIME Type](/public/pics/2016-06-03/createvirtualdevice3.png){:width="650px"}  
Click Next to confirm the device settings.
![MIME Type](/public/pics/2016-06-03/createvirtualdevice4.png){:width="800px"}  
Now, we have two virtual devices, one is for phone, another is for pad.
![MIME Type](/public/pics/2016-06-03/genymotion.png){:width="650px"}  
### 4.5 Starting Virtual Device
Click the Start button to launch the virtual device. It's running now.
![MIME Type](/public/pics/2016-06-03/running.png){:width="400px"}  
### 4.6 Choosing Genymotion Virtual Device in Android Studio
In Android, when starting testing, we can now select the virtual device created in Genymotion.
![MIME Type](/public/pics/2016-06-03/selectemulator.png){:width="600px"}  
Click OK. App from Android Studio is deployed to Genymotion virtual devices. You can start testing now.
![MIME Type](/public/pics/2016-06-03/working.png){:width="400px"}  

## 5. References
* [Set Up Your Android Development Environment](https://trailhead.salesforce.com/en/projects/mobilesdk_setup_dev_tools/steps/mobilesdk_setup_android)
