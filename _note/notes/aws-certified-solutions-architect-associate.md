---
layout: tutorial
key: note
title: "AWS - Certified Solutions Architect Associate - draft"
index: 9160
subcategory: notes
date: 2017-08-04
tags: [AWS]
draft: true
---

> AWS Certified Solutions Architect Associate 2019

## 1. Introduction
### 1.1 Introduction
* Course: https://acloud.guru/learn/aws-certified-solutions-architect-associate
* AWS Sign In: https://signin.aws.amazon.com

### 1.2 The Exam Blue Print
Home page of CSAA on AWS: https://aws.amazon.com/certification/certified-solutions-architect-associate/
### 1.3 Why Should I Learn AWS?
Empty.

## 2. AWS - 10,000 Foot Overview
### 2.1 The History Of AWS
* AWS launched in 2006.
* Certifications was launched in 2013.
* 10 different certs until 2019.

### 2.2 AWS - 10,000 Foot Overview
AWS Console 2016.
![image](/public/images/note/9160/2-2-aws-console-2016.png)
AWS Console 2017.
![image](/public/images/note/9160/2-2-aws-console-2017.png)
AWS Console 2019.
![image](/public/images/note/9160/2-2-aws-console-2019.png)
AWS High Level Services.
![image](/public/images/note/9160/2-2-aws-high-level-services.png)
Data Center and availabilities.
![image](/public/images/note/9160/2-2-aws-data-center-availabilities.png)
Region.
![image](/public/images/note/9160/2-2-aws-region.png)
Current regions divided by georigion.
![image](/public/images/note/9160/2-2-aws-region2.png)
Edge location.
![image](/public/images/note/9160/2-2-aws-edge-location.png)
Services need to know to pass the CSAA.
![image](/public/images/note/9160/2-2-services-need-to-know.png)
Core Services need to know to pass the CSAA.
![image](/public/images/note/9160/2-2-services-need-to-know2.png)
Exam tips.
* Region
* Availability Zone
* Edge Location

![image](/public/images/note/9160/2-2-exam-tips.png)
### 2.3 How To Sign Up To AWS
Empty.
### 2.4 10,000 Foot Overview Quiz
Quiz:
* Both `Lambda` and `EC2` offer computing in the cloud. `S3` is a storage offering while `VPC` is a network service.
* `VPC` allows you to provision a logically isolated section of the AWS where you can launch AWS resources in a virtual network. Cloudfront is a fast, highly secure and programmable content delivery network (CDN). EC2 provides compute resources while RDS is Amazon's Relational Database System.
* `CloudFront` content is cached in Edge Locations.
* A `region` is a geographical area divided into `Availability Zones`. Each region contains at least two Availability Zones.
* A `Virtual Private Cloud (VPC)` is a virtual network dedicated to a single AWS account. It is logically isolated from other virtual networks in the AWS cloud, providing compute resources with security and robust networking functionality.
* Each `region` is a separate geographic area. Each region has multiple, isolated locations known as Availability Zones.
* An `Availability Zone` (AZ) is a distinct location within an AWS Region. Each Region comprises at least two AZs.
* `Public cloud` allows organisations to try out new ideas, new approaches and experiment with little upfront commitment. If it doesn't work out, organisations have the ability to terminate the resources and stop paying for them.
* `RDS` is a service for relational databases provided by AWS. `DynamoDB` is AWS' fast, flexible, no-sql database service. `S3` provides the ability to store files in the cloud and is not suitable for databases, while `EC2` is part of the compute family of services.
* `S3` and `EFS` both provide the ability to store files in the cloud. EC2 provides compute, and is often augmented with other storage services. VPC is a networking service.

## 3. Identity Access Management & S3
### 3.1 IAM 101
Identity Access Management.
![image](/public/images/note/9160/3-1-iam-features.png)
Key Terminologies.
* Users
* Groups
* Policies(Permissions)
* Roles

![image](/public/images/note/9160/3-1-iam-terminologies.png)

