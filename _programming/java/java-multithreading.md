---
layout: programming
key: programming
title: "Java - Multithreading"
index: 216
category: java
image: /programming/java.png
date: 2016-02-16
postdate: 2016-02-16
tags: [Multi Threading]
---

> Create concurrent application with threadings.

## 1. How to Create a Java Thread?
Java lets you create thread in following two ways:
* By implementing the `Runnable` interface.
* By extending the `Thread`

### 1.1 Runnable Interface
```java
public interface Runnable {
    void run();
}
```
Create a class to implement the interface.
```java
public class MyClass implements Runnable {
    public void run(){
        System.out.println("MyClass running");
    }
}
```
Create thread and run it.
```java
Thread t1 = new Thread(new MyClass ());
t1.start();
```
### 1.2 Thread Class
Create a class to extend the Thread class.
```java
public class MyClass extends Thread {
    public void run(){
        System.out.println("MyClass running");
    }
}
```
Create thread and run it.
```java
MyClass t2 = new MyClass();
t2.start();
```
### 1.3 Methods in Thread
* getName - Obtain thread’s name
* getPriority - Obtain thread’s priority
* isAlive - Determine if a thread is still running
* join - Wait for a thread to terminate
* run - Entry point for the thread
* sleep - Suspend a thread for a period of time
* start - Start a thread by calling its run method

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

## 3. Thread Synchronization
The synchronization is implemented in Java with a concept called `monitors`. Only one thread can own a monitor at a given time. When a thread acquires a lock, it is said to have entered the monitor. All other threads attempting to enter the locked monitor will be suspended until the first thread exits the monitor.
### 3.1 Monitor & synchronized
Following is the general form of a synchronized block:
```java
// Only one thread can execute at a time.
// 'sync_object' is a reference to an object whose lock associates with the monitor.
// The code is said to be synchronized on the monitor object.
synchronized(sync_object)
{
   // Access shared variables and other
   // shared resources
}
```
Example1: synchronize on method.
```java
class Sender
{
    public synchronized void send(String msg)
    {
        System.out.println("Sending\t" + msg );
        try
        {
            Thread.sleep(1000);
        }
        catch (Exception e)
        {
            System.out.println("Thread interrupted.");
        }
        System.out.println("\n" + msg + "Sent");
    }
}
```
Example2: synchronize on code block(synchronize only part of a method.).
```java
class Sender
{
    public void send(String msg)
    {
        synchronized(this)
        {
            System.out.println("Sending\t" + msg );
            try
            {
                Thread.sleep(1000);
            }
            catch (Exception e)
            {
                System.out.println("Thread interrupted.");
            }
            System.out.println("\n" + msg + "Sent");
        }
    }
}
```
### 3.2 Reentrant Lock
The `ReentrantLock` class implements the `Lock` interface and provides synchronization to methods while accessing shared resources. The code which manipulates the shared resource is surrounded by calls to lock and unlock method. Reentrant Locks are provided in Java to provide synchronization with greater `flexibility`.
```java
Lock reentrantlock = new ReentrantLock();

public void some_method()
{
    reentrantlock.lock();
    try
    {
        //Do some work
    }
    catch(Exception e)
    {
        e.printStackTrace();
    }
    finally
    {
        reentrantlock.unlock();
    }
}
```
* The `unlock` statement is always called in the finally block to ensure that the lock is released even if an exception is thrown in the method body(try block).

### 3.3 The synchronized Keyword
Synchronize method.
```java
public synchronized void method()
{
    //method body
}
```
The above code is equivalent to:
```java
public void method() {
    this.intrinsicLock.lock();
    try
    {
        //method body
    }
    finally
    {
        this.intrinsicLock.unlock();
    }
}
```
### 3.4 Types of Intrinsic Lock
In Java, an `intrinsic lock` is implied by each use of the synchronized keyword. In this case, the locking is performed by Java behind the scenes. (This is distinct from the programmer using or defining an explicit lock object themselves.)
Each use of the synchronized keyword is associated with one of the two types of intrinsic lock:
* an "instance lock", attached to a single object
* a "static lock", attached to a class

If a method is declared as synchronized, then it will acquire either the instance lock or the static lock when it is invoked, according to whether it is an instance method or a static method.

