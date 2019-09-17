---
layout: tutorial
key: note
title: "AWS - Certified Solutions Architect Associate 3 - draft"
index: 9162
subcategory: notes
date: 2017-08-04
tags: [AWS]
draft: true
---

> AWS Certified Solutions Architect Associate 2019

## 8. HA Architecture
### 8.1 Load Balancers Theory
Load balancer types.
![image](/public/images/note/9160/8-1-load-balancer-1.png)
Application load balancer.
![image](/public/images/note/9160/8-1-load-balancer-2.png)
Network load balancer.
![image](/public/images/note/9160/8-1-load-balancer-3.png)
Classic load balancer.
![image](/public/images/note/9160/8-1-load-balancer-4.png)
![image](/public/images/note/9160/8-1-load-balancer-5.png)
X-Forwarded-For-Header
![image](/public/images/note/9160/8-1-load-balancer-6.png)
Exam tips.
![image](/public/images/note/9160/8-1-load-balancer-exam-tips-1.png)
![image](/public/images/note/9160/8-1-load-balancer-exam-tips-2.png)
![image](/public/images/note/9160/8-1-load-balancer-exam-tips-3.png)
### 8.2 Load Balancers And Health Checks Lab
Reminder: Load Balancers are **not** free.

Diagram: Load Balancer & Health Check Architecture
![image](/public/images/note/9160/8-2-load-balancer-architecture.png)

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
![image](/public/images/note/9160/8-2-classic-load-balancer-1.png)
2) Create second instance with the same bootstrap script, make it showing "This is WebServer 02" in the web page. Specify the subnet/AZ to 'eu-west-1b'. Now, we have two instances running in different AZs.
![image](/public/images/note/9160/8-2-classic-load-balancer-2.png)
If we access the public id address, we will see the "This is WebServer 01" or "This is WebServer 02" respectively.
![image](/public/images/note/9160/8-2-classic-load-balancer-3.png)
3) Create new classic load balancer. Services->EC2->Load Balancers, Create Load Balancer, provider name for it.
![image](/public/images/note/9160/8-2-classic-load-balancer-4.png)
Choose the existing security group.
![image](/public/images/note/9160/8-2-classic-load-balancer-5.png)
Configure health check.
![image](/public/images/note/9160/8-2-classic-load-balancer-6.png)
Add two EC2 instances.
![image](/public/images/note/9160/8-2-classic-load-balancer-7.png)
Keep tag empty and create. The load balancer is created, wait until the status is changed from "OutService" to "InService".
![image](/public/images/note/9160/8-2-classic-load-balancer-8.png)
Copy the dns name and visit it in web browser.
![image](/public/images/note/9160/8-2-classic-load-balancer-9.png)
We will see the content. Keep refreshing the page, sometimes we hit WebServer 1 and sometime we hit WebServer 2.
![image](/public/images/note/9160/8-2-classic-load-balancer-10.png)
Stop the first instance which is Webserver 1.
![image](/public/images/note/9160/8-2-classic-load-balancer-11.png)
The health check will notice this and the status of web server 1 instance is changed to "OutService".
![image](/public/images/note/9160/8-2-classic-load-balancer-12.png)
If we refresh the page, we will only see webserver 2, as load balancer detects webserver 1 is not available, it is sending all traffic to web server 2.
![image](/public/images/note/9160/8-2-classic-load-balancer-13.png)

Lab2: Create target group and application load balancer.

1) Create Target Group: Services->EC2->Target Groups, Create Target Group, provide the group name.
![image](/public/images/note/9160/8-2-application-load-balancer-1.png)
Set path, threshold, timeout and interval.
![image](/public/images/note/9160/8-2-application-load-balancer-2.png)
Once the group is created, switch to "Targets" tab, click "Edit" button.
![image](/public/images/note/9160/8-2-application-load-balancer-3.png)
Add the two web server instances.
![image](/public/images/note/9160/8-2-application-load-balancer-4.png)
2) Create new application load balancer. Services->EC2->Load Balancers, Create Load Balancer, select Application Load Balancer, provider name for it.
![image](/public/images/note/9160/8-2-application-load-balancer-5.png)
Select all availability zones, next.
![image](/public/images/note/9160/8-2-application-load-balancer-6.png)
Skip the warning, next.
![image](/public/images/note/9160/8-2-application-load-balancer-7.png)
Select the WebDMZ security group, next.
![image](/public/images/note/9160/8-2-application-load-balancer-8.png)
Select the existing group created in previous lab, next.
![image](/public/images/note/9160/8-2-application-load-balancer-9.png)
Leave as it is.
![image](/public/images/note/9160/8-2-application-load-balancer-10.png)
Go back the target group, click Edit.
![image](/public/images/note/9160/8-2-application-load-balancer-11.png)
Select the two instances and click 'Add to registered'.
![image](/public/images/note/9160/8-2-application-load-balancer-12.png)
Wait for a while, until the status become 'healthy'.
![image](/public/images/note/9160/8-2-application-load-balancer-13.png)
Go to the load balancer, copy the dns name, visit it in the web browser.
![image](/public/images/note/9160/8-2-application-load-balancer-14.png)
We will see the content. Keep refreshing the page, sometimes we hit WebServer 1 and sometime we hit WebServer 2.
![image](/public/images/note/9160/8-2-application-load-balancer-15.png)
Why application load balancer is more intelligent than classic load balancer? Check the listeners in the load balancer, click on the listener.
![image](/public/images/note/9160/8-2-application-load-balancer-21.png)
You can create rules with conditions and corresponding actions.
![image](/public/images/note/9160/8-2-application-load-balancer-22.png)
![image](/public/images/note/9160/8-2-application-load-balancer-23.png)
Exam tips.
![image](/public/images/note/9160/8-2-load-balancer-exam-tips-1.png)
![image](/public/images/note/9160/8-2-load-balancer-exam-tips-2.png)
![image](/public/images/note/9160/8-2-load-balancer-exam-tips-3.png)
![image](/public/images/note/9160/8-2-load-balancer-exam-tips-4.png)
### 8.3 Advanced Load Balancer Theory
Sticky sessions.
![image](/public/images/note/9160/8-3-advanced-load-balancer-1.png)
![image](/public/images/note/9160/8-3-advanced-load-balancer-2.png)
No Cross Zone load Balancing.
![image](/public/images/note/9160/8-3-advanced-load-balancer-3.png)
With Cross Zone load Balancing.
![image](/public/images/note/9160/8-3-advanced-load-balancer-4.png)
![image](/public/images/note/9160/8-3-advanced-load-balancer-5.png)
Path Patterns.
![image](/public/images/note/9160/8-3-advanced-load-balancer-6.png)
![image](/public/images/note/9160/8-3-advanced-load-balancer-7.png)
Exam tips.
![image](/public/images/note/9160/8-3-advanced-load-balancer-exam-tips.png)
### 8.4 Autoscaling Groups Lab
Create autoscaling group with 3 instances. Create 3 instances and terminate two, after a while, new two instances will be launched automatically.

