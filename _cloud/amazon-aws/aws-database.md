---
layout: tutorial
key: cloud
title: "AWS-Database"
index: 4107
subcategory: amazon-aws
date: 2019-09-16
tags: [AWS, RDS, Aurora, DynamoDB, RedShift]
---

> Using SQL and NO SQL database services.

## 1. Databases On AWS
### 1.1 Database Types on AWS
* Relational databases(RDB, OLTP)
  - SQL Server
  - Oracle
  - MySQL Server
  - PostgreSQL
  - Aurora
  - MariaDB
* DynamoDB(No SQL)
* RedShift(OLAP)

RDS has two key features:
* `Multi-AZ` - For Disaster Recovery
* `Read Replicas` - For Performance

Multi AZ.
![image](/assets/images/cloud/4107/database-rds-multi-az.png){:width="800px"}
Replica.
![image](/assets/images/cloud/4107/database-rds-replica.png)

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

### 1.3 What is Data Warehousing?
Used for business intelligence. Tools like Cognos, Jaspersoft, SQL Server Reporting Services, Oracle Hyperion, SAP NetWeaver.

Used to pull in very large and complex data sets. Usually used by management to do queries on data (such as current performance vs targets etc)

Data Warehousing databases use different type of architecture both from a database perspective and infrastructure layer.

Amazon's Data Warehouse Solution Is Called `Redshift`. Redshift is for Business Intelligence or Data Warehousing.
### 1.4 What Is ElastiCache?
ElastiCache is a web service that makes it easy to deploy, operate, and scale an in-memory cache in the cloud. The service improves the performance of web applications by allowing you to retrieve information from fast, managed, in-memory caches, instead of relying entirely on slower disk-based databases.
ElastiCache supports two open-source in-memory caching engines:
* Memcache
* Redis

Elasticache is used to speed up performance of existing databases (frequent identical queries).

## 2. Database Lab
### 2.1 Create RDS Instance
Create MySql database. Services->Storage->RDS.
![image](/assets/images/cloud/4107/5-2-rds-wordpress-1.png)
Select free tier and set database name and password.
![image](/assets/images/cloud/4107/5-2-rds-wordpress-2.png)
Choose to create security group.
![image](/assets/images/cloud/4107/5-2-rds-wordpress-3.png)
Set database name, so when this database is launched, a new db will be created automatically.
![image](/assets/images/cloud/4107/5-2-rds-wordpress-4.png)
Set retention period to 0 days to disable backup.
![image](/assets/images/cloud/4107/5-2-rds-wordpress-5.png)
It takes some time until the MySQL instance is launched.
![image](/assets/images/cloud/4107/5-2-rds-wordpress-6.png)
Copy the endpoint value, we will use it later.
![image](/assets/images/cloud/4107/5-2-rds-wordpress-7.png)
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
![image](/assets/images/cloud/4107/5-2-rds-wordpress-8.png)
Add tag "WordPressServer".
![image](/assets/images/cloud/4107/5-2-rds-wordpress-9.png)
Add 'WebDMZ' security group into the inbound rule of 'rds-launch-wizard', so that the web server instance can access the MySQL instance.
![image](/assets/images/cloud/4107/5-2-rds-wordpress-10.png)
Access the public ip of web server. We will see the webpress admin page.
![image](/assets/images/cloud/4107/5-2-rds-wordpress-11.png)
Setup the data connection, including database name, use name, password. Put the endpoint value(MySQL instance) into Database Host.
![image](/assets/images/cloud/4107/5-2-rds-wordpress-12.png)
Error occurs: can't write the wp-config.php file.
![image](/assets/images/cloud/4107/5-2-rds-wordpress-13.png)
Copy the script, then ssh to the web server. Create a file named `wp-config.php` in folder `/var/www/html` with the content from latest step.
![image](/assets/images/cloud/4107/5-2-rds-wordpress-14.png){:width="600px"}
Refresh the page, now, the wordpress admin page is displayed properly. Set title, name, etc.
![image](/assets/images/cloud/4107/5-2-rds-wordpress-15.png)
WordPress is installed successfully.
![image](/assets/images/cloud/4107/5-2-rds-wordpress-16.png)
Login.
![image](/assets/images/cloud/4107/5-2-rds-wordpress-17.png)
Home page of WordPress.
![image](/assets/images/cloud/4107/5-2-rds-wordpress-18.png)
Tips of Relational Databases:
* RDS runs on virtual machines, you cannot log in to these operating systems.
* Patching of the RDS Operating System and DB is Amazon's responsibility
* RDS is NOT Serverless
* Aurora Serverless IS Serverless

