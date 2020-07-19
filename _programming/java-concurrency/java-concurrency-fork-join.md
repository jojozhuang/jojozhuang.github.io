---
layout: tutorial
key: programming
title: "Java Concurrency - Fork Join"
index: 2406
subcategory: java-concurrency
date: 2017-04-04
tags: [RecursiveTask, Fork Join]
---

> Learn the fork-join framework

## 1. Fork-join Framework
The `fork-join` framework allows to break a certain task on several workers and then wait for the result to combine them. It leverages multi-processor machine's capacity to great extent.
* `Fork` - A process in which a task splits itself into smaller and independent sub-tasks which can be executed concurrently.
* `Join` - A process in which a task join all the results of sub-tasks once the subtasks have finished executing, otherwise it keeps waiting.

Classes:
* `ForkJoinPool` - A special thread pool designed to work with fork-and-join task splitting.
* `RecursiveTask<V>` - RecursiveTask represents a task which returns a value.
* `RecursiveAction` - Just like RecursiveTask except it does not return a result
* `ForkJoinTask<V>` - Superclass of RecursiveTask<V> and RecursiveAction. fork() and join() are methods defined in this class.

## 2. Example
Create an array with random numbers, then count how many numbers are larger than 0.5.

### 2.1 Counter
```java
import java.util.concurrent.RecursiveTask;
import java.util.function.Predicate;

public class Counter extends RecursiveTask<Integer> {
    static final int THRESHOLD = 100;
    private double[] numbers;
    private int from;
    private int to;
    private Predicate<Double> filter;

    public Counter(double[] numbers, int from, int to, Predicate<Double> filter) {
        this.numbers = numbers;
        this.from = from;
        this.to = to;
        this.filter = filter;
    }

    @Override
    protected Integer compute() {
        if (to - from < THRESHOLD) { // no need to split, calculate the result
            int count = 0;
            for (int i = from; i < to; i++) {
                if (filter.test(numbers[i])) {
                    count++;
                }
            }
            return count;
        } else { // split to smaller tasks
            int mid = (to - from ) / 2 + from;
            Counter first = new Counter(numbers, from, mid, filter);
            Counter second = new Counter(numbers, mid, to, filter);
            invokeAll(first, second); //
            return first.join() + second.join();
        }
    }
}
```
* Override the `compute()` method to generate and invoke subtasks, and to combine their results.
* `THRESHOLD` is used to determine whether to execute the calculation or continue splitting.
* The `invokeAll` method receives a number of tasks and blocks until all of them have completed.
* The `join` method yields the result.

```java
public class ForkJoinExample {
    static final int size = 10000;
    public static void main(String[] args) {
        double[] numbers = new double[size];
        // generate random numbers
        for (int i = 0; i < size; i++) {
            numbers[i] = Math.random();
        }
        Counter counter = new Counter(numbers, 0, numbers.length, x->x > 0.5);
        ForkJoinPool pool = new ForkJoinPool();
        pool.invoke(counter); // Performs the given task, returning its result upon completion.
        System.out.println(counter.join()); // output: 500305
    }
}
```
Output.
```raw
5036
```

## 3. Source Files
* [Source files for Java Fork-Join on GitHub](https://github.com/jojozhuang/java-programming/tree/master/java-concurrency-forkjoin)

## 4. References
* [Java Concurrency - Fork-Join framework](https://www.tutorialspoint.com/java_concurrency/concurrency_fork_join)