Create Launch Configuration: Services->EC2->Auto Scaling->Launch Configurations, Create launch configuration.
![image](/public/images/note/9160/8-4-autoscaling-groups-1.png)
Select the first AMI.
![image](/public/images/note/9160/8-4-autoscaling-groups-2.png)
Select the free tier one.
![image](/public/images/note/9160/8-4-autoscaling-groups-3.png)
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
![image](/public/images/note/9160/8-4-autoscaling-groups-4.png)
Leave unchanged for the storage.
![image](/public/images/note/9160/8-4-autoscaling-groups-5.png)
Select the WebDMZ security group, next.
![image](/public/images/note/9160/8-4-autoscaling-groups-6.png)
Click "Create an AutoScaling Group using this launch configuration".
![image](/public/images/note/9160/8-4-autoscaling-groups-7.png)
Set the group size=3.
![image](/public/images/note/9160/8-4-autoscaling-groups-8.png)
Set the scale group size.
![image](/public/images/note/9160/8-4-autoscaling-groups-9.png)
Skip the notification.
![image](/public/images/note/9160/8-4-autoscaling-groups-10.png)
Set instance tag.
![image](/public/images/note/9160/8-4-autoscaling-groups-11.png)
The AutoScaling group is created. Three instances are under this group.
![image](/public/images/note/9160/8-4-autoscaling-groups-12.png)
Go to EC2 instance, we see all instances are up.
![image](/public/images/note/9160/8-4-autoscaling-groups-13.png)
Terminate two of them.
![image](/public/images/note/9160/8-4-autoscaling-groups-14.png)
In the Activity history of the AutoScaling group, we can see it detects the termination and launch new instances automatically.
![image](/public/images/note/9160/8-4-autoscaling-groups-15.png)
After a while, new instances are launched.
![image](/public/images/note/9160/8-4-autoscaling-groups-16.png)
### 8.5 HA Architecture
![image](/public/images/note/9160/8-5-ha-architecture-1.png)
![image](/public/images/note/9160/8-5-ha-architecture-2.png)
* [The Netflix Simian Army](https://medium.com/netflix-techblog/the-netflix-simian-army-16e57fbab116)

![image](/public/images/note/9160/8-5-ha-architecture-3.png)
![image](/public/images/note/9160/8-5-ha-architecture-4.png)
![image](/public/images/note/9160/8-5-ha-architecture-5.png)
### 8.6 HA Word Press Site
The architecture of the wordpress website.
![image](/public/images/note/9160/8-6-wordpress-1.png)
1) Create two S3 buckets, one for storing codes, another for media files.
![image](/public/images/note/9160/8-6-wordpress-2.png)
2) Create distribution: Services->Networking & Content Delivery->CloudFront, Create Distribution.
![image](/public/images/note/9160/8-6-wordpress-3.png)
Choose the **media** bucket for the Origin Domain Name, leave others as default.
![image](/public/images/note/9160/8-6-wordpress-4.png)
The distribution is created and it takes some time to be ready.
![image](/public/images/note/9160/8-6-wordpress-5.png)
3) Security Group  
Make sure the WebDMZ group has port 80 opened for all incoming requests.
![image](/public/images/note/9160/8-6-wordpress-6.png)
And make sure rds group has opened mysql database port to WebDMZ group.
![image](/public/images/note/9160/8-6-wordpress-7.png)
4) Create MySQL database, Services->RDS->Create Database, choose 'Dev/Test'.  
![image](/public/images/note/9160/8-6-wordpress-8.png)
Specify db identifier, db name and password.
![image](/public/images/note/9160/8-6-wordpress-9.png)
Select 't2.micro' for DB instance class, set storage size to 1000GB.
![image](/public/images/note/9160/8-6-wordpress-10.png)
Enable Multi-AZ.
![image](/public/images/note/9160/8-6-wordpress-11.png)
Expand 'Additional connectivity configuration', choose the 'rds-launch-wizard' as the security group.
![image](/public/images/note/9160/8-6-wordpress-12.png)
Specify the initial database name, so that a new database will be created once the rds instance is launched.
![image](/public/images/note/9160/8-6-wordpress-13.png)
MySQL instance is created.
![image](/public/images/note/9160/8-6-wordpress-14.png)
5) Create new Role, Services->IAM->Roles->Create Role, choose EC2.
![image](/public/images/note/9160/8-6-wordpress-15.png)
Search 's3', choose 'AmazonS3FullAccess'.
![image](/public/images/note/9160/8-6-wordpress-16.png)
Skip the tag, provide the name for the new role.
![image](/public/images/note/9160/8-6-wordpress-17.png)
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
![image](/public/images/note/9160/8-6-wordpress-18.png)
Set Tag.
![image](/public/images/note/9160/8-6-wordpress-19.png)
Select the WebDMZ security group, launch instance.
![image](/public/images/note/9160/8-6-wordpress-20.png)
Lab problem.
![image](/public/images/note/9160/8-6-wordpress-lab-problem.png)
### 8.7 Setting Up EC2
1) Preparation:  
Check that FrontCloud Distribution created in previous lab is enabled and deployed.
![image](/public/images/note/9160/8-7-wordpress-1.png)
The RDS(MySQL) is also available.
![image](/public/images/note/9160/8-7-wordpress-2.png)
EC2 Instance is up now, copy the public ip address.
![image](/public/images/note/9160/8-7-wordpress-3.png)
ssh to the web server instance, navigate to /var/www/html directory, check if all wp files are there.
![image](/public/images/note/9160/8-7-wordpress-4.png)
Also check if htaccess is configured.
```raw
cat .htaccess
```
![image](/public/images/note/9160/8-7-wordpress-5.png)
2) Launch WordPress and create a new post with images.  
Start the apache server and visit the ip address in web browser, wordpress is started.
![image](/public/images/note/9160/8-7-wordpress-6.png)
Setup wordpress, the database host is the endpoint of the MySQL instance.
![image](/public/images/note/9160/8-7-wordpress-7.png)
Error occurs: can’t write the wp-config.php file.
![image](/public/images/note/9160/8-7-wordpress-8.png)
Copy the script, then ssh to the web server. Create a file named wp-config.php in folder /var/www/html with the script. Refresh the page, you should see the wordpress configuration page successfully. Put the required information here, click "Install WordPress".
![image](/public/images/note/9160/8-7-wordpress-9.png)
WordPress is installed successfully.
![image](/public/images/note/9160/8-7-wordpress-10.png)
Login with acloudgur/acloudguru.
![image](/public/images/note/9160/8-7-wordpress-11.png)
Home page of WordPress.
![image](/public/images/note/9160/8-7-wordpress-12.png)
Create a new post with two images.
![image](/public/images/note/9160/8-7-wordpress-13.png)
Click publish, new the post is published and we are able to view it.
![image](/public/images/note/9160/8-7-wordpress-14.png)
In the web server, we will see the upload folder with two image files.
![image](/public/images/note/9160/8-7-wordpress-15.png)
3) Next, we want each time user uploads the images, they can be replicated to S3 automatically.

