---
layout: tutorial
key: programming
title: "Java Core - Set"
index: 2314
subcategory: java-core
date: 2017-01-08
tags: [Set, HashSet, TreeSet]
---

> Set Interface, HashSet and TreeSet.

## 1. HashSet
* Interface: java.util.Set
* Class: java.util.HashSet

### 1.1 Constructor
There are four constructors in Java HashSet class.
* public HashSet()
* public HashSet(int initialCapacity)
* public HashSet(int initialCapacity, float loadFactor)
* public HashSet(Collection<? extends E> c)

```java
private static void constructHashSet() {
    Set<Integer> set1 = new HashSet<>();
    set1.add(1);
    set1.add(2);
    set1.add(3);
    set1.add(4);
    System.out.println("Construct set: " + set1);

    // initial capacity should be power of 2
    Set<Integer> set2 = new HashSet<>(32);

    // setting backing HashSet initial capacity and load factor
    Set<Integer> set3 = new HashSet<>(32, 0.80f);

    // creating HashSet from another Collection
    Set<Integer> set4 = new HashSet<>(Arrays.asList(new Integer[]{1,2,3,4,5,6,7}));
    System.out.println("Construct set with list: " + set4);
    Set<Integer> set5 = new HashSet<>(set1);
    System.out.println("Construct set with another set: " + set5);
}
```
Output.
```raw
Construct set: [1, 2, 3, 4]
Construct set with list: [1, 2, 3, 4, 5, 6, 7]
Construct set with another set: [1, 2, 3, 4]
```
### 1.2 Common Operations
* set.add(item);
* set.contains(item);
* set.remove(item);

Example.
```java
private static void commonOperations() {
    // add
    Set<Integer> set1 = new HashSet<>();
    for (int i = 0; i < 9; i++) {
        set1.add(i);
    }
    System.out.println("Common operations - add : " + set1);

    // check existence
    System.out.println("Check if element 3 exists : " + set1.contains(3));

    // remove
    set1.remove(6);
    System.out.println("Remove element 6 : " + set1);
}
```
Output.
```raw
Common operations - add : [0, 1, 2, 3, 4, 5, 6, 7, 8]
Check whether element 3 exists : true
Remove element 6 : [0, 1, 2, 3, 4, 5, 7, 8]
```
### 1.3 Traversal
There are two ways to traverse a list.
* for each
* iterator

```java
private static void traverseSet() {
    Set<String> fruits = new HashSet<>();
    fruits.add("Apple");
    fruits.add("Banana");
    fruits.add("Orange");
    fruits.add("Mango");

    // for each
    for (String fruit : fruits) {
        System.out.println("Traverse Set(for each): processing - " + fruit);
    }

    System.out.println();

    // iterator
    Iterator<String> iterator = fruits.iterator();

    while (iterator.hasNext()) {
        String fruit = iterator.next();
        System.out.println("Traverse Set(iterator): processing - " + fruit);
    }
}
```
Output.
```raw
Traverse Set(for each): processing - Apple
Traverse Set(for each): processing - Mango
Traverse Set(for each): processing - Orange
Traverse Set(for each): processing - Banana

Traverse Set(iterator): processing - Apple
Traverse Set(iterator): processing - Mango
Traverse Set(iterator): processing - Orange
Traverse Set(iterator): processing - Banana
```
### 1.4 Remove Element
Below is the example showing the wrong way to remove element during traversal. We will get java.util.ConcurrentModificationException if we call `Set.remove()` inside the for loop.
```java
private static void wrongWayToRemoveElement() {
    Set<String> fruits = new HashSet<>();
    fruits.add("Apple");
    fruits.add("Banana");
    fruits.add("Orange");
    fruits.add("Mango");

    // in for each loop
    for (String fruit : fruits) {
        System.out.println("Traverse Set(for each): processing - " + fruit);

        if ("Orange".equals(fruit)) {
            fruits.remove("Orange");  // java.util.ConcurrentModificationException is thrown
        }
    }

    // in iterator loop
    Iterator<String> iterator = fruits.iterator();

    while (iterator.hasNext()){
        String fruit = iterator.next();
        System.out.println("Traverse Set(iterator): processing - " + fruit);

        if("Orange".equals(fruit)) {
            fruits.remove("Orange");  // java.util.ConcurrentModificationException is thrown
        }
    }

    System.out.println("fruits set after iteration = " + fruits);
}
```
The correct way to remove element is to call `Iterator.remove()` method.
```java
private static void correctWayToRemoveElement() {
    Set<String> fruits = new HashSet<>();
    fruits.add("Apple");
    fruits.add("Banana");
    fruits.add("Orange");
    fruits.add("Watermelon");
    fruits.add("Mango");

    Iterator<String> iterator = fruits.iterator();

    while (iterator.hasNext()){
        String fruit = iterator.next();
        System.out.println("Remove element: processing - " + fruit);

        if("Orange".equals(fruit)) {
            iterator.remove(); // iterator.remove not set.remove
        }
    }

    System.out.println("fruits set after iteration = " + fruits);
}
```
Output.
```raw
Remove element: processing - Apple
Remove element: processing - Watermelon
Remove element: processing - Mango
Remove element: processing - Orange
Remove element: processing - Banana
fruits set after iteration = [Apple, Watermelon, Mango, Banana]
```

