---
layout: tutorial
key: programming
title: "Java - Thread Dumps & Analysis"
index: 2503
subcategory: java-app
date: 2017-06-04
tags: [Thread Dumps]
---

> Thread Dumps, performance analysis.

## 1. Thread Dumps
A thread dump is a snapshot of the state of all threads that are part of the process. The state of each thread is presented with a so called stack trace, which shows the contents of a thread's stack.

## 2. Capturing Thread Dumps
`jps` is useful tools for viewing information about running java processes.
```raw
$ jps -l
13856 johnny.algorithm.advanced.CyclicBarrierTest
13218 johnny.algorithm.advanced.CyclicBarrierTest
12467
99753
14600 sun.tools.jps.Jps
```
`jstack` is an effective command line tool to capture thread dumps.
```raw
jstack -l  13218
```
Java VisualVM is a graphical user interface tool that provides detailed information about the applications while they are running on a specified Java Virtual Machine (JVM).
```raw
jvisualvm
```
Java Mission Control (JMC) is a tool that collects and analyze data from Java applications running locally or deployed in production environments.
```raw
jmc
```

## 3. Analyze Thread Dumps
### 3.1 Thread Information from the Thread Dump File
* `Thread name`: When using Java.lang.Thread class to generate a thread, the thread will be named Thread-(Number), whereas when using java.util.concurrent.ThreadFactory class, it will be named pool-(number)-thread-(number).
* `Priority`: Represents the priority of the threads.
* `Thread ID`: Represents the unique ID for the threads. (Some useful information, including the CPU usage or memory usage of the thread, can be obtained by using thread ID.)
* `Thread status`: Represents the status of the threads.
* `Thread callstack`: Represents the call stack information of the threads.

```raw
"pool-1-thread-13" prio=6 tid=0x000000000729a000 nid=0x2fb4 runnable [0x0000000007f0f000] java.lang.Thread.State: RUNNABLE
```
### 3.2 Deadlock

### 3.3 Performance

## 4. References
* [8 Options for Capturing Thread Dumps](https://dzone.com/articles/how-to-take-thread-dumps-7-options)
* [How to Analyze Java Thread Dumps](https://dzone.com/articles/how-analyze-java-thread-dumps)