## 3. RDS Backups
### 3.1 Backup Types
There are two different types of Backups for RDS:
* Automated Backups
* Database Snapshots

Automated Backups allow you to recover your database to any point in time within a "retention period". The retention period can be between one and 35 days. Automated Backups will take a full daily snapshot and will also store transaction logs throughout the day. When you do a recovery, AWS will first choose the most recent daily back up, and then apply transaction logs relevant to that day. This allows you to do a point in time recovery down to a second, within the retention period.

DB Snapshots are done manually (ie they are user initiated.) They are stored even after you delete the original RDS instance, unlike automated backups.

Whenever you restore either an Automatic Backup or a manual Snapshot, the restored version of the database will be a new RDS instance with a new DNS endpoint.

Encryption at rest is supported for MySQL, Oracle, SQL Server, PostgreSQL, MariaDB & Aurora. Encryption is done using the AWS Key Management Service (KMS) service. Once your RDS instance is encrypted, the data stored at rest in the underlying storage is encrypted, as are its automated backups, read replicas, and snapshots.

### 3.2 What Is Multi-AZ?
* Multi-AZ allows you to have an exact copy of your production database in another Availability Zone. AWS handles the replication for you, so when your production database is written to, this write will automatically be synchronized to the stand by database.
* In the event of planned database maintenance, DB Instance failure, or an Availability Zone failure, Amazon RDS will automatically failover to the standby so that database operations can resume quickly without administrative intervention.
* Multi-AZ is for Disaster Recovery only.
* It is not primarily used for improving performance. For performance improvement, you need Read Replicas.

Multi-AZ is available for the following databases
* SQL Server
* Oracle
* MySQL
* PostgreSQL
* MariaDB

### 3.3 What Is A Read Replica?
Read replicas allow you to have a read-only copy of your production database. This is achieved by using Asynchronous replication from the primary RDS instance to the read replica. You use read replicas primarily for very read-heavy database workloads.

Read Replicas are available for the following databases:
* MySQL
* PostgreSQL
* MariaDB
* Aurora

Things to know about Read Replicas:
* Used for scaling, not for DR!
* Must have automatic backups turned on in order to deploy a read replica.
* You can have up to 5 read replica copies of any database.
* You can have read replicas of read replicas (but watch out for latency.)
* Each read replica will have its own DNS end point.
* You can have read replicas that have Multi-AZ.
* You can create read replicas of Multi-AZ source databases.
* Read replicas can be promoted to be their own databases. This breaks the replication.
* You can have a read replica in a second region.

### 3.4 RDS Backups Lab
Choose the Mysql database create in previous session, click modify button.
![image](/assets/images/cloud/4107/5-4-rds-backup-1.png)
Enable Multi-AZ deployment.
![image](/assets/images/cloud/4107/5-4-rds-backup-2.png)
Click 'Modify' button, warning appears. Select 'Apply immediately' option.
![image](/assets/images/cloud/4107/5-4-rds-backup-3.png)
The status of the database instance will be in modifying status. Wait for a while until the status is changed to 'Available'.
![image](/assets/images/cloud/4107/5-4-rds-backup-4.png)
Click it to see the details, switch to Configuration tab, you can see Multi AZ is set to yes.
![image](/assets/images/cloud/4107/5-4-rds-backup-5.png)
Modify the database instance, turn on backup by setting the retention period to 35 days, then choose "Apply immediately" option.
![image](/assets/images/cloud/4107/5-4-rds-backup-6.png)
The database instance will change to modifying status again, wait until it becomes to Available status. Actions->Create read replica.
![image](/assets/images/cloud/4107/5-4-rds-backup-7.png)
Choose a different region to replica, eg. EU West(Ireland). Provide database identify name and keep other settings as default, click "Create read replica".
![image](/assets/images/cloud/4107/5-4-rds-backup-8.png)
A new database instance is created with role 'Replica' in a different AZ.
![image](/assets/images/cloud/4107/5-4-rds-backup-9.png)
Click Actions->Promote read replica to convert a MySQL Read Replica into a “standalone” RDS database instance.
![image](/assets/images/cloud/4107/5-4-rds-backup-10.png)

