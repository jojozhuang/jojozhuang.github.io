---
layout: tutorial
key: algorithm
title: "Algorithm - Combination and Permutation"
index: 1215
subcategory: algorithm-algorithm
date: 2016-03-27
tags: [Combination, Permutation, Subset]
---

> Implement DFS for combination, permutation and subset.

## 1. Combination
### 1.1 Description
Given two integers `n` and `k`, return all possible combinations of `k` numbers out of 1 ... n.

Example:
```raw
Input: n = 4, k = 2
Output:
[
  [2,4],
  [3,4],
  [2,3],
  [1,2],
  [1,3],
  [1,4],
]
```
### 1.2 DFS Implementation
```java
public List<List<Integer>> combine(int n, int k) {
    List<List<Integer>> ans = new ArrayList<>();
    if (n <= 0 || k <= 0 || n < k) {
        return ans;
    }

    List<Integer> list = new ArrayList<Integer>();
    dfs(n, k, 1, list, ans);

    return ans;
}

private void dfs(int n, int k, int pos, List<Integer> list, List<List<Integer>> ans) {
    if (list.size() == k) {
        ans.add(new ArrayList<Integer>(list));
        return;
    }

    for(int i = pos; i <= n; i++) {
        list.add(i);
        dfs(n, k, i + 1, list, ans);
        list.remove(list.size() - 1);
    }
}
```
## 2. Permutation
### 2.1 Description
Given a collection of distinct integers, return all possible permutations.

Example:
```raw
Input: [1,2,3]
Output:
[
  [1,2,3],
  [1,3,2],
  [2,1,3],
  [2,3,1],
  [3,1,2],
  [3,2,1]
]
```
### 2.2 DFS
```java
public List<List<Integer>> permute(int[] nums) {
    List<List<Integer>> ans = new ArrayList<>();
    if (nums == null || nums.length == 0) {
        return ans;
    }

    boolean[] visited = new boolean[nums.length];
    dfs(nums, visited, new ArrayList<>(), ans);
    return ans;
}

private void dfs(int[] nums, boolean[] visited, List<Integer> list, List<List<Integer>> ans) {
    if (list.size() == nums.length) {
        ans.add(new ArrayList<>(list));
        return;
    }

    for (int i = 0; i < nums.length; i++) {
        if (visited[i]) {
            continue;
        }
        visited[i] = true;
        list.add(nums[i]);
        dfs(nums, visited, list, ans);
        list.remove(list.size() - 1);
        visited[i] = false;
    }
}
```
## 3. Subsets
### 3.1 Description
Given a set of distinct integers, nums, return all possible subsets (the power set).

Note: The solution set must not contain duplicate subsets.

Example:
```raw
Input: nums = [1,2,3]
Output:
[
  [3],
  [1],
  [2],
  [1,2,3],
  [1,3],
  [2,3],
  [1,2],
  []
]
```
### 3.2 DFS
```java
public List<List<Integer>> subsets(int[] nums) {
    List<List<Integer>> ans = new ArrayList<>();
    if (nums == null || nums.length == 0) {
        return ans;
    }

    //Arrays.sort(nums); // not necessary, just for unit test
    dfs(nums, 0, new ArrayList<>(), ans);

    return ans;
}

private void dfs(int[] nums, int pos, List<Integer> list, List<List<Integer>> ans) {
    ans.add(new ArrayList<>(list));

    for (int i = pos; i < nums.length; i++) {
        list.add(nums[i]);
        dfs(nums, i + 1, list, ans);
        list.remove(list.size() - 1);
    }
}
```

## 4. Summary
* Combinations: need to use `pos`, no for loop in the main function.
* Permutations: no need to use `pos`, use `visited` array to store which numbers are used, no for loop in the main function.
* Subsets: need to use `pos`, no for loop in the main function.

## 5. Classic Problems
* [LeetCode 77 - Combinations](https://leetcode.com/problems/combinations/)
* [LeetCode 39 - Combination Sum](https://leetcode.com/problems/combination-sum/)
* [LeetCode 40 - Combination Sum II](https://leetcode.com/problems/combination-sum-ii/)
* [LeetCode 216 - Combination Sum III](https://leetcode.com/problems/combination-sum-iii/)
* [LeetCode 46 - Permutations](https://leetcode.com/problems/permutations/)
* [LeetCode 78. Subsets](https://leetcode.com/problems/subsets/)

## 6. References
* [花花酱 LeetCode 78. Subsets - 刷题找工作 EP236](https://www.youtube.com/watch?v=CUzm-buvH_8)
