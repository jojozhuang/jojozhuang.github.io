---
layout: tutorial
key: algorithm
title: "Problem - Custom List"
index: 1401
subcategory: practice-problem
date: 2019-08-01
tags: [List, Stack, Queue]
---

> Implement custom array list and linked list.

## 1. Custom Array List
Write a program to implement your own ArrayList class. It should contain add(), get(), remove(), size() methods. Use dynamic array logic.
It should increase its size when it reaches threshold.

```java
import java.util.Arrays;

public class ArrayList<E> {
    private static final int DEFAULT_CAPACITY = 10;
    private int size = 0;
    private E[] arr;

    @SuppressWarnings("unchecked")
    public ArrayList(){
        arr = (E[])new Object[DEFAULT_CAPACITY];
    }

    public void add(E e){
        if (arr.length == size) {
            increaseListSize();
        }
        arr[size++] = e;
    }

    public E get(int index){
        if (index < size && index >= 0) {
            return (E)arr[index];
        } else {
            throw new ArrayIndexOutOfBoundsException();
        }
    }

    public Object remove(int index){
        if (index < size){
            Object obj = arr[index];
            arr[index] = null;
            int tmp = index;
            while (tmp < size){
                arr[tmp] = arr[tmp + 1];
                arr[tmp + 1] = null;
                tmp++;
            }
            size--;
            return obj;
        } else {
            throw new ArrayIndexOutOfBoundsException();
        }
    }

    public int size(){
        return size;
    }

    private void increaseListSize(){
        arr = Arrays.copyOf(arr, arr.length * 2);
    }
}
```
Test Class.
```java
import static org.junit.Assert.*;

import org.junit.Test;

public class ArrayListTest {

    @Test
    public void test() {
        ArrayList<Integer> list = new ArrayList<>();
        assertEquals(0, list.size());
        list.add(1);
        list.add(2);
        list.add(3);
        assertEquals(3, list.size());
        list.add(3);
        list.add(4);
        assertEquals(5, list.size());
        assertTrue(1 == list.get(0));
        assertTrue(2 == list.get(1));
        assertTrue(3 == list.get(2));
        assertTrue(3 == list.get(3));
        assertTrue(4 == list.get(4));

        assertTrue(5 == list.size());

        list.remove(3);
        assertEquals(4, list.size());
        assertTrue(1 == list.get(0));
        assertTrue(2 == list.get(1));
        assertTrue(3 == list.get(2));
        assertTrue(4 == list.get(3));

    }

    @Test(expected=IndexOutOfBoundsException.class)
    public void testLowerBound() {
        ArrayList<Integer> list = new ArrayList<>();
        list.add(1);
        list.add(2);
        list.add(3);
        list.add(3);
        list.add(4);
        list.get(-1); // OutOfBounds
    }

    @Test(expected=IndexOutOfBoundsException.class)
    public void testHigherBound() {
        ArrayList<Integer> list = new ArrayList<>();
        list.add(1);
        list.add(2);
        list.add(3);
        list.add(3);
        list.add(4);
        list.get(6); // OutOfBounds
    }
}
```

## 2. Custom Linked List
Implement a linked list data structure which support stack, queue and deque interfaces.

