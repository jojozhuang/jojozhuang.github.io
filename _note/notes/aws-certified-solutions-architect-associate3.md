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
![image](/public/images/note/9160/9-2-swf-1.png)
SWF tasks.
![image](/public/images/note/9160/9-2-swf-2.png)
SWF vs. SQS
![image](/public/images/note/9160/9-2-swf-3.png)
SWF Actors.
![image](/public/images/note/9160/9-2-swf-4.png)
### 9.3 SNS
![image](/public/images/note/9160/9-3-sns-1.png)
![image](/public/images/note/9160/9-3-sns-2.png)
Topics.
![image](/public/images/note/9160/9-3-sns-3.png)
SNS Availability.
![image](/public/images/note/9160/9-3-sns-4.png)
SNS Benefits.
![image](/public/images/note/9160/9-3-sns-5.png)
SNS vs. SQS
![image](/public/images/note/9160/9-3-sns-6.png)
### 9.4 Elastic Transcoder
![image](/public/images/note/9160/9-4-elastic-transcoder-1.png)
![image](/public/images/note/9160/9-4-elastic-transcoder-2.png)
![image](/public/images/note/9160/9-4-elastic-transcoder-3.png)
### 9.5 API Gateway
![image](/public/images/note/9160/9-5-api-gateway-1.png)
![image](/public/images/note/9160/9-5-api-gateway-2.png)
How API Gateway works?
![image](/public/images/note/9160/9-5-api-gateway-3.png)
API Gateway Options.
![image](/public/images/note/9160/9-5-api-gateway-4.png)
API Gateway Configuration.
![image](/public/images/note/9160/9-5-api-gateway-5.png)
API Gateway Deployment.
![image](/public/images/note/9160/9-5-api-gateway-6.png)
API Gateway Caching.
![image](/public/images/note/9160/9-5-api-gateway-7.png)
How cache works?
![image](/public/images/note/9160/9-5-api-gateway-8.png)
Same origin policy. Cross-site-scripting(XSS).
![image](/public/images/note/9160/9-5-api-gateway-9.png)
CORS.
![image](/public/images/note/9160/9-5-api-gateway-10.png)
![image](/public/images/note/9160/9-5-api-gateway-11.png)
Exam tips.
![image](/public/images/note/9160/9-5-api-gateway-exam-tips.png)
### 9.6 Kinesis
Streaming data.
![image](/public/images/note/9160/9-6-kinesis-1.png)
Kinesis.
![image](/public/images/note/9160/9-6-kinesis-2.png)
Types of kinesis.
![image](/public/images/note/9160/9-6-kinesis-3.png)
Kinesis streaming.
![image](/public/images/note/9160/9-6-kinesis-4.png)
Kinesis streaming shards.
![image](/public/images/note/9160/9-6-kinesis-5.png)
Kinesis firehose. Data can be exported to S3, Redfhift or ElasticSearch.
![image](/public/images/note/9160/9-6-kinesis-6.png)
![image](/public/images/note/9160/9-6-kinesis-7.png)
Kinesis Analytics.
![image](/public/images/note/9160/9-6-kinesis-8.png)
Exam tips.
![image](/public/images/note/9160/9-6-kinesis-exam-tips.png)
### 9.7 Web Identity Federation & Cognito
Web Identity Federation.
![image](/public/images/note/9160/9-7-wif-1.png)
Cognito.
![image](/public/images/note/9160/9-7-wif-2.png)
Cognito Use case.
![image](/public/images/note/9160/9-7-wif-3.png)
![image](/public/images/note/9160/9-7-wif-4.png)
Cognito User Pools.
![image](/public/images/note/9160/9-7-wif-5.png)
Cognito Identity Pools.
![image](/public/images/note/9160/9-7-wif-6.png)
How they work?
![image](/public/images/note/9160/9-7-wif-7.png)
Cognito Synchronization.
![image](/public/images/note/9160/9-7-wif-8.png)
How Synchronization works?
![image](/public/images/note/9160/9-7-wif-9.png)
Cognito exam tips.
![image](/public/images/note/9160/9-7-wif-exam-tips-1.png)
![image](/public/images/note/9160/9-7-wif-exam-tips-2.png)
### 9.8 Summary
![image](/public/images/note/9160/9-8-summary-1.png)
![image](/public/images/note/9160/9-8-summary-2.png)
![image](/public/images/note/9160/9-8-summary-3.png)
![image](/public/images/note/9160/9-8-summary-4.png)
![image](/public/images/note/9160/9-8-summary-5.png)
![image](/public/images/note/9160/9-8-summary-6.png)
![image](/public/images/note/9160/9-8-summary-7.png)
![image](/public/images/note/9160/9-8-summary-8.png)
![image](/public/images/note/9160/9-8-summary-9.png)
![image](/public/images/note/9160/9-8-summary-10.png)
![image](/public/images/note/9160/9-8-summary-11.png)
![image](/public/images/note/9160/9-8-summary-12.png)
### 9.9 Applications Quiz
![image](/public/images/note/9160/9-9-application-quiz-1.png)
![image](/public/images/note/9160/9-9-application-quiz-2.png)
![image](/public/images/note/9160/9-9-application-quiz-3.png)
![image](/public/images/note/9160/9-9-application-quiz-4.png)
![image](/public/images/note/9160/9-9-application-quiz-5.png)
![image](/public/images/note/9160/9-9-application-quiz-6.png)
![image](/public/images/note/9160/9-9-application-quiz-7.png)
![image](/public/images/note/9160/9-9-application-quiz-8.png)
![image](/public/images/note/9160/9-9-application-quiz-9.png)
![image](/public/images/note/9160/9-9-application-quiz-10.png)
![image](/public/images/note/9160/9-9-application-quiz-11.png)
## 10. Serverless
### 10.1 Lambda Concepts
History of cloud: Data center->IAAS->PAAS->Containers->Serverless.
![image](/public/images/note/9160/10-1-lambda-1.png)
Lamda.
![image](/public/images/note/9160/10-1-lambda-2.png)
![image](/public/images/note/9160/10-1-lambda-3.png)
![image](/public/images/note/9160/10-1-lambda-4.png)
Lamda usage cases.
![image](/public/images/note/9160/10-1-lambda-5.png)
![image](/public/images/note/9160/10-1-lambda-6.png)
Traditional vs. Serverless Architecture
![image](/public/images/note/9160/10-1-lambda-7.png)
What languages does lamda support?
![image](/public/images/note/9160/10-1-lambda-8.png)
How lamda is priced?
![image](/public/images/note/9160/10-1-lambda-9.png)
Why lamda is cool?
![image](/public/images/note/9160/10-1-lambda-10.png)
Lamda exam tips.
![image](/public/images/note/9160/10-1-lambda-exam-tips-1.png)
![image](/public/images/note/9160/10-1-lambda-exam-tips-2.png)
### 10.2 Let's Build A Serverless Webpage
![image](/public/images/note/9160/10-2-build-serverless-1.png)
TODO lab.
### 10.3 Let's Build An Alexa Skill
TODO lab: Alexa.
### 10.4 Summary
![image](/public/images/note/9160/10-4-lamda-summary-1.png)
![image](/public/images/note/9160/10-4-lamda-summary-2.png)
![image](/public/images/note/9160/10-4-lamda-summary-3.png)
### 10.5 Serverless Quiz
![image](/public/images/note/9160/10-5-serverless-quiz-1.png)
![image](/public/images/note/9160/10-5-serverless-quiz-2.png)
![image](/public/images/note/9160/10-5-serverless-quiz-3.png)
![image](/public/images/note/9160/10-5-serverless-quiz-4.png)
![image](/public/images/note/9160/10-5-serverless-quiz-5.png)
![image](/public/images/note/9160/10-5-serverless-quiz-6.png)
![image](/public/images/note/9160/10-5-serverless-quiz-7.png)
![image](/public/images/note/9160/10-5-serverless-quiz-8.png)
![image](/public/images/note/9160/10-5-serverless-quiz-9.png)

