---
layout: tutorial
key: programming
title: "Java Concurrency - Synchronization"
index: 2407
subcategory: java-concurrency
date: 2017-04-04
tags: [Synchronization, Reentrant Lock, Monitor]
---

> Thread synchronization.

## 1. Synchronization
Synchronization in Java is the capability to control the access of multiple threads to any shared resource. Java Synchronization is better option where we want to allow only one thread to access the shared resource.

The synchronization is mainly used to
* Prevent thread interference.
* Prevent consistency problem.

### 1.1 Concurrency Issues
Example of Race Condition.

Consider the following `Counter` class which contains an increment() method that increments the count by one, each time it is invoked.
```java
public class Counter {
    private int count = 0;

    public void increment() { // method not synchronized
        count = count +  1;
        System.out.println(count);
    }
}
```
Let’s assume that two threads try to increment the count by calling the increment() method simultaneously.
```java
public class RaceConditionExample {
    public static void main(String[] args) {
        Counter counter = new Counter();
        WorkerThread1 t1 = new WorkerThread1(counter);
        WorkerThread2 t2 = new WorkerThread2(counter);
        t1.start();
        t2.start();
    }
}
public class WorkerThread1 extends Thread {
    private Counter counter;
    public WorkerThread1(Counter counter) {
        this.counter = counter;
    }
    public void run(){
        for (int i = 0; i < 10; i++) {
            this.counter.increment();
        }
    }
}
public class WorkerThread2 extends Thread {
    private Counter counter;
    public WorkerThread1(Counter counter) {
        this.counter = counter;
    }
    public void run(){
        for (int i = 0; i < 10; i++) {
            this.counter.increment();
        }
    }
}
```
Output.
```raw
1
3
2
5
6
7
8
9
10
11
12
13
4
14
15
16
17
18
19
20
```
* Notice that the number is not in sequence.

### 1.2 Solution for Concurrency Issues
To solve the problem, we need to declare the increment() method as `synchronized`.
```java
public class Counter {
    private int count = 0;

    public synchronized void increment() { //synchronized method  
        count = count +  1;
        System.out.println(count);
    }
}
```
Run again, we will get the following sequential numbers.
```raw
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
```

## 2. synchronized Keyword and Intrinsic Lock
Following is the general form of a synchronized block:
```java
// Only one thread can execute at a time.
// 'sync_object' is a reference to an object whose lock associates with the monitor.
// The code is said to be synchronized on the monitor object.
synchronized(sync_object)
{
   // Access shared variables and other
   // shared resources
}
```
### 2.1 Synchronized Method and Synchronized Block
Example1: synchronize on method.
```java
public class Sender {
    public synchronized void send(String msg) {
        System.out.println("Sending: " + msg);
        try
        {
            Thread.sleep(1000);
        }
        catch (Exception e)
        {
            System.out.println("Thread interrupted.");
        }
        System.out.println(msg + " is sent.");
    }
}
```
Example2: synchronize on code block(synchronize only part of a method.).
```java
public class Sender {
    public void send(String msg) {
        synchronized(this)
        {
            System.out.println("Sending: " + msg);
            try
            {
                Thread.sleep(1000);
            }
            catch (Exception e)
            {
                System.out.println("Thread interrupted.");
            }
            System.out.println(msg + " is sent.");
        }
    }
}
```
### 2.2 intrinsicLock
Each we use synchronized keyword, actually we are creating intrinsic lock.

Synchronize method.
```java
public synchronized void method()
{
    //method body
}
```
The above code is equivalent to:
```java
public void method() {
    this.intrinsicLock.lock();
    try
    {
        //method body
    }
    finally
    {
        this.intrinsicLock.unlock();
    }
}
```
### 2.3 Types of Intrinsic Lock
In Java, an `intrinsic lock` is implied by each use of the synchronized keyword. In this case, the locking is performed by Java behind the scenes. (This is distinct from the programmer using or defining an explicit lock object themselves.)
Each use of the synchronized keyword is associated with one of the two types of intrinsic lock:
* an "instance lock", attached to a single object
* a "static lock", attached to a class

Here is a synchronized instance method:
```java
public synchronized void add(int value){
    this.count += value;
}
```
Here is a synchronized static method:
```java
public static synchronized void add(int value){
    count += value;
}
```

If a method is declared as synchronized, then it will acquire either the instance lock or the static lock when it is invoked, according to whether it is an instance method or a static method.

The two types of lock have similar behavior, but are completely independent of each other.
* Acquiring the instance lock only blocks other threads from invoking a synchronized instance method; it does not block other threads from invoking an un-synchronized method, nor does it block them from invoking a static synchronized method.
* Similarly, acquiring the static lock only blocks other threads from invoking a static synchronized method; it does not block other threads from invoking an un-synchronized method, nor does it block them from invoking a synchronized instance method.

Outside of a method header, **synchronized(this)** acquires the instance lock.

The static lock can be acquired outside of a method header in two ways:
* synchronized(Blah.class), using the class literal
* synchronized(this.getClass()), if an object is available

## 3. Monitor
In Java, the synchronization is implemented with a concept called `monitors`. Only one thread can own a monitor at a given time. When a thread acquires a lock, it is said to have entered the monitor. All other threads attempting to enter the locked monitor will be suspended until the first thread exits the monitor.

### 3.1 The Monitor Concept
In the terminology of Java, a monitor has these properties:
* A monitor is a class with only private fields.
* Each object of that class has an associated lock.
* All methods are locked by that lock. In other words, if a client calls obj.method(), then the lock for obj is automatically acquired at the beginning of the method call and relinquished when the method returns. Since all fields are private, this arrangement ensures that no thread can access the fields while another thread manipulates them.
* The lock can have any number of associated conditions.

Every object in Java has an intrinsic lock and an intrinsic condition. If a method is declared with the synchronized keyword, it acts like a monitor method. The condition variable is accessed by calling 'wait/notifyAll/notify'.

## 4. Reentrant Lock
The `ReentrantLock` class implements the `Lock` interface and provides synchronization to methods while accessing shared resources. The code which manipulates the shared resource is surrounded by calls to lock and unlock method. Reentrant Locks are provided in Java to provide synchronization with greater `flexibility`.
```java
Lock reentrantlock = new ReentrantLock();

public void some_method()
{
    reentrantlock.lock();
    try
    {
        //Do some work
    }
    catch(Exception e)
    {
        e.printStackTrace();
    }
    finally
    {
        reentrantlock.unlock();
    }
}
```
* The `unlock` statement is always called in the finally block to ensure that the lock is released even if an exception is thrown in the method body(try block).

## 5. Source Files
* [Source files for Java Synchronization on GitHub](https://github.com/jojozhuang/java-programming/tree/master/java-concurrency-synchronization)

## 6. References
* [Synchronization in Java](https://www.javatpoint.com/synchronization-in-java)
* [Race Conditions and Critical Sections](http://tutorials.jenkov.com/java-concurrency/race-conditions-and-critical-sections.html)
