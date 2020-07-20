---
layout: tutorial
key: programming
title: "Java Concurrency - Synchronizers"
index: 2408
subcategory: java-concurrency
date: 2017-04-04
tags: [CyclicBarrier, CountDownLatch, Semaphore]
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

The following example is to calculate the result of (2 * 3) + (10 * 20), which is 206.

Create two sub task threads.
```java
public class Computation1 implements Runnable {
    public static int product = 0;
    private final CyclicBarrier cyclicBarrier;

    public Computation1(CyclicBarrier cyclicBarrier) {
        this.cyclicBarrier = cyclicBarrier;
    }

    public void run() {
        product = 2 * 3;
        try {
            Thread.sleep(1000);
            // number of parties waiting at the barrier
            System.out.println("Number of parties waiting at the barrier "+
                    "at this point = " + cyclicBarrier.getNumberWaiting());
            cyclicBarrier.await();
        }
        catch (InterruptedException | BrokenBarrierException e) {
            e.printStackTrace();
        }
    }
}

public class Computation2 implements Runnable {
    public static int product = 0;
    private final CyclicBarrier cyclicBarrier;

    public Computation2(CyclicBarrier cyclicBarrier) {
        this.cyclicBarrier = cyclicBarrier;
    }

    public void run() {
        product = 10 * 20;
        try {
            Thread.sleep(2000);
            // number of parties waiting at the barrier
            System.out.println("Number of parties waiting at the barrier "+
                    "at this point = " + cyclicBarrier.getNumberWaiting());
            cyclicBarrier.await();
        }
        catch (InterruptedException | BrokenBarrierException e) {
            e.printStackTrace();
        }
    }
}
```
The main thread creates two sub threads and will wait them to finish their execution.
```java
/*
    Calculate result of (2*3) + (10*20) = 206
 */
public class CyclicBarrierExample {
    public static void main(String[] args) {
        final CyclicBarrier barrier = new CyclicBarrier(3);
        System.out.println("Number of parties required to trip the barrier = " +
                barrier.getParties());
        System.out.println("Product of Computation1 = " + Computation1.product);
        System.out.println("Product of Computation2 = " + Computation2.product);

        Thread t1 = new Thread(new Computation1(barrier));
        Thread t2 = new Thread(new Computation2(barrier));
        t1.start();
        t2.start();

        try {
            barrier.await();
        }
        catch (InterruptedException | BrokenBarrierException e)
        {
            e.printStackTrace();
        }

        // number of parties waiting at the barrier
        System.out.println("Number of parties waiting at the barrier "+
                "at this point = " + barrier.getNumberWaiting());
        // barrier breaks as the number of thread waiting for the barrier at this point = 0
        System.out.println("Product of Computation1 = " + Computation1.product);
        System.out.println("Product of Computation2 = " + Computation2.product);

        System.out.println("Final result = " + (Computation1.product + Computation2.product));

        // Resetting the newBarrier
        barrier.reset();
        System.out.println("Barrier reset successful");
    }
}
```
Output.
```raw
Number of parties required to trip the barrier = 3
Product of Computation1 = 0
Product of Computation2 = 0
Number of parties waiting at the barrier at this point = 1
Number of parties waiting at the barrier at this point = 2
Number of parties waiting at the barrier at this point = 0
Product of Computation1 = 6
Product of Computation2 = 200
Final result = 206
Barrier reset successful
```

## 3. CountDownLatch
CountDownLatch is used to make sure that a task waits for other threads before it starts.

Create a worker thread. It accepts a CountDownLatch object passed from the main thread.
```java
public class Worker extends Thread {
    private int delay;
    private CountDownLatch latch;

    public Worker(String name, int delay, CountDownLatch latch) {
        super(name);
        this.delay = delay;
        this.latch = latch;
    }

    @Override
    public void run() {
        try {
            Thread.sleep(delay);
            latch.countDown();

            System.out.println(Thread.currentThread().getName() +
                    " finished, remaining count = " + latch.getCount());
        }
        catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
```
* `countDown()` method decrements the count.

Then, create the main thread with four workers. Create an object of CountDownLatch by passing an int to its constructor (the count), which is actually the number of invited parties (threads) for an event. The main thread is dependent on other threads to start processing, waits on until every other thread has called count down.
```java
public class CountDownLatchExample {
    public static void main(String args[]) throws InterruptedException {
        // Create task that is going to wait for four threads before it starts
        CountDownLatch latch = new CountDownLatch(4);

        // Create four worker threads and start them
        Worker first = new Worker("Worker1", 1000, latch);
        Worker second = new Worker("Worker2", 2000, latch);
        Worker third = new Worker("Worker3", 3000, latch);
        Worker fourth = new Worker("Worker4", 4000, latch);
        first.start();
        second.start();
        third.start();
        fourth.start();

        // The main task waits for four threads
        latch.await();

        // Main thread has started
        System.out.println(Thread.currentThread().getName() + " has finished");
    }
}
```
* `await()` method blocks until count == 0.

