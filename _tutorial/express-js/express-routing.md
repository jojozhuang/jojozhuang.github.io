---
layout: tutorial
key: tutorial
title: "Express Routing"
index: 8756
subcategory: express-js
date: 2018-01-10
tags: [Express, Routing]
---

> Introduce how to implement server side routing for express.

## 1. Routing
`Routing` refers to determining how an application responds to a client request to a particular endpoint, which is a URI (or path) and a specific HTTP request method (GET, POST, and so on). Each route can have one or more handler functions, which are executed when the route is matched.
### 1.1 Definition
Route definition takes the following structure:
```javascript
app.METHOD(PATH, HANDLER)
```
Where:
* app is an instance of express.
* METHOD is an HTTP request method, in lowercase.
* PATH is a path on the server.
* HANDLER is the function executed when the route is matched.

### 1.2 Response Methods
The methods on the response object (`res`) in the following table can send a response to the client, and terminate the request-response cycle. If none of these methods are called from a route handler, the client request will be left hanging.

Method             | Description
-------------------|---------------------------------------
`res.download()`   | Prompt a file to be downloaded.
`res.end()`        | End the response process.
`res.json()`       | Send a JSON response.
`res.jsonp()`      | Send a JSON response with JSONP support.
`res.redirect()`   | Redirect a request.
`res.render()`     | Render a view template.
`res.send()`       | Send a response of various types.
`res.sendFile()`   | Send a file as an octet stream.
`res.sendStatus()` | Set the response status code and send its string representation as the response body.

## 2. Routes
### 2.1 Basic Routes
1) Simple routing.
```javascript
app.get("/home", function(request, response) {
    response.send("Welcome to homepage!");
});
```
2) Parameter in routing
```javascript
app.get("/users/:userid", function(req, res) {
var userId = parseInt(req.params.userid, 10);
// …
});
```
3) Regular expression, /users/123 or /users/456 but not /users/olivia
```javascript
app.get(/^\/users\/(\d+)$/, function(req, res) {
var userId = parseInt(req.params[0], 10);
// ...
});
```
4) Regular expression, /users/100-500
```javascript
app.get(/^\/users\/(\d+)-(\d+)$/, function(req, res) {
var startId = parseInt(req.params[0], 10);
var endId = parseInt(req.params[1], 10);
// …
});
```
5) Regular expression, UUID: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
```javascript
var horribleRegexp = /^([0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})$/i;
app.get(horribleRegexp, function(req, res) {
var uuid = req.params[0];
// ...
});
```
### 2.2 Route Methods
get, post, put and delete.
```javascript
// server.js
var express = require("express");
var app = express();

// Respond with Hello World! on the homepage:
app.get("/", function(req, res) {
  res.send("Hello World!");
});

// Respond to POST request on the root route (/), the application’s home page:
app.post("/", function(req, res) {
  res.send("Got a POST request");
});

// Respond to a PUT request to the /user route:
app.put("/user", function(req, res) {
  res.send("Got a PUT request at /user");
});

// Respond to a DELETE request to the /user route:
app.delete("/user", function(req, res) {
  res.send("Got a DELETE request at /user");
});

app.listen(3000, function() {
  console.log("Web Server started on port 3000");
});
```
### 2.3 Route Paths
```javascript
// path.js
var express = require("express");
var app = express();

app.get("/", function(request, response) {
  response.end("Welcome to my homepage!");
});
app.get("/about", function(request, response) {
  response.end("Welcome to the about page!");
});
app.get("/weather", function(request, response) {
  response.end("The current weather is NICE.");
});
app.get("/hello/:who", function(request, response) {
  response.end("Hello, " + request.params.who + "."); // parameter
});
app.use(function(request, response) {
  response.statusCode = 404;
  response.end("File not found!");
});

app.listen(3000, function() {
  console.log("Web Server started on port 3000");
});
```
### 2.4 Route Parameters
Route parameters are named URL segments that are used to capture the values specified at their position in the URL. The captured values are populated in the `req.params` object, with the name of the route parameter specified in the path as their respective keys.
```javascript
Route path: /users/:userId/books/:bookId
Request URL: http://localhost:3000/users/34/books/8989
req.params: { "userId": "34", "bookId": "8989" }
```
To define routes with route parameters, simply specify the route parameters in the path of the route as shown below.
```javascript
app.get('/users/:userId/books/:bookId', function (req, res) {
  res.send(req.params)
})
```
Since the hyphen (-) and the dot (.) are interpreted literally, they can be used along with route parameters for useful purposes.
```javascript
Route path: /flights/:from-:to
Request URL: http://localhost:3000/flights/LAX-SFO
req.params: { "from": "LAX", "to": "SFO" }

Route path: /plantae/:genus.:species
Request URL: http://localhost:3000/plantae/Prunus.persica
req.params: { "genus": "Prunus", "species": "persica" }
```
To have more control over the exact string that can be matched by a route parameter, you can append a regular expression in parentheses (()):
```javascript
Route path: /user/:userId(\d+)
Request URL: http://localhost:3000/user/42
req.params: {"userId": "42"}
```
### 2.5 Route Handlers
You can provide multiple callback functions that behave like middleware to handle a request. Route handlers can be in the form of a function, an array of functions, or combinations of both.
```javascript
// handler.js
var express = require("express");
var path = require("path");
var app = express();

// A single callback function can handle a route.
app.get("/example/a", function(req, res) {
  console.log("[a] the response is being processed ...");
  res.send("Hello from A!");
});
// More than one callback function can handle a route (make sure you specify the next object).
app.get(
  "/example/b",
  function(req, res, next) {
    console.log("[b] the response will be sent by the next function ...");
    next();
  },
  function(req, res) {
    res.send("Hello from B!");
  }
);

// An array of callback functions can handle a route.
var cb0 = function(req, res, next) {
  console.log("CB0");
  next();
};

var cb1 = function(req, res, next) {
  console.log("CB1");
  next();
};

var cb2 = function(req, res) {
  console.log("[c] the response is being processed ...");
  res.send("Hello from C!");
};

app.get("/example/c", [cb0, cb1, cb2]);

// A combination of independent functions and arrays of functions can handle a route.
app.get(
  "/example/d",
  [cb0, cb1],
  function(req, res, next) {
    console.log("[d]the response will be sent by the next function ...");
    next();
  },
  function(req, res) {
    res.send("Hello from D!");
  }
);

app.listen(3000, function() {
  console.log("Web Server started on port 3000");
});
```
### 2.6 Chained Route Handlers
You can create chainable route handlers for a route path by using `app.route()`. Because the path is specified at a single location, creating modular routes is helpful, as is reducing redundancy and typos.
```javascript
// chained.js
var express = require("express");
var path = require("path");
var app = express();

app
  .route("/book")
  .get(function(req, res) {
    res.send("Get a random book");
  })
  .post(function(req, res) {
    res.send("Add a book");
  })
  .put(function(req, res) {
    res.send("Update the book");
  });

app.listen(3000, function() {
  console.log("Web Server started on port 3000");
});
```

