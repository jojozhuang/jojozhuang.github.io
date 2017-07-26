---
layout: post
title: "Tricks For Algorithm"
date: 2016-10-19
categories:
- blog
---

> Useful tricks for algorithm, Java.

## 1. Use an integer instead of an array to store states
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

## 2. Sort array by another array value. Leetcode 506, lintcode 612
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

## 3. Rotate Array or String by Three Steps
Rotate an array of n elements to the right by k steps.
```java
reverse(nums, 0, nums.length - k - 1);
reverse(nums, nums.length - k, nums.length - 1);
reverse(nums, 0, nums.length - 1);
```
## 4. Bit Manipulation
Check if an integer is power of 2
```java
n&(n-1) == 0
```