Output.
```raw
Worker1 finished, remaining count = 3
Worker2 finished, remaining count = 2
Worker3 finished, remaining count = 1
Worker4 finished, remaining count = 0
main has finished
```

## 4. Semaphore
Semaphore is a class in java.util.concurrent package introduced in JDK 5. Semaphore basically maintains a set of permits, so there are two methods which are mainly used for semaphore.
* acquire
* release

`acquire()` method is used to get a permit and if no. of permits reaches max allowed permits then thread has to wait to get permit which will be released by some other thread by calling `release()` method.

Semaphores are generally used to restrict the number of threads to access resources. Real time examples:
* Semaphores can be used to restrict number of database connections at a time
* Semaphores can also be used to bound any collection.

Create a worker thread. It accepts a Semaphore object passed from the main thread.
```java
public class Worker extends Thread {
    private String name;
    private Semaphore semaphore;
    public Worker(String name, Semaphore semaphore) {
        super(name);
        this.name = name;
        this.semaphore = semaphore;
    }

    @Override
    public void run() {
        System.out.println("Starting " + name + "...");
        try {
            System.out.println(name + ": acquiring a permit, available Semaphore permits: "
                    + semaphore.availablePermits());

            // Acquiring the permit
            semaphore.acquire();

            System.out.println(name + " gets a permit.");

            for (int i=0; i < 3; i++) {
                System.out.println(name + ": is performing operation " + (i + 1)
                        + ", available Semaphore permits: "
                        + semaphore.availablePermits());
                Thread.sleep( (long) (Math.random() * 2000));
            }
        } catch (InterruptedException exc) {
            System.out.println(exc);
        }

        // Release the permit
        semaphore.release();
        System.out.println(name + " releases the permit, available Semaphore permits: "
                + semaphore.availablePermits());
    }
}
```
Then, create the main thread with four workers. Create an object of Semaphore with 2 permits.
```java
public class SemaphoreExample {
    public static void main(String args[]) throws InterruptedException
    {
        // Create a Semaphore object with number of permits 2
        Semaphore semaphore = new Semaphore(2);

        // Create 4 worker threads
        Worker worker1 = new Worker("Work1", semaphore);
        Worker worker2 = new Worker("Work2", semaphore);
        Worker worker3 = new Worker("Work3", semaphore);
        Worker worker4 = new Worker("Work4", semaphore);
        worker1.start();
        worker2.start();
        worker3.start();
        worker4.start();

        // Wait until all workers are completed
        worker1.join();
        worker2.join();
        worker3.join();
        worker4.join();

        // Check the final permits
        System.out.println("All tasks are completed. Available Semaphore permits: "
                + semaphore.availablePermits());
    }
}
```
Output.
```raw
Starting Work2...
Starting Work4...
Work4: acquiring a permit, available Semaphore permits: 2
Starting Work3...
Starting Work1...
Work3: acquiring a permit, available Semaphore permits: 1
Work4 gets a permit.
Work2: acquiring a permit, available Semaphore permits: 2
Work4: is performing operation 1, available Semaphore permits: 0
Work3 gets a permit.
Work1: acquiring a permit, available Semaphore permits: 1
Work3: is performing operation 1, available Semaphore permits: 0
Work4: is performing operation 2, available Semaphore permits: 0
Work3: is performing operation 2, available Semaphore permits: 0
Work4: is performing operation 3, available Semaphore permits: 0
Work3: is performing operation 3, available Semaphore permits: 0
Work4 releases the permit, available Semaphore permits: 1
Work2 gets a permit.
Work2: is performing operation 1, available Semaphore permits: 0
Work2: is performing operation 2, available Semaphore permits: 0
Work3 releases the permit, available Semaphore permits: 1
Work1 gets a permit.
Work1: is performing operation 1, available Semaphore permits: 0
Work2: is performing operation 3, available Semaphore permits: 0
Work2 releases the permit, available Semaphore permits: 1
Work1: is performing operation 2, available Semaphore permits: 1
Work1: is performing operation 3, available Semaphore permits: 1
Work1 releases the permit, available Semaphore permits: 2
All tasks are completed. Available Semaphore permits: 2
```

## 5. Difference between a CyclicBarrier and a CountDownLatch
* A `CountDownLatch` can be used only once in a program(until it’s count reaches 0).
* A `CyclicBarrier` can be used again and again once all the threads in a barriers is released.

## 6. Source Files
* [Source files for Java Synchronizers on GitHub](https://github.com/jojozhuang/java-programming/tree/master/java-concurrency-synchronizer)

## 7. References
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
* [Java.util.concurrent.CyclicBarrier Example](https://examples.javacodegeeks.com/core-java/util/concurrent/cyclicbarrier/java-util-concurrent-cyclicbarrier-example/)
* [Java Thread – Mutex and Semaphore example](Java Thread – Mutex and Semaphore example)
