---
layout: tutorial
key: cloud
title: "AWS-EC2-Elastic Block Store"
index: 4122
subcategory: amazon-aws
date: 2019-09-16
tags: [AWS, EC2, EBS]
---

> Learn about EBS, Volumes and Snapshots.

## 1. EBS
### 1.1 What Is EBS?
Amazon Elastic Block Store (EBS) provides persistent block storage volumes for use with Amazon EC2 instances in the AWS Cloud. Each Amazon EBS volume is automatically replicated within its Availability Zone to protect you from component failure, offering high availability and durability.

### 1.2 EBS Types
There are 5 Different Types of EBS Storage:
* General Purpose (SSD)
* Provisioned lOPS (SSD)
* Throughput Optimized Hard Disk Drive
* Cold Hard Disk Drive
* Magnetic

### 1.3 Comparison of EBS Types

Volume Type | General Purpose SDD | Provisioned IOPS SSD | Throughput Optimized HDD | Cold HDD | EBS Magnetic
------------|---------------------|----------------------|---------------------------|------------|-------------------
Description | General purpose SSD volume that balances price and performance for a wide variety of transactional workloads | Highest-performance SSD volume designed for mission-critical applications | Low cost HDD volume designed for frequently accessed, throughput-intensive workloads | Lowest cost HDD volume designed for less frequently accessed workloads | Previous generation HDD
Use Cases   | Most Work Loads | Databases | Big Data & Data Warehouses | File Servers | Workloads where data is infrequently accessed Standard
API Name    | gp2 | iol | st1 | sc1 | Standard
Volume Size | 1 GB - 16 TB | 4 GB - 16 TB | 500 GB - 16 TB | 500 GB - 16 TB |  1 GB-1 TB
Max. IOPS Volume | 16,000 | 64,000 | 500 | 250 | 40-200

## 2. Lab - EBS
### 2.1 Volumes & Snapshots
When launching a new instance, one EBS volume is attached automatically and they are in the same Available Zone.
![image](/assets/images/cloud/4122/volumes-snapshots-1.png)
Go to Services->EC2->Elastic Block Store->Volumes
![image](/assets/images/cloud/4122/volumes-snapshots-2.png)
### 2.2 Creating EC2 Instance with Additional EBS Volumes
Launch a new instance with adding three additional EBS volumes.
![image](/assets/images/cloud/4122/volumes-snapshots-3.png)
After the instance is started, we will see four volumes.
![image](/assets/images/cloud/4122/volumes-snapshots-4.png)
Here, we can change the size of volume. For example, change the size of HDD from 500GB to 1000GB.
![image](/assets/images/cloud/4122/volumes-snapshots-5.png)
We can also change the Volume type from "Standard SDD" to "Provisioned IOPS SSD" for root volume.
![image](/assets/images/cloud/4122/volumes-snapshots-6.png)
Save the change, after a while, we will see the change is go live. For the root volume, type is changed from gp2 to io1.
![image](/assets/images/cloud/4122/volumes-snapshots-7.png)
### 2.3 Creating EC2 Instance in Another AZ
Select root volume, Actions->Create Snapshot.
![image](/assets/images/cloud/4122/volumes-snapshots-8.png)
Wait for a while, we will see the snapshot is ready.
![image](/assets/images/cloud/4122/volumes-snapshots-9.png)
Now we can create image with this snapshot.
![image](/assets/images/cloud/4122/volumes-snapshots-10.png)
The new image appears in the AMIs, and it is ready to use.
![image](/assets/images/cloud/4122/volumes-snapshots-11.png)
Let's launch a new instance with this image, choose a different AZ.
![image](/assets/images/cloud/4122/volumes-snapshots-12.png)
After launch, notice it is in a different AZ(us-west-1a) from the original one(us-west-1c).
![image](/assets/images/cloud/4122/volumes-snapshots-13.png)
We can also move the EBS volume to another region by copying AMI image to another region and launch new instance with it. And we can choose any AZ in that region.
![image](/assets/images/cloud/4122/volumes-snapshots-14.png)
### 2.4 Volumes after Instances are Terminated
What happens to volumes if instances are terminated, will they all be deleted as well? See below.

Now we have two instance running.
![image](/assets/images/cloud/4122/volumes-snapshots-15.png)
And we have 5 volumes for above two instances.
![image](/assets/images/cloud/4122/volumes-snapshots-16.png)
After the two instances are terminated, the addition volumes are still there, their states are changed to "available" though. Only the root volumes are deleted.
![image](/assets/images/cloud/4122/volumes-snapshots-17.png)
### 2.5 Summary of Volumes & Snapshots
* Volumes exist on EBS. Think of EBS as a virtual hard disk
* Snapshots exist on S3. Think of snapshots as a photograph of the disk.
* Snapshots are point in time copies of Volumes.
* Snapshots are incremental — this means that only the blocks that have changed since your last snapshot are moved to S3.
* If this is your first snapshot, it may take some time to create.
* To create a snapshot for Amazon EBS volumes that serve as root devices, you should stop the instance before taking the snapshot.
* However you can take a snap while the instance is running.
* You can create AMI's from both Volumes and Snapshots.
* You can change EBS volume sizes on the fly, including changing the size and storage type.
* Volumes will ALWAYS be in the same availability zone as the EC2 instance.
* To move an EC2 volume from one AZ to another, take a snapshot of it, create an AMI from the snapshot and then use the AMI to launch the EC2 instance in a new AZ.
* To move an EC2 volume from one region to another, take a snapshot of it, create an AMI from the snapshot and then copy the AMI from one region to the other. Then use the copied AMI to launch the new EC2 instance in the new region.

