---
layout: note
key: note
title: "Tricks For Algorithm"
index: 322
category: dsa
image: /note/dsa.png
date: 2016-03-22
postdate: 2016-03-22
tags: [Algorithm]
---

> Useful tricks for algorithm, Java.

## 1. Templates
### 1.1 Defining Customized Comparator
```java
private class IntervalComparator implements Comparator<Interval> {
    public int compare(Interval i1, Interval i2) {
        return i1.start - i2.start;
    }
}
```
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

### 1.4 Subset
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

### 1.5 Generating Unique Path for Each TreeNode(Preorder)
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

### 2.4 Using An Integer Instead of An Array to Store States
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

## 3. Others
### 3.1 Removing Duplicated Lists
```java
List<List<Integer>> res = new ArrayList<List<Integer>>();
... // res contains duplicated list after some operation
HashSet<List<Integer>> set = new HashSet<List<Integer>>(res);
res.clear();
res.addAll(set); // now, each list in res is unique
```
### 3.2 Direction Array used in Grid Traversal, DFS & BFS.  
```java
int[] dr = new int[]{-1, 0, 1, 0};
int[] dc = new int[]{0, -1, 0, 1};
```
### 3.3 Get Int Value From Char
```java
String s = "ab5d";
int x = Character.getNumericValue(s.charAt(2)); // x = 5
```
### 3.4 Check If Character is Number or Letter
```java
boolean isNumberOrLetter = Character.isLetterOrDigit(c);
```
### 3.5 Others
* numsUsed[c - '1'] : use char to get index of array directly, no need to calculate the index value.
* n is integer, n % 10, get the last bit of number, iterate this can get the reverse list of n.
* LRU Cache: double linked node, define two nodes (head and tail) at the very beginning, head.next = tail; tail.prev = head;
* Dp can be used to optimize time complexity of 2^n, but not for n^2.


## 4. Complexity
### 4.1 Time Complexity
Best Case, Worst Case, Expected Case. For example, quick sort: O(N), O(N^2), O(NLog(N)).
* O(Big O): Upper Bound on Time
* &#911;(Big Omega): Lower Bound on Time
* &Theta;(Big Theta): Tight Bound, includes both of them.

Common Complexity
* factorial time(n!)
* exponential time(2^n)

### 4.2 Space Complexity
Log(n), what is the base of Log, 2 or 10? It doesn't matter to Big O.
Best Conceivable Runtime(BCR)

## 5. Characters
### 5.1 How Many ASCII Characters Are There?
Basically, we use only 128 total character which is used mostly during program. But total number of Character in ASCII table is 256 (0 to 255).
* 0 to 31(total 32 character ) is called as ASCII control characters.
* 32 to 127 character is called as ASCII printable characters.
* 128 to 255 is called as The extended ASCII codes.

### 5.2 Characters in Algorithm Questions
* a~z, A~Z
* a~Z, 0~9

## 6. References
* [Data Structures - Algorithms Basics](https://www.tutorialspoint.com/data_structures_algorithms/algorithms_basics.htm)
* [Data Structure and Algorithms Binary Search](https://www.tutorialspoint.com/data_structures_algorithms/binary_search_algorithm.htm)
