---
layout: tutorial
key: popular
title: "Algorithm - Knapsack Problems"
index: 1222
subcategory: algorithm
date: 2016-03-28
tags: [Knapsack, Backpack]
mathjax: true
---

> Knapsack1, Knapsack2.

## 1. Knapsack Problem 1 - Capacity only
Given `n` items with size A[i] for i-th item, and an integer `m` denotes the capacity of a backpack. How full you can fill this backpack? Maximize the **total size** that the knapsack can be filled. Each item can be use 0 or 1 time.
```raw
Example 1:
    Input:  [3,4,8,5], knapsack capacity=10
    Output:  9

Example 2:
    Input:  [2,3,5,7], knapsack capacity=12
    Output:  12
```
### 1.1 Solution with Two Dimensional Array
```java
public int knapsack(int[] A, int m) {
    boolean[][] dp = new boolean[A.length + 1][m + 1];
    dp[0][0] = true;

    for (int i = 1; i <= A.length; i++) {
        for (int j = 0; j <= m; j++) {
            if (j - A[i-1] >= 0 && dp[i-1][j - A[i-1]]) {
                dp[i][j] = true;
            } else {
                dp[i][j] = dp[i - 1][j];
            }
        }
    }

    for (int i = m; i >= 0; i--) {
        if (dp[A.length][i]) {
            return i;
        }
    }

    return 0;
}
```
* Time Complexity: O(n*m)
* Space Complexity: O(n*m)

Values of the dp array for input A=[3,4,8,5] and m=10. The answer is 9 and the selected items are 4 and 5.

Item\\Size | 0    | 1     |  2    | 3     | 4     | 5     | 6     | 7     | 8     | 9     |   10
-----------|------|-------|-------|-------|-------|-------|-------|-------|-------|-------|------
0          | true | false | false | false | false | false | false | false | false | false | false
3          | true | false | false | true  | false | false | false | false | false | false | false
4          | true | false | false | true  | true  | false | false | true  | false | false | false
8          | true | false | false | true  | true  | false | false | true  | true  | false | false
5          | true | false | false | true  | true  | true  | false | true  | true  | true  | false

### 1.2 Solution with Two One-dimensional Arrays
The above solution can be optimized with two rotated arrays.
```java
public int knapsack2(int[] A, int m) {
    boolean[] dp = new boolean[m + 1];
    boolean[] dp2 = new boolean[m + 1];
    dp[0] = true;
    dp2[0] = true;

    for (int i = 1; i <= A.length; i++) {
        for (int j = 0; j <= m; j++) {
            if (j - A[i-1] >= 0 && dp2[j - A[i-1]]) {
                dp[j] = true;
            } else {
                dp[j] = dp2[j];
            }
        }
        dp2 = dp.clone();
    }

    for (int i = m; i >= 0; i--) {
        if (dp[i]) {
            return i;
        }
    }

    return 0;
}
```
* Time Complexity: O(n*m)
* Space Complexity: O(2m)->O(m)

### 1.3 Solution with One One-dimensional Array
```java
public int knapsack(int[] A, int m) {
    // maximum weight can be filled for the every capacity
    int[] dp = new int[m + 1];

    for (int i = 0; i < A.length; i++) {
        for (int j = m; j >= A[i]; j--) {
            dp[j] = Math.max(dp[j], dp[j - A[i]] + A[i]);
        }
    }

    return dp[m];
}
```
* Time Complexity: O(n*m)
* Space Complexity: O(m)

Values of the dp array for each iteration(i-th) for input A=[3,4,8,5] and m=10. The answer is 9 and the selected items are 4 and 5.

i\\Size | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
--------|---|---|---|---|---|---|---|---|---|---|----
0(3)    | 0 | 0 | 0 | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 3
1(4)    | 0 | 0 | 0 | 3 | 4 | 4 | 4 | 7 | 7 | 7 | 7
2(8)    | 0 | 0 | 0 | 3 | 4 | 4 | 4 | 7 | 8 | 8 | 8
3(5)    | 0 | 0 | 0 | 3 | 4 | 5 | 5 | 7 | 8 | 9 | 9

