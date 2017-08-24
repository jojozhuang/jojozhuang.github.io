---
layout: post
key: blog
title: "Analyze Performance Issue with Splunk"
date: 2017-02-17
categories:
- blog
---

> Recently, I was working on a performance issue which occurs in our procurement system on the cloud. I reproduced the issue locally and added logs to get the time spent information at runtime. Later, I imported these logs into Splunk for analyzing.

## 1. About the Issue
The issue occurs in our procurement system on cloud. The customer has to wait for one minute to get response after he clicks the 'Save' button on Invoice. There is no available tools for debugging on cloud. I have to copy the configuration from cloud to my local sandbox, create some dummy data and then reproduce the issue locally. I found one root cause, validation on fields. However, this performance issue is not because of a single error, instead, it is an accumulated time consumption issue. There are too many line items(over 100) in the Invoice Reconciliation Document. To get the whole picture of how exactly the time is consumed, I added logs to the 'save' button event. Later, I imported these logs to Splunk for analyzing.

## 2. Approach to Address the Issue
When the 'Save' button is clicked. There is a validation is activated and all of the fields on IR document is validated. I need to know how much time is consumed for each field. For IR document, it has two level attributes, the first level is the fields on itself. The second level is the line items. We need to dive to line item level, find out how much time is consumed for each field.  
* Level_0: Time consumed by fields on IR document  
* Level_1: Time consumed by fields on line items of IR document  

## 3. Steps
### 3.1 Add Logging Function to Validation Method
I update the validation method, and add logs to record the time spent when validating each field, both level 0 and level 1 fields are included.
### 3.2 Get the Logs
Turn on the logging function, reproduce the issue, export the log file.
### 3.3 Import Log File to Splunk
In Splunk, import log file.
### 3.4 Search the Logs for First Level
```sh
source="performancelog.txt" host="johnny-Ubuntu" sourcetype="log4j" fieldtiming:debug "level=0"
```
![MIME Type](/public/pics/2017-02-17/level0.png)  
### 3.5 Export to CSV File
Export the search result to csv file.  
![MIME Type](/public/pics/2017-02-17/export.png)  
### 3.6 Use Microsoft Excel to Process the CSV File
For my case, I use Microsoft Excel for the rest analyzing.
Open the csv file in Excel, eliminate the un-relevant columns.
![MIME Type](/public/pics/2017-02-17/eliminate.png)  
Then, sort the 'TimeSpent' column in descending order. Now, we see that field 'LineItems' consumes most of the time.
![MIME Type](/public/pics/2017-02-17/level0sorted.png)  

### 3.7 Search the Logs for Second Level
Now, we need to dive to the next level to find how time is spent on fields in LineItems.
The similar step how we find the logs on level 0. This time we need to find the level 1.
```sh
source="performancelog.txt" host="johnny-Ubuntu" sourcetype="log4j" fieldtiming:debug "level=1"
```
![MIME Type](/public/pics/2017-02-17/level1.png)  
Open the csv file in Excel, eliminate the un-relevant columns.
Then, sort the 'TimeSpent' column in descending order.
![MIME Type](/public/pics/2017-02-17/level1sorted.png)  
Notice that there are two fields consumes lots of time.
* cus_SupervisorTotalMismatch
* cus_SupervisorTotalMismatchContract

Finally, we find the main cause of this issue. There are two customized fields configured in customer's system. After analyzing the definition of these two fields. I found, some duplicated calculation for these two fields. The final solution is to move these to fields from line level(line item) to header level(IR document).
