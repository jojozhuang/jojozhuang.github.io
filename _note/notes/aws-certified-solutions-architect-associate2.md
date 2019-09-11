---
layout: tutorial
key: note
title: "AWS - Certified Solutions Architect Associate 2 - draft"
index: 9161
subcategory: notes
date: 2017-08-04
tags: [AWS]
draft: true
---

> AWS Certified Solutions Architect Associate 2019

## 6. Route53
### 6.1 DNS 101
![image](/public/images/note/9160/6-1-dns-1.png)
IPV4, IPV6
![image](/public/images/note/9160/6-1-dns-2.png)
Top level Domain.
![image](/public/images/note/9160/6-1-dns-3.png)
IANA.
![image](/public/images/note/9160/6-1-dns-4.png)
Domain registrars.
![image](/public/images/note/9160/6-1-dns-5.png)
SOA.
![image](/public/images/note/9160/6-1-dns-6.png)
NS Records.
![image](/public/images/note/9160/6-1-dns-7.png)
A records.
![image](/public/images/note/9160/6-1-dns-8.png)
TTL.
![image](/public/images/note/9160/6-1-dns-9.png)
CName.
![image](/public/images/note/9160/6-1-dns-10.png)
Alias Records.
![image](/public/images/note/9160/6-1-dns-11.png)
![image](/public/images/note/9160/6-1-dns-12.png)
Exam tips.
![image](/public/images/note/9160/6-1-dns-exam-tips-1.png)
![image](/public/images/note/9160/6-1-dns-exam-tips-2.png)
### 6.2 Route53 - Register A Domain Name Lab
Services -> Networking & Content Delivery -> Route 53, Registered domains
![image](/public/images/note/9160/6-2-domain-name-1.png)
![image](/public/images/note/9160/6-2-domain-name-2.png)
TODO, create three ec2 instance with different index.html.
Exam tips.
![image](/public/images/note/9160/6-2-domain-name-exam-tips.png)
### 6.3 Route53 Routing Policies Available On AWS
![image](/public/images/note/9160/6-3-routing-policies.png)
### 6.4 Simple Routing Policy Lab
1 to N.
![image](/public/images/note/9160/6-4-simple-routing-policy-1.png)
TODO, create record set for the domain name with three different ip addresses from 3 ec2 instances.
### 6.5 Weighted Routing Policy Lab
![image](/public/images/note/9160/6-5-weighted-routing-policy-1.png)
![image](/public/images/note/9160/6-5-weighted-routing-policy-2.png)
![image](/public/images/note/9160/6-5-weighted-routing-policy-3.png)
TODO, create weighted routing.
### 6.6 Latency Routing Policy
![image](/public/images/note/9160/6-6-latency-routing-policy-1.png)
![image](/public/images/note/9160/6-6-latency-routing-policy-2.png)
TODO.
### 6.7 Failover Routing Policy
![image](/public/images/note/9160/6-7-failover-routing-policy-1.png)
![image](/public/images/note/9160/6-7-failover-routing-policy-2.png)
TODO.
### 6.8 Geolocation Routing Policy
![image](/public/images/note/9160/6-8-geolocation-routing-policy-1.png)
![image](/public/images/note/9160/6-8-geolocation-routing-policy-2.png)
![image](/public/images/note/9160/6-8-geolocation-routing-policy-3.png)
TODO.
### 6.9 Geoproximity Routing Policy (Traffic Flow Only)
![image](/public/images/note/9160/6-9-geoproximity-routing-policy-1.png)
### 6.10 Multivalue Answer
![image](/public/images/note/9160/6-10-multivalue-answer-policy-1.png)
![image](/public/images/note/9160/6-10-multivalue-answer-policy-2.png)
### 6.11 Route53 Summary
![image](/public/images/note/9160/6-11-dns-summary-1.png)
![image](/public/images/note/9160/6-11-dns-summary-2.png)
![image](/public/images/note/9160/6-11-dns-summary-3.png)
![image](/public/images/note/9160/6-11-dns-summary-4.png)
![image](/public/images/note/9160/6-11-dns-summary-5.png)
![image](/public/images/note/9160/6-11-dns-summary-6.png)
![image](/public/images/note/9160/6-11-dns-summary-7.png)
![image](/public/images/note/9160/6-11-dns-summary-8.png)
![image](/public/images/note/9160/6-11-dns-summary-9.png)
![image](/public/images/note/9160/6-11-dns-summary-10.png)
![image](/public/images/note/9160/6-11-dns-summary-11.png)
### 6.12 Route 53 Quiz
![image](/public/images/note/9160/6-12-route53-quiz-1.png)
![image](/public/images/note/9160/6-12-route53-quiz-2.png)
![image](/public/images/note/9160/6-12-route53-quiz-3.png)
![image](/public/images/note/9160/6-12-route53-quiz-4.png)
![image](/public/images/note/9160/6-12-route53-quiz-5.png)
![image](/public/images/note/9160/6-12-route53-quiz-6.png)
![image](/public/images/note/9160/6-12-route53-quiz-7.png)
![image](/public/images/note/9160/6-12-route53-quiz-8.png)
![image](/public/images/note/9160/6-12-route53-quiz-9.png)
## 7. VPCs
### 7.1 Introduction To VPCs
![image](/public/images/note/9160/7-1-vpc-1.png)
![image](/public/images/note/9160/7-1-vpc-2.png)
![image](/public/images/note/9160/7-1-vpc-3.png)
![image](/public/images/note/9160/7-1-vpc-4.png)
![image](/public/images/note/9160/7-1-vpc-5.png)
![image](/public/images/note/9160/7-1-vpc-6.png)
Default VPC vs. Custom VPC.
![image](/public/images/note/9160/7-1-vpc-7.png)
VPC peering.
![image](/public/images/note/9160/7-1-vpc-8.png)
Can't access from B to C through A. Must create VPC peering from B to C directly.
![image](/public/images/note/9160/7-1-vpc-9.png)
Exam tips.
![image](/public/images/note/9160/7-1-vpc-exam-tips.png)
### 7.2 Build A Custom VPC - Part 1
VPC contains Route Table, Network ACL and Security Group.
![image](/public/images/note/9160/7-2-create-vpc-1.png)
Create VPC: Services->Networking & Content Delivery->VPC, select "Your VPCs" at the left panel.
![image](/public/images/note/9160/7-2-create-vpc-2.png)
![image](/public/images/note/9160/7-2-create-vpc-3.png)
New VPC is created.
![image](/public/images/note/9160/7-2-create-vpc-4.png)
One more entry in Route Tables.
![image](/public/images/note/9160/7-2-create-vpc-5.png)
One more entry in Network ACLs.
![image](/public/images/note/9160/7-2-create-vpc-6.png)
One more entry in Security Group, the second one.
![image](/public/images/note/9160/7-2-create-vpc-7.png)
Create Subnet.
![image](/public/images/note/9160/7-2-create-subnet-1.png)
![image](/public/images/note/9160/7-2-create-subnet-2.png)
Two subnets are created.
![image](/public/images/note/9160/7-2-create-subnet-3.png)
You see the "Available IPv4" is 251(total should be 256, CIDR.xyz), 5 ip addresses are reserved, see [VPCs and Subnets](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Subnets.html).
* 10.0.0.0: Network address.
* 10.0.0.1: Reserved by AWS for the VPC router.
* 10.0.0.2: Reserved by AWS. The IP address of the DNS server is always the base of the VPC network range plus two; however, we also reserve the base of each subnet range plus two. For VPCs with multiple CIDR blocks, the IP address of the DNS server is located in the primary CIDR. For more information, see Amazon DNS Server.
* 10.0.0.3: Reserved by AWS for future use.
* 10.0.0.255: Network broadcast address. We do not support broadcast in a VPC, therefore we reserve this address.

