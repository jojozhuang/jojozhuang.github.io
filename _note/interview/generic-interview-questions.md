---
layout: programming
key: programming
title: "Generic Interview Questions(Draft)"
index: 102
category: interview
image: interview.png
date: 2016-01-02
postdate: 2016-01-02
tags: [Generic Questions]
---

> Generic interview questions.

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

**References**
* [FORWARD PROXY VS REVERSE PROXY](https://ipwithease.com/forward-proxy-vs-reverse-proxy/)
* [Jenkins with HTTPS Using NGINX and Docker](https://itnext.io/setting-up-https-for-jenkins-with-nginx-everything-in-docker-4a118dc29127)

### 1.2 Long Polling vs SSE vs WebSocket
Two general approaches for building real-time web application: `client pull` or `server push`.
A few ways to implement these:
* Long/short polling (client pull)
* WebSockets (server push)
* Server-Sent Events (server push)

* [Polling vs SSE vs WebSocket— How to choose the right one](https://codeburst.io/polling-vs-sse-vs-websocket-how-to-choose-the-right-one-1859e4e13bd9)

### 1.3 Networking Metrics
* Bandwidth
* Throughput
* Latency

## 2. Database Design
### 2.1 Entity-Relationship Diagram
### 2.2 Key, Index(Cluster Index), Constraints
Cluster Index, B-Tree Index, Inverted Index  
Shard

### 2.3 Normalization
Normalized databases are designed to minimize redundancy, while denormalized databases are designed
to optimize read time.
### 2.4 Denormalization
Denormalization means adding redundant information into a database to speed up reads.
* Denormalization is a time-space trade-off.
* Allow redundant data in database to avoid 'Join' in queries for improving performance.
* Need to solve the problem: data consistency. Constraints on tables.
* Can speed-up reads(SELECT in SQL) while slowing down writes(INSERT, UPDATE and DELETE). So use Denormalization only when reading frequency is more than writing frequency.
* One approach in practice is to use view in database.

### 2.5 Database Partitioning (Sharding)
Sharding means splitting the data across multiple machines while ensuring you have a way of figuring out
which data is on which machine.
* Vertical Partitioning
* Key-Based (or Hash-Based) Partitioning
* Directory-Based Partitioning

### 2.6 SQL vs NoSQL
![image](/public/programming/interview-questions/nosql-dec-tree.png)

### 2.7 References
* [NoSQL Key-Value Database Simplicity vs. Document Database Flexibility](http://www.informit.com/articles/article.aspx?p=2429466)
* [The SQL vs NoSQL Difference: MySQL vs MongoDB](https://medium.com/xplenty-blog/the-sql-vs-nosql-difference-mysql-vs-mongodb-32c9980e67b2)
* [How to Choose the Right Database System: RDBMS vs. NoSql vs. NewSQL](https://www.innoarchitech.com/how-choose-right-database-system-relational-rdbms-vs-nosql-vs-newsql/)

## 3. Design Pattern
### 3.1 Observer vs Publisher-Subscriber
![image](/public/programming/interview-questions/observer_vs_pubsub.jpeg)
* In Publisher/Subscriber pattern, components are loosely coupled as opposed to Observer pattern.
* Observer pattern is mostly implemented in a `synchronous` way, i.e. the Subject calls the appropriate method of all its observers when some event occurs. The Publisher/Subscriber pattern is mostly implemented in an `asynchronous` way (using message queue).

### 3.2 References
* [Observer vs Pub-Sub pattern](https://hackernoon.com/observer-vs-pub-sub-pattern-50d3b27f838c)

## 4. Basis of Computer Science
### 4.1 How Addition Is Implemented in Program?
```java

```

## 5. Object-Oriented Programming

## 6. MapReduce
* Map takes in some data and emits a <key J value> pair.
* Reduce takes a key and a set of associated values and "reduces"them in some way, emitting a new key and value.
