---
layout: tutorial
key: algorithm
title: "Algorithm - Two Sequences DP"
index: 1223
subcategory: algorithm-algorithm
date: 2016-03-28
tags: [DP]
mathjax: true
---

> Introduce dynamic programming.

## 4. Two Sequences DP
### 4.1 Longest Common Subsequence
#### 4.1.1 Problem Description
Given two strings, find the longest common subsequence (LCS). Your code should return the `length` of LCS.
```raw
Example 1:
    Input:  "ABCD" and "EDCA"
    Output:  1
    Explanation: LCS is 'A' or  'D' or 'C'.
Example 2:
    Input: "ABCD" and "EACB"
    Output:  2
    Explanation: LCS is "AC"
```
#### 4.1.2 DP Solution(n^2)
```java
// O(n^2)
public int longestCommonSubsequence(String A, String B) {
    if (A == null || A.length() == 0 || B == null || B.length() == 0) {
        return 0;
    }

    int m = A.length();
    int n = B.length();
    int[][] dp = new int[m + 1][n + 1];

    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (A.charAt(i - 1) == B.charAt(j - 1)) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }

    return dp[m][n];
}
```
* Time Complexity: $O(n^2)$
* Space Complexity: $O(n^2)$

### 4.2 Uncrossed Lines
#### 4.2.1 Problem Description
We write the integers of `A` and `B` (in the order they are given) on two separate horizontal lines. Now, we may draw connecting lines: a straight line connecting two numbers `A[i]` and `B[j]` such that:
* A[i] == B[j];
* The line we draw does not intersect any other connecting (non-horizontal) line.
* Each number can only belong to one connecting line.

Return the `maximum number` of connecting lines we can draw in this way.
```raw
Example 1:
    Input: A = [1,4,2], B = [1,2,4]
    Output:  2
    Explanation: We can draw line from A[0]=1 to B[0]=1 and line from A[1]=4 to B[2]=4. We cannot draw line
    from A[1]=4 to B[2]=4 and line from A[2]=2 to B[1]=2 at the same time because they intersect each other.
Example 2:
    Input: A = [2,5,1,2,5], B = [10,5,2,1,5,2]
    Output: 3
    Explanation: One solution is A[0]=2 -> B[2]=2, A[1]=5 to B[4]=5 and A[3]=2 to B[5]=2
Example 3:
    Input: A = [1,3,7,1,7,5], B = [1,9,2,5,1]
    Output: 2
    Explanation: One solution is A[0]=1 -> B[0]=1 and A[3]=1 to B[4]=1
```
#### 4.2.2 DP Solution(n^2)
This question is exactly same with Longest Common Sequence.
```java
// same as longest common subsequence, O(n^2)
public int maxUncrossedLines(int[] A, int[] B) {
    int m = A.length;
    int n = B.length;

    int[][] dp = new int[m + 1][n + 1];
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (A[i-1] == B[j-1]) {
                dp[i][j] = dp[i-1][j-1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
            }
        }
    }

    return dp[m][n];
}
```
* Time Complexity: $O(n^2)$
* Space Complexity: $O(n^2)$

### 4.3 Minimum Edit Distance
#### 4.3.1 Problem Description
Given two strings A and B, find the minimum number of steps required to convert A to B. (each operation is counted as 1 step.)
You have the following 3 operations permitted on a word:
* Insert a character
* Delete a character
* Replace a character

```raw
Example 1:
    Input: A="horse", B="ros"
    Output:  3
    Explanation:
      horse -> rorse (replace 'h' with 'r')
      rorse -> rose (remove 'r')
      rose -> ros (remove 'e')
Example 2:
    Input: A="intention", B="execution"
    Output:  5
    Explanation:
      intention -> inention (remove 't')
      inention -> enention (replace 'i' with 'e')
      enention -> exention (replace 'n' with 'x')
      exention -> exection (replace 'n' with 'c')
      exection -> execution (insert 'u')
```
#### 4.3.2 DP Solution(n^2)
```java
// O(n^2)
public int minDistance(String A, String B) {
    int m = A.length();
    int n = B.length();
    int[][] dp = new int[m + 1][n + 1];

    for (int i = 1; i <= m; i++) {
        dp[i][0] = i;
    }
    for (int j = 1; j <= n; j++) {
        dp[0][j] = j;
    }

    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (A.charAt(i - 1) == B.charAt(j - 1)) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                // 1) dp[i][j - 1], insert character at end of A
                // 2) dp[i - 1][j], delete A's last character
                // 3) dp[i - 1][j - 1], replace A's last character
                dp[i][j] = Math.min(Math.min(dp[i][j - 1], dp[i - 1][j]), dp[i - 1][j - 1]) + 1;
            }
        }
    }

    return dp[m][n];
}
```
* Time Complexity: $O(n^2)$
* Space Complexity: $O(n^2)$

