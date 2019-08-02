---
layout: tutorial
key: popular
title: "Java Concurrency - Thread Pool"
index: 1433
subcategory: java-concurrency
date: 2017-04-04
tags: [Thread Pool]
---

> Thread Pool

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

## 2. Customized Thread Pool
Use BlockingQueue to store the tasks from client. The WorkerThread will take one task from BlockingQueue and run it.
```java
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.BlockingQueue;

public class MyThreadPool {
    private BlockingQueue bq ;
    private List<WorkerThread> threads;
    private boolean isStopped;
    private int capacity;

    public MyThreadPool(int numOfThreads){
        isStopped = false;
        capacity = 100;
        bq = new ArrayBlockingQueue(capacity);
        threads = new ArrayList<>();
        for (int i = 0; i < numOfThreads; i++){
            threads.add(new WorkerThread(bq));
        }
        for (WorkerThread thread : threads) {
            thread.start();
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
        for (WorkerThread thread : threads) {
            thread.doStop();
        }
    }
}
```
WorkerThread extends the Thread class. Call BlockingQueue.take() method to get task and execute it.
```java
class WorkerThread extends Thread {

    private BlockingQueue<Runnable> bq;
    private boolean isStopped;

    public WorkerThread(BlockingQueue bq){
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
Example to use MyThreadPool.
```java
public class MyThreadPoolExample {
    public static void main(String[] args)
    {
        MyThreadPool threadPool = new MyThreadPool(2);

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
Similar output.
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
* [Source files for Java ThreadPool on GitHub](https://github.com/jojozhuang/java-programming/tree/master/java-concurrency-threadpool)

## 4. References
* [Java Thread Pool – ThreadPoolExecutor Example](https://howtodoinjava.com/java/multi-threading/java-thread-pool-executor-example/)
* [Thread Pools](http://tutorials.jenkov.com/java-concurrency/thread-pools.html)
* [Example of newSingleThreadExecutor in Java](https://www.concretepage.com/java/newsinglethreadexecutor_java)
