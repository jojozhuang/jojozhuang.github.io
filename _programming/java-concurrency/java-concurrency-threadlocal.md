---
layout: tutorial
key: programming
title: "Java Concurrency - ThreadLocal"
index: 2410
subcategory: java-concurrency
date: 2017-03-02
tags: [ThreadLocal, InheritableThreadLocal, ThreadLocalRandom]
---

> Use ThreadLocal in multi-threading.

## 1. Introduction
The `ThreadLocal` class in Java enables you to create variables that can only be read and written by the **same** thread. Thus, even if two threads are executing the same code, and the code has a reference to a ThreadLocal variable, then the two threads cannot see each other's ThreadLocal variables.

### 1.1 Creating a ThreadLocal
Here is a code example that shows how to create a ThreadLocal variable:
```java
private ThreadLocal myThreadLocal = new ThreadLocal();
```
As you can see, you instantiate a new ThreadLocal object. This only needs to be done once per thread. Even if different threads execute the same code which accesses a ThreadLococal, each thread will see only its own ThreadLocal instance. Even if two different threads set different values on the same ThreadLocal object, they cannot see each other's values.

### 1.2 Accessing a ThreadLocal
Once a ThreadLocal has been created you can set the value to be stored in it like this:
```java
myThreadLocal.set("A thread local value");
```
You read the value stored in a ThreadLocal like this:
```java
String threadLocalValue = (String) myThreadLocal.get();
```
The get() method returns an Object and the set() method takes an Object as parameter.

### 1.3 Generic ThreadLocal
You can create a generic ThreadLocal so that you do not have to typecast the value returned by get(). Here is a generic ThreadLocal example:
```java
private ThreadLocal<String> myThreadLocal = new ThreadLocal<String>();
```
Now you can only store strings in the ThreadLocal instance. Additionally, you do not need to typecast the value obtained from the ThreadLocal:
```java
myThreadLocal.set("Hello ThreadLocal");

String threadLocalValue = myThreadLocal.get();
```
### 1.4 Initial ThreadLocal Value
Since values set on a ThreadLocal object only are visible to the thread who set the value, no thread can set an initial value on a ThreadLocal using set() which is visible to all threads.

Instead you can specify an initial value for a ThreadLocal object by subclassing ThreadLocal and overriding the initialValue() method. Here is how that looks:
```java
private ThreadLocal myThreadLocal = new ThreadLocal<String>() {
    @Override protected String initialValue() {
        return "This is the initial value";
    }
};
```
Now all threads will see the same initial value when calling get() before having called set() .

