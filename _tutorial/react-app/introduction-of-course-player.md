---
layout: tutorial
key: tutorial
title: "Introduction of Course Player"
index: 8471
subcategory: react-app
date: 2016-03-12
tags: [Course Player]
---

> Introduction of the course players used in DePaul University.

## 1. Course Online System
DePaul University has a powerful course online system called COL, which supports remote learning. Several recording devices, like camera, screen capturers are installed in each classroom. These devices capture all the audios, videos, screenshots and whiteboard contents, then, save them to COL system as course files. Later, students can use various course players to watch the recordings. COL team released two types of players, online course player and mobile app player.
* Online Player
  - Flash Player
  - Silverlight Player
* Mobile Apps
  - iOS Player
  - Android Player

`Online players` are developed by Adobe Flash and Microsoft Silverlight. They are installed as plug-ins on web browsers. Below is the screenshot that flash player is working on Microsoft IE. Notice, the video is sent in a continuous stream of data from server to client web browser.
![image](/assets/images/frontend/8471/flash.png)
`Mobile players` are native apps for iOS and Android platforms. Below is the screenshot that iOS player is working on iPhone 5s. Notice that all the data, including video, screenshot, whiteboard are downloaded to mobile devices before playing.
![image](/assets/images/frontend/8471/coliphone.jpeg)

## 2. Course Player
For each course player, no matter whether it is an online application or a mobile app, each contains three components: Video, Screenshot and Whiteboard.  
### 2.1 Video
Video is recorded by camera with audios throughout the whole class, and saved to file in `mp4` format. Each video lasts 3 and half hours(12,600 seconds).
### 2.2 Screenshot
During class, teachers shares course handouts/materials of PPT or PDF through computer monitor. And they will be captured and saved as screenshots for the course. Screenshots are actually images and each image has base64 format. Each screenshot consists of 8x8 = 64 small images, which finally aggregates to a single image.
![image](/assets/images/frontend/8471/screenshot.png){:width="550px"}
* [Diagrams on Google Slides](https://docs.google.com/presentation/d/1dy1h3lmJh-vskUyPUWAeqCxNT0-YSHfioo4VwwcTdpM/edit?usp=sharing)

Screenshots are displayed simultaneously when the course is playing, and only the different sections will be refreshed.
### 2.3 Whiteboard
Teachers also write or draw something on the whiteboard. Each action(pen down, pen move, pen up and erase) on the whiteboard is captured by special pens and brushes and persisted into files.

## 3. Course Structure
![image](/assets/images/frontend/8471/datafiles.png){:width="550px"}  
The following points need to be noted about these files.
* Each course has a unique id. For the above course, the course id is `204304`.
* Video is simple, just a mp4 file.
* For screenshot and whiteboard, each has the index file `package.pak` and data file `1.pak`. The index file is compressed in `deflate` compression mechanism. It needs to be decompressed before reading data from it. `unzippedindex.pak` is the decompressed file for `package.pak`. Notice, this file doesn't exist initially. It is created for the first time when this course is played.
* Whenever the player reads the data from data file `1.pak`, we first need to use the index get offset and length. Then, use them to read small parts of the data from data file instead of reading the whole file.
* For Screenshot, read the decompressed index file `ScreenShot/High/unzippedindex.pak` to get the index list. Then, get offset and length of index to read image data by time(in second) from `ScreenShot/High/1.pak`.
* Whiteboard has the similar data structure with screenshot. The difference is that whiteboard is made up of lines instead of images.
* Whiteboard has two parts, one is the static lines `VectorImage`, another is dynamic drawing events `VectorSequence`. Technically, it has the same structure as Screenshot. Both line and event contains index file and data file.
* To get data for Whiteboard's lines, first, read the decompressed index file `WB/1/VectorImage/unzippedindex.pak` to get the index list. Then, get offset and length of index to read line data by time(in second) from `WB/1/VectorImage/1.pak`. The same operations to get Whiteboard's events.

## 4. Enhancement of Course Players
### 4.1 Online Player
The problem with the existing online players is, different technologies(flash and silverlight) are used to build them. The cost for development and maintenance is high. Besides, for end users it is not good experience to install plugins to their web browser. Using canvas from html5 is a good option. It is a cross-platform solution.
### 4.2 Mobile Player
Similar problem for mobile players. The COL team has to maintain two piece of code for iOS and Android, even though they have the same function.
### 4.3 Prototypes for New Course Players
I created several course player with new technologies. See below.
* [Course Player (Socket.IO)]({% link _project/course-player-socketio.md %}): Built with html5 canvas and socket.io based on Node.js.
* [Course Player (React)]({% link _project/course-player-react.md %}): Enhancement of the first player, built with React, html5 canvas and socket.io based on Node.js.
* [Course Player (SignalR)]({% link _project/course-player-signalr.md %}): Another online player, built with SingalR.
* [Course Player(Xamarin)]({% link _project/course-player-xamarin.md %}): An iOS player built with Xamarin.