## 11. Good Luck!
### 11.1 Good Luck & How To Book Your Exam
### 11.2 Thank You and Next Steps
### 11.3 Practice Test 1
![image](/public/images/note/9160/11-3-practice-1.png)
![image](/public/images/note/9160/11-3-practice-2.png)
![image](/public/images/note/9160/11-3-practice-3.png)
![image](/public/images/note/9160/11-3-practice-4.png)
![image](/public/images/note/9160/11-3-practice-5.png)
![image](/public/images/note/9160/11-3-practice-6.png)
![image](/public/images/note/9160/11-3-practice-7.png)
![image](/public/images/note/9160/11-3-practice-8.png)
![image](/public/images/note/9160/11-3-practice-9.png)
![image](/public/images/note/9160/11-3-practice-10.png)
![image](/public/images/note/9160/11-3-practice-11.png)
![image](/public/images/note/9160/11-3-practice-12.png)
![image](/public/images/note/9160/11-3-practice-13.png)
![image](/public/images/note/9160/11-3-practice-14.png)
![image](/public/images/note/9160/11-3-practice-15.png)
![image](/public/images/note/9160/11-3-practice-16.png)
![image](/public/images/note/9160/11-3-practice-17.png)
![image](/public/images/note/9160/11-3-practice-18.png)
![image](/public/images/note/9160/11-3-practice-19.png)
![image](/public/images/note/9160/11-3-practice-20.png)
![image](/public/images/note/9160/11-3-practice-21.png)
![image](/public/images/note/9160/11-3-practice-22.png)
![image](/public/images/note/9160/11-3-practice-23.png)
![image](/public/images/note/9160/11-3-practice-24.png)
![image](/public/images/note/9160/11-3-practice-25.png)
![image](/public/images/note/9160/11-3-practice-26.png)
![image](/public/images/note/9160/11-3-practice-27.png)
![image](/public/images/note/9160/11-3-practice-28.png)
![image](/public/images/note/9160/11-3-practice-29.png)
![image](/public/images/note/9160/11-3-practice-30.png)
![image](/public/images/note/9160/11-3-practice-31.png)
![image](/public/images/note/9160/11-3-practice-32.png)
![image](/public/images/note/9160/11-3-practice-33.png)
![image](/public/images/note/9160/11-3-practice-34.png)
![image](/public/images/note/9160/11-3-practice-35.png)
![image](/public/images/note/9160/11-3-practice-36.png)
![image](/public/images/note/9160/11-3-practice-37.png)
![image](/public/images/note/9160/11-3-practice-38.png)
![image](/public/images/note/9160/11-3-practice-39.png)
![image](/public/images/note/9160/11-3-practice-40.png)
![image](/public/images/note/9160/11-3-practice-41.png)
![image](/public/images/note/9160/11-3-practice-42.png)
![image](/public/images/note/9160/11-3-practice-43.png)
![image](/public/images/note/9160/11-3-practice-44-1.png)
![image](/public/images/note/9160/11-3-practice-44-2.png)
![image](/public/images/note/9160/11-3-practice-45.png)
![image](/public/images/note/9160/11-3-practice-46.png)
![image](/public/images/note/9160/11-3-practice-47.png)
![image](/public/images/note/9160/11-3-practice-48.png)
![image](/public/images/note/9160/11-3-practice-49.png)
![image](/public/images/note/9160/11-3-practice-50.png)
![image](/public/images/note/9160/11-3-practice-51-1.png)
![image](/public/images/note/9160/11-3-practice-51-2.png)
![image](/public/images/note/9160/11-3-practice-52.png)
![image](/public/images/note/9160/11-3-practice-53.png)
![image](/public/images/note/9160/11-3-practice-54.png)
![image](/public/images/note/9160/11-3-practice-55.png)
![image](/public/images/note/9160/11-3-practice-56.png)
![image](/public/images/note/9160/11-3-practice-57.png)
![image](/public/images/note/9160/11-3-practice-58.png)
![image](/public/images/note/9160/11-3-practice-59.png)
![image](/public/images/note/9160/11-3-practice-60.png)
![image](/public/images/note/9160/11-3-practice-61-1.png)
![image](/public/images/note/9160/11-3-practice-61-2.png)
![image](/public/images/note/9160/11-3-practice-62-1.png)
![image](/public/images/note/9160/11-3-practice-62-2.png)
![image](/public/images/note/9160/11-3-practice-63.png)
![image](/public/images/note/9160/11-3-practice-64.png)
### 11.4 Practice Test 2
![image](/public/images/note/9160/11-4-practice-1.png)
![image](/public/images/note/9160/11-4-practice-2.png)
![image](/public/images/note/9160/11-4-practice-3.png)
![image](/public/images/note/9160/11-4-practice-4.png)
![image](/public/images/note/9160/11-4-practice-5.png)
![image](/public/images/note/9160/11-4-practice-6.png)
![image](/public/images/note/9160/11-4-practice-7.png)
![image](/public/images/note/9160/11-4-practice-8.png)
![image](/public/images/note/9160/11-4-practice-9.png)
![image](/public/images/note/9160/11-4-practice-10.png)
![image](/public/images/note/9160/11-4-practice-11.png)
![image](/public/images/note/9160/11-4-practice-12.png)
![image](/public/images/note/9160/11-4-practice-13.png)
![image](/public/images/note/9160/11-4-practice-14.png)
![image](/public/images/note/9160/11-4-practice-15.png)
![image](/public/images/note/9160/11-4-practice-16.png)
![image](/public/images/note/9160/11-4-practice-17.png)
![image](/public/images/note/9160/11-4-practice-18.png)
![image](/public/images/note/9160/11-4-practice-19.png)
![image](/public/images/note/9160/11-4-practice-20.png)
![image](/public/images/note/9160/11-4-practice-21.png)
![image](/public/images/note/9160/11-4-practice-22.png)
![image](/public/images/note/9160/11-4-practice-23.png)
![image](/public/images/note/9160/11-4-practice-24.png)
![image](/public/images/note/9160/11-4-practice-25.png)
![image](/public/images/note/9160/11-4-practice-26.png)
![image](/public/images/note/9160/11-4-practice-27-1.png)
![image](/public/images/note/9160/11-4-practice-27-2.png)
![image](/public/images/note/9160/11-4-practice-28-1.png)
![image](/public/images/note/9160/11-4-practice-28-2.png)
![image](/public/images/note/9160/11-4-practice-29.png)
![image](/public/images/note/9160/11-4-practice-30.png)
![image](/public/images/note/9160/11-4-practice-31.png)
![image](/public/images/note/9160/11-4-practice-32.png)
![image](/public/images/note/9160/11-4-practice-33.png)
![image](/public/images/note/9160/11-4-practice-34.png)
![image](/public/images/note/9160/11-4-practice-35.png)
![image](/public/images/note/9160/11-4-practice-36.png)
![image](/public/images/note/9160/11-4-practice-37.png)
![image](/public/images/note/9160/11-4-practice-38-1.png)
![image](/public/images/note/9160/11-4-practice-38-2.png)
![image](/public/images/note/9160/11-4-practice-39.png)
![image](/public/images/note/9160/11-4-practice-40.png)
![image](/public/images/note/9160/11-4-practice-41.png)
![image](/public/images/note/9160/11-4-practice-42.png)
![image](/public/images/note/9160/11-4-practice-43.png)
![image](/public/images/note/9160/11-4-practice-44.png)
![image](/public/images/note/9160/11-4-practice-45-1.png)
![image](/public/images/note/9160/11-4-practice-45-2.png)
![image](/public/images/note/9160/11-4-practice-46.png)
![image](/public/images/note/9160/11-4-practice-47.png)
![image](/public/images/note/9160/11-4-practice-48.png)
![image](/public/images/note/9160/11-4-practice-49.png)
![image](/public/images/note/9160/11-4-practice-50.png)
![image](/public/images/note/9160/11-4-practice-51.png)
![image](/public/images/note/9160/11-4-practice-52.png)
![image](/public/images/note/9160/11-4-practice-53.png)
![image](/public/images/note/9160/11-4-practice-54.png)
![image](/public/images/note/9160/11-4-practice-55.png)
![image](/public/images/note/9160/11-4-practice-56.png)
![image](/public/images/note/9160/11-4-practice-57.png)
![image](/public/images/note/9160/11-4-practice-58.png)
![image](/public/images/note/9160/11-4-practice-59.png)
![image](/public/images/note/9160/11-4-practice-60.png)
![image](/public/images/note/9160/11-4-practice-61.png)
