---
layout: tutorial
key: cloud
title: "AWS-vpc-7-Draft"
index: 4109
subcategory: amazon-aws
date: 2019-09-16
tags: [VPC]
draft: true
---

> Amazon AWS Tutorial

## 7. VPCs
### 7.1 Introduction To VPCs
![image](/assets/images/note/9551/7-1-vpc-1.png)
![image](/assets/images/note/9551/7-1-vpc-2.png)
![image](/assets/images/note/9551/7-1-vpc-3.png)
![image](/assets/images/note/9551/7-1-vpc-4.png)
![image](/assets/images/note/9551/7-1-vpc-5.png)
![image](/assets/images/note/9551/7-1-vpc-6.png)
Default VPC vs. Custom VPC.
![image](/assets/images/note/9551/7-1-vpc-7.png)
VPC peering.
![image](/assets/images/note/9551/7-1-vpc-8.png)
Can't access from B to C through A. Must create VPC peering from B to C directly.
![image](/assets/images/note/9551/7-1-vpc-9.png)
Exam tips.
![image](/assets/images/note/9551/7-1-vpc-exam-tips.png)
### 7.2 Build A Custom VPC - Part 1
VPC contains Route Table, Network ACL and Security Group.
![image](/assets/images/note/9551/7-2-create-vpc-1.png)
Create VPC: Services->Networking & Content Delivery->VPC, select "Your VPCs" at the left panel.
![image](/assets/images/note/9551/7-2-create-vpc-2.png)
![image](/assets/images/note/9551/7-2-create-vpc-3.png)
New VPC is created.
![image](/assets/images/note/9551/7-2-create-vpc-4.png)
One more entry in Route Tables.
![image](/assets/images/note/9551/7-2-create-vpc-5.png)
One more entry in Network ACLs.
![image](/assets/images/note/9551/7-2-create-vpc-6.png)
One more entry in Security Group, the second one.
![image](/assets/images/note/9551/7-2-create-vpc-7.png)
Create Subnet, 10.0.1.0.
![image](/assets/images/note/9551/7-2-create-subnet-1.png)
Create another Subnet, 10.0.2.0.
![image](/assets/images/note/9551/7-2-create-subnet-2.png)
Two subnets are created.
![image](/assets/images/note/9551/7-2-create-subnet-3.png)
You see the "Available IPv4" is 251(total should be 256, CIDR.xyz), 5 ip addresses are reserved, see [VPCs and Subnets](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Subnets.html).
* 10.0.0.0: Network address.
* 10.0.0.1: Reserved by AWS for the VPC router.
* 10.0.0.2: Reserved by AWS. The IP address of the DNS server is always the base of the VPC network range plus two; however, we also reserve the base of each subnet range plus two. For VPCs with multiple CIDR blocks, the IP address of the DNS server is located in the primary CIDR. For more information, see Amazon DNS Server.
* 10.0.0.3: Reserved by AWS for future use.
* 10.0.0.255: Network broadcast address. We do not support broadcast in a VPC, therefore we reserve this address.

Select the first subnet, click Actions->Modify auto-assign IP settings.
![image](/assets/images/note/9551/7-2-create-subnet-4.png)
![image](/assets/images/note/9551/7-2-create-subnet-5.png)
Now, auto public ip address is enabled to the subnet 10.0.1.0.
![image](/assets/images/note/9551/7-2-create-subnet-6.png)
Now, our VPC looks like this.
![image](/assets/images/note/9551/7-2-create-subnet-7.png)
Create gateway: Select Internet Gateways->Create internet gateway.
![image](/assets/images/note/9551/7-2-create-gateway-1.png)
It is created and its state is detached.
![image](/assets/images/note/9551/7-2-create-gateway-2.png)
Select the gateway, Actions->Attach to VPC.
![image](/assets/images/note/9551/7-2-create-gateway-3.png)
Choose the VPC.
![image](/assets/images/note/9551/7-2-create-gateway-4.png)
Now, it is attached.
![image](/assets/images/note/9551/7-2-create-gateway-5.png)
* Notice, you can attach only one internet gateway to VPC.

