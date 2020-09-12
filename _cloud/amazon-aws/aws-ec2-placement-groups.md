---
layout: tutorial
key: cloud
title: "AWS-EC2-Placement Groups"
index: 4128
subcategory: amazon-aws
date: 2019-09-16
tags: [AWS, EC2]
---

> Amazon EC2.

## 1. EC2 Placement Groups
### 1.1 What is Placement Groups?
Three Types of Placement Groups:
* Clustered Placement Group
  - A cluster placement group is a grouping of instances within a single Availability Zone. Placement groups are recommended for applications that need low network latency, high network throughput, or both.
  - Only certain instances can be launched in to a Clustered Placement Group.
* Spread Placement Group
  - A spread placement group is a group of instances that are each placed on distinct underlying hardware.
  - Spread placement groups are recommended for applications that have a small number of critical instances that should be kept separate from each other.
* Partitioned
  - When using partition placement groups, Amazon EC2 divides each group into logical segments called partitions. Amazon EC2 ensures that each partition within a placement group has its own set of racks. Each rack has its own network and power source. No two partitions within a placement group share the same racks, allowing you to isolate the impact of hardware failure within your application.

Comparison:
* Clustered Placement Group
  - Low Network Latency / High Network Throughput
* Spread Placement Group
  - Individual Critical EC2 instances
* Partitioned
  - Multiple EC2 instances HDFS, HBase, and Cassandra

### 1.2 Placement Groups Lab
Create Placement Group: In the EC2 page, find 'Placement Groups' in Network & Security.
![image](/assets/images/cloud/4106/4-16-ec2-placement-group-lab-1.png)
Click new Placement Group, input name and choose Strategy.
![image](/assets/images/cloud/4106/4-16-ec2-placement-group-lab-2.png)
Use Placement Group when launch new instance.
![image](/assets/images/cloud/4106/4-16-ec2-placement-group-lab-3.png)

### 1.3 Summary
* A clustered placement group can't span multiple Availability Zones, but a spread placement or partitioned group can.
* The name you specify for a placement group must be unique within your AWS account.
* Only certain types of instances can be launched in a placement group (Compute Optimized, GPU, Memory Optimized, Storage Optimized)
* AWS recommend homogenous instances within clustered placement groups.
* You can't merge placement groups.
* You can't move an existing instance into a placement group. You can create an AMI from your existing instance, and then launch a new instance from the AMI into a placement group.

## 2. References
* [Amazon EC2](https://aws.amazon.com/ec2/)
* [Amazon EC2 pricing](https://aws.amazon.com/ec2/pricing/)
* [Amazon EC2 Instance Types](https://aws.amazon.com/ec2/instance-types/)
* [Amazon EC2 FAQs](https://aws.amazon.com/ec2/faqs/)
* [Instance Metadata and User Data](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-metadata.html)
* [Easily Replace or Attach an IAM Role to an Existing EC2 Instance by Using the EC2 Console](https://aws.amazon.com/blogs/security/easily-replace-or-attach-an-iam-role-to-an-existing-ec2-instance-by-using-the-ec2-console/)