Use `aws s3 ls` to show the existing buckets in s3. Use `aws s3 cp` command to copy files from web server to s3 **media** buckets.
![image](/public/images/note/9160/8-7-wordpress-16.png)
Moreover, use `aws s3 cp` to copy the entire wordpress files into s3 **code** bucket.
![image](/public/images/note/9160/8-7-wordpress-17.png)
Use `aws s3 ls` to check all files are copied to s3 bucket.
![image](/public/images/note/9160/8-7-wordpress-18.png)
4) Setup redirect, whenever user accesses the post, all the image requests will be redirected to s3.  
Get the domain name of the cloudfront distribution.
![image](/public/images/note/9160/8-7-wordpress-19.png)
Edit the '.htaccess' file.
![image](/public/images/note/9160/8-7-wordpress-20.png)
Update the `rewriterrule` with the domain name of cloudfront distribution, which is pointing to s3.
![image](/public/images/note/9160/8-7-wordpress-21.png)
Use `aws s3 sync` to sync the changed files from web server to s3 buckets. This time, only the '.htaccess' file is synced.
![image](/public/images/note/9160/8-7-wordpress-22.png)
Edit file `/etc/httpd/conf/httpd.conf`.
![image](/public/images/note/9160/8-7-wordpress-23.png)
Change the value of `AllowOverride` from None to All.
![image](/public/images/note/9160/8-7-wordpress-24.png)
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
![image](/public/images/note/9160/8-7-wordpress-25.png)
After clicking "Save" button, both permission and bucket policy are marked as public.
![image](/public/images/note/9160/8-7-wordpress-26.png)
If you encounter any error, select the s3 bucket, click "Edit public access settings".
![image](/public/images/note/9160/8-7-wordpress-27.png)
Make sure none of the options are checked, and save.
![image](/public/images/note/9160/8-7-wordpress-28.png)
Wait for a while, revisit the post, the image should be fetched from the cloudfront, which is pointing to s3 media bucket.
![image](/public/images/note/9160/8-7-wordpress-29.png)
5) Create new application load balancer.  
Put the name.
![image](/public/images/note/9160/8-7-wordpress-30.png)
Select all available AZs.
![image](/public/images/note/9160/8-7-wordpress-31.png)
Select the WebDMZ security group.
![image](/public/images/note/9160/8-7-wordpress-32.png)
Create a new target group, set path to healthy.html.
![image](/public/images/note/9160/8-7-wordpress-33.png)
Choose the instance, then create.
![image](/public/images/note/9160/8-7-wordpress-34.png)
Load balancer is created, wait for few minutes, the status is changed to 'active'.
![image](/public/images/note/9160/8-7-wordpress-35.png)
6) Optional step, domain name, Services->Route 53->Hosted Zone.
![image](/public/images/note/9160/8-7-wordpress-36.png)
Select the existing domain, click 'Create Record Sets'.
![image](/public/images/note/9160/8-7-wordpress-37.png)
Choose 'Alias'=Yes, Alias Target = application load balancer.
![image](/public/images/note/9160/8-7-wordpress-38.png)
Now the dns is pointing to the load balancer.
![image](/public/images/note/9160/8-7-wordpress-39.png)
7) Target Group. Add instance into target group.

Services->EC2->Target Group, select the target group, click Edit button in Targets tab.
![image](/public/images/note/9160/8-7-wordpress-40.png)
Select the instance and click 'Add to registered'.
![image](/public/images/note/9160/8-7-wordpress-41.png)
Wait for a while, the status becomes healthy.
![image](/public/images/note/9160/8-7-wordpress-42.png)
Visit the domain, we should see the post.
![image](/public/images/note/9160/8-7-wordpress-43.png)
### 8.8 Adding Resilience And Autoscaling
![image](/public/images/note/9160/8-8-resilience-autoscaling-1.png)
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
![image](/public/images/note/9160/8-8-resilience-autoscaling-2.png)

Run following command to start the `cront` service.
```raw
service cront restart
```
![image](/public/images/note/9160/8-8-resilience-autoscaling-3.png)
Test this by uploading a file into the **code** bucket.
![image](/public/images/note/9160/8-8-resilience-autoscaling-4.png)
Restart the cront service, find the file in /etc/www/html directory.
![image](/public/images/note/9160/8-8-resilience-autoscaling-5.png)
2) Setup the read replica and put it behind the load balancer.  
Select the WordPress EC2 instance, Actions->Image->Create Image.
![image](/public/images/note/9160/8-8-read-replica-1.png)
Set the name and description, create image.
![image](/public/images/note/9160/8-8-read-replica-2.png)
The EC2 instance will reboot and an AMI is create.
![image](/public/images/note/9160/8-8-read-replica-3.png)

