---
layout: note
key: note
title: "Data Structure - Stack"
index: 303
category: dsa
image: /note/dsa.png
date: 2016-03-03
postdate: 2016-03-03
tags: [Stack]
---

> Introduce the definition, implementation and usage of stack.

## 1. Stack
### 1.1 Real-life Example
Stack is just like a pile of plates kept on top of each other. You can only take out a plate from the top and put a plate on top of the other plates.
![image](/public/notes/data-structure-stack/plates.png){:width="400px"}  
Think about the things you can do with such a pile of plates.
* Put a new plate on top
* Remove the top plate

If you want the plate at the bottom, you have to first remove all the plates on top.
### 1.2 Stack in Programming Terms
Stack is an abstract data type that serves as a collection of elements, with two principal operations:
* `push`: add an element to the collection
* `pop`: remove the most recently added element

Stack follows the `LIFO`(Last-in, first-out) rule. The last item that was placed is the first item to go out.
![image](/public/notes/data-structure-stack/stack.png){:width="800px"}  

## 2. Implementation
### 2.1 Common Operations on Stack
* push(item): Add an item to the top of the stack.
* pop(): Remove the top item from the stack.
* peek(): Return the top of the stack.
* isEmpty(): Return true if and only if the stack is empty.

### 2.2 Time Complexity
* push: O(1).
* pop: O(1).
* peek: O(1).

### 2.3 Built with LinkedList
First, define the list node as follows.
```java
public class ListNode {
    public int val;
    public ListNode next;
    public ListNode(int val) {
        this.val = val;
        this.next = null;
    }
}
```
Then, create a linked list stack as follows.
```java
public class LinkedListStack {
    private ListNode head; // the first node

    public LinkedListStack() {
        head = null;
    }

    // Add element to the beginning of the list
    public void push(int value) {
        ListNode oldHead = head;
        head = new ListNode(value);
        head.next = oldHead;
    }

    // Remove value from the beginning of the list and return the value
    public int pop() throws Exception {
        if (head == null) {
            throw new Exception();
        }
        int value = head.val;
        head = head.next;
        return value;
    }

    // Get the top element
    public int peek() throws Exception {
        if (head == null) {
            throw new Exception();
        }
        return head.val;
    }

    // Return whether the stack is empty
    public boolean isEmpty() {
        return head == null;
    }
}
```

### 2.4 Built with Two Queues
```java
import java.util.LinkedList;
import java.util.Queue;

public class QueueStack {
    Queue<Integer> queue1;
    Queue<Integer> queue2;
    int lastnum = 0;

    public QueueStack() {
        queue1 = new LinkedList<Integer>(); // queue1 always has all of the elements
        queue2 = new LinkedList<Integer>(); // queue2 always be empty after pop or top
    }

    // Push new element onto stack
    public void push(int value) {
        queue1.offer(value);
    }

    // Remove the element on top of the stack and return that element
    public int pop() throws Exception {
        if (queue1.isEmpty()) {
            throw new Exception();
        }
        while (!queue1.isEmpty()) {
            lastnum = queue1.poll();
            if (!queue1.isEmpty()) {
                queue2.offer(lastnum);
            }
        }
        Queue<Integer> temp = queue1;
        queue1 = queue2;
        queue2 = temp;
        return lastnum;
    }

    // Get the top element
    public int peek() throws Exception {
        if (queue1.isEmpty()) {
            throw new Exception();
        }
        while (!queue1.isEmpty()) {
            lastnum = queue1.poll();
            queue2.offer(lastnum);
        }
        Queue<Integer> temp = queue1;
        queue1 = queue2;
        queue2 = temp;
        return lastnum;
    }

    // Return whether the stack is empty
    public boolean isEmpty() {
        return queue1.isEmpty();
    }
}
```

### 2.5 Built with Array
```java
public class ArrayStack {
    private int top;
    private int[] arr;

    public ArrayStack(int capacity) {
        arr = new int[capacity];
        top = -1;
    }

    // Add new element to the end of the array
    public void push(int value) {
        arr[++top] = value;
    }

    // Remove the last element from the array and return its value
    public int pop() throws Exception {
        if (top < 0) {
            throw new Exception();
        }
        int value = arr[top];
        top--;
        return value;
    }

    // Get the top element
    public int peek() throws Exception {
        if (top < 0) {
            throw new Exception();
        }
        return arr[top];
    }

    // Return whether the stack is empty
    public boolean isEmpty() {
        return top < 0;
    }
}
```

### 2.6 Built with Array(Loop)
```java
```

