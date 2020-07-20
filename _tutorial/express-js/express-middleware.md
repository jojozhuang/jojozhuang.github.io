---
layout: tutorial
key: tutorial
title: "Middleware"
index: 8752
subcategory: express-js
date: 2018-01-06
tags: [Express, Middleware]
---

> Introduce the middlewares used in express.

## 1. Middleware
[Express](https://expressjs.com/) is a routing and middleware web framework that has minimal functionality of its own: An Express application is essentially a series of middleware function calls.

`Middleware` are functions that have access to the request object (`req`), the response object (`res`), and the next middleware function in the application’s request-response cycle. The next middleware function is commonly denoted by a variable named `next`.
![image](/assets/images/backend/8752/middleware.png){:width="800px"}  

## 2. Capabilities
Middleware functions can perform the following tasks:
* Execute any code.
* Make changes to the request and the response objects.
* End the request-response cycle.
* Call the next middleware function in the stack.

If the current middleware function does not end the request-response cycle, it must call next() to pass control to the next middleware function. Otherwise, the request will be left hanging.

## 3. Types of Middleware
An Express application can use the following types of middleware:
* Application-level middleware
* Router-level middleware
* Error-handling middleware
* Built-in middleware
* Third-party middleware

### 3.1 Application-Level Middleware
1) Logging for each request
```javascript
// logging.js
var express = require("express");
var app = express();

app.use(function(request, response, next) {
  console.log("In comes a " + request.method + " to " + request.url);
  next();
});

app.get("/", function(request, response) {
  response.send("Hello, world!");
});

app.listen(3000, function() {
  console.log("Web server started on port 3000.");
});
```
After starting the express server, we can access http://localhost:3000/ in browser. In the console, we see the log for accessing the homepage.
![image](/assets/images/backend/8752/logging.png){:width="600px"}  

2) Authorization  
We add a check to the request url. It must start with '/hello', otherwise, 403 error will be returned.
```javascript
// authorization.js
var express = require("express");
var app = express();

// logging
app.use(function(request, response, next) {
  console.log("In comes a " + request.method + " to " + request.url);
  next();
});

// authorization
app.use(function(request, response, next) {
  if (request.url.startsWith("/hello")) {
    next();
  } else {
    response.statusCode = 403;
    response.end("Not authorized.");
  }
});

app.get("/", function(request, response) {
  response.send("Hello, world!");
});

app.get("/hello/:who", function(request, response) {
  response.end("Hello, " + request.params.who + ".");
});

app.listen(3000, function() {
  console.log("Web server started on port 3000.");
});
```
Start the server and access http://localhost:3000/ in browser. You won't see the 'Hello World!'. Instead, you will get 'Not authorized' error.
![image](/assets/images/backend/8752/authenticationfail.png){:width="600px"}
Now, let's try to access http://localhost:3000/hello/johnny. You passed the authentication check this time.
![image](/assets/images/backend/8752/authenticationpass.png){:width="600px"}  

### 3.3 Router-Level Middleware
Use different routing URLs.
```javascript
// routing.js
var express = require("express");
var path = require("path");
var app = express();

app.get("/", function(request, response) {
  response.end("Welcome to my homepage!");
});
app.get("/about", function(request, response) {
  response.end("Welcome to the about page!");
});
app.get("/hello/:who", function(request, response) {
  response.end("Hello, " + request.params.who + ".");
});
app.get("/go", function(request, response) {
  // redirect
  response.redirect("http://expressjs.com");
});
app.get("/image", function(request, response) {
  // file
  const file = path.resolve("public", "wii.jpg");
  response.sendFile(file);
});
```
* Note, we can use express Router to get the same routing as above.

