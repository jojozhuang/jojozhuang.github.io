---
layout: tutorial
key: programming
title: "Java Concurrency - wait, notify and notifyAll"
index: 2403
subcategory: java-concurrency
date: 2017-04-04
tags: [wait, notify, notifyAll]
---

> Use wait, notify and notifyAll.

## 1. wait, notify and notifyAll
The Object class in java contains three final methods that allows threads to communicate about the lock status of a resource. These methods are wait(), notify() and notifyAll().
* `wait` - Wait indefinitely or for specific amount of time for any other thread to call notify or notifyAll method on the object to wake up the current thread.
* `notify` - Wake up `only one` thread waiting on the object and that thread starts execution. So if there are multiple threads waiting for an object, this method will wake up only one of them. The choice of the thread to wake depends on the OS implementation of thread management.
* `notifyAll` - Wake up all the threads waiting on the object, although which one will process first depends on the OS implementation.

These methods can be used to implement producer consumer problem where consumer threads are waiting for the objects in Queue and producer threads put object in queue and notify the waiting threads.

## 2. Example
Message bean class.
```java
public class Message {
    private String msg;

    public Message(String msg){
        this.msg = msg;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }
}
```
Producer.
```java
public class Producer implements Runnable {

    private Message msg;

    public Producer(Message msg) {
        this.msg = msg;
    }

    @Override
    public void run() {
        String name = Thread.currentThread().getName();
        System.out.println(name + ": started");
        try {
            Thread.sleep(1000);
            synchronized (msg) {
                msg.setMsg("hello world!");
                System.out.println(name+": message is updated at: " + LocalDateTime.now().toString());

                msg.notify();
                //msg.notifyAll();
            }
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
```
Consumer.
```java
public class Consumer implements Runnable{

    private Message msg;

    public Consumer(Message msg){
        this.msg = msg;
    }

    @Override
    public void run() {
        String name = Thread.currentThread().getName();
        synchronized (msg) {
            try{
                System.out.println(name+": waiting to get notified at: " + LocalDateTime.now().toString());
                msg.wait();
            }
            catch(InterruptedException e){
                e.printStackTrace();
            }
            System.out.println(name+": got notified at: " + LocalDateTime.now().toString());
            //process the message now
            System.out.println(name+": message[" + msg.getMsg() + "] is processed.");
        }
    }
}
```
Test class.
```java
public class NotifyExample {
    public static void main(String[] args) throws Exception {
        Message msg = new Message("process it");

        Consumer consumer1 = new Consumer(msg);
        new Thread(consumer1,"Consumer1").start();

        Consumer consumer2 = new Consumer(msg);
        new Thread(consumer2,"Consumer2").start();

        Producer producer = new Producer(msg);
        new Thread(producer, "Producer").start();

        Thread.sleep(1000);
        System.out.println("main: All the threads are started");
    }
}
```
Output.
```raw
Producer: started
Consumer1: waiting to get notified at: 2019-08-04T16:06:33.348
Consumer2: waiting to get notified at: 2019-08-04T16:06:33.397
main: All the threads are started
Producer: message is updated at: 2019-08-04T16:06:34.331
Consumer1: got notified at: 2019-08-04T16:06:34.331
Consumer1: message[hello world!] is processed.
```
If we comment the notify() call and uncomment the `notifyAll()` call in Producer class, both two consumer threads will be notified.
```raw
Producer: started
Consumer1: waiting to get notified at: 2019-08-04T16:07:08.594
Consumer2: waiting to get notified at: 2019-08-04T16:07:08.645
main: All the threads are started
Producer: message is updated at: 2019-08-04T16:07:09.566
Consumer2: got notified at: 2019-08-04T16:07:09.566
Consumer2: message[hello world!] is processed.
Consumer1: got notified at: 2019-08-04T16:07:09.566
Consumer1: message[hello world!] is processed.
```

## 3. Source Files
* [Source files for Java Wait and Notify on GitHub](https://github.com/jojozhuang/java-programming/tree/master/java-concurrency-notify)

## 4. References
* [Java Thread wait, notify and notifyAll Example](https://www.journaldev.com/1037/java-thread-wait-notify-and-notifyall-example)
