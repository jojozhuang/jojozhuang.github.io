---
layout: tutorial
key: cloud
title: "AWS-Database-Redshift"
index: 4145
subcategory: amazon-aws
date: 2019-09-16
tags: [AWS, RedShift]
---

> Use Redshift to lower the cost and operational overhead of a data warehouse.

## 1. Redshift
### 1.1 What is Redshift?
Amazon Redshift is a fast and powerful, fully managed, petabyte scale data warehouse service in the cloud. Customers can start small for just $0.25 per hour with no commitments or upfront costs and scale to a petabyte or more for $1,000 per terabyte per year, less than a tenth of most other data warehousing solutions.
### 1.2 Redshift Configuration
Redshift can be configured as follows
* Single Node (160Gb)
* Multi-Node
  - Leader Node (manages client connections and receives queries.)
  - Compute Node (store data and perform queries and computations). Up to 128 Compute Nodes.

### 1.3 Advanced Compression
Columnar data stores can be compressed much more than row-based data stores because similar data is stored sequentially on disk. Amazon Redshift employs multiple compression techniques and can often achieve significant compression relative to traditional relational data stores. In addition, Amazon Redshift doesn't require indexes or materialized views, and so uses less space than traditional relational database systems. When loading data into an empty table, Amazon Redshift automatically samples your data and selects the most appropriate compression scheme.

### 1.4 Massively Parallel Processing (MPP)
Amazon Redshift automatically distributes data and query load across all nodes. Amazon Redshift makes it easy to add nodes to your data warehouse and enables you to maintain fast query performance as your data warehouse grows.
### 1.5 Redshift Backups
Backups:
* Enabled by default with a 1 day retention period.
* Maximum retention period is 35 days.
* Redshift always attempts to maintain at least three copies of your data (the original and replica on the compute nodes and a backup in Amazon S3).
* Redshift can also asynchronously replicate your snapshots to S3 in another region for disaster recovery.

### 1.6 Redshift Pricing
Redshift is priced as follows:
* Compute Node Hours (total number of hours you run across all your compute nodes for the billing period. You are billed for 1 unit per node per hour, so a 3-node data warehouse cluster running persistently for an entire month would incur 2,160 instance hours. You will not be charged for leader node hours; only compute nodes will incur charges.)
* Backup
* Data transfer (only within a VPC, not outside it)

### 1.7 Redshift Security
Security Considerations:
* Encrypted in transit using SSL
* Encrypted at rest using AES-256 encryption
* By default RedShift takes care of key management.
  - Manage your own keys through HSM
  - AWS Key Management Service

### 1.8 Redshift Availability
Redshift Availability:
* Currently only available in 1 AZ
* Can restore snapshots to new AZs in the event of an outage.

## 2. References
* [Amazon Redshift](https://aws.amazon.com/redshift/)
* [Amazon Redshift FAQs](https://aws.amazon.com/redshift/faqs/)
