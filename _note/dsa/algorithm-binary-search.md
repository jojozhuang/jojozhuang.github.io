---
layout: note
key: note
title: "Algorithm - Binary Search"
index: 322
category: dsa
image: note/dsa.png
date: 2016-03-22
postdate: 2016-03-22
tags: [Binary Search]
mathjax: true
---

> Introduce binary search algorithm.

## 1. Search Problem
Given a `sorted` array with n elements, write a function to search a given element x in array. A simple approach is to do linear search. The time complexity of above algorithm is $O(n)$. Another approach to perform the same task is using Binary Search. The time complexity of binary search algorithm is $O(\log{}n)$.

## 2. Binary Search
Search a sorted array by repeatedly dividing the search interval in half. Begin with an interval covering the whole array. If the value of the search key is less than the item in the middle of the interval, narrow the interval to the lower half. Otherwise narrow it to the upper half. Repeatedly check until the value is found or the interval is empty.

Steps:
* 1) Compare x with the middle element.
* 2) If x matches with middle element, we return the mid index, stop searching, otherwise, go to step 3.
* 3) If x is greater than the mid element, then x can only lie in right half subarray after the mid element. So we recur for right half.
* 4) Otherwise(x is smaller), recur for the left half.

See the example below.
![image](/public/notes/algorithm-binary-search/binarysearch.png){:width="800px"}

## 3. Implementation
### 3.1 Recursive Implementation
```java
// recursive implementation
public int search(int[] nums, int target) {
    if (nums == null || nums.length == 0) {
        return -1;
    }

    return recursiveHelper(nums, 0, nums.length - 1, target);
}

private int recursiveHelper(int[] nums, int start, int end, int target) {
    if (start > end) {
        return -1;
    }

    int mid = start + (end - start) / 2; // avoid overflow of (start + end) / 2
    if (nums[mid] == target) {
        // found
        return mid;
    } else if (nums[mid] < target) {
        // search in the right half
        return recursiveHelper(nums, mid + 1, end, target);
    } else {
        // search in the left half
        return recursiveHelper(nums, start, mid - 1, target);
    }
}
```
### 3.2 Iterative Implementation
```java
// iterative implementation
public int search(int[] nums, int target) {
    if (nums == null || nums.length == 0) {
        return -1;
    }
    int start = 0;
    int end = nums.length - 1;

    while (start <= end) {
        int mid = start + (end - start) / 2; // avoid overflow of (start + end) / 2
        if (nums[mid] == target) {
            return mid;
        } else if (nums[mid] < target) {
            start = mid + 1;
        } else {
            end = mid - 1;
        }
    }

    return -1;
}
```
### 3.3 Binary Search Template
```java
// binary search template, can be applied to most of the binary search problems
public int search(int[] nums, int target) {
    if (nums == null || nums.length == 0) {
        return -1;
    }
    int start = 0;
    int end = nums.length - 1;

    while (start + 1 < end) { // avoid infinite loop, need to check nums[start] and nums[end] after the while loop
        int mid = start + (end - start) / 2; // avoid overflow of (start + end) / 2
        if (nums[mid] == target) {
            return mid;
        } else if (nums[mid] < target) {
            start = mid; // no need +1
        } else {
            end = mid;   // no need -1
        }
    }

    // need to check the start and end
    if (nums[start] == target) {
        return start;
    }

    if (nums[end] == target) {
        return end;
    }

    return -1;
}
```

## 4. Source Files
* [Source files for Binary Search on GitHub](https://github.com/jojozhuang/dsa-java/tree/master/alg-binary-search)
* [Binary Search Diagrams(draw.io) in Google Drive](https://drive.google.com/file/d/1kFOgd-Xf944qt2zqupqd7-eHG7C237si/view?usp=sharing)

## 5. References
* [Binary Search](https://www.geeksforgeeks.org/binary-search/)
