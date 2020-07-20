---
layout: tutorial
key: tutorial
title: "Creating Web App and RESTful API with MEAN Stack"
index: 8353
subcategory: angular-app
date: 2018-01-25
tags: [MEAN, MongoDB, Express, Angular]
---

> Introduce how to setup a MEAN stack project with MongoDB, Express, Angular and Node.js.

## 1. MEAN
[MEAN](https://en.wikipedia.org/wiki/MEAN_(software_bundle)) is a free and open-source JavaScript software stack for building dynamic web sites and web applications. The MEAN stack is MongoDB, Express.js, AngularJS (or Angular), and Node.js. Because all components of the MEAN stack support programs are written in JavaScript, MEAN applications can be written in one language for both server-side and client-side execution environments.

There are two famous MEAN frameworks, [Mean.io](http://mean.io/) and [MeanJS](http://meanjs.org/). However, these two framework are too complicated for user to start learning MEAN. So, in this tutorial, I will introduce how to build such MEAN stack project by our own.

## 2. MEAN Project
### 2.1 Existing Projects
We learned how to build RESTful API from [Building RESTful API with Express And MongoDB]({% link _tutorial/restful-api/building-restful-api-with-express-and-mongodb.md %}), and we also learned how to build web application with Angular from [Building CRUD Application With Angular]({% link _tutorial/angular-app/building-crud-application-with-angular.md %}). In this tutorial, I will reuse the `Angular project` and merge the `Express project` into it to setup the MEAN stack project.
### 2.2 Organizing MEAN Project
We will have two servers running. The front end code will be served by the Angular dev server which helps with hot and live reloading. The server side Express code will be served by a node server using [nodemon](https://nodemon.io/) which helps in automatically restarting the server whenever server side code changes.
### 2.3 Making Change
1) Create a new folder named `server` in the Angular project, and copy all required files from Express project into this folder.
![image](/assets/images/frontend/8353/merge.png){:width="350px"}
2) We need to run the Angular dev server and the backend express server concurrently. Create three new script commands defined in 'package.json'.
```javascript
"client": "ng serve",
"server": "nodemon ./server/server",
"dev": "concurrently \"npm run client\" \"npm run server \""
```
* Use 'ng serve' to start the Angular server.
* Use 'nodemon' to start the Express server. [Nodemon](https://nodemon.io/) is a utility that will monitor for any changes in the server source code and it automatically restart the server. This is used in development only.
* Use 'concurrently' to start the client and server simultaneously. [Concurrently](https://github.com/kimmobrunfeldt/concurrently) is used to run multiple commands concurrently.

## 3. Running and Testing
Start both the client and server with 'npm run dev'.
```raw
$ npm run dev
```
You will see two services are started. The server is served at port 5000 and the client is served at port 12080.
![image](/assets/images/frontend/8353/start.png)

Open web browser, access 'http://localhost:12080/'.
![image](/assets/images/frontend/8353/homepage.png)
Access the product list page.
![image](/assets/images/frontend/8353/productlist.png)
Through the debug tool, we can see, the name is fetched from the api.
![image](/assets/images/frontend/8353/api.png)

## 4. Enable Logging(Optional)
### 4.1 Installing Packages
Use both [Morgan](https://github.com/expressjs/morgan) and [Winston](https://github.com/winstonjs/winston) for logging.  
```raw
$ npm install morgan winston --save
```
### 4.2 Winston Configuration
Create file in config folder with following content.
```javascript
// ./server/config/winston-config-rotate.js
var path = require("path");
var fs = require("fs");
var appRoot = require("app-root-path");
var winston = require("winston");
var clfDate = require("clf-date");
require("winston-daily-rotate-file");

// ensure log directory exists
var logDirectory = path.resolve(`${appRoot}`, "logs");
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

var infofile = new winston.transports.DailyRotateFile({
  level: "info",
  filename: path.resolve(logDirectory, "application-%DATE%-info.log"),
  datePattern: "YYYY-MM-DD-HH",
  zippedArchive: false,
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

const logger = winston.createLogger({
  transports: [infofile, errorfile]
});

// create a stream object with a 'write' function that will be used by `morgan`. This stream is based on node.js stream https://nodejs.org/api/stream.html.
logger.stream = {
  write: function(message, encoding) {
    // use the 'info' log level so the output will be picked up by both transports
    logger.info(message);
  }
};

// create a format method for winston, it is similar with 'combined' format in morgan
logger.combinedFormat = function(err, req, res) {
  // :remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"
  return `${req.ip} - - [${clfDate(
    new Date()
  )}] \"${req.method} ${req.originalUrl} HTTP/${req.httpVersion}\" ${err.status ||
    500} - ${req.headers["user-agent"]}`;
};

logger.writeError = function(err, req, res) {
  console.log(err.stack);
  logger.error(err.stack);
};

module.exports = logger;
```
### 4.3 Express Server
Update server.js, attach winston stream to morgan and bind morgan to express.
```javascript
// ./server/server.js
...
var morgan = require("morgan");
var winston = require("./config/winston-config-rotate");

var app = express();

app.use(morgan("short"));
// setup the winston stream
app.use(morgan("combined", { stream: winston.stream }));
...
```
### 4.4 Logs
Restart the server, and try to access the some pages. You should see two types of log files in ./logs folder, one is info and another is error.
![image](/assets/images/frontend/8353/logs.png){:width="350px"}

## 5. Source Files
* [Source files of MEAN Statck Tutorial on Github](https://github.com/jojozhuang/Tutorials/tree/master/MEANStackTutorial)

## 6. References
* [Create a Web App and RESTful API Server Using the MEAN Stack](https://devcenter.heroku.com/articles/mean-apps-restful-api)
* [What is the difference between http://mean.io and Mean JS?](https://www.quora.com/What-is-the-difference-between-http-mean-io-and-Mean-JS)
* [Difference between MEAN.js and MEAN.io](https://stackoverflow.com/questions/23199392/difference-between-mean-js-and-mean-io)
* [Configuring ESLint](https://eslint.org/docs/user-guide/configuring)
* [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
