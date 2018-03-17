---
layout: post
key: blog
title: "Installing and Using Cordova on Mac[Draft]"
date: 2017-07-26
tags: [Elasticsearch]
---

> Tutorial for how to install and use Cordova for hybrid mobile development.

## 1. What is Cordova?  
[Cordova](https://cordova.apache.org/) is a platform for building hybrid mobile applications using HTML, CSS and JavaScript.

## 2. Installation
* NodeJS and NPM
* Android SDK
* XCode

### 2.1 Installing Cordova
```sh
npm install -g cordova
cordova -v
7.1.0
```
create cordova app
```sh
cordova create MyApp
```
add platforms
```sh
cordova platform add browser
cordova platform add ios
cordova platform add android
```
remove platform
```sh
cordova platform rm browser
cordova platform rm ios
cordova platform rm android
```
run
```sh
cordova build android
cordova emulate android
cordova run android
```
### 3. browser
```sh
cordova platform add browser
cordova run browser
```
![image](/public/posts/2017-07-26/run_browser.png)

### 3. ios
Install Xcode.

Then, set command line tools. In xcode, go in Preferences > Location > Command Line Tools. It's blank by default. Select Xcode version.
![image](/public/posts/2017-07-26/xcode_commandlinetools.png){:width="800px"}  

Install xcode-select.
```sh
$ xcode-select --install
```

Deployment Tools
```sh
npm install -g ios-deploy
```

Compile for ios.
```sh
cordova build ios
```

Deploying to Simulator  
Open the workspace file (platforms/ios/HelloWorld.xcworkspace) from Xcode, or from the command line:
```sh
open ./platforms/ios/HelloCordova.xcworkspace
```
![image](/public/posts/2017-07-26/xcode_project.png)  
![image](/public/posts/2017-07-26/run_ios.png){:width="400px"}  

### 4. android
JDK, Android SDK, AVD.

Compile android.
```sh
cordova build android
```
if you get 'Error: spawn EACCES' error. Execute the following command to set the permissions for gradle. Then, run build again.
```sh
chmod 777 /Applications/Android\ Studio.app/Contents/gradle/gradle-4.1/bin/gradle
```

Open Android Studio, launch Emulator.

then in command line.
```sh
cordova run android
```
![image](/public/posts/2017-07-26/run_android.png){:width="400px"}  

## 5. cordova
config.xml

local storage

## 3. Reference
* [Cordova Official Documentation](https://cordova.apache.org/docs/en/latest/)
* [Cordova Tutorial](https://www.tutorialspoint.com/cordova/index.htm)  
