---
layout: tutorial
key: popular
title: "Java Core - NIO"
index: 1406
subcategory: java-core
date: 2017-01-11
tags: [NIO, Channel]
mermaid: true
---

> Read and write file in java.

## 1. NIO Overview
The new input/output (`NIO`) library was introduced with JDK 1.4. Java NIO offers a different way of working with IO than the standard IO API's.

Java NIO consist of the following core components:
* Channels
* Buffers
* Selectors

The rest of the components, like `Pipe` and `FileLock` are merely utility classes to be used in conjunction with the three core components.

### 1.1 Channels and Buffers
In the standard IO API you work with `byte streams` and `character streams`.
<div class="mermaid">
graph LR;
    Source-->InputStream/Reader
    InputStream/Reader-->Program
    Program-->OutputStream/Writer
    OutputStream/Writer-->Destination
</div>
In NIO you work with `channels` and `buffers`. Data is always read from a channel into a buffer, or written from a buffer to a channel.
<div class="mermaid">
graph LR;
    Source-->Channel/Buffer
    Channel/Buffer-->Program
    Program-->Channel/Buffer2
    Channel/Buffer2-->Destination
</div>

### 1.2 Non-blocking IO
Java NIO enables you to do `non-blocking IO`. For instance, a thread can ask a channel to read data into a buffer. While the channel reads data into the buffer, the thread can do something else. Once data is read into the buffer, the thread can then continue processing it. The same is true for writing data to channels.

### 1.3 Selectors
Java NIO contains the concept of `selectors`. A selector is an object that can monitor multiple channels for events (like: connection opened, data arrived etc.). Thus, a single thread can monitor multiple channels for data.

## 2. Channels and Buffers
Typically, all IO in NIO starts with a Channel. A Channel is a like a stream.

From the Channel data can be read into a Buffer.
<div class="mermaid">
graph LR;
    sr(Channel) -- Read --> rr[Buffer]
    classDef orange fill:#F9B075,stroke:#E77C23,stroke-width:3px
    classDef green fill:#A1BE62,stroke:#4F6128,stroke-width:3px
    class sr orange
    class rr green
</div>
Data can also be written from a Buffer into a Channel.
<div class="mermaid">
graph RL;
    rr[Buffer] -- Write --> sr(Channel)
    classDef orange fill:#F9B075,stroke:#E77C23,stroke-width:3px
    classDef green fill:#A1BE62,stroke:#4F6128,stroke-width:3px
    class sr orange
    class rr green
</div>

There are several Channel and Buffer types. Here is a list of the primary Channel implementations in Java NIO:
- FileChannel
- DatagramChannel
- SocketChannel
- ServerSocketChannel

*These channels cover UDP + TCP network IO, and file IO.*

Here is a list of the core Buffer implementations in Java NIO:
- ByteBuffer
- CharBuffer
- DoubleBuffer
- FloatBuffer
- IntBuffer
- LongBuffer
- ShortBuffer

*These Buffer's cover the basic data types that you can send via IO: byte, short, int, long, float, double and characters.*

## 3. Selectors
A Selector allows a single thread to handle multiple Channel's. This is handy if your application has many connections (Channels) open, but only has low traffic on each connection. For instance, in a chat server.

Here is an illustration of a thread using a Selector to handle 3 Channel's:
<div class="mermaid">
graph TD
    rr[Thread] --> rf{Selector}
    rf -->|One| sr1(Channel)
    rf -->|Two| sr2(Channel)
    rf -->|Three| sr3(Channel)
    classDef orange fill:#F9B075,stroke:#E77C23,stroke-width:3px
    classDef red fill:#CF7875,stroke:#9F4A47,stroke-width:3px
    classDef purple fill:#C8BCD7,stroke:#5F497A,stroke-width:3px
    class sr1 orange
    class sr2 orange
    class sr3 orange
    class rf red
    class rr purple
</div>

