---
layout: post
key: blog
title: "Error: Address/Port Already in Use"
date: 2016-01-17
tags: Jekyll, Port
categories: blog
---

> Unable to run Jekyll at port 4000.

I'm trying to run my [GitHub website](http://jojozhuang.github.io/) locally with Jekyll. However, I keep getting the following error after running 'jekyll serve' command.
```sh
jekyll 3.5.2 | Error:  Address already in use - bind(2) for 127.0.0.1:4000
```
Port 4000 has already been occupied. To solve, kill the process that is using this port, which is 4000.
Find the process which is using port 4000.
```sh
lsof -i :4000
```

Kill the process with its process id.
```sh
kill -9 <PID>
```
![MIME Type](/public/pics/2016-01-17/port.png)  

Retry 'jekyll serve', the error 'Port Already in Use' is gone.
