---
layout: post
key: blog
title: "Express Tutorial"
date: 2018-01-05
tags: [Express]
---

> Introduce how to setup web server with express in Node.js. Some notes comes from the book - Express in Action.

## 1. What is Express?
[Express](https://expressjs.com/) is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. It is the standard web server framework for [Node.js](https://nodejs.org/en/).

### 1.1 Hello World
A standard way to setup web server with express.
```javascript
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
![image](/public/posts/2018-01-05/helloworld.png){:width="600px"}  

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

## 4. Source Files
* [Source files of Express Tutorial on Github](https://github.com/jojozhuang/Tutorials/tree/master/ExpressTutorial)

## 5. Reference
* [Express in Action](https://www.amazon.com/Express-Action-Writing-building-applications/dp/1617292427)
* [Express API](http://expressjs.com/en/api.html)
* [Express Tutorial](https://www.tutorialspoint.com/expressjs/index.htm)