## 2. TreeSet
* Interface: java.util.SortedSet
* Class: java.util.TreeSet

### 2.1 Constructor
There are three constructors in Java TreeSet class.
* public TreeSet()
* public TreeSet(Comparator<? super E> comparator)
* public TreeSet(Collection<? extends E> c)

```java
private static void constructTreeSet() {
    SortedSet<Integer> treeSet1 = new TreeSet<>();
    treeSet1.add(5);
    treeSet1.add(9);
    treeSet1.add(4);
    treeSet1.add(2);
    System.out.println("Construct TreeSet: " + treeSet1);

    // Comparator
    SortedSet<Integer> treeSet2 = new TreeSet<>((a,b)->b-a); // reverse order
    treeSet2.add(5);
    treeSet2.add(9);
    treeSet2.add(4);
    treeSet2.add(2);
    System.out.println("Construct TreeSet with comparator: " + treeSet2);

    // with another Collection
    List<Integer> list = Arrays.asList(7,2,1,4,6,5);
    SortedSet<Integer> treeSet3 = new TreeSet<>(list);
    System.out.println("Construct TreeSet with list: " + treeSet3);

    // with another TreeSet
    SortedSet<Integer> treeSet4 = new TreeSet<>(treeSet2);
    System.out.println("Construct TreeSet with another set: " + treeSet4);
}
```
Output.
```raw
Construct TreeSet: [2, 4, 5, 9]
Construct TreeSet with comparator: [9, 5, 4, 2]
Construct TreeSet with list: [1, 2, 4, 5, 6, 7]
Construct TreeSet with another set: [9, 5, 4, 2]
```
### 2.2 Common Operations
* treeSet.add(item);
* treeSet.contains(item);
* treeSet.remove(item);
* treeSet.first();
* treeSet.last();
* treeSet.lower(item);
* treeSet.higher(item);
* treeSet.floor(item);
* treeSet.ceiling(item);
* treeSet.pollFirst();
* treeSet.pollLast();
* treeSet.subSet(fromElement, fromInclusive, toElement, toInclusive);
* treeSet.headSet(toElement, inclusive);
* treeSet.tailSet(fromElement, inclusive);
* treeSet.descendingSet();

Example.
```java
private static void commonOperations() {
    // add
    TreeSet<Integer> treeSet1 = new TreeSet<>();
    for (int i = 0; i < 10; i++) {
        treeSet1.add(i);
    }
    System.out.println("Common operations - add : " + treeSet1);

    // check existence
    System.out.println("Check if element 3 exists : " + treeSet1.contains(3));

    // lower and higher boundaries
    System.out.println("First element is: " + treeSet1.first());
    System.out.println("Last element is: " + treeSet1.last());
    System.out.println("Closest lower element than 4 is: "+ treeSet1.lower(4));
    System.out.println("Closest higher element than 4 is: "+ treeSet1.higher(4));
    System.out.println("Closest floor element than 5 is: "+ treeSet1.floor(5));
    System.out.println("Closest ceiling element than 4 is: " + treeSet1.ceiling(4));

    // lower(n)   smaller than the given element
    // floor(n)   smaller than or equal to the given element
    // ceiling(n) larger than or equal to the given element
    // higher(n)  larger than the given element

    // poll first and last entries
    System.out.println("First element(Polled) is: " + treeSet1.pollFirst());
    System.out.println("Last element(Polled) is: " + treeSet1.pollLast());
    System.out.println("TreeMap after polling: " + treeSet1);

    // submap, headmap and tailmap
    Set<Integer> subSet = treeSet1.subSet(2, true, 6, true);
    System.out.println("SubSet from 2 to 6 is: " + subSet);
    System.out.println("HeadSet to 5: " + treeSet1.headSet(5, true));
    System.out.println("TailMap from 5: " + treeSet1.tailSet(5, true));

    // reverse
    Set<Integer> descendingSet = treeSet1.descendingSet();
    System.out.println("Descending set: " + descendingSet);

    // remove
    treeSet1.remove(6);
    System.out.println("Remove element 6 : " + treeSet1);
}
```
Output.
```raw
Common operations - add : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
Check whether element 3 exists : true
First element is: 0
Last element is: 9
Closest lower element than 4 is: 3
Closest higher element than 4 is: 5
Closest floor element than 5 is: 5
Closest ceiling element than 4 is: 4
First element(Polled) is: 0
Last element(Polled) is: 9
TreeMap after polling: [1, 2, 3, 4, 5, 6, 7, 8]
SubSet from 2 to 6 is: [2, 3, 4, 5, 6]
HeadSet to 5: [1, 2, 3, 4, 5]
TailMap from 5: [5, 6, 7, 8]
Descending set: [8, 7, 6, 5, 4, 3, 2, 1]
Remove element 6 : [1, 2, 3, 4, 5, 7, 8]
```
### 2.3 Traversal
There are two ways to traverse a list.
* for each
* iterator

