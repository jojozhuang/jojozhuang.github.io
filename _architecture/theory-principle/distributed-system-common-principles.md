---
layout: tutorial
key: architecture
title: "Distributed System - Common Principles"
index: 3001
subcategory: theory-principle
date: 2018-08-15
tags: [Paxos, Raft]
---

> Paxos and Raft

## 1. Key Concepts
Key Concepts1:
* Vertical vs Horizontal Scaling
* CAP theorem: Consistency, Availability, Partition tolerance
* ACID vs BASE
* Partitioning/Sharding Data-consistent hashing
* Optimistic vs Pessimistic Locking
* Strong vs Eventual consistency
* Relational DB vs NoSQL
* Type of NoSQL: Key value, wide column, document based, graph based
* Caching
* Data Center/Rocks/Hosts
* CPU/Memory/Hard Drive/Network bandwidth
* Random vs Sequential, read/write a disk

Key Concepts2:
* http vs http2 vs websocket
* TCP/IP model: 4 layers
* IPv4 vs IPv6
* TCP vs UDP
* DNS lookup
* Https & TCS
* TTL - Time to Live
* Public key infrastructure & Certificate Authority
* Symmetric vs Asymmetric Encryption
* Load Balancer -L4 vs L7
* CDNs & Edge
* Bloom Filters & Count-min sketch
* Paxos-Consensus over distributed hosts-leader election
* Design patterns & Objected oriented Design
* Virtual Machine & containers
* Publiser-subscriber over queue
* Map reduce
* Multi-threading, concurrency, locks, synchronization, CAS
* Database replication
* Database partitioning
* A/B testing
* MapReduce
* Machine Learning(R, Python, Mahout, MLib)
* Cloud Computing, Virtualization

Tools/Softwares:
* Cassandra
* MongoDB/Couchbase
* MySQL
* Memcached
* Redis
* Zookeeper
* Kafka
* Nginx/LVS/HAProxy
* Solr/Elastic Search
* Blobstore like Amazon S3
* Container/Docker/Kubernets/mesos
* Hadoop/Spark/Storm, HDFS,HBase
* OpenStack/KVM
* Yarn(Resource Manager, Node Manager, Application Master, Container)
* Chubby



### 1.5 Components
* Load Balancing
* Caching(LRU)
* CDNs
* Consistent hashing
* 80/20 rule
* Rate Limiter
* Reverse Index for search
* bloom filters for de-depulicate

## 2. Comparison
### 2.1 CAP Theorem
In a distributed computer system, you can only support two of the following guarantees:
* **Consistency** - Every read receives the most recent write or an error
* **Availability** - Every request receives a response, without guarantee that it contains the most recent version of the information
* **Partition Tolerance** - The system continues to operate despite arbitrary partitioning due to network failures

![image](/assets/images/note/9501/cap-theorem.png){:width="400px"}
* Networks aren't reliable, so you'll need to support partition tolerance. You'll need to make a software tradeoff between consistency and availability.

**CP - consistency and partition tolerance**  
Waiting for a response from the partitioned node might result in a timeout error. CP is a good choice if your business needs require atomic reads and writes.

**AP - availability and partition tolerance**  
Responses return the most recent version of the data available on a node, which might not be the latest. Writes might take some time to propagate when the partition is resolved.
AP is a good choice if the business needs allow for **eventual consistency** or when the system needs to continue working despite external errors.

### 2.2 BASE
`BASE` is often used to describe the properties of NoSQL databases. In comparison with the **CAP Theorem**, BASE chooses availability over consistency.
* **Basically available** - the system guarantees availability.
* **Soft state** - the state of the system may change over time, even without input.
* **Eventual consistency** - the system will become consistent over a period of time, given that the system doesn't receive input during that period.


## 2. Trade-offs
Key concepts and trade-offs:
* `Performance` vs `Scalability`
* `Latency` vs `Throughput`
* `Availability` vs `Consistency`

### 2.1 Performance vs. Scalability
A service is `scalable` if it results in increased `performance` in a manner proportional to resources added. Generally, increasing performance means serving more units of work, but it can also be to handle larger units of work, such as when datas grows.

Another way to look at performance vs scalability:
* If you have a **performance** problem, your system is slow for a single user.
* If you have a **scalability** problem, your system is fast for a single user but slow under heavy load.

### 2.2 Latency vs. Throughput
* **Latency** is the time to perform some action or to produce some result.
* **Throughput** is the number of such actions executed or results produced per unit of time.

Generally, you should aim for **maximal throughput** with **acceptable latency**.

The following manufacturing example should clarify these two concepts:

An assembly line is manufacturing cars. It takes eight hours to manufacture a car and that the factory produces one hundred and twenty cars per day.
* The latency is: 8 hours.
* The throughput is: 120 cars / day or 5 cars / hour.

