---
layout: tutorial
key: category
title: "AWS-Route53-6-Draft"
index: 3808
subcategory: amazon-aws
date: 2019-09-16
tags: [EC2]
draft: true
---

> Amazon AWS Tutorial

## 6. Route53
### 6.1 DNS 101
![image](/assets/images/note/9551/6-1-dns-1.png)
IPV4, IPV6
![image](/assets/images/note/9551/6-1-dns-2.png)
Top level Domain.
![image](/assets/images/note/9551/6-1-dns-3.png)
IANA.
![image](/assets/images/note/9551/6-1-dns-4.png)
Domain registrars.
![image](/assets/images/note/9551/6-1-dns-5.png)
SOA.
![image](/assets/images/note/9551/6-1-dns-6.png)
NS Records.
![image](/assets/images/note/9551/6-1-dns-7.png)
A records.
![image](/assets/images/note/9551/6-1-dns-8.png)
TTL.
![image](/assets/images/note/9551/6-1-dns-9.png)
CName.
![image](/assets/images/note/9551/6-1-dns-10.png)
Alias Records.
![image](/assets/images/note/9551/6-1-dns-11.png)
![image](/assets/images/note/9551/6-1-dns-12.png)
Exam tips.
![image](/assets/images/note/9551/6-1-dns-exam-tips-1.png)
![image](/assets/images/note/9551/6-1-dns-exam-tips-2.png)
### 6.2 Route53 - Register A Domain Name Lab
Services -> Networking & Content Delivery -> Route 53, Registered domains

Search available domain, add you want to purchase into cart.
![image](/assets/images/note/9551/6-2-domain-name-1.png)
Provide the personal information.
![image](/assets/images/note/9551/6-2-domain-name-2.png)
It takes sometime before your new domain is ready.
![image](/assets/images/note/9551/6-2-domain-name-3.png)
Use the following bootstrap script to create three ec2 instance in different regions. For instance, we will create three instances in Ireland, Sydney and Ohio. Change the content in the index.html for each instance to make them unique. So later we know which instance we are visiting.
```raw
#!/bin/bash
yum update -y
yum install httpd -y
service httpd start
chkconfig httpd on
cd /var/www/html
echo "<html><h1>Hello Cloud Gurus! This is the X Web Server</h1></html>" > index.html
```
Exam tips.
![image](/assets/images/note/9551/6-2-domain-name-exam-tips.png)
### 6.3 Route53 Routing Policies Available On AWS
![image](/assets/images/note/9551/6-3-routing-policies.png)
### 6.4 Simple Routing Policy Lab
1 to N.
![image](/assets/images/note/9551/6-4-simple-routing-policy-1.png)
Preparation: Get the three public ip addresses of the three instances we created in 6.2.

Go to Route53 -> Host Zones, select the domain created in 6.2, click "Create record set".
![image](/assets/images/note/9551/6-4-simple-routing-policy-2.png)
Paste the three ip addresses into values box, choose 'Simple' as route policy, click Create.
![image](/assets/images/note/9551/6-4-simple-routing-policy-3.png)
Record sets are created.
![image](/assets/images/note/9551/6-4-simple-routing-policy-4.png)
Access the domain, we will be able to see the page. If you keep refreshing the page, the content won't change. The server always stay in the Ireland.
![image](/assets/images/note/9551/6-4-simple-routing-policy-5.png)
Change the TTL to 1 minutes.
![image](/assets/images/note/9551/6-4-simple-routing-policy-6.png)
Wait for 60 seconds and refresh the page. The content is returned from Ohio server.
![image](/assets/images/note/9551/6-4-simple-routing-policy-7.png)
Exam tips.
![image](/assets/images/note/9551/6-4-simple-routing-policy-exam-tips.png)
### 6.5 Weighted Routing Policy Lab
![image](/assets/images/note/9551/6-5-weighted-routing-policy-1.png)
![image](/assets/images/note/9551/6-5-weighted-routing-policy-2.png)
![image](/assets/images/note/9551/6-5-weighted-routing-policy-3.png)
Preparation: Delete the record sets for simple routing policy created in previous section. Notice, page won't be accessible(after TTL is past).

Create first record set as follows:
* TTL = 1m
* Value = ip addresses of Sydney instance
* Route policy = Weighted
* Weight = 20
* Set ID = Sydney
![image](/assets/images/note/9551/6-5-weighted-routing-policy-4.png)

Create second record set as follows:
* TTL = 1m
* Value = ip addresses of Ohio instance
* Route policy = Weighted
* Weight = 30
* Set ID = Ohio

Create third record set as follows:
* TTL = 1m
* Value = ip addresses of Ireland instance
* Route policy = Weighted
* Weight = 50
* Set ID = Ireland

Refresh the page, you will get response from Ireland with 50% chance, 30% chance from Ohio and 20% from Sydney.  

Exam tips.
![image](/assets/images/note/9551/6-5-latency-routing-policy-exam-tips-1.png)
![image](/assets/images/note/9551/6-5-latency-routing-policy-exam-tips-2.png)
### 6.6 Latency Routing Policy
![image](/assets/images/note/9551/6-6-latency-routing-policy-1.png)
![image](/assets/images/note/9551/6-6-latency-routing-policy-2.png)
Preparation 1: Delete the record sets for weighted routing policy created in previous section. Notice, page won't be accessible(after TTL is past).

Preparation 2: Create health check, Route53 -> Health checks, create Health Check, Name=Sydney.
![image](/assets/images/note/9551/6-6-create-health-checks-1.png)
Set the ip address of Sydney server and domain for host name. Set path to index.html, click Next.
![image](/assets/images/note/9551/6-6-create-health-checks-2.png)
Create another two health checks for Ohio and Ireland instances. Totally, we have three health checks.
![image](/assets/images/note/9551/6-6-create-health-checks-3.png)

Create first record set as follows:
* TTL = 1m
* Value = ip addresses of Sydney instance
* Route policy = Latency
* Region = ap-southeast-2
* Set ID = Sydney
* Associate with Health check = true
* Health check to associate = The health check of Sydney.
![image](/assets/images/note/9551/6-6-latency-routing-policy-3.png)
* Notice that when input the ip address, region is automatically selected based on the location.

Create second record set as follows:
* TTL = 1m
* Value = ip addresses of Ohio instance
* Route policy = Latency
* Region = us-east-2
* Set ID = Ohio
* Associate with Health check = true
* Health check to associate = The health check of Ohio.

Create second record set as follows:
* TTL = 1m
* Value = ip addresses of Ireland instance
* Route policy = Latency
* Region = eu-west-1
* Set ID = Ireland
* Associate with Health check = true
* Health check to associate = The health check of Ireland.

Refresh the page, it should show in the content fetched from the closest server. Use a VPN tool to change you machines ip to verify that you always get the content from the closest server.
![image](/assets/images/note/9551/6-6-latency-routing-policy-4.png)

