---
layout: tutorial
key: tutorial
title: "Logging with Morgan"
index: 8753
subcategory: express-js
date: 2018-01-07
tags: [Express, Morgan]
---

> Introduce how to use Morgan for logging in express server.

## 1. Morgan
[Morgan](https://github.com/expressjs/morgan) is one of the most popular modules for logging in Node.js. It is used mostly as a middleware for logging HTTP requests.

## 2. Syntax
```javascript
morgan(format, options)
```
Create a new morgan logger middleware function using the given `format` and `options`. The format argument may be a string of a predefined name (see below for the names), a string of a format string, or a function that will produce a log entry.

The format function will be called with three arguments `tokens`, req, and res, where tokens is an object with all defined tokens, req is the HTTP request and res is the HTTP response. The function is expected to return a string that will be the log line, or undefined / null to skip logging.
### 2.1 Format
There are totally 5 predefined format.
* combined
* common
* dev
* short
* tiny

1) `combined`: Standard Apache combined log output.
```raw
:remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"
```
Output sample:
```raw
::1 - - [08/Jan/2018:05:15:10 +0000] "GET / HTTP/1.1" 304 - "-" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36"
```
2) `common`: Standard Apache common log output.
```raw
:remote-ad`dr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length]
```
Output sample:
```raw
::1 - - [08/Jan/2018:05:15:48 +0000] "GET / HTTP/1.1" 304 -
```
3) `dev`: Concise output colored by response status for development use. The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
```raw
:method :url :status :response-time ms - :res[content-length]
```
Output sample:
```raw
GET / 304 2.841 ms - -
```
4) `short`: Shorter than default, also including response time.
```raw
:remote-addr :remote-user :method :url HTTP/:http-version :status :res[content-length] - :response-time ms
```
Output sample:
```raw
::1 - GET / HTTP/1.1 304 - - 2.553 ms
```
5) `tiny`: The minimal output.
```raw
:method :url :status :res[content-length] - :response-time ms
```
Output sample:
```raw
GET / 304 - - 2.683 ms
```
### 2.2 Options
Morgan accepts these properties in the options object: immediate, skip, stream.

## 3. Examples
### 3.1 Print Logs to Console
```javascript
// server.js
var express = require("express");
var morgan = require("morgan");
var app = express();

//  set format to 'short'
app.use(morgan("short"));

app.get("/", function(req, res) {
  res.send("hello, world!");
});

app.use(function(req, res) {
  res.status(404);
  res.send("File not found!");
});

app.listen(3000, function() {
  console.log("Web Server started on port 3000");
});
```
Start the server then access http://localhost:3000/ and http://localhost:3000/random in browser. You should see the logs in the console like this.
```raw
[nodemon] starting `node rotation.js`
Web Server started on port 3000
::1 - GET / HTTP/1.1 200 13 - 2.474 ms
::1 - GET /random HTTP/1.1 404 15 - 0.448 ms
```
### 3.2 Write Logs to File
```javascript
// singlefile.js
var express = require("express");
var morgan = require("morgan");
var path = require("path");
var fs = require("fs");

var app = express();
app.use(morgan("short"));

var logDirectory = path.join(__dirname, "logs");
// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

var logFile = path.join(logDirectory, "app.log");
// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(logFile, {
  flags: "a"
});

// setup the logger with stream
app.use(morgan("combined", { stream: accessLogStream }));

app.get("/", function(req, res) {
  res.send("hello, world!");
});

app.use(function(req, res) {
  res.status(404);
  res.send("File not found!");
});

app.listen(3000, function() {
  console.log("Web Server started on port 3000");
});
```
Start the server then access http://localhost:3000/ and http://localhost:3000/random in browser. Apart from the logs in the console, you would also see the logs in file ./logs/app.log.
```raw
::1 - - [08/Jan/2018:15:22:53 +0000] "GET / HTTP/1.1" 304 - "-" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36"
::1 - - [08/Jan/2018:15:22:59 +0000] "GET /random HTTP/1.1" 404 15 "-" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36"
```
### 3.3 Log File Rotation
Rotate the log files by `interval`. For example, `1d` for one day, `1m` for one minute.
```javascript
// rotation.js
var express = require("express");
var morgan = require("morgan");
var path = require("path");
var fs = require("fs");
var rfs = require("rotating-file-stream");

var app = express();
app.use(morgan("short"));

var logDirectory = path.join(__dirname, "logs");

// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// create a rotating write stream
var accessLogStream = rfs("minute.log", {
  interval: "1m", // rotate by one minute
  path: logDirectory
});

// setup the logger
app.use(morgan("combined", { stream: accessLogStream }));

app.get("/", function(req, res) {
  res.send("hello, world!");
});

app.use(function(req, res) {
  res.status(404);
  res.send("File not found!");
});

app.listen(3000, function() {
  console.log("Web Server started on port 3000");
});
```
Start the server then access http://localhost:3000/ and http://localhost:3000/random in browser. You would see multiple log files in directory ./logs. Each file name has the format 'yyyyMMdd-hhmm-01-minute.log'. From the following screenshot, we see ten log files are created from 20:57 to 21:06 on Jan 07, 2018.
![image](/assets/images/backend/8753/logfiles.png){:width="350px"}  

## 4. Source Files
* [Source files of Express Logging Morgan on Github](https://github.com/jojozhuang/Tutorials/tree/master/ExpressLoggingMorgan)

## 5. Reference
* [Morgan on GitHub](https://github.com/expressjs/morgan)
* [Logging in Node.js done right](http://www.jyotman.xyz/post/logging-in-node.js-done-right)
