---
layout: tutorial
key: cloud
title: "AWS-EC2-Bootstrap Scripts"
index: 4126
subcategory: amazon-aws
date: 2019-09-16
tags: [AWS, EC2]
---

> Amazon EC2.

## 1. Bootstrap Scripts
### 1.1 What is Bootstrap Scripts?
You can use a bootstrap action to install additional software or customize the configuration of cluster instances. Bootstrap actions are scripts that run on cluster after Amazon EMR launches the instance using the Amazon Linux Amazon Machine Image (AMI).
### 1.2 Bootstrap Scripts Lab
Launch instance with bootstrap script. Select the role created in previous lecture for IAM role.
![image](/assets/images/cloud/4106/4-13-ec2-bootstrap-script-1.png)
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
![image](/assets/images/cloud/4106/4-13-ec2-bootstrap-script-2.png)
And we will find the new s3 bucket.
![image](/assets/images/cloud/4106/4-13-ec2-bootstrap-script-3.png)
The index.html file is copied to this bucket.
![image](/assets/images/cloud/4106/4-13-ec2-bootstrap-script-4.png)

## 7. EC2 Instance Meta Data
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

## 10. References
* [Amazon EC2](https://aws.amazon.com/ec2/)
* [Amazon EC2 pricing](https://aws.amazon.com/ec2/pricing/)
* [Amazon EC2 Instance Types](https://aws.amazon.com/ec2/instance-types/)
* [Amazon EC2 FAQs](https://aws.amazon.com/ec2/faqs/)
* [Instance Metadata and User Data](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-metadata.html)
* [Easily Replace or Attach an IAM Role to an Existing EC2 Instance by Using the EC2 Console](https://aws.amazon.com/blogs/security/easily-replace-or-attach-an-iam-role-to-an-existing-ec2-instance-by-using-the-ec2-console/)
