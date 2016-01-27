---
layout: software
title: "My Web Server"
date: 2016-01-29
tags: Socket, Java, Http GET
image: /assets/mywebserver/thumbnail.png
shortdesc: A web server built with sockets in java, capable to handle general HTTP requests.
subcateogry: dotnet
categories:
- portfolio
---

This is one of my homework projects for course CSC435-Distributed System 1. We are asked to write a web server with sockets in java. The web server shall be able to respond properly to the http requests from client. The challenge for this task is you have to take care of the whole process by your own. You need to accept the input message, parse it and get the useful information, take actions accordingly, write texts of http response and send back to client. You must be careful to handle the exceptions and deal with unexpected inputs.  

How to launch the web server?  
1. Open a cmd window, navigate to the directory which contains all of the files.  
![root](/assets/mywebserver/root.png "root")  
2. Run 'javac \*.java' to compile source files.  
3. Run 'java MyWebServer' to launch it.  
![startserver](/assets/mywebserver/startserver.png "startserver")  
4. Launch your web browser, access the url address of 'http://localhost:2540/'. All of the files in the root directory will be listed out.      
![webserver](/assets/mywebserver/webserver.png "webserver")  
You can try to click the links for different file, and you should get proper result.  You can navigate to the folder recursively, as deep as you want.  
![recursive](/assets/mywebserver/recursive.png "recursive")  
Apart from the static files and directories, this web server also supports to handle dynamical request. For example, handle number add operation.  
![cgi](/assets/mywebserver/cgi.png "cgi")  
![cgiresult](/assets/mywebserver/cgiresult.png "cgiresult")  
You can get the source code from [Github](https://github.com/jojozhuang/Course/tree/master/CSC435/MyWebServer "Source Code").
