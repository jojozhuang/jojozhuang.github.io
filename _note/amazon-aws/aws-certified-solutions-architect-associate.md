---
layout: tutorial
key: note
title: "AWS - Certified Solutions Architect Associate - Full"
index: 9551
subcategory: amazon-aws
date: 2017-08-04
tags: [AWS]
---

> AWS Certified Solutions Architect Associate 2019

## 1. Introduction
### 1.1 Introduction
* [AWS Certified Solutions Architect Associate 2019](https://acloud.guru/learn/aws-certified-solutions-architect-associate)
* AWS Sign In: https://signin.aws.amazon.com
* [Amazon S3 FAQs](https://aws.amazon.com/s3/faqs/)
* [Amazon EC2 FAQs](https://aws.amazon.com/ec2/faqs/)
* [Elastic Load Balancing FAQs](https://aws.amazon.com/elasticloadbalancing/faqs/)
* [AWS Whitepapers & Guides](https://aws.amazon.com/whitepapers)
* [SAA-C01 Exam Guide](https://d1.awsstatic.com/training-and-certification/docs-sa-assoc/AWS_Certified_Solutions_Architect_Associate-Exam_Guide_EN_1.8.pdf)
* [Sample Questions](https://d1.awsstatic.com/training-and-certification/docs/AWS_Certified_Solutions_Architect_Associate_Sample_Questions.pdf)


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
![image](/assets/images/note/9551/2-2-aws-console-2016.png)
AWS Console 2017.
![image](/assets/images/note/9551/2-2-aws-console-2017.png)
AWS Console 2019.
![image](/assets/images/note/9551/2-2-aws-console-2019.png)
AWS High Level Services.
![image](/assets/images/note/9551/2-2-aws-high-level-services.png)
Data Center and availabilities.
![image](/assets/images/note/9551/2-2-aws-data-center-availabilities.png)
Region.
![image](/assets/images/note/9551/2-2-aws-region.png)
Current regions divided by georigion.
![image](/assets/images/note/9551/2-2-aws-region2.png)
Edge location.
![image](/assets/images/note/9551/2-2-aws-edge-location.png)
Services need to know to pass the CSAA.
![image](/assets/images/note/9551/2-2-services-need-to-know.png)
Core Services need to know to pass the CSAA.
![image](/assets/images/note/9551/2-2-services-need-to-know2.png)
Exam tips.
* Region
* Availability Zone
* Edge Location

![image](/assets/images/note/9551/2-2-exam-tips.png)
### 2.3 How To Sign Up To AWS
Empty.
### 2.4 10,000 Foot Overview Quiz
![image](/assets/images/note/9551/2-4-overview-quiz-1.png)
![image](/assets/images/note/9551/2-4-overview-quiz-2.png)
![image](/assets/images/note/9551/2-4-overview-quiz-3.png)
![image](/assets/images/note/9551/2-4-overview-quiz-4.png)
![image](/assets/images/note/9551/2-4-overview-quiz-5.png)
![image](/assets/images/note/9551/2-4-overview-quiz-6.png)
![image](/assets/images/note/9551/2-4-overview-quiz-7.png)
![image](/assets/images/note/9551/2-4-overview-quiz-8.png)
![image](/assets/images/note/9551/2-4-overview-quiz-9.png)
![image](/assets/images/note/9551/2-4-overview-quiz-10.png)
![image](/assets/images/note/9551/2-4-overview-quiz-11.png)
![image](/assets/images/note/9551/2-4-overview-quiz-12.png)
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
![image](/assets/images/note/9551/3-1-iam-features.png)
Key Terminologies.
* Users
* Groups
* Policies(Permissions)
* Roles

![image](/assets/images/note/9551/3-1-iam-terminologies.png)

### 3.2 IAM Lab
QR Code for MFA.
![image](/assets/images/note/9551/3-2-iam-qrcode.png)
Problem with the MFA setup.
![image](/assets/images/note/9551/3-2-iam-mfa-setup-problem.png)
* [Problem with AWS MFA setup](https://help.acloud.guru/hc/en-us/articles/360000782135-Problem-with-AWS-MFA-setup)

Exam Tips.
![image](/assets/images/note/9551/3-2-exam-tips.png)
![image](/assets/images/note/9551/3-2-exam-tips2.png)
### 3.3 Create A Billing Alarm
Top Menu -> johnnyaws-> My Billing Address.

![image](/assets/images/note/9551/3-3-billing-dashboard.png)
Billing preferences.
![image](/assets/images/note/9551/3-3-billing-preferences.png)
Top Menu -> Services->CloudWatch, then Alarms->Billing->Create alarm.

### 3.4 S3 101
S3 Objects.
![image](/assets/images/note/9551/3-4-s3-objects.png)
Data consistency.
![image](/assets/images/note/9551/3-4-s3-data-consistency.png)
S3 Features.
![image](/assets/images/note/9551/3-4-s3-features.png)
S3 Storage Classes.
![image](/assets/images/note/9551/3-4-s3-storage-classes.png)
S3 Storage Classes2.
![image](/assets/images/note/9551/3-4-s3-storage-classes2.png)
S3 Storage Comparison.
![image](/assets/images/note/9551/3-4-s3-storage-comparison.png)
S3 Storage Charge.
![image](/assets/images/note/9551/3-4-s3-storage-charge.png)
Exam tips.
![image](/assets/images/note/9551/3-4-s3-storage-exam-tips.png)
![image](/assets/images/note/9551/3-4-s3-storage-exam-tips2.png)
![image](/assets/images/note/9551/3-4-s3-storage-exam-tips3.png)
![image](/assets/images/note/9551/3-4-s3-storage-exam-tips4.png)
![image](/assets/images/note/9551/3-4-s3-storage-exam-tips5.png)
* [Amazon S3 FAQs](https://aws.amazon.com/s3/faqs/)

### 3.5 Let's Create An S3 Bucket
Create Bucket.
![image](/assets/images/note/9551/3-5-create-s3-bucket.png)
![image](/assets/images/note/9551/3-5-create-s3-bucket-config.png)
![image](/assets/images/note/9551/3-5-create-s3-bucket-permission.png)
Upload files to bucket.
![image](/assets/images/note/9551/3-5-upload-file.png)
![image](/assets/images/note/9551/3-5-upload-file-permission.png)
![image](/assets/images/note/9551/3-5-upload-file-properties.png)
Publish file.
![image](/assets/images/note/9551/3-5-file-link.png)
https://johnnyawsguru-s3-01.s3.amazonaws.com/IMG_5807.JPG
![image](/assets/images/note/9551/3-5-file-access-denied.png)
Public bucket.
![image](/assets/images/note/9551/3-5-public-bucket.png)
Then, public file.
![image](/assets/images/note/9551/3-5-public-file.png)
Now, the file is accessible.
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

### 3.13 Snowball Overview
Snowball.
![image](/assets/images/note/9551/3-13-snowball.png)
Snowball Edge.
![image](/assets/images/note/9551/3-13-snowball-edge.png)
Snowball Mobile.
![image](/assets/images/note/9551/3-13-snowball-mobile.png)
When to use Snowball.
![image](/assets/images/note/9551/3-13-snowball-when-to-use.png)
Exam tips.
![image](/assets/images/note/9551/3-13-snowball-exam-tips.png)
### 3.14 Snowball Lab
See the similar video [How Amazon Uses Explosive-Resistant Devices To Transfer Data To AWS](https://www.youtube.com/watch?v=H3_ZqnqLyVo).
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

## 4. EC2
### 4.1 EC2 101
![image](/assets/images/note/9551/4-1-ec2.png)
EC2 Pricing models.
![image](/assets/images/note/9551/4-1-ec2-pricing-model.png)
On demand.
![image](/assets/images/note/9551/4-1-ec2-on-demand.png)
Reserved Pricing.
![image](/assets/images/note/9551/4-1-ec2-reserved-pricing.png)
Reserved pricing types.
![image](/assets/images/note/9551/4-1-ec2-reserved-types.png)
Spot pricing.
![image](/assets/images/note/9551/4-1-ec2-spot-pricing.png)
Dedicated Hosts pricing.
![image](/assets/images/note/9551/4-1-ec2-dedicated-hosts-pricing.png)
Instance Types
![image](/assets/images/note/9551/4-1-ec2-instance-types.png)
Mnemonic.
![image](/assets/images/note/9551/4-1-ec2-reserved-types-mnemonic.png)
EC2 exam tips.
![image](/assets/images/note/9551/4-1-ec2-exam-tips.png)
![image](/assets/images/note/9551/4-1-ec2-exam-tips2.png)
![image](/assets/images/note/9551/4-1-ec2-exam-tips3.png)
### 4.2 Let's Get Our Hands Dirty With EC2 - Part 1
Services->EC2, Launch Instance.
![image](/assets/images/note/9551/4-2-ec2-create-instance-1.png)
Choose AMI.
![image](/assets/images/note/9551/4-2-ec2-create-instance-2.png)
Choose Instance Type.
![image](/assets/images/note/9551/4-2-ec2-create-instance-3.png)
Configure Instance Details, check "Protect against accidental termination".
![image](/assets/images/note/9551/4-2-ec2-create-instance-4.png)
Add Storage.
![image](/assets/images/note/9551/4-2-ec2-create-instance-5.png)
Add Tags.
![image](/assets/images/note/9551/4-2-ec2-create-instance-6.png)
Security Group.
![image](/assets/images/note/9551/4-2-ec2-create-instance-7.png)
Launch.
![image](/assets/images/note/9551/4-2-ec2-create-instance-8.png)
Create key pair, johnny-aws-ec2-keypair
![image](/assets/images/note/9551/4-2-ec2-create-instance-9.png)
Download Key Pair and Launch Instances.
![image](/assets/images/note/9551/4-2-ec2-create-instance-10.png)
Instance created and launched. Note down the public ip '3.83.9.181'.
![image](/assets/images/note/9551/4-2-ec2-create-instance-11.png)
Connect to EC2 instance remotely.
```raw
> ls
IMG_5807.JPG			johnny-aws-ec2-keypair.pem
IMG_5819.JPG			vertioning-test.txt
> chmod 400 johnny-aws-ec2-keypair.pem
> ssh ec2-user@3.83.9.181 -i johnny-aws-ec2-keypair.pem
ECDSA key fingerprint is SHA256:U8mtdYsvO0ltiT2L/GY+p+4+n/td8Q7qzWkGovkIlPI.
Are you sure you want to continue connecting (yes/no)? yes
Warning: Permanently added '3.83.9.181' (ECDSA) to the list of known hosts.
       __|  __|_  )
       _|  (     /   Amazon Linux 2 AMI
      ___|\___|___|

https://aws.amazon.com/amazon-linux-2/
[ec2-user@ip-172-31-83-218 ~]$
```
Install httpd.
```raw
[ec2-user@ip-172-31-83-218 ~]$ sudo su
[root@ip-172-31-83-218 ec2-user]# yum update -y
Loaded plugins: extras_suggestions, langpacks, priorities, update-motd
amzn2-core                                                                                                            | 2.4 kB  00:00:00     
No packages marked for update
[root@ip-172-31-83-218 ec2-user]# yum install httpd -y
```
Create an html page under /var/www/html with the following content.
```html
<html><h1>Hello	Johnny from EC2!</h1></html>
```
In remote ec2.
```raw
[root@ip-172-31-83-218 ec2-user]# cd /var/www/html
[root@ip-172-31-83-218 html]# nano index.html
[root@ip-172-31-83-218 html]# ls
index.html
[root@ip-172-31-83-218 html]# service httpd start
Redirecting to /bin/systemctl start httpd.service
[root@ip-172-31-83-218 html]# chkconfig on
```
Access 3.83.9.181 or http://3.83.9.181/index.html through web browser.
![image](/assets/images/note/9551/4-2-ec2-create-instance-12.png)
### 4.3 Let's Get Our Hands Dirty With EC2 - Part 2
Exam tips.
![image](/assets/images/note/9551/4-3-ec2-exam-tips.png)
### 4.4 Security Groups Basics
All outbound traffic is allowed.
![image](/assets/images/note/9551/4-4-ec2-security-group-outbound.png)
You can have multiple security groups attached to EC2 instance. (Instance->Actions->NetWorking->Change Security Groups)
![image](/assets/images/note/9551/4-4-ec2-security-group-multiple-groups.png)
Exam tips.
![image](/assets/images/note/9551/4-4-ec2-security-group-exam-tips.png)
![image](/assets/images/note/9551/4-4-ec2-security-group-exam-tips2.png)
### 4.5 EBS 101
![image](/assets/images/note/9551/4-5-ec2-ebs.png)
![image](/assets/images/note/9551/4-5-ec2-ebs-volumes.png)
![image](/assets/images/note/9551/4-5-ec2-ebs-types.png)
### 4.6 Volumes & Snapshots
When launching a new instance, one EBS volume is attached automatically and they are in the same Available Zone.
![image](/assets/images/note/9551/4-6-volumes-snapshots-1.png)
![image](/assets/images/note/9551/4-6-volumes-snapshots-2.png)
Screenshots from course video.

Launch a new instance with adding three additional EBS volumes.
![image](/assets/images/note/9551/4-6-volumes-snapshots-3.png)
After the instance is started, we will see four volumes.
![image](/assets/images/note/9551/4-6-volumes-snapshots-4.png)
Here, we can change the size of volume. For example, change the size of HDD from 500GB to 1000GB.
![image](/assets/images/note/9551/4-6-volumes-snapshots-5.png)
We can also change the Volume type from Standard SDD to Provisioned IOPS SSD for root volume.
![image](/assets/images/note/9551/4-6-volumes-snapshots-6.png)
Save the change, after a while, we will see the change is go live. For the root volume, type is changed from gp2 to io1.
![image](/assets/images/note/9551/4-6-volumes-snapshots-7.png)

Create new instance in another AZ.

Select root volume, Actions->Create Snapshot.
![image](/assets/images/note/9551/4-6-volumes-snapshots-8.png)
Wait for a while, we will see the snapshot is ready.
![image](/assets/images/note/9551/4-6-volumes-snapshots-9.png)
Now we can create image with this snapshot.
![image](/assets/images/note/9551/4-6-volumes-snapshots-10.png)
The new image appears in the AMIs, and it is ready to use.
![image](/assets/images/note/9551/4-6-volumes-snapshots-11.png)
Let's launch a new instance with this image, choose a different AZ.
![image](/assets/images/note/9551/4-6-volumes-snapshots-12.png)
After launch, notice it is in a different AZ(us-east-1a) from the original one(us-east-1b).
![image](/assets/images/note/9551/4-6-volumes-snapshots-13.png)
We can also move the EBS volume to another region by copying AMI image to another region and launch new instance with it. And we can choose any AZ in that region.
![image](/assets/images/note/9551/4-6-volumes-snapshots-14.png)

What happens to volumes if instances are terminated, will they all be deleted as well? see below.

Now we have two instance running.
![image](/assets/images/note/9551/4-6-volumes-snapshots-15.png)
And we have 5 volumes for above two instances.
![image](/assets/images/note/9551/4-6-volumes-snapshots-16.png)
After the instances are terminated, the addition volumes are still there, their states are changed to 'available' though. Only the root volumes are deleted.
![image](/assets/images/note/9551/4-6-volumes-snapshots-17.png)
Exam tips.
![image](/assets/images/note/9551/4-6-ec2-ebs-exam-tips.png)
![image](/assets/images/note/9551/4-6-ec2-ebs-exam-tips2.png)
![image](/assets/images/note/9551/4-6-ec2-ebs-exam-tips3.png)
### 4.7 AMI Types (EBS vs Instance Store)
![image](/assets/images/note/9551/4-7-ec2-ami-types.png)
![image](/assets/images/note/9551/4-7-ec2-ebs-vs-instance-store.png)

Create instance store.
![image](/assets/images/note/9551/4-7-ec2-create-instance-store.png)
Check instance store.
![image](/assets/images/note/9551/4-7-ec2-create-instance-store-2.png)
Select the top one, then choose the first available instance type.
![image](/assets/images/note/9551/4-7-ec2-create-instance-store-3.png)
Keep the default settings. In step "Add Storage", notice the volume type is Instance Store.
![image](/assets/images/note/9551/4-7-ec2-create-instance-store-4.png)
Continue with the default settings and reuse the security group created previously and launch.
![image](/assets/images/note/9551/4-7-ec2-create-instance-store-5.png)
Instance store can't be stopped. Terminate it as it is not in the free trial.
![image](/assets/images/note/9551/4-7-ec2-create-instance-store-6.png)
EBS and instance store, exam tips.
![image](/assets/images/note/9551/4-7-ec2-ebs-instance-store-exam-tips.png)
### 4.8 Encrypted Root Device Volumes & Snapshots
Volumes->Select one volume, Actions->Create Snapshot.
![image](/assets/images/note/9551/4-8-ec2-volume-create-snapshot-1.png)
![image](/assets/images/note/9551/4-8-ec2-volume-create-snapshot-2.png)
Switch to Snapshots view and wait until it's finished.
![image](/assets/images/note/9551/4-8-ec2-volume-create-snapshot-3.png)
Copy and choose encrypted.
![image](/assets/images/note/9551/4-8-ec2-volume-create-snapshot-4.png)
The new instance is launched.
![image](/assets/images/note/9551/4-8-ec2-volume-create-snapshot-5.png)
Select it and create image with it.
![image](/assets/images/note/9551/4-8-ec2-volume-create-snapshot-6.png)
Switch to Images view and see the AMI.
![image](/assets/images/note/9551/4-8-ec2-volume-create-snapshot-7.png)
Now, we can use this image to launch new instance, notice it is encrypted by default.
![image](/assets/images/note/9551/4-8-ec2-volume-create-snapshot-8.png)
Exam tips.
![image](/assets/images/note/9551/4-8-ec2-volume-snapshot-exam-tips.png)
![image](/assets/images/note/9551/4-8-ec2-volume-snapshot-exam-tips2.png)
### 4.9 CloudWatch 101
CloudWatch.
![image](/assets/images/note/9551/4-9-ec2-cloudwatch-monitor.png)
![image](/assets/images/note/9551/4-9-ec2-cloudwatch-monitor2.png)
CloudTrail.
![image](/assets/images/note/9551/4-9-ec2-cloudtrail.png)
CloudWatch exam tips.
![image](/assets/images/note/9551/4-9-ec2-cloudwatch-exam-tips.png)
### 4.10 CloudWatch Lab
Create instance with enabling the cloundwatch. Don't do it for experiment as it charges.
![image](/assets/images/note/9551/4-10-ec2-create-instance-with-cloudwatch.png)
Create cloudwatch alarm for CPU usage, Services->Management & Governance -> CloudWatch, Create Alarm.
![image](/assets/images/note/9551/4-10-ec2-cloudwatch-create-alarm-1.png)
Select EC2.
![image](/assets/images/note/9551/4-10-ec2-cloudwatch-create-alarm-2.png)
Per-Instance Metrics.
![image](/assets/images/note/9551/4-10-ec2-cloudwatch-create-alarm-3.png)
Choose 'CPUUtilization' for the target instance.
![image](/assets/images/note/9551/4-10-ec2-cloudwatch-create-alarm-4.png)
Set condition, threshold.
![image](/assets/images/note/9551/4-10-ec2-cloudwatch-create-alarm-5.png)
![image](/assets/images/note/9551/4-10-ec2-cloudwatch-create-alarm-6.png)
Create topic and set email address.
![image](/assets/images/note/9551/4-10-ec2-cloudwatch-create-alarm-7.png)
Ssh to remote ec2 instance and run following command.
```raw
> ssh ec2-user@10.23.123.12 -i johnny-aws-keypair
> sudo su
> while true; do echo; done
```
CPU usage will increase to high level to trigger the alarm and you will receive the alarm email.
![image](/assets/images/note/9551/4-10-ec2-cloudwatch-create-alarm-8.png)
CloudWatch exam tips.
![image](/assets/images/note/9551/4-10-ec2-cloudwatch-exam-tips.png)
### 4.11 The AWS Command Line
Start EC2 instance and get its public IP. SSH to it remotely.
```raw
>ssh ec2-user@18.234.185.140 -i johnny-aws-ec2-keypair.pem
The authenticity of host '18.234.185.140 (18.234.185.140)' can't be established.
ECDSA key fingerprint is SHA256:U8mtdYsvO0ltiT2L/GY+p+4+n/td8Q7qzWkGovkIlPI.
Are you sure you want to continue connecting (yes/no)? yes
Warning: Permanently added '18.234.185.140' (ECDSA) to the list of known hosts.
Last login: Mon Sep  9 15:40:49 2019 from 169.145.92.73

       __|  __|_  )
       _|  (     /   Amazon Linux 2 AMI
      ___|\___|___|

https://aws.amazon.com/amazon-linux-2/
[ec2-user@ip-172-31-93-212 ~]$ sudo su
[root@ip-172-31-93-212 ec2-user]# ls
```
Use `aws s3 ls` to list all existing s3 buckets, error occurs.
```raw
[root@ip-172-31-93-212 ec2-user]# aws s3 ls
Unable to locate credentials. You can configure credentials by running "aws configure".
[root@ip-172-31-93-212 ec2-user]#
```
Create a new user and download the secure csv which contains id/keys. Use them with `aws configure` to setup configration.
```raw
[root@ip-172-31-93-212 ec2-user]# aws configure
AWS Access Key ID [None]: ******************
AWS Secret Access Key [None]: ***************************************
Default region name [None]: us-east-1
Default output format [None]:
[root@ip-172-31-93-212 ec2-user]#
```
Then, try again. All existing s3 buckets are listed.
```raw
[root@ip-172-31-93-212 ec2-user]# aws s3 ls
2019-09-08 23:29:38 bucket-replication-destination
2019-09-08 20:34:17 johnnyawsguru-s3-01
2019-09-08 22:41:06 johnnyawsguru-version-01
```
Actually, the 'aws configure' command stores the credentials to file, which is stored in '~/.aws/credentials'.
```raw
[root@ip-172-31-93-212 ec2-user]# cd ~
[root@ip-172-31-93-212 ~]# ls -la
total 20
dr-xr-x---  4 root root 115 Sep  9 20:53 .
dr-xr-xr-x 18 root root 257 Sep  9 15:39 ..
drwxr-xr-x  2 root root  39 Sep  9 20:53 .aws
-rw-r--r--  1 root root  18 Oct 18  2017 .bash_logout
-rw-r--r--  1 root root 176 Oct 18  2017 .bash_profile
-rw-r--r--  1 root root 176 Oct 18  2017 .bashrc
-rw-r--r--  1 root root 100 Oct 18  2017 .cshrc
drwx------  2 root root  29 Sep  9 15:39 .ssh
-rw-r--r--  1 root root 129 Oct 18  2017 .tcshrc
[root@ip-172-31-93-212 ~]# cd .aws
[root@ip-172-31-93-212 .aws]# ls
config  credentials
[root@ip-172-31-93-212 .aws]# nano credentials
```
![image](/assets/images/note/9551/4-11-ec2-command-line-credentials.png)
Exam tips.
![image](/assets/images/note/9551/4-11-ec2-command-line-exam-tips.png)
### 4.12 Using IAM Roles With EC2
Services -> IAM -> Roles -> Create Role, choose EC2.
![image](/assets/images/note/9551/4-12-ec2-iam-role-1.png)
Select AdministratorAccess.
![image](/assets/images/note/9551/4-12-ec2-iam-role-2.png)
Input name.
![image](/assets/images/note/9551/4-12-ec2-iam-role-3.png)
New role created.
![image](/assets/images/note/9551/4-12-ec2-iam-role-4.png)

Use role. ssh to remote ec2 instance, try 'aws s3 ls' command. It doesn't work if credentials are not there in '.aws' folder.
```raw
[ec2-user@ip-172-31-93-212 ~]$ cd ~
[ec2-user@ip-172-31-93-212 ~]$ ls -la
total 16
drwx------ 3 ec2-user ec2-user  95 Sep  9 17:05 .
drwxr-xr-x 3 root     root      22 Sep  9 15:39 ..
-rw------- 1 ec2-user ec2-user  18 Sep  9 21:04 .bash_history
-rw-r--r-- 1 ec2-user ec2-user  18 Jul 27  2018 .bash_logout
-rw-r--r-- 1 ec2-user ec2-user 193 Jul 27  2018 .bash_profile
-rw-r--r-- 1 ec2-user ec2-user 231 Jul 27  2018 .bashrc
drwx------ 2 ec2-user ec2-user  29 Sep  9 15:39 .ssh
[ec2-user@ip-172-31-93-212 ~]$ aws s3 ls
Unable to locate credentials. You can configure credentials by running "aws configure".
[ec2-user@ip-172-31-93-212 ~]$
```
Attach role to ec2 instance. Select the instance, Actions->Instance Settings->Attach/Replace IAM Role.
![image](/assets/images/note/9551/4-12-ec2-attach-role-to-instance.png)
Select the role created in previous step and click Apply button.
![image](/assets/images/note/9551/4-12-ec2-attach-role-to-instance-2.png)
Then, we will see the role visible for the instance.
![image](/assets/images/note/9551/4-12-ec2-attach-role-to-instance-3.png)
Click on the role to see the details.
![image](/assets/images/note/9551/4-12-ec2-attach-role-to-instance-4.png)
Back to the ssh terminal, and try the command again. This time, we will see all the s3 buckets.
```raw
[ec2-user@ip-172-31-93-212 ~]$ aws s3 ls
Unable to locate credentials. You can configure credentials by running "aws configure".
[ec2-user@ip-172-31-93-212 ~]$ aws s3 ls
2019-09-08 23:29:38 bucket-replication-destination
2019-09-08 20:34:17 johnnyawsguru-s3-01
2019-09-08 22:41:06 johnnyawsguru-version-01
[ec2-user@ip-172-31-93-212 ~]$
```
By doing this, there is no credentials are stored in the server directory.

Role exam tips.
![image](/assets/images/note/9551/4-12-ec2-iam-role-exam-tips.png)
* [Easily Replace or Attach an IAM Role to an Existing EC2 Instance by Using the EC2 Console](https://aws.amazon.com/blogs/security/easily-replace-or-attach-an-iam-role-to-an-existing-ec2-instance-by-using-the-ec2-console/)

### 4.13 Using Boot Strap Scripts
Launch instance with bootstrap script. Select the role created in previous lecture for IAM role.
![image](/assets/images/note/9551/4-13-ec2-bootstrap-script-1.png)
And paste the following script to the user data text box. The script will install httpd service and start it, then create an html page. It then, creates an s3 bucket and copy the html file into it.
```raw
#!/bin/bash  
yum update -y  
yum install httpd -y  
service httpd start  
chkconfig httpd on  
cd /var/www/html  
echo 'Hello Johnny, Welcome To My Webpage' > index.html  
aws s3 mb s3://johnny-aws-guru-s3-bootstrap-01  
aws s3 cp index.html s3://johnny-aws-guru-s3-bootstrap-01  
```
After the instance is running successfully, access its public ip address, we should see the web page.
![image](/assets/images/note/9551/4-13-ec2-bootstrap-script-2.png)
And we will find the new s3 bucket.
![image](/assets/images/note/9551/4-13-ec2-bootstrap-script-3.png)
The index.html file is copied to this bucket.
![image](/assets/images/note/9551/4-13-ec2-bootstrap-script-4.png)
### 4.14 EC2 Instance Meta Data
Use the following two commands to get user data and meta data. The IP address `169.254.169.254` is a link-local address and is valid only from the instance.
* curl http://169.254.169.254/latest/user-data/
* curl http://169.254.169.254/latest/meta-data/

```raw
services/[root@ip-172-31-94-19 ec2-user]# curl http://169.254.169.254/latest/user-data/
#!/bin/bash  
yum update -y  
yum install httpd -y  
service httpd start  
chkconfig httpd on  
cd /var/www/html  
echo 'Hello Johnny, Welcome To My Webpage' > index.html  
aws s3 mb s3://johnny-aws-guru-s3-bootstrap-01  
aws s3 cp index.html s3://johnny-aws-guru-s3-bootstrap-01  [root@ip-172-31-94-19 ec2-user]#
[root@ip-172-31-94-19 ec2-user]# curl http://169.254.169.254/latest/meta-data/public-ipv4
3.84.101.140[root@ip-172-31-94-19 ec2-user]#
```
Save to files.
```raw
[root@ip-172-31-94-19 ec2-user]# curl http://169.254.169.254/latest/user-data/ > bootstrap.bash
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   281  100   281    0     0  56200      0 --:--:-- --:--:-- --:--:-- 56200
[root@ip-172-31-94-19 ec2-user]# ls
bootstrap.bash
[root@ip-172-31-94-19 ec2-user]# curl http://169.254.169.254/latest/meta-data/public-ipv4 > public-ip.txt
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100    12  100    12    0     0   2400      0 --:--:-- --:--:-- --:--:--  2400
[root@ip-172-31-94-19 ec2-user]# ls
bootstrap.bash  public-ip.txt
```
Meta data exam tips.
![image](/assets/images/note/9551/4-14-ec2-metadata-exam-tips.png)
* [Instance Metadata and User Data](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-metadata.html)

### 4.15 Elastic File System
![image](/assets/images/note/9551/4-15-ec2-efs.png)
1) Create EFS, Services -> Storage -> EFS, Create File System.
![image](/assets/images/note/9551/4-15-ec2-create-efs-1.png)
Keep default.
![image](/assets/images/note/9551/4-15-ec2-create-efs-2.png)
Just enable the encryption.
![image](/assets/images/note/9551/4-15-ec2-create-efs-3.png)
Keep default.
![image](/assets/images/note/9551/4-15-ec2-create-efs-4.png)
It will take few minutes to finish.
![image](/assets/images/note/9551/4-15-ec2-create-efs-5.png)
![image](/assets/images/note/9551/4-15-ec2-create-efs-6.png)
Wait until efs are created. Services->Storage->EFS, expand the arrow, click on "Amazon EC2 mount instructions (from local VPC)".
![image](/assets/images/note/9551/4-15-ec2-create-efs-7.png)
Copy the tls command , 'sudo mount -t efs -o tls fs-9c5a377e:/ efs'. We will use it in terminal.
![image](/assets/images/note/9551/4-15-ec2-create-efs-8.png)

2) Meanwhile, edit Security Group, select the 'default' group, switch to 'Inbound' tab.
![image](/assets/images/note/9551/4-15-ec2-add-nfs-1.png)
Click Edit, add new rule, choose NFS and select 'WebDMZ' security group, Save.
![image](/assets/images/note/9551/4-15-ec2-add-nfs-2.png)
NFS is in the inbound.
![image](/assets/images/note/9551/4-15-ec2-add-nfs-3.png)

3) Create new instance and add bootstrap script. Specify 2 instances.
![image](/assets/images/note/9551/4-15-ec2-create-instance-1.png)

Put the following script to user data.
```raw
#!/bin/bash
yum update -y
yum install httpd -y
service httpd start
chkconfig httpd on
yum install amazon-efs-utils -y
```
![image](/assets/images/note/9551/4-15-ec2-create-instance-2.png)
Once the two instances are launched, note the public IP addresses.
![image](/assets/images/note/9551/4-15-ec2-create-instance-3.png)
 Open two terminals to SSH to these two EC2 instances. In the first terminal, navigate to '/var/www/html', nothing there.
 ```raw
[ec2-user@ip-172-31-88-216 ~]$ sudo su
[root@ip-172-31-88-216 ec2-user]# cd /var/www
[root@ip-172-31-88-216 www]# ls
cgi-bin  html
[root@ip-172-31-88-216 www]# cd html
[root@ip-172-31-88-216 html]# ls
[root@ip-172-31-88-216 html]#
 ```
 Repeat the same steps in second terminal.
 ```raw
[ec2-user@ip-172-31-83-133 ~]$ sudo su
[root@ip-172-31-83-133 ec2-user]# cd /var/www
[root@ip-172-31-83-133 www]# ls
cgi-bin  html
[root@ip-172-31-83-133 www]# cd html
[root@ip-172-31-83-133 html]# ls
[root@ip-172-31-83-133 html]#
 ```
Mount EFS to /var/www/html for both ec2 instances. Do this in the www folder.
```raw
[root@ip-172-31-88-216 html]# cd ..
[root@ip-172-31-88-216 www]# mount -t efs -o tls fs-9c5a377e:/ /var/www/html
```
In the first terminal, create index.html in 'html' folder.
```raw
[root@ip-172-31-88-216 www]# cd html
[root@ip-172-31-83-133 html]# echo '<html><h1>hello,file system</h1></html>' > index.html
[root@ip-172-31-83-133 html]# ls
index.html
```
In the second terminal, we will see the same file.
```raw
[root@ip-172-31-83-133 www]# cd html/
[root@ip-172-31-83-133 html]# ls
index.html
[root@ip-172-31-83-133 html]# cat index.html
<html><h1>hello,file system</h1></html>
[root@ip-172-31-83-133 html]#
```
EFS Exam tips.
![image](/assets/images/note/9551/4-15-ec2-efs-exam-tips.png)
### 4.16 EC2 Placement Groups
![image](/assets/images/note/9551/4-16-ec2-placement-group.png)
![image](/assets/images/note/9551/4-16-ec2-cluster-placement-group.png)
![image](/assets/images/note/9551/4-16-ec2-spread-placement-group.png)
![image](/assets/images/note/9551/4-16-ec2-partition-placement-group.png)
![image](/assets/images/note/9551/4-16-ec2-placement-group-types.png)
Labs. Create Placement Group: In the EC2 page, find 'Placement Groups' in Network & Security.
![image](/assets/images/note/9551/4-16-ec2-placement-group-lab-1.png)
![image](/assets/images/note/9551/4-16-ec2-placement-group-lab-2.png)
Use Placement Group when launch new instance.
![image](/assets/images/note/9551/4-16-ec2-placement-group-lab-3.png)
Exam tips.
![image](/assets/images/note/9551/4-16-ec2-placement-group-exam-tips.png)
### 4.17 EC2 Summary
![image](/assets/images/note/9551/4-17-ec2-summary-1.png)
![image](/assets/images/note/9551/4-17-ec2-summary-2.png)
![image](/assets/images/note/9551/4-17-ec2-summary-3.png)
![image](/assets/images/note/9551/4-17-ec2-summary-4.png)
![image](/assets/images/note/9551/4-17-ec2-summary-5.png)
![image](/assets/images/note/9551/4-17-ec2-summary-6.png)
![image](/assets/images/note/9551/4-17-ec2-summary-7.png)
![image](/assets/images/note/9551/4-17-ec2-summary-8.png)
![image](/assets/images/note/9551/4-17-ec2-summary-9.png)
![image](/assets/images/note/9551/4-17-ec2-summary-10.png)
![image](/assets/images/note/9551/4-17-ec2-summary-11.png)
![image](/assets/images/note/9551/4-17-ec2-summary-12.png)
![image](/assets/images/note/9551/4-17-ec2-summary-13.png)
![image](/assets/images/note/9551/4-17-ec2-summary-14.png)
![image](/assets/images/note/9551/4-17-ec2-summary-15.png)
![image](/assets/images/note/9551/4-17-ec2-summary-16.png)
![image](/assets/images/note/9551/4-17-ec2-summary-17.png)
![image](/assets/images/note/9551/4-17-ec2-summary-18.png)
![image](/assets/images/note/9551/4-17-ec2-summary-19.png)
![image](/assets/images/note/9551/4-17-ec2-summary-20.png)
![image](/assets/images/note/9551/4-17-ec2-summary-21.png)
![image](/assets/images/note/9551/4-17-ec2-summary-22.png)
![image](/assets/images/note/9551/4-17-ec2-summary-23.png)
![image](/assets/images/note/9551/4-17-ec2-summary-24.png)
### 4.18 EC2 Quiz
![image](/assets/images/note/9551/4-18-ec2-quiz-1.png)
![image](/assets/images/note/9551/4-18-ec2-quiz-2.png)
![image](/assets/images/note/9551/4-18-ec2-quiz-3.png)
![image](/assets/images/note/9551/4-18-ec2-quiz-4.png)
![image](/assets/images/note/9551/4-18-ec2-quiz-5.png)
![image](/assets/images/note/9551/4-18-ec2-quiz-6.png)
![image](/assets/images/note/9551/4-18-ec2-quiz-7.png)
![image](/assets/images/note/9551/4-18-ec2-quiz-8.png)
![image](/assets/images/note/9551/4-18-ec2-quiz-9.png)
![image](/assets/images/note/9551/4-18-ec2-quiz-10.png)
![image](/assets/images/note/9551/4-18-ec2-quiz-11.png)
![image](/assets/images/note/9551/4-18-ec2-quiz-12.png)
![image](/assets/images/note/9551/4-18-ec2-quiz-13.png)
![image](/assets/images/note/9551/4-18-ec2-quiz-14.png)
![image](/assets/images/note/9551/4-18-ec2-quiz-15.png)
![image](/assets/images/note/9551/4-18-ec2-quiz-16.png)
![image](/assets/images/note/9551/4-18-ec2-quiz-17.png)
![image](/assets/images/note/9551/4-18-ec2-quiz-18.png)
![image](/assets/images/note/9551/4-18-ec2-quiz-19.png)
![image](/assets/images/note/9551/4-18-ec2-quiz-20.png)
![image](/assets/images/note/9551/4-18-ec2-quiz-21.png)
![image](/assets/images/note/9551/4-18-ec2-quiz-22.png)
![image](/assets/images/note/9551/4-18-ec2-quiz-23.png)
![image](/assets/images/note/9551/4-18-ec2-quiz-24.png)
![image](/assets/images/note/9551/4-18-ec2-quiz-25.png)
![image](/assets/images/note/9551/4-18-ec2-quiz-26.png)
![image](/assets/images/note/9551/4-18-ec2-quiz-27.png)
## 5. Databases On AWS
### 5.1 Databases 101
AWS supported databases.
![image](/assets/images/note/9551/5-1-database-aws-supported.png)
RDS features.
![image](/assets/images/note/9551/5-1-database-rds-features.png)
Multi AZ.
![image](/assets/images/note/9551/5-1-database-rds-multi-az.png)
Replica.
![image](/assets/images/note/9551/5-1-database-rds-replica.png)
Data warehouse.
![image](/assets/images/note/9551/5-1-database-data-warehouse.png)
OLTP
![image](/assets/images/note/9551/5-1-database-oltp.png)
OLAP.
![image](/assets/images/note/9551/5-1-database-olap.png)
Amazon's data warehouse, RedShift.
![image](/assets/images/note/9551/5-1-database-amazon-redshift.png)
Elastic Cache.
![image](/assets/images/note/9551/5-1-database-elasticcache.png)
Cache types: Redis and Memcache.
![image](/assets/images/note/9551/5-1-database-cache-types.png)
Database exam tips.
![image](/assets/images/note/9551/5-1-database-exam-tips-1.png)
![image](/assets/images/note/9551/5-1-database-exam-tips-2.png)
![image](/assets/images/note/9551/5-1-database-exam-tips-3.png)
![image](/assets/images/note/9551/5-1-database-exam-tips-4.png)
### 5.2 Let's Create An RDS Instance
Create MySql database. Services->Storage->RDS.
![image](/assets/images/note/9551/5-2-rds-wordpress-1.png)
Select free tier and set database name and password.
![image](/assets/images/note/9551/5-2-rds-wordpress-2.png)
Choose to create security group.
![image](/assets/images/note/9551/5-2-rds-wordpress-3.png)
Set database name, so when this database is launched, a new db will be created automatically.
![image](/assets/images/note/9551/5-2-rds-wordpress-4.png)
Set retention period to 0 days to disable backup.
![image](/assets/images/note/9551/5-2-rds-wordpress-5.png)
It takes some time until the MySQL instance is launched.
![image](/assets/images/note/9551/5-2-rds-wordpress-6.png)
Copy the endpoint value, we will use it later.
![image](/assets/images/note/9551/5-2-rds-wordpress-7.png)
Create new instance with the following bootstrap script, which will install Apache, php mysql driver and wordpress.
```raw
#!/bin/bash
yum install httpd php php-mysql -y
cd /var/www/html
wget https://wordpress.org/wordpress-5.1.1.tar.gz
tar -xzf wordpress-5.1.1.tar.gz
cp -r wordpress/* /var/www/html/
rm -rf wordpress
rm -rf wordpress-5.1.1.tar.gz
chmod -R 755 wp-content
chown -R apache:apache wp-content
service httpd start
chkconfig httpd on
```
![image](/assets/images/note/9551/5-2-rds-wordpress-8.png)
Add tag "WordPressServer".
![image](/assets/images/note/9551/5-2-rds-wordpress-9.png)
Add 'WebDMZ' security group into the inbound rule of 'rds-launch-wizard', so that the web server instance can access the MySQL instance.
![image](/assets/images/note/9551/5-2-rds-wordpress-10.png)
Access the public ip of web server. We will see the webpress admin page.
![image](/assets/images/note/9551/5-2-rds-wordpress-11.png)
Setup the data connection, including database name, use name, password. Put the endpoint value(MySQL instance) into Database Host.
![image](/assets/images/note/9551/5-2-rds-wordpress-12.png)
Error occurs: can't write the wp-config.php file.
![image](/assets/images/note/9551/5-2-rds-wordpress-13.png)
Copy the script, then ssh to the web server. Create a file named `wp-config.php` in folder `/var/www/html` with the content from latest step.
![image](/assets/images/note/9551/5-2-rds-wordpress-14.png)
Refresh the page, now, the wordpress admin page is displayed properly. Set title, name, etc.
![image](/assets/images/note/9551/5-2-rds-wordpress-15.png)
WordPress is installed successfully.
![image](/assets/images/note/9551/5-2-rds-wordpress-16.png)
Login.
![image](/assets/images/note/9551/5-2-rds-wordpress-17.png)
Home page of WordPress.
![image](/assets/images/note/9551/5-2-rds-wordpress-18.png)
Exam tips.
![image](/assets/images/note/9551/5-2-rds-instance-summary.png)
### 5.3 RDS Backups, Multi-AZ & Read Replicas
Backup types.
![image](/assets/images/note/9551/5-3-rds-backup-types.png)
Automated backup.
![image](/assets/images/note/9551/5-3-rds-backup-automated.png)
Snapshot backup.
![image](/assets/images/note/9551/5-3-rds-backup-snapshot.png)
Restore back.
![image](/assets/images/note/9551/5-3-rds-backup-restore.png)
Encryption.
![image](/assets/images/note/9551/5-3-rds-backup-encryption.png)
Multi-AZ.
![image](/assets/images/note/9551/5-3-rds-backup-multi-az.png)
![image](/assets/images/note/9551/5-3-rds-backup-multi-az2.png)
![image](/assets/images/note/9551/5-3-rds-backup-multi-az3.png)
![image](/assets/images/note/9551/5-3-rds-backup-multi-az4.png)
Read Replica.
![image](/assets/images/note/9551/5-3-rds-backup-read-replica-1.png)
![image](/assets/images/note/9551/5-3-rds-backup-read-replica-2.png)
![image](/assets/images/note/9551/5-3-rds-backup-read-replica-3.png)
![image](/assets/images/note/9551/5-3-rds-backup-read-replica-4.png)
![image](/assets/images/note/9551/5-3-rds-backup-read-replica-5.png)
### 5.4 RDS Backups, Multi-AZ & Read Replicas - Lab
Choose the Mysql database create in previous session, click modify button.
![image](/assets/images/note/9551/5-4-rds-backup-1.png)
Enable Multi-AZ deployment.
![image](/assets/images/note/9551/5-4-rds-backup-2.png)
Click 'Modify' button, warning appears. Select 'Apply immediately' option.
![image](/assets/images/note/9551/5-4-rds-backup-3.png)
The status of the database instance will be in modifying status. Wait for a while until the status is changed to 'Available'.
![image](/assets/images/note/9551/5-4-rds-backup-4.png)
Click it to see the details, switch to Configuration tab, you can see Multi AZ is set to yes.
![image](/assets/images/note/9551/5-4-rds-backup-5.png)
Modify the database instance, turn on backup by setting the retention period to 35 days, then choose "Apply immediately" option.
![image](/assets/images/note/9551/5-4-rds-backup-6.png)
The database instance will change to modifying status again, wait until it becomes to Available status. Actions->Create read replica.
![image](/assets/images/note/9551/5-4-rds-backup-7.png)
Choose a different region to replica, eg. EU West(Ireland). Provide database identify name and keep other settings as default, click "Create read replica".
![image](/assets/images/note/9551/5-4-rds-backup-8.png)
A new database instance is created with role 'Replica' in a different AZ.
![image](/assets/images/note/9551/5-4-rds-backup-9.png)
Click Actions->Promote read replica to convert a MySQL Read Replica into a “standalone” RDS database instance.
![image](/assets/images/note/9551/5-4-rds-backup-10.png)
Exam tips.
![image](/assets/images/note/9551/5-4-rds-backup-exam-tips-1.png)
![image](/assets/images/note/9551/5-4-rds-backup-exam-tips-2.png)
![image](/assets/images/note/9551/5-4-rds-backup-exam-tips-3.png)
![image](/assets/images/note/9551/5-4-rds-backup-exam-tips-4.png)
### 5.5 DynamoDB
![image](/assets/images/note/9551/5-5-dynamodb-1.png)
![image](/assets/images/note/9551/5-5-dynamodb-2.png)
Eventual Consistent Reads.
![image](/assets/images/note/9551/5-5-dynamodb-3.png)
Strongly Consistent Reads.
![image](/assets/images/note/9551/5-5-dynamodb-4.png)
Exam tips.
![image](/assets/images/note/9551/5-5-dynamodb-exam-tips.png)
### 5.6 Redshift
![image](/assets/images/note/9551/5-6-redshift-1.png)
OLAP vs. OLTP
![image](/assets/images/note/9551/5-6-redshift-2.png)
Redshift from Amazon for data warehouse.
![image](/assets/images/note/9551/5-6-redshift-3.png)
RedShift Configuration.
![image](/assets/images/note/9551/5-6-redshift-4.png)
Advanced Compression.
![image](/assets/images/note/9551/5-6-redshift-5.png)
Massively Parallel Processing(MPP)
![image](/assets/images/note/9551/5-6-redshift-6.png)
Redshift backup.
![image](/assets/images/note/9551/5-6-redshift-7.png)
Redshift pricing.
![image](/assets/images/note/9551/5-6-redshift-8.png)
Redshift Security.
![image](/assets/images/note/9551/5-6-redshift-9.png)
Redshift Availability.
![image](/assets/images/note/9551/5-6-redshift-10.png)
Redshift exam tips.
![image](/assets/images/note/9551/5-6-redshift-exam-tips-1.png)
![image](/assets/images/note/9551/5-6-redshift-exam-tips-2.png)
### 5.7 Aurora
![image](/assets/images/note/9551/5-7-aurora-1.png)
![image](/assets/images/note/9551/5-7-aurora-2.png)
Scaling Aurora.
![image](/assets/images/note/9551/5-7-aurora-3.png)
Compare Aurora replica and MySQL replica.
![image](/assets/images/note/9551/5-7-aurora-4.png)
Backup Aurora.
![image](/assets/images/note/9551/5-7-aurora-5.png)
Select the MySQL instance, actions->Create Aurora read replica
![image](/assets/images/note/9551/5-7-aurora-6.png)
Choose 'Create Replica in Different Zone' and set DB instance identifier, keep other settings as default, click "Create read replica" button in the bottom.
![image](/assets/images/note/9551/5-7-aurora-7.png)
Aurora replica is created.
![image](/assets/images/note/9551/5-7-aurora-8.png)
Wait for a while, there is one writer instance and one reader instance.
![image](/assets/images/note/9551/5-7-aurora-9.png)
Exam tips.
![image](/assets/images/note/9551/5-7-aurora-exam-tips.png)
### 5.8 Elasticache
![image](/assets/images/note/9551/5-8-elastic-cache-1.png)
Redis vs Memcache.
![image](/assets/images/note/9551/5-8-elastic-cache-2.png)
Exam tips.
![image](/assets/images/note/9551/5-8-elastic-cache-3.png)
### 5.9 Databases Summary
![image](/assets/images/note/9551/5-9-database-summary-1.png)
![image](/assets/images/note/9551/5-9-database-summary-2.png)
![image](/assets/images/note/9551/5-9-database-summary-3.png)
![image](/assets/images/note/9551/5-9-database-summary-4.png)
![image](/assets/images/note/9551/5-9-database-summary-5.png)
![image](/assets/images/note/9551/5-9-database-summary-6.png)
![image](/assets/images/note/9551/5-9-database-summary-7.png)
![image](/assets/images/note/9551/5-9-database-summary-8.png)
![image](/assets/images/note/9551/5-9-database-summary-9.png)
![image](/assets/images/note/9551/5-9-database-summary-10.png)
![image](/assets/images/note/9551/5-9-database-summary-11.png)
![image](/assets/images/note/9551/5-9-database-summary-12.png)
### 5.10 Databases On AWS Quiz
![image](/assets/images/note/9551/5-10-database-quiz-1.png)
![image](/assets/images/note/9551/5-10-database-quiz-2.png)
![image](/assets/images/note/9551/5-10-database-quiz-3.png)
![image](/assets/images/note/9551/5-10-database-quiz-4.png)
![image](/assets/images/note/9551/5-10-database-quiz-5.png)
![image](/assets/images/note/9551/5-10-database-quiz-6.png)
![image](/assets/images/note/9551/5-10-database-quiz-7.png)
![image](/assets/images/note/9551/5-10-database-quiz-8.png)
![image](/assets/images/note/9551/5-10-database-quiz-9.png)
![image](/assets/images/note/9551/5-10-database-quiz-10.png)
![image](/assets/images/note/9551/5-10-database-quiz-11.png)
![image](/assets/images/note/9551/5-10-database-quiz-12.png)
![image](/assets/images/note/9551/5-10-database-quiz-13.png)
![image](/assets/images/note/9551/5-10-database-quiz-14.png)
![image](/assets/images/note/9551/5-10-database-quiz-15.png)
![image](/assets/images/note/9551/5-10-database-quiz-16.png)
![image](/assets/images/note/9551/5-10-database-quiz-17.png)
![image](/assets/images/note/9551/5-10-database-quiz-18.png)
![image](/assets/images/note/9551/5-10-database-quiz-19.png)
![image](/assets/images/note/9551/5-10-database-quiz-20.png)
![image](/assets/images/note/9551/5-10-database-quiz-21.png)
![image](/assets/images/note/9551/5-10-database-quiz-22.png)
![image](/assets/images/note/9551/5-10-database-quiz-23.png)
![image](/assets/images/note/9551/5-10-database-quiz-24.png)
![image](/assets/images/note/9551/5-10-database-quiz-25.png)
![image](/assets/images/note/9551/5-10-database-quiz-26.png)

## 6. Route53
### 6.1 DNS 101
![image](/assets/images/note/9551/6-1-dns-1.png)
IPV4, IPV6
![image](/assets/images/note/9551/6-1-dns-2.png)
Top level Domain.
![image](/assets/images/note/9551/6-1-dns-3.png)
IANA.
![image](/assets/images/note/9551/6-1-dns-4.png)
Domain registrars.
![image](/assets/images/note/9551/6-1-dns-5.png)
SOA.
![image](/assets/images/note/9551/6-1-dns-6.png)
NS Records.
![image](/assets/images/note/9551/6-1-dns-7.png)
A records.
![image](/assets/images/note/9551/6-1-dns-8.png)
TTL.
![image](/assets/images/note/9551/6-1-dns-9.png)
CName.
![image](/assets/images/note/9551/6-1-dns-10.png)
Alias Records.
![image](/assets/images/note/9551/6-1-dns-11.png)
![image](/assets/images/note/9551/6-1-dns-12.png)
Exam tips.
![image](/assets/images/note/9551/6-1-dns-exam-tips-1.png)
![image](/assets/images/note/9551/6-1-dns-exam-tips-2.png)
### 6.2 Route53 - Register A Domain Name Lab
Services -> Networking & Content Delivery -> Route 53, Registered domains

Search available domain, add you want to purchase into cart.
![image](/assets/images/note/9551/6-2-domain-name-1.png)
Provide the personal information.
![image](/assets/images/note/9551/6-2-domain-name-2.png)
It takes sometime before your new domain is ready.
![image](/assets/images/note/9551/6-2-domain-name-3.png)
Use the following bootstrap script to create three ec2 instance in different regions. For instance, we will create three instances in Ireland, Sydney and Ohio. Change the content in the index.html for each instance to make them unique. So later we know which instance we are visiting.
```raw
#!/bin/bash
yum update -y
yum install httpd -y
service httpd start
chkconfig httpd on
cd /var/www/html
echo "<html><h1>Hello Cloud Gurus! This is the X Web Server</h1></html>" > index.html
```
Exam tips.
![image](/assets/images/note/9551/6-2-domain-name-exam-tips.png)
### 6.3 Route53 Routing Policies Available On AWS
![image](/assets/images/note/9551/6-3-routing-policies.png)
### 6.4 Simple Routing Policy Lab
1 to N.
![image](/assets/images/note/9551/6-4-simple-routing-policy-1.png)
Preparation: Get the three public ip addresses of the three instances we created in 6.2.

Go to Route53 -> Host Zones, select the domain created in 6.2, click "Create record set".
![image](/assets/images/note/9551/6-4-simple-routing-policy-2.png)
Paste the three ip addresses into values box, choose 'Simple' as route policy, click Create.
![image](/assets/images/note/9551/6-4-simple-routing-policy-3.png)
Record sets are created.
![image](/assets/images/note/9551/6-4-simple-routing-policy-4.png)
Access the domain, we will be able to see the page. If you keep refreshing the page, the content won't change. The server always stay in the Ireland.
![image](/assets/images/note/9551/6-4-simple-routing-policy-5.png)
Change the TTL to 1 minutes.
![image](/assets/images/note/9551/6-4-simple-routing-policy-6.png)
Wait for 60 seconds and refresh the page. The content is returned from Ohio server.
![image](/assets/images/note/9551/6-4-simple-routing-policy-7.png)
Exam tips.
![image](/assets/images/note/9551/6-4-simple-routing-policy-exam-tips.png)
### 6.5 Weighted Routing Policy Lab
![image](/assets/images/note/9551/6-5-weighted-routing-policy-1.png)
![image](/assets/images/note/9551/6-5-weighted-routing-policy-2.png)
![image](/assets/images/note/9551/6-5-weighted-routing-policy-3.png)
Preparation: Delete the record sets for simple routing policy created in previous section. Notice, page won't be accessible(after TTL is past).

Create first record set as follows:
* TTL = 1m
* Value = ip addresses of Sydney instance
* Route policy = Weighted
* Weight = 20
* Set ID = Sydney
![image](/assets/images/note/9551/6-5-weighted-routing-policy-4.png)

Create second record set as follows:
* TTL = 1m
* Value = ip addresses of Ohio instance
* Route policy = Weighted
* Weight = 30
* Set ID = Ohio

Create third record set as follows:
* TTL = 1m
* Value = ip addresses of Ireland instance
* Route policy = Weighted
* Weight = 50
* Set ID = Ireland

Refresh the page, you will get response from Ireland with 50% chance, 30% chance from Ohio and 20% from Sydney.  

Exam tips.
![image](/assets/images/note/9551/6-5-latency-routing-policy-exam-tips-1.png)
![image](/assets/images/note/9551/6-5-latency-routing-policy-exam-tips-2.png)
### 6.6 Latency Routing Policy
![image](/assets/images/note/9551/6-6-latency-routing-policy-1.png)
![image](/assets/images/note/9551/6-6-latency-routing-policy-2.png)
Preparation 1: Delete the record sets for weighted routing policy created in previous section. Notice, page won't be accessible(after TTL is past).

Preparation 2: Create health check, Route53 -> Health checks, create Health Check, Name=Sydney.
![image](/assets/images/note/9551/6-6-create-health-checks-1.png)
Set the ip address of Sydney server and domain for host name. Set path to index.html, click Next.
![image](/assets/images/note/9551/6-6-create-health-checks-2.png)
Create another two health checks for Ohio and Ireland instances. Totally, we have three health checks.
![image](/assets/images/note/9551/6-6-create-health-checks-3.png)

Create first record set as follows:
* TTL = 1m
* Value = ip addresses of Sydney instance
* Route policy = Latency
* Region = ap-southeast-2
* Set ID = Sydney
* Associate with Health check = true
* Health check to associate = The health check of Sydney.
![image](/assets/images/note/9551/6-6-latency-routing-policy-3.png)
* Notice that when input the ip address, region is automatically selected based on the location.

Create second record set as follows:
* TTL = 1m
* Value = ip addresses of Ohio instance
* Route policy = Latency
* Region = us-east-2
* Set ID = Ohio
* Associate with Health check = true
* Health check to associate = The health check of Ohio.

Create second record set as follows:
* TTL = 1m
* Value = ip addresses of Ireland instance
* Route policy = Latency
* Region = eu-west-1
* Set ID = Ireland
* Associate with Health check = true
* Health check to associate = The health check of Ireland.

Refresh the page, it should show in the content fetched from the closest server. Use a VPN tool to change you machines ip to verify that you always get the content from the closest server.
![image](/assets/images/note/9551/6-6-latency-routing-policy-4.png)

### 6.7 Failover Routing Policy
![image](/assets/images/note/9551/6-7-failover-routing-policy-1.png)
![image](/assets/images/note/9551/6-7-failover-routing-policy-2.png)
Preparation: Delete the record sets for latency routing policy created in previous section. Notice, page won't be accessible(after TTL is past).

Create first record set as follows:
* TTL = 1m
* Value = ip addresses of Ireland instance
* Route policy = Failover
* Failover Record Type = Primary
* Set ID = Primary
* Associate with Health check = true
* Health check to associate = The health check of Ireland.
![image](/assets/images/note/9551/6-7-failover-routing-policy-3.png)

Create second record set as follows:
* TTL = 1m
* Value = ip addresses of Ohio instance
* Route policy = Failover
* Failover Record Type = Secondary
* Set ID = Secondary
* Associate with Health check = true
* Health check to associate = The health check of Ohio.

Access the page, we should see the Irish page.
![image](/assets/images/note/9551/6-7-failover-routing-policy-4.png)
Stop the Ireland instance. Go to health check, wait for a while. It becomes unhealthy.
![image](/assets/images/note/9551/6-7-failover-routing-policy-5.png)
Refresh the page, it connects to ohio automatically.
![image](/assets/images/note/9551/6-7-failover-routing-policy-6.png)
Exam tips.
![image](/assets/images/note/9551/6-7-failover-routing-policy-exam-tips.png)
### 6.8 Geolocation Routing Policy
![image](/assets/images/note/9551/6-8-geolocation-routing-policy-1.png)
![image](/assets/images/note/9551/6-8-geolocation-routing-policy-2.png)
![image](/assets/images/note/9551/6-8-geolocation-routing-policy-3.png)

Preparation: Delete the record sets for latency routing policy created in previous section. Notice, page won't be accessible(after TTL is past).

Create first record set as follows:
* TTL = 1m
* Value = ip addresses of Ireland instance
* Route policy = Geolocation
* Location = Europe
* Set ID = Europe
* Associate with Health check = true
* Health check to associate = The health check of Ireland.
![image](/assets/images/note/9551/6-8-geolocation-routing-policy-4.png)

Create second record set as follows:
* TTL = 1m
* Value = ip addresses of Ohio instance
* Route policy = Geolocation
* Location = North America
* Set ID = USA
* Associate with Health check = true
* Health check to associate = The health check of Ohio.

Access the web page, it should return the Irish page. If we change the location to USA using VPN tools, the page will return Ohio.

Exam tips.
![image](/assets/images/note/9551/6-8-geolocation-routing-policy-exam-tips.png)

### 6.9 Geoproximity Routing Policy (Traffic Flow Only)
![image](/assets/images/note/9551/6-9-geoproximity-routing-policy-1.png)
Go to Route53 -> Traffic policies->Create Traffic policy.
![image](/assets/images/note/9551/6-9-geoproximity-routing-policy-2.png)
Set policy name.
![image](/assets/images/note/9551/6-9-geoproximity-routing-policy-3.png)
Customize Geoproximity rules.
![image](/assets/images/note/9551/6-9-geoproximity-routing-policy-4.png)
### 6.10 Multivalue Answer
![image](/assets/images/note/9551/6-10-multivalue-answer-policy-1.png)
![image](/assets/images/note/9551/6-10-multivalue-answer-policy-2.png)
### 6.11 Route53 Summary
![image](/assets/images/note/9551/6-11-dns-summary-1.png)
![image](/assets/images/note/9551/6-11-dns-summary-2.png)
![image](/assets/images/note/9551/6-11-dns-summary-3.png)
![image](/assets/images/note/9551/6-11-dns-summary-4.png)
![image](/assets/images/note/9551/6-11-dns-summary-5.png)
![image](/assets/images/note/9551/6-11-dns-summary-6.png)
![image](/assets/images/note/9551/6-11-dns-summary-7.png)
![image](/assets/images/note/9551/6-11-dns-summary-8.png)
![image](/assets/images/note/9551/6-11-dns-summary-9.png)
![image](/assets/images/note/9551/6-11-dns-summary-10.png)
![image](/assets/images/note/9551/6-11-dns-summary-11.png)
### 6.12 Route 53 Quiz
![image](/assets/images/note/9551/6-12-route53-quiz-1.png)
![image](/assets/images/note/9551/6-12-route53-quiz-2.png)
![image](/assets/images/note/9551/6-12-route53-quiz-3.png)
![image](/assets/images/note/9551/6-12-route53-quiz-4.png)
![image](/assets/images/note/9551/6-12-route53-quiz-5.png)
![image](/assets/images/note/9551/6-12-route53-quiz-6.png)
![image](/assets/images/note/9551/6-12-route53-quiz-7.png)
![image](/assets/images/note/9551/6-12-route53-quiz-8.png)
![image](/assets/images/note/9551/6-12-route53-quiz-9.png)
## 7. VPCs
### 7.1 Introduction To VPCs
![image](/assets/images/note/9551/7-1-vpc-1.png)
![image](/assets/images/note/9551/7-1-vpc-2.png)
![image](/assets/images/note/9551/7-1-vpc-3.png)
![image](/assets/images/note/9551/7-1-vpc-4.png)
![image](/assets/images/note/9551/7-1-vpc-5.png)
![image](/assets/images/note/9551/7-1-vpc-6.png)
Default VPC vs. Custom VPC.
![image](/assets/images/note/9551/7-1-vpc-7.png)
VPC peering.
![image](/assets/images/note/9551/7-1-vpc-8.png)
Can't access from B to C through A. Must create VPC peering from B to C directly.
![image](/assets/images/note/9551/7-1-vpc-9.png)
Exam tips.
![image](/assets/images/note/9551/7-1-vpc-exam-tips.png)
### 7.2 Build A Custom VPC - Part 1
VPC contains Route Table, Network ACL and Security Group.
![image](/assets/images/note/9551/7-2-create-vpc-1.png)
Create VPC: Services->Networking & Content Delivery->VPC, select "Your VPCs" at the left panel.
![image](/assets/images/note/9551/7-2-create-vpc-2.png)
![image](/assets/images/note/9551/7-2-create-vpc-3.png)
New VPC is created.
![image](/assets/images/note/9551/7-2-create-vpc-4.png)
One more entry in Route Tables.
![image](/assets/images/note/9551/7-2-create-vpc-5.png)
One more entry in Network ACLs.
![image](/assets/images/note/9551/7-2-create-vpc-6.png)
One more entry in Security Group, the second one.
![image](/assets/images/note/9551/7-2-create-vpc-7.png)
Create Subnet, 10.0.1.0.
![image](/assets/images/note/9551/7-2-create-subnet-1.png)
Create another Subnet, 10.0.2.0.
![image](/assets/images/note/9551/7-2-create-subnet-2.png)
Two subnets are created.
![image](/assets/images/note/9551/7-2-create-subnet-3.png)
You see the "Available IPv4" is 251(total should be 256, CIDR.xyz), 5 ip addresses are reserved, see [VPCs and Subnets](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Subnets.html).
* 10.0.0.0: Network address.
* 10.0.0.1: Reserved by AWS for the VPC router.
* 10.0.0.2: Reserved by AWS. The IP address of the DNS server is always the base of the VPC network range plus two; however, we also reserve the base of each subnet range plus two. For VPCs with multiple CIDR blocks, the IP address of the DNS server is located in the primary CIDR. For more information, see Amazon DNS Server.
* 10.0.0.3: Reserved by AWS for future use.
* 10.0.0.255: Network broadcast address. We do not support broadcast in a VPC, therefore we reserve this address.

Select the first subnet, click Actions->Modify auto-assign IP settings.
![image](/assets/images/note/9551/7-2-create-subnet-4.png)
![image](/assets/images/note/9551/7-2-create-subnet-5.png)
Now, auto public ip address is enabled to the subnet 10.0.1.0.
![image](/assets/images/note/9551/7-2-create-subnet-6.png)
Now, our VPC looks like this.
![image](/assets/images/note/9551/7-2-create-subnet-7.png)
Create gateway: Select Internet Gateways->Create internet gateway.
![image](/assets/images/note/9551/7-2-create-gateway-1.png)
It is created and its state is detached.
![image](/assets/images/note/9551/7-2-create-gateway-2.png)
Select the gateway, Actions->Attach to VPC.
![image](/assets/images/note/9551/7-2-create-gateway-3.png)
Choose the VPC.
![image](/assets/images/note/9551/7-2-create-gateway-4.png)
Now, it is attached.
![image](/assets/images/note/9551/7-2-create-gateway-5.png)
* Notice, you can attach only one internet gateway to VPC.

Check the status of the current route table for new VPC. It has route for internal only.
![image](/assets/images/note/9551/7-2-create-route-tables-1.png)
There are two subnets, but none of them is associated to this route table.
![image](/assets/images/note/9551/7-2-create-route-tables-2.png)
Create new route table for public access.
![image](/assets/images/note/9551/7-2-create-route-tables-3.png)
The new route table is created, notice it is not main.
![image](/assets/images/note/9551/7-2-create-route-tables-4.png)
Click "Edit routes" button. Add two routes "0.0.0.0/0" for ipv4 and "::/0" for ipv6. Select the internet gateway created above as target.
![image](/assets/images/note/9551/7-2-create-route-tables-5.png)
Now we have two more routes.
![image](/assets/images/note/9551/7-2-create-route-tables-6.png)
Switch to Subnet Associations tab, click "Edit subnet associations" button.
![image](/assets/images/note/9551/7-2-create-route-tables-7.png)
Select the first one and save.
![image](/assets/images/note/9551/7-2-create-route-tables-8.png)
Now, the first subnet is associated with the public route table.
![image](/assets/images/note/9551/7-2-create-route-tables-9.png)
If we check the subnet associations of the main route tables, the first subnet is not there anymore. Now we have the private subnet and the public subnet.
![image](/assets/images/note/9551/7-2-create-route-tables-10.png)
Create instance for web server, select the second AMI.
![image](/assets/images/note/9551/7-2-create-instance-1.png)
Select the VPC created previously and select the first subnet. Notice the public ip is auto enabled.
![image](/assets/images/note/9551/7-2-create-instance-2.png)
Add tags to indicate this is a web server.
![image](/assets/images/note/9551/7-2-create-instance-3.png)
There is no existing security groups here(Not seeing the WebDMZ), since we are using the new VPC now.
![image](/assets/images/note/9551/7-2-create-instance-4.png)
Create new security group.
![image](/assets/images/note/9551/7-2-create-instance-5.png)
Create second instance for database. Select the VPC and choose the second subnet.  Notice the public ip is auto disabled.
![image](/assets/images/note/9551/7-2-create-instance-6.png)
Add tags to indicate this is a database server.
![image](/assets/images/note/9551/7-2-create-instance-7.png)
Use the default security group.
![image](/assets/images/note/9551/7-2-create-instance-8.png)
Now we have two instances, one for web server, one for db server. Notice the webserver has public ip address.
![image](/assets/images/note/9551/7-2-create-instance-9.png)
Until now, we have created the VPC from scratch and it looks as follows.
![image](/assets/images/note/9551/7-2-create-instance-10.png)
Exam tips.
![image](/assets/images/note/9551/7-2-create-vpc-exam-tips.png)
### 7.3 Build A Custom VPC - Part 2
Now we have two instances, one is web server and another is db server. Currently, the web server can't connect to db server. We will create security group to enable the connection from web server to db server.

Create new security group.
![image](/assets/images/note/9551/7-3-create-security-group.png)
It is created.
![image](/assets/images/note/9551/7-3-create-security-group-2.png)
Change the security group for db server. Select the database instance, Actions->Networking->Change Security Group.
![image](/assets/images/note/9551/7-3-create-security-group-3.png)
Only select the new security group for database.
![image](/assets/images/note/9551/7-3-create-security-group-4.png)
ssh to web server and ping the database server from it. '54.175.89.128' is the public ip of web server and '10.0.2.140' is the private ip of database server. If you upload the keypair to web server, you can also ssh to database server from webserver.
```raw
$ ssh ec2-user@54.175.89.128 -i johnny-aws-ec2-keypair.pem
The authenticity of host '54.175.89.128 (54.175.89.128)' can't be established.
ECDSA key fingerprint is SHA256:+IhFl1sALdOm4yIQbmA0OIyrG8jpfkufQfmmAlbnDNA.
Are you sure you want to continue connecting (yes/no)? yes
Warning: Permanently added '54.175.89.128' (ECDSA) to the list of known hosts.

       __|  __|_  )
       _|  (     /   Amazon Linux AMI
      ___|\___|___|

https://aws.amazon.com/amazon-linux-ami/2018.03-release-notes/
[ec2-user@ip-10-0-1-251 ~]$ ping 10.0.2.140
PING 10.0.2.140 (10.0.2.140) 56(84) bytes of data.
64 bytes from 10.0.2.140: icmp_seq=1 ttl=255 time=0.750 ms
64 bytes from 10.0.2.140: icmp_seq=2 ttl=255 time=0.881 ms
64 bytes from 10.0.2.140: icmp_seq=3 ttl=255 time=0.946 ms
64 bytes from 10.0.2.140: icmp_seq=4 ttl=255 time=0.807 ms
```
### 7.4 Network Address Translation (NAT)
Currently, there is one problem with the database server, it has no public connection to internet. We will create NAT instance and NAT Gateway to setup the connection for database server.
![image](/assets/images/note/9551/7-4-nat-gateway-1.png)
Launch new instance, search 'nat' in the 'Community AMIs', select the first one.
![image](/assets/images/note/9551/7-4-nat-gateway-2.png)
Select the custom VPC and choose the public subnet.
![image](/assets/images/note/9551/7-4-nat-gateway-3.png)
Add name to indicate it is a NAT instance.
![image](/assets/images/note/9551/7-4-nat-gateway-4.png)
Select the WebDMZ group.
![image](/assets/images/note/9551/7-4-nat-gateway-5.png)
![image](/assets/images/note/9551/7-4-nat-gateway-6.png)
The NAT instance is created, it's running in the same AZ with the web server. It has its own public ip address.
![image](/assets/images/note/9551/7-4-nat-gateway-7.png)
Disabling Source/Destination Checks, see [NAT Instances](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_NAT_Instance.html).

Select the NAT instance, actions->Networking->Change Source/Dest. Check.
![image](/assets/images/note/9551/7-4-nat-gateway-8.png)
Disable it.
![image](/assets/images/note/9551/7-4-nat-gateway-9.png)
Create route to let database server talk to nat instance.

Services -> VPC->Route Tables, select the main route table of the custom VPC, click "Edit rules".
![image](/assets/images/note/9551/7-4-nat-gateway-10.png)
Select the nat instance as target.
![image](/assets/images/note/9551/7-4-nat-gateway-11.png)
Done.
![image](/assets/images/note/9551/7-4-nat-gateway-12.png)
Now, if you ssh to your webserver, then ssh to your database server, you can run "yum install update", and it will be able to download files from internet.

NAT instance is not good as it may be overloaded. If it is stopped, then database server will lose the internet connection and you will see the route status becomes to 'blackhole'.
![image](/assets/images/note/9551/7-4-nat-gateway-13.png)

Create NAT gateway which is more reliable and flexible.

VPC->NAT Gateways->Create NAT Gateway.
![image](/assets/images/note/9551/7-4-nat-gateway-14.png)
Select the public subnet, click "Create New EIP".
![image](/assets/images/note/9551/7-4-nat-gateway-15.png)
Edit route tables.
![image](/assets/images/note/9551/7-4-nat-gateway-16.png)
Select the main route table, click "Edit routes".
![image](/assets/images/note/9551/7-4-nat-gateway-17.png)
Select the NAT gateway as target.
![image](/assets/images/note/9551/7-4-nat-gateway-18.png)
Done.
![image](/assets/images/note/9551/7-4-nat-gateway-19.png)
Switch to "NAT Gateways", the new gateway is there.
![image](/assets/images/note/9551/7-4-nat-gateway-20.png)
Now, the database server has the internet connection again.

Exam tips.
![image](/assets/images/note/9551/7-4-nat-gateway-exam-tips.png)
![image](/assets/images/note/9551/7-4-nat-gateway-exam-tips-2.png)
![image](/assets/images/note/9551/7-4-nat-gateway-exam-tips-3.png)
### 7.5 Access Control Lists (ACL)
We have two ACLs. One is default ACL, another is custom ACL for the custom VPC.
![image](/assets/images/note/9551/7-5-acl-1.png)
Create new ACL.
![image](/assets/images/note/9551/7-5-acl-2.png)
By default all inbound and outbound requests are denied.
![image](/assets/images/note/9551/7-5-acl-3.png)
Test the port 80. SSh to web server, run commands to create a web page and start web server.
```raw
[root@ip-10-0-1-251 ec2-user]# yum install httpd -y
[root@ip-10-0-1-251 ec2-user]# chkconfig httpd on
[root@ip-10-0-1-251 ec2-user]# service httpd start
Starting httpd:
[root@ip-10-0-1-251 ec2-user]# cd /var/www/html/
[root@ip-10-0-1-251 html]# ls
[root@ip-10-0-1-251 html]# echo '<html><h1>hello, johnny</h1></html>' > index.html
[root@ip-10-0-1-251 html]# ls
index.html
```
Access the public ip address, we should see the page.
![image](/assets/images/note/9551/7-5-acl-4.png)
It's currently working, because the default ACL has inbound rules for all public sources.
![image](/assets/images/note/9551/7-5-acl-5.png)
Associate the new ACL to current subnet. Select the new ACL and click "Edit subnet associations".
![image](/assets/images/note/9551/7-5-acl-6.png)
Choose the subnet which is for web server.
![image](/assets/images/note/9551/7-5-acl-7.png)
Notice, the old ACL doesn't associate the same subnet anymore.
![image](/assets/images/note/9551/7-5-acl-8.png)
Refresh the page, it will be timeout.
![image](/assets/images/note/9551/7-5-acl-9.png)
Add some rules(80,443,22) to inbound of the new ACL.
![image](/assets/images/note/9551/7-5-acl-10.png)
Similar, add rules for outbound of the new ACL. Check [Ephemeral Ports](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-network-acls.html#nacl-ephemeral-ports) to understand why we set the range 1024-65535.
![image](/assets/images/note/9551/7-5-acl-11.png)
Refresh the page, we get the page back.
![image](/assets/images/note/9551/7-5-acl-12.png)
ACL exam tips.
![image](/assets/images/note/9551/7-5-acl-exam-tips-1.png)
![image](/assets/images/note/9551/7-5-acl-exam-tips-2.png)
### 7.6 Custom VPCs and ELBs
ELB requires at least two subnets with gateway configured for all.
![image](/assets/images/note/9551/7-6-load-balancer-1.png)
### 7.7 VPC Flow Logs
![image](/assets/images/note/9551/7-7-vpc-flow-1.png)
![image](/assets/images/note/9551/7-7-vpc-flow-2.png)
Create Log Group in CloudWatch. Services->Management & Governance->CloudWatch
![image](/assets/images/note/9551/7-7-vpc-flow-3.png)
Go to VPC console, select the custom VPC, actions->Create flow log.
![image](/assets/images/note/9551/7-7-vpc-flow-4.png)
Click the link "Set Up Permissions".
![image](/assets/images/note/9551/7-7-vpc-flow-5.png)
Allow.
![image](/assets/images/note/9551/7-7-vpc-flow-6.png)
Go back to create the flow log.
![image](/assets/images/note/9551/7-7-vpc-flow-7.png)
Now the flow log is enabled. Refresh the web page.
![image](/assets/images/note/9551/7-7-vpc-flow-8.png)
Then go to CloudWatch, select Logs and click the log group.
![image](/assets/images/note/9551/7-7-vpc-flow-9.png)
You will see some log streams.
![image](/assets/images/note/9551/7-7-vpc-flow-10.png)
Click on any of them, you will see the detailed logs.
![image](/assets/images/note/9551/7-7-vpc-flow-11.png)
Exam tips.
![image](/assets/images/note/9551/7-7-vpc-flow-exam-tips-1.png)
![image](/assets/images/note/9551/7-7-vpc-flow-exam-tips-2.png)
### 7.8 Bastions
![image](/assets/images/note/9551/7-8-bastions-1.png)
![image](/assets/images/note/9551/7-8-bastions-2.png)
![image](/assets/images/note/9551/7-8-bastions-exam-tips.png)
### 7.9 Direct Connect
![image](/assets/images/note/9551/7-9-direct-connect-1.png)
![image](/assets/images/note/9551/7-9-direct-connect-2.png)
![image](/assets/images/note/9551/7-9-direct-connect-exam-tips.png)
### 7.10 VPC End Points
VPC Endpoint.
![image](/assets/images/note/9551/7-10-vpc-endpoints-1.png)
![image](/assets/images/note/9551/7-10-vpc-endpoints-2.png)
![image](/assets/images/note/9551/7-10-vpc-endpoints-3.png)
![image](/assets/images/note/9551/7-10-vpc-endpoints-4.png)
Current solution: Use NAT gateway to let private subnet to access public internet.
![image](/assets/images/note/9551/7-10-vpc-endpoints-5.png)
Use VPC gateway to achieve the same purpose.
![image](/assets/images/note/9551/7-10-vpc-endpoints-6.png)
Create endpoint: Service->VPC->Endpoints, Create Endpoint, select s3 and gateway.
![image](/assets/images/note/9551/7-10-vpc-endpoints-7.png)
Select the custom VPC, and choose the main subnet, 10.0.2.0.
![image](/assets/images/note/9551/7-10-vpc-endpoints-8.png)
Now, the end point is created.
![image](/assets/images/note/9551/7-10-vpc-endpoints-9.png)
Go to the Route Tables, select the main route table, wait for few minutes, the endpoint will show up in the routes. With this endpoint, the private subnet can connect to outside world.
![image](/assets/images/note/9551/7-10-vpc-endpoints-10.png)
Exam tips.
![image](/assets/images/note/9551/7-10-vpc-endpoints-exam-tips-1.png)
![image](/assets/images/note/9551/7-10-vpc-endpoints-exam-tips-2.png)
### 7.11 Summary
![image](/assets/images/note/9551/7-11-vpc-summary-1.png)
![image](/assets/images/note/9551/7-11-vpc-summary-2.png)
![image](/assets/images/note/9551/7-11-vpc-summary-3.png)
![image](/assets/images/note/9551/7-11-vpc-summary-4.png)
![image](/assets/images/note/9551/7-11-vpc-summary-5.png)
![image](/assets/images/note/9551/7-11-vpc-summary-6.png)
![image](/assets/images/note/9551/7-11-vpc-summary-7.png)
![image](/assets/images/note/9551/7-11-vpc-summary-8.png)
![image](/assets/images/note/9551/7-11-vpc-summary-9.png)
![image](/assets/images/note/9551/7-11-vpc-summary-10.png)
![image](/assets/images/note/9551/7-11-vpc-summary-11.png)
![image](/assets/images/note/9551/7-11-vpc-summary-12.png)
![image](/assets/images/note/9551/7-11-vpc-summary-13.png)
![image](/assets/images/note/9551/7-11-vpc-summary-14.png)
![image](/assets/images/note/9551/7-11-vpc-summary-15.png)
![image](/assets/images/note/9551/7-11-vpc-summary-16.png)
![image](/assets/images/note/9551/7-11-vpc-summary-17.png)
### 7.12 VPCs Quiz
![image](/assets/images/note/9551/7-12-vpc-quiz-1.png)
![image](/assets/images/note/9551/7-12-vpc-quiz-2.png)
![image](/assets/images/note/9551/7-12-vpc-quiz-3.png)
![image](/assets/images/note/9551/7-12-vpc-quiz-4.png)
![image](/assets/images/note/9551/7-12-vpc-quiz-5.png)
![image](/assets/images/note/9551/7-12-vpc-quiz-6.png)
![image](/assets/images/note/9551/7-12-vpc-quiz-7.png)
![image](/assets/images/note/9551/7-12-vpc-quiz-8.png)
![image](/assets/images/note/9551/7-12-vpc-quiz-9.png)
![image](/assets/images/note/9551/7-12-vpc-quiz-10.png)
![image](/assets/images/note/9551/7-12-vpc-quiz-11.png)
![image](/assets/images/note/9551/7-12-vpc-quiz-12.png)
![image](/assets/images/note/9551/7-12-vpc-quiz-13.png)
![image](/assets/images/note/9551/7-12-vpc-quiz-14.png)
![image](/assets/images/note/9551/7-12-vpc-quiz-15.png)
![image](/assets/images/note/9551/7-12-vpc-quiz-16.png)
![image](/assets/images/note/9551/7-12-vpc-quiz-17.png)
![image](/assets/images/note/9551/7-12-vpc-quiz-18.png)
![image](/assets/images/note/9551/7-12-vpc-quiz-19.png)
![image](/assets/images/note/9551/7-12-vpc-quiz-20.png)
![image](/assets/images/note/9551/7-12-vpc-quiz-21.png)
![image](/assets/images/note/9551/7-12-vpc-quiz-22.png)
![image](/assets/images/note/9551/7-12-vpc-quiz-23.png)
![image](/assets/images/note/9551/7-12-vpc-quiz-24.png)
![image](/assets/images/note/9551/7-12-vpc-quiz-25.png)


## 8. HA Architecture
### 8.1 Load Balancers Theory
Load balancer types.
![image](/assets/images/note/9551/8-1-load-balancer-1.png)
Application load balancer.
![image](/assets/images/note/9551/8-1-load-balancer-2.png)
Network load balancer.
![image](/assets/images/note/9551/8-1-load-balancer-3.png)
Classic load balancer.
![image](/assets/images/note/9551/8-1-load-balancer-4.png)
![image](/assets/images/note/9551/8-1-load-balancer-5.png)
X-Forwarded-For-Header
![image](/assets/images/note/9551/8-1-load-balancer-6.png)
Exam tips.
![image](/assets/images/note/9551/8-1-load-balancer-exam-tips-1.png)
![image](/assets/images/note/9551/8-1-load-balancer-exam-tips-2.png)
![image](/assets/images/note/9551/8-1-load-balancer-exam-tips-3.png)
### 8.2 Load Balancers And Health Checks Lab
Reminder: Load Balancers are **not** free.

Diagram: Load Balancer & Health Check Architecture
![image](/assets/images/note/9551/8-2-load-balancer-architecture.png)

Lab1: Create two instances with show different web pages, then create classic load balancer.

1) Create first instance with the following bootstrap script, make it showing "This is WebServer 01" in the web page.
```raw
#!/bin/bash
yum update -y
yum install httpd -y
service httpd start
chkconfig httpd on
cd /var/www/html
echo "<html><h1>This is WebServer 01</h1></html>" > index.html
```
Specify the subnet/AZ to 'eu-west-1a'.
![image](/assets/images/note/9551/8-2-classic-load-balancer-1.png)
2) Create second instance with the same bootstrap script, make it showing "This is WebServer 02" in the web page. Specify the subnet/AZ to 'eu-west-1b'. Now, we have two instances running in different AZs.
![image](/assets/images/note/9551/8-2-classic-load-balancer-2.png)
If we access the public id address, we will see the "This is WebServer 01" or "This is WebServer 02" respectively.
![image](/assets/images/note/9551/8-2-classic-load-balancer-3.png)
3) Create new classic load balancer. Services->EC2->Load Balancers, Create Load Balancer, provider name for it.
![image](/assets/images/note/9551/8-2-classic-load-balancer-4.png)
Choose the existing security group.
![image](/assets/images/note/9551/8-2-classic-load-balancer-5.png)
Configure health check.
![image](/assets/images/note/9551/8-2-classic-load-balancer-6.png)
Add two EC2 instances.
![image](/assets/images/note/9551/8-2-classic-load-balancer-7.png)
Keep tag empty and create. The load balancer is created, wait until the status is changed from "OutService" to "InService".
![image](/assets/images/note/9551/8-2-classic-load-balancer-8.png)
Copy the dns name and visit it in web browser.
![image](/assets/images/note/9551/8-2-classic-load-balancer-9.png)
We will see the content. Keep refreshing the page, sometimes we hit WebServer 1 and sometime we hit WebServer 2.
![image](/assets/images/note/9551/8-2-classic-load-balancer-10.png)
Stop the first instance which is Webserver 1.
![image](/assets/images/note/9551/8-2-classic-load-balancer-11.png)
The health check will notice this and the status of web server 1 instance is changed to "OutService".
![image](/assets/images/note/9551/8-2-classic-load-balancer-12.png)
If we refresh the page, we will only see webserver 2, as load balancer detects webserver 1 is not available, it is sending all traffic to web server 2.
![image](/assets/images/note/9551/8-2-classic-load-balancer-13.png)

Lab2: Create target group and application load balancer.

1) Create Target Group: Services->EC2->Target Groups, Create Target Group, provide the group name.
![image](/assets/images/note/9551/8-2-application-load-balancer-1.png)
Set path, threshold, timeout and interval.
![image](/assets/images/note/9551/8-2-application-load-balancer-2.png)
Once the group is created, switch to "Targets" tab, click "Edit" button.
![image](/assets/images/note/9551/8-2-application-load-balancer-3.png)
Add the two web server instances.
![image](/assets/images/note/9551/8-2-application-load-balancer-4.png)
2) Create new application load balancer. Services->EC2->Load Balancers, Create Load Balancer, select Application Load Balancer, provider name for it.
![image](/assets/images/note/9551/8-2-application-load-balancer-5.png)
Select all availability zones, next.
![image](/assets/images/note/9551/8-2-application-load-balancer-6.png)
Skip the warning, next.
![image](/assets/images/note/9551/8-2-application-load-balancer-7.png)
Select the WebDMZ security group, next.
![image](/assets/images/note/9551/8-2-application-load-balancer-8.png)
Select the existing group created in previous lab, next.
![image](/assets/images/note/9551/8-2-application-load-balancer-9.png)
Leave as it is.
![image](/assets/images/note/9551/8-2-application-load-balancer-10.png)
Go back the target group, click Edit.
![image](/assets/images/note/9551/8-2-application-load-balancer-11.png)
Select the two instances and click 'Add to registered'.
![image](/assets/images/note/9551/8-2-application-load-balancer-12.png)
Wait for a while, until the status become 'healthy'.
![image](/assets/images/note/9551/8-2-application-load-balancer-13.png)
Go to the load balancer, copy the dns name, visit it in the web browser.
![image](/assets/images/note/9551/8-2-application-load-balancer-14.png)
We will see the content. Keep refreshing the page, sometimes we hit WebServer 1 and sometime we hit WebServer 2.
![image](/assets/images/note/9551/8-2-application-load-balancer-15.png)
Why application load balancer is more intelligent than classic load balancer? Check the listeners in the load balancer, click on the listener.
![image](/assets/images/note/9551/8-2-application-load-balancer-21.png)
You can create rules with conditions and corresponding actions.
![image](/assets/images/note/9551/8-2-application-load-balancer-22.png)
![image](/assets/images/note/9551/8-2-application-load-balancer-23.png)
Exam tips.
![image](/assets/images/note/9551/8-2-load-balancer-exam-tips-1.png)
![image](/assets/images/note/9551/8-2-load-balancer-exam-tips-2.png)
![image](/assets/images/note/9551/8-2-load-balancer-exam-tips-3.png)
![image](/assets/images/note/9551/8-2-load-balancer-exam-tips-4.png)
### 8.3 Advanced Load Balancer Theory
Sticky sessions.
![image](/assets/images/note/9551/8-3-advanced-load-balancer-1.png)
![image](/assets/images/note/9551/8-3-advanced-load-balancer-2.png)
No Cross Zone load Balancing.
![image](/assets/images/note/9551/8-3-advanced-load-balancer-3.png)
With Cross Zone load Balancing.
![image](/assets/images/note/9551/8-3-advanced-load-balancer-4.png)
![image](/assets/images/note/9551/8-3-advanced-load-balancer-5.png)
Path Patterns.
![image](/assets/images/note/9551/8-3-advanced-load-balancer-6.png)
![image](/assets/images/note/9551/8-3-advanced-load-balancer-7.png)
Exam tips.
![image](/assets/images/note/9551/8-3-advanced-load-balancer-exam-tips.png)
### 8.4 Autoscaling Groups Lab
Create autoscaling group with 3 instances. Create 3 instances and terminate two, after a while, new two instances will be launched automatically.

Create Launch Configuration: Services->EC2->Auto Scaling->Launch Configurations, Create launch configuration.
![image](/assets/images/note/9551/8-4-autoscaling-groups-1.png)
Select the first AMI.
![image](/assets/images/note/9551/8-4-autoscaling-groups-2.png)
Select the free tier one.
![image](/assets/images/note/9551/8-4-autoscaling-groups-3.png)
Set name and put the bootstrap script.
```raw
#!/bin/bash
yum update -y
yum install httpd -y
service httpd start
chkconfig httpd on
cd /var/www/html
echo "<html><h1>Welcome to the EC2 Fleet!</h1></html>" > index.html
```
![image](/assets/images/note/9551/8-4-autoscaling-groups-4.png)
Leave unchanged for the storage.
![image](/assets/images/note/9551/8-4-autoscaling-groups-5.png)
Select the WebDMZ security group, next.
![image](/assets/images/note/9551/8-4-autoscaling-groups-6.png)
Click "Create an AutoScaling Group using this launch configuration".
![image](/assets/images/note/9551/8-4-autoscaling-groups-7.png)
Set the group size=3.
![image](/assets/images/note/9551/8-4-autoscaling-groups-8.png)
Set the scale group size.
![image](/assets/images/note/9551/8-4-autoscaling-groups-9.png)
Skip the notification.
![image](/assets/images/note/9551/8-4-autoscaling-groups-10.png)
Set instance tag.
![image](/assets/images/note/9551/8-4-autoscaling-groups-11.png)
The AutoScaling group is created. Three instances are under this group.
![image](/assets/images/note/9551/8-4-autoscaling-groups-12.png)
Go to EC2 instance, we see all instances are up.
![image](/assets/images/note/9551/8-4-autoscaling-groups-13.png)
Terminate two of them.
![image](/assets/images/note/9551/8-4-autoscaling-groups-14.png)
In the Activity history of the AutoScaling group, we can see it detects the termination and launch new instances automatically.
![image](/assets/images/note/9551/8-4-autoscaling-groups-15.png)
After a while, new instances are launched.
![image](/assets/images/note/9551/8-4-autoscaling-groups-16.png)
### 8.5 HA Architecture
![image](/assets/images/note/9551/8-5-ha-architecture-1.png)
![image](/assets/images/note/9551/8-5-ha-architecture-2.png)
* [The Netflix Simian Army](https://medium.com/netflix-techblog/the-netflix-simian-army-16e57fbab116)

![image](/assets/images/note/9551/8-5-ha-architecture-3.png)
![image](/assets/images/note/9551/8-5-ha-architecture-4.png)
![image](/assets/images/note/9551/8-5-ha-architecture-5.png)
### 8.6 HA Word Press Site
The architecture of the wordpress website.
![image](/assets/images/note/9551/8-6-wordpress-1.png)
1) Create two S3 buckets, one for storing codes, another for media files.
![image](/assets/images/note/9551/8-6-wordpress-2.png)
2) Create distribution: Services->Networking & Content Delivery->CloudFront, Create Distribution.
![image](/assets/images/note/9551/8-6-wordpress-3.png)
Choose the **media** bucket for the Origin Domain Name, leave others as default.
![image](/assets/images/note/9551/8-6-wordpress-4.png)
The distribution is created and it takes some time to be ready.
![image](/assets/images/note/9551/8-6-wordpress-5.png)
3) Security Group  
Make sure the WebDMZ group has port 80 opened for all incoming requests.
![image](/assets/images/note/9551/8-6-wordpress-6.png)
And make sure rds group has opened mysql database port to WebDMZ group.
![image](/assets/images/note/9551/8-6-wordpress-7.png)
4) Create MySQL database, Services->RDS->Create Database, choose 'Dev/Test'.  
![image](/assets/images/note/9551/8-6-wordpress-8.png)
Specify db identifier, db name and password.
![image](/assets/images/note/9551/8-6-wordpress-9.png)
Select 't2.micro' for DB instance class, set storage size to 1000GB.
![image](/assets/images/note/9551/8-6-wordpress-10.png)
Enable Multi-AZ.
![image](/assets/images/note/9551/8-6-wordpress-11.png)
Expand 'Additional connectivity configuration', choose the 'rds-launch-wizard' as the security group.
![image](/assets/images/note/9551/8-6-wordpress-12.png)
Specify the initial database name, so that a new database will be created once the rds instance is launched.
![image](/assets/images/note/9551/8-6-wordpress-13.png)
MySQL instance is created.
![image](/assets/images/note/9551/8-6-wordpress-14.png)
5) Create new Role, Services->IAM->Roles->Create Role, choose EC2.
![image](/assets/images/note/9551/8-6-wordpress-15.png)
Search 's3', choose 'AmazonS3FullAccess'.
![image](/assets/images/note/9551/8-6-wordpress-16.png)
Skip the tag, provide the name for the new role.
![image](/assets/images/note/9551/8-6-wordpress-17.png)
6) Create EC2 instance.  
In 'Configure Instance' step, leave others unchanged, just change the role with the one we just created, S3ForWP. And paste the bootstrap script to user data.
```raw
#!/bin/bash
yum update -y
yum install httpd php php-mysql -y
cd /var/www/html
echo "healthy" > healthy.html
wget https://wordpress.org/wordpress-5.1.1.tar.gz
tar -xzf wordpress-5.1.1.tar.gz
cp -r wordpress/* /var/www/html/
rm -rf wordpress
rm -rf wordpress-5.1.1.tar.gz
chmod -R 755 wp-content
chown -R apache:apache wp-content
wget https://s3.amazonaws.com/bucketforwordpresslab-donotdelete/htaccess.txt
mv htaccess.txt .htaccess
chkconfig httpd on
service httpd start
```
![image](/assets/images/note/9551/8-6-wordpress-18.png)
Set Tag.
![image](/assets/images/note/9551/8-6-wordpress-19.png)
Select the WebDMZ security group, launch instance.
![image](/assets/images/note/9551/8-6-wordpress-20.png)
Lab problem.
![image](/assets/images/note/9551/8-6-wordpress-lab-problem.png)
### 8.7 Setting Up EC2
1) Preparation:  
Check that FrontCloud Distribution created in previous lab is enabled and deployed.
![image](/assets/images/note/9551/8-7-wordpress-1.png)
The RDS(MySQL) is also available.
![image](/assets/images/note/9551/8-7-wordpress-2.png)
EC2 Instance is up now, copy the public ip address.
![image](/assets/images/note/9551/8-7-wordpress-3.png)
ssh to the web server instance, navigate to /var/www/html directory, check if all wp files are there.
![image](/assets/images/note/9551/8-7-wordpress-4.png)
Also check if htaccess is configured.
```raw
cat .htaccess
```
![image](/assets/images/note/9551/8-7-wordpress-5.png)
2) Launch WordPress and create a new post with images.  
Start the apache server and visit the ip address in web browser, wordpress is started.
![image](/assets/images/note/9551/8-7-wordpress-6.png)
Setup wordpress, the database host is the endpoint of the MySQL instance.
![image](/assets/images/note/9551/8-7-wordpress-7.png)
Error occurs: can’t write the wp-config.php file.
![image](/assets/images/note/9551/8-7-wordpress-8.png)
Copy the script, then ssh to the web server. Create a file named wp-config.php in folder /var/www/html with the script. Refresh the page, you should see the wordpress configuration page successfully. Put the required information here, click "Install WordPress".
![image](/assets/images/note/9551/8-7-wordpress-9.png)
WordPress is installed successfully.
![image](/assets/images/note/9551/8-7-wordpress-10.png)
Login with acloudgur/acloudguru.
![image](/assets/images/note/9551/8-7-wordpress-11.png)
Home page of WordPress.
![image](/assets/images/note/9551/8-7-wordpress-12.png)
Create a new post with two images.
![image](/assets/images/note/9551/8-7-wordpress-13.png)
Click publish, new the post is published and we are able to view it.
![image](/assets/images/note/9551/8-7-wordpress-14.png)
In the web server, we will see the upload folder with two image files.
![image](/assets/images/note/9551/8-7-wordpress-15.png)
3) Next, we want each time user uploads the images, they can be replicated to S3 automatically.

