---
layout: tutorial
key: architecture
title: "Distributed System - Load Balancing and Reverse Proxy"
index: 3006
subcategory: theory-principle
date: 2018-08-15
tags: [Load Balancing, Reverse Proxy]
---

> Load Balancing and Reverse Proxy

## 1. Load Balancing
### 1.1 What is Load Balancer?
Load balancers distribute incoming client requests to computing resources such as application servers and databases. In each case, the load balancer returns the response from the computing resource to the appropriate client. Load balancers can be implemented with hardware (expensive) or with software such as HAProxy.
![image](/assets/images/note/9506/loadbalancing.png){:width="600px"}
### 1.2 Usage of Load Balancer
Load balancers are effective at:
* Preventing requests from going to unhealthy servers
* Preventing overloading resources
* Helping eliminate single points of failure

Additional benefits include:
* **SSL termination** - Decrypt incoming requests and encrypt server responses so backend servers do not have to perform these potentially expensive operations
    * Removes the need to install [X.509 certificates](https://en.wikipedia.org/wiki/X.509) on each server
* **Session persistence** - Issue cookies and route a specific client's requests to same instance if the web apps do not keep track of sessions

To protect against failures, it's common to set up multiple load balancers, either in **active-passive** or **active-passive** mode.
### 1.3 Route Strategy
Load balancers can route traffic based on various metrics, including:
* Random
* Least loaded
* Session/cookies
* [Round robin or weighted round robin](http://g33kinfo.com/info/archives/2657)
* [Layer 4](#layer-4-load-balancing)
* [Layer 7](#layer-7-load-balancing)

#### Layer 4 load balancing
Layer 4 load balancers look at info at the `transport layer` to decide how to distribute requests. Generally, this involves the source, destination IP addresses, and ports in the header, but not the contents of the packet. Layer 4 load balancers forward network packets to and from the upstream server, performing [Network Address Translation (NAT)](https://www.nginx.com/resources/glossary/layer-4-load-balancing/).
#### Layer 7 load balancing
Layer 7 load balancers look at the `application layer` to decide how to distribute requests. This can involve contents of the header, message, and cookies. Layer 7 load balancers terminates network traffic, reads the message, makes a load-balancing decision, then opens a connection to the selected server. For example, a layer 7 load balancer can direct video traffic to servers that host videos while directing more sensitive user billing traffic to security-hardened servers.

At the cost of flexibility, layer 4 load balancing requires less time and computing resources than Layer 7, although the performance impact can be minimal on modern commodity hardware.

### 1.4 Horizontal scaling
Load balancers can also help with horizontal scaling, improving performance and availability. Scaling out using commodity machines is more cost efficient and results in higher availability than scaling up a single server on more expensive hardware, called **Vertical Scaling**. It is also easier to hire for talent working on commodity hardware than it is for specialized enterprise systems.

**Disadvantage(s): horizontal scaling**
* Scaling horizontally introduces complexity and involves cloning servers
    * Servers should be stateless: they should not contain any user-related data like sessions or profile pictures
    * Sessions can be stored in a centralized data store such as a database (SQL, NoSQL) or a persistent cache(Redis, Memcached)
* Downstream servers such as caches and databases need to handle more simultaneous connections as upstream servers scale out

### 1.5 Disadvantages of Load Balancer
* The load balancer can become a performance bottleneck if it does not have enough resources or if it is not configured properly.
* Introducing a load balancer to help eliminate single points of failure results in increased complexity.
* A single load balancer is a single point of failure, configuring multiple load balancers further increases complexity.

## 2. Reverse Proxy (web server)
### 2.1 What is Reverse Proxy?
A reverse proxy is a web server that centralizes internal services and provides unified interfaces to the public. Requests from clients are forwarded to a server that can fulfill it before the reverse proxy returns the server's response to the client.
![image](/assets/images/note/9506/reverseproxy.png){:width="450px"}
### 2.2 Usage of Reverse Proxy
Benefits include:
* **Increased security** - Hide information about backend servers, blacklist IPs, limit number of connections per client
* **Increased scalability and flexibility** - Clients only see the reverse proxy's IP, allowing you to scale servers or change their configuration
* **SSL termination** - Decrypt incoming requests and encrypt server responses so backend servers do not have to perform these potentially expensive operations
    * Removes the need to install [X.509 certificates](https://en.wikipedia.org/wiki/X.509) on each server
* **Compression** - Compress server responses
* **Caching** - Return the response for cached requests
* **Static content** - Serve static content directly
    * HTML/CSS/JS
    * Photos
    * Videos
    * Etc

### 2.3 Load Balancer vs. Reverse Proxy
* Deploying a load balancer is useful when you have multiple servers. Often, load balancers  route traffic to a set of servers serving the same function.
* Reverse proxies can be useful even with just one web server or application server, opening up the benefits described in the previous section.
* Solutions such as NGINX and HAProxy can support both layer 7 reverse proxying and load balancing.

### 2.4 Disadvantage of Reverse Proxy
* Introducing a reverse proxy results in increased complexity.
* A single reverse proxy is a single point of failure, configuring multiple reverse proxies (ie a [failover](https://en.wikipedia.org/wiki/Failover)) further increases complexity.

## 3. Reference
* [The System Design Primer - Load balancer](https://github.com/donnemartin/system-design-primer/blob/master/README.md#load-balancer)
* [NGINX architecture](https://www.nginx.com/blog/inside-nginx-how-we-designed-for-performance-scale/)
* [HAProxy architecture guide](http://www.haproxy.org/download/1.2/doc/architecture.txt)
* [Scalability](http://www.lecloud.net/post/7295452622/scalability-for-dummies-part-1-clones)
* [Load balancing from Wikipedia](https://en.wikipedia.org/wiki/Load_balancing_(computing))
* [Layer 4 load balancing](https://www.nginx.com/resources/glossary/layer-4-load-balancing/)
* [Layer 7 load balancing](https://www.nginx.com/resources/glossary/layer-7-load-balancing/)
* [ELB listener config](http://docs.aws.amazon.com/elasticloadbalancing/latest/classic/elb-listener-config.html)
* [Reverse proxy vs load balancer](https://www.nginx.com/resources/glossary/reverse-proxy-vs-load-balancer/)
* [NGINX architecture](https://www.nginx.com/blog/inside-nginx-how-we-designed-for-performance-scale/)
* [HAProxy architecture guide](http://www.haproxy.org/download/1.2/doc/architecture.txt)
* [Reverse proxy from Wikipedia](https://en.wikipedia.org/wiki/Reverse_proxy)
