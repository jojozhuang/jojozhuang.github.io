---
layout: post
key: blog
title: "Building RESTful APIs with Node.js And MongoDB(Draft)"
date: 2018-01-17
tags: [RESTful, Node.js, MongoDB]
---

>


Route	HTTP Verb	Description
/api/bears	GET	Get all the bears.
/api/bears	POST	Create a bear.
/api/bears/:bear_id	GET	Get a single bear.
/api/bears/:bear_id	PUT	Update a bear with new info.
/api/bears/:bear_id	DELETE	Delete a bear.

Route Middleware
```javascript
// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});
```

API versioning
/api/v1/product
/api/v2/product
```javascript
var express = require("express");
var apiVersion1 = require("./api1.js");
var app = express();
app.use("/v1", apiVersion1);
app.listen(3000, function() {
console.log("App started on port 3000");
});
```

```javascript
var express = require("express");
var apiVersion1 = require("./api1.js");
var apiVersion2 = require("./api2.js");
var app = express();
app.use("/v1", apiVersion1);
app.use("/v2", apiVersion2);
app.listen(3000, function() {
console.log("App started on port 3000");
});
```

http Status
```javascript
res.status(404).json({ error: "Resource not found!" });
// This is equivalent to:
res.status(404);
res.json({ error: "Resource not found!" });
```

Database schema
```javascript
var mongoose = require("mongoose");
var userSchema = mongoose.Schema({
username: { type: String, required: true, unique: true },
password: { type: String, required: true },
createdAt: { type: Date, default: Date.now },
displayName: String,
bio: String
});
```
https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4
https://codeburst.io/writing-a-crud-app-with-node-js-and-mongodb-e0827cbbdafb
https://medium.freecodecamp.org/building-a-simple-node-js-api-in-under-30-minutes-a07ea9e390d2
