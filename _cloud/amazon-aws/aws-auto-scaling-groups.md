---
layout: tutorial
key: cloud
title: "AWS-Auto Scaling Groups"
index: 4111
subcategory: amazon-aws
date: 2019-09-16
tags: [AWS, Load Balancer]
---

> Build high availability applications.

## 4. Lab - Auto Scaling Groups
Create autoscaling group with 3 instances. Create 3 instances and terminate two, after a while, new two instances will be launched automatically.

Create Launch Configuration: Services->EC2->Auto Scaling->Launch Configurations, Create launch configuration.
![image](/assets/images/cloud/4111/8-4-autoscaling-groups-1.png)
Select the first AMI.
![image](/assets/images/cloud/4111/8-4-autoscaling-groups-2.png)
Select the free tier one.
![image](/assets/images/cloud/4111/8-4-autoscaling-groups-3.png)
Set name and put the bootstrap script.
```raw
#!/bin/bash
yum update -y
yum install httpd -y
service httpd start
chkconfig httpd on
cd /var/www/html
echo "<html><h1>Welcome to the EC2 Fleet!</h1></html>" > index.html
```
![image](/assets/images/cloud/4111/8-4-autoscaling-groups-4.png)
Leave unchanged for the storage.
![image](/assets/images/cloud/4111/8-4-autoscaling-groups-5.png)
Select the WebDMZ security group, next.
![image](/assets/images/cloud/4111/8-4-autoscaling-groups-6.png)
Click "Create an AutoScaling Group using this launch configuration".
![image](/assets/images/cloud/4111/8-4-autoscaling-groups-7.png)
Set the group size=3.
![image](/assets/images/cloud/4111/8-4-autoscaling-groups-8.png)
Set the scale group size.
![image](/assets/images/cloud/4111/8-4-autoscaling-groups-9.png)
Skip the notification.
![image](/assets/images/cloud/4111/8-4-autoscaling-groups-10.png)
Set instance tag.
![image](/assets/images/cloud/4111/8-4-autoscaling-groups-11.png)
The AutoScaling group is created. Three instances are under this group.
![image](/assets/images/cloud/4111/8-4-autoscaling-groups-12.png)
Go to EC2 instance, we see all instances are up.
![image](/assets/images/cloud/4111/8-4-autoscaling-groups-13.png)
Terminate two of them.
![image](/assets/images/cloud/4111/8-4-autoscaling-groups-14.png)
In the Activity history of the AutoScaling group, we can see it detects the termination and launch new instances automatically.
![image](/assets/images/cloud/4111/8-4-autoscaling-groups-15.png)
After a while, new instances are launched.
![image](/assets/images/cloud/4111/8-4-autoscaling-groups-16.png)
## 5. High Availability Architecture
Everything fails, you should always plan for failures.

### 5.2 Summary
* Always Design for failure.
* Use Multiple AZ's and Multiple Regions where ever you can.
* Know the difference between Multi-AZ and Read Replicas for RDS.
* Know the difference between scaling out and scaling up.

## 9. References
* [Auto Scaling groups](https://docs.aws.amazon.com/autoscaling/ec2/userguide/AutoScalingGroup.html)
* [Elastic Load Balancing and Amazon EC2 Auto Scaling](https://docs.aws.amazon.com/autoscaling/ec2/userguide/autoscaling-load-balancer.html)
