---
layout: tutorial
key: popular
title: "Java Advanced - ThreadLocal"
index: 1478
subcategory: java-advanced
date: 2017-03-02
tags: [ThreadLocal]
---

> Most well-known options for JVM configuration.

## 1. Introduction
The ThreadLocal class in Java enables you to create variables that can only be read and written by the same thread. Thus, even if two threads are executing the same code, and the code has a reference to a ThreadLocal variable, then the two threads cannot see each other's ThreadLocal variables.

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

### 1.5 Full ThreadLocal Example
Here is a fully runnable Java ThreadLocal example:
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

        thread1.join(); //wait for thread 1 to terminate
        thread2.join(); //wait for thread 2 to terminate
    }

}
```
This example creates a single MyRunnable instance which is passed to two different threads. Both threads execute the run() method, and thus sets different values on the ThreadLocal instance. If the access to the set() call had been synchronized, and it had not been a ThreadLocal object, the second thread would have overridden the value set by the first thread.

However, since it is a ThreadLocal object then the two threads cannot see each other's values. Thus, they set and get different values.

## 2. InheritableThreadLocal
The InheritableThreadLocal class is a subclass of ThreadLocal. Instead of each thread having its own value inside a ThreadLocal, the InheritableThreadLocal grants access to values to a thread and all child threads created by that thread.

## 3. References
* [Java ThreadLocal](http://tutorials.jenkov.com/java-concurrency/threadlocal.html)
