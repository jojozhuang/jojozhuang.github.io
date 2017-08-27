---
layout: post
key: blog
title: "System Design"
date: 2016-05-01
tags: OOP, Database, MapReduce
categories:
- blog
---

> Best Practice and Common Questions for System Design.

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

## 4. System Design
