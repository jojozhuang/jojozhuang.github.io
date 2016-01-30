---
layout: software
title: "Kaixin Assistant"
date: 2016-01-14
tags: Windows Form, C#, Packet Capture, Http Get and Post, Automation
image: /assets/kaixin/thumbnail.png
shortdesc: A 'tag-on' desktop application for playing online flash games.
subcateogry: dotnet
categories:
- portfolio
---

This desktop application is not for work, but for fun. It is a 'tag-on' program used to automatically play flash games for [Kaixin001](http://www.kaixin001.com/ "Kaixin001")(A Chinese social website, like Facebook). When this website was popular, many people were addicted to some interactive games, like, garden planting, fishing, farming and cooking. Normally, you have to open your web browser, login to the website, open the specific game and do some operations to play it. Besides, you have to spend more efforts if you want to get high scores. With this tool, however, you can get rid of the boring, repetitive operations and play better than others. You just need to import your user account and configure tasks, then this tool will play games repeatedly for you.  

Technically, it simulates your manual operations on the web pages or flash, sends out HTTP GET/POST requests to the server, and gets result to do the next operations.  

![kaixin](/assets/kaixin/full.png "kaixin")  
Just three steps to make it work.  
1. In Account Explorer, add your kaixin001 account.  
2. In Task Explorer, create a new task, choose the functions and operations you need.
3. Right-click on the task and run.  
![task](/assets/kaixin/task.png "task")
During execution, you can check the output log to see whether it works properly.
![running](/assets/kaixin/running.png "running")  
You can get the source code from [Github](https://github.com/jojozhuang/Projects/tree/master/KaixinAssistant/Src "Source Code").
