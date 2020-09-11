---
layout: tutorial
key: cloud
title: "AWS-Elastic Load Balancer"
index: 4110
subcategory: amazon-aws
date: 2019-09-16
tags: [AWS, Load Balancer]
---

> Build high availability applications.

## 1. Elastic Load Balancer
### 1.1 Load Balancer Types
* Application Load Balancer
* Network Load Balancer
* Classic Load Balancer

### 1.2 Application Load Balancer
Application Load Balancers are best suited for load balancing of HTTP and HTTPS traffic. They operate at Layer 7 and are application-aware. They are intelligent, and you can create advanced request routing, sending specified requests to specific web servers.

### 1.3 Network Load Balancer
Network Load Balancers are best suited for load balancing of TCP traffic where extreme performance is required. Operating at the connection level (Layer 4), Network Load Balancer are capable of handling millions of requests per second, while maintaining ultra-low latencies. Use for extreme performance!

### 1.4 Classic Load Balancer
Classic Load Balancers are the legacy Elastic Load Balancers. You can load balance HTTP/HTTPS applications and use Layer 7-specific features, such as X-Forwarded and sticky sessions. You can also use strict Layer 4 load balancing for applications that rely purely on the TCP protocol.

### 1.5 Errors in Load Balancing
Classic Load Balancers if your application stops responding, the ELB (Classic Load Balancer) responds with a 504 error. This means that the application is having issues. This could be either at the Web Server layer or at the Database Layer. Identify where the application is failing, and scale it up or out where possible.

### 1.6 X-Forwarded-For
If you need the IPv4 address of your end user, look for the `X-Forwarded-For` header.

### 1.7 Summary of ELB
* Instances monitored by ELB are reported as InService or OutofService
* Health Checks check the instance health by talking to it.
* Load Balances have their own DNS name. You are never given an IP address.
* Read the ELB FAQ for Classic Load Balancers.

## 2. Lab - Load Balancers And Health Checks
Reminder: Load Balancers are **not** free.

Diagram: Load Balancer & Health Check Architecture
![image](/assets/images/cloud/4110/8-2-load-balancer-architecture.png)

### 2.1 Lab - Classic Load Balancer
Lab1: Create two instances with show different web pages, then create classic load balancer.

1) Create first instance with the following bootstrap script, make it showing "This is WebServer 01" in the web page.
```raw
#!/bin/bash
yum update -y
yum install httpd -y
service httpd start
chkconfig httpd on
cd /var/www/html
echo "<html><h1>This is WebServer 01</h1></html>" > index.html
```
Specify the subnet/AZ to 'eu-west-1a'.
![image](/assets/images/cloud/4110/8-2-classic-load-balancer-1.png)
2) Create second instance with the same bootstrap script, make it showing "This is WebServer 02" in the web page. Specify the subnet/AZ to 'eu-west-1b'. Now, we have two instances running in different AZs.
![image](/assets/images/cloud/4110/8-2-classic-load-balancer-2.png)
If we access the public id address, we will see the "This is WebServer 01" or "This is WebServer 02" respectively.
![image](/assets/images/cloud/4110/8-2-classic-load-balancer-3.png)
3) Create new classic load balancer. Services->EC2->Load Balancers, Create Load Balancer, provider name for it.
![image](/assets/images/cloud/4110/8-2-classic-load-balancer-4.png)
Choose the existing security group.
![image](/assets/images/cloud/4110/8-2-classic-load-balancer-5.png)
Configure health check.
![image](/assets/images/cloud/4110/8-2-classic-load-balancer-6.png)
Add two EC2 instances.
![image](/assets/images/cloud/4110/8-2-classic-load-balancer-7.png)
Keep tag empty and create. The load balancer is created, wait until the status is changed from "OutService" to "InService".
![image](/assets/images/cloud/4110/8-2-classic-load-balancer-8.png)
Copy the dns name and visit it in web browser.
![image](/assets/images/cloud/4110/8-2-classic-load-balancer-9.png)
We will see the content. Keep refreshing the page, sometimes we hit WebServer 1 and sometime we hit WebServer 2.
![image](/assets/images/cloud/4110/8-2-classic-load-balancer-10.png)
Stop the first instance which is Webserver 1.
![image](/assets/images/cloud/4110/8-2-classic-load-balancer-11.png)
The health check will notice this and the status of web server 1 instance is changed to "OutService".
![image](/assets/images/cloud/4110/8-2-classic-load-balancer-12.png)
If we refresh the page, we will only see webserver 2, as load balancer detects webserver 1 is not available, it is sending all traffic to web server 2.
![image](/assets/images/cloud/4110/8-2-classic-load-balancer-13.png)

