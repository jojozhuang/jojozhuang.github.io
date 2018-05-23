---
layout: note
key: note
title: "Basic Java Knowledge for Algorithm Questions(Draft)"
index: 203
date: 2016-02-04
category: language
---

## 1. List, Set, Map

### 1.1 Deque
```java
Deque<String> stack = new ArrayDeque<String>();
Deque<String> queue = new ArrayDeque<String>();

stack.push("A");
stack.push("B");
stack.push("C");
stack.push("D");

while (!stack.isEmpty())
  System.out.print(stack.pop() + " ");

queue.add("A");
queue.add("B");
queue.add("C");
queue.add("D");
while (!queue.isEmpty())
  System.out.print(queue.remove() + " ");
```
### 1.1 Use Deque over Stack?

```java
Stack<Integer> stack = new Stack<Integer>();
Deque<Integer> stack = new ArrayDeque<Integer>();
Deque<Integer> stack = new LinkedList<Integer>();
Deque<Integer> queue = new ArrayDeque<Integer>();
Deque<Integer> queue = new LinkedList<Integer>();
Deque<Integer> deque = new ArrayDeque<Integer>();
Deque<Integer> deque = new LinkedList<Integer>();
```

1. Stack is concrete class, inherited from Vector. It has no interface.
2. Stack is not implemented with linked list.
3. Deque is interface. Deque exposes a set of operations which is all about being able to fetch/add/remove items from the start or end of a collection.

https://stackoverflow.com/questions/12524826/why-should-i-use-deque-over-stack

### 1.2 ArrayDeque Vs LinkedList
ArrayDeque is new with Java 6. If you need add/remove of the both ends, ArrayDeque is significantly better than a linked list. Random access each element is also O(1) for a cyclic queue.

The only better operation of a linked list is removing the current element during iteration.

### 1.3 ArrayList VS LinkedList
1) The insert and remove operations give good performance (O(1)) in LinkedList compared to ArrayList(O(n)). Hence if there is a requirement of frequent addition and deletion in application then LinkedList is a best choice.

2) Search (get method) operations are fast in Arraylist (O(1)) but not in LinkedList (O(n)) so If there are less add and remove operations and more search operations requirement, ArrayList would be your best bet.

### 1.4 Queue VS Deque
```java
Queue q = new LinkedList();
Queue q = new PriorityQueue();
Deque<Integer> deque = new ArrayDeque<Integer>();
Deque<Integer> deque = new LinkedList<Integer>();
```

Arrays.sort();
Collections.sort();

Arrays.binarySearch();

Bit Manipulation
Flip bit with XOR, eg. Change 1 to 0 and change 0 to 1, just return bit ^ 1.

Integer.countBit();

String.toCharArray(),
StringBuilder.append()

Character.isDigit(c)
c >= '0' && c <= '9'

Lamda expression.

## 2. Linked List Question
a) consider recursion first, then iteration.
b) Dummy Node, Use fast and slow pointers to find middle node, reverse linked list.

## 3. Back Tracking

## 5. Tree Questions
Recursive, Iterative, Stack of Recursion, Queue for Iteration.

BST => Inorder Traversal

Template for tree traversal.

## 9. References
* [Java Interview Questions](https://www.tutorialspoint.com/java/java_interview_questions.htm)