### 6.7 Failover Routing Policy
![image](/assets/images/note/9551/6-7-failover-routing-policy-1.png)
![image](/assets/images/note/9551/6-7-failover-routing-policy-2.png)
Preparation: Delete the record sets for latency routing policy created in previous section. Notice, page won't be accessible(after TTL is past).

Create first record set as follows:
* TTL = 1m
* Value = ip addresses of Ireland instance
* Route policy = Failover
* Failover Record Type = Primary
* Set ID = Primary
* Associate with Health check = true
* Health check to associate = The health check of Ireland.
![image](/assets/images/note/9551/6-7-failover-routing-policy-3.png)

Create second record set as follows:
* TTL = 1m
* Value = ip addresses of Ohio instance
* Route policy = Failover
* Failover Record Type = Secondary
* Set ID = Secondary
* Associate with Health check = true
* Health check to associate = The health check of Ohio.

Access the page, we should see the Irish page.
![image](/assets/images/note/9551/6-7-failover-routing-policy-4.png)
Stop the Ireland instance. Go to health check, wait for a while. It becomes unhealthy.
![image](/assets/images/note/9551/6-7-failover-routing-policy-5.png)
Refresh the page, it connects to ohio automatically.
![image](/assets/images/note/9551/6-7-failover-routing-policy-6.png)
Exam tips.
![image](/assets/images/note/9551/6-7-failover-routing-policy-exam-tips.png)
### 6.8 Geolocation Routing Policy
![image](/assets/images/note/9551/6-8-geolocation-routing-policy-1.png)
![image](/assets/images/note/9551/6-8-geolocation-routing-policy-2.png)
![image](/assets/images/note/9551/6-8-geolocation-routing-policy-3.png)

Preparation: Delete the record sets for latency routing policy created in previous section. Notice, page won't be accessible(after TTL is past).

Create first record set as follows:
* TTL = 1m
* Value = ip addresses of Ireland instance
* Route policy = Geolocation
* Location = Europe
* Set ID = Europe
* Associate with Health check = true
* Health check to associate = The health check of Ireland.
![image](/assets/images/note/9551/6-8-geolocation-routing-policy-4.png)

Create second record set as follows:
* TTL = 1m
* Value = ip addresses of Ohio instance
* Route policy = Geolocation
* Location = North America
* Set ID = USA
* Associate with Health check = true
* Health check to associate = The health check of Ohio.

Access the web page, it should return the Irish page. If we change the location to USA using VPN tools, the page will return Ohio.

Exam tips.
![image](/assets/images/note/9551/6-8-geolocation-routing-policy-exam-tips.png)

### 6.9 Geoproximity Routing Policy (Traffic Flow Only)
![image](/assets/images/note/9551/6-9-geoproximity-routing-policy-1.png)
Go to Route53 -> Traffic policies->Create Traffic policy.
![image](/assets/images/note/9551/6-9-geoproximity-routing-policy-2.png)
Set policy name.
![image](/assets/images/note/9551/6-9-geoproximity-routing-policy-3.png)
Customize Geoproximity rules.
![image](/assets/images/note/9551/6-9-geoproximity-routing-policy-4.png)
### 6.10 Multivalue Answer
![image](/assets/images/note/9551/6-10-multivalue-answer-policy-1.png)
![image](/assets/images/note/9551/6-10-multivalue-answer-policy-2.png)
### 6.11 Route53 Summary
![image](/assets/images/note/9551/6-11-dns-summary-1.png)
![image](/assets/images/note/9551/6-11-dns-summary-2.png)
![image](/assets/images/note/9551/6-11-dns-summary-3.png)
![image](/assets/images/note/9551/6-11-dns-summary-4.png)
![image](/assets/images/note/9551/6-11-dns-summary-5.png)
![image](/assets/images/note/9551/6-11-dns-summary-6.png)
![image](/assets/images/note/9551/6-11-dns-summary-7.png)
![image](/assets/images/note/9551/6-11-dns-summary-8.png)
![image](/assets/images/note/9551/6-11-dns-summary-9.png)
![image](/assets/images/note/9551/6-11-dns-summary-10.png)
![image](/assets/images/note/9551/6-11-dns-summary-11.png)
### 6.12 Route 53 Quiz
![image](/assets/images/note/9551/6-12-route53-quiz-1.png)
![image](/assets/images/note/9551/6-12-route53-quiz-2.png)
![image](/assets/images/note/9551/6-12-route53-quiz-3.png)
![image](/assets/images/note/9551/6-12-route53-quiz-4.png)
![image](/assets/images/note/9551/6-12-route53-quiz-5.png)
![image](/assets/images/note/9551/6-12-route53-quiz-6.png)
![image](/assets/images/note/9551/6-12-route53-quiz-7.png)
![image](/assets/images/note/9551/6-12-route53-quiz-8.png)
![image](/assets/images/note/9551/6-12-route53-quiz-9.png)
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


## 8. HA Architecture
### 8.1 Load Balancers Theory
Load balancer types.
![image](/assets/images/note/9551/8-1-load-balancer-1.png)
Application load balancer.
![image](/assets/images/note/9551/8-1-load-balancer-2.png)
Network load balancer.
![image](/assets/images/note/9551/8-1-load-balancer-3.png)
Classic load balancer.
![image](/assets/images/note/9551/8-1-load-balancer-4.png)
![image](/assets/images/note/9551/8-1-load-balancer-5.png)
X-Forwarded-For-Header
![image](/assets/images/note/9551/8-1-load-balancer-6.png)
Exam tips.
![image](/assets/images/note/9551/8-1-load-balancer-exam-tips-1.png)
![image](/assets/images/note/9551/8-1-load-balancer-exam-tips-2.png)
![image](/assets/images/note/9551/8-1-load-balancer-exam-tips-3.png)
### 8.2 Load Balancers And Health Checks Lab
Reminder: Load Balancers are **not** free.

Diagram: Load Balancer & Health Check Architecture
![image](/assets/images/note/9551/8-2-load-balancer-architecture.png)

Lab1: Create two instances with show different web pages, then create classic load balancer.

