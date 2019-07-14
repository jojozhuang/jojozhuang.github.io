---
layout: tutorial
key: popular
title: "Java Core - Collection - Set and Map"
index: 1423
category: java-core
breadcrumb: [Popular, Java, Java Core]
date: 2017-01-08
tags: [List, Set, Map, Stack]
---

> Usage of different collection objects, including list, set, map, thread-safe collection objects.

## 1. Overview
Commonly used collection classes.

<div class="table-responsive-sm" markdown="block">

Collection | Ordering | Random Access | KeyValue | Duplicate Elements | Null Element | Thread Safety
-----------|----------|---------------|----------|--------------------|--------------|---------------
ArrayList  | Yes      | Yes           | No       | Yes                | Yes          | No
LinkedList | Yes      | No            | No       | Yes                | Yes          | No
HashSet    | No       | No            | No       | No                 | Yes          | No
TreeSet    | Yes      | No            | No       | No                 | No           | No
HashMap    | No       | Yes           | Yes      | No                 | Yes          | No
TreeMap    | Yes      | Yes           | Yes      | No                 | No           | No
Vector     | Yes      | Yes           | No       | Yes                | Yes          | Yes
HashTable  | No       | Yes           | Yes      | No                 | No           | Yes
Properties | No       | Yes           | Yes      | No                 | No           | Yes
Stack      | Yes      | No            | No       | Yes                | Yes          | Yes
CopyOnWriteArrayList  | Yes | Yes     | No       | Yes                | Yes          | Yes
ConcurrentHashMap     | No  | Yes     | Yes      | No                 | Yes          | Yes
CopyOnWriteArraySet   | No  | No      | No       | No                 | Yes          | Yes

</div>

## 2. HashSet
* Interface: java.util.Set
* Class: java.util.HashSet

### 2.1 Constructor
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
```sh
Construct set: [1, 2, 3, 4]
Construct set with list: [1, 2, 3, 4, 5, 6, 7]
Construct set with another set: [1, 2, 3, 4]
```
### 2.2 Common Operations
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
```sh
Common operations - add : [0, 1, 2, 3, 4, 5, 6, 7, 8]
Check whether element 3 exists : true
Remove element 6 : [0, 1, 2, 3, 4, 5, 7, 8]
```
### 2.3 Traversal
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
```sh
Traverse Set(for each): processing - Apple
Traverse Set(for each): processing - Mango
Traverse Set(for each): processing - Orange
Traverse Set(for each): processing - Banana

Traverse Set(iterator): processing - Apple
Traverse Set(iterator): processing - Mango
Traverse Set(iterator): processing - Orange
Traverse Set(iterator): processing - Banana
```
### 2.4 Remove Element
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
```sh
Remove element: processing - Apple
Remove element: processing - Watermelon
Remove element: processing - Mango
Remove element: processing - Orange
Remove element: processing - Banana
fruits set after iteration = [Apple, Watermelon, Mango, Banana]
```

## 3. TreeSet
* Interface: java.util.SortedSet
* Class: java.util.TreeSet

### 3.1 Constructor
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
```sh
Construct TreeSet: [2, 4, 5, 9]
Construct TreeSet with comparator: [9, 5, 4, 2]
Construct TreeSet with list: [1, 2, 4, 5, 6, 7]
Construct TreeSet with another set: [9, 5, 4, 2]
```
### 3.2 Common Operations
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
```sh
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
### 3.3 Traversal
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
```sh
Traverse TreeSet(for each): processing - Apple
Traverse TreeSet(for each): processing - Banana
Traverse TreeSet(for each): processing - Mango
Traverse TreeSet(for each): processing - Orange

