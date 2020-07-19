---
layout: tutorial
key: programming
title: "Java Core - ArrayList and LinkedList"
index: 2312
subcategory: java-core
date: 2017-01-07
tags: [ArrayList, LinkedList]
---

> ArrayList and LinkedList

## 1. ArrayList
### 1.1 Constructor
There are three constructors in Java ArrayList class.
* public ArrayList()
* public ArrayList(int initialCapacity)
* public ArrayList(Collection<? extends E> c)

```java
private static void constructList() {
    // no arguments
    List<Integer> list1 = new ArrayList<>();
    list1.add(5);
    list1.add(9);
    list1.add(4);
    list1.add(2);
    System.out.println("Construct list: " + list1);

    // with another list
    List<Integer> list2 = new ArrayList<>(list1);
    System.out.println("Construct list with another list: " + list2);

    // with treeset
    SortedSet<Integer> treeSet1 = new TreeSet<>(list1);
    List<Integer> list3 = new ArrayList<>(treeSet1);
    System.out.println("Construct list with tree set: " + list3);
}
```
Output.
```raw
Construct list: [5, 9, 4, 2]
Construct list with another list: [5, 9, 4, 2]
Construct list with tree set: [2, 4, 5, 9]
```
### 1.2 Common Operations
* list.add(item);
* list.add(0, item);
* list.remove(index);
* list.subList(index1, index2);

Example.
```java
private static void commonOperations() {
    // add
    List<Integer> list1 = new ArrayList<>();
    for (int i = 0; i < 9; i++) {
        list1.add(i);
    }
    System.out.println("Common operations - add : " + list1);

    // insert
    list1.add(0, 12);
    System.out.println("Insert 12 at index 0 : " + list1);
    list1.add(5, 9);
    System.out.println("Insert 9 at index 5 : " + list1);

    // remove
    list1.remove(0);
    System.out.println("Remove element which is at index 0 : " + list1);

    // get
    System.out.println("Get element which is at index 3 : " + list1.get(3));

    // sub list
    List<Integer> list2 = list1.subList(2, 4);
    System.out.println("Sub list from index 2(inclusive) to index 4(exclusive) : " + list2);
}
```
Output.
```raw
Common operations - add : [0, 1, 2, 3, 4, 5, 6, 7, 8]
Insert 12 at index 0 : [12, 0, 1, 2, 3, 4, 5, 6, 7, 8]
Insert 9 at index 5 : [12, 0, 1, 2, 3, 9, 4, 5, 6, 7, 8]
Remove element which is at index 0 : [0, 1, 2, 3, 9, 4, 5, 6, 7, 8]
Get element which is at index 3 : 3
Sub list from index 2(inclusive) to index 4(exclusive) : [2, 3]
```
### 1.3 Sorting
```java
private static void sortList() {
    // Sorting
    List<Integer> list1 = new ArrayList<>();
    list1.add(3);
    list1.add(1);
    list1.add(2);
    Collections.sort(list1);                // ascending order, list1 = {1,2,3}
    System.out.println("Sort list in ascending order: " + list1);
    Collections.sort(list1, (a,b)->(b-a));  // descending order, list1 = {3,2,1}
    System.out.println("Sort list in descending order: " + list1);
}
```
Output.
```raw
Sort list in ascending order: [1, 2, 3]
Sort list in descending order: [3, 2, 1]
```
### 1.4 Traversal
There are three ways to traverse a list.
* basic for
* for each
* iterator

```java
private static void traverseList() {
    List<String> fruits = new ArrayList<>();
    fruits.add("Apple");
    fruits.add("Banana");
    fruits.add("Orange");
    fruits.add("Watermelon");
    fruits.add("Kiwi");

    // basic for
    for (int i = 0; i < fruits.size(); i++) {
        System.out.println("Traverse List(basic for): processing - " + fruits.get(i));
    }

    System.out.println();

    // for each
    for (String fruit : fruits) {
        System.out.println("Traverse List(for each): processing - " + fruit);
    }

    System.out.println();

    // iterator
    Iterator<String> iterator = fruits.iterator();

    while (iterator.hasNext()) {
        String fruit = iterator.next();
        System.out.println("Traverse List(iterator): processing - " + fruit);
    }
}
```
Output.
```raw
Traverse List(basic for): processing - Apple
Traverse List(basic for): processing - Banana
Traverse List(basic for): processing - Orange
Traverse List(basic for): processing - Watermelon
Traverse List(basic for): processing - Kiwi

Traverse List(for each): processing - Apple
Traverse List(for each): processing - Banana
Traverse List(for each): processing - Orange
Traverse List(for each): processing - Watermelon
Traverse List(for each): processing - Kiwi

Traverse List(iterator): processing - Apple
Traverse List(iterator): processing - Banana
Traverse List(iterator): processing - Orange
Traverse List(iterator): processing - Watermelon
Traverse List(iterator): processing - Kiwi
```
### 1.5 Remove Element
Below is the example showing the wrong way to remove element during traversal. We will get java.util.ConcurrentModificationException if we call `List.remove()` inside the for loop.
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
        System.out.println("Traverse List(for each): processing - " + fruit);

        if ("Orange".equals(fruit)) {
            fruits.remove("Orange");  // java.util.ConcurrentModificationException is thrown
        }
    }

    // in iterator loop
    Iterator<String> iterator = fruits.iterator();

    while (iterator.hasNext()){
        String fruit = iterator.next();
        System.out.println("Traverse List(iterator): processing - " + fruit);

        if("Orange".equals(fruit)) {
            fruits.remove("Orange");  // java.util.ConcurrentModificationException is thrown
        }
    }

    System.out.println("fruits list after iteration = " + fruits);
}
```
The correct way to remove element is to call `Iterator.remove()` method.
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
        System.out.println("Remove element: processing - " + fruit);

        if("Orange".equals(fruit)) {
            iterator.remove();  // iterator.remove not list.remove
        }
    }

    System.out.println("Fruits list after deletion = " + fruits);
}
```
Output.
```raw
Remove element: processing - Apple
Remove element: processing - Banana
Remove element: processing - Orange
Remove element: processing - Watermelon
Remove element: processing - Kiwi
Fruits list after deletion = [Apple, Banana, Watermelon, Kiwi]
```

