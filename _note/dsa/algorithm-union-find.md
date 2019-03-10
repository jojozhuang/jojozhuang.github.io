---
layout: note
key: note
title: "Algorithm - Union Find"
index: 324
category: dsa
image: note/dsa.png
date: 2016-03-24
postdate: 2016-03-24
tags: [Disjoint Set, Union, Find]
---

> Use Union-Find approach for solve disjoint set problems.

## 1. Disjoint Set
### 1.1 Disjoint Set in Math
In mathematics, two sets are said to be `disjoint sets` if they have no element in common. Equivalently, disjoint sets are sets whose intersection is the empty set. For example, {1, 2, 3} and {4, 5, 6} are disjoint sets, while {1, 2, 3} and {3, 4, 5} are not.

### 1.2 Disjoint-set Data Structure
A disjoint-set data structure is a data structure that tracks a set of elements partitioned into a number of disjoint (non-overlapping) subsets. Generally, it is implemented with an array and `find`, `union` methods.

### 1.3 Set Problem
Consider a situation with a number of persons and following tasks to be performed on them.
* Add a new friendship relation, i.e., a person `i` becomes friend of another person `j`.
* Find whether individual `i` is a friend of individual `j` (direct or indirect friend).

## 2. Union Find
A `union-find` algorithm is an algorithm that performs two useful operations on such a Disjoint-set data structure:
* `Find`: Determine which subset a particular element is in. This can be used for determining if two elements are in the same subset.
* `Union`: Join two subsets into a single subset.

Below is the sample code which implements union-find algorithm.
```java
public class DisjointSet {
    private int[] parents;

    public DisjointSet(int size)
    {
        parents = new int[size];
        for (int i = 0; i < parents.length; i++) {
            // Initially, all elements are in their own set.
            parents[i] = i;
        }
    }

    // find
    public int find(int i) {
        if (parents[i] == i) {
            // i is the representative of this set
            return i;
        } else {
            // If i is not the parent of itself, then i is not the representative of this set. So we
            // recursively call find() on its parent
            return find(parents[i]);
        }
    }

    // union
    public void union(int i, int j) {
        int root1 = find(i);
        int root2 = find(j);
        parents[root1] = root2;
    }
}
```
* Array `parents` stores the information that who is the parent of the current node.

The find method can be implemented without recursion.
```java
// no recursion
public int find2(int i) {
    while (parents[i] != i) {
        parents[i] = parents[parents[i]];
        i = parents[i];
    }
    return parents[i];
}
```
Let's take a look how it works.
![image](/public/notes/algorithm-union-and-find/union_find.png){:width="800px"}
* a) Initially, we have 5 elements and each of them in their own subset.
* b) Call 'union(0,2)' to set parent node 2 for node 0. Notice, the value at position 0 of the array is changed to 2.
* c) Call 'union(4,2)' to set parent node 2 for node 4. Notice, the value at position 4 of the array is changed to 2.
* d) Call 'union(3,1)' to set parent node 1 for node 3. Notice, the value at position 3 of the array is changed to 1.
* Finally, we have two subsets, one is {0,2,4}, another is {1,3}.

Now, if we want to find out whether `0` and `4` are in the same subset, we just need to call `find(0)` and `find(4)`, then compare the results. If both return the same parent, then they are in the same subset.

The following code show how to use union and find methods to reproduce the above process.
```java
DisjointSet djs = new DisjointSet(5); // parents = [0,1,2,3,4]
// set 2 as parent of 0
djs.union(0, 2); // parents = [2,1,2,3,4]
// set 2 as parent of 4
djs.union(4, 2); // parents = [2,1,2,3,2]
// set 1 as parent of 3
djs.union(3, 1); // parents = [2,1,2,1,2]

// Subset1 = {0,2,4}
// Subset2 = {1,3}
// Check if 0 and 4 are in the same subset.
if(djs.find(0) == djs.find(4)) {
    System.out.println("Yes");
}
// Check if 0 and 1 are in the same subset.
if(djs.find(0) != djs.find(1)) {
    System.out.println("No");
}
```

## 3. Optimization
Both the find() and union() methods can be optimized.
* find() - Path Compression
* union() - Union by Rank

