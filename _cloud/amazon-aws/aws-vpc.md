---
layout: tutorial
key: cloud
title: "AWS-VPC"
index: 4109
subcategory: amazon-aws
date: 2019-09-16
tags: [AWS, VPC]
---

> Using VPC to setup cloud network.

## 1. VPCs
### 1.1 What Is A VPC?
You can easily customize the network configuration for your Amazon Virtual Private Cloud(VPC). For example, you can create a public-facing subnet for your webservers that has access to the Internet, and place your backend systems such as databases or application servers in a private-facing subnet with no Internet access. You can leverage multiple layers of security, including security groups and network access control lists, to help control access to Amazon EC2 instances in each subnet.
![image](/assets/images/cloud/4109/vpc-high-level.png)

Additionally, you can create a Hardware Virtual Private Network (VPN) connection between your corporate datacenter and your VPC and leverage the AWS cloud as an extension of your corporate datacenter.
![image](/assets/images/cloud/4109/vpc-vpn.png)

![image](/assets/images/cloud/4109/7-1-vpc-5.png)

### 1.2 VPC Features
What can we do with a VPC?
* Launch instances into a subnet of your choosing
* Assign custom IP address ranges in each subnet
* Configure route tables between subnets
* Create Internet gateway and attach it to your VPC
* Much better security control over your AWS resources
* Instance security groups
* Subnet network access control lists (ACES)

Default VPC vs Custom VPC:
* Default VPC is user friendly, allowing you to immediately deploy instances.
* All Subnets in default VPC have a route out to the internet.
* Each EC2 instance has both a public and private IP address.

### 1.3 VPC Peering
* Allows you to connect one VPC with another via a direct network route using private IP addresses.
* Instances behave as if they were on the same private network
* You can peer VPC's with other AWS accounts as well as with other VPCs in the same account.
* Peering is in a star configuration: ie 1 central VPC peers with 4 others. `NO TRANSITIVE PEERING!!!`
* You can peer between regions.

Can't access from B to C through A. Must create VPC peering from B to C directly.
![image](/assets/images/cloud/4109/vpc-peering.jpg)

### 1.4 Summary of VPC
* Think of a VPC as a logical datacenter in AWS.
* Consists of IGWs (Or Virtual Private Gateways), Route Tables, Network Access Control Lists, Subnets, and Security Groups
* 1 Subnet = 1 Availability Zone
* Security Groups are Stateful; Network Access Control Lists are Stateless
* NO TRANSITIVE PEERING

Remember the following:
* When you create a VPC, a default Route Table, Network Access Control List (NACL) and a default Security Group are actually created.
* It won't create any subnets, nor will it create a default internet gateway.
* US-East-1A in your AWS account can be a completely different availability zone to US-East-1A in another AWS account. The AZ's are randomized.
* Amazon always reserve 5 IP addresses within your subnets.
* You can only have 1 Internet Gateway per VPC.
* Security Groups can't span VPCs.

## 2. VPC Lab - Build A Custom VPC
### 2.1 Create Custom VPC
VPC contains Route Table, Network ACL and Security Group.
![image](/assets/images/cloud/4109/7-2-create-vpc-1.png)
Go to Services->Networking & Content Delivery->VPC, select "Your VPCs" at the left panel, click "Create VPC" button.
![image](/assets/images/cloud/4109/7-2-create-vpc-2.png)
Provide name and ip address, then Create.
![image](/assets/images/cloud/4109/7-2-create-vpc-3.png)
New VPC is created.
![image](/assets/images/cloud/4109/7-2-create-vpc-4.png)
There is one more entry in Route Tables.
![image](/assets/images/cloud/4109/7-2-create-vpc-5.png)
And one more entry in Network ACLs.
![image](/assets/images/cloud/4109/7-2-create-vpc-6.png)
And one more entry in Security Group(the second one).
![image](/assets/images/cloud/4109/7-2-create-vpc-7.png)
Create Subnet, 10.0.1.0.
![image](/assets/images/cloud/4109/7-2-create-subnet-1.png)
Create another Subnet, 10.0.2.0.
![image](/assets/images/cloud/4109/7-2-create-subnet-2.png)
Two subnets are created.
![image](/assets/images/cloud/4109/7-2-create-subnet-3.png)
You see the "Available IPv4" is 251(total should be 256, CIDR.xyz), 5 ip addresses are reserved, see [VPCs and Subnets](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Subnets.html).
* 10.0.0.0: Network address.
* 10.0.0.1: Reserved by AWS for the VPC router.
* 10.0.0.2: Reserved by AWS. The IP address of the DNS server is always the base of the VPC network range plus two; however, we also reserve the base of each subnet range plus two. For VPCs with multiple CIDR blocks, the IP address of the DNS server is located in the primary CIDR. For more information, see Amazon DNS Server.
* 10.0.0.3: Reserved by AWS for future use.
* 10.0.0.255: Network broadcast address. We do not support broadcast in a VPC, therefore we reserve this address.