1) Create first instance with the following bootstrap script, make it showing "This is WebServer 01" in the web page.
```raw
#!/bin/bash
yum update -y
yum install httpd -y
service httpd start
chkconfig httpd on
cd /var/www/html
echo "<html><h1>This is WebServer 01</h1></html>" > index.html
```
Specify the subnet/AZ to 'eu-west-1a'.
![image](/assets/images/note/9551/8-2-classic-load-balancer-1.png)
2) Create second instance with the same bootstrap script, make it showing "This is WebServer 02" in the web page. Specify the subnet/AZ to 'eu-west-1b'. Now, we have two instances running in different AZs.
![image](/assets/images/note/9551/8-2-classic-load-balancer-2.png)
If we access the public id address, we will see the "This is WebServer 01" or "This is WebServer 02" respectively.
![image](/assets/images/note/9551/8-2-classic-load-balancer-3.png)
3) Create new classic load balancer. Services->EC2->Load Balancers, Create Load Balancer, provider name for it.
![image](/assets/images/note/9551/8-2-classic-load-balancer-4.png)
Choose the existing security group.
![image](/assets/images/note/9551/8-2-classic-load-balancer-5.png)
Configure health check.
![image](/assets/images/note/9551/8-2-classic-load-balancer-6.png)
Add two EC2 instances.
![image](/assets/images/note/9551/8-2-classic-load-balancer-7.png)
Keep tag empty and create. The load balancer is created, wait until the status is changed from "OutService" to "InService".
![image](/assets/images/note/9551/8-2-classic-load-balancer-8.png)
Copy the dns name and visit it in web browser.
![image](/assets/images/note/9551/8-2-classic-load-balancer-9.png)
We will see the content. Keep refreshing the page, sometimes we hit WebServer 1 and sometime we hit WebServer 2.
![image](/assets/images/note/9551/8-2-classic-load-balancer-10.png)
Stop the first instance which is Webserver 1.
![image](/assets/images/note/9551/8-2-classic-load-balancer-11.png)
The health check will notice this and the status of web server 1 instance is changed to "OutService".
![image](/assets/images/note/9551/8-2-classic-load-balancer-12.png)
If we refresh the page, we will only see webserver 2, as load balancer detects webserver 1 is not available, it is sending all traffic to web server 2.
![image](/assets/images/note/9551/8-2-classic-load-balancer-13.png)

Lab2: Create target group and application load balancer.

1) Create Target Group: Services->EC2->Target Groups, Create Target Group, provide the group name.
![image](/assets/images/note/9551/8-2-application-load-balancer-1.png)
Set path, threshold, timeout and interval.
![image](/assets/images/note/9551/8-2-application-load-balancer-2.png)
Once the group is created, switch to "Targets" tab, click "Edit" button.
![image](/assets/images/note/9551/8-2-application-load-balancer-3.png)
Add the two web server instances.
![image](/assets/images/note/9551/8-2-application-load-balancer-4.png)
2) Create new application load balancer. Services->EC2->Load Balancers, Create Load Balancer, select Application Load Balancer, provider name for it.
![image](/assets/images/note/9551/8-2-application-load-balancer-5.png)
Select all availability zones, next.
![image](/assets/images/note/9551/8-2-application-load-balancer-6.png)
Skip the warning, next.
![image](/assets/images/note/9551/8-2-application-load-balancer-7.png)
Select the WebDMZ security group, next.
![image](/assets/images/note/9551/8-2-application-load-balancer-8.png)
Select the existing group created in previous lab, next.
![image](/assets/images/note/9551/8-2-application-load-balancer-9.png)
Leave as it is.
![image](/assets/images/note/9551/8-2-application-load-balancer-10.png)
Go back the target group, click Edit.
![image](/assets/images/note/9551/8-2-application-load-balancer-11.png)
Select the two instances and click 'Add to registered'.
![image](/assets/images/note/9551/8-2-application-load-balancer-12.png)
Wait for a while, until the status become 'healthy'.
![image](/assets/images/note/9551/8-2-application-load-balancer-13.png)
Go to the load balancer, copy the dns name, visit it in the web browser.
![image](/assets/images/note/9551/8-2-application-load-balancer-14.png)
We will see the content. Keep refreshing the page, sometimes we hit WebServer 1 and sometime we hit WebServer 2.
![image](/assets/images/note/9551/8-2-application-load-balancer-15.png)
Why application load balancer is more intelligent than classic load balancer? Check the listeners in the load balancer, click on the listener.
![image](/assets/images/note/9551/8-2-application-load-balancer-21.png)
You can create rules with conditions and corresponding actions.
![image](/assets/images/note/9551/8-2-application-load-balancer-22.png)
![image](/assets/images/note/9551/8-2-application-load-balancer-23.png)
Exam tips.
![image](/assets/images/note/9551/8-2-load-balancer-exam-tips-1.png)
![image](/assets/images/note/9551/8-2-load-balancer-exam-tips-2.png)
![image](/assets/images/note/9551/8-2-load-balancer-exam-tips-3.png)
![image](/assets/images/note/9551/8-2-load-balancer-exam-tips-4.png)
### 8.3 Advanced Load Balancer Theory
Sticky sessions.
![image](/assets/images/note/9551/8-3-advanced-load-balancer-1.png)
![image](/assets/images/note/9551/8-3-advanced-load-balancer-2.png)
No Cross Zone load Balancing.
![image](/assets/images/note/9551/8-3-advanced-load-balancer-3.png)
With Cross Zone load Balancing.
![image](/assets/images/note/9551/8-3-advanced-load-balancer-4.png)
![image](/assets/images/note/9551/8-3-advanced-load-balancer-5.png)
Path Patterns.
![image](/assets/images/note/9551/8-3-advanced-load-balancer-6.png)
![image](/assets/images/note/9551/8-3-advanced-load-balancer-7.png)
Exam tips.
![image](/assets/images/note/9551/8-3-advanced-load-balancer-exam-tips.png)
### 8.4 Autoscaling Groups Lab
Create autoscaling group with 3 instances. Create 3 instances and terminate two, after a while, new two instances will be launched automatically.

