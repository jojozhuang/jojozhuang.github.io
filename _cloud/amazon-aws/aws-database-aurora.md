---
layout: tutorial
key: cloud
title: "AWS-Database-Aurora"
index: 4143
subcategory: amazon-aws
date: 2019-09-16
tags: [AWS, Aurora]
---

> Using Aurora database services.

## 1. Aurora
### 1.1 What Is Aurora?
Amazon Aurora is a MySQL-compatible, relational database engine that combines the speed and availability of high-end commercial databases with the simplicity and cost-effectiveness of open source databases. Amazon Aurora provides up to five times better performance than MySQL at a price point one tenth that of a commercial database while delivering similar performance and availability.

### 1.2 The Basics of Aurora
Things to know about Aurora:
* Start with 10GB, Scales in 10GB increments to 64TB (Storage Autoscaling)
* Compute resources can scale up to 32vCPUs and 244GB of Memory.
* 2 copies of your data is contained in each availability zone, with minimum of 3 availability zones. 6 copies of your data.

### 1.3 Scaling Aurora
* Aurora is designed to transparently handle the loss of up to two copies of data without affecting database write availability and up to three copies without affecting read availability.
* Aurora storage is also self-healing. Data blocks and disks are continuously scanned for errors and repaired automatically.

### 1.4 Compare Aurora replica and MySQL replica

Feature                                          |  Amazon Aurora Replicas       | MySQL Replicas
-------------------------------------------------|-------------------------------|-----------------
Number of replicas                               | Up to 15                      | Up to 5
Replication type                                 | Asynchronous (milliseconds)   | Asynchronous (seconds)
Performance impact on primary                    | Low                           | High
Act as failover target                           | Yes (no data loss)            | Yes (potentially minutes of data loss)
Automated failover                               | Yes                           | No
Support for user-defined replication delay       | No                            | Yes
Support for different data or schema vs. primary | No                            | Yes

### 1.5 Backups With Aurora
* Automated backups are always enabled on Amazon Aurora DB Instances. Backups do not impact database performance.
* You can also take snapshots with Aurora. This also does not impact on performance.
* You can share Aurora Snapshots with other AWS accounts.

## 2. Lab - Aurora
### 2.1 Creating Aurora Read Replica
Select the MySQL instance, actions->Create Aurora read replica
![image](/assets/images/cloud/4143/aurora-1.png)
Choose "Create Replica in Different Zone" and set DB instance identifier, keep other settings as default, click "Create read replica" button in the bottom.
![image](/assets/images/cloud/4143/aurora-2.png)
Aurora replica is created.
![image](/assets/images/cloud/4143/aurora-3.png)
Wait for a while, there is one writer instance and one reader instance.
![image](/assets/images/cloud/4143/aurora-4.png)

### 2.2 Summary of Aurora
* 2 copies of your data is contained in each availability zone, with minimum of 3 availability zones. 6 copies of your data.
* You can share Aurora Snapshots with other AWS accounts.
* 2 types of replicas available. Aurora Replicas and MySQL replicas. Automated failover is only available with Aurora Replicas.
* Aurora has automated backups turned on by default. You can also take Snapshots with Aurora. You can share these snapshots with other AWS accounts.

## 3. References
* [Amazon Aurora](https://aws.amazon.com/rds/aurora/)
