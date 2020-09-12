---
layout: tutorial
key: cloud
title: "AWS-EC2-IAM Roles"
index: 4125
subcategory: amazon-aws
date: 2019-09-16
tags: [AWS, EC2]
---

> Amazon EC2.

### 5.2 Using IAM Roles With EC2
Services -> IAM -> Roles -> Create Role, choose EC2.
![image](/assets/images/cloud/4106/4-12-ec2-iam-role-1.png)
Select AdministratorAccess.
![image](/assets/images/cloud/4106/4-12-ec2-iam-role-2.png)
Input name.
![image](/assets/images/cloud/4106/4-12-ec2-iam-role-3.png)
New role created.
![image](/assets/images/cloud/4106/4-12-ec2-iam-role-4.png)

Use role. ssh to remote ec2 instance, try 'aws s3 ls' command. It doesn't work if credentials are not there in '.aws' folder.
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
Attach role to ec2 instance. Select the instance, Actions->Instance Settings->Attach/Replace IAM Role.
![image](/assets/images/cloud/4106/4-12-ec2-attach-role-to-instance.png)
Select the role created in previous step and click Apply button.
![image](/assets/images/cloud/4106/4-12-ec2-attach-role-to-instance-2.png)
Then, we will see the role visible for the instance.
![image](/assets/images/cloud/4106/4-12-ec2-attach-role-to-instance-3.png)
Click on the role to see the details.
![image](/assets/images/cloud/4106/4-12-ec2-attach-role-to-instance-4.png)
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
By doing this, there is no credentials are stored in the server directory.

### 5.3 Summary of IDENTITY ACCESS MANAGEMENT ROLES:
* Roles are more secure than storing your access key and secret access key on individual EC2 instances.
* Roles are easier to manage.
* Roles can be assigned to an EC2 instance after it is created using both the console & command line.
* Roles are universal you can use them in any region.

## 10. References
* [Amazon EC2](https://aws.amazon.com/ec2/)
* [Amazon EC2 pricing](https://aws.amazon.com/ec2/pricing/)
* [Amazon EC2 Instance Types](https://aws.amazon.com/ec2/instance-types/)
* [Amazon EC2 FAQs](https://aws.amazon.com/ec2/faqs/)
* [Instance Metadata and User Data](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-metadata.html)
* [Easily Replace or Attach an IAM Role to an Existing EC2 Instance by Using the EC2 Console](https://aws.amazon.com/blogs/security/easily-replace-or-attach-an-iam-role-to-an-existing-ec2-instance-by-using-the-ec2-console/)
