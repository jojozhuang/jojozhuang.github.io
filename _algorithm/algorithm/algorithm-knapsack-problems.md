---
layout: tutorial
key: algorithm
title: "Algorithm - Knapsack Problems"
index: 1225
subcategory: algorithm-algorithm
date: 2016-03-28
tags: [DP, Knapsack]
mathjax: true
---

> Knapsack problems.

## 1. Knapsack Problem 1 - Capacity only
Given `n` items with size A[i] for i-th item, and an integer `m` denotes the capacity of a backpack. How full you can fill this backpack? Maximize the **total size** that the knapsack can be filled. Each item can be use 0 or 1 time.
```raw
Example 1:
    Input:  [3,4,8,5], knapsack capacity=10
    Output:  9

Example 2:
    Input:  [2,3,5,7], knapsack capacity=12
    Output:  12
```
### 1.1 Solution with Boolean Array
Define a two-dimensional boolean array.
```java
public int knapsack11(int[] A, int m) {
    boolean[][] dp = new boolean[A.length + 1][m + 1];
    dp[0][0] = true;

    for (int i = 1; i <= A.length; i++) {
        for (int j = 0; j <= m; j++) {
            if (j - A[i-1] >= 0 && dp[i-1][j - A[i-1]]) {
                dp[i][j] = true;
            } else {
                dp[i][j] = dp[i - 1][j];
            }
        }
    }

    for (int i = m; i >= 0; i--) {
        if (dp[A.length][i]) {
            return i;
        }
    }

    return 0;
}
```
* Time Complexity: O(n*m)
* Space Complexity: O(n*m)

Values of the dp array for input A=[3,4,8,5] and m=10. The answer is 9 and the selected items are 4 and 5.

Item\\Size | 0    | 1     |  2    | 3     | 4     | 5     | 6     | 7     | 8     | 9     |   10
-----------|------|-------|-------|-------|-------|-------|-------|-------|-------|-------|------
0          | true | false | false | false | false | false | false | false | false | false | false
3          | true | false | false | true  | false | false | false | false | false | false | false
4          | true | false | false | true  | true  | false | false | true  | false | false | false
8          | true | false | false | true  | true  | false | false | true  | true  | false | false
5          | true | false | false | true  | true  | true  | false | true  | true  | true  | false

The above solution can be optimized with two one-dimensional arrays. Space complexity is reduced to O(m).
```java
public int knapsack12(int[] A, int m) {
    boolean[] dp = new boolean[m + 1];
    boolean[] dp2 = new boolean[m + 1];
    dp[0] = true;
    dp2[0] = true;

    for (int i = 1; i <= A.length; i++) {
        for (int j = 0; j <= m; j++) {
            if (j - A[i-1] >= 0 && dp2[j - A[i-1]]) {
                dp[j] = true;
            } else {
                dp[j] = dp2[j];
            }
        }
        for (int j = 0; j <= m; j++) {
            dp2[j] = dp[j];
        }
    }

    for (int i = m; i >= 0; i--) {
        if (dp[i]) {
            return i;
        }
    }

    return 0;
}
```
* Time Complexity: O(n*m)
* Space Complexity: O(2m)->O(m)

### 1.2 Solution with Integer Array
Instead of using boolean array, we can use integer array as well.
```java
public int knapsack13(int[] A, int m) {
    // maximum size can be filled for the every capacity
    int[][] dp = new int[A.length + 1][m + 1];

    for (int i = 1; i <= A.length; i++) {
        for (int j = 1; j <= m; j++) {
            dp[i][j] = dp[i - 1][j];
            if (j - A[i - 1] >= 0) {
                dp[i][j] = Math.max(dp[i][j], dp[i - 1][j - A[i - 1]] + A[i - 1]);
            }
        }
    }

    return dp[A.length][m];
}
```
* Time Complexity: O(n*m)
* Space Complexity: O(n*m)

Values of the dp array for input A=[3,4,8,5] and m=10. The answer is 9 and the selected items are 4 and 5.

