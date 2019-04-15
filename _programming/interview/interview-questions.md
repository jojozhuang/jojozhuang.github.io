---
layout: programming
key: programming
title: "Interview Questions"
index: 100
category: interview
image: programming/interview.png
date: 2019-01-01
postdate: 2019-01-01
tags: [Technique Interview]
---

> Popular interview questions.

## 1. Network
### 1.1 Forward Proxy VS Reverse Proxy
A `forward proxy` provides proxy services to a `client` or a group of clients. At times, these clients belong to a common internal network. When one of these clients makes a connection attempt to that file transfer server on the Internet, its requests have to pass through the forward proxy first. Depending on the forward proxy’s settings, a request can be allowed or denied. If allowed, then the request is forwarded to the firewall and then to the file transfer server. From the point of view of the file transfer server, it is the proxy server that issued the request, not the client. So when the server responds, it addresses its response to the proxy.

A `reverse proxy` does the exact opposite of what a forward proxy does. While a forward proxy proxies in behalf of clients (or requesting hosts), a reverse proxy proxies in behalf of `servers`. A reverse proxy accepts requests from external clients on behalf of servers stationed behind it. To the client, it is the reverse proxy that is providing file transfer services. The client is unknown to the file transfer servers behind the proxy, which are actually providing those services. In effect, whereas **a forward proxy hides the identities of clients, a reverse proxy hides the identities of servers**.

![image](/public/programming/interview-questions/forward_reverse_proxy.png)

Forward Proxies are good for:
* Content Filtering
* eMail security
* NAT’ing
* Compliance Reporting
* Reverse Proxies are good for:

Application Delivery including:
* Load Balancing (TCP Multiplexing)
* SSL Offload/Acceleration (SSL Multiplexing)
* Caching
* Compression
* Content Switching/Redirection
* Application Firewall
* Server Obfuscation
* Authentication
* Single Sign On

## 99. To Do
1. Java Memory Model
2. Nodejs Memory Model
3. Functional Programming
4. Upgrade Bootstrap 3 to 4.


## 6. References
* [FORWARD PROXY VS REVERSE PROXY](https://ipwithease.com/forward-proxy-vs-reverse-proxy/)
* [Jenkins with HTTPS Using NGINX and Docker](https://itnext.io/setting-up-https-for-jenkins-with-nginx-everything-in-docker-4a118dc29127)