3) Update crontab configuration in the first WP instance, which will be used as write node.
```raw
*/1 * * * * root aws s3 sync --delete /var/www/html s3://acloudguruwp-code-rjk19
*/1 * * * * root aws s3 sync --delete /var/www/html/wp-content/uploads/ s3://acloudguruwp-media-rjk19
```
* Be aware of that this web server a writing node.
* The first rule: sync all files from write instance to **code** bucket.
* The second rule: sync all uploaded images from write instance to **media** bucket.

![image](/public/images/note/9160/8-8-read-replica-4.png)
Testing the settings. Create a file named test.txt in the /var/www/html directory and restart the cront service.
![image](/public/images/note/9160/8-8-read-replica-5.png)
Go to the s3 **code** bucket, test.txt is there. You may not be able to see it immediately due to the eventual consistency.
![image](/public/images/note/9160/8-8-read-replica-6.png)
4) Launch new instance for read node.  
Create auto scaling group, Services->EC2->Auto Scaling Group.
![image](/public/images/note/9160/8-8-launch-read-replica-1.png)
Select the option 'Create a new launch configuration'.
![image](/public/images/note/9160/8-8-launch-read-replica-2.png)
Select the own AMI image.
![image](/public/images/note/9160/8-8-launch-read-replica-3.png)

Set name, choose IAM role and put the bootstrap script into user data.
```raw
#!/bin/bash
yum update -y
aws s3 sync --delete s3://YOUR_S3_BUCKET_NAME /var/www/html
```
![image](/public/images/note/9160/8-8-launch-read-replica-4.png)
Keep the default values for storage.
![image](/public/images/note/9160/8-8-launch-read-replica-5.png)
Select the WebDMZ security group.
![image](/public/images/note/9160/8-8-launch-read-replica-6.png)
After clicking the launch instance, you will see the 'configure autoscaling group' page. Set name, select all available AZs.
![image](/public/images/note/9160/8-8-launch-read-replica-7.png)
Choose the Target Group and set the grace period to 60 seconds, next.
![image](/public/images/note/9160/8-8-launch-read-replica-8.png)
Leave as it is.
![image](/public/images/note/9160/8-8-launch-read-replica-9.png)
Skip the notification, set instance tag.
![image](/public/images/note/9160/8-8-launch-read-replica-10.png)
Review, create auto scaling group.
![image](/public/images/note/9160/8-8-launch-read-replica-11.png)
5) Remove the write node from the target group. Select the target group, click edit button.
![image](/public/images/note/9160/8-8-launch-read-replica-12.png)
Select the instance, click remove button.
![image](/public/images/note/9160/8-8-launch-read-replica-13.png)
Now we see the two read nodes.
![image](/public/images/note/9160/8-8-launch-read-replica-14.png)
Rename the write node to MyWP-WN to make more clear.
![image](/public/images/note/9160/8-8-launch-read-replica-15.png)
Check the target group, both two read nodes are healthy.
![image](/public/images/note/9160/8-8-launch-read-replica-16.png)
6) Testing  
Visit the site with the domain name, it should return the images from s3 bucket.
![image](/public/images/note/9160/8-8-read-replica-testing-1.png)
Visit the admin page of wordpress, http://domain/wp-admin/, input user name and password.
![image](/public/images/note/9160/8-8-read-replica-testing-2.png)
Now we are in the admin page. Notice that the domain is an ip address, which is write's node public ip.
![image](/public/images/note/9160/8-8-read-replica-testing-3.png)
Create a new post with uploading a picture.
![image](/public/images/note/9160/8-8-read-replica-testing-4.png)
The image is not showing properly. This is because the image is not propagated from s3 bucket yet.
![image](/public/images/note/9160/8-8-read-replica-testing-5.png)
Publish the post and wait for few minutes. Refresh the page, we should be able to see the image.
![image](/public/images/note/9160/8-8-read-replica-testing-6.png)
If we visit the frontend, we should see the new post with image propagated properly.
![image](/public/images/note/9160/8-8-read-replica-testing-7.png)
If we copy the image url and view it in browser, we should see it is from the cloudfront, from s3 bucket.
![image](/public/images/note/9160/8-8-read-replica-testing-8.png)
7) Test High Availability.  
Terminate one of the read node.
![image](/public/images/note/9160/8-8-testing-availability-1.png)
Check the target group, there is only one healthy instance. If we visit the site, it is still responsive, though there may be some latency.
![image](/public/images/note/9160/8-8-testing-availability-2.png)
Check the auto scaling group, check the history, it detects the unhealthy occurrence.
![image](/public/images/note/9160/8-8-testing-availability-3.png)
New instance will be launched automatically.
![image](/public/images/note/9160/8-8-testing-availability-4.png)
Check the target group, wait until the healthy node comes back. Again, we have to healthy read nodes.
![image](/public/images/note/9160/8-8-testing-availability-5.png)
Refresh the site, it is still running properly. We have auto healing system!
![image](/public/images/note/9160/8-8-testing-availability-6.png)

### 8.9 Cleaning Up
Lab: RDS failover, High availability of database.  

