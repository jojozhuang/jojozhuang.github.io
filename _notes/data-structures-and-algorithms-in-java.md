---
layout: note
key: note
title: "Data Structures and Algorithms in Java"
index: 102
category: basic
---

> Book: Data Structures and Algorithms in Java  
Author: Robert Lafore
![image](/public/notes/data-structures-and-algorithms-in-java/cover.jpg){:width="300px"}  

## 1. Overview
Characteristics of Data Structures

Data Structure | Advantages | Disadvantages
---------------|--------------------------------------|--
Array          | Quick insertion, very fast access if index known. | Slow search, slow deletion, fixed size.
Ordered array  | Quicker search than unsorted array. | Slow insertion and deletion, fixed size.
Stack          | Provides last-in, first-out access. | Slow access to other items.
Queue          | Provides first-in, first-out access.| Slow access to other items.
Linked list    | Quick insertion, quick deletion.    | Slow search.
Binary tree    | Quick search, insertion, deletion (if tree remains balanced). |  Deletion algorithm is complex.
Red-black tree | Quick search, insertion, deletion. Tree always balanced. | Complex.
2-3-4 tree     | Quick search, insertion, deletion. Tree always balanced. Similar trees good for disk storage. | Complex.
Hash table     | Very fast access if key known. Fast insertion. | Slow deletion, access slow if key not known, inefficient memory usage.
Heap           | Fast insertion, deletion, access to largest item. | Slow access to other items.
Graph          | Models real-world situations. | Some algorithms are slow and complex.

Primitive Variable Types in Java

Name    | Size in Bits | Range of Values
--------|--------------|-------------------
boolean | 1            | true or false
byte    | 8            | –128 to +127
char    | 16           | ‘\u0000’ to ‘\uFFFF’
short   | 16           | –32,768 to +32,767
int     | 32           | –2,147,483,648 to +2,147,483,647
long    | 64           | –9,223,372,036,854,775,808 to +9,223,372,036,854,775,807  
float   | 32           | Approximately 10^–38 to 10^+38; 7 significant digits  
double  | 64           | Approximately 10^–308 to 10^+308; 15 significant digits

## 2. Arrays
These three operations—insertion, searching, and deletion—will be the fundamental ones in most of the data storage structures we’ll study in this book.
Linear search and Binary search.
Running Times in Big O Notation

Algorithm                    | Running Time in Big O Notation
-----------------------------|--------------------------------
Linear search                | O(N)
Binary search                | O(log N)
Insertion in unordered array | O(1)
Insertion in ordered array   | O(N)
Deletion in unordered array  | O(N)
Deletion in ordered array    | O(N)

## 3. Simple Sorting
* Efficiency of the Bubble Sort: (N–1) + (N–2) + (N–3) + ... + 1 = N*(N–1)/2
* Efficiency of the Selection Sort: N*(N–1)/2, less swap than bubble sort.
* Efficiency of the Insertion Sort: 1 + 2 + 3 + ... + N-1 = N*(N-1)/2, N*(N-1)/4, runs twice as fast as the bubble sort and faster than the selection sort, O(N) if sorted, N*(N-1)/2 if in reversed order.

Comparing the Simple Sorts
There’s probably no point in using the bubble sort, unless you don’t have your algorithm book handy. The bubble sort is so simple that you can write it from memory. Even so, it’s practical only if the amount of data is small.

The selection sort minimizes the number of swaps, but the number of comparisons is still high. This sort might be useful when the amount of data is small and swapping data items is very time-consuming compared with comparing them.

The insertion sort is the most versatile of the three and is the best bet in most situations, assuming the amount of data is small or the data is almost sorted. For larger amounts of data, quicksort is generally considered the fastest approach.

Insertion Sort > Selection Sort > Bubble Sort

