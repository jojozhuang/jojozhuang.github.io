---
layout: tutorial
key: cloud
title: "AWS-VPC-Custom VPC"
index: 4161
subcategory: amazon-aws
date: 2019-09-16
tags: [AWS, VPC]
---

> Create custom VPC.

## 1. VPCs
### 1.1 What Is A VPC?
You can easily customize the network configuration for your Amazon Virtual Private Cloud(VPC). For example, you can create a public-facing subnet for your webservers that has access to the Internet, and place your backend systems such as databases or application servers in a private-facing subnet with no Internet access. You can leverage multiple layers of security, including security groups and network access control lists, to help control access to Amazon EC2 instances in each subnet.
![image](/assets/images/cloud/4161/vpc-high-level.png)

Additionally, you can create a Hardware Virtual Private Network (VPN) connection between your corporate datacenter and your VPC and leverage the AWS cloud as an extension of your corporate datacenter.
![image](/assets/images/cloud/4161/vpc-vpn.png)

![image](/assets/images/cloud/4161/vpc-cidr.png)

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
![image](/assets/images/cloud/4161/vpc-peering.jpg)

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

## 2. Lab - VPC
### 2.1 Create Custom VPC
VPC contains Route Table, Network ACL and Security Group.
![image](/assets/images/cloud/4161/vpc-create-vpc-1.png)
Go to Services->Networking & Content Delivery->VPC, select "Your VPCs" at the left panel, click "Create VPC" button.
![image](/assets/images/cloud/4161/vpc-create-vpc-2.png)
Provide name and ip address, then Create.
![image](/assets/images/cloud/4161/vpc-create-vpc-3.png)
New VPC is created.
![image](/assets/images/cloud/4161/vpc-create-vpc-4.png)
There is one more entry in Route Tables.
![image](/assets/images/cloud/4161/vpc-create-vpc-5.png)
And one more entry in Network ACLs.
![image](/assets/images/cloud/4161/vpc-create-vpc-6.png)
And one more entry in Security Group(the second one).
![image](/assets/images/cloud/4161/vpc-create-vpc-7.png)
Create Subnet, 10.0.1.0.
![image](/assets/images/cloud/4161/vpc-create-subnet-1.png)
Create another Subnet, 10.0.2.0.
![image](/assets/images/cloud/4161/vpc-create-subnet-2.png)
Two subnets are created.
![image](/assets/images/cloud/4161/vpc-create-subnet-3.png)
You see the "Available IPv4" is 251(total should be 256, CIDR.xyz), 5 ip addresses are reserved, see [VPCs and Subnets](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Subnets.html).
* 10.0.0.0: Network address.
* 10.0.0.1: Reserved by AWS for the VPC router.
* 10.0.0.2: Reserved by AWS. The IP address of the DNS server is always the base of the VPC network range plus two; however, we also reserve the base of each subnet range plus two. For VPCs with multiple CIDR blocks, the IP address of the DNS server is located in the primary CIDR. For more information, see Amazon DNS Server.
* 10.0.0.3: Reserved by AWS for future use.
* 10.0.0.255: Network broadcast address. We do not support broadcast in a VPC, therefore we reserve this address.

Select the first subnet, click Actions->Modify auto-assign IP settings.
![image](/assets/images/cloud/4161/vpc-create-subnet-4.png)
Enable the option "Enable auto-assign public IPv4 address", Save.
![image](/assets/images/cloud/4161/vpc-create-subnet-5.png)
Now, auto public ip address is enabled to the subnet 10.0.1.0.
![image](/assets/images/cloud/4161/vpc-create-subnet-6.png)
Now, our VPC looks like this.
![image](/assets/images/cloud/4161/vpc-create-subnet-7.png)
### 2.2 Create Internet Gateway
Go to Services->Networking & Content Delivery->VPC, select "Internet Gateways" at the left panel, click "Create internet gateway" button.
![image](/assets/images/cloud/4161/vpc-create-gateway-0.png)
Provide the name, Create.
![image](/assets/images/cloud/4161/vpc-create-gateway-1.png)
It is created and its state is detached.
![image](/assets/images/cloud/4161/vpc-create-gateway-2.png)
Select the new gateway, Actions->Attach to VPC.
![image](/assets/images/cloud/4161/vpc-create-gateway-3.png)
Choose the VPC we just created before.
![image](/assets/images/cloud/4161/vpc-create-gateway-4.png)
Now, it is attached.
![image](/assets/images/cloud/4161/vpc-create-gateway-5.png)
* Notice, you can attach only one internet gateway to VPC.

