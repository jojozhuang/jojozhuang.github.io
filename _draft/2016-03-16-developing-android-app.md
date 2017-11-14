---
layout: post
key: blog
title: "Developing Android App"
date: 2016-03-16
tags: [Android, Android Studio]
---

> Tutorial for how to create Node.js applications.

## 1. Prerequisite
If you haven’t installed Node.js and NPM, please install them by referring to my previous posting [Install Node.js and NPM]({% link _posts/2016-03-06-installing-nodejs-and-npm.md %}).

## 2. NPM command
use npm start instead of 'node server.js'

## 3. Package file
npm install

## 4. Extend Native Prototypes in Node.js
https://davidwalsh.name/extend-prototypes
https://stackoverflow.com/questions/14329210/where-to-change-objects-prototypes-in-node-js

Create file named "String.prototype.startsWith.js" in the root directory.
add following content :
```javascript
if(!String.prototype.startsWith) {
  String.prototype.startsWith = function(term) {
    return this.substr(0, term.length) === term;
  };
}
```
In the file where you want to call the prototype method.
```javascript
require('./String.prototype.startsWith');
```

// Usage
if(myString.startsWith('Moo')) {
  // ...
}



## 4. References
