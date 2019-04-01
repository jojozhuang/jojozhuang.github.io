---
layout: programming
key: programming
title: "Java Core - Collection"
index: 205
category: java
image: /programming/java.png
date: 2016-02-05
postdate: 2016-02-05
tags: [LinedList, HashMap]
---

> Create different collection objects.

## 1. Array
```java
Arrays.copyOfRange(array, 0, 2);
```
## 1. List
Classes implemented List interface.
```java
List list = new ArrayList();
List list = new LinkedList();
```
Operations on list.
```java
list.add(item);
list.add(0, item);
list.remove(index);
list.subList(index1, index2);
```
## 2. Stack
```java
Stack stack = new Stack();
stack.push("1");
stack.pop(); // return 1;
```
## 3. Set
Interface: java.util.Set, java.util.SortedSet;
Class: java.util.HashSet, java.util.TreeSet;
```java
Set setA = new HashSet();
Set<String> daysOfWeek = new HashSet<>();
```
## 4. Map

## 5. Heap
Interface: java.util.Queue
Class: java.util.PriorityQueue
```java
Queue<Long> small = new PriorityQueue<Long>(),
