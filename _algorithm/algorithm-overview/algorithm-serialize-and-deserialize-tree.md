---
layout: tutorial
key: algorithm
title: "Algorithm - Serialize and Deserialize Tree"
index: 1306
subcategory: algorithm-overview
date: 2016-04-04
tags: [Tree, BST, NaryTree]
---

> Serialize and Deserialize Binary Tree, Binary Search Tree and N-ary Tree

## 1. Binary Tree
* Serialization - Convert a binary tree to string.
* Deserialization - Decode a string to binary tree.

For example, we have a tree as follows.
![image](/assets/images/algorithm/1121/binary_tree.png){:width="350px"}

### 1.1 Serializing Binary Tree By Level
Serialization will convert to tree to string ["1,2,3,#,#,4,5"] and deserialization will convert this string to the original tree.

Below is the implementation.
```java
public class BinaryTreeSerializationByLevel {
    private static final String SEPARATOR = ",";
    private static final String NULL = "#";
    // Encodes a tree to a single string.
    // Sample: 1,2,3,#,#,4,5
    public String serialize(TreeNode root) {
        if (root == null) {
            return "";
        }

        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        StringBuilder sb = new StringBuilder();
        sb.append(root.val).append(SEPARATOR);
        while (!queue.isEmpty()) {
            int size = queue.size();
            for (int i = 0; i < size; i++) {
                TreeNode node = queue.poll();
                if (node.left != null) {
                    queue.offer(node.left);
                    sb.append(node.left.val).append(SEPARATOR);
                } else {
                    sb.append(NULL).append(SEPARATOR);
                }
                if (node.right != null) {
                    queue.offer(node.right);
                    sb.append(node.right.val).append(SEPARATOR);
                } else {
                    sb.append(NULL).append(SEPARATOR);
                }

            }
        }
        sb.deleteCharAt(sb.length() - 1);
        return sb.toString();
    }

    // Decodes your encoded data to tree.
    public TreeNode deserialize(String data) {
        if (data == null || data.length() == 0) {
            return null;
        }

        String[] values = data.split(SEPARATOR);
        Queue<TreeNode> queue = new LinkedList<>();
        TreeNode root = new TreeNode(Integer.parseInt(values[0]));
        queue.offer(root);

        for (int i = 1; i < values.length; i = i + 2) {
            TreeNode node = queue.poll();
            if (!values[i].equals(NULL)) {
                node.left = new TreeNode(Integer.parseInt(values[i]));
                queue.offer(node.left);
            }
            if (!values[i + 1].equals(NULL)) {
                node.right = new TreeNode(Integer.parseInt(values[i + 1]));
                queue.offer(node.right);
            }
        }

        return root;
    }
}
```
### 1.2 Serializing Binary Tree with Recursion
We can also serialize binary tree recursively. The sequence is pre-order. Serialization will convert to tree to string ["1,2,#,#,3,4,#,#,5,#,#"].
```java
public class BinaryTreeSerializationRecursion {
    private static final String SEPARATOR = ",";
    private static final String NULL = "#";

    // Encodes a tree to a single string.
    // Sample: 1,2,#,#,3,4,5
    public String serialize(TreeNode root) {
        if (root == null) {
            return "";
        }

        StringBuilder sb = new StringBuilder();
        helper(root, sb);
        sb.deleteCharAt(sb.length() - 1);
        return sb.toString();
    }

    // pre-order
    private void helper(TreeNode root, StringBuilder sb) {
        if (root == null) {
            sb.append(NULL).append(SEPARATOR);
            return;
        }

        sb.append(root.val).append(SEPARATOR);
        helper(root.left, sb);
        helper(root.right, sb);
    }

    // Decodes your encoded data to tree.
    public TreeNode deserialize(String data) {
        if (data == null || data.length() == 0) {
            return null;
        }

        String[] values = data.split(SEPARATOR);
        int[] pos = new int[1];
        TreeNode root = helper(values, pos);

        return root;
    }

    // pre-order + recursion
    private TreeNode helper(String[] arr, int[] pos) {
        if (pos[0] >= arr.length) {
            return null;
        }

        String val = arr[pos[0]];
        if (val.equals(NULL)) {
            return null;
        }

        TreeNode root = new TreeNode(Integer.parseInt(val));
        pos[0]++;
        root.left = helper(arr, pos);
        pos[0]++;
        root.right = helper(arr, pos);

        return root;
    }
}
```
We can also implement iteration with stack for serialization. Besides, use queue for deserialization.
```java
// Limitation: Value can't be Integer.MAX_VALUE.
public class BinaryTreeSerializationIteration {
    private static final String SEPARATOR = ",";
    private static final String NULL = "#";

    // Encodes a tree to a single string.
    // Sample: 1,2,#,#,3,4,5
    // Iteration with explicit stack.
    public String serialize(TreeNode root) {
        if (root == null) {
            return "";
        }

        StringBuilder sb = new StringBuilder();
        Stack<TreeNode> stack = new Stack<>();
        stack.push(root);
        while (!stack.isEmpty()) {
            TreeNode node = stack.pop();
            if (node.val == Integer.MAX_VALUE) {
                sb.append(NULL).append(SEPARATOR);
            } else {
                sb.append(node.val).append(SEPARATOR);
                if (node.right == null) {
                    // use Integer.MAX_VALUE for null
                    stack.push(new TreeNode(Integer.MAX_VALUE));
                } else {
                    stack.push(node.right);
                }
                if (node.left == null) {
                    // use Integer.MAX_VALUE for null
                    stack.push(new TreeNode(Integer.MAX_VALUE));
                } else {
                    stack.push(node.left);
                }
            }
        }
        sb.deleteCharAt(sb.length() - 1);
        return sb.toString();
    }

    // Decodes your encoded data to tree.
    // Recursion + Queue.
    public TreeNode deserialize(String data) {
        if (data == null || data.length() == 0) {
            return null;
        }

        String[] values = data.split(SEPARATOR);
        Queue<String> queue = new LinkedList<>();
        for (String s : values) {
            queue.offer(s);
        }
        TreeNode root = helper(queue);

        return root;
    }

    // pre-order
    private TreeNode helper(Queue<String> queue) {
        if (queue.isEmpty()) {
            return null;
        }

        String val = queue.poll();
        if (val.equals(NULL)) {
            return null;
        }

        TreeNode root = new TreeNode(Integer.parseInt(val));
        root.left = helper(queue);
        root.right = helper(queue);

        return root;
    }
}
```

