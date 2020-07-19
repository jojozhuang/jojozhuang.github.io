---
layout: tutorial
key: algorithm
title: "Data Structure - Monotonic Queue"
index: 1118
subcategory: data-structure
date: 2016-03-20
tags: [Monotonic Queue]
mathjax: true
---

> Implement monotonic queue.

## 1. What is Monotonic Queue?
`Monotonic queue` is a data structure where the order of the elements is **strictly increasing** or **strictly decreasing**. For example a strictly increasing monotonic queue will be able to contain `[1, 3, 5, 6, 7]`, but not `[1, 1, 3, 5]` and `[2, 1, 4, 5]` as the elements are not strictly increasing (`1, 1` is not strictly increasing, and `2, 1` is decreasing).

There are two types of monotonic queue, increasing or decreasing queue.
* Monotonic increasing queue: to push an element e, starts from the rear element, we pop out element s≥e(violation);
* Monotonic decreasing queue: we pop out element s<=e (violation).
* Sometimes, we can relax the strict monotonic condition, and can allow the stack or queue have duplicate value.

To get the feature of the monotonic queue, with [5, 3, 1, 2, 4] as example.

 Index | Value | Increasing queue  | Decreasing queue
-------|-------|-------------------|--------------------
 1     | 5     | [5]               | [5]
 2     | 3     | [3] 3 kick out 5  | [5, 3] #3->5
 3     | 1     | [1] 1 kick out 3  | [5, 3, 1] #1->3
 4     | 2     | [1, 2] #2->1      | [5, 3, 2] 2 kick out 1 #2->3
 5     | 4     | [1, 2, 4] #4->2   | [5,4] 4 kick out 2, 3 #4->2


## 2. Question of First Smaller Element
Find the first element smaller than current either in the left or in the right.

For example, given array **[5,3,1,2,4]**:
* The answer to the first element smaller than current in **left** is [-1,-1,-1,1,2].
* The answer to the first element smaller than current in **right** is [3,1,-1,-1,-1].

### 2.1 Naive Solution
We can find the smaller element in brute force way. Use one for loop to point at the current element, and another embedding for loop to look for the first element that is smaller than the current, which gives us $O(n^2)$ time complexity.
```java
// input:  [ 5, 3,  1, 2, 4]
// output: [-1,-1, -1, 1, 2]
// O(n^2)
public int[] firstSmallerLeft(int[] nums) {
    int[] ans = new int[nums.length];
    for (int i = 0; i < nums.length; i++) {
        ans[i] = -1;
        int curr = nums[i];
        for (int j = i - 1; j >=0; j--) { // scan from head
            if (nums[j] < curr) {
                ans[i] = nums[j];
                break;
            }
        }
    }

    return ans;
}

// input:  [5, 3,  1,  2,  4]
// output: [3, 1, -1, -1, -1]
// O(n^2)
public int[] firstSmallerRight(int[] nums) {
    int[] ans = new int[nums.length];
    for (int i = 0; i < nums.length; i++) {
        ans[i] = -1;
        int curr = nums[i];
        for (int j = i + 1; j < nums.length; j++) { // scan from tail
            if (nums[j] < curr) {
                ans[i] = nums[j];
                break;
            }
        }
    }

    return ans;
}
```
### 2.2 Solution with Stack
We can use stack with better performance, the time complexity is $O(n)$.
```java
// input:  [ 5, 3,  1, 2, 4]
// output: [-1,-1, -1, 1, 2]
// O(n)
public int[] firstSmallerLeft(int[] nums) {
    int[] ans = new int[nums.length];
    Stack<Integer> stack = new Stack<>();   // increasing stack
    for (int i = 0; i < nums.length; i++) { // left to right
        while (!stack.isEmpty() && stack.peek() >= nums[i]) {
            stack.pop();
        }
        if (stack.isEmpty()) {
            ans[i] = -1;
        } else {
            ans[i] = stack.peek();
        }
        stack.push(nums[i]);
    }

    return ans;
}

// input:  [5, 3,  1,  2,  4]
// output: [3, 1, -1, -1, -1]
// O(n)
public int[] firstSmallerRight(int[] nums) {
    int[] ans = new int[nums.length];
    Stack<Integer> stack = new Stack<>();        // increasing stack
    for (int i = nums.length - 1; i >= 0; i--) { // right to left
        while (!stack.isEmpty() && stack.peek() >= nums[i]) {
            stack.pop();
        }
        if (stack.isEmpty()) {
            ans[i] = -1;
        } else {
            ans[i] = stack.peek();
        }
        stack.push(nums[i]);
    }

    return ans;
}
```
### 2.3 Solution with Monotonic Queue
We can use monotonic queue with better performance, the time complexity is $O(n)$. Instead of creating two methods to get smaller left and smaller right separately, we can use one method to get both results at once.
```java
// input:  [5, 3, 1, 2, 4]
// output: [[-1,-1, -1, 1, 2], [3, 1, -1, -1, -1]]
// O(n)
public int[][] firstSmaller(int[] nums) {
    int[] leftSmaller = new int[nums.length];
    int[] rightSmaller = new int[nums.length];
    Arrays.fill(leftSmaller, -1);
    Arrays.fill(rightSmaller, -1);
    Deque<Integer> queue = new LinkedList<>(); // increasing queue
    for (int i = 0; i < nums.length; i++) {    // left to right
        while (!queue.isEmpty() && nums[queue.peekLast()] >= nums[i]) {
            rightSmaller[queue.pollLast()] = nums[i];
        }
        if (!queue.isEmpty()) {
            leftSmaller[i] = nums[queue.peekLast()];
        }
        queue.offerLast(i);
    }

    return new int[][]{leftSmaller, rightSmaller};
}
```
* Use Deque as monotonic queue.
* The deque stores the index of the element, not the value of it.

Similarly, we can get larger left and larger right at once with monotonic queue.
```java
// input:  [5, 3, 1, 2, 4]
// output: [[-1, 5, 3, 3, 5], [-1, 4, 2, 4, -1]]
// O(n)
public int[][] firstLarger(int[] nums) {
    int[] leftLarger = new int[nums.length];
    int[] rightLarger = new int[nums.length];
    Arrays.fill(leftLarger, -1);
    Arrays.fill(rightLarger, -1);
    Deque<Integer> queue = new LinkedList<>(); // decreasing queue
    for (int i = 0; i < nums.length; i++) {    // left to right
        while (!queue.isEmpty() && nums[queue.peekLast()] <= nums[i]) {
            rightLarger[queue.pollLast()] = nums[i];
        }
        if (!queue.isEmpty()) {
            leftLarger[i] = nums[queue.peekLast()];
        }
        queue.offerLast(i);
    }

    return new int[][]{leftLarger, rightLarger};
}
```

## 3. Source Files
* [Source files for Monotonic Queue on GitHub](https://github.com/jojozhuang/dsa-java/tree/master/ds-monotonic-queue)

## 4. Reference
* [Monotonic Queue Explained with LeetCode Problems](https://medium.com/algorithms-and-leetcode/monotonic-queue-explained-with-leetcode-problems-7db7c530c1d6)
* [Monotonic Queue](https://anthony-huang.github.io/competitiveprogramming/2016/06/06/monotonic-queue.html)
* [This is a typical monotonic queue problem](https://leetcode.com/problems/sliding-window-maximum/discuss/65885/this-is-a-typical-monotonic-queue-problem)
