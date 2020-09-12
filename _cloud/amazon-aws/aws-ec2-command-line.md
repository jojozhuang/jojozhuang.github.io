---
layout: tutorial
key: cloud
title: "AWS-EC2-Command Line"
index: 4124
subcategory: amazon-aws
date: 2019-09-16
tags: [AWS, EC2]
---

> Amazon EC2.

## 1. The AWS Command Line
### 1.1 What is AWS Command Line?
* You can interact with AWS from anywhere in the world just by using the command line (CLI).
* You will need to set up access in IAM.
* Commands themselves are not in the exam, but some basic commands will be useful to know for real life.

Start EC2 instance and get its public IP. SSH to it remotely.
```raw
>ssh ec2-user@18.234.185.140 -i johnny-aws-ec2-keypair.pem
The authenticity of host '18.234.185.140 (18.234.185.140)' can't be established.
ECDSA key fingerprint is SHA256:U8mtdYsvO0ltiT2L/GY+p+4+n/td8Q7qzWkGovkIlPI.
Are you sure you want to continue connecting (yes/no)? yes
Warning: Permanently added '18.234.185.140' (ECDSA) to the list of known hosts.
Last login: Mon Sep  9 15:40:49 2019 from 169.145.92.73

       __|  __|_  )
       _|  (     /   Amazon Linux 2 AMI
      ___|\___|___|

https://aws.amazon.com/amazon-linux-2/
[ec2-user@ip-172-31-93-212 ~]$ sudo su
[root@ip-172-31-93-212 ec2-user]# ls
```
Use `aws s3 ls` to list all existing s3 buckets, error occurs.
```raw
[root@ip-172-31-93-212 ec2-user]# aws s3 ls
Unable to locate credentials. You can configure credentials by running "aws configure".
[root@ip-172-31-93-212 ec2-user]#
```
Create a new user and download the secure csv which contains id/keys. Use them with `aws configure` to setup configration.
```raw
[root@ip-172-31-93-212 ec2-user]# aws configure
AWS Access Key ID [None]: ******************
AWS Secret Access Key [None]: ***************************************
Default region name [None]: us-east-1
Default output format [None]:
[root@ip-172-31-93-212 ec2-user]#
```
Then, try again. All existing s3 buckets are listed.
```raw
[root@ip-172-31-93-212 ec2-user]# aws s3 ls
2019-09-08 23:29:38 bucket-replication-destination
2019-09-08 20:34:17 johnnyawsguru-s3-01
2019-09-08 22:41:06 johnnyawsguru-version-01
```
Actually, the 'aws configure' command stores the credentials to file, which is stored in '~/.aws/credentials'.
```raw
[root@ip-172-31-93-212 ec2-user]# cd ~
[root@ip-172-31-93-212 ~]# ls -la
total 20
dr-xr-x---  4 root root 115 Sep  9 20:53 .
dr-xr-xr-x 18 root root 257 Sep  9 15:39 ..
drwxr-xr-x  2 root root  39 Sep  9 20:53 .aws
-rw-r--r--  1 root root  18 Oct 18  2017 .bash_logout
-rw-r--r--  1 root root 176 Oct 18  2017 .bash_profile
-rw-r--r--  1 root root 176 Oct 18  2017 .bashrc
-rw-r--r--  1 root root 100 Oct 18  2017 .cshrc
drwx------  2 root root  29 Sep  9 15:39 .ssh
-rw-r--r--  1 root root 129 Oct 18  2017 .tcshrc
[root@ip-172-31-93-212 ~]# cd .aws
[root@ip-172-31-93-212 .aws]# ls
config  credentials
[root@ip-172-31-93-212 .aws]# nano credentials
```
![image](/assets/images/cloud/4106/4-11-ec2-command-line-credentials.png)

## 10. References
* [Amazon EC2](https://aws.amazon.com/ec2/)
* [Amazon EC2 pricing](https://aws.amazon.com/ec2/pricing/)
* [Amazon EC2 Instance Types](https://aws.amazon.com/ec2/instance-types/)
* [Amazon EC2 FAQs](https://aws.amazon.com/ec2/faqs/)
* [Instance Metadata and User Data](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-metadata.html)
* [Easily Replace or Attach an IAM Role to an Existing EC2 Instance by Using the EC2 Console](https://aws.amazon.com/blogs/security/easily-replace-or-attach-an-iam-role-to-an-existing-ec2-instance-by-using-the-ec2-console/)
