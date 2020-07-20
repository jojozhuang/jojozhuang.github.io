---
layout: tutorial
key: programming
title: "Java Core - Stack, Queue and Deque"
index: 2313
subcategory: java-core
date: 2017-01-09
tags: [Queue, Stack, Queue, Heap]
---

> Queue, Stack, Queue and Heap.

## 1. Stack
There are two ways to create 'stack' in Java.
* `Stack` Class
* `Deque` Interface and `LinkedList` Class

### 1.1 Stack Class
Java Stack extends `Vector` class with the following five operations only.
* boolean empty(): Tests if this stack is empty.
* E peek(): Looks at the object at the top of this stack without removing it from the stack.
* E pop() : Removes the object at the top of this stack and returns that object as the value of this function.
* E push(E item) : Pushes an item onto the top of this stack.
* int search(Object o) : Returns the 1-based position where an object is on this stack.

Example:
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
Output:
```raw
stack : []
Empty stack : true
stack : [11, 12, 13, 14]
Pop Operation : 14
After Pop Operation : [11, 12, 13]
search() Operation : 2
stack : false
```
### 1.2 Deque Interface and LinkedList Class
Deque interface supports adding and removing elements from both ends of the queue. If we only use the push and pop methods, it behaves just like a stack.
```java
public static void main(String a[]){
    Deque<Integer> stack = new LinkedList<>();
    System.out.println("stack : "  + stack); // []
    System.out.println("Empty stack : "  + stack.isEmpty()); // true
    // Exception in thread "main" java.util.NoSuchElementException
    System.out.println("Empty stack : Pop Operation : "  + stack.pop());
    stack.push(11);
    stack.push(12);
    stack.push(13);
    stack.push(14);
    System.out.println("stack : "  + stack); // [11,12,13,14]
    System.out.println("Pop Operation : "  + stack.pop()); // 14
    System.out.println("After Pop Operation : "  + stack); // [11,12,13]
    System.out.println("stack : "  + stack.isEmpty()); // false
}
```
Output:
```raw
stack : []
Empty stack : true
stack : [14, 13, 12, 11]
Pop Operation : 14
After Pop Operation : [13, 12, 11]
stack : false
```
## 2. Queue
### 2.1 Java Queue Categories
`Bounded Queues` are queues which are bounded by `capacity` that means we need to provide the max size of the queue at the time of creation. For example ArrayBlockingQueue.
* Bounded Queues
* Unbounded Queues

All Queues which implement `BlockingQueue` interface are BlockingQueues and rest are Non-Blocking Queues.
* Blocking Queues
* Non-Blocking Queues

OPERATION | THROWS EXCEPTION | SPECIAL VALUE | BLOCKS | TIMES OUT
----------|------------------|---------------|--------|---------------------
Insert    | add(e)           | offer(e)      | put(e) | offer(e, time, unit)
Remove    | remove()         | poll()        | take() | poll(time, unit)
Examine   | element()        | peek()        | N/A    | N/A

