---
layout: post
key: blog
title: "Data Structure - Graph"
date: 2016-04-12
tags: DFS, BFS
categories:
- blog
---

> A graph is simply a collection of nodes with edges between (some of) them.

## 1. Features of Graph.
* Graphs can be either directed (like the following graph) or undirected. While directed edges are like a one-way street, undirected edges are like a two-way street.
* Graph might consist of multiple isolated subgraphs. If there is a path between every pair of vertices, it is called a "connected graph.'
* Graph can also have cycles (or not). An "acyclic graph" is one without cycles.

## 2. Implement Graph.
Adjacency List

```java
class Graph {
    public Node[] nodes;
}
class Node {
    public String name;
    public Node [] children;
}
```


Adjacency Matrices

## 3. Graph Search.
### 3.1 Depth-First Search (DFS)
DFS is often preferred if we want to visit every node in the graph.
```java
void searchDFS(Node root) {
    if (root == null) {
        return;
    }
    visit(root);
    root.visited = true // Marked that this root has been visited.
    foreach(Node n in root.neighbors) {
        if (n.visited == false) {
            searchDFS(node);
        }
    }
}
```

### 3.2 Breadth-First Search (BFS)
if we want to find the shortest path (or just any path) between two nodes, BFS is generally better. Consider representing all the friendships in the entire world in a graph and trying to find a path of friend- ships between Ash and Vanessa.
```java
void searchBFS(Node root) {
    if (root == null) {
        return;
    }
    Queue queue = new Queue();
    root.marked = true // Marked that this root has already been added to queue
    queue.enqueue(root);
    while(!queue.isEmpty()) {
        Node node = queue.dequeue();
        visit(node);
        foreach(Node n in root.neighbors) {
            if (n.marked == false) {
                n.marked = true;
                queue.enqueue(n);
            }
        }
    }
}
```

### 3.3 Bidirectional Search
Bidirectional search is used to find the shortest path between a source and destination node.

## 4. Reference
