---
layout: tutorial
key: algorithm
title: "Data Structure - Minimum Spanning Tree - Draft"
index: 1146
subcategory: data-structure
date: 2016-03-19
tags: [MST]
draft: true
---

> Implement minimum spanning tree.

## 1. Spanning Tree
Spanning tree can be defined as a sub-graph of connected, undirected graph G that is a tree produced by removing the desired number of edges from a graph. In other words, Spanning tree is a non-cyclic sub-graph of a connected and undirected graph G that connects all the vertices together. A graph G can have multiple spanning trees.

## 2. Minimum Spanning Tree
There can be weights assigned to every edge in a weighted graph. However, A minimum spanning tree is a spanning tree which has minimal total weight. In other words, minimum spanning tree is the one which contains the least weight among all other spanning tree of some particular graph.

Shortest path algorithms
In this section of the tutorial, we will discuss the algorithms to calculate the shortest path between two nodes in a graph.

## 3. Implementation of Minimum Spanning Trees
A `minimum spanning tree` (MST) is a graph with the minimum number of edges necessary to connect the vertices.
```java
public class MinimumSpanningTree {
    private int MAX_VERTS = 0;
    private Vertex[] vertexList; // array of vertices
    private int[][] adjMatrix; // adjacency matrix
    private int nVerts; // current number of vertices

    public MinimumSpanningTree(int maxverts)
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

    // mst, similar with dfs
    private Stack<Vertex> stack = new Stack<Vertex>();
    public void mst() {
        vertexList[0].visited = true; // different start vertex leads to different mst.
        stack.push(vertexList[0]);
        while (!stack.isEmpty()) {
            int currentVertex = stack.peek().index;
            int index = getAdjUnvisitedVertex(currentVertex);
            if (index == -1) { // no unvisited neighbor
                stack.pop();
            } else {
                vertexList[index].visited = true;
                stack.push(vertexList[index]);
                displayVertex(currentVertex);
                displayVertex(index);
                System.out.print(" ");
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
}
```
Test Junit.
```java
public void testMST() {
    System.out.println("testMST");
    /*
    Vertex | A | B | C | D | E
    -------|---|---|---|---|---
    A      | 0 | 1 | 0 | 1 | 0
    B      | 1 | 0 | 1 | 0 | 0
    C      | 0 | 1 | 0 | 0 | 0
    D      | 1 | 0 | 0 | 0 | 1
    E      | 0 | 0 | 0 | 1 | 0
    */
    MinimumSpanningTree mst = new MinimumSpanningTree(5);
    mst.addVertex("A");
    mst.addVertex("B");
    mst.addVertex("C");
    mst.addVertex("D");
    mst.addVertex("E");
    mst.addEdge(0, 1);  //AB
    mst.addEdge(0, 2);  //AC
    mst.addEdge(0, 3);  //AD
    mst.addEdge(0, 4);  //AE
    mst.addEdge(1, 2);  //BC
    mst.addEdge(1, 3);  //BD
    mst.addEdge(1, 4);  //BE
    mst.addEdge(2, 3);  //CD
    mst.addEdge(2, 4);  //CE
    mst.addEdge(3, 4);  //DE

    System.out.print("Minimum spanning tree: ");
    mst.mst();  // Minimum spanning tree: AB BC CD DE
    System.out.println();
}
```

## 4. Related Questions
* [Cheapest Flights Within K Stops](https://leetcode.com/problems/cheapest-flights-within-k-stops)

## 5. Source Files
* [Source files for Minimum Spanning Tree on GitHub](https://github.com/jojozhuang/dsa-java/tree/master/ds-spanning-tree)

## 6. Reference
* [Spanning Tree](https://www.javatpoint.com/spanning-tree)
