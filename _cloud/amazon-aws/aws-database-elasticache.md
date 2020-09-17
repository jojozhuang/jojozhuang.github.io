---
layout: tutorial
key: cloud
title: "AWS-Database-Elasticache"
index: 4146
subcategory: amazon-aws
date: 2019-09-16
tags: [AWS, Elasticache]
---

> Use Elasticache to improve system performance.

## 1. Elasticache
### 1.1 What Is ElastiCache?
ElastiCache is a web service that makes it easy to deploy, operate, and scale an in-memory cache in the cloud. The service improves the performance of web applications by allowing you to retrieve information from fast, managed, in-memory caches, instead of relying entirely on slower disk-based databases.

Amazon ElastiCache is protocol-compliant with `Memcached` and `Redis`, so code, applications, and popular tools that you use today with your existing Memcached or Redis environments will work seamlessly with the service.

### 1.2 Memcached vs Redis

Requirement                    | Memcached | Redis
-------------------------------|-----------|--------------
Simple Cache to offload DB     | Yes       | Yes
Ability to scale horizontally  | Yes       | Yes
Multi-threaded performance     | Yes       | No
Advanced data types            | No        | Yes
Ranking/Sorting data sets      | No        | Yes
Pub/Sub capabilities           | No        | Yes
Persistence                    | No        | Yes
Multi-AZ                       | No        | Yes
Backup & Restore Capabilities  | No        | Yes

### 1.3 Summary of Elasticache
* Use Elasticache to increase database and web application performance.
* Redis is Multi-AZ
* You can do back ups and restores of Redis

## 2. References
* [Amazon ElastiCache](https://aws.amazon.com/elasticache/)
* [Amazon ElastiCache FAQs](https://aws.amazon.com/elasticache/faqs/)
