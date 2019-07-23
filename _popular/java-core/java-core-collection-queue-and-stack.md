---
layout: tutorial
key: popular
title: "Java Core - Collection - Queue & Stack"
index: 1417
subcategory: java-core
date: 2017-01-09
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

## 2. Queue
### 2.1 Constructor
```java
private static void constructList() {
    Queue<String> queue = new LinkedList<>();
    queue.add("one");
    queue.add("two");
    queue.add("three");
    queue.add("four");
    System.out.println(queue);

    queue.remove("three");
    System.out.println(queue);
    System.out.println("Queue Size: " + queue.size());
    System.out.println("Queue Contains element 'two' or not? : " + queue.contains("two"));

    // To empty the queue
    queue.clear();

    //Array to Queue
    String[] nums = {"one","two","three","four","five"};
    Queue<String> queue2 = new LinkedList<>();
    Collections.addAll(queue2, nums);
    System.out.println(queue2);

    // Queue to Array
    String strArray[] = queue2.toArray(new String[queue2.size()]);
    System.out.println(Arrays.toString(strArray));
}
```
Output.
```sh
[one, two, three, four]
[one, two, four]
Queue Size: 3
Queue Contains element 'two' or not? : true
[one, two, three, four, five]
[one, two, three, four, five]
```
### 2.2 Common Operations
Java Queue supports all operations supported by Collection interface and some more operations. It supports almost all operations in two forms.
* One set of operations throws an exception if the operation fails.
* The other set of operations returns a special value if the operation fails.

The following table explains all Queue common operations briefly.

OPERATION | THROWS EXCEPTION | SPECIAL VALUE
----------|------------------|---------------
Insert    | add(e)           | offer(e)
Remove    | remove()         | poll()
Examine   | element()        | peek()

```java
// insert
private static void insert() {
    System.out.println("Queue - insert");
    // add
    BlockingQueue<String> queue = new ArrayBlockingQueue<>(2);
    System.out.println(queue.add("one"));   // true
    System.out.println(queue.add("two"));   // true
    System.out.println(queue);              // [one, two]
    //System.out.println(queue.add("three")); // java.lang.IllegalStateException: Queue full
    System.out.println(queue);

    // offer
    BlockingQueue<String> queue2 = new ArrayBlockingQueue<>(2);
    System.out.println(queue2.offer("one"));   // true
    System.out.println(queue2.offer("two"));   // true
    System.out.println(queue2);                   // [one, two]
    System.out.println(queue2.offer("three")); // false
    System.out.println(queue2);                   // [one, two]
}

// delete
private static void delete() {
    System.out.println("Queue - delete");
    // remove
    Queue<String> queue = new LinkedList<>();
    queue.offer("one");
    queue.offer("two");
    System.out.println(queue);           // [one, two]
    System.out.println(queue.remove());  // one
    System.out.println(queue.remove());  // two
    //System.out.println(queue.remove()); // java.util.NoSuchElementException

    // poll
    Queue<String> queue2 = new LinkedList<>();
    queue2.offer("one");
    queue2.offer("two");
    System.out.println(queue2);         // [one, two]
    System.out.println(queue2.poll());  // one
    System.out.println(queue2.poll());  // two
    System.out.println(queue2.poll());  // return null
}

// examine
private static void examine() {
    System.out.println("Queue - examine");
    // element
    Queue<String> queue = new LinkedList<>();
    queue.add("one");

    System.out.println(queue.element());  // one
    System.out.println(queue);            // [one]
    queue.clear();
    //System.out.println(queue.element()); // java.util.NoSuchElementException

    // peek
    Queue<String> queue2 = new LinkedList<>();
    queue2.add("one");

    System.out.println(queue2.peek());  // one
    System.out.println(queue2);         // [one]
    queue2.clear();
    System.out.println(queue2.peek());  // return null
}
```
Output.
```sh
Queue - insert
true
true
[one, two]
[one, two]
true
true
[one, two]
false
[one, two]
Queue - delete
[one, two]
one
two
[one, two]
one
two
null
Queue - examine
one
[one]
one
[one]
null
```
### 2.3 Java Queue Categories
`Bounded Queues` are queues which are bounded by capacity that means we need to provide the max size of the queue at the time of creation. For example ArrayBlockingQueue (see previous example).
* Bounded Queues
* Unbounded Queues

All Queues which implement `BlockingQueue` interface are BlockingQueues and rest are Non-Blocking Queues.
* Blocking Queues
* Non-Blocking Queues

OPERATION | THROWS EXCEPTION | SPECIAL VALUE |BLOCKS  | TIMES OUT
----------|------------------|---------------|--------|---------------------
Insert    | add(e)           | offer(e)      | put(e) | offer(e, time, unit)
Remove    | remove()         | poll()        | take() | poll(time, unit)
Examine   | element()        | peek()        | N/A    | N/A

## 3. Stack
Java Stack extends Vector class with the following five operations only.
* boolean empty(): Tests if this stack is empty.
* E peek(): Looks at the object at the top of this stack without removing it from the stack.
* E pop() : Removes the object at the top of this stack and returns that object as the value of this function.
* E push(E item) : Pushes an item onto the top of this stack.
* int search(Object o) : Returns the 1-based position where an object is on this stack.

```java
public static void main(String a[]){
    Stack<Integer> stack = new Stack<>();
    System.out.println("stack : "  + stack); // []
    System.out.println("Empty stack : "  + stack.isEmpty()); // true
    // Exception in thread "main" java.util.EmptyStackException
    // System.out.println("Empty stack : Pop Operation : "  + stack.pop());
    stack.push(11);
    stack.push(12);
    stack.push(13);
    stack.push(14);
    System.out.println("stack : "  + stack); // [11,12,13,14]
    System.out.println("Pop Operation : "  + stack.pop()); // 14
    System.out.println("After Pop Operation : "  + stack); // [11,12,13]
    System.out.println("search() Operation : "  + stack.search(12)); // 2
    System.out.println("stack : "  + stack.isEmpty()); // false
}
```
Output.

```sh
stack : []
Empty stack : true
stack : [11, 12, 13, 14]
Pop Operation : 14
After Pop Operation : [11, 12, 13]
search() Operation : 2
stack : false
```

## 5. Heap
Interface: java.util.Queue
Class: java.util.PriorityQueue
```java
Queue<Long> small = new PriorityQueue<Long>(),
```

## 9. References
* [Java Doc - Controlling Access to Members of a Class](https://docs.oracle.com/javase/tutorial/java/javaOO/accesscontrol.html)
* [Core Java Tutorial](https://www.journaldev.com/24601/java-11-features)
* [Java Data Types](https://www.w3schools.com/java/java_data_types.asp)
* [Primitive Wrapper Classes are Immutable in Java](https://www.geeksforgeeks.org/primitive-wrapper-classes-are-immutable-in-java/)
* [Collections in Java – Tutorial](https://www.journaldev.com/1260/collections-in-java-tutorial)
