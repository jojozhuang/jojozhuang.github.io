---
layout: post
key: blog
title: "Build Cross-platform Apps with Electron"
date: 2016-11-03
tags: Electron, Node.js
categories: blog
---

> Electron is an open source library developed by GitHub for building cross-platform desktop applications with HTML, CSS, and JavaScript. Electron accomplishes this by combining Chromium and Node.js into a single runtime and apps can be packaged for Mac, Windows, and Linux.

## 1. Setup Development Environment
## 1.1 Install Homebrew on Mac
Homebrew is package manager for Macs which makes installing lots of different software like Git, Ruby, and Node simpler. Homebrew lets you avoid possible security problems associated with using the sudo command to install software like Node.
```sh
$ ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
$ brew update // Update Homebrew
```

## 1.2 Install Node.js and NPM
```sh
$ brew install node
```

npm will be installed along with nodejs.   
Run following commands in terminal to check versions, to make sure node and npm are installed properly.
```sh
$ node -v   //mac
$ nodejs -v //linux
$ npm -v  
```

Update node and npm
```sh
$ brew upgrade node
```

## 1.3 Install Electron
Install Electron globally.
```sh
$ npm install -g electron
```
If you get permission denied error, run the following command instead.
```sh
$ sudo npm install -g electron --unsafe-perm=true --allow-root
```

Check version
```sh
$ electron --version
```

You can also install Electron at package level.
```sh
$ npm install electron --save-dev
```

## 1.4 Install Visual Studio Code
We can use any text editor to develop Electron apps. I choose VSCode, because it supports debugging. VSCode is a free and open source IDE released by Microsoft.  
Go to https://code.visualstudio.com/, download the installer and follow the wizard to install it.

## 2. Build Sample Project for Electron Tutorial
Generally, an Electron app is structured like this:  
your-app/  
├── package.json  
├── main.js  
└── index.html  
## 2.1 Create Project Folder and package.json
```sh
$ cd ~
$ mkdir ElectronTutorial
$ cd ElectronTutorial
$ npm init
```

input the following information
```javascript
{
  "name": "electron-tutorial",
  "version": "1.0.0",
  "description": "Develop cross-platform application with Electron",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Rong Zhuang",
  "license": "GPL-3.0"
}
```

Then, a configuration file named 'package.json' will be created with the above content.

## 2.2 Create main.js
```javascript
const {app, BrowserWindow} = require('electron')
const url = require('url')
const path = require('path')

let win

function createWindow() {
   win = new BrowserWindow({width: 800, height: 600})
   win.loadURL(url.format ({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true
   }))
}

app.on('ready', createWindow)
```

## 2.3 Create index.html
```html
<!DOCTYPE html>
<html>
   <head>
      <meta charset = "UTF-8">
      <title>Hello World!</title>
   </head>

   <body>
      <h1>Hello World!</h1>
      We are using node <script>document.write(process.versions.node)</script>,
      Chrome <script>document.write(process.versions.chrome)</script>,
      and Electron <script>document.write(process.versions.electron)</script>.
   </body>
</html>
```

## 2.4 Launch Electron App
Run this app using the following command:
```sh
$ electron ./main.js
```
A new window will open up, showing 'Hello World'.
![MIME Type](/public/pics/2016-11-03/helloworld.png)  

## 3. Use Popular Libraries
We can leverage all the available tools for front-end web development in Electron. For example, you can use bootstrap, jQuery, AngularJs or ReactJs to build Electron apps.

## 3.1 Install Packages
```sh
$ npm install -g bower       //Install Bower
$ bower install bootstrap    //Install bootstrap
$ npm install --save jquery  //Install jQuery
```