## 4. Stacks and Queues
### Stacks
A stack is said to be a Last-In-First-Out (LIFO) storage mechanism because the last item inserted is the first one to be removed.  
Methods of stack: push, pop, peek, isEmpty(), isFull()  
Efficiency of Stacks: Items can be both pushed and popped from the stack in constant O(1) time.
### Queues
In computer science a queue is a data structure that is some- what like a stack, except that in a queue the first item inserted is the first to be removed (First-In-First-Out, FIFO), while in a stack, as we’ve seen, the last item inserted is the first to be removed (LIFO).
Methods of queue: insert, remove, peekFront, isEmpty(), isFull()
Efficiency of Queues: As with a stack, items can be inserted and removed from a queue in O(1) time.
### Deques
A deque is a double-ended queue. You can insert items at either end and delete them from either end.
### Priority Queues
A priority queue has a front and a rear, and items are removed from the front. In a priority queue, items are ordered by key value so that the item with the lowest key (or in some implementations the highest key) is always at the front. Items are inserted in the proper position to maintain the order.
Methods of priority queue: insert, remove, peekMin, isEmpty(), isFull()
Efficiency of Priority Queues: In the priority-queue, insertion runs in O(N) time(array), while deletion takes O(1) time.

## 5. Linked Lists
### Simple Linked List
List Node.
```java
class Link
{
    public inventoryItem iI; // object holding data
    public Link next; // reference to next link
}
```
LinkList
```java
class LinkList
{
    private Link first; // ref to first link on list
    public void LinkList() // constructor
    {
        first = null; // no items on list yet
    }
    public boolean isEmpty() // true if list is empty
    {
        return (first==null);
    }
    // ... other methods
}
```
### Double-Ended Lists
Double-Ended List has one additional feature: a reference to the last link as well as to the first.
```java
class FirstLastList
{
    private Link first; // ref to first link
    private Link last;  // ref to last link
    public void FirstLastList() // constructor
    {
        first = null; // no items on list yet
        last = null;
    }
    public boolean isEmpty() // true if list is empty
    {
        return (first==null);
    }
    // ... other methods
}
```
### Linked-List Efficiency
Search: O(N), N/2
Insertion and Deletion: O(1)
### Abstract Data Types
What is ADT? Roughly speaking, it’s a way of looking at a data structure: focusing on what it does and ignoring how it does its job. Stacks and queues are examples of ADTs. An ADT specification is often called an `interface`.
### Sorted Lists
### Efficiency of Sorted Linked Lists
* Search: O(N), N/2, Min=O(1)
* Insertion and Deletion: O(1)
If an application frequently accesses the minimum item, and fast insertion isn’t critical, then a sorted linked list is an effective choice. A `priority queue` might be implemented by a sorted linked list.

### Doubly Linked Lists
Node.
```java
class Link {
    public long dData;    // data item
    public Link next;     // next link in list
    public Link previous; // previous link in list
}
```
List.
```java
class DoublyLinkedList
{
    private Link first; // ref to first item
    private Link last; // ref to last item
    public DoublyLinkedList() // constructor
    {
        first = null; // no items on list yet
        last = null;
    }
    public boolean isEmpty() // true if no links
    {
        return (first==null);
    }
    public void insertFirst(long dd){...}              // insert at front of list
    public void insertLast(long dd){...}               // insert at end of list
    public Link deleteFirst(){...}                     // delete first link
    public Link deleteLast(){...}                      // delete last link
    public boolean insertAfter(long key, long dd){...} // insert dd just after key
    public Link deleteKey(long key){...}               // delete item with given key
}
```
### Doubly Linked List as Basis for Deques
A doubly linked list can be used as the basis for a `deque`. In a deque you can insert and delete at either end, and the doubly linked list provides this capability.
### Iterators
An `iterator` can be used to traverse through a list, performing some operation on selected links (or all links).
```java
class ListIterator() {
    private Link current;     // reference to current link
    private Link previous;    // reference to previous link
    private LinkList ourList; // reference to “parent” list

    public void reset()               // set to start of list
    {
        current = ourList.getFirst(); // current -> first
        previous = null;              // previous -> null
    }
    public void nextLink()      // go to next link
    {
        previous = current;     // set previous to this
        current = current.next; // set this to next
    }
    ...
}
```
Iterator Methods:
* reset()—Sets the iterator to the start of the list
* nextLink()—Moves the iterator to the next link
* getCurrent()—Returns the link at the iterator
* atEnd()—Returns true if the iterator is at the end of the list
* insertAfter()—Inserts a new link after the iterator
* insertBefore()—Inserts a new link before the iterator
* deleteCurrent()—Deletes the link at the iterator

