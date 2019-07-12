---
layout: tutorial
key: popular
title: "Red Black Tree - draft"
index: 1123
courseid: DS110
category: datastructure
breadcrumb: [Popular, General, Data Structure]
image: dsa.png
date: 2016-03-09
postdate: 2016-03-09
tags: [RBT]
mathjax: true
---

> Introduce the definition, implementation and usage of red black tree.

## 1. Problems with Binary Search Tree
For Binary Search Tree, although the average time complexity for the search, insertion and deletion are all $O(\log{}n)$, where **n** is the number of nodes in the tree, the time complexity becomes to $O(n)$ in worst case - BST is not balanced.
![image](/public/images/dsa/309/bst.png){:width="800px"}

We can guarantee $O(\log{}n)$ time for all three operations by using a balanced tree - a tree that always has height `log(n)`.

## 2. Red Black Tree
### 2.1 Definition of RBT
A red black tree is a binary search tree with following four properties.
* `Color property`: Each node has a color (red or black) associated with it (in addition to its key, left and right children).
* `Root property`: The root of the red-black tree is black.
* `Red property`: The children of a red node are black.
* `Black property`: For each node with at least one null child, the number of black nodes on the path from the root to the null child is the same.

Examples of Red Black Tree.
![image](/public/images/dsa/309/red-black-tree.png)
The following examples are **NOT** Red Black Tree.
![image](/public/images/dsa/309/not-rbt.png)
### 1.2 Time Complexity
* Search - $O(\log{}n)$
* Insertion - $O(\log{}n)$
* Deletion - $O(\log{}n)$

### 1.3 Space Complexity
* $O(n)$

## 2. Search
Same as [Binary Search Tree](/popular/datastructure/data-structure-binary-search-tree/#2-search).

## 3. Insertion
The goal of the insert operation is to insert key `x` into tree `T`, and keep T's red-black tree properties. We use `Recoloring` and `Rotation` to achieve that.

There are several cases when inserting a new key to RBT. We will go through all of them below.
### 3.1 Special Case: Empty Tree
A special case is required for an empty tree. If T is empty, replace it with a single black node containing x. This ensures that the root property is satisfied.
![image](/public/images/dsa/309/insertion-special-case.png){:width="700px"}
### 3.2 Non-empty Tree
If T is a non-empty tree, then we do the following:
* 1) Use the BST insert algorithm to add x to the tree
* 2) color the node containing x to red
* 3) restore red-black tree properties (if necessary)

For step 3, what we need to do depends on the color of x's parent. Let `p` be x's parent. We need to consider two cases:
* **Case 1**: x's parent p is **black**. The insertion of x does not result in the red property being violated, so there's nothing more to do.
* **Case 2**: K's parent p is <span style="color:red">**red**</span>.  
For easy understanding, we have the following naming convention.
![image](/public/images/dsa/309/naming.png){:width="700px"}
If `p` is red, then p now has a red child, which violates the red property. Note that p's parent, `g`, must be black. In order to handle this double-red situation, we will need to consider the color of g's other child, that is, p's sibling, `s`. (Note that s might be null, i.e., g only has one child and that child is p.) We have two cases:
  * **Case 2a**: `p`'s sibling `s` is <span style="color:red">**red**</span>.  
    Perform recoloring of `p`, `s` and `g`: the color of `p` and `s` is changed to **black** and the color of `g` is changed to <span style="color:red">**red**</span> (unless `g` is the root, in which case we leave `g` **black** to preserve the root property).
    ![image](/public/images/dsa/309/case2a.png){:width="900px"}
    Recoloring does not affect the black property of a tree: the number of black nodes on any path that goes through `p` and `g` is unchanged when `p` and `g` switch colors (similarly for `s` and `g`). But, the recoloring may have introduced a double-red situation between `g` and `g`'s parent. If that is the case, then we `recursively` handle the double-red situation starting at `g` and `g`'s parent (instead of `x` and `x`'s parent).
  * **Case 2b**: `p`'s sibling `s` is **black** or **null**.  
    If `s` is black or null, then we will do a tri-node restructuring of `x`, `p` and `g`. There are four subcases for the relative ordering of x, p and g. The way a restructuring is done for each of the possibilities is shown below.
    * i) Left Left Case (p is left child of g and x is left child of p)
    ![image](/public/images/dsa/309/case2b1.png){:width="900px"}
    * ii) Left Right Case (p is left child of g and x is right child of p)
    ![image](/public/images/dsa/309/case2b2.png){:width="900px"}
    * iii) Right Right Case (Mirror of case i)
    ![image](/public/images/dsa/309/case2b3.png){:width="900px"}
    * iv) Right Left Case (Mirror of case ii)
    ![image](/public/images/dsa/309/case2b4.png){:width="900px"}

### 3.3 Example of Insertion
![image](/public/images/dsa/309/example-insertion.png)

## 4. Deletion
There are three cases when deleting a node from Binary Search Tree.
* Node is leaf, has no children.
* Node has only one child.
* Node has two children.

### 4.1 Node Has No Children
![image](/public/images/dsa/data-structure-binary-search-tree/delete4.png)
The solution is easy, simply remove the node from the tree.
### 4.2 Node Has One Child
![image](/public/images/dsa/data-structure-binary-search-tree/delete9.png)
If node has only one child, then replace this node with its child.
### 4.3 Node Has Two Children
This case is more complex, and we have two options.  
1) Populate successor
![image](/public/images/dsa/data-structure-binary-search-tree/delete3successor.png)
Find inorder successor of the node. Replace the node with its successor and delete the successor from its original parent.  
2) Populate predecessor  
![image](/public/images/dsa/data-structure-binary-search-tree/delete3predecessor.png)
Find inorder predecessor of the node. Replace the node with its predecessor and delete the predecessor from its original parent.  

