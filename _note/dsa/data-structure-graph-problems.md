---
layout: note
key: note
title: "Data Structure - Graph Problems"
index: 315
category: dsa
image: note/dsa.png
date: 2016-03-15
postdate: 2016-03-15
tags: [Graph, DFS, BFS]
mathjax: true
---

> Introduce the definition, implementation and usage of graph.

## 1. Number of Islands
### 1.1 Description
Given a 2d grid map of '1's (land) and '0's (water), count the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.

Example 1:
```sh
Input:
11110
11010
11000
00000
Output: 1
```

Example 2:
```sh
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
```sh
Input: [[0,1],[1,0]]
Output: 1
```
Example 2:
```sh
Input: [[0,1,0],[0,0,0],[0,0,1]]
Output: 2
```
Example 3:
```sh
Input: [[1,1,1,1,1],[1,0,0,0,1],[1,0,1,0,1],[1,0,0,0,1],[1,1,1,1,1]]
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
## 3. Classic Problems
* [LeetCode 200 - Number of Islands](https://leetcode.com/problems/number-of-islands/)
* [LeetCode 934 - Shortest Bridge](https://leetcode.com/problems/shortest-bridge/)

## 4. Source Files

## 5. Reference
