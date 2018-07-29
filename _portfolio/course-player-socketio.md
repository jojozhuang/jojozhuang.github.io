---
layout: portfolio
key: portfolio
title: "Course Player(Socket.IO)"
index: 190
tags: [WebSocket, Socket.IO, Node.js, jQuery]
image: /public/portfolios/courseplayersocketio/thumbnail.png
excerpt: A realtime online course player, built with Socket.IO, HTML5 Canvas, Node.js and jQuery.
category: web
---

> A realtime online course player, built with [Socket.IO](http://socket.io/), HTML5 Canva, [Node.js](https://nodejs.org/en/) and [jQuery](https://jquery.com/).

## 1. Course Player
A course player consists of three components: video, screenshot and whiteboard.
* Video is captured by a camera during the lecturing time. It is in mp4 format.
* Screenshot is captured from computer monitor shared by teachers. It contains handouts and materials for the course. Screenshot are actually images.
* Whiteboard is captured from special pens and brushes. Any operation on the board, such as writing, drawing or brushing is recorded.

Check the posting [Introduction of Course Player]({% link _tutorial/react/introduction-of-course-player.md %}) to learn the details.

## 2. UI
For a real course player, video is played separately. The content of the screenshot and whiteboard is synchronized with the playing process of the video. In this app, a slider bar is used to simulate the video player.

On the top of the player, there is the slider bar and a Play button. There are two canvases below the slider bar. The left one is for screenshot and the right one is for whiteboard.
![image](/public/portfolios/courseplayersocketio/homepage.png)  
Click the `Play` button, the slider bar begins to move and the current time will increment in seconds. Meanwhile, the screenshot and whiteboard canvas show the content simultaneously.
![image](/public/portfolios/courseplayersocketio/playing.png)  
You can drag the slider bar to move forward or backward.
![image](/public/portfolios/courseplayersocketio/drag.png)  

## 4. Under the Hood
Check posting [Building Course Player with Node.js and Socket.IO]({% link _tutorial/react/building-course-player-with-nodejs-and-socketio.md %}) to learn the details of Socket.IO and how this course player is built.

Besides, check another blog post [Building Realtime Web Application with WebSocket]({% link _tutorial/react/building-realtime-web-application-with-websocket.md %}) to learn the basic knowledge of [WebSocket](https://en.wikipedia.org/wiki/WebSocket), which is the technology behind Socket.IO.

## 5. Source Files
* [Source files of Course Player (Socket.IO) on Github](https://github.com/jojozhuang/course-player-socketio)
