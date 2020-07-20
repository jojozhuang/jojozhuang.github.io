---
layout: tutorial
key: programming
title: "Java Concurrency - Thread Pool"
index: 2404
subcategory: java-concurrency
date: 2017-04-04
tags: [Executors, ExecutorService]
---

> Create fixed thread pool and scheduled thread pool.

## 1. Thread Pool
### 1.1 What is Thread Pool?
Thread Pools are useful when you need to **limit** the number of threads running in your application at the same time. There is a performance overhead associated with starting a new thread, and each thread is also allocated some memory for its stack etc.

Instead of starting a new thread for every task to execute concurrently, the task can be passed to a thread pool. As soon as the pool has any idle threads the task is assigned to one of them and executed. Internally the tasks are inserted into a `Blocking Queue` which the threads in the pool are dequeuing from. When a new task is inserted into the queue one of the idle threads will dequeue it successfully and execute it. The rest of the idle threads in the pool will be blocked waiting to dequeue tasks.

### 1.2 Interface and Class
Java 5 comes with built in thread pools in the `java.util.concurrent` package, so you don't have to implement your own thread pool. Below are the important interfaces and classes for using thread pool.
* Interface `Executor`
* Interface `ExecutorService`
* Class `Executors`
* Class `ThreadPoolExecutor`

### 1.3 Types of Thread Pool
Class `Executors` supports to create five types of thread pool with corresponding factory methods. You can choose any of them based to your requirement.

Method                           | Description
---------------------------------|----------------------------
newCachedThreadPool              | New threads are created as needed; idle threads are kept for 60 seconds.
newFixedThreadPool               | The pool contains a fixed set of threads; idle threads are kept indefinitely.
newSingleThreadExecutor          | A “pool” with a single thread that executes the submitted tasks sequentially (similar to the Swing event dispatch thread).
newScheduledThreadPool           | A fixed-thread pool for scheduled execution; a replacement for java.util.Timer.
newSingleThreadScheduledExecutor | A single-thread “pool” for scheduled execution.

## 2. Examples
### 2.1 Fixed Thread Pool
Create task thread by implementing Runnable interface. It takes random seconds to run the task.
```java
public class FixedTask implements Runnable {
    private String name;

    public FixedTask(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void run() {
        try {
            Long duration = (long) (Math.random() * 10);
            System.out.println("Executing: " + name + " at " + LocalDateTime.now().toString());
            TimeUnit.SECONDS.sleep(duration);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
```
Create a fixed thread pool which has two numbers of thread in the pool. We can use it as either `ExecutorService` interface or `ThreadPoolExecutor` class. Then, we create 5 tasks and submit them to thread pool.
```java
import java.util.concurrent.Executors;
import java.util.concurrent.ThreadPoolExecutor;

public class ThreadPoolExample {
    public static void main(String[] args)
    {
        //ExecutorService executor = Executors.newFixedThreadPool(2);
        ThreadPoolExecutor executor = (ThreadPoolExecutor)Executors.newFixedThreadPool(2);

        for (int i = 1; i <= 5; i++)
        {
            Task task = new Task("Task " + i);
            System.out.println("Created : " + task.getName());

            executor.submit(task);
        }
        executor.shutdown();
    }
}
```
Output.
```raw
Created: Task 1
Created: Task 2
Created: Task 3
Created: Task 4
Created: Task 5
Executing: Task 2 at 2019-03-27T10:02:32.272
Executing: Task 1 at 2019-03-27T10:02:32.272
Executing: Task 3 at 2019-03-27T10:02:33.324
Executing: Task 4 at 2019-03-27T10:02:38.321
Executing: Task 5 at 2019-03-27T10:02:39.327
```
### 2.2 Scheduled Thread Pool
We can create scheduled thread pool to run a task periodically.

Create task thread by implementing Runnable interface.
```java
public class ScheduledTask implements Runnable {
    private String name;

    public ScheduledTask(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void run() {
        System.out.println("Executing: " + name + " at " + LocalDateTime.now().toString());
    }
}
```
Create a scheduled thread pool which has only one thread in the pool. The task is scheduled to run every 3 seconds.
```java
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

public class ScheduledThreadPoolExample {
    public static void main(String[] args)
    {
        ScheduledExecutorService ses = Executors.newScheduledThreadPool(1);

        ScheduledTask task = new ScheduledTask("Scheduled Task");

        ses.scheduleAtFixedRate(task, 0, 3, TimeUnit.SECONDS);

    }
}
```
Output.
```raw
Executing: Scheduled Task at 2019-03-28T09:23:58.476
Executing: Scheduled Task at 2019-03-28T09:24:01.444
Executing: Scheduled Task at 2019-03-28T09:24:04.445
Executing: Scheduled Task at 2019-03-28T09:24:07.441
Executing: Scheduled Task at 2019-03-28T09:24:10.442
Executing: Scheduled Task at 2019-03-28T09:24:13.445
Executing: Scheduled Task at 2019-03-28T09:24:16.444
...
```

## 3. Source Files
* [Source files for Java ThreadPool on GitHub](https://github.com/jojozhuang/java-programming/tree/master/java-concurrency-threadpool)

## 4. References
* [Java Thread Pool – ThreadPoolExecutor Example](https://howtodoinjava.com/java/multi-threading/java-thread-pool-executor-example/)
* [Thread Pools](http://tutorials.jenkov.com/java-concurrency/thread-pools.html)
* [Example of newSingleThreadExecutor in Java](https://www.concretepage.com/java/newsinglethreadexecutor_java)
