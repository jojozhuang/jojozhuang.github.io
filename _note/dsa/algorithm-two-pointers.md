---
layout: note
key: note
title: "Algorithm - Two Pointers"
index: 323
category: dsa
image: note/dsa.png
date: 2016-03-23
postdate: 2016-03-23
tags: [Two Pointers]
mathjax: true
---

> Two pointers technique.

## 1. Two Pointers
Two pointers technique is easy to understand which is generally used to solve problem within linear time complexity.

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
![image](/public/notes/algorithm-two-pointers/two_pointers.png){:width="700px"}
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
* [LeetCode 26 - Remove Duplicates from Sorted Array](https://leetcode.com/problems/remove-duplicates-from-sorted-array/)
* [LeetCode 167 - Two Sum II - Input array is sorted](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/)
* [LeetCode 186 - Reverse Words in a String II](https://leetcode.com/problems/reverse-words-in-a-string-ii/)
* [LeetCode 189 - Rotate Array](https://leetcode.com/problems/rotate-array/)
* [LeetCode 125 - Valid Palindrome](https://leetcode.com/problems/valid-palindrome/)
* [LeetCode 11 - Container With Most Water](https://leetcode.com/problems/container-with-most-water/)
* [LeetCode 238 - Product of Array Except Self](https://leetcode.com/problems/product-of-array-except-self/)

## 4. Source Files
* [Source files for Two Pointers on GitHub](https://github.com/jojozhuang/dsa-java/tree/master/alg-two-pointers)
* [Two Pointers Diagrams(draw.io) in Google Drive](https://drive.google.com/file/d/1T7XqbPqwcxXaaDt2RR9sNAfpe-QlALZU/view?usp=sharing)

## 5. References
* [Two Pointers Technique](https://www.geeksforgeeks.org/two-pointers-technique/)
* [Two-pointer technique](https://leetcode.com/articles/two-pointer-technique/)
* [The Two Pointer Algorithm](https://tp-iiita.quora.com/The-Two-Pointer-Algorithm)
