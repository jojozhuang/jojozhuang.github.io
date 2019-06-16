---
layout: tutorial
key: popular
title: "Java Advanced - MultiThreading"
index: 244
category: advanced
image: java.png
date: 2017-04-04
postdate: 2017-04-04
tags: [Thread, Runnable, concurrency]
---

> Concurrent

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
```sh
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
```sh
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

![image](/public/notes/multi-threading-in-java/threadstate.png){:width="800px"}  

## 2. Thread Pool
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
```sh
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

## 3. Customized Thread Pool
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
```sh
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

## 4. Source Files
* [Source files for Java Thread on GitHub](https://github.com/jojozhuang/java-programming/tree/master/java-thread)
* [Source files for Java ThreadPool on GitHub](https://github.com/jojozhuang/java-programming/tree/master/java-threadpool)

## 5. References
* [Creating and Starting Java Threads](http://tutorials.jenkov.com/java-concurrency/creating-and-starting-threads.html)
* [Java Concurrency Tutorial](https://howtodoinjava.com/java-concurrency-tutorial/)
* [Java Thread Pool – ThreadPoolExecutor Example](https://howtodoinjava.com/java/multi-threading/java-thread-pool-executor-example/)
* [Thread Pools](http://tutorials.jenkov.com/java-concurrency/thread-pools.html)
* [Example of newSingleThreadExecutor in Java](https://www.concretepage.com/java/newsinglethreadexecutor_java)
