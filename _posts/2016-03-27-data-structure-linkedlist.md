---
layout: post
key: blog
title: "Data Structure - Linked List"
date: 2016-03-27
tags: Reverse, Middle
categories:
- blog
---

> A linked list is represented by a sequence of nodes. It is a basic data structure and used in many other structures. For example, linked list can be used to build stack.

## 1. Types of Linked List
### 1.1 Singly Linked list
Each node has one pointer, points to the next node in the linked list.
![MIME Type](/public/pics/2016-03-27/singlylinkedlist.png)  
### 1.2 Doubly Linked list
Each node has two pointers, one points to the next node, another points to the previous node.
![MIME Type](/public/pics/2016-03-27/doublylinkedlist.png)  

## 2. Implementation
### 2.1 Create Singly Linked Node
Each node has an attribute to store its value, and one pointer points to the next node.
```java
public class ListNode {
    public int val;
    public ListNode next;
    public ListNode(int x) {
        val = x;
        next = null;
    }

    // create a singly linked list by the given array
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

### 2.2 Create Doubly Linked Node
Each node has an attribute to store its value, and two pointers, point to the previous node and the next node.
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
All below topics are based on singly linked list.  
Here are some basic approaches for linked list questions.
* Dummy Node
* Reverse Linked List
* Fast and Slow Pointer

### 3.1 Reverse Linked List
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

### 3.2 Find The Middle Node in Linked List
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

    // find middle
    ListNode fast = head.next;
    ListNode slow = head;
    while(fast != null && fast.next != null) {
        fast = fast.next.next; // two steps for each pace
        slow = slow.next;      // one step for each pace
    }

    return slow;
}
```

### 3.3 Detect Cycle in Linked List
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
            if (fast == slow) { // notice we are comparing the object not the value, which means there may be duplicated values in the linked list.
                return true;
            }
        }
    }

    return false;
}
```

### 3.4 Find the Node Where Cycle Begins
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
