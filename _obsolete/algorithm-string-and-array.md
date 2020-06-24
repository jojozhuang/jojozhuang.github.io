---
layout: tutorial
key: popular
title: "Algorithm - String and Array"
index: 1237
subcategory: algorithm
date: 2020-03-21
tags: [String, Array]
draft: true
---

> Common approaches for solving string and array problems

## 1. String
* Presum
* Two Pointers
* Split to Left and Right

Examples for **Split to Left and Right**:

## 2. Questions
### 2.1 Min Deletions To Obtain String in Right Format
We are given a string S of length N consisting only of letters A and/or B. Our goal is to obtain a string in the format `A...AB...B`(all letters A occur before all letters B) by deleting some letters from S. In particular, strings consisting only of letters A or only of letters B fit this format.

Write a function that, given a string S, return the minimum number of letters that need to be deleted from S in order to obtain a string in the above format.
* N is an integer within the range [1,100000];
* string S consists only of the characters A and/or B.

Example
Example 1
```sh
Input: "BAAABAB"
Output: 2
Explanation: We can obtain "AAABB" by deleting the first occurrence of 'B' and the last occurrence of 'A'.
```
Example 2
```sh
Input: "BBABAA"
Output: 3
Explanation: We can delete all occurrences of 'A' or 'B'.
```
Example 3
```sh
Input: "AABBBB"
Output: 0
Explanation: We do not have to delete any letters, because the given string is already in the expected format.
```
Solution:
First, go through the string, count the number of B at left side and the number of A at right side. Then, find the minimum sum of left B and right A at each position. **The key concept of the solution is to divide the array/string into left and right parts.**
```java
// time: O(n), space: O(n)
public int minDeletionsToObtainStringInRightFormat3(String s) {
    // Go through the string, count the number of B at left side and the number of A at right side.
    // Then, find the minimum sum of left B and right A at each position.
    if (s == null || s.length() == 0) {
        return 0;
    }

    int n = s.length();
    int[] left = new int[n];  // number of B from left
    int[] right = new int[n]; // number of A from right
    left[0] = s.charAt(0) == 'B' ? 1 : 0;
    for (int i = 1; i < n; i++) {
        left[i] = left[i - 1];
        if (s.charAt(i) == 'B') {
            left[i]++;
        }

    }

    right[n - 1] = s.charAt(n - 1) == 'A' ? 1 : 0;
    for (int i = n - 2; i >= 0; i--) {
        right[i] = right[i + 1];
        if (s.charAt(i) == 'A') {
            right[i]++;
        }
    }

    int min = n;
    for (int i = 0; i < n; i++) {
        int count = 0;
        if (i == 0) {
            count = right[i + 1];
        } else if (i == n - 1) {
            count = left[i - 1];
        } else {
            count = left[i - 1] + right[i + 1];
        }
        min = Math.min(min, count);
    }

    return min;
}
```
Optimized space solution.
```java
// time: O(n), space: O(1)
public int minDeletionsToObtainStringInRightFormat2(String s) {
    if (s == null || s.length() == 0) {
        return 0;
    }
    int n = s.length();

    int leftB = 0;
    int rightA = 0;

    for (int i = 0; i < n; i++) {
        if (s.charAt(i) == 'A') {
            rightA++;
        }
    }

    int ans = rightA;

    for (int i = 0; i < n; i++) {
        if (s.charAt(i) == 'A') {
            rightA--;
        } else {
            leftB++;
        }
        ans = Math.min(ans, rightA + leftB);
    }

    return ans;
}
```
Further, one pass solution.
```java
// one pass: time: O(n), space: O(1)
public int minDeletionsToObtainStringInRightFormat(String s) {
    if (s == null || s.isEmpty()) {
        return 0;
    }

    int countA = 0;
    int countB = 0;
    int toDelete = 0;

    for (char c : s.toCharArray()) {
        if (c == 'A') {
            countA++;
            if (countB > toDelete) {
                toDelete++;
            }
        } else {
            countB++;
        }
    }

    return Math.min(countA, Math.min(countB, toDelete));
}
```
## 5. Source Files


## 7. References
* [1821. Min Deletions To Obtain String in Right Format](https://www.lintcode.com/problem/min-deletions-to-obtain-string-in-right-format/description)
