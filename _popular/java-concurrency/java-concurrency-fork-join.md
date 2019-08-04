---
layout: tutorial
key: popular
title: "Java Concurrency - Fork Join"
index: 1438
subcategory: java-concurrency
date: 2017-04-04
tags: [RecursiveTask, Fork Join]
draft: true
---

> Learn the fork-join framework

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

## 5. Source Files
* [Source files for Java Fork-Join on GitHub](https://github.com/jojozhuang/java-programming/tree/master/java-concurrency-forkjoin)

## 6. References
* [Java Concurrency - Fork-Join framework](https://www.tutorialspoint.com/java_concurrency/concurrency_fork_join)
