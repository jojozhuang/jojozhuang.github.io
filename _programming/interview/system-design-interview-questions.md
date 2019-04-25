---
layout: programming
key: programming
title: "System Design Interview Questions"
index: 151
category: interview
image: programming/interview.png
date: 2016-03-01
postdate: 2016-03-01
tags: [System Design]
---

> Best Practice and Common Questions for System Design.

## 0. System Design
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

Tools/Softwares:
* Cassandra
* MongoDB/Couchbase
* MySQL
* Memcached
* Redis
* Zookeeper
* Kafka
* NGINX
* HAProxy
* Solr, Elastic Search
* Blobstore like Amazon S3
* Docker,Kubernets, mesos
* Hadoop/Spark, HDFS

System Design : Design a service like TinyUrl
https://www.youtube.com/watch?v=fMZMm_0ZhK4

* [Generating human-readable/usable, short but unique IDs](https://stackoverflow.com/questions/9543715/generating-human-readable-usable-short-but-unique-ids)

Random Id Generator.
```java
public class RandomIdGenerator {
    private static char[] _base62chars =
            "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".toCharArray();

    private static Random _random = new Random();

    public static String GetBase62(int length)
    {
        StringBuilder sb = new StringBuilder(length);

        for (int i = 0; i < length; i++)
            sb.append(_base62chars[_random.nextInt(62)]);

        return sb.toString();
    }

    public static String GetBase36(int length)
    {
        StringBuilder sb = new StringBuilder(length);

        for (int i=0; i < length; i++)
            sb.append(_base62chars[_random.nextInt(36)]);

        return sb.toString();
    }
}
```
Test class
```java
public class RandomIdGeneratorTest {

    @Test
    public void tesRandomIdGenerator() {
        System.out.println("tesRandomIdGenerator");

        // create five IDs of six, base 62 characters
        for (int i = 0; i < 5; i++) {
            System.out.println(RandomIdGenerator.GetBase62(6));
        }

        // create five IDs of eight base 36 characters
        for (int i = 0; i < 5; i++) {
            System.out.println(RandomIdGenerator.GetBase36(8));
        }
    }
}
```
Output.
```sh
kXyqhd
dj2hRs
HuuCar
NIDFdK
dc0xV1
UVCOLG33
QAOZ3ENW
I42VA1AI
BTS30GXA
CXD8AEEY
```

Queries Per Second (QPS)

## 0. System Design Interview
Tips:
1. Confirm the requirement
2. High level design
3. Don't dig too deep.
4. Communication skill is critical.

https://www.youtube.com/watch?v=0163cssUxLA&list=PLA8lYuzFlBqAy6dkZHj5VxUAaqr4vwrka

## 1. Design Twitter
### 1.1 Features/Functions
* Following
* Tweeting(User, Home)
* Timeline

### 1.2 Tables
User

ID | Name   | Email | ...
---|--------|-------|----
1  | Johnny |       |
2  | Alex   |       |
3  | Sean   |       |

Twitter

ID | Title    | User ID
---|----------|---------
1  | Hello    |  2
2  | Greeting |  3

Followers

ID | Follower ID
---|----------
1  | 2    
1  | 3
2  | 3

### 1.3 Posting Twitter
* User Alice posts a twitter
* The twitter is sent to Load Balancer
* LB dispatches the posting task one application node
* The twitter is stored in high speed in-memory database Redis.
* There may be hundreds of thousands Redis servers. But only three of them contains the instances of the same twitter.
* Update the timeline of followers by adding this twitter.

### 1.4 Accessing Timeline
* User Bob access his own timeline through browser.
* The Get request is send to Load Balancer.
* BL get response from three Redis servers.
* There may be hundreds of thousands Redis servers. But one user's timeline is stored in only three of them.
* User HashMap(User, Redis IP address) to create the lookup function to locate which three Redis servers contains the timeline for particular user.

### 1.5 Push or Pull

## 2. Design a Parking Lot
### 2.1 Questions/Clarification
* How many parking lots?
* Located in multiple levels?
* Free or cost?
* Size? S/M/L/XL? Motor? Car? Truck? Bus?

### 2.2 Features/Functions
* Search free spots
* Place vehicle
* Remove vehicle
* Pricing? Hourly/Whole Day?

### 2.3 Classes
Vehicle:
* License Plate
* Color

ParkingLot(zipcode: int):
-Spot: placeVehicle(Vehicle: vehicle);

Spot(id, size):
-Status: Free/Occupied
-Location

## 3. Messenger service like Whatsapp or WeChat
### 3.1 Questions/Clarification
* Text/Audio/Video?
* One to One? Group Chatting
* History?
* Asynchronous/instant？

### 3.2 Features/Functions
* Send message
* Push notifications

### 3.3 Infrastructure
* User -> Server(n) -> User
* Message Queue
* Handle if receiver is offline, keep the message in sequence

### 3.4 Class
User
-Id
Message
-Status: Draft/Sent/Delivered/Read by receiver

## 4. Uber Lyft ride sharing services
QUIC protocol(Quick UDP internet connections)
![image](/public/programming/system-design-interview-questions/uber_architecture.jpg)
* [Understanding QUIC wire protocol](https://medium.com/@nirosh/understanding-quic-wire-protocol-d0ff97644de7)

* [Geohash Intro](http://www.bigfastblog.com/geohash-intro)
* [Designing a Spacial Index](https://dzone.com/articles/designing-spacial-index)

design
1. tiny url
2. crawl wiki with 1k machines
3. designlyft
4. designpricesurge以及各种类似问题
这四道题一定要会做
建议先去学习一下geohash http://www.bigfastblog.com/geohash-intro https://dzone.com/articles/designing-spacial-index
再去看看一下vedio
https://www.youtube.com/watch?v=cSFWlF96Sds (注意看前半段，多看几遍，讲的比较详细了，这是lyft的做 法，现在变没变就不知道了，不过照着这个说应该可以ok)
然后这是uber的tech talk,大家随便看看 https://www.youtube.com/watch?v=AzptiVdUJXg https://www.infoq.com/presentations/uber-flink-stream https://www.slideshare.net/g9yuayon/streaming-analytics-in-uber 最后面两个link，如果面data infra看看，不面的话就不用看了吧，别看乱脑子。

QuadTree
* [An interactive explanation of quadtrees](https://jimkang.com/quadtreevis/)

### 4.1 Questions/Clarification

### 4.2 Features/Functions
* Match Driver and Rider

### 4.3 Infrastructure

### 4.4 Class
Driver
Rider
Trip

## 1. Java
### 1.1 Collection in Java
Interface: Map, Queue, Deque
Class: HashMap, HashSet, LinkedList

Concurrent Collection

## 2. Basis of Computer Science
### 2.1 How Addition Is Implemented in Program?
```java

```
## 1. Object-Oriented Programming

## 2. Design Pattern

## 3. Database Design
### 3.1 Entity-Relationship Diagram
### 3.2 Key, Index(Cluster Index), Constraints
Cluster Index, B-Tree Index, Inverted Index  
Shard

### 3.3 Normalization
Normalized databases are designed to minimize redundancy, while denormalized databases are designed
to optimize read time.
### 3.4 Denormalization
Denormalization means adding redundant information into a database to speed up reads.
* Denormalization is a time-space trade-off.
* Allow redundant data in database to avoid 'Join' in queries for improving performance.
* Need to solve the problem: data consistency. Constraints on tables.
* Can speed-up reads(SELECT in SQL) while slowing down writes(INSERT, UPDATE and DELETE). So use Denormalization only when reading frequency is more than writing frequency.
* One approach in practice is to use view in database.

### 3.5 Database Partitioning (Sharding)
Sharding means splitting the data across multiple machines while ensuring you have a way of figuring out
which data is on which machine.
* Vertical Partitioning
* Key-Based (or Hash-Based) Partitioning
* Directory-Based Partitioning

## 4. Networking Metrics
* Bandwidth
* Throughput
* Latency

## 5. MapReduce
* Map takes in some data and emits a <key J value> pair.
* Reduce takes a key and a set of associated values and "reduces"them in some way, emitting a new key and value.

## 6. References
* [System Design Introduction For Interview](https://www.youtube.com/watch?v=UzLMhqg3_Wc)
* [Grokking the System Design Interview](https://www.educative.io/collection/5668639101419520/5649050225344512)