Traverse TreeSet(iterator): processing - Apple
Traverse TreeSet(iterator): processing - Banana
Traverse TreeSet(iterator): processing - Mango
Traverse TreeSet(iterator): processing - Orange
```
### 3.4 Remove Element
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
```sh
Remove element: processing - Apple
Remove element: processing - Banana
Remove element: processing - Mango
Remove element: processing - Orange
fruits set after remove = [Apple, Banana, Mango]
```
## 4. HashMap
* Interface: java.util.Map
* Class: java.util.HashMap

### 4.1 Constructor
There are three constructors in Java HashMap class.
* public HashMap()
* public HashMap(int initialCapacity)
* public HashMap(int initialCapacity, float loadFactor)
* public HashMap(Map<? extends K, ? extends V> m)

```java
private static void constructHashMap() {
    Map<String, String> map1 = new HashMap<>();
    map1.put("A", "A"); // put example
    map1.put("B", "B");
    map1.put("C", "C");
    map1.put("D", null); // null value
    map1.put(null, "Z"); // null key
    System.out.println("Construct HashMap: " + map1);

    // initial capacity should be power of 2
    Map<String, String> map2 = new HashMap<>(32);

    // setting backing HashMap initial capacity and load factor
    Map<String, String> map3 = new HashMap<>(32, 0.80f);

    // creating HashMap from another Map
    Map<String, String> map4 = new HashMap<>(map1);
    System.out.println("Construct HashMap with another map: " + map4);
}
```
Output.
```sh
Construct HashMap: {null=Z, A=A, B=B, C=C, D=null}
Construct HashMap with another map: {null=Z, A=A, B=B, C=C, D=null}
```
### 4.2 Common Operations
* hashMap.put(key, value);
* hashMap.containsKey(key);
* hashMap.get(key);
* hashMap.remove(key);
* hashMap.keySet();
* hashMap.values();
* hashMap.entrySet();

Example.
```java
private static void commonOperations() {
    // Add key value pair to map
    Map<String, String> hashMap = new HashMap<>();
    hashMap.put("A", "A"); // put example
    hashMap.put("B", "B");
    hashMap.put("C", "C");
    hashMap.put("D", null); // null value
    hashMap.put(null, "Z"); // null key

    // Check key existence
    System.out.println("Check whether key 'A' exists: " + hashMap.containsKey("A"));
    System.out.println("Check whether key 'D' exists: " + hashMap.containsKey("D"));
    System.out.println("Check whether key 'M' exists: " + hashMap.containsKey("M"));
    System.out.println("Check whether key 'null' exist : " + hashMap.containsKey(null));

    // Get value with key
    System.out.println("Value for Key C = " + hashMap.get("C"));
    System.out.println("Value for Key null = " + hashMap.get(null));

    // Keys
    Set<String> keySet = hashMap.keySet();
    System.out.println("Map keys = " + keySet);

    // Values
    Collection<String> values = hashMap.values();
    System.out.println("Map values = " + values);

    // Entries
    Set<Map.Entry<String, String>> entrySet = hashMap.entrySet();
    System.out.println("Map entries = " + entrySet);

    // Remove
    hashMap.remove("B");
    System.out.println("Remove entry whose key is B : " + hashMap);
}
```
Output.
```sh
Check whether key 'A' exists: true
Check whether key 'D' exists: true
Check whether key 'M' exists: false
Check whether key 'null' exist : true
Value for Key C = C
Value for Key null = Z
Map keys = [null, A, B, C, D]
Map values = [Z, A, B, C, null]
Map entries = [null=Z, A=A, B=B, C=C, D=null]
Remove entry whose key is B : {null=Z, A=A, C=C, D=null}
```
### 4.3 Traversal
There are two ways to traverse a list.
* for each(Key)
* for each(Value)
* for each(Entry)
* iterator(Key)
* iterator(Value)
* iterator(Entry)

```java
private static void traverseHashMap() {
    Map<Integer, String> fruits = new HashMap<>();
    fruits.put(4, "Banana");
    fruits.put(9, "Apple");
    fruits.put(5, "Orange");
    fruits.put(2, "Mango");

    // for each key
    for (Integer key : fruits.keySet()) {
        System.out.println("Traverse Key(for each): processing - " + key);
    }

    System.out.println();

    // for each value
    for (String value : fruits.values()) {
        System.out.println("Traverse Value(for each): processing - " + value);
    }

    System.out.println();

    // for each entry(key, value)
    for (Map.Entry<Integer, String> entry : fruits.entrySet()) {
        System.out.println("Traverse Entry(for each): processing - " + entry);
    }

    System.out.println();

    // entry iterator
    Iterator<Integer> iterator1 = fruits.keySet().iterator();

    while (iterator1.hasNext()) {
        Integer fruit = iterator1.next();
        System.out.println("Traverse Key(iterator): processing - " + fruit);
    }

    System.out.println();

    // entry iterator
    Iterator<String> iterator2 = fruits.values().iterator();

    while (iterator2.hasNext()) {
        String fruit = iterator2.next();
        System.out.println("Traverse Value(iterator): processing - " + fruit);
    }

    System.out.println();

    // entry iterator
    Iterator<Map.Entry<Integer, String>> iterator3 = fruits.entrySet().iterator();

    while (iterator3.hasNext()) {
        Map.Entry<Integer, String> fruit = iterator3.next();
        System.out.println("Traverse Entry(iterator): processing - " + fruit);
    }
}
```
Output.
```sh
Traverse Key(for each): processing - 2
Traverse Key(for each): processing - 4
Traverse Key(for each): processing - 5
Traverse Key(for each): processing - 9

