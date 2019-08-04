---
layout: tutorial
key: popular
title: "Java Concurrency - Synchronizers"
index: 1437
subcategory: java-concurrency
date: 2017-04-04
tags: [CyclicBarrier, CountDownLatch, Semaphore]
draft: true
---

> Synchronizers for multithreading.

## 1. Synchronizers
The java.util.concurrent package contains several classes that help manage a set of collaborating threads. These mechanisms have “canned functionality” for common rendezvous patterns between threads. If you have a set of collaborating threads that follow one of these behavior patterns, you should simply reuse the appropriate library class instead of trying to come up with a handcrafted collection of locks and conditions.

Class              | What It Does | Notes
-------------------|--------------|-----------------------------------------------
`CyclicBarrier`    | Allows a set of threads to wait until a predefined count of them has reached a common barrier, and then optionally executes a barrier action.  | Use when a number of threads need to complete before their results can be used. The barrier can be reused after the waiting threads have been released.
`Phaser`           | Like a cyclic barrier, but with a mutable party count.  | Introduced in Java SE 7.
`CountDownLatch`   | Allows a set of threads to wait until a count has been decremented to 0.  | Use when one or more threads need to wait until a specified number of events have occurred.
`Exchanger`        | Allows two threads to exchange objects when both are ready for the exchange.  | Use when two threads work on two instances of the same data structure, with the first thread filling one instance and the second thread emptying the other.
`Semaphore`        | Allows a set of threads to wait until permits are available for proceeding.  | Use to restrict the total number of threads that can access a resource. If the permit count is one, use to block threads until another thread gives permission.
`SynchronousQueue` | Allows a thread to hand off an object to another thread. | Use to send an object from one thread to another when both are ready, without explicit synchronization.

## 2. CyclicBarrier
CyclicBarrier is used to make threads wait for each other. It is used when different threads process a part of computation and when all threads have completed the execution, the result needs to be combined in the parent thread. In other words, a CyclicBarrier is used when multiple thread carry out different sub tasks and the output of these sub tasks need to be combined to form the final output.
```java
//JAVA program to demonstrate execution on Cyclic Barrier

import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;
import java.util.concurrent.BrokenBarrierException;
import java.util.concurrent.CyclicBarrier;

class Computation1 implements Runnable
{
    public static int product = 0;
    public void run()
    {
        product = 2 * 3;
        try
        {
            Tester.newBarrier.await();
        }
        catch (InterruptedException | BrokenBarrierException e)
        {
            e.printStackTrace();
        }
    }
}

class Computation2 implements Runnable
{
    public static int sum = 0;
    public void run()
    {
        // check if newBarrier is broken or not
        System.out.println("Is the barrier broken? - " + Tester.newBarrier.isBroken());
        sum = 10 + 20;
        try
        {
            Tester.newBarrier.await(3000, TimeUnit.MILLISECONDS);

            // number of parties waiting at the barrier
            System.out.println("Number of parties waiting at the barrier "+
            "at this point = " + Tester.newBarrier.getNumberWaiting());
        }
        catch (InterruptedException | BrokenBarrierException e)
        {
            e.printStackTrace();
        }
        catch (TimeoutException e)
        {
            e.printStackTrace();
        }
    }
}


public class Tester implements Runnable
{
    public static CyclicBarrier newBarrier = new CyclicBarrier(3);

    public static void main(String[] args)
    {
        // parent thread
        Tester test = new Tester();

        Thread t1 = new Thread(test);
        t1.start();
    }
    public void run()
    {
        System.out.println("Number of parties required to trip the barrier = "+
        newBarrier.getParties());
        System.out.println("Product of Computation1 = " + Computation1.product);
        System.out.println("Sum of Computation2 = " + Computation2.sum);

        // objects on which the child thread has to run
        Computation1 comp1 = new Computation1();
        Computation2 comp2 = new Computation2();

        // creation of child thread
        Thread t1 = new Thread(comp1);
        Thread t2 = new Thread(comp2);

        // moving child thread to runnable state
        t1.start();
        t2.start();

        try
        {
            Tester.newBarrier.await();
        }
        catch (InterruptedException | BrokenBarrierException e)
        {
            e.printStackTrace();
        }

        // barrier breaks as the number of thread waiting for the barrier
        // at this point = 3
        System.out.println("Product of Computation1 = " + Computation1.product);
        System.out.println("Sum of Computation2 = " + Computation2.sum);

        // Resetting the newBarrier
        newBarrier.reset();
        System.out.println("Barrier reset successful");
    }
}
```
Output.
```raw
Number of parties required to trip the barrier = 3
Product of Computation1 = 0
Sum of Computation2 = 0
Is the barrier broken? - false
Number of parties waiting at the barrier at this point = 0
Product of Computation1 = 6
Sum of Computation2 = 30
Barrier reset successful
```

Difference between a CyclicBarrier and a CountDownLatch
* A `CountDownLatch` can be used only once in a program(until it’s count reaches 0).
* A `CyclicBarrier` can be used again and again once all the threads in a barriers is released.

