---
layout: software
title: "Xamarin Course Player"
date: 2016-01-25
tags: C#, Visual Studio, iOS, Xamarin
image: /assets/xamarinplayer/thumbnail.png
shortdesc: An iOS app built with Xamarin in C#.
subcateogry: mobile
categories:
- portfolio
---

This is iOS app is developed by [Xamarin](https://xamarin.com/), which is a tool for developing cross-platform mobile apps. It is a prototype for my investigation of cross-platform solution for online course system. You can find more details about this investigation from the [research document](https://github.com/jojozhuang/Work/blob/master/Xamarin/Doc/XamarinResearch.docx).  

To enable students watch course recordings, our school provides several applications for them, like flash player and silverlight player for the desktop, iOS and Android apps for mobile devices. For the mobile apps, they have similar function and source code, but in different mobile platform. We have to develop and maintain them separately. The development head asks me to do some research to see whether there is any solution for cross-platform applications. Xamarin is one of the solution. It is based on mono and .NET framework. With Xamarin, we can develop mobile apps in C# and deploy the apps to iOS and Android platforms. The benefit is you can put some common codes to a separated project, and it can be reused for iOS and Android projects.

I used Visual Studio + Mac as the development environment, so they must be paired together.  
![pair](/assets/xamarinplayer/pair.png "pair")  
Codes in Visual Studio  
![vs](/assets/xamarinplayer/vs.png "vs")  
Diagram shows how Xamarin works
![framework](/assets/xamarinplayer/framework.png "framework")  
The final running iOS app  
![iosapp](/assets/xamarinplayer/iosapp.png "iosapp")  
You can get the source code from [Github](https://github.com/jojozhuang/Work/tree/master/Xamarin/XamarinPlayeriPhone "Source Code").
