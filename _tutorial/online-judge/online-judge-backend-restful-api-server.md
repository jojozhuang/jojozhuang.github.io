---
layout: tutorial
key: tutorial
title: "Online Judge - Backend RESTful API Server"
index: 9002
subcategory: online-judge
date: 2018-04-10
tags: [Express, MongoDB, Mongoose]
---

> Setup backend server for Online Judge app to host RESTful API services.

## 1. Project Structure
### 1.1 Server Files
All source files for server is under './server' folder.
### 1.2 Express Server
In './server/server.js', use express to create the web server.
```javascript
// ./server/server.js
var express = require("express");
var favicon = require("serve-favicon");
var cookieParser = require("cookie-parser");
var path = require("path");
var bodyParser = require("body-parser");
var morgan = require("morgan");
var winston = require("./config/winston-config-rotate");
var cors = require("cors");
var passport = require("passport");
var config = require("./config/server-config");
var FileApi = require("./api/FileApi");

// Create working directory
console.log(config);
const { app: { port, cors_client_url, temp_directory } } = config;
const tempDir = path.resolve(__dirname, temp_directory);
FileApi.creatDirectory(tempDir, (err, message) => {
  if (err) {
    console.log(err);
  } else {
    console.log(message);
  }
});
// Bring in the data model
require("./models/mongodb");
// Bring in the Passport config after model is defined
require("./config/passport-config");

var app = express();
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
app.use(cookieParser());

// logging
app.use(morgan("short"));
app.use(morgan("combined", { stream: winston.stream }));

// configure app to use bodyParser(), this will let us get the data from a POST
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cors());

app.use(function(req, res, next) {
  /*
  res.header(
    "Access-Control-Allow-Origin",
    process.env.CLIENT_WEBSITE || cors_client_url
  );*/
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,PATCH,DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Credentials", true);
  res.header("preflightContinue", false);
  next();
});

// Initialise Passport before using the route middleware
app.use(passport.initialize());

// routes
var routes = require("./routes");
// Use the API routes when path starts with /api
app.use("/api", routes);

// Error handling
app.use(function(err, req, res, next) {
  // error level logging
  winston.error(winston.combinedFormat(err, req, res));
  winston.writeError(err);

  //console.log(err);
  if (err.name === "UnauthorizedError") {
    res.status(401);
    res.json({
      message:
        err.name + ": " + err.message ||
        " You have no authorization to view this page!"
    });
  }

  next(err, req, res, next);
});

// development error handler, will print stacktrace
if (app.get("env") === "development") {
  app.use(function(err, req, res, next) {
    console.log(app.get("env"));
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler, no stacktraces leaked to user
if (app.get("env") === "production") {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json("error", {
      message: err.message,
      error: {}
    });
  });
}

app.listen(port, () => {
  console.log("Server is up and running on port number " + port);
});
```
### 1.3 Commands
In 'package.json', we defined three commands to start server. 'local' and 'dev' is for development, 'stage' is for testing.
```javascript
  "scripts": {
    "server-local": "NODE_ENV=local nodemon ./server/server",
    "server-dev": "NODE_ENV=dev nodemon ./server/server",
    "server-stage": "NODE_ENV=stage nodemon ./server/server",
    "local": "concurrently \"npm run client\" \"npm run server-local \"",
    "dev": "concurrently \"npm run client\" \"npm run server-dev \"",
    "stage": "concurrently \"npm run client\" \"npm run server-stage \"",
  },
```

## 2. Express Server
### 2.1 Logging
Use both Morgan and Winston for logging. Read tutorial [Express - Combine Morgan and Winston]({% link _tutorial/express-js/express-combine-morgan-and-winston.md %}) to learn more details.
### 2.2 Routing
We define the following routers for the RESTful API.

Router          | Description   
----------------|--------------------------------------------------
/               | api root, test if the RESTful API is working
/authentication | sign up, login, change password  
/admin/question | manage questions(admin only)
/admin/user     | manage users(admin only)
/admin/database | import or export data(admin only)
/submission     | submit solution

