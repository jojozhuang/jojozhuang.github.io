---
layout: post
key: blog
title: "Using Node.js and NPM[Draft]"
date: 2016-03-06
tags: [Node.js, NPM]
---

> Basic knowledge about Node.js and npm.

## 1. Packages
### 1.1 package.json
All npm packages contain a file, usually in the project root, called `package.json` - this file holds various metadata relevant to the project. This file is used to give information to npm that allows it to identify the project as well as handle the project's dependencies
### 1.2 Installing New Package
```sh
npm install express --save
```
* If you left off the --save flag, you’d see the new node_modules folder and it would have express inside, but nothing would be present in your `package.json`.

### 1.3 Uninstalling Package
```sh
npm uninstall express
```
### 1.4 Package Version
```javascript
// …
"dependencies": {
"express": "^5.0.0",
"ejs": "~2.3.2"
}
//
```
* The `^` character indicates optimistic versioning is allowed. You’ll get all patch and minor updates. The ~ character indicates a slightly less optimistic versioning. You’ll get only patch updates.

Specify the dependency to an exact version.
```javascript
// …
"dependencies": {
"express": "5.0.0",
"ejs": "2.3.2"
}
// …
```
* Removing the `^` and `~` characters from the version number indicates only that specific
version of the package should be downloaded and used.

This simple solution has a drawback: it doesn’t pin down the version of subdependencies (the dependencies of your dependencies).
```sh
your-express-app@0.0.0
└─┬ backbone@1.2.3
└── underscore@1.0.0
```
```sh
your-express-app@0.0.0
└─┬ backbone@1.2.3
└── underscore@1.1.0
```
* Note the difference in Underscore’s version.

## 2. Module System
Node’s module system makes use of a global function called `require` and a global object called `module.exports`. The two make for a straightforward module system.

Using modules: CommonJS lets you include code from one file in another.


shrinkwrap
npm shrinkwrap
https://docs.npmjs.com/files/package-locks


create own module, random-integer.js
```javascript
var MAX = 100;
function randomInteger() {
    return Math.floor((Math.random() * MAX));
}
module.exports = randomInteger;
```

Use module in print-three-randomintegers.js
```javascript
var randomInt = require("./random-integer");
console.log(randomInt()); // 12
console.log(randomInt()); // 77
console.log(randomInt()); // 8
````

## 3. Asynchronous Call
### 3.1 Read File
```javascript
var fs = require("fs");
var options = { encoding: "utf-8" };
fs.readFile("myfile.txt", options, function(err, data) {
    if (err) {
        console.error("Error reading file!");
        return;
    }
    console.log(data.match(/x/gi).length + " letter X's");
});
console.log("Hello world!");  //  you’ll see “Hello world!” before you see any results from the file.
```

## 4. Web Development
### 4.1 http module
Create web server and serve at port 3000.
```javascript
var http = require("http");
function requestHandler(request, response) {
    console.log("In comes a request to: " + request.url);
    response.end("Hello, world!");
}
var server = http.createServer(requestHandler);
server.listen(3000);
```

## 5. References
* [Nodejs Guides](https://nodejs.org/en/docs/guides/)
* [Node.js Tutorial](https://www.tutorialspoint.com/nodejs/index.htm)
* [Specifics of npm's package.json handling](https://docs.npmjs.com/files/package.json)