```java
private static void traverseTreeSet() {
    Set<String> fruits = new TreeSet<>();
    fruits.add("Banana");
    fruits.add("Apple");
    fruits.add("Orange");
    fruits.add("Mango");

    // for each
    for (String fruit : fruits) {
        System.out.println("Traverse TreeSet(for each): processing - " + fruit);
    }

    System.out.println();

    // iterator
    Iterator<String> iterator = fruits.iterator();

    while (iterator.hasNext()) {
        String fruit = iterator.next();
        System.out.println("Traverse TreeSet(iterator): processing - " + fruit);
    }
}
```
Output.
```raw
Traverse TreeSet(for each): processing - Apple
Traverse TreeSet(for each): processing - Banana
Traverse TreeSet(for each): processing - Mango
Traverse TreeSet(for each): processing - Orange

Traverse TreeSet(iterator): processing - Apple
Traverse TreeSet(iterator): processing - Banana
Traverse TreeSet(iterator): processing - Mango
Traverse TreeSet(iterator): processing - Orange
```
### 2.4 Remove Element
Below is the example showing the wrong way to remove element during traversal. We will get java.util.ConcurrentModificationException if we call `Set.remove()` inside the for loop.
```java
private static void wrongWayToRemoveElement() {
    Set<String> fruits = new TreeSet<>();
    fruits.add("Banana");
    fruits.add("Apple");
    fruits.add("Orange");
    fruits.add("Mango");

    // in for each loop
    for (String fruit : fruits) {
        System.out.println("Traverse TreeSet(for each): processing - " + fruit);

        if ("Orange".equals(fruit)) {
            fruits.remove("Orange");  // java.util.ConcurrentModificationException is thrown
        }
    }

    // in iterator loop
    Iterator<String> iterator = fruits.iterator();

    while (iterator.hasNext()){
        String fruit = iterator.next();
        System.out.println("Traverse TreeSet(iterator): processing - " + fruit);

        if("Orange".equals(fruit)) {
            fruits.remove("Orange");  // java.util.ConcurrentModificationException is thrown
        }
    }

    System.out.println("fruits set after iteration = " + fruits);
}
```
The correct way to remove element is to call `Iterator.remove()` method.
```java
private static void correctWayToRemoveElement() {
    Set<String> fruits = new TreeSet<>();
    fruits.add("Banana");
    fruits.add("Apple");
    fruits.add("Orange");
    fruits.add("Mango");

    Iterator<String> iterator = fruits.iterator();

    while (iterator.hasNext()){
        String fruit = iterator.next();
        System.out.println("Remove element: processing - " + fruit);

        if ("Orange".equals(fruit)) {
            iterator.remove(); // iterator.remove not set.remove
        }
    }

    System.out.println("fruits set after remove = " + fruits);
}
```
Output.
```raw
Remove element: processing - Apple
Remove element: processing - Banana
Remove element: processing - Mango
Remove element: processing - Orange
fruits set after remove = [Apple, Banana, Mango]
```

## 3. Source Files
* [Source files for Java Set on GitHub](https://github.com/jojozhuang/java-programming/tree/master/java-core-set)

## 4. References
* [Java Doc - Controlling Access to Members of a Class](https://docs.oracle.com/javase/tutorial/java/javaOO/accesscontrol.html)
* [Core Java Tutorial](https://www.journaldev.com/24601/java-11-features)
* [Java Data Types](https://www.w3schools.com/java/java_data_types.asp)
* [Primitive Wrapper Classes are Immutable in Java](https://www.geeksforgeeks.org/primitive-wrapper-classes-are-immutable-in-java/)
* [Collections in Java – Tutorial](https://www.journaldev.com/1260/collections-in-java-tutorial)
