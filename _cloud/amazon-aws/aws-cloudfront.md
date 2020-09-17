---
layout: tutorial
key: cloud
title: "AWS-CloudFront"
index: 4112
subcategory: amazon-aws
date: 2019-09-16
tags: [AWS, CloudFront, CND]
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

### 1.5 Invalidating Files
If you need to remove a file from CloudFront edge caches before it expires, you can do one of the following:
* Invalidate the file from edge caches. The next time a viewer requests the file, CloudFront returns to the origin to fetch the latest version of the file.
* Use file versioning to serve a different version of the file that has a different name.

To invalidate files, you can specify either the path for individual files or a path that ends with the * wildcard, which might apply to one file or to many, as shown in the following examples:
* /images/image1.jpg
* /images/image*
* /images/*

## 2. Lab - CloudFront
### 2.1 Creating CloudFront Distribution
Go to Services->Networking & Content Delivery->CloudFront, or visit https://console.aws.amazon.com/cloudfront/, click "Create distribution".
![image](/assets/images/cloud/4112/cloudfront-home.png)
Select "Web", get started.
![image](/assets/images/cloud/4112/cloudfront-web.png)
Then set the S3 bucket to distribute.
![image](/assets/images/cloud/4112/cloudfront-create-distribution.png)
Some settings:
* Restrict Viewer Access - Choose whether you want CloudFront to require users to access your content using a `signed URL` or a  `signed cookie`. Additional configuration is required. In the Help, see "Serving Private Content through CloudFront".

Keep the default settings, create distribution.
![image](/assets/images/cloud/4112/cloudfront-create-distribution-in-progress.png)
Wait for few minutes until the deployment is done.
![image](/assets/images/cloud/4112/cloudfront-create-distribution-enabled.png)
Copy the domain name, which is 'digq5vi21aheh.cloudfront.net' here.
### 2.2 Testing CloudFront Distribution
There are two images files in the original bucket. Visit the first one, http://digq5vi21aheh.cloudfront.net/IMG_5807.JPG, you will get the "InvalidArgument" error. This is because the file is encrypted with AWS KMS.
![image](/assets/images/cloud/4112/cloudfront-distributed-encrypted-file.png)
Access the second file, http://digq5vi21aheh.cloudfront.net/IMG_5819.JPG, succeeded.
![image](/assets/images/cloud/4112/cloudfront-distributed-file.png)
### 2.3 Creating Invalidation
Select the CloudFront Distribution, then "Create Invalidation".
![image](/assets/images/cloud/4112/cloudfront-distribution-invalidation.png)
Set the file path, then "Invalidate".
![image](/assets/images/cloud/4112/cloudfront-distribution-invalidating-file-path.png)

## 3. References
* [Amazon CloudFront](https://aws.amazon.com/cloudfront)
* [Amazon CloudFront FAQs](https://aws.amazon.com/cloudfront/faqs/)
* [Invalidating Files](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Invalidation.html)
