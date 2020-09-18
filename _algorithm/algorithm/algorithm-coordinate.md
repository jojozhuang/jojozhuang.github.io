---
layout: tutorial
key: algorithm
title: "Algorithm - Coordinate"
index: 1240
subcategory: algorithm-algorithm
date: 2020-08-21
tags: [String, Array]
draft: true
---

> Coordinate questions.

## 1. Coordinate
### 1.1 Robot Bounded In Circle
On an infinite plane, a robot initially stands at (0, 0) and faces north.  The robot can receive one of three instructions:
* "G": go straight 1 unit;
* "L": turn 90 degrees to the left;
* "R": turn 90 degress to the right.

The robot performs the instructions given in order, and repeats them forever.

Return true if and only if there exists a circle in the plane such that the robot never leaves the circle.

Example 1:
```raw
Input: "GGLLGG"
Output: true
Explanation:
The robot moves from (0,0) to (0,2), turns 180 degrees, and then returns to (0,0).
When repeating these instructions, the robot remains in the circle of radius 2 centered at the origin.
```
Example 2:
```raw
Input: "GG"
Output: false
Explanation:
The robot moves north indefinitely.
```
Example 3:
```raw
Input: "GL"
Output: true
Explanation:
The robot moves from (0, 0) -> (0, 1) -> (-1, 1) -> (-1, 0) -> (0, 0) -> ...
```

Note:
```raw
1 <= instructions.length <= 100
instructions[i] is in {'G', 'L', 'R'}
```

### 1.2 Solution:
```java
public boolean isRobotBounded(String instructions) {
    int x = 0, y = 0, i = 0, d[][] = \{\{0, 1}, {1, 0}, {0, -1}, {-1, 0}};
    for (int j = 0; j < instructions.length(); ++j)
        if (instructions.charAt(j) == 'R')
            i = (i + 1) % 4;
        else if (instructions.charAt(j) == 'L')
            i = (i + 3) % 4;
        else {
            x += d[i][0];
            y += d[i][1];
        }
    return x == 0 && y == 0 || i > 0;
}
```

## 7. References
* [1041. Robot Bounded In Circle](https://leetcode.com/problems/robot-bounded-in-circle/)
