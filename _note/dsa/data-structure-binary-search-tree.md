---
layout: note
key: note
title: "Data Structure - Binary Search Tree"
index: 306
category: dsa
image: /note/dsa.png
date: 2016-03-06
postdate: 2016-03-06
tags: [BST]
mathjax: true
---

> Introduce what is Tree, how to construct it and how to use it.

## 1. Binary Search Tree

## 6. Implementing Binary Search Tree
Methods:  
* insert(int value)
* find(int value)
* size()

```java
public class BSTNode {
    public int val;
    public BSTNode left, right;
    private int size = 0;

    public BSTNode(int value) {
        this.val = value;
        this.size = 1;
    }

    public void insert(int value) {

    }

    public BSTNode find(int value) {
        return null;
    }

    public int size() {
        return this.size;
    }
}
```

## 7. Source Files
* [Source files for Tree on GitHub](https://github.com/jojozhuang/DataStructure/tree/master/Tree)
* [Stack Diagrams(draw.io) in Google Drive](https://drive.google.com/file/d/10KemmKHtZPHko6qIhThmVVaqH5X1Nz5o/view?usp=sharing)

## 8. Reference
* [Binary Search Tree - Search and Insertion)](https://www.geeksforgeeks.org/binary-search-tree-set-1-search-and-insertion/)
* [Binary Search Tree - Delete](https://www.geeksforgeeks.org/binary-search-tree-set-2-delete/)
* [Binary Search Tree Complete Implementation](https://algorithms.tutorialhorizon.com/binary-search-tree-complete-implementation/)
