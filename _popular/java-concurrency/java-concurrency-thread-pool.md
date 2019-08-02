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

## 3. Source Files
* [Source files for Java ThreadPool on GitHub](https://github.com/jojozhuang/java-programming/tree/master/java-concurrency-threadpool)

## 4. References
* [Java Thread Pool – ThreadPoolExecutor Example](https://howtodoinjava.com/java/multi-threading/java-thread-pool-executor-example/)
* [Thread Pools](http://tutorials.jenkov.com/java-concurrency/thread-pools.html)
* [Example of newSingleThreadExecutor in Java](https://www.concretepage.com/java/newsinglethreadexecutor_java)
