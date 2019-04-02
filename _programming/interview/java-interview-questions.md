---
layout: programming
key: programming
title: "Java - Interview Questions(Draft)"
index: 101
category: interview
image: programming/interview.png
date: 2019-01-01
postdate: 2019-01-01
tags: [Java, Interview]
---

> Popular interview questions for Java.

## 1. String, StringBuilder, StringBuffer

Feature     | String | StringBuilder | StringBuffer
------------|--------|---------------|-------------
mutable     | No     | Yes           | Yes
thread-safe | Yes    | No            | Yes

## 2. Collections
### 2.1 ArrayList VS LinkedList
1) The insert and remove operations give good performance (O(1)) in LinkedList compared to ArrayList(O(n)). Hence if there is a requirement of frequent addition and deletion in application then LinkedList is a best choice.

2) Search (get method) operations are fast in Arraylist (O(1)) but not in LinkedList (O(n)) so If there are less add and remove operations and more search operations requirement, ArrayList would be your best bet.

### 2.2 Stack and Queue
```java
Deque<String> stack = new ArrayDeque<String>();
Deque<String> queue = new ArrayDeque<String>();

stack.push("A");
stack.push("B");
stack.push("C");
stack.push("D");

while (!stack.isEmpty()) {
  System.out.print(stack.pop() + " ");
}

queue.add("A");
queue.add("B");
queue.add("C");
queue.add("D");
while (!queue.isEmpty()) {
  System.out.print(queue.remove() + " ");
}
```
Output
```raw
D C B A A B C D
```
### 2.3 Queue VS Deque
```java
Queue queue = new LinkedList();
Queue queue = new PriorityQueue();
Deque<Integer> deque = new ArrayDeque<Integer>();
Deque<Integer> deque = new LinkedList<Integer>();
```
### 2.4 Use Deque over Stack?
* Stack is concrete class, inherited from Vector. It has no interface.
* Stack is not implemented with linked list.
* Deque is interface. Deque exposes a set of operations which is all about being able to fetch/add/remove items from the start or end of a collection.

```java
Stack<Integer> stack = new Stack<Integer>();
Deque<Integer> stack = new ArrayDeque<Integer>();
Deque<Integer> stack = new LinkedList<Integer>();
Deque<Integer> queue = new ArrayDeque<Integer>();
Deque<Integer> queue = new LinkedList<Integer>();
Deque<Integer> deque = new ArrayDeque<Integer>();
Deque<Integer> deque = new LinkedList<Integer>();
```
### 2.5 ArrayDeque Vs LinkedList
ArrayDeque is new with Java 6. If you need add/remove of the both ends, ArrayDeque is significantly better than a linked list. Random access each element is also O(1) for a cyclic queue.

The only better operation of a linked list is removing the current element during iteration.

## 3. Finalize, Final, Finally

## 4. Exception

## 5. Lamda expression

## 6. References
* [Java Interview Questions](https://www.tutorialspoint.com/java/java_interview_questions.htm)
* [Java Interview Questions](https://www.journaldev.com/java-interview-questions)