## 2. LinkedList
### 2.1 Constructor
There are two constructors in Java LinkedList class.
* public LinkedList()
* public LinkedList(Collection<? extends E> c)

```java
private static void constructList() {
    // no arguments
    List<Integer> list1 = new LinkedList<>();
    list1.add(5);
    list1.add(9);
    list1.add(4);
    list1.add(4);
    list1.add(2);
    System.out.println("Construct list: " + list1);

    // with another list
    List<Integer> list2 = new LinkedList<>(list1);
    System.out.println("Construct list with another list: " + list2);

    // with treeset
    SortedSet<Integer> treeSet1 = new TreeSet<>(list1);
    List<Integer> list3 = new LinkedList<>(treeSet1);
    System.out.println("Construct list with tree set: " + list3);
}
```
Output.
```raw
Construct list: [5, 9, 4, 4, 2]
Construct list with another list: [5, 9, 4, 4, 2]
Construct list with tree set: [2, 4, 5, 9]
```
### 2.2 Common Operations
* list.add(item);
* list.add(0, item);
* list.remove(index);
* list.subList(index1, index2);

Example.
```java
private static void commonOperations() {
    // add
    List<Integer> list1 = new LinkedList<>();
    for (int i = 0; i < 9; i++) {
        list1.add(i);
    }
    System.out.println("Common operations - add : " + list1);

    // insert
    list1.add(0, 12);
    System.out.println("Insert 12 at index 0 : " + list1);
    list1.add(5, 9);
    System.out.println("Insert 9 at index 5 : " + list1);

    // remove
    list1.remove(0);
    System.out.println("Remove element which is at index 0 : " + list1);

    // sub list
    List<Integer> list2 = list1.subList(2, 4);
    System.out.println("Sub list from index 2(inclusive) to index 4(exclusive) : " + list2);
}
```
Output.
```raw
Common operations - add : [0, 1, 2, 3, 4, 5, 6, 7, 8]
Insert 12 at index 0 : [12, 0, 1, 2, 3, 4, 5, 6, 7, 8]
Insert 9 at index 5 : [12, 0, 1, 2, 3, 9, 4, 5, 6, 7, 8]
Remove element which is at index 0 : [0, 1, 2, 3, 9, 4, 5, 6, 7, 8]
Sub list from index 2(inclusive) to index 4(exclusive) : [2, 3]
```
### 2.3 Sorting
```java
private static void sortList() {
    // Sorting
    List<Integer> list1 = new LinkedList<>();
    list1.add(3);
    list1.add(1);
    list1.add(2);

    Collections.sort(list1);                // ascending order, list1 = {1,2,3}
    System.out.println("Sort list in ascending order: " + list1);
    Collections.sort(list1, (a,b)->(b-a));  // descending order, list1 = {3,2,1}
    System.out.println("Sort list in descending order: " + list1);
}
```
Output.
```raw
Sort list in ascending order: [1, 2, 3]
Sort list in descending order: [3, 2, 1]
```
### 2.4 Traversal
There are two ways to traverse a list.
* for each
* iterator

