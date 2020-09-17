---
layout: tutorial
key: cloud
title: "AWS-VPC-Bastion Hosts, Direct Connect and End Points"
index: 4165
subcategory: amazon-aws
date: 2019-09-16
tags: [AWS, Bastion Hosts, Direct Connect, End Points]
---

> Bastion Hosts, Direct Connect and End Points.

## 1. Bastion Hosts
### 1.1 What Is A Bastion Host?
A bastion host is a special purpose computer on a network specifically designed and configured to withstand attacks. The computer generally hosts a single application, for example a proxy server, and all other services are removed or limited to reduce the threat to the computer. It is hardened in this manner primarily due to its location and purpose, which is either on the outside of a firewall or in a demilitarized zone (DMZ) and usually involves access from untrusted networks or computers.
![image](/assets/images/cloud/4165/vpc-bastions-1.png)
Remember the following:
* A NAT Gateway or NAT Instance is used to provide Internet traffic to EC2 instances in a private subnets.
* A Bastion is used to securely administer EC2 instances (Using SSH or RDP).
* You cannot use a NAT Gateway as a Bastion host.

## 2. Direct Connect
### 2.1 What Is Direct Connect?  
AWS Direct Connect is a cloud service solution that makes it easy to establish a dedicated network connection from your premises to AWS. Using AWS Direct Connect, you can establish private connectivity between AWS and your datacenter, office, or colocation environment, which in many cases can reduce your network costs, increase bandwidth throughput, and provide a more consistent network experience than Internet-based connections.
![image](/assets/images/cloud/4165/vpc-direct-connect-1.png)
Remember the following:
* Direct Connect directly connects your data center to AWS
* Useful for high throughput workloads (ie lots of network traffic)
* Or if you need a stable and reliable secure connection.

## 3. VPC End Points
### 3.1 What Is A VPC Endpoint?
A VPC endpoint enables you to privately connect your VPC to supported AWS services and VPC endpoint services powered by PrivateLink without requiring an internet gateway, NAT device, VPN connection, or AWS Direct Connect connection. Instances in your VPC do not require public IP addresses to communicate with resources in the service. Traffic between your VPC and the other service does not leave the Amazon network.

Endpoints are virtual devices. They are horizontally scaled, redundant, and highly available VPC components that allow communication between instances in your VPC and services without imposing availability risks or bandwidth constraints on your network traffic.
### 3.2 Types of VPC Endpoints
There are two types of VPC endpoints:
* Interface Endpoints
* Gateway Endpoints

An `interface endpoint` is an elastic network interface with a private IP address that serves as an entry point for traffic destined to a supported service. The following services are supported:
* Amazon API Gateway
* Amazon Kinesis Data Streams
* AWS CloudFormation
* Amazon SageMaker and Amazon SageMaker Runtime
* Amazon CloudWatch
* Amazon SageMaker Notebook Instance
* Amazon CloudWatch Events
* AWS Secrets Manager
* Amazon CloudWatch Logs
* AWS Security Token Service
* AWS CodeBuild
* AWS Service Catalog
* Endpoint services hosted by other AWS accounts
* AWS Config
* Amazon SNS
* Supported AWS Marketplace partner services
* Amazon EC2 API
* Amazon SQS
* Elastic Load Balancing API
* AWS Systems Manager
* AWS Key Management Service

Currently `Gateway Endpoints` Support
* Amazon S3
* DynamoDB

Current solution: Use NAT gateway to let private subnet to access public internet.
![image](/assets/images/cloud/4165/vpc-endpoints-5.png)
Use VPC endpoint to achieve the same purpose.
![image](/assets/images/cloud/4165/vpc-endpoints-6.png)

## 4. Lab - Endpoint
### 4.1 Creating Endpoint
Go to Service->VPC->Endpoints, Create Endpoint, select s3 and gateway.
![image](/assets/images/cloud/4165/vpc-endpoints-7.png)
Select the custom VPC, and choose the main subnet, 10.0.2.0.
![image](/assets/images/cloud/4165/vpc-endpoints-8.png)
Now, the end point is created.
![image](/assets/images/cloud/4165/vpc-endpoints-9.png)
Go to the Route Tables, select the main route table, wait for few minutes, the endpoint will show up in the routes. With this endpoint, the private subnet can connect to outside world.
![image](/assets/images/cloud/4165/vpc-endpoints-10.png)

## 5. References
* [Linux Bastion Hosts on AWS](https://aws.amazon.com/quickstart/architecture/linux-bastion/)
* [AWS Direct Connect](https://aws.amazon.com/directconnect/)
* [VPC endpoints](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-endpoints.html)
