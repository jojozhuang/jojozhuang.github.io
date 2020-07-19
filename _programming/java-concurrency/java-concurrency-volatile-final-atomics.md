---
layout: tutorial
key: programming
title: "Java Concurrency - Volatile, Final and Atomics"
index: 2415
subcategory: java-concurrency
date: 2017-04-04
tags: [Volatile, Final, Atomics]
draft: true
---

> Volatile, Final and Atomics.

## 1. Volatile Fields
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


## 2. Final Variables
```java
final Map<String, Double> accounts = new HashMap<>();
```
* With final, other threads get to see the accounts variable after the constructor has finished.
* Without using final, there would be no guarantee that other threads would see the updated value of accounts—they might all see null, not the constructed HashMap.
* Of course, the operations on the map are not thread safe. If multiple threads mutate and read the map, you still need synchronization.

## 3. Atomics
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


## 5. ThreadLocal
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
```raw
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


## 5. Source Files
* [Source files for Java Synchronization on GitHub](https://github.com/jojozhuang/java-programming/tree/master/java-concurrency-synchronization)

## 6. References
* [Synchronization in Java](https://www.javatpoint.com/synchronization-in-java)
* [Race Conditions and Critical Sections](http://tutorials.jenkov.com/java-concurrency/race-conditions-and-critical-sections.html)
