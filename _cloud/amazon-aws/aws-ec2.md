---
layout: tutorial
key: cloud
title: "AWS-EC2-Draft"
index: 4106
subcategory: amazon-aws
date: 2019-09-16
tags: [EC2]
draft: true
---

> Amazon EC2.

## 1. EC2
### 1.1 What is EC2?
Amazon Elastic Compute Cloud (Amazon EC2) is a web service that provides secure, resizable compute capacity in the cloud. It is designed to make web-scale cloud computing easier for developers.
### 1.2 Amazon EC2 Pricing
There are four ways to pay for Amazon EC2 instances:
* `On Demand` - Allows you to pay a fixed rate by the hour (or by the second) with no commitment.
* `Reserved` - Provides you with a capacity reservation, and offer a significant discount on the hourly charge for an instance. Contract Terms are 1 or 3 Year Terms.
* `Spot` - Enables you to bid whatever price you want for instance capacity, providing for even greater savings if your applications have flexible start and end times.
* `Dedicated Hosts` - Physical EC2 server dedicated for your use. Dedicated Hosts can help you reduce costs by allowing you to use your existing server-bound software licenses.

### 1.3 On Demand Pricing
On Demand pricing is useful for:
* Users that want the low cost and flexibility of Amazon EC2 without any up-front payment or long-term commitment.
* Applications with short term, spiky, or unpredictable workloads that cannot be interrupted.
* Applications being developed or tested on Amazon EC2 for the first time.

### 1.4 Reserved Pricing
Reserved Pricing Reserved pricing is useful for:
* Applications with steady state or predictable usage.
* Applications that require reserved capacity.
* Users able to make upfront payments to reduce their total computing costs even further

Reserved Pricing Types:
* Standard Reserved instances - These offer up to 75% off on demand instances. The more you pay up front and the longer the contract, the greater the discount.
* Convertible Reserved Instances - These offer up to 54% off on demand capability to change the attributes of the RI as long as the exchange results in the creation of Reserved Instances of equal or greater value.
* Scheduled Reserved Instances - These are available to launch within the time windows you reserve. This option allows you to match your capacity reservation to a predictable recurring schedule that only requires a fraction of a day, a week, or a month.

### 1.5 Spot Pricing
Spot pricing is useful for:
* Applications that have flexible start and end times.
* Applications that are only feasible at very low compute prices.
* Users with urgent computing needs for large amounts of additional capacity.

### 1.6 Dedicated Hosts Pricing
Dedicated Hosts pricing is useful for:
* Useful for regulatory requirements that may not support multi-tenant virtualization.
* Great for licensing which does not support multi-tenancy or cloud deployments.
* Can be purchased On-Demand (hourly).
* Can be purchased as a Reservation for up to 70% off the On-Demand price.

### 1.7 EC2 Instance Types

Family | Speciality                    | Use case
-------|-------------------------------|------------------------------------------
F1     | Field Programmable Gate Array | Genomics research, financial analytics, real-time video processing, big data etc
I3     | High Speed Storage            | NoSQL DBs, Data Warehousing etc
G3     | Graphics Intensive            | Video Encoding/ 3D Application Streaming
H1     | High Disk Throughput          | MapReduce-based workloads, distributed file systems such as HDFS and MapR-FS
T3     | Lowest Cost, General Purpose  | Web Servers/Small DBs
D2     | Dense Storage                 | Fileservers/Data Warehousing/Hadoop
R5     | Memory Optimized              | Memory Intensive Apps/DBs
M5     | General Purpose               | Application Servers
C5     | Compute Optimized             | CPU Intensive Apps/DBs
P3     | Graphics/General Purpose GPU  | Machine Learning, Bit Coin Mining etc
X1     | Memory Optimized              | SAP HANA/Apache Spark etc
Z1D    | High compute capacity and a high memory footprint  | Ideal for electronic design automation (EDA) and certain relational database workloads with high per-core licensing costs.
A1     | Arm-based workloads           | Scale-out workloads such as web servers
U-6tb1 | Bare Metal                    | Bare metal capabilities that eliminate virtualization overhead

