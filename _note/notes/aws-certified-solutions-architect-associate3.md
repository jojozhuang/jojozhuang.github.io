---
layout: tutorial
key: note
title: "AWS - Certified Solutions Architect Associate 3 - draft"
index: 9162
subcategory: notes
date: 2017-08-04
tags: [AWS]
draft: true
---

> AWS Certified Solutions Architect Associate 2019

## 8. HA Architecture
### 8.1 Load Balancers Theory
Load balancer types.
![image](/public/images/note/9160/8-1-load-balancer-1.png)
Application load balancer.
![image](/public/images/note/9160/8-1-load-balancer-2.png)
Network load balancer.
![image](/public/images/note/9160/8-1-load-balancer-3.png)
Classic load balancer.
![image](/public/images/note/9160/8-1-load-balancer-4.png)
![image](/public/images/note/9160/8-1-load-balancer-5.png)
X-Forwarded-For-Header
![image](/public/images/note/9160/8-1-load-balancer-6.png)
Exam tips.
![image](/public/images/note/9160/8-1-load-balancer-exam-tips-1.png)
![image](/public/images/note/9160/8-1-load-balancer-exam-tips-2.png)
![image](/public/images/note/9160/8-1-load-balancer-exam-tips-3.png)
### 8.2 Load Balancers And Health Checks Lab
TODO, create two instances with show different web pages, then create load balancer.
![image](/public/images/note/9160/8-2-load-balancer-1.png)
Exam tips
![image](/public/images/note/9160/8-2-load-balancer-exam-tips-1.png)
![image](/public/images/note/9160/8-2-load-balancer-exam-tips-2.png)
![image](/public/images/note/9160/8-2-load-balancer-exam-tips-3.png)
![image](/public/images/note/9160/8-2-load-balancer-exam-tips-4.png)
### 8.3 Advanced Load Balancer Theory
Sticky sessions.
![image](/public/images/note/9160/8-3-advanced-load-balancer-1.png)
![image](/public/images/note/9160/8-3-advanced-load-balancer-2.png)
No Cross Zone load Balancing.
![image](/public/images/note/9160/8-3-advanced-load-balancer-3.png)
With Cross Zone load Balancing.
![image](/public/images/note/9160/8-3-advanced-load-balancer-4.png)
![image](/public/images/note/9160/8-3-advanced-load-balancer-5.png)
Path Patterns.
![image](/public/images/note/9160/8-3-advanced-load-balancer-6.png)
![image](/public/images/note/9160/8-3-advanced-load-balancer-7.png)
Exam tips.
![image](/public/images/note/9160/8-3-advanced-load-balancer-exam-tips.png)
### 8.4 Autoscaling Groups Lab
TODO: labs. Create autoscaling group with 3 instances. Create 3 instances and terminate two, after a while, new two instances will be launched automatically.
![image](/public/images/note/9160/8-4-autoscaling-groups-1.png)
### 8.5 HA Architecture
![image](/public/images/note/9160/8-5-ha-architecture-1.png)
![image](/public/images/note/9160/8-5-ha-architecture-2.png)
* [The Netflix Simian Army](https://medium.com/netflix-techblog/the-netflix-simian-army-16e57fbab116)

![image](/public/images/note/9160/8-5-ha-architecture-3.png)
![image](/public/images/note/9160/8-5-ha-architecture-4.png)
![image](/public/images/note/9160/8-5-ha-architecture-5.png)
### 8.6 HA Word Press Site
TODO.
![image](/public/images/note/9160/8-6-wordpress-1.png)
### 8.7 Setting Up EC2
TODO.
![image](/public/images/note/9160/8-6-wordpress-122.png)
### 8.8 Adding Resilience And Autoscaling
![image](/public/images/note/9160/8-8-resilience-autoscaling-1.png)
TODO.
### 8.9 Cleaning Up
TODO.
### 8.10 CloudFormation
TODO.
![image](/public/images/note/9160/8-10-cloudformation-exam-tips.png)
### 8.11 Elastic Beanstalk
Create Elastic Beanstalk, Services->Compute->Elastic Beanstalk.
![image](/public/images/note/9160/8-11-elastic-beanstalk-1.png)
![image](/public/images/note/9160/8-11-elastic-beanstalk-2.png)
![image](/public/images/note/9160/8-11-elastic-beanstalk-3.png)
![image](/public/images/note/9160/8-11-elastic-beanstalk-4.png)
![image](/public/images/note/9160/8-11-elastic-beanstalk-5.png)
![image](/public/images/note/9160/8-11-elastic-beanstalk-6.png)
Instance is auto generated.
![image](/public/images/note/9160/8-11-elastic-beanstalk-7.png)
Test the web page.
![image](/public/images/note/9160/8-11-elastic-beanstalk-8.png)
Exam tips.
![image](/public/images/note/9160/8-11-elastic-beanstalk-exam-tips.png)
### 8.12 HA Summary
![image](/public/images/note/9160/8-12-ha-summary-1.png)
![image](/public/images/note/9160/8-12-ha-summary-2.png)
![image](/public/images/note/9160/8-12-ha-summary-3.png)
![image](/public/images/note/9160/8-12-ha-summary-4.png)
![image](/public/images/note/9160/8-12-ha-summary-5.png)
![image](/public/images/note/9160/8-12-ha-summary-6.png)
![image](/public/images/note/9160/8-12-ha-summary-7.png)
### 8.13 HA Architecture Quiz
![image](/public/images/note/9160/8-13-ha-quiz-1.png)
![image](/public/images/note/9160/8-13-ha-quiz-2.png)
![image](/public/images/note/9160/8-13-ha-quiz-3.png)
![image](/public/images/note/9160/8-13-ha-quiz-4.png)
![image](/public/images/note/9160/8-13-ha-quiz-5.png)
![image](/public/images/note/9160/8-13-ha-quiz-6.png)
![image](/public/images/note/9160/8-13-ha-quiz-7.png)
![image](/public/images/note/9160/8-13-ha-quiz-8.png)
![image](/public/images/note/9160/8-13-ha-quiz-9.png)
![image](/public/images/note/9160/8-13-ha-quiz-10.png)
![image](/public/images/note/9160/8-13-ha-quiz-11.png)
![image](/public/images/note/9160/8-13-ha-quiz-12.png)
![image](/public/images/note/9160/8-13-ha-quiz-13.png)
![image](/public/images/note/9160/8-13-ha-quiz-14.png)
![image](/public/images/note/9160/8-13-ha-quiz-15.png)
![image](/public/images/note/9160/8-13-ha-quiz-16.png)
## 9. Applications
### 9.1 SQS
![image](/public/images/note/9160/9-1-sqs-1.png)
Usage - Meme website.
![image](/public/images/note/9160/9-1-sqs-2.png)
Usage - Travel website.
![image](/public/images/note/9160/9-1-sqs-3.png)
![image](/public/images/note/9160/9-1-sqs-4.png)
![image](/public/images/note/9160/9-1-sqs-5.png)
Queue types.
![image](/public/images/note/9160/9-1-sqs-6.png)
Standard queue.
![image](/public/images/note/9160/9-1-sqs-7.png)
FIFO queue.
![image](/public/images/note/9160/9-1-sqs-8.png)
![image](/public/images/note/9160/9-1-sqs-9.png)
Exam tips.
![image](/public/images/note/9160/9-1-sqs-exam-tips-1.png)
![image](/public/images/note/9160/9-1-sqs-exam-tips-2.png)
![image](/public/images/note/9160/9-1-sqs-exam-tips-3.png)
### 9.2 SWF
### 9.3 SNS
### 9.4 Elastic Transcoder
### 9.5 API Gateway
### 9.6 Kinesis
### 9.7 Web Identity Federation & Cognito
### 9.8 Summary
### 9.9 Applications Quiz

## 10. Serverless
### 10.1 Lambda Concepts
### 10.2 Let's Build A Serverless Webpage
### 10.3 Let's Build An Alexa Skill
### 10.4 Summary
### 10.5 Serverless Quiz
### 10.6 CHAPTER 11

## 11. Good Luck!
### 11.1 Good Luck & How To Book Your Exam
### 11.2 Thank You and Next Steps
### 11.3 Practice Test 1
### 11.4 Practice Test 2

## 12. Reference
* [AWS Certified Solutions Architect Associate 2019](https://acloud.guru/learn/aws-certified-solutions-architect-associate)
