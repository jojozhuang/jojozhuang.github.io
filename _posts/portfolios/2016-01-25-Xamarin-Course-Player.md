---
layout: software
key: portfolio
title: "Course Player"
date: 2016-01-25
tags: Xamarin, C#, Visual Studio, iOS
image: /assets/xamarinplayer/thumbnail.png
shortdesc: An iOS App for playing course, built with Xamarin in C#.
subcateogry: mobile
categories:
- portfolio
---

> This iOS app is developed by [Xamarin](https://xamarin.com/), which is a tool for developing cross-platform mobile apps. The core function of this app is to play course video with screenshot and whiteboard refreshed synchronously. It is a prototype for my investigation of cross-platform solution for online course system.

## 1. Background
DePaul University has an internal developed Course OnLine (COL) system. It captures the essential components of a classroom lecture--the audio, video, notes from a whiteboard, and the display from the instructor's PC or overhead projector. Then it synchronizes these elements into a single, flexible online interface. Our team is responsible for supporting students to watch these course recordings. We have already released several tools, like the flash player(see the below screenshot) and Silverlight player, which are used through web browser.
![flash](/assets/xamarinplayer/flash.png "flash")
And we also provide mobile apps for iOS and Android devices.  
![coliphone](/assets/xamarinplayer/col_iphone.jpeg "coliphone")

## 2. Problems with the Mobile Apps
The two version mobile apps have the same functionalities and mechanisms how they work. They both need to download the course components to local(phone memory), manage the course list, play video, synchronize screenshot and whiteboard. From technical perspective, their source codes are trying to implement the same logic, but in different programming language(Java and Swift). Currently, we have to develop and maintain them separately. Our technical director wonders whether there is any cross-platform solution for developing mobile applications, so that we can avoid maintaining two copies of the codes and reduce the development cost. After investigating, I found [Xamarin](https://xamarin.com/) is one of the options.

## 3. Xamarin
Xamarin is based on [Mono](http://www.mono-project.com/) and .NET framework, written in C#. With the help of Xamarin platform, we can use C# to develop iOS and Android Apps. The benefit by using it is obvious, the development and maintenance cost is reduced, since the common libraries can be put together and reused by others, and it saves developers' time, so they can focus on UI of iOS and Android. For the details of the Xamarin, you can check my [Xamarin Research Report]({% link /public/docs/xamarin_research.pdf %}).

## 4. Course Player
Each course player, no matter whether is online application or mobile app, it always contains three components: Video, Screenshot and Whiteboard.  
### 4.1 Video
In reality, the video is recorded through camera in the classroom when the instructor is teaching. Each video lasts 3 and half hours. In this app, a slider control is used to simulate the playing progress of the video.  
### 4.2 Screenshot
Screenshot is the PPT which is projected by the teacher in the classroom. In this app, each screenshot consists of 8x8 = 64 sections, which finally aggregates as a single image on a canvas control. It is refreshed synchronously with the time line(playing progress), and only the different sections will be drawn again.   
### 4.3 Whiteboard
Whiteboard is the drawings created by instructor during his/her teaching. The whiteboard is also drawn on a canvas. The difference with screenshot is, the whiteboard is not made up of images but lines. These lines are drawn according to the points flow captured from the instructor. Every action(pen down, pen move, pen up and erase) on the whiteboard is stored into a data file, and later it is rebuilt here, in this whiteboard canvas.
![iosapp](/assets/xamarinplayer/iosapp.png "iosapp")  

## 5.Installation and Coding
### 5.1 Setup Xamarin Development Environment
There are several approaches to setup the Xamarin development environment. I used two desktops, one is Windows with Visual Studio installed, another is Mac with iOS simulator installed. The first step is to pair them together. Then you start coding in VS on Windows, and send to Simulator on Mac to see the result.
![pair](/assets/xamarinplayer/pair.png "pair")  
### 5.2 Project Structure
There are two .Net projects in Visual Studio. 'COL.Core' contains the common function and 'CoursePlayeriPhone' is the UI part for iOS. If you need to develop Android Course Player, you can create a similar UI project for Android.
![vs](/assets/xamarinplayer/vs.png "vs")  
### 5.3 Architecture
Class diagram shows the design of this app based on Xamarin framework.
![framework](/assets/xamarinplayer/framework.png "framework")  

## 6. Source Code Files
* [Source code files of Course Player on Github](https://github.com/jojozhuang/Work/tree/master/Xamarin/XamarinPlayeriPhone)

## 7. Document
* [Xamarin Research Report]({% link /public/docs/xamarin_research.pdf %})