## 2. Full ThreadLocal Example
### 2.1 Problematic Variable Issue in Multi-threading
First, create class named NumberGenerator, which is used to return a random number when `random()` gets called.
```java
import java.util.Random;

public class NumberGenerator {
    private Random random;

    public NumberGenerator() {
        random = new Random();
    }

    public int random(int i){
        return random.nextInt(i);
    }
}
```
Create a task to generate random number and print it. Then create a single Task instance which is passed to two different threads. Both threads execute the run() method.
```java
public class IntegerExample {
    public static void main(String[] args) {
        NumberGenerator generator = new NumberGenerator();
        Task task = new Task(generator);

        Thread thread1 = new Thread(task);
        Thread thread2 = new Thread(task);

        thread1.start();
        thread2.start();
    }

    public static class Task implements Runnable {
        private Integer number = new Integer(0);
        private NumberGenerator generator;

        public Task(NumberGenerator generator) {
            this.generator = generator;
        }

        @Override
        public void run() {
            number = generator.random(100);
            System.out.println(number);
            try {
                Thread.sleep(2000);
            } catch (InterruptedException e) {
            }

            System.out.println(number);
        }
    }
}
```
Output. Notice, when the second time the number is printed for thread one, the value is incorrect. The variable `number` is messed.
```raw
52 # thread 1
91 # thread 2
91 # thread 1
91 # thread 2
```
### 2.2 Solution with ThreadLocal
The below implementation is almost same with the previous one, the only difference is that we use `ThreadLocal` to store the random number.
```java
public class ThreadLocalExample {
    public static void main(String[] args) {
        NumberGenerator generator = new NumberGenerator();
        Task task = new Task(generator);

        Thread thread1 = new Thread(task);
        Thread thread2 = new Thread(task);

        thread1.start();
        thread2.start();
    }

    public static class Task implements Runnable {
        private ThreadLocal<Integer> threadLocal = new ThreadLocal<>();
        private NumberGenerator generator;

        public Task(NumberGenerator generator) {
            this.generator = generator;
        }

        @Override
        public void run() {
            threadLocal.set(generator.random(100));
            System.out.println(Thread.currentThread() + ":"+ threadLocal.get());
            try {
                Thread.sleep(2000);
            } catch (InterruptedException e) {
            }

            System.out.println(Thread.currentThread() + ":"+ threadLocal.get());
        }
    }
}
```
Output. Notice, each thread has its own random number.
```raw
Thread[Thread-1,5,main]:96
Thread[Thread-0,5,main]:68
Thread[Thread-1,5,main]:96
Thread[Thread-0,5,main]:68
```
### 2.3 Custom ThreadLocal
Internally, ThreadLocal is implement with a `WeakMap`, which has the pairs of thread ID and variable. The below example demonstrates how it works.
```java
public class CustomThreadLocalExample {
    public static void main(String[] args) {
        Map<String, Integer> map = new WeakHashMap<>();
        NumberGenerator generator = new NumberGenerator();
        Task task = new Task(map, generator);

        Thread thread1 = new Thread(task);
        Thread thread2 = new Thread(task);

        thread1.start();
        thread2.start();
    }

    public static class Task implements Runnable {
        Map<String, Integer> map;
        private NumberGenerator generator;

        public Task(Map<String, Integer> map, NumberGenerator generator) {
            this.map = map;
            this.generator = generator;
        }

        @Override
        public void run() {
            String threadId = Thread.currentThread().toString();
            map.put(threadId, generator.random(100));
            System.out.println(threadId + ":"+ map.get(threadId));
            try {
                Thread.sleep(2000);
            } catch (InterruptedException e) {
            }

            System.out.println(threadId + ":"+ map.get(threadId));
        }
    }
}
```
Output. Notice, each thread also has its own random number.
```raw
Thread[Thread-0,5,main]:87
Thread[Thread-1,5,main]:28
Thread[Thread-1,5,main]:28
Thread[Thread-0,5,main]:87
```

## 3. InheritableThreadLocal
The `InheritableThreadLocal` class extends ThreadLocal to provide inheritance of values **from parent thread to child thread**: when a child thread is created, the child receives initial values for all inheritable thread-local variables for which the parent has values.
### 3.1 Example with ThreadLocal Only
First, create a ParentThread, which has an instance of ThreadLocal and starts a child thread.
```java
public class ParentThread extends Thread {
    public static ThreadLocal<String> tl_p = new ThreadLocal();
    public void run() {
        // setting the new value
        tl_p.set("parent data");

        // returns the ThreadLocal value associated with current thread
        System.out.println("Parent Thread Value: " + tl_p.get());

        ChildThread thread_c = new ChildThread();
        thread_c.start();
    }
}
```
Second, create a ChildThread, which tries to get value from parent's thread local variable.
```java
public class ChildThread extends Thread {
    public void run(){
        // returns the ThreadLocal value associated with current thread
        System.out.println("Child Thread Value: " + ParentThread.tl_p.get());
        /* null (thread local in parent thread is not available to child thread ) */
    }
}
```
Finally, create a main class the test this.
```java
public class InheritanceExample {
    public static void main(String[] args) {
        ParentThread thread_p = new ParentThread();
        thread_p.start();
    }
}
```
Output. The child thread is not able to get the thread local from its parent.
```raw
Parent Thread Value: parent data
Child Thread Value: null
```
### 3.2 Example with InheritableThreadLocal
This time, we create parent thread with InheritableThreadLocal and override the `childValue()` method.
```java
public class ParentThread extends Thread {
    public static InheritableThreadLocal itl_p = new InheritableThreadLocal() {
        @Override
        public Object childValue(Object parentValue) {
            return "child data";
        }
    };

    public void run() {
        // setting the new value
        itl_p.set("parent data");

        // returns the ThreadLocal value associated with current thread
        System.out.println("Parent Thread Value: " + itl_p.get());

        ChildThread thread_c = new ChildThread();
        thread_c.start();
    }
}
```
Same change with the child thread, just read value from its parent.
```java
public class ChildThread extends Thread {
    public void run(){
        // child data
        System.out.println("Child Thread Value: " + ParentThread.itl_p.get());
    }
}
```
No change in the main class.
```java
public class InheritanceExample {
    public static void main(String[] args) {
        ParentThread thread_p = new ParentThread();
        thread_p.start();
    }
}
```
Output. This time, the child thread is able to get data from parent.
```raw
Parent Thread Value: parent data
Child Thread Value: child data
```
If we don't override the `childValue()` method, we will get the following output.
```raw
Parent Thread Value: parent data
Child Thread Value: parent data
```

