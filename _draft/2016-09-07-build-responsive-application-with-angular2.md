---
layout: post
key: blog
title: "Build Responsive Application with Angular2"
date: 2016-09-07
tags: Angular2
categories:
- blog
---

> Create Responsive Website with Angular2.


Features of Angular 2
* Components
* TypeScript
* Services

Components of Angular 2
* Modules
* Component
* Templates
* Metadata
* Service

## 1. Setup Development Environment
## 1.1 Install Homebrew on Mac
Homebrew is package manager for Macs which makes installing lots of different software like Git, Ruby, and Node simpler. Homebrew lets you avoid possible security problems associated with using the sudo command to install software like Node.
```sh
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
brew update // Update Homebrew
```

## 1.2 Install Node.js and NPM
```sh
brew install node
```

npm will be installed along with nodejs.   
Run following commands in terminal to check versions, to make sure node and npm are installed properly.
```sh
node -v
npm -v
```

Update node and npm
```sh
brew upgrade node
```

## 1.3 Install Node.js and NPM
```sh
$ brew install git
$ git --version
```

## 1.4 Install Visual Studio Code
Go to https://code.visualstudio.com/, download the installer and follow the wizard to install it.


## 2. Build Sample Project for Electron Tutorial
Generally, an Electron app is structured like this:  
your-app/  
├── package.json  
├── main.js  
└── index.html  
## 2.1 Create Project
```sh
$ cd ~
$ mkdir Angular2Tutorial
$ cd Angular2Tutorial
$ git clone https://github.com/angular/quickstart .
```

Open the folder Angular2Tutorial in Visual Studio Code
![MIME Type](/public/pics/2016-09-07/initial.png)  

Install all dependencies
```sh
npm install
```
## 2.2 Run Project
```sh
npm start
```
The Angular2 application will be launched. Access the address http://localhost:3000/ in browser.
![MIME Type](/public/pics/2016-09-07/helloworld.png)  


## 9. References
* [Official website](https://angular.io/)
* [Angular QuickStart Source](https://github.com/angular/quickstart)
