---
layout: portfolio
key: portfolio
title: "Course Player"
index: 30
tags:
  - Xamarin
  - C#
  - Cross-platform
image: /assets/xamarinplayer/thumbnail.png
excerpt: An iOS App for playing course, built with Xamarin in C#.
category: mobile
---

> This `iOS` app is developed by [Xamarin](https://xamarin.com/), which is a tool for developing cross-platform mobile apps. The core function of this app is to play course video with screenshot and whiteboard refreshed synchronously. It is a prototype for my investigation of cross-platform solution for online course system.

## 1. Background
DePaul University has an internal developed Course OnLine (COL) system. It captures the essential components of an in-class lecture, which contains audios, videos, whiteboard notes and PPTs. Afterwards, all of them are synchronized into a single and flexible online interface. Our team is responsible for supporting students to watch these recordings. We have already released several tools, like the flash player(see the below screenshot) and Silverlight player, which are used through web browser.
![flash](/assets/xamarinplayer/flash.png "flash")
And we also provide mobile apps for iOS and Android devices.  
![coliphone](/assets/xamarinplayer/col_iphone.jpeg "coliphone")

## 2. Problems with the Mobile Apps
Both the iOS and Android apps have the same functionalities.  
* Download course components to local storage
* Manage course list
* Play video
* Synchronize screenshot(PPT) when video is playing
* Synchronize whiteboard when video is playing

From technical perspective, the source codes of two versions are implementing the same logic, but in different programming language(Swift and Java). Currently, we have to develop and maintain them separately. Our technical director wonders whether there is any cross-platform solution for developing mobile applications, so that we can avoid maintaining two copies of the codes and reduce the development cost. After investigating, I found [Xamarin](https://xamarin.com/) is one of the options.

## 3. Xamarin
Xamarin is based on [Mono](http://www.mono-project.com/) and .NET framework, written in C#. With the help of Xamarin platform, we can use C# to develop iOS and Android Apps. The benefit by using Xamarin is obvious, the development and maintenance cost is reduced, since the common libraries can be centralized and reused by other components. For developers, they can focus on UI of iOS and Android once the lower business logic component is finalized. You can find more details of Xamarin from my [Xamarin Research Document]({% link /public/docs/xamarin_research.pdf %}).

## 4. Course Player
For each course player, no matter whether is an online application or a mobile app, it always contains three components: Video, Screenshot and Whiteboard.  
### 4.1 Video
In reality, the video is recorded by camera throughout the whole class. Each video lasts 3 and half hours. In this app, a slider control is used to simulate the video's playing progress.
### 4.2 Screenshot
The screenshots are the recording of PPTs. Each screenshot consists of 8x8 = 64 sections, which finally aggregates to a single image. In this app, the image is drawn on a canvas control. The screenshot is refreshed simultaneously when the time line(playing progress) is moving forward, and only the different sections will be refreshed.   
### 4.3 Whiteboard
Whiteboard is recording of the drawings on classroom whiteboard. Each action(pen down, pen move, pen up and erase) on the whiteboard is captured and stored into a data file. In this app, the whiteboard is also drawn on a canvas control. The difference with screenshot is, whiteboard is made up of lines but not images.
### 4.4 Player in Simulator
![iosapp](/assets/xamarinplayer/iosapp.png "iosapp")  

## 5.Installation and Coding
### 5.1 Setup Xamarin Development Environment
There are several approaches to setup the Xamarin development environment. I used two desktops, one is Windows with Visual Studio installed, another is Mac with iOS simulator installed. The first step is to pair them together, then you can start coding in VS on Windows, and send the app to simulator on Mac to see the result.
![pair](/assets/xamarinplayer/pair.png "pair")  
### 5.2 Project Structure
There are two .Net projects in Visual Studio. 'COL.Core' contains the common function and 'CoursePlayeriPhone' is the UI part for iOS. If you need to develop Android Course Player, you can create a similar UI project for Android.
![vs](/assets/xamarinplayer/vs.png "vs")  
### 5.3 Architecture
Class diagram shows the design of this app based on Xamarin framework.
![framework](/assets/xamarinplayer/framework.png "framework")  

## 6. Source Files
* [Source files of Course Player(Xamarin) on Github](https://github.com/jojozhuang/Portfolio/tree/master/CoursePlayerXamarin)

## 7. Document
* [Xamarin Research Document]({% link /public/docs/xamarin_research.pdf %})
