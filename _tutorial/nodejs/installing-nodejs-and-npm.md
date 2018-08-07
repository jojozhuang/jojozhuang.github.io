---
layout: tutorial
key: tutorial
title: "Installing Node.js and NPM"
index: 201
category: nodejs
image: nodejs.png
date: 2016-09-01
postdate: 2016-03-06
tags: [Node.js, NPM]
---

> Tutorial for how to install Node.js and npm on Ubuntu and Mac.

## 1. What is Node.js
[Node.js](https://nodejs.org) is a very powerful JavaScript-based framework/platform built on Google Chrome's JavaScript V8 Engine. It is used to develop I/O intensive web applications like video streaming sites, single-page applications, and other web applications. Node.js is open source, completely free, and used by thousands of developers around the world.

[NPM](https://www.npmjs.com/) is a package manager that makes installing Node 'packages' fast and easy.

## 2. Core Concepts of Node.js
* Blocking and Non-blocking Calls
* Single thread, Event Loop
* Timers

## 3. Installing Node.js and NPM on Ubuntu
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

## 4. Installing Node.js and NPM on RedHat
Enter the following command to download the scripts that are required to set up Node.js:
```sh
$ sudo rpm -Uvh https://rpm.nodesource.com/pub_4.x/el/7/x86_64/nodesource-release-el7-1.noarch.rpm
```
Install Node.js:
```sh
$ sudo yum install -y nodejs
```

Check versions to make sure nodejs and npm are both installed properly.
```sh
$ node -v   // check node.js version
$ npm -v    // check npm version
```

## 5. Installing Node.js and NPM on Mac
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

## 6. Verifying Installation
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
![image](/public/tutorials/201/testnode.png){:width="600px"}

## 7. References
* [Nodejs Guides](https://nodejs.org/en/docs/guides/)
* [Node.js Tutorial](https://www.tutorialspoint.com/nodejs/index.htm)
* [Install Node.js - Ubuntu](https://www.godaddy.com/help/install-nodejs-ubuntu-17395)
* [Installing Node.js and NPM on Mac](https://treehouse.github.io/installation-guides/mac/node-mac.html)
* [Installing Node.js for Red Hat Enterprise Linux](http://www.brocade.com/content/html/en/sdn-controller/3.0.0/software-installation/GUID-623FE4DD-4209-406B-8322-C48A5C8385B8.html)
