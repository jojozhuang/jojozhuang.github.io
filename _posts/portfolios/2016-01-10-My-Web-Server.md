---
layout: software
title: "My Web Server"
date: 2016-01-10
tags: Socket Programming, Java, HTTP GET/POST
image: /assets/mywebserver/thumbnail.png
shortdesc: A web server built with Java sockets, capable of handling general HTTP requests.
subcateogry: dotnet
categories:
- portfolio
---

This is one of my homework projects for course 'CSC435-Distributed System'. We are asked to write a web server with Java socket. The web server shall be able to respond properly to HTTP requests from client and it should handle requests simultaneously.The challenge for this task is you have to take care of the whole process by your own. You need to retrieve the input message, parse it and get the useful information, identify the correct operation, write correct HTTP response and send back to the client. You must be careful to handle the exceptions and deal with unexpected inputs.  

How to launch the web server?  
1. Open a cmd window, navigate to the root directory of this program.  
2. Run 'javac \*.java' to compile source files.  
3. Run 'java MyWebServer' to launch it.  
![startserver](/assets/mywebserver/startserver.png "startserver")  
![root](/assets/mywebserver/root.png "root")  
4. Launch the web browser, access the server URL 'http://localhost:2540/'. All of the files in the root directory will be listed out.  
![webserver](/assets/mywebserver/webserver.png "webserver")
You can try to click the links for different file, and you should get proper result. You can also navigate to the folder recursively.  
![recursive](/assets/mywebserver/recursive.png "recursive")
Apart from handling the requests to static files and directories, this web server also supports to handle dynamical requests. For example, it can calculate sum of two numbers.  
![cgi](/assets/mywebserver/cgi.png "cgi")  
![cgiresult](/assets/mywebserver/cgiresult.png "cgiresult")  
You can get the source code from [Github](https://github.com/jojozhuang/Course/tree/master/CSC435/MyWebServer "Source Code").