## 6. Recursion
### Triangular Numbers
Triangular Numbers: 1, 3, 6, 10, 15, 21, ...  
```java
int triangle(int n) {
    if(n==1) {
        return 1;
    }
    else {
        return n + triangle(n-1);
    }
}
```
input 1000, output 500500.  
Formula: n(n+1)/2  
### Characteristics of Recursive Methods
key features common to all recursive routines:
* It calls itself.
* When it calls itself, it does so to solve a smaller problem.
* There’s some version of the problem that is simple enough that the routine can solve it, and return, without calling itself.
### Is Recursion Efficient?
Recursion is usually used because it simplifies a problem conceptually, not because it’s inherently more efficient.
### Factorials
```java
int factorial(int n) {
    if(n==0) {
        return 1;
    }
    else {
        return n * factorial(n-1);
    }
}
```
### Anagrams
### A Recursive Binary Search
Convert loop to recursion. The recursive binary search has the same big O efficiency as the non-recursive version: O(logN). It is somewhat more elegant, but may be slightly slower.
### Divide-and-Conquer Algorithms
### The Towers of Hanoi
### The Recursive Algorithm
The solution to the Towers of Hanoi puzzle can be expressed recursively using the notion of subtrees. Suppose you want to move all the disks from a source tower (call it S) to a destination tower (call it D). You have an intermediate tower available (call it I). Assume there are n disks on tower S. Here’s the algorithm:
1. Move the subtree consisting of the top n-1 disks from S to I.
2. Move the remaining (largest) disk from S to D.
3. Move the subtree from I to D.

```java
static int nDisks = 3; // initial disks
public static void main(String[] args) {
    doTowers(nDisks, 'A', 'B', 'C');
}
// suppose we have only three tower A(Source), B(Intermediate) and C(Destination)
public static void doTowers(int topN, char from, char inter, char to) {
    if(topN==1) {
        System.out.println("Disk 1 from " + from + " to "+ to);
    }
    else {
        doTowers(topN-1, from, to, inter); // from-->inter
        System.out.println("Disk " + topN + " from " + from + " to "+ to); // move largest from -> to
        doTowers(topN-1, inter, from, to); // inter-->to
    }
}
```
Output:
```sh
Disk 1 from A to C
Disk 2 from A to B
Disk 1 from C to B
Disk 3 from A to C
Disk 1 from B to A
Disk 2 from B to C
Disk 1 from A to C
```
### mergesort
### Eliminating Recursion
Often an algorithm is easy to conceptualize as a recursive method, but in practice the recursive approach proves to be inefficient. In such cases, it’s useful to transform the recursive approach into a non-recursive approach. Such a transformation can often make use of a `stack`.
```java
public static void main(String[] args) {
    int recursion = triangle(5);
    System.out.println(recursion);
    int stack = triangleStatck(5);
    System.out.println(stack);
}

static int triangle(int n) {
    if(n==1) {
        return 1;
    }
    else {
        return n + triangle(n-1);
    }
}

static int triangleStatck(int n) { // calculate triangle number with explicit stack.
    if (n == 1) {
        return 1;
    }
    Stack<Integer> stack = new Stack<Integer>();
    while (n > 0) {
        stack.push(n);
        n--;
    }
    int res = 0;
    while (!stack.isEmpty()) {
        res += stack.pop();
    }
    return res;
}
```
### Some Interesting Recursive Applications
[Todo]
* raising a number to a power
* fitting items into a knapsack
* choosing members of a mountain-climbing team

