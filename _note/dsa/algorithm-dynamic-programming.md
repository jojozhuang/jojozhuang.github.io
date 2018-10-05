---
layout: note
key: note
title: "Algorithm - Dynamic Programming(Draft)"
index: 324
category: dsa
image: note/dsa.png
date: 2016-03-24
postdate: 2016-03-24
tags: [Sorting]
---

> Introduce dynamic programming.

## 1. Dynamic Programming
Types:
* Array DP
* Matrix DP
* Sequence DP


## 2. Array DP
### 2.1 Problem - Climbing Stairs
You are climbing a stair case. It takes n steps to reach to the top.

Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

Note: Given n will be a positive integer.
### 2.2 Recursive Solution
Time complexity O(2^n)
```java
// Recursion
public int climbStairs(int n) {
    if (n <= 0)
        return 0;
    if (n == 1)
        return 1;
    if (n == 2)
        return 2;

    return climbStairs(n-1) + climbStairs(n-2);
}
```
### 2.3 DP
Time: O(n), Space: O(n)
```java
// DP
public int climbStairs(int n) {
    if (n <= 0) {
        return 0;
    }
    if (n == 1) {
        return 1;
    }
    // Define function, f[i] is the count of ways to climb to level i.
    // dp[i] = dp[i-1] + dp[i-2]
    int[] dp = new int[n];
    // Initial
    dp[0] = 1;
    dp[1] = 2;
    // Calculate f[i]
    for (int i = 2; i < n; i++) {
        dp[i] = dp[i-1] + dp[i-2];
    }
    // Get result
    return dp[n - 1];
}
```
### 2.4 Constant Space
Time: O(n), Space: O(1)
```java
// Fibonacci Number
public int climbStairs(int n) {
    if (n <= 0) {
        return 0;
    }
    if (n == 1) {
        return 1;
    }
    if (n == 2) {
        return 2;
    }
    int first = 1;
    int second = 2;
    int third = 0;

    for (int i = 2; i < n; i++) {
        third = first + second;
        first = second;
        second = third;
    }

    return third;
}
```

## 3. Matrix DP
### 3.1 Problem - Unique Paths
A robot is located at the top-left corner of a `m x n` grid (marked 'Start' in the diagram below).

The robot can only move either down or right at any point in time. The robot is trying to reach the bottom-right corner of the grid (marked 'Finish' in the diagram below).

How many possible unique paths are there?
### 3.2 Solution 1
Time: O(m+n), Space: O(m*n)
```java
// space, O(m*n)
public int uniquePaths2(int m, int n) {
    if (m <= 0 || n <= 0) {
        return 0;
    }

    // Define function, f[i][j] if the count of possible path from start point
    // to point [i][j], f[i][j] = f[i][j-1] + f[i-1][j]
    int[][] f = new int[m][n];
    // Initial
    for (int i = 0; i < m; i++) {
        f[i][0] = 1;
    }
    for (int j = 0; j < n; j++) {
        f[0][j] = 1;
    }
    // Calculate f[i][j]
    for (int i = 1; i < m; i++) {
        for (int j = 1; j < n; j++) {
            f[i][j] = f[i][j - 1] + f[i - 1][j];
        }
    }

    return f[m - 1][n - 1];
}

// same time and space complex, but improve the initialization
public int uniquePaths3(int m, int n) {
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
### 3.3 Solution 2
Use array instead of the matrix. Same time complexity, but space is reduced to O(n)
```java
// space: O(n)
public int uniquePaths4(int m, int n) {
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

// no need to check first column
public int uniquePaths(int m, int n) {
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
## 4. Sequence DP

## 5. Source Files
* [Source files for Binary Search on GitHub](https://github.com/jojozhuang/DataStructure/tree/master/Algorithm)
* [Binary Search Diagrams(draw.io) in Google Drive](https://drive.google.com/file/d/1kFOgd-Xf944qt2zqupqd7-eHG7C237si/view?usp=sharing)

## 6. References
* [Dynamic Programming](https://www.geeksforgeeks.org/dynamic-programming/)
* [How to solve a Dynamic Programming Problem ?](https://www.geeksforgeeks.org/solve-dynamic-programming-problem/)
* [Tabulation vs Memorization](https://www.geeksforgeeks.org/tabulation-vs-memoizatation/)
* [LeetCode 70 - Climbing Stairs](https://leetcode.com/problems/climbing-stairs/)
* [LeetCode 70 - Climbing Stairs](https://leetcode.com/problems/climbing-stairs/)
