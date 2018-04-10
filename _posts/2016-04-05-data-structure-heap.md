---
layout: post
key: blog
title: "Data Structure - Heap"
date: 2016-04-05
tags: [MaxHeap, MinHeap]
---

> Implement generic Max Heap and Min Heap with array.

## 1. Heap
A heap is a binary tree with these characteristics:
* It’s complete. This means it’s completely filled in, reading from left to right across each row, although the last row need not be full.
* It’s (usually) implemented as an array. Binary trees can be stored in arrays, rather than using references to connect the nodes.
* Each node in a heap satisfies the `heap condition`, which states that every node’s key is larger/smaller than the keys of its children.
![image](/public/posts/2016-04-05/heap.png){:width="800px"}  

Heap can be implemented with array. A heap is a complete binary tree implies that there are no “holes” in the
array used to represent it.
![image](/public/posts/2016-04-05/heaparray.png){:width="800px"}  

## 2. Binary Max Heap
A max-heap is a complete binary tree where each node is larger than its children. The root, therefore, is the maximum element in the heap.
## 2.1 Insertion
Insertion means add new element to the heap. Initially, the new element is placed in the first open position at the end of the array. Insertion increases the array size by one. Here are the steps for adding the new element to max heap:
1. Add new element to bottom, rightmost  
2. Bubble up this new element, swap with its parent until it is smaller than its parent.  
![image](/public/posts/2016-04-05/heapinsert.png){:width="800px"}  

## 2.2 Removal
Removal means removing the node with the maximum key. This node is always the root. Removing decreases the array size by one. Here are the steps for removing the maximum node:
1. Remove the top element.  
2. Move the last element(bottom, rightmost) to top.  
3. Bubble down this new top element. Each level, select smaller child and swap until to the bottom.  
![image](/public/posts/2016-04-05/heapremove.png){:width="800px"}  
* 1->a), 2->b), 3->c),d),e)

## 2.3 Efficiency of Heap Operations
A heap is a special kind of binary tree, the number of levels `L` in a binary tree equals log2(N+1), where N is the number of nodes. The `bubble up` and `bubble down` routines cycle through their loops L-1 times, so the first takes time proportional to log2N, and the second somewhat more because of the extra comparison. Thus, the heap operations we’ve talked about here all operate in `O(logN)` time.

## 2.4 Elements Sequence
If you remove a node and then insert the same node, the result is `not` necessarily the restoration of the original heap. A given set of nodes can be arranged in `many` valid heaps, depending on the `order` in which nodes are inserted.

## 2.5 Index Relationships
For a node at index x in the array,
* Its parent is (x-1) / 2.
* Its left child is 2*x + 1.
* Its right child is 2*x + 2.

## 2.6 Implementing MaxHeap
```java
public class MaxHeap<T extends Comparable<T>> {
    private static final int DEFAULT_CAPACITY = 10;
    protected T[] array;
    protected int size;

    /**
     * Constructs a new MaxHeap.
     */
    @SuppressWarnings("unchecked")
    public MaxHeap () {
        // Java doesn't allow construction of arrays of placeholder data types
        array = (T[])new Comparable[DEFAULT_CAPACITY];
        size = 0;
    }

    /**
     * Adds a value to the max-heap.
     */
    public void add(T value) {
        // grow array if needed
        if (size >= array.length - 1) {
            array = this.resize();
        }

        // place element into heap at bottom
        int index = size;
        array[index] = value;
        size++;

        bubbleUp();
    }

    /**
     * Returns true if the heap has no elements; false otherwise.
     */
    public boolean isEmpty() {
        return size == 0;
    }

    /**
     * Returns heap size.
     */
    public int size() {
        return size;
    }

    /**
     * Returns (but does not remove) the maximum element in the heap.
     */
    public T peek() {
        if (this.isEmpty()) {
            throw new IllegalStateException();
        }

        return array[0]; // root
    }

    /**
     * Removes and returns the maximum element in the heap.
     */
    public T remove() {
            // get the root, which is the maximum value
            T result = peek();

            // get rid of the last leaf/decrement
            array[0] = array[size - 1];
            array[size - 1] = null;
            size--;

            bubbleDown();

            return result;
    }

    /**
     * Performs the "bubble down" operation to place the element that is at the
     * root of the heap in its correct place so that the heap maintains the
     * max-heap order property.
     */
    protected void bubbleDown() {
        int index = 0; // root

        // bubble down
        while (hasLeftChild(index)) {
            // which child is bigger?
            int biggerChild = leftIndex(index);

            // bubble with the smaller child, if it exists
            if (hasRightChild(index)
                && array[leftIndex(index)].compareTo(array[rightIndex(index)]) < 0) {
                biggerChild = rightIndex(index);
            }

            if (array[index].compareTo(array[biggerChild]) > 0) {
                break;
            } else {
                swap(index, biggerChild);
                // make sure to update loop counter/index of where last el is put
                index = biggerChild;
            }
        }
    }

    /**
     * Performs the "bubble up" operation to place a newly inserted element
     * (i.e. the element that is at the size index) in its correct place so
     * that the heap maintains the max-heap order property.
     */
    protected void bubbleUp() {
        int index = this.size - 1;  // last/right most

        while (hasParent(index)
                && (parent(index).compareTo(array[index]) < 0)) {
            // parent/child are out of order; swap them
            swap(index, parentIndex(index));
            index = parentIndex(index);
        }
    }

    protected boolean hasParent(int i) {
        return i > 0;
    }

    protected int leftIndex(int i) {
        return i * 2 + 1;
    }

    protected int rightIndex(int i) {
        return i * 2 + 2;
    }

    protected boolean hasLeftChild(int i) {
        return leftIndex(i) <= size - 1;
    }

    protected boolean hasRightChild(int i) {
        return rightIndex(i) <= size - 1;
    }

    protected T parent(int i) {
        return array[parentIndex(i)];
    }

    protected int parentIndex(int i) {
        return (i - 1) / 2;
    }

    protected T[] resize() {
        return Arrays.copyOf(array, array.length * 2);
    }

    protected void swap(int index1, int index2) {
        T tmp = array[index1];
        array[index1] = array[index2];
        array[index2] = tmp;
    }
}
```