Check the status of the current route table for new VPC. It has route for internal only.
![image](/assets/images/note/9551/7-2-create-route-tables-1.png)
There are two subnets, but none of them is associated to this route table.
![image](/assets/images/note/9551/7-2-create-route-tables-2.png)
Create new route table for public access.
![image](/assets/images/note/9551/7-2-create-route-tables-3.png)
The new route table is created, notice it is not main.
![image](/assets/images/note/9551/7-2-create-route-tables-4.png)
Click "Edit routes" button. Add two routes "0.0.0.0/0" for ipv4 and "::/0" for ipv6. Select the internet gateway created above as target.
![image](/assets/images/note/9551/7-2-create-route-tables-5.png)
Now we have two more routes.
![image](/assets/images/note/9551/7-2-create-route-tables-6.png)
Switch to Subnet Associations tab, click "Edit subnet associations" button.
![image](/assets/images/note/9551/7-2-create-route-tables-7.png)
Select the first one and save.
![image](/assets/images/note/9551/7-2-create-route-tables-8.png)
Now, the first subnet is associated with the public route table.
![image](/assets/images/note/9551/7-2-create-route-tables-9.png)
If we check the subnet associations of the main route tables, the first subnet is not there anymore. Now we have the private subnet and the public subnet.
![image](/assets/images/note/9551/7-2-create-route-tables-10.png)
Create instance for web server, select the second AMI.
![image](/assets/images/note/9551/7-2-create-instance-1.png)
Select the VPC created previously and select the first subnet. Notice the public ip is auto enabled.
![image](/assets/images/note/9551/7-2-create-instance-2.png)
Add tags to indicate this is a web server.
![image](/assets/images/note/9551/7-2-create-instance-3.png)
There is no existing security groups here(Not seeing the WebDMZ), since we are using the new VPC now.
![image](/assets/images/note/9551/7-2-create-instance-4.png)
Create new security group.
![image](/assets/images/note/9551/7-2-create-instance-5.png)
Create second instance for database. Select the VPC and choose the second subnet.  Notice the public ip is auto disabled.
![image](/assets/images/note/9551/7-2-create-instance-6.png)
Add tags to indicate this is a database server.
![image](/assets/images/note/9551/7-2-create-instance-7.png)
Use the default security group.
![image](/assets/images/note/9551/7-2-create-instance-8.png)
Now we have two instances, one for web server, one for db server. Notice the webserver has public ip address.
![image](/assets/images/note/9551/7-2-create-instance-9.png)
Until now, we have created the VPC from scratch and it looks as follows.
![image](/assets/images/note/9551/7-2-create-instance-10.png)
Exam tips.
![image](/assets/images/note/9551/7-2-create-vpc-exam-tips.png)
### 7.3 Build A Custom VPC - Part 2
Now we have two instances, one is web server and another is db server. Currently, the web server can't connect to db server. We will create security group to enable the connection from web server to db server.

