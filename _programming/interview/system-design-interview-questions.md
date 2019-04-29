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

## 1. Best Practice for Onsite Interview
### 1.1 Generic Tips
* Focus on what I've already known
* Truly understand the problem
* Break down the problem
* Don't dig too deep until is asked by the interviewer
* Engage the interviewer
* Follow the hint, familiar with the trade off

### 1.2 Process Tips
* Scenario: Function Scope, Use Cases, UI, Web/Mobile
* Constraints: Data Volume, Limit of Storage, Low Performance CPU, Traffic, Memory, Storage
* High Level Design & Application: Architecture, Diagram, Services
* Data: DB Design, Store, Query, Cache
* Analyze & Go back: Constrains, Trade-off, Performance, Scalability, Robustness

### 1.3 Presentation Tips:
* Discuss the requirements and constrains
* High level design, Diagram of Architecture, including the main services or components.
* Ask/Pick up one topic to dig deep, know the trade off for different decisions you made
* Go over the common components: Caching , Load Balance, etc

### 1.4 Basic Knowledge for System Design
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

* [System Design Introduction For Interview](https://www.youtube.com/watch?v=UzLMhqg3_Wc&t=1216s)
* [System Design Interview - Approach and structure - How To Part1](https://www.youtube.com/watch?v=0163cssUxLA&list=PLA8lYuzFlBqAy6dkZHj5VxUAaqr4vwrka)

## 2. Design TinyUrl
* [System Design : Design a service like TinyUrl](https://www.youtube.com/watch?v=fMZMm_0ZhK4)
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

## 3. Design Twitter
### 3.1 Features/Functions
* Following
* Tweeting(User, Home)
* Timeline

### 3.2 Tables
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

### 3.3 Posting Twitter
* User Alice posts a twitter
* The twitter is sent to Load Balancer
* LB dispatches the posting task one application node
* The twitter is stored in high speed in-memory database Redis.
* There may be hundreds of thousands Redis servers. But only three of them contains the instances of the same twitter.
* Update the timeline of followers by adding this twitter.

### 3.4 Accessing Timeline
* User Bob access his own timeline through browser.
* The Get request is send to Load Balancer.
* BL get response from three Redis servers.
* There may be hundreds of thousands Redis servers. But one user's timeline is stored in only three of them.
* User HashMap(User, Redis IP address) to create the lookup function to locate which three Redis servers contains the timeline for particular user.

### 3.5 Push or Pull

## 4. Design a Parking Lot
### 4.1 Questions/Clarification
* How many parking lots?
* Located in multiple levels?
* Free or cost?
* Size? S/M/L/XL? Motor? Car? Truck? Bus?

### 4.2 Features/Functions
* Search free spots
* Place vehicle
* Remove vehicle
* Pricing? Hourly/Whole Day?

### 4.3 Classes
Vehicle:
* License Plate
* Color

ParkingLot(zipcode: int):
-Spot: placeVehicle(Vehicle: vehicle);

Spot(id, size):
-Status: Free/Occupied
-Location

## 5. Messenger service like Whatsapp or WeChat
### 5.1 Questions/Clarification
* Text/Audio/Video?
* One to One? Group Chatting
* History?
* Asynchronous/instant？

### 5.2 Features/Functions
* Send message
* Push notifications

### 5.3 Infrastructure
* User -> Server(n) -> User
* Message Queue
* Handle if receiver is offline, keep the message in sequence

### 5.4 Class
User
-Id
Message
-Status: Draft/Sent/Delivered/Read by receiver

## 6. Uber Lyft ride sharing services
QUIC protocol(Quick UDP internet connections)
![image](/public/programming/system-design-interview-questions/uber_architecture.jpg)
* [Understanding QUIC wire protocol](https://medium.com/@nirosh/understanding-quic-wire-protocol-d0ff97644de7)

* [Geohash Intro](http://www.bigfastblog.com/geohash-intro)
* [Designing a Spacial Index](https://dzone.com/articles/designing-spacial-index)

QuadTree
* [An interactive explanation of quadtrees](https://jimkang.com/quadtreevis/)

### 6.1 Questions/Clarification

### 6.2 Features/Functions
* Match Driver and Rider

### 6.3 Infrastructure

### 6.4 Class
Driver
Rider
Trip

## 7. Rate Limiter
API Rate Limiter throttles users based upon the number of the requests they are sending.
Http State Code: 429 - Too Many Requests
* [Designing an API Rate Limiter](https://www.educative.io/collection/page/5668639101419520/5649050225344512/5707274949492736)

### 7.1 Why rate limiting is necessary?
* Avoid Abuse of the system: Denial-of-service (DOS) attacks, brute-force password attempt
* Build Reliable System: keep costs and resource usage under control


## 9. Key Words
* Queries Per Second (QPS)
