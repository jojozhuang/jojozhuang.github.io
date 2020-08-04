---
layout: tutorial
key: tutorial
title: "Converting Web App to Desktop App with Electron"
index: 8732
subcategory: node-js
date: 2017-11-03
tags: [Electron, 2048]
---

>  Wrap a web application of game 2048 and convert it to desktop application.

## 1. Installing Electron
If you haven't installed [Electron](https://electron.atom.io/) or you want to learn the basic knowledge of Electron, please check my previous posting [Building Cross-platform Desktop Apps with Electron]({% link _tutorial/node-js/building-cross-platform-desktop-apps-with-electron.md %}) first.

## 2. 2048
2048 is a famous number puzzle game, you can try it online at [https://gabrielecirulli.github.io/2048/](https://gabrielecirulli.github.io/2048/). It also has iOS and Android version for mobile devices. In this tutorial, I will wrap this web application with Electron, and build a Cross-platform app for Mac, Linux and Windows.
![image](/assets/images/backend/8732/2048.png)  

## 3. Steps for Conversion
### 3.1 Getting Source Files for 2048
Clone source code from github.
```raw
$ mkdir Game2048
$ cd Game2048
$ git clone https://github.com/gabrielecirulli/2048
```
### 3.2 Creating Files
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
```json
{
  "name": "2048",
  "version": "1.0.0",
  "description": "Popular 2048 Number Puzzle Game",
  "main": "main.js",
  "scripts": {
    "start": "electron ."
  },
  "repository": "https://github.com/jojozhuang/game-2048-electron",
  "author": "Johnny",
  "license": "MIT",
  "devDependencies": {
    "electron": "~1.6.2"
  }
}
```
Run, you should see 2048 is running.
```raw
$ npm install
$ npm start
```
### 3.3 Beautifying UI
1) Set Window Size
* Make the window just fit the page size
* Disable resizable
* Set window title to 2048

```raw
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

2) Set Menu
Define menu template in JSON format. If you are using Mac OS for development, the title of the first menu item is always 'electron'. After build, it would be correct. You can add menu item for specific platform.
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
        }
    ];

    if (process.platform === 'darwin') {
        const name = config.windowtitle;
        template.unshift({
          label: name,
          submenu: [{
            label: 'About ${name}',
            role: 'about'
          }, {
            type: 'separator'
          }, {
            type: 'separator'
          }, {
            label: 'Hide ${name}',
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
### 3.4 Running and Testing
Run the following command to start the app.
```raw
$ npm start
```
Notice, the window title has been set to 2048. And the menu is also changed except the first one.
![image](/assets/images/backend/8732/run2.png)  
## 4. Packaging
We need to create installer for this app. We will use electron-build for packaging.
### 4.1 Setting Icon
The icons on different operating system are different.
* .icns -> OS X
* .ico -> Windows
* .png -> Linux

Search 2048 image through Google, then use [Online Icon Converter](https://iconverticons.com/online/) to create all kinds of icons/images at once.

To use electron-build for building, we need to create a folder named 'build' and put all icons into it.
![image](/assets/images/backend/8732/icons.png)  

### 4.2 Settings For Linux Packaging
1) Specify homepage attribute in package.json  
2) Set name and email for author
```json
{
  "name": "2048",
  "windowtitle": "2048",
  "version": "1.0.0",
  "description": "Popular 2048 Number Puzzle Game",
  "homepage": "https://github.com/jojozhuang/Portfolio",
  "main": "main.js",
  "author": {
    "name": "Johnny",
    "email": "csgeek@mail.com"
  }

}
```
3) The final structure of the project.
![image](/assets/images/backend/8732/structure.png){:width="400px"}  
### 4.3 Running Packaging
1) Run following command to start packaging.
```raw
$ npm run dist
```
2) Mac  
Output on Mac. One executable file, one installer file and one compressed file.
![image](/assets/images/backend/8732/buildmac.png)  
Click on the executable file, run 2048. Notice, we have the icon on dock and correct menu on the top.
![image](/assets/images/backend/8732/uimac.png)  

3) Linux  
Specify icon directory for linux in package.json.
```raw
"linux": {
      "target": [
        "AppImage",
        "deb"
      ],
      "icon": "build/icons/"
    },
```
Output on Ubuntu. One executable file, one deb installer file and one unpacked folder.
![image](/assets/images/backend/8732/buildubuntu.png)  
Click on installer file(2048_1.0.0_amd64.deb) to install this app on Ubuntu, then run it. Notice, we have the icon on dock and correct menu on the top.
![image](/assets/images/backend/8732/uiubuntu.png)  

## 5. Source Files
* [Source files of Game 2048 on Github](https://github.com/jojozhuang/game-2048-electron)

## 6. References
* [Electron Documentation](https://electron.atom.io/docs/all/)
* [BrowserWindow](https://electron.atom.io/docs/api/browser-window/)
* [4 must-know tips for building cross platform Electron apps](https://blog.avocode.com/blog/4-must-know-tips-for-building-cross-platform-electron-apps)
* [electron-quick-start](https://github.com/electron/electron-quick-start)
* [Electron API Demos](https://github.com/electron/electron-api-demos)
* [Configuration](https://www.electron.build/configuration/configuration)