### 1.4 Summary of Knapsack Problems
* Generally, we need to create a two dimensional array. The first dimension represents the elements and the second represents the size of knapsack.
* For each dimension of the DP array, we need one more larger size(`n+1` and `m+1`), because we need to handle the special cases that no items fills the knapsack and items fills zero-size knapsack.
* The result is in the last row and last column(Need to search from end).

## 2. Knapsack Problem 2 - Capacity + Value
There are `n` items and a backpack with size `m`. Given array `A` representing the size of each item and array `V` representing the value of each item. What's the maximum value can you put into the backpack? Maximize the **total value**. Each item can be use 0 or 1 time.
```raw
Example 1:
    Input:  A=[1, 1, 2, 2], V=[1, 3, 4, 5], knapsack capacity=4
    Output:  9
    Explanation: Select item 1,2,4 or 3,4.
```
Solution:
```java
public int knapsack(int[] A, int[] V, int m) {
    // Max value achieved by using the first i items and total weight is exact j.
    int[][] dp = new int[A.length + 1][m + 1];

    for (int i = 0; i <= A.length; i++) {
        dp[i][0] = 0;
    }
    for (int j = 0; j <= m; j++) {
        dp[0][j] = 0;
    }

    for (int i = 1; i <= A.length; i++) {
        for (int j = 1; j <= m; j++) {
            if (j - A[i-1] >= 0) {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - A[i - 1]] + V[i - 1]);
            } else {
                dp[i][j] = dp[i - 1][j];
            }
        }
    }

    return dp[A.length][m];
}
```

Values of the dp array for each iteration(i-th) for input A=[1,1,2,2], V=[1,3,4,5] and m=4. The answer is 9 and the selected items are 2(4) and 2(5).

i\size | 0 | 1 | 2 | 3 | 4
-------|---|---|---|---|---
0      | 0 | 0 | 0 | 0 | 0
1      | 0 | 1 | 1 | 1 | 1
2      | 0 | 3 | 4 | 4 | 4
3      | 0 | 3 | 4 | 7 | 8
4      | 0 | 3 | 5 | 8 | 9

## 3. Coin Change
You are given coins of different denominations and a total amount of money amount. Write a function to compute the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.

```raw
Example 1:

Input: coins = [1, 2, 5], amount = 11
Output: 3
Explanation: 11 = 5 + 5 + 1
Example 2:

Input: coins = [2], amount = 3
Output: -1
```

```java
public int coinChange(int[] coins, int amount) {
    if (coins == null || coins.length == 0) {
        return -1;
    }

    int[] dp = new int[amount + 1];
    Arrays.fill(dp, Integer.MAX_VALUE);
    dp[0] = 0;
    for (int i = 0; i < coins.length; i++) {
        for (int j = coins[i]; j <= amount; j++) {
            if (dp[j - coins[i]] != Integer.MAX_VALUE) {
                dp[j] = Math.min(dp[j], dp[j - coins[i]] + 1);
            }
        }
    }

    return dp[amount] == Integer.MAX_VALUE ? -1: dp[amount];
}
```
## 3. Classic Problems
* [LintCode 92 - Backpack](https://www.lintcode.com/problem/backpack/)
* [LintCode 91 - Minimum Adjustment Cost](https://www.lintcode.com/problem/minimum-adjustment-cost)

## 4. Source Files
* [Source files for Knapsack Problems on GitHub](https://github.com/jojozhuang/dsa-java/tree/master/alg-knapsack)
* [Dynamic Programming Diagrams(draw.io) in Google Drive](https://drive.google.com/file/d/1gp898o4dRvrV2nPVZOEfJYfijkeyjdnK/view?usp=sharing)

## 5. References
* [0-1 Knapsack Problem 0-1背包问题](https://zxi.mytechroad.com/blog/sp/knapsack-problem/)
* [花花酱 0-1 Knapsack Problem 01背包问题 - 刷题找工作 SP10](https://www.youtube.com/watch?v=CO0r6kcwHUU)
* [Backpack solution](https://www.jiuzhang.com/solution/backpack/)
* [Backpack II solution](https://www.jiuzhang.com/solutions/backpack-ii/)
* [FLAG Offer之路专题-背包问题 01](https://www.youtube.com/watch?v=O31ULJTv-zw&list=PL5Eeqoo6exqUUUvT-S1ZF6S__9B4b8VZ0)
