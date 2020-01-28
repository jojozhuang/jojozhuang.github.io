---
layout: tutorial
key: note
title: "AWS - Indexes"
index: 9550
subcategory: amazon-aws
date: 2017-08-04
tags: [AWS]
---

> Amazon AWS Document Indexes

## 1. AWS
### 1.1 AWS Management Console
* AWS Sign In: https://signin.aws.amazon.com

## 2. AWS Certifications
### 2.1 Introduction
* [AWS Certified Solutions Architect Associate 2019](https://acloud.guru/learn/aws-certified-solutions-architect-associate)
* [SAA-C01 Exam Guide](https://d1.awsstatic.com/training-and-certification/docs-sa-assoc/AWS_Certified_Solutions_Architect_Associate-Exam_Guide_EN_1.8.pdf)
* [Sample Questions](https://d1.awsstatic.com/training-and-certification/docs/AWS_Certified_Solutions_Architect_Associate_Sample_Questions.pdf)

## 3. AWS Documentations
### 3.1 FAQs
* [AWS IAM FAQs](https://aws.amazon.com/iam/faqs/)
* [Amazon S3 FAQs](https://aws.amazon.com/s3/faqs/)
* [Amazon EC2 FAQs](https://aws.amazon.com/ec2/faqs/)
* [Elastic Load Balancing FAQs](https://aws.amazon.com/elasticloadbalancing/faqs/)
* [Amazon Kinesis Data Streams FAQs](https://aws.amazon.com/kinesis/data-streams/faqs/)

### 3.2 Whitepapers
* [AWS Whitepapers & Guides](https://aws.amazon.com/whitepapers)

## 4. Comparison
### 4.1 Storage
S3 features:
* S3 is Object-based
* size of single file is from 0 byte to 5 TB.
* S3 name is unique globally.
* Using Bucket ACL or Bucket Policies to control access.
* Server Side Encryption: SSE-S3, SSE-KMS, SSE-C
* Versioning is supported, can't disable once enabled.
* CloudFront - CDN
* Snowball for Petabyte-scale data transport.
* Storage Gateway: File Gateway, Volume Gateway, Tape Gateway

S3 Storage Class:
* S3 Standard
* S3-IA
* S3 One Zone - IA
* S3 - Intelligent Tiering
* S3 Glacier
* S3 Glacier Deep Archive
* Lifecycle Policies

Comparison:
* S3 One Zone is not high available
* S3 One Zone is cheaper.
* Glacier is immutable.

IAM:
* IAM is universal.
* No permissions for new users.

CloudWatch is all about performance, whereas CloudTrail is all about auditing.

2) CloudTrail logs vs. VPC flow logs vs. S3 bucket logs vs. CloudWatch Logs
3) SSE-S3 vs. SSE-KMS

### 4.2 EC2
EC2 Pricing Models:
* On Demand
* Reserved
* Spot
* Dedicated Host

EBS:
* General Purpose SSD
* Provisioned IOPS SSD
* Throughput Optimized HDD
* Cold HDD
* EBS Magnetic

Security Group:
* Specify allow rules, but not deny rules.

BootStrap Scripts.

Instance MetaData & User Data

EFS

EC2 Placement Groups
* Clustered Placement Group:
* Spread Placement Group
* Partitioned Placement Group

### 4.3 Database
* RDS(OLTP): SQL, MySQL, PostgreSQL, Oracle, Aurora, MariaDB
* DynamoDB(NoSQL)
* Red Shift(OLAP) - Business Intelligence

Elastic Cache: Memcached, Redis

### 4.2 Network
1) Security Group vs. Network ACL
* You can only config allow rules in Security Group, you can't config deny rules.
* The change of security group impacts instance, whereas Network ACL impacts more.
* When config security group, you need only to set inbound, whereas you have to config inbound and outbound both for ACL.

2) NAT Instance vs. NAT Gateway vs VPC Endpoint
* All of them are used to enable internet access for private subnet.
* NAT Gateway has higher availability than NAT instance, though you can setup auto scaling group for NAT instances.
* VPC Endpoint(PrivateLink) is only for accessing the internal services, s3 and dynamoDB

3) CloudWatch vs. CloudTrail vs. VPC flow log
* Cloudtrial is used for monitoring the API calls made to a particular service or Application. It is primarily used to monitor API calls and is applicable for a selected services only.
* CloudWatch is used for logging events that happen on any particular AWS service. It is the default logging service provided by AWS and can be configured to detect Alarm conditions such as High CPU, Low Disk Space, Network Parameters etc.
* VPC flow log for network traffic

4) Interface Endpoint vs Gateway Endpoint
* Interface Endpoint is an ENI (think network card) within your VPC. It uses DNS record to direct your traffic to the private IP address of the interface.
* Gateway Endpoint uses route prefix in your route table to direct traffic meant for **S3 or DynamoDB** to the Gateway Endpoint (think 0.0.0.0/0 -> igw).
* Use Security Groups to secure your Interface Endpoint
* Use VPC Endpoint Policies to secure Gateway Endpoint.

5) CName vs. A Record vs. Alias

6) Route53
* Simple Routing
* Weighted Routing
* Latency-based Routing
* Failover Routing
* Geolocation Routing
* Geoproximity Routing(Traffic Flow Only)
* Multivalue Answer Routing

7) ELB: Elastic Load Balancer
* Application Load Balancer
* Network Load Balancer
* Classic Load Balancer

8) VPC
NAT Instances vs. NAT Gateways
9) Direct Connect
10) VPC Endpoint

CloudFormation, Elastic Beanstalk

SQS, SWF, SNS

Serverless, Lamda

## 5. Auto Scaling Group
### 5.1 Default Termination Policy
* Determine which Availability Zone(s) have the **most** instances, and at least one instance that is **not** protected from scale in.
* Determine whether any of the instances use the oldest launch template.
* Determine whether any of the instances use the oldest launch configuration.
* Determine which instances are closest to the next billing hour. (maximize the use of your instances that have an hourly charge)
* [Controlling Which Auto Scaling Instances Terminate During Scale In](https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-instance-termination.html)
