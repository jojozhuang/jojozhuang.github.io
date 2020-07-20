---
layout: tutorial
key: architecture
title: "Cyber Attacks"
index: 3801
subcategory: security
date: 2019-07-17
tags: [DNS, DDos, XSS, CSRF]
---

> The common cyber attacks like DDos, XSS and CSRF.

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
![image](/assets/images/architecture/3801/dos-vs-ddos.png){:width="700px"}

## 2. DDoS
### 2.1 What is a DDoS Attack?
A distributed denial-of-service (`DDoS`) attack is a malicious attempt to disrupt normal traffic of a targeted server, service or network by overwhelming the target or its surrounding infrastructure with a flood of Internet traffic. DDoS attacks achieve effectiveness by utilizing multiple compromised computer systems as sources of attack traffic. Exploited machines can include computers and other networked resources such as IoT devices. From a high level, a DDoS attack is like a traffic jam clogging up with highway, preventing regular traffic from arriving at its desired destination.
![image](/assets/images/architecture/3801/ddos-attack-traffic.png)
### 2.2 How does a DDoS attack work?
A DDoS attack requires an attacker to gain control of a network of online machines in order to carry out an attack. Computers and other machines (such as IoT devices) are infected with malware, turning each one into a bot (or zombie). The attacker then has remote control over the group of bots, which is called a `botnet`.

Once a botnet has been established, the attacker is able to direct the machines by sending updated instructions to each bot via a method of remote control. When the IP address of a victim is targeted by the botnet, each bot will respond by sending requests to the target, potentially causing the targeted server or network to overflow capacity, resulting in a denial-of-service to normal traffic. Because each bot is a legitimate Internet device, separating the attack traffic from normal traffic can be difficult.
### 2.3 What are common types of DDoS attacks?
The OSI model, shown below, is a conceptual framework used to describe network connectivity in 7 distinct layers.
![image](/assets/images/architecture/3801/osi-model.png)
While nearly all DDoS attacks involve overwhelming a target device or network with traffic, attacks can be divided into three categories. An attacker may make use one or multiple different attack vectors, or cycle attack vectors potentially based on counter measures taken by the target.

**Application Layer Attacks(Layer 7 DDoS attack)**  
The goal of these attacks is to exhaust the resources of the target.
![image](/assets/images/architecture/3801/http-flood-ddos-attack.png){:width="700px"}
`HTTP Flood`  
This attack is similar to pressing refresh in a web browser over and over on many different computers at once – large numbers of HTTP requests flood the server, resulting in denial-of-service.

**Protocol Attacks(Layer 3 and Layer 4 DDoS attack)**  
Protocol attacks, also known as a state-exhaustion attacks, cause a service disruption by consuming all the available state table capacity of web application servers or intermediate resources like firewalls and load balancers. Protocol attacks utilize weaknesses in layer 3 and layer 4 of the protocol stack to render the target inaccessible.
![image](/assets/images/architecture/3801/syn-flood-ddos-attack.png){:width="700px"}
`SYN Flood`  
A SYN Flood is analogous to a worker in a supply room receiving requests from the front of the store. The worker receives a request, goes and gets the package, and waits for confirmation before bringing the package out front. The worker then gets many more package requests without confirmation until they can’t carry any more packages, become overwhelmed, and requests start going unanswered.

This attack exploits the `TCP handshake` by sending a target a large number of TCP “Initial Connection Request” SYN packets with spoofed source IP addresses. The target machine responds to each connection request and then waits for the final step in the handshake, which never occurs, exhausting the target’s resources in the process.

**Volumetric Attacks**  
This category of attacks attempts to create congestion by consuming all available bandwidth between the target and the larger Internet. Large amounts of data are sent to a target by using a form of amplification or another means of creating massive traffic, such as requests from a botnet.
![image](/assets/images/architecture/3801/dns-amplification-botnet-ddos-attack.png){:width="700px"}
`DNS Amplification`  
A DNS Amplification is like if someone were to call a restaurant and say “I’ll have one of everything, please call me back and tell me my whole order,” where the callback phone number they give is the target’s number. With very little effort, a long response is generated.

