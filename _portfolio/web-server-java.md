---
layout: portfolio
key: portfolio
title: "Web Server(Java)"
index: 310
category: dotnet
image: webserverjava/thumbnail.png
tags: [Socket, Java, HTTP]
---

> A web server built with sockets in Java, capable of handling general HTTP requests.

This web server is able to handle HTTP requests from client(web browser) simultaneously. Java sockets are used to accept string-format requests, process them and return string-format responses. So, this web server processes standard HTTP requests and responses at socket level.

## 1. Web Server
### 1.1 Homepage
Open web browser, access 'http://localhost:2540/'. All of the files in the root directory are displayed.
![image](/public/images/portfolio/webserverjava/homepage.png)
### 1.2 Directory Navigation
Click on the folder 'src' and navigate to the deeper layers. The path in browser's address bar changes accordingly, files in each directory are properly displayed.
![image](/public/images/portfolio/webserverjava/navigation.png)
### 1.3 Viewing File Content
Click on file 'WebServer.java', its content shows up.
![image](/public/images/portfolio/webserverjava/content.png)
Go back to the root folder, view content of txt file.
![image](/public/images/portfolio/webserverjava/dogtxt.png){:width="800px"}
### 1.4 Viewing HTML Page
![image](/public/images/portfolio/webserverjava/cathtml.png){:width="800px"}
### 1.5 CGI
Apart from handling the requests to static files and directories, this web server also supports to handle dynamical requests. For example, it has a fake CGI page which can calculate the sum of two given numbers. In the root directory, click 'addnums.html'. Specify the name and two numbers, click Submit button.
![image](/public/images/portfolio/webserverjava/cgi.png){:width="800px"}
If numbers are correctly set, we can get the proper result.
![image](/public/images/portfolio/webserverjava/addnumbers.png){:width="800px"}
### 1.6 Error Handling
If invalid input are passed to the server, it returns 500 error with specific error message.
![image](/public/images/portfolio/webserverjava/error.png){:width="800px"}
### 1.7 Logs
Check the logs in WebServerLogs.txt. These logs are also available in the console of Eclipse.
![image](/public/images/portfolio/webserverjava/logs.png){:width="800px"}  

## 2. Under the Hood
Check posting [Building Web Server with Java Socket]({% link _popular/javapractice/building-web-server-with-java-socket.md %}) to learn the details how this web server is built.

## 3. Source Files
* [Source files of Web Server(Java Socket) on Github](https://github.com/jojozhuang/web-server-java)