Select the first subnet, click Actions->Modify auto-assign IP settings.
![image](/assets/images/cloud/4109/7-2-create-subnet-4.png)
Enable the option "Enable auto-assign public IPv4 address", Save.
![image](/assets/images/cloud/4109/7-2-create-subnet-5.png)
Now, auto public ip address is enabled to the subnet 10.0.1.0.
![image](/assets/images/cloud/4109/7-2-create-subnet-6.png)
Now, our VPC looks like this.
![image](/assets/images/cloud/4109/7-2-create-subnet-7.png)

### 2.2 Create Internet Gateway
Go to Services->Networking & Content Delivery->VPC, select "Internet Gateways" at the left panel, click "Create internet gateway" button.
![image](/assets/images/cloud/4109/7-2-create-gateway-0.png)
Provide the name, Create.
![image](/assets/images/cloud/4109/7-2-create-gateway-1.png)
It is created and its state is detached.
![image](/assets/images/cloud/4109/7-2-create-gateway-2.png)
Select the new gateway, Actions->Attach to VPC.
![image](/assets/images/cloud/4109/7-2-create-gateway-3.png)
Choose the VPC we just created before.
![image](/assets/images/cloud/4109/7-2-create-gateway-4.png)
Now, it is attached.
![image](/assets/images/cloud/4109/7-2-create-gateway-5.png)
* Notice, you can attach only one internet gateway to VPC.

