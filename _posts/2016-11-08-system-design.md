---
layout: post
title: "System Design"
date: 2016-11-08
categories:
- blog
---

> Best Practice and Common Questions for System Design.

## 1. Java
### 1.1 Collection in Java
Interface: Map, Queue, Deque
Class: HashMap, HashSet, LinkedList

Concurrent Collection

## 1. Object-Oriented Programming

## 2. Design Pattern

## 3. Database Design
### 3.1 Entity-Relationship Diagram
### 3.2 Key, Index(Cluster Index), Constraints
Cluster Index, B-Tree Index, Inverted Index  
Shard

### 3.3 Normalization
Avoid redundant data.
### 3.4 Denormalization
* Denormalization is a time-space trade-off.
* Allow redundant data in database to avoid 'Join' in queries for improving performance.
* Need to solve the problem: data consistency. Constraints on tables.
* Can speed-up reads(SELECT in SQL) while slowing down writes(INSERT, UPDATE and DELETE). So use Denormalization only when reading frequency is more than writing frequency.
* One approach in practice is to use view in database.
## 4. System Design
