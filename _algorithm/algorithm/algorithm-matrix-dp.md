---
layout: tutorial
key: algorithm
title: "Algorithm - Matrix DP"
index: 1224
subcategory: algorithm-algorithm
date: 2016-03-28
tags: [DP]
mathjax: true
---

> Introduce dynamic programming.

Minimum Path Sum     
* Follow up: print the path?

## 2. Matrix DP
### 2.1 Unique Paths
#### 2.1.1 Problem Description
A robot is located at the top-left corner of a `m x n` grid (marked 'Start' in the diagram below). The robot can only move either down or right at any point in time. The robot is trying to reach the bottom-right corner of the grid (marked 'Finish' in the diagram below). How many possible unique paths are there?
![image](/assets/images/algorithm/1221/robot.png){:width="500px"}  
#### 2.1.2 Solution with Matrix(Two-dimensional array)
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

#### 2.1.3 Solution with One-dimensional Array
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

### 2.2 Define Matrix with Larger Size
When to define a dp matrix with `m+1` and `n+1`? see question [LeetCode 221 - Maximal Square](https://leetcode.com/problems/maximal-square).

### 2.3 Classic Problems
* [LeetCode 62 - Unique Paths](https://leetcode.com/problems/unique-paths/)
* [LeetCode 64 - Minimum Path Sum](https://leetcode.com/problems/minimum-path-sum/)
* [LeetCode 221 - Maximal Square](https://leetcode.com/problems/maximal-square)

## 6. Source Files
* [Source files for Dynamic Programming on GitHub](https://github.com/jojozhuang/dsa-java/tree/master/alg-dp)
* [Dynamic Programming Diagrams(draw.io) in Google Drive](https://drive.google.com/file/d/1gp898o4dRvrV2nPVZOEfJYfijkeyjdnK/view?usp=sharing)

## 7. References
* [Introduction to Dynamic Programming 1](https://www.hackerearth.com/practice/algorithms/dynamic-programming/introduction-to-dynamic-programming-1/tutorial/)
* [Dynamic Programming](https://www.geeksforgeeks.org/dynamic-programming/)
* [How to solve a Dynamic Programming Problem ?](https://www.geeksforgeeks.org/solve-dynamic-programming-problem/)
* [Tabulation vs Memorization](https://www.geeksforgeeks.org/tabulation-vs-memoizatation/)
* [用两种方法求最长上升子序列 LeetCode 300.Longest Increasing Subsequence](https://www.youtube.com/watch?v=5rfZ4WnNKBk)