Reboot the database.
![image](/public/images/note/9160/8-9-rds-failover-1.png)
Select the "Reboot With Failover" option. The database will be failed over from one availability zone to another.
![image](/public/images/note/9160/8-9-rds-failover-2.png)
The database will be rebooted.
![image](/public/images/note/9160/8-9-rds-failover-3.png)
The website will not be accessible, 504 error is returned.
![image](/public/images/note/9160/8-9-rds-failover-4.png)
Once the database comes back, our site will work again.
![image](/public/images/note/9160/8-9-rds-failover-5.png)
![image](/public/images/note/9160/8-9-rds-failover-6.png)
Delete all assets, instance, database, buckets, etc for clean up.
### 8.10 CloudFormation
Create cloudformation, Services->Management & Governance->CloudFormation, create stack.
![image](/public/images/note/9160/8-10-cloudformation-1.png)
Choose 'Use a sample template' option, and select WordPress blog template.
![image](/public/images/note/9160/8-10-cloudformation-2.png)
Set name and database parameters.
![image](/public/images/note/9160/8-10-cloudformation-3.png)
Add tag, next, review and create.
![image](/public/images/note/9160/8-10-cloudformation-4.png)
It is created.
![image](/public/images/note/9160/8-10-cloudformation-5.png)
Wait for a while, the creation is completed. We see some web servers and security groups are created.
![image](/public/images/note/9160/8-10-cloudformation-6.png)
Switch to the Outputs tab, hit the link.
![image](/public/images/note/9160/8-10-cloudformation-7.png)
We should see the word press configuration page. WordPress site is ready to use.
![image](/public/images/note/9160/8-10-cloudformation-8.png)
Switch to Resources tab. Notice that only web server and security group are created. There is no RDS is created. You can confirm this by going to RDS to see if there is any new instance is launched.
![image](/public/images/note/9160/8-10-cloudformation-9.png)
Only one EC2 instance we can find.
![image](/public/images/note/9160/8-10-cloudformation-10.png)
* Visit https://aws.amazon.com/quickstart/?quick to see available templates.

