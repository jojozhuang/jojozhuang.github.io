---
layout: post
key: blog
title: "Data Structure - Queue"
date: 2016-03-31
tags: [FIFO, Array]
---

> A queue implements FIFO (first-in first-out) ordering.

## 1. Operations for Queue
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

    // Add value to the tail of the list
    public void enqueue(int value) {
        if (tail == null) {
            tail = new ListNode(value);
            head = tail;
        } else {
            tail.next = new ListNode(value);
            tail = tail.next;
        }
    }

    // Poll value from the beginning of the list
    public int dequeue() throws Exception {
        if (head == null) {
            throw new Exception();
        }
        int value = head.val;
        head = head.next;
        return value;
    }

    public int peek() throws Exception {
        if (head == null) {
            throw new Exception();
        }
        return head.val;
    }

    public boolean isEmpty() {
        return head == null;
    }
}
```

### 2.2 Implementing with Two Stacks
```java
public class QueueStack {
    private Stack<Integer> stack1 = new Stack<Integer>(); // s1 stores new elements
    private Stack<Integer> stack2 = new Stack<Integer>(); // s2 stores old elements

    public void enqueue(int x) {
        stack1.push(x);
    }

    // Removes the element from in front of queue and returns that element.
    public int dequeue() {
        if (!stack2.isEmpty()) {
            return stack2.pop();
        }
        while (!stack1.isEmpty()) {
            stack2.push(stack1.pop());
        }
        return stack2.pop();
    }

    // Get the front element.
    public int peek() {
        if (!stack2.isEmpty()) {
            return stack2.peek();
        }
        while (!stack1.isEmpty()) {
            stack2.push(stack1.pop());
        }
        return stack2.peek();
    }

    // Return whether the queue is empty.
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

    // Add value to the array
    public void enqueue(int value) {
        arr[++tail] = value;
        if (head == -1) {
            head = 0;
        }
    }

    // Remove value from the array
    public int dequeue() throws Exception {
        if (isEmpty()) {
            throw new Exception();
        }
        int value = arr[head];
        head++;
        return value;
    }

    public int peek() throws Exception {
        if (isEmpty()) {
            throw new Exception();
        }
        return arr[head];
    }

    public boolean isEmpty() {
        return (head > tail) || (head == -1);
    }
}
```

### 2.4 Implement with Array(Loop)
```java
```

## 3. Reference
* [Data Structure and Algorithms - Queue](https://www.tutorialspoint.com/data_structures_algorithms/dsa_queue.htm)
* [Stacks and Queues](http://introcs.cs.princeton.edu/java/43stack/)