## 3.2 Build UI
1) Update index.html with the following content.
```html
<!DOCTYPE html>
<html>
   <head>
      <meta charset = "UTF-8">
      <title>Hello World!</title>
      <link rel = "stylesheet"
         href = "./bower_components/bootstrap/dist/css/bootstrap.min.css" />
   </head>

   <body>
      <div class = "container">
         <h1>This page is using Bootstrap and jQuery!</h1>
         <h3 id = "click-counter"></h3>
         <button class = "btn btn-success" id = "countbtn">Click here</button>
         <script src = "./view.js" ></script>
      </div>
   </body>
</html>
```
2) Create view.js and enter the click counter logic in it.
```javascript
let $ = require('jquery')  // jQuery now loaded and assigned to $
let count = 0
$('#click-counter').text(count.toString())
$('#countbtn').on('click', () => {
   count ++
   $('#click-counter').text(count)
})
```

3) Run this app using the following command:
```sh
$ electron ./main.js
```
A new window will open up, showing bootstrap UI.
![MIME Type](/public/pics/2016-11-03/bootstrap.png)  

## 4. Inter Process Communication
Electron provides us with 2 IPC (Inter Process Communication) modules called ipcMain and ipcRenderer.
* The ipcMain module is used to communicate asynchronously from the main process to renderer processes.
* The ipcRenderer module is used to communicate asynchronously from a renderer process to the main process.

## 4.1 Create index.html
```html
<!DOCTYPE html>
<html>
   <head>
      <meta charset="UTF-8">
      <title>File read using system dialogs</title>
	  <link rel = "stylesheet"
         href = "./bower_components/bootstrap/dist/css/bootstrap.min.css" />
   </head>
   <body>
	   <div class = "container">
          <h1>Inter Process Communication</h1>
            <textarea id="editor" style="width: 400px; height: 300px;"></textarea>
            <div>
                <button class = "btn btn-success" id = "open">Open File</button>
            </div>
          <script src = "./view_dialog.js" ></script>
       </div>
      <script type="text/javascript">

      </script>
   </body>
</html>
```
## 4.2 Create main.js
In this example, ipcMain receives 'openFile' request from ipcRenderer, and open a dialog to read content from file. Then, notify ipcRenderer and send data to it.
```javascript
const {app, BrowserWindow} = require('electron')
const url = require('url')
const path = require('path')
const {ipcMain} = require('electron')

let win

function createWindow() {
   win = new BrowserWindow({width: 800, height: 600})
   win.loadURL(url.format({
      pathname: path.join(__dirname, 'index_dialog.html'),
      protocol: 'file:',
      slashes: true
   }))
}

ipcMain.on('openFile', (event, path) => {
      const {dialog} = require('electron')
      const fs = require('fs')
      dialog.showOpenDialog({ filters: [{ name: 'text', extensions: ['txt']}]}, function (fileNames) {
            // fileNames is an array that contains all the selected
            if(fileNames === undefined){
                  console.log("No file selected");
            }else{
                  readFile(fileNames[0]);
            }
      });

      function readFile(filepath){
            fileName = filepath
            fs.readFile(filepath, 'utf-8', (err, data) => {
            if(err){
                  alert("An error ocurred reading the file :" + err.message)
                  return
            }
            // handle the file content
            event.sender.send('fileData', data)
            })
      }
})
app.on('ready', createWindow)
```

## 4.3 Create view_dialog.js
When open button is click, ipcRenderer send a 'openFile' request to ipcMain. Later, it receives the data from ipcMain and show it in the textbox.
```javascript
let $ = require('jquery')
const {ipcRenderer} = require('electron')

$('#open').on('click', () => {
    ipcRenderer.send('openFile', () => {
        console.log("Event sent.");
     })

     ipcRenderer.on('fileData', (event, data) => {
        $("#editor").val(data);
     })
})
```

## 4.4 Run
Run this app using the following command:
```sh
$ electron ./main.js
```
A new window will open up, showing a textbox and a button. Click on that button, select a txt file, then its content would be shown in the textbox.
![MIME Type](/public/pics/2016-11-03/ipc.png)  