Tips for RDS Backups:  
Read Replicas:
* Can be Multi-AZ.
* Used to increase performance.
* Must have backups turned on.
* Can be in different regions.
* Can be Aurora or MySQL.
* Can be promoted to master, this will break the Read Replica.


MuItiAZ:
* Used For DR.
* You can force a failover from one AZ to another by rebooting the RDS instance.

## 4. DynamoDB
### 4.1 What Is DynamoDB?
Amazon DynamoDB is a fast and flexible NoSQL database service for all applications that need consistent, single-digit millisecond latency at any scale. It is a fully managed database and supports both document and key-value data models. Its flexible data model and reliable performance make it a great fit for mobile, web, gaming, ad-tech, loT, and many other applications.

### 4.2 Basics of DynamoDB
* Stored on SSD storage
* Spread across 3 geographically distinct data centers
* Eventual Consistent Reads (Default)
* Strongly Consistent Reads

`Eventual Consistent Reads`: Consistency across all copies of data is usually reached within a second. Repeating a read after a short time should return the updated data. (Best Read Performance)

`Strongly Consistent Reads`: A strongly consistent read returns a result that reflects all writes that received a successful response prior to the read.

## 5. Redshift
### 5.1 What is Redshift?
Amazon Redshift is a fast and powerful, fully managed, petabyte scale data warehouse service in the cloud. Customers can start small for just $0.25 per hour with no commitments or upfront costs and scale to a petabyte or more for $1,000 per terabyte per year, less than a tenth of most other data warehousing solutions.
### 5.2 Redshift Configuration
Redshift can be configured as follows
* Single Node (160Gb)
* Multi-Node
  - Leader Node (manages client connections and receives queries.)
  - Compute Node (store data and perform queries and computations). Up to 128 Compute Nodes.

### 5.3 Advanced Compression
Columnar data stores can be compressed much more than row-based data stores because similar data is stored sequentially on disk. Amazon Redshift employs multiple compression techniques and can often achieve significant compression relative to traditional relational data stores. In addition, Amazon Redshift doesn't require indexes or materialized views, and so uses less space than traditional relational database systems. When loading data into an empty table, Amazon Redshift automatically samples your data and selects the most appropriate compression scheme.

### 5.4 Massively Parallel Processing (MPP)
Amazon Redshift automatically distributes data and query load across all nodes. Amazon Redshift makes it easy to add nodes to your data warehouse and enables you to maintain fast query performance as your data warehouse grows.
### 5.5 Redshift Backups
Backups:
* Enabled by default with a 1 day retention period.
* Maximum retention period is 35 days.
* Redshift always attempts to maintain at least three copies of your data (the original and replica on the compute nodes and a backup in Amazon S3).
* Redshift can also asynchronously replicate your snapshots to S3 in another region for disaster recovery.

### 5.6 Redshift Pricing
Redshift is priced as follows:
* Compute Node Hours (total number of hours you run across all your compute nodes for the billing period. You are billed for 1 unit per node per hour, so a 3-node data warehouse cluster running persistently for an entire month would incur 2,160 instance hours. You will not be charged for leader node hours; only compute nodes will incur charges.)
* Backup
* Data transfer (only within a VPC, not outside it)

### 5.7 Redshift Security
Security Considerations:
* Encrypted in transit using SSL
* Encrypted at rest using AES-256 encryption
* By default RedShift takes care of key management.
  - Manage your own keys through HSM
  - AWS Key Management Service

### 5.8 Redshift Availability
Redshift Availability:
* Currently only available in 1 AZ
* Can restore snapshots to new AZs in the event of an outage.

