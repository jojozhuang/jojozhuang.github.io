---
layout: post
key: blog
title: "Data Structure - Stack"
date: 2016-03-29
tags: LIFO, LinkedList
categories:
- blog
---

> A stack uses LIFO (last-in first-out) ordering.

## 1. Operations for Stack.
* push(item): Add an item to the top of the stack.
* pop(): Remove the top item from the stack.
* peek(): Return the top of the stack.
* isEmpty(): Return true if and only if the stack is empty.

## 2. Implementation
### 2.1 Implement with LinkedList.
```java
public class LinkedListStack {
    private ListNode head; // the first node

    public LinkedListStack() {
        head = null;
    }

    // Add value to the beginning of the list
    public void push(int value) {
        ListNode oldHead = head;
        head = new ListNode(value);
        head.next = oldHead;
    }

    // Remove value from the beginning of the list
    public int pop() throws Exception {
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

### 2.2 Implement with Two Queues.
```java
public class QueueStack {
    Queue<Integer> queue1 = new LinkedList<Integer>(); // Q1 always has all of the elements
    Queue<Integer> queue2 = new LinkedList<Integer>(); // Q2 always be empty after pop or top.
    int lastnum = 0;

    /** Initialize your data structure here. */
    public MyStack() {

    }

    /** Push element x onto stack. */
    public void push(int x) {
        queue1.offer(x);
    }

    /** Removes the element on top of the stack and returns that element. */
    public int pop() {
        while(!queue1.isEmpty()) {
            lastnum = queue1.poll();
            if (!queue1.isEmpty()) {
                queue2.offer(lastnum);
            }
        }
        Queue<Integer> temp = queue1;
        queue1 = queue2;
        queue2 = temp;
        return lastnum;
    }

    /** Get the top element. */
    public int peek() {
        while(!queue1.isEmpty()) {
            lastnum = queue1.poll();
            queue2.offer(lastnum);
        }
        Queue<Integer> temp = queue1;
        queue1 = queue2;
        queue2 = temp;
        return lastnum;
    }

    /** Returns whether the stack is empty. */
    public boolean isEmpty() {
        return queue1.isEmpty();
    }
}
```

### 2.3 Implement with Array.
```java
public class ArrayStack {
    private int top;
    private int[] arr;

    public ArrayStack(int capacity) {
        arr = new int[capacity];
        top = -1;
    }

    // Add value to the array
    public void push(int value) {
        arr[++top] = value;
    }

    // Remove value from the array
    public int pop() throws Exception {
        if (top < 0) {
            throw new Exception();
        }
        int value = arr[top];
        top--;
        return value;
    }

    public int peek() throws Exception {
        if (top < 0) {
            throw new Exception();
        }
        return arr[top];
    }

    public boolean isEmpty() {
        return top < 0;
    }
}
```

### 2.4 Implement with Array(Loop).
```java
```
## 3. Implement Sort Function for Stack
### 3.1 Sort with Additional Stack.
```java
public class SortStack {
    public static Stack<Integer> sort(Stack<Integer> stack) {
        if (stack == null || stack.isEmpty() || stack.size() == 1) {
            return stack;
        }

        Stack<Integer> res = new Stack<Integer>();

        while(!stack.isEmpty()) {
            int top = stack.pop();
            if (res.isEmpty()) {
                res.push(top);
                continue;
            }
            while (!res.isEmpty() && res.peek() > top) {
                stack.push(res.pop());
            }
            res.push(top);
        }

        return res;
    }
}
```
### 3.2 Implement Merge Sort with Stack
```java
```
### 3.3 Implement Quick Sort with Stack
```java
```

## 4. Reference
* [Data Structure and Algorithms - Stack](https://www.tutorialspoint.com/data_structures_algorithms/stack_algorithm.htm)
* [Stacks and Queues](http://introcs.cs.princeton.edu/java/43stack/)