Create Launch Configuration: Services->EC2->Auto Scaling->Launch Configurations, Create launch configuration.
![image](/assets/images/note/9551/8-4-autoscaling-groups-1.png)
Select the first AMI.
![image](/assets/images/note/9551/8-4-autoscaling-groups-2.png)
Select the free tier one.
![image](/assets/images/note/9551/8-4-autoscaling-groups-3.png)
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
![image](/assets/images/note/9551/8-4-autoscaling-groups-4.png)
Leave unchanged for the storage.
![image](/assets/images/note/9551/8-4-autoscaling-groups-5.png)
Select the WebDMZ security group, next.
![image](/assets/images/note/9551/8-4-autoscaling-groups-6.png)
Click "Create an AutoScaling Group using this launch configuration".
![image](/assets/images/note/9551/8-4-autoscaling-groups-7.png)
Set the group size=3.
![image](/assets/images/note/9551/8-4-autoscaling-groups-8.png)
Set the scale group size.
![image](/assets/images/note/9551/8-4-autoscaling-groups-9.png)
Skip the notification.
![image](/assets/images/note/9551/8-4-autoscaling-groups-10.png)
Set instance tag.
![image](/assets/images/note/9551/8-4-autoscaling-groups-11.png)
The AutoScaling group is created. Three instances are under this group.
![image](/assets/images/note/9551/8-4-autoscaling-groups-12.png)
Go to EC2 instance, we see all instances are up.
![image](/assets/images/note/9551/8-4-autoscaling-groups-13.png)
Terminate two of them.
![image](/assets/images/note/9551/8-4-autoscaling-groups-14.png)
In the Activity history of the AutoScaling group, we can see it detects the termination and launch new instances automatically.
![image](/assets/images/note/9551/8-4-autoscaling-groups-15.png)
After a while, new instances are launched.
![image](/assets/images/note/9551/8-4-autoscaling-groups-16.png)
### 8.5 HA Architecture
![image](/assets/images/note/9551/8-5-ha-architecture-1.png)
![image](/assets/images/note/9551/8-5-ha-architecture-2.png)
* [The Netflix Simian Army](https://medium.com/netflix-techblog/the-netflix-simian-army-16e57fbab116)

![image](/assets/images/note/9551/8-5-ha-architecture-3.png)
![image](/assets/images/note/9551/8-5-ha-architecture-4.png)
![image](/assets/images/note/9551/8-5-ha-architecture-5.png)
### 8.6 HA Word Press Site
The architecture of the wordpress website.
![image](/assets/images/note/9551/8-6-wordpress-1.png)
1) Create two S3 buckets, one for storing codes, another for media files.
![image](/assets/images/note/9551/8-6-wordpress-2.png)
2) Create distribution: Services->Networking & Content Delivery->CloudFront, Create Distribution.
![image](/assets/images/note/9551/8-6-wordpress-3.png)
Choose the **media** bucket for the Origin Domain Name, leave others as default.
![image](/assets/images/note/9551/8-6-wordpress-4.png)
The distribution is created and it takes some time to be ready.
![image](/assets/images/note/9551/8-6-wordpress-5.png)
3) Security Group  
Make sure the WebDMZ group has port 80 opened for all incoming requests.
![image](/assets/images/note/9551/8-6-wordpress-6.png)
And make sure rds group has opened mysql database port to WebDMZ group.
![image](/assets/images/note/9551/8-6-wordpress-7.png)
4) Create MySQL database, Services->RDS->Create Database, choose 'Dev/Test'.  
![image](/assets/images/note/9551/8-6-wordpress-8.png)
Specify db identifier, db name and password.
![image](/assets/images/note/9551/8-6-wordpress-9.png)
Select 't2.micro' for DB instance class, set storage size to 1000GB.
![image](/assets/images/note/9551/8-6-wordpress-10.png)
Enable Multi-AZ.
![image](/assets/images/note/9551/8-6-wordpress-11.png)
Expand 'Additional connectivity configuration', choose the 'rds-launch-wizard' as the security group.
![image](/assets/images/note/9551/8-6-wordpress-12.png)
Specify the initial database name, so that a new database will be created once the rds instance is launched.
![image](/assets/images/note/9551/8-6-wordpress-13.png)
MySQL instance is created.
![image](/assets/images/note/9551/8-6-wordpress-14.png)
5) Create new Role, Services->IAM->Roles->Create Role, choose EC2.
![image](/assets/images/note/9551/8-6-wordpress-15.png)
Search 's3', choose 'AmazonS3FullAccess'.
![image](/assets/images/note/9551/8-6-wordpress-16.png)
Skip the tag, provide the name for the new role.
![image](/assets/images/note/9551/8-6-wordpress-17.png)
6) Create EC2 instance.  
In 'Configure Instance' step, leave others unchanged, just change the role with the one we just created, S3ForWP. And paste the bootstrap script to user data.
```raw
#!/bin/bash
yum update -y
yum install httpd php php-mysql -y
cd /var/www/html
echo "healthy" > healthy.html
wget https://wordpress.org/wordpress-5.1.1.tar.gz
tar -xzf wordpress-5.1.1.tar.gz
cp -r wordpress/* /var/www/html/
rm -rf wordpress
rm -rf wordpress-5.1.1.tar.gz
chmod -R 755 wp-content
chown -R apache:apache wp-content
wget https://s3.amazonaws.com/bucketforwordpresslab-donotdelete/htaccess.txt
mv htaccess.txt .htaccess
chkconfig httpd on
service httpd start
```
![image](/assets/images/note/9551/8-6-wordpress-18.png)
Set Tag.
![image](/assets/images/note/9551/8-6-wordpress-19.png)
Select the WebDMZ security group, launch instance.
![image](/assets/images/note/9551/8-6-wordpress-20.png)
Lab problem.
![image](/assets/images/note/9551/8-6-wordpress-lab-problem.png)
### 8.7 Setting Up EC2
1) Preparation:  
Check that FrontCloud Distribution created in previous lab is enabled and deployed.
![image](/assets/images/note/9551/8-7-wordpress-1.png)
The RDS(MySQL) is also available.
![image](/assets/images/note/9551/8-7-wordpress-2.png)
EC2 Instance is up now, copy the public ip address.
![image](/assets/images/note/9551/8-7-wordpress-3.png)
ssh to the web server instance, navigate to /var/www/html directory, check if all wp files are there.
![image](/assets/images/note/9551/8-7-wordpress-4.png)
Also check if htaccess is configured.
```raw
cat .htaccess
```
![image](/assets/images/note/9551/8-7-wordpress-5.png)
2) Launch WordPress and create a new post with images.  
Start the apache server and visit the ip address in web browser, wordpress is started.
![image](/assets/images/note/9551/8-7-wordpress-6.png)
Setup wordpress, the database host is the endpoint of the MySQL instance.
![image](/assets/images/note/9551/8-7-wordpress-7.png)
Error occurs: can’t write the wp-config.php file.
![image](/assets/images/note/9551/8-7-wordpress-8.png)
Copy the script, then ssh to the web server. Create a file named wp-config.php in folder /var/www/html with the script. Refresh the page, you should see the wordpress configuration page successfully. Put the required information here, click "Install WordPress".
![image](/assets/images/note/9551/8-7-wordpress-9.png)
WordPress is installed successfully.
![image](/assets/images/note/9551/8-7-wordpress-10.png)
Login with acloudgur/acloudguru.
![image](/assets/images/note/9551/8-7-wordpress-11.png)
Home page of WordPress.
![image](/assets/images/note/9551/8-7-wordpress-12.png)
Create a new post with two images.
![image](/assets/images/note/9551/8-7-wordpress-13.png)
Click publish, new the post is published and we are able to view it.
![image](/assets/images/note/9551/8-7-wordpress-14.png)
In the web server, we will see the upload folder with two image files.
![image](/assets/images/note/9551/8-7-wordpress-15.png)
3) Next, we want each time user uploads the images, they can be replicated to S3 automatically.