### 3.2 IAM Lab
QR Code for MFA.
![image](/public/images/note/9160/3-2-iam-qrcode.png)
Problem with the MFA setup.
![image](/public/images/note/9160/3-2-iam-mfa-setup-problem.png)
* [Problem with AWS MFA setup](https://help.acloud.guru/hc/en-us/articles/360000782135-Problem-with-AWS-MFA-setup)

Exam Tips.
![image](/public/images/note/9160/3-2-exam-tips.png)
![image](/public/images/note/9160/3-2-exam-tips2.png)
### 3.3 Create A Billing Alarm
Top Menu -> johnnyaws-> My Billing Address.

![image](/public/images/note/9160/3-3-billing-dashboard.png)
Billing preferences.
![image](/public/images/note/9160/3-3-billing-preferences.png)
Top Menu -> Services->CloudWatch, then Alarms->Billing->Create alarm.

### 3.4 S3 101
S3 Objects.
![image](/public/images/note/9160/3-4-s3-objects.png)
Data consistency.
![image](/public/images/note/9160/3-4-s3-data-consistency.png)
S3 Features.
![image](/public/images/note/9160/3-4-s3-features.png)
S3 Storage Classes.
![image](/public/images/note/9160/3-4-s3-storage-classes.png)
S3 Storage Classes2.
![image](/public/images/note/9160/3-4-s3-storage-classes2.png)
S3 Storage Comparison.
![image](/public/images/note/9160/3-4-s3-storage-comparison.png)
S3 Storage Charge.
![image](/public/images/note/9160/3-4-s3-storage-charge.png)
Exam tips.
![image](/public/images/note/9160/3-4-s3-storage-exam-tips.png)
![image](/public/images/note/9160/3-4-s3-storage-exam-tips2.png)
![image](/public/images/note/9160/3-4-s3-storage-exam-tips3.png)
![image](/public/images/note/9160/3-4-s3-storage-exam-tips4.png)
![image](/public/images/note/9160/3-4-s3-storage-exam-tips5.png)
* [Amazon S3 FAQs](https://aws.amazon.com/s3/faqs/)

### 3.5 Let's Create An S3 Bucket
Create Bucket.
![image](/public/images/note/9160/3-5-create-s3-bucket.png)
![image](/public/images/note/9160/3-5-create-s3-bucket-config.png)
![image](/public/images/note/9160/3-5-create-s3-bucket-permission.png)
Upload files to bucket.
![image](/public/images/note/9160/3-5-upload-file.png)
![image](/public/images/note/9160/3-5-upload-file-permission.png)
![image](/public/images/note/9160/3-5-upload-file-properties.png)
Publish file.
![image](/public/images/note/9160/3-5-file-link.png)
https://johnnyawsguru-s3-01.s3.amazonaws.com/IMG_5807.JPG
![image](/public/images/note/9160/3-5-file-access-denied.png)
Public bucket.
![image](/public/images/note/9160/3-5-public-bucket.png)
Then, public file.
![image](/public/images/note/9160/3-5-public-file.png)
Now, the file is accessible.
![image](/public/images/note/9160/3-5-public-file-success.png)
Change storage class for one file. Click on the file, switch to 'Properties' tab -> Storage Class.
![image](/public/images/note/9160/3-5-change-storage-class.png)
Exam tips.
![image](/public/images/note/9160/3-5-exam-tips.png)
### 3.6 S3 Security And Encryption
S3 bucket.
![image](/public/images/note/9160/3-6-s3-basics.png)
S3 encryption.
![image](/public/images/note/9160/3-6-s3-encryption.png)
Change encryption type of file.
![image](/public/images/note/9160/3-6-change-encryption-type.png)
![image](/public/images/note/9160/3-6-change-encryption-type2.png)
### 3.7 S3 Version Control
![image](/public/images/note/9160/3-7-s3-versioning.png)
Exam tips.
![image](/public/images/note/9160/3-7-s3-versioning-exam.png)
### 3.8 S3 Lifecycle Management and Glacier
Bucket->Management->Lifecycle, add Lifecycle rule.
![image](/public/images/note/9160/3-8-create-lifecycle-rule-1.png)
Set transitions.
![image](/public/images/note/9160/3-8-create-lifecycle-rule-transitions.png)
Expiration.
![image](/public/images/note/9160/3-8-create-lifecycle-rule-expiration.png)
Save and done.
![image](/public/images/note/9160/3-8-create-lifecycle-rule-done.png)
Exam tips.
![image](/public/images/note/9160/3-8-lifecycle-rule-exam-tips.png)
### 3.9 Cross Region Replication
Bucket->Management->Replication, add rule.
![image](/public/images/note/9160/3-9-create-replication-rule-source.png)
Set destination, Create new bucket.
![image](/public/images/note/9160/3-9-create-replication-rule-destination.png)
Rule options, create new role.
![image](/public/images/note/9160/3-9-create-replication-rule-role.png)
Done.
![image](/public/images/note/9160/3-9-create-replication-rule-done.png)
Nothing in the new bucket.
![image](/public/images/note/9160/3-9-new-replication-bucket.png)
Try to add and remove some versions to see the impact.
![image](/public/images/note/9160/3-9-new-replication-bucket-replicated.png)
Exam tips.
![image](/public/images/note/9160/3-9-replication-rule-exam-tips.png)
### 3.10 Transfer Acceleration
![image](/public/images/note/9160/3-10-s3-transfer-acceleration.png)

[Amazon S3 Transfer Acceleration Speed Comparison](https://s3-accelerate-speedtest.s3-accelerate.amazonaws.com/en/accelerate-speed-comparsion.html)
![image](/public/images/note/9160/3-10-transfer-acceleration-speed-comparison.png)
![image](/public/images/note/9160/3-10-transfer-acceleration-speed-comparison2.png)

### 3.11 CloudFront Overview
![image](/public/images/note/9160/3-11-s3-cloudfront.png)
CloundFront Terminologies.
![image](/public/images/note/9160/3-11-s3-cloudfront-terminologies.png)
What is CloudFront?
![image](/public/images/note/9160/3-11-s3-what-is-cloudfront.png)
CloundFront Terminologies2.
![image](/public/images/note/9160/3-11-s3-cloudfront-terminologies2.png)
Exam tips.
![image](/public/images/note/9160/3-11-s3-cloudfront-exam-tips.png)
![image](/public/images/note/9160/3-11-s3-cloudfront-exam-tips2.png)
### 3.12 CloudFront Lab
Services->Networking & Content Delivery->CloudFront, click "Create distribution", select "Web", then select the S3 bucket to distribute.
![image](/public/images/note/9160/3-12-cloundfront-create-distribution.png)
Some settings:
* Restrict View Access
* TTL

Keep the default settings, create distribution.
![image](/public/images/note/9160/3-12-cloundfront-create-distribution-in-progress.png)


### 3.13 Snowball Overview
Snowball.
![image](/public/images/note/9160/3-13-snowball.png)
Snowball Edge.
![image](/public/images/note/9160/3-13-snowball-edge.png)
Snowball Mobile.
![image](/public/images/note/9160/3-13-snowball-mobile.png)
When to use Snowball.
![image](/public/images/note/9160/3-13-snowball-when-to-use.png)
Exam tips.
![image](/public/images/note/9160/3-13-snowball-exam-tips.png)
### 3.14 Snowball Lab
### 3.15 Storage Gateway
### 3.16 Identity Access Management & S3 Summary
### 3.17 Identity Access Management & S3 Quiz

## 4. EC2
### 4.1 EC2 101
### 4.2 Let's Get Our Hands Dirty With EC2 - Part 1
### 4.3 Let's Get Our Hands Dirty With EC2 - Part 2
### 4.4 Security Groups Basics
### 4.5 EBS 101
### 4.6 Volumes & Snapshots
### 4.7 AMI Types (EBS vs Instance Store)
### 4.8 Encrypted Root Device Volumes & Snapshots
### 4.9 CloudWatch 101
### 4.10 CloudWatch Lab
### 4.11 The AWS Command Line
### 4.12 Using IAM Roles With EC2
### 4.13 Using Boot Strap Scripts
### 4.14 EC2 Instance Meta Data
### 4.15 Elastic File System
### 4.16 EC2 Placement Groups
### 4.17 EC2 Summary
### 4.18 EC2 Quiz

## 5. Databases On AWS
### 5.1 Databases 101
### 5.2 Let's Create An RDS Instance
### 5.3 RDS Backups, Multi-AZ & Read Replicas
### 5.4 RDS Backups, Multi-AZ & Read Replicas - Lab
### 5.5 DynamoDB
### 5.6 Redshift
### 5.7 Aurora
### 5.8 Elasticache
### 5.9 Databases Summary
### 5.10 Databases On AWS Quiz

## 6. Route53
### 6.1 DNS 101
### 6.2 Route53 - Register A Domain Name Lab
### 6.3 Route53 Routing Policies Available On AWS
### 6.4 Simple Routing Policy Lab
### 6.5 Weighted Routing Policy Lab
### 6.6 Latency Routing Policy
### 6.7 Failover Routing Policy
### 6.8 Geolocation Routing Policy
### 6.9 Geoproximity Routing Policy (Traffic Flow Only)
### 6.10 Multivalue Answer
### 6.12 Route53 Summary
### 6.13 Route 53 Quiz

## 7. VPCs
### 7.1 Introduction To VPCs
### 7.2 Build A Custom VPC - Part 1
### 7.3 Build A Custom VPC - Part 2
### 7.4 Network Address Translation (NAT)
### 7.5 Access Control Lists (ACL)
### 7.6 Custom VPCs and ELBs
### 7.7 VPC Flow Logs
### 7.8 Bastions
### 7.9 Direct Connect
### 7.10 VPC End Points
### 7.11 Summary
### 7.12 VPCs Quiz

## 8. HA Architecture
### 8.1 Load Balancers Theory
### 8.2 Load Balancers And Health Checks Lab
### 8.3 Advanced Load Balancer Theory
### 8.4 Autoscaling Groups Lab
### 8.5 HA Architecture
### 8.6 HA Word Press Site
### 8.7 Setting Up EC2
### 8.8 Adding Resilience And Autoscaling
### 8.9 Cleaning Up
### 8.10 CloudFormation
### 8.11 Elastic Beanstalk
### 8.12 HA Summary
### 8.13 HA Architecture Quiz

## 9. Applications
### 9.1 SQS
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
