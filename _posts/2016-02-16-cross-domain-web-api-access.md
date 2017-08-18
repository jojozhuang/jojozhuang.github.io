---
layout: post
key: blog
title: "Cross Domain Web Api Access"
date: 2016-02-16
categories:
- blog
---

We are building a web application with React, which fetches data from an ASP.NET server. One issue we encountered is the client side is not able to get the json data from the Web API. Similar issue can be found on stackoverflow.  
* [No 'Access-Control-Allow-Origin' header is present on the requested resource](http://stackoverflow.com/questions/20035101/no-access-control-allow-origin-header-is-present-on-the-requested-resource).

After searching through Google, I found Cross-Origin Resource Sharing(CORS) is the solution for such issue. Here are the two articles describe how to use CORS.
* [Using CORS](http://www.html5rocks.com/en/tutorials/cors/)
* [Enabling Cross-Origin Requests in ASP.NET Web API 2](http://www.asp.net/web-api/overview/security/enabling-cross-origin-requests-in-web-api)

The key is to add 'Access-Control-Allow-Origin' attribute to the http header.
```php
header("Access-Control-Allow-Origin: *"); // for php
Response.AppendHeader("Access-Control-Allow-Origin", "*") // for asp.net
```

Here is the solution I found finally.
### 1. For ASP.NET Web API, add 'EnableCors' attribute to the controller.

```c#
[EnableCors(origins: "http://localhost:3366, http://localhost:3000", headers: "*", methods: "*", SupportsCredentials = true)]
public class VideoController : ApiController
{
}
```

### 2. In react, we use superagent to send Ajax request. Just add 'withCredentials()' to the request.

```javascript
request
      .get(url)
      .withCredentials()
      .end(function (err, res) { ... }
```

The above approach is mentioned in [superagent's official document](https://visionmedia.github.io/superagent/) , search for 'CORS'.
