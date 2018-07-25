---
layout: tutorial
key: tutorial
title: "Creating Http Server with Node.js"
index: 204
category: nodejs
image: nodejs.png
date: 2016-03-07
tags: [Node.js]
---

> Tutorial for how to create web applications through Node.js.

## 1. Prerequisite
If you haven’t installed Node.js and NPM, please install them by referring to my previous posting [Install Node.js and NPM]({% link _posts/2016-03-06-installing-nodejs-and-npm.md %}).

## 2. Creating Server
Create a file named `main.js` having following codes:
```javascript
var http = require("http");

http.createServer(function (request, response) {

   // Send the HTTP header
   // HTTP Status: 200 : OK
   // Content Type: text/plain
   response.writeHead(200, {'Content-Type': 'text/plain'});

   // Send the response body as "Hello World"
   response.end('Hello World from Node Server\n');
}).listen(8086);

// Console will print the message
console.log('Server running at http://127.0.0.1:8086/');
```
The following points need to be noted about the above file.
* Use `require` directive to load the http module and store the returned HTTP instance into a variable
* Call `http.createServer()` method to create a server instance and then bind it at port `8086` using the listen method associated with the server instance. Pass it a function with parameters request and response. Write the sample implementation to always return "Hello World from Node Server".
* Print log in console indicating server is running.

## 3. Running and Testing
In terminal, execute main.js with `node` command.
```sh
$ node main.js
```
You should see the following log.
```sh
Server running at http://127.0.0.1:8086/
```
Now the HTTP server is running on the local machine and waiting for a request at port 8086.
![startserver](/public/tutorials/204/startserver.png){:width="600px"}  
 Open web browser, access http://127.0.0.1:8086/.
![browser](/public/tutorials/204/browser.png){:width="600px"}  

## 4. Source Files
* [Source files of Nodejs Http Server on Github](https://github.com/jojozhuang/Tutorials/tree/master/NodeHttpServer)

## 5. References
* [Node.js - First Application](https://www.tutorialspoint.com/nodejs/nodejs_first_application.htm)
