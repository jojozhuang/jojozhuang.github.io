---
layout: tutorial
key: programming
title: "Java Core - IO"
index: 2326
subcategory: java-core
date: 2017-01-11
tags: [IO, File, Directory, Stream]
mermaid: true
---

> Read and write file in java.

## 1. Java IO Overview
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

## 2. File and Directory
File read and write.
```java
private static void fileWriteAndRead() throws IOException {
    // Create file instance
    File file = new File("example-create-file.txt");
    // Check if file Exists
    boolean fileExist = file.exists(); // false
    System.out.println("File exists:" + fileExist);
    // Create file on disk
    file.createNewFile();
    // creates a FileWriter Object
    Writer writer = new FileWriter(file);
    // Write content to file
    writer.write("hello, java io");
    writer.flush();
    writer.close();

    long length = file.length();
    System.out.println("File length:" + length);

    // Creates a FileReader Object
    FileReader reader = new FileReader(file);
    int data = reader.read();
    while (data != -1) {
        System.out.print((char)data);
        data = reader.read();
    }
    System.out.println();
    reader.close();
}
```
Output:
```raw
File exists:false
File length:14
hello, java io
```
Rename and delete file.
```java
private static void fileRenameAndDelete() throws IOException {
    // rename file
    File oldFile = new File("example-create-file.txt");
    File newFile = new File("renamed-file.txt");
    oldFile.renameTo(newFile);
    System.out.println("Old file exists:" + oldFile.exists()); // false
    System.out.println("New file exists:" + newFile.exists()); // true

    // delete file
    newFile.delete();
    System.out.println("New file exists:" + newFile.exists()); // false
}
```
Output:
```raw
Old file exists:false
New file exists:true
New file exists:false
```
Create directory, get files from directory.
```java
private static void directory() throws IOException {
    String directoryPath = "javaio/newdir";
    File dir1 = new File(directoryPath);
    // Clean directory if exists
    if (dir1.exists()) {
        deleteDirectory(dir1);
    }

    // Create a Directory if it does not exist
    //boolean dirCreated = dir1.mkdir(); // won't work
    boolean dirCreated = dir1.mkdirs(); // return true
    System.out.println("Directory exists:" + dir1.exists()); // true

    boolean isDirectory = dir1.isDirectory(); // return true

    // Create multiple files
    for (int i = 1 ; i <= 5 ; i++){
        File file = new File(dir1, "name" + i + ".txt") ;
        file.createNewFile();
    }
    // List files in directory
    File dir2 = new File(directoryPath);
    String[] fileNames = dir2.list();
    Arrays.sort(fileNames);
    for (String filename : fileNames) {
        System.out.println(filename);
    }
    // Absolute file path
    File[] files = dir2.listFiles();
    Arrays.sort(files);
    for (File file : files) {
        System.out.println(file.getAbsoluteFile());
    }
}
```
Output:
```raw
Directory exists:true
name1.txt
name2.txt
name3.txt
name4.txt
name5.txt
/Users/Johnny/GitHub/java-programming/javaio/newdir/name1.txt
/Users/Johnny/GitHub/java-programming/javaio/newdir/name2.txt
/Users/Johnny/GitHub/java-programming/javaio/newdir/name3.txt
/Users/Johnny/GitHub/java-programming/javaio/newdir/name4.txt
/Users/Johnny/GitHub/java-programming/javaio/newdir/name5.txt
```
Delete directory and all files inside it.
```java
private static boolean deleteDirectory(File dir) {
    File[] files = dir.listFiles();
    if (files != null) {
        for (File file : files) {
            // recursively delete
            deleteDirectory(file);
        }
    }
    return dir.delete();
}
```
## 3. File Stream
```java
public static void main(String[] args) throws IOException {
    String path = "fileForStream.txt";
    File file = new File(path);
    FileOutputStream output = new FileOutputStream(file, false); // true: append, false: overwrite
    String content = "hello, file stream";
    System.out.println("Write to file: " + content);
    output.write(content.getBytes());
    output.flush();
    output.close();

    FileInputStream input = new FileInputStream(file);
    System.out.print("Read from file: ");
    int data = input.read();
    while (data != -1) {
        System.out.print((char)data);
        data = input.read();
    }
    System.out.println();
    input.close();
}
```
Output:
```raw
Write to file: hello, file stream
Read from file: hello, file stream
```

## 4. Source Files
* [Source files for Java IO on GitHub](https://github.com/jojozhuang/java-programming/tree/master/java-core-io)

## 5. References
* [Java IO Tutorial](http://tutorials.jenkov.com/java-io/index.html)
* [Java IO Tutorials and Examples](https://howtodoinjava.com/java-io-tutorial/)