### 2.3 Availability vs. Consistency
Networks aren’t reliable, so you’ll need to support partition tolerance. According to CAP Theorem, you’ll need to make a software tradeoff between consistency and availability.
* Consistency - Every read receives the most recent write or an error
* Availability - Every request receives a response, without guarantee that it contains the most recent version of the information
* Partition Tolerance - The system continues to operate despite arbitrary partitioning due to network failures

## 3. Consistency Patterns
With multiple copies of the same data, we are faced with options on how to synchronize them so clients have a consistent view of the data. Recall the definition of consistency from the CAP theorem - Every read receives the most recent write or an error.
### 3.1 Weak Consistency
After a write, reads may or may not see it. A best effort approach is taken. This approach is seen in systems such as memcached. Weak consistency works well in real time use cases such as VoIP, video chat, and realtime multiplayer games. For example, if you are on a phone call and lose reception for a few seconds, when you regain connection you do not hear what was spoken during connection loss.
### 3.2 Eventual Consistency
After a write, reads will eventually see it (typically within milliseconds). Data is replicated **asynchronously**. This approach is seen in systems such as DNS and email. Eventual consistency works well in **highly available systems**.
### 3.3 Strong Consistency
After a write, reads will see it. Data is replicated **synchronously**. This approach is seen in file systems and RDBMSes. Strong consistency works well in systems that need **transactions**.

## 4. Availability Patterns
There are two main patterns to support high availability: `fail-over` and `replication`.
### 4.1 Fail-over
#### Active-passive
With `active-passive` fail-over, heartbeats are sent between the active and the passive server on standby. If the heartbeat is interrupted, the passive server takes over the active's IP address and resumes service.

The length of downtime is determined by whether the passive server is already running in 'hot' standby or whether it needs to start up from 'cold' standby. Only the active server handles traffic.

Active-passive failover can also be referred to as `master-slave` failover.

#### Active-active
In `active-active`, both servers are managing traffic, spreading the load between them.

If the servers are public-facing, the DNS would need to know about the public IPs of both servers. If the servers are internal-facing, application logic would need to know about both servers.

Active-active failover can also be referred to as `master-master` failover.

#### Disadvantage(s): failover

* Fail-over adds more hardware and additional complexity.
* There is a potential for loss of data if the active system fails before any newly written data can be replicated to the passive.

### 4.2 Replication
#### Master-slave and master-master
This topic is further discussed in the Database:
* `Master-slave` replication
* `Master-master` replication

### 4.3 Availability in numbers
Availability is often quantified by uptime (or downtime) as a percentage of time the service is available. Availability is generally measured in number of 9s--a service with 99.99% availability is described as having four 9s.

#### 99.9% availability - three 9s

| Duration            | Acceptable downtime|
|---------------------|--------------------|
| Downtime per year   | 8h 45min 57s       |
| Downtime per month  | 43m 49.7s          |
| Downtime per week   | 10m 4.8s           |
| Downtime per day    | 1m 26.4s           |

#### 99.99% availability - four 9s

| Duration            | Acceptable downtime|
|---------------------|--------------------|
| Downtime per year   | 52min 35.7s        |
| Downtime per month  | 4m 23s             |
| Downtime per week   | 1m 5s              |
| Downtime per day    | 8.6s               |

### 4.4 Availability in parallel vs in sequence
If a service consists of multiple components prone to failure, the service's overall availability depends on whether the components are in `sequence` or in `parallel`.

**In sequence**  
Overall availability decreases when two components with availability < 100% are in sequence:
```
Availability (Total) = Availability (Foo) * Availability (Bar)
```

If both `Foo` and `Bar` each had 99.9% availability, their total availability in sequence would be 99.8%.

**In parallel**  
Overall availability increases when two components with availability < 100% are in parallel:
```
Availability (Total) = 1 - (1 - Availability (Foo)) * (1 - Availability (Bar))
```

If both `Foo` and `Bar` each had 99.9% availability, their total availability in parallel would be 99.9999%.

## 5. Reference
* [The System Design Primer](https://github.com/donnemartin/system-design-primer/blob/master/README.md)
* [A word on scalability](http://www.allthingsdistributed.com/2006/03/a_word_on_scalability.html)
* [Scalability, availability, stability, patterns](http://www.slideshare.net/jboner/scalability-availability-stability-patterns/)
* [Understanding latency vs throughput](https://community.cadence.com/cadence_blogs_8/b/sd/archive/2010/09/13/understanding-latency-vs-throughput)
* [CAP theorem revisited](http://robertgreiner.com/2014/08/cap-theorem-revisited/)
* [A plain english introduction to CAP theorem](http://ksat.me/a-plain-english-introduction-to-cap-theorem/)
* [CAP FAQ](https://github.com/henryr/cap-faq)
* [Google I/O 2009 - Transactions Across Datacenters](https://www.youtube.com/watch?v=srOgpXECblk)