The two types of lock have similar behavior, but are completely independent of each other.
* Acquiring the instance lock only blocks other threads from invoking a synchronized instance method; it does not block other threads from invoking an un-synchronized method, nor does it block them from invoking a static synchronized method.
* Similarly, acquiring the static lock only blocks other threads from invoking a static synchronized method; it does not block other threads from invoking an un-synchronized method, nor does it block them from invoking a synchronized instance method.

Outside of a method header, **synchronized(this)** acquires the instance lock.

The static lock can be acquired outside of a method header in two ways:
* synchronized(Blah.class), using the class literal
* synchronized(this.getClass()), if an object is available

### 3.5 The Monitor Concept
In the terminology of Java, a monitor has these properties:
* A monitor is a class with only private fields.
* Each object of that class has an associated lock.
* All methods are locked by that lock. In other words, if a client calls obj.method(), then the lock for obj is automatically acquired at the beginning of the method call and relinquished when the method returns. Since all fields are private, this arrangement ensures that no thread can access the fields while another thread manipulates them.
* The lock can have any number of associated conditions.

Every object in Java has an intrinsic lock and an intrinsic condition. If a method is declared with the synchronized keyword, it acts like a monitor method. The condition variable is accessed by calling 'wait/notifyAll/notify'.

## 4. Volatile, Final and Atomics
### 4.1 Volatile Fields
```java
private volatile boolean done;
public boolean isDone() { return done; }
public void setDone() { done = true; }
```
* The compiler will insert the appropriate code to ensure that a change to the done variable in one thread is visible from any other thread that reads the variable.

CAUTION: Volatile variables `do not` provide any atomicity. For example, the method is not guaranteed to flip the value of the field. There is no guarantee that the reading, flipping, and writing is uninterrupted.
```java
public void flipDone() { done = !done; } // not atomic
```

When is volatile Enough?
* If two threads are both reading and writing to a shared variable, then using the volatile keyword for that is not enough. You need to use a synchronized in that case to guarantee that the reading and writing of the variable is atomic.
* In case only one thread reads and writes the value of a volatile variable and other threads **only** read the variable, then the reading threads are guaranteed to see the **latest value** written to the volatile variable.
* As an alternative to a synchronized block you could also use one of the many atomic data types found in the java.util.concurrent package. For instance, the `AtomicLong` or `AtomicReference` or one of the others.


### 4.2 Final Variables
```java
final Map<String, Double> accounts = new HashMap<>();
```
* With final, other threads get to see the accounts variable after the constructor has finished.
* Without using final, there would be no guarantee that other threads would see the updated value of accounts—they might all see null, not the constructed HashMap.
* Of course, the operations on the map are not thread safe. If multiple threads mutate and read the map, you still need synchronization.

### 4.3 Atomics
There are a number of classes in the **java.util.concurrent.atomic** package that use efficient machine-level instructions to guarantee atomicity of other operations without using locks.
* AtomicInteger
* AtomicLong
* LongAdder
* LongAccumulator
* DoubleAdder
* DoubleAccumulator

```java
public static AtomicLong nextNumber = new AtomicLong(); // In some thread...
long id = nextNumber.incrementAndGet();
```
* The 'incrementAndGet' method atomically increments the AtomicLong and returns the post- increment value. That is, the operations of getting the value, adding 1, setting it, and producing the new value cannot be interrupted. It is guaranteed that the correct value is computed and returned, even if multiple threads access the same instance concurrently.

### 4.4 Dead Lock
Deadlock describes a situation where two or more threads are blocked forever, waiting for each other.
```java
public class TestThread {
   public static Object Lock1 = new Object();
   public static Object Lock2 = new Object();

   public static void main(String args[]) {
      ThreadDemo1 T1 = new ThreadDemo1();
      ThreadDemo2 T2 = new ThreadDemo2();
      T1.start();
      T2.start();
   }

   private static class ThreadDemo1 extends Thread {
      public void run() {
         synchronized (Lock1) {
            System.out.println("Thread 1: Holding lock 1...");

            try { Thread.sleep(10); }
            catch (InterruptedException e) {}
            System.out.println("Thread 1: Waiting for lock 2...");

            synchronized (Lock2) {
               System.out.println("Thread 1: Holding lock 1 & 2...");
            }
         }
      }
   }
   private static class ThreadDemo2 extends Thread {
      public void run() {
         synchronized (Lock2) {
            System.out.println("Thread 2: Holding lock 2...");

            try { Thread.sleep(10); }
            catch (InterruptedException e) {}
            System.out.println("Thread 2: Waiting for lock 1...");

            synchronized (Lock1) {
               System.out.println("Thread 2: Holding lock 1 & 2...");
            }
         }
      }
   }
}
```
### 4.4 ThreadLocal
The `ThreadLocal` class in Java enables you to create variables that can only be read and written by the same thread. Thus, even if two threads are executing the same code, and the code has a reference to a ThreadLocal variable, then the two threads cannot see each other's ThreadLocal variables.

