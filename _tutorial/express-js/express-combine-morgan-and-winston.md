---
layout: tutorial
key: tutorial
title: "Combine Morgan & Winston"
index: 8755
subcategory: express-js
date: 2018-01-09
tags: [Express, Morgan, Winston]
---

> Introduce how to combine Morgan and Winston for logging in express server.

## 1. Logging
Both [Morgan](https://github.com/expressjs/morgan) and [Winston](https://github.com/winstonjs/winston) are popular logging libraries for Node.js. Morgan is especially good at logging for http requests. On the other hand, Winston is good at splitting logs with different levels.

## 2. Examples
### 2.1 Stream for Logging to File
Create winston logger.
* Define two File transports, one is for `info` level and another is for `error` level.
* Define stream for `info` level logging. Stream is actually based on [Node.js stream](https://nodejs.org/api/stream.html).
* Define function `combinedFormat` to format logs like 'combined' in Morgan.

```javascript
// winston-config-stream.js
var path = require("path");
var fs = require("fs");
var appRoot = require("app-root-path");
var winston = require("winston");
var clfDate = require("clf-date");

// ensure log directory exists
var logDirectory = path.resolve(`${appRoot}`, "logs");
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

var options = {
  infofile: {
    level: "info",
    filename: path.resolve(logDirectory, "info.log"),
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5
  },
  errorfile: {
    level: "error",
    filename: path.resolve(logDirectory, "error.log"),
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5
  }
};

const logger = winston.createLogger({
  transports: [
    new winston.transports.File(options.infofile),
    new winston.transports.File(options.errorfile)
  ]
});

// create a stream object with a 'write' function that will be used by `morgan`. This stream is based on node.js stream https://nodejs.org/api/stream.html.
logger.stream = {
  write: function(message, encoding) {
    // use the 'info' log level so the output will be picked up by both transports
    logger.info(message);
  }
};

logger.combinedFormat = function(err, req, res) {
  // Similar combined format in morgan
  // :remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"
  return `${req.ip} - - [${clfDate(
    new Date()
  )}] \"${req.method} ${req.originalUrl} HTTP/${req.httpVersion}\" ${err.status ||
    500} - ${req.headers["user-agent"]}`;
};

module.exports = logger;
```
Create express server.
* Import winston logger.
* Add winston stream to morgan.

```javascript
// server.js
var express = require("express");
var morgan = require("morgan");
var path = require("path");
var fs = require("fs");

var winston = require("./config/winston-config-stream");

var app = express();

var logDirectory = path.join(__dirname, "logs");

// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// setup the winston stream
app.use(morgan("combined", { stream: winston.stream }));

app.get("/", function(req, res) {
  res.send("hello, world!");
});

app.use(function(req, res, next) {
  //res.status(404).send("File not found!");
  next(new Error("File not found"));
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500).send("Internal server error.");
});

app.listen(3000, function() {
  console.log("Web Server started on port 3000");
});
```
Start the server and access http://localhost:3000/ and http://localhost:3000/random in browser. You should see the logs in ./logs/info.log.
```raw
{"message":"::1 - - [09/Jan/2018:17:13:22 +0000] \"GET / HTTP/1.1\" 304 - \"-\" \"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Safari/537.36\"\n","level":"info"}
{"message":"::1 - - [09/Jan/2018:17:13:24 +0000] \"GET /random HTTP/1.1\" 500 22 \"-\" \"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Safari/537.36\"\n","level":"info"}
```
But right now, there is nothing in ./logs/error.log yet.
### 2.2 Error Level Logging
In the above example, if user accesses an invalid the URL, express server returns 500 error. However, no log is recorded by winston or morgan. We have to manually call `winston.error` to log this error. And method `winston.combinedFormat` formats the log like 'combined' in Morgan.
```javascript
app.use(function(err, req, res, next) {
  // error level logging
  winston.error(winston.combinedFormat(err, req, res));
  res.status(err.status || 500).send("Internal server error.");
});
```
Restart the server then access http://localhost:3000/random in browser. You should see the log in ./logs/error.log.
```raw
{"message":"::1 - - [09/Jan/2018:17:26:55 +0420] \"GET /random HTTP/1.1\" 500 - Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Safari/537.36","level":"error"}
```
Besides, you will also see similar logs in ./logs/info.log.
```raw
{"message":"::1 - - [09/Jan/2018:17:26:55 +0420] \"GET /random HTTP/1.1\" 500 - Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Safari/537.36","level":"error"}
{"message":"::1 - - [09/Jan/2018:17:26:55 +0000] \"GET /random HTTP/1.1\" 500 22 \"-\" \"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Safari/537.36\"\n","level":"info"}
```
Both two lines are logged by the info file transport. Remember that in winston, lower level logs contains higher level logs. For example, info log contains three levels: error, warn and info.

Now you see, 'winston.error()' triggers both the info and error logging.
### 2.3 Loggins to Console
There two approaches to write logs to console.  
1) Console Transport in Winston  
Create third transport in winston.
```javascript
// winston-config-stream.js
...
var options = {
  ...
  console: {
    level: "info",
    handleExceptions: true,
    format: winston.format.simple(),  // disable json format
    colorize: true
  }
};

...
```
Then bind it to Console transport.
```javascript
const logger = winston.createLogger({
  transports: [
    new winston.transports.File(options.infofile),
    new winston.transports.File(options.errorfile),
    new winston.transports.Console(options.console)
  ]
});
```
Start the server and access http://localhost:3000/ and http://localhost:3000/random in browser. You should see two log entries in console.
```raw
Web Server started on port 3000
info: ::1 - - [09/Jan/2018:18:36:30 +0000] "GET / HTTP/1.1" 304 - "-" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Safari/537.36"

info: ::1 - - [09/Jan/2018:18:36:35 +0000] "GET /random HTTP/1.1" 500 22 "-" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_5) AppleWebKit/537.36(KHTML, like Gecko) Chrome/67.0.3396.87 Safari/537.36"
```
The drawback of the above two approaches is, the output format is defined by morgan. If we change the format from **combined** to **short**.
```javascript
app.use(morgan("short", { stream: winston.stream }));
```
You will see the following format.
```raw
Web Server started on port 3000
info: ::1 - GET / HTTP/1.1 304 - - 2.938 ms

info: ::1 - GET /random HTTP/1.1 500 22 - 0.536 ms
```
2) Morgan  
It is much simpler if we use morgan.
```javascript
// server.js
...
var app = express();
app.use(morgan("short"));
...
```
Start the server and access http://localhost:3000/ and http://localhost:3000/random in browser. You should see two log entries in console.
```raw
Web Server started on port 3000
::1 - GET / HTTP/1.1 304 - - 2.338 ms
::1 - GET /random HTTP/1.1 500 22 - 0.518 ms
```

