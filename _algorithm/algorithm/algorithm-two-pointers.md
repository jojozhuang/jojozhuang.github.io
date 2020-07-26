---
layout: tutorial
key: algorithm
title: "Algorithm - Two Pointers"
index: 1212
subcategory: algorithm-algorithm
date: 2016-03-23
tags: [Two Pointers]
mathjax: true
---

> Two pointers technique.

## 1. Two Pointers
Two pointers technique is easy to understand which is generally used to solve problem within linear time complexity.
### 1.1 Types of Two Pointers
* Collision - One array, move from two sides to middle.
* Forward - One array, both move forward.
* Parallel - Two arrays, each array has been assigned with a pointer.

## 2. Problem
Given a sorted (in ascending order) integer array nums of n elements and a target value, find if there exists any pair of elements (nums[i], nums[j], i!=j) such that their sum is equal to target.
### 2.1 Naive Solution
Use two loops to traverse the array to find the matched elements.
```java
// naive solution, O(n^2)
public boolean isPairSumNaive(int[] nums, int target) {
    if (nums == null || nums.length == 0) {
        return false;
    }

    for (int i = 0; i < nums.length; i++) {
        for (int j = i + 1; j <  nums.length; j++) {
            if (nums[i] + nums[j] == target) {
                return true; // pair exists
            }

            if (nums[i] + nums[j] > target)
                break; // break inner loop as the array is sorted
        }
    }

    // not found
    return false;
}
```
* Time Complexity: $O(n^2)$

### 2.2 Two Pointers Solution
As the array is sorted, we can use two pointers to solve this problem. One pointer is initially at header, another pointer is initially at tail. Get the sum of the values represented by these two pointers. If sum is equal to target value, then return. If it is smaller than the target, move the left pointer to right; otherwise, move the right pointer to left. Thus, narrow down the scope of the candidates.
![image](/assets/images/algorithm/1212/two_pointers.png){:width="700px"}
See the following implementation.
```java
// Two pointers, O(n)
public boolean isPairSum(int[] nums, int target) {
    if (nums == null || nums.length == 0) {
        return false;
    }
    int start = 0;
    int end = nums.length - 1;

    while (start < end) {
        int sum = nums[start] + nums[end];
        if (sum == target) {
            return true; // pair exists
        } else if (sum < target) {
            start++; // move start forward to get larger value
        } else {
            end--; // move end backward to get smaller value
        }
    }

    // not found
    return false;
}
```
* Time Complexity: $O(n)$

## 3. Classic Problems
### 3.1 Collision
Sub type: Two Sum
* [LeetCode 167 - Two Sum II - Input array is sorted](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/)
* [LeetCode 15 - 3Sum](https://leetcode.com/problems/3sum/) (Sort + Loop + Two Pointers)
* [LeetCode 16 - 3Sum Closest](https://leetcode.com/problems/3sum-closest/) (Sort + Loop + Two Pointers + diff)
* [LeetCode 18 - 4Sum](https://leetcode.com/problems/4sum/) (Sort + Double Loop + Two Pointers + HashSet)
* [LeetCode 611 - Valid Triangle Number](https://leetcode.com/problems/valid-triangle-number)
* [LeetCode 42 - Trapping Rain Water](https://leetcode.com/problems/trapping-rain-water)
* [LeetCode 11 - Container With Most Water](https://leetcode.com/problems/container-with-most-water/)

Sub type: Partition
* [LintCode 31 - Partition Array](https://www.lintcode.com/problem/partition-array/)(Quick sort)
* [LeetCode 125 - Valid Palindrome](https://leetcode.com/problems/valid-palindrome/)
* [LeetCode 75 - Sort Colors](https://leetcode.com/problems/sort-colors/)
* [LintCode 373 - Partition Array by Odd and Even](https://www.lintcode.com/problem/partition-array-by-odd-and-even)
* [LintCode 49 - Sort Letters by Case](https://www.lintcode.com/problem/sort-letters-by-case/)

### 3.2 Forward
Sub type: Window
* [LeetCode 209 - Minimum Size Subarray Sum](https://leetcode.com/problems/minimum-size-subarray-sum/)
* [LeetCode 3 - Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters) (HashMap + Two Pointers)
* [LeetCode 76 - Minimum Window Substring](https://leetcode.com/problems/minimum-window-substring) (HashMap + Two Pointers)
* [LeetCode 159 - Longest Substring with At Most Two Distinct Characters](https://leetcode.com/problems/longest-substring-with-at-most-two-distinct-characters) (HashMap + Two Pointers)
* [LeetCode 340 - Longest Substring with At Most K Distinct Characters](https://leetcode.com/problems/longest-substring-with-at-most-k-distinct-characters)
* [LeetCode 19 - Remove Nth Node From End of List](https://leetcode.com/problems/remove-nth-node-from-end-of-list) (One pass, moving window, linked list)

Sub type: fast and slow
* [LeetCode 876 - Middle of the Linked List](https://leetcode.com/problems/middle-of-the-linked-list)(second middle node)
* [LeetCode 141 - Linked List Cycle](https://leetcode.com/problems/linked-list-cycle)
* [LeetCode 142 - Linked List Cycle II](https://leetcode.com/problems/linked-list-cycle-ii)

### 3.3 Parallel
Two arrays, one pointer each.
* [LintCode 387 - The Smallest Difference](https://www.lintcode.com/problem/the-smallest-difference/)
* [LeetCode 21 - Merge Two Sorted Lists](https://leetcode.com/problems/merge-two-sorted-lists/)

Others- Todo
* [LeetCode 26 - Remove Duplicates from Sorted Array](https://leetcode.com/problems/remove-duplicates-from-sorted-array/)
* [LeetCode 186 - Reverse Words in a String II](https://leetcode.com/problems/reverse-words-in-a-string-ii/)
* [LeetCode 189 - Rotate Array](https://leetcode.com/problems/rotate-array/)
* [LeetCode 238 - Product of Array Except Self](https://leetcode.com/problems/product-of-array-except-self/)

## 4. Source Files
* [Source files for Two Pointers on GitHub](https://github.com/jojozhuang/dsa-java/tree/master/alg-two-pointers)
* [Two Pointers Diagrams(draw.io) in Google Drive](https://drive.google.com/file/d/1T7XqbPqwcxXaaDt2RR9sNAfpe-QlALZU/view?usp=sharing)

## 5. References
* [Two Pointers Technique](https://www.geeksforgeeks.org/two-pointers-technique/)
* [Two-pointer technique](https://leetcode.com/articles/two-pointer-technique/)
* [The Two Pointer Algorithm](https://tp-iiita.quora.com/The-Two-Pointer-Algorithm)
