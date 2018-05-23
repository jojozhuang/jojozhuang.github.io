---
layout: note
key: note
title: "Java Interview Questions(Draft)"
index: 203
date: 2016-02-03
category: language
---

## 1. String, StringBuilder, StringBuffer

Feature     | String | StringBuilder | StringBuffer
------------|--------|---------------|-------------
mutable     | No     | Yes           | Yes
thread-safe | Yes    | No            | Yes


## 2. Finalize, Final, Finally

## 3. Exception

## 4. Methods used in algorithm
returns the number of one-bits
```java
Integer.bitCount(177); // return 4
```
Number = 177
Binary = 10110001
Number of one bits = 4

Binary search
```java
int index1 = Arrays.binarySearch(new char[]{'c','d','e','f','g'}, 'f');  // index1 = 3;
int index2 = Arrays.binarySearch(new int[]{10,15,20,22,35}, 20); // index2 = 2;
int index3 = Collections.binarySearch(Arrays.asList(new Integer[] {10,15,20,22,35}), 15); // index3 = 1;
```

## 5. Split
Split string a by '+' and 'i'.
```java
int a = "1+2i";
String x[] = a.split("\\+|i"); // x[] = {1, 2};

int b = "1+2i3";
String y[] = b.split("\\+|i"); // y[] = {1, 2, 3};
```

Stack or LinkedList?
Queue or Deque?

## 9. References
* [Java Interview Questions](https://www.tutorialspoint.com/java/java_interview_questions.htm)