### 2.2 Constructing Queue
```java
private static void constructQueue() {
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
```raw
[one, two, three, four]
[one, two, four]
Queue Size: 3
Queue Contains element 'two' or not? : true
[one, two, three, four, five]
[one, two, three, four, five]
```
### 2.3 Common Operations
Java Queue supports all operations supported by Collection interface and some more operations. It supports almost all operations in two forms.
* One set of operations throws an exception if the operation fails.
* The other set of operations returns a special value if the operation fails.

The following table explains all Queue common operations briefly.

OPERATION | THROWS EXCEPTION | SPECIAL VALUE(null)
----------|------------------|---------------
Insert    | add(e)           | offer(e)
Remove    | remove()         | poll()
Examine   | element()        | peek()

**add vs. offer**
```java
// insert
private static void insert() {
    System.out.println("Queue - insert");
    // add method
    Queue<String> queue = new LinkedList<>();
    System.out.println(queue.add("one"));   // true
    System.out.println(queue.add("two"));   // true
    System.out.println(queue);              // [one, two]
    System.out.println(queue.add("three")); // true
    System.out.println(queue);              // [one, two, three]

    // offer method
    Queue<String> queue2 = new LinkedList<>();
    System.out.println(queue2.offer("one"));   // true
    System.out.println(queue2.offer("two"));   // true
    System.out.println(queue2);                // [one, two]
    System.out.println(queue2.offer("three")); // true
    System.out.println(queue2);                // [one, two, three]
}
```
Output.
```raw
Queue - insert
true
true
[one, two]
true
[one, two, three]
true
true
[one, two]
true
[one, two, three]
```
* No difference for unbounded queue.

**remove vs. poll**
```java
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
```
Output.
```raw
Queue - delete
[one, two]
one
two
[one, two]
one
two
null
```
* If no elements in the queue, remove() method causes **NoSuchElementException**. But, poll() method returns **null** without exception.

**element vs. peek**
```java
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
```raw
Queue - examine
one
[one]
one
[one]
null
```
* If no elements in the queue, element() method causes **NoSuchElementException**. But, peek() method returns **null** without exception.

### 2.4 BlockingQueue
**add vs offer**
```java
public static void main(String[] args) {
    System.out.println("Test BlockingQueue");
    // add
    BlockingQueue<String> queue = new ArrayBlockingQueue<>(2);
    System.out.println(queue.add("one"));   // true
    System.out.println(queue.add("two"));   // true
    System.out.println(queue);              // [one, two]
    //System.out.println(queue.add("three")); // java.lang.IllegalStateException: Queue full
    System.out.println(queue);              // [one, two]

    // offer
    BlockingQueue<String> queue2 = new ArrayBlockingQueue<>(2);
    System.out.println(queue2.offer("one"));   // true
    System.out.println(queue2.offer("two"));   // true
    System.out.println(queue2);                // [one, two]
    System.out.println(queue2.offer("three")); // false
    System.out.println(queue2);                // [one, two]
}
```
Output.
```raw
Test BlockingQueue
true
true
[one, two]
[one, two]
true
true
[one, two]
false
[one, two]
```
* You can specify the capacity when constructing BlockingQueue.
* If size of the BlockingQueue reaches to the capacity, no new element can be added.
* add() method causes **IllegalStateException**, whereas offer() method returns **false**.

## 3. Deque
The Java Deque interface, java.util.Deque, represents a `double ended queue`, meaning a queue where you can add and remove elements from both ends of the queue. The name Deque is an abbreviation of **Double Ended Queue**.
### 3.1 Common Operations
Constructing:
```java
Deque<String> deque = new LinkedList<>();
Deque<String> deque = new ArrayDeque<>();
```
Add Element to Deque
* add()
* addLast()
* addFirst()

Peek at Element in Deque
* peekFirst()
* peekLast()

Remove Element From Deque
* remove()
* removeFirst()
* removeLast()

### 3.2 Example
```java
public static void main(String[] args) {
    Deque<Integer> deque = new LinkedList<>();
   //Deque<Integer> deque = new ArrayDeque<>();

    // add
    deque.add(1); // add last
    deque.add(2);
    deque.add(3);
    deque.add(4);
    System.out.println(deque); // [1, 2, 3, 4]

    deque.addLast(5);
    System.out.println(deque); // [1, 2, 3, 4, 5]
    deque.addFirst(6);
    System.out.println(deque); // [6, 1, 2, 3, 4, 5]

    // peek
    System.out.println(deque.peekFirst()); // 6
    System.out.println(deque.peekLast());  // 5

    // remove
    deque.remove(); // remove first
    System.out.println(deque); // [1, 2, 3, 4, 5]
    deque.removeFirst();
    System.out.println(deque); // [2, 3, 4, 5]
    deque.removeLast();
    System.out.println(deque); // [2, 3, 4]
}
```
Output.
```raw
[1, 2, 3, 4]
[1, 2, 3, 4, 5]
[6, 1, 2, 3, 4, 5]
6
5
[1, 2, 3, 4, 5]
[2, 3, 4, 5]
[2, 3, 4]
```

