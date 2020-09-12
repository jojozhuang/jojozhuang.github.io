---
layout: tutorial
key: cloud
title: "AWS-EC2-Elastic File System"
index: 4127
subcategory: amazon-aws
date: 2019-09-16
tags: [AWS, EC2]
---

> Amazon EC2.

## 1. Elastic File System
### 1.1 What Is EFS?
Amazon Elastic File System (Amazo EFS) is a file storage service for Amazon Elastic Compute Cloud(Amazon EC2) instances. Amazon EFS is easy to use and provides a simple interface that allows you to create and configure file systems quick and easily. With Amazon EFS, storage capacity is elastic, growing and shrinking automatically as you add and remove files, so your applications have the storage they need.

Benefits of using EFS:
* Supports the Network File System version 4 (NFSv4) protocol.
* You only pay for the storage you use (no pre-provisioning required.)
* Can scale up to the petabytes
* Can support thousands of concurrent NFS connections
* Data is stored across multiple AZ's within a region
* Read After Write Consistency

### 8.2 EFS Lab
1) Create EFS, Services -> Storage -> EFS, Create File System.
![image](/assets/images/cloud/4106/4-15-ec2-create-efs-1.png)
Keep default.
![image](/assets/images/cloud/4106/4-15-ec2-create-efs-2.png)
Just enable the encryption.
![image](/assets/images/cloud/4106/4-15-ec2-create-efs-3.png)
Keep default.
![image](/assets/images/cloud/4106/4-15-ec2-create-efs-4.png)
It will take few minutes to finish.
![image](/assets/images/cloud/4106/4-15-ec2-create-efs-5.png)
![image](/assets/images/cloud/4106/4-15-ec2-create-efs-6.png)
Wait until efs are created. Services->Storage->EFS, expand the arrow, click on "Amazon EC2 mount instructions (from local VPC)".
![image](/assets/images/cloud/4106/4-15-ec2-create-efs-7.png)
Copy the tls command , 'sudo mount -t efs -o tls fs-9c5a377e:/ efs'. We will use it in terminal.
![image](/assets/images/cloud/4106/4-15-ec2-create-efs-8.png)

2) Meanwhile, edit Security Group, select the 'default' group, switch to 'Inbound' tab.
![image](/assets/images/cloud/4106/4-15-ec2-add-nfs-1.png)
Click Edit, add new rule, choose NFS and select 'WebDMZ' security group, Save.
![image](/assets/images/cloud/4106/4-15-ec2-add-nfs-2.png)
NFS is in the inbound.
![image](/assets/images/cloud/4106/4-15-ec2-add-nfs-3.png)

3) Create new instance and add bootstrap script. Specify 2 instances.
![image](/assets/images/cloud/4106/4-15-ec2-create-instance-1.png)

Put the following script to user data.
```raw
#!/bin/bash
yum update -y
yum install httpd -y
service httpd start
chkconfig httpd on
yum install amazon-efs-utils -y
```
![image](/assets/images/cloud/4106/4-15-ec2-create-instance-2.png)
Once the two instances are launched, note the public IP addresses.
![image](/assets/images/cloud/4106/4-15-ec2-create-instance-3.png)
 Open two terminals to SSH to these two EC2 instances. In the first terminal, navigate to '/var/www/html', nothing there.
 ```raw
[ec2-user@ip-172-31-88-216 ~]$ sudo su
[root@ip-172-31-88-216 ec2-user]# cd /var/www
[root@ip-172-31-88-216 www]# ls
cgi-bin  html
[root@ip-172-31-88-216 www]# cd html
[root@ip-172-31-88-216 html]# ls
[root@ip-172-31-88-216 html]#
 ```
 Repeat the same steps in second terminal.
 ```raw
[ec2-user@ip-172-31-83-133 ~]$ sudo su
[root@ip-172-31-83-133 ec2-user]# cd /var/www
[root@ip-172-31-83-133 www]# ls
cgi-bin  html
[root@ip-172-31-83-133 www]# cd html
[root@ip-172-31-83-133 html]# ls
[root@ip-172-31-83-133 html]#
 ```
Mount EFS to /var/www/html for both ec2 instances. Do this in the www folder.
```raw
[root@ip-172-31-88-216 html]# cd ..
[root@ip-172-31-88-216 www]# mount -t efs -o tls fs-9c5a377e:/ /var/www/html
```
In the first terminal, create index.html in 'html' folder.
```raw
[root@ip-172-31-88-216 www]# cd html
[root@ip-172-31-83-133 html]# echo '<html><h1>hello,file system</h1></html>' > index.html
[root@ip-172-31-83-133 html]# ls
index.html
```
In the second terminal, we will see the same file.
```raw
[root@ip-172-31-83-133 www]# cd html/
[root@ip-172-31-83-133 html]# ls
index.html
[root@ip-172-31-83-133 html]# cat index.html
<html><h1>hello,file system</h1></html>
[root@ip-172-31-83-133 html]#
```

## 10. References
* [Amazon EC2](https://aws.amazon.com/ec2/)
* [Amazon EC2 pricing](https://aws.amazon.com/ec2/pricing/)
* [Amazon EC2 Instance Types](https://aws.amazon.com/ec2/instance-types/)
* [Amazon EC2 FAQs](https://aws.amazon.com/ec2/faqs/)
* [Instance Metadata and User Data](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-metadata.html)
* [Easily Replace or Attach an IAM Role to an Existing EC2 Instance by Using the EC2 Console](https://aws.amazon.com/blogs/security/easily-replace-or-attach-an-iam-role-to-an-existing-ec2-instance-by-using-the-ec2-console/)
