---
layout: post
key: blog
title: "Data Structure - Graph"
date: 2016-04-12
tags: [DFS, BFS]
---

> A graph is simply a collection of nodes with edges between (some of) them.

## 1. Features of Graph
* Graphs can be either directed or undirected. While directed edges are like a one-way street, undirected edges are like a two-way street.
* Graph might consist of multiple isolated subgraphs. If there is a path between every pair of vertices, it is called a 'connected graph'.
* Graph can also have cycles (or not). An 'acyclic graph' is one without cycles.

## 2. Implementing Graph
There are two ways to implement graph: Adjacency Matrix and Adjacency List.
### 2.1 Adjacency Matrix
Vertex.
```java
public class Vertex {
    public String label;
    public boolean visited;

    public Vertex(String label) {
        this.label = label;
        this.visited = false;
    }

    @Override
    public String toString() {
        return label;
    }
}
```
AdjMatrixGraph.
```java
public class AdjMatrixGraph {
    private int MAX_VERTS = 0;
    private Vertex[] vertexList; // array of vertices
    private int[][] adjMatrix; // adjacency matrix
    private int nVerts; // current number of vertices

    public AdjMatrixGraph(int maxverts)
    {
        MAX_VERTS = maxverts; // maximum number of vertices
        vertexList = new Vertex[MAX_VERTS];
        adjMatrix = new int[MAX_VERTS][MAX_VERTS];
        nVerts = 0;

        // initialize matrix
        for(int i=0; i<MAX_VERTS; i++) {
            for(int j=0; j<MAX_VERTS; j++) {
                adjMatrix[i][j] = 0;
            }
        }
    }

    public void addVertex(String label) {
        vertexList[nVerts++] = new Vertex(label);
    }

    public void addEdge(int start, int end) {
        adjMatrix[start][end] = 1;
        adjMatrix[end][start] = 1;
    }

    public Vertex[] getVertices() {
        return vertexList;
    }

    public int[][] getAdjMatrix() {
        return adjMatrix;
    }
}
```
### 2.2 Adjacency List
```java
class Graph {
    public Node[] nodes;
}
class Node {
    public String name;
    public Node [] children;
}
```

## 3. Graph Search
There are two common approaches to searching a graph: `depth-first search` (DFS) and `breadth-first search` (BFS). The depth-first search is implemented with a `stack`, whereas the breadth-first search is implemented with a `queue`.
### 3.1 Depth-First Search
* Rule 1: If possible, visit an adjacent unvisited vertex, mark it, and push it on the stack.
* Rule 2: If you can’t follow Rule 1, then, if possible, pop a vertex off the stack.
* Rule 3: If you can’t follow Rule 1 or Rule 2, you’re done.

### 3.2 DFS for Adjacency Matrix Graph
```java
private Stack<Vertex> stack = new Stack<Vertex>();

public void dfs() {
    vertexList[0].visited = true;
    displayVertex(0);
    stack.push(vertexList[0]);
    while (!stack.isEmpty()) {
        int index = getAdjUnvisitedVertex(stack.peek().index);
        if(index == -1) { // no unvisited neighbor
            stack.pop();
        } else {
            vertexList[index].visited = true;
            displayVertex(index);
            stack.push(vertexList[index]);
        }
    }

    // stack is empty, so we’re done
    for (int i=0; i<nVerts; i++) {
        vertexList[i].visited = false;
    }
}

private int getAdjUnvisitedVertex(int index) {
    for(int i=0; i<nVerts; i++) {
        if(adjMatrix[index][i] == 1 && vertexList[i].visited == false) {
            return i;
        }
    }
    return -1;
}
```
### 3.3 Breadth-First Search
* Rule 1: Visit the next unvisited vertex (if there is one) that’s adjacent to the current vertex, mark it,
and insert it into the queue.
* Rule 2: If you can’t carry out Rule 1 because there are no more unvisited vertices, remove a vertex
from the queue (if possible) and make it the current vertex.
* Rule 3: If you can’t carry out Rule 2 because the queue is empty, you’re done.

### 3.4 BFS for Adjacency Matrix Graph
```java
// bfs
public void bfs() {
    vertexList[0].visited = true;
    displayVertex(0);
    queue.add(vertexList[0]);
    while (!queue.isEmpty() ) {
        Vertex v1 = queue.poll();
        int v2;
        while ((v2=getAdjUnvisitedVertex(v1.index)) != -1) {
            vertexList[v2].visited = true;
            displayVertex(v2);
            queue.add(vertexList[v2]);
        }
    }

    // queue is empty, so we’re done
    for (int i=0; i<nVerts; i++) {
        vertexList[i].visited = false;
    }
}
```

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
if we want to find the shortest path (or just any path) between two nodes, BFS is generally better. Consider representing all the friendships in the entire world in a graph and trying to find a path of friendships between Ash and Vanessa.
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

## 4. Union find
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

## 5. Reference
* [Data Structure - Graph Data Structure](https://www.tutorialspoint.com/data_structures_algorithms/graph_data_structure.htm)