Check the status of the current route table for new VPC. It has route for internal only.
![image](/assets/images/cloud/4109/7-2-create-route-tables-1.png)
There are two subnets, but none of them is associated to this route table.
![image](/assets/images/cloud/4109/7-2-create-route-tables-2.png)
In the next steps, we will create a new route table for public access.
### 2.3 Create Route Table
Go to Services->Networking & Content Delivery->VPC, select "Route Tables" at the left panel, click "Create route table" button. Provide the name and select the new VPC.
![image](/assets/images/cloud/4109/7-2-create-route-tables-3.png)
The new route table is created, notice it is not main.
![image](/assets/images/cloud/4109/7-2-create-route-tables-4.png)
Click "Edit routes" button. Add two routes "0.0.0.0/0" for ipv4 and "::/0" for ipv6. Select the internet gateway created above as target.
![image](/assets/images/cloud/4109/7-2-create-route-tables-5.png)
Now we have two more routes.
![image](/assets/images/cloud/4109/7-2-create-route-tables-6.png)
Switch to Subnet Associations tab, click "Edit subnet associations" button.
![image](/assets/images/cloud/4109/7-2-create-route-tables-7.png)
Select the first subnet(10.0.1.0) and save.
![image](/assets/images/cloud/4109/7-2-create-route-tables-8.png)
Now, the first subnet is associated with the public route table.
![image](/assets/images/cloud/4109/7-2-create-route-tables-9.png)
If we check the subnet associations of the main route tables, the first subnet is not there anymore. Now we have the private subnet and the public subnet.
![image](/assets/images/cloud/4109/7-2-create-route-tables-10.png)
### 2.4 Create EC2 Instance
Create a new EC2 instance for acting as web server, select the second AMI.
![image](/assets/images/cloud/4109/7-2-create-instance-1.png)
Select the custom VPC created previously and choose the first subnet(10.0.1.0). Notice the public ip is auto enabled.
![image](/assets/images/cloud/4109/7-2-create-instance-2.png)
Add tags to indicate this is a web server.
![image](/assets/images/cloud/4109/7-2-create-instance-3.png)
There is no existing security groups here(Not seeing the WebDMZ), since we are using the new VPC now.
![image](/assets/images/cloud/4109/7-2-create-instance-4.png)
Create new security group.
![image](/assets/images/cloud/4109/7-2-create-instance-5.png)
Create second instance for database. Select the VPC and choose the second subnet(10.0.2.0).  Notice the public ip is auto disabled.
![image](/assets/images/cloud/4109/7-2-create-instance-6.png)
Add tags to indicate this is a database server.
![image](/assets/images/cloud/4109/7-2-create-instance-7.png)
Use the default security group.
![image](/assets/images/cloud/4109/7-2-create-instance-8.png)
Now we have two instances, one for web server, one for db server. Notice the webserver has public ip address.
![image](/assets/images/cloud/4109/7-2-create-instance-9.png)
Until now, we have created the VPC from scratch and it looks as follows.
![image](/assets/images/cloud/4109/7-2-create-instance-10.png)
We have two instances, one is web server and another is DB server. Currently, the web server can't connect to db server. We will create security group to enable the connection from web server to db server.
### 2.5 Create Security Group
Go to Services->EC2->Network & Security->Security Groups, click "Create security group". Provide name and description, select the custom VPC. Setup the rules as follows, Create.
![image](/assets/images/cloud/4109/7-3-create-security-group.png)
A new security group is created.
![image](/assets/images/cloud/4109/7-3-create-security-group-2.png)
Change the security group for DB server. Go to EC2 instances, select the database instance, Actions->Networking->Change Security Group.
![image](/assets/images/cloud/4109/7-3-create-security-group-3.png)
Only select the new security group for database.
![image](/assets/images/cloud/4109/7-3-create-security-group-4.png)
Remote ssh to web server and ping the database server from it. '54.175.89.128' is the public ip of web server and '10.0.2.140' is the private ip of database server. If you upload the keypair to web server, you can also ssh to database server from webserver.
```raw
$ ssh ec2-user@54.175.89.128 -i johnny-aws-ec2-keypair.pem
The authenticity of host '54.175.89.128 (54.175.89.128)' can't be established.
ECDSA key fingerprint is SHA256:+IhFl1sALdOm4yIQbmA0OIyrG8jpfkufQfmmAlbnDNA.
Are you sure you want to continue connecting (yes/no)? yes
Warning: Permanently added '54.175.89.128' (ECDSA) to the list of known hosts.

       __|  __|_  )
       _|  (     /   Amazon Linux AMI
      ___|\___|___|

https://aws.amazon.com/amazon-linux-ami/2018.03-release-notes/
[ec2-user@ip-10-0-1-251 ~]$ ping 10.0.2.140
PING 10.0.2.140 (10.0.2.140) 56(84) bytes of data.
64 bytes from 10.0.2.140: icmp_seq=1 ttl=255 time=0.750 ms
64 bytes from 10.0.2.140: icmp_seq=2 ttl=255 time=0.881 ms
64 bytes from 10.0.2.140: icmp_seq=3 ttl=255 time=0.946 ms
64 bytes from 10.0.2.140: icmp_seq=4 ttl=255 time=0.807 ms
```
## 3. Network Address Translation (NAT)
### 3.1 What is NAT?
Network address translation (NAT) is a method of remapping an IP address space into another by modifying network address information in the IP header of packets while they are in transit across a traffic routing device. Network Address Translation allows a single device, such as a router, to act as an agent between the Internet (or "public network") and a local (or "private") network.

AWS offers two kinds of NAT devices—a NAT gateway or a NAT instance.

NAT Instances:
* When creating a NAT instance, disable Source/Destination Check on the Instance.
* NAT instances must be in a public subnet.
* There must be a route out of the private subnet to the NAT instance, in order for this to work.
* The amount of traffic that NAT instances can support depends on the instance size. If you are bottlenecking, increase the instance size.
* You can create high availability using Autoscaling Groups, multiple subnets in different AZs, and a script to automate failover.
* Behind a Security Group.

