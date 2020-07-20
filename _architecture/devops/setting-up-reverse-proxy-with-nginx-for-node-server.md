---
layout: tutorial
key: architecture
title: "Setting Up Reverse Proxy with Nginx for Node Server"
index: 3612
subcategory: devops
date: 2018-05-27
tags: [Nginx, Proxy, Node.js]
---

> Introduce how to setup Reverse Proxy with Nginx for Node Server.

## 1. What Is a Reverse Proxy?
A reverse proxy is an intermediary proxy service which takes a client request, passes it on to one or more servers, and subsequently delivers the server’s response to the client. A common reverse proxy configuring is to put Nginx in front of an Apache web server or other web servers. Using this method will allow both web servers to work together enabling each to do what they do best.

## 2. Benefits of an Nginx Reverse Proxy
* Load Balancing – A reverse proxy can perform load balancing which helps distribute client requests evenly across backend servers. This process greatly helps in avoiding the scenario where a particular server becomes overloaded due to a sudden spike in requests. Load balancing also improves redundancy as if one server goes down, the reverse proxy will simply reroute requests to a different server.
* Increased Security – A reverse proxy also acts as a line of defense for your backend servers. Configuring a reverse proxy ensures that the identity of your backend servers remains unknown. This can greatly help in protecting your servers from attacks such as DDoS for example.
* Better Performance – Nginx has been known to perform better in delivering static content over Apache. Therefore with an Nginx reverse proxy, all client requests can be handled by Nginx while all requests for dynamic content can be passed on to the backend Apache server. This helps improve performance by optimizing the delivery of assets based on their type.
* Easy Logging and Auditing – Since there is only one single point of access when a reverse proxy is implemented, this makes logging and auditing much simpler. Using this method, you can easily monitor what goes in and out through the reverse proxy.

## 3. How To Setup an Nginx Reverse Proxy
### 3.1 Node Server
First, follow the steps mentioned in [Creating Http Server with Node.js]({% link _tutorial/node-js/creating-http-server-with-nodejs.md %}) to setup a node server. It is served at post 8086.
![image](/assets/images/architecture/3612/nodeserver.png){:width="700px"}  
### 3.2 Nginx Server
Second, follow the steps mentioned in [Installing Nginx on macOS]({% link _architecture/devops/installing-nginx-on-macos.md %}) to setup a nginx server. It is served at post 9096.
![image](/assets/images/architecture/3612/nginxserver.png){:width="700px"}  
### 3.3 Configuring Nginx Server as Reverse Proxy Server
Edit the configuration file of Nginx, which is located at /usr/local/etc/nginx/nginx.conf. Add the `proxy_pass` directive inside a location. Set its value to the address of the node server.
```raw
server {
    listen       9096;
    server_name  localhost;

    #charset koi8-r;

    #access_log  logs/host.access.log  main;

    location / {
        proxy_pass http://127.0.0.1:8086/;
    }
```
Stop and restart nginx, then refresh the web browser. Nginx is now serving as proxy server for the node server.
![image](/assets/images/architecture/3612/proxy.png){:width="700px"}  
### 3.4 More Options
```raw
location /some/path/ {
    proxy_bind 127.0.0.2;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_buffers 16 4k;
    proxy_buffer_size 2k;
    proxy_pass http://127.0.0.1:8086/;
}
```

## 4. References
* [NGINX Reverse Proxy](https://docs.nginx.com/nginx/admin-guide/web-server/reverse-proxy/)
* [Setting up an Nginx Reverse Proxy](https://www.keycdn.com/support/nginx-reverse-proxy/)
* [Using nginx as a reverse proxy in front of your Node.js application](http://www.nikola-breznjak.com/blog/javascript/nodejs/using-nginx-as-a-reverse-proxy-in-front-of-your-node-js-application/)
* [Nginx vs Apache](https://www.keycdn.com/support/nginx-vs-apache/)
