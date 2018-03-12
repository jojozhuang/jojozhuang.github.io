---
layout: portfolio
key: portfolio
title: "Course Player(SignalR)"
index: 280
tags: [WebSocket, SignalR, ASP.NET]
image: /assets/courseplayersignalr/thumbnail.png
excerpt: A realtime online course player, built with SignalR and ASP.NET.
category: dotnet
---

> A realtime online course player, built with SignalR and ASP.NET.



## 4. Screen & Whiteboard  
### 4.1 Introduction  
A course player consists of three components, video, screenshot and whiteboard.  

* Video is captured by a camera during the lecturing time, and saved as mp4.
* Screenshot is captured from computer monitor through which teachers share their handouts/materials to the students. Screenshot are images which are compressed and saved to a single file.
* Whiteboard is captured from special pens and boards. Any operation on the board, such as writing, drawing or brushing is recorded and stored to a single file.

For this course player, video is played separately. The content of the screen and whiteboard is synchronized with the playing process of the video. In this sample, I use a slider bar to simulate the video player.  
### 4.2 UI  
On the top of the player, there is the process bar and a Play button. There are two canvases below the process bar. The left one is for screenshot and the right one is for whiteboard.  
![image11](/assets/courseplayersignalr/image11.png)  
### 4.3 Play  
When you click the play button, the slider bar begins to move, the current time will be refreshed as well, one second for interval. The screenshot and whiteboard canvas show the content simultaneously. You can drag the process bar forward or backward.  
![image12](/assets/courseplayersignalr/image12.png)  
### 4.4 Under the Hood  
How does this dummy player work?  
1) When the page is opened, the connection is setup between server and client(web browser).  
2) Next, the course starts to play after the Play button is clicked. At the same time, a notification is sent to the server, and the server knows that the player has begun to work.  
3) Then, server starts a timer, run the task(step 4) for every second.  
4) Server reads data for screenshot and whiteboard based on the current time.  
5) If there is any update(new image or new drawing), it will send data(JSON format) to client. Otherwise, no communication occurs from server to client.  
6) If web browser gets data, it will draw images or lines accordingly.  
7) The communication from client to server occurs only when the play button is click or the process bar is dragged.
8) The communication from server to client occurs only when new data is found.  

## 5. Course Player  
### 5.1 Introduction  
Based on the previous sample, add a HTML5 Video control to make it a real course player. Here is the js video control for html5, http://videojs.com/.  
![image13](/assets/courseplayersignalr/image13.png)  

## 6. Conclusion  
### 6.1 Easy to Implement  
If you are familiar with C\# and ASP.NET, it is really easy to develop such real time online application. Of course, you need write some javascript code to use SignalR at the client side.  
### 6.2 Low Bandwidth Consumption  
Communication occurs only when necessary. Unlike traditional web application, WebSocket makes the web application react at real time. This improve the user experience at client side and system performance at server side.  
### 6.3 Cross-platform(For customers/students)  
This player is web based, the only required application on client’s machine is a web browser(eg. Google Chrome). Besides, this course player is based on HTML5, so it can be accessed in different web browsers and on different platforms. No need to install extra plugin in web browser, such as flash player or Silverlight.  
### 6.4 Cross-platform(For developer)  
For developer, since this WebSocket based player is a cross-platform application, it is a better solution than other platform specific solutions. Compared with our existing Flash and Silverlight player, this course player is simple and easy to maintain, since there is only one copy of the code.  
### 6.5 Reusable  
The core module(COL.Core) of this application is shared with [Xamarin Course Player]({% link _portfolio/course-player-xamarin.md %}), which is another portfolio of mine. It is a cross-platform solution for mobile development.
![image14](/assets/courseplayersignalr/image14.png)  

This means, we have the cross-platform solution for developing applications with only using C\#.  
* First, use Xamarin to develop mobile apps for iOS and Android Platform.  
* Second, use ASP.NET and SignalR to develop web application for different web browsers and platforms.  
* Technically, the core module can be shared and reused by mobile and web application, even, it can be shared with winform applications.  
* Two parts cannot be reused, one is the UI, web(html) and mobile(native UI) are obviously different. And another is file operation, reading/writing file on windows/ios/linux platform varies apparently. However, the business logics are same, which can be reused.  

## 7. Source Files
* [Source files of Course Player (SignalR) on Github](https://github.com/jojozhuang/Portfolio/tree/master/CoursePlayerSignalR)
