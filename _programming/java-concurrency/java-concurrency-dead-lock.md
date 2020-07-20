---
layout: tutorial
key: programming
title: "Java Concurrency - Dead Lock"
index: 2412
subcategory: java-concurrency
date: 2018-04-02
tags: [synchronized, deadlock]
---

> Understand what is dead lock, how to avoid, how to detect.

## 1. Concurrency Issue
### 1.1 synchronized
`synchronized` keyword is used to make the class or method thread-safe which means only one thread can have lock of synchronized method and use it, other threads have to wait till the lock releases. It is important if our program is running in multi-threaded environment where two or more threads execute simultaneously. But sometimes it also causes a problem which is called Deadlock.
### 1.2 Deadlock
`Deadlock` describes a situation where two or more threads are blocked forever, waiting for each other. Deadlock occurs when multiple threads need the same locks but obtain them in different order. A Java multithreaded program may suffer from the deadlock condition because the synchronized keyword causes the executing thread to block while waiting for the lock, or monitor, associated with the specified object.
![image](/assets/images/programming/2412/deadlock.png){:width="500px"}
### 1.3 Deadlock Example
Below is a simple example of Deadlock condition. Each thread acquires two locks in different order.
```java
public class DeadlockExample {
    public static Object Lock1 = new Object();
    public static Object Lock2 = new Object();

    public static void main(String args[]) {
        WorkerThread1 t1 = new WorkerThread1();
        WorkerThread2 t2 = new WorkerThread2();
        t1.start();
        t2.start();
    }

    private static class WorkerThread1 extends Thread {
        public void run() {
            synchronized (Lock1) {
                System.out.println("Thread 1: Holding lock 1...");

                try {
                    Thread.sleep(10);
                }
                catch (InterruptedException e) {
                    System.out.println(e.getStackTrace());
                }
                System.out.println("Thread 1: Waiting for lock 2...");

                synchronized (Lock2) {
                    System.out.println("Thread 1: Holding lock 1 & 2...");
                }
            }
        }
    }

    private static class WorkerThread2 extends Thread {
        public void run() {
            synchronized (Lock2) {
                System.out.println("Thread 2: Holding lock 2...");

                try {
                    Thread.sleep(10);
                }
                catch (InterruptedException e) {
                    System.out.println(e.getStackTrace());
                }
                System.out.println("Thread 2: Waiting for lock 1...");

                synchronized (Lock1) {
                    System.out.println("Thread 2: Holding lock 1 & 2...");
                }
            }
        }
    }
}
```
Output.
```raw
Thread 1: Holding lock 1...
Thread 2: Holding lock 2...
Thread 1: Waiting for lock 2...
Thread 2: Waiting for lock 1...
```
* Notice that the main program is hanged on, never stops or quits.

### 1.2 Deadlock Solution
To solve the above issue, we can make the second thread to acquire lock1 first, then lock2.
```java
public class AvoidDeadlockExample {
    public static Object Lock1 = new Object();
    public static Object Lock2 = new Object();

    public static void main(String args[]) {
        WorkerThread1 t1 = new WorkerThread1();
        WorkerThread2 t2 = new WorkerThread2();
        t1.start();
        t2.start();
    }

    private static class WorkerThread1 extends Thread {
        public void run() {
            synchronized (Lock1) {
                System.out.println("Thread 1: Holding lock 1...");

                try {
                    Thread.sleep(10);
                }
                catch (InterruptedException e) {
                    System.out.println(e.getStackTrace());
                }
                System.out.println("Thread 1: Waiting for lock 2...");

                synchronized (Lock2) {
                    System.out.println("Thread 1: Holding lock 1 & 2...");
                }
            }
        }
    }

    private static class WorkerThread2 extends Thread {
        public void run() {
            synchronized (Lock1) {
                System.out.println("Thread 2: Holding lock 1...");

                try {
                    Thread.sleep(10);
                }
                catch (InterruptedException e) {
                    System.out.println(e.getStackTrace());
                }
                System.out.println("Thread 2: Waiting for lock 2...");

                synchronized (Lock2) {
                    System.out.println("Thread 2: Holding lock 1 & 2...");
                }
            }
        }
    }
}
```
Output.
```raw
Thread 1: Holding lock 1...
Thread 1: Waiting for lock 2...
Thread 1: Holding lock 1 & 2...
Thread 2: Holding lock 1...
Thread 2: Waiting for lock 2...
Thread 2: Holding lock 1 & 2...
```
* Notice that the first thread gets both two locks, then the second thread gets them, no deadlock.

