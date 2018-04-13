---
layout: note
key: note
title: "Data Structure - Graph"
index: 508
date: 2016-05-08
category: dsa
---

> A graph is simply a collection of nodes with edges between (some of) them.

## 1. Concepts of Graph
### 1.1 Definition of Graph
* Graphs can be either directed or undirected. While directed edges are like a one-way street, undirected edges are like a two-way street.
* Graph might consist of multiple isolated subgraphs. If there is a path between every pair of vertices, it is called a 'connected graph'.
* Graph can also have cycles (or not). An 'acyclic graph' is one without cycles.

### 1.2 Implementation of Graph
There are two most common ways to implement graph:
* Adjacency Matrix
* Adjacency List

### 1.3 Graph Search
There are two common approaches to searching a graph: `depth-first search` (DFS) and `breadth-first search` (BFS). The depth-first search is implemented with a `stack`, whereas the breadth-first search is implemented with a `queue`.

Depth-First Search(DFS)
* Rule 1: If possible, visit an adjacent unvisited vertex, mark it, and push it on the stack.
* Rule 2: If you can’t follow Rule 1, then, if possible, pop a vertex off the stack.
* Rule 3: If you can’t follow Rule 1 or Rule 2, you’re done.

Breadth-First Search(BFS)
* Rule 1: Visit the next unvisited vertex (if there is one) that’s adjacent to the current vertex, mark it,
and insert it into the queue.
* Rule 2: If you can’t carry out Rule 1 because there are no more unvisited vertices, remove a vertex
from the queue (if possible) and make it the current vertex.
* Rule 3: If you can’t carry out Rule 2 because the queue is empty, you’re done.

## 2. Implementing Graph
### 2.1 Adjacency Matrix Graph
Vertex.
```java
public class Vertex {
    public int index;
    public String name;
    public boolean visited;

    public Vertex(int index, String name) {
        this.index = index;
        this.name = name;
        this.visited = false;
    }

    @Override
    public String toString() {
        return name;
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
        int index = nVerts++;
        vertexList[index] = new Vertex(index, label);
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

    public void displayVertex(int index) {
        System.out.print(vertexList[index].name);
    }
}
```
Search.
```java
// dfs
private Stack<Vertex> stack = new Stack<Vertex>();
public void dfs() {
    vertexList[0].visited = true;
    displayVertex(0);
    stack.push(vertexList[0]);
    while (!stack.isEmpty()) {
        int index = getAdjUnvisitedVertex(stack.peek().index);
        if (index == -1) { // no unvisited neighbor
            stack.pop();
        } else {
            vertexList[index].visited = true;
            displayVertex(index);
            stack.push(vertexList[index]);
        }
    }

    // reset vertices
    for (int i=0; i<nVerts; i++) {
        vertexList[i].visited = false;
    }
}

// bfs
private Queue<Vertex> queue = new LinkedList<Vertex>();
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

    // reset vertices
    for (int i=0; i<nVerts; i++) {
        vertexList[i].visited = false;
    }
}

private int getAdjUnvisitedVertex(int index) {
    for (int i=0; i<nVerts; i++) {
        if (adjMatrix[index][i] == 1 && vertexList[i].visited == false) {
            return i;
        }
    }
    return -1;
}
```
### 2.2 Adjacency List Graph
AdjListGraph.
```java
public class AdjListGraph {
    private LinkedList<Vertex>[] adjList; // array of adjacency list
    private Vertex[] vertexList; // maintains the vertex list

    @SuppressWarnings("unchecked")
    public AdjListGraph(String[] verts)
    {
        adjList = new LinkedList[verts.length];
        vertexList = new Vertex[verts.length];

        // initialize array
        for (int i=0; i< adjList.length; i++) {
            adjList[i] = new LinkedList<Vertex>();
            vertexList[i] = new Vertex(i, verts[i]);
        }
    }

    public void addEdge(int start, int end) {
        adjList[start].add(vertexList[end]);
        adjList[end].add(vertexList[start]);
    }

    public LinkedList<Vertex>[] getAdjList() {
        return adjList;
    }

    public void displayVertex(int index) {
        System.out.print(vertexList[index].name);
    }
}
```
Search.
```java
// dfs
private Stack<Vertex> stack = new Stack<Vertex>();
public void dfs() {
    vertexList[0].visited = true;
    displayVertex(0);
    stack.push(vertexList[0]);
    while (!stack.isEmpty()) {
        int index = getAdjUnvisitedVertex(stack.peek().index);
        if (index == -1) { // no unvisited neighbor
            stack.pop();
        } else {
            vertexList[index].visited = true;
            displayVertex(index);
            stack.push(vertexList[index]);
        }
    }

    // reset vertices
    for (Vertex vertex : vertexList) {
        vertex.visited = false;
    }
}

// bfs
private Queue<Vertex> queue = new LinkedList<Vertex>();
public void bfs() {
    vertexList[0].visited = true;
    displayVertex(0);
    queue.add(vertexList[0]);
    while (!queue.isEmpty()) {
        Vertex v1 = queue.poll();
        int v2;
        while ((v2=getAdjUnvisitedVertex(v1.index)) != -1) {
            vertexList[v2].visited = true;
            displayVertex(v2);
            queue.add(vertexList[v2]);
        }
    }

    // reset vertices
    for (Vertex vertex : vertexList) {
        vertex.visited = false;
    }
}

private int getAdjUnvisitedVertex(int index) {
    for (int i=0; i<adjList[index].size(); i++) {
        if (adjList[index].get(i).visited == false) {
            return adjList[index].get(i).index;
        }
    }
    return -1;
}
```
### 2.3 Node Graph
Node.
```java
public class Node {
    public String name;
    public boolean visited;
    public Node[] neighbors;

    public Node(String name) {
        this.name = name;
        this.visited = false;
    }

    public void setNeighbors(Node[] neighbors) {
        this.neighbors = neighbors;
    }

    @Override
    public String toString() {
        return "name:" + name  + " neighbors:" + neighbors;
    }
}
```
Node Graph.
```java
public class NodeGraph {
    public Node[] nodes;

    public NodeGraph(int size)
    {
        nodes = new Node[size];
    }

    public void addNeighbors(int index, Node[] neighbors) {
        nodes[index].neighbors = neighbors;
    }

    public void displayNode(Node node) {
        System.out.print(node.name);
    }
}
```
Search.
```java
// dfs
public void dfs(Node root) {
    if (root == null) {
        return;
    }
    displayNode(root);
    root.visited = true;
    for(Node neighbor : root.neighbors) {
        if (neighbor.visited == false) {
            dfs(neighbor);
        }
    }
}
// bfs
private Queue<Node> queue = new LinkedList<Node>();
public void bfs(Node root) {
    if (root == null) {
        return;
    }
    root.visited = true;
    queue.offer(root);
    while (!queue.isEmpty()) {
        Node node = queue.poll();
        displayNode(node);
        for (Node neighbor : node.neighbors) {
            if (neighbor.visited == false) {
                neighbor.visited = true;
                queue.offer(neighbor);
            }
        }
    }
}
```
### 2.4 Bidirectional Search
Bidirectional search is used to find the shortest path between a source and destination node.

## 3. Union Find
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

## 4. Source Files
* [Source files for Graph on GitHub](https://github.com/jojozhuang/DataStructure/tree/master/Graph)

## 5. Reference
* [Data Structure - Graph Data Structure](https://www.tutorialspoint.com/data_structures_algorithms/graph_data_structure.htm)
* [Graph and its representations](https://www.geeksforgeeks.org/graph-and-its-representations/)
