---
layout: project
key: project
title: "Game 2048(Electron)"
index: 230
category: web
image: game2048electron/thumbnail.png
tags: [Electron, Node.js, Cross-platform]
---

> A cross-platform desktop app for Game 2048, built with Electron and Node.js

## 1. 2048
2048 is a famous number puzzle game, you can play it online at https://gabrielecirulli.github.io/2048/. It also has iOS and Android apps for mobile devices. I converted this game from a web application to `desktop` application with [Electron](https://electron.atom.io/) for all platforms, OS X, Windows and Linux.

## 2. UI
The user interface looks same with the web application. Click `New Game` to start and use four arrow keys on keyboard to move the tiles for playing.
![image](/assets/images/project/game2048electron/2048.png)  
### 2.1 Play on Mac
![image](/assets/images/project/game2048electron/mac.png){:width="400px"}  
### 2.2 Play on Ubuntu/Linux
![image](/assets/images/project/game2048electron/linux.png){:width="400px"}  

## 3. Under the Hood
Check posting [Converting Web App to Desktop App with Electron]({% link _tutorial/node-js/converting-web-app-to-desktop-app-with-electron.md %}) to learn the details of Electron and how this desktop app was built.

Notice, Electron is used to build __cross-platform desktop apps__ with JavaScript, HTML, and CSS. To develop __cross-platform mobile apps__, maybe you need [Xamarin](https://www.xamarin.com/) or [Cordova](https://cordova.apache.org/) instead.

## 4. Source Files
* [Source files of Game 2048 on Github](https://github.com/jojozhuang/game-2048-electron)
