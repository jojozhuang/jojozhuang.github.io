---
layout: tutorial
key: tutorial
title: "Building Realtime Application with SignalR"
index: 8473
subcategory: react-app
date: 2016-03-14
tags: [Chat Room, Sketch Pad, SignalR]
---

> Build chat room and drawing application with SignalR. 

## 1. Home Page  
Some resources which help to build this application.  
![image](/assets/images/frontend/8473/home.png){:width="700px"}  

## 2. Chat Room
### 2.1 Introduction  
This is an online chat room application. Any message submitted is broadcasted.  
### 2.2 First User (Joined through Chrome)  
To join the chatting room, you must provide a user name first.  
![image](/assets/images/frontend/8473/chatroomuser1.png)
To send message, just input the text and click ‘Send’.
![image](/assets/images/frontend/8473/chatroommsg1.png)
### 2.3 Second User(Joined through Firefox)  
![image](/assets/images/frontend/8473/chatroomuser2.png)
Send a message to others.  
![image](/assets/images/frontend/8473/chatroommsg2.png)
### 2.4 Receive Broadcasting Messages  
Go back to the first user. The message from Mike is displayed automatically. Here, we see the real-time message   without refreshing the current page.  
![image](/assets/images/frontend/8473/chatroombroadcasting.png)
### 2.5 Under the Hood  
How does it work?  
1) When accessing the chat room, a new connection is setup between your web browser and the server.  
2) Then, you provide a user name to identify yourself from others. This name is added to the chatting group.  
3) Next, you type some texts and click the ‘Send’ button, the message is sent to the server through WebSocket protocol.  
4) This server, actually is a general ASP.NET web application. The magic thing is, SignalR creates an HTTP Handler upon ASP.NET runtime to deal with the WebSocket messages. When it receives any message from client, it will notify other users within the same group. Technically, this process is called: Broadcasting.  
5) Another user’s web browser receives your input from server, and display it to the page.  
6) If no user input any text, no communication will happen.  
7) If user close the web browser, his/her name will be removed from the chatting group.  
8) The group survives until no user in the group.  

## 3. Sketch Pad  
### 3.1 Introduction  
One user draws on the canvas and other users will see the drawing immediately on their own canvas. This sketch pad is implemented by HTML5 canvas and SignalR.  
### 3.2 Opening Two Sketch Pads with Different Browsers
Open the first one in Chrome.  
![image](/assets/images/frontend/8473/sketchpad1.png)
Open the second one in Firebox.  
![image](/assets/images/frontend/8473/sketchpad2.png)  
### 3.3 Drawing in Chrome
![image](/assets/images/frontend/8473/sketchpaddrawing.png)  
### 3.4 Synchronizing to Others
The drawing is synchronized to others(eg. here is Firefox) simultaneously.  
![image](/assets/images/frontend/8473/sketchpadsync.png)  
### 3.5 Under the Hood  
The process is same with the chat room. The only difference is, the format of data used for the communication between server and client. For drawing, we send out coordinates of the points on the canvas instead of string messages.

## 4. Source Files
* [Source files of SignalR Tutorial on Github](https://github.com/jojozhuang/Tutorials/tree/master/SignalRTutorial)