NAT Gateways:
* Redundant inside the Availability Zone
* Preferred by the enterprise
* Starts at 5Gbps and scales currently to 45Gbps
* No need to patch
* Not associated with security groups
* Automatically assigned a public ip address
* Remember to update your route tables.
* No need to disable Source/Destination Checks
* If you have resources in multiple Availability Zones and they share one NAT gateway, in the event that the NAT gateway's Availability Zone is down, resources in the other Availability Zones lose internet access. To create an Availability Zone-independent architecture, create a NAT gateway in each Availability Zone and configure your routing to ensure that resources use the NAT gateway in the same Availability Zone.

### 3.2 VPC Lab
Continue with the VPC lab. Currently, there is one problem with the database server, it has no public connection to internet. We will create NAT instance and NAT Gateway to setup the connection for database server.

![image](/assets/images/cloud/4109/7-4-nat-gateway-1.png)
### 3.3 Lab - NAT Instance
1) Create NAT Instance  
Launch new instance, search 'nat' in the 'Community AMIs', select the first one.
![image](/assets/images/cloud/4109/7-4-nat-gateway-2.png)
Select the custom VPC and choose the public subnet(10.0.1.0).
![image](/assets/images/cloud/4109/7-4-nat-gateway-3.png)
Add name to indicate it is a NAT instance.
![image](/assets/images/cloud/4109/7-4-nat-gateway-4.png)
Select the WebDMZ group, Review and Launch.
![image](/assets/images/cloud/4109/7-4-nat-gateway-5.png)
Choose the second option and continue.
![image](/assets/images/cloud/4109/7-4-nat-gateway-6.png)
The NAT instance is created, it's running in the same AZ with the web server. It has its own public ip address.
![image](/assets/images/cloud/4109/7-4-nat-gateway-7.png)
2) Disabling Source/Destination Checks  
Select the NAT instance, actions->Networking->Change Source/Dest. Check.
![image](/assets/images/cloud/4109/7-4-nat-gateway-8.png)
Disable it.
![image](/assets/images/cloud/4109/7-4-nat-gateway-9.png)
* Check [NAT Instances](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_NAT_Instance.html) for more details.

3) Create route to let database server talk to NAT instance  
Services -> VPC->Route Tables, select the main route table of the custom VPC, click "Edit rules".
![image](/assets/images/cloud/4109/7-4-nat-gateway-10.png)
Select the NAT instance as target.
![image](/assets/images/cloud/4109/7-4-nat-gateway-11.png)
Done.
![image](/assets/images/cloud/4109/7-4-nat-gateway-12.png)
Now, if you ssh to your webserver, then ssh to your database server, you can run "yum install update", and it will be able to download files from internet.

NAT instance is not good as it may be overloaded. If it is stopped, then database server will lose the internet connection and you will see the route status becomes to "blackhole".
![image](/assets/images/cloud/4109/7-4-nat-gateway-13.png)
Create NAT gateway which is more reliable and flexible.
### 3.4 Lab - NAT Gateway
Go to VPC->NAT Gateways->Create NAT Gateway.
![image](/assets/images/cloud/4109/7-4-nat-gateway-14.png)
Select the public subnet(10.0.1.0), click "Create New EIP".
![image](/assets/images/cloud/4109/7-4-nat-gateway-15.png)
Edit route tables.
![image](/assets/images/cloud/4109/7-4-nat-gateway-16.png)
Select the main route table, click "Edit routes".
![image](/assets/images/cloud/4109/7-4-nat-gateway-17.png)
Select the NAT gateway as target.
![image](/assets/images/cloud/4109/7-4-nat-gateway-18.png)
Done.
![image](/assets/images/cloud/4109/7-4-nat-gateway-19.png)
Switch to "NAT Gateways", the new gateway is there.
![image](/assets/images/cloud/4109/7-4-nat-gateway-20.png)
Now, the database server has the internet connection again.

## 4. Access Control Lists (ACL)
### 4.1 ACL
* Your VPC automatically comes a default network ACL, and by default it allows all outbound and inbound traffic.
* You can create custom network ACLs. By default, each custom network ACL denies all inbound and outbound traffic until you add rules.
* Each subnet in your VPC must be associated with a network ACL. If you don't explicitly associate a subnet with a network ACL, the subnet is automatically associated with the default network ACL.
* Block IP Addresses using network ACLs not Security Groups
* You can associate a network ACL with multiple subnets; however, a subnet can be associated with only one network ACL at a time. When you associate a network ACL with a subnet, the previous association is removed.
* Network ACLs contain a numbered list of rules that is evaluated in order, starting with the lowest numbered rule.
* Network ACLs have separate inbound and outbound rules, and each rule can either allow or deny traffic.
* Network ACLs are stateless; responses to allowed inbound traffic are subject to the rules for outbound traffic (and vice versa.)