### 3.1 Path Compression
The idea of `Path Compression` is to flatten the tree when find() is called. The naive `find()` method is read-only. When find() is called for an element `i`, root of the tree is returned. The find() operation traverses up from `i` to find root. The idea of path compression is to make the found root as parent of `i` so that we don’t have to traverse all intermediate nodes again. If `i` is root of a subtree, then path (to root) from all nodes under `i` also compresses.
![image](/public/notes/algorithm-union-and-find/path_compression.png){:width="800px"}
* If we call naive find(3), the tree(array) remains unchanged. The next time you call find(3), it again traverses up from node 4 to node 5.
* With the optimized find() method, the parent of node 3 is updated after calling find(3). When you call find(3) for the second time, it returns parent node 5 directly. Actually, the path for node 3 and its children(node 1 and node 2) are all compressed.

Below is the optimized find() method with Path Compression.
```java
// Path Compression
public int find(int i) {
    if (parents[i] == i) {
        // Then i is the representative of this set
        return i;
    } else {
        // Recursively find the representative.
        int result = find(parents[i]);

        // Change the parent during traversal
        parents[i] = result;

        // Return the result
        return result;
    }
}
```
### 3.2 Union by Rank
Problem with naive union method. Following is an example of worst case scenario. Union the nodes in sequence, the tree becomes like a linked list.
![image](/public/notes/algorithm-union-and-find/naive_union.png){:width="800px"}
* If we call find(0) after the last step d), it will traverse up from node 0 to node 1, node 2, ..., inefficient.

The solution is to always attach smaller depth tree under the root of the deeper tree.
![image](/public/notes/algorithm-union-and-find/union_by_rank.png){:width="800px"}
* a) Initially, we have 5 elements and each of them in their own subset. In addition, we have same size rank array, the default value is zero.
* b) When calling 'union(0,1)', node 0 and node 1 have the same rank 0. We can choose either of them as the root. In this case, we choose node 1 as root, so set parents[0] = 1. Since node 1 is now as root, so set rank[1] = 1.
* c) When calling 'union(1,2)', node 1 has larger rank than node 2, so take node 1 as root, set parents[2] = 1.
* d) When calling 'union(2,3)', node 2's root is node 1 and node 1 has larger rank than node 3, so take node 1 as root, set parents[3] = 1.
* Finally, we have two trees, one is {1,2,3,4}, another is {4}. Notice, tree {1,2,3,4} is flattened.

Below is the optimized union() method with Union by Rank.
```java
// Union by rank
public void union(int i, int j) {
    int root1 = find(i);
    int root2 = find(j);
    if (root1 == root2) {
        return;
    }

    // If root1’s rank is less than root2’s rank
    if (rank[root1] < rank[root2]) {
        // Then move root1 under root2
        parents[root1] = root2;
    // If root1’s rank is larger than root2’s rank
    } else if (rank[root1] > rank[root2]) {
        // Then move root2 under root1
        parents[root2] = root1;
    // if ranks are the same
    } else {
        // Then move root1 under root2 (doesn't matter which one goes where)
        parents[root1] = root2;
        rank[root2]++;
    }
}
```

## 4. Classic Problems
* [LeetCode 200 - Number of Islands](https://leetcode.com/problems/number-of-islands/)
* [LeetCode 305 - Number of Islands II](https://leetcode.com/problems/number-of-islands-ii/)
* [LeetCode 323 - Number of Connected Components in an Undirected Graph](https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/)

## 5. Source Files
* [Source files for Union Find on GitHub](https://github.com/jojozhuang/dsa-java/tree/master/alg-union-find)
* [Union Find Diagrams(draw.io) in Google Drive](https://drive.google.com/file/d/1CulEG8tHmHdQQ5UPnCjrIzdpIZNZd-WB/view?usp=sharing)

## 6. References
* [Union-Find Algorithms](https://www.cs.princeton.edu/~rs/AlgsDS07/01UnionFind.pdf)
* [Disjoint Set Data Structures](https://www.geeksforgeeks.org/disjoint-set-data-structures-java-implementation/)
* [Disjoint Set (Or Union-Find)](https://www.geeksforgeeks.org/union-find/)
* [Union-Find Algorithm](https://www.geeksforgeeks.org/union-find-algorithm-union-rank-find-optimized-path-compression/)
* [Union By Rank and Path Compression](https://www.geeksforgeeks.org/union-find-algorithm-set-2-union-by-rank/)
