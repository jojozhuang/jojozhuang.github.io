---
layout: post
key: blog
title: "Data Structure - Heap"
date: 2016-04-05
tags: [MinHeap, MaxHeap]
---

> Heap

## 1. Binary Min Heap.
A min-heap is a complete binary tree where each node is smaller than its children. The root, therefore, is the minimum element in the tree.

## 2. Implement MinHeap.
```java
```

## 3. Implement MaxHeap.
```java
```

## 4. Add new item to Min-Heap.
1) Add new element to bottom, rightmost  
2) Bubble up this new element, swap with its parent until it is larger than it parent.  
This takes O(log n) time, where n is the number of nodes in the heap.
```java
```

## 5. Remove the top from Min-Heap.
1) Remove the top element.  
2) Move the last element to top.  
3) Bubble down this new top element. Each level, select smaller child and swap until to the bottom.  
This also takes O(log n) time, where n is the number of nodes in the heap.

## 6. Reference
* [Heap Data Structures](https://www.tutorialspoint.com/data_structures_algorithms/heap_data_structure.htm)