Use `aws s3 ls` to show the existing buckets in s3. Use `aws s3 cp` command to copy files from web server to s3 **media** buckets.
![image](/assets/images/note/9551/8-7-wordpress-16.png)
Moreover, use `aws s3 cp` to copy the entire wordpress files into s3 **code** bucket.
![image](/assets/images/note/9551/8-7-wordpress-17.png)
Use `aws s3 ls` to check all files are copied to s3 bucket.
![image](/assets/images/note/9551/8-7-wordpress-18.png)
4) Setup redirect, whenever user accesses the post, all the image requests will be redirected to s3.  
Get the domain name of the cloudfront distribution.
![image](/assets/images/note/9551/8-7-wordpress-19.png)
Edit the '.htaccess' file.
![image](/assets/images/note/9551/8-7-wordpress-20.png)
Update the `rewriterrule` with the domain name of cloudfront distribution, which is pointing to s3.
![image](/assets/images/note/9551/8-7-wordpress-21.png)
Use `aws s3 sync` to sync the changed files from web server to s3 buckets. This time, only the '.htaccess' file is synced.
![image](/assets/images/note/9551/8-7-wordpress-22.png)
Edit file `/etc/httpd/conf/httpd.conf`.
![image](/assets/images/note/9551/8-7-wordpress-23.png)
Change the value of `AllowOverride` from None to All.
![image](/assets/images/note/9551/8-7-wordpress-24.png)
Run `service httpd restart` to restart apache.
5) Update bucket policy for **media** bucket.  
Paste the following script into Bucket Policy, replace the arn.
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": [
        "s3:GetObject"
        ],
      "Resource": [
        "arn:aws:s3:::BUCKET_NAME/*"
        ]
    }
  ]
}
```
![image](/assets/images/note/9551/8-7-wordpress-25.png)
After clicking "Save" button, both permission and bucket policy are marked as public.
![image](/assets/images/note/9551/8-7-wordpress-26.png)
If you encounter any error, select the s3 bucket, click "Edit public access settings".
![image](/assets/images/note/9551/8-7-wordpress-27.png)
Make sure none of the options are checked, and save.
![image](/assets/images/note/9551/8-7-wordpress-28.png)
Wait for a while, revisit the post, the image should be fetched from the cloudfront, which is pointing to s3 media bucket.
![image](/assets/images/note/9551/8-7-wordpress-29.png)
5) Create new application load balancer.  
Put the name.
![image](/assets/images/note/9551/8-7-wordpress-30.png)
Select all available AZs.
![image](/assets/images/note/9551/8-7-wordpress-31.png)
Select the WebDMZ security group.
![image](/assets/images/note/9551/8-7-wordpress-32.png)
Create a new target group, set path to healthy.html.
![image](/assets/images/note/9551/8-7-wordpress-33.png)
Choose the instance, then create.
![image](/assets/images/note/9551/8-7-wordpress-34.png)
Load balancer is created, wait for few minutes, the status is changed to 'active'.
![image](/assets/images/note/9551/8-7-wordpress-35.png)
6) Optional step, domain name, Services->Route 53->Hosted Zone.
![image](/assets/images/note/9551/8-7-wordpress-36.png)
Select the existing domain, click 'Create Record Sets'.
![image](/assets/images/note/9551/8-7-wordpress-37.png)
Choose 'Alias'=Yes, Alias Target = application load balancer.
![image](/assets/images/note/9551/8-7-wordpress-38.png)
Now the dns is pointing to the load balancer.
![image](/assets/images/note/9551/8-7-wordpress-39.png)
7) Target Group. Add instance into target group.

Services->EC2->Target Group, select the target group, click Edit button in Targets tab.
![image](/assets/images/note/9551/8-7-wordpress-40.png)
Select the instance and click 'Add to registered'.
![image](/assets/images/note/9551/8-7-wordpress-41.png)
Wait for a while, the status becomes healthy.
![image](/assets/images/note/9551/8-7-wordpress-42.png)
Visit the domain, we should see the post.
![image](/assets/images/note/9551/8-7-wordpress-43.png)
### 8.8 Adding Resilience And Autoscaling
![image](/assets/images/note/9551/8-8-resilience-autoscaling-1.png)
Lab: The left node will be used for writing only and all the read request will be sent to the right node, which is a replica of the left.

1) Automate files synchronization from web server to s3 bucket.  
Create file named `crontab` in `/etc` directory.
```raw
cd /etc
nano crontab
```
Put the following content into it. The sync happens in every minute.
```raw
*/1 * * * * root aws s3 sync --delete s3://acloudguruwp-code-rjk19 /var/www/html
```
![image](/assets/images/note/9551/8-8-resilience-autoscaling-2.png)

Run following command to start the `cront` service.
```raw
service cront restart
```
![image](/assets/images/note/9551/8-8-resilience-autoscaling-3.png)
Test this by uploading a file into the **code** bucket.
![image](/assets/images/note/9551/8-8-resilience-autoscaling-4.png)
Restart the cront service, find the file in /etc/www/html directory.
![image](/assets/images/note/9551/8-8-resilience-autoscaling-5.png)
2) Setup the read replica and put it behind the load balancer.  
Select the WordPress EC2 instance, Actions->Image->Create Image.
![image](/assets/images/note/9551/8-8-read-replica-1.png)
Set the name and description, create image.
![image](/assets/images/note/9551/8-8-read-replica-2.png)
The EC2 instance will reboot and an AMI is create.
![image](/assets/images/note/9551/8-8-read-replica-3.png)

3) Update crontab configuration in the first WP instance, which will be used as write node.
```raw
*/1 * * * * root aws s3 sync --delete /var/www/html s3://acloudguruwp-code-rjk19
*/1 * * * * root aws s3 sync --delete /var/www/html/wp-content/uploads/ s3://acloudguruwp-media-rjk19
```
* Be aware of that this web server a writing node.
* The first rule: sync all files from write instance to **code** bucket.
* The second rule: sync all uploaded images from write instance to **media** bucket.

![image](/assets/images/note/9551/8-8-read-replica-4.png)
Testing the settings. Create a file named test.txt in the /var/www/html directory and restart the cront service.
![image](/assets/images/note/9551/8-8-read-replica-5.png)
Go to the s3 **code** bucket, test.txt is there. You may not be able to see it immediately due to the eventual consistency.
![image](/assets/images/note/9551/8-8-read-replica-6.png)
4) Launch new instance for read node.  
Create auto scaling group, Services->EC2->Auto Scaling Group.
![image](/assets/images/note/9551/8-8-launch-read-replica-1.png)
Select the option 'Create a new launch configuration'.
![image](/assets/images/note/9551/8-8-launch-read-replica-2.png)
Select the own AMI image.
![image](/assets/images/note/9551/8-8-launch-read-replica-3.png)

Set name, choose IAM role and put the bootstrap script into user data.
```raw
#!/bin/bash
yum update -y
aws s3 sync --delete s3://YOUR_S3_BUCKET_NAME /var/www/html
```
![image](/assets/images/note/9551/8-8-launch-read-replica-4.png)
Keep the default values for storage.
![image](/assets/images/note/9551/8-8-launch-read-replica-5.png)
Select the WebDMZ security group.
![image](/assets/images/note/9551/8-8-launch-read-replica-6.png)
After clicking the launch instance, you will see the 'configure autoscaling group' page. Set name, select all available AZs.
![image](/assets/images/note/9551/8-8-launch-read-replica-7.png)
Choose the Target Group and set the grace period to 60 seconds, next.
![image](/assets/images/note/9551/8-8-launch-read-replica-8.png)
Leave as it is.
![image](/assets/images/note/9551/8-8-launch-read-replica-9.png)
Skip the notification, set instance tag.
![image](/assets/images/note/9551/8-8-launch-read-replica-10.png)
Review, create auto scaling group.
![image](/assets/images/note/9551/8-8-launch-read-replica-11.png)
5) Remove the write node from the target group. Select the target group, click edit button.
![image](/assets/images/note/9551/8-8-launch-read-replica-12.png)
Select the instance, click remove button.
![image](/assets/images/note/9551/8-8-launch-read-replica-13.png)
Now we see the two read nodes.
![image](/assets/images/note/9551/8-8-launch-read-replica-14.png)
Rename the write node to MyWP-WN to make more clear.
![image](/assets/images/note/9551/8-8-launch-read-replica-15.png)
Check the target group, both two read nodes are healthy.
![image](/assets/images/note/9551/8-8-launch-read-replica-16.png)
6) Testing  
Visit the site with the domain name, it should return the images from s3 bucket.
![image](/assets/images/note/9551/8-8-read-replica-testing-1.png)
Visit the admin page of wordpress, http://domain/wp-admin/, input user name and password.
![image](/assets/images/note/9551/8-8-read-replica-testing-2.png)
Now we are in the admin page. Notice that the domain is an ip address, which is write's node public ip.
![image](/assets/images/note/9551/8-8-read-replica-testing-3.png)
Create a new post with uploading a picture.
![image](/assets/images/note/9551/8-8-read-replica-testing-4.png)
The image is not showing properly. This is because the image is not propagated from s3 bucket yet.
![image](/assets/images/note/9551/8-8-read-replica-testing-5.png)
Publish the post and wait for few minutes. Refresh the page, we should be able to see the image.
![image](/assets/images/note/9551/8-8-read-replica-testing-6.png)
If we visit the frontend, we should see the new post with image propagated properly.
![image](/assets/images/note/9551/8-8-read-replica-testing-7.png)
If we copy the image url and view it in browser, we should see it is from the cloudfront, from s3 bucket.
![image](/assets/images/note/9551/8-8-read-replica-testing-8.png)
7) Test High Availability.  
Terminate one of the read node.
![image](/assets/images/note/9551/8-8-testing-availability-1.png)
Check the target group, there is only one healthy instance. If we visit the site, it is still responsive, though there may be some latency.
![image](/assets/images/note/9551/8-8-testing-availability-2.png)
Check the auto scaling group, check the history, it detects the unhealthy occurrence.
![image](/assets/images/note/9551/8-8-testing-availability-3.png)
New instance will be launched automatically.
![image](/assets/images/note/9551/8-8-testing-availability-4.png)
Check the target group, wait until the healthy node comes back. Again, we have to healthy read nodes.
![image](/assets/images/note/9551/8-8-testing-availability-5.png)
Refresh the site, it is still running properly. We have auto healing system!
![image](/assets/images/note/9551/8-8-testing-availability-6.png)

### 8.9 Cleaning Up
Lab: RDS failover, High availability of database.  

Reboot the database.
![image](/assets/images/note/9551/8-9-rds-failover-1.png)
Select the "Reboot With Failover" option. The database will be failed over from one availability zone to another.
![image](/assets/images/note/9551/8-9-rds-failover-2.png)
The database will be rebooted.
![image](/assets/images/note/9551/8-9-rds-failover-3.png)
The website will not be accessible, 504 error is returned.
![image](/assets/images/note/9551/8-9-rds-failover-4.png)
Once the database comes back, our site will work again.
![image](/assets/images/note/9551/8-9-rds-failover-5.png)
![image](/assets/images/note/9551/8-9-rds-failover-6.png)
Delete all assets, instance, database, buckets, etc for clean up.
### 8.10 CloudFormation
Create cloudformation, Services->Management & Governance->CloudFormation, create stack.
![image](/assets/images/note/9551/8-10-cloudformation-1.png)
Choose 'Use a sample template' option, and select WordPress blog template.
![image](/assets/images/note/9551/8-10-cloudformation-2.png)
Set name and database parameters.
![image](/assets/images/note/9551/8-10-cloudformation-3.png)
Add tag, next, review and create.
![image](/assets/images/note/9551/8-10-cloudformation-4.png)
It is created.
![image](/assets/images/note/9551/8-10-cloudformation-5.png)
Wait for a while, the creation is completed. We see some web servers and security groups are created.
![image](/assets/images/note/9551/8-10-cloudformation-6.png)
Switch to the Outputs tab, hit the link.
![image](/assets/images/note/9551/8-10-cloudformation-7.png)
We should see the word press configuration page. WordPress site is ready to use.
![image](/assets/images/note/9551/8-10-cloudformation-8.png)
Switch to Resources tab. Notice that only web server and security group are created. There is no RDS is created. You can confirm this by going to RDS to see if there is any new instance is launched.
![image](/assets/images/note/9551/8-10-cloudformation-9.png)
Only one EC2 instance we can find.
![image](/assets/images/note/9551/8-10-cloudformation-10.png)
* Visit https://aws.amazon.com/quickstart/?quick to see available templates.

Exam tips.
![image](/assets/images/note/9551/8-10-cloudformation-exam-tips.png)
### 8.11 Elastic Beanstalk
Create Elastic Beanstalk, Services->Compute->Elastic Beanstalk.
![image](/assets/images/note/9551/8-11-elastic-beanstalk-1.png)
![image](/assets/images/note/9551/8-11-elastic-beanstalk-2.png)
![image](/assets/images/note/9551/8-11-elastic-beanstalk-3.png)
![image](/assets/images/note/9551/8-11-elastic-beanstalk-4.png)
![image](/assets/images/note/9551/8-11-elastic-beanstalk-5.png)
![image](/assets/images/note/9551/8-11-elastic-beanstalk-6.png)
Instance is auto generated.
![image](/assets/images/note/9551/8-11-elastic-beanstalk-7.png)
Test the web page.
![image](/assets/images/note/9551/8-11-elastic-beanstalk-8.png)
Exam tips.
![image](/assets/images/note/9551/8-11-elastic-beanstalk-exam-tips.png)
### 8.12 HA Summary
![image](/assets/images/note/9551/8-12-ha-summary-1.png)
![image](/assets/images/note/9551/8-12-ha-summary-2.png)
![image](/assets/images/note/9551/8-12-ha-summary-3.png)
![image](/assets/images/note/9551/8-12-ha-summary-4.png)
![image](/assets/images/note/9551/8-12-ha-summary-5.png)
![image](/assets/images/note/9551/8-12-ha-summary-6.png)
![image](/assets/images/note/9551/8-12-ha-summary-7.png)
### 8.13 HA Architecture Quiz
![image](/assets/images/note/9551/8-13-ha-quiz-1.png)
![image](/assets/images/note/9551/8-13-ha-quiz-2.png)
![image](/assets/images/note/9551/8-13-ha-quiz-3.png)
![image](/assets/images/note/9551/8-13-ha-quiz-4.png)
![image](/assets/images/note/9551/8-13-ha-quiz-5.png)
![image](/assets/images/note/9551/8-13-ha-quiz-6.png)
![image](/assets/images/note/9551/8-13-ha-quiz-7.png)
![image](/assets/images/note/9551/8-13-ha-quiz-8.png)
![image](/assets/images/note/9551/8-13-ha-quiz-9.png)
![image](/assets/images/note/9551/8-13-ha-quiz-10.png)
![image](/assets/images/note/9551/8-13-ha-quiz-11.png)
![image](/assets/images/note/9551/8-13-ha-quiz-12.png)
![image](/assets/images/note/9551/8-13-ha-quiz-13.png)
![image](/assets/images/note/9551/8-13-ha-quiz-14.png)
![image](/assets/images/note/9551/8-13-ha-quiz-15.png)
![image](/assets/images/note/9551/8-13-ha-quiz-16.png)
## 9. Applications
### 9.1 SQS
![image](/assets/images/note/9551/9-1-sqs-1.png)
Usage - Meme website.
![image](/assets/images/note/9551/9-1-sqs-2.png)
Usage - Travel website.
![image](/assets/images/note/9551/9-1-sqs-3.png)
![image](/assets/images/note/9551/9-1-sqs-4.png)
![image](/assets/images/note/9551/9-1-sqs-5.png)
Queue types.
![image](/assets/images/note/9551/9-1-sqs-6.png)
Standard queue.
![image](/assets/images/note/9551/9-1-sqs-7.png)
FIFO queue.
![image](/assets/images/note/9551/9-1-sqs-8.png)
![image](/assets/images/note/9551/9-1-sqs-9.png)
Exam tips.
![image](/assets/images/note/9551/9-1-sqs-exam-tips-1.png)
![image](/assets/images/note/9551/9-1-sqs-exam-tips-2.png)
![image](/assets/images/note/9551/9-1-sqs-exam-tips-3.png)
### 9.2 SWF
![image](/assets/images/note/9551/9-2-swf-1.png)
SWF tasks.
![image](/assets/images/note/9551/9-2-swf-2.png)
SWF vs. SQS
![image](/assets/images/note/9551/9-2-swf-3.png)
SWF Actors.
![image](/assets/images/note/9551/9-2-swf-4.png)
### 9.3 SNS
![image](/assets/images/note/9551/9-3-sns-1.png)
![image](/assets/images/note/9551/9-3-sns-2.png)
Topics.
![image](/assets/images/note/9551/9-3-sns-3.png)
SNS Availability.
![image](/assets/images/note/9551/9-3-sns-4.png)
SNS Benefits.
![image](/assets/images/note/9551/9-3-sns-5.png)
SNS vs. SQS
![image](/assets/images/note/9551/9-3-sns-6.png)
### 9.4 Elastic Transcoder
![image](/assets/images/note/9551/9-4-elastic-transcoder-1.png)
![image](/assets/images/note/9551/9-4-elastic-transcoder-2.png)
![image](/assets/images/note/9551/9-4-elastic-transcoder-3.png)
### 9.5 API Gateway
![image](/assets/images/note/9551/9-5-api-gateway-1.png)
![image](/assets/images/note/9551/9-5-api-gateway-2.png)
How API Gateway works?
![image](/assets/images/note/9551/9-5-api-gateway-3.png)
API Gateway Options.
![image](/assets/images/note/9551/9-5-api-gateway-4.png)
API Gateway Configuration.
![image](/assets/images/note/9551/9-5-api-gateway-5.png)
API Gateway Deployment.
![image](/assets/images/note/9551/9-5-api-gateway-6.png)
API Gateway Caching.
![image](/assets/images/note/9551/9-5-api-gateway-7.png)
How cache works?
![image](/assets/images/note/9551/9-5-api-gateway-8.png)
Same origin policy. Cross-site-scripting(XSS).
![image](/assets/images/note/9551/9-5-api-gateway-9.png)
CORS.
![image](/assets/images/note/9551/9-5-api-gateway-10.png)
![image](/assets/images/note/9551/9-5-api-gateway-11.png)
Exam tips.
![image](/assets/images/note/9551/9-5-api-gateway-exam-tips.png)
### 9.6 Kinesis
Streaming data.
![image](/assets/images/note/9551/9-6-kinesis-1.png)
Kinesis.
![image](/assets/images/note/9551/9-6-kinesis-2.png)
Types of kinesis.
![image](/assets/images/note/9551/9-6-kinesis-3.png)
Kinesis streaming.
![image](/assets/images/note/9551/9-6-kinesis-4.png)
Kinesis streaming shards.
![image](/assets/images/note/9551/9-6-kinesis-5.png)
Kinesis firehose. Data can be exported to S3, Redfhift or ElasticSearch.
![image](/assets/images/note/9551/9-6-kinesis-6.png)
![image](/assets/images/note/9551/9-6-kinesis-7.png)
Kinesis Analytics.
![image](/assets/images/note/9551/9-6-kinesis-8.png)
Exam tips.
![image](/assets/images/note/9551/9-6-kinesis-exam-tips.png)
### 9.7 Web Identity Federation & Cognito
Web Identity Federation.
![image](/assets/images/note/9551/9-7-wif-1.png)
Cognito.
![image](/assets/images/note/9551/9-7-wif-2.png)
Cognito Use case.
![image](/assets/images/note/9551/9-7-wif-3.png)
![image](/assets/images/note/9551/9-7-wif-4.png)
Cognito User Pools.
![image](/assets/images/note/9551/9-7-wif-5.png)
Cognito Identity Pools.
![image](/assets/images/note/9551/9-7-wif-6.png)
How they work?
![image](/assets/images/note/9551/9-7-wif-7.png)
Cognito Synchronization.
![image](/assets/images/note/9551/9-7-wif-8.png)
How Synchronization works?
![image](/assets/images/note/9551/9-7-wif-9.png)
Cognito exam tips.
![image](/assets/images/note/9551/9-7-wif-exam-tips-1.png)
![image](/assets/images/note/9551/9-7-wif-exam-tips-2.png)
### 9.8 Summary
![image](/assets/images/note/9551/9-8-summary-1.png)
![image](/assets/images/note/9551/9-8-summary-2.png)
![image](/assets/images/note/9551/9-8-summary-3.png)
![image](/assets/images/note/9551/9-8-summary-4.png)
![image](/assets/images/note/9551/9-8-summary-5.png)
![image](/assets/images/note/9551/9-8-summary-6.png)
![image](/assets/images/note/9551/9-8-summary-7.png)
![image](/assets/images/note/9551/9-8-summary-8.png)
![image](/assets/images/note/9551/9-8-summary-9.png)
![image](/assets/images/note/9551/9-8-summary-10.png)
![image](/assets/images/note/9551/9-8-summary-11.png)
![image](/assets/images/note/9551/9-8-summary-12.png)
### 9.9 Applications Quiz
![image](/assets/images/note/9551/9-9-application-quiz-1.png)
![image](/assets/images/note/9551/9-9-application-quiz-2.png)
![image](/assets/images/note/9551/9-9-application-quiz-3.png)
![image](/assets/images/note/9551/9-9-application-quiz-4.png)
![image](/assets/images/note/9551/9-9-application-quiz-5.png)
![image](/assets/images/note/9551/9-9-application-quiz-6.png)
![image](/assets/images/note/9551/9-9-application-quiz-7.png)
![image](/assets/images/note/9551/9-9-application-quiz-8.png)
![image](/assets/images/note/9551/9-9-application-quiz-9.png)
![image](/assets/images/note/9551/9-9-application-quiz-10.png)
![image](/assets/images/note/9551/9-9-application-quiz-11.png)
## 10. Serverless
### 10.1 Lambda Concepts
History of cloud: Data center->IAAS->PAAS->Containers->Serverless.
![image](/assets/images/note/9551/10-1-lambda-1.png)
Lamda.
![image](/assets/images/note/9551/10-1-lambda-2.png)
![image](/assets/images/note/9551/10-1-lambda-3.png)
![image](/assets/images/note/9551/10-1-lambda-4.png)
Lamda usage cases.
![image](/assets/images/note/9551/10-1-lambda-5.png)
![image](/assets/images/note/9551/10-1-lambda-6.png)
Traditional vs. Serverless Architecture
![image](/assets/images/note/9551/10-1-lambda-7.png)
What languages does lamda support?
![image](/assets/images/note/9551/10-1-lambda-8.png)
How lamda is priced?
![image](/assets/images/note/9551/10-1-lambda-9.png)
Why lamda is cool?
![image](/assets/images/note/9551/10-1-lambda-10.png)
Lamda exam tips.
![image](/assets/images/note/9551/10-1-lambda-exam-tips-1.png)
![image](/assets/images/note/9551/10-1-lambda-exam-tips-2.png)
### 10.2 Let's Build A Serverless Webpage
![image](/assets/images/note/9551/10-2-build-serverless-1.png)
Services->Compute->Lambda, create a function.
![image](/assets/images/note/9551/10-2-build-serverless-2.png)
Set name, choose python 3.6 for runtime.
![image](/assets/images/note/9551/10-2-build-serverless-3.png)
Create a new role and select 'Simple microservice permissions' policy template, Create Function.
![image](/assets/images/note/9551/10-2-build-serverless-4.png)
Lambda function is created.
![image](/assets/images/note/9551/10-2-build-serverless-5.png)
Scroll down and copy the python code to the function code editor, save the change.
```python
def lambda_handler(event, context):
    print("In lambda handler")

    resp = {
        "statusCode": 200,
        "headers": {
            "Access-Control-Allow-Origin": "*",
        },
        "body": "Johnny"
    }

    return resp
