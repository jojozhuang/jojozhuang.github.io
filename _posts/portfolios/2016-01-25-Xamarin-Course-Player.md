---
layout: software
key: portfolio
title: "Course Player"
date: 2016-01-25
tags: Xamarin, C#, Visual Studio, iOS
image: /assets/xamarinplayer/thumbnail.png
shortdesc: An iOS app built with Xamarin in C#.
subcateogry: mobile
categories:
- portfolio
---

This iOS app is developed by [Xamarin](https://xamarin.com/), which is a tool for developing cross-platform mobile apps. This app is used to play course video, along with screenshot and whiteboards. It is a prototype for my investigation of cross-platform solution for online course system. There are three parts of the player: Video, Screenshot and Whiteboard. I use a slider control to simulate the playing progress of the video. The screenshot consists of 8x8 = 64 sections, which finally appear as a single image. It is refreshed along with the time line(playing progress), and only the different pieces will be drawn. The whiteboard is also drawn on a canvas. The difference with screenshot is, they are not images but lines, which is drawn according to the points data flow. Every action(pen down, pen move, pen up and erase) of the lecture's instructor on the whiteboard will be recorded into data file, and later be rebuilt here, in this canvas.
![iosapp](/assets/xamarinplayer/iosapp.png "iosapp")  

To enable students watch course recordings, our team has released several applications, like flash player(see the below screenshot) and Silverlight player for the desktop, mobile apps for iOS and Android devices.  
![flash](/assets/xamarinplayer/flash.png "flash")

From the technical respective, the two mobile apps have similar functions and source codes, but different programming language and platform. Currently, we have to develop and maintain them separately. Our team leader wondered whether there is any cross-platform solution for developing mobile applications. After research, I found Xamarin is one of the options. It is based on [Mono](http://www.mono-project.com/) and .NET framework. With the help of Xamarin platform, we can use C# to develop mobile apps and deploy them to iOS and Android platforms. The benefit it brings to us is obvious, the development and maintenance cost is reduced, since we can put some common functions in the shared libraries, and they can be reused for iOS and Android projects.

There are several approaches to setup the Xamarin development environment. I used Visual Studio + Mac as the choice and the first step is to pair them together.  
![pair](/assets/xamarinplayer/pair.png "pair")  
There are two .Net projects in Visual Studio. 'COL.Core' contains the common function and 'CoursePlayeriPhone' is the UI part for iOS. If you want, you can create a similar UI project for Android.
![vs](/assets/xamarinplayer/vs.png "vs")  
Class diagram shows the design of this app based on Xamarin framework.
![framework](/assets/xamarinplayer/framework.png "framework")  

You can get the source code from [Github](https://github.com/jojozhuang/Work/tree/master/Xamarin/XamarinPlayeriPhone "Source Code") and more details about this investigation from the [research document](https://github.com/jojozhuang/Work/blob/master/Xamarin/Doc/XamarinResearch.docx).  
