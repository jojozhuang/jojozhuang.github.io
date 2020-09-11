---
layout: tutorial
key: cloud
title: "AWS-CloudFormation and Beanstalk"
index: 4113
subcategory: amazon-aws
date: 2019-09-16
tags: [AWS, Load Balancer]
---

> Build high availability applications.

## 7. CloudFormation
Create cloudformation, Services->Management & Governance->CloudFormation, create stack.
![image](/assets/images/cloud/4113//8-10-cloudformation-1.png)
Choose 'Use a sample template' option, and select WordPress blog template.
![image](/assets/images/cloud/4113//8-10-cloudformation-2.png)
Set name and database parameters.
![image](/assets/images/cloud/4113//8-10-cloudformation-3.png)
Add tag, next, review and create.
![image](/assets/images/cloud/4113//8-10-cloudformation-4.png)
It is created.
![image](/assets/images/cloud/4113//8-10-cloudformation-5.png)
Wait for a while, the creation is completed. We see some web servers and security groups are created.
![image](/assets/images/cloud/4113//8-10-cloudformation-6.png)
Switch to the Outputs tab, hit the link.
![image](/assets/images/cloud/4113//8-10-cloudformation-7.png)
We should see the word press configuration page. WordPress site is ready to use.
![image](/assets/images/cloud/4113//8-10-cloudformation-8.png)
Switch to Resources tab. Notice that only web server and security group are created. There is no RDS is created. You can confirm this by going to RDS to see if there is any new instance is launched.
![image](/assets/images/cloud/4113//8-10-cloudformation-9.png)
Only one EC2 instance we can find.
![image](/assets/images/cloud/4113//8-10-cloudformation-10.png)
* Visit https://aws.amazon.com/quickstart/?quick to see available templates.

### 7.2 Summary
* CloudFormation is a way of completely scripting your cloud environment.
* Quick Start is a bunch of CloudFormation templates already built by AWS Solutions Architects allowing you to create complex environments very quickly.

## 8. Elastic Beanstalk
Create Elastic Beanstalk, Services->Compute->Elastic Beanstalk.
![image](/assets/images/cloud/4113//8-11-elastic-beanstalk-1.png)
![image](/assets/images/cloud/4113//8-11-elastic-beanstalk-2.png)
![image](/assets/images/cloud/4113//8-11-elastic-beanstalk-3.png)
![image](/assets/images/cloud/4113//8-11-elastic-beanstalk-4.png)
![image](/assets/images/cloud/4113//8-11-elastic-beanstalk-5.png)
![image](/assets/images/cloud/4113//8-11-elastic-beanstalk-6.png)
Instance is auto generated.
![image](/assets/images/cloud/4113//8-11-elastic-beanstalk-7.png)
Test the web page.
![image](/assets/images/cloud/4113//8-11-elastic-beanstalk-8.png)
### 8.2 Summary
With Elastic Beanstalk, you can quickly deploy and manage applications in the AWS Cloud without worrying about the infrastructure that runs those applications. You simply upload your application, and Elastic Beanstalk automatically handles the details of capacity provisioning, load balancing, scaling, and application health monitoring.

## 9. References
* [AWS High Availability: Compute, SQL and Storage](https://cloud.netapp.com/blog/understanding-aws-high-availability-compute-sql-and-storage)
* [HTTP headers and Classic Load Balancers](https://docs.aws.amazon.com/elasticloadbalancing/latest/classic/x-forwarded-headers.html)
* [Tutorial: Use path-based routing with your Application Load Balancer](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/tutorial-load-balancer-routing.html)
* [The Netflix Simian Army](https://medium.com/netflix-techblog/the-netflix-simian-army-16e57fbab116)
