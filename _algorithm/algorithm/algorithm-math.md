---
layout: tutorial
key: algorithm
title: "Algorithm - Math"
index: 1241
subcategory: algorithm-algorithm
date: 2020-03-21
tags: [String, Array]
draft: true
---

> Common approaches for solving string and array problems

## 1. Two City Scheduling
### 1.1 Question
A company is planning to interview 2n people. Given the array costs where costs[i] = [aCosti, bCosti], the cost of flying the ith person to city a is aCosti, and the cost of flying the ith person to city b is bCosti.

Return the minimum cost to fly every person to a city such that exactly n people arrive in each city.

Example 1:
```raw
Input: costs = [[10,20],[30,200],[400,50],[30,20]]
Output: 110
Explanation:
The first person goes to city A for a cost of 10.
The second person goes to city A for a cost of 30.
The third person goes to city B for a cost of 50.
The fourth person goes to city B for a cost of 20.

The total minimum cost is 10 + 30 + 50 + 20 = 110 to have half the people interviewing in each city.
```
Example 2:
```raw
Input: costs = [[259,770],[448,54],[926,667],[184,139],[840,118],[577,469]]
Output: 1859
```
Example 3:
```raw
Input: costs = [[515,563],[451,713],[537,709],[343,819],[855,779],[457,60],[650,359],[631,42]]
Output: 3086
```

Constraints:
* 2n == costs.length
* 2 <= costs.length <= 100
* costs.length is even.
* 1 <= aCosti, bCosti <= 1000

### 1.2 Solution 1
```java
public int twoCitySchedCost(int[][] costs) {
    int n = costs.length;
    List<int[]> list1 = new ArrayList<>();
    List<int[]> list2 = new ArrayList<>();
    for (int[] cost : costs) {
        if (cost[0] < cost[1]) {
            list1.add(cost);
        } else {
            list2.add(cost);
        }
    }

    int sum = 0;
    if (list1.size() < list2.size()) {
        Collections.sort(list2, (a, b) -> (a[0] - a[1]) - (b[0] - b[1]));

        for (int[] cost : list1) {
            sum += cost[0];
        }
        int i = 0;
        for (int[] cost : list2) {
            if (i < n / 2 - list1.size()) {
                sum += cost[0];
            } else {
                sum += cost[1];
            }
            i++;
        }
    } else if (list1.size() > list2.size()) {
        Collections.sort(list1, (a, b) -> (a[1] - a[0]) - (b[1] - b[0]));

        for (int[] cost : list2) {
            sum += cost[1];
        }
        int i = 0;
        for (int[] cost : list1) {
            if (i < n / 2 - list2.size()) {
                sum += cost[1];
            } else {
                sum += cost[0];
            }
            i++;
        }
    } else {
        for (int[] cost : list1) {
            sum += cost[0];
        }
        for (int[] cost : list2) {
            sum += cost[1];
        }
    }

    return sum;
}
```
### 1.2 Solution 2
Suppose we have two city costs [a, b] and [c, d], if we select `a` to make the cost minimal, then a + d < b + c => a - b < c - d. So we can sort the cost list by its difference, then pick up the first one for left half of the array and pick up the second one for the right half of the array.
```java
public int twoCitySchedCost(int[][] costs) {
    Arrays.sort(costs, (a, b) -> {
       return (a[0]-a[1]) - (b[0]-b[1]);
    });

    int cost = 0;
    for (int i = 0; i < costs.length; i++) {
        if (i < costs.length / 2) {
            cost += costs[i][0];
        } else {
            cost += costs[i][1];
        }
    }

    return cost;
}
```

## 2. References
* [1029. Two City Scheduling](https://leetcode.com/problems/two-city-scheduling/)
* [1895. Arrange interview city](https://www.lintcode.com/problem/arrange-interview-city/description)
