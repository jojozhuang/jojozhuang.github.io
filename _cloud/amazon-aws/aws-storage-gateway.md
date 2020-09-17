---
layout: tutorial
key: cloud
title: "AWS-Storage Gateway"
index: 4113
subcategory: amazon-aws
date: 2019-09-16
tags: [AWS, Storage Gateway]
---

> Using Storage Gateway for integrating with on-premise software.

## 1. Storage Gateway
### 1.1 What is Storage Gateway
The AWS Storage Gateway service enables hybrid cloud storage between **on-premises** environments and the **AWS Cloud**. It seamlessly integrates on-premises enterprise applications and workflows with Amazon’s block and object cloud storage services through industry standard storage protocols. It provides low-latency performance by caching frequently accessed data on premises, while storing data securely and durably in Amazon cloud storage services.
### 1.2 Types of Storage Gateway
AWS Storage Gateway supports three storage interfaces: file, volume, and tape. Each gateway you have can provide one type of interface.
* The `file gateway` enables you to store and retrieve objects in Amazon S3 using file protocols, such as `NFS`. Objects written through file gateway can be directly accessed in S3.
* The `volume gateway` provides block storage to your applications using the `iSCSI` protocol. Data on the volumes is stored in Amazon S3. To access your iSCSI volumes in AWS, you can take EBS snapshots which can be used to create EBS volumes.
* The tape gateway provides your backup application with an iSCSI virtual tape library (`VTL`) interface, consisting of a virtual media changer, virtual tape drives, and virtual tapes. Virtual tape data is stored in Amazon S3 or can be archived to `Amazon Glacier`.

### 1.3 Difference of Types
* File Gateway
  - File Gateway - For flat files, stored directly on S3.
* Volume Gateway
  - Stored Volumes - Entire Dataset is stored on site and is asynchronously backed up to S3.
  - Cached Volumes - Entire Dataset is stored on S3 and the most frequently accessed data is cached on site.
* Gateway Virtual Tap Library
  - Used for backup and uses popular backup applications like NetBackup, Backup Exec, Veeam etc.

## 2. File Gateway
File gateway presents a file-based interface to Amazon S3, which appears as a network file share. It enables you to store and retrieve Amazon S3 objects through standard file storage protocols. File gateway allows your existing file-based applications or devices to use secure and durable cloud storage without needing to be modified. With file gateway, your configured S3 buckets will be available as Network File System (NFS) mount points or Server Message Block (SMB) file shares. Your applications read and write files and directories over NFS or SMB, interfacing to the gateway as a file server. In turn, the gateway translates these file operations into object requests on your S3 buckets. Your most recently used data is cached on the gateway for low-latency access, and data transfer between your data center and AWS is fully managed and optimized by the gateway. Once in S3, you can access the objects directly or manage them using features such as S3 Lifecycle Policies, object versioning, and cross-region replication. You can run file gateway on-premises or in EC2.
![image](/assets/images/cloud/4113/file-gateway-concepts.png)

## 3. Volume Gateway
Volume gateway provides an iSCSI target, which enables you to create block storage volumes and mount them as iSCSI devices from your on-premises or EC2 application servers. The volume gateway runs in either a cached or stored mode.
* In the `cached mode`, your primary data is written to S3, while retaining your frequently accessed data locally in a cache for low-latency access.
![image](/assets/images/cloud/4113/aws-storage-gateway-cached.png)
* In the `stored mode`, your primary data is stored locally and your entire dataset is available for low-latency access while asynchronously backed up to AWS.
![image](/assets/images/cloud/4113/aws-storage-gateway-stored.png)

In either mode, you can take point-in-time snapshots of your volumes, which are stored as Amazon EBS Snapshots in AWS, enabling you to make space-efficient versioned copies of your volumes for data protection, recovery, migration and various other copy data needs.

## 4. Tape Gateway
Tape gateway is a cloud-based Virtual Tape Library (VTL). It presents your backup application with a VTL interface, consisting of a media changer and tape drives. You can create virtual tapes in your virtual tape library using the AWS Management Console. Your backup application can read data from or write data to virtual tapes by mounting them to virtual tape drives using the virtual media changer. Virtual tapes are discovered by your backup application using its standard media inventory procedure. Virtual tapes are available for immediate access and are backed by Amazon S3. You can also archive tapes. Archived tapes are stored in Amazon S3 Glacier or Amazon S3 Glacier Deep Archive.
![image](/assets/images/cloud/4113/tape-gateway-volume-gateway.png)

## 5. References
* [AWS Storage Gateway](https://aws.amazon.com/storagegateway)
* [AWS Storage Gateway FAQs](https://aws.amazon.com/storagegateway/faqs/)
