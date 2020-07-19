---
layout: tutorial
key: programming
title: "Java Concurrency - Callable and Future"
index: 2405
subcategory: java-concurrency
date: 2017-04-04
tags: [Callable, Future, FutureTask]
---

> Volatile, Final and Atomics.

## 1. Callables and Futures
A `Runnable` encapsulates a task that runs asynchronously; you can think of it as an asynchronous method with no parameters and no return value. A `Callable` is similar to a Runnable, but it returns a value. The Callable interface is a parameterized type, with a single method `call`.
```java
public interface Callable<V>
{
    V call() throws Exception; // V is the type of the returned value.
}
```

A `Future` holds the result of an asynchronous computation. The Future interface has the following methods:
```java
public interface Future<V>
{
    V get() throws . . .;
    V get(long timeout, TimeUnit unit) throws . . .;
    void cancel(boolean mayInterrupt);
    boolean isCancelled();
    boolean isDone();
}
```
The `FutureTask` wrapper is a convenient mechanism for turning a Callable into both a Future and a Runnable—it implements both interfaces. For example:
```java
Callable<Integer> myComputation = . . .;
FutureTask<Integer> task = new FutureTask<Integer>(myComputation);
Thread t = new Thread(task); // it's a Runnable
t.start();
...
Integer result = task.get(); // it's a Future
```

## 2. Example
The following two examples show how get to get result from from thread.
### 2.1 Runnable Only
Create a work thread with `Runnable` get generate random number.
```java
public class RunnableWorker implements Runnable {
    // Shared object to store result
    private Object result = null;

    public void run() {
        Random random = new Random();
        Integer randomNumber = random.nextInt(5);

        // As run cannot throw any Exception
        try {
            Thread.sleep(randomNumber * 1000);
        }
        catch (InterruptedException e) {
            e.printStackTrace();
        }

        // Store the return value in result when done
        result = randomNumber;

        // Wake up threads blocked on the get() method
        synchronized(this) {
            notifyAll();
        }
    }

    public synchronized Object get() throws InterruptedException {
        while (result == null) {
            wait();
        }
        return result;
    }
}
```
* Use `notifyAll()` method to notify other threads that the result is ready.
* Use `wait()` method to let the caller keep waiting until the result is ready.

Create a main thread with 5 tasks. Call the `get()` method to receive the result for each task.
```java
public class RunnableExample {
    public static void main(String[] args) throws Exception {
        RunnableWorker[] tasks = new RunnableWorker[5];

        System.out.println("Creating tasks...");
        for (int i = 0; i < 5; i++) {
            tasks[i] = new RunnableWorker();
            Thread t = new Thread(tasks[i]);
            t.start();
        }

        System.out.println("Waiting results...");
        for (int i = 0; i < 5; i++) {
            System.out.println(tasks[i].get());
        }
    }
}
```
Output.
```raw
Creating tasks...
Waiting results...
3
1
0
3
2
```
### 2.2 Callable + FurtureTask
Create a work thread with `Callable` get generate random number.
```java
public class CallableWorker implements Callable {
    public Object call() throws Exception {
        Random random = new Random();
        Integer randomNumber = random.nextInt(5);

        Thread.sleep(randomNumber * 1000);

        return randomNumber;
    }
}
```
Create a main thread to use `Future` to get result from Callable.
```java
import java.util.concurrent.Callable;
import java.util.concurrent.FutureTask;

public class CallableExample {
    public static void main(String[] args) throws Exception {
        // FutureTask is a concrete class that implements both Runnable and Future
        FutureTask[] tasks = new FutureTask[5];

        System.out.println("Creating tasks...");
        for (int i = 0; i < 5; i++) {
            Callable callable = new CallableWorker();

            // Create the FutureTask with Callable
            tasks[i] = new FutureTask(callable);

            // As it implements Runnable, create Thread with FutureTask
            Thread t = new Thread(tasks[i]);
            t.start();
        }

        System.out.println("Waiting results...");
        for (int i = 0; i < 5; i++) {
            // As it implements Future, we can call get()
            System.out.println(tasks[i].get());

            // This method blocks till the result is obtained
            // The get method can throw checked exceptions
            // like when it is interrupted. This is the reason
            // for adding the throws clause to main
        }
    }
}
```
Output:
```raw
Creating tasks...
Waiting results...
2
4
0
0
3
```

## 3. Source Files
* [Source files for Java Callable on GitHub](https://github.com/jojozhuang/java-programming/tree/master/java-concurrency-callable)

## 4. References
* [Callable and Future in Java](https://www.geeksforgeeks.org/callable-future-java/)