## 4. Read Files
Suppose we have a file named 'text.txt' with the following content.
```raw
iPad Pro(Latest Version)
Model: 12.9-inch iPad Pro
Color: Space Gray
Storage: 256GB
Connectivity: WiFI
Price: $1149.00
```
### 4.1 Read File with BufferedReader
```java
// Read file with classic IO APIs
public static void main(String[] args) {
    BufferedReader br = null;
    String line = null;
    try {
        br = new BufferedReader(new FileReader("out/test.txt"));
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
Output:
```raw
Reading file with BufferedReader...
iPad Pro(Latest Version)
Model: 12.9-inch iPad Pro
Color: Space Gray
Storage: 256GB
Connectivity: WiFI
Price: $1149.00
```
### 4.2 Read File with Buffer of File Size
```java
// Read a small file with buffer of file size
public static void main(String[] args) {
    try {
        RandomAccessFile raf = new RandomAccessFile("out/test.txt","r");
        FileChannel channel = raf.getChannel();
        long fileSize = channel.size();
        ByteBuffer buffer = ByteBuffer.allocate((int) fileSize);
        channel.read(buffer);
        //buffer.rewind();
        buffer.flip();
        System.out.println("Reading file with Buffer of File Size...");
        for (int i = 0; i < fileSize; i++) {
            System.out.print((char) buffer.get());
        }
        buffer.clear();
        channel.close();
        raf.close();
    }
    catch (IOException ioe) {
        System.out.println(ioe);
    }
}
```
Output:
```raw
Reading file with Buffer of File Size...
iPad Pro(Latest Version)
Model: 12.9-inch iPad Pro
Color: Space Gray
Storage: 256GB
Connectivity: WiFI
Price: $1149.00
```
### 4.3 Read File with Fixed Buffer Size
In case the file is very large, we can't read all contents into memory at once. In this case, we read it chunk by chunk. Each time, only small size is read.
```java
// Read a large file with fixed size buffer
public static void main(String[] args) {
    try {
        int capacity = 32; // chunk size
        RandomAccessFile raf = new RandomAccessFile("out/test.txt", "r");
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
Output:
```raw
Reading file with Buffer of Fixed Size...
iPad Pro(Latest Version)
Model: 12.9-inch iPad Pro
Color: Space Gray
Storage: 256GB
Connectivity: WiFI
Price: $1149.00
```

## 5. Memory-Mapped Files
### 5.1 Memory Mapped IO
For conventional file I/O, in which user processes issue read() and write() system calls to transfer data, there is almost always `one or more` copy operations to move the data between these filesystem pages in `kernel space` and a memory area in `user space`. This is because there is not usually a one-to-one alignment between filesystem pages and user buffers.

There is, however, a special type of I/O operation supported by most operating systems that allows user processes to take maximum advantage of the page-oriented nature of system I/O and completely `avoid buffer copies`. This is called `memory-mapped I/O` and we are going to learn few things here around memory-mapped files.
### 5.2 Java Memory-Mapped Files
Memory-mapped I/O uses the filesystem to establish a virtual memory mapping from user space directly to the applicable filesystem pages. With a memory-mapped file, we can pretend that the entire file is in memory and that we can access it by simply treating it as a very large array. This approach greatly simplifies the code we write in order to modify the file.

To do both writing and reading in memory mapped files, we start with a `RandomAccessFile`, get a channel for that file. Memory mapped byte buffers are created via the `FileChannel.map()` method. This class extends the ByteBuffer class with operations that are specific to memory-mapped file regions.
### 5.3 Benefits of Memory Mapped Files
Memory-Mapped IO have several advantages over normal I/O:
- The user process sees the file data as memory, so there is no need to issue read() or write() system calls.
- As the user process touches the mapped memory space, page faults will be generated automatically to bring in the file data from disk. If the user modifies the mapped memory space, the affected page is automatically marked as dirty and will be subsequently flushed to disk to update the file.
- The virtual memory subsystem of the operating system will perform intelligent caching of the pages, automatically managing memory according to system load.
- The data is always page-aligned, and `no buffer copying` is ever needed.
- Very large files can be mapped without consuming large amounts of memory to copy the data.

### 5.4 Example of MappedByteBuffer
```java
public class MappedByteBufferExample {
    private static String fileName = "out/test.txt";
    private static String content;
    static {
        content = "iPad Pro(Latest Version)" + System.lineSeparator();
        content += "Model: 12.9-inch iPad Pro" + System.lineSeparator();
        content += "Color: Space Gray " + System.lineSeparator();
        content += "Storage: 256GB" + System.lineSeparator();
        content += "Connectivity: WiFI" + System.lineSeparator();
        content += "Price: $1149.00";
    }

    // Read a large file with MappedByteBuffer
    public static void main(String[] args) {
        try {
            prepare();
            System.out.println();
            readWithMappedByteBuffer(51);
            System.out.println();
            writeWithMappedByteBuffer(51, "[Applecare: 1year]" + System.lineSeparator());
            System.out.println();
            readWithMappedByteBuffer(0);
        }
        catch (Exception ex) {
            System.out.println(ex);
        }
    }

    private static void prepare() throws IOException {
        // Create file object
        File file = new File(fileName);

        //Delete the file
        file.delete();

        try (FileOutputStream output = new FileOutputStream(file, false)) {
            System.out.println("Preparing the file with content: ");
            System.out.println(content);
            output.write(content.getBytes());
        }
    }

    private static void readWithMappedByteBuffer(int pos) throws Exception {
        try (RandomAccessFile raf = new RandomAccessFile(fileName, "r")) {
            FileChannel channel = raf.getChannel();
            // specify the position where to start reading
            MappedByteBuffer buffer = channel.map(FileChannel.MapMode.READ_ONLY, pos, channel.size() - pos);
            buffer.load();
            System.out.println("Reading file with MappedByteBuffer at position: " + pos);
            for (int i = 0; i < buffer.limit(); i++) {
                System.out.print((char) buffer.get());
            }
        }
        System.out.println();
    }

    private static void writeWithMappedByteBuffer(int pos, String newline) throws Exception {
        try (RandomAccessFile raf = new RandomAccessFile(new File(fileName), "rw")) {
            // Get file channel in read-write mode
            FileChannel fileChannel = raf.getChannel();

            // Get direct byte buffer access using channel.map() operation
            MappedByteBuffer buffer = fileChannel.map(FileChannel.MapMode.READ_WRITE, pos, newline.length());

            //Write the content using put methods
            System.out.println("Writing content to file with MappedByteBuffer at pos: " + pos);
            System.out.print(newline);
            buffer.put(newline.getBytes());
            System.out.println("Done!");
        }
    }
}
```
Output:
```raw
Preparing the file with content:
iPad Pro(Latest Version)
Model: 12.9-inch iPad Pro
Color: Space Gray
Storage: 256GB
Connectivity: WiFI
Price: $1149.00

Reading file with MappedByteBuffer at position: 51
Color: Space Gray
Storage: 256GB
Connectivity: WiFI
Price: $1149.00

Writing content to file with MappedByteBuffer at pos: 51
[Applecare: 1year]
Done!

Reading file with MappedByteBuffer at position: 0
iPad Pro(Latest Version)
Model: 12.9-inch iPad Pro
[Applecare: 1year]
Storage: 256GB
Connectivity: WiFI
Price: $1149.00
```
* We can specify the `starting point` and the `length` when using MappedByteBuffer for reading or writing.
* In the output of reading, the first two lines are ignored.
* In the output of writing, the third line is overwritten to `[Applecare: 1year]`.

## 6. Source Files
* [Source files for Java NIO on GitHub](https://github.com/jojozhuang/java-programming/tree/master/java-core-nio)

## 7. References
* [Java NIO Tutorial](http://tutorials.jenkov.com/java-nio/index.html)
* [3 Ways to Read Files – Java NIO](https://howtodoinjava.com/java7/nio/3-ways-to-read-files-using-java-nio/)
* [Java Memory-Mapped Files – Java MappedByteBuffer](https://howtodoinjava.com/java7/nio/memory-mapped-files-mappedbytebuffer/)
* [Java NIO vs. IO](http://tutorials.jenkov.com/java-nio/nio-vs-io.html)
* [Java Standard IO vs. Java NIO](https://howtodoinjava.com/java/io/difference-between-standard-io-and-nio/)
