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
* [Amazon S3 FAQs](https://aws.amazon.com/s3/faqs/)
* [Amazon EC2 FAQs](https://aws.amazon.com/ec2/faqs/)
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
Encrypt with AWS KMS.
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
Wait for few minutes until the deployment is done.
![image](/public/images/note/9160/3-12-cloundfront-create-distribution-enabled.png)
Copy the domain name, which is 'digq5vi21aheh.cloudfront.net' here.

There are two images files in the original bucket.

Access the first one, http://digq5vi21aheh.cloudfront.net/IMG_5807.JPG, failed. because this file is encrypted with AWS KMS.
![image](/public/images/note/9160/3-12-cloundfront-distributed-encrypted-file.png)
Access the second file, http://digq5vi21aheh.cloudfront.net/IMG_5819.JPG, succeeded.
![image](/public/images/note/9160/3-12-cloundfront-distributed-file.png)

Create invalidation for distribution.
![image](/public/images/note/9160/3-12-cloundfront-distribution-invalidation.png)
Exam tips.
![image](/public/images/note/9160/3-12-cloundfront-exam-tips.png)
![image](/public/images/note/9160/3-12-cloundfront-exam-tips2.png)

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
See the similar video [How Amazon Uses Explosive-Resistant Devices To Transfer Data To AWS](https://www.youtube.com/watch?v=H3_ZqnqLyVo).
### 3.15 Storage Gateway
![image](/public/images/note/9160/3-15-storage-gateway.png)
![image](/public/images/note/9160/3-15-storage-gateway2.png)
Gateway types.
![image](/public/images/note/9160/3-15-storage-gateway-types.png)
File gateway.
![image](/public/images/note/9160/3-15-file-gateway.png)
![image](/public/images/note/9160/3-15-file-gateway2.png)
Volume gateway.
![image](/public/images/note/9160/3-15-volume-gateway.png)
Volume gateway, stored volumes.
![image](/public/images/note/9160/3-15-volume-gateway-stored-volumes.png)
![image](/public/images/note/9160/3-15-volume-gateway-stored-volumes2.png)
Volume gateway, cached volumes.
![image](/public/images/note/9160/3-15-volume-gateway-cached-volumes.png)
![image](/public/images/note/9160/3-15-volume-gateway-cached-volumes2.png)
Tape gateway.
![image](/public/images/note/9160/3-15-tape-gateway.png)
![image](/public/images/note/9160/3-15-tape-gateway2.png)
Exam tips.
![image](/public/images/note/9160/3-15-tape-gateway-exam-tips.png)
### 3.16 Identity Access Management & S3 Summary
![image](/public/images/note/9160/3-16-s3-exam-tips-1.png)
![image](/public/images/note/9160/3-16-s3-exam-tips-2.png)
![image](/public/images/note/9160/3-16-s3-exam-tips-3.png)
![image](/public/images/note/9160/3-16-s3-exam-tips-4.png)
![image](/public/images/note/9160/3-16-s3-exam-tips-5.png)
![image](/public/images/note/9160/3-16-s3-exam-tips-6.png)
![image](/public/images/note/9160/3-16-s3-exam-tips-7.png)
![image](/public/images/note/9160/3-16-s3-exam-tips-8.png)
![image](/public/images/note/9160/3-16-s3-exam-tips-9.png)
![image](/public/images/note/9160/3-16-s3-exam-tips-10.png)
![image](/public/images/note/9160/3-16-s3-exam-tips-11.png)
![image](/public/images/note/9160/3-16-s3-exam-tips-12.png)
![image](/public/images/note/9160/3-16-s3-exam-tips-13.png)
![image](/public/images/note/9160/3-16-s3-exam-tips-14.png)
![image](/public/images/note/9160/3-16-s3-exam-tips-15.png)
![image](/public/images/note/9160/3-16-s3-exam-tips-16.png)
* [Amazon S3 FAQs](https://aws.amazon.com/s3/faqs/)

### 3.17 Identity Access Management & S3 Quiz
* S3 - One Zone-Infrequent Access: The key driver here is cost, so an awareness of cost is necessary to answer this. Full S3 is quite expensive at around $0.023 per GB for the lowest band. S3 standard IA is $0.0125 per GB, S3 One-Zone-IA is $0.01 per GB, and Legacy S3-RRS is around $0.024 per GB for the lowest band. Of the offered solutions SS3 One-Zone-IA is the cheapest suitable option. Glacier cannot be considered as it is not intended for direct access, however it comes in at around $0.004 per GB. Of course you spotted that RRS is being deprecated, and there is no such thing as S3 - Provisioned IOPS. In this case OneZone IA should be fine as users will 'post' material but only the organization will access it and only to find relevant material. The question states that there is no concern if some material is lost.
* https://docs.aws.amazon.com/AmazonS3/latest/dev/UploadingObjects.html
* To access the console you use an account and password combination. To access AWS programmatically you use a Key and Secret Key combination
* Three options to allow users to have secure access to private files located in S3. Signed URLs and Signed Cookies are different ways to ensure that users attempting access to files in an S3 bucket can be authorised. One method generates URLs and the other generates special cookies but they both require the creation of an application and policy to generate and control these items. An Origin Access Identity on the other hand, is a virtual user identity that is used to give the CloudFront distribution permission to fetch a private object from an S3 bucket. Public S3 buckets should never be used unless you are using the bucket to host a public website and therefore this is an incorrect option.

## 4. EC2
### 4.1 EC2 101
![image](/public/images/note/9160/4-1-ec2.png)
EC2 Pricing models.
![image](/public/images/note/9160/4-1-ec2-pricing-model.png)
On demand.
![image](/public/images/note/9160/4-1-ec2-on-demand.png)
Reserved Pricing.
![image](/public/images/note/9160/4-1-ec2-reserved-pricing.png)
Reserved pricing types.
![image](/public/images/note/9160/4-1-ec2-reserved-types.png)
Spot pricing.
![image](/public/images/note/9160/4-1-ec2-spot-pricing.png)
Dedicated Hosts pricing.
![image](/public/images/note/9160/4-1-ec2-dedicated-hosts-pricing.png)
Instance Types
![image](/public/images/note/9160/4-1-ec2-instance-types.png)
Mnemonic.
![image](/public/images/note/9160/4-1-ec2-reserved-types-mnemonic.png)
EC2 exam tips.
![image](/public/images/note/9160/4-1-ec2-exam-tips.png)
![image](/public/images/note/9160/4-1-ec2-exam-tips2.png)
![image](/public/images/note/9160/4-1-ec2-exam-tips3.png)
### 4.2 Let's Get Our Hands Dirty With EC2 - Part 1
Services->EC2, Launch Instance.
![image](/public/images/note/9160/4-2-ec2-create-instance-1.png)
Choose AMI.
![image](/public/images/note/9160/4-2-ec2-create-instance-2.png)
Choose Instance Type.
![image](/public/images/note/9160/4-2-ec2-create-instance-3.png)
Configure Instance Details, check "Protect against accidental termination".
![image](/public/images/note/9160/4-2-ec2-create-instance-4.png)
Add Storage.
![image](/public/images/note/9160/4-2-ec2-create-instance-5.png)
Add Tags.
![image](/public/images/note/9160/4-2-ec2-create-instance-6.png)
Security Group.
![image](/public/images/note/9160/4-2-ec2-create-instance-7.png)
Launch.
![image](/public/images/note/9160/4-2-ec2-create-instance-8.png)
Create key pair, johnny-aws-ec2-keypair
![image](/public/images/note/9160/4-2-ec2-create-instance-9.png)
Download Key Pair and Launch Instances.
![image](/public/images/note/9160/4-2-ec2-create-instance-10.png)
Instance created and launched. Note down the public ip '3.83.9.181'.
![image](/public/images/note/9160/4-2-ec2-create-instance-11.png)
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
![image](/public/images/note/9160/4-2-ec2-create-instance-12.png)
### 4.3 Let's Get Our Hands Dirty With EC2 - Part 2
Exam tips.
![image](/public/images/note/9160/4-3-ec2-exam-tips.png)
### 4.4 Security Groups Basics
All outbound traffic is allowed.
![image](/public/images/note/9160/4-4-ec2-security-group-outbound.png)
You can have multiple security groups attached to EC2 instance. (Instance->Actions->NetWorking->Change Security Groups)
![image](/public/images/note/9160/4-4-ec2-security-group-multiple-groups.png)
Exam tips.
![image](/public/images/note/9160/4-4-ec2-security-group-exam-tips.png)
![image](/public/images/note/9160/4-4-ec2-security-group-exam-tips2.png)
### 4.5 EBS 101
![image](/public/images/note/9160/4-5-ec2-ebs.png)
![image](/public/images/note/9160/4-5-ec2-ebs-volumes.png)
![image](/public/images/note/9160/4-5-ec2-ebs-types.png)
### 4.6 Volumes & Snapshots
TODO, labs.
![image](/public/images/note/9160/4-6-ec2-ebs-exam-tips.png)
![image](/public/images/note/9160/4-6-ec2-ebs-exam-tips2.png)
![image](/public/images/note/9160/4-6-ec2-ebs-exam-tips3.png)
### 4.7 AMI Types (EBS vs Instance Store)
![image](/public/images/note/9160/4-7-ec2-ami-types.png)
![image](/public/images/note/9160/4-7-ec2-ebs-vs-instance-store.png)

Create instance store.
![image](/public/images/note/9160/4-7-ec2-create-instance-store.png)
Check instance store.
![image](/public/images/note/9160/4-7-ec2-create-instance-store-2.png)
Select the top one, then choose the first available instance type.
![image](/public/images/note/9160/4-7-ec2-create-instance-store-3.png)
Keep the default settings. In step "Add Storage", notice the volume type is Instance Store.
![image](/public/images/note/9160/4-7-ec2-create-instance-store-4.png)
Continue with the default settings and reuse the security group created previously and launch.
![image](/public/images/note/9160/4-7-ec2-create-instance-store-5.png)
Instance store can't be stopped. Terminate it as it is not in the free trial.
![image](/public/images/note/9160/4-7-ec2-create-instance-store-6.png)
EBS and instance store, exam tips.
![image](/public/images/note/9160/4-7-ec2-ebs-instance-store-exam-tips.png)
### 4.8 Encrypted Root Device Volumes & Snapshots
Volumes->Select one volume, Actions->Create Snapshot.
![image](/public/images/note/9160/4-8-ec2-volume-create-snapshot-1.png)
![image](/public/images/note/9160/4-8-ec2-volume-create-snapshot-2.png)
Switch to Snapshots view and wait until it's finished.
![image](/public/images/note/9160/4-8-ec2-volume-create-snapshot-3.png)
Copy and choose encrypted.
![image](/public/images/note/9160/4-8-ec2-volume-create-snapshot-4.png)
The new instance is launched.
![image](/public/images/note/9160/4-8-ec2-volume-create-snapshot-5.png)
Select it and create image with it.
![image](/public/images/note/9160/4-8-ec2-volume-create-snapshot-6.png)
Switch to Images view and see the AMI.
![image](/public/images/note/9160/4-8-ec2-volume-create-snapshot-7.png)
Now, we can use this image to launch new instance, notice it is encrypted by default.
![image](/public/images/note/9160/4-8-ec2-volume-create-snapshot-8.png)
Exam tips.
![image](/public/images/note/9160/4-8-ec2-volume-snapshot-exam-tips.png)
![image](/public/images/note/9160/4-8-ec2-volume-snapshot-exam-tips2.png)
### 4.9 CloudWatch 101
CloudWatch.
![image](/public/images/note/9160/4-9-ec2-cloudwatch-monitor.png)
![image](/public/images/note/9160/4-9-ec2-cloudwatch-monitor2.png)
CloudTrail.
![image](/public/images/note/9160/4-9-ec2-cloudtrail.png)
CloudWatch exam tips.
![image](/public/images/note/9160/4-9-ec2-cloudwatch-exam-tips.png)
### 4.10 CloudWatch Lab
Create instance with enabling the cloundwatch. Don't do it for experiment as it charges.
![image](/public/images/note/9160/4-10-ec2-create-instance-with-cloudwatch.png)
Create cloudwatch alarm for CPU usage, Services->Management & Governance -> CloudWatch, Create Alarm.
![image](/public/images/note/9160/4-10-ec2-cloudwatch-create-alarm-1.png)
Select EC2.
![image](/public/images/note/9160/4-10-ec2-cloudwatch-create-alarm-2.png)
Per-Instance Metrics.
![image](/public/images/note/9160/4-10-ec2-cloudwatch-create-alarm-3.png)
Choose 'CPUUtilization' for the target instance.
![image](/public/images/note/9160/4-10-ec2-cloudwatch-create-alarm-4.png)
Set condition, threshold.
![image](/public/images/note/9160/4-10-ec2-cloudwatch-create-alarm-5.png)
![image](/public/images/note/9160/4-10-ec2-cloudwatch-create-alarm-6.png)
Create topic and set email address.
![image](/public/images/note/9160/4-10-ec2-cloudwatch-create-alarm-7.png)
Ssh to remote ec2 instance and run following command.
```raw
> ssh ec2-user@10.23.123.12 -i johnny-aws-keypair
> sudo su
> while true; do echo; done
```
CPU usage will increase to high level to trigger the alarm and you will receive the alarm email.
![image](/public/images/note/9160/4-10-ec2-cloudwatch-create-alarm-8.png)
CloudWatch exam tips.
![image](/public/images/note/9160/4-10-ec2-cloudwatch-exam-tips.png)
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
![image](/public/images/note/9160/4-11-ec2-command-line-credentials.png)
Exam tips.
![image](/public/images/note/9160/4-11-ec2-command-line-exam-tips.png)
### 4.12 Using IAM Roles With EC2
Services -> IAM -> Roles -> Create Role, choose EC2.
![image](/public/images/note/9160/4-12-ec2-iam-role-1.png)
Select AdministratorAccess.
![image](/public/images/note/9160/4-12-ec2-iam-role-2.png)
Input name.
![image](/public/images/note/9160/4-12-ec2-iam-role-3.png)
New role created.
![image](/public/images/note/9160/4-12-ec2-iam-role-4.png)

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
Attach role to ec2 instance.
![image](/public/images/note/9160/4-12-ec2-attach-role-to-instance.png)
Select the role created in previous step and click Apply button.
![image](/public/images/note/9160/4-12-ec2-attach-role-to-instance-2.png)
Then, we will see the role visible for the instance.
![image](/public/images/note/9160/4-12-ec2-attach-role-to-instance-3.png)
Click on the role to see the details.
![image](/public/images/note/9160/4-12-ec2-attach-role-to-instance-4.png)
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
![image](/public/images/note/9160/4-12-ec2-iam-role-exam-tips.png)
* [Easily Replace or Attach an IAM Role to an Existing EC2 Instance by Using the EC2 Console](https://aws.amazon.com/blogs/security/easily-replace-or-attach-an-iam-role-to-an-existing-ec2-instance-by-using-the-ec2-console/)

### 4.13 Using Boot Strap Scripts
Launch instance with bootstrap script. Select the role created in previous lecture for IAM role.
![image](/public/images/note/9160/4-13-ec2-bootstrap-script-1.png)
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
![image](/public/images/note/9160/4-13-ec2-bootstrap-script-2.png)
And we will find the new s3 bucket.
![image](/public/images/note/9160/4-13-ec2-bootstrap-script-3.png)
The index.html file is copied to this bucket.
![image](/public/images/note/9160/4-13-ec2-bootstrap-script-4.png)
### 4.14 EC2 Instance Meta Data
Use the following two commands to get user data and meta data.
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
![image](/public/images/note/9160/4-14-ec2-metadata-exam-tips.png)
* [Instance Metadata and User Data](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-metadata.html)

### 4.15 Elastic File System
![image](/public/images/note/9160/4-15-ec2-efs.png)
1) Create EFS, Services -> EFS, Create File System.
![image](/public/images/note/9160/4-15-ec2-create-efs-1.png)
Keep default.
![image](/public/images/note/9160/4-15-ec2-create-efs-2.png)
Just enable the encryption.
![image](/public/images/note/9160/4-15-ec2-create-efs-3.png)
Keep default.
![image](/public/images/note/9160/4-15-ec2-create-efs-4.png)
It will take few minutes to finish.
![image](/public/images/note/9160/4-15-ec2-create-efs-5.png)
![image](/public/images/note/9160/4-15-ec2-create-efs-6.png)
Wait until efs are created. Services->EFS, expand the arrow, click on "Amazon EC2 mount instructions (from local VPC)".
![image](/public/images/note/9160/4-15-ec2-create-efs-7.png)
Copy the tls command , 'sudo mount -t efs -o tls fs-9c5a377e:/ efs'. We will use it in terminal.
![image](/public/images/note/9160/4-15-ec2-create-efs-8.png)

2) Meanwhile, edit Security Group, select the 'default' group, switch to 'Inbound' tab.
![image](/public/images/note/9160/4-15-ec2-add-nfs-1.png)
Click Edit, add new rule, choose NFS and select 'WebDMZ' security group, Save.
![image](/public/images/note/9160/4-15-ec2-add-nfs-2.png)
NFS is in the inbound.
![image](/public/images/note/9160/4-15-ec2-add-nfs-3.png)

3) Create new instance and add bootstrap script. Specify 2 instances.
![image](/public/images/note/9160/4-15-ec2-create-instance-1.png)

Put the following script to user data.
```raw
#!/bin/bash
yum update -y
yum install httpd -y
service httpd start
chkconfig httpd on
yum install amazon-efs-utils -y
```
![image](/public/images/note/9160/4-15-ec2-create-instance-2.png)
Once the two instances are launched, note the public IP addresses.
![image](/public/images/note/9160/4-15-ec2-create-instance-3.png)
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
![image](/public/images/note/9160/4-15-ec2-efs-exam-tips.png)
### 4.16 EC2 Placement Groups
![image](/public/images/note/9160/4-16-ec2-placement-group.png)
![image](/public/images/note/9160/4-16-ec2-cluster-placement-group.png)
![image](/public/images/note/9160/4-16-ec2-spread-placement-group.png)
![image](/public/images/note/9160/4-16-ec2-partition-placement-group.png)
![image](/public/images/note/9160/4-16-ec2-placement-group-types.png)
Exam tips.
![image](/public/images/note/9160/4-16-ec2-placement-group-exam-tips.png)
### 4.17 EC2 Summary
![image](/public/images/note/9160/4-17-ec2-summary-1.png)
TODO.
### 4.18 EC2 Quiz
![image](/public/images/note/9160/4-18-ec2-quiz-1.png)
![image](/public/images/note/9160/4-18-ec2-quiz-2.png)
![image](/public/images/note/9160/4-18-ec2-quiz-3.png)
![image](/public/images/note/9160/4-18-ec2-quiz-4.png)
![image](/public/images/note/9160/4-18-ec2-quiz-5.png)
![image](/public/images/note/9160/4-18-ec2-quiz-6.png)
![image](/public/images/note/9160/4-18-ec2-quiz-7.png)
![image](/public/images/note/9160/4-18-ec2-quiz-8.png)
![image](/public/images/note/9160/4-18-ec2-quiz-9.png)
![image](/public/images/note/9160/4-18-ec2-quiz-10.png)
![image](/public/images/note/9160/4-18-ec2-quiz-11.png)
![image](/public/images/note/9160/4-18-ec2-quiz-12.png)
![image](/public/images/note/9160/4-18-ec2-quiz-13.png)
![image](/public/images/note/9160/4-18-ec2-quiz-14.png)
![image](/public/images/note/9160/4-18-ec2-quiz-15.png)
![image](/public/images/note/9160/4-18-ec2-quiz-16.png)
![image](/public/images/note/9160/4-18-ec2-quiz-17.png)
![image](/public/images/note/9160/4-18-ec2-quiz-18.png)
![image](/public/images/note/9160/4-18-ec2-quiz-19.png)
![image](/public/images/note/9160/4-18-ec2-quiz-20.png)
![image](/public/images/note/9160/4-18-ec2-quiz-21.png)
![image](/public/images/note/9160/4-18-ec2-quiz-22.png)
![image](/public/images/note/9160/4-18-ec2-quiz-23.png)
![image](/public/images/note/9160/4-18-ec2-quiz-24.png)
![image](/public/images/note/9160/4-18-ec2-quiz-25.png)
![image](/public/images/note/9160/4-18-ec2-quiz-26.png)
![image](/public/images/note/9160/4-18-ec2-quiz-27.png)
## 5. Databases On AWS
### 5.1 Databases 101
AWS supported databases.
![image](/public/images/note/9160/5-1-database-aws-supported.png)
RDS features.
![image](/public/images/note/9160/5-1-database-rds-features.png)
Multi AZ.
![image](/public/images/note/9160/5-1-database-rds-multi-az.png)
Replica.
![image](/public/images/note/9160/5-1-database-rds-replica.png)
Data warehouse.
![image](/public/images/note/9160/5-1-database-data-warehouse.png)
OLTP
![image](/public/images/note/9160/5-1-database-oltp.png)
OLAP.
![image](/public/images/note/9160/5-1-database-olap.png)
Amazon's data warehouse, RedShift.
![image](/public/images/note/9160/5-1-database-amazon-redshift.png)
Elastic Cache.
![image](/public/images/note/9160/5-1-database-elasticcache.png)
Cache types: Redis and Memcache.
![image](/public/images/note/9160/5-1-database-cache-types.png)
Database exam tips.
![image](/public/images/note/9160/5-1-database-exam-tips-1.png)
![image](/public/images/note/9160/5-1-database-exam-tips-2.png)
![image](/public/images/note/9160/5-1-database-exam-tips-3.png)
![image](/public/images/note/9160/5-1-database-exam-tips-4.png)
### 5.2 Let's Create An RDS Instance
TOD
![image](/public/images/note/9160/5-2-rds-instance-summary.png)
### 5.3 RDS Backups, Multi-AZ & Read Replicas
Backup types.
![image](/public/images/note/9160/5-3-rds-backup-types.png)
Automated backup.
![image](/public/images/note/9160/5-3-rds-backup-automated.png)
Snapshot backup.
![image](/public/images/note/9160/5-3-rds-backup-snapshot.png)
Restore back.
![image](/public/images/note/9160/5-3-rds-backup-restore.png)
Encryption.
![image](/public/images/note/9160/5-3-rds-backup-encryption.png)
Multi-AZ.
![image](/public/images/note/9160/5-3-rds-backup-multi-az.png)
![image](/public/images/note/9160/5-3-rds-backup-multi-az2.png)
![image](/public/images/note/9160/5-3-rds-backup-multi-az3.png)
![image](/public/images/note/9160/5-3-rds-backup-multi-az4.png)
Read Replica.
![image](/public/images/note/9160/5-3-rds-backup-read-replica-1.png)
![image](/public/images/note/9160/5-3-rds-backup-read-replica-2.png)
![image](/public/images/note/9160/5-3-rds-backup-read-replica-3.png)
![image](/public/images/note/9160/5-3-rds-backup-read-replica-4.png)
![image](/public/images/note/9160/5-3-rds-backup-read-replica-5.png)
### 5.4 RDS Backups, Multi-AZ & Read Replicas - Lab
TODO.
![image](/public/images/note/9160/5-4-rds-backup-exam-tips-1.png)
![image](/public/images/note/9160/5-4-rds-backup-exam-tips-2.png)
![image](/public/images/note/9160/5-4-rds-backup-exam-tips-3.png)
![image](/public/images/note/9160/5-4-rds-backup-exam-tips-4.png)
### 5.5 DynamoDB
![image](/public/images/note/9160/5-5-dynamodb-1.png)
![image](/public/images/note/9160/5-5-dynamodb-2.png)
Eventual Consistent Reads.
![image](/public/images/note/9160/5-5-dynamodb-3.png)
Strongly Consistent Reads.
![image](/public/images/note/9160/5-5-dynamodb-4.png)
Exam tips.
![image](/public/images/note/9160/5-5-dynamodb-exam-tips.png)
### 5.6 Redshift
![image](/public/images/note/9160/5-6-redshift-1.png)
OLAP vs. OLTP
![image](/public/images/note/9160/5-6-redshift-2.png)
Redshift from Amazon for data warehouse.
![image](/public/images/note/9160/5-6-redshift-3.png)
RedShift Configuration.
![image](/public/images/note/9160/5-6-redshift-4.png)
Advanced Compression.
![image](/public/images/note/9160/5-6-redshift-5.png)
Massively Parallel Processing(MPP)
![image](/public/images/note/9160/5-6-redshift-6.png)
Redshift backup.
![image](/public/images/note/9160/5-6-redshift-7.png)
Redshift pricing.
![image](/public/images/note/9160/5-6-redshift-8.png)
Redshift Security.
![image](/public/images/note/9160/5-6-redshift-9.png)
Redshift Availability.
![image](/public/images/note/9160/5-6-redshift-10.png)
Redshift exam tips.
![image](/public/images/note/9160/5-6-redshift-exam-tips-1.png)
![image](/public/images/note/9160/5-6-redshift-exam-tips-2.png)
### 5.7 Aurora
![image](/public/images/note/9160/5-7-aurora-1.png)
![image](/public/images/note/9160/5-7-aurora-2.png)
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
