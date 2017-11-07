---
layout: post
key: blog
title: "Data Structure - Stack"
date: 2016-03-29
tags: [Stack, LIFO]
---

> Stack is an abstract data type that serves as a collection of elements, with two principal operations:
* push, which adds an element to the collection, and
* pop, which removes the most recently added element that was not yet removed.


## 1. Introduction
### 1.1 Real-life Example
Stack is just like a pile of plates kept on top of each other. You can only take out a plate from the top and put a plate on top of the other plates.
![MIME Type](/public/pics/2016-03-29/plates.jpg)
Think about the things you can do with such a pile of plates.
* Put a new plate on top
* Remove the top plate

If you want the plate at the bottom, you have to first remove all the plates on top.

### 1.2 Stack in Programming Terms
In programming terms, putting an item on top of the stack is called `push` and removing an item is called `pop`.
![MIME Type](/public/pics/2016-03-29/lifo.jpg)
Stack implement the principal of `LIFO`(Last In First Out). The last item that was placed is the first item to go out.

### 1.3 Common Operations on Stack
* push(item): Add an item to the top of the stack.
* pop(): Remove the top item from the stack.
* peek(): Return the top of the stack.
* isEmpty(): Return true if and only if the stack is empty.

## 2. Implementation
### 2.1 Implementing with LinkedList
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

### 2.2 Implementing with Two Queues
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

### 2.3 Implementing with Array
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

### 2.4 Implementing with Array(Loop)
```java
```
## 3. Implementing Sort Function for Stack
### 3.1 Sorting with Additional Stack.
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
### 3.2 Implementing Merge Sort with Stack
```java
```
### 3.3 Implementing Quick Sort with Stack
```java
```

## 4. Reference
* [Data Structure and Algorithms - Stack](https://www.tutorialspoint.com/data_structures_algorithms/stack_algorithm.htm)
* [Stacks and Queues](http://introcs.cs.princeton.edu/java/43stack/)
* [Stack](https://www.programiz.com/dsa/stack)
