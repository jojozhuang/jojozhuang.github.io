---
layout: tutorial
key: algorithm
title: "Algorithm - Binary Search"
index: 1211
subcategory: algorithm-algorithm
date: 2016-03-22
tags: [Binary Search]
mathjax: true
---

> Binary search template.

## 1. Search Problem
Given a `sorted` array with n elements, write a function to search a given element x in array. A simple approach is to do linear search. The time complexity of above algorithm is $O(n)$. Another approach to perform the same task is using Binary Search. The time complexity of binary search algorithm is $O(\log{}n)$.

## 2. Binary Search
### 2.1 How it works?
Search a sorted array by repeatedly dividing the search interval in half. Begin with an interval covering the whole array. If the value of the search key is less than the item in the middle of the interval, narrow the interval to the lower half. Otherwise narrow it to the upper half. Repeatedly check until the value is found or the interval is empty.
### 2.2 Steps
* 1) Compare x with the middle element.
* 2) If x matches with middle element, we return the mid index, stop searching, otherwise, go to step 3.
* 3) If x is greater than the mid element, then x can only lie in right half subarray after the mid element. So we recur for right half.
* 4) Otherwise(x is smaller), recur for the left half.

See the example below.
![image](/assets/images/algorithm/1211/binarysearch.png){:width="700px"}
### 2.3 Variants
Given an sorted integer array - nums, and an integer - target. Find the `any/first/last` position of target in nums, return -1 if target doesn’t exist.

## 3. Implementation
### 3.1 Recursive Implementation(find any)
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
### 3.2 Iterative Implementation(find any)
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
* Infinite loop may easily occur(eg. start is same with end) if we set start or end improperly.

### 3.3 Binary Search Template(find any)
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
* Notice the inequality `start + 1 < end`. No matter what value of `mid` becomes to, either `start` or `end` will change accordingly. Thus, the inequality will be evaluated with new values to make sure the while loop will be broken when the difference of `start` and `end` are close to one.

### 3.4 Binary Search Template(find first)
Based on the template, just need to change the logic when we find the target with `mid` and make sure check `start` first after the while loop.
```java
// search the first occurrence
public int searchFirst(int[] nums, int target) {
    if (nums == null || nums.length == 0) {
        return -1;
    }
    int start = 0;
    int end = nums.length - 1;

    while (start + 1 < end) {
        int mid = start + (end - start) / 2;
        if (nums[mid] == target) {
            end = mid; // don't return, instead, exclude the right part
        } else if (nums[mid] < target) {
            start = mid;
        } else {
            end = mid;
        }
    }

    // check start first
    if (nums[start] == target) {
        return start;
    }

    if (nums[end] == target) {
        return end;
    }

    return -1;
}
```
### 3.5 Binary Search Template(find last)
Based on the template, just need to change the logic when we find the target with `mid` and check `end` first after the while loop.
```java
// search the last occurrence
public int searchLast(int[] nums, int target) {
    if (nums == null || nums.length == 0) {
        return -1;
    }
    int start = 0;
    int end = nums.length - 1;

    while (start + 1 < end) {
        int mid = start + (end - start) / 2;
        if (nums[mid] == target) {
            start = mid; // don't return, instead, exclude the left part
        } else if (nums[mid] < target) {
            start = mid;
        } else {
            end = mid;
        }
    }

    // check end first
    if (nums[end] == target) {
        return end;
    }

    if (nums[start] == target) {
        return start;
    }

    return -1;
}
```

## 4. Classic Problems
* [LeetCode 704 - Binary Search](https://leetcode.com/problems/binary-search/)
* [LintCode 61 - Search for a range](https://www.lintcode.com/problem/search-for-a-range)
* [LeetCode 35 - Search Insert Position](https://leetcode.com/problems/search-insert-position/)
* [LeetCode 74 - Search a 2D Matrix](https://leetcode.com/problems/search-a-2d-matrix/)
* [LeetCode 278 - First Bad Version](https://leetcode.com/problems/first-bad-version/)
* [LeetCode 162 - Find Peak Element](https://leetcode.com/problems/find-peak-element/)
* [LeetCode 33 - Search in Rotated Sorted Array](https://leetcode.com/problems/search-in-rotated-sorted-array/)
* [LeetCode 153 - Find Minimum in Rotated Sorted Array](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/)
* [LeetCode 4 - Median of Two Sorted Arrays](https://leetcode.com/problems/median-of-two-sorted-arrays/)
* [LeetCode 88 - Merge Sorted Array](https://leetcode.com/problems/merge-sorted-array/)
* [LintCode 39 - Recover Sorted Array](https://www.lintcode.com/problem/recover-rotated-sorted-array/)
* [LeetCode 796 - Rotate String](https://leetcode.com/problems/rotate-string/)
* [LeetCode 151 - Reverse Words in a String](https://leetcode.com/problems/reverse-words-in-a-string/)

## 5. Source Files
* [Source files for Binary Search on GitHub](https://github.com/jojozhuang/dsa-java/tree/master/alg-binary-search)
* [Binary Search Diagrams(draw.io) in Google Drive](https://drive.google.com/file/d/1kFOgd-Xf944qt2zqupqd7-eHG7C237si/view?usp=sharing)

## 6. References
* [Binary Search at Geeksforgeeks](https://www.geeksforgeeks.org/binary-search/)
