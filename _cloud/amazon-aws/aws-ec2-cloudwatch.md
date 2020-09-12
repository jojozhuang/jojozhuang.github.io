---
layout: tutorial
key: cloud
title: "AWS-EC2-CloudWatch"
index: 4123
subcategory: amazon-aws
date: 2019-09-16
tags: [AWS, EC2]
---

> Amazon EC2.

## 1. CloudWatch
### 1.1 What is CloudWatch?
CloudWatch can monitor things like:
* Compute
  - EC2 Instances
  - Autoscaling Groups
  - Elastic Load Balancers
  - Route53 Health Checks
* Storage & Content Delivery
  - EBS Volumes
  - Storage Gateways
  - CloudFront

Host Level Metrics Consist of:
* CPU
* Network
* Disk
* Status Check

What Can I do With CloudWatch?
* Dashboards - Creates awesome dashboards to see what is happening with your AWS environment.
* Alarms - Allows you to set Alarms that notify you when particular thresholds are hit.
* Events - CloudWatch Events helps you to respond to state changes in your AWS resources.
* Logs - CloudWatch Logs helps you to aggregate, monitor, and store logs.

### 1.2 What Is AWS Cloud Trail?
AWS CloudTrail increases visibility into your user and resource activity by recording AWS Management Console actions and API calls. You can identify which users and accounts called AWS, the source IP address from which the calls were made, and when the calls occurred.

### 4.3 Summary of CloudWatch
* CloudWatch is used for monitoring performance.
* CloudWatch can monitor most of AWS as well as your applications that run on AWS.
* CloudWatch with EC2 will monitor events every 5 minutes by default.
* You can have 1 minute intervals by turning on detailed monitoring.
* You can create CloudWatch alarms which trigger notifications.
* **CloudWatch is all about performance. CloudTrail is all about auditing.**

### 4.3 CloudWatch Lab
Create instance with enabling the cloundwatch. Don't do it for experiment as it charges.
![image](/assets/images/cloud/4106/4-10-ec2-create-instance-with-cloudwatch.png)
Create cloudwatch alarm for CPU usage, Services->Management & Governance -> CloudWatch, Create Alarm.
![image](/assets/images/cloud/4106/4-10-ec2-cloudwatch-create-alarm-1.png)
Select EC2.
![image](/assets/images/cloud/4106/4-10-ec2-cloudwatch-create-alarm-2.png)
Per-Instance Metrics.
![image](/assets/images/cloud/4106/4-10-ec2-cloudwatch-create-alarm-3.png)
Choose 'CPUUtilization' for the target instance.
![image](/assets/images/cloud/4106/4-10-ec2-cloudwatch-create-alarm-4.png)
Set condition, threshold.
![image](/assets/images/cloud/4106/4-10-ec2-cloudwatch-create-alarm-5.png)
![image](/assets/images/cloud/4106/4-10-ec2-cloudwatch-create-alarm-6.png)
Create topic and set email address.
![image](/assets/images/cloud/4106/4-10-ec2-cloudwatch-create-alarm-7.png)
Ssh to remote ec2 instance and run following command.
```raw
> ssh ec2-user@10.23.123.12 -i johnny-aws-keypair
> sudo su
> while true; do echo; done
```
CPU usage will increase to high level to trigger the alarm and you will receive the alarm email.
![image](/assets/images/cloud/4106/4-10-ec2-cloudwatch-create-alarm-8.png)

## 10. References
* [Amazon EC2](https://aws.amazon.com/ec2/)
* [Amazon EC2 pricing](https://aws.amazon.com/ec2/pricing/)
* [Amazon EC2 Instance Types](https://aws.amazon.com/ec2/instance-types/)
* [Amazon EC2 FAQs](https://aws.amazon.com/ec2/faqs/)
* [Instance Metadata and User Data](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-metadata.html)
* [Easily Replace or Attach an IAM Role to an Existing EC2 Instance by Using the EC2 Console](https://aws.amazon.com/blogs/security/easily-replace-or-attach-an-iam-role-to-an-existing-ec2-instance-by-using-the-ec2-console/)