### 2.2 Lab - Application Load Balancer
Lab2: Create target group and application load balancer.

1) Create Target Group: Services->EC2->Target Groups, Create Target Group, provide the group name.
![image](/assets/images/cloud/4110/8-2-application-load-balancer-1.png)
Set path, threshold, timeout and interval.
![image](/assets/images/cloud/4110/8-2-application-load-balancer-2.png)
Once the group is created, switch to "Targets" tab, click "Edit" button.
![image](/assets/images/cloud/4110/8-2-application-load-balancer-3.png)
Add the two web server instances.
![image](/assets/images/cloud/4110/8-2-application-load-balancer-4.png)
2) Create new application load balancer. Services->EC2->Load Balancers, Create Load Balancer, select Application Load Balancer, provider name for it.
![image](/assets/images/cloud/4110/8-2-application-load-balancer-5.png)
Select all availability zones, next.
![image](/assets/images/cloud/4110/8-2-application-load-balancer-6.png)
Skip the warning, next.
![image](/assets/images/cloud/4110/8-2-application-load-balancer-7.png)
Select the WebDMZ security group, next.
![image](/assets/images/cloud/4110/8-2-application-load-balancer-8.png)
Select the existing group created in previous lab, next.
![image](/assets/images/cloud/4110/8-2-application-load-balancer-9.png)
Leave as it is.
![image](/assets/images/cloud/4110/8-2-application-load-balancer-10.png)
Go back the target group, click Edit.
![image](/assets/images/cloud/4110/8-2-application-load-balancer-11.png)
Select the two instances and click 'Add to registered'.
![image](/assets/images/cloud/4110/8-2-application-load-balancer-12.png)
Wait for a while, until the status become 'healthy'.
![image](/assets/images/cloud/4110/8-2-application-load-balancer-13.png)
Go to the load balancer, copy the dns name, visit it in the web browser.
![image](/assets/images/cloud/4110/8-2-application-load-balancer-14.png)
We will see the content. Keep refreshing the page, sometimes we hit WebServer 1 and sometime we hit WebServer 2.
![image](/assets/images/cloud/4110/8-2-application-load-balancer-15.png)
Why application load balancer is more intelligent than classic load balancer? Check the listeners in the load balancer, click on the listener.
![image](/assets/images/cloud/4110/8-2-application-load-balancer-21.png)
You can create rules with conditions and corresponding actions.
![image](/assets/images/cloud/4110/8-2-application-load-balancer-22.png)
![image](/assets/images/cloud/4110/8-2-application-load-balancer-23.png)



## 3. Advanced Load Balancer
### 3.1 Sticky Sessions
Classic Load Balancer routes each request independently to the registered EC2 instance with the smallest load. `Sticky sessions` allow you to bind a user's session to a specific EC2 instance. This ensures that all requests from the user during the session are sent to the same instance.
![image](/assets/images/cloud/4110/sticky-sessions.jpg)
You can enable Sticky Sessions for Application Load Balancers as well, but the traffic will be sent at the Target Group Level.
### 3.2 Cross Zone load Balancing
With cross-zone load balancing, each load balancer node for your Classic Load Balancer distributes requests evenly across the registered instances in all enabled Availability Zones. If cross-zone load balancing is disabled, each load balancer node distributes requests evenly across the registered instances in its Availability Zone only.
![image](/assets/images/cloud/4110/cross-zone-load-balancing.jpg)
### 3.3 Path Patterns
You can create a listener with rules to forward requests based on the URL path. This is known as path-based routing. If you are running microservices, you can route traffic to multiple back-end services using path-based routing. For example, you can route general requests to one target group and requests to render images to another target group.
![image](/assets/images/cloud/4110/path-based-routing.jpeg)
### 3.4 Summary
* Sticky Sessions enable your users to stick to the same EC2 instance. Can be useful if you are storing information locally to that instance.
* Cross Zone Load Balancing enables you to load balance across multiple availability zones.
* Path patterns allow you to direct traffic to different EC2 instances based on the URL contained in the request.

## 9. References
* [AWS High Availability: Compute, SQL and Storage](https://cloud.netapp.com/blog/understanding-aws-high-availability-compute-sql-and-storage)
* [HTTP headers and Classic Load Balancers](https://docs.aws.amazon.com/elasticloadbalancing/latest/classic/x-forwarded-headers.html)
* [Tutorial: Use path-based routing with your Application Load Balancer](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/tutorial-load-balancer-routing.html)
* [The Netflix Simian Army](https://medium.com/netflix-techblog/the-netflix-simian-army-16e57fbab116)
