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

This `iOS` app is developed by [Xamarin](https://xamarin.com/). It's a tool for developing cross-platform mobile apps. The core function of this app is to play course video with screenshot and whiteboard synchronized. It is a prototype for my investigation of cross-platform solution for mobile app development.

## 1. Native Course Player
### 1.1 Current Mobile Apps
DePaul University has two different types of course players in its Course OnLine (COL) system. One is the online course player, like the flash player(see the below screenshot) and Silverlight player, which are used through web browser.
![flash](/assets/courseplayerxamarin/flash.png)
It also provides mobile apps for iOS and Android devices.  
![coliphone](/assets/courseplayerxamarin/coliphone.jpeg)
### 1.2 Problems with the Mobile Apps
Both the iOS and Android apps have the same functionalities.  
* Download course components to local storage
* Manage course list
* Play video
* Synchronize screenshot(PPT) when video is playing
* Synchronize whiteboard when video is playing

From technical perspective, the source codes of two versions are implementing the same logic, but in different programming language(Swift and Java). Currently, developers have to develop and maintain them separately. To avoid maintaining two copies of the codes and reduce the development cost, use [Xamarin](https://xamarin.com/) to build cross-platform mobile apps.

## 2. Xamarin Course Player
### 2.1 Xamarin
Xamarin is based on [Mono](http://www.mono-project.com/) and .NET framework, written in C#. With the help of Xamarin platform, we can use C# to develop iOS and Android Apps. The benefit by using Xamarin is obvious, the development and maintenance cost is reduced, since the common libraries can be centralized and reused by other components. For developers, they can focus on UI of iOS and Android once the lower business logic component is finalized. You can find more details of Xamarin from my [Xamarin Research Document]({% link /public/docs/xamarin_research.pdf %}).
### 2.2 Xamarin Course Player
1) Video  
A slider control is used to simulate the video's playing progress.  
2) Screenshot  
The image is drawn on a canvas control. The screenshot is refreshed simultaneously when the time line(playing progress) is moving forward, and only the different sections will be refreshed.   
3) Whiteboard  
The whiteboard is also drawn on a canvas control. The difference with screenshot is, whiteboard is made up of lines but not images.
### 2.3 Player in Simulator
![iosapp](/assets/courseplayerxamarin/iosapp.png){:width="400px"}  
Drag the slider bar.
![iosapp](/assets/courseplayerxamarin/iosapp2.png){:width="400px"}

## 3. Under the Hood
Check posting [Course Player]({% link _posts/2016-03-12-course-player.md %}) to learn the details of course players. And check posting [Building Course Player with Xamarin]({% link _posts/2017-07-24-building-course-player-with-xamarin.md %}) to learn the details of Xamarin and how this app is built.

## 4. Source Files
* [Source files of Course Player(Xamarin) on Github](https://github.com/jojozhuang/Portfolio/tree/master/CoursePlayerXamarin)

## 5. Document
* [Xamarin Research Document]({% link /public/docs/xamarin_research.pdf %})
