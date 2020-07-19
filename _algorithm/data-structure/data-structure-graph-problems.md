---
layout: tutorial
key: algorithm
title: "Data Structure - Graph Problems"
index: 1142
subcategory: data-structure
date: 2016-03-16
tags: [Graph, DFS, BFS]
mathjax: true
---

> Popular graph problems.

## 1. Number of Islands
### 1.1 Description
Given a 2d grid map of '1's (land) and '0's (water), count the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.

Example 1:
```raw
Input:
11110
11010
11000
00000
Output: 1
```

Example 2:
```raw
Input:
11000
11000
00100
00011
Output: 3
```
### 1.2 Solution 1: DFS
Recursive. Use additional 'visited' matrix to record whether cell has been accessed. Space: (m*n), Time: (m*n).
```java
// DFS: space: O(m*n), time: (m*n)
public int numIslands3(char[][] grid) {
    if (grid == null || grid.length == 0 || grid[0].length == 0) {
        return 0;
    }

    int m = grid.length;
    int n = grid[0].length;
    boolean[][] visited = new boolean[m][n];

    int ans = 0;
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            if (grid[i][j] == '1' && !visited[i][j]) {
                dfs(grid, i, j, visited);
                ans++;
            }
        }
    }

    return ans;
}

private void dfs(char[][] grid, int r, int c, boolean[][] visited) {
    int m = grid.length;
    int n = grid[0].length;
    if (r < 0 || r >= m || c < 0 || c >= n || visited[r][c] || grid[r][c] == '0') {
        return;
    }

    visited[r][c] = true;
    dfs(grid, r - 1, c, visited); // up
    dfs(grid, r + 1, c, visited); // down
    dfs(grid, r, c - 1, visited); // left
    dfs(grid, r, c + 1, visited); // right
}
```
Modifying the original given grid, space: O(1), time: (m*n).
```java
// DFS: change values of given grid, space: O(1), time: (m*n)
public int numIslands2(char[][] grid) {
    if (grid == null || grid.length == 0 || grid[0].length == 0) {
        return 0;
    }

    int m = grid.length;
    int n = grid[0].length;
    int ans = 0;

    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            if (grid[i][j] == '1') {
                ans++;
                dfs(grid, i, j);
            }
        }
    }  

    return ans;
}

// set adjacent cell to 0
private void dfs(char[][] grid, int i, int j) {
    int m = grid.length;
    int n = grid[0].length;
    if (i < 0 || i >= m || j < 0 || j >= n) {
        return;
    }

    if (grid[i][j] == '1') {
        grid[i][j] = '0';
        dfs(grid, i - 1, j); // up
        dfs(grid, i + 1, j); // down
        dfs(grid, i, j - 1); // left
        dfs(grid, i, j + 1); // right
    }
}
```
### 1.3 Solution 2: BFS
Use queue to to store all cells for the next round scan. Use hashset to avoid adding duplicate cells to queue. Space: min(m,n), time: (m*n)
```java
// BFS: change values of given grid, space: O(1), time: (m*n)
public int numIslands(char[][] grid) {
    if (grid == null || grid.length == 0 || grid[0].length == 0) {
        return 0;
    }

    int m = grid.length;
    int n = grid[0].length;
    int[] dr = new int[]{0, -1, 0, 1};
    int[] dc = new int[]{1, 0, -1, 0};
    int ans = 0;

    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            if (grid[i][j] == '1') {
                ans++;
                Queue<int[]> queue = new LinkedList<>();
                queue.offer(new int[] {i, j});
                while (!queue.isEmpty()) {
                    Set<Integer> set = new HashSet<>();
                    int size = queue.size();
                    for (int k = 0; k < size; k++) {
                        int[] pos = queue.poll();
                        grid[pos[0]][pos[1]] = '0';
                        for (int p = 0; p < 4; p++) {
                            int r = pos[0] + dr[p];
                            int c = pos[1] + dc[p];
                            if (r < 0 || r >= m || c < 0 || c >= n || grid[r][c] == '0') {
                                continue;
                            }
                            if (!set.contains(r * n + c)) {
                                queue.offer(new int[] {r, c});
                                set.add(r * n + c);
                            }
                        }
                    }
                }
            }
        }
    }  

    return ans;
}
```
## 2. Shortest Bridge
### 2.1 Description
In a given 2D binary array A, there are two islands.  (An island is a 4-directionally connected group of 1s not connected to any other 1s.)

Now, we may change 0s to 1s so as to connect the two islands together to form 1 island.

Return the smallest number of 0s that must be flipped.  (It is guaranteed that the answer is at least 1.)

