---
layout: tutorial
key: cloud
title: "AWS-Auto Scaling Groups"
index: 4176
subcategory: amazon-aws
date: 2019-09-16
tags: [AWS, Load Balancer]
---

> Build high availability applications with Auto Scaling Groups.

## 1. High Availability Architecture
Everything fails, you should always plan for failures.
* Always Design for failure.
* Use Multiple AZ's and Multiple Regions where ever you can.
* Know the difference between Multi-AZ and Read Replicas for RDS.
* Know the difference between scaling out and scaling up.

## 2. Auto Scaling Groups
An Auto Scaling group contains a collection of Amazon EC2 instances that are treated as a logical grouping for the purposes of automatic scaling and management. An Auto Scaling group starts by launching enough instances to meet its desired capacity. It maintains this number of instances by performing periodic health checks on the instances in the group. The Auto Scaling group continues to maintain a fixed number of instances even if an instance becomes unhealthy. If an instance becomes unhealthy, the group terminates the unhealthy instance and launches another instance to replace it.
![image](/assets/images/cloud/4176/autoscaling-groups-0.png)

## 3. Lab - Auto Scaling Groups
Create autoscaling group with 3 instances. Test the auto scaling feature by terminating two instances. The auto scaling group should detect this scenario with health check, and new two instances will be launched automatically.
### 3.1 Create Launch Configuration
Go to Services->EC2->Auto Scaling->Launch Configurations, Create launch configuration.
![image](/assets/images/cloud/4176/autoscaling-groups-1.png)
Set name, search 'amzn2-ami-hvm' for AMI and choose 't2.micro' as instance type, which should be free tier.
![image](/assets/images/cloud/4176/autoscaling-groups-2.png)
Copy the following bootstrap scripts which will start a web server to host a static html file.
```raw
#!/bin/bash
yum update -y
yum install httpd -y
service httpd start
chkconfig httpd on
cd /var/www/html
echo "<html><h1>Welcome to the EC2 Fleet!</h1></html>" > index.html
```
Paste them into the user data box.
![image](/assets/images/cloud/4176/autoscaling-groups-4.png)
Leave the storage settings unchanged.
![image](/assets/images/cloud/4176/autoscaling-groups-5.png)
Select WebSG security group and the existing key pair, click "Create launch configuration".
![image](/assets/images/cloud/4176/autoscaling-groups-6.png)
Launch configuration is created.
![image](/assets/images/cloud/4176/autoscaling-groups-7.png)
### 3.2 Create Auto Scaling Group
Go to Services->EC2->Auto Scaling->Auto Scaling Groups, click "Create Auto Scaling Group".
![image](/assets/images/cloud/4176/autoscaling-groups-8-1.png)
Set name and click "Switch to launch template".
![image](/assets/images/cloud/4176/autoscaling-groups-8-2.png)
Select the launch configuration we created in the previous section, next.
![image](/assets/images/cloud/4176/autoscaling-groups-8-3.png)
Set VPC and select all available subnets, next.
![image](/assets/images/cloud/4176/autoscaling-groups-8.png)
Leave without any change, next.
![image](/assets/images/cloud/4176/autoscaling-groups-8-4.png)
Configure the scale group size, Desired Capacity = 3, Minimal Capacity = 2, Maximum Capacity = 6, next.
![image](/assets/images/cloud/4176/autoscaling-groups-9.png)
Skip the notification, next.
![image](/assets/images/cloud/4176/autoscaling-groups-10.png)
Set instance tag, next.
![image](/assets/images/cloud/4176/autoscaling-groups-11.png)
Review and click "Create auto scaling group".
![image](/assets/images/cloud/4176/autoscaling-groups-11-1.png)
The AutoScaling group is created. Three instances are under this group.
![image](/assets/images/cloud/4176/autoscaling-groups-12.png)
Go to EC2 instance, we see all instances are up.
![image](/assets/images/cloud/4176/autoscaling-groups-13.png)
If you visit the public ip of any instance in web browser, we will see the page.
![image](/assets/images/cloud/4176/autoscaling-groups-13-1.png)
Now, select any two instances, terminate them.
![image](/assets/images/cloud/4176/autoscaling-groups-14.png)
In the Activity history of the Auto Scaling group, we can see it detected the termination and launched new instances automatically.
![image](/assets/images/cloud/4176/autoscaling-groups-15.png)
After a while, new instances are launched. The auto scaling group ensures that there are always three instances alive.
![image](/assets/images/cloud/4176/autoscaling-groups-16.png)

## 4. References
* [What is Amazon EC2 Auto Scaling?](https://docs.aws.amazon.com/autoscaling/ec2/userguide/what-is-amazon-ec2-auto-scaling.html)
* [Auto Scaling groups](https://docs.aws.amazon.com/autoscaling/ec2/userguide/AutoScalingGroup.html)
* [Elastic Load Balancing and Amazon EC2 Auto Scaling](https://docs.aws.amazon.com/autoscaling/ec2/userguide/autoscaling-load-balancer.html)