### 3.3 Error-Handling Middleware
The below code defines a web server, which allows to return the specified image to client. However, if any error occurs, it will return 500(Internal server error) to the client. Meanwhile, logs will be printed in the server console.
```javascript
// error.js
var express = require("express");
var path = require("path");
var app = express();

var filePath = path.join(__dirname, "johnny.jpg");

app.use(function(req, res, next) {
  res.sendFile(filePath, function(err) {
    if (err) {
      next(new Error("Failed to send file: " + err));
    }
  });
});

app.use(function(err, req, res, next) {
  console.error(err);
  res.status(500);
  res.send("Internal server error.");
});

app.listen(3000, function() {
  console.log("Web Server started on port 3000");
});
```
Start the server and access http://localhost:3000/ in browser. You will see the error instead of the image.
![image](/assets/images/backend/8752/internalerror.png){:width="600px"}
In the console, we see the error log.
```raw
$ node error.js
Web Server started on port 3000
Error: Failed to send file: Error: ENOENT: no such file or directory, stat '/Users/Johnny/GitHub/Tutorials/ExpressTutorial/celine.jpg'
    at /Users/Johnny/GitHub/Tutorials/ExpressTutorial/error.js:14:12
    at /Users/Johnny/GitHub/Tutorials/ExpressTutorial/node_modules/express/lib/response.js:430:22
    at SendStream.onerror (/Users/Johnny/GitHub/Tutorials/ExpressTutorial/node_modules/express/lib/response.js:1040:5)
    at SendStream.emit (events.js:160:13)
    at SendStream.error (/Users/Johnny/GitHub/Tutorials/ExpressTutorial/node_modules/send/index.js:270:17)
    at SendStream.onStatError (/Users/Johnny/GitHub/Tutorials/ExpressTutorial/node_modules/send/index.js:421:12)
    at onstat (/Users/Johnny/GitHub/Tutorials/ExpressTutorial/node_modules/send/index.js:727:26)
    at FSReqWrap.oncomplete (fs.js:166:21)
```
### 3.4 Built-In Middleware
1) Serve static files such as HTML files, images, and so on.
```javascript
// staticmanual.js
var express = require("express");
var path = require("path");
var fs = require("fs");
var app = express();

app.use(function(req, res, next) {
  var filePath = path.join(__dirname, "static", req.url);
  console.log(filePath);
  fs.stat(filePath, function(err, fileInfo) {
    if (err) {
      next();
      return;
    }
    if (fileInfo.isFile()) {
      res.sendFile(filePath);
    } else {
      next();
    }
  });
});

app.use(function(req, res) {
  res.status(404);
  res.send("File not found!");
});

app.listen(3000, function() {
  console.log("Web Server started on port 3000");
});
```
Start the server and access http://localhost:3000/ in browser. You will see the 'file not found' error.
![image](/assets/images/backend/8752/filenotfound.png){:width="600px"}
But if you try access http://localhost:3000/index.html, you will get the page properly.
![image](/assets/images/backend/8752/statichtml.png){:width="600px"}  

2) Use `express.static` to serve static files. It is much simpler than the previous approach.
```javascript
// static.js
var express = require("express");
var path = require("path");
var app = express();

var publicPath = path.resolve(__dirname, "static");
app.use(express.static(publicPath)); // serve static folder

app.use(function(req, res) {
  res.status(404);
  res.send("File not found!");
});

app.listen(3000, function() {
  console.log("Web Server started on port 3000");
});
```
### 3.5 Third-Party Middleware
1) Logging with Morgan  
It's easy to use morgan, just import it and call it with app.use().
```javascript
var morgan = require("morgan");
app.use(morgan("short"));
```
Full example.
```javascript
// morgan.js
var express = require("express");
var morgan = require("morgan");
var path = require("path");
var app = express();

app.use(morgan("short"));

var staticPath = path.join(__dirname, "static");
app.use(express.static(staticPath));

app.use(function(req, res) {
  res.status(404);
  res.send("File not found!");
});

app.listen(3000, function() {
  console.log("Web Server started on port 3000");
});
```
Start the server and access the following URL in browser. Notice, the first and second URLs are valid, so you will see the content in index.html. The third URL, however, returns 'File not found' error.
* http://localhost:3000/
* http://localhost:3000/index.html
* http://localhost:3000/johnny

Let's check the logs in console.
![image](/assets/images/backend/8752/morgan.png){:width="600px"}  

## 4. More Middlewares
* `express-rate-limit`: Use to limit repeated requests to public APIs and/or endpoints such as password reset.
* `Helmet`: Helps you add HTTP headers to make your app safer against certain kinds of attacks.
* `cookie-parser`: Parses browser cookies.
* `response-time`: Sends the X-Response-Time header so you can debug the performance of your application.

## 5. Source Files
* [Source files of Express Middleware on Github](https://github.com/jojozhuang/Tutorials/tree/master/ExpressMiddleware)

## 6. Reference
* [Using middleware](https://expressjs.com/en/guide/using-middleware.html)
* [Express API](http://expressjs.com/en/api.html)
* [Express Tutorial](https://www.tutorialspoint.com/expressjs/index.htm)
