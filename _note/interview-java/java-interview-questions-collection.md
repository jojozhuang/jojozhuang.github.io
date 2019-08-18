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

## 1. Collection Usage
### 1.1 ArrayList and LinkedList
Example of ArrayList.
```java
public static void main(String[] args) {
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
}
```
Example of LinkedList.
```java
public static void main(String[] args) {
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
}
```
The construction and usage are almost same. The difference is the performance(time complexity) for insertion, remove and random access, see section 2.

### 1.2 Stack, Queue and Deque
* Stack - LIFO
* Queue - FIFO
* Deque - Stack + Queue
* BlockingQueue - Capacity limit

```java
public static void main(String[] args) {
    // Stack
    Stack<Integer> stack = new Stack<>();
    stack.push(1);
    stack.push(2);
    stack.pop(); // 2

    // Queue
    Queue<Integer> queue = new LinkedList<>();
    queue.offer(1);
    queue.offer(2);
    queue.poll(); // 1

    // Deque
    Deque<Integer> deque = new LinkedList<>();
    //Deque<String> deque = new ArrayDeque<>();
    deque.add(1);        // [1]
    deque.addFirst(2);   // [2, 1]
    deque.addLast(3);    // [2, 1, 3]
    deque.peekFirst();   // 2
    deque.peekLast();    // 3
    deque.remove();      // [1, 3]
    deque.removeFirst(); // [3]
    deque.removeLast();  // []

    // Blocking queue
    BlockingQueue<String> bq = new ArrayBlockingQueue<>(2); // capacity
    bq.add("one");
    bq.add("two");
    bq.add("three"); // java.lang.IllegalStateException: Queue full

    BlockingQueue<String> bq2 = new ArrayBlockingQueue<>(2); // capacity
    bq2.offer("one");
    bq2.offer("two");
    bq2.offer("three"); // return false, no exception
}
```
### 1.3 Heap/PriorityQueue
Types of Heap
* Min Heap
* Max Heap

Time Complexity
* offer() - log(n)
* poll() - log(n)
* peek() - O(1)

Constructor.
```java
// String
PriorityQueue<String> pq = new PriorityQueue<>();                            // min heap
PriorityQueue<String> pq = new PriorityQueue<>(Comparator.reverseOrder());   // max heap

// Integer
PriorityQueue<Integer> pq = new PriorityQueue<>();                           // min heap
PriorityQueue<Integer> pq = new PriorityQueue<>(Comparator.reverseOrder());  // max heap
PriorityQueue<Integer> pq = new PriorityQueue<>((a,b)->b-a);                 // max heap
```
Usage of min heap.
```java
public static void testMinHeap() {
    Queue<String> pq = new PriorityQueue<>(); // min heap
    pq.offer("a");
    pq.offer("b");
    pq.offer("c");
    pq.peek();     // a
    pq.remove();   // return a, pq = [b, c]
    pq.peek();     // b
    pq.offer("d"); // [b, c, d]
    pq.offer("z"); // [b, c, d, z]

    pq.poll();     // b
    pq.poll();     // c
    pq.poll();     // d
    pq.poll();     // z
    // pq.remove(); NoSuchElementException
    pq.poll();     // null
}
```
Usage of max heap.
```java
public static void testMaxHeap() {
    Queue<String> pq = new PriorityQueue<>(Comparator.reverseOrder()); // max heap
    pq.offer("a");
    pq.offer("b");
    pq.offer("c");
    pq.peek();     // c
    pq.remove();   // return c, pq = [b, a]
    pq.peek();     // b
    pq.offer("d"); // [d, b, a]
    pq.offer("z"); // [z, d, b, a]

    pq.poll();     // z
    pq.poll();     // d
    pq.poll();     // b
    pq.poll();     // a
    // pq.remove(); NoSuchElementException
    pq.poll();     // null
}
```
The `order` of elements in heap is **not** guaranteed.
```java
public static void testOrder() {
    Queue<Integer> pq = new PriorityQueue<>(Comparator.reverseOrder());
    //PriorityQueue<Integer> pq = new PriorityQueue<>((a,b)->b-a);
    pq.offer(1);
    pq.offer(2);
    pq.offer(3);

    System.out.println(pq);        // [3, 1, 2]

    Iterator<Integer> iterator = pq.iterator();
    while (iterator.hasNext()) {
        System.out.println(iterator.next());
    }

    System.out.println(pq.poll()); // 3
    System.out.println(pq.poll()); // 2
    System.out.println(pq.poll()); // 1
}
```
Output.
```raw
[3, 1, 2]
3
1
2
3
2
1
```
* `poll` method guarantees that the minimum(maximum) element will be fetched each time.
* Iterator can’t guarantee the order.

