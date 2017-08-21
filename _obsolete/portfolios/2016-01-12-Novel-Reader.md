---
layout: software
key: portfolio
title: "Novel Reader"
date: 2016-01-12
tags: C#, HTTP, Web Scraping, Outlook Style UI
image: /assets/novelreader/thumbnail.png
shortdesc: A MS Outlook UI desktop application for user to read online novels.
subcateogry: dotnet
categories:
- portfolio
---

> This Outlook-style desktop application is used to read online novels.

## 1. Background
Long time ago, one of my friends enjoyed reading novels through some online websites. And he didn't want to be caught by his boss during the office time. So, he asked me to develop a local program to display online novels, and the tool shall not be noticed easily by others. I searched through out the internet and found an Outlook mailbox component, then created this tool for him. He was so happy and satisfied with the UI.

Technically, it sends out HTTP GET and POST requests to the website, then gets result and displays it to the screen.  

## 2. Main Screen
![Novel Reader](/assets/novelreader/index.png "Novel Reader")  

To make it work again, you need to find a novel website, replace with new URLs for category list and content, then recompile the source code.  

## 3. Source Code Files
* [Source code files of Novel Reader on Github](https://github.com/jojozhuang/Projects/tree/master/NovelReader/Src)
