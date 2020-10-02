---
layout: tutorial
key: algorithm
title: "Algorithm - Sequence DP"
index: 1222
subcategory: algorithm-algorithm
date: 2016-03-28
tags: [DP]
mathjax: true
---

> Introduce dynamic programming.

Climbing Stairs
Maximum Subarray
Longest Increasing Subsequence

## 3. Sequence DP
### 3.1 Fibonacci Numbers
#### 3.1.1 Problem Description
Fibonacci Numbers are 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, ... Now, given an integer N(N >= 0), return the Nth Fibonacci number.
#### 3.1.2 Recursive Solution
```java
// recursive implementation
public int fibonacci(int n) {
    if (n == 0) {
        return 0;
    }
    if (n == 1) {
        return 1;
    }

    return fibonacci(n - 1) + fibonacci(n - 2);
}
```
* Time complexity: $O(2^n)$
* Space complexity: $O(1)$

#### 3.1.3 DP Solution
```java
// DP
public int fibonacci(int n) {
    if (n == 0) {
        return 0;
    }
    if (n == 1) {
        return 1;
    }

    int[] dp = new int[n + 1];
    dp[0] = 0;
    dp[1] = 1;
    for (int i = 2; i <= n; i++)  {
        dp[i] = dp[i - 1] + dp[i - 2];
    }

    return dp[n];
}
```
* Time complexity: $O(n)$
* Space complexity: $O(n)$

#### 3.1.4 Solution with Constant Space
```java
// constant space
public int fibonacci(int n) {
    if (n == 0) {
        return 0;
    }
    if (n == 1) {
        return 1;
    }

    int first = 0;
    int second = 1;
    int third = 0;

    for (int i = 2; i <= n; i++) {
        third = first + second;
        first = second;
        second = third;
    }

    return third;
}
```
* Time complexity: $O(n)$
* Space complexity: $O(1)$

Maximum Subarray

### 3.2 Longest Increasing Subsequence
#### 3.2.1 Problem Description
Given a sequence of integers, find the longest increasing subsequence (LIS). Your code should return the `length` of the LIS.
```raw
Example 1:
    Input:  [5,4,1,2,3]
    Output:  3
    Explanation: LIS is [1,2,3].
Example 2:
    Input: [4,2,4,5,3,7]
    Output:  4
    Explanation: LIS is [2,4,5,7]
```
#### 3.2.2 DP Solution(n^2)
```java
// O(n^2)
public int longestIncreasingSubsequence(int[] nums) {
    if (nums == null || nums.length == 0) {
        return 0;
    }

    // dp[i], the longest length of LIS which ends at index i.
    int[] dp = new int[nums.length];
    int max = 0;
    for (int i = 0; i < nums.length; i++) {
        dp[i] = 1;
        for (int j = 0; j < i; j++) { // check 0~i
            if (nums[j] < nums[i]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
        max = Math.max(max, dp[i]);
    }

    return max;
}
```
* Time Complexity: $O(n^2)$
* Space Complexity: $O(n)$

Values of the dp array for input A=[4,2,4,5,3,7]. The answer is 4 and the longest increasing subsequence is [2,4,5,7].

A[i]\dp[i] | 0 | 1 | 2 | 3 | 4 | 5
-----------|---|---|---|---|---|---
4          | 1 | 0 | 0 | 0 | 0 | 0
2          | 1 | `1` | 0 | 0 | 0 | 0
4          | 1 | 1 | `2` | 0 | 0 | 0
5          | 1 | 1 | 2 | `3` | 0 | 0
3          | 1 | 1 | 2 | 3 | 2 | 0
7          | 1 | 1 | 2 | 3 | 2 | `4`

#### 3.2.3 Binary Search Solution(nlog(n))
Maintain a monotonic increasing array.
```java
// O(nlog(n))
// https://www.youtube.com/watch?v=5rfZ4WnNKBk
public int longestIncreasingSubsequence3(int[] nums) {
    if (nums == null || nums.length == 0) {
        return 0;
    }

    int[] arr = new int[nums.length]; // increasing array
    // 10,9,2,5,3,7,101,18 -> 2,3,7,18
    int len = 0;
    for (int i = 0; i < nums.length; i++) {
        int index = Arrays.binarySearch(arr, 0, len, nums[i]);
        if (index < 0) {
            index = -(index + 1);
        }

        arr[index] = nums[i];
        if (index == len) {
            len++;
        }
    }

    return len;
}
```
* Time Complexity: $O(nlog(n))$
* Space Complexity: $O(n)$

