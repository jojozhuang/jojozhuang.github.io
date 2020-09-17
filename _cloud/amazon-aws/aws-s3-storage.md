---
layout: tutorial
key: cloud
title: "AWS-S3 Storage"
index: 4111
subcategory: amazon-aws
date: 2019-09-16
tags: [AWS, S3]
---

> Using S3 buckets to store files.

## 1. S3 and Bucket
### 1.1 What is Amazon S3?
Amazon Simple Storage Service(S3) is storage for the Internet. It is designed to make web-scale computing easier for developers.

Amazon S3 has a simple web services interface that you can use to store and retrieve any amount of data, at any time, from anywhere on the web. It gives any developer access to the same highly scalable, reliable, fast, inexpensive data storage infrastructure that Amazon uses to run its own global network of web sites. The service aims to maximize benefits of scale and to pass those benefits on to developers.
### 1.2 S3 Security
Control access to buckets using either a bucket ACL or using Bucket Polices.

By default, all newly created buckets are **private**. You can setup access control to your buckets using:
* Bucket Policies
* Access Control Lists

S3 buckets can be configured to create access logs which log all requests made to the S3 bucket. This can be sent to another bucket and even another bucket in another account.

### 1.3 S3 Encryption
* Encryption in transit is achieved by SS/TLS.
* Encryption at rest(Server Side) is achieved by:
  - `SSE-S3`: S3 Managed Keys
  - `SSE-KMS`: AWS Key Management Service
  - `SSE-C`: Server Side Encryption With Customer Provided Keys
* Client Side Encryption

### 1.4 S3 Versioning
* Stores all versions of an object(including all writes and even if you delete an object)
* Great backup tool
* Once enabled, **Versioning cannot be disabled**, only suspended.
* Integrated with **Lifecycle rules**
* Versioning's **MFA Delete** capability, which uses multi-factor authentication, can be used to provide an additional layer of security.

### 1.5 S3 Storage Class
* S3 Storage Class
* S3 Standard
* S3-IA
* S3 One Zone - IA
* S3 - Intelligent Tiering
* S3 Glacier
* S3 Glacier Deep Archive

### 1.6 Lifecycle Policies
* Automates moving objects between the different storage tiers.
* Can be used in conjunction with versioning.
* Can be applied to current versions and previous versions.

### 1.7 Replication
* Versioning must be enabled on both the source and destination buckets.
* Regions must be unique.
* Files in an existing bucket are not replicated automatically.
* All subsequent updated files will be replicated automatically.
* Delete markers are not replicated.
* Deleting individual versions or delete markers will not be replicated.

### 1.8 S3 Transfer Acceleration
Amazon S3 Transfer Acceleration enables fast, easy, and secure transfers of files over long distances between your client and an S3 bucket. Transfer Acceleration takes advantage of Amazon **CloudFront**’s globally distributed **edge locations**. As the data arrives at an edge location, data is routed to Amazon S3 over an optimized network path.

When using Transfer Acceleration, additional data transfer charges may apply. For more information about pricing, see Amazon S3 Pricing.

