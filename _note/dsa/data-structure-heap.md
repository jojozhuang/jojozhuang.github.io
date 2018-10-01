---
layout: note
key: note
title: "Data Structure - Heap"
index: 310
category: dsa
image: note/dsa.png
date: 2016-03-10
postdate: 2016-03-10
tags: [Heap]
mathjax: true
---

> Introduce the definition, implementation and usage of heap.

## 1. Heap
### 1.1 Definition of Heap
A heap is a binary tree with these characteristics:
* It’s complete. This means it’s completely filled in, reading from left to right across each row, although the last row need not be full.
* It’s (usually) implemented as an array. Binary trees can be stored in arrays, rather than using references to connect the nodes.
* Each node in a heap satisfies the `heap condition`, which states that every node’s key is larger/smaller than the keys of its children.

![image](/public/notes/data-structure-heap/complete.png){:width="800px"}  
### 1.2 Data Structure of Heap
Heap can be implemented with array. A heap is a complete binary tree implies that there are no “holes” in the
array used to represent it.
![image](/public/notes/data-structure-heap/heaparray.png){:width="800px"}  
### 1.3 Types of Heap
* Max Heap - The root is the maximum element in the heap.
* Min Heap - The root is the minimum element in the heap.

### 1.4 Common Operations on Heap
* Insertion - $O(\log{}n)$
* Removal - $O(\log{}n)$
* Get - $O(1)$

### 2.3 Efficiency of Heap Operations
A heap is a special kind of binary tree, the number of levels `L` in a binary tree equals $\log_{2}(N+1)$, where N is the number of nodes. The `bubble up` and `bubble down` routines cycle through their loops L-1 times, so the first takes time proportional to $\log_{2}N$, and the second somewhat more because of the extra comparison. Thus, the heap operations we’ve talked about here all operate in $O(\log{}N)$ time.

### 2.4 Elements Sequence
If you remove a node and then insert the same node, the result is `not` necessarily the restoration of the original heap. A given set of nodes can be arranged in `many` valid heaps, depending on the `order` in which nodes are inserted.

### 2.5 Index Relationships
For a node at index `i` in the array,
* Its parent is (i - 1) / 2.
* Its left child is 2 * i + 1.
* Its right child is 2 * i + 2.

## 2. Max Heap
A max-heap is a complete binary tree where each node is larger than its children. The root, therefore, is the maximum element in the heap.
### 2.1 Insertion
Insertion means add new element to the heap. Initially, the new element is placed in the first open position at the end of the array. Insertion increases the array size by one. Here are the steps for adding the new element to max heap:
* 1) Add new node to bottom, rightmost.
* 2) Compare the value of this node with its parent. If value of parent is less than child, then swap them.
* 3) Repeat step 2) to bubble up this new node to maintain the heap condition if possible; otherwise, stop.

![image](/public/notes/data-structure-heap/heapinsert.png)

### 2.2 Removal
Removal means removing the node with the maximum key. This node is always the root. Removing decreases the array size by one. Here are the steps for removing the maximum node:
* 1) Remove the root node.
* 2) Move the last element(bottom, rightmost) to root.  
* 3) Compare the value of this child with its parent. If value of parent is less than child, then swap them.
* 4) Repeat step 3) to bubble down this node to maintain the heap condition if possible; otherwise, stop.  

![image](/public/notes/data-structure-heap/heapremove.png)

### 2.3 Implementing MaxHeap
The following code is the implementation of max heap with type integer.
```java
public class MaxHeap {
    private int capacity = 10;
    protected Integer[] array;
    protected int size;

    public MaxHeap () {
        array = new Integer[capacity];
        size = 0;
    }

    public MaxHeap (int capacity) {
        this.capacity = capacity;
        array = new Integer[capacity];
        size = 0;
    }

    // add new element into heap
    public void add(int value) {
        if (size >= array.length - 1) {
            array = this.resize();
        }

        // place element into heap at bottom (right most)
        array[size] = value;
        size++;

        bubbleUp();
    }

    // bubble up the last node with it's parent until they are in the order of max heap
    protected void bubbleUp() {
        int index = this.size - 1;  // last node (right most)

        while (hasParent(index) && (parent(index) < array[index])) {
            // parent and child are out of order; swap them
            swap(index, parentIndex(index));
            index = parentIndex(index);
        }
    }


    // remove and return the maximum element in the heap
    public int remove() {
        if (this.isEmpty()) {
            throw new IllegalStateException();
        }
        // get the root, which is the maximum value
        int result = peek();

        // move the last leaf to root
        array[0] = array[size - 1];
        array[size - 1] = null;
        size--;

        bubbleDown();

        return result;
    }

    // bubble down the new root to proper position to maintain the order of max heap
    protected void bubbleDown() {
        // root
        int index = 0;

        // heap is complete tree, so it's safe to check left child first
        while (hasLeftChild(index)) {
            int biggerChild = leftIndex(index);

            // find the smaller child
            if (hasRightChild(index)
                && array[leftIndex(index)] < (array[rightIndex(index)])) {
                biggerChild = rightIndex(index);
            }

            if (array[index] > array[biggerChild]) {
                break;
            } else {
                // parent and child are out of order; swap them
                swap(index, biggerChild);
                index = biggerChild;
            }
        }
    }

    // get the root without removing it from heap
    public int peek() {
        if (this.isEmpty()) {
            throw new IllegalStateException();
        }

        return array[0];
    }

    public boolean isEmpty() {
        return size == 0;
    }

    public int size() {
        return size;
    }

    protected boolean hasParent(int i) {
        return i > 0;
    }

    protected int leftIndex(int i) {
        return 2 * i + 1;
    }

    protected int rightIndex(int i) {
        return 2 * i + 2;
    }

    protected boolean hasLeftChild(int i) {
        return leftIndex(i) <= size - 1;
    }

    protected boolean hasRightChild(int i) {
        return rightIndex(i) <= size - 1;
    }

    protected int parent(int i) {
        return array[parentIndex(i)];
    }

    protected int parentIndex(int i) {
        return (i - 1) / 2;
    }

    protected Integer[] resize() {
        return Arrays.copyOf(array, array.length * 2);
    }

    protected void swap(int index1, int index2) {
        int tmp = array[index1];
        array[index1] = array[index2];
        array[index2] = tmp;
    }
}
```