Select the first line, click Actions->Modify auto-assign IP settings.
![image](/public/images/note/9160/7-2-create-subnet-4.png)
![image](/public/images/note/9160/7-2-create-subnet-5.png)
Now, auto public ip address is enabled to this subnet.
![image](/public/images/note/9160/7-2-create-subnet-6.png)
Now, our VPC looks like this.
![image](/public/images/note/9160/7-2-create-subnet-7.png)
Create gateway: Select Internet Gateways->Create internet gateway.
![image](/public/images/note/9160/7-2-create-gateway-1.png)
It is created and its state is detached.
![image](/public/images/note/9160/7-2-create-gateway-2.png)
Select the gateway, Actions->Attach to VPC.
![image](/public/images/note/9160/7-2-create-gateway-3.png)
Choose the VPC.
![image](/public/images/note/9160/7-2-create-gateway-4.png)
Now, it is attached.
![image](/public/images/note/9160/7-2-create-gateway-5.png)
* Notice, you can attach only one gateway to VPC.

Check the status of the current route table for new VPC. It has route for internal only.
![image](/public/images/note/9160/7-2-create-route-tables-1.png)
And it has two subnets associated.
![image](/public/images/note/9160/7-2-create-route-tables-2.png)
Create new route table for public access.
![image](/public/images/note/9160/7-2-create-route-tables-3.png)
The new route table is created, notice it is not main.
![image](/public/images/note/9160/7-2-create-route-tables-4.png)
Click "Edit routes" button. Add two routes "0.0.0.0/0" for ipv4 and "::/0" for ipv6. Select the gateway created above as target.
![image](/public/images/note/9160/7-2-create-route-tables-5.png)
Now we have two more routes.
![image](/public/images/note/9160/7-2-create-route-tables-6.png)
Switch to Subnet Associations tab, click "Edit subnet associations" button.
![image](/public/images/note/9160/7-2-create-route-tables-7.png)
Select the first one and save.
![image](/public/images/note/9160/7-2-create-route-tables-8.png)
Now, the first subnet is associated with the public route table.
![image](/public/images/note/9160/7-2-create-route-tables-9.png)
If we check the subnet associations of the main route tables, the first subnet is not there anymore. Now we have the private subnet and public subnet as well.
![image](/public/images/note/9160/7-2-create-route-tables-10.png)
Create instance for web server, select the second AMI.
![image](/public/images/note/9160/7-2-create-instance-1.png)
Select the VPC created previously and select the first subnet. Notice the public ip is auto enabled.
![image](/public/images/note/9160/7-2-create-instance-2.png)
Add tags to indicate this is a web server.
![image](/public/images/note/9160/7-2-create-instance-3.png)
There is no existing security groups here, as now we are using the new VPC.
![image](/public/images/note/9160/7-2-create-instance-4.png)
Create new security group.
![image](/public/images/note/9160/7-2-create-instance-5.png)
Create second instance for database. Select the VPC and choose the second subnet.  Notice the public ip is auto disabled.
![image](/public/images/note/9160/7-2-create-instance-6.png)
Add tags to indicate this is a database server.
![image](/public/images/note/9160/7-2-create-instance-7.png)
Use the default security group.
![image](/public/images/note/9160/7-2-create-instance-8.png)
Now we have two instances, one for web server, one for db server. Notice the webserver has public ip address.
![image](/public/images/note/9160/7-2-create-instance-9.png)
Until now, we have created the VPC from scratch and it looks as follows.
![image](/public/images/note/9160/7-2-create-instance-10.png)
Exam tips.
![image](/public/images/note/9160/7-2-create-vpc-exam-tips.png)
### 7.3 Build A Custom VPC - Part 2
### 7.4 Network Address Translation (NAT)
### 7.5 Access Control Lists (ACL)
### 7.6 Custom VPCs and ELBs
### 7.7 VPC Flow Logs
### 7.8 Bastions
### 7.9 Direct Connect
### 7.10 VPC End Points
### 7.11 Summary
### 7.12 VPCs Quiz