## 2. Binary Search Tree
Serialization and deserialization BST are little different with Binary Tree. We don't need to store null values since we can know the positions of nodes from their values.
```java
/**
 * Preorder for serialization and recursion for deserialization.
 *
 * Serialize the following tree to: "5,3,2,6,7".
 *
 *      5
 *    /  \
 *   3    6
 *  /     \
 * 2      7
 *
 */
public class BinarySearchTreeSerialization {
    private static final String SEPARATOR = ",";
    private static final String NULL = "#";

    // Encodes a tree to a single string in reversed sequence of pre-order
    public String serialize(TreeNode root) {
        StringBuilder sb = new StringBuilder();
        if (root == null) {
            return NULL;
        }
        Stack<TreeNode> stack = new Stack<>();
        stack.push(root);
        while (!stack.empty()) {
            root = stack.pop();
            sb.append(root.val).append(SEPARATOR);
            if (root.right != null) {
                stack.push(root.right);
            }
            if (root.left != null) {
                stack.push(root.left);
            }
        }
        sb.setLength(sb.length() - 1);
        return sb.toString();
    }

    // Decodes your encoded data to tree, pre-order traversal
    public TreeNode deserialize(String data) {
        if (data == null || data.isEmpty() || data.equals(NULL)) {
            return null;
        }
        String[] values = data.split(SEPARATOR);
        Queue<Integer> queue = new LinkedList<>();
        for (String val : values) {
            queue.offer(Integer.parseInt(val));
        }
        return helper(queue);
    }

    // some notes:
    //   5
    //  3 6
    // 2   7
    private TreeNode helper(Queue<Integer> queue) { // queue: 5,3,2,6,7
        if (queue.isEmpty()) {
            return null;
        }
        TreeNode root = new TreeNode(queue.poll()); // root (5)
        Queue<Integer> samllerQueue = new LinkedList<>();
        while (!queue.isEmpty() && queue.peek() < root.val) {
            samllerQueue.offer(queue.poll());
        }
        //smallerQueue : 3,2   storing elements smaller than 5 (root)
        root.left = helper(samllerQueue);
        //queue: 6,7   storing elements bigger than 5 (root)
        root.right = helper(queue);
        return root;
    }
}
```

## 3. N-ary Tree
An N-ary tree is a rooted tree in which each node has no more than N children. Convert each node to pair, <value, size>.
```java
/**
 * Serialize N-ary tree in pre-order. Each node is represented by (value, size).
 *
 * Serialize the following tree to: "1,3,3,2,5,0,6,0,2,0,4,0".
 *
 *      1
 *    / | \
 *   3  2  4
 *  / \
 * 5   6
 *
 */
public class NaryTreeSerialization {
    private static final String SEPARATOR = ",";
    // Encodes a n-ary tree to a single string.
    // Sample: 1,3,3,2,5,0,6,0,2,0,4,0
    public String serialize(NaryNode root){
        StringBuilder sb = new StringBuilder();
        helper(root, sb);
        if(sb.length() > 0) {
            sb.deleteCharAt(sb.length()-1);
        }
        return sb.toString();
    }

    private void helper(NaryNode node, StringBuilder sb){
        if (node == null) {
            return;
        }
        sb.append(node.val + SEPARATOR + node.children.size() + SEPARATOR);
        for (NaryNode nn : node.children) {
            helper(nn, sb);
        }
    }

    public NaryNode deserialize(String data){
        if (data == null || data.isEmpty()) {
            return null;
        }
        String[] values = data.split(SEPARATOR);
        Queue<String> queue = new LinkedList<>();
        for (String val: values) {
            queue.offer(val);
        }
        return helper(queue);
    }

    private NaryNode helper(Queue<String> queue){
        NaryNode root = new NaryNode();
        root.val = Integer.parseInt(queue.poll());
        int size = Integer.parseInt(queue.poll());
        root.children = new ArrayList<>(size);
        for (int i = 0; i < size; i++) {
            root.children.add(helper(queue));
        }
        return root;
    }
}
```

## 4. Source Files
* [Source files for Serialize and Deserialize Tree on GitHub](https://github.com/jojozhuang/dsa-java/tree/master/alg-tree-serialization)

## 5. References
* [Serialize and Deserialize Binary Tree / BST / NaryTree](https://www.youtube.com/watch?v=uaS1xEMZL_E)
* [Serialize and Deserialize an N-ary Tree](https://www.geeksforgeeks.org/serialize-deserialize-n-ary-tree/)
* [Serialize and Deserialize Binary Tree](https://www.youtube.com/watch?v=JL4OjKV_pGE&t=363s)
* [Serialize and Deserialize BST](https://www.youtube.com/watch?v=GDqVCQcmxgU)
