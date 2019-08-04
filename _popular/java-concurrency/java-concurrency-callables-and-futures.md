---
layout: tutorial
key: popular
title: "Java Concurrency - Callables and Futures"
index: 1436
subcategory: java-concurrency
date: 2017-04-04
tags: [Callables, Futures]
draft: true
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
Callable Example, return random number.
```java
class CallableExample implements Callable
{
  public Object call() throws Exception
  {
    Random generator = new Random();
    Integer randomNumber = generator.nextInt(5);

    Thread.sleep(randomNumber * 1000);

    return randomNumber;
  }
}
```
Use Future to get result from Callable.
```java
public static void main(String[] args) throws Exception
  {
    // FutureTask is a concrete class that implements both Runnable and Future
    FutureTask[] randomNumberTasks = new FutureTask[5];

    for (int i = 0; i < 5; i++)
    {
      Callable callable = new CallableExample();

      // Create the FutureTask with Callable
      randomNumberTasks[i] = new FutureTask(callable);

      // As it implements Runnable, create Thread
      // with FutureTask
      Thread t = new Thread(randomNumberTasks[i]);
      t.start();
    }

    for (int i = 0; i < 5; i++)
    {
      // As it implements Future, we can call get()
      System.out.println(randomNumberTasks[i].get());

      // This method blocks till the result is obtained
      // The get method can throw checked exceptions
      // like when it is interrupted. This is the reason
      // for adding the throws clause to main
    }
  }
```
Output:
```raw
4
2
3
3
0
```
Similar function using only Runnable.
```java
class RunnableExample implements Runnable
{
    // Shared object to store result
    private Object result = null;

    public void run()
    {
        Random generator = new Random();
        Integer randomNumber = generator.nextInt(5);

        // As run cannot throw any Exception
        try
        {
            Thread.sleep(randomNumber * 1000);
        }
        catch (InterruptedException e)
        {
            e.printStackTrace();
        }

        // Store the return value in result when done
        result = randomNumber;

        // Wake up threads blocked on the get() method
        synchronized(this)
        {
            notifyAll();
        }
    }

    public synchronized Object get() throws InterruptedException
    {
        while (result == null) {
            wait();
        }

        return result;
    }
}
```
Use Future to get result from Runnable.
```java
public static void main(String[] args) throws Exception
{
    RunnableExample[] randomNumberTasks = new RunnableExample[5];

    for (int i = 0; i < 5; i++)
    {
        randomNumberTasks[i] = new RunnableExample();
        Thread t = new Thread(randomNumberTasks[i]);
        t.start();
    }

    for (int i = 0; i < 5; i++)
        System.out.println(randomNumberTasks[i].get());
}
```

## 5. Source Files
* [Source files for Java Synchronization on GitHub](https://github.com/jojozhuang/java-programming/tree/master/java-concurrency-synchronization)

## 6. References
* [Synchronization in Java](https://www.javatpoint.com/synchronization-in-java)
* [Race Conditions and Critical Sections](http://tutorials.jenkov.com/java-concurrency/race-conditions-and-critical-sections.html)
