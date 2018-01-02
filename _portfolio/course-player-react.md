---
layout: portfolio
key: portfolio
title: "Course Player (React)"
index: 61
tags: [React, Socket.IO]
image: /assets/courseplayerreact/thumbnail.png
excerpt: A realtime online course player, developed with React and Socket.IO.
category: java
---

> Online course player built with React and Socket.IO.

## 1. ReactJS
[ReactJS](https://reactjs.org/) is a front-end library developed by Facebook. It is used for handling the view layer for web and mobile apps. ReactJS allows us to create reusable UI components. It uses the virtual DOM to track the state of the actual DOM, only re-rendering discrete sections of the DOM as changes to application state dictate.

## 2. Course Player
A course player consists of three components: video, screenshot and whiteboard.

* Video is captured by a camera during the lecturing time, and saved as mp4.
* Screenshot is captured from computer monitor through which teachers share their handouts/materials to the students. Screenshot are images which are compressed and saved to a single file.
* Whiteboard is captured from special pens and boards. Any operation on the board, such as writing, drawing or brushing is recorded and stored to a single file.

## 3. UI
Home page.
![MIME Type](/public/pics/2017-08-25/homepage.png)
Click the `Play` button, course will be played. Both screenshot and Whiteboard will be synced with current time.
![MIME Type](/public/pics/2017-08-25/playing.png)
You can also drag the slider bar to forward or backward.
![MIME Type](/public/pics/2017-08-25/playing2.png)

## 4. Under the Hood
Check posting [Building Course Player with React and Socket.IO]({% link _posts/2017-08-25-building-course-player-with-react-and-socketio.md %}) to learn the details of React and Socket.IO.

## 5. Source Files
* [Source files of Course Player(React) on Github](https://github.com/jojozhuang/Tutorials/tree/master/SocketIOPlayer)
