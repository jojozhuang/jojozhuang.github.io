---
layout: tutorial
key: cloud
title: "AWS-CloudFormation"
index: 4177
subcategory: amazon-aws
date: 2019-09-16
tags: [AWS, Load Balancer]
---

> Create AWS and third party resources with CloudFormation.

## 1. CloudFormation
### 1.1 What is CloudFormation?
AWS CloudFormation provides a common language for you to model and provision AWS and third party application resources in your cloud environment. AWS CloudFormation allows you to use programming languages or a simple text file to model and provision, in an automated and secure manner, all the resources needed for your applications across all regions and accounts. This gives you a single source of truth for your AWS and third party resources.

### 1.2 Summary
* CloudFormation is a way of completely scripting your cloud environment.
* Quick Start is a bunch of CloudFormation templates already built by AWS Solutions Architects allowing you to create complex environments very quickly.

## 2. Lab - CloudFormation
### 2.1 Creating Cloudformation
Go to Services->Management & Governance->CloudFormation, create stack.
![image](/assets/images/cloud/4177/cloudformation-1.png)
Choose 'Use a sample template' option, and select WordPress blog template.
![image](/assets/images/cloud/4177/cloudformation-2.png)
Set name and database parameters.
![image](/assets/images/cloud/4177/cloudformation-3.png)
Add tag, next, review and create.
![image](/assets/images/cloud/4177/cloudformation-4.png)
It is created.
![image](/assets/images/cloud/4177/cloudformation-5.png)
Wait for a while, the creation is completed. We see some web servers and security groups are created.
![image](/assets/images/cloud/4177/cloudformation-6.png)
Switch to the Outputs tab, hit the link.
![image](/assets/images/cloud/4177/cloudformation-7.png)
We should see the word press configuration page. WordPress site is ready to use.
![image](/assets/images/cloud/4177/cloudformation-8.png)
Switch to Resources tab. Notice that only web server and security group are created. There is no RDS is created. You can confirm this by going to RDS to see if there is any new instance is launched.
![image](/assets/images/cloud/4177/cloudformation-9.png)
Only one EC2 instance we can find.
![image](/assets/images/cloud/4177/cloudformation-10.png)
* Visit https://aws.amazon.com/quickstart/?quick to see available templates.

## 3. References
* [AWS Cloud​Formation](https://aws.amazon.com/cloudformation/)
* [AWS CloudFormation FAQs](https://aws.amazon.com/cloudformation/faqs/)
