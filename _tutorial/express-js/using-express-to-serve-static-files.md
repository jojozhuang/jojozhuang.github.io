---
layout: tutorial
key: tutorial
title: "Using Express to Serve Static Files"
index: 8761
subcategory: express-js
date: 2018-01-18
tags: [Node.js, Express]
---

> Introduce how to quickly setup a web server to serve static files (e.g. html files) with ExpressJS.

## 1. Web Server
In some cases, we need to share information in the html files to others. It is not always that we have a available web server eg. Aparche Tomcat, Microsoft IIS, or Nigix. One option is to use Express based on Node.js to setup a 'static' web server, which only serves static files.

## 2. Creating Server
Create a folder in local disk.
```raw
$ mkdir StaticWebServer
$ cd StaticWebServer
```
Create new node app with 'npm init' command.
```raw
$ npm init
```
Install express locally.
```raw
$ npm install express --save
```
Create two files, 'server.js' and 'index.html'.
```raw
$ touch server.js index.html
```

Update `server.js` with following content.
```javascript
var express = require('express');
var app = express();
var path = require('path');

// view at http://localhost:12000/
app.use('/', express.static(path.join(__dirname, '/')))

app.listen(12000);
console.log('Server running at http://localhost:12000/');
```
The following points need to be noted about the above file.
* Use `require` directive to load the 'express' module.
* Use `express.static(path.join(__dirname, '/')` to serve all static files under the root folder '/', including the files in sub folder.
* Call `app.listen()` method to start the server and listen at port `12000`.

Update `index.html` with following content.
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Static Web Server</title>
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <style>
        body { padding-top:50px; }
    </style>
</head>
<body>
    <div class="container">
      <div class="jumbotron">
        <h1>Static Web Server</h1>
        <p>This web server can serve static html files, images, etc.</p>
      </div>
      <p>Try the following links:</p>
      <div>1. Static html file: <a href="http://localhost:12000/hello.html">http://localhost:12000/hello.html</a></div>
      <div>2. Html file in sub folder: <a href="http://localhost:12000/sub/index.html">http://localhost:12000/sub/index.html</a></div>
      <div>3. Image: <img src="http://localhost:12000/wii_remoteplus.jpg" class="img-thumbnail" width="80"> URL: <a href="http://localhost:12000/wii_remoteplus.jpg">http://localhost:12000/wii_remoteplus.jpg</a></div>
      <div>4. Image in sub folder: <img src="http://localhost:12000/sub/wiiu_fightingpad.jpg" class="img-thumbnail" width="80"> URL: <a href="http://localhost:12000/sub/wiiu_fightingpad.jpg">http://localhost:12000/sub/wiiu_fightingpad.jpg</a></div>
      <div>5. Sub folder: <a href="http://localhost:12000/2048">Game 2048 (http://localhost:12000/2048)</a></div>
</body>
</html>
```
And put some static files, images to the both root folder and sub folder.
![image](/assets/images/backend/8761/folder_structure.png){:width="500px"}  

## 3. Running and Testing
In terminal, start the server with `node` command.
```raw
$ node server.js
```
You should see the following log.
```raw
Server running at http://localhost:12000/
```
Now the HTTP server is running on the local machine and waiting for a request at port 12000.
![image](/assets/images/backend/8761/startserver.png){:width="550px"}  
Open web browser, access http://127.0.0.1:12000/.
![image](/assets/images/backend/8761/index.png)
1) Static Html
![image](/assets/images/backend/8761/statichtml.png)
2) Html in Sub Folder
![image](/assets/images/backend/8761/htmlsubfolder.png)
3) Image
![image](/assets/images/backend/8761/image.png)
4) Image in Sub Folder
![image](/assets/images/backend/8761/imagesubfolder.png)
5) Game 2048
![image](/assets/images/backend/8761/game2048.png)

## 4. Source Files
* [Source files of Static Web Server on Github](https://github.com/jojozhuang/Tutorials/tree/master/StaticWebServer)

## 5. References
* [Use ExpressJS to Deliver HTML Files](https://scotch.io/tutorials/use-expressjs-to-deliver-html-files)
* [Serving static files in Express](http://expressjs.com/en/starter/static-files.html)