Create new security group.
![image](/assets/images/note/9551/7-3-create-security-group.png)
It is created.
![image](/assets/images/note/9551/7-3-create-security-group-2.png)
Change the security group for db server. Select the database instance, Actions->Networking->Change Security Group.
![image](/assets/images/note/9551/7-3-create-security-group-3.png)
Only select the new security group for database.
![image](/assets/images/note/9551/7-3-create-security-group-4.png)
ssh to web server and ping the database server from it. '54.175.89.128' is the public ip of web server and '10.0.2.140' is the private ip of database server. If you upload the keypair to web server, you can also ssh to database server from webserver.
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
### 7.4 Network Address Translation (NAT)
Currently, there is one problem with the database server, it has no public connection to internet. We will create NAT instance and NAT Gateway to setup the connection for database server.
![image](/assets/images/note/9551/7-4-nat-gateway-1.png)
Launch new instance, search 'nat' in the 'Community AMIs', select the first one.
![image](/assets/images/note/9551/7-4-nat-gateway-2.png)
Select the custom VPC and choose the public subnet.
![image](/assets/images/note/9551/7-4-nat-gateway-3.png)
Add name to indicate it is a NAT instance.
![image](/assets/images/note/9551/7-4-nat-gateway-4.png)
Select the WebDMZ group.
![image](/assets/images/note/9551/7-4-nat-gateway-5.png)
![image](/assets/images/note/9551/7-4-nat-gateway-6.png)
The NAT instance is created, it's running in the same AZ with the web server. It has its own public ip address.
![image](/assets/images/note/9551/7-4-nat-gateway-7.png)
Disabling Source/Destination Checks, see [NAT Instances](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_NAT_Instance.html).

Select the NAT instance, actions->Networking->Change Source/Dest. Check.
![image](/assets/images/note/9551/7-4-nat-gateway-8.png)
Disable it.
![image](/assets/images/note/9551/7-4-nat-gateway-9.png)
Create route to let database server talk to nat instance.

Services -> VPC->Route Tables, select the main route table of the custom VPC, click "Edit rules".
![image](/assets/images/note/9551/7-4-nat-gateway-10.png)
Select the nat instance as target.
![image](/assets/images/note/9551/7-4-nat-gateway-11.png)
Done.
![image](/assets/images/note/9551/7-4-nat-gateway-12.png)
Now, if you ssh to your webserver, then ssh to your database server, you can run "yum install update", and it will be able to download files from internet.

NAT instance is not good as it may be overloaded. If it is stopped, then database server will lose the internet connection and you will see the route status becomes to 'blackhole'.
![image](/assets/images/note/9551/7-4-nat-gateway-13.png)

Create NAT gateway which is more reliable and flexible.

VPC->NAT Gateways->Create NAT Gateway.
![image](/assets/images/note/9551/7-4-nat-gateway-14.png)
Select the public subnet, click "Create New EIP".
![image](/assets/images/note/9551/7-4-nat-gateway-15.png)
Edit route tables.
![image](/assets/images/note/9551/7-4-nat-gateway-16.png)
Select the main route table, click "Edit routes".
![image](/assets/images/note/9551/7-4-nat-gateway-17.png)
Select the NAT gateway as target.
![image](/assets/images/note/9551/7-4-nat-gateway-18.png)
Done.
![image](/assets/images/note/9551/7-4-nat-gateway-19.png)
Switch to "NAT Gateways", the new gateway is there.
![image](/assets/images/note/9551/7-4-nat-gateway-20.png)
Now, the database server has the internet connection again.

