---
layout: post
title: "Tricks For Algorithm"
date: 2016-10-19
categories:
- blog
---

> Useful tricks for algorithm, Java.

## 1. Templates
### Define Customized Comparator
```java
private class IntervalComparator implements Comparator<Interval> {
    public int compare(Interval i1, Interval i2) {
        return i1.start - i2.start;
    }
}
```

### Binary Search
```java
int start = 0;
int end = nums.length - 1;

while (start + 1 < end) { // avoid infinite loop, need to check nums[start] and nums[end] after the while loop
    int mid = start + (end - start) / 2; //avoid overflow
    if (nums[mid] == target) {
        return mid;
    } else if (nums[mid] < target) {
        start = mid;
    } else {
        end = mid;
    }
}
```

### Subset
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

### Generate Unique Path for Each TreeNode(Preorder)
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

Based on different requirements, you can add more parameters accordingly and update them by checking the map when necessary. For example, add a list as third parameter, to find all duplicate subtrees(LeetCode 652).

## 2. Array and Strings

### Partition of Quick Sort
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
### Rotate Array or String by Three Steps
Rotate an array of n elements to the right by k steps.
```java
reverse(nums, 0, nums.length - k - 1);
reverse(nums, nums.length - k, nums.length - 1);
reverse(nums, 0, nums.length - 1);
```

### Sort Array by Another Array's Value.
```java
Integer[] index = new Integer[nums.length];
for(int i = 0; i < nums.length; i++) {
    index[i] = i;
}

Arrays.sort(index, new Comparator<Integer>() {
    public int compare(Integer i1, Integer i2) {
        return nums[i2] - nums[i1];
    }
});
```

Refer to Leetcode 506, lintcode 612.

### Use An Integer Instead of An Array to Store States
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
## 3. Linked List
### Reverse
```java
public ListNode reverseList(ListNode head) {
    ListNode prev = null;
    while (head != null) {
        ListNode next = head.next;
        head.next = prev;
        prev = head;
        head = next;
    }
    return prev;
}
```
* Middle Node
* Cycle
* Dummy Node
* Fast and Slow Point(LeetCode 19)

## 4. Bit Manipulation
```java
n & (n-1) == 0; //check if an integer is power of two
x &= -x;        //get last 1
```

## 5. Graph

### Union find
```java
// find root
private int find(int[] parent, int node) {
    while(parent[node] != node) {
        parent[node] = parent[parent[node]];
    }
    return parent[node];
}

// union
private void union(int[] parent, int node1, int node2) {
    int root1 = find(parent, node1);
    int root2 = find(parent, node2);
    parent[root1] = root2;
}
```

## 6. Others

### Remove Duplicated Lists
```java
List<List<Integer>> res = new ArrayList<List<Integer>>();
... // res contains duplicated list after some operation
HashSet<List<Integer>> set = new HashSet<List<Integer>>(res);
res.clear();
res.addAll(set); // now, each list in res is unique
```

* numsUsed[c - '1'] : use char to get index of array directly, no need to calculate the index value.
* n is integer, n % 10, get the last bit of number, iterate this can get the reverse list of n.
* LRU Cache: double linked node, define two nodes (head and tail) at the very beginning, head.next = tail; tail.prev = head;
* Dp can be used to optimize time complexity of 2^n, but not for n^2.