## 8. HA Architecture
### 8.1 Load Balancers Theory
### 8.2 Load Balancers And Health Checks Lab
### 8.3 Advanced Load Balancer Theory
### 8.4 Autoscaling Groups Lab
### 8.5 HA Architecture
### 8.6 HA Word Press Site
### 8.7 Setting Up EC2
### 8.8 Adding Resilience And Autoscaling
### 8.9 Cleaning Up
### 8.10 CloudFormation
### 8.11 Elastic Beanstalk
### 8.12 HA Summary
### 8.13 HA Architecture Quiz

## 9. Applications
### 9.1 SQS
### 9.2 SWF
### 9.3 SNS
### 9.4 Elastic Transcoder
### 9.5 API Gateway
### 9.6 Kinesis
### 9.7 Web Identity Federation & Cognito
### 9.8 Summary
### 9.9 Applications Quiz

## 10. Serverless
### 10.1 Lambda Concepts
### 10.2 Let's Build A Serverless Webpage
### 10.3 Let's Build An Alexa Skill
### 10.4 Summary
### 10.5 Serverless Quiz
### 10.6 CHAPTER 11

## 11. Good Luck!
### 11.1 Good Luck & How To Book Your Exam
### 11.2 Thank You and Next Steps
### 11.3 Practice Test 1
### 11.4 Practice Test 2

## 12. Reference
* [AWS Certified Solutions Architect Associate 2019](https://acloud.guru/learn/aws-certified-solutions-architect-associate)
