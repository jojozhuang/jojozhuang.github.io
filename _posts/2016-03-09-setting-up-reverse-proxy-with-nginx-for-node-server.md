---
layout: post
key: blog
title: "Setting Up Reverse Proxy with Nginx for Node Server[Draft]"
date: 2016-03-09
tags: [Nginx, Node.js]
---

> Tutorial for how to create Node.js applications.

## 1. Prerequisite
What Is a Reverse Proxy?
A reverse proxy is an intermediary proxy service which takes a client request, passes it on to one or more servers, and subsequently delivers the server’s response to the client. A common reverse proxy configuring is to put Nginx in front of an Apache web server. Using this method will allow both web servers to work together enabling each to do what they do best. Learn more about the differences between Nginx vs Apache.

This post will outline the benefits of using an Nginx reverse proxy as well as how to configure one.

Benefits of an Nginx Reverse Proxy
There are a few benefits to setting up an Nginx reverse proxy. Although not required in all cases, it can be beneficial depending upon your particular scenario / setup. The following outlines a few benefits implementing a reverse proxy.

Load Balancing – A reverse proxy can perform load balancing which helps distribute client requests evenly across backend servers. This process greatly helps in avoiding the scenario where a particular server becomes overloaded due to a sudden spike in requests. Load balancing also improves redundancy as if one server goes down, the reverse proxy will simply reroute requests to a different server. Read our complete article to learn more about load balancing.
Increased Security – A reverse proxy also acts as a line of defense for your backend servers. Configuring a reverse proxy ensures that the identity of your backend servers remains unknown. This can greatly help in protecting your servers from attacks such as DDoS for example.
Better Performance – Nginx has been known to perform better in delivering static content over Apache. Therefore with an Nginx reverse proxy, all client requests can be handled by Nginx while all requests for dynamic content can be passed on to the backend Apache server. This helps improve performance by optimizing the delivery of assets based on their type. Additionally, reverse proxies can also be used to serve cached content and perform SSL encryption to take a load off the web server(s).
Easy Logging and Auditing – Since there is only one single point of access when a reverse proxy is implemented, this makes logging and auditing much simpler. Using this method, you can easily monitor what goes in and out through the reverse proxy.
How To Setup an Nginx Reverse Proxy
Now that we’ve covered the benefits of setting up a reverse proxy, we’ll go through a simple example of how to configure an Nginx reverse proxy in front of an Apache web server. We’ll define the IP address of the Nginx reverse proxy to be 192.x.x.1 and the backend Apache server to be 192.x.x.2. In the following example, we assume that Apache is already installed and configured. Therefore to install Nginx the following command must be executed (remember to use sudo if you aren’t logged in as root).

apt-get update
apt-get install nginx
Once Nginx has been installed, the next step is to disable the default virtual host.

unlink /etc/nginx/sites-enabled/default
Then, we need to create a file within the /etc/nginx/sites-available directory that contains the reverse proxy information. We can name this reverse-proxy.conf for example.

server {
    listen 80;
    location / {
    proxy_pass http://192.x.x.2;
    }
}
The above snippet is quite minimalistic and straightforward. The important part here is the proxy_pass directive which is essentially telling any requests coming through the Nginx reverse proxy to be passed along to the Apache remote socket 192.x.x.2:80. There are many other proxy configurations you can define within your Nginx configuration settings. To learn more about the directives available, check out the Nginx proxy module documentation.

Once you’ve added the appropriate directives to your .conf file, activate it by linking to /sites-enabled/ using the following command.

ln -s /etc/nginx/sites-available/reverse-proxy.conf /etc/nginx/sites-enabled/reverse-proxy.conf
Lastly, run an Nginx configuration test and restart Nginx.

service nginx configtest
service nginx restart

```sh
server {
    listen 80;

    server_name meantodo.com;

    location / {
        proxy_pass http://127.0.0.1:1337;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 5. References
* [Setting up an Nginx Reverse Proxy](https://www.keycdn.com/support/nginx-reverse-proxy/)
* [Using nginx as a reverse proxy in front of your Node.js application](http://www.nikola-breznjak.com/blog/javascript/nodejs/using-nginx-as-a-reverse-proxy-in-front-of-your-node-js-application/)
