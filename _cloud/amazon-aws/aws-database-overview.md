---
layout: tutorial
key: cloud
title: "AWS-Database-Overview"
index: 4141
subcategory: amazon-aws
date: 2019-09-16
tags: [AWS, RDS, Aurora, DynamoDB, RedShift]
---

> Database services on AWS.

## 1. Databases On AWS
### 1.1 Database Services

| Database Type | Use Cases                                                                                       | AWS service                                                      |
|---------------|-------------------------------------------------------------------------------------------------|------------------------------------------------------------------|
| Relational    | Traditional applications, ERP, CRM, e\-commerce                                                 | Amazon Aurora \| Amazon RDS \| Amazon Redshift                   |
| Key\-value    | High\-traffic web apps, e\-commerce systems, gaming applications                                | Amazon DynamoDB                                                  |
| In\-memory    | Caching, session management, gaming leaderboards, geospatial applications                       | Amazon ElastiCache for Memcached \| Amazon ElastiCache for Redis |
| Document      | Content management, catalogs, user profiles	                                                    | Amazon DocumentDB \(with MongoDB compatibility\)                 |
| Wide\-column  | High scale industrial apps for equipment maintenance, fleet management, and route optimization  | Amazon Keyspaces \(for Apache Cassandra\)                        |
| Graph         | Fraud detection, social networking, recommendation engines                                      | Amazon Neptune                                                   |
| Time series   | IoT applications, DevOps, industrial telemetry                                                  | Amazon Timestream                                                |
| Ledger        | Systems of record, supply chain, registrations, banking transactions                            | Amazon Quantum Ledger Database                                   |

### 1.2 OLTP vs OLAP
Online Transaction Processing (`OLTP`) differs from OLAP Online Analytics Processing (`OLAP`) in terms of the types of queries you will run.

OLTP Example: Purchase Order, Invoice
* Pulls up a row of data such as Name, Date, Address to Deliver to, Delivery Status etc.

OLAP Example: Net Profit for EMEA and Pacific for the Digital Radio Product.
* Pulls in large numbers of records
* Sum of Radios Sold in EMEA
* Sum of Radios Sold in Pacific
* Unit Cost of Radio in each region
* Sales price of each radio
* Sales price - unit cost.

## 2. RDS
### 2.1 Types of Database
* Relational databases(RDB, OLTP)
  - SQL Server
  - Oracle
  - MySQL Server
  - PostgreSQL
  - Aurora
  - MariaDB
* DynamoDB(No SQL)
* RedShift(OLAP)

### 2.2 Key Features of RDS
RDS has two key features:
* `Multi-AZ` - For Disaster Recovery
* `Read Replicas` - For Performance

Multi AZ.
![image](/assets/images/cloud/4141/database-rds-multi-az.png){:width="800px"}
Replica.
![image](/assets/images/cloud/4141/database-rds-replica.png)

### 2.3 Summary
* RDS runs on virtual machines, you cannot log in to these operating systems.
* Patching of the RDS Operating System and DB is Amazon's responsibility
* RDS is NOT Serverless
* Aurora Serverless IS Serverless

## 3. Data Warehousing
Used for business intelligence. Tools like Cognos, Jaspersoft, SQL Server Reporting Services, Oracle Hyperion, SAP NetWeaver.

Used to pull in very large and complex data sets. Usually used by management to do queries on data (such as current performance vs targets etc)

Data Warehousing databases use different type of architecture both from a database perspective and infrastructure layer.

Amazon's Data Warehouse Solution Is Called `Redshift`. Redshift is for Business Intelligence or Data Warehousing.

## 4. What Is ElastiCache?
ElastiCache is a web service that makes it easy to deploy, operate, and scale an in-memory cache in the cloud. The service improves the performance of web applications by allowing you to retrieve information from fast, managed, in-memory caches, instead of relying entirely on slower disk-based databases.
ElastiCache supports two open-source in-memory caching engines:
* Memcache
* Redis

Elasticache is used to speed up performance of existing databases (frequent identical queries).

## 5. References
* [Databases on AWS](https://aws.amazon.com/products/databases/)
