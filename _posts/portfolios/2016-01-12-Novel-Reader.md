---
layout: software
title: "Novel Reader"
date: 2016-01-12
tags: C#, Windows Form, Online Novel, HTTP GET/POST, Outlook Style UI
image: /assets/novelreader/thumbnail.png
shortdesc: A MS Outlook UI desktop application for user to read online novels.
subcateogry: dotnet
categories:
- portfolio
---

This Outlook style desktop application is used to read online novels. One friend of mine likes to read novels through online websites. And he didn't want be caught by his boss during the office time. So, he asked me to develop a tool to display online novels, and the tool shall not be noticed easily by others. I searched through out the intenet and found this Outlook mailbox component and created this tool for him. He was so happy and satisfied with the tool. It's a long time ago, the website for hosting the novels are not existed anymore. This tool can't work anymore, but I still have a sceenshot when it was working.  

Technically, it sends out HTTP GET and POST requests to the website, then gets result and display it to the screen.  

![Novel Reader](/assets/novelreader/index.png "Novel Reader")  

To make it work again, you just need to find a novel website, replace the urls for category list and content, recompile the source code.  

You can get the source code from [Github](https://github.com/jojozhuang/Projects/tree/master/NovelReader/Src "Source Code").
