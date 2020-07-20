---
layout: tutorial
key: tutorial
title: "Template Engine"
index: 8757
subcategory: express-js
date: 2018-01-11
tags: [Express, Template Engine, EJS]
---

> Introduce how to use EJS as a templating engine for the Node and Express applications.

## 1. Template Engine
A `template engine` enables you to use static template files in your application. At runtime, the template engine replaces variables in a template file with actual values, and transforms the template into an HTML file sent to the client. This approach makes it easier to design an HTML page.
![image](/assets/images/backend/8757/viewengine.png){:width="600px"}

Popular template engines that work with Express:
* Pug
* Mustache
* EJS

## 2. Using EJS
### 2.1 Pages
index.ejs
```html
<!-- views/index.ejs -->
<!DOCTYPE html>
<html>

<head>
    <% include partials/head %>
</head>

<body class="container">
    <header>
        <% include partials/header %>
    </header>

    <main>
        <div class="jumbotron">
            <h1>EJS Tempalte Engine</h1>
            <%= message %>
        </div>
    </main>

    <footer>
        <% include partials/footer %>
    </footer>

</body>

</html>
```
about.ejs
```html
<!-- views/about.ejs -->
<!DOCTYPE html>
<html>

<head>
    <% include partials/head %>
</head>

<body class="container">
    <header>
        <% include partials/header %>
    </header>

    <main>
        <div class="row">
            <div class="col-sm-12">
                <div class="well">
                    <h3>
                        <%= about %>
                    </h3>
                </div>
            </div>
        </div>
    </main>

    <footer>
        <% include partials/footer %>
    </footer>

</body>

</html>
```
### 2.2 Partial Pages
```html
<!-- views/partials/head.ejs -->
<meta charset="UTF-8">
<title>Express Views</title>

<!-- CSS (load bootstrap from a CDN) -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<style>
    body {
        padding-top: 20px;
    }
</style>
```
header.ejs
```html
<!-- views/partials/header.ejs -->
<nav class="navbar navbar-default" role="navigation">
    <div class="container-fluid">

        <div class="navbar-header">
            <a class="navbar-brand" href="#">
                <span class="glyphicon glyphicon glyphicon glyphicon-asterisk"></span>

            </a>

            <ul class="nav navbar-nav">
                <li><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
            </ul>
        </div>

    </div>
</nav>
```
footer.ejs
```html
<!-- views/partials/footer.ejs -->
<p class="text-center text-muted">© 2018 jojozhuang.github.io, All rights reserved.</p>
```
### 2.3 Express Server
server.js
```javascript
// server.js
var express = require("express");
var path = require("path");
var app = express();

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
  res.render("index", {
    message: "Hey everyone! This is my webpage."
  });
});

app.get("/about", function(req, res) {
  res.render("about", {
    about: "This website demonstrates how ejs works!"
  });
});

app.listen(3000, function() {
  console.log("Web Server started on port 3000");
});
```

## 3. Testing
Start the server and access http://localhost:3000/ in browser.
![image](/assets/images/backend/8757/home.png){:width="800px"}
Try to access http://localhost:3000/about.html.
![image](/assets/images/backend/8757/about.png){:width="800px"}  

## 4. Source Files
* [Source files of Express Template Engine on Github](https://github.com/jojozhuang/Tutorials/tree/master/ExpressTemplateEngine)

## 5. Reference
* [Using template engines with Express](https://expressjs.com/en/guide/using-template-engines.html)
* [Use EJS to Template Your Node Application](https://scotch.io/tutorials/use-ejs-to-template-your-node-application)
* [Top 10 Templating Engines for JavaScript To Improve and Simplify Your Workflow 2018](https://colorlib.com/wp/top-templating-engines-for-javascript/)