### 1.4 Set and Map
Set.
```java
public static void testSet() {
    Set<Integer> set = new HashSet<>();
    set.add(null);      // null element
    set.add(1);
    set.add(2);         // [null, 1, 2]

    set.contains(1);    // true
    set.contains(3);    // false
    set.contains(null); // true

    set.remove(1);   // [null, 2]

    // for each
    for (Integer item : set) {
        System.out.println(item); // 2
    }
}
```
Map.
```java
public static void testMap() {
    Map<String, Integer> map = new HashMap<>();
    map.put("A", 1);
    map.put("B", 2);
    map.put("C", 3);
    map.put("D", null);      // null value
    map.put(null, 0);        // null key

    System.out.println(map); // {null=0, A=1, B=2, C=3, D=null}

    map.containsKey("A");    // true
    map.containsKey("D");    // true
    map.containsKey("E");    // false
    map.containsKey(null);   // true

    map.get("A");            // 1
    map.get("D");            // null
    map.get(null);           // 0
    map.get("E");            // null

    // Keys
    Set<String> keys = map.keySet(); // [null, A, B, C, D]

    // Values
    Collection<Integer> values = map.values(); // [0, 1, 2, 3, null]

    // Entries
    Set<Map.Entry<String, Integer>> entries = map.entrySet(); //[null=0, A=1, B=2, C=3, D=null]

    map.remove("A");   //  {null=0, B=2, C=3, D=null}
}
```
### 1.4 SortedSet and SortedMap
SortedSet interface + TreeSet class.
```java
SortedSet<Integer> treeSet = new TreeSet<>();                          // ascending order
SortedSet<Integer> treeSet = new TreeSet<>(Comparator.reverseOrder()); // descending order
```
Example of ascending order treeset.
```java
public static void testTreeSet() {
    TreeSet<Integer> treeSet = new TreeSet<>();
    for (int i = 0; i < 10; i++) {
        treeSet.add(i);
    }
    //treeSet.add(null);         // java.lang.NullPointerException
    treeSet.contains(2);         // true
    System.out.println(treeSet); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    treeSet.contains(2);         // true
    treeSet.contains(10);        // false
    treeSet.first();             // 0
    treeSet.last();              // 9
    treeSet.lower(4);            // 3
    treeSet.higher(4);           // 5
    treeSet.floor(5);            // 5
    treeSet.ceiling(4);          // 4
    treeSet.pollFirst();         // 0
    treeSet.pollLast();          // 9
    System.out.println(treeSet); // [1, 2, 3, 4, 5, 6, 7, 8]

    // submap, headmap and tailmap
    Set<Integer> subSet1 = treeSet.subSet(2, true, 6, true); // [2, 3, 4, 5, 6]
    Set<Integer> subSet2 = treeSet.headSet(5, true);         // [1, 2, 3, 4, 5]
    Set<Integer> subSet3 = treeSet.tailSet(5, true);         // [5, 6, 7, 8]

    // reverse
    Set<Integer> descendingSet = treeSet.descendingSet();    // [8, 7, 6, 5, 4, 3, 2, 1]
    // remove
    treeSet.remove(6); // [1, 2, 3, 4, 5, 7, 8]
}
```

