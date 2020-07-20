---
layout: tutorial
key: programming
title: "Java Concurrency - MultiThreading"
index: 2402
subcategory: java-concurrency
date: 2017-04-04
tags: [Thread, Runnable]
---

> Use Thread class and Runnable interface to create thread.

## 1. How to Create a Thread with Java?
Java lets you create thread in following two ways:
* By implementing the `Runnable` interface.
* By extending the `Thread` class.

### 1.1 Runnable Interface
```java
public interface Runnable {
    void run();
}
```
Create a new class to implement Runnable interface.
```java
public class MyRunnable implements Runnable {
    public void run(){
        System.out.println("MyRunnable is running ...");
    }
}
```
Then, create thread with the instance of MyRunnable as input parameter.
```java
Thread thread = new Thread(new MyRunnable());
thread.start();
```
Output.
```raw
MyRunnable is running ...
```
### 1.2 Thread Class
Create a new class to extend Thread class.
```java
public class MyThread extends Thread {
    public void run() {
        System.out.println("MyThread is running ...");
    }
}
```
Then, create an instance for this MyThread class and run it.
```java
MyThread myThread = new MyThread();
myThread.start();
```
Output.
```raw
MyThread is running ...
```

### 1.3 Methods in Thread class
* getName() - Obtain thread’s name
* getPriority() - Obtain thread’s priority
* isAlive() - Determine if a thread is still running
* join() - Wait for a thread to terminate
* run() - Entry point for the thread
* sleep() - Suspend a thread for a period of time
* start() - Start a thread by calling its run method

### 1.4 Daemon Threads
A daemon is simply a thread that has no other role in life than to serve others. Examples are timer threads that send regular 'timer ticks' to other threads or threads that clean up stale cache entries.
```java
t.setDaemon(true);
```

## 2. Thread States
* `New` - When a new thread is created, it is in the new state. (new Thread();)
* `Runnable` - A thread that is ready to run is moved to runnable state. (t1.run();)
* `Blocked` - When a thread is temporarily inactive, e.g. (require a lock)
* `Waiting` - When a thread is temporarily inactive, e.g. (wait on a condition);
* `Timed Waiting` - A thread lies in timed waiting state when it calls a method with a time out parameter. (Thread.sleep(1000);)
* `Terminated` -  A thread terminates because of either of the following reasons: Normally exits or interrupted.

![image](/assets/images/programming/2402/threadstate.png){:width="800px"}  

## 3. Source Files
* [Source files for Java Thread on GitHub](https://github.com/jojozhuang/java-programming/tree/master/java-concurrency-thread)

## 4. References
* [Creating and Starting Java Threads](http://tutorials.jenkov.com/java-concurrency/creating-and-starting-threads.html)
* [Java Concurrency Tutorial](https://howtodoinjava.com/java-concurrency-tutorial/)
