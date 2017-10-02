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
### 2.1 Full-Duplex
Create a file named server.js. And add the following code. The timer invokes sockets.send method every one second.  

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
  io.sockets.send(now);
}
setInterval(tick, 1000);
app.listen(8080);
```  

Create index.html with following codes.  

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

Run it, you will get the below result. The time will be updated for every one second.  
![Server Time](/public/pics/2016-03-07/socketiotimer.png "Server Time")  

### 2.2 Broadcasting
Another example of Socket.IO usage is online painting. This sample comes from [here](http://wesbos.com/html5-canvas-websockets-nodejs/).
Open the web application in different web browsers from different machines, laptop, ipad and iphone.

After all opened, start to draw in the first chrome browser.  
![In Chrome](/public/pics/2016-03-07/socketiopaint1.png)  
Same in Firefox.  
![Firefox](/public/pics/2016-03-07/socketiopaint2.png)  
Same in iPad.  
![iPad](/public/pics/2016-03-07/socketiopaint3.png)  
Same in iPhone.  
![iPhone](/public/pics/2016-03-07/socketiopaint4.png)  

## 3. WebSockets in ASP.NET
WebSocket is supported in ASP.NET 4.5. You can install it through NuGet, which is called [Microsoft.WebSockets](http://www.nuget.org/packages/Microsoft.WebSockets/). And please note, Windows7 does not support WebSocket.  
Here is the article shows how to use it.
* [Building an HTML5 Web Sockets Server with ASP.NET 4.5](http://weblogs.asp.net/dwahlin/building-an-html5-web-sockets-server-with-asp-net-4-5) .  

### 3.1 First user comes in, says 'Hi'.  
![MS WebSocket1](/public/pics/2016-03-07/mswebsocket1.png "MS WebSocket1")  
### 3.2 Second user comes in(another page), says 'I'm here'.  
![MS WebSocket2](/public/pics/2016-03-07/mswebsocket2.png "MS WebSocket2")  
### 3.3 Back to the page of first user.
![MS WebSocket3](/public/pics/2016-03-07/mswebsocket3.png "MS WebSocket3")  

## 4. SignalR
SignalR is popular and it can run in Windows7. The official tutorial is [Tutorial: Getting Started with SignalR 2](http://www.asp.net/signalr/overview/getting-started/tutorial-getting-started-with-signalr). Follow the steps to create the application or just download the sample code at the top of the tutorial page.

This sample implements the online chatting function.  
![SignalR](/public/pics/2016-03-07/signalrsample.png "SignalR")  

## 5. Source Files
* [Source files of SocketIO Sample1 on Github](https://github.com/jojozhuang/Study/tree/master/NodeJs/NodejsAction/SocketIO)
* [Source files of SocketIO Sample2 on Github](https://github.com/jojozhuang/Study/tree/master/NodeJs/CanvasWebSocket)
* [Source files of WebSockets Sample on Github](https://github.com/jojozhuang/Study/tree/master/DotNet/WebSockets/ASP.NET)
* [Source files of SignalR Sample on MSDN](https://code.msdn.microsoft.com/SignalR-Getting-Started-b9d18aa9)
