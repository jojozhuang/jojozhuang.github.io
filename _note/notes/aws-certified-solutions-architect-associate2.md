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
Now we have to instances, one web server and one db server. Currently, the web server can't connect to db server. We will create security group to enable the communication from web server to db server.

Create new security group.
![image](/public/images/note/9160/7-3-create-security-group.png)
It is created.
![image](/public/images/note/9160/7-3-create-security-group-2.png)
Change the security group for db server.
![image](/public/images/note/9160/7-3-create-security-group-3.png)
![image](/public/images/note/9160/7-3-create-security-group-4.png)
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
![image](/public/images/note/9160/7-4-nat-gateway-1.png)
Launch new instance, search 'nat' in the 'Community AMIs', select the first one.
![image](/public/images/note/9160/7-4-nat-gateway-2.png)
Select the custom VPC and choose the public subnet.
![image](/public/images/note/9160/7-4-nat-gateway-3.png)
Add name to indicate it is a NAT instance.
![image](/public/images/note/9160/7-4-nat-gateway-4.png)
Select the WebDMZ group.
![image](/public/images/note/9160/7-4-nat-gateway-5.png)
![image](/public/images/note/9160/7-4-nat-gateway-6.png)
The NAT instance is created, it's running in the same AZ with the web server. It has its own public ip address.
![image](/public/images/note/9160/7-4-nat-gateway-7.png)
Disabling Source/Destination Checks, see [NAT Instances](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_NAT_Instance.html).

Select the NAT instance, actions->Networking->Change Source/Dest. Check.
![image](/public/images/note/9160/7-4-nat-gateway-8.png)
Disable it.
![image](/public/images/note/9160/7-4-nat-gateway-9.png)
Create route to let database server talk to nat instance.

Services -> VPC->Route Tables, select the main route table of the custom VPC, click "Edit rules".
![image](/public/images/note/9160/7-4-nat-gateway-10.png)
Select the nat instance as target.
![image](/public/images/note/9160/7-4-nat-gateway-11.png)
Done.
![image](/public/images/note/9160/7-4-nat-gateway-12.png)
Now, if you ssh to your webserver, then ssh to your database server, you can run "yum install update", and it will be able to download files from internet.

NAT instance is not good as it may be overloaded. If it is stopped, then database server will lose the internet connection and you will see the route status becomes to 'blackhole'.
![image](/public/images/note/9160/7-4-nat-gateway-13.png)

Create NAT gateway which is more reliable and flexible.

VPC->NAT Gateways->Create NAT Gateway.
![image](/public/images/note/9160/7-4-nat-gateway-14.png)
Select the public subnet, click "Create New EIP".
![image](/public/images/note/9160/7-4-nat-gateway-15.png)
Edit route tables.
![image](/public/images/note/9160/7-4-nat-gateway-16.png)
Select the main route table, click "Edit routes".
![image](/public/images/note/9160/7-4-nat-gateway-17.png)
Select the NAT gateway as target.
![image](/public/images/note/9160/7-4-nat-gateway-18.png)
Done.
![image](/public/images/note/9160/7-4-nat-gateway-19.png)
Switch to "NAT Gateways", the new gateway is there.
![image](/public/images/note/9160/7-4-nat-gateway-20.png)
Now, the database server has the internet connection again.

