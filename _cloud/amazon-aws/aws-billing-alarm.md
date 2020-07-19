---
layout: tutorial
key: category
title: "AWS-Billing Alarm"
index: 3802
subcategory: amazon-aws
date: 2019-09-16
tags: [AWS, Billing Alarm]
---

> Create a billing alarm to monitor the AWS charges.

## 1. Monitoring Overview
We can monitor the estimated AWS charges by using Amazon CloudWatch. If we enable the monitoring of estimated charges for AWS account, the estimated charges are calculated and sent several times daily to CloudWatch. Then we can create an alarm, which triggers when the account billing exceeds the threshold we specify.

## 2. Enabling Billing Alerts
Before creating an alarm for the estimated charges, we must enable billing alerts first, so that we can monitor the estimated AWS charges and create an alarm using billing metric data.

Open the Billing and Cost Management console at https://console.aws.amazon.com/billing/.
![image](/assets/images/note/9551/3-3-billing-dashboard.png)
In the navigation pane, choose Billing Preferences.
![image](/assets/images/note/9551/3-3-billing-preferences.png)
Choose Receive Billing Alerts, and Save preferences.

## 3. Creating a Billing Alarm
Open the CloudWatch console at https://console.aws.amazon.com/cloudwatch/. If necessary, change the Region to US East (N. Virginia). Billing metric data is stored in this Region and represents worldwide charges.
![image](/assets/images/cloud/3802/cloudwatch.png)
In the navigation pane, choose Alarms, Create Alarm.
![image](/assets/images/cloud/3802/alarms.png)
Choose Select metric.
![image](/assets/images/cloud/3802/select-metric.png)
In the All metrics tab, choose Billing, then Total Estimated Charge.
![image](/assets/images/cloud/3802/total-estimated-charge.png)
Select the check box next to EstimatedCharges, and choose Select metric.
![image](/assets/images/cloud/3802/estimated-charges.png)
Under Conditions, choose Static, set threshold.
![image](/assets/images/cloud/3802/threshold.png)
Create new topic, set email to receive alarm.
![image](/assets/images/cloud/3802/create-topic.png)
Topic is created, next.
![image](/assets/images/cloud/3802/create-topic-2.png)
Set description.
![image](/assets/images/cloud/3802/alarm-description.png)
Preview, scroll to bottom, Create Alarm.
![image](/assets/images/cloud/3802/preview.png)
Alarm is created and in pending status.
![image](/assets/images/cloud/3802/alarm-pending.png)
It will take few minutes to setup the alarm. Refresh the page, it will be done finally.
![image](/assets/images/cloud/3802/alarm-done.png)

## 4. References
* [Creating a Billing Alarm to Monitor Your Estimated AWS Charges](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/monitor_estimated_charges_with_cloudwatch.html)
