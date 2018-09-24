---
layout: note
key: note
title: "Algorithm - Union And Find(Draft)"
index: 324
category: dsa
image: note/dsa.png
date: 2016-03-24
postdate: 2016-03-24
tags: [Union, Find, Graph]
---

> All of the common sorting algorithms.

## 4. Union Find
```java
// find root
private int find(int[] parent, int node) {
    while(parent[node] != node) {
        parent[node] = parent[parent[node]];
    }
    return parent[node];
}

// union
private void union(int[] parent, int node1, int node2) {
    int root1 = find(parent, node1);
    int root2 = find(parent, node2);
    parent[root1] = root2;
}
```