Exam tips.
![image](/public/images/note/9160/8-10-cloudformation-exam-tips.png)
### 8.11 Elastic Beanstalk
Create Elastic Beanstalk, Services->Compute->Elastic Beanstalk.
![image](/public/images/note/9160/8-11-elastic-beanstalk-1.png)
![image](/public/images/note/9160/8-11-elastic-beanstalk-2.png)
![image](/public/images/note/9160/8-11-elastic-beanstalk-3.png)
![image](/public/images/note/9160/8-11-elastic-beanstalk-4.png)
![image](/public/images/note/9160/8-11-elastic-beanstalk-5.png)
![image](/public/images/note/9160/8-11-elastic-beanstalk-6.png)
Instance is auto generated.
![image](/public/images/note/9160/8-11-elastic-beanstalk-7.png)
Test the web page.
![image](/public/images/note/9160/8-11-elastic-beanstalk-8.png)
Exam tips.
![image](/public/images/note/9160/8-11-elastic-beanstalk-exam-tips.png)
### 8.12 HA Summary
![image](/public/images/note/9160/8-12-ha-summary-1.png)
![image](/public/images/note/9160/8-12-ha-summary-2.png)
![image](/public/images/note/9160/8-12-ha-summary-3.png)
![image](/public/images/note/9160/8-12-ha-summary-4.png)
![image](/public/images/note/9160/8-12-ha-summary-5.png)
![image](/public/images/note/9160/8-12-ha-summary-6.png)
![image](/public/images/note/9160/8-12-ha-summary-7.png)
### 8.13 HA Architecture Quiz
![image](/public/images/note/9160/8-13-ha-quiz-1.png)
![image](/public/images/note/9160/8-13-ha-quiz-2.png)
![image](/public/images/note/9160/8-13-ha-quiz-3.png)
![image](/public/images/note/9160/8-13-ha-quiz-4.png)
![image](/public/images/note/9160/8-13-ha-quiz-5.png)
![image](/public/images/note/9160/8-13-ha-quiz-6.png)
![image](/public/images/note/9160/8-13-ha-quiz-7.png)
![image](/public/images/note/9160/8-13-ha-quiz-8.png)
![image](/public/images/note/9160/8-13-ha-quiz-9.png)
![image](/public/images/note/9160/8-13-ha-quiz-10.png)
![image](/public/images/note/9160/8-13-ha-quiz-11.png)
![image](/public/images/note/9160/8-13-ha-quiz-12.png)
![image](/public/images/note/9160/8-13-ha-quiz-13.png)
![image](/public/images/note/9160/8-13-ha-quiz-14.png)
![image](/public/images/note/9160/8-13-ha-quiz-15.png)
![image](/public/images/note/9160/8-13-ha-quiz-16.png)
## 9. Applications
### 9.1 SQS
![image](/public/images/note/9160/9-1-sqs-1.png)
Usage - Meme website.
![image](/public/images/note/9160/9-1-sqs-2.png)
Usage - Travel website.
![image](/public/images/note/9160/9-1-sqs-3.png)
![image](/public/images/note/9160/9-1-sqs-4.png)
![image](/public/images/note/9160/9-1-sqs-5.png)
Queue types.
![image](/public/images/note/9160/9-1-sqs-6.png)
Standard queue.
![image](/public/images/note/9160/9-1-sqs-7.png)
FIFO queue.
![image](/public/images/note/9160/9-1-sqs-8.png)
![image](/public/images/note/9160/9-1-sqs-9.png)
Exam tips.
![image](/public/images/note/9160/9-1-sqs-exam-tips-1.png)
![image](/public/images/note/9160/9-1-sqs-exam-tips-2.png)
![image](/public/images/note/9160/9-1-sqs-exam-tips-3.png)
### 9.2 SWF
![image](/public/images/note/9160/9-2-swf-1.png)
SWF tasks.
![image](/public/images/note/9160/9-2-swf-2.png)
SWF vs. SQS
![image](/public/images/note/9160/9-2-swf-3.png)
SWF Actors.
![image](/public/images/note/9160/9-2-swf-4.png)
### 9.3 SNS
![image](/public/images/note/9160/9-3-sns-1.png)
![image](/public/images/note/9160/9-3-sns-2.png)
Topics.
![image](/public/images/note/9160/9-3-sns-3.png)
SNS Availability.
![image](/public/images/note/9160/9-3-sns-4.png)
SNS Benefits.
![image](/public/images/note/9160/9-3-sns-5.png)
SNS vs. SQS
![image](/public/images/note/9160/9-3-sns-6.png)
### 9.4 Elastic Transcoder
![image](/public/images/note/9160/9-4-elastic-transcoder-1.png)
![image](/public/images/note/9160/9-4-elastic-transcoder-2.png)
![image](/public/images/note/9160/9-4-elastic-transcoder-3.png)
### 9.5 API Gateway
![image](/public/images/note/9160/9-5-api-gateway-1.png)
![image](/public/images/note/9160/9-5-api-gateway-2.png)
How API Gateway works?
![image](/public/images/note/9160/9-5-api-gateway-3.png)
API Gateway Options.
![image](/public/images/note/9160/9-5-api-gateway-4.png)
API Gateway Configuration.
![image](/public/images/note/9160/9-5-api-gateway-5.png)
API Gateway Deployment.
![image](/public/images/note/9160/9-5-api-gateway-6.png)
API Gateway Caching.
![image](/public/images/note/9160/9-5-api-gateway-7.png)
How cache works?
![image](/public/images/note/9160/9-5-api-gateway-8.png)
Same origin policy. Cross-site-scripting(XSS).
![image](/public/images/note/9160/9-5-api-gateway-9.png)
CORS.
![image](/public/images/note/9160/9-5-api-gateway-10.png)
![image](/public/images/note/9160/9-5-api-gateway-11.png)
Exam tips.
![image](/public/images/note/9160/9-5-api-gateway-exam-tips.png)
### 9.6 Kinesis
Streaming data.
![image](/public/images/note/9160/9-6-kinesis-1.png)
Kinesis.
![image](/public/images/note/9160/9-6-kinesis-2.png)
Types of kinesis.
![image](/public/images/note/9160/9-6-kinesis-3.png)
Kinesis streaming.
![image](/public/images/note/9160/9-6-kinesis-4.png)
Kinesis streaming shards.
![image](/public/images/note/9160/9-6-kinesis-5.png)
Kinesis firehose. Data can be exported to S3, Redfhift or ElasticSearch.
![image](/public/images/note/9160/9-6-kinesis-6.png)
![image](/public/images/note/9160/9-6-kinesis-7.png)
Kinesis Analytics.
![image](/public/images/note/9160/9-6-kinesis-8.png)
Exam tips.
![image](/public/images/note/9160/9-6-kinesis-exam-tips.png)
### 9.7 Web Identity Federation & Cognito
Web Identity Federation.
![image](/public/images/note/9160/9-7-wif-1.png)
Cognito.
![image](/public/images/note/9160/9-7-wif-2.png)
Cognito Use case.
![image](/public/images/note/9160/9-7-wif-3.png)
![image](/public/images/note/9160/9-7-wif-4.png)
Cognito User Pools.
![image](/public/images/note/9160/9-7-wif-5.png)
Cognito Identity Pools.
![image](/public/images/note/9160/9-7-wif-6.png)
How they work?
![image](/public/images/note/9160/9-7-wif-7.png)
Cognito Synchronization.
![image](/public/images/note/9160/9-7-wif-8.png)
How Synchronization works?
![image](/public/images/note/9160/9-7-wif-9.png)
Cognito exam tips.
![image](/public/images/note/9160/9-7-wif-exam-tips-1.png)
![image](/public/images/note/9160/9-7-wif-exam-tips-2.png)
### 9.8 Summary
![image](/public/images/note/9160/9-8-summary-1.png)
![image](/public/images/note/9160/9-8-summary-2.png)
![image](/public/images/note/9160/9-8-summary-3.png)
![image](/public/images/note/9160/9-8-summary-4.png)
![image](/public/images/note/9160/9-8-summary-5.png)
![image](/public/images/note/9160/9-8-summary-6.png)
![image](/public/images/note/9160/9-8-summary-7.png)
![image](/public/images/note/9160/9-8-summary-8.png)
![image](/public/images/note/9160/9-8-summary-9.png)
![image](/public/images/note/9160/9-8-summary-10.png)
![image](/public/images/note/9160/9-8-summary-11.png)
![image](/public/images/note/9160/9-8-summary-12.png)
### 9.9 Applications Quiz
![image](/public/images/note/9160/9-9-application-quiz-1.png)
![image](/public/images/note/9160/9-9-application-quiz-2.png)
![image](/public/images/note/9160/9-9-application-quiz-3.png)
![image](/public/images/note/9160/9-9-application-quiz-4.png)
![image](/public/images/note/9160/9-9-application-quiz-5.png)
![image](/public/images/note/9160/9-9-application-quiz-6.png)
![image](/public/images/note/9160/9-9-application-quiz-7.png)
![image](/public/images/note/9160/9-9-application-quiz-8.png)
![image](/public/images/note/9160/9-9-application-quiz-9.png)
![image](/public/images/note/9160/9-9-application-quiz-10.png)
![image](/public/images/note/9160/9-9-application-quiz-11.png)
## 10. Serverless
### 10.1 Lambda Concepts
History of cloud: Data center->IAAS->PAAS->Containers->Serverless.
![image](/public/images/note/9160/10-1-lambda-1.png)
Lamda.
![image](/public/images/note/9160/10-1-lambda-2.png)
![image](/public/images/note/9160/10-1-lambda-3.png)
![image](/public/images/note/9160/10-1-lambda-4.png)
Lamda usage cases.
![image](/public/images/note/9160/10-1-lambda-5.png)
![image](/public/images/note/9160/10-1-lambda-6.png)
Traditional vs. Serverless Architecture
![image](/public/images/note/9160/10-1-lambda-7.png)
What languages does lamda support?
![image](/public/images/note/9160/10-1-lambda-8.png)
How lamda is priced?
![image](/public/images/note/9160/10-1-lambda-9.png)
Why lamda is cool?
![image](/public/images/note/9160/10-1-lambda-10.png)
Lamda exam tips.
![image](/public/images/note/9160/10-1-lambda-exam-tips-1.png)
![image](/public/images/note/9160/10-1-lambda-exam-tips-2.png)
### 10.2 Let's Build A Serverless Webpage
![image](/public/images/note/9160/10-2-build-serverless-1.png)
Services->Compute->Lambda, create a function.
![image](/public/images/note/9160/10-2-build-serverless-2.png)
Set name, choose python 3.6 for runtime.
![image](/public/images/note/9160/10-2-build-serverless-3.png)
Create a new role and select 'Simple microservice permissions' policy template, Create Function.
![image](/public/images/note/9160/10-2-build-serverless-4.png)
Lambda function is created.
![image](/public/images/note/9160/10-2-build-serverless-5.png)
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
![image](/public/images/note/9160/10-2-build-serverless-6.png)
Scroll down and set the description.
![image](/public/images/note/9160/10-2-build-serverless-7.png)
Scroll up, select the 'API Gateway' trigger.
![image](/public/images/note/9160/10-2-build-serverless-8.png)
Create a new api and select AWS IAM as the security mechanism. Click add and save.
![image](/public/images/note/9160/10-2-build-serverless-9.png)
The API Gateway trigger is created.
![image](/public/images/note/9160/10-2-build-serverless-10.png)
Hit the name of the gateway "MyFirstLambdaFunction-API".
![image](/public/images/note/9160/10-2-build-serverless-11.png)
Delete the existing ANY method and create a new get method.
![image](/public/images/note/9160/10-2-build-serverless-12.png)
Then deploy this api.
![image](/public/images/note/9160/10-2-build-serverless-13.png)
Expand the get method, click the invoke url. It should return "Johnny", which is defined in the python script.
![image](/public/images/note/9160/10-2-build-serverless-14.png)

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
![image](/public/images/note/9160/10-2-build-serverless-15.png)
Notice the bucket is not public.
![image](/public/images/note/9160/10-2-build-serverless-16.png)
Select the bucket, click "Edit public access settings", clear all checks, save.
![image](/public/images/note/9160/10-2-build-serverless-17.png)
Switch to Properties tab, choose "Static website hosting".
![image](/public/images/note/9160/10-2-build-serverless-18.png)
Choose the "Use this bucket to host a website" option, set the index document and error document.
![image](/public/images/note/9160/10-2-build-serverless-19.png)
error.html.
```html
<html><body><h1>There has been an error!</h1></body></html>
```
Bucket hosting is setup.
![image](/public/images/note/9160/10-2-build-serverless-20.png)
Upload the two html files into the bucket and make them public.
![image](/public/images/note/9160/10-2-build-serverless-21.png)
Access the link of index.html in web browser. We should see the page.
![image](/public/images/note/9160/10-2-build-serverless-22.png)
Click on the button, the title will be changed.
![image](/public/images/note/9160/10-2-build-serverless-23.png)
Further more, you can bind your domain name to the s3 bucket by creating an A Record.
![image](/public/images/note/9160/10-2-build-serverless-24.png)
Now, when we visit the domain, it shows the same content.
![image](/public/images/note/9160/10-2-build-serverless-25.png)
* Wait for a while if you see a blank page as dns takes some time to work.