## 4. Heap/PriorityQueue
### 4.1 Constructing Heap
In Java, we can use java.util.PriorityQueue to create `min heap` or `max heap`.
```java
// String
PriorityQueue<String> pq = new PriorityQueue<>();                            // min heap
PriorityQueue<String> pq = new PriorityQueue<>(Comparator.reverseOrder());   // max heap

// Integer
PriorityQueue<Integer> pq = new PriorityQueue<>();                           // min heap
PriorityQueue<Integer> pq = new PriorityQueue<>(Comparator.reverseOrder());  // max heap
PriorityQueue<Integer> pq = new PriorityQueue<>((a,b)->b-a);                 // max heap
```
### 4.2 Common Operations
* add(e): Insert an element into the priority queue.
* offer(e): Insert an element into the priority queue.
* remove(): Remove the top element from the queue, if it is present; otherwise, raise `NoSuchElementException`.
* poll(): Retrieve and remove the top element of the queue, or returns `null` if queue is empty.
* peek(): Retrieve the top element of the queue, or returns null if queue is empty.
* size(): Return the number of elements present in the queue.

### 4.3 Example
Min heap.
```java
public static void testMinHeap(){
    System.out.println("Testing min heap:");
    // create a min heap
    Queue<String> pq = new PriorityQueue<>();
    pq.add("a");
    pq.add("b");
    pq.add("c");
    System.out.println("size:" + pq.size()); // 3
    System.out.println(pq.peek());           // a
    System.out.println(pq.remove());         // a
    System.out.println(pq.peek());           // b

    System.out.println(pq);                  // [b, c]

    pq.offer("d");
    pq.offer("z");
    System.out.println("size:" + pq.size());   // 4
    System.out.println(pq);                    // [b, c, d, z]

    System.out.println(pq.poll());   // b
    System.out.println(pq.poll());   // c
    System.out.println(pq.poll());   // d
    System.out.println(pq.poll());   // g
    //System.out.println(pq.remove()); // NoSuchElementException
    System.out.println(pq.poll());   // null
}
```
Output.
```raw
Testing min heap:
size:3
a
a
b
[b, c]
size:4
[b, c, d, z]
b
c
d
z
null
```
Max heap.
```java
public static void testMaxHeap(){
    System.out.println("Testing max heap:");
    // create a max heap
    Queue<String> pq = new PriorityQueue<>(Comparator.reverseOrder());
    pq.add("a");
    pq.add("b");
    pq.add("c");
    System.out.println("size:" + pq.size()); // 3
    System.out.println(pq.peek());           // c
    System.out.println(pq.remove());         // c
    System.out.println(pq.peek());           // b

    System.out.println(pq);                  // [b, a]

    pq.offer("d");
    pq.offer("z");
    System.out.println("size:" + pq.size());   // 4
    System.out.println(pq);                    // [z, d, b, a]

    System.out.println(pq.poll());   // z
    System.out.println(pq.poll());   // d
    System.out.println(pq.poll());   // b
    System.out.println(pq.poll());   // a
    //System.out.println(pq.remove()); // NoSuchElementException
    System.out.println(pq.poll());   // null
}
```
Output.
```raw
Testing max heap:
size:3
c
c
b
[b, a]
size:4
[z, d, b, a]
z
d
b
a
null
```
### 4.4 Order of Elements
The order of elements in heap is not guaranteed.
```java
public static void testOrder() {
    System.out.println("Testing order of heap:");
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
Testing order of heap:
[3, 1, 2]
3
1
2
3
2
1
```
* `poll` method guarantees that the minimum(maximum) element will be fetched each time.
* Iterator can't guarantee the order.

## 5. Source Files
* [Source files for Java Queue and Stack on GitHub](https://github.com/jojozhuang/java-programming/tree/master/java-core-queuestack)

## 6. References
* [Collections in Java – Tutorial](https://www.journaldev.com/1260/collections-in-java-tutorial)
* [Java Deque](http://tutorials.jenkov.com/java-collections/deque.html)