## 3. Implementing Sort Function with Stack
### 3.1 Insertion Sort with Stack
If we call the sort method with array {2,4,5,7,1,2,3,6}, it will return a stack, which contains {1,2,2,3,4,5,6,7}, 7 is at top.
```java
import java.util.Stack;

public class StackInsertionSort {
    // Insertion Sort
    public Stack<Integer> sort(int[] nums) {
        if (nums == null || nums.length == 0) {
            return null;
        }

        // initialize stack1
        Stack<Integer> stack = new Stack<Integer>();
        for (int i = 0; i < nums.length; i++) {
            stack.push(nums[i]);
        }
        // stack2 contains the sorted items
        Stack<Integer> stack2 = new Stack<Integer>();

        while (!stack.isEmpty()) {
            int top = stack.pop();
            if (stack2.isEmpty()) {
                stack2.push(top);
                continue;
            }
            while (!stack2.isEmpty() && stack2.peek() > top) {
                stack.push(stack2.pop());
            }
            stack2.push(top);
        }

        return stack2;
    }
}
```
### 3.2 Merge Sort with Stack
If we call the sort method with array {2,4,5,7,1,2,3,6}, it will return a stack, which contains {1,2,2,3,4,5,6,7}, 7 is at top.
```java
import java.util.Stack;

public class StackMergeSort {
    // Merge Sort
    public Stack<Integer> sort(int[] nums) {
        if (nums == null || nums.length == 0) {
            return null;
        }

        // initialize stack1
        Stack<int[]> stack = new Stack<int[]>();
        for (int i = 0; i < nums.length; i++) {
            // convert number to number array
            stack.push(new int[]{nums[i]});
        }
        // stack2 contains the sorted sub arrays
        Stack<int[]> stack2 = new Stack<int[]>();

        while (stack.size() > 1) {
            while (stack.size() > 1) {
                int[] r = stack.pop();
                int[] l = stack.pop();
                int[] merged = merge(l, r);
                stack2.push(merged);
            }
            while (stack2.size() > 1) {
                int[] r = stack2.pop();
                int[] l = stack2.pop();
                int[] merged = merge(l, r);
                stack.push(merged);
            }
        }

        // odd case
        if (!stack.isEmpty() && !stack2.isEmpty()) {
            int[] r = stack.pop();
            int[] l = stack2.pop();
            int[] merged = merge(l, r);
            stack.push(merged);
        }

        int[] sorted = stack.isEmpty() ? stack2.pop() : stack.pop();

        Stack<Integer> finalStack = new Stack<>();
        for (int i : sorted) {
            finalStack.push(i);
        }

        return finalStack;
    }

    private int[] merge(int[] nums1, int[] nums2) {
        if (nums1 == null || nums1.length == 0) {
            return nums2;
        }
        if (nums2 == null || nums2.length == 0) {
            return nums1;
        }

        int[] nums = new int[nums1.length + nums2.length];
        int i = 0, j = 0;
        for (int k = 0; k < nums.length; k++) {
            if (i >= nums1.length) {
                nums[k] = nums2[j];
                j++;
            } else if (j >= nums2.length) {
                nums[k] = nums1[i];
                i++;
            } else if (nums1[i] <= nums2[j]) {
                nums[k] = nums1[i];
                i++;
            } else {
                nums[k] = nums2[j];
                j++;
            }
        }

        return nums;
    }
}
```
### 3.3 Implementing Quick Sort with Stack
If we call the sort method with array {2,4,5,7,1,2,3,6}, it will return a stack, which contains {1,2,2,3,4,5,6,7}, 7 is at top.
```java
import java.util.Stack;

public class StackQuickSort {
    public Stack<Integer> sort(int[] nums) {
        if (nums == null || nums.length == 0) {
            return null;
        }
        quickHelper(nums, 0, nums.length - 1);

        Stack<Integer> finalStack = new Stack<>();
        for (int i : nums) {
            finalStack.push(i);
        }

        return finalStack;
    }

    private void quickHelper(int[] nums, int start, int end) {
        if (start >= end) {
            return;
        }

        /*int pivot = partition(nums, start, end);
        quickHelper(nums, start, pivot - 1);
        quickHelper(nums, pivot + 1, end);*/

        // use stack to implement the recursion(implicit stack).
        Stack<int[]> stack = new Stack<int[]>();
        stack.push(new int[] {0, end});
        while (!stack.isEmpty()) {
            while (start <= end) {
                int pivot = partition(nums, start, end);
                stack.push(new int[] {pivot + 1, end}); // execute second recursive call
                end = pivot - 1;  // execute first recursive call
            }
            int[] next = stack.pop();  // fetch next recursive call to execute
            start = next[0];
            end = next[1];
        }
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

## 4. Stack Problems
* [LeetCode 155 - Min Stack](https://leetcode.com/problems/min-stack/)
* [LeetCode 232 - Implement Queue using Stacks](https://leetcode.com/problems/implement-queue-using-stacks/)
* [LeetCode 84 - Largest Rectangle in histogram](https://leetcode.com/problems/largest-rectangle-in-histogram/)

## 5. Source Files
* [Source files for Stack on GitHub](https://github.com/jojozhuang/dsa-java/tree/master/ds-stack)
* [Stack Diagrams(draw.io) on Google Slides](https://drive.google.com/file/d/1Qy0xBmbjYmG9BCJeKbCQ7yG4EEFDoqRx/view?usp=sharing)

## 6. Reference
* [Data Structure and Algorithms - Stack](https://www.tutorialspoint.com/data_structures_algorithms/stack_algorithm.htm)
* [Stacks and Queues](http://introcs.cs.princeton.edu/java/43stack/)
* [Stack](https://www.programiz.com/dsa/stack)
* [Using Stacks for a Non-Recursive MergeSort?](https://stackoverflow.com/questions/21897184/using-stacks-for-a-non-recursive-mergesort)
* [Implementing Quicksort with a Stack](https://courses.cs.washington.edu/courses/cse332/11au/recursion.pdf)