Example 1:
```raw
Input:
[[0,1],
 [1,0]]
Output: 1
```
Example 2:
```raw
Input:
[[0,1,0],
 [0,0,0],
 [0,0,1]]
Output: 2
```
Example 3:
```raw
Input:
[[1,1,1,1,1],
 [1,0,0,0,1],
 [1,0,1,0,1],
 [1,0,0,0,1],
 [1,1,1,1,1]]
Output: 1
```
### 2.2 Solution with DFS + BFS
Use DFS to find out all islands, then use BFS to find the shortest distance.
```java
public int shortestBridge(int[][] A) {
    if (A == null || A.length == 0 || A[0].length == 0) {
        return 0;
    }

    int m = A.length;
    int n = A[0].length;
    Queue<int[]> queue = new LinkedList<int[]>();
    // add any node of the first island into queue
    boolean found = false;
    for (int i = 0; i < m && !found; i++) {
        for (int j = 0; j < n && !found; j++) {
            if (A[i][j] == 1) {
                dfs(A, m, n, i, j, queue);
                found = true; // only one node is enough
            }
        }
    }

    int[] dr = new int[]{0, -1, 0, 1};
    int[] dc = new int[]{1, 0, -1, 0};

    int ans = 0;
    while (!queue.isEmpty()) {
        int size = queue.size();
        while (size > 0) {
            int[] pos = queue.poll();
            for (int i = 0; i < 4; i++) {
                int r = pos[0] + dr[i];
                int c = pos[1] + dc[i];
                if (r < 0 || r >= m || c < 0 || c >= n || A[r][c] == 2) {
                    continue;
                }

                if (A[r][c] == 1) {
                    return ans;
                }

                A[r][c] = 2;
                queue.offer(new int[] {r,c});
            }
            size--;
        }
        ans++;
    }

    return ans;
}

private void dfs(int[][] grid, int m, int n, int i, int j, Queue<int[]> queue) {
    if (i < 0 || i >= m || j < 0 || j >= n || grid[i][j] != 1) {
        return;
    }
    grid[i][j] = 2; // mark as growing
    queue.offer(new int[]{i, j});
    dfs(grid, m, n, i - 1, j, queue);
    dfs(grid, m, n, i + 1, j, queue);
    dfs(grid, m, n, i, j - 1, queue);
    dfs(grid, m, n, i, j + 1, queue);
}
```
## 3. Closest Leaf in a Binary Tree
### 3.1 Description
Given a binary tree where every node has a unique value, and a target key `k`, find the value of the nearest leaf node to target k in the tree.

Here, nearest to a leaf means the least number of edges travelled on the binary tree to reach any leaf of the tree. Also, a node is called a leaf if it has no children.

In the following examples, the input tree is represented in flattened form row by row. The actual root tree given will be a TreeNode object.

```raw
Example 3:

Input:
root = [1,2,3,4,null,null,null,5,null,6], k = 2
Diagram of binary tree:
             1
            / \
           2   3
          /
         4
        /
       5
      /
     6

Output: 3
Explanation: The leaf node with value 3 (and not the leaf node with value 6) is nearest to the node with value 2.
```
### 3.2 Solution with DFS + BFS
Use DFS to convert tree to graph with HashMap, then use BFS to find the shortest path from target `k` to leaf in graph.
```java
TreeNode nodeK = null;
public int findClosestLeaf(TreeNode root, int k) {
    Map<Integer, List<TreeNode>> map = new HashMap<>();
    helper(map, root, k);
    Set<TreeNode> set = new HashSet<>();
    Queue<TreeNode> queue = new LinkedList<>();
    queue.offer(nodeK);

    while (!queue.isEmpty()) {
        int size = queue.size();
        while (size-- > 0) {
            TreeNode node = queue.poll();
            if (node.left == null && node.right == null) {
                return node.val;
            }
            set.add(node);
            List<TreeNode> neis = map.get(node.val);
            for (TreeNode nei : neis) {
                if (!set.contains(nei)) {
                    queue.offer(nei);
                }
            }
        }
    }

    return 0;
}

private void helper(Map<Integer, List<TreeNode>> map, TreeNode root, int k) {
    if (root == null) {
        return;
    }

    if (root.val == k) {
        nodeK = root;
    }
    if (!map.containsKey(root.val)) {
        map.put(root.val, new ArrayList<TreeNode>());
    }
    if (root.left != null) {
        if (!map.containsKey(root.left.val)) {
            map.put(root.left.val, new ArrayList<TreeNode>());
        }
        map.get(root.val).add(root.left);
        map.get(root.left.val).add(root);
        helper(map, root.left, k);
    }
    if (root.right != null) {
        if (!map.containsKey(root.right.val)) {
            map.put(root.right.val, new ArrayList<TreeNode>());
        }
        map.get(root.val).add(root.right);
        map.get(root.right.val).add(root);
        helper(map, root.right, k);
    }
}
```