```java
private static void traverseList() {
    List<String> fruits = new LinkedList<>();
    fruits.add("Apple");
    fruits.add("Banana");
    fruits.add("Orange");
    fruits.add("Watermelon");
    fruits.add("Kiwi");

    // for each
    for (String fruit : fruits) {
        System.out.println("Traverse List(for each): processing - " + fruit);
    }

    System.out.println();

    // iterator
    Iterator<String> iterator = fruits.iterator();

    while (iterator.hasNext()) {
        String fruit = iterator.next();
        System.out.println("Traverse List(iterator): processing - " + fruit);
    }
}
```
Output.
```raw
Traverse List(for each): processing - Apple
Traverse List(for each): processing - Banana
Traverse List(for each): processing - Orange
Traverse List(for each): processing - Watermelon
Traverse List(for each): processing - Kiwi

Traverse List(iterator): processing - Apple
Traverse List(iterator): processing - Banana
Traverse List(iterator): processing - Orange
Traverse List(iterator): processing - Watermelon
Traverse List(iterator): processing - Kiwi
```
### 2.5 Remove Element
Below is the example showing the wrong way to remove element during traversal. We will get java.util.ConcurrentModificationException if we call `List.remove()` inside the for loop.
```java
private static void wrongWayToRemoveElement() {
    List<String> fruits = new LinkedList<>();
    fruits.add("Apple");
    fruits.add("Banana");
    fruits.add("Orange");
    fruits.add("Watermelon");
    fruits.add("Kiwi");

    // in for each loop
    for (String fruit : fruits) {
        System.out.println("Traverse List(for each): processing - " + fruit);

        if ("Orange".equals(fruit)) {
            fruits.remove("Orange");  // java.util.ConcurrentModificationException is thrown
        }
    }

    // in iterator loop
    Iterator<String> iterator = fruits.iterator();

    while (iterator.hasNext()){
        String fruit = iterator.next();
        System.out.println("Traverse List(iterator): processing - " + fruit);

        if("Orange".equals(fruit)) {
            fruits.remove("Orange");  // java.util.ConcurrentModificationException is thrown
        }
    }

    System.out.println("fruits list after iteration = " + fruits);
}
```
The correct way to remove element is to call `Iterator.remove()` method.
```java
private static void correctWayToRemoveElement() {
    List<String> fruits = new LinkedList<>();
    fruits.add("Apple");
    fruits.add("Banana");
    fruits.add("Orange");
    fruits.add("Watermelon");
    fruits.add("Kiwi");

    Iterator<String> iterator = fruits.iterator();

    while (iterator.hasNext()){
        String fruit = iterator.next();
        System.out.println("Remove element: processing - " + fruit);

        if("Orange".equals(fruit)) {
            iterator.remove();  // iterator.remove not list.remove
        }
    }

    System.out.println("Fruits list after deletion = " + fruits);
}
```
Output.
```raw
Remove element: processing - Apple
Remove element: processing - Banana
Remove element: processing - Orange
Remove element: processing - Watermelon
Remove element: processing - Kiwi
Fruits list after deletion = [Apple, Banana, Watermelon, Kiwi]
```
### 2.6 Interface
LinkedList implements three interfaces: List, Queue and Queue.
```java
private static void interfaces() {
    // List Interface, insertion order
    List<Integer> list = new LinkedList<>();
    list.add(1);
    list.add(2);
    list.add(4);
    list.forEach(System.out::println);  // print 1,2,4

    // Queue interface, FIFO
    Queue<Integer> queue = new LinkedList<>();
    queue.offer(1);
    queue.offer(2);
    queue.offer(3);
    while (!queue.isEmpty()) {
        System.out.println(queue.poll());  // print 1,2,3
    }

    // Deque interface, FIFO or LIFO
    Deque<Integer> deque = new LinkedList<>();
    deque.offerLast(1);  // deque = {1}
    deque.offerLast(2);  // deque = {1,2}
    deque.offerFirst(3); // deque = {3, 1, 2}
    deque.peekFirst();      // return 3
    deque.peekLast( );      // return 2
    deque.pollFirst();      // return 3, deque = {1,2}
    deque.pollLast();       // return 2, deque = {1}
}
```

## 3. ArrayList vs LinkedList
1) The insert and remove operations give good performance (O(1)) in LinkedList compared to ArrayList(O(n)). Hence if there is a requirement of frequent addition and deletion in application then LinkedList is a best choice.

2) Search (get method) operations are fast in Arraylist (O(1)) but not in LinkedList (O(n)) so If there are less add and remove operations and more search operations requirement, ArrayList would be your best bet.

## 4. Source Files
* [Source files for Java ArrayList and LinkedList on GitHub](https://github.com/jojozhuang/java-programming/tree/master/java-core-list)

## 5. References
* [Java Doc - Controlling Access to Members of a Class](https://docs.oracle.com/javase/tutorial/java/javaOO/accesscontrol.html)
* [Core Java Tutorial](https://www.journaldev.com/24601/java-11-features)
* [Java Data Types](https://www.w3schools.com/java/java_data_types.asp)
* [Primitive Wrapper Classes are Immutable in Java](https://www.geeksforgeeks.org/primitive-wrapper-classes-are-immutable-in-java/)
* [Collections in Java – Tutorial](https://www.journaldev.com/1260/collections-in-java-tutorial)
