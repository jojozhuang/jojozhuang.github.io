---
layout: project
key: project
title: "Course Player(React)"
index: 250
category: web
image: courseplayerreact/thumbnail.png
tags: [React, Socket.IO]
---

> A realtime online course player, built with React and Socket.IO.

## 1. Course Player
A course player consists of three components: video, screenshot and whiteboard. Check the posting [Introduction of Course Player]({% link _tutorial/react-app/introduction-of-course-player.md %}) to learn the details.
* Video is captured by a camera during the lecturing time. It is in mp4 format.
* Screenshot is captured from computer monitor shared by teachers. It contains handouts and materials for the course. Screenshot are actually images.
* Whiteboard is captured from special pens and brushes. Any operation on the board, such as writing, drawing or brushing is recorded.

## 2. Demo
One available demo:
* `Live Demo on Heroku(CI):` <a href="https://course-player-react.herokuapp.com/" target="\_blank">https://course-player-react.herokuapp.com/</a>

*Note: The demo website may be slow when you access them for the first time. Be patient!*

## 3. UI
For a real course player, video is played separately. The content of the screenshot and whiteboard is synchronized with the playing process of the video. In this app, a slider bar is used to simulate the video player.

On the top of the player, there is the slider bar and a Play button. There are two canvases below the slider bar. The left one is for screenshot and the right one is for whiteboard.
![image](/assets/images/project/courseplayerreact/homepage.png)
Click the `Play` button, the slider bar begins to move and the current time will increment in seconds. Meanwhile, the screenshot and whiteboard canvas show the content simultaneously.
![image](/assets/images/project/courseplayerreact/play.png)
You can drag the slider bar to move forward or backward.
![image](/assets/images/project/courseplayerreact/drag.png)

## 4. Under the Hood
Read tutorial [Building Course Player with React and Socket.IO]({% link _tutorial/react-app/building-course-player-with-react-and-socketio.md %}) to learn the details of React, Socket.IO and how this course player is built.

## 5. Source Files
* [Source files of Course Player(React) on Github](https://github.com/jojozhuang/course-player-react)