![image](/assets/images/note/9551/4-1-ec2-instance-types.png)
Mnemonic.
![image](/assets/images/note/9551/4-1-ec2-reserved-types-mnemonic.png)
EC2 exam tips.
![image](/assets/images/note/9551/4-1-ec2-exam-tips.png)
![image](/assets/images/note/9551/4-1-ec2-exam-tips2.png)
![image](/assets/images/note/9551/4-1-ec2-exam-tips3.png)
### 4.2 Let's Get Our Hands Dirty With EC2 - Part 1
Services->EC2, Launch Instance.
![image](/assets/images/note/9551/4-2-ec2-create-instance-1.png)
Choose AMI.
![image](/assets/images/note/9551/4-2-ec2-create-instance-2.png)
Choose Instance Type.
![image](/assets/images/note/9551/4-2-ec2-create-instance-3.png)
Configure Instance Details, check "Protect against accidental termination".
![image](/assets/images/note/9551/4-2-ec2-create-instance-4.png)
Add Storage.
![image](/assets/images/note/9551/4-2-ec2-create-instance-5.png)
Add Tags.
![image](/assets/images/note/9551/4-2-ec2-create-instance-6.png)
Security Group.
![image](/assets/images/note/9551/4-2-ec2-create-instance-7.png)
Launch.
![image](/assets/images/note/9551/4-2-ec2-create-instance-8.png)
Create key pair, johnny-aws-ec2-keypair
![image](/assets/images/note/9551/4-2-ec2-create-instance-9.png)
Download Key Pair and Launch Instances.
![image](/assets/images/note/9551/4-2-ec2-create-instance-10.png)
Instance created and launched. Note down the public ip '3.83.9.181'.
![image](/assets/images/note/9551/4-2-ec2-create-instance-11.png)
Connect to EC2 instance remotely.
```raw
> ls
IMG_5807.JPG			johnny-aws-ec2-keypair.pem
IMG_5819.JPG			vertioning-test.txt
> chmod 400 johnny-aws-ec2-keypair.pem
> ssh ec2-user@3.83.9.181 -i johnny-aws-ec2-keypair.pem
ECDSA key fingerprint is SHA256:U8mtdYsvO0ltiT2L/GY+p+4+n/td8Q7qzWkGovkIlPI.
Are you sure you want to continue connecting (yes/no)? yes
Warning: Permanently added '3.83.9.181' (ECDSA) to the list of known hosts.
       __|  __|_  )
       _|  (     /   Amazon Linux 2 AMI
      ___|\___|___|

https://aws.amazon.com/amazon-linux-2/
[ec2-user@ip-172-31-83-218 ~]$
```
Install httpd.
```raw
[ec2-user@ip-172-31-83-218 ~]$ sudo su
[root@ip-172-31-83-218 ec2-user]# yum update -y
Loaded plugins: extras_suggestions, langpacks, priorities, update-motd
amzn2-core                                                                                                            | 2.4 kB  00:00:00     
No packages marked for update
[root@ip-172-31-83-218 ec2-user]# yum install httpd -y
```
Create an html page under /var/www/html with the following content.
```html
<html><h1>Hello	Johnny from EC2!</h1></html>
```
In remote ec2.
```raw
[root@ip-172-31-83-218 ec2-user]# cd /var/www/html
[root@ip-172-31-83-218 html]# nano index.html
[root@ip-172-31-83-218 html]# ls
index.html
[root@ip-172-31-83-218 html]# service httpd start
Redirecting to /bin/systemctl start httpd.service
[root@ip-172-31-83-218 html]# chkconfig on
```
Access 3.83.9.181 or http://3.83.9.181/index.html through web browser.
![image](/assets/images/note/9551/4-2-ec2-create-instance-12.png)
### 4.3 Let's Get Our Hands Dirty With EC2 - Part 2
Exam tips.
![image](/assets/images/note/9551/4-3-ec2-exam-tips.png)
### 4.4 Security Groups Basics
All outbound traffic is allowed.
![image](/assets/images/note/9551/4-4-ec2-security-group-outbound.png)
You can have multiple security groups attached to EC2 instance. (Instance->Actions->NetWorking->Change Security Groups)
![image](/assets/images/note/9551/4-4-ec2-security-group-multiple-groups.png)
Exam tips.
![image](/assets/images/note/9551/4-4-ec2-security-group-exam-tips.png)
![image](/assets/images/note/9551/4-4-ec2-security-group-exam-tips2.png)
### 4.5 EBS 101
![image](/assets/images/note/9551/4-5-ec2-ebs.png)
![image](/assets/images/note/9551/4-5-ec2-ebs-volumes.png)
![image](/assets/images/note/9551/4-5-ec2-ebs-types.png)
### 4.6 Volumes & Snapshots
When launching a new instance, one EBS volume is attached automatically and they are in the same Available Zone.
![image](/assets/images/note/9551/4-6-volumes-snapshots-1.png)
![image](/assets/images/note/9551/4-6-volumes-snapshots-2.png)
Screenshots from course video.