Interfaces.
```java
public interface IStack<E> {
    void push(E e);
    E pop();
    E peek();
    int size();
    boolean isEmpty();
}

public interface IQueue<E> {
    boolean offer(E e);
    E poll();
    E peek();
    int size();
    boolean isEmpty();
}

public interface IDeque<E> {
    // Deque methods
    boolean offerFirst(E e);
    boolean offerLast(E e);
    E pollFirst();
    E pollLast();
    E peekFirst();
    E peekLast();

    int size();
    boolean isEmpty();
}
```
List Node.
```java
public class ListNode<E> {
    public E item;
    public ListNode<E> previous;
    public ListNode<E> next;
    public ListNode(E item) {
        this.item = item;
        this.previous = null;
        this.next = null;
    }
}
```
Linked List.
```java
public class LinkedList<E> implements IStack<E>, IQueue<E>, IDeque<E> {
    private int size = 0;

    private ListNode<E> head; // the first node
    private ListNode<E> tail; // the last node

    public LinkedList() {
        head = null;
        tail = null;
    }

    // Add item to the head of the list
    public boolean offerFirst(E item) {
        if (head == null) {
            head = new ListNode<E>(item);
            tail = head;
        } else {
            head.previous = new ListNode<E>(item);
            head.previous.next = head;
            head = head.previous;
        }
        size++;
        return true;
    }

    // Remove the head from the list and return its value
    public E pollFirst() {
        if (head == null) {
            return null;
        }
        E item = head.item;
        head = head.next;
        if (head != null) {
            head.previous = null;
        } else {
            tail = null;
        }
        size--;
        return item;
    }

    // Get the value of the head
    public E peekFirst() {
        if (head == null) {
            return null;
        }
        return head.item;
    }

    // Add item to the tail of the list
    public boolean offerLast(E item) {
        if (tail == null) {
            tail = new ListNode<E>(item);
            head = tail;
        } else {
            tail.next = new ListNode<E>(item);
            tail.next.previous = tail;
            tail = tail.next;
        }
        size++;
        return true;
    }

    // Remove the tail from the list and return its value
    public E pollLast() {
        if (tail == null) {
            return null;
        }
        E item = tail.item;
        tail = tail.previous;
        if (tail != null) {
            tail.next = null;
        } else {
            head = null;
        }
        size--;
        return item;
    }

    // Get the value of the tail
    public E peekLast() {
        if (tail == null) {
            return null;
        }
        return tail.item;
    }

    // Return whether the deque is empty
    public boolean isEmpty() {
        return head == null || tail == null;
    }

    // Queue methods
    public boolean offer(E e) {
        return offerLast(e);
    }
    public E poll() {
        return pollFirst();
    }
    public E peek() {
        return peekFirst();
    }

    // Stack methods
    public void push(E e) {
        offerLast(e);
    }
    public E pop() {
        return pollLast();
    }

    public int size() {
        return size;
    }
}
```
Test Class.
```java
import static org.junit.Assert.*;

import org.junit.Test;

public class LinkedListTest {

    @Test
    public void testStack() {
        IStack<Integer> stack = new LinkedList<>();
        assertEquals(true, stack.isEmpty());
        stack.push(1);
        stack.push(2);
        stack.push(3);

        assertEquals(false, stack.isEmpty());
        assertEquals(3, (int)stack.pop());
        assertEquals(2, (int)stack.pop());
        assertEquals(false, stack.isEmpty());
        assertEquals(1, (int)stack.peek());
        assertEquals(1, (int)stack.peek());
        assertEquals(false, stack.isEmpty());
        stack.push(4);
        assertEquals(4, (int)stack.pop());
        assertEquals(false, stack.isEmpty());
        assertEquals(1, (int)stack.pop());
        assertEquals(true, stack.isEmpty());
    }

    @Test
    public void testQueue() {
        IQueue<Integer> queue = new LinkedList<>();
        assertEquals(true, queue.isEmpty());
        queue.offer(1);
        queue.offer(2);
        queue.offer(3);

        assertEquals(false, queue.isEmpty());
        assertEquals(1, (int)queue.poll());
        assertEquals(2, (int)queue.poll());
        assertEquals(false, queue.isEmpty());
        assertEquals(3, (int)queue.peek());
        assertEquals(3, (int)queue.peek());
        assertEquals(false, queue.isEmpty());
        queue.offer(4);
        assertEquals(3, (int)queue.poll());
        assertEquals(false, queue.isEmpty());
        assertEquals(4, (int)queue.poll());
        assertEquals(true, queue.isEmpty());
    }

    @Test
    public void testDeque() {
        IDeque<Integer> deque = new LinkedList<>();
        assertEquals(true, deque.isEmpty());
        deque.offerLast(1);
        deque.offerLast(2);
        deque.offerLast(3);

        assertEquals(false, deque.isEmpty());
        assertEquals(1, (int)deque.pollFirst());
        assertEquals(3, (int)deque.pollLast());
        assertEquals(false, deque.isEmpty());
        assertEquals(2, (int)deque.peekFirst());
        assertEquals(2, (int)deque.peekLast());
        assertEquals(false, deque.isEmpty());
        deque.offerFirst(4);
        assertEquals(4, (int)deque.peekFirst());
        assertEquals(2, (int)deque.peekLast());
        assertEquals(2,(int) deque.pollLast());
        assertEquals(false, deque.isEmpty());
        assertEquals(4, (int)deque.pollLast());
        assertEquals(true, deque.isEmpty());
    }
}
```

## 3. Source Files
* [Source files of Custom List on Github](https://github.com/jojozhuang/practice-problems/tree/master/custom-list)

## 4. References
* [Write a program to implement ArrayList](http://www.java2novice.com/java-interview-programs/arraylist-implementation/)
* [How to implement an ArrayList structure in Java - Tutorial](https://www.vogella.com/tutorials/JavaDatastructureList/article.html)