Item\\Size | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
-----------|---|---|---|---|---|---|---|---|---|---|----
0          | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0
3          | 0 | 0 | 0 | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 3
4          | 0 | 0 | 0 | 3 | 4 | 4 | 4 | 7 | 7 | 7 | 7
8          | 0 | 0 | 0 | 3 | 4 | 4 | 4 | 7 | 8 | 8 | 8
5          | 0 | 0 | 0 | 3 | 4 | 5 | 5 | 7 | 8 | 9 | 9

Let's try to optimize the above solution with one-dimensional array.
```java
// incorrect
public int knapsack14(int[] A, int m) {
    // maximum size can be filled for the every capacity
    int[] dp = new int[m + 1];

    for (int i = 1; i <= A.length; i++) {
        for (int j = 0; j <= m; j++) {
            if (j - A[i - 1] >= 0) {
                dp[j] = Math.max(dp[j], dp[j - A[i - 1]] + A[i - 1]);
            }
        }
    }

    return dp[m];
}
```
This solution returns incorrect result 10. The problem is, for each item, it is picked up for not only once.

Item\\Size | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
-----------|---|---|---|---|---|---|---|---|---|---|----
0          | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0
3          | 0 | 0 | 0 | 3 | 3 | 3 | 6 | 6 | 6 | 9 | 9
4          | 0 | 0 | 0 | 3 | 4 | 4 | 6 | 7 | 8 | 9 | 10
8          | 0 | 0 | 0 | 3 | 4 | 4 | 6 | 7 | 8 | 9 | 10
5          | 0 | 0 | 0 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10

To make it work, we have to iterate the knapsack size in reverse order, see below.
```java
public int knapsack15(int[] A, int m) {
    // maximum size can be filled for the every capacity
    int[] dp = new int[m + 1];

    for (int i = 1; i <= A.length; i++) {
        for (int j = m; j >= 0; j--) {
            if (j - A[i - 1] >= 0) {
                dp[j] = Math.max(dp[j], dp[j - A[i - 1]] + A[i - 1]);
            }
        }
    }

    return dp[m];
}
```

Further more, we can improve the readability by setting `i` to 0 instead of 1 and moving check "j - A[i - 1] >= 0" to the 'for' loop. The final solution as follows. Space complexity is reduced to O(m).
```java
// set i = 0 instead of 1
// move check "j - A[i - 1] >= 0" to for loop
public int knapsack16(int[] A, int m) {
    // maximum size can be filled for the every capacity
    int[] dp = new int[m + 1];

    for (int i = 0; i < A.length; i++) {
        for (int j = m; j >= A[i]; j--) {
            dp[j] = Math.max(dp[j], dp[j - A[i]] + A[i]);
        }
    }

    return dp[m];
}
```
* Time Complexity: O(n*m)
* Space Complexity: O(m)

Values of the dp array for each iteration(i-th) for input A=[3,4,8,5] and m=10. The answer is 9 and the selected items are 4 and 5.

i\\Size | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
--------|---|---|---|---|---|---|---|---|---|---|----
0(3)    | 0 | 0 | 0 | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 3
1(4)    | 0 | 0 | 0 | 3 | 4 | 4 | 4 | 7 | 7 | 7 | 7
2(8)    | 0 | 0 | 0 | 3 | 4 | 4 | 4 | 7 | 8 | 8 | 8
3(5)    | 0 | 0 | 0 | 3 | 4 | 5 | 5 | 7 | 8 | 9 | 9

