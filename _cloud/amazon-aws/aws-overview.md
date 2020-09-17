---
layout: tutorial
key: cloud
title: "AWS-Overview"
index: 4101
subcategory: amazon-aws
date: 2019-09-15
tags: [AWS]
---

> Amazon AWS Tutorial

## 1. AWS Components
Some of the most popular components/services on AWS.

 Name      | Short Description              | Usage
-----------|--------------------------------|-------------------
S3         | Object-based Storage           | Object Storage(files, pictures, videos, etc)
EC2        | Elastic Computing Service      | Computing service for applications
EBS        | Elastic Block Store            | Block storage for ec2
IAM        | Identity and Access Management | Access control, user, role, group, permissions
CloudWatch | logging serivce                | For performance
CloudTrail | logging service                | For auditing
Route53    | Domain Service                 | Domain, Routing Strategy(Simple, Weighted, Latency, Failover, Geolocation, etc)
CloudFront | CDN Service                    | Improving access speed
ELB        | Elastic Load Balancer          | Load balancing, Application, NetWork, Classic
VPC        | Virtual Private Cloud          | Direct Connect, VPC Endpoint
Aurora     | Relational Database            | Relational Database
AWS RDS    | Relational Database            | PostgreSQL, MySQL, MariaDB, Oracle, SQL Server
DynamoDB   | No-SQL database                | Key-value database
Cassandra  | No-SQL database                | Wide column database
SQS        | Simple Queue Service           | Message queuing service(Kafka), Standard Queue(deliver at least once); FIFO(guarantee once)
SNS        | Simple Notification Service    | Notification, text, email.
SWF        | Simple Workflow Service        | Media processing, web application back-ends, business process workflows, etc
Elastic Beanstalk  | Orchestration Service  | For deploying applications
Lambda     | Serverless computing platform  | Event-driven, manages the computing resources automatically

## 2. Storage - S3
### 2.1 S3 Features
* S3 is Object-based
* Size of single file is from 0 byte to 5 TB.
* S3 name is unique globally.
* Using Bucket ACL or Bucket Policies to control access.
* Server Side Encryption: SSE-S3, SSE-KMS, SSE-C
* Versioning is supported, can't disable once enabled.
* CloudFront - CDN
* Snowball for Petabyte-scale data transport.
* Storage Gateway: File Gateway, Volume Gateway, Tape Gateway

### 2.2 S3 Storage Class
* S3 Standard
* S3-IA
* S3 One Zone - IA
* S3 - Intelligent Tiering
* S3 Glacier
* S3 Glacier Deep Archive

### 2.3 Comparison
* S3 One Zone is not high available
* S3 One Zone is cheaper.
* Glacier is immutable.

### 2.4 S3 Summary
* S3 is Object-based.
* Files can be form 0 Bytes to 5TB.
* There is unlimited storage.
* Files are stored in Buckets.
* S3 is a universal namespace. That is, names must be unique globally.
* Example Bucket url: https://s3.console.aws.amazon.com/s3/buckets/johnnyawsguru-s3-01
* Not suitable to install an operating system on.
* Successful uploads will generate a HTTP 200 status code.

### 2.5 Key Fundamentals of S3
* Key(This is simply the name of the object)
* Value(This is simply the data and is made up of a sequence of bytes).
* Version ID(Important for versioning)
* Metadata(Data about data you are storing)
* Read after Write consistency for PUTS of new objects
* Eventual Consistency for overwrite PUTS and DELETES(can take some time to propagate)

### 2.6 Performance across the S3 Storage Classes

||S3 Standard|S3 Intelligent-Tiering*|S3 Standard-IA|S3 One Zone-IA|S3 Glacier|S3 Glacier Deep Archive|
|-|----------|-----------------------|--------------|---------------|----------|-----------------------|
|Designed for durability|99.999999999% (11 9’s)|99.999999999% (11 9’s)|99.999999999% (11 9’s)|99.999999999% (11 9’s)|99.999999999% (11 9’s)|99.999999999% (11 9’s)|
|Designed for availability|99.99%|99.9%|99.9%|99.5%|99.99%|99.99%|
|Availability SLA|99.9%|99%|99%|99%|99.9%|99.9%|
|Availability Zones|≥3|≥3|≥3|1|≥3|≥3|
|Minimum capacity charge per object|N/A|N/A|128KB|128KB|40KB|40KB|
|Minimum storage duration charge|N/A|30 days|30 days|30 days|90 days|180 days|
|Retrieval fee|N/A|N/A|per GB retrieved|per GB retrieved|per GB retrieved|per GB retrieved|
|First byte latency|milliseconds|millseconds|milliseconds|milliseconds|select minutes or hours|select hours|
|Storage type|Object|Object|Object|Object|Object|Object|
|Lifecycle transitions|Yes|Yes|Yes|Yes|Yes|Yes|

### 2.7 Identity Access Management(IAM)
* IAM is universal. It does not apply to regions at this time.
* The "root account" is simply the account created when first setup your AWS account. It has complete Admin access.
* New Users have NO permissions when first created.
* New Users are assigned Access Key ID & Secret Access Keys when first created.
* These are not the same as a password. You cannot use the Access key ID & Secret Access Key to Login in to the console. You can use this to access AWS via the APIs and Command Line, however.
* You only get to view these once. If you lose them, you have to regenerate them. So, save them in a secure location.

### 2.8 Others
* CloudWatch is all about performance, whereas CloudTrail is all about auditing.
* CloudTrail logs vs. VPC flow logs vs. S3 bucket logs vs. CloudWatch Logs
* SSE-S3 vs. SSE-KMS

## 3. Computing - EC2
### 3.1 EC2 Pricing Models
* On Demand
* Reserved
* Spot
* Dedicated Host

### 3.2 EBS
* General Purpose SSD
* Provisioned IOPS SSD
* Throughput Optimized HDD
* Cold HDD
* EBS Magnetic

### 3.3 EC2 Placement Groups
* Clustered Placement Group:
* Spread Placement Group
* Partitioned Placement Group

### 3.4 Key Concepts
* Security Group: Specify allow rules, but not deny rules.
* BootStrap Scripts.
* Instance MetaData & User Data
* EFS

## 4. References
* [Amazon AWS](https://aws.amazon.com/)
* [Amazon S3 Storage Classes](https://aws.amazon.com/s3/storage-classes/)
