---
layout: tutorial
key: cloud
title: "AWS-VPC-Access Control Lists"
index: 4163
subcategory: amazon-aws
date: 2019-09-16
tags: [AWS, VPC, ACL]
---

> Using VPC to setup cloud network.

## 1. Access Control Lists (ACL)
### 1.1 ACL
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

## 9. References
* [Amazon Virtual Private Cloud](https://aws.amazon.com/vpc/)
* [Amazon VPC User Guide](https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html)
* [VPC - NAT](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat.html)
