---
layout: tutorial
key: popular
title: "Dynamic Programming"
index: 1221
category: algorithm
breadcrumb: [Popular, General, Algorithm]
image: dsa.png
date: 2016-03-28
postdate: 2016-03-28
tags: [DP]
mathjax: true
---

> Introduce dynamic programming.

## 1. Dynamic Programming
### 1.1 When to use DP?
* Maximum/Minimum
* Yes/No
* Count(\*)
* Can't sort or swap

### 1.2 DP Types
* Matrix DP (10%)
* Sequence DP (40%)
* Two Sequences DP (40%)
* Backpack (10%)

### 1.3 Implementation of DP
* Memorization Search(Drawback: extra space)
* Loop

## 2. Matrix DP
### 2.1 Problem - Unique Paths
A robot is located at the top-left corner of a `m x n` grid (marked 'Start' in the diagram below). The robot can only move either down or right at any point in time. The robot is trying to reach the bottom-right corner of the grid (marked 'Finish' in the diagram below). How many possible unique paths are there?
![image](/public/images/dsa/1221/robot.png){:width="500px"}  
### 2.2 Solution with Matrix(Two-dimensional array)
```java
// time: O(m*n), space: O(m*n)
public int uniquePathMatrix(int m, int n) {
    if (m <= 0 || n <= 0) {
        return 0;
    }

    int[][] dp = new int[m][n];
    // Initialization
    for (int i = 0; i < m; i++) {
        dp[i][0] = 1;
    }
    for (int j = 0; j < n; j++) {
        dp[0][j] = 1;
    }
    // Calculate dp[i][j]
    for (int i = 1; i < m; i++) {
        for (int j = 1; j < n; j++) {
            dp[i][j] = dp[i][j - 1] + dp[i - 1][j];
        }
    }

    return dp[m - 1][n - 1];
}

// time: O(m*n), space: O(m*n), without separated initialization
public int uniquePathMatrix2(int m, int n) {
    if (m <= 0 || n <= 0) {
        return 0;
    }

    int[][] dp = new int[m][n];
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            if (i == 0 || j == 0) {
                dp[i][j] = 1;
            } else {
                dp[i][j] = dp[i][j - 1] + dp[i - 1][j];
            }
        }
    }

    return dp[m - 1][n - 1];
}
```
* Time complexity: $O(m*n)$
* Space complexity: $O(m*n)$

### 2.3 Solution with One-dimensional Array
Use one-dimensional array instead of the matrix. Same time complexity, but space is reduced to $O(n)$.
```java
// time: O(m*n), space: O(n)
public int uniquePathArray(int m, int n) {
    if (m <= 0 || n <= 0) {
        return 0;
    }

    int[] dp = new int[n];
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            if (j == 0) {
                dp[j] = 1;
            } else {
                dp[j] = dp[j] + dp[j - 1];
            }
        }
    }

    return dp[n - 1];
}

// time: O(m*n), space: O(n), without checking the first column
public int uniquePath(int m, int n) {
    if (m <= 0 || n <= 0) {
        return 0;
    }

    int[] dp = new int[n];
    dp[0] = 1;
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            if (j > 0) {
                dp[j] = dp[j] + dp[j - 1];
            }
        }
    }

    return dp[n - 1];
}
```
* Time complexity: $O(m*n)$
* Space complexity: $O(n)$

### 2.4 Classic Problems
* [LeetCode 62 - Unique Paths](https://leetcode.com/problems/unique-paths/)
* [LeetCode 64 - Minimum Path Sum](https://leetcode.com/problems/minimum-path-sum/)
* [LeetCode 221 - Maximal Square](https://leetcode.com/problems/maximal-square)

## 3. Sequence DP
### 3.1 Problem - Fibonacci Numbers
Fibonacci Numbers are 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, ... Now, given an integer N(N >= 0), return the Nth Fibonacci number.
### 3.2 Recursive Solution
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

### 3.3 DP Solution
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

### 3.4 Solution with Constant Space
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

## 4. Game, Min-Max
* [LeetCode 486 - Predict the Winner](https://leetcode.com/problems/predict-the-winner/)
* [LeetCode 877 - Stone Game](https://leetcode.com/problems/stone-game/)

### 4.5 Classic Problems
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

## 5. Two Sequences DP
### 5.4 Classic Problems
* [LintCode 77 - Longest Common Subsequence](https://www.lintcode.com/problem/longest-common-subsequence)
* [LintCode 79 - Longest Common Substring](https://www.lintcode.com/problem/longest-common-substring)
* [LeetCode 72 - Edit Distance](https://leetcode.com/problems/edit-distance/)
* [LeetCode 115 - Distinct Subsequences](https://leetcode.com/problems/distinct-subsequences/)
* [LeetCode 97 - Interleaving String](https://leetcode.com/problems/interleaving-string/)

## 6. Backpack
### 6.4 Classic Problems
* [LintCode 92 - Backpack](https://www.lintcode.com/problem/backpack/)
* [LintCode 91 - Minimum Adjustment Cost](https://www.lintcode.com/problem/minimum-adjustment-cost)

## 7. Source Files
* [Source files for Dynamic Programming on GitHub](https://github.com/jojozhuang/dsa-java/tree/master/alg-dp)
* [Dynamic Programming Diagrams(draw.io) in Google Drive](https://drive.google.com/file/d/1gp898o4dRvrV2nPVZOEfJYfijkeyjdnK/view?usp=sharing)

## 8. References
* [Introduction to Dynamic Programming 1](https://www.hackerearth.com/practice/algorithms/dynamic-programming/introduction-to-dynamic-programming-1/tutorial/)
* [Dynamic Programming](https://www.geeksforgeeks.org/dynamic-programming/)
* [How to solve a Dynamic Programming Problem ?](https://www.geeksforgeeks.org/solve-dynamic-programming-problem/)
* [Tabulation vs Memorization](https://www.geeksforgeeks.org/tabulation-vs-memoizatation/)