Traverse Value(for each): processing - Mango
Traverse Value(for each): processing - Banana
Traverse Value(for each): processing - Orange
Traverse Value(for each): processing - Apple

Traverse Entry(for each): processing - 2=Mango
Traverse Entry(for each): processing - 4=Banana
Traverse Entry(for each): processing - 5=Orange
Traverse Entry(for each): processing - 9=Apple

Traverse Key(iterator): processing - 2
Traverse Key(iterator): processing - 4
Traverse Key(iterator): processing - 5
Traverse Key(iterator): processing - 9

Traverse Value(iterator): processing - Mango
Traverse Value(iterator): processing - Banana
Traverse Value(iterator): processing - Orange
Traverse Value(iterator): processing - Apple

Traverse Entry(iterator): processing - 2=Mango
Traverse Entry(iterator): processing - 4=Banana
Traverse Entry(iterator): processing - 5=Orange
Traverse Entry(iterator): processing - 9=Apple
```
### 4.4 Remove Element
Below is the example showing the wrong way to remove element during traversal. We will get java.util.ConcurrentModificationException if we call `Map.remove()` inside the for loop.
```java
private static void wrongWayToRemoveElement() {
    Map<Integer, String> fruits = new HashMap<>();
    fruits.put(4, "Banana");
    fruits.put(9, "Apple");
    fruits.put(5, "Orange");
    fruits.put(2, "Mango");

    // in for each loop
    for (Integer key : fruits.keySet()) {
        System.out.println("Traverse HashMap(for each): processing - " + key);

        if (key == 5) {
            fruits.remove(5);  // java.util.ConcurrentModificationException is thrown
        }
    }

    // in iterator loop
    Iterator<Integer> iterator = fruits.keySet().iterator();

    while (iterator.hasNext()){
        Integer key = iterator.next();
        System.out.println("Traverse HashMap(iterator): processing - " + key);

        if (key == 5) {
            fruits.remove(5);  // java.util.ConcurrentModificationException is thrown
        }
    }

    System.out.println("fruits map after remove = " + fruits);
}
```
The correct way to remove element is to call `Iterator.remove()` method.
```java
private static void correctWayToRemoveElement() {
    Map<Integer, String> fruits = new HashMap<>();
    fruits.put(4, "Banana");
    fruits.put(9, "Apple");
    fruits.put(5, "Orange");
    fruits.put(2, "Mango");

    Iterator<Integer> iterator = fruits.keySet().iterator();

    while (iterator.hasNext()){
        Integer key = iterator.next();
        System.out.println("Remove element: processing - " + key + "=" + fruits.get(key));

        if (key == 5) {
            iterator.remove(); // iterator.remove not set.remove
        }
    }

    System.out.println("fruits map after remove = " + fruits);
}
```
Output.
```sh
Remove element: processing - 2=Mango
Remove element: processing - 4=Banana
Remove element: processing - 5=Orange
Remove element: processing - 9=Apple
fruits map after remove = {2=Mango, 4=Banana, 9=Apple}
```
## 5. TreeMap
* Interface: java.util.SortedMap
* Class: java.util.TreeMap

### 5.1 Constructor
There are three constructors in Java TreeMap class.
* public TreeMap()
* public TreeMap(Comparator<? super E> comparator)
* public TreeMap(Map<? extends K, ? extends V> m)

```java
private static void constructTreeMap() {
    SortedMap<String, String> treeMap1 = new TreeMap<>();
    treeMap1.put("A", "A"); // put example
    treeMap1.put("B", "B");
    treeMap1.put("C", "C");
    treeMap1.put("D", null); // null value
    //treeMap1.put(null, "Z"); // key can't be null
    System.out.println("Construct TreeMap: " + treeMap1);

    // Comparator
    SortedMap<String, String> treeMap2 = new TreeMap<>((a,b)->b.compareTo(a)); // reverse order
    treeMap2.put("A", "A");
    treeMap2.put("B", "B");
    treeMap2.put("C", "C");
    treeMap2.put("D", "D");
    System.out.println("Construct TreeMap with comparator: " + treeMap2);

    // with another map
    Map<String, String> map = new HashMap<>();
    map.put("B", "B");
    map.put("A", "A");
    map.put("D", "D");
    map.put("C", "C");

    SortedMap<String, String> treeMap3 = new TreeMap<>(map);
    System.out.println("Construct TreeMap with map: " + treeMap3);

    // creating TreeMap from another Map
    Map<String, String> treeMap4 = new TreeMap<>(treeMap2);
    System.out.println("Construct TreeMap with another treemap: " + treeMap4);
}
```
Output.
```sh
Construct TreeMap: {A=A, B=B, C=C, D=null}
Construct TreeMap with comparator: {D=D, C=C, B=B, A=A}
Construct TreeMap with map: {A=A, B=B, C=C, D=D}
Construct TreeMap with another treemap: {D=D, C=C, B=B, A=A}
```
### 5.2 Common Operations
* treeMap.put(key, value);
* treeMap.containsKey(key);
* treeMap.get(key);
* treeMap.remove(item);
* treeMap.keySet();
* treeMap.values();
* treeMap.entrySet();
* treeMap.firstEntry();
* treeMap.lastEntry();
* treeMap.lowerKey(item);
* treeMap.higherKey(item);
* treeMap.lowerEntry(item);
* treeMap.higherEntry(item);
* treeMap.floorEntry(item);
* treeMap.ceilingEntry(item);
* treeMap.pollFirstEntry();
* treeMap.pollLastEntry();
* treeMap.subMap(fromKey, fromInclusive, toKey, toInclusive);
* treeMap.headSet(toKey, inclusive);
* treeMap.tailSet(fromKey, inclusive);
* treeMap.descendingSet();

Example.
```java
private static void commonOperations() {
    // Add
    TreeMap<Integer, String> treeMap1 = new TreeMap<>();
    for (int i = 0; i < 10; i++) {
        treeMap1.put(i, i + "");
    }
    System.out.println("Common operations - add : " + treeMap1);

    // Check existence
    System.out.println("Check whether key 1 exists: " + treeMap1.containsKey(1));
    System.out.println("Check whether key 3 exists: " + treeMap1.containsKey(3));
    System.out.println("Check whether key 100 exists: " + treeMap1.containsKey(100));

    // Get value with key
    System.out.println("Value for Key 1 = " + treeMap1.get(1));
    System.out.println("Value for Key 100 = " + treeMap1.get(100));

    // Keys
    Set<Integer> keySet = treeMap1.keySet();
    System.out.println("Map keys = " + keySet);

    // Values
    Collection<String> values = treeMap1.values();
    System.out.println("Map values = " + values);

    // Entries
    Set<Map.Entry<Integer, String>> entrySet = treeMap1.entrySet();
    System.out.println("Map entries = " + entrySet);

    // lower and higher boundaries
    System.out.println("First entry is: " + treeMap1.firstEntry());
    System.out.println("Last entry is: " + treeMap1.lastEntry());
    System.out.println("Closest lower key than 4 is: "+ treeMap1.lowerKey(4));
    System.out.println("Closest higher key than 4 is: "+ treeMap1.higherKey(4));
    System.out.println("Closest lower entry than 5 is: " + treeMap1.lowerEntry(5));
    System.out.println("Closest higher entry than 5 is: " + treeMap1.higherEntry(5));
    System.out.println("Closest floor entry than 5 is: "+ treeMap1.floorEntry(5));
    System.out.println("Closest ceiling entry than 4 is: " + treeMap1.ceilingEntry(4));

    // poll first and last entries
    System.out.println("First entry(Polled) is: " + treeMap1.pollFirstEntry());
    System.out.println("Last entry(Polled) is: " + treeMap1.pollLastEntry());
    System.out.println("TreeMap after polling: " + treeMap1);

    // submap, headmap and tailmap
    Map<Integer, String> subMap = treeMap1.subMap(2, true, 6, true);
    System.out.println("Submap from 2 to 6 is: " + subMap);
    System.out.println("HeadMap to 5: " + treeMap1.headMap(5, true));
    System.out.println("TailMap from 5: " + treeMap1.tailMap(5, true));

    // reverse
    Map<Integer, String> descendingMap = treeMap1.descendingMap();
    System.out.println("Descending map: " + descendingMap);

    // remove
    treeMap1.remove(6);
    System.out.println("Remove element 6 : " + treeMap1);
}
```
Output.
```sh
Common operations - add : {0=0, 1=1, 2=2, 3=3, 4=4, 5=5, 6=6, 7=7, 8=8, 9=9}
Check whether key 1 exists: true
Check whether key 3 exists: true
Check whether key 100 exists: false
Value for Key 1 = 1
Value for Key 100 = null
Map keys = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
Map values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
Map entries = [0=0, 1=1, 2=2, 3=3, 4=4, 5=5, 6=6, 7=7, 8=8, 9=9]
First entry is: 0=0
Last entry is: 9=9
Closest lower key than 4 is: 3
Closest higher key than 4 is: 5
Closest lower entry than 5 is: 4=4
Closest higher entry than 5 is: 6=6
Closest floor entry than 5 is: 5=5
Closest ceiling entry than 4 is: 4=4
First entry(Polled) is: 0=0
Last entry(Polled) is: 9=9
TreeMap after polling: {1=1, 2=2, 3=3, 4=4, 5=5, 6=6, 7=7, 8=8}
Submap from 2 to 6 is: {2=2, 3=3, 4=4, 5=5, 6=6}
HeadMap to 5: {1=1, 2=2, 3=3, 4=4, 5=5}
TailMap from 5: {5=5, 6=6, 7=7, 8=8}
Descending map: {8=8, 7=7, 6=6, 5=5, 4=4, 3=3, 2=2, 1=1}
Remove element 6 : {1=1, 2=2, 3=3, 4=4, 5=5, 7=7, 8=8}
```
### 5.3 Traversal
There are two ways to traverse a list.
* for each(Key)
* for each(Value)
* for each(Entry)
* iterator(Key)
* iterator(Value)
* iterator(Entry)

```java
private static void traverseTreeMap() {
    SortedMap<Integer, String> fruits = new TreeMap<>();
    fruits.put(4, "Banana");
    fruits.put(9, "Apple");
    fruits.put(5, "Orange");
    fruits.put(2, "Mango");

    // for each key
    for (Integer key : fruits.keySet()) {
        System.out.println("Traverse Key(for each): processing - " + key);
    }

    System.out.println();

    // for each value
    for (String value : fruits.values()) {
        System.out.println("Traverse Value(for each): processing - " + value);
    }

    System.out.println();

    // for each entry(key, value)
    for (Map.Entry<Integer, String> entry : fruits.entrySet()) {
        System.out.println("Traverse Entry(for each): processing - " + entry);
    }

    System.out.println();

    // entry iterator
    Iterator<Integer> iterator1 = fruits.keySet().iterator();

    while (iterator1.hasNext()) {
        Integer fruit = iterator1.next();
        System.out.println("Traverse Key(iterator): processing - " + fruit);
    }

    System.out.println();

    // entry iterator
    Iterator<String> iterator2 = fruits.values().iterator();

    while (iterator2.hasNext()) {
        String fruit = iterator2.next();
        System.out.println("Traverse Value(iterator): processing - " + fruit);
    }

    System.out.println();

    // entry iterator
    Iterator<Map.Entry<Integer, String>> iterator3 = fruits.entrySet().iterator();

    while (iterator3.hasNext()) {
        Map.Entry<Integer, String> fruit = iterator3.next();
        System.out.println("Traverse Entry(iterator): processing - " + fruit);
    }
}
```
Output.
```sh
Traverse Key(for each): processing - 2
Traverse Key(for each): processing - 4
Traverse Key(for each): processing - 5
Traverse Key(for each): processing - 9

