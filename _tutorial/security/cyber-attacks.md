---
layout: tutorial
key: tutorial
title: "Cyber Attacks"
index: 3601
subcategory: security
date: 2019-07-17
tags: [DDos, XSS]
---

> Protect password.

## 1. DoS
### 1.1 What is a DoS Attack?
A denial-of-service(`DoS`) attack is a malicious attempt to overwhelm a web property with traffic in order to disrupt it's normal operations. DoS attacks typically function by overwhelming or flooding a targeted machine with requests until normal traffic is unable to be processed, resulting in denial-of-service to addition users. A DoS attack is characterized by using a `single` computer to launch the attack. A distributed denial-of-service (`DDoS`) attack is a type of DoS attack that comes from `many distributed` sources, such as a botnet DDoS attack.
### 1.2 How does a DoS attack work?
The primary focus of a DoS attack is to oversaturate the capacity of a targeted machine, resulting in denial-of-service to additional requests. The multiple attack vectors of DoS attacks can be grouped by their similarities.

DoS attacks typically fall in 2 categories:
* `Buffer overflow attacks`: An attack type in which a memory buffer overflow can cause a machine to consume all available hard disk space, memory, or CPU time. This form of exploit often results in sluggish behavior, system crashes, or other deleterious server behaviors, resulting in denial-of-service.
* `Flood attacks`: By saturating a targeted server with an overwhelming amount of packets, a malicious actor is able to oversaturate server capacity, resulting in denial-of-service. In order for most DoS flood attacks to be successful, the malicious actor must have more available bandwidth than the target.

### 1.3 What is the difference between a DDoS attack and a DOS attack?
The distinguishing difference between DDoS and DoS is the number of connections utilized in the attack. DoS utilizes a single connection, while a DDoS attack utilizes many sources of attack traffic, often in the form of a botnet. Generally speaking, many of the attacks are fundamentally similar and can be attempted using one more many sources of malicious traffic.
![image](/public/images/devops/3601/dos-vs-ddos.png){:width="700px"}

## 2. DDoS
### 2.1 What is a DDoS Attack?
A distributed denial-of-service (`DDoS`) attack is a malicious attempt to disrupt normal traffic of a targeted server, service or network by overwhelming the target or its surrounding infrastructure with a flood of Internet traffic. DDoS attacks achieve effectiveness by utilizing multiple compromised computer systems as sources of attack traffic. Exploited machines can include computers and other networked resources such as IoT devices. From a high level, a DDoS attack is like a traffic jam clogging up with highway, preventing regular traffic from arriving at its desired destination.
![image](/public/images/devops/3601/ddos-attack-traffic.png)

## 8. References
* [Top 10 Most Common Types of Cyber Attacks](https://blog.netwrix.com/2018/05/15/top-10-most-common-types-of-cyber-attacks/)
* [Denial-of-Service (DoS)](https://www.cloudflare.com/learning/ddos/glossary/denial-of-service/)
* [What is a DDoS Attack?](https://www.cloudflare.com/learning/ddos/what-is-a-ddos-attack/)
