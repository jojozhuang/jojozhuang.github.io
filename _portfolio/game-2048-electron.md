---
layout: portfolio
key: portfolio
title: "Game 2048"
index: 65
tags: [Electron, Node.js, Cross-platform]
image: /assets/game2048electron/thumbnail.png
excerpt: A cross-platform desktop app for 2048, developed with Electron and Node.js
category: java
---

> Convert 2048 from a web application to desktop application for all platforms, OS X, Windows and Linux.

## 1. 2048
2048 is a famous number puzzle game, you can try it online through https://gabrielecirulli.github.io/2048/. It also has iOS and Android versions for mobile devices. I converted it to Desktop application with [Electron](https://electron.atom.io/).

## 2. UI
The UI is same with the web application, just click New Game to start and use four arrow keys on keyboard to move the tiles for playing.
![image](/assets/game2048electron/2048.png)  
### 2.1 Play on Mac
![image](/assets/game2048electron/mac.png){:width="400px"}  
### 2.2 Play on Ubuntu/Linux
![image](/assets/game2048electron/linux.png){:width="400px"}  

## 3. Under the Hood
Check posting [Convert Web App to Desktop App with Electron]({% link _posts/2016-11-08-converting-web-app-to-desktop-app-with-electron.md %}) to learn the details of the conversion with Electron.

Notice, Electron is used to build __cross-platform desktop apps__ with JavaScript, HTML, and CSS. To develop __cross-platform mobile apps__, maybe you need [Xamarin](https://www.xamarin.com/) or [Cordova](https://cordova.apache.org/) instead.

## 4. Source Files
* [Source files of Game 2048 on Github](https://github.com/jojozhuang/Portfolio/tree/master/Game2048)
