---
layout: tutorial
key: tutorial
title: "Versioning RESTful API - Draft"
index: 8764
subcategory: express-js
date: 2018-01-28
tags: [RESTful]
draft: true
---

> Introduce how to version RESTful APIs.

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

```javascript
var csrf = require("csurf");
// …
app.use(csrf());
app.get("/", function(req, res) {
  res.render("myview", {
    csrfToken: req.csrfToken()
  });
});
```


[Node.js API Versioning with totoro-node](https://blog.cloudboost.io/node-js-api-versioning-with-totoro-node-c2ea1ef3dfba)

User login, product management CRUD
cookieParser




http://meanjs.org/
http://mean.io/
https://www.quora.com/What-is-the-difference-between-http-mean-io-and-Mean-JS
https://stackoverflow.com/questions/23199392/difference-between-mean-js-and-mean-io

```raw
ng g directive disablecontrol
```

[Disabling Form Controls When Working With Reactive Forms in Angular](https://netbasal.com/disabling-form-controls-when-working-with-reactive-forms-in-angular-549dd7b42110)
