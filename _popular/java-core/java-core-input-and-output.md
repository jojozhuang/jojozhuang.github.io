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

<div class="mermaid">
graph LR;
    Source-->Program
    Program-->Destination
</div>

**Streams**  
`IO Streams` are a core concept in Java IO. A stream is a conceptually endless flow of data. You can either read from a stream or write to a stream. A stream is connected to a data source or a data destination. Streams in Java IO can be either byte based (reading and writing bytes) or character based (reading and writing characters).

**The InputStream, OutputStream, Reader and Writer**  
A program that needs to read data from some source needs an `InputStream `or a `Reader`. A program that needs to write data to some destination needs an `OutputStream` or a `Writer`. This is also illustrated in the diagram below:
<div class="mermaid">
graph LR;
    Source-->InputStream/Reader
    InputStream/Reader-->Program
    Program-->OutputStream/Writer
    OutputStream/Writer-->Destination
</div>
* An InputStream or Reader is linked to a source of data. An OutputStream or Writer is linked to a destination of data.

### 1.2 Java IO Purposes and Features
Java IO contains many subclasses of the InputStream, OutputStream, Reader and Writer classes. The reason is, that all of these subclasses are addressing various different purposes. That is why there are so many different classes. The purposes addressed are summarized below:
* File Access
* Network Access
* Internal Memory Buffer Access
* Inter-Thread Communication (Pipes)
* Buffering
* Filtering
* Parsing
* Reading and Writing Text (Readers / Writers)
* Reading and Writing Primitive Data (long, int etc.)
* Reading and Writing Objects

These purposes are nice to know about when reading through the Java IO classes. They make it somewhat easier to understand what the classes are targeting.

### 1.3 Java IO Class Overview

| |Byte Based||Character Based||
|Type |Input|Output|Input|Output|
|---|---|---|---|---|
|Basic|InputStream|OutputStream|Reader<br/>InputStreamReader|Writer<br/>OutputStreamWriter
|Arrays|ByteArrayInputStream|ByteArrayOutputStream|CharArrayReader|CharArrayWriter|
|Files|FileInputStream<br/>RandomAccessFile|FileOutputStream<br/>RandomAccessFile|FileReader|FileWriter|
|Pipes|PipedInputStream|PipedOutputStream|PipedReader|PipedWriter|
|Buffering|BufferedInputStream|BufferedOutputStream|BufferedReader|BufferedWriter|
|Filtering|FilterInputStream|FilterOutputStream|FilterReader|FilterWriter|
|Parsing|PushbackInputStream<br/>StreamTokenizer| |PushbackReader<br/>LineNumberReader| |
|Strings| | |StringReader|StringWriter|
|Data|DataInputStream|DataOutputStream| | |
|Data Formatted| |PrintStream| |PrintWriter|
|Objects|ObjectInputStream|ObjectOutputStream| | |
|Utilities|SequenceInputStream| | | |

## 3. Source Files


## 4. References
* [Java IO Tutorial](http://tutorials.jenkov.com/java-io/index.html)
