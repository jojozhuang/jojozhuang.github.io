---
layout: note
key: note
title: "Data Structure - Segment Tree"
index: 308
category: dsa
image: /note/dsa.png
date: 2016-03-08
postdate: 2016-03-08
tags: [Segment Tree]
---

> Introduce use Segment Tree for range search.

Segment Tree (a.k.a Interval Tree) is an advanced data structure which can support queries like:
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

### 1.2 Performance of Matrix Approach for Range Searching
* The Space Complexity is O(n<sup>2</sup>).
* The Time Complexity for building the matrix is O(n<sup>2</sup>), for searching is O(1).

### 1.3 Performance of Segment Tree for Range Searching
Segment Tree has less storage and better performance.
* The Space Complexity is O(n).
* The Time Complexity for building the tree is O(n), for searching is O(lg(n)).

## 2. Minimum Segment Tree
### 2.1 Definition of Minimum Segment Tree
The digram below shows what Minimum Segment Tree for given array {4,-1,3,0,2} looks like.
![image](/public/notes/data-structure-segmenttree/min.png){:width="800px"}  
### 2.2 Creating Segment Tree Node
Create a class named `SegmentTreeNode`. Attributes `start` and `end` define the range. Attributes `left` and `right` are the children of the current node.
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

### 2.3 Constructing Minimum Segment Tree
Define a method named `buildMin()`. It recursively constructs the segment tree from top to bottom.
```java
/**
 * @param arr, array of integer
 * @return root node of the minimum segment tree
 */
public SegmentTreeNode buildMin(int[] arr) {
    if (arr == null || arr.length == 0) {
        return null;
    }

    return buildMinHelpler(arr, 0, arr.length - 1);
}

/**
 * @param arr, array of integer
 * @param start, first index of the array
 * @param end, last index of the array
 * @return root node of the minimum segment tree
 */
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

### 2.4 Searching on Minimum Segment Tree
Create a method named `queryMin()`. It searches the minimum value for the given segment tree and range.
```java
/**
 * @param root, root node of the segment tree
 * @param start, start of the search range
 * @param end, end of the search range
 * @return the minimum value of the given range
 */
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

## 3. Including Maximum and Sum
### 3.1 Definition of Minimum/Maximum/Sum Segment Tree
Actually, we can build Segment Tree for minimum, maximum and sum all at once.
![image](/public/notes/data-structure-segmenttree/minmaxsum.png){:width="800px"}  
For each node, it contains min, max and sum value. Here are the samples for different ranges.

  | Range  | Min | Max | Sum
--|--------|-----|-----|-----
  | (0,4)  | -1  | 4   |  8
  | (2,3)  | 0   | 3   |  3
  | (0,1)  | -1  | 4   |  3
  | (1,4)  | -1  | 3   |  4

### 3.2 Constructing Segment Tree
Refine the `build` method to include minimum, maximum and sum all together.
```java
/**
 * @param arr, array of integer
 * @return root node of the segment tree
 */
public SegmentTreeNode build(int[] arr) {
    if (arr == null || arr.length == 0) {
        return null;
    }

    return buildHelpler(arr, 0, arr.length - 1);
}

/**
 * @param arr, array of integer
 * @param start, first index of the array
 * @param end, last index of the array
 * @return root node of the segment tree
 */
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

### 3.3 Searching on Segment Tree
Create three query methods named `queryMin`, `queryMax` and `querySum`. For the given segment tree and range, find the minimum value, maximum value and sum accordingly.
```java
/**
 * @param root, root node of the segment tree
 * @param start, start of the search range
 * @param end, end of the search range
 * @return the minimum value of the given range
 */
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

/**
 * @param root, root node of the segment tree
 * @param start, start of the search range
 * @param end, end of the search range
 * @return the maximum value of the given range
 */
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

/**
 * @param root, root node of the segment tree
 * @param start, start of the search range
 * @param end, end of the search range
 * @return the sum of the given range
 */
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

## 4. Source Files
* [Source files for Segment Tree on GitHub](https://github.com/jojozhuang/DataStructure/tree/master/SegmentTree)
* [Diagrams on Google Slides](https://docs.google.com/presentation/d/19Rnp5BcdG8wDIsqiGBNpjmDueBKOV7bVJvaDiGS-318/edit?usp=sharing)

## 5. Reference
* [Segment Tree Range Minimum Query(Video on Youtube)](https://www.youtube.com/watch?v=ZBHKZF5w4YU)
* [Segment Tree Build](http://www.lintcode.com/en/problem/segment-tree-build/)