## 5. Debugging
## 5.1 Dev Tools in Chrome
First, you can use the dev tools for Electron apps. Shortcut: Command + Option + I.
![MIME Type](/public/pics/2016-11-03/devtools.png)  
## 5.2 Debug with VSCode
Second, you can also use VSCode for debugging main process.  
1) Create '.vscode' folder in the root of project. Then, create launch.json file inside it.
![MIME Type](/public/pics/2016-11-03/launch.png)  

Paste the following content to launch.json.
```javascript
{
    "version": "0.2.0",
    "configurations": [

        {
            "name": "Launch",
            "type": "node",
            "request": "launch",
            "program": "${workspaceRoot}/main_dialog.js",
            "stopOnEntry": false,
            "args": [],
            "cwd": "${workspaceRoot}",
            //"runtimeExecutable": "${workspaceRoot}/node_modules/.bin/electron",
            "runtimeArgs": [
                ".",
                "--enable-logging"
            ],
            "env": {},
            "externalConsole": true,
            "sourceMaps": false,
            "outDir": null
        },
        {
            "name": "Attach",
            "type": "node",
            "request": "attach",
            "port": 5858,
            "sourceMaps": false,
            "outDir": null
        }
    ]
}
```

2) Click the green arrow button and start to debug.
![MIME Type](/public/pics/2016-11-03/debuginvsc.png)  

## 6. Packaging
There are two modules support you to package your Electron apps.
* electron-builder
* electron-packager

I will use the electron-builder for packaging.

Install electron-builder
```sh
$ npm install electron-builder --save-dev
```

Add the following content to package.json.
```javascript
   "scripts": {
    "postinstall": "install-app-deps",
    "start": "npm install && electron ./app",
    "pack": "build --dir",
    "dist": "build"
  },
  "build": {
    "appId": "yourappid",
    "dmg": {
      "contents": [
        {
          "x": 110,
          "y": 150
        },
        {
          "x": 240,
          "y": 150,
          "type": "link",
          "path": "/Applications"
        }
      ]
    },
    "linux": {
      "target": [
        "AppImage",
        "deb"
      ]
    },
    "win": {
      "target": "squirrel",
      "icon": "build/icon.ico"
    }
  },
```

Use the following command to package your app into an installer:
```sh
$ npm run dist
```

You will get the update from builder.
```sh
$ npm run dist
> electron-tutorial@1.0.0 dist /Tutorials/ElectronTutorial
> build

electron-builder 19.26.3
No native production dependencies
Packaging for darwin x64 using electron 1.4.13 to dist/mac
Building macOS zip
Building DMG
```

Finally, you will get the executable file and installer in dist folder.
![MIME Type](/public/pics/2016-11-03/packaging.png)  

## 7. Source Code
* [Source code files of Electron Tutorial on Github](https://github.com/jojozhuang/Tutorials/tree/master/ElectronTutorial)

## 8. References
* [Electron Tutorial](https://www.tutorialspoint.com/electron/index.htm)
* [Electron Gitbook](https://xwartz.gitbooks.io/electron-gitbook/content/en/tutorial/quick-start.html)
* [Electron on Github](https://github.com/electron/electron)
* [Installing Node.js and NPM on Mac](https://treehouse.github.io/installation-guides/mac/node-mac.html)
* [Getting Started With Standard Dialogs in Electron](http://mylifeforthecode.com/getting-started-with-standard-dialogs-in-electron/)
* [Electron Dialog](https://github.com/electron/electron/blob/master/docs/api/dialog.md)
* [Debug Electron App with VSCode](http://code.matsu.io/1)
* [Debugging Electron in Visual Studio Code](http://electron.rocks/debugging-electron-in-vs-code/)
* [Electron-Packager](https://github.com/electron-userland/electron-packager)
* [A complete guide to packaging your Electron app](https://medium.com/@meakaakka/a-complete-guide-to-packaging-your-electron-app-1bdc717d739f)
