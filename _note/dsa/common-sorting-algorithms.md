---
layout: note
key: note
title: "Common Sorting Algorithms"
index: 321
category: dsa
image: note/dsa.png
date: 2016-03-21
postdate: 2016-03-21
tags: [Sorting]
---

> All of the common sorting algorithms.

## 1. Common Sorting Algorithms

 Name           | Time(Average) | Time (Best)   | Time(Worst)   | Space Complexity | Stable
----------------|---------------|---------------|---------------|------------------|--------
 Bubble Sort    | n<sup>2</sup> | n             | n<sup>2</sup> | 1                | Yes
 Insertion Sort | n<sup>2</sup> | n             | n<sup>2</sup> | 1                | Yes
 Shell Sort     | n<sup>2</sup> | nlog(n)       | n<sup>2</sup> | 1                | No
 Selection Sort | n<sup>2</sup> | n<sup>2</sup> | n<sup>2</sup> | 1                | No
 Heap Sort      | nlog(n)       | nlog(n)       | nlog(n)       | 1                | No
 Merge Sort     | nlog(n)       | nlog(n)       | nlog(n)       | O(n)             | Yes
 Quick Sort     | nlog(n)       | nlog(n)       | n<sup>2</sup> | log(n)           | No
 Bucket Sort    | --            | n + r         | n + r         | n + r            | Yes
 Counting Sort  | --            | n + r         | n + r         | n + r            | Yes
 Radix Sort     | --            | nk/d          | nk/d          | n + 2<sup>d</sup>| Yes

## 2. Bubble Sort
### 2.1 How It Works?
Take the last element, compare it with the previous one, swap if it is smaller(or larger). By doing this repetitively, bubble up the smallest(or the largest) to the front.
### 2.2 Implementation
```java
public int[] bubbleSort(int[] nums) {
    if (nums == null || nums.length < 2) {
        return nums;
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

    return nums;
}  
```
### 2.3 Complexity
* Space: O(1)
* Time: Average O(n^2), Worst Case O(n^2)

## 3. Insertion Sort
### 3.1 How It Works?
Start from the second element, each time, insert the current element to the proper position.
![image](/public/notes/common-sorting-algorithms/insertionsort.png)  
### 2.2 Implementation
```java
public int[] insertionSort(int[] nums) {
    if (nums == null || nums.length < 2) {
        return nums;
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

    return nums;
}
```
### 3.3 Complexity
* Space: O(1)
* Time: Average O(n^2), Worst Case O(n^2)

## 4. Shell Sort
### 4.1 How It Works?
ShellSort is mainly a variation of Insertion Sort. Do a gapped insertion sort.
### 4.2 Implementation
```java
public int[] shellSort(int[] nums) {
    if (nums == null || nums.length < 2) {
        return nums;
    }

    for (int gap = nums.length/2; gap > 0; gap = gap/2) {
        for (int i = gap; i < nums.length; i++) {
            int temp = nums[i];
            int j;
            for (j = i; j >= gap && nums[j - gap] > temp; j = j-gap) {
                nums[j] = nums[j - gap];
            }
            nums[j] = temp;
        }
    }

    return nums;
}
```
### 4.3 Complexity
* Space:
* Time:

## 5. Selection Sort
### 5.1 How It Works?
Each time, find the smallest element between the current element and the tail element, append it to the front.
### 5.2 Implementation
```java
public int[] selectionSort(int[] nums) {
    if (nums == null || nums.length < 2) {
        return nums;
    }

    for(int i = 0; i < nums.length; i++) {
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

    return nums;
}
```
### 5.3 Complexity
* Space: O(1)
* Time: Average O(n^2), Worst Case O(n^2)

## 6. Heap Sort
### 6.1 How It Works?
Build heap
### 6.2 Implementation
```java
public int[] heapSort(int nums[]) {
    if (nums == null || nums.length < 2) {
        return nums;
    }

    // Build heap (rearrange array)
    for (int i = nums.length / 2 - 1; i >= 0; i--) {
        heapify(nums, nums.length, i);
    }

    // One by one extract an element from heap
    for (int i= nums.length-1; i>=0; i--) {
        int temp = nums[0];
        nums[0] = nums[i];
        nums[i] = temp;

        heapify(nums, i, 0);
    }

    return nums;
}

private void heapify(int nums[], int n, int i)
{
    int largest = i;  // Initialize largest as root
    int l = 2*i + 1;  // left = 2*i + 1
    int r = 2*i + 2;  // right = 2*i + 2

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
* Space:
* Time:

## 7. Merge Sort
### 7.1 How It Works?
Take the
### 6.2 Implementation
```java
public int[] mergeSort(int[] nums) {
     if (nums == null || nums.length < 2) {
         return nums;
     }
     mergeHelper(nums, 0, nums.length - 1);
     return nums;
 }

 public void mergeHelper(int[] nums, int start, int end) {
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
* Space: O(1)
* Time: Average O(nlog(n)), Worst Case O(nlog(n))

## 8. Quick Sort
### 8.1 How It Works?
Take the
### 8.2 Implementation
```java
public int[] quickSort(int[] nums) {
    if (nums == null || nums.length < 2) {
        return nums;
    }
    quickHelper(nums, 0, nums.length - 1);
    return nums;
}

public void quickHelper(int[] nums, int start, int end) {
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
* Space: O(log(n))
* Time: Average O(nlog(n)), Worst Case O(n^2)

## 9. Bucket Sort
### 9.1 How It Works?
Take the
### 9.2 Implementation
```java
public int[] BucketSort(int[] nums, int maxVal) {
    if (nums == null || nums.length == 0) {
        return nums;
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

    return nums;
}
```
### 9.3 Complexity
* Space: Depends
* Time: Average O(kn), Worst Case O(kn)

## 10. Reference
* [Sorting Algorithms on Wiki](https://en.wikipedia.org/wiki/Sorting_algorithm)
* [Data Structure - Sorting Techniques](https://www.tutorialspoint.com/data_structures_algorithms/sorting_algorithms.htm)
* [Bubble Sort](http://www.geeksforgeeks.org/bubble-sort/)
* [Insertion Sort](http://www.geeksforgeeks.org/insertion-sort/)
* [Selection Sort](http://www.geeksforgeeks.org/selection-sort/)
* [Shell Sort](http://www.geeksforgeeks.org/shellsort/)
* [Heap Sort](http://www.geeksforgeeks.org/heap-sort/)
