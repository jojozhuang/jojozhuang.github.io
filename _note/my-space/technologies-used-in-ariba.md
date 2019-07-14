---
layout: tutorial
key: note
title: "Technologies Used in Ariba(Draft)"
index: 9020
category: my-space
breadcrumb: [Note, Work Space, My Space]
date: 2017-07-20
tags: [Ariba]
---

> Makefile, Perl, shell script.

## 1. Ariba Cloud Applications Overview
* Ariba Network (suppliers and buyers)
* Ariba on demand buyer solutions
  - Strategic Procurement
  - Operational Procurement

### 1.1 Ariba Network
* Cloud-based business network(B2B) where buyers and suppliers establish business relationships and run business transactions.
* Millions of buyers and suppliers, operating in more than 190 countries, trade 2.1 trillion USD annually.
* An important component of SAP’s business network strategy, together with networks for other domains, such as contingent labor (Fieldglass) and travel (Concur).

### 1.2 Ariba Network Functions
* Automating business transactions
* Processing and routing of business documents
* Supplier catalog management, supplier enablement, payment, working capital management, and Ariba Discovery

### 1.3 Ariba on Demand Buyer Solutions
Ariba offers two groups of on demand buyer solutions, called upstream buyer and downstream buyer solutions.
* The `upstream buyer` solutions cover what is sometimes called strategic procurement. This includes collaborative sourcing (finding suppliers for a given need), collaborative contract management, supplier information and performance management, and spend analysis. The on demand upstream buyer solutions are sometimes referred to as Shared Services Strategic Sourcing (`S4`).
* The `downstream buyer` solutions cover the operational procurement processes. This includes, for example, managing buyer catalogs, creation and approval of purchase requisitions, creating and sending purchase orders, receiving items, and invoice reconciliation and approval. The on demand downstream buyer solutions are sometimes referred to as Shared Services Procurement (`SSP`).

More details:
* The solutions are called 'upstream' and 'downstream' because you first do the sourcing and negotiate contracts before you order.
* The upstream and downstream applications run in separate server clusters in the data centers, have separate databases, and can be upgraded independently.

### 1.4 Ariba Upstream Buyer Solutions
* sourcing
* collaborative contract management
* supplier information and performance management
* spend visibility

### 1.5 Downstream
Source of invoice:
* ICS(Invoice Conversion Service) Invoice from PDF or Image.
* ERP copy invoice - read-only in buyer
* AN invoices
* CC invoice - created in buyer.

Invoice Categories:
* Contract-based invoice
* PO-based invoice
* Non-PO invoice

Invoicing Documents:
* Invoice
* IR (Invoice Reconciliation)
* Payment
  * Payment Terms
  * Remittance Data

Document Status:
* Invoice: Composing, Submitted, Approving, Approved, Reconciling, Reconciled
* IR: Reconciling, Approving, Rejected, Canceling, Canceled, Approved, Paying, Paid
* Payment: Processing, Sending, Scheduled, Paid

Invoice Exceptions:
* Under Tax Variance
* Over Tax Variance
* PO Received Quantity Variance
* Tax Calculation Failed

## 2. Integration
### 2.1 CSV files
CSV files are called OK-to-pay file, contains the information about the reconciled invoices that are ready to be paid by the ERP system.
* [Remittance advice](https://en.wikipedia.org/wiki/Remittance_advice)

### 2.2 cXML Overview
`cXML` (Commerce eXtensible Markup Language) is a communication protocol for business-to-business transactions in the commerce domain. It is based on HTTP and XML. The cXML specification was created by Ariba based on the input of many companies and is maintained by Ariba. It is published on http://cxml.org with a free license for using and implementing the protocol.
cXML has an extension mechanism called `extrinsics`.

## 3. Cloud
### 3.1 Concepts
In cloud computing, `multi-tenant` is the phrase used to describe multiple customers using the same public cloud.
Ariba Terminology: tenant<->realm

### 3.2 Web Server
* Ariba Network: WebObjects application server
* Buyer UpStream and Buyer DownStream: Apache Tomcat

## 4. Application Lifecycle Management
### 4.1 Deployment Cycles
Ariba applications are updated on the following occasions:
* 1 release upgrade per year
* monthly service packs
* weekly hotfixes
* daily data changes (only configuration parameters in database, no software change)

Hotfixes must not contain any changes that require data migrations. Service packs and release upgrades may include data migrations.

### 4.2 Rolling Upgrade
The `rolling upgrade` procedure helps to avoid planned downtime. With this procedure an application cluster can be upgraded to a new software build without downtime. This is achieved by assigning the nodes in the cluster to two upgrade groups, and upgrading one group after the other. In a first step, the nodes in group 1 are upgraded, while group 2 is still operational and serving user requests. The nodes in group 1 are shut down, the new build is deployed, and group 1 is started again. When group 1 is running again, the process is repeated for group 2. The rolling upgrade procedure is the reason why communities always contain an `even` number of nodes for each role.

The same procedure is used for a `rolling restart` of the cluster, with the only difference that no new software is deployed. Such a restart is done at regular times for stability reasons, mainly to get rid of memory leaks.

## 6. Questions
* 1) Do we have Remittance advice in SSP?
* 2) [NetApp_filer](https://en.wikipedia.org/wiki/NetApp_filer)

## 7. More
### 7.1 Consistent hashing  
hash ring, circle/ring, distributed system, load balancing, cache.
* [Consistent hashing](https://en.wikipedia.org/wiki/Consistent_hashing)
* [System Design : What is Consistent Hashing?](https://www.youtube.com/watch?v=zaRkONvyGr8)

### 7.2 Lock
* Optimistic Locking - version number
* Pessimistic Locking - exclusive lock

* [Optimistic vs. Pessimistic locking](https://stackoverflow.com/questions/129329/optimistic-vs-pessimistic-locking)

### 7.3 Search
* Apache Solr: search server
* Apache Lucene: full text indexing and search engine
* Elasticsearch is an open source (Apache 2 license), distributed, a RESTful search engine built on top of the Apache Lucene library. Elasticsearch was introduced a few years after Solr.
* Apache ZooKeeper
* OData
* OAuth

## 8. Terminology
* SasS: software-as-a-service
* S4: Shared Services Strategic Sourcing
* SSP: Shared Services Procurement

## 9. References
* [Using make](https://courses.cs.washington.edu/courses/cse373/99au/unix/make.html)
* [Ariba Platform knowledge resources](https://wiki-ariba.sjc.sap.corp/display/ENGDPTS/Ariba+Platform+knowledge+resources)
* [Ariba Architecture Blue Book](https://portal.wdf.sap.corp/irj/go/km/docs/corporate_portal/WS%20PTG/Product%20Architecture/Knowledge%20Transfer/Bluebook/Ariba%20Cloud.pdf)