Launch a new instance with adding three additional EBS volumes.
![image](/assets/images/note/9551/4-6-volumes-snapshots-3.png)
After the instance is started, we will see four volumes.
![image](/assets/images/note/9551/4-6-volumes-snapshots-4.png)
Here, we can change the size of volume. For example, change the size of HDD from 500GB to 1000GB.
![image](/assets/images/note/9551/4-6-volumes-snapshots-5.png)
We can also change the Volume type from Standard SDD to Provisioned IOPS SSD for root volume.
![image](/assets/images/note/9551/4-6-volumes-snapshots-6.png)
Save the change, after a while, we will see the change is go live. For the root volume, type is changed from gp2 to io1.
![image](/assets/images/note/9551/4-6-volumes-snapshots-7.png)

Create new instance in another AZ.

Select root volume, Actions->Create Snapshot.
![image](/assets/images/note/9551/4-6-volumes-snapshots-8.png)
Wait for a while, we will see the snapshot is ready.
![image](/assets/images/note/9551/4-6-volumes-snapshots-9.png)
Now we can create image with this snapshot.
![image](/assets/images/note/9551/4-6-volumes-snapshots-10.png)
The new image appears in the AMIs, and it is ready to use.
![image](/assets/images/note/9551/4-6-volumes-snapshots-11.png)
Let's launch a new instance with this image, choose a different AZ.
![image](/assets/images/note/9551/4-6-volumes-snapshots-12.png)
After launch, notice it is in a different AZ(us-east-1a) from the original one(us-east-1b).
![image](/assets/images/note/9551/4-6-volumes-snapshots-13.png)
We can also move the EBS volume to another region by copying AMI image to another region and launch new instance with it. And we can choose any AZ in that region.
![image](/assets/images/note/9551/4-6-volumes-snapshots-14.png)

What happens to volumes if instances are terminated, will they all be deleted as well? see below.

Now we have two instance running.
![image](/assets/images/note/9551/4-6-volumes-snapshots-15.png)
And we have 5 volumes for above two instances.
![image](/assets/images/note/9551/4-6-volumes-snapshots-16.png)
After the instances are terminated, the addition volumes are still there, their states are changed to 'available' though. Only the root volumes are deleted.
![image](/assets/images/note/9551/4-6-volumes-snapshots-17.png)
Exam tips.
![image](/assets/images/note/9551/4-6-ec2-ebs-exam-tips.png)
![image](/assets/images/note/9551/4-6-ec2-ebs-exam-tips2.png)
![image](/assets/images/note/9551/4-6-ec2-ebs-exam-tips3.png)
### 4.7 AMI Types (EBS vs Instance Store)
![image](/assets/images/note/9551/4-7-ec2-ami-types.png)
![image](/assets/images/note/9551/4-7-ec2-ebs-vs-instance-store.png)

