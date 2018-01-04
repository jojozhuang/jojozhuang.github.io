---
layout: portfolio
key: portfolio
title: "Course Player(Socket.IO)"
index: 190
tags: [WebSocket, Socket.IO, Node.js, jQuery]
image: /assets/courseplayersocketio/thumbnail.png
excerpt: A realtime online course player, built with Socket.IO, HTML5 Canvas, Node.js and jQuery.
category: web
---

> A realtime online course player, built with [Socket.IO](http://socket.io/), HTML5 Canva, [Node.js](https://nodejs.org/en/) and [jQuery](https://jquery.com/).

## 1. Course Player
A course player consists of three components: video, screenshot and whiteboard.
* Video is captured by a camera during the lecturing time. It is in mp4 format.
* Screenshot is captured from computer monitor shared by teachers. It contains handouts and materials for the course. Screenshot are actually images.
* Whiteboard is captured from special pens and brushes. Any operation on the board, such as writing, drawing or brushing is recorded.

Check the posting [Course Player]({% link _posts/2016-03-12-course-player.md %}) to learn the details.

## 2. UI
For a real course player, video is played separately. The content of the screenshot and whiteboard is synchronized with the playing process of the video. In this app, a slider bar is used to simulate the video player.

On the top of the player, there is the slider bar and a Play button. There are two canvases below the slider bar. The left one is for screenshot and the right one is for whiteboard.
![image](/assets/courseplayersocketio/homepage.png)  
Click the `Play` button, the slider bar begins to move and the current time will increment in seconds. Meanwhile, the screenshot and whiteboard canvas show the content simultaneously.
![image](/assets/courseplayersocketio/playing.png)  
You can drag the slider bar to move forward or backward.
![image](/assets/courseplayersocketio/drag.png)  

## 4. Under the Hood
How does this course player work?  
1) When the page is opened, the connection is setup between server and client(web browser).  
2) Next, the course starts to play after the Play button is clicked. At the same time, a notification is sent to the server, and the server knows that the player has begun to work.  
3) Then, server starts a timer, run the task(step 4) for every second.  
4) Server reads data for screenshot and whiteboard based on the current time.  
5) If there is any update(new image or new drawing), it will send data(JSON format) to client. Otherwise, no communication occurs from server to client.  
6) If web browser gets data, it will draw images for screenshot or lines for whiteboard accordingly.  
7) The communication from client to server occurs only when the play button is clicked or the process bar is dragged.  
8) The communication from server to client occurs only when new data is found.  

Check posting [Building Course Player with Node.js and Socket.IO]({% link _posts/2016-03-16-building-course-player-with-nodejs-and-socketio.md %}) to learn the details of Socket.IO and how this course player is built.

## 5. Conclusion
### 5.1 Easy to Implement  
If you are familiar with Node.js and javascript, it is not too difficult to develop such real time online application.  
### 5.2 Low Bandwidth Consumption  
Communication occurs only when necessary. Unlike traditional web application, WebSocket makes the web application react at real time. This improve the user experience at client side and system performance at server side.  
### 5.3 Cross-platform  
This player is web based, the only required application on client’s machine is a web browser(eg. Google Chrome). Besides, this course player is based on HTML5, so it can be accessed in different web browsers and on different platforms. No need to install extra plugin in web browser, such as flash player or Silverlight.  

Both of the implementations are based on [WebSocket](https://en.wikipedia.org/wiki/WebSocket). For the basic knowledge of WebSocket and Socket.IO, please refer to my blog posting [Building Realtime Web Application with WebSocket]({% link _posts/2016-03-15-building-realtime-web-application-with-websocket.md %}).

## 6. Source Files
* [Source files of Course Player (Socket.IO) on Github](https://github.com/jojozhuang/Portfolio/tree/master/CoursePlayerSocketIO)
