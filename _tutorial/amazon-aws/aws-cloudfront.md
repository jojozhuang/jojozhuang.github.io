---
layout: tutorial
key: tutorial
title: "AWS-CloudFront-3-Draft"
index: 3804
subcategory: amazon-aws
date: 2019-09-16
tags: [CloudFront]
draft: true
---

> Amazon AWS Tutorial

### 3.11 CloudFront Overview
![image](/assets/images/note/9551/3-11-s3-cloudfront.png)
CloundFront Terminologies.
![image](/assets/images/note/9551/3-11-s3-cloudfront-terminologies.png)
What is CloudFront?
![image](/assets/images/note/9551/3-11-s3-what-is-cloudfront.png)
CloundFront Terminologies2.
![image](/assets/images/note/9551/3-11-s3-cloudfront-terminologies2.png)
Exam tips.
![image](/assets/images/note/9551/3-11-s3-cloudfront-exam-tips.png)
![image](/assets/images/note/9551/3-11-s3-cloudfront-exam-tips2.png)
### 3.12 CloudFront Lab
Services->Networking & Content Delivery->CloudFront, click "Create distribution", select "Web", then select the S3 bucket to distribute.
![image](/assets/images/note/9551/3-12-cloundfront-create-distribution.png)
Some settings:
* Restrict View Access
* TTL

Keep the default settings, create distribution.
![image](/assets/images/note/9551/3-12-cloundfront-create-distribution-in-progress.png)
Wait for few minutes until the deployment is done.
![image](/assets/images/note/9551/3-12-cloundfront-create-distribution-enabled.png)
Copy the domain name, which is 'digq5vi21aheh.cloudfront.net' here.

There are two images files in the original bucket.

Access the first one, http://digq5vi21aheh.cloudfront.net/IMG_5807.JPG, failed. because this file is encrypted with AWS KMS.
![image](/assets/images/note/9551/3-12-cloundfront-distributed-encrypted-file.png)
Access the second file, http://digq5vi21aheh.cloudfront.net/IMG_5819.JPG, succeeded.
![image](/assets/images/note/9551/3-12-cloundfront-distributed-file.png)

Create invalidation for distribution.
![image](/assets/images/note/9551/3-12-cloundfront-distribution-invalidation.png)
Exam tips.
![image](/assets/images/note/9551/3-12-cloundfront-exam-tips.png)
![image](/assets/images/note/9551/3-12-cloundfront-exam-tips2.png)