## 3. Express Router
Use the `express.Router` class to create modular, mountable route handlers. A Router instance is a complete middleware and routing system; for this reason, it is often referred to as a “mini-app”. Every express application has a built-in app router. Routers behave like middleware and can be `.use()` by the app in other routers.
### 3.1 Users Router
```javascript
var express = require("express");
var router = express.Router();

router.post("/", function(req, res) {
  res.send("Create user");
});

router.get("/:id", function(req, res) {
  res.send("Get one user by id");
});

router.put("/:id", function(req, res) {
  res.send("Update user");
});

router.delete("/:id", function(req, res) {
  res.send("Delete user");
});

router.get("/", function(req, res) {
  res.send("Get all user");
});

module.exports = router;
```
### 3.2 Products Router
```javascript
var express = require("express");
var router = express.Router();

router.post("/", function(req, res) {
  res.send("Create product");
});

router.get("/:id", function(req, res) {
  res.send("Get one product by id");
});

router.put("/:id", function(req, res) {
  res.send("Update product");
});

router.delete("/:id", function(req, res) {
  res.send("Delete product");
});

router.get("/", function(req, res) {
  res.send("Get all products");
});

module.exports = router;
```
### 3.3 App
Load above two router modules in the app.
```javascript
// routers.js
var express = require("express");
var app = express();
var users = require("./router/users");
var products = require("./router/products");

app.use("/users", users);
app.use("/products", products);

app.listen(3000, function() {
  console.log("Web Server started on port 3000");
});
```
Start the server with 'node router.js' and access http://localhost:3000/users in browser.
![image](/assets/images/backend/8756/users.png){:width="600px"}
Then access http://localhost:3000/products.
![image](/assets/images/backend/8756/products.png){:width="600px"}

## 4. Source Files
* [Source files of Express Routing on Github](https://github.com/jojozhuang/Tutorials/tree/master/ExpressRouting)

## 5. Reference
* [Basic routing](https://expressjs.com/en/starter/basic-routing.html)
* [Express Routing](https://expressjs.com/en/guide/routing.html)
* [Express API](http://expressjs.com/en/api.html)
