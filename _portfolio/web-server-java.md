---
layout: portfolio
key: portfolio
title: "Web Server"
index: 5
tags: [Socket, Java, HTTP, UDP]
image: /assets/webserverjava/thumbnail.png
excerpt: A web server built with sockets in Java, capable of handling general HTTP requests.
category: java222
---

> This is one of my homework projects for course 'CSC435-Distributed System'. We are asked to write a web server with Java socket. The web server shall be able to respond properly to HTTP requests from client and it should handle requests simultaneously.The challenge for this task is that I have to take care of the whole process by my own, including retrieving the input message, parsing it, identifying the request, applying the correct operation, outputting correct HTTP response and sending back feedback to the client. Besides, I must be careful to handle the exceptions and deal with unexpected inputs.  

## 1. Start the Web Server  
1) Open a command window, navigate to the root directory of this program.  
2) Compile all java source files.  
```
javac \*.java
```

3) Start java application.  
```
java MyWebServer
```

![startserver](/assets/webserverjava/startserver.png "startserver")
## 2. Files in Root Directory.  
![root](/assets/webserverjava/root.png "root")
## 3. Access the Home of Web Server
Open web browser, access the server URL [http://localhost:2540/](http://localhost:2540/). All of the files in the root directory will be listed out.  
![webserver](/assets/webserverjava/webserver.png "webserver")
You can try to click the links of different files, and you should get proper result. You can also navigate between directories recursively.  
![recursive](/assets/webserverjava/recursive.png "recursive")
## 4. Handle Post Request
Apart from handling the requests to static files and directories, this web server also supports to handle dynamical requests. For example, it has a fake CGI page which can calculate the sum of two given numbers.  
![cgi](/assets/webserverjava/cgi.png "cgi")  
![cgiresult](/assets/webserverjava/cgiresult.png "cgiresult")  

## 5. Source Files
* [Source files of Web Server on Github](https://github.com/jojozhuang/Portfolio/tree/master/WebServer)
