---
layout: portfolio
key: portfolio
title: "Course Player(SignalR)"
index: 280
tags: [WebSocket, SignalR, ASP.NET]
image: /public/portfolios/courseplayersignalr/thumbnail.png
excerpt: A realtime online course player, built with SignalR and ASP.NET.
category: dotnet
---

> A realtime online course player, built with [SignalR](https://www.asp.net/signalr), HTML5 Canva, ASP.NET and [jQuery](https://jquery.com/).

## 1. Course Player
A course player consists of three components: video, screenshot and whiteboard.
* Video is captured by a camera during the lecturing time. It is in mp4 format.
* Screenshot is captured from computer monitor shared by teachers. It contains handouts and materials for the course. Screenshot are actually images.
* Whiteboard is captured from special pens and brushes. Any operation on the board, such as writing, drawing or brushing is recorded.

Check the posting [Introduction of Course Player]({% link _frontend/react/introduction-of-course-player.md %}) to learn the details.

## 2. UI
For a real course player, video is played separately. The content of the screenshot and whiteboard is synchronized with the playing process of the video.

On the top of the player, there is the slider bar and a Play button. There are two canvases below the slider bar. The upper one is for screenshot and the lower one is for whiteboard. And there is a video player at the left side.
![image](/public/portfolios/courseplayersignalr/homepage.png)  
Click the `Play` button, the slider bar begins to move and the current time will increment in seconds. Meanwhile, the screenshot and whiteboard canvas show the content simultaneously.
![image](/public/portfolios/courseplayersignalr/playing.png)  
You can drag the slider bar to move forward or backward.
![image](/public/portfolios/courseplayersignalr/drag.png)  

## 4. Under the Hood
Check posting [Building Course Player with SignalR and ASP.NET]({% link _frontend/react/building-course-player-with-signalr-and-aspnet.md %}) to learn the details of SignalR and how this course player is built.

Besides, check another blog post [Building Realtime Web Application with WebSocket]({% link _frontend/react/building-realtime-web-application-with-websocket.md %}) to learn the basic knowledge of [WebSocket](https://en.wikipedia.org/wiki/WebSocket), which is the technology behind SignalR.

## 5. Source Files
* [Source files of Course Player (SignalR) on Github](https://github.com/jojozhuang/course-player-signalr)
