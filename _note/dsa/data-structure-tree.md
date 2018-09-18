---
layout: note
key: note
title: "Data Structure - Tree"
index: 305
category: dsa
image: /note/dsa.png
date: 2016-03-05
postdate: 2016-03-05
tags: [Tree, Binary Tree]
mathjax: true
---

> Introduce what is Tree, how to construct it and how to use it.

A tree is a data structure composed of nodes.The tree cannot contain cycles. The nodes may or may not be in a particular order, they could have any data type as values, and they may or may not have links back to their parent nodes.

## 1. Definition of Tree
* Each tree has a root node.
* The root node has zero or more child nodes.
* Each child node has zero or more child nodes, and so on.

## 2. Distinguishing the following Concepts
* Graphs vs. Trees: A tree is a connected graph without cycles.
* Trees vs. `Binary Trees`: Each node in binary tree has no more than 2 children nodes.
* Binary Tree vs. `Binary Search Tree`: Every node in BST fits a specific ordering property: all left descendents <= current node < all right descendents.
* `Balanced` vs. Unbalanced: A tree is balanced if each sub-tree is balanced and the height of the two sub-trees differ by at most one.
* `Complete Binary Trees`: A complete binary tree is a binary tree in which every level of the tree is fully filled, except for perhaps the last level. To the extent that the last level is filled, it is filled left to right.
* `Full Binary Trees`: A full binary tree is a binary tree in which every node has either zero or two children.That is, no nodes have only one child.
* `Perfect Binary Trees`: A perfect binary tree is one that is both full and complete. All leaf nodes will be at the same level, and this level has the maximum number of nodes.

![image](/public/notes/data-structure-tree/trees.png){:width="1000px"}  

## 3. Binary Tree Properties
* The maximum number of nodes at level `'l'` of a binary tree is $2^{l-1}$.
* Maximum number of nodes in a binary tree of height `'h'` is $2^h-1$, since 1 + 2 + 4 + .. + $2^{h-1}$ = $2^h-1$.
* In a Binary Tree with `'n'` nodes, minimum possible height or minimum number of levels is $\log_{2}(n+1)$.
* A Binary Tree with `'l'` leaves has at least $\log_{2}(l) + 1$ levels.
* In Binary tree where every node has 0 or 2 children, number of leaf nodes is always one more than nodes with two children.

## 4. Binary Tree Traversal
### 4.1 Definition of Binary Tree
A tree whose elements have at most 2 children is called a binary tree. Since each element in a binary tree can have only 2 children, we typically name them the left and right child.
![image](/public/notes/data-structure-tree/binary_tree.png){:width="350px"}  
### 4.2 Implementing Tree Node
```java
public class TreeNode {
    public int val;
    public TreeNode left;
    public TreeNode right;
    public TreeNode(int val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}
```
### 4.3 Common Traversal Approaches On Binary Tree
* Preorder -> Recursion or Iteration with Stack(Add right first, then left node to stack)
* Inorder -> Recursion or Iteration with Stack(Go to the deepest left node)
* Postorder -> Recursion or Iteration with Stack(Need to set node.left = null)
* Level -> Queue

