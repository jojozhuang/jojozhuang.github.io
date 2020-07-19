---
layout: tutorial
key: programming
title: "Java Core - Map"
index: 2315
subcategory: java-core
date: 2017-01-08
tags: [Map, HashMap, TreeMap]
---

> Map, HashMap and TreeMap.

## 1. HashMap
* Interface: java.util.Map
* Class: java.util.HashMap

### 1.1 Constructor
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
```raw
Construct HashMap: {null=Z, A=A, B=B, C=C, D=null}
Construct HashMap with another map: {null=Z, A=A, B=B, C=C, D=null}
```
### 1.2 Common Operations
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
```raw
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
### 1.3 Traversal
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
```raw
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
### 1.4 Remove Element
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
```raw
Remove element: processing - 2=Mango
Remove element: processing - 4=Banana
Remove element: processing - 5=Orange
Remove element: processing - 9=Apple
fruits map after remove = {2=Mango, 4=Banana, 9=Apple}
```

## 2. TreeMap
* Interface: java.util.SortedMap
* Class: java.util.TreeMap

### 2.1 Constructor
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
```raw
Construct TreeMap: {A=A, B=B, C=C, D=null}
Construct TreeMap with comparator: {D=D, C=C, B=B, A=A}
Construct TreeMap with map: {A=A, B=B, C=C, D=D}
Construct TreeMap with another treemap: {D=D, C=C, B=B, A=A}
```
### 2.2 Common Operations
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

    // lower(n)   smaller than the given element
    // floor(n)   smaller than or equal to the given element
    // ceiling(n) larger than or equal to the given element
    // higher(n)  larger than the given element

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
```raw
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
### 2.3 Traversal
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
```raw
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
### 2.4 Remove Element
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
```raw
Remove element: processing - 2=Mango
Remove element: processing - 4=Banana
Remove element: processing - 5=Orange
Remove element: processing - 9=Apple
fruits tree map after remove = {2=Mango, 4=Banana, 9=Apple}
```

## 3. Source Files
* [Source files for Java Map on GitHub](https://github.com/jojozhuang/java-programming/tree/master/java-core-map)

## 4. References
* [Java Doc - Controlling Access to Members of a Class](https://docs.oracle.com/javase/tutorial/java/javaOO/accesscontrol.html)
* [Core Java Tutorial](https://www.journaldev.com/24601/java-11-features)
* [Java Data Types](https://www.w3schools.com/java/java_data_types.asp)
* [Primitive Wrapper Classes are Immutable in Java](https://www.geeksforgeeks.org/primitive-wrapper-classes-are-immutable-in-java/)
* [Collections in Java – Tutorial](https://www.journaldev.com/1260/collections-in-java-tutorial)
