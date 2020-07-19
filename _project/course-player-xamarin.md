---
layout: project
key: project
title: "CoursePlayer(Xamarin)"
index: 110
category: mobile
image: courseplayerxamarin/thumbnail.png
tags: [Xamarin, C#, Cross-platform]
---

> An iOS App for playing course, built with Xamarin in C#.

This `iOS` app is developed by [Xamarin](https://xamarin.com/), a tool for developing cross-platform mobile apps. The core function of this app is to play course recordings of video, screenshot and whiteboard.

## 1. Introduction
### 1.1 Course Player
A course player consists of three components: video, screenshot and whiteboard.
* Video is captured by a camera during the lecturing time. It is in mp4 format.
* Screenshot is captured from computer monitor shared by teachers. It contains handouts and materials for the course. Screenshot are actually images.
* Whiteboard is captured from special pens and brushes. Any operation on the board, such as writing, drawing or brushing is recorded.

Check the posting [Introduction of Course Player]({% link _tutorial/react-app/introduction-of-course-player.md %}) to learn the details.
### 1.2 Online Players
DePaul University has two types of course players in its Course OnLine (COL) system, online course player and mobile app players.

Online players are developed by Adobe Flash and Microsoft Silverlight. They are installed as plug-ins on web browsers. Below is the screenshot that flash player is working on Microsoft IE. Notice, the video is sent in a continuous stream of data from server to client web browser.
![flash](/assets/images/project/courseplayerxamarin/flash.png)
### 1.3 Mobile App Players
Mobile players are native apps for iOS and Android platforms. Below is the screenshot that iOS player is working on iPhone 5s. Notice that all the data, including video, screenshot, whiteboard are downloaded to mobile devices before playing.
![coliphone](/assets/images/project/courseplayerxamarin/coliphone.jpeg)
### 1.4 Problems of Current Mobile Apps
Both the iOS and Android apps have the same functionalities.  
* Download course components to local storage
* Manage course list
* Play video
* Synchronize screenshot(PPT) when video is playing
* Synchronize whiteboard when video is playing

Developers have to use two different programming languages Swift and Java to build these apps, just because  they are on different mobile platforms. To avoid maintaining two pieces of the codes and reduce the development cost, we can use cross-platform mobile development tools. Xamarin is one of the options.

## 2. Building iOS App with Xamarin
### 2.1 Xamarin
Xamarin is based on [Mono](http://www.mono-project.com/) and .NET framework, written in C#. With the help of Xamarin platform, we can use C# to build iOS and Android Apps. The benefit by using Xamarin is obvious, the development and maintenance cost are reduced, since the common libraries can be centralized and reused by other components. For developers, they can focus on UI of iOS and Android once the lower business logic component is finalized. You can find more details of Xamarin from my [Xamarin Research Document]({% link /assets/docs/xamarin_research.pdf %}).
### 2.2 Xamarin Course Player(iOS)
On the top of the player, there is the slider bar and a Play button. There are two canvases below the slider bar. The first one is for screenshot and the second one is for whiteboard.
![image](/assets/images/project/courseplayerxamarin/homepage.png){:width="350px"}  
Click the `Play` button, the slider bar begins to move and the current time increments in seconds. Meanwhile, the screenshot and whiteboard canvas show the content simultaneously.

| Start Playing      | Move Forward        | Move Backward       |
|--------------------|---------------------|---------------------|
| ![image](/assets/images/project/courseplayerxamarin/play.png){:width="280px"} | ![image](/assets/images/project/courseplayerxamarin/forward.png){:width="280px"}   | ![image](/assets/images/project/courseplayerxamarin/backward.png){:width="280px"}

## 3. Under the Hood
Class diagram shows the design of this app based on Xamarin framework.
![framework](/assets/images/project/courseplayerxamarin/framework.png)  

Check the blog post [Building Course Player with Xamarin]({% link _tutorial/mobile/building-course-player-with-xamarin.md %}) to learn the details of Xamarin and how this app is built.

## 4. Source Files
* [Source files of Course Player(Xamarin) on Github](https://github.com/jojozhuang/course-player-xamarin)
