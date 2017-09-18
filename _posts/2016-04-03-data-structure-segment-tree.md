---
layout: post
key: blog
title: "Data Structure - Segment Tree"
date: 2016-04-03
tags: Range Search
categories: blog
---

> Segment Tree (a.k.a Interval Tree) is an advanced data structure which can support queries like:
* which of these intervals contain a given point
* which of these points are in a given interval

## 1. Usage of Segment Tree
### 1.1 The Original Question
1) What is the minimum number of array {4,-1,3,0,2}? The answer is -1.  
2) What is the minimum number of this array within the range of index {2,3}? The answer is 0.  
3) How to answer such question for any given range?   
We have to create a matrix to store all the minimum values for all ranges. The matrix looks as follows.

Index| 0 | 1  |  2 |  3 |  4
-----|---|----|----|--- |---
   0 | 4 | -1 | -1 | -1 | -1
   1 |   | -1 | -1 | -1 | -1
   2 |   |    |  3 |  0 |  0
   3 |   |    |    |  0 |  0
   4 |   |    |    |    |  2

For example, to get the minimum number of range {2,4}, just find the cell {2,4}, which is 0.

### 1.2 Performance of Matrix Approach for Range Search
* The Space Complexity is O(n^2).
* The Time Complexity for building the matrix is O(n^2), for searching is O(1).

### 1.3 Performance of Segment Tree
Segment Tree has less storage and better performance.
* The Space Complexity is O(n).
* The Time Complexity for building the tree is O(n), for searching is O(lg(n)).

## 2. Implement Segment Tree
### 2.1 Definition of Segment Tree Node
Attributes start and end define the range. Pointers left and right define the left child and right child.
```java
public class SegmentTreeNode {
    public int start, end;
    public int max, min, sum; // You can add other additional attributes
    public SegmentTreeNode left, right;

    public SegmentTreeNode(int start, int end) {
        this.start = start;
        this.end = end;
        this.left = null;
        this.right = null;
    }
}
```

### 2.2 Build A Minimum Segment Tree
The digram of Minimum Segment Tree for given array {4,-1,3,0,2}.
![MIME Type](/public/pics/2016-04-03/min.png)  

Code for the build method.
```java
public SegmentTreeNode buildMin(int[] arr) {
    if (arr == null || arr.length == 0) {
        return null;
    }

    return buildMinHelpler(arr, 0, arr.length - 1);
}

private SegmentTreeNode buildMinHelpler(int[] arr, int start, int end) {
    if (start > end) {
        return null;
    }

    SegmentTreeNode root = new SegmentTreeNode(start, end);
    if (start == end) {
        root.min = arr[start];
        return root;
    }

    int mid = start + (end - start) / 2;
    root.left = buildMinHelpler(arr, start, mid);
    root.right = buildMinHelpler(arr, mid + 1, end);
    root.min = Math.min(root.left.min, root.right.min);
    return root;
}
```

## 3. Search for Minimum
For the given segment tree and the given range, find the minimum value.
```java
public int queryMin(SegmentTreeNode root, int start, int end) {
    if (root == null) {
        return 0;
    }

    if (root.start == start && root.end == end) {
        return root.min;
    }

    int mid = root.start + (root.end - root.start) / 2;
    int leftmin = Integer.MAX_VALUE;
    int rightmin = Integer.MAX_VALUE;
    if (start <= mid) {
        if (mid < end) {
            leftmin = queryMin(root.left, start, mid);
        } else {
            leftmin = queryMin(root.left, start, end);
        }
    }
    if (mid < end) {
        if (start <= mid) {
            rightmin = queryMin(root.right, mid + 1, end);
        } else {
            rightmin = queryMin(root.right, start, end);
        }
    }

    return Math.min(leftmin, rightmin);
}
```

## 4. Maximum and Sum
### 4.1 Build Segment Tree
Actually, we can build Segment Tree for minimum, maximum and sum at once.
![MIME Type](/public/pics/2016-04-03/minmaxsum.png)  

Code for the build method.
```java
public SegmentTreeNode build(int[] arr) {
    if (arr == null || arr.length == 0) {
        return null;
    }

    return buildHelpler(arr, 0, arr.length - 1);
}

private SegmentTreeNode buildHelpler(int[] arr, int start, int end) {
    if (start > end) {
        return null;
    }

    SegmentTreeNode root = new SegmentTreeNode(start, end);
    if (start == end) {
        root.min = arr[start];
        root.max = arr[start];
        root.sum = arr[start];
        return root;
    }

    int mid = start + (end - start) / 2;
    root.left = buildHelpler(arr, start, mid);
    root.right = buildHelpler(arr, mid + 1, end);
    root.min = Math.min(root.left.min, root.right.min);
    root.max = Math.max(root.left.max, root.right.max);
    root.sum = root.left.sum + root.right.sum;
    return root;
}
```

### 4.2 Search for Maximum and Sum
For the given segment tree and the given range, find the maximum value.
```java
public int queryMax(SegmentTreeNode root, int start, int end) {
    if (root == null) {
        return 0;
    }

    if (root.start == start && root.end == end) {
        return root.max;
    }

    int mid = root.start + (root.end - root.start) / 2;
    int leftmax = Integer.MIN_VALUE;
    int rightmax = Integer.MIN_VALUE;
    if (start <= mid) {
        if (mid < end) {
            leftmax = queryMax(root.left, start, mid);
        } else {
            leftmax = queryMax(root.left, start, end);
        }
    }
    if (mid < end) {
        if (start <= mid) {
            rightmax = queryMax(root.right, mid + 1, end);
        } else {
            rightmax = queryMax(root.right, start, end);
        }
    }

    return Math.max(leftmax, rightmax);
}
```

For the given segment tree and the given range, get the sum.
```java
public int querySum(SegmentTreeNode root, int start, int end) {
    if (root == null) {
        return 0;
    }

    if (root.start == start && root.end == end) {
        return root.sum;
    }

    int mid = root.start + (root.end - root.start) / 2;
    int leftsum = 0;
    int rightsum = 0;
    if (start <= mid) {
        if (mid < end) {
            leftsum = querySum(root.left, start, mid);
        } else {
            leftsum = querySum(root.left, start, end);
        }
    }
    if (mid < end) {
        if (start <= mid) {
            rightsum = querySum(root.right, mid + 1, end);
        } else {
            rightsum = querySum(root.right, start, end);
        }
    }

    return leftsum + rightsum;
}
```

## 5. Reference
* [Segment Tree Range Minimum Query(Video on Youtube)](https://www.youtube.com/watch?v=ZBHKZF5w4YU)
* [Segment Tree Build](http://www.lintcode.com/en/problem/segment-tree-build/)
