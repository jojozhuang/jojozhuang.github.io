---
layout: tutorial
key: tutorial
title: "Building Socket.IO Application with ExpressJS[Draft]"
index: 8715
subcategory: node-js
date: 2016-03-16
tags: [Node.js]
draft: true
---

> Tutorial for how to create web application with Socket.IO and ExpressJs.

```javascript
var app = express()
server = require('http').createServer(app)
io = io.listen(server);

server.listen(80);
```

## 4. References
* [How to use ExpressJS and Socket.io on a same port?](https://stackoverflow.com/questions/12235406/how-to-use-expressjs-and-socket-io-on-a-same-port)
