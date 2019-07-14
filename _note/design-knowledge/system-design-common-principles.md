---
layout: tutorial
key: note
title: "System Design - Common Principles"
index: 9501
category: design-knowledge
date: 2019-01-01
tags: [System Design, Trade-Offs, CAP, BASE]
---

> Learn how to design large-scale systems.

## 1. Getting Started
First, get a basic understanding of common principles, learning about what they are, how they are used, and their pros and cons.

Below is the generic system architecture.
![image](/public/images/note/9501/generic_system_architecture.png){:width="700px"}

### 1.1 Review the scalability video lecture
[Scalability Lecture at Harvard](https://www.youtube.com/watch?v=-W9F__D3oY4)
* Topics covered:
    * Vertical scaling
    * Horizontal scaling
    * Caching
    * Load balancing
    * Database replication
    * Database partitioning

### 1.2 Review the scalability article
[Scalability](http://www.lecloud.net/tagged/scalability/chrono)
* Topics covered:
    * [Clones](http://www.lecloud.net/post/7295452622/scalability-for-dummies-part-1-clones)
    * [Databases](http://www.lecloud.net/post/7994751381/scalability-for-dummies-part-2-database)
    * [Caches](http://www.lecloud.net/post/9246290032/scalability-for-dummies-part-3-cache)
    * [Asynchronism](http://www.lecloud.net/post/9699762917/scalability-for-dummies-part-4-asynchronism)

## 2. Trade-offs
Key concepts and trade-offs:
* `Performance` vs `Scalability`
* `Latency` vs `Throughput`
* `Availability` vs `Consistency`

### 2.1 Performance vs scalability
A service is `scalable` if it results in increased `performance` in a manner proportional to resources added. Generally, increasing performance means serving more units of work, but it can also be to handle larger units of work, such as when [datasets grow](http://www.allthingsdistributed.com/2006/03/a_word_on_scalability.html).

Another way to look at performance vs scalability:
* If you have a **performance** problem, your system is slow for a single user.
* If you have a **scalability** problem, your system is fast for a single user but slow under heavy load.

**Source(s) and further reading:**
* [A word on scalability](http://www.allthingsdistributed.com/2006/03/a_word_on_scalability.html)
* [Scalability, availability, stability, patterns](http://www.slideshare.net/jboner/scalability-availability-stability-patterns/)

### 2.2 Latency vs throughput
* **Latency** is the time to perform some action or to produce some result.
* **Throughput** is the number of such actions or results per unit of time.

Generally, you should aim for **maximal throughput** with **acceptable latency**.

**Source(s) and further reading:**
* [Understanding latency vs throughput](https://community.cadence.com/cadence_blogs_8/b/sd/archive/2010/09/13/understanding-latency-vs-throughput)

### 2.3 Availability vs consistency
##### `CAP theorem`
In a distributed computer system, you can only support two of the following guarantees:
* **Consistency** - Every read receives the most recent write or an error
* **Availability** - Every request receives a response, without guarantee that it contains the most recent version of the information
* **Partition Tolerance** - The system continues to operate despite arbitrary partitioning due to network failures

![image](/public/images/note/9501/cap-theorem.png){:width="400px"}
* Networks aren't reliable, so you'll need to support partition tolerance.  You'll need to make a software tradeoff between consistency and availability.

**CP - consistency and partition tolerance**  
Waiting for a response from the partitioned node might result in a timeout error.  CP is a good choice if your business needs require atomic reads and writes.

**AP - availability and partition tolerance**  
Responses return the most recent version of the data available on a node, which might not be the latest.  Writes might take some time to propagate when the partition is resolved.  
AP is a good choice if the business needs allow for [eventual consistency](#eventual-consistency) or when the system needs to continue working despite external errors.

**Source(s) and further reading:**
* [CAP theorem revisited](http://robertgreiner.com/2014/08/cap-theorem-revisited/)
* [A plain english introduction to CAP theorem](http://ksat.me/a-plain-english-introduction-to-cap-theorem/)
* [CAP FAQ](https://github.com/henryr/cap-faq)

`BASE` is often used to describe the properties of NoSQL databases.  In comparison with the `CAP Theorem`, BASE chooses availability over consistency.
* **Basically available** - the system guarantees availability.
* **Soft state** - the state of the system may change over time, even without input.
* **Eventual consistency** - the system will become consistent over a period of time, given that the system doesn't receive input during that period.

## 3. Consistency Patterns
With multiple copies of the same data, we are faced with options on how to synchronize them so clients have a consistent view of the data.  Recall the definition of consistency from the [CAP theorem](#cap-theorem) - Every read receives the most recent write or an error.
### 3.1 Weak Consistency
After a write, reads may or may not see it. A best effort approach is taken. This approach is seen in systems such as memcached.  Weak consistency works well in real time use cases such as VoIP, video chat, and realtime multiplayer games.  For example, if you are on a phone call and lose reception for a few seconds, when you regain connection you do not hear what was spoken during connection loss.
### 3.2 Eventual Consistency
After a write, reads will eventually see it (typically within milliseconds). Data is replicated asynchronously. This approach is seen in systems such as DNS and email.  Eventual consistency works well in highly available systems.
### 3.3 Strong Consistency
After a write, reads will see it. Data is replicated synchronously. This approach is seen in file systems and RDBMSes. Strong consistency works well in systems that need transactions.

**Source(s) and further reading:**
* [Transactions across data centers](http://snarfed.org/transactions_across_datacenters_io.html)

## 4. Availability Patterns
There are two main patterns to support high availability: `fail-over` and `replication`.
### 4.1 Fail-over
#### Active-passive
With active-passive fail-over, heartbeats are sent between the active and the passive server on standby.  If the heartbeat is interrupted, the passive server takes over the active's IP address and resumes service.

The length of downtime is determined by whether the passive server is already running in 'hot' standby or whether it needs to start up from 'cold' standby.  Only the active server handles traffic.

Active-passive failover can also be referred to as master-slave failover.

#### Active-active
In active-active, both servers are managing traffic, spreading the load between them.

If the servers are public-facing, the DNS would need to know about the public IPs of both servers.  If the servers are internal-facing, application logic would need to know about both servers.

Active-active failover can also be referred to as master-master failover.

#### Disadvantage(s): failover

* Fail-over adds more hardware and additional complexity.
* There is a potential for loss of data if the active system fails before any newly written data can be replicated to the passive.

### 4.2 Replication
#### Master-slave and master-master
This topic is further discussed in the [Database]({% link _note/design-knowledge/database.md %}):
* `Master-slave` replication
* `Master-master` replication

### 4.3 Availability in numbers
Availability is often quantified by uptime (or downtime) as a percentage of time the service is available.  Availability is generally measured in number of 9s--a service with 99.99% availability is described as having four 9s.

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