```java
public class ThreadLocalExample {
    public static class MyRunnable implements Runnable {

        private ThreadLocal<Integer> threadLocal =
               new ThreadLocal<Integer>();

        @Override
        public void run() {
            threadLocal.set( (int) (Math.random() * 100D) );

            try {
                Thread.sleep(2000);
            } catch (InterruptedException e) {
            }

            System.out.println(threadLocal.get());
        }
    }

    public static void main(String[] args) {
        MyRunnable sharedRunnableInstance = new MyRunnable();

        Thread thread1 = new Thread(sharedRunnableInstance);
        Thread thread2 = new Thread(sharedRunnableInstance);

        thread1.start();
        thread2.start();

        try
        {
            thread1.join(); //wait for thread 1 to terminate
            thread2.join(); //wait for thread 2 to terminate
        }
        catch (InterruptedException e)
        {
            e.printStackTrace();
        }
    }
}
```
The two output numbers will probably be different.
```sh
68
72
```
If we define the local variable in MyRunnable class as follows, we always get two identical numbers.
```java
public static class MyRunnable implements Runnable {
    private Integer num = 0;

    @Override
    public void run() {
        Random random = new Random();
        num = random.nextInt(100);

        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
        }

        System.out.println(num);
    }
}
```

### 4.5 Blocking Queues
* LinkedBlockingQueue
* ArrayBlockingQueue
* DelayQueue
* PriorityBlockingQueue

### 4.6 Thread-Safe Collections
* ConcurrentHashMap
* ConcurrentLinkedQueue
* ConcurrentSkipListMap
* ConcurrentSkipListSet

There is no ConcurrentHashSet class. Instead, you can create concurrent set with map.

```java
// Prior to Java 8
Set<String> mySet = Collections.newSetFromMap(new ConcurrentHashMap<String, Boolean>());
// In Java 8
Set<String> myConcurrentSet = ConcurrentHashMap.<String>newKeySet();
```
### 4.6 Callables and Futures
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
```sh
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

## 6. Synchronizers
The java.util.concurrent package contains several classes that help manage a set of collaborating threads. These mechanisms have “canned functionality” for common rendezvous patterns between threads. If you have a set of collaborating threads that follow one of these behavior patterns, you should simply reuse the appropriate library class instead of trying to come up with a handcrafted collection of locks and conditions.

Class              | What It Does | Notes
-------------------|--------------|-----------------------------------------------
`CyclicBarrier`    | Allows a set of threads to wait until a predefined count of them has reached a common barrier, and then optionally executes a barrier action.  | Use when a number of threads need to complete before their results can be used. The barrier can be reused after the waiting threads have been released.
`Phaser`           | Like a cyclic barrier, but with a mutable party count.  | Introduced in Java SE 7.
`CountDownLatch`   | Allows a set of threads to wait until a count has been decremented to 0.  | Use when one or more threads need to wait until a specified number of events have occurred.
`Exchanger`        | Allows two threads to exchange objects when both are ready for the exchange.  | Use when two threads work on two instances of the same data structure, with the first thread filling one instance and the second thread emptying the other.
`Semaphore`        | Allows a set of threads to wait until permits are available for proceeding.  | Use to restrict the total number of threads that can access a resource. If the permit count is one, use to block threads until another thread gives permission.
`SynchronousQueue` | Allows a thread to hand off an object to another thread. | Use to send an object from one thread to another when both are ready, without explicit synchronization.

### 6.1 CyclicBarrier
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
```sh
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

### 6.2 CountDownLatch
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

### 6.3 Semaphore
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
```sh
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

## 9. References
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
