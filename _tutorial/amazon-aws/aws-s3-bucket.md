---
layout: tutorial
key: tutorial
title: "AWS-S3-Bucket-3-Draft"
index: 3803
subcategory: amazon-aws
date: 2019-09-16
tags: [AWS]
draft: true
---

> Create a S3 bucket to store files.

## 1. S3 and Bucket

## 2. Basic Usage of S3 Bucket
### 2.1 Creating S3 Bucket
Services->S3.
![image](/assets/images/cloud/3803/s3-home.png)
Create Bucket, bucket name must be unique. Choose region, next.
![image](/assets/images/note/9551/3-5-create-s3-bucket.png)
Configure versioning, logging, encryption, etc.
![image](/assets/images/note/9551/3-5-create-s3-bucket-config.png)
Set permission, block all public access.
![image](/assets/images/note/9551/3-5-create-s3-bucket-permission.png)
### 2.2 Uploading Files to S3 Bucket
In the S3 bucket, click the upload button.
![image](/assets/images/cloud/3803/s3-bucket.png)
Select files from local disk and upload.
![image](/assets/images/cloud/3803/s3-upload.png)
Files are uploaded, next.
![image](/assets/images/note/9551/3-5-upload-file.png)
Set permission.
![image](/assets/images/note/9551/3-5-upload-file-permission.png)
Set properties, choose the storage class, next, done.
![image](/assets/images/note/9551/3-5-upload-file-properties.png)
### 2.3 Public Files
Get the open URL of the uploaded file.
![image](/assets/images/note/9551/3-5-file-link.png)
Access the URL, for example https://johnnyawsguru-s3-01.s3.amazonaws.com/IMG_5807.JPG in web browser. We will get the access denied error.
![image](/assets/images/note/9551/3-5-file-access-denied.png)
The cause of the error is that the file hasn't been published yet. We need to public the file. Remove the 'Block all public access' in S3 Bucket Permission.
![image](/assets/images/note/9551/3-5-public-bucket.png)
Then, public file.
![image](/assets/images/note/9551/3-5-public-file.png)
Refresh the link. Now, the file is accessible.
![image](/assets/images/note/9551/3-5-public-file-success.png)
Change storage class for one file. Click on the file, switch to 'Properties' tab -> Storage Class.
![image](/assets/images/note/9551/3-5-change-storage-class.png)
Exam tips.
![image](/assets/images/note/9551/3-5-exam-tips.png)
### 3.6 S3 Security And Encryption
S3 bucket.
![image](/assets/images/note/9551/3-6-s3-basics.png)
S3 encryption.
![image](/assets/images/note/9551/3-6-s3-encryption.png)
Change encryption type of file.
![image](/assets/images/note/9551/3-6-change-encryption-type.png)
Encrypt with AWS KMS.
![image](/assets/images/note/9551/3-6-change-encryption-type2.png)
### 3.7 S3 Version Control
![image](/assets/images/note/9551/3-7-s3-versioning.png)
Exam tips.
![image](/assets/images/note/9551/3-7-s3-versioning-exam.png)
### 3.8 S3 Lifecycle Management and Glacier
Bucket->Management->Lifecycle, add Lifecycle rule.
![image](/assets/images/note/9551/3-8-create-lifecycle-rule-1.png)
Set transitions.
![image](/assets/images/note/9551/3-8-create-lifecycle-rule-transitions.png)
Expiration.
![image](/assets/images/note/9551/3-8-create-lifecycle-rule-expiration.png)
Save and done.
![image](/assets/images/note/9551/3-8-create-lifecycle-rule-done.png)
Exam tips.
![image](/assets/images/note/9551/3-8-lifecycle-rule-exam-tips.png)
### 3.9 Cross Region Replication
Bucket->Management->Replication, add rule.
![image](/assets/images/note/9551/3-9-create-replication-rule-source.png)
Set destination, Create new bucket.
![image](/assets/images/note/9551/3-9-create-replication-rule-destination.png)
Rule options, create new role.
![image](/assets/images/note/9551/3-9-create-replication-rule-role.png)
Done.
![image](/assets/images/note/9551/3-9-create-replication-rule-done.png)
Nothing in the new bucket.
![image](/assets/images/note/9551/3-9-new-replication-bucket.png)
Try to add and remove some versions to see the impact.
![image](/assets/images/note/9551/3-9-new-replication-bucket-replicated.png)
Exam tips.
![image](/assets/images/note/9551/3-9-replication-rule-exam-tips.png)
### 3.10 Transfer Acceleration
![image](/assets/images/note/9551/3-10-s3-transfer-acceleration.png)

[Amazon S3 Transfer Acceleration Speed Comparison](https://s3-accelerate-speedtest.s3-accelerate.amazonaws.com/en/accelerate-speed-comparsion.html)
![image](/assets/images/note/9551/3-10-transfer-acceleration-speed-comparison.png)
![image](/assets/images/note/9551/3-10-transfer-acceleration-speed-comparison2.png)



## 9. References
