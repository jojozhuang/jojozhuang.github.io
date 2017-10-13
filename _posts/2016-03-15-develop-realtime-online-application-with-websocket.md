---
layout: post
key: blog
title: "Develop Realtime Online Application with WebSocket"
date: 2016-03-15
tags: [WebSocket, Socket.IO, SignalR]
---

> [WebSocket](https://en.wikipedia.org/wiki/WebSocket) is a protocol which enables so-called full-duplex communications. It comes along with HTML5. The protocol itself is not mature, still under developing. Two main features of WebSocket:
* double direction communication
* broadcasting

## 1. Background
For most of web applications, we use HTTP protocol to communicate between server and client. One problem is, in most cases, client sends request to server, but server is not able to send information to client at a specific time. Because HTTP is stateless, server can't response without request from client. Generally, we use the 'Pull' mode to let web browser send request regularly to check whether there is any new update on the server side. This approach wastes lots of bandwidth especially when nothing needs to be updated. How would be great if we can implement the 'Push' mode, let server to communicate with client by intention?! The answer is WebSocket.

There are many implementations of WebSocket. In this article, I will introduce 3 of them.
 * [Socket.IO](http://socket.io/) for node.js
 * [System.Web.WebSockets](https://msdn.microsoft.com/en-us/hh969243.aspx) in ASP.NET
 * [SignalR](http://signalr.net/)

## 2. Socket.IO
### 2.1 Prerequisite
If you haven’t installed Node.js and NPM, please install them by referring to posting [Install Node.js and NPM]({% link _posts/2016-03-06-install-nodejs-and-npm.md %}).
### 2.2 Server Clock
This sample shows the Full-Duplex feature of Socket.IO.
Create a file named `clock-server.js`. And add the following code. The timer invokes sockets.send method every one second.  

```javascript
var app = require('http').createServer(handler);
var io = require('socket.io').listen(app);
var fs = require('fs');

var html = fs.readFileSync('index.html', 'utf8');
function handler (req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Content-Length', Buffer.byteLength(html, 'utf8'));
  res.end(html);
}
function tick () {
  var now = new Date().toUTCString();
  now=now.setMonth(now.getMonth() - 7);
  io.sockets.send(now);
}
setInterval(tick, 1000);
app.listen(8080);

// Console will print the message
console.log('Server running at http://127.0.0.1:8080/');
```  

Create `index.html` with following codes.  

```html
<!DOCTYPE html>
<html>
<head>
  <script type="text/javascript" src="/socket.io/socket.io.js">
  </script>
  <script type="text/javascript">
    var socket = io.connect();
    socket.on('message', function (time) {
      document.getElementById('time').innerHTML = time;
    });
  </script>
</head>
<body>Current server time is: <b><span id="time"></span></b>
</body>
</html>
```  

In terminal, execute clock-server.js with node command.
```sh
$ node clock-server.js
```
Open browser, access http://127.0.0.1:8080/. The time will be updated for every one second.  
![Server Time](/public/pics/2016-03-15/socketiotimer.png "Server Time")  

### 2.2 Online Painting Application
Another example of Socket.IO usage is online painting. This sample comes from [here](http://wesbos.com/html5-canvas-websockets-nodejs/). This sample shows the Broadcasting feature of Socket.IO.  
Download the source files from [SocketIOCanvas from GitHub](https://github.com/jojozhuang/Tutorials/tree/master/SocketIOCanvas), run
```sh
npm install
```
Then start it with:
```sh
npm start
```
Open the web application in different web browsers from different machines, laptop, ipad and iphone.

After all opened, start to draw in the first chrome browser.  
![In Chrome](/public/pics/2016-03-15/socketiopaint1.png)  
After drawing is finished, switch to Firefox. Same drawing in Firefox.  
![Firefox](/public/pics/2016-03-15/socketiopaint2.png)  
Same in iPad.  
![iPad](/public/pics/2016-03-15/socketiopaint3.png)  
Same in iPhone.  
![iPhone](/public/pics/2016-03-15/socketiopaint4.png)  

## 3. WebSockets in ASP.NET
WebSocket is supported in ASP.NET 4.5. You can install it through NuGet, which is called [Microsoft.WebSockets](http://www.nuget.org/packages/Microsoft.WebSockets/). And please note, Windows7 does not support WebSocket.  
Here is the article shows how to use it.
* [Building an HTML5 Web Sockets Server with ASP.NET 4.5](http://weblogs.asp.net/dwahlin/building-an-html5-web-sockets-server-with-asp-net-4-5) .  

### 3.1 First user comes in, says 'Hi'.  
![MS WebSocket1](/public/pics/2016-03-15/mswebsocket1.png "MS WebSocket1")  
### 3.2 Second user comes in(another page), says 'I'm here'.  
![MS WebSocket2](/public/pics/2016-03-15/mswebsocket2.png "MS WebSocket2")  
### 3.3 Back to the page of first user.
![MS WebSocket3](/public/pics/2016-03-15/mswebsocket3.png "MS WebSocket3")  

## 4. SignalR
SignalR is popular and it can run in Windows7. The official tutorial is [Tutorial: Getting Started with SignalR 2](http://www.asp.net/signalr/overview/getting-started/tutorial-getting-started-with-signalr). Follow the steps to create the application or just download the sample code at the top of the tutorial page.

This sample implements the online chatting function.  
![SignalR](/public/pics/2016-03-15/signalrsample.png "SignalR")  

## 5. Source Files
* [Source files of SocketIO Clock Server on Github](https://github.com/jojozhuang/Tutorials/tree/master/SocketIOClock)
* [Source files of SocketIO Online Painting on Github](https://github.com/jojozhuang/Tutorials/tree/master/SocketIOCanvas)
* [Source files of WebSockets Sample on Github](https://github.com/jojozhuang/Study/tree/master/DotNet/WebSockets/ASP.NET)
* [Source files of SignalR Sample on MSDN](https://code.msdn.microsoft.com/SignalR-Getting-Started-b9d18aa9)