In './server/routes/index.js', use 'router.use()' to separate the routers to different files.
```javascript
// server/routes/index.js
var express = require("express");
var router = express.Router();
var database = require("./database");
var authentication = require("./authentication");
var question = require("./question");
var user = require("./user");
var submission = require("./submission");
var config = require("../config/server-config");

const { app: { secret } } = config;

var jwt = require("express-jwt");
var auth = jwt({
  secret: secret,
  userProperty: "payload" // the default name is user, changed to payload to avoid ambiguousness
});

// test route to make sure everything is working (accessed at GET http://localhost:5000/api)
router.get("/", function(req, res) {
  res.json({ message: "Hello! welcome to our api!" });
});

// authentication, url: /api/authentication/login
router.use("/authentication", authentication);
// question, url: /api/admin/question
router.use("/admin/question", auth, question);
// user, url: /api/admin/user
router.use("/admin/user", auth, user);
// database, url: /api/admin/database
router.use("/admin/database", database);
// submission, url: /api/submission
router.use("/submission", submission);

module.exports = router;
```
## 3. Mongo
Use MongoDB to persist data.
### 3.1 Connection String
The DB connection url is defined in file 'server/config/server-config'. We use different Mongo database instances for development, testing and deployment. For example, we can use either the local MongoDB or remote MongoDB hosted on [mLab](https://www.mlab.com) for development.
```javascript
const local = {
  app: app,
  db: {
    host: process.env.LOCAL_DB_HOST || "testuser:abc123@localhost",
    port: parseInt(process.env.LOCAL_DB_PORT) || 27017,
    name: process.env.LOCAL_DB_NAME || "onlinejudge"
  }
};
const dev = {
  app: app,
  db: {
    host: process.env.DEV_DB_HOST || "dev_user:abc123@ds163781.mlab.com",
    port: parseInt(process.env.DEV_DB_PORT) || 63781,
    name: process.env.DEV_DB_NAME || "onlinejudge_dev"
  }
};
```
### 3.2 Mongoose
In 'server/models/mongodb.js', use mongoose to setup connection and manipulate data to MongoDB. In the 'open' event, create default user 'jojozhuang/111111' if it doesn't exist each time when server is started.

```javascript
var mongoose = require("mongoose");
const config = require("../config/server-config");

var gracefulShutdown;
// mongodb url
const { db: { host, port, name } } = config;
var dbURI = `mongodb://${host}:${port}/${name}`;
if (process.env.NODE_ENV === "production") {
  dbURI = process.env.MONGOLAB_URI;
}
console.log("dbURI:", dbURI);
mongoose.connect(dbURI);

// Get collection names
mongoose.connection.on("open", function() {
  const users = mongoose.connection.db.collection("users");

  users.findOne({ username: "jojozhuang" }, function(err, user) {
    var curDate = new Date();
    if (!user) {
      const defaultUser = {
        username: "jojozhuang",
        email: "csgeek@mail.com",
        hash:
          "9f51bcd7a80a8da6fa02dcc9e136cd2ea5a08a24c988e4d822ebeb0b3eb430fd9a62af4fc6e1c456cb12cbc5b8792f737166ca39b3bb0fe4d34e1cd1ae134fd3",
        salt: "f8dae7c30d811b322b8763afc424fec0",
        role: "admin",
        timecreated: curDate
      };

      users.save(defaultUser, function(err) {
        if (err) {
          console.log("Error occurs when creating default user:" + err);
        }
        console.log(
          "[Database Initialization] New admin user 'jojozhuang' was created!"
        );
        console.log("[Default Admin] User Name: jojozhuang, Password: 111111");
      });

      users.save(defaultUser);
    } else {
      console.log("[Default Admin] User Name: jojozhuang, Password: 111111");
    }
  });
});

// CONNECTION EVENTS
mongoose.connection.on("connected", function() {
  console.log("Mongoose connected to " + dbURI);
});
mongoose.connection.on("error", function(err) {
  console.log("Mongoose connection error: " + err);
});
mongoose.connection.on("disconnected", function() {
  console.log("Mongoose disconnected");
});

// CAPTURE APP TERMINATION / RESTART EVENTS
// To be called when process is restarted or terminated
gracefulShutdown = function(msg, callback) {
  mongoose.connection.close(function() {
    console.log("Mongoose disconnected through " + msg);
    callback();
  });
};
// For nodemon restarts
process.once("SIGUSR2", function() {
  gracefulShutdown("nodemon restart", function() {
    process.kill(process.pid, "SIGUSR2");
  });
});
// For app termination
process.on("SIGINT", function() {
  gracefulShutdown("app termination", function() {
    process.exit(0);
  });
});
// For Heroku app termination
process.on("SIGTERM", function() {
  gracefulShutdown("Heroku app termination", function() {
    process.exit(0);
  });
});

// BRING IN YOUR SCHEMAS & MODELS
require("./user");

```

## 4. Async
### 4.1 Sleep
sleep
```javascript
var sleep = require('sleep');
    sleep.sleep(5)//sleep for 5 seconds, this will block the whole event loop execution
```
async
```javascript
const snooze = ms => new Promise(resolve => setTimeout(resolve, ms));

const example = async () => {
  console.log("About to snooze without halting the event loop...");
  await snooze(5000);
  console.log("done!");
};
```

### 4.2 Async Files Operations
* Use 'ncp' for asynchronous recursive copying file & directory.
* Use 'app-root-path' to access app's root path from anywhere without resorting to relative paths like require("../../path").

## 5. Reference
* [How to sleep the thread in node.js without affecting other threads?](https://stackoverflow.com/questions/13448374/how-to-sleep-the-thread-in-node-js-without-affecting-other-threads)
* [App Root Path Module](https://www.npmjs.com/package/app-root-path)
* [ncp - Asynchronous recursive file & directory copying](https://www.npmjs.com/package/ncp)
* [Express form](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/forms)
* [Express validation](https://express-validator.github.io/docs/)