We have two ACLs. One is default ACL, another is custom ACL for the custom VPC.
![image](/assets/images/cloud/4109/7-5-acl-1.png)
Create new ACL, select the custom VPC.
![image](/assets/images/cloud/4109/7-5-acl-2.png)
By default all inbound and outbound requests are denied.
![image](/assets/images/cloud/4109/7-5-acl-3.png)
Test the port 80. SSh to web server, run commands to create a web page and start web server.
```raw
[root@ip-10-0-1-251 ec2-user]# yum install httpd -y
[root@ip-10-0-1-251 ec2-user]# chkconfig httpd on
[root@ip-10-0-1-251 ec2-user]# service httpd start
Starting httpd:
[root@ip-10-0-1-251 ec2-user]# cd /var/www/html/
[root@ip-10-0-1-251 html]# ls
[root@ip-10-0-1-251 html]# echo '<html><h1>hello, johnny</h1></html>' > index.html
[root@ip-10-0-1-251 html]# ls
index.html
```
Access the public ip address, we should see the page.
![image](/assets/images/cloud/4109/7-5-acl-4.png)
It's currently working, because the default ACL has inbound rules for all public sources.
![image](/assets/images/cloud/4109/7-5-acl-5.png)
Associate the new ACL to current subnet. Select the new ACL and click "Edit subnet associations".
![image](/assets/images/cloud/4109/7-5-acl-6.png)
Choose the subnet which is for web server.
![image](/assets/images/cloud/4109/7-5-acl-7.png)
Notice, the old ACL doesn't associate the same subnet anymore.
![image](/assets/images/cloud/4109/7-5-acl-8.png)
Refresh the page, it will be timeout.
![image](/assets/images/cloud/4109/7-5-acl-9.png)
Add some rules(80,443,22) to inbound of the new ACL.
![image](/assets/images/cloud/4109/7-5-acl-10.png)
Similarly, add rules for outbound of the new ACL. Check [Ephemeral Ports](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-network-acls.html#nacl-ephemeral-ports) to understand why we set the range 1024-65535.
![image](/assets/images/cloud/4109/7-5-acl-11.png)
Refresh the page, we get the page back.
![image](/assets/images/cloud/4109/7-5-acl-12.png)
### 4.2 Custom VPCs and ELBs
ELB requires at least two subnets with gateway configured for all. Go to Services->EC2->Load Balancing->Load Balancers->Create Load Balancer.
![image](/assets/images/cloud/4109/7-6-load-balancer-1.png)
Choose the load balancer type.
![image](/assets/images/cloud/4109/7-6-load-balancer-2.png)
Provide name.
![image](/assets/images/cloud/4109/7-6-load-balancer-3.png)

## 5. VPC Flow Logs
### 5.1 What is VPC Flog Logs
VPC Flow Logs is a feature that enables you to capture information about the IP traffic going to and from network interfaces in your VPC. Flow log data is stored using Amazon CloudWatch Logs. After you've created a flow log, you can view and retrieve its data in Amazon CloudWatch Logs.

Flow logs can be created at 3 levels:
* VPC
* Subnet
* Network Interface Level

### 5.2 Create Log Group in CloudWatch
Go to Services->Management & Governance->CloudWatch->Logs->Create log group.
![image](/assets/images/cloud/4109/7-7-vpc-flow-3.png)
Go to VPC console, select the custom VPC, actions->Create flow log.
![image](/assets/images/cloud/4109/7-7-vpc-flow-4.png)
Click the link "Set Up Permissions".
![image](/assets/images/cloud/4109/7-7-vpc-flow-5.png)
Allow.
![image](/assets/images/cloud/4109/7-7-vpc-flow-6.png)
Go back to create the flow log.
![image](/assets/images/cloud/4109/7-7-vpc-flow-7.png)
Now the flow log is enabled. Refresh the web page.
![image](/assets/images/cloud/4109/7-7-vpc-flow-8.png)
Then go to CloudWatch, select Logs and click the log group.
![image](/assets/images/cloud/4109/7-7-vpc-flow-9.png)
You will see some log streams.
![image](/assets/images/cloud/4109/7-7-vpc-flow-10.png)
Click on any of them, you will see the detailed logs.
![image](/assets/images/cloud/4109/7-7-vpc-flow-11.png)
### 5.3 Summary of VPC Flow Logs
* You cannot enable flow logs for VPCs that are peered with your VPC unless the peer VPC is in your account.
* You cannot tag a flow log.
* After you've created a flow log, you cannot change its configuration; for example, you can't associate a different IAM role with the flow log.

Not all IP Traffic is monitored:
* Traffic generated by instances when they contact the Amazon DNS server. If you use your own DNS server, then all traffic to that DNS server is logged.
* Traffic generated by a Windows instance for Amazon Windows license activation.
* Traffic to and from 169.254.169.254 for instance metadata.
* DHCP traffic.
* Traffic to the reserved IP address for the default VPC router.

## 6. Bastions
### 6.1 What Is A Bastion Host?
A bastion host is a special purpose computer on a network specifically designed and configured to withstand attacks. The computer generally hosts a single application, for example a proxy server, and all other services are removed or limited to reduce the threat to the computer. It is hardened in this manner primarily due to its location and purpose, which is either on the outside of a firewall or in a demilitarized zone (DMZ) and usually involves access from untrusted networks or computers.
![image](/assets/images/cloud/4109/7-8-bastions-2.png)
Remember the following:
* A NAT Gateway or NAT Instance is used to provide Internet traffic to EC2 instances in a private subnets.
* A Bastion is used to securely administer EC2 instances (Using SSH or RDP). Bastions are called Jump Boxes in Australia.
* You cannot use a NAT Gateway as a Bastion host.

## 7. Direct Connect
### 7.1 What Is Direct Connect?  
AWS Direct Connect is a cloud service solution that makes it easy to establish a dedicated network connection from your premises to AWS. Using AWS Direct Connect, you can establish private connectivity between AWS and your datacenter, office, or colocation environment, which in many cases can reduce your network costs, increase bandwidth throughput, and provide a more consistent network experience than Internet-based connections.
![image](/assets/images/cloud/4109/7-9-direct-connect-2.png)
Remember the following:
* Direct Connect directly connects your data center to AWS
* Useful for high throughput workloads (ie lots of network traffic)
* Or if you need a stable and reliable secure connection.

## 8. VPC End Points
### 8.1 What Is A VPC Endpoint?
A VPC endpoint enables you to privately connect your VPC to supported AWS services and VPC endpoint services powered by PrivateLink without requiring an internet gateway, NAT device, VPN connection, or AWS Direct Connect connection. Instances in your VPC do not require public IP addresses to communicate with resources in the service. Traffic between your VPC and the other service does not leave the Amazon network.

Endpoints are virtual devices. They are horizontally scaled, redundant, and highly available VPC components that allow communication between instances in your VPC and services without imposing availability risks or bandwidth constraints on your network traffic.
### 8.2 Types of VPC Endpoints
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
![image](/assets/images/cloud/4109/7-10-vpc-endpoints-5.png)
Use VPC gateway to achieve the same purpose.
![image](/assets/images/cloud/4109/7-10-vpc-endpoints-6.png)
### 8.3 Create Endpoint
Go to Service->VPC->Endpoints, Create Endpoint, select s3 and gateway.
![image](/assets/images/cloud/4109/7-10-vpc-endpoints-7.png)
Select the custom VPC, and choose the main subnet, 10.0.2.0.
![image](/assets/images/cloud/4109/7-10-vpc-endpoints-8.png)
Now, the end point is created.
![image](/assets/images/cloud/4109/7-10-vpc-endpoints-9.png)
Go to the Route Tables, select the main route table, wait for few minutes, the endpoint will show up in the routes. With this endpoint, the private subnet can connect to outside world.
![image](/assets/images/cloud/4109/7-10-vpc-endpoints-10.png)

## 9. References
* [Amazon Virtual Private Cloud](https://aws.amazon.com/vpc/)
* [Amazon VPC User Guide](https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html)
* [VPC - NAT](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat.html)