The following implementation populates the successor of the deleted node.
```java
public boolean delete(int val) {
    BSTNode parent = root;
    BSTNode current = root;
    boolean isLeftChild = false;

    while (current.val != val){
        parent = current;
        if (current.val > val){
            isLeftChild = true;
            current = current.left;
        } else {
            isLeftChild = false;
            current = current.right;
        }
        if (current == null) {
            return false;
        }
    }

    //if i am here that means we have found the node
    //Case 1: if node to be deleted has no children(leaf)
    if (current.left == null && current.right == null) {
        if (current == root) {
            root = null;
        }
        if (isLeftChild == true) {
            parent.left = null;
        } else {
            parent.right = null;
        }
    }
    //Case 2 : if node to be deleted has only one child
    else if (current.right == null) {
        if (current == root) {
            root = current.left;
        } else if(isLeftChild) {
            parent.left = current.left;
        } else {
            parent.right = current.left;
        }
    }
    else if (current.left == null) {
        if (current == root) {
            root = current.right;
        } else if (isLeftChild) {
            parent.left = current.right;
        }else{
            parent.right = current.right;
        }
    }
    //Case 3 : if node to be deleted has two children
    else if (current.left != null && current.right != null){
        //now we have found the minimum element in the right sub tree
        BSTNode successor = getSuccessor(current);
        if (current == root) {
            root = successor;
        } else if (isLeftChild) {
            parent.left = successor;
        }else{
            parent.right = successor;
        }
        successor.left = current.left;
    }
    return true;
}

private BSTNode getSuccessor(BSTNode deleleNode) {
    BSTNode successsor =null;
    BSTNode successsorParent =null;
    BSTNode current = deleleNode.right;
    while (current != null){
        successsorParent = successsor;
        successsor = current;
        current = current.left;
    }
    //check if successor has the right child, it cannot have left child for sure
    // if it does have the right child, add it to the left of successorParent.
    //      successsorParent
    if (successsor != deleleNode.right) {
        successsorParent.left = successsor.right;
        successsor.right = deleleNode.right;
    }
    return successsor;
}
```

## 5. Balanced Binary Search Tree
In some cases, we need to convert a normal BST tree to a balanced BST.
![image](/public/images/dsa/data-structure-binary-search-tree/balanced_bst.png){:width="800px"}
We can convert it with the following two steps.
* Get the sorted node list from existing bst tree by traversing it inorder.
* Binary construct the balanced BST with the sorted node list.

```java
public BSTNode rebalanceBST(BSTNode root) {
    List<BSTNode> list = inorder(root);
    if (list == null || list.size() == 0) {
        return null;
    }

    return sortedListToBST(list, 0, list.size() - 1);
}

// build bst with give node list.
private BSTNode sortedListToBST(List<BSTNode> list, int start, int end) {
    if (start > end) {
        return null;
    }

    int mid = start + (end - start) / 2;
    BSTNode root = list.get(mid);

    root.left = sortedListToBST(list, start, mid - 1);
    root.right = sortedListToBST(list, mid + 1, end);
    return root;
}

// get the sorted node list of bst tree
public List<BSTNode> inorder(BSTNode root) {
    List<BSTNode> res = new ArrayList<BSTNode>();

    if (root == null) {
        return res;
    }

    List<BSTNode> left = inorder(root.left);
    List<BSTNode> right = inorder(root.right);

    res.addAll(left);
    res.add(root);
    res.addAll(right);

    return res;
}
```

## 6. Binary Search Tree Iterator
```java
public class BSTIterator {
    private Stack<BSTNode> stack = new Stack<BSTNode>();
    private BSTNode curr;
    public BSTIterator(BSTNode root) {
        curr = root;
    }

    /** @return whether we have a next smallest number */
    public boolean hasNext() {
        return (curr != null || !stack.isEmpty());
    }

    /** @return the next smallest number */
    public int next() {
        while (curr != null) {
            stack.push(curr);
            curr = curr.left;
        }

        curr = stack.pop();
        int res = curr.val;
        curr = curr.right;
        return res;
    }
}
```

## 7. Classic Problems
* [LeetCode 501 - Find Mode in Binary Search Tree](https://leetcode.com/problems/find-mode-in-binary-search-tree/)

## 8. Source Files
* [Source files for Binary Search Tree on GitHub](https://github.com/jojozhuang/dsa-java/tree/master/ds-binary-search-tree)
* [Red Black Tree Diagrams(draw.io) in Google Drive](https://drive.google.com/file/d/1YKBH9VD-vg7LqoYj77tjU6sEQ64y9StE/view?usp=sharing)

## 9. Reference
* [Red-Black Trees](http://pages.cs.wisc.edu/~skrentny/cs367-common/readings/Red-Black-Trees/)
* [Red-Black Tree - Set 1 (Introduction)](https://www.geeksforgeeks.org/red-black-tree-set-1-introduction-2/)
* [Red-Black Tree - Set 2 (Insert)](https://www.geeksforgeeks.org/red-black-tree-set-2-insert/)
* [Red-Black Tree - Set 3 (Delete)](https://www.geeksforgeeks.org/red-black-tree-set-3-delete-2/)
* [Red-black trees in 4 minutes — The basics](https://www.youtube.com/watch?v=qvZGUFHWChY)
* [Red-Black Trees - Data Structures](https://www.youtube.com/watch?v=ZxCvM-9BaXE)
* [Insertion for Red-Black Trees](https://www.youtube.com/watch?v=JwgeECkckRo)
* [Red/Black Tree Visualization](https://www.cs.usfca.edu/~galles/visualization/RedBlack.html)
