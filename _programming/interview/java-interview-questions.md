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
### 2.1 How to remove element in for each loop?
It is wrong to call `List.remove()` method in the loop. `ConcurrentModificationException` will be thrown.
```java
private static void wrongWayToRemoveElement() {
    List<String> fruits = new ArrayList<>();
    fruits.add("Apple");
    fruits.add("Banana");
    fruits.add("Orange");
    fruits.add("Watermelon");
    fruits.add("Kiwi");

    // in for each loop
    for (String fruit : fruits) {
        System.out.println("Processing - " + fruit);

        if ("Orange".equals(fruit)) {
            fruits.remove("Orange");  // java.util.ConcurrentModificationException is thrown
        }
    }

    // in iterator loop
    Iterator<String> iterator = fruits.iterator();

    while (iterator.hasNext()){
        String fruit = iterator.next();
        System.out.println("Processing - " + fruit);

        if("Orange".equals(fruit)) {
            fruits.remove("Orange");  // java.util.ConcurrentModificationException is thrown
        }
    }

    System.out.println("fruits set after iteration = " + fruits);
}
```
Output.
```sh
Processing - Apple
Processing - Banana
Processing - Orange
java.util.ConcurrentModificationException
	at java.util.ArrayList$Itr.checkForComodification(ArrayList.java:901)
	at java.util.ArrayList$Itr.next(ArrayList.java:851)
	at johnny.java.collection.ArrayListExample.wrongWayToRemoveElement(ArrayListExample.java:55)
	at johnny.java.collection.ArrayListExample.main(ArrayListExample.java:20)
```
Instead, call `Iterator.remove()` method.
```java
private static void correctWayToRemoveElement() {
    List<String> fruits = new ArrayList<>();
    fruits.add("Apple");
    fruits.add("Banana");
    fruits.add("Orange");
    fruits.add("Watermelon");
    fruits.add("Kiwi");

    Iterator<String> iterator = fruits.iterator();

    while (iterator.hasNext()){
        String fruit = iterator.next();
        System.out.println("Processing - " + fruit);

        if("Orange".equals(fruit)) {
            iterator.remove();  // iterator.remove not list.remove
        }
    }

    System.out.println("fruits set after iteration = " + fruits);
}
```
Output.
```sh
Processing - Apple
Processing - Banana
Processing - Orange
Processing - Watermelon
Processing - Kiwi
fruits set after iteration = [Apple, Banana, Watermelon, Kiwi]
```
### 2.2 ArrayList VS LinkedList
1) The insert and remove operations give good performance (O(1)) in LinkedList compared to ArrayList(O(n)). Hence if there is a requirement of frequent addition and deletion in application then LinkedList is a best choice.

2) Search (get method) operations are fast in Arraylist (O(1)) but not in LinkedList (O(n)) so If there are less add and remove operations and more search operations requirement, ArrayList would be your best bet.

### 2.3 Stack and Queue
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
### 2.4 Queue VS Deque
```java
Queue queue = new LinkedList();
Queue queue = new PriorityQueue();
Deque<Integer> deque = new ArrayDeque<Integer>();
Deque<Integer> deque = new LinkedList<Integer>();
```
### 2.5 Use Deque over Stack?
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
### 2.6 ArrayDeque Vs LinkedList
ArrayDeque is new with Java 6. If you need add/remove of the both ends, ArrayDeque is significantly better than a linked list. Random access each element is also O(1) for a cyclic queue.

The only better operation of a linked list is removing the current element during iteration.

## 2. Hash Collision Resolution
* Separate chaining
* Linear Probing (Clustering problem)
* Quadratic Probing (May not find a vacant cell)

http://www.cs.cmu.edu/~ab/15-121N11/lectures/lecture16.pdf

## 3. Finalize, Final, Finally

## 4. Exception

## 5. Lamda expression

## 6. References
* [Java Interview Questions](https://www.tutorialspoint.com/java/java_interview_questions.htm)
* [Java Interview Questions](https://www.journaldev.com/java-interview-questions)
