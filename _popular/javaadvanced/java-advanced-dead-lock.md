---
layout: tutorial
key: popular
title: "Java Advanced - Dead Lock"
index: 242
category: advanced
image: java.png
date: 2017-04-02
postdate: 2017-04-02
tags: [synchronized, deadlock]
---

> Knowledges of front end.

## 1. Deadlock
`synchronized` keyword is used to make the class or method thread-safe which means only one thread can have lock of synchronized method and use it, other threads have to wait till the lock releases. It is important if our program is running in multi-threaded environment where two or more threads execute simultaneously. But sometimes it also causes a problem which is called Deadlock.

`Deadlock` describes a situation where two or more threads are blocked forever, waiting for each other. Deadlock occurs when multiple threads need the same locks but obtain them in different order. A Java multithreaded program may suffer from the deadlock condition because the synchronized keyword causes the executing thread to block while waiting for the lock, or monitor, associated with the specified object.

### 1.1 Deadlock Example
Below is a simple example of Deadlock condition. Each thread acquires two locks in different order.
```java
public class DeadLockExample {
    public static Object Lock1 = new Object();
    public static Object Lock2 = new Object();

    public static void main(String args[]) {
        ThreadDemo1 T1 = new ThreadDemo1();
        ThreadDemo2 T2 = new ThreadDemo2();
        T1.start();
        T2.start();
    }

    private static class ThreadDemo1 extends Thread {
        public void run() {
            synchronized (Lock1) {
                System.out.println("Thread 1: Holding lock 1...");

                try { Thread.sleep(10); }
                catch (InterruptedException e) {}
                System.out.println("Thread 1: Waiting for lock 2...");

                synchronized (Lock2) {
                    System.out.println("Thread 1: Holding lock 1 & 2...");
                }
            }
        }
    }

    private static class ThreadDemo2 extends Thread {
        public void run() {
            synchronized (Lock2) {
                System.out.println("Thread 2: Holding lock 2...");

                try { Thread.sleep(10); }
                catch (InterruptedException e) {}
                System.out.println("Thread 2: Waiting for lock 1...");

                synchronized (Lock1) {
                    System.out.println("Thread 2: Holding lock 1 & 2...");
                }
            }
        }
    }
}
```
Output. Notice that the main program is hanged on, never stops or quits.
```sh
Thread 1: Holding lock 1...
Thread 2: Holding lock 2...
Thread 1: Waiting for lock 2...
Thread 2: Waiting for lock 1...
```

### 1.2 Deadlock Solution
To solve the above issue, we can make the second thread to acquire lock1 first, then lock2.


## 6. References
* [Java - Thread Deadlock](https://www.tutorialspoint.com/java/java_thread_deadlock.htm)
* [Deadlock in Java Multithreading](https://www.geeksforgeeks.org/deadlock-in-java-multithreading/)
* [How to Detect Java Deadlocks Programmatically](https://dzone.com/articles/how-detect-java-deadlocks)
