---
layout: tutorial
key: popular
title: "Java Core - Input and Output - Draft"
index: 1406
subcategory: java-core
date: 2017-01-11
tags: [File]
mermaid: true
---

> Read and write file in java.

## 1. IO
Java IO is an API that comes with Java which is targeted at reading and writing data (input and output). Most applications need to process some input and produce some output based on that input. For instance, read data from a file or over network, and write to a file or write a response back over the network. The Java IO API is located in the Java IO package `java.io`.
### 1.1 Input and Output - Source and Destination
Java's IO package mostly concerns itself with the reading of raw data from a source and writing of raw data to a destination. The most typical sources and destinations of data are these:

Files
Pipes
Network Connections
In-memory Buffers (e.g. arrays)
System.in, System.out, System.error
The diagram below illustrates the principle of a program reading data from a source and writing it to some destination:

```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```

Source
Program
Destination

## 1.1 Streams
`IO Streams` are a core concept in Java IO. A stream is a conceptually endless flow of data. You can either read from a stream or write to a stream. A stream is connected to a data source or a data destination. Streams in Java IO can be either byte based (reading and writing bytes) or character based (reading and writing characters).

## 3. Source Files


## 4. References
* [Java IO Tutorial](http://tutorials.jenkov.com/java-io/index.html)
