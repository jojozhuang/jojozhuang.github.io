---
layout: tutorial
key: tutorial
title: "Logging with Winston"
index: 8754
subcategory: express-js
date: 2018-01-08
tags: [Express, Winston]
---

> Introduce how to use Winston for logging in express server.

## 1. Winston
[Winston](https://github.com/winstonjs/winston) a versatile async logging library for Node.js.
### 1.1 Logging Levels
Winston provides the following default log levels. They are prioritized from 0 to 5 (highest to lowest)
```javascript
const levels = { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
```
You can pass a string representing the logging level to the log() method or use the level specified methods defined on every winston logger.
```javascript
logger.log('info', "hello world!");
logger.log('error', "Ops, you got an error!");
// equivalent to
logger.info("hello world!");
logger.error("Ops, you got an error!");

// same output
// info: hello world!
// error: Ops, you got an error!
```
### 1.2 Transports
A transport is essentially a storage device for your logs. Each Winston logger can have multiple transports configured at different levels. Winston provides two default transports, Console and File.
```javascript
transports: [
  new winston.transports.Console(),
  new winston.transports.File({ filename: 'combined.log' })
]
```
### 1.3 Multiple Transports of Same Type  
It is possible to use multiple transports of the same type e.g. winston.transports.File when you construct the transport.
```javascript
const logger = winston.createLogger({
  transports: [
    new winston.transports.File({
      filename: 'combined.log',
      level: 'info'
    }),
    new winston.transports.File({
      filename: 'errors.log',
      level: 'error'
    })
  ]
});
```

## 2. Examples
### 2.1 Print Logs to Console
Create winston logger.
```javascript
//winston-config-console.js
var path = require("path");
var winston = require("winston");

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      colorize: true
    })
  ]
});

module.exports = logger;
```
Express server.
```javascript
// server.js
var express = require("express");
var logger = require("./config/winston-config-console");
var app = express();

app.get("/", function(req, res) {
  logger.info("Hello world");
  res.send("hello, world!");
});
app.use(function(req, res) {
  logger.error("File not found");
  res.status(404).send("File not found!");
});

app.listen(3000, function() {
  console.log("Web Server started on port 3000");
});
```
Start the server and access http://localhost:3000/ and http://localhost:3000/random in browser. You should see the output in console.
```raw
Web Server started on port 3000
{"message":"File not found","level":"error"}
{"message":"Hello world","level":"info"}
```
Add format to transport.
```javascript
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
      colorize: true
    })
  ]
});
```
Try to access those two URLs again. This time you would see the following logs.
```raw
Web Server started on port 3000
info: Hello world
error: File not found
```
### 2.2 Write Logs to File
Create another winston logger.
```javascript
//winston-config-file.js
var path = require("path");
var fs = require("fs");
var appRoot = require("app-root-path");
var winston = require("winston");

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

module.exports = logger;
```
Update server.js with the new winston logger.
```javascript
// server.js
var express = require("express");
//var logger = require("./config/winston-config-console");
var logger = require("./config/winston-config-file");
...
```
Start the server and access http://localhost:3000/ and http://localhost:3000/random in browser. This time you won't see any log in console. Instead, you should see the following logs in ./logs/error.log.
```raw
{"message":"File not found","level":"error"}
```
And the following logs in ./logs/info.log
```raw
{"message":"Hello world","level":"info"}
{"message":"File not found","level":"error"}
```
Notice that, the error log is also recorded. This is because, for level 'info', all level value less or equals 2 will be logged. Logs for level 'error: 0', 'warn: 1' and 'info: 2' are all saved to this file.

### 2.3 Log File Rotation
Winston supports to log rotation by `winston-daily-rotate-file`. The DailyRotateFile transport can rotate files by minute, hour, day, month, year or weekday.
```javascript
//winston-config-rotate.js
var path = require("path");
var fs = require("fs");
var appRoot = require("app-root-path");
var winston = require("winston");
require("winston-daily-rotate-file");

// ensure log directory exists
var logDirectory = path.resolve(`${appRoot}`, "logs");
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

var transport = new winston.transports.DailyRotateFile({
  filename: path.resolve(logDirectory, "application-%DATE%.log"),
  datePattern: "YYYY-MM-DD-HH",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "14d" // keep logs for 14 days
});

transport.on("rotate", function(oldFilename, newFilename) {
  // do something fun
});

const logger = winston.createLogger({
  transports: [transport]
});

module.exports = logger;
```
Update server.js with the new winston logger.
```javascript
// server.js
var express = require("express");
//var logger = require("./config/winston-config-console");
//var logger = require("./config/winston-config-file");
var logger = require("./config/winston-config-rotate");
...
```
Start the server then access http://localhost:3000/ and http://localhost:3000/random in browser. You would see multiple log files in directory ./logs. Each file name has the format 'application-YYYY-MM-DD-HH.log'. From the following screenshot, we see multiple log files are created from 11:00 to 16:00 on Jan 08, 2018.
![image](/assets/images/backend/8754/logfiles.png){:width="350px"}  

## 3. Source Files
* [Source files of Express Logging Winston on Github](https://github.com/jojozhuang/Tutorials/tree/master/ExpressLoggingWinston)

## 4. Reference
* [Winston on GitHub](https://github.com/winstonjs/winston)
* [winston-daily-rotate-file](https://github.com/winstonjs/winston-daily-rotate-file)
* [Using Winston, a versatile logging library for Node.js](http://thisdavej.com/using-winston-a-versatile-logging-library-for-node-js/)
