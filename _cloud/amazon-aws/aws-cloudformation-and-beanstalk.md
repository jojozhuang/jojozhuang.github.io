---
layout: tutorial
key: cloud
title: "AWS-CloudFormation and Beanstalk"
index: 4177
subcategory: amazon-aws
date: 2019-09-16
tags: [AWS, Load Balancer]
---

> CloudFormation and Beanstalk.

## 1. CloudFormation
### 1.1 What is CloudFormation?
AWS CloudFormation provides a common language for you to model and provision AWS and third party application resources in your cloud environment. AWS CloudFormation allows you to use programming languages or a simple text file to model and provision, in an automated and secure manner, all the resources needed for your applications across all regions and accounts. This gives you a single source of truth for your AWS and third party resources.

### 1.2 Summary
* CloudFormation is a way of completely scripting your cloud environment.
* Quick Start is a bunch of CloudFormation templates already built by AWS Solutions Architects allowing you to create complex environments very quickly.

## 2. Lab - CloudFormation
### 2.1 Create Cloudformation
Go to Services->Management & Governance->CloudFormation, create stack.
![image](/assets/images/cloud/4113/8-10-cloudformation-1.png)
Choose 'Use a sample template' option, and select WordPress blog template.
![image](/assets/images/cloud/4113/8-10-cloudformation-2.png)
Set name and database parameters.
![image](/assets/images/cloud/4113/8-10-cloudformation-3.png)
Add tag, next, review and create.
![image](/assets/images/cloud/4113/8-10-cloudformation-4.png)
It is created.
![image](/assets/images/cloud/4113/8-10-cloudformation-5.png)
Wait for a while, the creation is completed. We see some web servers and security groups are created.
![image](/assets/images/cloud/4113/8-10-cloudformation-6.png)
Switch to the Outputs tab, hit the link.
![image](/assets/images/cloud/4113/8-10-cloudformation-7.png)
We should see the word press configuration page. WordPress site is ready to use.
![image](/assets/images/cloud/4113/8-10-cloudformation-8.png)
Switch to Resources tab. Notice that only web server and security group are created. There is no RDS is created. You can confirm this by going to RDS to see if there is any new instance is launched.
![image](/assets/images/cloud/4113/8-10-cloudformation-9.png)
Only one EC2 instance we can find.
![image](/assets/images/cloud/4113/8-10-cloudformation-10.png)
* Visit https://aws.amazon.com/quickstart/?quick to see available templates.

## 3. Elastic Beanstalk
### 3.1 What is Beanstalk?
AWS Elastic Beanstalk is an easy-to-use service for deploying and scaling web applications and services developed with Java, .NET, PHP, Node.js, Python, Ruby, Go, and Docker on familiar servers such as Apache, Nginx, Passenger, and IIS.

You can simply upload your code and Elastic Beanstalk automatically handles the deployment, from capacity provisioning, load balancing, auto-scaling to application health monitoring. At the same time, you retain full control over the AWS resources powering your application and can access the underlying resources at any time.

There is no additional charge for Elastic Beanstalk - you pay only for the AWS resources needed to store and run your applications.

### 3.2 Summary
With Elastic Beanstalk, you can quickly deploy and manage applications in the AWS Cloud without worrying about the infrastructure that runs those applications. You simply upload your application, and Elastic Beanstalk automatically handles the details of capacity provisioning, load balancing, scaling, and application health monitoring.

## 4. Lab - Elastic Beanstalk
### 4.1 Create Elastic Beanstalk
Go to Services->Compute->Elastic Beanstalk, Create New Application.
![image](/assets/images/cloud/4113/8-11-elastic-beanstalk-1.png)
Set name, choose platform, click "Create application" button.
![image](/assets/images/cloud/4113/8-11-elastic-beanstalk-2.png)
Application is creating.
![image](/assets/images/cloud/4113/8-11-elastic-beanstalk-3.png)
Wait until the setup is done, click the environment.
![image](/assets/images/cloud/4113/8-11-elastic-beanstalk-4.png)
We can see the history of the creation.
![image](/assets/images/cloud/4113/8-11-elastic-beanstalk-5.png)
Switch to configuration. Here you can make change to the application.
![image](/assets/images/cloud/4113/8-11-elastic-beanstalk-6.png)
If we go to Services->EC2, we will see new instance is auto generated.
![image](/assets/images/cloud/4113/8-11-elastic-beanstalk-7.png)
Visit the public ip in the web browser, we will see the web page.
![image](/assets/images/cloud/4113/8-11-elastic-beanstalk-8.png)

## 5. References
* [AWS Cloud​Formation](https://aws.amazon.com/cloudformation/)
* [AWS Elastic Beanstalk](https://aws.amazon.com/elasticbeanstalk/)
