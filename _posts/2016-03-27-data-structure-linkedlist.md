---
layout: post
key: blog
title: "Data Structure - Linked List"
date: 2016-03-27
tags: [Singly Linked List, Doubly Linked List]
---

> A linked list is represented by a sequence of nodes. Each node contains a link to another node. Linked list is one of the most-used data structure.

## 1. Types of Linked List
### 1.1 Singly Linked List
Each node has an attribute to represent its value. It also has one pointer, linking it to the next node in the linked list.
![MIME Type](/public/pics/2016-03-27/singlylinkedlist.png){:width="800px"}  
### 1.2 Doubly Linked List
Each node has an attribute to represent its value. Meanwhile, it has two pointers, the first pointer links to the next node, and the second pointer links to the previous node.
![MIME Type](/public/pics/2016-03-27/doublylinkedlist.png){:width="800px"}  

## 2. Implementation
### 2.1 Creating Singly Linked Node
Each `ListNode` has an attribute `val` to store the value of the node. And it also has one pointer `next` pointing to the next node.
```java
public class ListNode {
    public int val;
    public ListNode next;
    public ListNode(int x) {
        val = x;
        next = null;
    }

    // create a singly linked list with the given array
    public static ListNode create(int[] values) {  
        if (values == null || values.length == 0) {
            return null;
        }

        ListNode dummy = new ListNode(0);
        ListNode curr = dummy;
        for (int i = 0; i < values.length; i++) {
            curr.next = new ListNode(values[i]);
            curr = curr.next;
        }

        return dummy.next;
    }
}
```

### 2.2 Creating Doubly Linked Node
Each `ListNode` has an attribute `val` to store the value of the node. And it has two pointers `previous` and `next`, pointing to the previous node and the next node.
```java
public class ListNode {
    public int val;
    public ListNode previous;
    public ListNode next;
    public ListNode(int x) {
        val = x;
        previous = null;
        next = null;
    }

    // create a singly linked list with the given array
    public static ListNode create(int[] values) {  
        if (values == null || values.length == 0) {
            return null;
        }

        ListNode dummy = new ListNode(0);
        ListNode curr = dummy;
        for (int i = 0; i < values.length; i++) {
            curr.next = new ListNode(values[i]);
            curr.next.previous = curr;
            curr = curr.next;
        }

        return dummy.next;
    }
}
```

## 3. Common Operations
Here are some basic approaches for solving linked list problems.
* Dummy Node
* Reversing Linked List
* Fast and Slow Pointers

All below questions/codes are based on singly linked list.  
### 3.1 Reversing Linked List
Input:  7->3->12->8->4->9  
Output: 9->4->8->12->3->7  
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

### 3.2 Finding the Middle Node in Linked List
Input:  7->3->12->8->4  
Output: 12  
Input:  7->3->12->8->4->9  
Output: 12  

Use the fast and slow pointer.  
```java
public ListNode findMiddle(ListNode head) {
    if (head == null) {
        return null;
    }

    // define fast and slow
    ListNode fast = head.next;
    ListNode slow = head;
    while(fast != null && fast.next != null) {
        fast = fast.next.next; // two steps for each pace
        slow = slow.next;      // one step for each pace
    }

    return slow;
}
```

### 3.3 Detecting Cycle in Linked List
Input:  7->3->12->8->4->9  
Output: False
Input:  7->3->12->8->4->9->12  
Output: True

Use the fast and slow pointer.  
```java
public boolean hasCycle(ListNode head) {
    if (head == null) {
        return false;
    }

    ListNode fast = new ListNode(0);
    fast.next = head;
    ListNode slow = new ListNode(1);
    slow.next = head;

    while (fast != null) {
        if (fast.next == null) {
            return false;
        } else {
            fast = fast.next.next;
            slow = slow.next;
            if (fast == slow) { // Compare object, not its value. Nodes with same value may exist.
                return true;
            }
        }
    }

    return false;
}
```

### 3.4 Finding the Node Where Cycle Begins
Input:  7->3->12->8->4->9->12  
Output: 12

Use the fast and slow pointer.  
```java
public ListNode detectCycle(ListNode head) {
    if (head == null) {
        return null;
    }

    ListNode fast = head;
    ListNode slow = head;

    while (fast != null && fast.next != null) {
        fast = fast.next.next;
        slow = slow.next;
        if (fast == slow) {
            fast = head;
            while (fast != slow) {
                fast = fast.next;
                slow = slow.next;
            }
            return fast;
        }
    }

    return null;
}
```

## 4. Reference
* [Data Structure and Algorithms - Linked List](https://www.tutorialspoint.com/data_structures_algorithms/linked_list_algorithms.htm)