## 6. Aurora
### 6.1 What Is Aurora?
Amazon Aurora is a MySQL-compatible, relational database engine that combines the speed and availability of high-end commercial databases with the simplicity and cost-effectiveness of open source databases. Amazon Aurora provides up to five times better performance than MySQL at a price point one tenth that of a commercial database while delivering similar performance and availability.

### 6.2 The Basics of Aurora
Things to know about Aurora:
* Start with 10GB, Scales in 10GB increments to 64TB (Storage Autoscaling)
* Compute resources can scale up to 32vCPUs and 244GB of Memory.
* 2 copies of your data is contained in each availability zone, with minimum of 3 availability zones. 6 copies of your data.

### 6.3 Scaling Aurora
* Aurora is designed to transparently handle the loss of up to two copies of data without affecting database write availability and up to three copies without affecting read availability.
* Aurora storage is also self-healing. Data blocks and disks are continuously scanned for errors and repaired automatically.

### 6.4 Compare Aurora replica and MySQL replica

Feature                                          |  Amazon Aurora Replicas       | MySQL Replicas
-------------------------------------------------|-------------------------------|-----------------
Number of replicas                               | Up to 15                      | Up to 5
Replication type                                 | Asynchronous (milliseconds)   | Asynchronous (seconds)
Performance impact on primary                    | Low                           | High
Act as failover target                           | Yes (no data loss)            | Yes (potentially minutes of data loss)
Automated failover                               | Yes                           | No
Support for user-defined replication delay       | No                            | Yes
Support for different data or schema vs. primary | No                            | Yes

### 6.5 Backups With Aurora
* Automated backups are always enabled on Amazon Aurora DB Instances. Backups do not impact database performance.
* You can also take snapshots with Aurora. This also does not impact on performance.
* You can share Aurora Snapshots with other AWS accounts.

### 6.6 Aurora Lab
Select the MySQL instance, actions->Create Aurora read replica
![image](/assets/images/cloud/4107/5-7-aurora-6.png)
Choose 'Create Replica in Different Zone' and set DB instance identifier, keep other settings as default, click "Create read replica" button in the bottom.
![image](/assets/images/cloud/4107/5-7-aurora-7.png)
Aurora replica is created.
![image](/assets/images/cloud/4107/5-7-aurora-8.png)
Wait for a while, there is one writer instance and one reader instance.
![image](/assets/images/cloud/4107/5-7-aurora-9.png)

Tips of Aurora:
* 2 copies of your data is contained in each availability zone, with minimum of 3 availability zones. 6 copies of your data.
* You can share Aurora Snapshots with other AWS accounts.
* 2 types of replicas available. Aurora Replicas and MySQL replicas. Automated failover is only available with Aurora Replicas.
* Aurora has automated backups turned on by default. You can also take Snapshots with Aurora. You can share these snapshots with other AWS accounts.

## 7. Elasticache
### 7.1 What Is ElastiCache?
ElastiCache is a web service that makes it easy to deploy, operate, and scale an in-memory cache in the cloud. The service improves the performance of web applications by allowing you to retrieve information from fast, managed, in-memory caches, instead of relying entirely on slower disk-based databases.

### 7.2 Memcached vs Redis

Requirement                    | Memcached | Redis
-------------------------------|-----------|--------------
Simple Cache to offload DB     | Yes       | Yes
Ability to scale horizontally  | Yes       | Yes
Multi-threaded performance     | Yes       | No
Advanced data types            | No        | Yes
Ranking/Sorting data sets      | No        | Yes
Pub/Sub capabilities           | No        | Yes
Persistence                    | No        | Yes
Multi-AZ                       | No        | Yes
Backup & Restore Capabilities  | No        | Yes

### 7.3 Tips of Elasticache
* Use Elasticache to increase database and web application performance.
* Redis is Multi-AZ
* You can do back ups and restores of Redis

## 8. References
* [Databases on AWS](https://aws.amazon.com/products/databases/)
* [Amazon Relational Database Service (RDS)](https://aws.amazon.com/rds/)
* [Amazon Aurora](https://aws.amazon.com/rds/aurora/)