Exam tips.
![image](/public/images/note/9160/7-4-nat-gateway-exam-tips.png)
![image](/public/images/note/9160/7-4-nat-gateway-exam-tips-2.png)
![image](/public/images/note/9160/7-4-nat-gateway-exam-tips-3.png)
### 7.5 Access Control Lists (ACL)
![image](/public/images/note/9160/7-5-acl-1.png)
Create new ACL.
![image](/public/images/note/9160/7-5-acl-2.png)
By default all inbound and outbound requests are denied.
![image](/public/images/note/9160/7-5-acl-3.png)
Test the port 80. SSh to web server, run commands to create a web page and start web service.
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
![image](/public/images/note/9160/7-5-acl-4.png)
It's currently working, because the ACL for subnet is public to all inbound ports.
![image](/public/images/note/9160/7-5-acl-5.png)
Associate the new ACL to current subnet. Select the new ACL and click "Edit subnet associations".
![image](/public/images/note/9160/7-5-acl-6.png)
Choose the subnet which is for web server.
![image](/public/images/note/9160/7-5-acl-7.png)
Notice, the old ACL doesn't associate the same subnet anymore.
![image](/public/images/note/9160/7-5-acl-8.png)
Refresh the page, it will be timeout.
![image](/public/images/note/9160/7-5-acl-9.png)
Add some rules(80,443,22) to inbound of the new ACL.
![image](/public/images/note/9160/7-5-acl-10.png)
Similar, add rules for outbound of the new ACL. Check [Ephemeral Ports](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-network-acls.html#nacl-ephemeral-ports) to understand why we set the range 1024-65535.
![image](/public/images/note/9160/7-5-acl-11.png)
Refresh the page, we get the page back.
![image](/public/images/note/9160/7-5-acl-12.png)
ACL exam tips.
![image](/public/images/note/9160/7-5-acl-exam-tips-1.png)
![image](/public/images/note/9160/7-5-acl-exam-tips-2.png)
### 7.6 Custom VPCs and ELBs
ELB requires at least two subnets with gateway configured for all.
![image](/public/images/note/9160/7-6-load-balancer-1.png)
### 7.7 VPC Flow Logs
![image](/public/images/note/9160/7-7-vpc-flow-1.png)
![image](/public/images/note/9160/7-7-vpc-flow-2.png)
Create Log Group in CloudWatch. Services->Management & Governance->CloudWatch
![image](/public/images/note/9160/7-7-vpc-flow-3.png)
Go to VPC console, select the custom VPC, actions->Create flow log.
![image](/public/images/note/9160/7-7-vpc-flow-4.png)
Click the link "Set Up Permissions".
![image](/public/images/note/9160/7-7-vpc-flow-5.png)
Allow.
![image](/public/images/note/9160/7-7-vpc-flow-6.png)
Go back to create the flow log.
![image](/public/images/note/9160/7-7-vpc-flow-7.png)
Now the flow log is enabled. Refresh the web page.
![image](/public/images/note/9160/7-7-vpc-flow-8.png)
Then go to CloudWatch, select Logs and click the log group.
![image](/public/images/note/9160/7-7-vpc-flow-9.png)
You will see some log streams.
![image](/public/images/note/9160/7-7-vpc-flow-10.png)
Click on any of them, you will see the detailed logs.
![image](/public/images/note/9160/7-7-vpc-flow-11.png)
Exam tips.
![image](/public/images/note/9160/7-7-vpc-flow-exam-tips-1.png)
![image](/public/images/note/9160/7-7-vpc-flow-exam-tips-2.png)
### 7.8 Bastions
![image](/public/images/note/9160/7-8-bastions-1.png)
![image](/public/images/note/9160/7-8-bastions-2.png)
![image](/public/images/note/9160/7-8-bastions-exam-tips.png)
### 7.9 Direct Connect
![image](/public/images/note/9160/7-9-direct-connect-1.png)
![image](/public/images/note/9160/7-9-direct-connect-2.png)
![image](/public/images/note/9160/7-9-direct-connect-exam-tips.png)
### 7.10 VPC End Points
![image](/public/images/note/9160/7-10-vpc-endpoints-1.png)
![image](/public/images/note/9160/7-10-vpc-endpoints-2.png)
![image](/public/images/note/9160/7-10-vpc-endpoints-3.png)
![image](/public/images/note/9160/7-10-vpc-endpoints-4.png)
Current solution: Use NAT gateway to let private subnet to access public internet.
![image](/public/images/note/9160/7-10-vpc-endpoints-5.png)
Use VPC gateway to achieve the same purpose.
![image](/public/images/note/9160/7-10-vpc-endpoints-6.png)
TODO, Labs

Exam tips.
![image](/public/images/note/9160/7-10-vpc-endpoints-exam-tips-1.png)
![image](/public/images/note/9160/7-10-vpc-endpoints-exam-tips-2.png)
### 7.11 Summary
![image](/public/images/note/9160/7-11-vpc-summary-1.png)
![image](/public/images/note/9160/7-11-vpc-summary-2.png)
![image](/public/images/note/9160/7-11-vpc-summary-3.png)
![image](/public/images/note/9160/7-11-vpc-summary-4.png)
![image](/public/images/note/9160/7-11-vpc-summary-5.png)
![image](/public/images/note/9160/7-11-vpc-summary-6.png)
![image](/public/images/note/9160/7-11-vpc-summary-7.png)
![image](/public/images/note/9160/7-11-vpc-summary-8.png)
![image](/public/images/note/9160/7-11-vpc-summary-9.png)
![image](/public/images/note/9160/7-11-vpc-summary-10.png)
![image](/public/images/note/9160/7-11-vpc-summary-11.png)
![image](/public/images/note/9160/7-11-vpc-summary-12.png)
![image](/public/images/note/9160/7-11-vpc-summary-13.png)
![image](/public/images/note/9160/7-11-vpc-summary-14.png)
![image](/public/images/note/9160/7-11-vpc-summary-15.png)
![image](/public/images/note/9160/7-11-vpc-summary-16.png)
![image](/public/images/note/9160/7-11-vpc-summary-17.png)
### 7.12 VPCs Quiz
![image](/public/images/note/9160/7-12-vpc-quiz-1.png)
![image](/public/images/note/9160/7-12-vpc-quiz-2.png)
![image](/public/images/note/9160/7-12-vpc-quiz-3.png)
![image](/public/images/note/9160/7-12-vpc-quiz-4.png)
![image](/public/images/note/9160/7-12-vpc-quiz-5.png)
![image](/public/images/note/9160/7-12-vpc-quiz-6.png)
![image](/public/images/note/9160/7-12-vpc-quiz-7.png)
![image](/public/images/note/9160/7-12-vpc-quiz-8.png)
![image](/public/images/note/9160/7-12-vpc-quiz-9.png)
![image](/public/images/note/9160/7-12-vpc-quiz-10.png)
![image](/public/images/note/9160/7-12-vpc-quiz-11.png)
![image](/public/images/note/9160/7-12-vpc-quiz-12.png)
![image](/public/images/note/9160/7-12-vpc-quiz-13.png)
![image](/public/images/note/9160/7-12-vpc-quiz-14.png)
![image](/public/images/note/9160/7-12-vpc-quiz-15.png)
![image](/public/images/note/9160/7-12-vpc-quiz-16.png)
![image](/public/images/note/9160/7-12-vpc-quiz-17.png)
![image](/public/images/note/9160/7-12-vpc-quiz-18.png)
![image](/public/images/note/9160/7-12-vpc-quiz-19.png)
![image](/public/images/note/9160/7-12-vpc-quiz-20.png)
![image](/public/images/note/9160/7-12-vpc-quiz-21.png)
![image](/public/images/note/9160/7-12-vpc-quiz-22.png)
![image](/public/images/note/9160/7-12-vpc-quiz-23.png)
![image](/public/images/note/9160/7-12-vpc-quiz-24.png)
![image](/public/images/note/9160/7-12-vpc-quiz-25.png)
