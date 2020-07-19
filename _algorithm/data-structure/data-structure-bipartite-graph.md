---
layout: tutorial
key: algorithm
title: "Data Structure - Bipartite Graph"
index: 1143
subcategory: data-structure
date: 2016-03-17
tags: [Bipartite Graph, Hungarian Algorithm]
mathjax: true
---

> Bipartite Graph.

## 1. Is Graph Bipartite?
### 1.1 Description
Given an undirected graph, return true if and only if it is bipartite.

Recall that a graph is bipartite if we can split it's set of nodes into two independent subsets A and B such that every edge in the graph has one node in A and another node in B.

The graph is given in the following form: graph[i] is a list of indexes j for which the edge between nodes i and j exists.  Each node is an integer between 0 and graph.length - 1.  There are no self edges or parallel edges: graph[i] does not contain i, and it doesn't contain any element twice.

Example 1:
```raw
Input: [[1,3], [0,2], [1,3], [0,2]]
Output: true
Explanation:
The graph looks like this:
0----1
|    |
|    |
3----2
We can divide the vertices into two groups: {0, 2} and {1, 3}.
```
Example 2:
```raw
Input: [[1,2,3], [0,2], [0,1,3], [0,2]]
Output: false
Explanation:
The graph looks like this:
0----1
| \  |
|  \ |
3----2
We cannot find a way to divide the set of nodes into two independent subsets.
```
### 1.2 Solution - Graph Coloring
For each node
* If has not been colored, color it to RED(1).
* Color its neighbors with a different color RED(1) to BLUE(-1) or BLUE(-1) to RED(1).

If we can finish the coloring then the graph is bipartite. All red nodes on the left no connections between them and all blues nodes on the right, again no connections between them. red and blue nodes are neighbors.

Time complexity: O(V+E), Space complexity: O(V)

DFS.
```java
public boolean isBipartite(int[][] graph) {
    if (graph == null || graph.length == 0) {
        return false;
    }

    int n = graph.length;
    int[] colors = new int[n]; // 0: initial, not colored, 1: colored to red, -1: colored to blue.

    for (int i = 0; i < n; i++) { // This graph might be a disconnected graph. So check each unvisited node.
        if (colors[i] == 0 && !dfs(graph, colors, 1, i)) {
            return false;
        }
    }

    return true;
}

private boolean dfs(int[][] graph, int[] colors, int color, int node) {
    if (colors[node] != 0) {
        return colors[node] == color;
    }

    colors[node] = color;
    for (int next : graph[node]) {
        if (!dfs(graph, colors, -color, next)) {
            return false;
        }
    }

    return true;
}
```
## 2. Possible Bipartition
### 2.1 Description
Given a set of N people (numbered 1, 2, ..., N), we would like to split everyone into two groups of any size. Each person may dislike some other people, and they should not go into the same group. Formally, if `dislikes[i] = [a, b]`, it means it is not allowed to put the people numbered `a` and `b` into the same group.

Return true if and only if it is possible to split everyone into two groups in this way.

Example 1:
```raw
Input: N = 4, dislikes = [[1,2],[1,3],[2,4]]
Output: true
Explanation: group1 [1,4], group2 [2,3]
```
Example 2:
```raw
Input: N = 3, dislikes = [[1,2],[1,3],[2,3]]
Output: false
```
Example 3:
```raw
Input: N = 5, dislikes = [[1,2],[2,3],[3,4],[4,5],[1,5]]
Output: false
```
### 2.2 Solution - Graph Coloring
DFS.
```java
public boolean possibleBipartition(int N, int[][] dislikes) {
    if (dislikes == null) {
        return false;
    }

    List<Integer>[] graph = new ArrayList[N];
    int[] colors = new int[N]; // 0: initial, not colored, 1: colored to red, -1: colored to blue.

    for (int i = 0; i < N; i++) {
        graph[i] = new ArrayList<Integer>();
    }

    for (int[] edge: dislikes) {
        graph[edge[0] - 1].add(edge[1] - 1);
        graph[edge[1] - 1].add(edge[0] - 1);
    }

    for (int i = 0; i < N; i++) {
        if (colors[i] == 0 && !dfs(graph, colors, 1, i)) {
            return false;
        }
    }

    return true;
}

private boolean dfs(List<Integer>[] graph, int[] colors, int color, int node) {
    if (colors[node] != 0) {
        return colors[node] == color;
    }

    colors[node] = color;
    for (int next : graph[node]) {
        if (!dfs(graph, colors, -color, next)) {
            return false;
        }
    }

    return true;
}
```

## 3. Classic Problems
* [LeetCode 785 - Is Graph Bipartite?](https://leetcode.com/problems/is-graph-bipartite/)
* [LeetCode 886 - Possible Bipartition](https://leetcode.com/problems/possible-bipartition/)

## 4. Reference
* [花花酱 LeetCode 785. Is Graph Bipartite?](https://zxi.mytechroad.com/blog/graph/leetcode-785-is-graph-bipartite/)
* [二分图的最大匹配、完美匹配和匈牙利算法](https://www.renfei.org/blog/bipartite-matching.html)
* [Check whether a given graph is Bipartite or not](https://www.geeksforgeeks.org/bipartite-graph/)
