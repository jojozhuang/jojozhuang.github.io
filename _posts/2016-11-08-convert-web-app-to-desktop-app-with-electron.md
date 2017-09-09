---
layout: post
key: portfolio
title: "Convert Web App to Desktop App with Electron"
date: 2016-11-08
tags: Electron, 2048, Cross-platform
categories:
- portfolio
---

> Electron is used to build cross platform desktop apps with JavaScript, HTML, and CSS. We will use it to wrap famous 2048 game to.

## 1. Electron
If you haven't installed Electron or you want to learn the basic knowledge of Electron, please check my previous posting [Build Cross-platform Apps with Electron](http://jojozhuang.github.io/blog/2016/11/03/build-cross-platform-apps-with-electron/) first.

## 2. Game 2048
2048 is a famous number puzzle game, you can try it online https://gabrielecirulli.github.io/2048/. It also has iOS and Android version for mobile devices. In this tutorial, I will wrap this web application with Electron, and build a Cross-platform app for Mac, Linux and Windows.

## 3. Steps for Conversion
### 3.1 Get Source Files for 2048
Clone source code from github.
```sh
mkdir Game2048
cd Game2048
git clone https://github.com/gabrielecirulli/2048
```
### 3.2 Create Files
Create main.js
```javascript
const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

let win

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({width: 800, height: 600})

  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))
}
app.on('ready', createWindow)
```
Create package.json.
```javascript
{
  "name": "2048",
  "version": "1.0.0",
  "description": "Popular 2048 Number Puzzle Game",
  "main": "main.js",
  "scripts": {
    "start": "electron ."
  },
  "repository": "https://github.com/jojozhuang/Portfolio/tree/master/Game2048",
  "author": "Johnny",
  "license": "MIT",
  "devDependencies": {
    "electron": "~1.6.2"
  }
}
```
Run, you should see 2048.
```sh
npm install
npm start
```
### 3.3 Beautify UI
1) Set Window Size
* Make Window Has the Proper Size
* Disable resizable
* Set Window Title to 2048

```sh
function createWindow() {
   win = new BrowserWindow({
        width: 530,
        height: 740,
        minWidth: 530,
        minHeight: 740,
        resizable: false,
        title: config.windowtitle,
        icon: path.join(__dirname, 'build/icon.icns') })
   win.loadURL(url.format ({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true
   }))
}
```

2) Set menu
Set menu for this app.
notice during development, the first menu item is always electron.
after build, it would be correct.

```javascript
function setMainMenu() {
    let template = [
        {
            label: 'View',
            submenu: [
                {
                    role: 'reload'
                },
                {
                    role: 'toggledevtools'
                },
                {
                    type: 'separator'
                },
                {
                    role: 'resetzoom'
                },
                {
                    type: 'separator'
                }
            ]
        },
        {
            role: 'window',
            submenu: [
                {
                    role: 'minimize'
                },
                {
                    role: 'close'
                }
            ]
        },
        {
            label: 'Help',
            role: 'help',
            submenu: [{
                label: 'Learn More',
                click: function () {
                    electron.shell.openExternal('http://jojozhuang.github.io/blog/2016/11/03/build-cross-platform-apps-with-electron/')
                }
            }]
       }
    ];

    if (process.platform === 'darwin') {
        const name = config.windowtitle;
        template.unshift({
          label: name,
          submenu: [{
            label: `About ${name}`,
            role: 'about'
          }, {
            type: 'separator'
          }, {
            type: 'separator'
          }, {
            label: `Hide ${name}`,
            accelerator: 'Command+H',
            role: 'hide'
          }, {
            label: 'Hide Others',
            accelerator: 'Command+Alt+H',
            role: 'hideothers'
          }, {
            label: 'Show All',
            role: 'unhide'
          }, {
            type: 'separator'
          }, {
            label: 'Quit',
            accelerator: 'Command+Q',
            click: function () {
              app.quit()
            }
          }]
        })

        addUpdateMenuItems(template[0].submenu, 1)
    }
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
}
```
### 3.4 Beautify UI
```sh
npm start
```
![MIME Type](/public/pics/2016-11-08/run2.png)  
## 4. Package
Use electron-build for packaging.
### 4.1 Set Icon
The icons on different operating system are different.
* icns -> OS X
* ico -> Windows
* png -> Linux

Search 2048 image through Google, then use [online icon converter](https://iconverticons.com/online/) to create all these kinds of icon/images.

For mac, create build folder and put icons into it.

during development, you can change icon on mac.
to build with icon, put all icons into build directory, name should be icon.ico, icon.icns.
![MIME Type](/public/pics/2016-11-08/icons.png)  

For linux, set icon for browser window.
```javascript
icon: path.join(__dirname, 'build/icons/64x64.png') })
```
icon will show after run
```sh
npm start
electron ./main.js
```
### 4.2 Settings For Linux Packaging
1) Specify homepage in package.json
2) Set name and email for author
```javascript
{
  "name": "2048",
  "windowtitle": "2048",
  "version": "1.0.0",
  "description": "Popular 2048 Number Puzzle Game",
  "homepage": "https://github.com/jojozhuang/Portfolio",
  "main": "main.js",
  "author": {
    "name": "Rong Zhuang",
    "email": "jojozhuang@gmail.com"
  },
  ...
}
```
3) The final structure of the project.
![MIME Type](/public/pics/2016-11-08/structure.png)  
### 4.3 Run Packaging
1) Run command
```sh
npm run dist
```
Output on Mac.
![MIME Type](/public/pics/2016-11-08/buildmac.png)  
Click on the icon, run 2048. Notice, we have the icon on dock and correct menu.
![MIME Type](/public/pics/2016-11-08/uimac.png)  

Output on Ubuntu.
Specify icon directory for linux in package.json.
```sh
"linux": {
      "target": [
        "AppImage",
        "deb"
      ],
      "icon": "build/icons/"
    },
```
![MIME Type](/public/pics/2016-11-08/buildubuntu.png)  
Click on the icon, run 2048. Notice, we have the icon on dock and correct menu.
![MIME Type](/public/pics/2016-11-08/uiubuntu.png)  

## 5. Source Code
* [Source code files of 2048 on Github](https://github.com/jojozhuang/Portfolio/tree/master/Game2048)
## 6. References
* [Electron Documentation](https://electron.atom.io/docs/all/)
* [BrowserWindow](https://electron.atom.io/docs/api/browser-window/)
* [4 must-know tips for building cross platform Electron apps](https://blog.avocode.com/blog/4-must-know-tips-for-building-cross-platform-electron-apps)
* [electron-quick-start](https://github.com/electron/electron-quick-start)
* [Electron API Demos](https://github.com/electron/electron-api-demos)
* [Configuration](https://www.electron.build/configuration/configuration)
