---
layout: tutorial
key: cloud
title: "AWS-Overview-Draft"
index: 3801
subcategory: amazon-aws
date: 2019-09-15
tags: [AWS]
draft: true
---

> Amazon AWS Tutorial

## 1. AWS


### 3.16 Identity Access Management & S3 Summary
![image](/assets/images/note/9551/3-16-s3-exam-tips-1.png)
![image](/assets/images/note/9551/3-16-s3-exam-tips-2.png)
S3 Summary:
* S3 is Object-based.
* Files can be form 0 Bytes to 5TB.
* There is unlimited storage.
* Files are stored in Buckets.
* S3 is a universal namespace. That is, names must be unique globally.
* Example Bucket url: https://s3.console.aws.amazon.com/s3/buckets/johnnyawsguru-s3-01
* Not suitable to install an operating system on.
* Successful uploads will generate a HTTP 200 status code.

Key Fundamentals of S3:
* Key(This is simply the name of the object)
* Value(This is simply the data and is made up of a sequence of bytes).
* Version ID(Important for versioning)
* Metadata(Data about data you are storing)
* Read after Write consistency for PUTS of new objects
* Eventual Consistency for overwrite PUTS and DELETES(can take some time to propagate)

Performance across the S3 Storage Classes

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


## 9. References
* [Amazon S3 Storage Classes](https://aws.amazon.com/s3/storage-classes/)
