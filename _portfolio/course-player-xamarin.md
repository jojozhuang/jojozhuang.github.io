---
layout: portfolio
key: portfolio
title: "CoursePlayer(Xamarin)"
index: 80
tags: [Xamarin, C#, Cross-platform]
image: /assets/courseplayerxamarin/thumbnail.png
excerpt: An iOS App for playing course, built with Xamarin in C#.
category: mobile
---

> An iOS App for playing course, built with Xamarin in C#.

This `iOS` app is developed by [Xamarin](https://xamarin.com/), a tool for developing cross-platform mobile apps. The core function of this app is to play course recordings of video, screenshot and whiteboard.

## 1. Introduction
### 1.1 Native Course Players
DePaul University has two types of course players in its Course OnLine (COL) system. One is the online course player, like the flash player(see the below screenshot) and Silverlight player, which are used through web browser.
![flash](/assets/courseplayerxamarin/flash.png)
Another type of players are mobile apps for iOS and Android devices.  
![coliphone](/assets/courseplayerxamarin/coliphone.jpeg)
### 1.2  Structure of Course Player
A course player consists of three components: video, screenshot and whiteboard.
* Video is captured by a camera during the lecturing time. It is in mp4 format.
* Screenshot is captured from computer monitor shared by teachers. It contains handouts and materials for the course. Screenshot are actually images.
* Whiteboard is captured from special pens and brushes. Any operation on the board, such as writing, drawing or brushing is recorded.

Check the posting [Introduction of Course Player]({% link _posts/2016-03-12-introduction-of-course-player.md %}) to learn the details.
### 1.3 Problems of Current Mobile Apps
Both the iOS and Android apps have the same functionalities.  
* Download course components to local storage
* Manage course list
* Play video
* Synchronize screenshot(PPT) when video is playing
* Synchronize whiteboard when video is playing

Developers have to use two different programming languages Swift and Java to build these apps, just because  they are on different mobile platforms. To avoid maintaining two pieces of the codes and reduce the development cost, we can use cross-platform mobile development tools. Xamarin is one of the options.

## 2. Xamarin Course Player
### 2.1 Xamarin
Xamarin is based on [Mono](http://www.mono-project.com/) and .NET framework, written in C#. With the help of Xamarin platform, we can use C# to build iOS and Android Apps. The benefit by using Xamarin is obvious, the development and maintenance cost are reduced, since the common libraries can be centralized and reused by other components. For developers, they can focus on UI of iOS and Android once the lower business logic component is finalized. You can find more details of Xamarin from my [Xamarin Research Document]({% link /public/docs/xamarin_research.pdf %}).
### 2.2 Xamarin Course Player
1) Video  
A slider control is used to simulate the video's playing progress.  
2) Screenshot  
Screenshot is drawn on a canvas control. It is synced with the playing progress when the slider bar is moving forward, and only the different sections will be refreshed.   
3) Whiteboard  
Whiteboard is also drawn on a canvas control. The difference with screenshot is, whiteboard is made up of lines instead of images.
### 2.3 UI
On the top of the player, there is the slider bar and a Play button. There are two canvases below the slider bar. The first one is for screenshot and the second one is for whiteboard.
![image](/assets/courseplayerxamarin/play.png){:width="400px"}  
Click the `Play` button, the slider bar begins to move and the current time will increment in seconds. Meanwhile, the screenshot and whiteboard canvas show the content simultaneously.
![image](/assets/courseplayerxamarin/play.png){:width="400px"}  
You can drag the slider bar to move forward or backward.
![image](/assets/courseplayerxamarin/drag.png){:width="400px"}  

## 3. Under the Hood
Check the blog post [Building Course Player with Xamarin]({% link _posts/2017-07-24-building-course-player-with-xamarin.md %}) to learn the details of Xamarin and how this app is built.

## 4. Source Files
* [Source files of Course Player(Xamarin) on Github](https://github.com/jojozhuang/Portfolio/tree/master/CoursePlayerXamarin)
