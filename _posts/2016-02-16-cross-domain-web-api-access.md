---
layout: post
key: blog
title: "Cross Domain Web Api Acess"
date: 2016-02-16
categories:
- blog
---

We are building a react website which accesses an ASP.NET server. The client side is not able to get the json data from the Web API. Similar error like this issue can be found on stackoverflow:
[No 'Access-Control-Allow-Origin' header is present on the requested resource](http://stackoverflow.com/questions/20035101/no-access-control-allow-origin-header-is-present-on-the-requested-resource).

Cross-Origin Resource Sharing(CORS) is the solution for such issues. General explanation is available [here](http://www.html5rocks.com/en/tutorials/cors/). And, another specific explanation for ASP.NET Web API is [here](http://www.asp.net/web-api/overview/security/enabling-cross-origin-requests-in-web-api).

For ASP.NET Web API, add 'EnableCors' attribute to the controller.

```
[EnableCors(origins: "http://localhost:3366, http://localhost:3000", headers: "*", methods: "*", SupportsCredentials = true)]
public class VideoController : ApiController
{
}
```

In react, we use superagent to send Ajax request. To fix the issue, just need to add 'withCredentials()' to the request.

```javascript
request
      .get(url)
      .withCredentials()
      .end(function (err, res) {
```

The above approach is mentioned in [superagent's](https://visionmedia.github.io/superagent/) official document, search for 'CORS'.