## 7. Advanced Sorting
### Shellsort
It’s based on the insertion sort, but adds a new feature that dramatically improves the insertion sort’s performance.
### N-Sorting
The combination of the 4-sort and the 1-sort is much faster than simply applying the ordinary insertion sort without the preliminary 4-sort.
### Diminishing Gaps
interval sequence or gap sequence

[Todo]P342/801
## 8. Binary Tree
Each node in a binary tree has a maximum of two children.
### Why Use Binary Trees?
* Slow Insertion in an Ordered Array
* Slow Searching in a Linked List

### Tree Terminology
![image](/public/notes/data-structures-and-algorithms-in-java/treeterminology.png){:width="800px"}  
### Binary Trees
binary search tree, unbalanced tree

### Representing the Tree in Java Code
The Node class.
```java
class Node {
    int iData;          // data used as key value
    double fData;       // other data
    Node leftChild;     // this node’s left child
    Node rightChild;    // this node’s right child
    public void displayNode() {
        ...
    }
}
```
The Tree Class.
```java
class Tree {
    private Node root;  // the only data field in Tree
    public void find(int key)
    {
    }
    public void insert(int id, double dd)
    {
    }
    public void delete(int id)
    {
    }
    // various other methods
} // end class Tree
```
### Tree Efficiency
Find node in binary search tree: O(logN).
### Traversing the Tree
preorder, inorder, and postorder.
### Deleting a Node
1. The node to be deleted is a leaf (has no children).
2. The node to be deleted has one child.
3. The node to be deleted has two children.

### Trees Represented as Arrays
![image](/public/notes/data-structures-and-algorithms-in-java/treeinarray.png){:width="800px"}  
Suppose a node’s index number is index.
* left child: 2*index + 1
* right child: 2*index + 2
* parent: (index-1) / 2

### The Huffman Code
Rule: No code can be the prefix of any other code.
## 9. Red-Black Trees
[Todo]
## 10. 2-3-4 Trees and External Storage
[Todo]
## 11. Hash Tables
### Introduction to Hashing
`Hash function` hashes (converts) a number in a large range into a number in a smaller range. This smaller range corresponds to the index numbers in an array. An array into which data is inserted using a hash function is called a `hash table`.
### Collisions
Approach to solve collision:
* open addressing: move to an empty cell. clustering may happen.
* separate chaining: store values in linked list instead of themselves.

### Open Addressing
Three methods:
* linear probing: x+1, x+2, x+3, ...
* quadratic probing: x+1, x+4, x+9, x+16, x+25, ...  // Square of the Step Number
* double hashing: stepSize = constant - (key % constant), eg. stepSize = 5 - (key % 5);

### Separate Chaining
Install a linked list at each index in the hash table. A data item’s key is hashed to the index in the usual way, and the item is inserted into the linked list at that index. Other items that hash to the same index are simply added to the linked list.

Load Factors: the ratio of the number of items in a hash table to its size. The Load Factor is a measure that when rehashing should be done. Rehashing is a process of increasing the capacity.

### Hash Functions
* Quick Computation
* Random Keys
* Non-Random Keys
* Use a Prime Number for the Modulo Base
* Hashing Strings
* Folding

### Hashing Efficiency
Open Addressing Versus Separate Chaining  
If open addressing is to be used, double hashing seems to be the preferred system by a small margin over quadratic probing. The exception is the situation in which plenty of memory is available and the data won’t expand after the table is created; in this case linear probing is somewhat simpler to implement and, if load factors below 0.5 are used, causes little performance penalty.
If the number of items that will be inserted in a hash table isn’t known when the table is created, separate chaining is preferable to open addressing. Increasing the load factor causes major performance penalties in open addressing, but performance degrades only linearly in separate chaining.
When in doubt, use separate chaining. Its drawback is the need for a linked list class, but the payoff is that adding more data than you anticipated won’t cause performance to slow to a crawl.

## 12. Heap

P605/801

## References
* [Sample code used for this book](http://www.informit.com/store/data-structures-and-algorithms-in-java-9780672324536)
* [Additional Source Codes](https://github.com/jojozhuang/Note/tree/master/DSAInJava)
