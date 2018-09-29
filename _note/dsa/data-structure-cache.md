---
layout: note
key: note
title: "Data Structure - Cache"
index: 315
category: dsa
image: note/dsa.png
date: 2016-03-15
postdate: 2016-03-15
tags: [LRU, LFU]
---

> Introduce two caching algorithms: LRU and LFU.

## 1. Cache Algorithms
* Least Recently Used: `LRU` cache algorithm keeps recently used items near the front of cache. Whenever a new item is accessed, the LRU places it at the head of the cache. When the cache reaches to its capacity, items that have been accessed less recently will be removed starting from the end of the cache.
* Least Frequently Used: `LFU` cache algorithm uses a counter to keep track of how often an entry is accessed. With the LFU cache algorithm, the entry with the lowest count is removed first. This method isn't used that often, as it does not account for an item that had an initially high access rate and then was not accessed for a long time.

## 2. LRU
### 2.1 How It Works?
The LRU cache provides two methods: `add` and `get`.
* add(value) - Add the value into cache if it is not already present. When the cache reached its capacity, it should invalidate the least recently used item before inserting a new item.
* get(value) - Get the value (will always be positive) if it exists in the cache, otherwise return the minimum value of Integer. In addition, move this element to the head of the cache.

The following diagram illustrates how LRU works.
![image](/public/notes/data-structure-cache/lru.png){:width="800px"}  

### 2.2 Data Structure
Generally, LRU algorithm is implemented with HashMap and Doubly Linked List.
![image](/public/notes/data-structure-cache/structure.png)
* The head and tail nodes don't store data. They are created for just conveniently manipulating the Linked List.
* Each node between the head and tail stores data. They are connecting to each other.
* Nodes near the tail are least recently accessed. They will be removed if cache reaches to it capacity.

1) Initialization
![image](/public/notes/data-structure-cache/initialization.png){:width="400px"}  
* Only two nodes, head and tail.

2) Add Operation(Cache is not full)
![image](/public/notes/data-structure-cache/add1.png){:width="800px"}  
* Size is less than capacity.

3) Add Operation(Cache is full)
![image](/public/notes/data-structure-cache/add2.png){:width="800px"}  
* Size is same with capacity, must remove the tail to add new element.

4) Get Element
![image](/public/notes/data-structure-cache/get.png){:width="800px"}  
* Return the value and move it to head.

### 2.3 Implementation
Node.
```java
public class Node {
    public int value;
    public Node prev;
    public Node next;

    public Node(int value) {
        this.value = value;
        this.prev = null;
        this.next = null;
    }
}
```
Below is the sample code which implements LRU algorithm.
```java
public class LRU {
    private int capacity;
    private HashMap<Integer, Node> map;
    private Node head; // The latest accessed element
    private Node tail;
    private final int MIN = Integer.MIN_VALUE;

    public LRU(int capacity) {
        this.capacity = capacity;
        this.map = new HashMap<Integer, Node>();
        this.head = new Node(this.MIN);
        this.tail = new Node(this.MIN);
        head.next = tail;
        tail.prev = head;
    }

    public void add(int value) {
        if (map.containsKey(value)) {
            return;
        }

        if (map.size() == capacity) {
            map.remove(tail.prev.value);
            tail.prev = tail.prev.prev;
            tail.prev.next = tail;
        }

        Node newNode = new Node(value);
        map.put(value, newNode);

        // move new node to head
        moveToHead(newNode);
    }

    public int get(int value) {
        if (!map.containsKey(value)) {
            return this.MIN;
        }

        // remove current
        Node current = map.get(value);
        current.prev.next = current.next;
        current.next.prev = current.prev;

        // move current node to head
        moveToHead(current);

        return value;
    }

    private void moveToHead(Node node) {
        node.prev = head;
        node.next = head.next;
        node.next.prev = node;
        head.next = node;
    }
}
```
### 2.4 Testing
```java
LRU lru = new LRU(5); //capacity = 5
lru.add(1);
assertArrayEquals(new int[]{1}, lru.getAll());
lru.add(2);
assertArrayEquals(new int[]{2,1}, lru.getAll());
lru.add(3);
assertArrayEquals(new int[]{3,2,1}, lru.getAll());
assertEquals(1, lru.get(1));
assertArrayEquals(new int[]{1,3,2}, lru.getAll());
assertEquals(3, lru.get(3));
assertArrayEquals(new int[]{3,1,2}, lru.getAll());
assertEquals(3, lru.get(3));
assertArrayEquals(new int[]{3,1,2}, lru.getAll());
lru.add(4);
assertArrayEquals(new int[]{4,3,1,2}, lru.getAll());
lru.add(5);
assertArrayEquals(new int[]{5,4,3,1,2}, lru.getAll());
lru.add(6);
assertArrayEquals(new int[]{6,5,4,3,1}, lru.getAll());
assertEquals(4, lru.get(4));
assertArrayEquals(new int[]{4,6,5,3,1}, lru.getAll());
lru.add(7);
assertArrayEquals(new int[]{7,4,6,5,3}, lru.getAll());
lru.add(8);
assertArrayEquals(new int[]{8,7,4,6,5}, lru.getAll());
```
### 2.5 Implemented with Queue
```java
```

## 5. Source Files
* [Source files for Cache on GitHub](https://github.com/jojozhuang/DataStructure/tree/master/Cache)
* [Cache Diagrams(draw.io) in Google Drive](https://drive.google.com/file/d/1ZIZ5oLBk_YLK-DRgEiQl_q5V5n6ZzEJx/view?usp=sharing)

## 6. Reference
* [LRU Cache Implementation](https://www.geeksforgeeks.org/lru-cache-implementation/)
* [LFU (Least Frequently Used) Cache Implementation](https://www.geeksforgeeks.org/lfu-least-frequently-used-cache-implementation/)
* [LRU Cache on LeetCode](https://leetcode.com/problems/lru-cache/)
* [LFU Cache on LeetCode](https://leetcode.com/problems/lfu-cache/)
