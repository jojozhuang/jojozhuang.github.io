---
layout: tutorial
key: programming
title: "Java Concurrency - Overview"
index: 2401
subcategory: java-concurrency
date: 2017-02-01
tags: [Multi Threading]
draft: true
---

> Create concurrent application with threadings.

## 1. How to Create a Java Thread?
Java lets you create thread in following two ways:
* By implementing the `Runnable` interface.
* By extending the `Thread`

### 1.1 Runnable Interface
```java
public interface Runnable {
    void run();
}
```
Create a class to implement the interface.
```java
public class MyClass implements Runnable {
    public void run(){
        System.out.println("MyClass running");
    }
}
```
Create thread and run it.
```java
Thread t1 = new Thread(new MyClass ());
t1.start();
```
### 1.2 Thread Class
Create a class to extend the Thread class.
```java
public class MyClass extends Thread {
    public void run(){
        System.out.println("MyClass running");
    }
}
```
Create thread and run it.
```java
MyClass t2 = new MyClass();
t2.start();
```

### 1.2 Thread States
* `New` - When a new thread is created, it is in the new state. (new Thread();)
* `Runnable` - A thread that is ready to run is moved to runnable state. (t1.run();)
* `Blocked` - When a thread is temporarily inactive, e.g. (require a lock)
* `Waiting` - When a thread is temporarily inactive, e.g. (wait on a condition);
* `Timed Waiting` - A thread lies in timed waiting state when it calls a method with a time out parameter. (Thread.sleep(1000);)
* `Terminated` -  A thread terminates because of either of the following reasons: Normally exits or interrupted.

![image](/assets/images/programming/2401/threadstate.png){:width="800px"}  

## 2. Synchronization
Monitor, lock, race condition.Reentrant Lock, Intrinsic Lock

## 3. Thread Pool

## 6. Synchronizers
The java.util.concurrent package contains several classes that help manage a set of collaborating threads. These mechanisms have “canned functionality” for common rendezvous patterns between threads. If you have a set of collaborating threads that follow one of these behavior patterns, you should simply reuse the appropriate library class instead of trying to come up with a handcrafted collection of locks and conditions.

Class              | What It Does | Notes
-------------------|--------------|-----------------------------------------------
`CyclicBarrier`    | Allows a set of threads to wait until a predefined count of them has reached a common barrier, and then optionally executes a barrier action.  | Use when a number of threads need to complete before their results can be used. The barrier can be reused after the waiting threads have been released.
`Phaser`           | Like a cyclic barrier, but with a mutable party count.  | Introduced in Java SE 7.
`CountDownLatch`   | Allows a set of threads to wait until a count has been decremented to 0.  | Use when one or more threads need to wait until a specified number of events have occurred.
`Exchanger`        | Allows two threads to exchange objects when both are ready for the exchange.  | Use when two threads work on two instances of the same data structure, with the first thread filling one instance and the second thread emptying the other.
`Semaphore`        | Allows a set of threads to wait until permits are available for proceeding.  | Use to restrict the total number of threads that can access a resource. If the permit count is one, use to block threads until another thread gives permission.
`SynchronousQueue` | Allows a thread to hand off an object to another thread. | Use to send an object from one thread to another when both are ready, without explicit synchronization.


## 9. References
* [Java Concurrency and Multithreading Tutorial](http://tutorials.jenkov.com/java-concurrency/index.html)
* [Lifecycle and States of a Thread in Java](https://www.geeksforgeeks.org/lifecycle-and-states-of-a-thread-in-java/)
* [Synchronized in Java](https://www.geeksforgeeks.org/synchronized-in-java/)
* [Remember the types of intrinsic lock](http://www.javapractices.com/topic/TopicAction.do?Id=35)
* [Java - Thread Deadlock](https://www.tutorialspoint.com/java/java_thread_deadlock.htm)
* [Java ThreadLocal](http://tutorials.jenkov.com/java-concurrency/threadlocal.html)
* [Reentrant Lock in Java](https://www.geeksforgeeks.org/reentrant-lock-java/)
* [Thread Pools in Java](https://www.geeksforgeeks.org/thread-pools-java/)
* [Callable and Future in Java](https://www.geeksforgeeks.org/callable-future-java/)
* [Semaphore in Java](https://www.geeksforgeeks.org/semaphore-in-java/)
* [CountDownLatch in Java](https://www.geeksforgeeks.org/countdownlatch-in-java/)
