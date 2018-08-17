---
layout: note
key: note
title: "Algorithm - Template for Subset Questions"
index: 326
category: dsa
image: /note/dsa.png
date: 2016-03-26
postdate: 2016-03-26
tags: [Algorithm, Subsets]
---

> Introduce how the Subset template comes up.

## 1. Subset
### 1.1 Subset Question
Given a set of distinct integers, nums, return all possible subsets (the power set).

Note: The solution set must not contain duplicate subsets.

Example:
```sh
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
It looks like a permutation or combination questions.

### 1.2 Solution for Array with Three Elements
To simplify the question, we assume there are only three elements in the 'nums' array. Let's see if we can solve the problem and figure out the pattern if 'nums' has more elements.
```java
public List<List<Integer>> subsetsThree(int[] nums) {
    List<List<Integer>> res = new ArrayList<List<Integer>>();
    if (nums == null) {
        return res;
    }

    Arrays.sort(nums);// not necessary, just for unit test

    // natural idea
    res.add(new ArrayList<Integer>());                  // res =  [[]]
    for (int i = 0; i < nums.length; i++) {             // i = 0
        List<Integer> list = new ArrayList<Integer>();  // list = []
        list.add(nums[i]);                              // list = [1]
        res.add(list);                                  // res =  [[],[1]]
        for (int j = i + 1; j < nums.length; j++) {     // j = 1  
            list.add(nums[j]);                          // list = [1,2]
            res.add(new ArrayList<>(list));             // res =  [[],[1],[1,2]]
            for (int k = j + 1; k < nums.length; k++) { // k = 2
                list.add(nums[k]);                      // list = [1,2,3]
                res.add(new ArrayList<>(list));         // res =  [[],[1],[1,2],[1,2,3]]
                list.remove(list.size() - 1);           // list = [1,2]
            }
            list.remove(list.size() - 1);               // list = [1]
        }
    }

    // optimize the first loop, make it use the same pattern
    res.clear();
    List<Integer> list = new ArrayList<Integer>();      // list = []
    res.add(new ArrayList<>(list));                     // res =  [[]]
    for (int i = 0; i < nums.length; i++) {             // i = 0
        list.add(nums[i]);                              // list = [1]
        res.add(new ArrayList<>(list));                 // res =  [[],[1]]
        for (int j = i + 1; j < nums.length; j++) {     // j = 1
            list.add(nums[j]);                          // list = [1,2]
            res.add(new ArrayList<>(list));             // res =  [[],[1],[1,2]]
            for (int k = j + 1; k < nums.length; k++) { // k = 2
                list.add(nums[k]);                      // list = [1,2,3]
                res.add(new ArrayList<>(list));         // res =  [[],[1],[1,2],[1,2,3]]
                list.remove(list.size() - 1);           // list = [1,2]
            }
            list.remove(list.size() - 1);               // list = [1]
        }
        list.remove(list.size() - 1);                   //
    }

    return res;
}
```
The following points needs to be noticed for the above codes.
* This solution has two approaches, both can handle the scenario that 'nums' has equal or less than 3 elements.
* The first approach comes naturally. For array, we will definitely try to use for loop to iterate it. And we want to get the subsets from small to large and from few to many. For each element, we need to create a loop. The difference is, we are moving forward. The inner loop starts from 'index + 1' of the outer loop. Notice, we need to remove the last element when return to the outer loop.
* The second approach improves the first loop. The 'list' variable is moved out the first loop. It makes easy to see the pattern now, that is, for each loop, add the current element to list, then add this list to final 'res' list. And after return back to the outer loop, remove the last element in the loop.
* The inline comments assume nums=[1,2,3] and you can see the value of 'list' and 'res' in each step.

Both approaches give the following output. Notice, the output is in sequence.
```sh
// []
// [1], [1,2], [1,2,3],[1,3]
// [2], [2,3]
// [3]
```

### 1.3 Template
Now, we see the pattern. For each loop, we have similar codes.
```java
res.add(new ArrayList<>(list));
for (int k = j + 1; k < nums.length; k++) {
    list.add(nums[k]);
    res.add(new ArrayList<>(list));
    list.remove(list.size() - 1);
}
```
We can create a method like below. This is the template.
```java
private void helper(int[] nums, int pos, List<Integer> list, List<List<Integer>> res) {
    res.add(new ArrayList<Integer>(list));

    for (int i = pos; i < nums.length; i++) {
        list.add(nums[i]);
        helper(nums, i + 1, list, res);
        list.remove(list.size() - 1);
    }
}
```

### 1.4 Final Solution
Use the template for arbitrary number of elements.
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
    res.add(new ArrayList<Integer>(list));

    for (int i = pos; i < nums.length; i++) {
        list.add(nums[i]);
        helper(nums, i + 1, list, res);
        list.remove(list.size() - 1);
    }
}
```

## 2. Similar Question
### 2.1 Subset II
What if the given 'nums' array contains duplicated elements?

Example:
```sh
Input: [1,2,2]
Output:
[
  [2],
  [1],
  [1,2,2],
  [2,2],
  [1,2],
  []
]
```
### 2.2 Analysis
If we use the solution for subset, we will get the following outputs.
```sh
// []
// [1], [1,2], [1,2,2],[1,2]
// [2], [2,2]
// [2]
```
However, the expected output should not contain any duplicated elements.
```sh
// []
// [1], [1,2], [1,2,2]
// [2], [2,2]
```
We need to remove '[1,2]' and '[2]'. At the same level iteration, we should check if duplicated value found. '[1,2]' is in the second loop, '[2]' is in the first loop.

### 2.3 Solution
Just add check before add element to list. If the current element has the same value with the previous one, ignore it.
```java
private void helper(int[] nums, int pos, List<Integer> list, List<List<Integer>> res) {
    res.add(new ArrayList<Integer>(list));

    for (int i = pos; i < nums.length; i++) {
        if (i > 0 && i != pos && nums[i] == nums[i-1]){
            continue;
        }
        list.add(nums[i]);
        helper(nums, i + 1, list, res);
        list.remove(list.size() - 1);
    }
}
```

## 3. References
* [78. Subsets on Leetcode](https://leetcode.com/problems/subsets/description/)
* [90. Subsets II](https://leetcode.com/problems/subsets-ii/description/)
