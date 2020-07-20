---
layout: tutorial
key: tutorial
title: "Using Node.js and NPM"
index: 8702
subcategory: node-js
date: 2016-03-07
tags: [Node.js, NPM]
---

> Use npm to manage packages for node.js application.

## 1. Node Package Manager (npm)
Node provides dependency management with Node Package Manager(npm). It is used to manage project’s dependencies on 3rd party JavaScript libraries.
### 1.1 Installing New Package
```raw
$ npm install express --save
```
* If you left off the --save flag, you’d see the new node_modules folder and it would have express inside, but nothing would be present in your `package.json`.

### 1.2 Node Module Installation Levels
Modules can be installed globally or locally.
```raw
$ npm install -g typescript  # global
$ npm install express        # local
```
### 1.3 Checking Modules Outdated
Check whether your installed modules are outdated.
```raw
$ npm outdated
```
### 1.4 Updating Node Modules
```raw
$ npm update
$ npm update -g #update globally installed packages
```
### 1.5 Uninstalling Node Modules
```raw
$ npm uninstall express
$ npm uninstall -g typescript
```
### 1.6 Starting App
Use 'npm start' instead of 'node server.js' to start the application.

## 2. Packages
### 2.1 NPM and Modules
After running the following command, express is installed to the project.
```raw
$ npm install express --save
```
The npm command also updates the package.json file. It adds dependency with the module name and its version.
```json
{
  "name" : "MyStaticServer",
  "version" : "0.0.1",
  "dependencies" : {
    "express" : "3.3.5"
  }
}
```
### 2.2 The Folder node_modules
When you install a Node module, it’s downloaded and placed into the subfolder `node_modules` within your project folder.

### 2.3 The package.json File
All npm packages contain a file, usually in the project root, called `package.json` - this file holds various metadata relevant to the project. This file is used to give information to npm that allows it to identify the project as well as handle the project's dependencies.
### 2.4 Package Version
Ways of Specifying Version Numbers.

 Version | Description
---------|--------------------------
1.2.1    | Must match version 1.2.1
\>1.2.1  | Must be later than version 1.2.1
\>=1.2.1 | Must be version 1.2.1 or later
<1.2.1   | Must be before version 1.2.1  
<=1.2.1  | Must be before or equal to version 1.2.1
~1.2.1   | Must be approximately equivalent to version 1.2.1
^1.2.1   | Must be compatible with version 1.2.1
1.2.x    | Must be any version starting with 1.2.
\*       | any version

Example.
```javascript
// …
"dependencies": {
"express": "^5.0.0",
"ejs": "~2.3.2"
}
//
```
* The `^` character indicates optimistic versioning is allowed. You’ll get all patch and minor updates. The `~` character indicates a slightly less optimistic versioning. You’ll get only patch updates.

Specify the dependency to an exact version.
```javascript
// …
"dependencies": {
"express": "5.0.0",
"ejs": "2.3.2"
}
// …
```
* Removing the `^` and `~` characters from the version number indicates only that specific version of the package should be downloaded and used.

This simple solution has a drawback: it doesn’t pin down the version of subdependencies (the dependencies of your dependencies).
```raw
your-express-app@0.0.0
└─┬ backbone@1.2.3
└── underscore@1.0.0
```
```raw
your-express-app@0.0.0
└─┬ backbone@1.2.3
└── underscore@1.1.0
```
* Note the difference in Underscore’s version.

### 2.5 The package-lock.json File
`package-lock.json` is automatically generated for any operations where npm modifies either the node_modules tree, or package.json. It describes the exact tree that was generated, such that subsequent installs are able to generate identical trees, regardless of intermediate dependency updates. This file is intended to be committed into source repositories, and serves various purposes:
* Describe a single representation of a dependency tree such that teammates, deployments, and continuous integration are guaranteed to install exactly the same dependencies.
* Provide a facility for users to "time-travel" to previous states of node_modules without having to commit the directory itself.
* To facilitate greater visibility of tree changes through readable source control diffs.
* And optimize the installation process by allowing npm to skip repeated metadata resolutions for previously-installed packages.

shrinkwrap
npm shrinkwrap
https://docs.npmjs.com/files/package-locks

## 3. Module System
Node’s module system makes use of a global function called `require` and a global object called `module.exports`. The two make for a straightforward module system.

Using modules: CommonJS lets you include code from one file in another.
### 3.1 Creating Own Module
random-integer.js
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
### 3.2 Extending Native Prototypes in Node.js
Create file named 'String.prototype.startsWith.js' in the root directory, then add following content:
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

// Usage
if(myString.startsWith('Moo')) {
  // ...
}
```

## 4. Asynchronous Call
### 4.1 Read File
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

## 5. Web Development
### 5.1 http module
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

## 6. References
* [Nodejs Guides](https://nodejs.org/en/docs/guides/)
* [Node.js Tutorial](https://www.tutorialspoint.com/nodejs/index.htm)
* [Specifics of npm's package.json handling](https://docs.npmjs.com/files/package.json)
* [package-lock.json](https://docs.npmjs.com/files/package-lock.json)
* [Extend Native Prototypes in Node.js](https://davidwalsh.name/extend-prototypes)
* [Where to change objects prototypes in node.js?](https://stackoverflow.com/questions/14329210/where-to-change-objects-prototypes-in-node-js)