```
![image](/assets/images/note/9551/10-2-build-serverless-6.png)
Scroll down and set the description.
![image](/assets/images/note/9551/10-2-build-serverless-7.png)
Scroll up, select the 'API Gateway' trigger.
![image](/assets/images/note/9551/10-2-build-serverless-8.png)
Create a new api and select AWS IAM as the security mechanism. Click add and save.
![image](/assets/images/note/9551/10-2-build-serverless-9.png)
The API Gateway trigger is created.
![image](/assets/images/note/9551/10-2-build-serverless-10.png)
Hit the name of the gateway "MyFirstLambdaFunction-API".
![image](/assets/images/note/9551/10-2-build-serverless-11.png)
Delete the existing ANY method and create a new get method.
![image](/assets/images/note/9551/10-2-build-serverless-12.png)
Then deploy this api.
![image](/assets/images/note/9551/10-2-build-serverless-13.png)
Expand the get method, click the invoke url. It should return "Johnny", which is defined in the python script.
![image](/assets/images/note/9551/10-2-build-serverless-14.png)

Now, our lambda function is working. We will create a web page to call this function.

Replace YOUR-API-GATEWAY-LINK-HERE with the invoke URL in the index.html.
```html
<html>
<script>

function myFunction() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        document.getElementById("my-demo").innerHTML = this.responseText;
        }
    };
    xhttp.open("GET", "YOUR-API-GATEWAY-LINK-HERE", true);
    xhttp.send();

}

