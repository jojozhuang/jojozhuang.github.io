---
layout: tutorial
key: note
title: "Java Interview Questions - Collection"
index: 9605
subcategory: interview-java
date: 2016-01-03
tags: [Java, Interview, Collection]
---

> Frequently asked Java Collection questions.

## 1. Collection Comparison
### 1.1 ArrayList vs. LinkedList
Example of ArrayList.
```java
// construct array list
List<Integer> list = new ArrayList<>();
// add
list.add(1);
list.add(2);
// insert
list.add(0, 8);
// get by index
list.get(0);
// remove
list.remove(0);
```
Example of LinkedList.
```java
// construct linked list
List<Integer> list = new LinkedList<>();
// add
list.add(1);
list.add(2);
// insert
list1.add(0, 8);
// get by index
list.get(0);
// remove
list.remove(0);
```
Performance of ArrayList vs. LinkedList

 Method                               | ArrayList | LinkedList
--------------------------------------|-----------|-------------
get(index)                            | O(1)      | O(n)
add(value) <sup>* append</sup>        | O(1)      | O(1)
add(index, value) <sup>* insert</sup> | O(n)      | O(1) if position is known
remove(index)                         | O(n)      | O(1) if position is known

* The insert and remove operations give good performance O(1) in LinkedList compared to ArrayList O(n). Hence if there is a requirement of frequent **addition** and **deletion** in application then **LinkedList** is a best choice.
* Random access(get method) is fast in Arraylist O(1) but not in LinkedList O(n). So if there are less add and remove operations and more **random access** operations requirement, **ArrayList** would be your best bet.

### 1.2 Stack, Queue and Deque
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
### 1.3 Set and Map
### 1.4 SortedSet and SortedMap
## 2. Collection Comparison

### 2.2 ArrayDeque vs. LinkedList
ArrayDeque is new with Java 6. If you need add/remove of the both ends, ArrayDeque is significantly better than a linked list. Random access each element is also O(1) for a cyclic queue.

The only better operation of a linked list is removing the current element during iteration.
### 2.3 Queue vs. Deque
```java
Queue queue = new LinkedList();
Queue queue = new PriorityQueue();
Deque<Integer> deque = new ArrayDeque<Integer>();
Deque<Integer> deque = new LinkedList<Integer>();
```
### 2.3 Use Deque over Stack?
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
### 2.4 HashMap vs. LinkedHashMap vs. TreeMap
All three classes implement the Map interface and offer mostly the same functionality. The most important difference is the order in which iteration through the entries will happen:
* `HashMap` makes absolutely no guarantees about the iteration order. It can (and will) even change completely when new elements are added.
* `TreeMap` will iterate according to the "natural ordering" of the keys according to their `compareTo()` method (or an externally supplied `Comparator`). Additionally, it implements the SortedMap interface, which contains methods that depend on this sort order.
* `LinkedHashMap` will iterate in the order in which the entries were put into the map

`Hashtable` is the generic name for hash-based maps. In the context of the Java API, Hashtable is an obsolete class from the days of Java 1.1 before the collections framework existed. It should not be used anymore, because its API is cluttered with obsolete methods that duplicate functionality, and its methods are synchronized (which can decrease performance and is generally useless). Use `ConcurrentHashMap` instead of Hashtable.

## 3. Collection Questions
### 3.1 Comparable vs Comparator in Java
A comparable object is capable of comparing itself with another object. The class itself must implements the `java.lang.Comparable` interface to compare its instances. Below is the definition of `Comparable` Interface.
```java
public interface Comparable<T> {
    public int compareTo(T o); // the only method
}
```
Below is the definition of `Comparator` Interface.
```java
public interface Comparator<T> {
    int compare(T o1, T o2);
    // other methods
}
```

Comparable vs Comparator
* Comparable interface can be used to provide `single` way of sorting whereas Comparator interface is used to provide `different` ways of sorting.
* For using Comparable, Class needs to implement it whereas for using Comparator we don’t need to make any change in the class.
* Comparable interface is in `java.lang` package whereas Comparator interface is present in `java.util` package.
* We don’t need to make any code changes at client side for using Comparable, `Arrays.sort()` or `Collection.sort()` methods automatically uses the `compareTo()` method of the class. For Comparator, client needs to provide the Comparator class to use in compare() method.

### 3.2 How to remove element in for each loop?
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
```raw
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
```raw
Processing - Apple
Processing - Banana
Processing - Orange
Processing - Watermelon
Processing - Kiwi
fruits set after iteration = [Apple, Banana, Watermelon, Kiwi]
```
### 3.3 Hash Collision Resolution
* Separate chaining
* Linear Probing (Clustering problem)
* Quadratic Probing (May not find a vacant cell)

http://www.cs.cmu.edu/~ab/15-121N11/lectures/lecture16.pdf

## 4. References
* [Java Interview Questions](https://www.tutorialspoint.com/java/java_interview_questions.htm)
* [Java Interview Questions](https://www.journaldev.com/java-interview-questions)
* [300 Core Java Interview Questions](https://www.javatpoint.com/corejava-interview-questions)
* [Errors V/s Exceptions In Java](https://www.geeksforgeeks.org/errors-v-s-exceptions-in-java/)
* [Comparable and Comparator in Java Example](https://www.journaldev.com/780/comparable-and-comparator-in-java-example)