Create instance store.
![image](/assets/images/note/9551/4-7-ec2-create-instance-store.png)
Check instance store.
![image](/assets/images/note/9551/4-7-ec2-create-instance-store-2.png)
Select the top one, then choose the first available instance type.
![image](/assets/images/note/9551/4-7-ec2-create-instance-store-3.png)
Keep the default settings. In step "Add Storage", notice the volume type is Instance Store.
![image](/assets/images/note/9551/4-7-ec2-create-instance-store-4.png)
Continue with the default settings and reuse the security group created previously and launch.
![image](/assets/images/note/9551/4-7-ec2-create-instance-store-5.png)
Instance store can't be stopped. Terminate it as it is not in the free trial.
![image](/assets/images/note/9551/4-7-ec2-create-instance-store-6.png)
EBS and instance store, exam tips.
![image](/assets/images/note/9551/4-7-ec2-ebs-instance-store-exam-tips.png)
### 4.8 Encrypted Root Device Volumes & Snapshots
Volumes->Select one volume, Actions->Create Snapshot.
![image](/assets/images/note/9551/4-8-ec2-volume-create-snapshot-1.png)
![image](/assets/images/note/9551/4-8-ec2-volume-create-snapshot-2.png)
Switch to Snapshots view and wait until it's finished.
![image](/assets/images/note/9551/4-8-ec2-volume-create-snapshot-3.png)
Copy and choose encrypted.
![image](/assets/images/note/9551/4-8-ec2-volume-create-snapshot-4.png)
The new instance is launched.
![image](/assets/images/note/9551/4-8-ec2-volume-create-snapshot-5.png)
Select it and create image with it.
![image](/assets/images/note/9551/4-8-ec2-volume-create-snapshot-6.png)
Switch to Images view and see the AMI.
![image](/assets/images/note/9551/4-8-ec2-volume-create-snapshot-7.png)
Now, we can use this image to launch new instance, notice it is encrypted by default.
![image](/assets/images/note/9551/4-8-ec2-volume-create-snapshot-8.png)
Exam tips.
![image](/assets/images/note/9551/4-8-ec2-volume-snapshot-exam-tips.png)
![image](/assets/images/note/9551/4-8-ec2-volume-snapshot-exam-tips2.png)
### 4.9 CloudWatch 101
CloudWatch.
![image](/assets/images/note/9551/4-9-ec2-cloudwatch-monitor.png)
![image](/assets/images/note/9551/4-9-ec2-cloudwatch-monitor2.png)
CloudTrail.
![image](/assets/images/note/9551/4-9-ec2-cloudtrail.png)
CloudWatch exam tips.
![image](/assets/images/note/9551/4-9-ec2-cloudwatch-exam-tips.png)
### 4.10 CloudWatch Lab
Create instance with enabling the cloundwatch. Don't do it for experiment as it charges.
![image](/assets/images/note/9551/4-10-ec2-create-instance-with-cloudwatch.png)
Create cloudwatch alarm for CPU usage, Services->Management & Governance -> CloudWatch, Create Alarm.
![image](/assets/images/note/9551/4-10-ec2-cloudwatch-create-alarm-1.png)
Select EC2.
![image](/assets/images/note/9551/4-10-ec2-cloudwatch-create-alarm-2.png)
Per-Instance Metrics.
![image](/assets/images/note/9551/4-10-ec2-cloudwatch-create-alarm-3.png)
Choose 'CPUUtilization' for the target instance.
![image](/assets/images/note/9551/4-10-ec2-cloudwatch-create-alarm-4.png)
Set condition, threshold.
![image](/assets/images/note/9551/4-10-ec2-cloudwatch-create-alarm-5.png)
![image](/assets/images/note/9551/4-10-ec2-cloudwatch-create-alarm-6.png)
Create topic and set email address.
![image](/assets/images/note/9551/4-10-ec2-cloudwatch-create-alarm-7.png)
Ssh to remote ec2 instance and run following command.
```raw
> ssh ec2-user@10.23.123.12 -i johnny-aws-keypair
> sudo su
> while true; do echo; done
```
CPU usage will increase to high level to trigger the alarm and you will receive the alarm email.
![image](/assets/images/note/9551/4-10-ec2-cloudwatch-create-alarm-8.png)
CloudWatch exam tips.
![image](/assets/images/note/9551/4-10-ec2-cloudwatch-exam-tips.png)
### 4.11 The AWS Command Line
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
![image](/assets/images/note/9551/4-11-ec2-command-line-credentials.png)
Exam tips.
![image](/assets/images/note/9551/4-11-ec2-command-line-exam-tips.png)
### 4.12 Using IAM Roles With EC2
Services -> IAM -> Roles -> Create Role, choose EC2.
![image](/assets/images/note/9551/4-12-ec2-iam-role-1.png)
Select AdministratorAccess.
![image](/assets/images/note/9551/4-12-ec2-iam-role-2.png)
Input name.
![image](/assets/images/note/9551/4-12-ec2-iam-role-3.png)
New role created.
![image](/assets/images/note/9551/4-12-ec2-iam-role-4.png)

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
![image](/assets/images/note/9551/4-12-ec2-attach-role-to-instance.png)
Select the role created in previous step and click Apply button.
![image](/assets/images/note/9551/4-12-ec2-attach-role-to-instance-2.png)
Then, we will see the role visible for the instance.
![image](/assets/images/note/9551/4-12-ec2-attach-role-to-instance-3.png)
Click on the role to see the details.
![image](/assets/images/note/9551/4-12-ec2-attach-role-to-instance-4.png)
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

