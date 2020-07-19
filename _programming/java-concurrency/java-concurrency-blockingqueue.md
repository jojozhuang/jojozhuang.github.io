---
layout: tutorial
key: programming
title: "Java Concurrency - BlockingQueue"
index: 2416
subcategory: java-concurrency
date: 2017-02-02
tags: [BlockingQueue, ArrayBlockingQueue]
---

> BlockingQueue interface and its implementations.

## 1. BlockingQueue Interface
BlockingQueue Interface(java.util.concurrent.BlockingQueue) is a Queue that additionally supports operations that wait for the queue to become non-empty when retrieving an element, and wait for space to become available in the queue when storing an element.

### 1.1 Operations on BlockingQueue
BlockingQueue methods come in four forms, with different ways of handling operations that cannot be satisfied immediately, but may be satisfied at some point in the future: one throws an exception, the second returns a special value (either null or false, depending on the operation), the third blocks the current thread indefinitely until the operation can succeed, and the fourth blocks for only a given maximum time limit before giving up. These methods are summarized in the following table:

Operation | Throws exception | Special value | Blocks        | Times out
----------|------------------|---------------|---------------|----------------------
Insert    | add(e)           | offer(e)      | put(e)        | offer(e, time, unit)
Remove    | remove()         | poll()        | take()        | poll(time, unit)
Examine   | element()        | peek()        | not applicable| not applicable

* BlockingQueue does not accept null elements. Implementations throw NullPointerException on attempts to add, put or offer a null.

### 1.2 BlockingQueue Types
* `Unbounded Queue`: The Capacity of blocking queue will be set to Integer.MAX_VALUE. Unbounded queue will never block because it could grow to a very large size. When you add elements, it’s size grows.
```java
BlockingQueue blockingQueue = new LinkedBlockingDeque();
```
* `Bounded Queue`: The capacity of bounded queue is fixed. You can create a bounded queue by passing the capacity of queue in constructor.
```java
// Creates a Blocking Queue with capacity 5
BlockingQueue blockingQueue = new LinkedBlockingDeque(5);
```

### 1.3 Classes implements BlockingQueue Interface
* ArrayBlockingQueue
* LinkedBlockingQueue
* PriorityBlockingQueue
* SynchronousQueue
* LinkedBlockingDeque

### 1.4 ArrayBlockingQueue vs. LinkedBlockingQueue
* ArrayBlockingQueue is always bounded.
* LinkedBlockingQueue can be unbounded.
* ArrayBlockingQueue can be created with a configurable (on/off) scheduling fairness policy. This is great if you need fairness or want to avoid producer/consumer starvation, but it will cost you in throughput.
* ArrayBlockingQueue pre-allocates its backing array, so it doesn't allocate nodes during its usage, but it immediately takes what can be a considerable chunk of memory, which can be a problem if your memory is fragmented.
* ArrayBlockingQueue should have less variability in performance, because it has less moving parts overall, it uses a simpler and less-sophisticated single-lock algorithm, it does not create nodes during usage, and its cache behavior should be fairly consistent.
* LinkedBlockingQueue should have `better throughput`, because it uses separate locks for the head and the tail.
* LinkedBlockingQueue does not pre-allocate nodes, which means that its memory footprint will roughly match its size, but it also means that it will incur some work for allocation and freeing of nodes.
* LinkedBlockingQueue will probably have `worse cache behavior`, which may affect its own performance, but also the performance of other components due to false sharing.


## 2. BlockingQueue Example
### 2.1 Message
The object will be created by producer and consumed by consumer.
```java
public class Message {
    private String msg;

    public Message(String msg){
        this.msg = msg;
    }

    public String getMessage() {
        return msg;
    }
}
```
### 2.2 Producer
Producer creates messages and put them into the queue.
```java
import java.util.concurrent.BlockingQueue;

public class Producer implements Runnable {

    private BlockingQueue<Message> bq;

    public Producer(BlockingQueue<Message> bq){
        this.bq = bq;
    }

    @Override
    public void run() {
        //produce messages
        for (int i = 0; i < 20; i++){
            Message msg = new Message("Message-" + i);
            try {
                Thread.sleep(i);
                bq.put(msg);
                System.out.println("Produced " + msg.getMessage());
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        //adding exit message
        Message msg = new Message("exit");
        try {
            bq.put(msg);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
```
### 2.3 Consumer
Consumer will process on the messages from the queue and terminates when exit message is received.
```java
import java.util.concurrent.BlockingQueue;

public class Consumer implements Runnable{

    private BlockingQueue<Message> bq;

    public Consumer(BlockingQueue<Message> bq){
        this.bq = bq;
    }

    @Override
    public void run() {
        try {
            Message msg;
            //consuming messages until exit message is received
            while ((!(msg = bq.take()).getMessage().equals("exit"))) {
                Thread.sleep(100);
                System.out.println("Consumed " + msg.getMessage());
            }
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
```
### 2.4 Test Class
This test class will create the BlockingQueue with fixed size and share with both producers and consumers. It will start producer and consumer threads and exit.
```java
public class BlockingQueueExample {
    public static void main(String[] args) {

        //Creating BlockingQueue of size 10
        BlockingQueue<Message> queue = new ArrayBlockingQueue<>(5);

        Producer producer = new Producer(queue);
        Consumer consumer = new Consumer(queue);

        //starting producer to produce messages in queue
        new Thread(producer).start();

        //starting consumer to consume messages from queue
        new Thread(consumer).start();

        System.out.println("Producer and Consumer has been started");
    }
}
```
Output.
```raw
Producer and Consumer has been started
Produced Message-0
Produced Message-1
Produced Message-2
Produced Message-3
Produced Message-4
Produced Message-5
Consumed Message-0
Produced Message-6
Consumed Message-1
Produced Message-7
Consumed Message-2
Produced Message-8
Consumed Message-3
Produced Message-9
Consumed Message-4
Produced Message-10
Consumed Message-5
Produced Message-11
Consumed Message-6
Produced Message-12
Consumed Message-7
Produced Message-13
Consumed Message-8
Produced Message-14
Consumed Message-9
Produced Message-15
Consumed Message-10
Produced Message-16
Consumed Message-11
Produced Message-17
Consumed Message-12
Produced Message-18
Consumed Message-13
Produced Message-19
Consumed Message-14
Consumed Message-15
Consumed Message-16
Consumed Message-17
Consumed Message-18
Consumed Message-19

Process finished with exit code 0
```

## 3. Source Files
* [Source files for Java BlockingQueue on GitHub](https://github.com/jojozhuang/java-programming/tree/master/java-concurrency-blockingqueue)

## 4. References
* [Java Doc - Interface BlockingQueue](https://docs.oracle.com/javase/8/docs/api/?java/util/concurrent/BlockingQueue.html)
* [Java BlockingQueue Example](https://www.journaldev.com/1034/java-blockingqueue-example)
* [BlockingQueue Interface in Java](https://www.geeksforgeeks.org/blockingqueue-interface-in-java/)
* [Java BlockingQueue examples](https://www.mkyong.com/java/java-blockingqueue-examples/)
* [When to prefer LinkedBlockingQueue over ArrayBlockingQueue?](https://stackoverflow.com/questions/35967792/when-to-prefer-linkedblockingqueue-over-arrayblockingqueue)
