---
layout: tutorial
key: architecture
title: "Using Nginx as Load Balancer"
index: 3613
subcategory: devops
date: 2018-05-28
tags: [Nginx, Proxy, Load Balancing]
---

> Introduce how to setup Load Balancer with Nginx for Node Server.

## 1. Introduction
Load balancing across multiple application instances is a commonly used technique for optimizing resource utilization, maximizing throughput, reducing latency, and ensuring fault-tolerant configurations.

It is possible to use nginx as a very efficient HTTP load balancer to distribute traffic to several application servers and to improve performance, scalability and reliability of web applications with nginx.

## 2. Load Balancing Methods
The following load balancing mechanisms (or methods) are supported in nginx:
* round-robin: requests to the application servers are distributed in a round-robin fashion,
* least-connected: next request is assigned to the server with the least number of active connections,
* ip-hash: a hash-function is used to determine what server should be selected for the next request (based on the client’s IP address). Can be used for `Session persistence`.

## 3. Setting up Load Balancer
### 3.1 Node Servers
First, follow the steps mentioned in [Creating Http Server with Node.js]({% link _tutorial/node-js/creating-http-server-with-nodejs.md %}) to setup three node servers. They are served at different ports, 8086, 8087 and 8088.  
Server1.
![image](/assets/images/architecture/3613/nodeserver1.png){:width="700px"}
Server2.
![image](/assets/images/architecture/3613/nodeserver2.png){:width="700px"}
Server3.
![image](/assets/images/architecture/3613/nodeserver3.png){:width="700px"}
### 3.2 Nginx Server
Second, follow the steps mentioned in [Installing Nginx on macOS]({% link _architecture/devops/installing-nginx-on-macos.md %}) to setup a nginx server. It is served at post 9096.
![image](/assets/images/architecture/3613/nginxserver.png){:width="700px"}  
### 3.3 Configuring Nginx Server as Load Balancer
Edit Nginx's configuration file /usr/local/etc/nginx/nginx.conf. Create server list in `upstream`, and link them to `proxy_pass` directive in `location`. Here, we use the default load balancing method: round-robin.
```raw
http {
    upstream nodeapp {
        server 127.0.0.1:8086;
        server 127.0.0.1:8087;
        server 127.0.0.1:8088;
    }

    server {
        listen       9096;
        server_name  localhost;

        #charset koi8-r;

        #access_log  logs/host.access.log  main;

        location / {
            proxy_pass http://nodeapp/;
        }
    }
}
```
Stop and restart nginx, then refresh the web browser. Nginx is now serving as load balancer for the node servers. For the first time, data comes from server1 .
![image](/assets/images/architecture/3613/balancer1.png){:width="700px"}
Refresh the web browser, this time, the date comes from server 2.
![image](/assets/images/architecture/3613/balancer2.png){:width="700px"}
Refresh again, the date comes from server 3. If you continue refresh, you will see three node servers return data in turn.
![image](/assets/images/architecture/3613/balancer3.png){:width="700px"}

## 4. Source Files
* [Source files of Node Servers on Github](https://github.com/jojozhuang/Tutorials/tree/master/NginxLoadBalancer)

## 5. References
* [Using nginx as HTTP load balancer](http://nginx.org/en/docs/http/load_balancing.html)
* [Module ngx_http_upstream_module](http://nginx.org/en/docs/http/ngx_http_upstream_module.html)
