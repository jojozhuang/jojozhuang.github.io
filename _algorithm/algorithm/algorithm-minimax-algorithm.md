---
layout: tutorial
key: algorithm
title: "Algorithm - Minimax Algorithm - Draft"
index: 1233
subcategory: algorithm-algorithm
date: 2016-03-31
tags: [Minimax]
draft: true
---

> Implement Minimax algorithm.

## 1. Problem - Predict the Winner
### 1.1 Problem Description
Given an array of scores that are non-negative integers. Player 1 picks one of the numbers from either end of the array followed by the player 2 and then player 1 and so on. Each time a player picks a number, that number will not be available for the next player. This continues until all the scores have been chosen. The player with the maximum score wins.

Given an array of scores, predict whether player 1 is the winner. You can assume each player plays to maximize his score.

```raw
Example 1:
Input: [1, 5, 2]
Output: False
Explanation: Initially, player 1 can choose between 1 and 2. If he chooses 2 (or 1), then player 2 can choose
from 1 (or 2) and 5. If player 2 chooses 5, then player 1 will be left with 1 (or 2). So, final score of
player 1 is 1 + 2 = 3, and player 2 is 5. Hence, player 1 will never be the winner and you need to return False.

Example 2:
Input: [1, 5, 233, 7]
Output: True
Explanation: Player 1 first chooses 1. Then player 2 have to choose between 5 and 7. No matter which number
player 2 choose, player 1 can choose 233. Finally, player 1 has more score (234) than player 2 (12), so
you need to return True representing player1 can win.
```
### 1.2 Diagram
List all possible results
### 1.3 Recursion Solution
```java
// recursion, O(2^n)
public boolean PredictTheWinner(int[] nums) {
    if (nums.length == 1) {
        return true;
    }

    return helper(nums, 0, nums.length - 1) >= 0;
}

// maximum diff score(my_score - op_score) can be obtained
private int helper(int[] nums, int left, int right) {
    if (l == r) {
        return nums[l];
    }

    return Math.max(
            nums[left] - helper(nums, left + 1, right),
            nums[right] - helper(nums, left, right - 1));
}
```

## 7. References
* [Leetcode - 843. Guess the Word](https://leetcode.com/problems/guess-the-word/)
* [What is the Minimax Algorithm? at Youtube](https://www.youtube.com/watch?v=KU9Ch59-4vw)