## 2. Knapsack Problem 2 - Capacity + Value
There are `n` items and a backpack with size `m`. Given array `A` representing the size of each item and array `V` representing the value of each item. What's the maximum value can you put into the backpack? Maximize the **total value**. `Each item can be use 0 or 1 time.`
```raw
Example 1:
    Input:  A=[1, 1, 2, 2], V=[1, 3, 4, 5], knapsack capacity=4
    Output:  9
    Explanation: Select item 1(1),1(3),2(5) or 2(4),2(5).
Example 2:
    Input:  A=[3, 4, 8, 5], V=[1, 3, 7, 5], knapsack capacity=10
    Output:  8
    Explanation: Select item 4(3),5(5).
```
Solution:
```java
public int knapsack21(int[] A, int[] V, int m) {
    // Max value achieved by using the first i items and total size is exact j.
    int[][] dp = new int[A.length + 1][m + 1];

    for (int i = 1; i <= A.length; i++) {
        for (int j = 1; j <= m; j++) {
            dp[i][j] = dp[i - 1][j];
            if (j - A[i - 1] >= 0) {
                dp[i][j] = Math.max(dp[i][j], dp[i - 1][j - A[i - 1]] + V[i - 1]);
            }
        }
    }

    return dp[A.length][m];
}
```
* Time Complexity: O(n*m)
* Space Complexity: O(m)
* The above solution is almost same with the two-dimensional solution for the Knapsack Problem 1(Capacity Only). **The only difference is dp[i][j] stores the value instead of the size.**

Values of the dp array for input A=[1,1,2,2], V=[1,3,4,5] and m=4. The answer is 9 and the selected items are 2(4) and 2(5).

Item\size | 0 | 1 | 2 | 3 | 4
----------|---|---|---|---|---
0         | 0 | 0 | 0 | 0 | 0
1         | 0 | 1 | 1 | 1 | 1
1         | 0 | 3 | 4 | 4 | 4
2         | 0 | 3 | 4 | 7 | 8
2         | 0 | 3 | 5 | 8 | 9

Values of the dp array for input A=[3,4,8,5], V=[1,3,7,5] and m=10. The answer is 8 and the selected items are 4(3) and 5(5).

Item\\Size | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
-----------|---|---|---|---|---|---|---|---|---|---|----
0          | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0
3          | 0 | 0 | 0 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1
4          | 0 | 0 | 0 | 1 | 3 | 3 | 3 | 4 | 4 | 4 | 4
8          | 0 | 0 | 0 | 1 | 3 | 3 | 3 | 4 | 7 | 7 | 7
5          | 0 | 0 | 0 | 1 | 3 | 5 | 5 | 5 | 7 | 8 | 8

We can optimize the above solution with one-dimensional array.
```java
public int knapsack22(int[] A, int[] V, int m) {
    // maximum size can be filled for the every capacity
    int[] dp = new int[m + 1];

    for (int i = 1; i <= A.length; i++) {
        for (int j = m; j >= 0; j--) {
            if (j - A[i - 1] >= 0) {
                dp[j] = Math.max(dp[j], dp[j - A[i - 1]] + V[i - 1]);
            }
        }
    }

    return dp[m];
}
```
* Time Complexity: O(n*m)
* Space Complexity: O(m)

Further more, we can improve the readability by setting `i` to 0 instead of 1 and moving check "j - A[i - 1] >= 0" to the 'for' loop. The final solution as follows.
```java
public int knapsack23(int[] A, int[] V, int m) {
    // maximum size can be filled for the every capacity
    int[] dp = new int[m + 1];

    for (int i = 0; i < A.length; i++) {
        for (int j = m; j >= A[i]; j--) {
            dp[j] = Math.max(dp[j], dp[j - A[i]] + V[i]);
        }
    }

    return dp[m];
}
```
* Time Complexity: O(n*m)
* Space Complexity: O(m)

## 3. Knapsack Problem 3 - Unlimited Inventory
There are `n` items and a backpack with size `m`. Given array `A` representing the size of each item and array `V` representing the value of each item. What's the maximum value can you put into the backpack? Maximize the **total value**. `Each item has unlimited inventory(You can pick up one item for unlimited times).`
```raw
Example 1:
    Input:  A=[1, 1, 2, 2], V=[1, 3, 4, 5], knapsack capacity=4
    Output:  12
    Explanation: Select item 1(3) for 4 times.
Example 2:
    Input:  A=[3, 4, 8, 5], V=[1, 3, 7, 5], knapsack capacity=10
    Output:  10
    Explanation: Select item 5(5) for twice.
```
Solution:
```java
public int knapsack31(int[] A, int[] V, int m) {
    // maximum value can be filled for the every capacity
    int[][] dp = new int[A.length + 1][m + 1];

    for (int i = 1; i <= A.length; i++) {
        for (int j = 1; j <= m; j++) {
            dp[i][j] = dp[i - 1][j];
            if (j - A[i - 1] >= 0) {
                dp[i][j] = Math.max(dp[i][j], dp[i][j - A[i - 1]] + V[i - 1]);
            }
        }
    }

    return dp[A.length][m];
}
```
* Time Complexity: O(n*m)
* Space Complexity: O(n*m)
* The above solution is almost same with the solution for the Knapsack Problem 2. **The only difference is how to calculate dp[i][j].**
```java
dp[i][j] = Math.max(dp[i][j], dp[i - 1][j - A[i - 1]] + V[i - 1]); // problem 2
dp[i][j] = Math.max(dp[i][j], dp[i][j - A[i - 1]] + V[i - 1]);     // problem 3
```

