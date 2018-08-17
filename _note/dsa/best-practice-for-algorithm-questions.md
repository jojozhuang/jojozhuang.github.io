---
layout: note
key: note
title: "Best Practice for Algorithm Questions"
index: 525
category: dsa
image: /note/dsa.png
date: 2016-05-25
postdate: 2016-05-25
tags: [BST]
---

> Best practices


## 1. Useful Methods in Java
### 1.1 String and Character
```java
String.toCharArray()
StringBuilder.append()

Character.isDigit(c) // same to c >= '0' && c <= '9'
```
Split string with regex.
```java
int a = "1+2i";
String x[] = a.split("\\+|i"); // x[] = {1, 2};

int b = "1+2i3";
String y[] = b.split("\\+|i"); // y[] = {1, 2, 3};
```

### 1.2 Array and Collections
```java
// Sort array
int[] arr = {3, 7, 6, 5, 9, 2};
Arrays.sort(array);

// Sort collection
List<String> list = new ArrayList<String>();
list.add("apple");
list.add("banana");
Collections.sort(list);

// Binary search on sorted array or collection
int index1 = Arrays.binarySearch(new char[]{'c','d','e','f','g'}, 'f');  // index1 = 3;
int index2 = Arrays.binarySearch(new int[]{10,15,20,22,35}, 20); // index2 = 2;
int index3 = Collections.binarySearch(Arrays.asList(new Integer[] {10,15,20,22,35}), 15); // index3 = 1;

// Binary search on array
int[] array = {10,15,20,22,35};
int index1 = Arrays.binarySearch(array,20); // index1 = 2
int index2 = Arrays.binarySearch(array,8);  // index2 = -1, (-insertion point) - 1
int index3 = Arrays.binarySearch(array,40); // index3 = -6, (-insertion point) - 1

// Binary search on collection
List list = new ArrayList<>(Arrays.asList(new Integer[]{10,20,15,22,35}));
int index1 = Collections.binarySearch(list,20); // index1 = 2
int index2 = Collections.binarySearch(list,8);  // index2 = -1, (-insertion point) - 1
int index3 = Collections.binarySearch(list,40); // index3 = -6, (-insertion point) - 1
```
### 1.3 Bit Manipulation
Number of one-bits
```java
// Number = 177
// Binary = 10110001
// Number of one bits = 4
Integer.bitCount(177); // return 4
```
Flip bit with XOR, change 1 to 0 and change 0 to 1.
```java
bit ^ 1
```

## 2. Linked List Question
* Consider recursion first, then iteration.
* Dummy Node, Use fast and slow pointers to find middle node, reverse linked list.

## 3. Tree Questions
* Recursive, Iterative, Stack of Recursion, Queue for Iteration.
* BST or regular binary tree?
* BST => Inorder Traversal
* Template for tree traversal.
* outdegree, indegree, question331.

## 4. Back Tracking

## 5. References
* [Why should I use Deque over Stack?](https://stackoverflow.com/questions/12524826/why-should-i-use-deque-over-stack)