### 4.4 Binary Tree Traversal(Recursion)
Pre-Order: Given binary tree {1,2,3,#,#,4,5}, output [1,2,3,4,5].
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
In-Order: Given binary tree {1,2,3,#,#,4,5}, output [2,1,4,3,5].
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
Post-Order: Given binary tree {1,2,3,#,#,4,5}, output [2,4,5,3,1].
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
### 4.5 Binary Tree Traversal(Iteration)
Pre-Order: Given binary tree {1,2,3,#,#,4,5}, output [1,2,3,4,5].
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
In-Order: Given binary tree {1,2,3,#,#,4,5}, output [2,1,4,3,5].
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
Post-Order: Given binary tree {1,2,3,#,#,4,5}, output [2,4,5,3,1].
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
### 4.6 Binary Tree Traversal(General Template)
Suppose we have a tree as follows.
![image](/public/notes/data-structure-tree/tree_template.png){:width="200px"}
There are totally 6 traversal ways.  
```java
/**
 * 1->2->3
 */
public List<Integer> preorderTraversal(TreeNode root) {
    List<Integer> res = new ArrayList<>();
    Deque<TreeNode> stack = new ArrayDeque<>();
    TreeNode curr = root;
    while(!stack.isEmpty() || curr != null) {
        if(curr != null) {
            stack.push(curr);
            res.add(curr.val);  // Add before going to children
            curr = curr.left;
        } else {
            TreeNode node = stack.pop();
            curr = node.right;
        }
    }
    return res;
}

/**
 * 2->1->3
 */
public List<Integer> inorderTraversal(TreeNode root) {
    List<Integer> res = new ArrayList<>();
    Deque<TreeNode> stack = new ArrayDeque<>();
    TreeNode curr = root;
    while(!stack.isEmpty() || curr != null) {
        if(curr != null) {
            stack.push(curr);
            curr = curr.left;
        } else {
            TreeNode node = stack.pop();
            res.add(node.val);  // Add after all left children
            curr = node.right;
        }
    }
    return res;
}

/**
 * 2->3->1
 */
public List<Integer> postorderTraversal(TreeNode root) {
    LinkedList<Integer> res = new LinkedList<>();
    Deque<TreeNode> stack = new ArrayDeque<>();
    TreeNode curr = root;
    while(!stack.isEmpty() || curr != null) {
        if(curr != null) {
            stack.push(curr);
            res.addFirst(curr.val);     // Reverse the process of preorder
            curr = curr.right;          // Reverse the process of preorder
        } else {
            TreeNode node = stack.pop();
            curr = node.left;           // Reverse the process of preorder
        }
    }
    return res;
}

/**
 * 1->3->2
 */
public List<Integer> preorderTraversal2(TreeNode root) {
    List<Integer> res = new ArrayList<>();
    Deque<TreeNode> stack = new ArrayDeque<>();
    TreeNode curr = root;
    while(!stack.isEmpty() || curr != null) {
        if(curr != null) {
            stack.push(curr);
            res.add(curr.val);  // Add before going to children
            curr = curr.right;
        } else {
            TreeNode node = stack.pop();
            curr = node.left;
        }
    }
    return res;
}

/**
 * 3->1->2
 */
public List<Integer> inorderTraversal2(TreeNode root) {
    List<Integer> res = new ArrayList<>();
    Deque<TreeNode> stack = new ArrayDeque<>();
    TreeNode curr = root;
    while(!stack.isEmpty() || curr != null) {
        if(curr != null) {
            stack.push(curr);
            curr = curr.right;
        } else {
            TreeNode node = stack.pop();
            res.add(node.val);  // Add after all left children
            curr = node.left;
        }
    }
    return res;
}

/**
 * 3->2->1
 */
public List<Integer> postorderTraversal2(TreeNode root) {
    LinkedList<Integer> res = new LinkedList<>();
    Deque<TreeNode> stack = new ArrayDeque<>();
    TreeNode curr = root;
    while(!stack.isEmpty() || curr != null) {
        if(curr != null) {
            stack.push(curr);
            res.addFirst(curr.val);     // Reverse the process of preorder
            curr = curr.left;          // Reverse the process of preorder
        } else {
            TreeNode node = stack.pop();
            curr = node.right;           // Reverse the process of preorder
        }
    }
    return res;
}
```

## 5. Level-Order in Binary Tree
## 5.1 Creating TreeNode With Level-Order String Array
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

        Queue<TreeNode> queue = new LinkedList<>();

        TreeNode root = new TreeNode(Integer.parseInt(arr[0]));
        queue.offer(root);

        int index = 0;
        while (index < arr.length - 1) {
            TreeNode node = queue.poll();
            if (node != null) {
                String str = arr[++index];
                if (!str.equals("#")) {
                    node.left = new TreeNode(Integer.parseInt(str));
                    queue.add(node.left);
                }
                str = arr[++index];
                if (!str.equals("#")) {
                    node.right = new TreeNode(Integer.parseInt(str));
                    queue.add(node.right);
                }
            }
        }

        return root;
    }
}
```

## 5.2 Level-Order Traversal on Binary Tree
Given binary tree {3,9,20,#,#,15,7} as follows.
![image](/public/notes/data-structure-tree/tree_level_order.png){:width="350px"}
Return its level order traversal as:  
```raw
 [  
   [3],  
   [9,20],  
   [15,7]  
 ]  
```
Use Queue to traverse the tree by layer.
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

## 6. Source Files
* [Source files for Tree on GitHub](https://github.com/jojozhuang/DataStructure/tree/master/Tree)
* [Tree Diagrams(draw.io) in Google Drive](https://drive.google.com/file/d/10KemmKHtZPHko6qIhThmVVaqH5X1Nz5o/view?usp=sharing)
* [Binary Tree Diagrams(draw.io) in Google Drive](https://drive.google.com/file/d/1WAxUtv_nD9CJ1E5e8JaW-Kf9Vi3fLl9x/view?usp=sharing)

## 7. Reference
* [Data Structure and Algorithms - Tree](https://www.tutorialspoint.com/data_structures_algorithms/tree_data_structure.htm)
* [Binary Tree Data Structure](http://www.geeksforgeeks.org/binary-tree-data-structure/)