SortedMap interface + TreeMap class.
```java
SortedMap<Integer, String> treeMap = new TreeMap<>();                           // ascending order
SortedMap<Integer, String> treeMap = new TreeMap<>(Comparator.reverseOrder());  // descending order
```
Example of ascending order treeset.
```java
public static void testSortedMap() {
    TreeMap<Integer, String> treeMap = new TreeMap<>();
    for (int i = 0; i < 10; i++) {
        treeMap.put(i, String.valueOf((char)('A' + i)));
    }
    //treeMap.put(null, null);       // key can't be null, java.lang.NullPointerException
    //treeMap.put(20, null);         // it's ok to have null for value
    System.out.println(treeMap);     // {0=A, 1=B, 2=C, 3=D, 4=E, 5=F, 6=G, 7=H, 8=I, 9=J}

    // Check existence
    treeMap.containsKey(1);   // true
    treeMap.containsKey(3);   // true
    treeMap.containsKey(100); // false

    // Get value with key
    treeMap.get(0);   // A
    treeMap.get(9);   // J
    treeMap.get(100); // null

    // Keys
    Set<Integer> keySet = treeMap.keySet();       // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

    // Values
    Collection<String> values = treeMap.values(); // [A, B, C, D, E, F, G, H, I, J]

    // Entries
    Set<Map.Entry<Integer, String>> entrySet = treeMap.entrySet(); // [0=A, 1=B, 2=C, 3=D, 4=E, 5=F, 6=G, 7=H, 8=I, 9=J]

    // lower and higher boundaries
    treeMap.firstEntry();         // 0=A
    treeMap.lastEntry();          // 9=J
    treeMap.lowerKey(4);          // 3
    treeMap.higherKey(4);         // 5
    treeMap.lowerEntry(5);        // 4=E
    treeMap.higherEntry(5);       // 6=G
    treeMap.floorEntry(5);        // 5=F
    treeMap.ceilingEntry(4);      // 4=E

    // poll first and last entries
    treeMap.pollFirstEntry();     // 0=A
    treeMap.pollLastEntry();      // 9=J
    System.out.println(treeMap);  // {1=B, 2=C, 3=D, 4=E, 5=F, 6=G, 7=H, 8=I}

    // submap, headmap and tailmap
    Map<Integer, String> subMap1 = treeMap.subMap(2, true, 6, true); // {2=C, 3=D, 4=E, 5=F, 6=G}
    Map<Integer, String> subMap2 = treeMap.headMap(5, true);         // {1=B, 2=C, 3=D, 4=E, 5=F}
    Map<Integer, String> subMap3 = treeMap.tailMap(5, true);         // {5=F, 6=G, 7=H, 8=I}

    // reverse
    Map<Integer, String> descendingMap = treeMap.descendingMap();    //{8=I, 7=H, 6=G, 5=F, 4=E, 3=D, 2=C, 1=B}

    // remove
    treeMap.remove(6); // {1=B, 2=C, 3=D, 4=E, 5=F, 7=H, 8=I}
}
```

## 2. Collection Comparison
### 2.1 ArrayList vs. LinkedList
The construction and usage of ArrayList and LinkedList are almost same. The difference is the performance(time complexity) for insertion, remove and random access.

Method                                | ArrayList | LinkedList
--------------------------------------|-----------|-------------
get(index)                            | O(1)      | O(n)
add(value) <sup>* append</sup>        | O(1)      | O(1)
add(index, value) <sup>* insert</sup> | O(n)      | O(1) if position is known
remove(index)                         | O(n)      | O(1) if position is known

* The insert and remove operations give good performance O(1) in LinkedList compared to ArrayList O(n). Hence if there is a requirement of frequent **addition** and **deletion** in application then **LinkedList** is a best choice.
* Random access(get method) is fast in Arraylist O(1) but not in LinkedList O(n). So if there are less add and remove operations and more **random access** operations requirement, **ArrayList** would be your best bet.

### 2.2 ArrayDeque vs. LinkedList
ArrayDeque is new with Java 6. If you need add/remove of the both ends, ArrayDeque is significantly better than a linked list. Random access each element is also O(1) for a cyclic queue.

The only better operation of a linked list is removing the current element during iteration.

### 2.3 Stack vs. Queue vs. Deque
* Stack - Last In First Out(LIFO)
* Queue - First In First Out(FIFO)
* Deque - Stack + Queue
* BlockingQueue - Capacity limit

### 2.4 Use Deque over Stack?
* Stack is concrete class, inherited from `Vector`. It has no interface.
* Stack is not implemented with LinkedList.
* Deque is interface. Deque exposes a set of operations which is all about being able to fetch/add/remove items from the start or end of a collection.

All available ways to create stack, queue and deque.
```java
// Stack
Stack<Integer> stack = new Stack<>();
Deque<Integer> stack2 = new ArrayDeque<>();
Deque<Integer> stack3 = new LinkedList<>();
// Queue
Queue<Integer> queue = new ArrayDeque<>();
Queue<Integer> queue2 = new LinkedList<>();
// Deque
Deque<Integer> deque = new ArrayDeque<>();
Deque<Integer> deque2 = new LinkedList<>();
```