Values of the dp array for input A=[1,1,2,2], V=[1,3,4,5] and m=4. The answer is 12 and the selected items are 1(3) for 4 times.

Item\size | 0 | 1 | 2 | 3 | 4
----------|---|---|---|---|---
0         | 0 | 0 | 0 | 0 | 0
1         | 0 | 1 | 2 | 3 | 4
1         | 0 | 3 | 6 | 9 | 12
2         | 0 | 3 | 6 | 9 | 12
2         | 0 | 3 | 6 | 9 | 12

Values of the dp array for input A=[3,4,8,5], V=[1,3,7,5] and m=10. The answer is 10 and the selected items are 5(5) for twice.

Item\\Size | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
-----------|---|---|---|---|---|---|---|---|---|---|----
0          | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0
3          | 0 | 0 | 0 | 1 | 1 | 1 | 2 | 2 | 2 | 3 | 3
4          | 0 | 0 | 0 | 1 | 3 | 3 | 3 | 4 | 6 | 6 | 6
8          | 0 | 0 | 0 | 1 | 3 | 3 | 3 | 4 | 7 | 7 | 7
5          | 0 | 0 | 0 | 1 | 3 | 5 | 5 | 5 | 7 | 8 | 10

We can optimize the above solution with one-dimensional array.
```java
public int knapsack32(int[] A, int[] V, int m) {
    // maximum value can be filled for the every capacity
    int[] dp = new int[m + 1];

    for (int i = 1; i <= A.length; i++) {
        for (int j = 0; j <= m; j++) {
            if (j - A[i - 1] >= 0) {
                dp[j] = Math.max(dp[j], dp[j - A[i - 1]] + V[i - 1]);
            }
        }
    }

    return dp[m];
}
```
* Time Complexity: O(n*m)
* Space Complexity: O(m)

Further more, we can improve the readability by setting `i` to 0 instead of 1 and moving check "j - A[i - 1] >= 0" to the 'for' loop. The final solution as follows.
```java
public int knapsack33(int[] A, int[] V, int m) {
    // maximum value can be filled for the every capacity
    int[] dp = new int[m + 1];

    for (int i = 0; i < A.length; i++) {
        for (int j = A[i]; j <= m; j++) {
            dp[j] = Math.max(dp[j], dp[j - A[i]] + V[i]);
        }
    }

    return dp[m];
}
```
* Time Complexity: O(n*m)
* Space Complexity: O(m)

## 4. Knapsack Problem 4 - Number of Ways(unlimited times)
There are `n` unique items and a backpack with size `m`. Given array `A` representing the size of each item. Find the `number of ways` to fill the backpack. Each item may be chosen `unlimited` number of times.
```raw
Example 1:
    Input:  A=[2, 3, 6, 7], m=7
    Output:  2
    Explanation: Solution sets are: [7] and [2, 2, 3].
Example 2:
    Input:  A=[2, 3, 4, 5], m=7
    Output:  3
    Explanation: Solution sets are: [2, 5], [3, 4] and [2, 2, 3].
```
Solution:
```java
public int knapsack41(int[] A, int m) {
    int[][] dp = new int[A.length + 1][m + 1];

    dp[0][0] = 1;
    for (int i = 1; i <= A.length; i++) {
        for (int j = 0; j <= m; j++) {
            int k = 0;
            while (j - A[i-1]*k >= 0) {
                dp[i][j] += dp[i-1][j - A[i-1]*k];
                k+=1;
            }
        }
    }
    return dp[A.length][m];
}
```
* Time Complexity: O(n*m^2)
* Space Complexity: O(n*m)

