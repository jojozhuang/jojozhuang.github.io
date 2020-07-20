---
layout: tutorial
key: programming
title: "Java Advanced - JVM Parameters"
index: 2455
subcategory: java-advanced
date: 2017-03-02
tags: [JVM Parameters]
---

> Most well-known options for JVM configuration.

## 1. Memory
### 1.1 Explicit Heap Memory – Xms and Xmx Options
Syntax.
```raw
-Xms<heap size>[unit]
-Xmx<heap size>[unit]
```
* `unit` can be marked as `g` for GB, `m` for MB and `k` for KB.

Example: Assign minimum 2 GB and maximum 5 GB to JVM.
```raw
-Xms2G -Xmx5G
```
### 1.2 Handling Out of Memory
Dump heap memory into a physical file for analyzing the memory leak.
```raw
-XX:+HeapDumpOnOutOfMemoryError
-XX:HeapDumpPath=./java_pid<pid>.hprof
-XX:OnOutOfMemoryError="< cmd args >;< cmd args >"
-XX:+UseGCOverheadLimit
```
* `HeapDumpOnOutOfMemoryError` instructs the JVM to dump heap into physical file in case of OutOfMemoryError
* `HeapDumpPath` denotes the path where the file is to be written; any filename can be given; however, if JVM finds a <pid> tag in the name, the process id of the current process causing the out of memory error will be appended to the file name with .hprof format
* `OnOutOfMemoryError` is used to issue emergency commands to be executed in case of out of memory error; proper command should be used in the space of cmd args. For example, if we want to restart the server as soon as out of memory occur, we can set the parameter:
```raw
-XX:OnOutOfMemoryError="shutdown -r"
```
* `UseGCOverheadLimit` is a policy that limits the proportion of the VM’s time that is spent in GC before an OutOfMemory error is thrown.

## 2. Garbage Collection
### 2.1 Garbage Collection Algorithm
Choosing a right Garbage Collection algorithm is critical for better stability of the application. JVM has four types of GC implementations:
* Serial Garbage Collector
* Parallel Garbage Collector
* CMS Garbage Collector
* G1 Garbage Collector

These implementations can be declared with the below parameters:
```raw
-XX:+UseSerialGC
-XX:+UseParallelGC
-XX:+USeParNewGC
-XX:+UseG1GC
```
### 2.2 GC Logging
Monitor the JVM’s Garbage Collection performance by logging the GC activity.
```raw
-XX:+UseGCLogFileRotation
-XX:NumberOfGCLogFiles=< number of log files >
-XX:GCLogFileSize=< file size >[ unit ]
-Xloggc:/path/to/gc.log
```
* `UseGCLogFileRotation` specifies the log file rolling policy, much like log4j, s4lj, etc.
* `NumberOfGCLogFiles` denotes the max number of log files that can be written for a single application life cycle.
* `GCLogFileSize` specifies the max size of the file.
* `loggc` denotes its location.

Example: Assign a maximum of 100 GC log files, each having a maximum size of 50 MB and want to store them in ‘/home/user/log/’ location.
```raw
-XX:+UseGCLogFileRotation  
-XX:NumberOfGCLogFiles=10
-XX:GCLogFileSize=50M
-Xloggc:/home/user/log/gc.log
```

## 3. Misc
* `-server`: enables “Server Hotspot VM”; this parameter is used by default in 64 bit JVM
* `-XX:+UseStringDeduplication`: Java 8u20 has introduced this JVM parameter for reducing the unnecessary use of memory by creating too many instances of the same String; this optimizes the heap memory by reducing duplicate String values to a single global char[] array
* `-XX:+UseLWPSynchronization`: sets LWP (Light Weight Process) – based synchronization policy instead of thread-based synchronization
* `-XX:LargePageSizeInBytes`: sets the large page size used for the Java heap; it takes the argument in GB/MB/KB; with larger page sizes we can make better use of virtual memory hardware resources; however, this may cause larger space sizes for the PermGen, which in turn can force to reduce the size of Java heap space
* `-XX:MaxHeapFreeRatio`: sets the maximum percentage of heap free after GC to avoid shrinking.
* `-XX:MinHeapFreeRatio`: sets the minimum percentage of heap free after GC to avoid expansion; to monitor the heap usage you can use VisualVM shipped with JDK.
* `-XX:SurvivorRatio`: Ratio of eden/survivor space size – for example, -XX:SurvivorRatio=6 sets the ratio between each survivor space and eden space to be 1:6,
* `-XX:+UseLargePages`: use large page memory if it is supported by the system; please note that OpenJDK 7 tends to crash if using this JVM parameter
* `-XX:+UseStringCache`: enables caching of commonly allocated strings available in the String pool
* `-XX:+UseCompressedStrings`: use a byte[] type for String objects which can be represented in pure ASCII format
* `-XX:+OptimizeStringConcat`: it optimizes String concatenation operations where possible

## 4. References
* [Guide to the Most Important JVM Parameters](https://www.baeldung.com/jvm-parameters)
* [JVM Garbage Collectors](https://www.baeldung.com/jvm-garbage-collectors)
* [Try to Avoid -XX:+UseGCLogFileRotation](https://dzone.com/articles/try-to-avoid-xxusegclogfilerotation)
