---
layout: tutorial
key: cloud
title: "AWS-EC2-CloudWatch"
index: 4123
subcategory: amazon-aws
date: 2019-09-16
tags: [AWS, EC2]
---

> Monitor AWS resources and applications with CloudWatch.

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

### 1.2 Metrics
Host Level Metrics Consist of:
* CPU
* Network
* Disk
* Status Check

### 1.3 What Can I do With CloudWatch?
* Dashboards - Creates awesome dashboards to see what is happening with your AWS environment.
* Alarms - Allows you to set Alarms that notify you when particular thresholds are hit.
* Events - CloudWatch Events helps you to respond to state changes in your AWS resources.
* Logs - CloudWatch Logs helps you to aggregate, monitor, and store logs.

### 1.4 What Is AWS Cloud Trail?
AWS CloudTrail increases visibility into your user and resource activity by recording AWS Management Console actions and API calls. You can identify which users and accounts called AWS, the source IP address from which the calls were made, and when the calls occurred.

### 1.5 Summary of CloudWatch
* CloudWatch is used for monitoring performance.
* CloudWatch can monitor most of AWS as well as your applications that run on AWS.
* CloudWatch with EC2 will monitor events every 5 minutes by default.
* You can have 1 minute intervals by turning on detailed monitoring.
* You can create CloudWatch alarms which trigger notifications.
* **CloudWatch is all about performance. CloudTrail is all about auditing.**

## 2. Lab - CloudWatch
### 2.1 Enabling CloudWatch on Instance
Create a new instance, enable option "Enable CloudWatch detailed monitoring". Don't do it for experiment as it charges.
![image](/assets/images/cloud/4123/ec2-cloudwatch-create-instance.png)
### 2.2 Creating CloudWatch Alarm for CPU Usage
Go to Services->Management & Governance -> CloudWatch, Create Alarm, Select metric.
![image](/assets/images/cloud/4123/ec2-cloudwatch-create-alarm-1.png)
Select EC2.
![image](/assets/images/cloud/4123/ec2-cloudwatch-create-alarm-2.png)
Per-Instance Metrics.
![image](/assets/images/cloud/4123/ec2-cloudwatch-create-alarm-3.png)
Choose 'CPUUtilization' for the target instance.
![image](/assets/images/cloud/4123/ec2-cloudwatch-create-alarm-4.png)
Set condition, period, etc.
![image](/assets/images/cloud/4123/ec2-cloudwatch-create-alarm-5.png)
Set threshold. For example, send alarm when CPU utilization is greater than 90%.
![image](/assets/images/cloud/4123/ec2-cloudwatch-create-alarm-6.png)
Create topic and set email address.
![image](/assets/images/cloud/4123/ec2-cloudwatch-create-alarm-7.png)
### 2.3 Testing CloudWatch Alarm
Remote login into EC2 instance with ssh and run the following command to infinitely run "echo" command repeatedly.
```raw
> ssh ec2-user@10.23.123.12 -i johnny-aws-keypair
> sudo su
> while true; do echo; done
```
CPU usage will increase to high level to trigger the alarm and you will receive the alarm email.
![image](/assets/images/cloud/4123/ec2-cloudwatch-create-alarm-8.png)

## 3. References
* [Amazon CloudWatch](https://aws.amazon.com/cloudwatch/)
