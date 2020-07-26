---
layout: tutorial
key: tutorial
title: "Cross Domain Access for RESTful Web Services"
index: 9703
subcategory: uncategorized
date: 2016-02-05
tags: [CORS, ASP.NET WebAPI]
---

> Access RESTful web services for web client which is deployed on another web server.

## 1. Background
I'm building a web application with ReactJS. The client calls RESTful web services built with ASP.NET WebAPI to fetch data. This client website(ReactJS) and the backend RESTful services are deployed on different servers. One issue is the client side fails to get the JSON data from the RESTful services. Similar issue can be found on stackoverflow.  
* [No 'Access-Control-Allow-Origin' header is present on the requested resource](http://stackoverflow.com/questions/20035101/no-access-control-allow-origin-header-is-present-on-the-requested-resource).

## 2. Cause and Solution
The failure is due to cross domain requests are not allowed under the browser’s [same origin policy](https://en.wikipedia.org/wiki/Same-origin_policy) for security concerns.
After doing a Google search, I found Cross-Origin Resource Sharing(CORS) is the solution for such issue. Here are the two articles describe how to use CORS.
* [Using CORS](http://www.html5rocks.com/en/tutorials/cors/)
* [Enabling Cross-Origin Requests in ASP.NET Web API 2](http://www.asp.net/web-api/overview/security/enabling-cross-origin-requests-in-web-api)

The key is to add 'Access-Control-Allow-Origin' attribute to the http request header.
```php
header("Access-Control-Allow-Origin: *"); // for php
Response.AppendHeader("Access-Control-Allow-Origin", "*") // for asp.net
```
## 3. Solution for Angular with PHP
In Angular, add a whitelist of legal files and/or domains in the config function of application, [Sample from w3schools](https://www.w3schools.com/angular/tryit.asp?filename=try_ng_include_crossdomain).
```javascript
$sceDelegateProvider.resourceUrlWhitelist([
    'https://tryit.w3schools.com/**'
]);
```
Meanwhile, for the backend, like php, add 'Access-Control-Allow-Origin' to header.
```php
<?php
header("Access-Control-Allow-Origin: *");
?>
```

## 4. Solution for ReactJS with ASP.NET
For ASP.NET Web API, add 'EnableCors' attribute to the controller.

```c#
[EnableCors(origins: "http://localhost:3366, http://localhost:3000", headers: "*", methods: "*", SupportsCredentials = true)]
public class VideoController : ApiController
{
}
```
In ReactJS, since I'm using superagent to send out http requests, just need to add 'withCredentials()' to the request header.

```javascript
request
      .get(url)
      .withCredentials()
      .end(function (err, res) { ... }
```

The above approach is mentioned in [superagent's official document](https://visionmedia.github.io/superagent/) , search for 'CORS'.
