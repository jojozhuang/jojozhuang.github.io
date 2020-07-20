---
layout: tutorial
key: tutorial
title: "Express Security - Draft"
index: 8758
subcategory: express-js
date: 2018-01-12
tags: [Express]
draft: true
---

> Introduce how to build secure web application with express.

throw error
```javascript
fs.readFile("myfile.txt", function(err, data) {
  if (err) {
    console.error(err);
    throw err;
  }
  console.log(data);
});
```

Parse query strings
```javascript
//http://mysearchengine.com/search?q=crockford+backflip+video
app.get("/search", function(req, res) {
  var search = req.query.q.replace(/\+/g, " ");
  // … do something with the search …
});

//http://mysearchengine.com/search?crockford+backflip+video, no q
app.get("/search", function(req, res) {
  var search = req.query.q || "";
  var terms = search.split("+");
  // … do something with the search …
});

//http://mysearchengine.com/search?q=abc&q=xyz, two q parameters
var arrayWrap = require("arraywrap");
// …
app.get("/search", function(req, res) {
  var search = arrayWrap(req.query.q || "");
  var terms = search[0].split("+");
  // … do something with the terms …
});
```

SSL, HTTPS
express-enforces-ssl
FORCE USERS TO HTTPS
```javascript
var enforceSSL = require("express-enforces-ssl");
// …
app.enable("trust proxy");
app.use(enforceSSL());
```
KEEP USERS ON HTTPS
HTTP Strict Transport Security (HSTS)
Strict-Transport-Security: max-age=31536000
https://github.com/helmetjs/helmet


cross-site scripting (XSS) attack
ESCAPING USER INPUT
```raw
Hello, <script src="http://evil.com/hack.js"></script>world.
Hello, &lt;script src="http://evil.com/hack.js"&gt;&lt;/script&gt;world.
```

set the X-XSS-Protection header
app.use(helmet.xssFilter());

PROTECTING AGAINST CSRF IN EXPRESS
https://github.com/expressjs/csurf
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
server render
```html
<form method="post" action="/submit">
<input name="_csrf" value="<%= csrfToken %>" type="hidden">
...
</form>
```

Keeping your dependencies up to date
find out which versions were out of date: npm outdated

Node Security Project
https://nodesecurity.io/advisories

npm install –g nsp
nsp audit-package

Handling server crashes, forever
```raw
npm install forever --save
```
```javascript
"scripts": {
"start": "forever app.js"
}
```
Various little tricks
app.disable("x-powered-by");

X-Frame-Options
```javascript
app.use(helmet.frameguard("sameorigin"));
// or …
app.use(helmet.frameguard("deny"));
```

restrictive crossdomain.xml
```xml
<?xml version="1.0"?>
<!DOCTYPE cross-domain-policy SYSTEM "http://www.adobe.com/xml/dtds/cross-domain-policy.dtd">
<cross-domain-policy>
<site-control permitted-cross-domain-policies="none">
</cross-domain-policy>
```
```javascript
app.use(helmet.noSniff());
```

## 5. Reference
* [Website security](https://developer.mozilla.org/en-US/docs/Learn/Server-side/First_steps/Website_security)
