---
layout: tutorial
key: tutorial
title: "Creating Http Server with Node.js"
index: 8711
subcategory: node-js
date: 2016-03-10
tags: [Node.js]
---

> Tutorial for how to create web applications through Node.js.

## 1. Creating Server
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

## 2. Running and Testing
In terminal, execute main.js with `node` command.
```raw
$ node main.js
```
You should see the following log.
```raw
Server running at http://127.0.0.1:8086/
```
Now the HTTP server is running on the local machine and waiting for a request at port 8086.
![startserver](/assets/images/backend/8711/startserver.png){:width="600px"}  
 Open web browser, access http://127.0.0.1:8086/.
![browser](/assets/images/backend/8711/browser.png){:width="600px"}  

## 3. Source Files
* [Source files of Nodejs Http Server on Github](https://github.com/jojozhuang/Tutorials/tree/master/NodeHttpServer)

## 4. References
* [Node.js - First Application](https://www.tutorialspoint.com/nodejs/nodejs_first_application.htm)
