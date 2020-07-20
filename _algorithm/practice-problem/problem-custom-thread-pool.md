---
layout: tutorial
key: algorithm
title: "Problem - Custom Thread Pool"
index: 1405
subcategory: practice-problem
date: 2019-08-01
tags: [Thread Pool, BlockingQueue]
---

> Implement a thread pool with blocking queue.

## 1. Requirement
Implement a thread pool with blocking queue. Use `BlockingQueue` to store the tasks from client. The `Worker` will take one task from BlockingQueue and run it.

## 2. Solution
Customized ThreadPool.
```java
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.BlockingQueue;

public class ThreadPool {
    private BlockingQueue bq ;
    private List<Worker> threads;
    private boolean isStopped;
    private int capacity;

    public ThreadPool(int numOfThreads) {
        isStopped = false;
        capacity = 100;
        bq = new ArrayBlockingQueue(capacity);
        threads = new ArrayList<>();
        for (int i = 0; i < numOfThreads; i++) {
            threads.add(new Worker(i + 1, bq));
        }
        for (Worker worker : threads) {
            worker.start();
        }
        System.out.println("Thread pool is ready...");
    }

    public synchronized void execute(Runnable task) throws Exception {
        if (this.isStopped) {
            throw new IllegalStateException("ThreadPool is stopped");
        }

        this.bq.put(task);
    }

    public synchronized void shutdown() {
        try {
            Thread.sleep(20000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        this.isStopped = true;
        for (Worker thread : threads) {
            thread.doStop();
        }
    }
}
```
Worker extends the Thread class. Call BlockingQueue.take() method to get task and execute it.
```java
class Worker extends Thread {
    private int id;
    private BlockingQueue<Task> bq;
    private boolean isStopped;

    public Worker(int id, BlockingQueue bq) {
        this.id = id;
        this.bq = bq;
        this.isStopped = false;
    }

    public void run(){
        while(!isStopped()){
            try {
                Task task = bq.take();
                System.out.println("Worker #" + id + " is working on the task: " + task.getName());
                task.run();
            } catch(Exception e){
                //log or otherwise report exception,
                //but keep worker thread alive.
            }
        }
    }

    public synchronized void doStop(){
        if (!this.isInterrupted()) {
            try {
                this.interrupt(); //break worker thread
            } catch (SecurityException ignore) {
            } finally {
            }
        }
        isStopped = true;
    }

    public synchronized boolean isStopped(){
        return isStopped;
    }
}
```
Real task needs to be executed.
```java
public class Task implements Runnable {
    private String name;
    private Random random;

    public Task(String name) {
        this.name = name;
        this.random = new Random();
    }

    public String getName() {
        return name;
    }

    public void run() {
        try {
            Long duration = (long) (random.nextInt(10));
            System.out.println("Executing : " + name + " at " + LocalDateTime.now().toString());
            TimeUnit.SECONDS.sleep(duration);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
```
Create a thread pool with 2 workers and create 5 tasks to be executed by the thread pool.
```java
public class ThreadPoolExample {
    public static void main(String[] args) {
        ThreadPool threadPool = new ThreadPool(2);

        List<Task> list = new ArrayList<>();
        for (int i = 1; i <= 5; i++) {
            Task task = new Task("Task" + i);
            list.add(task);
            System.out.println("Created : " + task.getName());
        }

        for (Task task : list) {
            try {
                threadPool.execute(task);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        threadPool.shutdown();
    }
}
```
Output.
```raw
Thread pool is ready...
Created : Task1
Created : Task2
Created : Task3
Created : Task4
Created : Task5
Worker #2 is working on the task: Task2
Worker #1 is working on the task: Task1
Executing : Task2 at 2020-04-17T21:24:56.042
Executing : Task1 at 2020-04-17T21:24:56.042
Worker #1 is working on the task: Task3
Executing : Task3 at 2020-04-17T21:24:56.099
Worker #2 is working on the task: Task4
Executing : Task4 at 2020-04-17T21:25:04.100
Worker #1 is working on the task: Task5
Executing : Task5 at 2020-04-17T21:25:05.102
```

## 3. Source Files
* [Source files of Custom Thread Pool on Github](https://github.com/jojozhuang/practice-problems/tree/master/thread-pool)

## 4. References
* [Thread Pools](http://tutorials.jenkov.com/java-concurrency/thread-pools.html)
* [Example of newSingleThreadExecutor in Java](https://www.concretepage.com/java/newsinglethreadexecutor_java)