### 4.4 Distinct Subsequences
#### 4.4.1 Problem Description
Given two strings S and T. Count the number of distinct subsequences of S which equals T.

A subsequence of a string is a new string which is formed from the original string by deleting some (can be none) of the characters without disturbing the relative positions of the remaining characters. (ie, "ACE" is a subsequence of "ABCDE" while "AEC" is not)

```raw
Example 1:
    Input: S = "rabbbit", T = "rabbit"
    Output: 3
    Explanation: You could remove any 'b' in S, so there are 3 ways to get T.

Example 2:
    Input: S = "abcd", T = ""
    Output: 1
    Explanation: There is only 1 way to get T - remove all chars in S.
```
#### 4.4.2 DP Solution(n^2)
```java
// O(n^2)
public int numDistinct(String S, String T) {
    int m = S.length();
    int n = T.length();
    int[][] dp = new int[m + 1][n + 1];

    for (int i = 0; i <= m; i++) {
        dp[i][0] = 1;
    }

    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (S.charAt(i - 1) == T.charAt(j - 1)) {
                dp[i][j] = dp[i - 1][j - 1]; // case 1: last character in T is same with that in S
            }
            dp[i][j] += dp[i-1][j]; // case 2: last character in T is not same with that in S
        }
    }

    return dp[m][n];
}
```
* Time Complexity: $O(n^2)$
* Space Complexity: $O(n^2)$

### 4.5 Interleaving String
#### 4.5.1 Problem Description
Given three strings: s1, s2, s3, determine whether s3 is formed by the interleaving of s1 and s2.

```raw
Example 1:
    Input: s1 = "aabcc", s2 = "dbbca", s3 = "aadbbcbcac"
    Output: true

Example 2:
    Input: s1 = "", s2 = "", s3 = "1"
    Output: false

Example 3:
    Input: s1 = "aabcc", s2 = "dbbca", s3 = "aadbbbaccc"
    Output: false
```
#### 4.5.2 DP Solution(n^2)
```java
// O(n^2)
public boolean isInterleave(String s1, String s2, String s3) {
    int m = s1.length();
    int n = s2.length();

    if (m + n != s3.length()) {
        return false;
    }

    boolean[][] dp = new boolean[m+1][n+1];
    dp[0][0] = true;
    for (int i = 1; i <= m; i++) {
        if (s1.charAt(i-1) == s3.charAt(i-1)) {
            dp[i][0] = true;
        } else {
            break;
        }
    }
    for (int j = 1; j <= n; j++) {
        if (s2.charAt(j-1) == s3.charAt(j-1)) {
            dp[0][j] = true;
        } else {
            break;
        }
    }

    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (s1.charAt(i - 1) == s3.charAt(i+j-1)) {
                dp[i][j] = dp[i][j] || dp[i-1][j];
            }
            if (s2.charAt(j - 1) == s3.charAt(i+j-1)) {
                dp[i][j] = dp[i][j] || dp[i][j-1];
            }
        }
    }

    return dp[m][n];
}
```
* Time Complexity: $O(n^2)$
* Space Complexity: $O(n^2)$

### 4.6 Classic Problems
* [LeetCode 1143 - Longest Common Subsequence](https://leetcode.com/problems/longest-common-subsequence/)
* [LeetCode 1035 - Uncrossed Lines](https://leetcode.com/problems/uncrossed-lines/)
* [LintCode 79 - Longest Common Substring](https://www.lintcode.com/problem/longest-common-substring)
* [LeetCode 72 - Edit Distance](https://leetcode.com/problems/edit-distance/)
* [LeetCode 115 - Distinct Subsequences](https://leetcode.com/problems/distinct-subsequences/)
* [LeetCode 97 - Interleaving String](https://leetcode.com/problems/interleaving-string/)

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