## 3. Binary Min Heap
A min-heap is a complete binary tree where each node is smaller than its children. The root, therefore, is the minimum element in the heap.

## 3.1 Implementing MinHeap
```java
public class MinHeap<T extends Comparable<T>> {
    private static final int DEFAULT_CAPACITY = 10;
    protected T[] array;
    protected int size;

    /**
     * Constructs a new MinHeap.
     */
    @SuppressWarnings("unchecked")
    public MinHeap () {
        // Java doesn't allow construction of arrays of placeholder data types
        array = (T[])new Comparable[DEFAULT_CAPACITY];
        size = 0;
    }

    /**
     * Adds a value to the min-heap.
     */
    public void add(T value) {
        // grow array if needed
        if (size >= array.length - 1) {
            array = this.resize();
        }

        // place element into heap at bottom
        int index = size;
        array[index] = value;
        size++;

        bubbleUp();
    }

    /**
     * Returns true if the heap has no elements; false otherwise.
     */
    public boolean isEmpty() {
        return size == 0;
    }

    /**
     * Returns heap size.
     */
    public int size() {
        return size;
    }

    /**
     * Returns (but does not remove) the minimum element in the heap.
     */
    public T peek() {
        if (this.isEmpty()) {
            throw new IllegalStateException();
        }

        return array[0]; // root
    }

    /**
     * Removes and returns the minimum element in the heap.
     */
    public T remove() {
            // get the root, which is the minimum value
            T result = peek();

            // get rid of the last leaf/decrement
            array[0] = array[size - 1];
            array[size - 1] = null;
            size--;

            bubbleDown();

            return result;
    }

    /**
     * Performs the "bubble down" operation to place the element that is at the
     * root of the heap in its correct place so that the heap maintains the
     * min-heap order property.
     */
    protected void bubbleDown() {
        int index = 0; // root

        // bubble down
        while (hasLeftChild(index)) {
            // which child is smaller?
            int smallerChild = leftIndex(index);

            // bubble with the smaller child, if it exists
            if (hasRightChild(index)
                && array[leftIndex(index)].compareTo(array[rightIndex(index)]) > 0) {
                smallerChild = rightIndex(index);
            }

            if (array[index].compareTo(array[smallerChild]) < 0) {
                break;
            } else {
                swap(index, smallerChild);
                // make sure to update loop counter/index of where last el is put
                index = smallerChild;
            }
        }
    }

    /**
     * Performs the "bubble up" operation to place a newly inserted element
     * (i.e. the element that is at the size index) in its correct place so
     * that the heap maintains the min-heap order property.
     */
    protected void bubbleUp() {
        int index = this.size - 1;  // last/right most

        while (hasParent(index)
                && (parent(index).compareTo(array[index]) > 0)) {
            // parent/child are out of order; swap them
            swap(index, parentIndex(index));
            index = parentIndex(index);
        }
    }

    protected boolean hasParent(int i) {
        return i > 0;
    }

    protected int leftIndex(int i) {
        return i * 2 + 1;
    }

    protected int rightIndex(int i) {
        return i * 2 + 2;
    }

    protected boolean hasLeftChild(int i) {
        return leftIndex(i) <= size - 1;
    }

    protected boolean hasRightChild(int i) {
        return rightIndex(i) <= size - 1;
    }

    protected T parent(int i) {
        return array[parentIndex(i)];
    }

    protected int parentIndex(int i) {
        return (i - 1) / 2;
    }

    protected T[] resize() {
        return Arrays.copyOf(array, array.length * 2);
    }

    protected void swap(int index1, int index2) {
        T tmp = array[index1];
        array[index1] = array[index2];
        array[index2] = tmp;
    }
}
```

## 4. Reference
* [Heap Data Structures](https://www.tutorialspoint.com/data_structures_algorithms/heap_data_structure.htm)
* [Binary Min-Heap Implementation](https://courses.cs.washington.edu/courses/cse373/11wi/homework/5/BinaryHeap.java)