### 3.15 Storage Gateway
![image](/assets/images/note/9551/3-15-storage-gateway.png)
![image](/assets/images/note/9551/3-15-storage-gateway2.png)
Gateway types.
![image](/assets/images/note/9551/3-15-storage-gateway-types.png)
File gateway.
![image](/assets/images/note/9551/3-15-file-gateway.png)
![image](/assets/images/note/9551/3-15-file-gateway2.png)
Volume gateway.
![image](/assets/images/note/9551/3-15-volume-gateway.png)
Volume gateway, stored volumes.
![image](/assets/images/note/9551/3-15-volume-gateway-stored-volumes.png)
![image](/assets/images/note/9551/3-15-volume-gateway-stored-volumes2.png)
Volume gateway, cached volumes.
![image](/assets/images/note/9551/3-15-volume-gateway-cached-volumes.png)
![image](/assets/images/note/9551/3-15-volume-gateway-cached-volumes2.png)
Tape gateway.
![image](/assets/images/note/9551/3-15-tape-gateway.png)
![image](/assets/images/note/9551/3-15-tape-gateway2.png)
Exam tips.
![image](/assets/images/note/9551/3-15-tape-gateway-exam-tips.png)
### 3.16 Identity Access Management & S3 Summary
![image](/assets/images/note/9551/3-16-s3-exam-tips-1.png)
![image](/assets/images/note/9551/3-16-s3-exam-tips-2.png)
![image](/assets/images/note/9551/3-16-s3-exam-tips-3.png)
![image](/assets/images/note/9551/3-16-s3-exam-tips-4.png)
![image](/assets/images/note/9551/3-16-s3-exam-tips-5.png)
![image](/assets/images/note/9551/3-16-s3-exam-tips-6.png)
![image](/assets/images/note/9551/3-16-s3-exam-tips-7.png)
![image](/assets/images/note/9551/3-16-s3-exam-tips-8.png)
![image](/assets/images/note/9551/3-16-s3-exam-tips-9.png)
![image](/assets/images/note/9551/3-16-s3-exam-tips-10.png)
![image](/assets/images/note/9551/3-16-s3-exam-tips-11.png)
![image](/assets/images/note/9551/3-16-s3-exam-tips-12.png)
![image](/assets/images/note/9551/3-16-s3-exam-tips-13.png)
![image](/assets/images/note/9551/3-16-s3-exam-tips-14.png)
![image](/assets/images/note/9551/3-16-s3-exam-tips-15.png)
![image](/assets/images/note/9551/3-16-s3-exam-tips-16.png)
* [Amazon S3 FAQs](https://aws.amazon.com/s3/faqs/)

### 3.17 Identity Access Management & S3 Quiz
![image](/assets/images/note/9551/3-17-s3-quiz-1.png)
![image](/assets/images/note/9551/3-17-s3-quiz-2.png)
![image](/assets/images/note/9551/3-17-s3-quiz-3.png)
![image](/assets/images/note/9551/3-17-s3-quiz-4.png)
![image](/assets/images/note/9551/3-17-s3-quiz-5.png)
![image](/assets/images/note/9551/3-17-s3-quiz-6.png)
![image](/assets/images/note/9551/3-17-s3-quiz-7.png)
![image](/assets/images/note/9551/3-17-s3-quiz-8.png)
![image](/assets/images/note/9551/3-17-s3-quiz-9.png)
![image](/assets/images/note/9551/3-17-s3-quiz-10.png)
![image](/assets/images/note/9551/3-17-s3-quiz-11.png)
![image](/assets/images/note/9551/3-17-s3-quiz-12.png)
![image](/assets/images/note/9551/3-17-s3-quiz-13.png)
![image](/assets/images/note/9551/3-17-s3-quiz-14.png)
![image](/assets/images/note/9551/3-17-s3-quiz-15.png)
![image](/assets/images/note/9551/3-17-s3-quiz-16.png)
![image](/assets/images/note/9551/3-17-s3-quiz-17.png)
![image](/assets/images/note/9551/3-17-s3-quiz-18.png)
![image](/assets/images/note/9551/3-17-s3-quiz-19.png)
![image](/assets/images/note/9551/3-17-s3-quiz-20.png)
![image](/assets/images/note/9551/3-17-s3-quiz-21.png)
![image](/assets/images/note/9551/3-17-s3-quiz-22.png)
![image](/assets/images/note/9551/3-17-s3-quiz-23.png)
![image](/assets/images/note/9551/3-17-s3-quiz-24.png)
![image](/assets/images/note/9551/3-17-s3-quiz-25.png)
![image](/assets/images/note/9551/3-17-s3-quiz-26.png)
![image](/assets/images/note/9551/3-17-s3-quiz-27.png)
![image](/assets/images/note/9551/3-17-s3-quiz-28.png)
![image](/assets/images/note/9551/3-17-s3-quiz-29.png)
![image](/assets/images/note/9551/3-17-s3-quiz-30.png)
![image](/assets/images/note/9551/3-17-s3-quiz-31.png)
![image](/assets/images/note/9551/3-17-s3-quiz-32.png)
![image](/assets/images/note/9551/3-17-s3-quiz-33.png)
![image](/assets/images/note/9551/3-17-s3-quiz-34.png)
![image](/assets/images/note/9551/3-17-s3-quiz-35.png)
![image](/assets/images/note/9551/3-17-s3-quiz-36.png)
![image](/assets/images/note/9551/3-17-s3-quiz-37.png)
![image](/assets/images/note/9551/3-17-s3-quiz-38-1.png)
![image](/assets/images/note/9551/3-17-s3-quiz-38-2.png)
![image](/assets/images/note/9551/3-17-s3-quiz-39.png)
* S3 - One Zone-Infrequent Access: The key driver here is cost, so an awareness of cost is necessary to answer this. Full S3 is quite expensive at around $0.023 per GB for the lowest band. S3 standard IA is $0.0125 per GB, S3 One-Zone-IA is $0.01 per GB, and Legacy S3-RRS is around $0.024 per GB for the lowest band. Of the offered solutions SS3 One-Zone-IA is the cheapest suitable option. Glacier cannot be considered as it is not intended for direct access, however it comes in at around $0.004 per GB. Of course you spotted that RRS is being deprecated, and there is no such thing as S3 - Provisioned IOPS. In this case OneZone IA should be fine as users will 'post' material but only the organization will access it and only to find relevant material. The question states that there is no concern if some material is lost.
* https://docs.aws.amazon.com/AmazonS3/latest/dev/UploadingObjects.html
* To access the console you use an account and password combination. To access AWS programmatically you use a Key and Secret Key combination
* Three options to allow users to have secure access to private files located in S3. Signed URLs and Signed Cookies are different ways to ensure that users attempting access to files in an S3 bucket can be authorised. One method generates URLs and the other generates special cookies but they both require the creation of an application and policy to generate and control these items. An Origin Access Identity on the other hand, is a virtual user identity that is used to give the CloudFront distribution permission to fetch a private object from an S3 bucket. Public S3 buckets should never be used unless you are using the bucket to host a public website and therefore this is an incorrect option.




## 9. References
