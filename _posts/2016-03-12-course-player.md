---
layout: post
key: blog
title: "Course Player"
date: 2016-03-12
tags: [Course Player]
---

> Introduction of the course players used in DePaul University.

## 1. Course Online System
DePaul University has a powerful course online system named COL, which supports remote learning. Several recording devices, like camera, screen capturers are installed in each classroom. These devices capture all the audios, videos, screenshots and whiteboard contents, then, save them to COL as course files. Later, students can use various course players to watch the recordings. COL has two types of players, online course player and mobile app player. There are two different types of online player, one is flash player(see the below screenshot) and another is Silverlight player, both are used through web browser.
![flash](/assets/courseplayerxamarin/flash.png)
There are also two different types of mobile app players, one is for iOS devices(see the below screenshot) and another is for Android devices.  
![coliphone](/assets/courseplayerxamarin/coliphone.jpeg)

## 2. Course Player
For each course player, no matter whether it is an online application or a mobile app, each contains three components: Video, Screenshot and Whiteboard.  
### 2.1 Video
In reality, the video is recorded by camera with audios throughout the whole class. Each video lasts 3 and half hours.
### 2.2 Screenshot
During class, teachers shares course materials of PPT or PDF through computer screen. And they will be captured and saved to screenshots. Each screenshot consists of 8x8 = 64 sections, which finally aggregates to a single image. Screenshots are diplayed simultaneously when the course is playing, and only the different sections will be refreshed.
### 2.3 Whiteboard
Teachers also will write or draw something on classroom whiteboard. Each action(pen down, pen move, pen up and erase) on the whiteboard is captured and stored into a data file. The difference with screenshot is, whiteboard is made up of lines but not images.

## 3. Enhancement of Course Players
### 3.1 Mobile App Player
View [Course Player(Xamarin)]({% link _portfolio/course-player-xamarin.md %}) for more details.
### 3.2 Online Player
View [Course Player (Socket.IO)]({% link _portfolio/course-player-socketio.md %}) for more details.
