---
layout: tutorial
key: popular
title: "Algorithm - Backpack Problems"
index: 1222
subcategory: algorithm
date: 2016-03-28
tags: [DP]
mathjax: true
---

> Backpack1, Backpack2.

## 1. Backpack Problem 1 - Capacity only
Given N items, `A[i]` is the weight of the i-th item. And given a backpack with capacity `w`, maximize the **total weight** that the backpack can be filled. Each item can be use 0 or 1 time.
```sh
Example 1:
    Input:  [3,4,8,5], backpack capacity=10
    Output:  9

Example 2:
    Input:  [2,3,5,7], backpack capacity=12
    Output:  12
```
Solution:
```java
public int backPack(int[] A, int w) {
    // maximum weight can be filled for the every capacity
    int[] dp = new int[w + 1];

    for (int i = 0; i < A.length; i++) {
        for (int j = w; j >= A[i]; j--) {
            dp[j] = Math.max(dp[j], dp[j - A[i]] + A[i]);
        }
    }
    return dp[w];
}
```

## 2. Backpack Problem 2 - Capacity + Value
Given N items, `A[i]` is the weight of the i-th item and `V[i]` is the value of the i-th item. Given a backpack with capacity `w`, maximize the **total value**. Each item can be use 0 or 1 time.
```sh
Example 1:
    Input:  A=[1, 1, 2, 2], V=[1, 3, 4, 5], backpack capacity=4
    Output:  9
    Explanation: Select item 1,2,4 or 3,4.
```
Solution:
```java
public int backPack(int[] A, int[] V, int w) {
    // Max value achieved by using the first i items and total weight is exact j.
    int[][] dp = new int[A.length + 1][w + 1];

    for (int i = 0; i <= A.length; i++) {
        for (int j = 0; j <= w; j++) {
            if (i == 0 || j == 0) {
                dp[i][j] = 0;
            } else if (A[i - 1] <= j)
                dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - A[i - 1]] + V[i - 1]);
            else {
                dp[i][j] = dp[i - 1][j];
            }
        }
    }

    return dp[A.length][w];
}
```
## 3. Coin Change
You are given coins of different denominations and a total amount of money amount. Write a function to compute the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.

```sh
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
* [Source files for Dynamic Programming on GitHub](https://github.com/jojozhuang/dsa-java/tree/master/alg-dp)
* [Dynamic Programming Diagrams(draw.io) in Google Drive](https://drive.google.com/file/d/1gp898o4dRvrV2nPVZOEfJYfijkeyjdnK/view?usp=sharing)

## 5. References
* [0-1 Knapsack Problem 0-1背包问题](https://zxi.mytechroad.com/blog/sp/knapsack-problem/)
* [花花酱 0-1 Knapsack Problem 01背包问题 - 刷题找工作 SP10](https://www.youtube.com/watch?v=CO0r6kcwHUU)
* [Backpack solution](https://www.jiuzhang.com/solution/backpack/)
* [Backpack II solution](https://www.jiuzhang.com/solutions/backpack-ii/)
