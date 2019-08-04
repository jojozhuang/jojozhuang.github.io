---
layout: tutorial
key: popular
title: "Java Concurrency - Thread Pool"
index: 1433
subcategory: java-concurrency
date: 2017-04-04
tags: [Thread Pool]
draft: true
---

> Thread Pool

## 5. ThreadPool
### 5.1 Executors
If your program creates a large number of short-lived threads, it should use a `thread pool` instead. Factory methods of class Executors.

Method                           | Description
---------------------------------|----------------------------
newCachedThreadPool              | New threads are created as needed; idle threads are kept for 60 seconds.
newFixedThreadPool               | The pool contains a fixed set of threads; idle threads are kept indefinitely.
newSingleThreadExecutor          | A “pool” with a single thread that executes the submitted tasks sequentially (similar to the Swing event dispatch thread).
newScheduledThreadPool           | A fixed-thread pool for scheduled execution; a replacement for java.util.Timer.
newSingleThreadScheduledExecutor | A single-thread “pool” for scheduled execution.

### 5.2 Interface and Class
A thread pool reuses previously created threads to execute current tasks and offers a solution to the problem of thread cycle overhead and resource thrashing. Thread Queue and Thread Pool.
* Interface Executor
* Interface ExecutorService
* Class ThreadPoolExecutor

### 5.3 Example
```java
class Task implements Runnable   
{
    private String name;

    public Task(String s)
    {
        name = s;
    }

    public void run()
    {
        // run some task.
    }
}

public static void main(String[] args)
{
    // creates five tasks
    Runnable r1 = new Task("task 1");
    Runnable r2 = new Task("task 2");
    Runnable r3 = new Task("task 3");
    Runnable r4 = new Task("task 4");
    Runnable r5 = new Task("task 5");      

    // creates a thread pool with 3 of threads as the fixed pool size
    ExecutorService pool = Executors.newFixedThreadPool(3);  

    // passes the Task objects to the pool to execute
    pool.execute(r1);
    pool.execute(r2);
    pool.execute(r3);
    pool.execute(r4);
    pool.execute(r5);

    pool.shutdown();    
}
```
### 5.4 RecursiveTask
The Fork-Join Framework.

Create an array with random numbers, then count how many numbers are larger than 0.5.
```java
public static void main(String[] args) {
    final int size = 1000000;
    double[] numbers = new double[size];
    for (int i = 0; i < size; i++) {
        numbers[i] = Math.random(); // generate random numbers
    }
    Counter counter = new Counter(numbers, 0, numbers.length, new Filter() {
        public boolean accept(double x) {
            return x > 0.5;
        }
    });
    ForkJoinPool pool = new ForkJoinPool();
    pool.invoke(counter); // Performs the given task, returning its result upon completion.
    System.out.println(counter.join()); // output: 500305
}

interface Filter {
    boolean accept(double t);
}

static class Counter extends RecursiveTask<Integer> {
    public static final int THRESHOLD = 1000;
    private double[] values;
    private int from;
    private int to;
    private Filter filter;

    public Counter(double[] numbers, int i, int length, Filter filter) {
        this.values = numbers;
        this.from = i;
        this.to = length;
        this.filter = filter;
    }

    @Override
    protected Integer compute() {
        if (to - from < THRESHOLD) {
            int count = 0;
            for (int i = from; i < to; i++) {
                if (filter.accept(values[i])) count++;
            }
            return count;
        } else {
            int mid = (from + to) / 2;
            Counter first = new Counter(values, from, mid, filter);
            Counter second = new Counter(values, mid, to, filter);
            invokeAll(first, second); //
            return first.join() + second.join();
        }
    }
}
```
* RecursiveTask in inherited from ForkJoinTask.
* Override the `compute` method to generate and invoke subtasks, and to combine their results.
* The `invokeAll` method receives a number of tasks and blocks until all of them have completed.
* The `join` method yields the result.

## 1. Thread Pool
Create Task.
```java
public class Task implements Runnable {
    private String name;

    public Task(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void run() {
        try {
            Long duration = (long) (Math.random() * 10);
            System.out.println("Executing : " + name + " at " + LocalDateTime.now().toString());
            TimeUnit.SECONDS.sleep(duration);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
```
Create `ThreadPoolExecutor` instance to run the task.
```java
import java.util.concurrent.Executors;
import java.util.concurrent.ThreadPoolExecutor;

public class ThreadPoolExample {
    public static void main(String[] args)
    {
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
Created : Task 1
Created : Task 2
Created : Task 3
Created : Task 4
Created : Task 5
Executing : Task 2 at 2019-03-27T10:02:32.272
Executing : Task 1 at 2019-03-27T10:02:32.272
Executing : Task 3 at 2019-03-27T10:02:33.324
Executing : Task 4 at 2019-03-27T10:02:38.321
Executing : Task 5 at 2019-03-27T10:02:39.327
```

## 3. Source Files
* [Source files for Java ThreadPool on GitHub](https://github.com/jojozhuang/java-programming/tree/master/java-concurrency-threadpool)

## 4. References
* [Java Thread Pool – ThreadPoolExecutor Example](https://howtodoinjava.com/java/multi-threading/java-thread-pool-executor-example/)
* [Thread Pools](http://tutorials.jenkov.com/java-concurrency/thread-pools.html)
* [Example of newSingleThreadExecutor in Java](https://www.concretepage.com/java/newsinglethreadexecutor_java)
