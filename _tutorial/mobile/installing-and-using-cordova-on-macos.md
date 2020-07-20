---
layout: tutorial
key: tutorial
title: "Installing and Using Cordova on macOS"
index: 8541
subcategory: mobile
date: 2017-07-26
tags: [Cordova, macOS]
---

> Tutorial for how to install and use Cordova for hybrid mobile development.

## 1. What is Cordova?  
[Cordova](https://cordova.apache.org/) is a platform for building hybrid mobile applications using HTML, CSS and JavaScript.

## 2. Installation
### 2.1 Prerequisites
Install the following tools first.
* NodeJS and NPM
* Android SDK
* XCode

### 2.2 Installing Cordova
Install and check version.
```raw
npm install -g cordova
cordova -v
7.1.0
```
### 2.3 Using Cordova
Create cordova app.
```raw
cordova create MyApp
```
Add platforms.
```raw
cordova platform add browser
cordova platform add ios
cordova platform add android
```
Remove platform.
```raw
cordova platform rm browser
cordova platform rm ios
cordova platform rm android
```
Build and run.
```raw
cordova build android
cordova emulate android
cordova run android
```
## 3. Cordova Projects
### 3.1 Browser
```raw
cordova platform add browser
cordova run browser
```
Access http://localhost:8000/index.html in web browser.
![image](/assets/images/mobile/8541/run_browser.png){:width="800px"}
### 3.2 iOS
Install Xcode, then set command line tools. In Xcode, go to Preferences > Location > Command Line Tools. It's blank by default. Select Xcode version.
![image](/assets/images/mobile/8541/xcode_commandlinetools.png){:width="800px"}
Install xcode-select.
```raw
$ xcode-select --install
```
Install deployment tools.
```raw
npm install -g ios-deploy
```
Compile for iOS.
```raw
cordova platform add ios
cordova build ios
```
Deploying to Simulator. Open the workspace file (platforms/ios/HelloWorld.xcworkspace) from Xcode, or from the command line:
```raw
open ./platforms/ios/HelloCordova.xcworkspace
```
![image](/assets/images/mobile/8541/xcode_project.png)
In Xcode, click run button to start simulator.
![image](/assets/images/mobile/8541/run_ios.png){:width="400px"}  
### 3.3 Android
Install JDK, Android SDK and AVD first.

Compile android.
```raw
cordova platform add android
cordova build android
```
If you get 'Error: spawn EACCES' error. Execute the following command to set the permissions for gradle. Then, run build again.
```raw
chmod 777 /Applications/Android\ Studio.app/Contents/gradle/gradle-4.1/bin/gradle
```
Open Android Studio, launch Emulator, then run.
```raw
cordova run android
```
![image](/assets/images/mobile/8541/run_android.png){:width="400px"}  

## 4. Others
config.xml, local storage

## 5. Reference
* [Cordova Official Documentation](https://cordova.apache.org/docs/en/latest/)
* [Cordova Tutorial](https://www.tutorialspoint.com/cordova/index.htm)  