### 2.5 Set vs. Map
* Both set and map can have null key or null value.
* Set has key only, map has pair of key and value.
* Set has contains() method, map has containsKey() and containsValue().
* Map has the get() method, set doesn't.

### 2.6 Set vs. TreeSet
* Elements in TreeSet are sorted, whereas elements in Set are not.
* Set can have null value, whereas TreeSet does **not** support `null` value.

### 2.7 Map vs. TreeMap
* Elements in TreeMap are sorted by **key**, whereas elements in Map are not sort.
* Map can have `null value`, TreeMap can also have null value, but it does **not** support `null key`.

### 2.8 HashMap vs. LinkedHashMap vs. TreeMap
All three classes implement the Map interface and offer mostly the same functionality. The most important difference is the order in which iteration through the entries will happen:
* `HashMap` makes no guarantees about the iteration order. It can (and will) even change completely when new elements are added.
* `TreeMap` will iterate according to the "natural ordering" of the keys according to their `compareTo()` method (or an externally supplied `Comparator`). Additionally, it implements the SortedMap interface, which contains methods that depend on this sort order.
* `LinkedHashMap` will iterate in the order in which the entries were put into the map.

### 2.9 HashTable vs. HashMap vs. ConcurrentHashMap
`Hashtable` is the generic name for hash-based maps. In the context of the Java API, HashTable is an obsolete class from the days of Java 1.1 before the collections framework existed. It should not be used anymore, because its API is cluttered with obsolete methods that duplicate functionality, and its methods are synchronized (which can decrease performance and is generally useless). Use `ConcurrentHashMap` instead of Hashtable. `HashMap` is not thread safe.

### 2.10 TreeMap, HashMap, LinkedHashMap, Hashtable, WeakHashMap
* HashMap is implemented as a hash table, and there is no ordering on keys or values.
* TreeMap is implemented based on red-black tree structure, and it is ordered by the key.
* LinkedHashMap preserves the insertion order.
* Hashtable is synchronized, in contrast to HashMap.

LinkedHashMap = DoublyLinkedList + HashMap
```java
HashMap<key, DoublyListNode>
DoublyListNode {
    prev, next, key, value;
}
```

For thread-unsafe hashmap, infinite loop may occur during rehashing. One thread is setting node1.next to node2. Meanwhile, another thread is setting node2.next = node1. Cycle exists in the node list.

## 2.11 HashMap vs. WeakHashMap
* Strong vs Weak References: `Weak Reference` Objects are not the default type/class of Reference Object and they should be explicitly specified while using them. This type of reference is used in WeakHashMap to reference the entry objects.
`Strong References`: This is the default type/class of Reference Object. Any object which has an active strong reference are not eligible for garbage collection. In HashMap, key objects have strong reference.
* Role of `Garbage Collector`: In HashMap , entry object(entry object stores key-value pairs) is not eligible for garbage collection i.e Hashmap is dominant over Garbage Collector. In WeakHashmap, when a key is discarded then its entry is automatically removed from the map, in other words, it is garbage collected.
* Clone method Implementation: HashMap implements `Cloneable` interface. WeakHashMap does not implement Cloneable interface , it only implements Map interface. Hence , there is no clone() method in the WeakHashMap class.

### 2.12 Summary

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
Stack      | Yes      | No            | No       | Yes                | Yes          | Yes
CopyOnWriteArrayList  | Yes | Yes     | No       | Yes                | Yes          | Yes
ConcurrentHashMap     | No  | Yes     | Yes      | No                 | Yes          | Yes
CopyOnWriteArraySet   | No  | No      | No       | No                 | Yes          | Yes

</div>

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

## 4. Source Files
* [Source files for Java Collection on GitHub](https://github.com/jojozhuang/java-programming/tree/master/java-summary-collection)

## 5. References
* [Java Interview Questions](https://www.tutorialspoint.com/java/java_interview_questions.htm)
* [Java Interview Questions](https://www.journaldev.com/java-interview-questions)
* [300 Core Java Interview Questions](https://www.javatpoint.com/corejava-interview-questions)
* [Comparable and Comparator in Java Example](https://www.journaldev.com/780/comparable-and-comparator-in-java-example)
* [Collision Resolution](http://www.cs.cmu.edu/~ab/15-121N11/lectures/lecture16.pdf)
