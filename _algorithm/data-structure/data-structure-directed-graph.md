---
layout: tutorial
key: algorithm
title: "Data Structure - Directed Graph - Draft"
index: 1144
subcategory: data-structure
date: 2016-03-18
tags: [Directed Graph, Topological Sorting]
draft: true
---

> Implement directed graph.

## 1. Directed Graph
A directed graph (or digraph) is a set of vertices and a collection of directed edges that each connects an ordered pair of vertices. We say that a directed edge points from the first vertex in the pair and points to the second vertex in the pair. We use the names 0 through V-1 for the vertices in a V-vertex graph.

## 2. Topological Sorting
Out-degree and In-degree

Given a digraph, put the vertices in order such that all its directed edges point from a vertex earlier in the order to a vertex later in the order (or report that doing so is not possible). Topological.java solves this problem using depth-first search. Remarkably, a reverse postorder in a DAG provides a topological order.

## 3. Detect Cycle in a Directed Graph
Given a directed graph, check whether the graph contains a cycle or not. Your function should return true if the given graph contains at least one cycle, else return false. For example, the following graph contains three cycles 0->2->0, 0->1->2->0 and 3->3, so your function must return true.

## 4. Classic Problems
* [LintCode 127 - Topological Sorting](http://lintcode.com/problem/topological-sorting/)

## 5. Source Files
* [Source files for Directed Graph on GitHub](https://github.com/jojozhuang/dsa-java/tree/master/ds-directed-graph)

## 6. Reference
* [Directed Graphs](https://algs4.cs.princeton.edu/42digraph/)
* [Detect Cycle in a Directed Graph](https://www.geeksforgeeks.org/?p=18516/)
* [Topological Sorting](https://www.geeksforgeeks.org/topological-sorting/)
