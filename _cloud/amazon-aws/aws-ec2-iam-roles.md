---
layout: tutorial
key: cloud
title: "AWS-EC2-IAM Roles"
index: 4125
subcategory: amazon-aws
date: 2019-09-16
tags: [AWS, EC2]
---

> Use IAM roles to manage secure access to AWS services.

## 1. IAM
### 1.1 What is Identity and Access Management?
AWS Identity and Access Management (IAM) enables you to manage access to AWS services and resources securely. Using IAM, you can create and manage AWS users and groups, and use permissions to allow and deny their access to AWS resources.

### 1.2 What is IAM Role?
An IAM role is an IAM entity that defines a set of permissions for making AWS service requests. IAM roles are not associated with a specific user or group. Instead, trusted entities assume roles, such as IAM users, applications, or AWS services such as EC2.

## 2. Lab - IAM Roles
### 2.1 Using IAM Roles With EC2
Go to Services -> IAM -> Roles -> Create Role, choose EC2.
![image](/assets/images/cloud/4125/ec2-iam-role-1.png)
Select AdministratorAccess, next.
![image](/assets/images/cloud/4125/ec2-iam-role-2.png)
Set role name, then "Create role".
![image](/assets/images/cloud/4125/ec2-iam-role-3.png)
New role is created.
![image](/assets/images/cloud/4125/ec2-iam-role-4.png)
### 2.2 Using the Role
Remote connect to EC2 instance with ssh. Try "aws s3 ls" command. It doesn't work if credentials are not there in ".aws" folder.
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
Attach role to EC2 instance. Select the instance, Actions->Instance Settings->Attach/Replace IAM Role.
![image](/assets/images/cloud/4125/ec2-attach-role-to-instance-1.png)
Select the role created in previous step and click Apply button.
![image](/assets/images/cloud/4125/ec2-attach-role-to-instance-2.png)
Then, we will see the role is attached to the instance.
![image](/assets/images/cloud/4125/ec2-attach-role-to-instance-3.png)
Click on the role to see the details.
![image](/assets/images/cloud/4125/ec2-attach-role-to-instance-4.png)
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
By doing this, there is no credentials are stored in the server directory, which is more secure.
### 2.3 Summary of IAM Roles
* Roles are more secure than storing your access key and secret access key on individual EC2 instances.
* Roles are easier to manage.
* Roles can be assigned to an EC2 instance after it is created using both the console & command line.
* Roles are universal you can use them in any region.

## 3. References
* [AWS Identity and Access Management (IAM)](https://aws.amazon.com/iam/)
* [AWS IAM FAQs](https://aws.amazon.com/iam/faqs/)
* [Easily Replace or Attach an IAM Role to an Existing EC2 Instance by Using the EC2 Console](https://aws.amazon.com/blogs/security/easily-replace-or-attach-an-iam-role-to-an-existing-ec2-instance-by-using-the-ec2-console/)