## 3. AMI Types
### 3.1 AMI Types
You can select your AMI based on:
* Region (see Regions and Availability Zones)
* Operating system
* Architecture (32-bit or 64-bit)
* Launch Permissions
* Storage for the Root Device
  - Instance Store (EPHEMERAL STORAGE)
  - EBS Backed Volumes

### 3.2 EBS vs Instance Store
All AMIs are categorized as either backed by Amazon EBS or backed by instance store.
* **EBS Volumes**: The root device for an instance launched from the AMI is an Amazon EBS volume created from an Amazon EBS snapshot.
* **Instance Store Volumes**: The root device for an instance launched from the AMI is an instance store volume created from a template stored in Amazon S3.

### 3.3 Using Instance Store
Create EC2 instance with instance store. Launch instance, switch to "Community AMIs".
![image](/assets/images/cloud/4122/ec2-create-instance-store-1.png)
Go through the AMIs list and select one.
![image](/assets/images/cloud/4122/ec2-create-instance-store-2.png)
Choose the first available instance type.
![image](/assets/images/cloud/4122/ec2-create-instance-store-3.png)
Keep the default settings. In step "Add Storage", notice the volume type is Instance Store.
![image](/assets/images/cloud/4122/ec2-create-instance-store-4.png)
Continue with the default settings and reuse the security group created previously and launch.
![image](/assets/images/cloud/4122/ec2-create-instance-store-5.png)
Instance store can't be stopped. Terminate it as it is not free in the free trial.
![image](/assets/images/cloud/4122/ec2-create-instance-store-6.png)
### 3.4 Summary of EBS and Instance Store
* Instance Store Volumes are sometimes called Ephemeral Storage.
* Instance store volumes cannot be stopped. If the underlying host fails, you will lose your data.
* EBS backed instances can be stopped. You will not lose the data on this instance if it is stopped.
* You can reboot both, you will not lose your data.
* By default, both ROOT volumes will be deleted on termination. However, with EBS volumes, you can tell AWS to keep the root device volume.

## 4. EBS Encryption
### 4.1 Amazon EBS encryption
Use Amazon EBS encryption as a straight-forward encryption solution for your EBS resources associated with your EC2 instances. With Amazon EBS encryption, you aren't required to build, maintain, and secure your own key management infrastructure. Amazon EBS encryption uses AWS Key Management Service (AWS KMS) customer master keys (CMK) when creating encrypted volumes and snapshots.

Encryption operations occur on the servers that host EC2 instances, ensuring the security of both data-at-rest and data-in-transit between an instance and its attached EBS storage.

You can attach both encrypted and unencrypted volumes to an instance simultaneously.

### 4.2 How EBS encryption works
You can encrypt both the boot and data volumes of an EC2 instance. When you create an encrypted EBS volume and attach it to a supported instance type, the following types of data are encrypted:
* Data at rest inside the volume
* All data moving between the volume and the instance
* All snapshots created from the volume
* All volumes created from those snapshots

### 4.3 Steps to Create Encrypted Instances
* Create a Snapshot of the unencrypted root device volume.
* Create a copy of the Snapshot and select the encrypt option.
* Create an AMI from the encrypted Snapshot.
* Use that AMI to launch new encrypted instances.

### 4.4 Lab - Encrypted Instance
Volumes->Select one volume, Actions->Create Snapshot.
![image](/assets/images/cloud/4122/ec2-volume-create-snapshot-1.png)
Set description, then "Create Snapshot".
![image](/assets/images/cloud/4122/ec2-volume-create-snapshot-2.png)
Switch to Snapshots view and wait until it's finished.
![image](/assets/images/cloud/4122/ec2-volume-create-snapshot-3.png)
Copy and choose encrypted.
![image](/assets/images/cloud/4122/ec2-volume-create-snapshot-4.png)
The new instance is launched.
![image](/assets/images/cloud/4122/ec2-volume-create-snapshot-5.png)
Select it and create image with it.
![image](/assets/images/cloud/4122/ec2-volume-create-snapshot-6.png)
Switch to Images view and see the AMI.
![image](/assets/images/cloud/4122/ec2-volume-create-snapshot-7.png)
Now, we can use this image to launch new instance, notice it is encrypted by default.
![image](/assets/images/cloud/4122/ec2-volume-create-snapshot-8.png)

### 4.5 Summary of EBS Encryption
* Snapshots of encrypted volumes are encrypted automatically.
* Volumes restored from encrypted snapshots are encrypted automatically.
* You can share snapshots, but only if they are unencrypted.
* These snapshots can be shared with other AWS accounts or made public.
* You can now encrypt root device volumes upon creation of the EC2 instance.

## 5. References
* [Amazon Elastic Block Store (Amazon EBS)](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AmazonEBS.html)
* [Amazon EBS encryption](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EBSEncryption.html)
