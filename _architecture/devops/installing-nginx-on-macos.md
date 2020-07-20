---
layout: tutorial
key: architecture
title: "Installing Nginx on macOS"
index: 3611
subcategory: devops
date: 2018-05-26
tags: [Nginx, macOS]
---

> Tutorial for how to install and use Nginx.

## 1. Nginx
[Nginx](https://www.nginx.com/) is a free, open-source and high-performance HTTP server.

## 2. Installing Nginx on macOS
Use brew to install nginx.
```raw
$ brew install nginx
```
Start nginx after installation.
```raw
$ sudo nginx
```
Access 'http://localhost:8080' in web browser.
![image](/assets/images/architecture/3611/startserver.png){:width="700px"}  

Use the following command to stop nginx.
```raw
$ sudo nginx -s stop
```
## 3. Configuration
The default place of `nginx.conf` on Mac after installing with brew is:
```raw
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
![image](/assets/images/architecture/3611/changeport.png){:width="700px"}  
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
![image](/assets/images/architecture/3611/location.png){:width="700px"}  
### 3.3 Supporting Client Side Routing
Many front-end libraries like React and Angular are using client side routing(CSR). Instead of making a GET request to server, CSR is using a browser API called history.pushState to manually change the URL and then it renders the view for that specific route - all without causing a page refresh.

One limitation of CSR is, it assumes user always accesses the index page first. If user directly access the routing page, for example, http://localhost:3000/productlist, “Cannot GET /URL Error” will appear. Notice, after we deploy the Single Page Application, there is only one index.html file and several assets file in the server folder. This is no file named productlist.html. To solve this issue, we can force web browser access the index file.

For nginx, add following line to the configuration file /usr/local/etc/nginx/nginx.conf.
```raw
try_files $uri /index.html;
```
This lets nginx serve static asset files and serves your index.html file when any file isn't found on the server.
```raw
server {
    listen       9096;
    server_name  localhost;

    #charset koi8-r;

    #access_log  logs/host.access.log  main;

    location / {
        try_files $uri /index.html;
        root   /nginx/www;
        index  index.html index.htm;
    }
```

## 4. References
* [Nginx Official Website](https://www.nginx.com/)
* [Installing Nginx in Mac OS X Maverick With Homebrew](https://medium.com/@ThomasTan/installing-nginx-in-mac-os-x-maverick-with-homebrew-d8867b7e8a5)
