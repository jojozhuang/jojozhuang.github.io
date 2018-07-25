---
layout: note
key: note
title: "Data Structure - Queue"
index: 504
date: 2016-05-04
category: dsa
---

> A queue is an object or more specifically an abstract data structure(ADT) that follows FIFO (first-in first-out) rule.

## 1. Introduction
### 1.1 Real-life Example
Queue is similar to the ticket queue outside a cinema hall, where the first person entering the queue is the first person who gets the ticket.

### 1.2 Queue in Programming Terms
In programming terms, putting an item into the queue is called `enqueue` and removing an item from the queue is called `dequeue`.
![image](/public/notes/data-structure-queue/queue.png){:width="800px"}  
Queue follows the `FIFO`(First In First Out) rule. The item that goes in first is the item that comes out first too.

### 1.3 Common Operations on Queue
* enqueue(item): Add an item to the end of the list.
* dequeue(): Pull the first item out of the list.
* peek(): Return the top of the queue.
* isEmpty(): Return true if and only if the queue is empty.

## 2. Implementation
### 2.1 Implementing with LinkedList
```java
public class LinkedListQueue {
    private ListNode head; // the first node
    private ListNode tail; // the last node

    public LinkedListQueue() {
        head = null;
        tail = null;
    }

    // Add item to the tail of the list
    public void enqueue(int value) {
        if (tail == null) {
            tail = new ListNode(value);
            head = tail;
        } else {
            tail.next = new ListNode(value);
            tail = tail.next;
        }
    }

    // Remove the head from the list and return its value
    public int dequeue() throws Exception {
        if (head == null) {
            throw new Exception();
        }
        int value = head.val;
        head = head.next;
        return value;
    }

    // Get the value of the head
    public int peek() throws Exception {
        if (head == null) {
            throw new Exception();
        }
        return head.val;
    }

    // Return whether the queue is empty
    public boolean isEmpty() {
        return head == null;
    }
}
```

### 2.2 Implementing with Two Stacks
```java
import java.util.Stack;

public class StackQueue {
    private Stack<Integer> stack1; // s1 stores new items
    private Stack<Integer> stack2; // s2 stores old items

    public StackQueue() {
        stack1 = new Stack<Integer>();
        stack2 = new Stack<Integer>();
    }

    // Add new item onto queue
    public void enqueue(int value) {
        stack1.push(value);
    }

    // Remove the first item from the queue and return its value
    public int dequeue() {
        if (!stack2.isEmpty()) {
            return stack2.pop();
        }
        while (!stack1.isEmpty()) {
            stack2.push(stack1.pop());
        }
        return stack2.pop();
    }

    // Get the first element
    public int peek() {
        if (!stack2.isEmpty()) {
            return stack2.peek();
        }
        while (!stack1.isEmpty()) {
            stack2.push(stack1.pop());
        }
        return stack2.peek();
    }

    // Return whether the queue is empty
    public boolean isEmpty() {
        return stack1.isEmpty() && stack2.empty();
    }
}
```

### 2.3 Implementing with Array
```java
public class ArrayQueue {
    private int head; // the first node
    private int tail; // the last node
    private int[] arr;

    public ArrayQueue(int capacity) {
        arr = new int[capacity];
        head = -1;
        tail = -1;
    }

    // Add item to the end of the array
    public void enqueue(int value) {
        arr[++tail] = value;
        if (head == -1) {
            head = 0;
        }
    }

    // Remove the first item from the array and return its value
    public int dequeue() throws Exception {
        if (isEmpty()) {
            throw new Exception();
        }
        int value = arr[head];
        head++;
        return value;
    }

    // Get the first item
    public int peek() throws Exception {
        if (isEmpty()) {
            throw new Exception();
        }
        return arr[head];
    }

    // Return whether the queue is empty
    public boolean isEmpty() {
        return (head > tail) || (head == -1);
    }
}
```

### 2.4 Implement with Array(Loop)
```java
```

## 3. Source Files
* [Source files for Queue on GitHub](https://github.com/jojozhuang/DataStructure/tree/master/Queue)
* [Diagrams on Google Slides](https://docs.google.com/presentation/d/1scNOPMlC4kNb2FiyDhlhX8R7fCx3tkGC01J7ljYREWg/edit?usp=sharing)

## 4. Reference
* [Data Structure and Algorithms - Queue](https://www.tutorialspoint.com/data_structures_algorithms/dsa_queue.htm)
* [Stacks and Queues](http://introcs.cs.princeton.edu/java/43stack/)
* [Queue](https://www.programiz.com/dsa/queue)