## 3. CountDownLatch
CountDownLatch is used to make sure that a task waits for other threads before it starts.
```java
// Java Program to demonstrate how
// to use CountDownLatch, Its used
// when a thread needs to wait for other
// threads before starting its work.
import java.util.concurrent.CountDownLatch;

public class CountDownLatchDemo
{
    public static void main(String args[])
                   throws InterruptedException
    {
        // Let us create task that is going to
        // wait for four threads before it starts
        CountDownLatch latch = new CountDownLatch(4);

        // Let us create four worker
        // threads and start them.
        Worker first = new Worker(1000, latch,
                                  "WORKER-1");
        Worker second = new Worker(2000, latch,
                                  "WORKER-2");
        Worker third = new Worker(3000, latch,
                                  "WORKER-3");
        Worker fourth = new Worker(4000, latch,
                                  "WORKER-4");
        first.start();
        second.start();
        third.start();
        fourth.start();

        // The main task waits for four threads
        latch.await();

        // Main thread has started
        System.out.println(Thread.currentThread().getName() +
                           " has finished");
    }
}

// A class to represent threads for which
// the main thread waits.
class Worker extends Thread
{
    private int delay;
    private CountDownLatch latch;

    public Worker(int delay, CountDownLatch latch,
                                    String name)
    {
        super(name);
        this.delay = delay;
        this.latch = latch;
    }

    @Override
    public void run()
    {
        try
        {
            Thread.sleep(delay);
            latch.countDown();
            System.out.println(Thread.currentThread().getName()
                            + " finished");
        }
        catch (InterruptedException e)
        {
            e.printStackTrace();
        }
    }
}
```
* Creating an object of CountDownLatch by passing an int to its constructor (the count), is actually number of invited parties (threads) for an event.
* The thread, which is dependent on other threads to start processing, waits on until every other thread has called count down. All threads, which are waiting on `await()` proceed together once count down reaches to zero.
* `countDown()` method decrements the count and await() method blocks until count == 0

## 4. Semaphore
Conceptually, a semaphore manages a number of permits.
```java
// java program to demonstrate
// use of semaphores Locks
import java.util.concurrent.*;

//A shared resource/class.
class Shared
{
    static int count = 0;
}

class MyThread extends Thread
{
    Semaphore sem;
    String threadName;
    public MyThread(Semaphore sem, String threadName)
    {
        super(threadName);
        this.sem = sem;
        this.threadName = threadName;
    }

    @Override
    public void run() {

        // run by thread A
        if(this.getName().equals("A"))
        {
            System.out.println("Starting " + threadName);
            try
            {
                // First, get a permit.
                System.out.println(threadName + " is waiting for a permit.");

                // acquiring the lock
                sem.acquire();

                System.out.println(threadName + " gets a permit.");

                // Now, accessing the shared resource.
                // other waiting threads will wait, until this
                // thread release the lock
                for(int i=0; i < 5; i++)
                {
                    Shared.count++;
                    System.out.println(threadName + ": " + Shared.count);

                    // Now, allowing a context switch -- if possible.
                    // for thread B to execute
                    Thread.sleep(10);
                }
            } catch (InterruptedException exc) {
                    System.out.println(exc);
                }

                // Release the permit.
                System.out.println(threadName + " releases the permit.");
                sem.release();
        }

        // run by thread B
        else
        {
            System.out.println("Starting " + threadName);
            try
            {
                // First, get a permit.
                System.out.println(threadName + " is waiting for a permit.");

                // acquiring the lock
                sem.acquire();

                System.out.println(threadName + " gets a permit.");

                // Now, accessing the shared resource.
                // other waiting threads will wait, until this
                // thread release the lock
                for(int i=0; i < 5; i++)
                {
                    Shared.count--;
                    System.out.println(threadName + ": " + Shared.count);

                    // Now, allowing a context switch -- if possible.
                    // for thread A to execute
                    Thread.sleep(10);
                }
            } catch (InterruptedException exc) {
                    System.out.println(exc);
                }
                // Release the permit.
                System.out.println(threadName + " releases the permit.");
                sem.release();
        }
    }
}

// Driver class
public class SemaphoreDemo
{
    public static void main(String args[]) throws InterruptedException
    {
        // creating a Semaphore object
        // with number of permits 1
        Semaphore sem = new Semaphore(1);

        // creating two threads with name A and B
        // Note that thread A will increment the count
        // and thread B will decrement the count
        MyThread mt1 = new MyThread(sem, "A");
        MyThread mt2 = new MyThread(sem, "B");

        // stating threads A and B
        mt1.start();
        mt2.start();

        // waiting for threads A and B
        mt1.join();
        mt2.join();

        // count will always remain 0 after
        // both threads will complete their execution
        System.out.println("count: " + Shared.count);
    }
}
```
Output.
```raw
Starting A
Starting B
B is waiting for a permit.
B gets a permit.
A is waiting for a permit.
B: -1
B: -2
B: -3
B: -4
B: -5
B releases the permit.
A gets a permit.
A: -4
A: -3
A: -2
A: -1
A: 0
A releases the permit.
count: 0
```

## 5. Source Files
* [Source files for Java Synchronization on GitHub](https://github.com/jojozhuang/java-programming/tree/master/java-concurrency-synchronization)

## 6. References
* [Java Concurrency and Multithreading Tutorial](http://tutorials.jenkov.com/java-concurrency/index.html)
* [Lifecycle and States of a Thread in Java](https://www.geeksforgeeks.org/lifecycle-and-states-of-a-thread-in-java/)
* [Synchronized in Java](https://www.geeksforgeeks.org/synchronized-in-java/)
* [Remember the types of intrinsic lock](http://www.javapractices.com/topic/TopicAction.do?Id=35)
* [Java - Thread Deadlock](https://www.tutorialspoint.com/java/java_thread_deadlock.htm)
* [Java ThreadLocal](http://tutorials.jenkov.com/java-concurrency/threadlocal.html)
* [Reentrant Lock in Java](https://www.geeksforgeeks.org/reentrant-lock-java/)
* [Thread Pools in Java](https://www.geeksforgeeks.org/thread-pools-java/)
* [Callable and Future in Java](https://www.geeksforgeeks.org/callable-future-java/)
* [Semaphore in Java](https://www.geeksforgeeks.org/semaphore-in-java/)
* [CountDownLatch in Java](https://www.geeksforgeeks.org/countdownlatch-in-java/)