Values of the dp array for input A=[2,3,6,7] and m=7. The answer is 2.

Item\\Size | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7
-----------|---|---|---|---|---|---|---|---
0          | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0
2          | 1 | 0 | 1 | 0 | 1 | 0 | 1 | 0
3          | 1 | 0 | 1 | 1 | 1 | 1 | 2 | 1
6          | 1 | 0 | 1 | 1 | 1 | 1 | 3 | 1
7          | 1 | 0 | 1 | 1 | 1 | 1 | 3 | 2

We can optimize the above solution with one-dimensional array.
```java
public int knapsack42(int[] A, int m) {
    // number of ways to full fill every capacity
    int[] dp = new int[m + 1];

    dp[0] = 1;
    for (int i = 1; i <= A.length; i++) {
        for (int j = 0; j <= m; j++) {
            if (j - A[i - 1] >= 0) {
                dp[j] += dp[j - A[i - 1]];
            }
        }
    }

    return dp[m];
}
```
* Time Complexity: O(n*m)
* Space Complexity: O(m)

Further more, we can improve the readability by setting `i` to 0 instead of 1 and moving check "j - A[i - 1] >= 0" to the 'for' loop. The final solution as follows.
```java
public int knapsack43(int[] A, int m) {
    // number of ways to full fill every capacity
    int[] dp = new int[m + 1];
    dp[0] = 1;
    for (int i = 0; i < A.length; i++) {
        for (int j = A[i]; j <= m; j++) {
            dp[j] += dp[j - A[i]];
        }
    }

    return dp[m];
}
```
* Time Complexity: O(n*m)
* Space Complexity: O(m)

## 5. Knapsack Problem 5 - Number of Ways (only once)
There are `n` unique items and a backpack with size `m`. Given array `A` representing the size of each item. Find the `number of ways` to fill the backpack. Each item can only be chosen `once`.
```raw
Example 1:
    Input:  A=[2, 3, 6, 7], m=7
    Output:  1
    Explanation: Solution set is: [7].
Example 2:
    Input:  A=[1, 2, 3, 3, 7], m=7
    Output:  2
    Explanation: Solution sets are: [1, 3, 3], [7].
```
Solution:
```java
public int knapsack51(int[] A, int m) {
    // number of ways to full fill every capacity
    int[][] dp = new int[A.length + 1][m + 1];

    dp[0][0] = 1;
    for (int i = 1; i <= A.length; i++) {
        for (int j = 0; j <= m; j++) {
            dp[i][j] = dp[i - 1][j];
            if (j - A[i - 1] >= 0) {
                dp[i][j] += dp[i - 1][j - A[i - 1]];
            }
        }
    }
    return dp[A.length][m];
}
```
* Time Complexity: O(n*m)
* Space Complexity: O(n*m)

Values of the dp array for input A=[2,3,6,7] and m=7. The answer is 1.

Item\\Size | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7
-----------|---|---|---|---|---|---|---|---
0          | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0
2          | 1 | 0 | 1 | 0 | 0 | 0 | 0 | 0
3          | 1 | 0 | 1 | 1 | 0 | 1 | 0 | 0
6          | 1 | 0 | 1 | 1 | 0 | 1 | 1 | 0
7          | 1 | 0 | 1 | 1 | 0 | 1 | 1 | 1

Values of the dp array for input A=[1,2,3,3,7] and m=7. The answer is 2.

Item\\Size | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7
-----------|---|---|---|---|---|---|---|---
0          | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0
1          | 1 | 1 | 0 | 0 | 0 | 0 | 0 | 0
2          | 1 | 1 | 1 | 1 | 0 | 0 | 0 | 0
3          | 1 | 1 | 1 | 2 | 1 | 1 | 1 | 0
3          | 1 | 1 | 1 | 3 | 2 | 2 | 3 | 1
7          | 1 | 1 | 1 | 3 | 2 | 2 | 3 | 2

