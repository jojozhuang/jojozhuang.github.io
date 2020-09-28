---
layout: tutorial
key: algorithm
title: "Algorithm - Templates"
index: 1301
subcategory: algorithm-overview
date: 2016-04-02
tags: [Algorithm]
---

> Templates for algorithms solutions.

## 1. Templates
### 1.1 Recursion Template
Four steps:
1. recursion terminator
2. process logic in current level
3. drill down
4. reverse the status in the current level if necessary

Pseudo code example:
```java
// pseudo code
public void recursion(int level, int param) {
    // recursion terminator
    if (level > MAX_LEVEL) {
        // process result and quit
        return;
    }

    // process logic in current level
    process(level, data);

    // drill down, call the same function for next level
    recursion(level + 1, param, data);

    // reverse the status in the current level if necessary
}
```
### 1.1 Defining Customized Comparator
```java
private class IntervalComparator implements Comparator<Interval> {
    public int compare(Interval i1, Interval i2) {
        return i1.start - i2.start;
    }
}
// three return values
// -1, i1 < i2
// 0, i1 = i2
// 1, i1 > i2
```
Usage.
```java
Collections.sort(intervals, new IntervalComparator());

// lamda expression
Collections.sort(intervals, (a, b) -> a.start - b.start);
```
More conditions
```java
private class IntervalComparator implements Comparator<Interval> {
    public int compare(Interval a, Interval b) {
        if (a.start == b.start) {
            return a.end - b.end;
        } else {
            return a.start - b.start;
        }
    }
}
Collections.sort(intervals, new IntervalComparator());
// equivalent to one line lamda expression
Arrays.sort(intervals, (a,b)->(a.start == b.start ? a.end - b.end : a.start - b.start));
```
`The comparison only works for integer, not for double type.`
### 1.2 Sorting Array by Another Array's Value.
```java
Integer[] index = new Integer[nums.length];
for (int i = 0; i < nums.length; i++) {
    index[i] = i;
}

Arrays.sort(index, new Comparator<Integer>() {
    public int compare(Integer i1, Integer i2) {
        return nums[i2] - nums[i1];
    }
});
```
* Example Problem - [Leetcode 506. Relative Ranks](https://leetcode.com/problems/relative-ranks/)

### 1.3 Binary Search
```java
int start = 0;
int end = nums.length - 1;

while (start < end) {
    int mid = (start + end) / 2;
    if (nums[mid] == target) {
        return mid;
    } else if (nums[mid] < target) {
        start = mid;
    } else {
        end = mid;
    }
}
```
Optimized Version.
```java
int start = 0;
int end = nums.length - 1;

while (start + 1 < end) { // avoid infinite loop, need to check nums[start] and nums[end] after the while loop
    int mid = start + (end - start) / 2; // avoid overflow, assuming start is not negative and end is not very large positive.
    if (nums[mid] == target) {
        return mid;
    } else if (nums[mid] < target) {
        start = mid;
    } else {
        end = mid;
    }
}
```
* Example Problem - [162. Find Peak Element](https://leetcode.com/problems/find-peak-element/)

### 1.4 Direction Array used in Grid Traversal, DFS & BFS.  
```java
int[] dr = new int[]{-1, 0, 1, 0};
int[] dc = new int[]{0, -1, 0, 1};

// A is a given matrix
int m = A.length;
int n = A[0].length;
for (int i = 0; i < 4; i++) {
    int r = pos[0] + dr[i];
    int c = pos[1] + dc[i];
    if (r < 0 || r >= m || c < 0 || c >= n) {
        continue;
    }

    if (A[r][c] == 1) {
        // code here
    }
}
```
### 1.5 Subset
```java
public List<List<Integer>> subsets(int[] nums) {
    List<List<Integer>> res = new ArrayList<List<Integer>>();
    if (nums == null) {
        return res;
    }

    Arrays.sort(nums);// not necessary, just for unit test

    List<Integer> list = new ArrayList<Integer>();
    helper(nums, 0, list, res);
    return res;
}

private void helper(int[] nums, int pos, List<Integer> list, List<List<Integer>> res) {
    res.add(new ArrayList<Integer>(list)); // when adding it to the result depends on requirement

    for (int i = pos; i < nums.length; i++) {
        list.add(nums[i]);
        helper(nums, i + 1, list, res); // whether need to append 1 depends on requirement
        list.remove(list.size() - 1);
    }
}
```
* Example Problem - [LeetCode 78. Subsets](https://leetcode.com/problems/subsets/)
