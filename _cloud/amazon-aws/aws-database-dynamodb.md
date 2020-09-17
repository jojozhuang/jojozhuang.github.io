---
layout: tutorial
key: cloud
title: "AWS-Database-DynamoDB"
index: 4144
subcategory: amazon-aws
date: 2019-09-16
tags: [AWS, DynamoDB]
---

> Use DynamoDB as NoSQL database.

## 1. DynamoDB
### 1.1 What Is DynamoDB?
Amazon DynamoDB is a fast and flexible NoSQL database service for all applications that need consistent, single-digit millisecond latency at any scale. It is a fully managed database and supports both document and key-value data models. Its flexible data model and reliable performance make it a great fit for mobile, web, gaming, ad-tech, loT, and many other applications.

### 1.2 Basics of DynamoDB
* Stored on SSD storage
* Spread across 3 geographically distinct data centers
* Eventual Consistent Reads (Default)
* Strongly Consistent Reads

### 1.3 Consistency Model of DynamoDB
When reading data from DynamoDB, users can specify whether they want the read to be eventually consistent or strongly consistent:
* `Eventually consistent reads (the default)` – The eventual consistency option maximizes the read throughput. However, an eventually consistent read might not reflect the results of a recently completed write. All copies of data usually reach consistency within a second. Repeating a read after a short time should return the updated data.
* `Strongly consistent reads` — A strongly consistent read returns a result that reflects all writes that received a successful response before the read.
* `ACID transactions` – DynamoDB transactions provide developers atomicity, consistency, isolation, and durability (ACID) across one or more tables within a single AWS account and region. You can use transactions when building applications that require coordinated inserts, deletes, or updates to multiple items as part of a single logical business operation.

## 2. References
* [Amazon DynamoDB](https://aws.amazon.com/dynamodb/)
* [Amazon DynamoDB FAQs](https://aws.amazon.com/dynamodb/faqs/)
