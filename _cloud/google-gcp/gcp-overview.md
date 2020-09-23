---
layout: tutorial
key: cloud
title: "GCP-Overview-Draft"
index: 4201
subcategory: google-cloud
date: 2019-09-15
tags: [GCP]
draft: true
---

> Google GCP Tutorial

> Google Cloud Document Indexes

## 1. Google Cloud Certification
### 1.1 Google Associate Cloud Engineer
* [Google Professional Cloud Architect](https://cloud.google.com/certification/cloud-architect)
* [Google Associate Cloud Engineer](https://cloud.google.com/certification/cloud-engineer)
* [GCP Free Tier](https://cloud.google.com/free/docs/gcp-free-tier)
* [Best practices for enterprise organizations](https://cloud.google.com/docs/enterprise/best-practices-for-enterprise-organizations)

Exam:
* [Practice Exam for Associate Cloud Engineer](https://cloud.google.com/certification/practice-exam/cloud-engineer)
* [Professional Cloud Architect](https://cloud.google.com/certification/guides/professional-cloud-architect/)
* [Schedule Exam](https://www.webassessor.com/googlecloud/)

Videos:
* [Learn GCP with Mahesh](https://www.youtube.com/channel/UCL8vwy2jhEtQrC-Rx6qzCZg)
* [GCP Professional Cloud Architect Case Study](https://www.youtube.com/playlist?list=PLPS8Ty7UpM1UO889H2WZ1U9fWzWYfed8)
* [GCP Professional Cloud Architect Certification](https://www.youtube.com/watch?v=Ts9iLJ2g4Xg&list=PLPS8Ty7UpM1Wt3RDhNVOnNdmrJKyTa1Fs)

Training:
* [Writing and Passing the Google Cloud Associate Engineer Certification](https://medium.com/@sathishvj/writing-and-passing-the-google-cloud-associate-engineer-certification-a60c2f6d99c2)
* [Google Certified Associate Cloud Engineer 2019](https://acloud.guru/learn/gcp-certified-associate-cloud-engineer)

### 1.2 Resources
* [The Google Cloud Developer's Cheat Sheet](https://github.com/gregsramblings/google-cloud-4-words)
* [Google Cloud Tutorials](https://cloud.google.com/docs/tutorials)
* [Curated List of GCP educational resources](https://github.com/GoogleCloudPlatform/edu-resources)
* [Official Icons and Sample Diagrams](https://cloud.google.com/icons/)
* [qwiklabs](https://www.qwiklabs.com/payments/pricing)
* [codelabs](https://codelabs.developers.google.com/)

## 2. Google Cloud Certified Professional -  Architect - Bootcamp

### 2.2 Engine Types:
* Compute Engine
* App Engine
* Kubernetes Engine
* Cloud Functions

#### 2.2.1 Compute Engine(IaaS)
* [Compute Engine - Storage options](https://cloud.google.com/compute/docs/disks/)
- Zonal standard persistent disk and zonal SSD persistent disk: Efficient, reliable block storage.
- Regional persistent disk and regional SSD persistent disk: Regional block storage replicated in two zones.
- Local SSD: High performance, transient, local block storage.
- Cloud Storage buckets: Affordable object storage.
- Cloud Filestore: High performance file storage for Google Cloud Platform (GCP) users.

* [Instance groups](https://cloud.google.com/compute/docs/instance-groups/)
- Managed instance groups (MIGs): autoscaling, autohealing, regional (multiple zone) deployment, and automatic updating
- Unmanaged instance groups: load balance across a fleet of VMs that you manage yourself.

* [Running startup scripts](https://cloud.google.com/compute/docs/startupscript)
* [Running shutdown scripts](https://cloud.google.com/compute/docs/shutdownscript)

#### 2.2.2 App Engine(PaaS)
Split Traffic, A/B test

https://awwapp.com/#

#### 2.2.3 Kubernetes Engine
* Managed environment, unmanaged environment.
* Pod, Volume, Container, VMs, Pools.
* CD Pipeline.
* Cluster, node.

Three states in deployment lifecycle: Progressing, Completed or failed.
Deployment's Pod template.

Lab:
* Cluster,
* Workload

#### 2.2.4 Cloud Functions.
Serverless, Tigger, events, Sub/Pub

## 3. VPC
* Subnet
* Routing
* TAGs
* ingress/outgress rules
* VPC mode: Auto mode, Custom Mode
* VPC peering.
* IPAddress, FQDN
* Cloud VPN, static or dynamic routes
* Cloud Interconnect(AWS DirectConnect)
* Peering VPC or Shared VPC?
* Peering VPC for SaaS ecosystem.
* Load Balancing and Auto Scale

### 3.1 Network Connection
* [Cloud VPN](https://cloud.google.com/vpn/docs/concepts/overview)
* [Dedicated Interconnect Overview](https://cloud.google.com/interconnect/docs/concepts/dedicated-overview)
* [Partner Interconnect](https://cloud.google.com/interconnect/partners/)
* [Direct Peering](https://cloud.google.com/interconnect/docs/how-to/direct-peering)
* [What GCP Connection is right for you?](https://cloud.google.com/hybrid-connectivity/)

## 4. IAM
* Service account.
* three roles: Primitive Role, Curated Role, Custom Role.
* Cloud Audit Logging.
* GSuite, LDAP(Lightweight Directory Access Protocol)
* [Cloud Security Scanner](https://cloud.google.com/security-scanner/)
* [Understanding service accounts](https://cloud.google.com/iam/docs/understanding-service-accounts#migrating_data_to_google_cloud_platform)

## 5. Projects
Quotas

## 6. Google Stackdriver
* [Stackdriver logging- Command-line interface](https://cloud.google.com/logging/docs/reference/tools/gcloud-logging)
* [Stackdriver Trace](https://cloud.google.com/trace/docs/overview)


* Logging, monitoring,
* Stackdriver agent.

## 7. Storage options.
* Cloud SQL - Fully managed relational database services
* Cloud BigTable - Fully managed NoSQL database service
* Cloud BigQuery - Cloud data warehouse
* Cloud DataStore - NoSQL database
* Cloud Spanner - Relational database service, Strong Consistency

* [Cloud storage products](https://cloud.google.com/products/storage/)
* [Streaming transfers](https://cloud.google.com/storage/docs/streaming)

[Transfer Appliance](https://cloud.google.com/transfer-appliance/) is an offline data transfer service, from 100TB or 480TB of raw capacity per appliance.

Follow these rules of thumb when deciding whether to use `gsutil` or `Storage Transfer Service`:
* When transferring data from an on-premises location, use gsutil.
* When transferring data from another cloud storage provider, use Storage Transfer Service.

https://cloud.google.com/solutions/transferring-big-data-sets-to-gcp


## 8. Database Data Services

## 9. Details
### 9.1 Regions and Zones
A region is a specific geographical location where you can host your resources. Each region has one or more zones; most regions have three or more zones.

Regional resources can be used by any resources in that region, regardless of zone, while zonal resources can only be used by other resources in the same zone.
* Regional resources: static external IP addresses
* Zonal resources: virtual machine instances or zonal persistent disks

### 9.2 Stackdriver
* StackDriver is for monitoring and management for services, containers, applications, and infrastructure.
* StackDriver metrics
* Logs retention: Allows you to retain the logs in Stackdriver Logging for 30 days, and gives you a one-click configuration tool to archive data for a longer period in Cloud Storage, see https://cloud.google.com/logging/.

### 9.3 Google Cloud Endpoints
Develop, deploy, protect and monitor your APIs with Google Cloud Endpoints. Using an Open API Specification or one of our API frameworks, Cloud Endpoints gives you the tools you need for every phase of API development.

## 99. References
### 99.1 Official Documentation
* [Google Cloud SDK](https://cloud.google.com/sdk/)
* [Google Cloud Platform Pricing Calculator](https://cloud.google.com/products/calculator/)
* [Regions and Zones](https://cloud.google.com/compute/docs/regions-zones/)
* [gcloud command-line tool overview](https://cloud.google.com/sdk/gcloud/)
* [gcloud projects](https://cloud.google.com/sdk/gcloud/reference/projects/)
* [GCP Storage Options](https://cloud.google.com/compute/docs/disks/)
* [Stackdriver](https://cloud.google.com/stackdriver/)
* [StackDriver - Metrics](https://cloud.google.com/monitoring/api/v3/metrics)
* [Dedicated Interconnect Overview](https://cloud.google.com/interconnect/docs/concepts/dedicated-overview)
* [Learn how to add continuous security validation to your CI/CD pipeline](https://docs.microsoft.com/en-us/azure/devops/migrate/security-validation-cicd-pipeline?view=azure-devops)
* [Cloud Storage FUSE](https://cloud.google.com/storage/docs/gcs-fuse)
* [Using Blue-Green Deployment to Reduce Downtime and Risk](https://docs.cloudfoundry.org/devguide/deploy-apps/blue-green.html)
* [A Comprehensive Guide to Canary Releases](https://blog.getambassador.io/cloud-native-patterns-canary-release-1cb8f82d371a)
* [Best practices for enterprise organizations](https://cloud.google.com/docs/enterprise/best-practices-for-enterprise-organizations#authentication-and-identity)

### 99.2 Third-party Blogs
* [What Is BGP? - BGP Routing Explained](https://www.cloudflare.com/learning/security/glossary/what-is-bgp/)

### 99.3 Summary
* Use Cloud Bigtable for time series data, use Cloud Spanner for transactional data, and use BigQuery
for historical data queries.

### 99.4 Important topics
* [How to guarantee the sequence of message](https://cloud.google.com/pubsub/docs/ordering)
