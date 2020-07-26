---
layout: tutorial
key: algorithm
title: "Algorithm - Pre Sum - Draft"
index: 1236
subcategory: algorithm-algorithm
date: 2016-03-31
tags: [Pre sum]
draft: true
---

> Presum for multiple queries.

## 1. Range Sum Query - Immutable
```java
int[] preSum;
public NumArray(int[] nums) {
    if (nums == null || nums.length == 0) {
        return;
    }
    preSum = new int[nums.length];
    preSum[0] = nums[0];
    for (int i = 1; i < nums.length; i++) {
        preSum[i] = preSum[i - 1] + nums[i];
    }
}

public int sumRange(int i, int j) {
    if (i == 0) {
        return preSum[j];
    } else {
        return preSum[j] - preSum[i - 1];
    }
}
```

## 5. Source Files


## 7. References
