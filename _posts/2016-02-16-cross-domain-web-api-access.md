---
layout: post
key: blog
title: "Cross Domain Web Api Acess"
date: 2016-02-16
categories:
- blog
---

We are building a react website which accesses an ASP.NET server. The client side is not able to get the json data from the Web API. Similar error like this:
[No access control](http://stackoverflow.com/questions/20035101/no-access-control-allow-origin-header-is-present-on-the-requested-resource)

Cross-Origin Resource Sharing(CORS) is the solution for this. Explanation can be seen [here](http://www.html5rocks.com/en/tutorials/cors/). 

And, another explanation for ASP.NET Web API, see [here](http://www.asp.net/web-api/overview/security/enabling-cross-origin-requests-in-web-api).

For the web api,
```
[EnableCors(origins: "http://localhost:3366, http://localhost:3000", headers: "*", methods: "*", SupportsCredentials = true)]
public class VideoController : ApiController
{
}
```    

in react, we use superagent, add 'withCredentials()' to the request.
```
request
      .get(url)
      .withCredentials()
      .end(function (err, res) {
```      
here is the official document, [superagent](https://visionmedia.github.io/superagent/)
