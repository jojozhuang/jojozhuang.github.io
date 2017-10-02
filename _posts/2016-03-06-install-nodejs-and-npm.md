---
layout: post
key: blog
title: "Install Node.js and NPM"
date: 2016-03-06
tags: [Node.js, NPM]
---

> Tutorial for how to install Node.js and npm on Ubuntu and Mac.

## 1. What is Node.js
[Node.js](https://nodejs.org) is a very powerful JavaScript-based framework/platform built on Google Chrome's JavaScript V8 Engine. It is used to develop I/O intensive web applications like video streaming sites, single-page applications, and other web applications. Node.js is open source, completely free, and used by thousands of developers around the world.

[NPM](https://www.npmjs.com/) is a package manager that makes installing Node 'packages' fast and easy.

## 2. Install Node.js and NPM on Ubuntu
Update your local package index:
```sh
$ sudo apt-get update
```
Install potential unmet dependencies:
```sh
$ sudo apt-get -f install
```
Install Node.js:
```sh
$ sudo apt-get install nodejs
```
Check Node.js version to make sure it has been installed properly.
```sh
$ nodejs -v
```
Install NPM:
```sh
$ sudo apt-get install npm
```
Check NPM version:
```sh
$ npm -v  
```

## 3. Install Node.js and NPM on Mac
Updates Homebrew with a list of the latest version of Node.
```sh
$ brew update
```
Run the below command to install node.js. Notice that npm will be installed together with nodejs.
```sh
$ brew install node
```

Check versions to make sure nodejs and npm are both installed properly.
```sh
$ node -v   // check node.js version
$ npm -v    // check npm version
```

Use the following command to update node and npm if necessary.
```sh
$ brew upgrade node
```

## 4. Verify Installation
Use 'Hello World' application to verify Node.js is installed properly.  
Create a file named main.js having the following codes.
```javascript
/* Hello, World from node.js! */
console.log("Hello, World!")
```
Execute main.js with `node` command.
```sh
$ node main.js
```
If everything is fine with your installation, this should produce the following result:
```sh
Hello, World!
```

## 5. References
* [Node.js Tutorial](https://www.tutorialspoint.com/nodejs/index.htm)
* [Install Node.js - Ubuntu](https://www.godaddy.com/help/install-nodejs-ubuntu-17395)
* [Installing Node.js and NPM on Mac](https://treehouse.github.io/installation-guides/mac/node-mac.html)
