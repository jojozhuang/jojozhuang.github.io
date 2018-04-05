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

P140/801

## References
* [Sample code used for this book](http://www.informit.com/store/data-structures-and-algorithms-in-java-9780672324536)