## 2. Lab - Basic Usage of S3 Bucket
### 2.1 Creating S3 Bucket
Go to Services->S3, or visit https://s3.console.aws.amazon.com/s3/, click Create Bucket.
![image](/assets/images/cloud/4111/s3-home.png)
Set bucket name(must be unique) and choose region, next.
![image](/assets/images/cloud/4111/create-s3-bucket.png)
Configure versioning, logging, encryption, etc, next.
![image](/assets/images/cloud/4111/create-s3-bucket-config.png)
Set permission, choose block all public access(We will see the effect of this setting). Next, review, done.
![image](/assets/images/cloud/4111/create-s3-bucket-permission.png)
### 2.2 Uploading Files to S3 Bucket
Now, we can upload files to the new bucket we just created. Inside the bucket, click the upload button.
![image](/assets/images/cloud/4111/s3-bucket.png)
Select files from local disk and upload.
![image](/assets/images/cloud/4111/s3-upload.png)
Files are uploaded, next.
![image](/assets/images/cloud/4111/upload-file.png)
Set permission.
![image](/assets/images/cloud/4111/upload-file-permission.png)
Set properties, choose the storage class, next, done.
![image](/assets/images/cloud/4111/upload-file-properties.png)
### 2.3 Making Files Be Public
Get the open URL of the uploaded file.
![image](/assets/images/cloud/4111/file-link.png)
Access the URL, for example https://johnnyawsguru-s3-01.s3.amazonaws.com/IMG_5807.JPG in web browser. We will get the access denied error.
![image](/assets/images/cloud/4111/file-access-denied.png)
The cause of the error is that the file we are visiting hasn't been published yet. We need to make the file be public. Two steps are required. First, switch to the permissions tab of the bucket, remove the 'Block all public access' and save.
![image](/assets/images/cloud/4111/public-bucket.png)
Then, select the file and choose 'Make public' in the context menu.
![image](/assets/images/cloud/4111/public-file.png)
Refresh the open url of the file. Now, it is accessible.
![image](/assets/images/cloud/4111/public-file-success.png)
### 2.4 Changing Storage Class of Files
To change the storage class of file, click on the file, switch to 'Properties' tab.
![image](/assets/images/cloud/4111/change-storage-class.png)
Choose the Storage Class, save.
![image](/assets/images/cloud/4111/s3-file-storage-class.png)
### 2.5 Changing Encryption Type
Select the file, click Encryption in the file properties.
![image](/assets/images/cloud/4111/change-encryption-type.png)
Choose AWS-KMS.
![image](/assets/images/cloud/4111/change-encryption-type2.png)
### 2.6 Enable Versioning for S3 Bucket
Switch to Properties tab of S3 Bucket, choose Versioning and enable it.
![image](/assets/images/cloud/4111/s3-versioning.png)
### 2.7 S3 Lifecycle Management and Glacier
In bucket, switch to Management tab, click 'Add Lifecycle rule'.
![image](/assets/images/cloud/4111/s3-lifecycle-management.png)
Set rule name, next.
![image](/assets/images/cloud/4111/create-lifecycle-rule-1.png){:width="650px"}
Set transitions, next.
![image](/assets/images/cloud/4111/create-lifecycle-rule-transitions.png){:width="650px"}
Expiration, next.
![image](/assets/images/cloud/4111/create-lifecycle-rule-expiration.png){:width="650px"}
Save and done.
![image](/assets/images/cloud/4111/create-lifecycle-rule-done.png)
### 2.8 Enable Cross Region Replication
In bucket, switch to Management tab, then Replication, click 'Add rule'.
![image](/assets/images/cloud/4111/s3-replication.png)
Choose source, next.
![image](/assets/images/cloud/4111/create-replication-rule-source.png){:width="650px"}
Set destination, create new bucket for destination, next.
![image](/assets/images/cloud/4111/create-replication-rule-destination.png){:width="650px"}
Configure rule options, create new role, next.
![image](/assets/images/cloud/4111/create-replication-rule-role.png){:width="650px"}
Done.
![image](/assets/images/cloud/4111/create-replication-rule-done.png)
The new bucket is created, but nothing in it.
![image](/assets/images/cloud/4111/new-replication-bucket.png)
Try to add and remove some versions in the source bucket to see the impact.
![image](/assets/images/cloud/4111/new-replication-bucket-replicated.png)
### 2.9 Transfer Acceleration
After enabling the transfer acceleration, you can upload file through a unique link, for example.
http://johnnyawsguru-s3-01.s3-accelerate.amazonaws.com. A tool to test acceleration speed, see [Amazon S3 Transfer Acceleration Speed Comparison](https://s3-accelerate-speedtest.s3-accelerate.amazonaws.com/en/accelerate-speed-comparsion.html).
![image](/assets/images/cloud/4111/transfer-acceleration-speed-comparison.png)
Speed in different regions.
![image](/assets/images/cloud/4111/transfer-acceleration-speed-comparison2.png)

## 3. References
* [Working with Amazon S3 Buckets](https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingBucket.html)
* [Amazon S3 Transfer Acceleration](https://docs.aws.amazon.com/AmazonS3/latest/dev/transfer-acceleration.html)
* [Amazon S3 FAQs](https://aws.amazon.com/s3/faqs/)
