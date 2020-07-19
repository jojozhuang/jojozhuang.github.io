---
layout: tutorial
key: programming
title: "Design Pattern - Strategy"
index: 2929
subcategory: design-pattern
date: 2016-05-29
tags: [Strategy Pattern]
---

> Behavioral Pattern: Strategy Pattern.

## 1. Strategy Pattern
A Strategy defines a set of algorithms that can be used interchangeably. Use the strategy pattern when:
* Many related classes differ only in their behavior.
* You need different variants of an algorithm.
* An algorithm uses data that client shouldn't know about.
* You need to vary a behavior’s algorithm at run-time.

## 2. Implementation
### 2.1 Strategy Interface
```java
public interface Sorting {
    public int[] sort(int[] nums);
}
```
### 2.2 Sorting Algorithms
```java
public class BubbleSort implements Sorting {

    @Override
    public int[] sort(int[] nums) {
        System.out.println("Bubble sort on array:" + Arrays.toString(nums));

        if (nums == null || nums.length < 2) {
            return nums;
        }

        for (int i = 0; i < nums.length; i++) {
            for (int j = nums.length - 1; j > i; j--) {
                if (nums[j] < nums[j - 1]) {
                    int temp = nums[j];
                    nums[j] = nums[j - 1];
                    nums[j - 1] = temp;
                }
            }
        }

        return nums;
    }
}

public class MergeSort implements Sorting {

    @Override
    public int[] sort(int[] nums) {
        System.out.println("Merge sort on array:" + Arrays.toString(nums));

        if (nums == null || nums.length < 2) {
            return nums;
        }

        helper(nums, 0, nums.length - 1);

        return nums;
    }

    private void helper(int[] nums, int start, int end) {
        if (start >= end) {
            return;
        }

        int mid = start + (end - start) / 2;
        helper(nums, start, mid);
        helper(nums, mid + 1, end);
        merge(nums, start, mid, end);
    }

    private void merge(int[] nums, int start, int mid, int end) {
        int[] copy = Arrays.copyOf(nums, nums.length);

        int left = start;
        int right = mid + 1;
        for (int k = start; k <= end; k++) {
            if (left > mid) { // no item at left
                nums[k] = copy[right];
                right++;
            }
            else if(right > end) { // no item at right
                nums[k] = copy[left];
                left++;
            }
            else if (copy[left] <= copy[right]) {
                nums[k] = copy[left];
                left++;
            }
            else{
                nums[k] = copy[right];
                right++;
            }
        }
    }
}

public class QuickSort implements Sorting {

    @Override
    public int[] sort(int[] nums) {
        System.out.println("Quick sort on array:" + Arrays.toString(nums));

        if (nums == null || nums.length < 2) {
            return nums;
        }

        helper(nums, 0, nums.length - 1);

        return nums;
    }

    private void helper(int[] nums, int start, int end) {
        if (start >= end) {
            return;
        }

        int pivot = partition(nums, start, end);
        helper(nums, start, pivot - 1);
        helper(nums, pivot + 1, end);
    }

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
}
```
### 2.3 Context
```java
public class Context {
    private Sorting sorting;

    public Context(Sorting sorting){
        this.sorting = sorting;
    }

    public int[] executeStrategy(int[] nums){
        return sorting.sort(nums);
    }
}
```
### 2.4 Client
```java
public class Client {
    public void run() {
        int[] nums = new int[]{3,5,1,8,2,9,7,4};

        Context context = new Context(new BubbleSort());
        System.out.println(Arrays.toString(context.executeStrategy(nums.clone())));

        context = new Context(new MergeSort());
        System.out.println(Arrays.toString(context.executeStrategy(nums.clone())));

        context = new Context(new QuickSort());
        System.out.println(Arrays.toString(context.executeStrategy(nums.clone())));
    }
}
```
Output.
```raw
Bubble sort on array:[3, 5, 1, 8, 2, 9, 7, 4]
[1, 2, 3, 4, 5, 7, 8, 9]
Merge sort on array:[3, 5, 1, 8, 2, 9, 7, 4]
[1, 2, 3, 4, 5, 7, 8, 9]
Quick sort on array:[3, 5, 1, 8, 2, 9, 7, 4]
[1, 2, 3, 4, 5, 7, 8, 9]
```

## 3. Source Files
* [Source files for Strategy Pattern on GitHub](https://github.com/jojozhuang/design-patterns-java/tree/master/design-pattern-strategy)

## 4. References
* [Design Patterns - Strategy Pattern](https://www.tutorialspoint.com/design_pattern/strategy_pattern.htm)
* [Strategy Design Pattern](https://sourcemaking.com/design_patterns/strategy)
