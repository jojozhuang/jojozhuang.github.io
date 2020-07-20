---
layout: tutorial
key: tutorial
title: "Getting Started with Express"
index: 8751
subcategory: express-js
date: 2018-01-05
tags: [Express]
---

> Introduce how to setup web server with express in Node.js.

## 1. What is Express?
[Express](https://expressjs.com/) is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. It is the standard web server framework for [Node.js](https://nodejs.org/en/). Some notes of this posting comes from the book - Express in Action.

### 1.1 Hello World
A standard way to setup web server with express.
```javascript
// helloworld.js
// Requires Express and puts it in a variable
var express = require("express");
// Calls express() and puts new Express application inside the app variable
var app = express();

// Sends “Hello, world!”
app.get("/", function(request, response) {
  response.send("Hello, world!");
});

//Starts the Express server on port 3000 and logs that it has started
app.listen(3000, function() {
  console.log("Express app started on port 3000.");
});
```
![image](/assets/images/backend/8751/helloworld.png){:width="600px"}  

## 2. Express Core
Express has four major features:
* `Middleware`: An array of functions to process incoming requests.
* `Routing`: Rules how an application's endpoints (URIs) respond to client requests.
* `Extensions`: Extends the request and response objects with extra methods and properties.
* `Views`: Dynamically render HTML at server side.

## 3. Web Server
### 3.1 Node Http Module
Actually, we can create web server with node `http` module without using express.
```javascript
// httpserver.js
var http = require("http");

function requestHandler(request, response) {
  console.log("In comes a request to: " + request.url);
  response.end("Hello, world(http)!");
}

var server = http.createServer(requestHandler);
server.listen(3000, function() {
  console.log("Web server(http) started on port 3000.");
});
```
### 3.2 Http + Express
```javascript
// httpexpress.js
var express = require("express");
var http = require("http");
var app = express();

app.use(function(request, response) {
  console.log("In comes a request to: " + request.url);
  response.end("Hello, world(http+express)!");
});

http.createServer(app).listen(3000, function() {
  console.log("Web server(http+express) started on port 3000.");
});
```
### 3.3 Express Only
```javascript
// expressserver.js
var express = require("express");
var app = express();

app.use(function(request, response) {
  console.log("In comes a request to: " + request.url);
  response.end("Hello, world(express)!");
});

app.listen(3000, function() {
  console.log("Web server(express) started on port 3000.");
});
```

## 4. Other Usage
1) Enable CORS
```javascript
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});
```
2) Query arguments, /search?q=javascript  
```javascript
app.get("/search", function(req, res) {
    req.query.q == "best restaurant"
// ...
});
```
3) Redirect  
```javascript
response.redirect("/hello/world");
response.redirect("http://expressjs.com");
```
4) Https  
```javascript
// https
var express = require("express");
var https = require("https");
var fs = require("fs");
var app = express();
// ... define your app ...
var httpsOptions = {
  key: fs.readFileSync("path/to/private/key.pem"),
  cert: fs.readFileSync("path/to/certificate.pem")
};
https.createServer(httpsOptions, app).listen(3000);
```
5) Run both an HTTP server and an HTTPS server.  
```javascript
var express = require("express");
var http = require("http");
var https = require("https");
var fs = require("fs");
var app = express();
// ... define your app ...
var httpsOptions = {
  key: fs.readFileSync("path/to/private/key.pem"),
  cert: fs.readFileSync("path/to/certificate.pem")
};
http.createServer(app).listen(80);
https.createServer(httpsOptions, app).listen(443)
```
6) Debugging Express  
To see all the internal logs used in Express, set the DEBUG environment variable to express:* when launching your app.
```javascript
"debug": "DEBUG=express:* node helloworld.js"
```
Run 'npm run debug'.
![image](/assets/images/backend/8751/debug.png){:width="1000px"}  

## 5. Source Files
* [Source files of Express Tutorial on Github](https://github.com/jojozhuang/Tutorials/tree/master/ExpressTutorial)

## 6. Reference
* [Express in Action](https://www.amazon.com/Express-Action-Writing-building-applications/dp/1617292427)
* [Hello world example](https://expressjs.com/en/starter/hello-world.html)
* [Express API](http://expressjs.com/en/api.html)
* [Debugging Express](https://expressjs.com/en/guide/debugging.html)
* [Express Tutorial](https://www.tutorialspoint.com/expressjs/index.htm)
* [Express Web Framework (Node.js/JavaScript) overview](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs)
