---
layout: post
key: blog
title: "Data Structure - Tree"
date: 2016-04-02
categories:
- blog
---

> A tree is a data structure composed of nodes.The tree cannot contain cycles. The nodes mayor may not be in a particular order, they could have any data type as values, and they mayor may not have links back to their parent nodes.

## 1. Definition of Tree
* Each tree has a root node.
* The root node has zero or more child nodes.
* Each child node has zero or more child nodes, and so on.

## 2. Distinguish the following Concepts
* Graphs vs. Trees: A tree is a connected graph without cycles.
* Trees vs. Binary Trees: Each node in binary tree has no more than 2 children nodes.
* Binary Tree vs. Binary Search Tree: Every node in BST fits a specific ordering property: all left descendents <= current node < all right descendents.
* Balanced vs. Unbalanced: A tree is balanced if each sub-tree is balanced and the height of the two sub-trees differ by at most one.
* Complete Binary Trees: A complete binary tree is a binary tree in which every level of the tree is fully filled, except for perhaps the last level. To the extent that the last level is filled, it is filled left to right.
* Full Binary Trees: A full binary tree is a binary tree in which every node has either zero or two children.That is, no nodes have only one child.
* Perfect Binary Trees A perfect binary tree is one that is both full and complete. All leaf nodes will be at the same level, and this level has the maximum number of nodes.
## 3. Binary Tree Traversal(Recursion)
Pre-Order
```java
public List<Integer> preorderTraversal(TreeNode root) {
    List<Integer> res = new ArrayList<Integer>();
    if (root == null) {
        return res;
    }

    List<Integer> left = preorderTraversal(root.left);
    List<Integer> right = preorderTraversal(root.right);

    res.add(root.val);
    res.addAll(left);
    res.addAll(right);
    return resres;
}
```
In-Order
```java
public List<Integer> inorderTraversal(TreeNode root) {
    List<Integer> res = new ArrayList<Integer>();

    if (root == null) {
        return res;
    }

    List<Integer> left = inorderTraversal(root.left);
    List<Integer> right = inorderTraversal(root.right);

    res.addAll(left);
    res.add(root.val);
    res.addAll(right);

    return res;
}
```

Post-Order
```java
public List<Integer> postorderTraversal2(TreeNode root) {
    List<Integer> res = new ArrayList<Integer>();

    if(root == null) {
        return res;
    }

    List<Integer> left = postorderTraversal(root.left);
    List<Integer> right = postorderTraversal(root.right);

    res.addAll(left);
    res.addAll(right);
    res.add(root.val);
    return res;
}
```
## 4. Binary Tree Traversal(Iteration)
Pre-Order
```java
public List<Integer> preorderTraversal(TreeNode root) {
    List<Integer> res = new ArrayList<Integer>();

    if (root == null) {
        return res;
    }

    Stack<TreeNode> stack = new Stack<TreeNode>();
    stack.push(root);
    while (!stack.empty()) {
        TreeNode node = stack.pop();
        res.add(node.val);

        if (node.right != null) {
            stack.push(node.right);
        }
        if (node.left != null) {
            stack.push(node.left);
        }
    }

    return res;
}
```

In-Order
```java
public List<Integer> inorderTraversal(TreeNode root) {
    List<Integer> res = new ArrayList<Integer>();

    if (root == null) {
        return res;
    }

    Stack<TreeNode> stack = new Stack<TreeNode>();
    TreeNode curr = root;

    while (curr != null || !stack.empty()) {
        while (curr != null) {
            stack.push(curr);
            curr = curr.left;
        }
        curr = stack.pop();
        res.add(curr.val);
        curr = curr.right;
    }
    return res;
}
```

Post-Order
```java
public List<Integer> postorderTraversal(TreeNode root) {
    List<Integer> res = new ArrayList<Integer>();

    if (root == null) {
        return res;
    }

    Stack<TreeNode> stack = new Stack<TreeNode>();
    stack.push(root);

    while(!stack.isEmpty()) {
        TreeNode node = stack.peek();
        if (node.left == null) {
            if (node.right != null) {
                stack.push(node.right);
                node.right = null;
            } else {
                res.add(node.val);
                stack.pop();
            }
        } else {
            if (node.right != null) {
                stack.push(node.right);
                node.right = null;
            }
            stack.push(node.left);
            node.left = null;
        }            
    }

    return res;
}
```

## 5. Reference
Crack the Coding Interview, Edition 6.
