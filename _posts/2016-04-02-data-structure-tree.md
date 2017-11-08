---
layout: post
key: blog
title: "Data Structure - Tree"
date: 2016-04-02
tags: [Tree, Pre-Order, Post-Order, In-Order]
---

> A tree is a data structure composed of nodes.The tree cannot contain cycles. The nodes may or may not be in a particular order, they could have any data type as values, and they may or may not have links back to their parent nodes.

## 1. Definition of Tree
* Each tree has a root node.
* The root node has zero or more child nodes.
* Each child node has zero or more child nodes, and so on.

## 2. Distinguishing the following Concepts
* Graphs vs. Trees: A tree is a connected graph without cycles.
* Trees vs. Binary Trees: Each node in binary tree has no more than 2 children nodes.
* Binary Tree vs. Binary Search Tree: Every node in BST fits a specific ordering property: all left descendents <= current node < all right descendents.
* Balanced vs. Unbalanced: A tree is balanced if each sub-tree is balanced and the height of the two sub-trees differ by at most one.
* Complete Binary Trees: A complete binary tree is a binary tree in which every level of the tree is fully filled, except for perhaps the last level. To the extent that the last level is filled, it is filled left to right.
* Full Binary Trees: A full binary tree is a binary tree in which every node has either zero or two children.That is, no nodes have only one child.
* Perfect Binary Trees A perfect binary tree is one that is both full and complete. All leaf nodes will be at the same level, and this level has the maximum number of nodes.

## 3.  Binary Tree Traversal
### 3.1 Common Approaches
* Preorder -> Recursion or Iteration with Stack(Add right first, then left node to stack)
* Inorder -> Recursion or Iteration with Stack(Go to the deepest left node)
* Postorder -> Recursion or Iteration with Stack(Need to set node.left = null)
* Level -> Queue

### 3.2 Binary Tree Traversal(Recursion)
Pre-Order
```java
/**
 * @param root, the root node of a tree
 * @return list of the values from the tree nodes in pre-order
 */
public List<Integer> preorderRecursion(TreeNode root) {
    List<Integer> res = new ArrayList<Integer>();
    if (root == null) {
        return res;
    }

    List<Integer> left = preorderRecursion(root.left);
    List<Integer> right = preorderRecursion(root.right);

    res.add(root.val);
    res.addAll(left);
    res.addAll(right);

    return res;
}
```
In-Order
```java
/**
 * @param root, the root node of a tree
 * @return list of the values from the tree nodes in in-order
 */
public List<Integer> inorderRecursion(TreeNode root) {
    List<Integer> res = new ArrayList<Integer>();

    if (root == null) {
        return res;
    }

    List<Integer> left = inorderRecursion(root.left);
    List<Integer> right = inorderRecursion(root.right);

    res.addAll(left);
    res.add(root.val);
    res.addAll(right);

    return res;
}
```

Post-Order
```java
/**
 * @param root, the root node of a tree
 * @return list of the values from the tree nodes in post-order
 */
public List<Integer> postorderRecursion(TreeNode root) {
    List<Integer> res = new ArrayList<Integer>();

    if(root == null) {
        return res;
    }

    List<Integer> left = postorderRecursion(root.left);
    List<Integer> right = postorderRecursion(root.right);

    res.addAll(left);
    res.addAll(right);
    res.add(root.val);

    return res;
}
```

### 3.3 Binary Tree Traversal(Iteration)
Pre-Order
```java
/**
 * @param root, the root node of a tree
 * @return list of the values from the tree nodes in pre-order
 */
public List<Integer> preorderIteration(TreeNode root) {
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
/**
 * @param root, the root node of a tree
 * @return list of the values from the tree nodes in in-order
 */
public List<Integer> inorderIteration(TreeNode root) {
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
/**
 * @param root, the root node of a tree
 * @return list of the values from the tree nodes in post-order
 */
public List<Integer> postorderIteration(TreeNode root) {
    List<Integer> res = new ArrayList<Integer>();

    if (root == null) {
        return res;
    }

    Stack<TreeNode> stack = new Stack<TreeNode>();
    stack.push(root);

    while (!stack.isEmpty()) {
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

## 4. Level-Order in Binary Tree
## 4.1 Creating TreeNode With Level-Order String Array
For example, the below code create a tree with a root and right sub node. "#" stands for a empty node. The array contains level-order values for all the tree nodes.
```java
TreeNode root = TreeFactory.createInstance(new String[]{"1","#","3"});
```

Implementation of the 'createInstance' method.
```java
import java.util.LinkedList;
import java.util.Queue;

public class TreeFactory {
    public static TreeNode createInstance(String[] arr) {
        if(arr == null || arr.length == 0) {
            return null;
        }

        Queue<TreeNode> queueNode = new LinkedList<>();

        TreeNode root = new TreeNode(Integer.parseInt(arr[0]));
        queueNode.offer(root);

        int index = 0;
        while (index < arr.length - 1) {
            TreeNode node = queueNode.poll();
            if (node != null) {
                String str = arr[++index];
                if (!str.equals("#")) {
                    node.left = new TreeNode(Integer.parseInt(str));
                    queueNode.add(node.left);
                }
                str = arr[++index];
                if (!str.equals("#")) {
                    node.right = new TreeNode(Integer.parseInt(str));
                    queueNode.add(node.right);
                }
            }
        }

        return root;
    }
}

```

## 4.2 Level-Order Traversal in Binary Tree
Given binary tree {3,9,20,#,#,15,7},  
     3  
    / \  
   9  20  
     /  \  
    15   7  
 return its level order traversal as:  

 [  
   [3],  
   [9,20],  
   [15,7]  
 ]  

```java
/**
 * @param root, the root node of a tree
 * @return list of the values from the tree nodes in level order
 */
public List<List<Integer>> levelOrder(TreeNode root) {
    List<List<Integer>> res = new ArrayList<List<Integer>>();

    if (root == null) {
        return res;
    }

    Queue<TreeNode> queue = new LinkedList<TreeNode>();
    queue.offer(root);

    while (!queue.isEmpty()) {
        List<Integer> level = new ArrayList<Integer>();
        int size = queue.size();
        for (int i = 0; i < size; i++) {
            TreeNode node = queue.poll();
            level.add(node.val);
            if (node.left != null) {
                queue.offer(node.left);
            }
            if (node.right != null) {
                queue.offer(node.right);
            }
        }
        res.add(level);
    }

    return res;
}
```

## 5. Implementing Binary Search Tree
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

## 6. Source Files
* [Source files for Tree on GitHub](https://github.com/jojozhuang/DataStructure/tree/master/Tree)

## 7. Reference
* [Data Structure and Algorithms - Tree](https://www.tutorialspoint.com/data_structures_algorithms/tree_data_structure.htm)