Use `aws s3 ls` to show the existing buckets in s3. Use `aws s3 cp` command to copy files from web server to s3 **media** buckets.
![image](/assets/images/note/9551/8-7-wordpress-16.png)
Moreover, use `aws s3 cp` to copy the entire wordpress files into s3 **code** bucket.
![image](/assets/images/note/9551/8-7-wordpress-17.png)
Use `aws s3 ls` to check all files are copied to s3 bucket.
![image](/assets/images/note/9551/8-7-wordpress-18.png)
4) Setup redirect, whenever user accesses the post, all the image requests will be redirected to s3.  
Get the domain name of the cloudfront distribution.
![image](/assets/images/note/9551/8-7-wordpress-19.png)
Edit the '.htaccess' file.
![image](/assets/images/note/9551/8-7-wordpress-20.png)
Update the `rewriterrule` with the domain name of cloudfront distribution, which is pointing to s3.
![image](/assets/images/note/9551/8-7-wordpress-21.png)
Use `aws s3 sync` to sync the changed files from web server to s3 buckets. This time, only the '.htaccess' file is synced.
![image](/assets/images/note/9551/8-7-wordpress-22.png)
Edit file `/etc/httpd/conf/httpd.conf`.
![image](/assets/images/note/9551/8-7-wordpress-23.png)
Change the value of `AllowOverride` from None to All.
![image](/assets/images/note/9551/8-7-wordpress-24.png)
Run `service httpd restart` to restart apache.
5) Update bucket policy for **media** bucket.  
Paste the following script into Bucket Policy, replace the arn.
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": [
        "s3:GetObject"
        ],
      "Resource": [
        "arn:aws:s3:::BUCKET_NAME/*"
        ]
    }
  ]
}
```
![image](/assets/images/note/9551/8-7-wordpress-25.png)
After clicking "Save" button, both permission and bucket policy are marked as public.
![image](/assets/images/note/9551/8-7-wordpress-26.png)
If you encounter any error, select the s3 bucket, click "Edit public access settings".
![image](/assets/images/note/9551/8-7-wordpress-27.png)
Make sure none of the options are checked, and save.
![image](/assets/images/note/9551/8-7-wordpress-28.png)
Wait for a while, revisit the post, the image should be fetched from the cloudfront, which is pointing to s3 media bucket.
![image](/assets/images/note/9551/8-7-wordpress-29.png)
5) Create new application load balancer.  
Put the name.
![image](/assets/images/note/9551/8-7-wordpress-30.png)
Select all available AZs.
![image](/assets/images/note/9551/8-7-wordpress-31.png)
Select the WebDMZ security group.
![image](/assets/images/note/9551/8-7-wordpress-32.png)
Create a new target group, set path to healthy.html.
![image](/assets/images/note/9551/8-7-wordpress-33.png)
Choose the instance, then create.
![image](/assets/images/note/9551/8-7-wordpress-34.png)
Load balancer is created, wait for few minutes, the status is changed to 'active'.
![image](/assets/images/note/9551/8-7-wordpress-35.png)
6) Optional step, domain name, Services->Route 53->Hosted Zone.
![image](/assets/images/note/9551/8-7-wordpress-36.png)
Select the existing domain, click 'Create Record Sets'.
![image](/assets/images/note/9551/8-7-wordpress-37.png)
Choose 'Alias'=Yes, Alias Target = application load balancer.
![image](/assets/images/note/9551/8-7-wordpress-38.png)
Now the dns is pointing to the load balancer.
![image](/assets/images/note/9551/8-7-wordpress-39.png)
7) Target Group. Add instance into target group.

Services->EC2->Target Group, select the target group, click Edit button in Targets tab.
![image](/assets/images/note/9551/8-7-wordpress-40.png)
Select the instance and click 'Add to registered'.
![image](/assets/images/note/9551/8-7-wordpress-41.png)
Wait for a while, the status becomes healthy.
![image](/assets/images/note/9551/8-7-wordpress-42.png)
Visit the domain, we should see the post.
![image](/assets/images/note/9551/8-7-wordpress-43.png)
### 8.8 Adding Resilience And Autoscaling
![image](/assets/images/note/9551/8-8-resilience-autoscaling-1.png)
Lab: The left node will be used for writing only and all the read request will be sent to the right node, which is a replica of the left.

1) Automate files synchronization from web server to s3 bucket.  
Create file named `crontab` in `/etc` directory.
```raw
cd /etc
nano crontab
```
Put the following content into it. The sync happens in every minute.
```raw
*/1 * * * * root aws s3 sync --delete s3://acloudguruwp-code-rjk19 /var/www/html
```
![image](/assets/images/note/9551/8-8-resilience-autoscaling-2.png)

Run following command to start the `cront` service.
```raw
service cront restart
```
![image](/assets/images/note/9551/8-8-resilience-autoscaling-3.png)
Test this by uploading a file into the **code** bucket.
![image](/assets/images/note/9551/8-8-resilience-autoscaling-4.png)
Restart the cront service, find the file in /etc/www/html directory.
![image](/assets/images/note/9551/8-8-resilience-autoscaling-5.png)
2) Setup the read replica and put it behind the load balancer.  
Select the WordPress EC2 instance, Actions->Image->Create Image.
![image](/assets/images/note/9551/8-8-read-replica-1.png)
Set the name and description, create image.
![image](/assets/images/note/9551/8-8-read-replica-2.png)
The EC2 instance will reboot and an AMI is create.
![image](/assets/images/note/9551/8-8-read-replica-3.png)

3) Update crontab configuration in the first WP instance, which will be used as write node.
```raw
*/1 * * * * root aws s3 sync --delete /var/www/html s3://acloudguruwp-code-rjk19
*/1 * * * * root aws s3 sync --delete /var/www/html/wp-content/uploads/ s3://acloudguruwp-media-rjk19
```
* Be aware of that this web server a writing node.
* The first rule: sync all files from write instance to **code** bucket.
* The second rule: sync all uploaded images from write instance to **media** bucket.

![image](/assets/images/note/9551/8-8-read-replica-4.png)
Testing the settings. Create a file named test.txt in the /var/www/html directory and restart the cront service.
![image](/assets/images/note/9551/8-8-read-replica-5.png)
Go to the s3 **code** bucket, test.txt is there. You may not be able to see it immediately due to the eventual consistency.
![image](/assets/images/note/9551/8-8-read-replica-6.png)
4) Launch new instance for read node.  
Create auto scaling group, Services->EC2->Auto Scaling Group.
![image](/assets/images/note/9551/8-8-launch-read-replica-1.png)
Select the option 'Create a new launch configuration'.
![image](/assets/images/note/9551/8-8-launch-read-replica-2.png)
Select the own AMI image.
![image](/assets/images/note/9551/8-8-launch-read-replica-3.png)

Set name, choose IAM role and put the bootstrap script into user data.
```raw
#!/bin/bash
yum update -y
aws s3 sync --delete s3://YOUR_S3_BUCKET_NAME /var/www/html
```
![image](/assets/images/note/9551/8-8-launch-read-replica-4.png)
Keep the default values for storage.
![image](/assets/images/note/9551/8-8-launch-read-replica-5.png)
Select the WebDMZ security group.
![image](/assets/images/note/9551/8-8-launch-read-replica-6.png)
After clicking the launch instance, you will see the 'configure autoscaling group' page. Set name, select all available AZs.
![image](/assets/images/note/9551/8-8-launch-read-replica-7.png)
Choose the Target Group and set the grace period to 60 seconds, next.
![image](/assets/images/note/9551/8-8-launch-read-replica-8.png)
Leave as it is.
![image](/assets/images/note/9551/8-8-launch-read-replica-9.png)
Skip the notification, set instance tag.
![image](/assets/images/note/9551/8-8-launch-read-replica-10.png)
Review, create auto scaling group.
![image](/assets/images/note/9551/8-8-launch-read-replica-11.png)
5) Remove the write node from the target group. Select the target group, click edit button.
![image](/assets/images/note/9551/8-8-launch-read-replica-12.png)
Select the instance, click remove button.
![image](/assets/images/note/9551/8-8-launch-read-replica-13.png)
Now we see the two read nodes.
![image](/assets/images/note/9551/8-8-launch-read-replica-14.png)
Rename the write node to MyWP-WN to make more clear.
![image](/assets/images/note/9551/8-8-launch-read-replica-15.png)
Check the target group, both two read nodes are healthy.
![image](/assets/images/note/9551/8-8-launch-read-replica-16.png)
6) Testing  
Visit the site with the domain name, it should return the images from s3 bucket.
![image](/assets/images/note/9551/8-8-read-replica-testing-1.png)
Visit the admin page of wordpress, http://domain/wp-admin/, input user name and password.
![image](/assets/images/note/9551/8-8-read-replica-testing-2.png)
Now we are in the admin page. Notice that the domain is an ip address, which is write's node public ip.
![image](/assets/images/note/9551/8-8-read-replica-testing-3.png)
Create a new post with uploading a picture.
![image](/assets/images/note/9551/8-8-read-replica-testing-4.png)
The image is not showing properly. This is because the image is not propagated from s3 bucket yet.
![image](/assets/images/note/9551/8-8-read-replica-testing-5.png)
Publish the post and wait for few minutes. Refresh the page, we should be able to see the image.
![image](/assets/images/note/9551/8-8-read-replica-testing-6.png)
If we visit the frontend, we should see the new post with image propagated properly.
![image](/assets/images/note/9551/8-8-read-replica-testing-7.png)
If we copy the image url and view it in browser, we should see it is from the cloudfront, from s3 bucket.
![image](/assets/images/note/9551/8-8-read-replica-testing-8.png)
7) Test High Availability.  
Terminate one of the read node.
![image](/assets/images/note/9551/8-8-testing-availability-1.png)
Check the target group, there is only one healthy instance. If we visit the site, it is still responsive, though there may be some latency.
![image](/assets/images/note/9551/8-8-testing-availability-2.png)
Check the auto scaling group, check the history, it detects the unhealthy occurrence.
![image](/assets/images/note/9551/8-8-testing-availability-3.png)
New instance will be launched automatically.
![image](/assets/images/note/9551/8-8-testing-availability-4.png)
Check the target group, wait until the healthy node comes back. Again, we have to healthy read nodes.
![image](/assets/images/note/9551/8-8-testing-availability-5.png)
Refresh the site, it is still running properly. We have auto healing system!
![image](/assets/images/note/9551/8-8-testing-availability-6.png)

### 8.9 Cleaning Up
Lab: RDS failover, High availability of database.  

Reboot the database.
![image](/assets/images/note/9551/8-9-rds-failover-1.png)
Select the "Reboot With Failover" option. The database will be failed over from one availability zone to another.
![image](/assets/images/note/9551/8-9-rds-failover-2.png)
The database will be rebooted.
![image](/assets/images/note/9551/8-9-rds-failover-3.png)
The website will not be accessible, 504 error is returned.
![image](/assets/images/note/9551/8-9-rds-failover-4.png)
Once the database comes back, our site will work again.
![image](/assets/images/note/9551/8-9-rds-failover-5.png)
![image](/assets/images/note/9551/8-9-rds-failover-6.png)
Delete all assets, instance, database, buckets, etc for clean up.
### 8.10 CloudFormation
Create cloudformation, Services->Management & Governance->CloudFormation, create stack.
![image](/assets/images/note/9551/8-10-cloudformation-1.png)
Choose 'Use a sample template' option, and select WordPress blog template.
![image](/assets/images/note/9551/8-10-cloudformation-2.png)
Set name and database parameters.
![image](/assets/images/note/9551/8-10-cloudformation-3.png)
Add tag, next, review and create.
![image](/assets/images/note/9551/8-10-cloudformation-4.png)
It is created.
![image](/assets/images/note/9551/8-10-cloudformation-5.png)
Wait for a while, the creation is completed. We see some web servers and security groups are created.
![image](/assets/images/note/9551/8-10-cloudformation-6.png)
Switch to the Outputs tab, hit the link.
![image](/assets/images/note/9551/8-10-cloudformation-7.png)
We should see the word press configuration page. WordPress site is ready to use.
![image](/assets/images/note/9551/8-10-cloudformation-8.png)
Switch to Resources tab. Notice that only web server and security group are created. There is no RDS is created. You can confirm this by going to RDS to see if there is any new instance is launched.
![image](/assets/images/note/9551/8-10-cloudformation-9.png)
Only one EC2 instance we can find.
![image](/assets/images/note/9551/8-10-cloudformation-10.png)
* Visit https://aws.amazon.com/quickstart/?quick to see available templates.

Exam tips.
![image](/assets/images/note/9551/8-10-cloudformation-exam-tips.png)
### 8.11 Elastic Beanstalk
Create Elastic Beanstalk, Services->Compute->Elastic Beanstalk.
![image](/assets/images/note/9551/8-11-elastic-beanstalk-1.png)
![image](/assets/images/note/9551/8-11-elastic-beanstalk-2.png)
![image](/assets/images/note/9551/8-11-elastic-beanstalk-3.png)
![image](/assets/images/note/9551/8-11-elastic-beanstalk-4.png)
![image](/assets/images/note/9551/8-11-elastic-beanstalk-5.png)
![image](/assets/images/note/9551/8-11-elastic-beanstalk-6.png)
Instance is auto generated.
![image](/assets/images/note/9551/8-11-elastic-beanstalk-7.png)
Test the web page.
![image](/assets/images/note/9551/8-11-elastic-beanstalk-8.png)
Exam tips.
![image](/assets/images/note/9551/8-11-elastic-beanstalk-exam-tips.png)
### 8.12 HA Summary
![image](/assets/images/note/9551/8-12-ha-summary-1.png)
![image](/assets/images/note/9551/8-12-ha-summary-2.png)
![image](/assets/images/note/9551/8-12-ha-summary-3.png)
![image](/assets/images/note/9551/8-12-ha-summary-4.png)
![image](/assets/images/note/9551/8-12-ha-summary-5.png)
![image](/assets/images/note/9551/8-12-ha-summary-6.png)
![image](/assets/images/note/9551/8-12-ha-summary-7.png)
### 8.13 HA Architecture Quiz
![image](/assets/images/note/9551/8-13-ha-quiz-1.png)
![image](/assets/images/note/9551/8-13-ha-quiz-2.png)
![image](/assets/images/note/9551/8-13-ha-quiz-3.png)
![image](/assets/images/note/9551/8-13-ha-quiz-4.png)
![image](/assets/images/note/9551/8-13-ha-quiz-5.png)
![image](/assets/images/note/9551/8-13-ha-quiz-6.png)
![image](/assets/images/note/9551/8-13-ha-quiz-7.png)
![image](/assets/images/note/9551/8-13-ha-quiz-8.png)
![image](/assets/images/note/9551/8-13-ha-quiz-9.png)
![image](/assets/images/note/9551/8-13-ha-quiz-10.png)
![image](/assets/images/note/9551/8-13-ha-quiz-11.png)
![image](/assets/images/note/9551/8-13-ha-quiz-12.png)
![image](/assets/images/note/9551/8-13-ha-quiz-13.png)
![image](/assets/images/note/9551/8-13-ha-quiz-14.png)
![image](/assets/images/note/9551/8-13-ha-quiz-15.png)
![image](/assets/images/note/9551/8-13-ha-quiz-16.png)
## 9. Applications
### 9.1 SQS
![image](/assets/images/note/9551/9-1-sqs-1.png)
Usage - Meme website.
![image](/assets/images/note/9551/9-1-sqs-2.png)
Usage - Travel website.
![image](/assets/images/note/9551/9-1-sqs-3.png)
![image](/assets/images/note/9551/9-1-sqs-4.png)
![image](/assets/images/note/9551/9-1-sqs-5.png)
Queue types.
![image](/assets/images/note/9551/9-1-sqs-6.png)
Standard queue.
![image](/assets/images/note/9551/9-1-sqs-7.png)
FIFO queue.
![image](/assets/images/note/9551/9-1-sqs-8.png)
![image](/assets/images/note/9551/9-1-sqs-9.png)
Exam tips.
![image](/assets/images/note/9551/9-1-sqs-exam-tips-1.png)
![image](/assets/images/note/9551/9-1-sqs-exam-tips-2.png)
![image](/assets/images/note/9551/9-1-sqs-exam-tips-3.png)
### 9.2 SWF
![image](/assets/images/note/9551/9-2-swf-1.png)
SWF tasks.
![image](/assets/images/note/9551/9-2-swf-2.png)
SWF vs. SQS
![image](/assets/images/note/9551/9-2-swf-3.png)
SWF Actors.
![image](/assets/images/note/9551/9-2-swf-4.png)
### 9.3 SNS
![image](/assets/images/note/9551/9-3-sns-1.png)
![image](/assets/images/note/9551/9-3-sns-2.png)
Topics.
![image](/assets/images/note/9551/9-3-sns-3.png)
SNS Availability.
![image](/assets/images/note/9551/9-3-sns-4.png)
SNS Benefits.
![image](/assets/images/note/9551/9-3-sns-5.png)
SNS vs. SQS
![image](/assets/images/note/9551/9-3-sns-6.png)
### 9.4 Elastic Transcoder
![image](/assets/images/note/9551/9-4-elastic-transcoder-1.png)
![image](/assets/images/note/9551/9-4-elastic-transcoder-2.png)
![image](/assets/images/note/9551/9-4-elastic-transcoder-3.png)
### 9.5 API Gateway
![image](/assets/images/note/9551/9-5-api-gateway-1.png)
![image](/assets/images/note/9551/9-5-api-gateway-2.png)
How API Gateway works?
![image](/assets/images/note/9551/9-5-api-gateway-3.png)
API Gateway Options.
![image](/assets/images/note/9551/9-5-api-gateway-4.png)
API Gateway Configuration.
![image](/assets/images/note/9551/9-5-api-gateway-5.png)
API Gateway Deployment.
![image](/assets/images/note/9551/9-5-api-gateway-6.png)
API Gateway Caching.
![image](/assets/images/note/9551/9-5-api-gateway-7.png)
How cache works?
![image](/assets/images/note/9551/9-5-api-gateway-8.png)
Same origin policy. Cross-site-scripting(XSS).
![image](/assets/images/note/9551/9-5-api-gateway-9.png)
CORS.
![image](/assets/images/note/9551/9-5-api-gateway-10.png)
![image](/assets/images/note/9551/9-5-api-gateway-11.png)
Exam tips.
![image](/assets/images/note/9551/9-5-api-gateway-exam-tips.png)
### 9.6 Kinesis
Streaming data.
![image](/assets/images/note/9551/9-6-kinesis-1.png)
Kinesis.
![image](/assets/images/note/9551/9-6-kinesis-2.png)
Types of kinesis.
![image](/assets/images/note/9551/9-6-kinesis-3.png)
Kinesis streaming.
![image](/assets/images/note/9551/9-6-kinesis-4.png)
Kinesis streaming shards.
![image](/assets/images/note/9551/9-6-kinesis-5.png)
Kinesis firehose. Data can be exported to S3, Redfhift or ElasticSearch.
![image](/assets/images/note/9551/9-6-kinesis-6.png)
![image](/assets/images/note/9551/9-6-kinesis-7.png)
Kinesis Analytics.
![image](/assets/images/note/9551/9-6-kinesis-8.png)
Exam tips.
![image](/assets/images/note/9551/9-6-kinesis-exam-tips.png)
### 9.7 Web Identity Federation & Cognito
Web Identity Federation.
![image](/assets/images/note/9551/9-7-wif-1.png)
Cognito.
![image](/assets/images/note/9551/9-7-wif-2.png)
Cognito Use case.
![image](/assets/images/note/9551/9-7-wif-3.png)
![image](/assets/images/note/9551/9-7-wif-4.png)
Cognito User Pools.
![image](/assets/images/note/9551/9-7-wif-5.png)
Cognito Identity Pools.
![image](/assets/images/note/9551/9-7-wif-6.png)
How they work?
![image](/assets/images/note/9551/9-7-wif-7.png)
Cognito Synchronization.
![image](/assets/images/note/9551/9-7-wif-8.png)
How Synchronization works?
![image](/assets/images/note/9551/9-7-wif-9.png)
Cognito exam tips.
![image](/assets/images/note/9551/9-7-wif-exam-tips-1.png)
![image](/assets/images/note/9551/9-7-wif-exam-tips-2.png)
### 9.8 Summary
![image](/assets/images/note/9551/9-8-summary-1.png)
![image](/assets/images/note/9551/9-8-summary-2.png)
![image](/assets/images/note/9551/9-8-summary-3.png)
![image](/assets/images/note/9551/9-8-summary-4.png)
![image](/assets/images/note/9551/9-8-summary-5.png)
![image](/assets/images/note/9551/9-8-summary-6.png)
![image](/assets/images/note/9551/9-8-summary-7.png)
![image](/assets/images/note/9551/9-8-summary-8.png)
![image](/assets/images/note/9551/9-8-summary-9.png)
![image](/assets/images/note/9551/9-8-summary-10.png)
![image](/assets/images/note/9551/9-8-summary-11.png)
![image](/assets/images/note/9551/9-8-summary-12.png)
### 9.9 Applications Quiz
![image](/assets/images/note/9551/9-9-application-quiz-1.png)
![image](/assets/images/note/9551/9-9-application-quiz-2.png)
![image](/assets/images/note/9551/9-9-application-quiz-3.png)
![image](/assets/images/note/9551/9-9-application-quiz-4.png)
![image](/assets/images/note/9551/9-9-application-quiz-5.png)
![image](/assets/images/note/9551/9-9-application-quiz-6.png)
![image](/assets/images/note/9551/9-9-application-quiz-7.png)
![image](/assets/images/note/9551/9-9-application-quiz-8.png)
![image](/assets/images/note/9551/9-9-application-quiz-9.png)
![image](/assets/images/note/9551/9-9-application-quiz-10.png)
![image](/assets/images/note/9551/9-9-application-quiz-11.png)
## 10. Serverless
### 10.1 Lambda Concepts
History of cloud: Data center->IAAS->PAAS->Containers->Serverless.
![image](/assets/images/note/9551/10-1-lambda-1.png)
Lamda.
![image](/assets/images/note/9551/10-1-lambda-2.png)
![image](/assets/images/note/9551/10-1-lambda-3.png)
![image](/assets/images/note/9551/10-1-lambda-4.png)
Lamda usage cases.
![image](/assets/images/note/9551/10-1-lambda-5.png)
![image](/assets/images/note/9551/10-1-lambda-6.png)
Traditional vs. Serverless Architecture
![image](/assets/images/note/9551/10-1-lambda-7.png)
What languages does lamda support?
![image](/assets/images/note/9551/10-1-lambda-8.png)
How lamda is priced?
![image](/assets/images/note/9551/10-1-lambda-9.png)
Why lamda is cool?
![image](/assets/images/note/9551/10-1-lambda-10.png)
Lamda exam tips.
![image](/assets/images/note/9551/10-1-lambda-exam-tips-1.png)
![image](/assets/images/note/9551/10-1-lambda-exam-tips-2.png)
### 10.2 Let's Build A Serverless Webpage
![image](/assets/images/note/9551/10-2-build-serverless-1.png)
Services->Compute->Lambda, create a function.
![image](/assets/images/note/9551/10-2-build-serverless-2.png)
Set name, choose python 3.6 for runtime.
![image](/assets/images/note/9551/10-2-build-serverless-3.png)
Create a new role and select 'Simple microservice permissions' policy template, Create Function.
![image](/assets/images/note/9551/10-2-build-serverless-4.png)
Lambda function is created.
![image](/assets/images/note/9551/10-2-build-serverless-5.png)
Scroll down and copy the python code to the function code editor, save the change.
```python
def lambda_handler(event, context):
    print("In lambda handler")

    resp = {
        "statusCode": 200,
        "headers": {
            "Access-Control-Allow-Origin": "*",
        },
        "body": "Johnny"
    }

    return resp