Architecture of Lambda.
![image](/public/images/note/9160/10-3-serverless-diagram.png)
### 10.3 Let's Build An Alexa Skill
TODO lab: Alexa.
### 10.4 Summary
![image](/public/images/note/9160/10-4-lamda-summary-1.png)
![image](/public/images/note/9160/10-4-lamda-summary-2.png)
![image](/public/images/note/9160/10-4-lamda-summary-3.png)
### 10.5 Serverless Quiz
![image](/public/images/note/9160/10-5-serverless-quiz-1.png)
![image](/public/images/note/9160/10-5-serverless-quiz-2.png)
![image](/public/images/note/9160/10-5-serverless-quiz-3.png)
![image](/public/images/note/9160/10-5-serverless-quiz-4.png)
![image](/public/images/note/9160/10-5-serverless-quiz-5.png)
![image](/public/images/note/9160/10-5-serverless-quiz-6.png)
![image](/public/images/note/9160/10-5-serverless-quiz-7.png)
![image](/public/images/note/9160/10-5-serverless-quiz-8.png)
![image](/public/images/note/9160/10-5-serverless-quiz-9.png)

## 11. Good Luck!
### 11.1 Good Luck & How To Book Your Exam
### 11.2 Thank You and Next Steps
### 11.3 Practice Test 1
![image](/public/images/note/9160/11-3-practice-1.png)
![image](/public/images/note/9160/11-3-practice-2.png)
![image](/public/images/note/9160/11-3-practice-3.png)
![image](/public/images/note/9160/11-3-practice-4.png)
![image](/public/images/note/9160/11-3-practice-5.png)
![image](/public/images/note/9160/11-3-practice-6.png)
![image](/public/images/note/9160/11-3-practice-7.png)
![image](/public/images/note/9160/11-3-practice-8.png)
![image](/public/images/note/9160/11-3-practice-9.png)
![image](/public/images/note/9160/11-3-practice-10.png)
![image](/public/images/note/9160/11-3-practice-11.png)
![image](/public/images/note/9160/11-3-practice-12.png)
![image](/public/images/note/9160/11-3-practice-13.png)
![image](/public/images/note/9160/11-3-practice-14.png)
![image](/public/images/note/9160/11-3-practice-15.png)
![image](/public/images/note/9160/11-3-practice-16.png)
![image](/public/images/note/9160/11-3-practice-17.png)
![image](/public/images/note/9160/11-3-practice-18.png)
![image](/public/images/note/9160/11-3-practice-19.png)
![image](/public/images/note/9160/11-3-practice-20.png)
![image](/public/images/note/9160/11-3-practice-21.png)
![image](/public/images/note/9160/11-3-practice-22.png)
![image](/public/images/note/9160/11-3-practice-23.png)
![image](/public/images/note/9160/11-3-practice-24.png)
![image](/public/images/note/9160/11-3-practice-25.png)
![image](/public/images/note/9160/11-3-practice-26.png)
![image](/public/images/note/9160/11-3-practice-27.png)
![image](/public/images/note/9160/11-3-practice-28.png)
![image](/public/images/note/9160/11-3-practice-29.png)
![image](/public/images/note/9160/11-3-practice-30.png)
![image](/public/images/note/9160/11-3-practice-31.png)
![image](/public/images/note/9160/11-3-practice-32.png)
![image](/public/images/note/9160/11-3-practice-33.png)
![image](/public/images/note/9160/11-3-practice-34.png)
![image](/public/images/note/9160/11-3-practice-35.png)
![image](/public/images/note/9160/11-3-practice-36.png)
![image](/public/images/note/9160/11-3-practice-37.png)
![image](/public/images/note/9160/11-3-practice-38.png)
![image](/public/images/note/9160/11-3-practice-39.png)
![image](/public/images/note/9160/11-3-practice-40.png)
![image](/public/images/note/9160/11-3-practice-41.png)
![image](/public/images/note/9160/11-3-practice-42.png)
![image](/public/images/note/9160/11-3-practice-43.png)
![image](/public/images/note/9160/11-3-practice-44-1.png)
![image](/public/images/note/9160/11-3-practice-44-2.png)
![image](/public/images/note/9160/11-3-practice-45.png)
![image](/public/images/note/9160/11-3-practice-46.png)
![image](/public/images/note/9160/11-3-practice-47.png)
![image](/public/images/note/9160/11-3-practice-48.png)
![image](/public/images/note/9160/11-3-practice-49.png)
![image](/public/images/note/9160/11-3-practice-50.png)
![image](/public/images/note/9160/11-3-practice-51-1.png)
![image](/public/images/note/9160/11-3-practice-51-2.png)
![image](/public/images/note/9160/11-3-practice-52.png)
![image](/public/images/note/9160/11-3-practice-53.png)
![image](/public/images/note/9160/11-3-practice-54.png)
![image](/public/images/note/9160/11-3-practice-55.png)
![image](/public/images/note/9160/11-3-practice-56.png)
![image](/public/images/note/9160/11-3-practice-57.png)
![image](/public/images/note/9160/11-3-practice-58.png)
![image](/public/images/note/9160/11-3-practice-59.png)
![image](/public/images/note/9160/11-3-practice-60.png)
![image](/public/images/note/9160/11-3-practice-61-1.png)
![image](/public/images/note/9160/11-3-practice-61-2.png)
![image](/public/images/note/9160/11-3-practice-62-1.png)
![image](/public/images/note/9160/11-3-practice-62-2.png)
![image](/public/images/note/9160/11-3-practice-63.png)
![image](/public/images/note/9160/11-3-practice-64.png)
### 11.4 Practice Test 2
![image](/public/images/note/9160/11-4-practice-1.png)
![image](/public/images/note/9160/11-4-practice-2.png)
![image](/public/images/note/9160/11-4-practice-3.png)
![image](/public/images/note/9160/11-4-practice-4.png)
![image](/public/images/note/9160/11-4-practice-5.png)
![image](/public/images/note/9160/11-4-practice-6.png)
![image](/public/images/note/9160/11-4-practice-7.png)
![image](/public/images/note/9160/11-4-practice-8.png)
![image](/public/images/note/9160/11-4-practice-9.png)
![image](/public/images/note/9160/11-4-practice-10.png)
![image](/public/images/note/9160/11-4-practice-11.png)
![image](/public/images/note/9160/11-4-practice-12.png)
![image](/public/images/note/9160/11-4-practice-13.png)
![image](/public/images/note/9160/11-4-practice-14.png)
![image](/public/images/note/9160/11-4-practice-15.png)
![image](/public/images/note/9160/11-4-practice-16.png)
![image](/public/images/note/9160/11-4-practice-17.png)
![image](/public/images/note/9160/11-4-practice-18.png)
![image](/public/images/note/9160/11-4-practice-19.png)
![image](/public/images/note/9160/11-4-practice-20.png)
![image](/public/images/note/9160/11-4-practice-21.png)
![image](/public/images/note/9160/11-4-practice-22.png)
![image](/public/images/note/9160/11-4-practice-23.png)
![image](/public/images/note/9160/11-4-practice-24.png)
![image](/public/images/note/9160/11-4-practice-25.png)
![image](/public/images/note/9160/11-4-practice-26.png)
![image](/public/images/note/9160/11-4-practice-27-1.png)
![image](/public/images/note/9160/11-4-practice-27-2.png)
![image](/public/images/note/9160/11-4-practice-28-1.png)
![image](/public/images/note/9160/11-4-practice-28-2.png)
![image](/public/images/note/9160/11-4-practice-29.png)
![image](/public/images/note/9160/11-4-practice-30.png)
![image](/public/images/note/9160/11-4-practice-31.png)
![image](/public/images/note/9160/11-4-practice-32.png)
![image](/public/images/note/9160/11-4-practice-33.png)
![image](/public/images/note/9160/11-4-practice-34.png)
![image](/public/images/note/9160/11-4-practice-35.png)
![image](/public/images/note/9160/11-4-practice-36.png)
![image](/public/images/note/9160/11-4-practice-37.png)
![image](/public/images/note/9160/11-4-practice-38-1.png)
![image](/public/images/note/9160/11-4-practice-38-2.png)
![image](/public/images/note/9160/11-4-practice-39.png)
![image](/public/images/note/9160/11-4-practice-40.png)
![image](/public/images/note/9160/11-4-practice-41.png)
![image](/public/images/note/9160/11-4-practice-42.png)
![image](/public/images/note/9160/11-4-practice-43.png)
![image](/public/images/note/9160/11-4-practice-44.png)
![image](/public/images/note/9160/11-4-practice-45-1.png)
![image](/public/images/note/9160/11-4-practice-45-2.png)
![image](/public/images/note/9160/11-4-practice-46.png)
![image](/public/images/note/9160/11-4-practice-47.png)
![image](/public/images/note/9160/11-4-practice-48.png)
![image](/public/images/note/9160/11-4-practice-49.png)
![image](/public/images/note/9160/11-4-practice-50.png)
![image](/public/images/note/9160/11-4-practice-51.png)
![image](/public/images/note/9160/11-4-practice-52.png)
![image](/public/images/note/9160/11-4-practice-53.png)
![image](/public/images/note/9160/11-4-practice-54.png)
![image](/public/images/note/9160/11-4-practice-55.png)
![image](/public/images/note/9160/11-4-practice-56.png)
![image](/public/images/note/9160/11-4-practice-57.png)
![image](/public/images/note/9160/11-4-practice-58.png)
![image](/public/images/note/9160/11-4-practice-59.png)
![image](/public/images/note/9160/11-4-practice-60.png)
![image](/public/images/note/9160/11-4-practice-61.png)
