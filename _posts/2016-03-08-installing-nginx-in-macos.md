---
layout: post
key: blog
title: "Installing Nginx in MacOS"
date: 2016-03-08
tags: [Nginx]
---

> Tutorial for how to install and use Nginx.

## 1. Nginx
[Nginx](https://www.nginx.com/) is a free, open-source and high-performance HTTP server.

## 2. Installing Nginx on MacOS
Use brew to install nginx.
```sh
$ brew install nginx
```
Start nginx after installation.
```sh
$ sudo nginx
```
Access 'http://localhost:8080' in web browser.
![image](/public/posts/2016-03-08/startserver.png){:width="700px"}  

Use the following command to stop nginx.
```sh
$ sudo nginx -s stop
```
## 3. Configuration
The default place of `nginx.conf` on Mac after installing with brew is:
```sh
/usr/local/etc/nginx/nginx.conf
```
### 3.1 Changing the Default Port(8080)
Edit the configuration file and change the port to `9096`.
```raw
server {
    listen       9096;
    server_name  localhost;

    #charset koi8-r;

    #access_log  logs/host.access.log  main;

    location / {
        root   html;
        index  index.html index.htm;
    }
```
Stop and restart nginx. Access 'http://localhost:9096' in web browser.
![image](/public/posts/2016-03-08/changeport.png){:width="700px"}  
### 3.2 Changing the Path of Default Web Location
Change the 'root' to '/nginx/www'.
```raw
server {
    listen       9096;
    server_name  localhost;

    #charset koi8-r;

    #access_log  logs/host.access.log  main;

    location / {
        root   /nginx/www;
        index  index.html index.htm;
    }
```
In you local Mac machine, create a new folder /nginx/www. And create a static html file named `index.html` with following content.
```html
<!DOCTYPE html>
<html>
<head>
<title>Page Title</title>
</head>
<body>

<h1>Testing custom folder for nginx</h1>
<p>This is a test page. If you see this page, the nginx web server is successfully installed  and working.</p>
<p>You are using custom folder now!</p>

</body>
</html>
```
Stop and restart nginx, then refresh the web browser. Nginx is now serving pages from the custom folder.
![image](/public/posts/2016-03-08/location.png){:width="700px"}  

## 4. References
* [Nginx Official Website](https://www.nginx.com/)
* [Installing Nginx in Mac OS X Maverick With Homebrew](https://medium.com/@ThomasTan/installing-nginx-in-mac-os-x-maverick-with-homebrew-d8867b7e8a5)