By making a request to an open DNS server with a spoofed IP address (the real IP address of the target), the target IP address then receives a response from the server. The attacker structures the request such that the DNS server responds to the target with a large amount of data. As a result, the target receives an amplification of the attacker’s initial query.
### 2.4 What is the process for mitigating a DDoS attack?
An attack that targets multiple layers of the protocol stack at the same time, such as a DNS amplification (targeting layers 3/4) coupled with a HTTP flood (targeting layer 7) is an example of `multi-vector` DDoS.
* Black Hole Routing
* Rate Limiting
* Web Application Firewall
* Anycast Network Diffusion

## 3. XSS
### 3.1 What is XSS?
Cross-site scripting (XSS) is an exploit where the attacker attaches code onto a legitimate website that will execute when the victim loads the website. That malicious code can be inserted in several ways. Most popularly, it is either added to the end of a url or posted directly onto a page that displays user-generated content. In more technical terms, cross-site scripting is a client-side code injection attack.
### 3.2 How does XSS work?
Specifically, the attacker injects a payload with malicious JavaScript into a website’s database. When the victim requests a page from the website, the website transmits the page, with the attacker’s payload as part of the HTML body, to the victim’s browser, which executes the malicious script. For example, it might send the victim’s cookie to the attacker’s server, and the attacker can extract it and use it for session hijacking.
![image](/assets/images/architecture/3801/xss-attack.png){:width="700px"}
The most dangerous consequences occur when XSS is used to exploit additional vulnerabilities. These vulnerabilities can enable an attacker to not only steal cookies, but also log key strokes, capture screenshots, discover and collect network information, and remotely access and control the victim’s machine.
### 3.3 What is client-side code?
Client-side code is JavaScript code that runs on a user’s machine. In terms of websites, client-side code is typically code that is executed by the web browser after the browser loads a web page.
### 3.4 How can an attacker use cross-site scripting to cause harm?
JavaScript cross-site scripting attacks are popular because JavaScript has access to some sensitive data that can be used for identity theft and other malicious purposes. For example, JavaScript has access to cookies*, and an attacker could use an XSS attack to steal a user’s cookies and impersonate them online. JavaScript can also create HTTP requests, which can be used to send data (such as stolen cookies) back to the attacker. Additionally, client-side JavaScript can also help an attacker gain access to APIs that contain geolocation coordinates, webcam data, and other sensitive information.
### 3.5 What are the different types of cross-site scripting?
**Reflected cross-site scripting**  
This is the most commonly seen cross-site scripting attack. With a reflected attack, malicious code is added onto the end of the url of a website; often this will be a legitimate, trusted website. When the victim loads this link in their web browser, the browser will execute the code injected into the url. The attacker usually uses some form of social engineering to trick the victim into clicking on the link.

Example:
```raw
http://legitamite-bank.com/index.php?user=<script>here is some bad code!</script>
```
**Persistent cross-site scripting**  
This happens on sites that let users post content that other users will see, such as a comments forum or social media site, for example. If the site doesn’t properly validate the inputs for user-generated content, an attacker can insert code that other users’ browsers will execute when the page loads.

Example:
```raw
"Hi! My name is Dave, I enjoy long walks on the beach and <script>malicious code here</script>"
```
### 3.6 How to prevent cross-site scripting?
* If possible, avoiding HTML in inputs
* Validating inputs
* Sanitizing data
* Taking cookie security measures: Cookies can be tied to particular IP addresses so that cross-site scripting attackers cannot access them.
* Setting WAF(Web Application Firewall) rules

## 4. CSRF
A cross-site request forgery(`CSRF`) attack tricks a victim into using their credentials to invoke a state-changing activity.


## 5. References
* [Top 10 Most Common Types of Cyber Attacks](https://blog.netwrix.com/2018/05/15/top-10-most-common-types-of-cyber-attacks/)
* [Denial-of-Service (DoS)](https://www.cloudflare.com/learning/ddos/glossary/denial-of-service/)
* [What is a DDoS Attack?](https://www.cloudflare.com/learning/ddos/what-is-a-ddos-attack/)
* [Cross-site Scripting (XSS)](https://www.owasp.org/index.php/Cross-site_Scripting_(XSS))
* [Cross-Site Scripting](https://www.cloudflare.com/learning/security/threats/cross-site-scripting/)
* [Website security - MDN](https://developer.mozilla.org/en-US/docs/Learn/Server-side/First_steps/Website_security)
* [Cross-Site Request Forgery](https://www.cloudflare.com/learning/security/threats/cross-site-request-forgery/)