## 3. Log File Rotation
Winston supports log file rotation through `winston-daily-rotate-file`. The DailyRotateFile transport can rotate files by minute, hour, day, month, year or weekday.
### 3.1 Rotation Transport
1) Import package
```javascript
//winston-config-rotate.js
require("winston-daily-rotate-file");
```
2) Create Rotation Transport  
Create two rotation files for **info** level and **error** level.
```javascript
var infofile = new winston.transports.DailyRotateFile({
  level: "info",
  filename: path.resolve(logDirectory, "application-%DATE%-info.log"),
  datePattern: "YYYY-MM-DD-HH",
  zippedArchive: true,
  maxSize: "100m",
  maxFiles: "14d" // keep logs for 14 days
});

infofile.on("rotate", function(oldFilename, newFilename) {
  // do something fun
});

var errorfile = new winston.transports.DailyRotateFile({
  level: "error",
  filename: path.resolve(logDirectory, "application-%DATE%-error.log"),
  datePattern: "YYYY-MM-DD-HH",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "30d" // keep logs for 30 days
});

errorfile.on("rotate", function(oldFilename, newFilename) {
  // do something fun
});
```
3) Bind them to logger
```javascript
const logger = winston.createLogger({
  transports: [infofile, errorfile]
});
```
4) Use the new Winston logger in server.js.
```javascript
//var winston = require("./config/winston-config-stream");
//var winston = require("./config/winston-config-streamconsole");
var winston = require("./config/winston-config-rotate");
```
### 3.2 Testing
Start the server then access http://localhost:3000/ and http://localhost:3000/random in browser. You would see two log files in directory ./logs with proper log entries. The file name has the format 'application-YYYY-MM-DD-HH-[level].log'.
![image](/assets/images/backend/8755/logfiles.png){:width="350px"}  

## 4. Source Files
* [Source files of Express Combine Morgan and Winston on Github](https://github.com/jojozhuang/Tutorials/tree/master/ExpressLoggingCombine)

## 5. Reference
* [Morgan on GitHub](https://github.com/expressjs/morgan)
* [Winston on GitHub](https://github.com/winstonjs/winston)
* [winston-daily-rotate-file](https://github.com/winstonjs/winston-daily-rotate-file)
* [Logging in Node.js done right](http://www.jyotman.xyz/post/logging-in-node.js-done-right)
* [How To Use Winston to Log Node.js Applications](https://www.digitalocean.com/community/tutorials/how-to-use-winston-to-log-node-js-applications)