Role exam tips.
![image](/assets/images/note/9551/4-12-ec2-iam-role-exam-tips.png)
* [Easily Replace or Attach an IAM Role to an Existing EC2 Instance by Using the EC2 Console](https://aws.amazon.com/blogs/security/easily-replace-or-attach-an-iam-role-to-an-existing-ec2-instance-by-using-the-ec2-console/)

### 4.13 Using Boot Strap Scripts
Launch instance with bootstrap script. Select the role created in previous lecture for IAM role.
![image](/assets/images/note/9551/4-13-ec2-bootstrap-script-1.png)
And paste the following script to the user data text box. The script will install httpd service and start it, then create an html page. It then, creates an s3 bucket and copy the html file into it.
```raw
#!/bin/bash  
yum update -y  
yum install httpd -y  
service httpd start  
chkconfig httpd on  
cd /var/www/html  
echo 'Hello Johnny, Welcome To My Webpage' > index.html  
aws s3 mb s3://johnny-aws-guru-s3-bootstrap-01  
aws s3 cp index.html s3://johnny-aws-guru-s3-bootstrap-01  
```
After the instance is running successfully, access its public ip address, we should see the web page.
![image](/assets/images/note/9551/4-13-ec2-bootstrap-script-2.png)
And we will find the new s3 bucket.
![image](/assets/images/note/9551/4-13-ec2-bootstrap-script-3.png)
The index.html file is copied to this bucket.
![image](/assets/images/note/9551/4-13-ec2-bootstrap-script-4.png)
### 4.14 EC2 Instance Meta Data
Use the following two commands to get user data and meta data. The IP address `169.254.169.254` is a link-local address and is valid only from the instance.
* curl http://169.254.169.254/latest/user-data/
* curl http://169.254.169.254/latest/meta-data/

```raw
services/[root@ip-172-31-94-19 ec2-user]# curl http://169.254.169.254/latest/user-data/
#!/bin/bash  
yum update -y  
yum install httpd -y  
service httpd start  
chkconfig httpd on  
cd /var/www/html  
echo 'Hello Johnny, Welcome To My Webpage' > index.html  
aws s3 mb s3://johnny-aws-guru-s3-bootstrap-01  
aws s3 cp index.html s3://johnny-aws-guru-s3-bootstrap-01  [root@ip-172-31-94-19 ec2-user]#
[root@ip-172-31-94-19 ec2-user]# curl http://169.254.169.254/latest/meta-data/public-ipv4
3.84.101.140[root@ip-172-31-94-19 ec2-user]#
```
Save to files.
```raw
[root@ip-172-31-94-19 ec2-user]# curl http://169.254.169.254/latest/user-data/ > bootstrap.bash
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   281  100   281    0     0  56200      0 --:--:-- --:--:-- --:--:-- 56200
[root@ip-172-31-94-19 ec2-user]# ls
bootstrap.bash
[root@ip-172-31-94-19 ec2-user]# curl http://169.254.169.254/latest/meta-data/public-ipv4 > public-ip.txt
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100    12  100    12    0     0   2400      0 --:--:-- --:--:-- --:--:--  2400
[root@ip-172-31-94-19 ec2-user]# ls
bootstrap.bash  public-ip.txt
```
Meta data exam tips.
![image](/assets/images/note/9551/4-14-ec2-metadata-exam-tips.png)
* [Instance Metadata and User Data](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-metadata.html)

### 4.15 Elastic File System
![image](/assets/images/note/9551/4-15-ec2-efs.png)
1) Create EFS, Services -> Storage -> EFS, Create File System.
![image](/assets/images/note/9551/4-15-ec2-create-efs-1.png)
Keep default.
![image](/assets/images/note/9551/4-15-ec2-create-efs-2.png)
Just enable the encryption.
![image](/assets/images/note/9551/4-15-ec2-create-efs-3.png)
Keep default.
![image](/assets/images/note/9551/4-15-ec2-create-efs-4.png)
It will take few minutes to finish.
![image](/assets/images/note/9551/4-15-ec2-create-efs-5.png)
![image](/assets/images/note/9551/4-15-ec2-create-efs-6.png)
Wait until efs are created. Services->Storage->EFS, expand the arrow, click on "Amazon EC2 mount instructions (from local VPC)".
![image](/assets/images/note/9551/4-15-ec2-create-efs-7.png)
Copy the tls command , 'sudo mount -t efs -o tls fs-9c5a377e:/ efs'. We will use it in terminal.
![image](/assets/images/note/9551/4-15-ec2-create-efs-8.png)

