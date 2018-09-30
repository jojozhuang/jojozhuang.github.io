---
layout: note
key: note
title: "Data Structure - LFU Cache"
index: 316
category: dsa
image: note/dsa.png
date: 2016-03-16
postdate: 2016-03-16
tags: [LFU]
---

> Introduce two caching algorithms: LRU and LFU.

## 1. LFU
### 1.1 LFU Cache Algorithms
Least Frequently Used(LFU) cache algorithm uses a counter to keep track of how often an entry is accessed. With the LFU cache algorithm, the entry with the lowest count is removed first. This method isn't used that often, as it does not account for an item that had an initially high access rate and then was not accessed for a long time.
### 1.2 How It Works?
The `LFU` cache provides two methods: `add` and `get`.
* add(value) - Add the value into cache if it is not already present. When the cache reached its capacity, it should invalidate the least frequently used item before inserting a new item.
* get(value) - Get the value if it exists in the cache, otherwise, return the minimum value of Integer. In addition, move this element to the proper position of the cache.

The following diagram illustrates how LFU works.
![image](/public/notes/data-structure-lfu-cache/lfu.png)

### 1.3 Data Structure
LFU algorithm can be easily implemented with HashMap and Doubly Linked List.
![image](/public/notes/data-structure-lfu-cache/structure.png)
* The head and tail nodes don't store any data. They are created just for conveniently manipulating the linked list.
* Nodes between the head and tail nodes are used to store data, each node for one value. Every node has two pointers, pointing to the previous and the next nodes. Each node has two attributes, one is the value and another is the count of this node.
* Nodes near the tail are least frequently accessed. They will be removed if cache reaches to its capacity.
* Nodes in LFU are sorted by frequency(count).

### 1.4 Operations On LFU
1) Initialization
![image](/public/notes/data-structure-lfu-cache/initialization.png){:width="400px"}  
* Only two dummy nodes, head and tail.
* Notice that there is another HashMap which stores the value-node pair.

2) Add (Cache is not full and maximum frequency = 0)
![image](/public/notes/data-structure-lfu-cache/add1.png)
* Create new node for the given value and insert it to the head of the linked list.
* Add the new node to HashMap with the given value as key.
* Size is increased by one.

3) Add (Cache is not full and maximum frequency > 0)
![image](/public/notes/data-structure-lfu-cache/add2.png)
* Create new node for the given value and insert it before the node which has the same frequency or to the tail.
* Add the new node to HashMap with the given value as key.
* Size is increased by one.

4) Add (Cache is full)
![image](/public/notes/data-structure-lfu-cache/add3.png)
* Remove the last element(The one tail.prev is pointing) from the list.
* Create new node for the given value and insert it before the node which has the same frequency or to the tail.
* Add the new node to HashMap with the given value as key.
* Size remains unchanged.

5) Get
![image](/public/notes/data-structure-lfu-cache/get.png)
* Find the given value in HashMap.
* Increase the frequency of this node by one. Move it to proper position of the linked list.
* Return the value.

## 2. Implementation
### 2.1 Custom Node
The following code implements LFU based on custom nodes. The node is defined as follows.
```java
public class Node {
    public int value;
    public int count;
    public Node prev;
    public Node next;

    public Node(int value, int count) {
        this.value = value;
        this.count = count;
        this.prev = null;
        this.next = null;
    }
}
```
### 2.2 LFU Class
Following is the LFU class which implements the `add()` and `get()` methods.
```java
public class LFU {
    private int capacity;
    private HashMap<Integer, Node> map;
    private Node head; // The most frequently accessed element
    private Node tail; // The least frequently used element
    private final int MAX = Integer.MAX_VALUE;
    private final int MIN = Integer.MIN_VALUE;

    public LFU(int capacity) {
        this.capacity = capacity;
        this.map = new HashMap<Integer, Node>();
        this.head = new Node(this.MAX, this.MAX);
        this.tail = new Node(this.MIN, this.MIN);
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

        Node newNode = new Node(value, 0);
        map.put(value, newNode);

        // move new node to proper position
        move(newNode);
    }

    public int get(int value) {
        if (!map.containsKey(value)) {
            return this.MIN;
        }

        // remove current
        Node current = map.get(value);
        current.prev.next = current.next;
        current.next.prev = current.prev;

        current.count++; // increment before move

        // move current node to proper position
        move(current);

        return map.get(value).value;
    }

    private void move(Node node) {
        Node curr = head;
        while (curr != null) {
            if (curr.count > node.count) {
                curr = curr.next;
            } else {
                node.prev = curr.prev;
                node.next = curr;
                node.next.prev = node;
                node.prev.next = node;
                break;
            }
        }
    }
}
```
### 2.3 Testing
Create an instance of LRU class and call add() and get() methods. The change of the list is described in the inline comments.
```java
LRU lru = new LRU(5); //capacity = 5
lru.add(1); // list = [1]
lru.add(2); // list = [2,1]
lru.add(3); // list = [3,2,1]
lru.get(1); // list = [1,3,2], return 1
lru.get(3); // list = [3,1,2], return 3
lru.get(3); // list = [3,1,2], return 3
lru.add(4); // list = [4,3,1,2]
lru.add(5); // list = [5,4,3,1,2], cache is full
lru.add(6); // list = [6,5,4,3,1]
lru.get(4); // list = [4,6,5,3,1], return 4
lru.add(7); // list = [7,4,6,5,3]
lru.add(8); // list = [8,7,4,6,5]
```

## 3. Optimization
### 3.1 Current Implementation
Time Complexity can be O(n) in worst case.
### 3.2 Potential Improvement
not possible to use max heap, as you can get the minimum value within O(log(n)). For example, you can get the maximum value 82 in O(1), but when trying to remove minimum 27, we have to move all elements at its right to left. It may take O(n).
![image](/public/notes/data-structure-lfu-cache/heap.png){:width="450px"}  

Instead, we can use BST tree.
![image](/public/notes/data-structure-binary-search-tree/bst.png){:width="450px"}  
### 3.3 New Implementation(Deque)
Instead of creating the doubly linked list by hand, we can use Deque directly in Java. The following LRUDeque class implements LRU with Deque.
```java

```

## 4. Source Files
* [Source files for LFU Cache on GitHub](https://github.com/jojozhuang/DataStructure/tree/master/LFU)
* [LFU Cache Diagrams(draw.io) in Google Drive](https://drive.google.com/file/d/1NGLMVXkvRhIkwAkvQtRHCHwN9VgjihoN/view?usp=sharing)

## 5. Reference
* [LFU (Least Frequently Used) Cache Implementation](https://www.geeksforgeeks.org/lfu-least-frequently-used-cache-implementation/)
* [LFU Cache on LeetCode](https://leetcode.com/problems/lfu-cache/)