We can optimize the above solution with one-dimensional array.
```java
public int knapsack52(int[] A, int m) {
    // number of ways to full fill every capacity
    int[] dp = new int[m + 1];
    dp[0] = 1;
    for (int i = 1; i <= A.length; i++) {
        for (int j = m; j >= 0; j--) {
            if (j - A[i - 1] >= 0) {
                dp[j] += dp[j - A[i - 1]];
            }
        }
    }

    return dp[m];
}
```
* Time Complexity: O(n*m)
* Space Complexity: O(m)

Further more, we can improve the readability by setting `i` to 0 instead of 1 and moving check "j - A[i - 1] >= 0" to the 'for' loop. The final solution as follows.
```java
public int knapsack53(int[] A, int m) {
    // number of ways to full fill every capacity
    int[] dp = new int[m + 1];
    dp[0] = 1;
    for (int i = 0; i < A.length; i++) {
        for (int j = m; j >= A[i]; j--) {
            dp[j] += dp[j - A[i]];
        }
    }

    return dp[m];
}
```
* Time Complexity: O(n*m)
* Space Complexity: O(m)

## 6. Summary of Knapsack Problems
* Generally, we need to create a two dimensional array. The first dimension represents the elements and the second represents the size of knapsack.
* For each dimension of the DP array, we need one more larger size(`n+1` and `m+1`), because we need to handle the special cases that no items fills the knapsack and items fills zero-size knapsack.
* The result is in the last row and last column(Need to search from end).
* Space complexity can be optimized to O(m).
* When using one-dimensional array, if item can be selected for unlimited times, iterate from beginning.
* When using one-dimensional array, if item can only be selected for once, iterate from end.

## 7. Related Problems
### 7.1 Coin Change
You are given coins of different denominations and a total amount of money amount. Write a function to compute the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.

```raw
Example 1:

Input: coins = [1, 2, 5], amount = 11
Output: 3
Explanation: 11 = 5 + 5 + 1
Example 2:

Input: coins = [2], amount = 3
Output: -1
```

```java
public int coinChange(int[] coins, int amount) {
    if (coins == null || coins.length == 0) {
        return -1;
    }

    int[] dp = new int[amount + 1];
    Arrays.fill(dp, Integer.MAX_VALUE);
    dp[0] = 0;
    for (int i = 0; i < coins.length; i++) {
        for (int j = coins[i]; j <= amount; j++) {
            if (dp[j - coins[i]] != Integer.MAX_VALUE) {
                dp[j] = Math.min(dp[j], dp[j - coins[i]] + 1);
            }
        }
    }

    return dp[amount] == Integer.MAX_VALUE ? -1: dp[amount];
}
```
## 8. Classic Problems
* [LintCode 92 - Backpack](https://www.lintcode.com/problem/backpack/)
* [LintCode 91 - Minimum Adjustment Cost](https://www.lintcode.com/problem/minimum-adjustment-cost)

## 9. Source Files
* [Source files for Knapsack Problems on GitHub](https://github.com/jojozhuang/dsa-java/tree/master/alg-knapsack)
* [Dynamic Programming Diagrams(draw.io) in Google Drive](https://drive.google.com/file/d/1gp898o4dRvrV2nPVZOEfJYfijkeyjdnK/view?usp=sharing)

## 10. References
* [0-1 Knapsack Problem 0-1背包问题](https://zxi.mytechroad.com/blog/sp/knapsack-problem/)
* [花花酱 0-1 Knapsack Problem 01背包问题 - 刷题找工作 SP10](https://www.youtube.com/watch?v=CO0r6kcwHUU)
* [Backpack solution](https://www.jiuzhang.com/solution/backpack/)
* [Backpack II solution](https://www.jiuzhang.com/solutions/backpack-ii/)
* [FLAG Offer之路专题-背包问题 01](https://www.youtube.com/watch?v=O31ULJTv-zw&list=PL5Eeqoo6exqUUUvT-S1ZF6S__9B4b8VZ0)
