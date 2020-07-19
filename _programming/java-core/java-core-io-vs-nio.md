---
layout: tutorial
key: programming
title: "Java Core - IO vs NIO"
index: 2328
subcategory: java-core
date: 2019-01-11
tags: [IO, NIO]
mermaid: true
---

> Difference between IO and NIO.

## 1. Differences between Java Standard IO and Java NIO
The table below summarizes the main differences between Java NIO and IO.

|  IO  | NIO   |
| ------------ | ------------ |
| Stream oriented  | Buffer oriented  |
| Blocking IO  | Non blocking IO <br/>Selectors  |

## 2. IO Streams vs NIO Blocks
The most important distinction between the standard I/O library (found in java.io package) and NIO has to do with how data is packaged and transmitted. Standard I/O deals with data in streams, whereas NIO deals with data in blocks.

A `stream-oriented I/O` system deals with data one or more bytes at a time. An input stream produces one byte of data, and an output stream consumes one byte of data. It is very easy to create filters for streamed data. It is also relatively simply to chain several filters together so that each one does its part in what amounts to a single, sophisticated processing mechanism. Important thing is that bytes are not cached anywhere. Furthermore, you **cannot** move forth and back in the data in a stream. If you need to move forth and back in the data read from a stream, you must cache it in a buffer first.

A `block-oriented I/O` system deals with data in blocks. Each operation produces or consumes a block of data in one step. Processing data by the block can be much faster than processing it by the (streamed) byte. You **can** move forth and back in the buffer as you need to. This gives you a bit more flexibility during processing. However, you also need to check if the buffer contains all the data you need in order to fully process it. And, you need to make sure that when reading more data into the buffer, you do not overwrite data in the buffer you have not yet processed. But block-oriented I/O lacks some of the elegance and simplicity of stream-oriented I/O.

## 3. Synchronous vs. Asynchronous IO
Java IO’s various streams are blocking or synchronous. That means, that when a thread invokes a read() or write(), that thread is blocked until there is some data to read, or the data is fully written. The thread will be in blocked state for this period. This has been cited as a good solid reason for bringing multi-threading in modern languages.

In asynchronous IO, a thread can request that some data be written to a channel, but not wait for it to be fully written. The thread can then go on and do something else in the mean time. Usually these threads spend their idle time on when not blocked in IO calls, is usually performing IO on other channels in the meantime. That is, a single thread can now manage multiple channels of input and output.

Synchronous programs often have to resort to polling, or to the creation of many, many threads, to deal with lots of connections. With asynchronous I/O, you can listen for I/O events on an arbitrary number of channels, without polling and without extra threads.

The central object in asynchronous I/O is called the `Selector`. A Selector is where you register your interest in various I/O events, and it is the object that tells you when those events occur.

## 4. Java NIO Selector
The Java NIO `Selector` is a component which can examine one or more Java NIO Channel instances, and determine which channels are ready for e.g. reading or writing. This way a single thread can manage multiple channels, and thus multiple network connections.
```java
public static void main(String[] args) throws IOException {
    Selector selector = Selector.open();
    ServerSocketChannel serverSocket = ServerSocketChannel.open();
    serverSocket.bind(new InetSocketAddress("localhost", 5454));
    serverSocket.configureBlocking(false);
    serverSocket.register(selector, SelectionKey.OP_ACCEPT);
    ByteBuffer buffer = ByteBuffer.allocate(256);

    while (true) {
        int readyChannels = selector.selectNow();
        if(readyChannels == 0) {
            continue;
        }
        Set<SelectionKey> selectedKeys = selector.selectedKeys();
        Iterator<SelectionKey> iter = selectedKeys.iterator();
        while (iter.hasNext()) {
            SelectionKey key = iter.next();

            if(key.isAcceptable()) {
                // a connection was accepted by a ServerSocketChannel.
                register(selector, serverSocket);
            } else if (key.isConnectable()) {
                // a connection was established with a remote server.
            } else if (key.isReadable()) {
                // a channel is ready for reading
                answerWithEcho(buffer, key);
            } else if (key.isWritable()) {
                // a channel is ready for writing
            }
            iter.remove();
        }
    }
}
```
## 5. IO vs NIO APIs
Using NIO look different than when using IO. Here in NIO, rather than just read the data byte for byte from e.g. an InputStream, the data must first be read into a buffer, and then be processed from thereafter.

Sample code using standard IO.
```java
public static void main(String[] args) {
    BufferedReader br = null;
    String line = null;
    try {
        br = new BufferedReader(new FileReader("test.txt"));
        System.out.println("Reading file with BufferedReader...");
        while ((line = br.readLine()) != null) {
            System.out.println(line);
        }
        br.close();
    }
    catch (IOException ioe) {
        System.out.println(ioe);
    }
}
```
Sample code using NIO.
```java
public static void main(String[] args) {
    try {
        int capacity = 1024; // chunk size
        RandomAccessFile raf = new RandomAccessFile("test.txt", "r");
        FileChannel channel = raf.getChannel();
        ByteBuffer buffer = ByteBuffer.allocate(capacity);
        System.out.println("Reading file with Buffer of Fixed Size...");
        //int chunk = 1;
        while (channel.read(buffer) > 0) {
            //System.out.println("Chunk:" + chunk++);
            buffer.flip();
            for (int i = 0; i < buffer.limit(); i++) {
                System.out.print((char) buffer.get());
            }
            buffer.clear(); // do something with the data and clear/compact it.
        }
        channel.close();
        raf.close();
    }
    catch (IOException ioe) {
        System.out.println(ioe);
    }
}
```

## 6. Source Files
* [Source files for Java NIO on GitHub](https://github.com/jojozhuang/java-programming/tree/master/java-core-nio)

## 7. References
* [Java NIO vs. IO](http://tutorials.jenkov.com/java-nio/nio-vs-io.html)
* [Java Standard IO vs. Java NIO](https://howtodoinjava.com/java/io/difference-between-standard-io-and-nio/)
