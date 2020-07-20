---
layout: tutorial
key: algorithm
title: "Algorithm - Best Practice"
index: 1302
subcategory: algorithm-overview
date: 2016-04-02
tags: [Algorithm]
---

> Useful tricks for solving algorithms problems

## 1. Templates
### 1.1 Defining Customized Comparator
```java
private class IntervalComparator implements Comparator<Interval> {
    public int compare(Interval i1, Interval i2) {
        return i1.start - i2.start;
    }
}
// three return values
// -1, i1 < i2
// 0, i1 = i2
// 1, i1 > i2
```
Usage.
```java
Collections.sort(intervals, new IntervalComparator());

// lamda expression
Collections.sort(intervals, (a, b) -> a.start - b.start);
```
More conditions
```java
private class IntervalComparator implements Comparator<Interval> {
    public int compare(Interval a, Interval b) {
        if (a.start == b.start) {
            return a.end - b.end;
        } else {
            return a.start - b.start;
        }
    }
}
Collections.sort(intervals, new IntervalComparator());
// equivalent to one line lamda expression
Arrays.sort(intervals, (a,b)->(a.start == b.start ? a.end - b.end : a.start - b.start));
```
`The comparison only works for integer, not for double type.`
### 1.2 Sorting Array by Another Array's Value.
```java
Integer[] index = new Integer[nums.length];
for (int i = 0; i < nums.length; i++) {
    index[i] = i;
}

Arrays.sort(index, new Comparator<Integer>() {
    public int compare(Integer i1, Integer i2) {
        return nums[i2] - nums[i1];
    }
});
```
* Example Problem - [Leetcode 506. Relative Ranks](https://leetcode.com/problems/relative-ranks/)

### 1.3 Binary Search
```java
int start = 0;
int end = nums.length - 1;

while (start < end) {
    int mid = (start + end) / 2;
    if (nums[mid] == target) {
        return mid;
    } else if (nums[mid] < target) {
        start = mid;
    } else {
        end = mid;
    }
}
```
Optimized Version.
```java
int start = 0;
int end = nums.length - 1;

while (start + 1 < end) { // avoid infinite loop, need to check nums[start] and nums[end] after the while loop
    int mid = start + (end - start) / 2; // avoid overflow, assuming start is not negative and end is not very large positive.
    if (nums[mid] == target) {
        return mid;
    } else if (nums[mid] < target) {
        start = mid;
    } else {
        end = mid;
    }
}
```
* Example Problem - [162. Find Peak Element](https://leetcode.com/problems/find-peak-element/)

### 1.4 Direction Array used in Grid Traversal, DFS & BFS.  
```java
int[] dr = new int[]{-1, 0, 1, 0};
int[] dc = new int[]{0, -1, 0, 1};

// A is a given matrix
int m = A.length;
int n = A[0].length;
for (int i = 0; i < 4; i++) {
    int r = pos[0] + dr[i];
    int c = pos[1] + dc[i];
    if (r < 0 || r >= m || c < 0 || c >= n) {
        continue;
    }

    if (A[r][c] == 1) {
        // code here
    }
}
```
### 1.5 Subset
```java
public List<List<Integer>> subsets(int[] nums) {
    List<List<Integer>> res = new ArrayList<List<Integer>>();
    if (nums == null) {
        return res;
    }

    Arrays.sort(nums);// not necessary, just for unit test

    List<Integer> list = new ArrayList<Integer>();
    helper(nums, 0, list, res);
    return res;
}

private void helper(int[] nums, int pos, List<Integer> list, List<List<Integer>> res) {
    res.add(new ArrayList<Integer>(list)); // when adding it to the result depends on requirement

    for (int i = pos; i < nums.length; i++) {
        list.add(nums[i]);
        helper(nums, i + 1, list, res); // whether need to append 1 depends on requirement
        list.remove(list.size() - 1);
    }
}
```
* Example Problem - [LeetCode 78. Subsets](https://leetcode.com/problems/subsets/)

### 1.6 Generating Unique Path for Each TreeNode(Preorder)
Each node has a unique path in preoder/postorder/inorder.
```java
// generate preoder key of each node
private String preorder(TreeNode root, Map<String, Integer> map) {
    if (root == null) {
        return "#";
    }
    String path = root.val + "," + preorder(root.left, map, res) + "," + preorder(root.right, map, res);
    if (!map.containsKey(path)) {
        map.put(path, 0);
    } else {
        map.put(path, map.get(path) + 1); //count++
    }
    return path;
}
```

The key of the map represents the path of the node, and map's value represents how many nodes have the same path.
For tree {2,1,1}, map contains two entry
* 2,1,#,#,1,#,# => 0 // there is only one node with value 2, the root
* 1,#,# => 1         // there are two nodes with value 1, the left and the right

Based on different requirements, you can add more parameters accordingly and update them by checking the map when necessary. For example, add a list as third parameter, to find all duplicate subtrees - [LeetCode 652. Find Duplicate Subtrees](https://leetcode.com/problems/find-duplicate-subtrees/)

### 1.7 Top K Problems
Three solutions for K-th problems, see [Three solutions to this classical K-th problem](https://leetcode.com/problems/k-closest-points-to-origin/discuss/220235/Java-Three-solutions-to-this-classical-K-th-problem.)
* Sort, then pick up the first K elements, O(Nlog(N))
* PriorityQueue, add element to heap until size reaches to K, O(Nlog(N))
* Partition, same with Quick Sort, divide elements to two parts, O(N)

K Closest Points to Origin
```java
// partition
public int[][] kClosest(int[][] points, int K) {
    if (points == null || points.length == 0 || K < 1) {
        return points;
    }
    int start = 0;
    int end = points.length - 1;
    while (start <= end) {
        int pos = partition(points, start, end);
        if (pos == K) {
            break;
        }
        if (pos < K) {
            start = pos + 1;
        } else {
            end = pos - 1;
        }
    }

    return Arrays.copyOfRange(points, 0, K);
}

private int partition(int[][] points, int start, int end) {
    int pivot = start;
    int[] first = points[start];
    int len = first[0] * first[0] + first[1] * first[1];
    for (int i = start + 1; i <= end; i++) {
        int[] curr = points[i];
        int dis = curr[0] * curr[0] + curr[1] * curr[1];
        if (dis < len) {
            pivot++;
            int[] temp = points[pivot];
            points[pivot] = points[i];
            points[i] = temp;
        }
    }

    int[] temp = points[pivot];
    points[pivot] = points[start];
    points[start] = temp;
    return pivot;
}

// priority queue
public int[][] kClosest2(int[][] points, int K) {
    if (points == null || points.length == 0 || K < 1) {
        return points;
    }

    PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> ((b[0] * b[0] + b[1] * b[1]) - (a[0] * a[0] + a[1] * a[1])));
    for (int[] point : points) {
        pq.offer(point);
        if (pq.size() > K) {
            pq.poll();
        }
    }

    int[][] ans = new int[pq.size()][2];
    int i = ans.length - 1;
    while (!pq.isEmpty()) {
        ans[i] = pq.poll();
        i--;
    }

    return ans;
}

// sort
public int[][] kClosest3(int[][] points, int K) {
    if (points == null || points.length == 0 || K < 1) {
        return points;
    }

    Arrays.sort(points, (a, b) -> ((a[0] * a[0] + a[1] * a[1]) - (b[0] * b[0] + b[1] * b[1])));
    return Arrays.copyOfRange(points, 0, K);
}
```

### 1.8 DP - One Array
Apply the DP formula by traversing `j` loop before `i` loop, thus, make it easy to understand.
```java
// dp
public int findLongestChain(int[][] pairs) {
    if (pairs == null || pairs.length == 0) {
        return 0;
    }

    Arrays.sort(pairs, (a, b)->(a[0]-b[0]));

    int n = pairs.length;
    int[] dp = new int[n];
    Arrays.fill(dp, 1);
    for (int j = 1; j < n; j++) {
        for (int i = 0; i < j; i++) {
            if (pairs[i][1] < pairs[j][0]) {
                dp[j] = Math.max(dp[j], dp[i] + 1);
            }
        }
    }
    return dp[n - 1];
}
```
### 1.9 Indexes of all occurrences of character in a string
```java
String word = "bannanas";
String guess = "n";
int index = word.indexOf(guess);
while (index >= 0) {
    System.out.println(index);
    index = word.indexOf(guess, index + 1);
}

// output [2,3,5]
```
### 1.10 Find primes with the Sieve of Eratosthenes
```java
boolean exclusion[] = new boolean[n]; // not prime, n can be 100

for (int i = 2; i < n; i++) {
    System.out.println(i);
    if (exclusion[i] == false){
        for (int j = 2 * i; j < n; j += i) {
            exclusion[j] = true;
        }
    }
}

// output [2,3,5,7,11,13 ...]
```
## 2. Array and Strings
### 2.1 Partition of Quick Sort
```java
// one way
private int partition(int[] nums, int start, int end) {
    int pivot = start; // select the first as the pivot

    for (int i = start + 1; i <= end; i++) {
        if (nums[i] < nums[start]) {
            pivot++;
            int temp = nums[pivot];
            nums[pivot] = nums[i];
            nums[i] = temp;
        }
    }

    int temp = nums[pivot];
    nums[pivot] = nums[start];
    nums[start] = temp;
    return pivot;
}
```
* Example Problem - [LeetCode 215. Kth Largest Element in an Array](https://leetcode.com/problems/kth-largest-element-in-an-array/)

### 2.2 Rotating Array or String by Three Steps
Rotate an array of n elements to the right by k steps.
```java
reverse(nums, 0, nums.length - k - 1);
reverse(nums, nums.length - k, nums.length - 1);
reverse(nums, 0, nums.length - 1);
```
* Example Problem - [LeetCode 189. Rotate Array](https://leetcode.com/problems/rotate-array/)

### 2.3 Using An Integer Instead of An Array to Store States
Implement an algorithm to determine if a string has all unique characters.
What if you can not use additional data structures?
Assume there are only lower case letters from 'a' to 'z'.
```java
public boolean isUniqueChars(String str) {
    if (str == null || str.length() == 0) {
        return false;
    }
    int checker = 0;

    for (int i = 0; i < str.length(); i++) {
        char c = str.charAt(i);
        int index = c - 'a';
        if ((checker & (1 << index)) == 1) {
            return false;
        } else {
            checker |= 1 << index;
        }
    }
    return true;
}
```

## 3. Data Structure Related Questions
### 3.1 Linked List
* Consider recursion first, then iteration.
* Dummy Node, Use fast and slow pointers to find middle node, reverse linked list.

### 3.2 Tree
* Recursive, Iterative, Stack for Recursion, Queue for Iteration.
* BST or regular binary tree?
* BST => Inorder Traversal
* Template for tree traversal.
* outdegree, indegree, question331.

### 3.3 Graph
Create graph with adjacency list.
```java
List<Integer>[] graph = new ArrayList[N]; // list array
// create vertices
for (int i = 0; i < N; i++) {
    graph[i] = new ArrayList<Integer>();
}
// add edges
for (int[] edge: edges) {
    graph[edge[0]].add(edge[1]);
    graph[edge[1]].add(edge[0]);
}
```

## 5. Others
### 5.1 Others
* numsUsed[c - '1'] : use char to get index of array directly, no need to calculate the index value.
* n is integer, n % 10, get the last bit of number, iterate this can get the reverse list of n.
* LRU Cache: double linked node, define two nodes (head and tail) at the very beginning, head.next = tail; tail.prev = head;
* Dp can be used to optimize time complexity of 2^n, but not for n^2.

## 6. Complexity
### 6.1 Time Complexity
Best Case, Worst Case, Expected Case. For example, quick sort: O(N), O(N^2), O(NLog(N)).
* O(Big O): Upper Bound on Time
* &#911;(Big Omega): Lower Bound on Time
* &Theta;(Big Theta): Tight Bound, includes both of them.

Common Complexity
* factorial time(n!)
* exponential time(2^n)

### 6.2 Space Complexity
Log(n), what is the base of Log, 2 or 10? It doesn't matter to Big O.
Best Conceivable Runtime(BCR)

## 7. Characters
### 7.1 How Many ASCII Characters Are There?
Basically, we use only 128 total character which is used mostly during program. But total number of Character in ASCII table is 256 (0 to 255).
* 0 to 31(total 32 character ) is called as ASCII control characters.
* 32 to 127 character is called as ASCII printable characters.
* 128 to 255 is called as The extended ASCII codes.

### 7.2 Characters in Algorithm Questions
* a~z, A~Z
* a~Z, 0~9

## 8. References
* [Data Structures - Algorithms Basics](https://www.tutorialspoint.com/data_structures_algorithms/algorithms_basics.htm)
* [Data Structure and Algorithms Binary Search](https://www.tutorialspoint.com/data_structures_algorithms/binary_search_algorithm.htm)
* [Why should I use Deque over Stack?](https://stackoverflow.com/questions/12524826/why-should-i-use-deque-over-stack)