</script>
<body><div align="center"><br><br><br><br>
<h1>Hello <span id="my-demo">Cloud Gurus!</span></h1>
<button onclick="myFunction()">Click me</button><br>
<img src="https://s3.amazonaws.com/acloudguru-opsworkslab-donotdelete/ACG_Austin.JPG"></div>
</body>
</html>
```
Create a s3 bucket.
![image](/assets/images/note/9551/10-2-build-serverless-15.png)
Notice the bucket is not public.
![image](/assets/images/note/9551/10-2-build-serverless-16.png)
Select the bucket, click "Edit public access settings", clear all checks, save.
![image](/assets/images/note/9551/10-2-build-serverless-17.png)
Switch to Properties tab, choose "Static website hosting".
![image](/assets/images/note/9551/10-2-build-serverless-18.png)
Choose the "Use this bucket to host a website" option, set the index document and error document.
![image](/assets/images/note/9551/10-2-build-serverless-19.png)
error.html.
```html
<html><body><h1>There has been an error!</h1></body></html>
```
Bucket hosting is setup.
![image](/assets/images/note/9551/10-2-build-serverless-20.png)
Upload the two html files into the bucket and make them public.
![image](/assets/images/note/9551/10-2-build-serverless-21.png)
Access the link of index.html in web browser. We should see the page.
![image](/assets/images/note/9551/10-2-build-serverless-22.png)
Click on the button, the title will be changed.
![image](/assets/images/note/9551/10-2-build-serverless-23.png)
Further more, you can bind your domain name to the s3 bucket by creating an A Record.
![image](/assets/images/note/9551/10-2-build-serverless-24.png)
Now, when we visit the domain, it shows the same content.
![image](/assets/images/note/9551/10-2-build-serverless-25.png)
* Wait for a while if you see a blank page as dns takes some time to work.

Architecture of Lambda.
![image](/assets/images/note/9551/10-3-serverless-diagram.png)
### 10.3 Let's Build An Alexa Skill
TODO lab: Alexa.
### 10.4 Summary
![image](/assets/images/note/9551/10-4-lamda-summary-1.png)
![image](/assets/images/note/9551/10-4-lamda-summary-2.png)
![image](/assets/images/note/9551/10-4-lamda-summary-3.png)
### 10.5 Serverless Quiz
![image](/assets/images/note/9551/10-5-serverless-quiz-1.png)
![image](/assets/images/note/9551/10-5-serverless-quiz-2.png)
![image](/assets/images/note/9551/10-5-serverless-quiz-3.png)
![image](/assets/images/note/9551/10-5-serverless-quiz-4.png)
![image](/assets/images/note/9551/10-5-serverless-quiz-5.png)
![image](/assets/images/note/9551/10-5-serverless-quiz-6.png)
![image](/assets/images/note/9551/10-5-serverless-quiz-7.png)
![image](/assets/images/note/9551/10-5-serverless-quiz-8.png)
![image](/assets/images/note/9551/10-5-serverless-quiz-9.png)

## 11. Good Luck!
### 11.1 Good Luck & How To Book Your Exam
### 11.2 Thank You and Next Steps
### 11.3 Practice Test 1
![image](/assets/images/note/9551/11-3-practice-1.png)
![image](/assets/images/note/9551/11-3-practice-2.png)
![image](/assets/images/note/9551/11-3-practice-3.png)
![image](/assets/images/note/9551/11-3-practice-4.png)
![image](/assets/images/note/9551/11-3-practice-5.png)
![image](/assets/images/note/9551/11-3-practice-6.png)
![image](/assets/images/note/9551/11-3-practice-7.png)
![image](/assets/images/note/9551/11-3-practice-8.png)
![image](/assets/images/note/9551/11-3-practice-9.png)
![image](/assets/images/note/9551/11-3-practice-10.png)
![image](/assets/images/note/9551/11-3-practice-11.png)
![image](/assets/images/note/9551/11-3-practice-12.png)
![image](/assets/images/note/9551/11-3-practice-13.png)
![image](/assets/images/note/9551/11-3-practice-14.png)
![image](/assets/images/note/9551/11-3-practice-15.png)
![image](/assets/images/note/9551/11-3-practice-16.png)
![image](/assets/images/note/9551/11-3-practice-17.png)
![image](/assets/images/note/9551/11-3-practice-18.png)
![image](/assets/images/note/9551/11-3-practice-19.png)
![image](/assets/images/note/9551/11-3-practice-20.png)
![image](/assets/images/note/9551/11-3-practice-21.png)
![image](/assets/images/note/9551/11-3-practice-22.png)
![image](/assets/images/note/9551/11-3-practice-23.png)
![image](/assets/images/note/9551/11-3-practice-24.png)
![image](/assets/images/note/9551/11-3-practice-25.png)
![image](/assets/images/note/9551/11-3-practice-26.png)
![image](/assets/images/note/9551/11-3-practice-27.png)
![image](/assets/images/note/9551/11-3-practice-28.png)
![image](/assets/images/note/9551/11-3-practice-29.png)
![image](/assets/images/note/9551/11-3-practice-30.png)
![image](/assets/images/note/9551/11-3-practice-31.png)
![image](/assets/images/note/9551/11-3-practice-32.png)
![image](/assets/images/note/9551/11-3-practice-33.png)
![image](/assets/images/note/9551/11-3-practice-34.png)
![image](/assets/images/note/9551/11-3-practice-35.png)
![image](/assets/images/note/9551/11-3-practice-36.png)
![image](/assets/images/note/9551/11-3-practice-37.png)
![image](/assets/images/note/9551/11-3-practice-38.png)
![image](/assets/images/note/9551/11-3-practice-39.png)
![image](/assets/images/note/9551/11-3-practice-40.png)
![image](/assets/images/note/9551/11-3-practice-41.png)
![image](/assets/images/note/9551/11-3-practice-42.png)
![image](/assets/images/note/9551/11-3-practice-43.png)
![image](/assets/images/note/9551/11-3-practice-44-1.png)
![image](/assets/images/note/9551/11-3-practice-44-2.png)
![image](/assets/images/note/9551/11-3-practice-45.png)
![image](/assets/images/note/9551/11-3-practice-46.png)
![image](/assets/images/note/9551/11-3-practice-47.png)
![image](/assets/images/note/9551/11-3-practice-48.png)
![image](/assets/images/note/9551/11-3-practice-49.png)
![image](/assets/images/note/9551/11-3-practice-50.png)
![image](/assets/images/note/9551/11-3-practice-51-1.png)
![image](/assets/images/note/9551/11-3-practice-51-2.png)
![image](/assets/images/note/9551/11-3-practice-52.png)
![image](/assets/images/note/9551/11-3-practice-53.png)
![image](/assets/images/note/9551/11-3-practice-54.png)
![image](/assets/images/note/9551/11-3-practice-55.png)
![image](/assets/images/note/9551/11-3-practice-56.png)
![image](/assets/images/note/9551/11-3-practice-57.png)
![image](/assets/images/note/9551/11-3-practice-58.png)
![image](/assets/images/note/9551/11-3-practice-59.png)
![image](/assets/images/note/9551/11-3-practice-60.png)
![image](/assets/images/note/9551/11-3-practice-61-1.png)
![image](/assets/images/note/9551/11-3-practice-61-2.png)
![image](/assets/images/note/9551/11-3-practice-62-1.png)
![image](/assets/images/note/9551/11-3-practice-62-2.png)
![image](/assets/images/note/9551/11-3-practice-63.png)
![image](/assets/images/note/9551/11-3-practice-64.png)
### 11.4 Practice Test 2
![image](/assets/images/note/9551/11-4-practice-1.png)
![image](/assets/images/note/9551/11-4-practice-2.png)
![image](/assets/images/note/9551/11-4-practice-3.png)
![image](/assets/images/note/9551/11-4-practice-4.png)
![image](/assets/images/note/9551/11-4-practice-5.png)
![image](/assets/images/note/9551/11-4-practice-6.png)
![image](/assets/images/note/9551/11-4-practice-7.png)
![image](/assets/images/note/9551/11-4-practice-8.png)
![image](/assets/images/note/9551/11-4-practice-9.png)
![image](/assets/images/note/9551/11-4-practice-10.png)
![image](/assets/images/note/9551/11-4-practice-11.png)
![image](/assets/images/note/9551/11-4-practice-12.png)
![image](/assets/images/note/9551/11-4-practice-13.png)
![image](/assets/images/note/9551/11-4-practice-14.png)
![image](/assets/images/note/9551/11-4-practice-15.png)
![image](/assets/images/note/9551/11-4-practice-16.png)
![image](/assets/images/note/9551/11-4-practice-17.png)
![image](/assets/images/note/9551/11-4-practice-18.png)
![image](/assets/images/note/9551/11-4-practice-19.png)
![image](/assets/images/note/9551/11-4-practice-20.png)
![image](/assets/images/note/9551/11-4-practice-21.png)
![image](/assets/images/note/9551/11-4-practice-22.png)
![image](/assets/images/note/9551/11-4-practice-23.png)
![image](/assets/images/note/9551/11-4-practice-24.png)
![image](/assets/images/note/9551/11-4-practice-25.png)
![image](/assets/images/note/9551/11-4-practice-26.png)
![image](/assets/images/note/9551/11-4-practice-27-1.png)
![image](/assets/images/note/9551/11-4-practice-27-2.png)
![image](/assets/images/note/9551/11-4-practice-28-1.png)
![image](/assets/images/note/9551/11-4-practice-28-2.png)
![image](/assets/images/note/9551/11-4-practice-29.png)
![image](/assets/images/note/9551/11-4-practice-30.png)
![image](/assets/images/note/9551/11-4-practice-31.png)
![image](/assets/images/note/9551/11-4-practice-32.png)
![image](/assets/images/note/9551/11-4-practice-33.png)
![image](/assets/images/note/9551/11-4-practice-34.png)
![image](/assets/images/note/9551/11-4-practice-35.png)
![image](/assets/images/note/9551/11-4-practice-36.png)
![image](/assets/images/note/9551/11-4-practice-37.png)
![image](/assets/images/note/9551/11-4-practice-38-1.png)
![image](/assets/images/note/9551/11-4-practice-38-2.png)
![image](/assets/images/note/9551/11-4-practice-39.png)
![image](/assets/images/note/9551/11-4-practice-40.png)
![image](/assets/images/note/9551/11-4-practice-41.png)
![image](/assets/images/note/9551/11-4-practice-42.png)
![image](/assets/images/note/9551/11-4-practice-43.png)
![image](/assets/images/note/9551/11-4-practice-44.png)
![image](/assets/images/note/9551/11-4-practice-45-1.png)
![image](/assets/images/note/9551/11-4-practice-45-2.png)
![image](/assets/images/note/9551/11-4-practice-46.png)
![image](/assets/images/note/9551/11-4-practice-47.png)
![image](/assets/images/note/9551/11-4-practice-48.png)
![image](/assets/images/note/9551/11-4-practice-49.png)
![image](/assets/images/note/9551/11-4-practice-50.png)
![image](/assets/images/note/9551/11-4-practice-51.png)
![image](/assets/images/note/9551/11-4-practice-52.png)
![image](/assets/images/note/9551/11-4-practice-53.png)
![image](/assets/images/note/9551/11-4-practice-54.png)
![image](/assets/images/note/9551/11-4-practice-55.png)
![image](/assets/images/note/9551/11-4-practice-56.png)
![image](/assets/images/note/9551/11-4-practice-57.png)
![image](/assets/images/note/9551/11-4-practice-58.png)
![image](/assets/images/note/9551/11-4-practice-59.png)
![image](/assets/images/note/9551/11-4-practice-60.png)
![image](/assets/images/note/9551/11-4-practice-61.png)
