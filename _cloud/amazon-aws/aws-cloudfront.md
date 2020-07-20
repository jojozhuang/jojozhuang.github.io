---
layout: tutorial
key: cloud
title: "AWS-CloudFront"
index: 4104
subcategory: amazon-aws
date: 2019-09-16
tags: [CloudFront, CND]
---

> Using CloudFront for caching files.

## 1. CND & CloudFront
### 1.1 What is CDN?
A content delivery network or content distribution network is a geographically distributed network of proxy servers and their data centers. The goal is to provide high availability and high performance by distributing the service spatially relative to end-users.
### 1.2 What is CloudFront?
* Amazon CloudFront is a fast content delivery network (CDN) service that securely delivers data, videos, applications, and APIs to customers globally with low latency, high transfer speeds, all within a developer-friendly environment.
* CloudFront is integrated with AWS – both physical locations that are directly connected to the AWS global infrastructure, as well as other AWS services.
* CloudFront works seamlessly with services including AWS Shield for DDoS mitigation, Amazon S3, Elastic Load Balancing or Amazon EC2 as origins for your applications, and Lambda@Edge to run custom code closer to customers’ users and to customize the user experience.
* Lastly, if you use AWS origins such as Amazon S3, Amazon EC2 or Elastic Load Balancing, you don’t pay for any data transferred between these services and CloudFront.

### 1.3 Key Terminology of CloudFront
* `Edge Location` - This is the location where content will be cached. This is separate to an AWS Region/AZ.
* `Origin` - This is the origin of all the files that the CDN will distribute. This can be an S3 bucket, an EC2 Instance, an Elastic Load Balancer, or Route53.
* `Distribution` - This is the name given the CDN which consists of collection of Edge Locations.
* `Web Distribution` - Typically used for Websites.
* `RTMP` - Used for Media Streaming.

### 1.4 Features of CloudFront
* Edge locations are not just READ only - you can write to them too.(Ie put an object on to them.)
* Objects are cached for the life of the TTL(Time To Live.)
* You can clear cached objects, but you will be charged.

## 2. CloudFront Lab
### 2.1 Creating CloudFront Distribution
Go to Services->Networking & Content Delivery->CloudFront, or visit https://console.aws.amazon.com/cloudfront/, click "Create distribution".
![image](/assets/images/cloud/4104/cloudfront-home.png)
Select "Web", get started.
![image](/assets/images/cloud/4104/cloudfront-web.png)
Then select the S3 bucket to distribute.
![image](/assets/images/note/9551/3-12-cloundfront-create-distribution.png)
Some settings:
* Restrict View Access
* TTL

Keep the default settings, create distribution.
![image](/assets/images/note/9551/3-12-cloundfront-create-distribution-in-progress.png)
Wait for few minutes until the deployment is done.
![image](/assets/images/note/9551/3-12-cloundfront-create-distribution-enabled.png)
Copy the domain name, which is 'digq5vi21aheh.cloudfront.net' here.
### 2.2 Testing CloudFront Distribution
There are two images files in the original bucket.

Access the first one, http://digq5vi21aheh.cloudfront.net/IMG_5807.JPG, failed. because this file is encrypted with AWS KMS.
![image](/assets/images/note/9551/3-12-cloundfront-distributed-encrypted-file.png)
Access the second file, http://digq5vi21aheh.cloudfront.net/IMG_5819.JPG, succeeded.
![image](/assets/images/note/9551/3-12-cloundfront-distributed-file.png)
### 2.3 Creating Invalidation
Create invalidation for distribution.
![image](/assets/images/note/9551/3-12-cloundfront-distribution-invalidation.png)

## 3. References
* [Amazon CloudFront](https://aws.amazon.com/cloudfront)
* [Amazon CloudFront FAQs](https://aws.amazon.com/cloudfront/faqs/)
