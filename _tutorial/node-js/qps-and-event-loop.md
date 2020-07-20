---
layout: tutorial
key: tutorial
title: "QPS and Event Loop - draft"
index: 8705
subcategory: node-js
date: 2018-08-02
tags: [Node.js]
draft: true
---

> QPS in multi-threading.

## 1. Queries Per Second(QPS)
Queries-per-second (QPS) is a measure of how much traffic a particular query server is handling at a given time.
### 1.1 Single Thread
![image](/assets/images/backend/8705/qps-single-thread.png)
### 1.2 Two Threads
![image](/assets/images/backend/8705/qps-two-threads.png)
### 1.3 Two Threads with Context Switch
![image](/assets/images/backend/8705/qps-conext-switch.png)

## 2. Event Loop
### 2.1 Event Loop in Node.js
### 2.2 How Event Loop Works

## 4. Source Files
* [QPS Diagrams(draw.io) in Google Drive](https://drive.google.com/file/d/1f-zd-1tyx30HZs11Y39sPgwyvlYlF9_T/view?usp=sharing)

## 5. References
* [从”秒杀问题“入手，如何设计Node.js?](https://www.youtube.com/watch?v=YVQNA1y6NEg&t=1461s)
* [Node.js - Event Loop](https://www.tutorialspoint.com/nodejs/nodejs_event_loop)
