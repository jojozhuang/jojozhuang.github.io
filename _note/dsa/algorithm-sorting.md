---
layout: note
key: note
title: "Algorithm - Sorting"
index: 321
category: dsa
image: note/dsa.png
date: 2016-03-21
postdate: 2016-03-21
tags: [Sorting]
mathjax: true
---

> Most popular sorting algorithms.

## 1. Common Sorting Algorithms

 Name           | Average       | Best Case     | Worst Case    | Space Complexity | Stable
----------------|---------------|---------------|---------------|------------------|--------
 Bubble Sort    | $O(n^2)$      | $O(n)$        | $O(n^2)$      | $O(1)$           | Yes
 Insertion Sort | $O(n^2)$      | $O(n)$        | $O(n^2)$      | $O(1)$           | Yes
 Shell Sort     | Depends       | $O(n\log{}n)$ | Depends       | $O(1)$           | No
 Selection Sort | $O(n^2)$      | $O(n^2)$      | $O(n^2)$      | $O(1)$           | No
 Heap Sort      | $O(n\log{}n)$ | $O(n\log{}n)$ | $O(n\log{}n)$ | $O(1)$           | No
 Merge Sort     | $O(n\log{}n)$ | $O(n\log{}n)$ | $O(n\log{}n)$ | $O(n)$           | Yes
 Quick Sort     | $O(n\log{}n)$ | $O(n\log{}n)$ | $O(n^2)$      | $O(\log{}n)$     | No
 Bucket Sort    | --            | $O(n+r)$      | $O(n+r)$      | $O(n+r)$         | Yes
 Counting Sort  | --            | $O(n+r)$      | $O(n+r)$      | $O(n+r)$         | Yes
 Radix Sort     | --            | $O(nk/d)$     | $O(nk/d)$     | $O(n+2^d)$       | Yes

## 2. Bubble Sort
### 2.1 How It Works?
Take the last element, compare it with the previous one, swap if it is smaller/larger. By doing this repetitively, bubble up the smallest/largest to the front.
### 2.2 Implementation
```java
public void bubbleSort(int[] nums) {
    if (nums == null || nums.length < 2) {
        return;
    }

    for(int i = 0; i < nums.length; i++) {
        for (int j = nums.length - 1; j > i; j--) {
            if (nums[j] < nums[j - 1]) {
                int temp = nums[j];
                nums[j] = nums[j - 1];
                nums[j - 1] = temp;
            }
        }
    }
}
```
### 2.3 Complexity
* Space: $O(1)$
* Time: Average $O(n^2)$, Worst Case $O(n^2)$

## 3. Insertion Sort
### 3.1 How It Works?
Start from the second element, each time take the element and compare with the previous one. Swap the two elements if the latter one is smaller/larger than the previous one. By doing this repetitively, insert the current element to the proper position of given array.
![image](/public/notes/common-sorting-algorithms/insertionsort.png)  
### 2.2 Implementation
```java
public void insertionSort(int[] nums) {
    if (nums == null || nums.length < 2) {
        return;
    }

    for (int i = 1; i < nums.length; i++) {
        int key = nums[i];
        int j = i;
        while (j > 0 && nums[j - 1] > key) {
            nums[j] = nums[j - 1];
            j--;
        }
        nums[j] = key;
    }
}
```
### 3.3 Complexity
* Space: $O(1)$
* Time: Average $O(n^2)$, Worst Case $O(n^2)$

## 4. Shell Sort
### 4.1 How It Works?
Swap two items who has the distance of the gap. Gap is reduced by half in every iteration, until it becomes to one.
### 4.2 Implementation
```java
public void shellSort(int[] nums) {
    if (nums == null || nums.length < 2) {
        return;
    }

    for (int gap = nums.length / 2; gap > 0; gap = gap / 2) {
        for (int i = gap; i < nums.length; i++) {
            int temp = nums[i];
            int j;
            for (j = i; j >= gap && nums[j - gap] > temp; j = j - gap) {
                nums[j] = nums[j - gap];
            }
            nums[j] = temp;
        }
    }
}
```
### 4.3 Complexity
* Space: $O(1)$
* Time: The above implementation has average $O(n^2)$, worst Case $O(n^2)$. There are other ways to reduce gap which lead to better time complexity.

## 5. Selection Sort
### 5.1 How It Works?
Each time, find the smallest element between the current element and the tail element, append it to the front.
### 5.2 Implementation
```java
public void selectionSort(int[] nums) {
    if (nums == null || nums.length < 2) {
        return;
    }

    for (int i = 0; i < nums.length; i++) {
        int min = i;
        for (int j = i + 1; j < nums.length; j++) {
            if (nums[j] < nums[min]) {
                min = j;
            }
        }

        if (min > i) {
            int temp = nums[i];
            nums[i] = nums[min];
            nums[min] = temp;
        }
    }
}
```
### 5.3 Complexity
* Space: $O(1)$
* Time: Average $O(n^2)$, Worst Case $O(n^2)$