## 4. ThreadLocalRandom
### 4.1 Why We Need ThreadLocalRandom?
`java.util.concurrent.ThreadLocalRandom` has been introduced in JDK 7. Like java.util.Random, ThreadLocalRandom is also a random number generator. But ThreadLocalRandom is used in concurrent environment and isolated to current thread. ThreadLocalRandom provide more good performance and less overhead in in concurrent programs than the shared Random object. So, the usage of ThreadLocalRandom is particularly appropriate when multiple tasks (for example, each a ForkJoinTask) use random numbers in parallel in thread pools.

ThreadLocalRandom does not support the explicit setting of seed for more true randomness. Also, If we try to override `setSeed(long)` method, an UnsupportedOperationException will be thrown because the ThreadLocalRandom prohibits explicit setting of its seed by overriding Random’s setSeed(long) method and automatically throwing an UnsupportedOperationException if called.

### 4.2 Example
In the example there is a `ForkJoinTask` implementation and inside `exec()` method of ForkJoinTask, we obtained the random number by ThreadLocalRandom. We have run two ForkJoinTask to test the random number generation.
```java
import java.util.concurrent.ForkJoinPool;
import java.util.concurrent.ForkJoinTask;
import java.util.concurrent.ThreadLocalRandom;

public class ThreadLocalRandomExample {
    public static void main(String[] args) {
        ForkJoinPool pool = new ForkJoinPool();
        Task task1 = new Task("Task one");
        Task task2 = new Task("Task two");
        pool.invoke(task1);
        pool.invoke(task2);
    }

    public static class Task extends ForkJoinTask<String> {
        private String taskName;

        public Task(String name){
            this.taskName = name;
        }

        @Override
        protected boolean exec() {
            int i = ThreadLocalRandom.current().nextInt(1, 10);
            System.out.println("ThreadLocalRandom for " + taskName + ": " + i);
            return true;
        }

        @Override
        public String getRawResult() {
            return null;
        }

        @Override
        protected void setRawResult(String value) {
        }
    }
}
```
Run the example many time and every time you will get random numbers. Sample output is as below.
```raw
ThreadLocalRandom for Task one: 6
ThreadLocalRandom for Task two: 9
```

## 5. Source Files
* [Source files for Java ThreadLocal on GitHub](https://github.com/jojozhuang/java-programming/tree/master/java-concurrency-threadlocal)

## 6. References
* [Java ThreadLocal](http://tutorials.jenkov.com/java-concurrency/threadlocal.html)
* [How is Java's ThreadLocal implemented under the hood?](https://stackoverflow.com/questions/1202444/how-is-javas-threadlocal-implemented-under-the-hood/15653015)
* [Java.lang.InheritableThreadLocal Class with Examples](https://www.geeksforgeeks.org/java-lang-inheritablethreadlocal-class-examples/)
* [ThreadLocalRandom Java Example](https://www.concretepage.com/java/jdk7/threadlocalrandom-java-example)
