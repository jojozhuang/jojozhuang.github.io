---
layout: post
key: blog
title: "Algorithm - Sorting"
date: 2016-03-26
tags: Bubble, Quick, Merge
categories:
- blog
---

> Most of the popular sorting algorithms.
* 1. Bubble
* 2. Insertion
* 3. Selection
* 4. Shell
* 5. Heap
* 6. Merge
* 7. Quick
* 8. Bucket

## 1. Bubble Sort
### 1.1 How It Works?
Take the
### 1.2 Implementation
```java
public int[] BubbleSort(int[] nums) {
    if (nums == null || nums.length == 0) {
        return nums;
    }

    //small to big
    for(int i = 0; i < nums.length; i++) {
        for (int j = nums.length - 1 ; j > i; j--) { //find the smallest one
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
### 1.3 Complexity
* Space: O(1)
* Time: 

## 2. Insertion Sort
### 2.1 How It Works?
Take the
### 2.2 Implementation
```java
public int[] InsertionSort(int[] nums) {
    if (nums == null || nums.length < 2) {
        return nums;
    }

    for (int i = 1; i < nums.length; i++) {
        int key = nums[i];
        int j = i;
        while(j > 0 && nums[j - 1] > key) {
            nums[j] = nums[j - 1];
            j--;
        }
        nums[j] = key;
    }

    return nums;
}
```
### 2.3 Complexity
* Space:
* Time:

## 3. Selection Sort
### 3.1 How It Works?
Take the
### 3.2 Implementation
```java
public int[] SelectionSort(int[] nums) {
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
### 3.3 Complexity
* Space:
* Time:

## 4. Shell Sort
### 4.1 How It Works?
Take the
### 4.2 Implementation
```java
public int[] ShellSort(int[] nums) {
    if (nums == null || nums.length == 0) {
        return nums;
    }

    return nums;
}
```
### 4.3 Complexity
* Space:
* Time:

## 5. Heap Sort
### 5.1 How It Works?
Take the
### 5.2 Implementation
```java
public int[] HeapSort(int[] nums) {
    if (nums == null || nums.length == 0) {
        return nums;
    }

    return nums;
}
```
### 5.3 Complexity
* Space:
* Time:

## 6. Merge Sort
### 6.1 How It Works?
Take the
### 6.2 Implementation
```java
public int[] MergeSort(int[] nums, int start, int end) {
    if (nums == null || nums.length < 2 || start >= end) {
        return nums;
    }

    int mid = 0;

    mid = start + (end - start) / 2;
    nums = MergeSort(nums, start, mid);
    nums = MergeSort(nums, mid + 1, end);
    nums = Merge(nums, start, mid, end);

    return nums;
}

private int[] Merge(int[] nums, int start, int mid, int end) {

    int[] copy = Arrays.copyOf(nums, nums.length);

    int i = start;
    int j = mid + 1;
    for (int k = start; k <= end; k++) {
        if (i > mid) { // no item in left
            nums[k] = copy[j];
            j++;
        }
        else if(j > end) { // no item in right
            nums[k] = copy[i];
            i++;
        }
        else if (copy[i] <= copy[j]) {
            nums[k] = copy[i];
            i++;
        }
        else{
            nums[k] = copy[j];
            j++;
        }                
    }

    return nums;
}
```
### 6.3 Complexity
* Space:
* Time:

## 7. Quick Sort
### 7.1 How It Works?
Take the
### 7.2 Implementation
```java
public int[] QuickSort(int[] nums, int start, int end) {
    if (nums == null || nums.length < 2 || start >= end) {
        return nums;
    }

    int pivot = partition(nums, start, end);
    nums = QuickSort(nums, start, pivot - 1);
    nums = QuickSort(nums, pivot + 1, end);

    return nums;
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
### 7.3 Complexity
* Space:
* Time:

## 8. Bucket Sort
### 8.1 How It Works?
Take the
### 8.2 Implementation
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
### 8.3 Complexity
* Space:
* Time:

## 9. Reference
*[Sorting algorithm in Wiki](https://en.wikipedia.org/wiki/Sorting_algorithm)