2) Meanwhile, edit Security Group, select the 'default' group, switch to 'Inbound' tab.
![image](/assets/images/note/9551/4-15-ec2-add-nfs-1.png)
Click Edit, add new rule, choose NFS and select 'WebDMZ' security group, Save.
![image](/assets/images/note/9551/4-15-ec2-add-nfs-2.png)
NFS is in the inbound.
![image](/assets/images/note/9551/4-15-ec2-add-nfs-3.png)

3) Create new instance and add bootstrap script. Specify 2 instances.
![image](/assets/images/note/9551/4-15-ec2-create-instance-1.png)

Put the following script to user data.
```raw
#!/bin/bash
yum update -y
yum install httpd -y
service httpd start
chkconfig httpd on
yum install amazon-efs-utils -y
```
![image](/assets/images/note/9551/4-15-ec2-create-instance-2.png)
Once the two instances are launched, note the public IP addresses.
![image](/assets/images/note/9551/4-15-ec2-create-instance-3.png)
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
EFS Exam tips.
![image](/assets/images/note/9551/4-15-ec2-efs-exam-tips.png)
### 4.16 EC2 Placement Groups
![image](/assets/images/note/9551/4-16-ec2-placement-group.png)
![image](/assets/images/note/9551/4-16-ec2-cluster-placement-group.png)
![image](/assets/images/note/9551/4-16-ec2-spread-placement-group.png)
![image](/assets/images/note/9551/4-16-ec2-partition-placement-group.png)
![image](/assets/images/note/9551/4-16-ec2-placement-group-types.png)
Labs. Create Placement Group: In the EC2 page, find 'Placement Groups' in Network & Security.
![image](/assets/images/note/9551/4-16-ec2-placement-group-lab-1.png)
![image](/assets/images/note/9551/4-16-ec2-placement-group-lab-2.png)
Use Placement Group when launch new instance.
![image](/assets/images/note/9551/4-16-ec2-placement-group-lab-3.png)
Exam tips.
![image](/assets/images/note/9551/4-16-ec2-placement-group-exam-tips.png)
### 4.17 EC2 Summary
![image](/assets/images/note/9551/4-17-ec2-summary-1.png)
![image](/assets/images/note/9551/4-17-ec2-summary-2.png)
![image](/assets/images/note/9551/4-17-ec2-summary-3.png)
![image](/assets/images/note/9551/4-17-ec2-summary-4.png)
![image](/assets/images/note/9551/4-17-ec2-summary-5.png)
![image](/assets/images/note/9551/4-17-ec2-summary-6.png)
![image](/assets/images/note/9551/4-17-ec2-summary-7.png)
![image](/assets/images/note/9551/4-17-ec2-summary-8.png)
![image](/assets/images/note/9551/4-17-ec2-summary-9.png)
![image](/assets/images/note/9551/4-17-ec2-summary-10.png)
![image](/assets/images/note/9551/4-17-ec2-summary-11.png)
![image](/assets/images/note/9551/4-17-ec2-summary-12.png)
![image](/assets/images/note/9551/4-17-ec2-summary-13.png)
![image](/assets/images/note/9551/4-17-ec2-summary-14.png)
![image](/assets/images/note/9551/4-17-ec2-summary-15.png)
![image](/assets/images/note/9551/4-17-ec2-summary-16.png)
![image](/assets/images/note/9551/4-17-ec2-summary-17.png)
![image](/assets/images/note/9551/4-17-ec2-summary-18.png)
![image](/assets/images/note/9551/4-17-ec2-summary-19.png)
![image](/assets/images/note/9551/4-17-ec2-summary-20.png)
![image](/assets/images/note/9551/4-17-ec2-summary-21.png)
![image](/assets/images/note/9551/4-17-ec2-summary-22.png)
![image](/assets/images/note/9551/4-17-ec2-summary-23.png)
![image](/assets/images/note/9551/4-17-ec2-summary-24.png)
### 4.18 EC2 Quiz

## 9. References
* [Amazon EC2](https://aws.amazon.com/ec2/)
* [Amazon EC2 pricing](https://aws.amazon.com/ec2/pricing/)
* [Amazon EC2 Instance Types](https://aws.amazon.com/ec2/instance-types/)
* [Amazon EC2 FAQs](https://aws.amazon.com/ec2/faqs/)