Traverse Value(for each): processing - Mango
Traverse Value(for each): processing - Banana
Traverse Value(for each): processing - Orange
Traverse Value(for each): processing - Apple

Traverse Entry(for each): processing - 2=Mango
Traverse Entry(for each): processing - 4=Banana
Traverse Entry(for each): processing - 5=Orange
Traverse Entry(for each): processing - 9=Apple

Traverse Key(iterator): processing - 2
Traverse Key(iterator): processing - 4
Traverse Key(iterator): processing - 5
Traverse Key(iterator): processing - 9

Traverse Value(iterator): processing - Mango
Traverse Value(iterator): processing - Banana
Traverse Value(iterator): processing - Orange
Traverse Value(iterator): processing - Apple

Traverse Entry(iterator): processing - 2=Mango
Traverse Entry(iterator): processing - 4=Banana
Traverse Entry(iterator): processing - 5=Orange
Traverse Entry(iterator): processing - 9=Apple
```
### 5.4 Remove Element
Below is the example showing the wrong way to remove element during traversal. We will get java.util.ConcurrentModificationException if we call `Map.remove()` inside the for loop.
```java
private static void wrongWayToRemoveElement() {
    SortedMap<Integer, String> fruits = new TreeMap<>();
    fruits.put(4, "Banana");
    fruits.put(9, "Apple");
    fruits.put(5, "Orange");
    fruits.put(2, "Mango");

    // in for each loop
    for (Integer key : fruits.keySet()) {
        System.out.println("Traverse TreeMap(for each): processing - " + key);

        if (key == 5) {
            fruits.remove(5);  // java.util.ConcurrentModificationException is thrown
        }
    }

    // in iterator loop
    Iterator<Integer> iterator = fruits.keySet().iterator();

    while (iterator.hasNext()){
        Integer key = iterator.next();
        System.out.println("Traverse TreeMap(iterator): processing - " + key);

        if (key == 5) {
            fruits.remove(5);  // java.util.ConcurrentModificationException is thrown
        }
    }

    System.out.println("fruits tree map after remove = " + fruits);
}
```
The correct way to remove element is to call `Iterator.remove()` method.
```java
private static void correctWayToRemoveElement() {
    SortedMap<Integer, String> fruits = new TreeMap<>();
    fruits.put(4, "Banana");
    fruits.put(9, "Apple");
    fruits.put(5, "Orange");
    fruits.put(2, "Mango");

    Iterator<Integer> iterator = fruits.keySet().iterator();

    while (iterator.hasNext()){
        Integer key = iterator.next();
        System.out.println("Remove element: processing - " + key + "=" + fruits.get(key));

        if (key == 5) {
            iterator.remove(); // iterator.remove not set.remove
        }
    }

    System.out.println("fruits tree map after remove = " + fruits);
}
```
Output.
```sh
Remove element: processing - 2=Mango
Remove element: processing - 4=Banana
Remove element: processing - 5=Orange
Remove element: processing - 9=Apple
fruits tree map after remove = {2=Mango, 4=Banana, 9=Apple}
```

## 6. References
* [Java Doc - Controlling Access to Members of a Class](https://docs.oracle.com/javase/tutorial/java/javaOO/accesscontrol.html)
* [Core Java Tutorial](https://www.journaldev.com/24601/java-11-features)
* [Java Data Types](https://www.w3schools.com/java/java_data_types.asp)
* [Primitive Wrapper Classes are Immutable in Java](https://www.geeksforgeeks.org/primitive-wrapper-classes-are-immutable-in-java/)
* [Collections in Java – Tutorial](https://www.journaldev.com/1260/collections-in-java-tutorial)
