---
layout: software
title: "Kaixin Assistant"
date: 2016-01-24
tags: Kaixin001, Http Get and Post, Automation
image: /assets/kaixin/thumbnail.png
subcateogry: dotnet
categories:
- portfolio
---

Another Visual Studio look like desktop application. This is not for work, but for fun. It is a 'tag-on' program used to automatically play flash games in [Kaixin](http://www.kaixin001.com/ "Kaixin")(Similar website like facebook). When this social network kind of website was popular, many people were addicted to these interactive games, like, garden planting, fishing, farming and cooking. Generally, you have to do some operations frequently to get better scores than others. With this tool, you just need to configure your user account and create tasks, it will run as configured repeatly. So you can get rid of the boring, repetitive operations, but still play better than others.  

Technically, it simulate your manual action on the web pages or flash, sends out http get or post requests to the server, and get result to do next operations.  

![kaixin](/assets/kaixin/full.png "kaixin")  
Just three steps to make it work,  
1. In Account Explorer, add your kaixin account.  
2. In Task Explorer, create a new task, and choose the functions you need(games you want to play)  .
3. Right-click on the task and run.
![task](/assets/kaixin/task.png "task")  
During execution, you can check the output log to see whether it works properly.
![running](/assets/kaixin/running.png "running")  
You can get the source code from [Github](https://github.com/jojozhuang/Projects/tree/master/KaixinAssistant/Src "Source Code").
