---
layout: note
key: note
title: "Data Structure - Graph"
index: 311
category: dsa
image: note/dsa.png
date: 2016-03-11
postdate: 2016-03-11
tags: [Graph]
---

> A graph is simply a collection of nodes with edges between (some of) them.

## 1. Concepts of Graph
### 1.1 Definition of Graph
Graph is a data structure that consists of following two components:
* A finite set of vertices also called as nodes.
* A finite set of ordered pair of the form (u, v) called as edge. The pair is ordered because (u, v) is not same as (v, u) in case of a directed graph(di-graph). The pair of the form (u, v) indicates that there is an edge from vertex u to vertex v. The edges may contain weight/value/cost.

Following is an example of an undirected graph with 5 vertices.
![image](/public/notes/data-structure-graph/graph.png){:width="350px"}

### 1.2 Graph Features
* Graphs can be either directed or undirected. While directed edges are like a one-way street, undirected edges are like a two-way street.
* Graph might consist of multiple isolated subgraphs. If there is a path between every pair of vertices, it is called a 'connected graph'.
* Graph can also have cycles (or not). An 'acyclic graph' is one without cycles.

## 2. Implementation of Graph
There are two most common ways to implement graph:
* Adjacency Matrix
* Adjacency List

### 2.1 Adjacency Matrix
Adjacency Matrix is a 2D array of size V x V where V is the number of vertices in a graph. Let the 2D array be adj[][], a slot adj[i][j] = 1 indicates that there is an edge from vertex i to vertex j. Adjacency matrix for undirected graph is always symmetric. Adjacency Matrix is also used to represent weighted graphs. If adj[i][j] = w, then there is an edge from vertex i to vertex j with weight w.

The adjacency matrix for the above example graph is:
![image](/public/notes/data-structure-graph/adjacency_matrix.png){:width="500px"}
* Pros: Representation is easier to implement and follow. Removing an edge takes O(1) time. Queries like whether there is an edge from vertex ‘u’ to vertex ‘v’ are efficient and can be done O(1).
* Cons: Consumes more space O(V^2). Even if the graph is sparse(contains less number of edges), it consumes the same space. Adding a vertex is O(V^2) time.

Below is the sample code which implements Graph with Adjacency Matrix.
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
### 2.2 Adjacency List
An array of lists is used. Size of the array is equal to the number of vertices. Let the array be array[]. An entry array[i] represents the list of vertices adjacent to the ith vertex. This representation can also be used to represent a weighted graph. The weights of edges can be represented as lists of pairs.

Following is adjacency list representation of the above graph.
![image](/public/notes/data-structure-graph/adjacency_list.png){:width="700px"}
* Pros: Saves space O(\|V\|+\|E\|) . In the worst case, there can be C(V, 2) number of edges in a graph thus consuming O(V^2) space. Adding a vertex is easier.
* Cons: Queries like whether there is an edge from vertex u to vertex v are not efficient and can be done O(V).

Below is the sample code which implements Graph with Adjacency List.
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

## 3. Search In Graph
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

### 3.1 Search In Adjacency Matrix Graph
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

### 3.2 Search In Adjacency List Graph
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
### 3.3 Bidirectional Search
Bidirectional search is used to find the shortest path between a source and destination node.

## 4. Node Graph
### 4.1 Implementation
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
### 4.2 Search
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

## 5. Source Files
* [Source files for Graph on GitHub](https://github.com/jojozhuang/DataStructure/tree/master/Graph)
* [Graph Diagrams(draw.io) in Google Drive](https://drive.google.com/file/d/1oUSGNx1BWE_0wH8XgSR9eRDuwEZfAB3f/view?usp=sharing)

## 6. Reference
* [Data Structure - Graph Data Structure](https://www.tutorialspoint.com/data_structures_algorithms/graph_data_structure.htm)
* [Graph and its representations](https://www.geeksforgeeks.org/graph-and-its-representations/)
* [Breadth First Search or BFS for a Graph](https://www.geeksforgeeks.org/breadth-first-search-or-bfs-for-a-graph/)
* [Depth First Search or DFS for a Graph](https://www.geeksforgeeks.org/depth-first-search-or-dfs-for-a-graph/)
