---
layout: tutorial
key: cloud
title: "AWS-Databases-5-Draft"
index: 4107
subcategory: amazon-aws
date: 2019-09-16
tags: [EC2]
draft: true
---

> Amazon AWS Tutorial

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



## 9. References