Values of the dp array for input A=[10,9,2,5,3,7,101,18]. The answer is 4 and the longest increasing subsequence are [2,5,7,101], [2,5,7,18], [2,3,7,101] or [2,3,7,18].

A[i]\arr[i] | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7
------------|---|---|---|---|---|---|---|---
10          | 10| 0 | 0 | 0 | 0 | 0 | 0 | 0
9           | 9 | 0 | 0 | 0 | 0 | 0 | 0 | 0
2           | 2 | 0 | 0 | 0 | 0 | 0 | 0 | 0
5           | 2 | 5 | 0 | 0 | 0 | 0 | 0 | 0
3           | 2 | 3 | 0 | 0 | 0 | 0 | 0 | 0
7           | 2 | 3 | 7 | 0 | 0 | 0 | 0 | 0
101         | 2 | 3 | 7 |101| 0 | 0 | 0 | 0
18          | 2 | 3 | 7 |18 | 0 | 0 | 0 | 0

Here, the final array contains the correct LIS . But it is not guaranteed this is always the case. Take another input as example, A=[10,9,2,5,7,3,101,18]. The only difference with the previous input is that 7 and 3 are swapped. The answer is still 4. But the longest increasing subsequence are [2,5,7,101] and [2,5,7,18] only. [2,3,7,101] and [2,3,7,18] are not valid LIS any more, but we have the same final array [2,3,7,18,0,0,0,0] as the previous exmaple.

A[i]\arr[i] | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7
------------|---|---|---|---|---|---|---|---
10          | 10| 0 | 0 | 0 | 0 | 0 | 0 | 0
9           | 9 | 0 | 0 | 0 | 0 | 0 | 0 | 0
2           | 2 | 0 | 0 | 0 | 0 | 0 | 0 | 0
5           | 2 | 5 | 0 | 0 | 0 | 0 | 0 | 0
7           | 2 | 5 | 7 | 0 | 0 | 0 | 0 | 0
3           | 2 | 3 | 7 | 0 | 0 | 0 | 0 | 0
101         | 2 | 3 | 7 |101| 0 | 0 | 0 | 0
18          | 2 | 3 | 7 | 18| 0 | 0 | 0 | 0

### 3.3 Classic Problems
* [LeetCode 70 - Climbing Stairs](https://leetcode.com/problems/climbing-stairs/)
* [LeetCode 55 - Jump Game](https://leetcode.com/problems/jump-game/)
* [LeetCode 45 - Jump Game II](https://leetcode.com/problems/jump-game-ii/)
* [LeetCode 132 - Palindrome Partitioning II](https://leetcode.com/problems/palindrome-partitioning-ii/)
* [LeetCode 139 - Word Break](https://leetcode.com/problems/word-break/)
* [LeetCode 140 - Word Break II](https://leetcode.com/problems/word-break-ii/)
* [LeetCode 674 - Longest Continuous Increasing Subsequence](https://leetcode.com/problems/longest-continuous-increasing-subsequence/)
* [LeetCode 300 - Longest Increasing Subsequence](https://leetcode.com/problems/longest-increasing-subsequence/)
* [LeetCode 198 - House Robber](https://leetcode.com/problems/house-robber/)
* [LeetCode 213 - House Robber II](https://leetcode.com/problems/house-robber-ii)

## 5. Game, Min-Max
* [LeetCode 486 - Predict the Winner](https://leetcode.com/problems/predict-the-winner/)
* [LeetCode 877 - Stone Game](https://leetcode.com/problems/stone-game/)

## 6. Source Files
* [Source files for Dynamic Programming on GitHub](https://github.com/jojozhuang/dsa-java/tree/master/alg-dp)
* [Dynamic Programming Diagrams(draw.io) in Google Drive](https://drive.google.com/file/d/1gp898o4dRvrV2nPVZOEfJYfijkeyjdnK/view?usp=sharing)

## 7. References
* [Introduction to Dynamic Programming 1](https://www.hackerearth.com/practice/algorithms/dynamic-programming/introduction-to-dynamic-programming-1/tutorial/)
* [Dynamic Programming](https://www.geeksforgeeks.org/dynamic-programming/)
* [How to solve a Dynamic Programming Problem ?](https://www.geeksforgeeks.org/solve-dynamic-programming-problem/)
* [Tabulation vs Memorization](https://www.geeksforgeeks.org/tabulation-vs-memoizatation/)
* [用两种方法求最长上升子序列 LeetCode 300.Longest Increasing Subsequence](https://www.youtube.com/watch?v=5rfZ4WnNKBk)
