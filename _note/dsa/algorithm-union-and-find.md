---
layout: note
key: note
title: "Algorithm - Union And Find"
index: 324
category: dsa
image: note/dsa.png
date: 2016-03-24
postdate: 2016-03-24
tags: [Union, Find, Disjoint Set]
---

> Use Union and Find approach for solve disjoint set problems.

## 1. Disjoint Set
In mathematics, two sets are said to be `disjoint sets` if they have no element in common. Equivalently, disjoint sets are sets whose intersection is the empty set. For example, {1, 2, 3} and {4, 5, 6} are disjoint sets, while {1, 2, 3} and {3, 4, 5} are not.

### 1.1 Disjoint-set data structure.  
In computer science, a disjoint-set data structure is a data structure that tracks a set of elements partitioned into a number of disjoint subsets. It provides near-constant-time operations to add new sets, to merge existing sets, and to determine whether elements are in the same set.

### 1.2 Problem
Consider a situation with a number of persons and following tasks to be performed on them.

Add a new friendship relation, i.e., a person x becomes friend of another person y.
Find whether individual x is a friend of individual y (direct or indirect friend)

## 2. Union Find
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

    public int find2(int i) {
        while (parents[i] != i) {
            parents[i] = parents[parents[i]];
            i = parents[i];
        }
        return parents[i];
    }

    // union
    public void union(int i, int j) {
        int root1 = find(i);
        int root2 = find(j);
        parents[root1] = root2;
    }
}
```

## 3. Optimization
### 3.1 Path Compression
![image](/public/notes/algorithm-union-and-find/path_compression.png){:width="800px"}
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
Problem with naive union method.
![image](/public/notes/algorithm-union-and-find/naive_union.png){:width="800px"}

![image](/public/notes/algorithm-union-and-find/union_by_rank.png){:width="800px"}
```java
// Union by rank
public void union(int i, int j) {
    int root1 = find(i);
    int root2 = find(j);
    if (root1 == root2) {
        return;
    }

    // If i’s rank is less than j’s rank
    if (rank[root1] < rank[root2]) {
        // Then move i under j
        parents[root1] = root2;
    } else if (rank[root1] > rank[root2]) {
        // Then move j under i
        parents[root2] = root1;
    } else {
        parents[root1] = root2;
        rank[root2]++;
    }
}
```

## 4. Source Files
* [Source files for Union Find on GitHub](https://github.com/jojozhuang/DataStructure/tree/master/UnionFind)
* [Union Find Diagrams(draw.io) in Google Drive](https://drive.google.com/file/d/1CulEG8tHmHdQQ5UPnCjrIzdpIZNZd-WB/view?usp=sharing)

## 5. References
* [Disjoint Set Data Structures](https://www.geeksforgeeks.org/disjoint-set-data-structures-java-implementation/)
* [Disjoint Set (Or Union-Find)](https://www.geeksforgeeks.org/union-find/)
* [Union-Find Algorithm](https://www.geeksforgeeks.org/union-find-algorithm-union-rank-find-optimized-path-compression/)