```
![image](/assets/images/note/9551/10-2-build-serverless-6.png)
Scroll down and set the description.
![image](/assets/images/note/9551/10-2-build-serverless-7.png)
Scroll up, select the 'API Gateway' trigger.
![image](/assets/images/note/9551/10-2-build-serverless-8.png)
Create a new api and select AWS IAM as the security mechanism. Click add and save.
![image](/assets/images/note/9551/10-2-build-serverless-9.png)
The API Gateway trigger is created.
![image](/assets/images/note/9551/10-2-build-serverless-10.png)
Hit the name of the gateway "MyFirstLambdaFunction-API".
![image](/assets/images/note/9551/10-2-build-serverless-11.png)
Delete the existing ANY method and create a new get method.
![image](/assets/images/note/9551/10-2-build-serverless-12.png)
Then deploy this api.
![image](/assets/images/note/9551/10-2-build-serverless-13.png)
Expand the get method, click the invoke url. It should return "Johnny", which is defined in the python script.
![image](/assets/images/note/9551/10-2-build-serverless-14.png)

Now, our lambda function is working. We will create a web page to call this function.

Replace YOUR-API-GATEWAY-LINK-HERE with the invoke URL in the index.html.
```html
<html>
<script>

function myFunction() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        document.getElementById("my-demo").innerHTML = this.responseText;
        }
    };
    xhttp.open("GET", "YOUR-API-GATEWAY-LINK-HERE", true);
    xhttp.send();

}