Check the status of the current route table for new VPC. It has route for internal only.
![image](/assets/images/cloud/4161/vpc-create-route-tables-1.png)
There are two subnets, but none of them is associated to this route table.
![image](/assets/images/cloud/4161/vpc-create-route-tables-2.png)
In the next steps, we will create a new route table for public access.
### 2.3 Create Route Table
Go to Services->Networking & Content Delivery->VPC, select "Route Tables" at the left panel, click "Create route table" button. Provide the name and select the new VPC.
![image](/assets/images/cloud/4161/vpc-create-route-tables-3.png)
The new route table is created, notice it is not main.
![image](/assets/images/cloud/4161/vpc-create-route-tables-4.png)
Click "Edit routes" button. Add two routes "0.0.0.0/0" for ipv4 and "::/0" for ipv6. Select the internet gateway created above as target.
![image](/assets/images/cloud/4161/vpc-create-route-tables-5.png)
Now we have two more routes.
![image](/assets/images/cloud/4161/vpc-create-route-tables-6.png)
Switch to Subnet Associations tab, click "Edit subnet associations" button.
![image](/assets/images/cloud/4161/vpc-create-route-tables-7.png)
Select the first subnet(10.0.1.0) and save.
![image](/assets/images/cloud/4161/vpc-create-route-tables-8.png)
Now, the first subnet is associated with the public route table.
![image](/assets/images/cloud/4161/vpc-create-route-tables-9.png)
If we check the subnet associations of the main route tables, the first subnet is not there anymore. Now we have the private subnet and the public subnet.
![image](/assets/images/cloud/4161/vpc-create-route-tables-10.png)
### 2.4 Create EC2 Instance
Create a new EC2 instance for acting as web server, select the second AMI.
![image](/assets/images/cloud/4161/vpc-create-instance-1.png)
Select the custom VPC created previously and choose the first subnet(10.0.1.0). Notice the public ip is auto enabled.
![image](/assets/images/cloud/4161/vpc-create-instance-2.png)
Add tags to indicate this is a web server.
![image](/assets/images/cloud/4161/vpc-create-instance-3.png)
There is no existing security groups here(Not seeing the WebDMZ), since we are using the new VPC now.
![image](/assets/images/cloud/4161/vpc-create-instance-4.png)
Create new security group.
![image](/assets/images/cloud/4161/vpc-create-instance-5.png)
Create second instance for database. Select the VPC and choose the second subnet(10.0.2.0).  Notice the public ip is auto disabled.
![image](/assets/images/cloud/4161/vpc-create-instance-6.png)
Add tags to indicate this is a database server.
![image](/assets/images/cloud/4161/vpc-create-instance-7.png)
Use the default security group.
![image](/assets/images/cloud/4161/vpc-create-instance-8.png)
Now we have two instances, one for web server, one for db server. Notice the webserver has public ip address.
![image](/assets/images/cloud/4161/vpc-create-instance-9.png)
Until now, we have created the VPC from scratch and it looks as follows.
![image](/assets/images/cloud/4161/vpc-create-instance-10.png)
We have two instances, one is web server and another is DB server. Currently, the web server can't connect to db server. We will create security group to enable the connection from web server to db server.
### 2.5 Create Security Group
Go to Services->EC2->Network & Security->Security Groups, click "Create security group". Provide name and description, select the custom VPC. Setup the rules as follows, Create.
![image](/assets/images/cloud/4161/vpc-create-security-group.png)
A new security group is created.
![image](/assets/images/cloud/4161/vpc-create-security-group-2.png)
Change the security group for DB server. Go to EC2 instances, select the database instance, Actions->Networking->Change Security Group.
![image](/assets/images/cloud/4161/vpc-create-security-group-3.png)
Only select the new security group for database.
![image](/assets/images/cloud/4161/vpc-create-security-group-4.png)
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

## 3. References
* [Amazon Virtual Private Cloud](https://aws.amazon.com/vpc/)
* [Amazon VPC User Guide](https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html)
