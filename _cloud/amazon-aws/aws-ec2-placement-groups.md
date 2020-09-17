---
layout: tutorial
key: cloud
title: "AWS-EC2-Placement Groups"
index: 4128
subcategory: amazon-aws
date: 2019-09-16
tags: [AWS, EC2, Placement Groups]
---

> Use Placement Groups for providing low latency, high throughput access.

## 1. Placement Groups
### 1.1 What is Placement Groups?
Placement Groups are logical groupings or clusters of instances in the selected AWS region. Placement groups are specifically used for launching cluster compute instance types.

When you launch a new EC2 instance, the EC2 service attempts to place the instance in such a way that all of your instances are spread out across underlying hardware to minimize correlated failures. You can use placement groups to influence the placement of a group of interdependent instances to meet the needs of your workload.

There is no charge for creating a placement group.

### 1.2 Three Types of Placement Groups
Depending on the type of workload, you can create a placement group using one of the following placement strategies:
* `Cluster` – packs instances close together inside an Availability Zone. This strategy enables workloads to achieve the low-latency network performance necessary for tightly-coupled node-to-node communication that is typical of HPC applications.
* `Partition` – spreads your instances across logical partitions such that groups of instances in one partition do not share the underlying hardware with groups of instances in different partitions. This strategy is typically used by large distributed and replicated workloads, such as Hadoop, Cassandra, and Kafka.
* `Spread` – strictly places a small group of instances across distinct underlying hardware to reduce correlated failures.

### 1.3 Comparison
* Clustered Placement Group - Low Network Latency / High Network Throughput
* Partitioned Placement Group - Multiple EC2 instances HDFS, HBase, and Cassandra
* Spread Placement Group - Individual Critical EC2 instances

## 2. Lab - Placement Groups
### 2.1 Creating Placement Group
Go to Services->EC2->Network & Security->Placement Group, Create placement group.
![image](/assets/images/cloud/4128/ec2-placement-group-lab-1.png)
Set name and choose Strategy, Create group.
![image](/assets/images/cloud/4128/ec2-placement-group-lab-2.png)
New placement group is created.
![image](/assets/images/cloud/4128/ec2-placement-group-lab-3.png)
### 2.2 Using Placement Group
Create new instance, in the step of "Configure instance", enable "Add instance to placement group" and select the existing placement group we just created.
![image](/assets/images/cloud/4128/ec2-placement-group-lab-4.png)
### 2.3 Summary
* A clustered placement group can't span multiple Availability Zones, but a spread placement or partitioned group can.
* The name you specify for a placement group must be unique within your AWS account.
* Only certain types of instances can be launched in a placement group (Compute Optimized, GPU, Memory Optimized, Storage Optimized)
* AWS recommend homogenous instances within clustered placement groups.
* You can't merge placement groups.
* You can't move an existing instance into a placement group. You can create an AMI from your existing instance, and then launch a new instance from the AMI into a placement group.

## 3. References
* [Placement groups](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/placement-groups.html)