## 6. Heap Sort
### 6.1 How It Works?
Build heap
### 6.2 Implementation
```java
public void heapSort(int nums[]) {
    if (nums == null || nums.length < 2) {
        return;
    }

    // Build heap (rearrange array)
    for (int i = nums.length / 2 - 1; i >= 0; i--) {
        heapify(nums, nums.length, i);
    }

    // One by one extract an element from heap
    for (int i = nums.length - 1; i >= 0; i--) {
        int temp = nums[0];
        nums[0] = nums[i];
        nums[i] = temp;

        heapify(nums, i, 0);
    }
}

private void heapify(int nums[], int n, int i) {
    int largest = i;  // Initialize largest as root
    int l = 2*i + 1;  // left child
    int r = 2*i + 2;  // right child

    if (l < n && nums[l] > nums[largest]) {
        largest = l;
    }

    if (r < n && nums[r] > nums[largest]) {
        largest = r;
    }

    // If largest is not root
    if (largest != i) {
        int swap = nums[i];
        nums[i] = nums[largest];
        nums[largest] = swap;

        // Recursively heapify the affected sub-tree
        heapify(nums, n, largest);
    }
}
```
### 6.3 Complexity
* Space: $O(n\log{}n)$
* Time: Average $O(n\log{}n)$, Worst Case $O(n\log{}n)$

## 7. Merge Sort
### 7.1 How It Works?
Take the
### 6.2 Implementation
```java
public void mergeSort(int[] nums) {
    if (nums == null || nums.length < 2) {
        return;
    }
    mergeHelper(nums, 0, nums.length - 1);
    return;
}

private void mergeHelper(int[] nums, int start, int end) {
    if (start >= end) {
        return;
    }

    int mid = start + (end - start) / 2;
    mergeHelper(nums, start, mid);
    mergeHelper(nums, mid + 1, end);
    merge(nums, start, mid, end);
}

private void merge(int[] nums, int start, int mid, int end) {
    int[] copy = Arrays.copyOf(nums, nums.length);

    int left = start;
    int right = mid + 1;
    for (int k = start; k <= end; k++) {
        if (left > mid) { // no item at left
            nums[k] = copy[right];
            right++;
        }
        else if(right > end) { // no item at right
            nums[k] = copy[left];
            left++;
        }
        else if (copy[left] <= copy[right]) {
            nums[k] = copy[left];
            left++;
        }
        else{
            nums[k] = copy[right];
            right++;
        }
    }
}
```
### 7.3 Complexity
* Space: $O(n)$
* Time: Average $O(n\log{}n)$, Worst Case $O(n\log{}n)$

## 8. Quick Sort
### 8.1 How It Works?
Take the
### 8.2 Implementation
```java
public void quickSort(int[] nums) {
    if (nums == null || nums.length < 2) {
        return;
    }
    quickHelper(nums, 0, nums.length - 1);
    return;
}

private void quickHelper(int[] nums, int start, int end) {
    if (start >= end) {
        return;
    }

    int pivot = partition(nums, start, end);
    quickHelper(nums, start, pivot - 1);
    quickHelper(nums, pivot + 1, end);
}   

// one way
private int partition(int[] nums, int start, int end) {
    int pivot = start; // select the first as the pivot

    for (int i = start + 1; i <= end; i++) {
        if (nums[i] < nums[start]) {
            pivot++;
            int temp = nums[pivot];
            nums[pivot] = nums[i];
            nums[i] = temp;
        }
    }

    int temp = nums[pivot];
    nums[pivot] = nums[start];
    nums[start] = temp;
    return pivot;
}
```
### 8.3 Complexity
* Space: $O(n\log{}n)$
* Time: Average $O(n\log{}n)$, Worst Case $O(n^2)$

## 9. Bucket Sort
### 9.1 How It Works?
Take the
### 9.2 Implementation
```java
public void bucketSort(int[] nums, int maxVal) {
    if (nums == null || nums.length == 0) {
        return;
    }

    int [] bucket = new int[maxVal+1];

    for (int i = 0; i < bucket.length; i++) {
        bucket[i] = 0;
    }

    for (int i = 0; i < nums.length; i++) {
        bucket[nums[i]]++;
    }

    int outPos=0;
    for (int i = 0; i < bucket.length; i++) {
        for (int j = 0; j < bucket[i]; j++) {
            nums[outPos++] = i;
        }
    }
}
```
### 9.3 Complexity
* Space: Depends
* Time: Average $O(n+r)$, Worst Case $O(n+r)$

## 10. Source Files
* [Source files for Sorting on GitHub](https://github.com/jojozhuang/dsa-java/tree/master/alg-sorting)
* [Binary Search Diagrams(draw.io) in Google Drive](https://drive.google.com/file/d/1kFOgd-Xf944qt2zqupqd7-eHG7C237si/view?usp=sharing)

## 11. Reference
* [Big-O Cheat Sheet](http://bigocheatsheet.com/)
* [Sorting Algorithms on Wiki](https://en.wikipedia.org/wiki/Sorting_algorithm)
* [Data Structure - Sorting Techniques](https://www.tutorialspoint.com/data_structures_algorithms/sorting_algorithms.htm)
* [Bubble Sort](http://www.geeksforgeeks.org/bubble-sort/)
* [Insertion Sort](http://www.geeksforgeeks.org/insertion-sort/)
* [Selection Sort](http://www.geeksforgeeks.org/selection-sort/)
* [Shell Sort](http://www.geeksforgeeks.org/shellsort/)
* [Heap Sort](http://www.geeksforgeeks.org/heap-sort/)