In the reality, multithreading programming is not such simple. And deadlock is not such easy to be avoided.

## 2. Deadlock Detection
Deadlock can be very hard to detect during development, and you may have to restart the application in order to recover. It also happens in production environment, which causes severe consequences. Such issue is very hard to spot during testing, and is very difficult to reproduce it locally.
### 2.1 Detect Deadlock Programmatically
Java 5 introduced [ThreadMXBean](https://docs.oracle.com/javase/1.5.0/docs/api/java/lang/management/ThreadMXBean.html) - an interface that provides various monitoring methods for threads. There are many useful methods for monitoring the application performance. The method of our interest is `findMonitorDeadlockedThreads`, or, if you are using Java 6,`findDeadlockedThreads`. The difference is that findDeadlockedThreads can also detect deadlocks caused by owner locks (java.util.concurrent), while findMonitorDeadlockedThreads can only detect monitor locks (i.e. synchronized blocks).

Our idea is to encapsulate periodical checking for deadlocks into a reusable component so we can just fire and forget about it.

### 2.2 Example
One way to implement scheduling is through executors framework - a set of well abstracted and very easy to use multithreading classes. The best choice is `ScheduledExecutorService`.
```java
ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);
this.scheduler.scheduleAtFixedRate(deadlockCheck, period, period, unit);
```
Simple as that, we have a runnable called periodically after a certain amount of time determined by period and time unit. Next, we want to make our utility is extensive and allow clients to supply the behavior that gets triggered after a deadlock is detected. We need a method that receives a list of objects describing threads that are in a deadlock. Create such interface as follows.
```java
public interface DetectionHandler {
    void handleDeadlock(final ThreadInfo[] deadlockedThreads);
}
```
Our implementation.
```java
public class DetectionConsoleHandler implements DetectionHandler {

    @Override
    public void handleDeadlock(final ThreadInfo[] deadlockedThreads) {
        if (deadlockedThreads != null) {
            System.err.println(LocalDateTime.now() + ": Deadlock detected!");

            Map<Thread, StackTraceElement[]> stackTraceMap = Thread.getAllStackTraces();
            for (ThreadInfo threadInfo : deadlockedThreads) {
                if (threadInfo != null) {
                    for (Thread thread : stackTraceMap.keySet()) {
                        if (thread.getId() == threadInfo.getThreadId()) {
                            System.err.println(threadInfo.toString().trim());

                            for (StackTraceElement ste : thread.getStackTrace()) {
                                System.err.println("\t" + ste.toString().trim());
                            }
                        }
                    }
                }
            }
        }
    }
}
```
* If deadlock is detected, it will print the thread information as well as the relevant stack trace.
* In the reality, we can make it to send out email to notify dev or ops.

The Detector. Use ScheduledExecutorService to periodically check if deadlock occurs.
```java
public class DeadlockDetector {
    private final DetectionHandler deadlockHandler;
    private final long period;
    private final TimeUnit unit;
    private final ThreadMXBean mbean = ManagementFactory.getThreadMXBean();
    private final ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);

    final Runnable deadlockCheck = new Runnable() {
        @Override
        public void run() {
            long[] deadlockedThreadIds = DeadlockDetector.this.mbean.findDeadlockedThreads();

            if (deadlockedThreadIds != null) {
                ThreadInfo[] threadInfos =
                        DeadlockDetector.this.mbean.getThreadInfo(deadlockedThreadIds);

                DeadlockDetector.this.deadlockHandler.handleDeadlock(threadInfos);
            }
        }
    };

    public DeadlockDetector(final DetectionHandler deadlockHandler,
                            final long period,
                            final TimeUnit unit) {
        this.deadlockHandler = deadlockHandler;
        this.period = period;
        this.unit = unit;
    }

    public void start() {
        this.scheduler.scheduleAtFixedRate(
                this.deadlockCheck, this.period, this.period, this.unit);
    }
}
```
Create deadlock example to test the detector. The DeadlockDetector is configured to detect deadlock in every 5 seconds.
```java
public class DetectionExample {

    public static Object Lock1 = new Object();
    public static Object Lock2 = new Object();

    public static void main(String args[]) {
        DeadlockDetector deadlockDetector = new DeadlockDetector(new DetectionHandlerImp(),
                       5, TimeUnit.SECONDS);
        deadlockDetector.start();

        WorkerThread1 t1 = new WorkerThread1();
        WorkerThread2 t2 = new WorkerThread2();
        t1.start();
        t2.start();
    }

    private static class WorkerThread1 extends Thread {
        public void run() {
            synchronized (Lock1) {
                System.out.println("Thread 1: Holding lock 1...");

                try {
                    Thread.sleep(10);
                }
                catch (InterruptedException e) {
                    System.out.println(e.getStackTrace());
                }
                System.out.println("Thread 1: Waiting for lock 2...");

                synchronized (Lock2) {
                    System.out.println("Thread 1: Holding lock 1 & 2...");
                }
            }
        }
    }

    private static class WorkerThread2 extends Thread {
        public void run() {
            synchronized (Lock2) {
                System.out.println("Thread 2: Holding lock 2...");

                try {
                    Thread.sleep(10);
                }
                catch (InterruptedException e) {
                    System.out.println(e.getStackTrace());
                }
                System.out.println("Thread 2: Waiting for lock 1...");

                synchronized (Lock1) {
                    System.out.println("Thread 2: Holding lock 1 & 2...");
                }
            }
        }
    }
}
```
Output.
```raw
Thread 1: Holding lock 1...
Thread 2: Holding lock 2...
Thread 2: Waiting for lock 1...
Thread 1: Waiting for lock 2...
2019-08-02T21:32:33.856: Deadlock detected!
"Thread-1" Id=13 BLOCKED on java.lang.Object@10e3c837 owned by "Thread-0" Id=12
	johnny.java.concurrency.deadlock.detection.DetectionExample$WorkerThread2.run(DetectionExample.java:54)
"Thread-0" Id=12 BLOCKED on java.lang.Object@14dc4ef3 owned by "Thread-1" Id=13
	johnny.java.concurrency.deadlock.detection.DetectionExample$WorkerThread1.run(DetectionExample.java:34)
2019-08-02T21:32:38.832: Deadlock detected!
"Thread-1" Id=13 BLOCKED on java.lang.Object@10e3c837 owned by "Thread-0" Id=12
	johnny.java.concurrency.deadlock.detection.DetectionExample$WorkerThread2.run(DetectionExample.java:54)
"Thread-0" Id=12 BLOCKED on java.lang.Object@14dc4ef3 owned by "Thread-1" Id=13
	johnny.java.concurrency.deadlock.detection.DetectionExample$WorkerThread1.run(DetectionExample.java:34)
2019-08-02T21:32:43.835: Deadlock detected!
```
* Notice the interval of detection is 5 seconds.

## 3. Source Files
* [Source files for Java Dead Lock on GitHub](https://github.com/jojozhuang/java-programming/tree/master/java-concurrency-deadlock)

## 4. References
* [Java - Thread Deadlock](https://www.tutorialspoint.com/java/java_thread_deadlock.htm)
* [Deadlock in Java Multithreading](https://www.geeksforgeeks.org/deadlock-in-java-multithreading/)
* [How to Detect Java Deadlocks Programmatically](https://dzone.com/articles/how-detect-java-deadlocks)
