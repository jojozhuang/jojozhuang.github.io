---
layout: post
key: blog
title: "Data Structure - Tree"
date: 2016-04-02
categories:
- blog
---

> A tree is a data structure composed of nodes.The tree cannot contain cycles. The nodes mayor may not be in a particular order, they could have any data type as values, and they mayor may not have links back to their parent nodes.

## 1. Definition of Tree.
* Each tree has a root node.
* The root node has zero or more child nodes.
* Each child node has zero or more child nodes, and so on.

## 2. Trees vs. Graphs
A tree is a connected graph without cycles.
## 3. Trees vs. Binary Trees
## 3. Binary Tree vs. Binary Search Tree
## 4. Balanced vs. Unbalanced
## 5. Complete Binary Trees
A complete binary tree is a binary tree in which every level of the tree is fully filled, except for perhaps the
last level. To the extent that the last level is filled, it is filled left to right.
## 6. Full Binary Trees
A full binary tree is a binary tree in which every node has either zero or two children.That is, no nodes have
only one child.
## 7. Perfect Binary Trees
A perfect binary tree is one that is both full and complete. All leaf nodes will be at the same level, and this
level has the maximum number of nodes.
```java
```
## 8. Binary Tree Traversal
In-Order Traversal
```java
void inOrderTraversal(TreeNode node) {
    if (node != nUll) {
        inOrderTraversal(node.left);
        visit(node);
        inOrderTraversal(node.right);
    }
}
```

Pre-Order Traversal
```java
void preOrderTraversal(TreeNode node) {
    if (node != nUll) {
        visit(node);
        preOrderTraversal(node.left);
        preOrderTraversal(node.right);
    }
}
```

Post-Order Traversal
```java
void postOrderTraversal(TreeNode node) {
    if (node != nUll) {
        preOrderTraversal(node.left);
        preOrderTraversal(node.right);
        visit(node);
    }
}
```
## 6. Reference
Crack the Coding Interview, Edition 6.