Exam tips.
![image](/assets/images/note/9551/7-4-nat-gateway-exam-tips.png)
![image](/assets/images/note/9551/7-4-nat-gateway-exam-tips-2.png)
![image](/assets/images/note/9551/7-4-nat-gateway-exam-tips-3.png)
### 7.5 Access Control Lists (ACL)
We have two ACLs. One is default ACL, another is custom ACL for the custom VPC.
![image](/assets/images/note/9551/7-5-acl-1.png)
Create new ACL.
![image](/assets/images/note/9551/7-5-acl-2.png)
By default all inbound and outbound requests are denied.
![image](/assets/images/note/9551/7-5-acl-3.png)
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
![image](/assets/images/note/9551/7-5-acl-4.png)
It's currently working, because the default ACL has inbound rules for all public sources.
![image](/assets/images/note/9551/7-5-acl-5.png)
Associate the new ACL to current subnet. Select the new ACL and click "Edit subnet associations".
![image](/assets/images/note/9551/7-5-acl-6.png)
Choose the subnet which is for web server.
![image](/assets/images/note/9551/7-5-acl-7.png)
Notice, the old ACL doesn't associate the same subnet anymore.
![image](/assets/images/note/9551/7-5-acl-8.png)
Refresh the page, it will be timeout.
![image](/assets/images/note/9551/7-5-acl-9.png)
Add some rules(80,443,22) to inbound of the new ACL.
![image](/assets/images/note/9551/7-5-acl-10.png)
Similar, add rules for outbound of the new ACL. Check [Ephemeral Ports](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-network-acls.html#nacl-ephemeral-ports) to understand why we set the range 1024-65535.
![image](/assets/images/note/9551/7-5-acl-11.png)
Refresh the page, we get the page back.
![image](/assets/images/note/9551/7-5-acl-12.png)
ACL exam tips.
![image](/assets/images/note/9551/7-5-acl-exam-tips-1.png)
![image](/assets/images/note/9551/7-5-acl-exam-tips-2.png)
### 7.6 Custom VPCs and ELBs
ELB requires at least two subnets with gateway configured for all.
![image](/assets/images/note/9551/7-6-load-balancer-1.png)
### 7.7 VPC Flow Logs
![image](/assets/images/note/9551/7-7-vpc-flow-1.png)
![image](/assets/images/note/9551/7-7-vpc-flow-2.png)
Create Log Group in CloudWatch. Services->Management & Governance->CloudWatch
![image](/assets/images/note/9551/7-7-vpc-flow-3.png)
Go to VPC console, select the custom VPC, actions->Create flow log.
![image](/assets/images/note/9551/7-7-vpc-flow-4.png)
Click the link "Set Up Permissions".
![image](/assets/images/note/9551/7-7-vpc-flow-5.png)
Allow.
![image](/assets/images/note/9551/7-7-vpc-flow-6.png)
Go back to create the flow log.
![image](/assets/images/note/9551/7-7-vpc-flow-7.png)
Now the flow log is enabled. Refresh the web page.
![image](/assets/images/note/9551/7-7-vpc-flow-8.png)
Then go to CloudWatch, select Logs and click the log group.
![image](/assets/images/note/9551/7-7-vpc-flow-9.png)
You will see some log streams.
![image](/assets/images/note/9551/7-7-vpc-flow-10.png)
Click on any of them, you will see the detailed logs.
![image](/assets/images/note/9551/7-7-vpc-flow-11.png)
Exam tips.
![image](/assets/images/note/9551/7-7-vpc-flow-exam-tips-1.png)
![image](/assets/images/note/9551/7-7-vpc-flow-exam-tips-2.png)
### 7.8 Bastions
![image](/assets/images/note/9551/7-8-bastions-1.png)
![image](/assets/images/note/9551/7-8-bastions-2.png)
![image](/assets/images/note/9551/7-8-bastions-exam-tips.png)
### 7.9 Direct Connect
![image](/assets/images/note/9551/7-9-direct-connect-1.png)
![image](/assets/images/note/9551/7-9-direct-connect-2.png)
![image](/assets/images/note/9551/7-9-direct-connect-exam-tips.png)
### 7.10 VPC End Points
VPC Endpoint.
![image](/assets/images/note/9551/7-10-vpc-endpoints-1.png)
![image](/assets/images/note/9551/7-10-vpc-endpoints-2.png)
![image](/assets/images/note/9551/7-10-vpc-endpoints-3.png)
![image](/assets/images/note/9551/7-10-vpc-endpoints-4.png)
Current solution: Use NAT gateway to let private subnet to access public internet.
![image](/assets/images/note/9551/7-10-vpc-endpoints-5.png)
Use VPC gateway to achieve the same purpose.
![image](/assets/images/note/9551/7-10-vpc-endpoints-6.png)
Create endpoint: Service->VPC->Endpoints, Create Endpoint, select s3 and gateway.
![image](/assets/images/note/9551/7-10-vpc-endpoints-7.png)
Select the custom VPC, and choose the main subnet, 10.0.2.0.
![image](/assets/images/note/9551/7-10-vpc-endpoints-8.png)
Now, the end point is created.
![image](/assets/images/note/9551/7-10-vpc-endpoints-9.png)
Go to the Route Tables, select the main route table, wait for few minutes, the endpoint will show up in the routes. With this endpoint, the private subnet can connect to outside world.
![image](/assets/images/note/9551/7-10-vpc-endpoints-10.png)
Exam tips.
![image](/assets/images/note/9551/7-10-vpc-endpoints-exam-tips-1.png)
![image](/assets/images/note/9551/7-10-vpc-endpoints-exam-tips-2.png)
### 7.11 Summary
![image](/assets/images/note/9551/7-11-vpc-summary-1.png)
![image](/assets/images/note/9551/7-11-vpc-summary-2.png)
![image](/assets/images/note/9551/7-11-vpc-summary-3.png)
![image](/assets/images/note/9551/7-11-vpc-summary-4.png)
![image](/assets/images/note/9551/7-11-vpc-summary-5.png)
![image](/assets/images/note/9551/7-11-vpc-summary-6.png)
![image](/assets/images/note/9551/7-11-vpc-summary-7.png)
![image](/assets/images/note/9551/7-11-vpc-summary-8.png)
![image](/assets/images/note/9551/7-11-vpc-summary-9.png)
![image](/assets/images/note/9551/7-11-vpc-summary-10.png)
![image](/assets/images/note/9551/7-11-vpc-summary-11.png)
![image](/assets/images/note/9551/7-11-vpc-summary-12.png)
![image](/assets/images/note/9551/7-11-vpc-summary-13.png)
![image](/assets/images/note/9551/7-11-vpc-summary-14.png)
![image](/assets/images/note/9551/7-11-vpc-summary-15.png)
![image](/assets/images/note/9551/7-11-vpc-summary-16.png)
![image](/assets/images/note/9551/7-11-vpc-summary-17.png)
### 7.12 VPCs Quiz
![image](/assets/images/note/9551/7-12-vpc-quiz-1.png)
![image](/assets/images/note/9551/7-12-vpc-quiz-2.png)
![image](/assets/images/note/9551/7-12-vpc-quiz-3.png)
![image](/assets/images/note/9551/7-12-vpc-quiz-4.png)
![image](/assets/images/note/9551/7-12-vpc-quiz-5.png)
![image](/assets/images/note/9551/7-12-vpc-quiz-6.png)
![image](/assets/images/note/9551/7-12-vpc-quiz-7.png)
![image](/assets/images/note/9551/7-12-vpc-quiz-8.png)
![image](/assets/images/note/9551/7-12-vpc-quiz-9.png)
![image](/assets/images/note/9551/7-12-vpc-quiz-10.png)
![image](/assets/images/note/9551/7-12-vpc-quiz-11.png)
![image](/assets/images/note/9551/7-12-vpc-quiz-12.png)
![image](/assets/images/note/9551/7-12-vpc-quiz-13.png)
![image](/assets/images/note/9551/7-12-vpc-quiz-14.png)
![image](/assets/images/note/9551/7-12-vpc-quiz-15.png)
![image](/assets/images/note/9551/7-12-vpc-quiz-16.png)
![image](/assets/images/note/9551/7-12-vpc-quiz-17.png)
![image](/assets/images/note/9551/7-12-vpc-quiz-18.png)
![image](/assets/images/note/9551/7-12-vpc-quiz-19.png)
![image](/assets/images/note/9551/7-12-vpc-quiz-20.png)
![image](/assets/images/note/9551/7-12-vpc-quiz-21.png)
![image](/assets/images/note/9551/7-12-vpc-quiz-22.png)
![image](/assets/images/note/9551/7-12-vpc-quiz-23.png)
![image](/assets/images/note/9551/7-12-vpc-quiz-24.png)
![image](/assets/images/note/9551/7-12-vpc-quiz-25.png)


## 9. References