</script>
<body><div align="center"><br><br><br><br>
<h1>Hello <span id="my-demo">Cloud Gurus!</span></h1>
<button onclick="myFunction()">Click me</button><br>
<img src="https://s3.amazonaws.com/acloudguru-opsworkslab-donotdelete/ACG_Austin.JPG"></div>
</body>
</html>
```
Create a s3 bucket.
![image](/assets/images/note/9551/10-2-build-serverless-15.png)
Notice the bucket is not public.
![image](/assets/images/note/9551/10-2-build-serverless-16.png)
Select the bucket, click "Edit public access settings", clear all checks, save.
![image](/assets/images/note/9551/10-2-build-serverless-17.png)
Switch to Properties tab, choose "Static website hosting".
![image](/assets/images/note/9551/10-2-build-serverless-18.png)
Choose the "Use this bucket to host a website" option, set the index document and error document.
![image](/assets/images/note/9551/10-2-build-serverless-19.png)
error.html.
```html
<html><body><h1>There has been an error!</h1></body></html>
```
Bucket hosting is setup.
![image](/assets/images/note/9551/10-2-build-serverless-20.png)
Upload the two html files into the bucket and make them public.
![image](/assets/images/note/9551/10-2-build-serverless-21.png)
Access the link of index.html in web browser. We should see the page.
![image](/assets/images/note/9551/10-2-build-serverless-22.png)
Click on the button, the title will be changed.
![image](/assets/images/note/9551/10-2-build-serverless-23.png)
Further more, you can bind your domain name to the s3 bucket by creating an A Record.
![image](/assets/images/note/9551/10-2-build-serverless-24.png)
Now, when we visit the domain, it shows the same content.
![image](/assets/images/note/9551/10-2-build-serverless-25.png)
* Wait for a while if you see a blank page as dns takes some time to work.

Architecture of Lambda.
![image](/assets/images/note/9551/10-3-serverless-diagram.png)
### 10.3 Let's Build An Alexa Skill
TODO lab: Alexa.
### 10.4 Summary
![image](/assets/images/note/9551/10-4-lamda-summary-1.png)
![image](/assets/images/note/9551/10-4-lamda-summary-2.png)
![image](/assets/images/note/9551/10-4-lamda-summary-3.png)
### 10.5 Serverless Quiz
![image](/assets/images/note/9551/10-5-serverless-quiz-1.png)
![image](/assets/images/note/9551/10-5-serverless-quiz-2.png)
![image](/assets/images/note/9551/10-5-serverless-quiz-3.png)
![image](/assets/images/note/9551/10-5-serverless-quiz-4.png)
![image](/assets/images/note/9551/10-5-serverless-quiz-5.png)
![image](/assets/images/note/9551/10-5-serverless-quiz-6.png)
![image](/assets/images/note/9551/10-5-serverless-quiz-7.png)
![image](/assets/images/note/9551/10-5-serverless-quiz-8.png)
![image](/assets/images/note/9551/10-5-serverless-quiz-9.png)



## 9. References