## 3. Min Heap
A min-heap is a complete binary tree where each node is smaller than its children. The root, therefore, is the minimum element in the heap.

### 3.1 Implementing MinHeap
The following code is the implementation of max heap with type integer. The only difference with max heap is the comparison.
```java
public class MinHeap {
    private int capacity = 10;
    protected Integer[] array;
    protected int size;

    public MinHeap () {
        array = new Integer[capacity];
        size = 0;
    }

    public MinHeap (int capacity) {
        this.capacity = capacity;
        array = new Integer[capacity];
        size = 0;
    }

    // add new element into heap
    public void add(int value) {
        if (size >= array.length - 1) {
            array = this.resize();
        }

        // place element into heap at bottom (right most)
        array[size] = value;
        size++;

        bubbleUp();
    }

    // bubble up the last node with it's parent until they are in the order of max heap
    protected void bubbleUp() {
        int index = this.size - 1;  // last node (right most)

        while (hasParent(index) && (parent(index) > array[index])) {
            // parent and child are out of order; swap them
            swap(index, parentIndex(index));
            index = parentIndex(index);
        }
    }


    // remove and return the maximum element in the heap
    public int remove() {
        if (this.isEmpty()) {
            throw new IllegalStateException();
        }
        // get the root, which is the maximum value
        int result = peek();

        // move the last leaf to root
        array[0] = array[size - 1];
        array[size - 1] = null;
        size--;

        bubbleDown();

        return result;
    }

    // bubble down the new root to proper position to maintain the order of max heap
    protected void bubbleDown() {
        // root
        int index = 0;

        // heap is complete tree, so it's safe to check left child first
        while (hasLeftChild(index)) {
            int biggerChild = leftIndex(index);

            // find the smaller child
            if (hasRightChild(index)
                && array[leftIndex(index)] > (array[rightIndex(index)])) {
                biggerChild = rightIndex(index);
            }

            if (array[index] < array[biggerChild]) {
                break;
            } else {
                // parent and child are out of order; swap them
                swap(index, biggerChild);
                index = biggerChild;
            }
        }
    }

    // get the root without removing it from heap
    public int peek() {
        if (this.isEmpty()) {
            throw new IllegalStateException();
        }

        return array[0];
    }

    public boolean isEmpty() {
        return size == 0;
    }

    public int size() {
        return size;
    }

    protected boolean hasParent(int i) {
        return i > 0;
    }

    protected int leftIndex(int i) {
        return 2 * i + 1;
    }

    protected int rightIndex(int i) {
        return 2 * i + 2;
    }

    protected boolean hasLeftChild(int i) {
        return leftIndex(i) <= size - 1;
    }

    protected boolean hasRightChild(int i) {
        return rightIndex(i) <= size - 1;
    }

    protected int parent(int i) {
        return array[parentIndex(i)];
    }

    protected int parentIndex(int i) {
        return (i - 1) / 2;
    }

    protected Integer[] resize() {
        return Arrays.copyOf(array, array.length * 2);
    }

    protected void swap(int index1, int index2) {
        int tmp = array[index1];
        array[index1] = array[index2];
        array[index2] = tmp;
    }
}
```

## 4. Source Files
* [Source files for Heap on GitHub](https://github.com/jojozhuang/DataStructure/tree/master/Heap)
* [Heap Diagrams(draw.io) in Google Drive](https://drive.google.com/file/d/1EQJpMtw2ZLlUKU-nlrUlqLz6HqgJ2mRU/view?usp=sharing)

## 5. Reference
* [Heap Data Structures](https://www.tutorialspoint.com/data_structures_algorithms/heap_data_structure.htm)
* [Binary Min-Heap Implementation](https://courses.cs.washington.edu/courses/cse373/11wi/homework/5/BinaryHeap.java)
