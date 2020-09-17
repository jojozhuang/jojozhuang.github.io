---
layout: tutorial
key: cloud
title: "AWS-Elastic Beanstalk"
index: 4178
subcategory: amazon-aws
date: 2019-09-16
tags: [AWS, Load Balancer]
---

> Deploy and run applications with Elastic Beanstalk.

## 1. Elastic Beanstalk
### 1.1 What is Beanstalk?
AWS Elastic Beanstalk is an easy-to-use service for deploying and scaling web applications and services developed with Java, .NET, PHP, Node.js, Python, Ruby, Go, and Docker on familiar servers such as Apache, Nginx, Passenger, and IIS.

You can simply upload your code and Elastic Beanstalk automatically handles the deployment, from capacity provisioning, load balancing, auto-scaling to application health monitoring. At the same time, you retain full control over the AWS resources powering your application and can access the underlying resources at any time.

There is no additional charge for Elastic Beanstalk - you pay only for the AWS resources needed to store and run your applications.

### 1.2 Summary
With Elastic Beanstalk, you can quickly deploy and manage applications in the AWS Cloud without worrying about the infrastructure that runs those applications. You simply upload your application, and Elastic Beanstalk automatically handles the details of capacity provisioning, load balancing, scaling, and application health monitoring.

## 2. Lab - Elastic Beanstalk
### 2.1 Creating Elastic Beanstalk
Go to Services->Compute->Elastic Beanstalk, Create New Application.
![image](/assets/images/cloud/4178/elastic-beanstalk-1.png)
Set name, choose platform, click "Create application" button.
![image](/assets/images/cloud/4178/elastic-beanstalk-2.png)
Application is creating.
![image](/assets/images/cloud/4178/elastic-beanstalk-3.png)
Wait until the setup is done, click the environment.
![image](/assets/images/cloud/4178/elastic-beanstalk-4.png)
We can see the history of the creation.
![image](/assets/images/cloud/4178/elastic-beanstalk-5.png)
Switch to configuration. Here you can make change to the application.
![image](/assets/images/cloud/4178/elastic-beanstalk-6.png)
If we go to Services->EC2, we will see new instance is auto generated.
![image](/assets/images/cloud/4178/elastic-beanstalk-7.png)
Visit the public ip in the web browser, we will see the web page.
![image](/assets/images/cloud/4178/elastic-beanstalk-8.png)

## 3. References
* [AWS Elastic Beanstalk](https://aws.amazon.com/elasticbeanstalk/)
