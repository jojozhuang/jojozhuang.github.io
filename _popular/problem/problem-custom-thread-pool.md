---
layout: tutorial
key: popular
title: "Problem - Custom Thread Pool"
index: 1705
subcategory: practice-problems
date: 2019-08-01
tags: [Thread Pool, BlockingQueue]
---

> Implement a thread pool with blocking queue.

## 1. Requirement
Implement a thread pool with blocking queue. Use `BlockingQueue` to store the tasks from client. The `Worker` will take one task from BlockingQueue and run it.

## 2. Solution
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

    public ThreadPool(int numOfThreads){
        isStopped = false;
        capacity = 100;
        bq = new ArrayBlockingQueue(capacity);
        threads = new ArrayList<>();
        for (int i = 0; i < numOfThreads; i++){
            threads.add(new Worker(bq));
        }
        for (Worker worker : threads) {
            worker.start();
        }
    }

    public synchronized void execute(Runnable task) throws Exception{
        if (this.isStopped) {
            throw new IllegalStateException("ThreadPool is stopped");
        }

        this.bq.put(task);
    }

    public synchronized void shutdown(){
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

    private BlockingQueue<Runnable> bq;
    private boolean isStopped;

    public Worker(BlockingQueue bq){
        this.bq = bq;
        this.isStopped = false;
    }

    public void run(){
        while(!isStopped()){
            try {
                Runnable runnable = bq.take();
                runnable.run();
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
Example to use ThreadPool.
```java
public class ThreadPoolExample {
    public static void main(String[] args)
    {
        ThreadPool threadPool = new ThreadPool(2);

        for (int i = 1; i <= 5; i++)
        {
            Task task = new Task("Task " + i);
            System.out.println("Created : " + task.getName());
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
Created : Task 1
Created : Task 2
Created : Task 3
Created : Task 4
Created : Task 5
Executing : Task 2 at 2019-03-27T18:45:03.941
Executing : Task 1 at 2019-03-27T18:45:03.941
Executing : Task 3 at 2019-03-27T18:45:03.989
Executing : Task 4 at 2019-03-27T18:45:08.994
Executing : Task 5 at 2019-03-27T18:45:08.994
```

## 3. Source Files
* [Source files of Custom Thread Pool on Github](https://github.com/jojozhuang/practice-problems/tree/master/thread-pool)

## 4. References
* [Thread Pools](http://tutorials.jenkov.com/java-concurrency/thread-pools.html)
* [Example of newSingleThreadExecutor in Java](https://www.concretepage.com/java/newsinglethreadexecutor_java)