## 4. Redundant Connection
### 4.1 Description
In this problem, a tree is an undirected graph that is connected and has no cycles.

The given input is a graph that started as a tree with N nodes (with distinct values 1, 2, ..., N), with one additional edge added. The added edge has two different vertices chosen from 1 to N, and was not an edge that already existed.

The resulting graph is given as a 2D-array of edges. Each element of edges is a pair [u, v] with u < v, that represents an undirected edge connecting nodes u and v.

Return an edge that can be removed so that the resulting graph is a tree of N nodes. If there are multiple answers, return the answer that occurs last in the given 2D-array. The answer edge [u, v] should be in the same format, with u < v.
```raw
Example 1:
Input: [[1,2], [1,3], [2,3]]
Output: [2,3]
Explanation: The given undirected graph will be like this:
  1
 / \
2 - 3

Example 2:
Input: [[1,2], [2,3], [3,4], [1,4], [1,5]]
Output: [1,4]
Explanation: The given undirected graph will be like this:
5 - 1 - 2
    |   |
    4 - 3
```
### 4.2 Solution with Graph + DFS
Construct graph with the given edges. During the construction, use DFS to search the target edge.
```java
public int[] findRedundantConnection(int[][] edges) {
    Map<Integer, List<Integer>> map = new HashMap<>();
    for (int[] edge : edges) {
        if (!map.containsKey(edge[0])) {
            map.put(edge[0], new ArrayList<Integer>());
        }
        if (!map.containsKey(edge[1])) {
            map.put(edge[1], new ArrayList<Integer>());
        }
        Set<Integer> visited = new HashSet<>();
        if (dfs(map, edge[0], edge[1], visited)) {
            return edge;
        }
        map.get(edge[0]).add(edge[1]);
        map.get(edge[1]).add(edge[0]);
    }

    return new int[]{0,0};
}

private boolean dfs(Map<Integer, List<Integer>> map, int start, int target, Set<Integer> visited) {

    if (start == target) {
        return true;
    }
    visited.add(start);
    if (!map.containsKey(start) || !map.containsKey(target)) {
        return false;
    }
    for (int nei : map.get(start)) {
        if (visited.contains(nei)) {
            continue;
        }
        if (dfs(map, nei, target, visited)) {
            return true;
        }
    }

    return false;
}
```
### 4.2 Solution with Union Find
Create parents array, go through each edge, find and union them until find the target edge.
```java
public int[] findRedundantConnection(int[][] edges) {
    int[] parents = new int[edges.length + 1];
    for (int i = 0; i < parents.length; i++) {
        parents[i] = i;
    }

    for (int[] edge : edges) {
        int u = edge[0];
        int v = edge[1];
        int pu = find(u, parents);
        int pv = find(v, parents);
        if (pu == pv) {
            return edge;
        }
        parents[pv] = pu;
    }

    return new int[] {0,0};
}

private int find(int curr, int[] parents) {
    while (parents[curr] != curr) {
        parents[curr] = parents[parents[curr]];
        curr = parents[curr];
    }

    return curr;
}
```
### 4.3 Solution With Union Find Template
```java
class DSU {
    int[] rank;
    int[] parent;
    public DSU(int size) {
        parent = new int[size];
        for (int i = 0; i < size; i++) {
            parent[i] = i;
        }
        rank = new int[size];
    }

    public int find(int i) {
        while (parent[i] != i) {
            parent[i] = parent[parent[i]];
            i = parent[i];
        }
        return parent[i];
    }

    public boolean union(int i, int j) {
        int p1 = find(i);
        int p2 = find(j);
        if (p1 == p2) { // found
            return false;
        } else if (rank[p1] < rank[p2]) {
            parent[p1] = p2;
        } else if (rank[p1] > rank[p1]) {
            parent[p2] = p1;
        } else {
            parent[p2] = p1;
            rank[p1]++;
        }
        return true;
    }
}

public int[] findRedundantConnection(int[][] edges) {
    DSU dsu = new DSU(edges.length + 1);
    for (int[] edge: edges) {
        if (!dsu.union(edge[0], edge[1])) {
            return edge;
        }
    }
    return new int[] {0,0};
}
```

## 5. Classic Problems
* [LeetCode 200 - Number of Islands](https://leetcode.com/problems/number-of-islands/)
* [LeetCode 934 - Shortest Bridge](https://leetcode.com/problems/shortest-bridge/)
* [LeetCode 742 - Closest Leaf in a Binary Tree](https://leetcode.com/problems/closest-leaf-in-a-binary-tree/)
* [LeetCode 684 - Redundant Connection](https://leetcode.com/problems/redundant-connection/)
