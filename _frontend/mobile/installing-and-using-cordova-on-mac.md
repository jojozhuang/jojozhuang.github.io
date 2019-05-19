---
layout: tutorial
key: frontend
title: "Installing and Using Cordova on MacOS"
index: 610
category: mobile
image: mobiledev.png
date: 2018-01-10
postdate: 2017-07-26
tags: [Cordova]
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
```sh
npm install -g cordova
cordova -v
7.1.0
```
### 2.3 Using Cordova
Create cordova app.
```sh
cordova create MyApp
```
Add platforms.
```sh
cordova platform add browser
cordova platform add ios
cordova platform add android
```
Remove platform.
```sh
cordova platform rm browser
cordova platform rm ios
cordova platform rm android
```
Build and run.
```sh
cordova build android
cordova emulate android
cordova run android
```
## 3. Cordova Projects
### 3.1 Browser
```sh
cordova platform add browser
cordova run browser
```
Access http://localhost:8000/index.html in web browser.
![image](/public/images/frontend/610/run_browser.png){:width="800px"}
### 3.2 iOS
Install Xcode, then set command line tools. In Xcode, go to Preferences > Location > Command Line Tools. It's blank by default. Select Xcode version.
![image](/public/images/frontend/610/xcode_commandlinetools.png){:width="800px"}
Install xcode-select.
```sh
$ xcode-select --install
```
Install deployment tools.
```sh
npm install -g ios-deploy
```
Compile for iOS.
```sh
cordova platform add ios
cordova build ios
```
Deploying to Simulator. Open the workspace file (platforms/ios/HelloWorld.xcworkspace) from Xcode, or from the command line:
```sh
open ./platforms/ios/HelloCordova.xcworkspace
```
![image](/public/images/frontend/610/xcode_project.png)
In Xcode, click run button to start simulator.
![image](/public/images/frontend/610/run_ios.png){:width="400px"}  
### 3.3 Android
Install JDK, Android SDK and AVD first.

Compile android.
```sh
cordova platform add android
cordova build android
```
If you get 'Error: spawn EACCES' error. Execute the following command to set the permissions for gradle. Then, run build again.
```sh
chmod 777 /Applications/Android\ Studio.app/Contents/gradle/gradle-4.1/bin/gradle
```
Open Android Studio, launch Emulator, then run.
```sh
cordova run android
```
![image](/public/images/frontend/610/run_android.png){:width="400px"}  

## 4. Others
config.xml, local storage

## 5. Reference
* [Cordova Official Documentation](https://cordova.apache.org/docs/en/latest/)
* [Cordova Tutorial](https://www.tutorialspoint.com/cordova/index.htm)  
