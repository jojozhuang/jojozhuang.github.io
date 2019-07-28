---
layout: tutorial
key: popular
title: "Java Core - Scanner"
index: 1405
subcategory: java-core
date: 2017-01-02
tags: [Scanner]
---

> Scanner, System.io, System.out

## 1. Input Types
Scanner methods.

Method          | Description
----------------|-------------------------------------
`nextBoolean()` | Reads a `boolean` value from the user
`nextByte()`    | Reads a `byte` value from the user
`nextDouble()`  | Reads a `double` value from the user
`nextFloat()`   | Reads a `float` value from the user
`nextInt() `    | Reads a `int` value from the user
`nextLine()`    | Reads a `String` value from the user
`nextLong()`    | Reads a `long` value from the user
`nextShort()`   | Reads a `short` value from the user

## 2. Examples
### 2.1 Common Usage
```java
import java.util.Scanner;

public class ScannerTest {
    public static void main(String[] args) {
        System.out.println("Enter name, age and salary:");
        Scanner scan = new Scanner(System.in);

        // String input
        String name = scan.nextLine();

        // Numerical input
        int age = scan.nextInt();
        double salary = scan.nextDouble();

        // Output input by user
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
        System.out.println("Salary: " + salary);
    }
}
```
Output.
```raw
Enter name, age and salary
Johnny
30
8023
Name: Johnny
Age: 30
Salary: 8023.0
```
### 2.2 Read Long String
Use while loop by checking if scanner has next line, `scan.hasNext()`. The default delimiter is white space.
```java
import java.util.Scanner;

public class Solution {

    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);
        System.out.println("Testing hasNext and next, input string:");

        String s = "";
        while (scan.hasNext()) {
            s += scan.next() + "-";
        }
        // CMD + D on Mac to supply EOF for testing in terminal
        System.out.println("String: " + s);
    }
}
```
Output.
```raw
Testing hasNext and next, input string:
aa bb cc
11 22 33
^D
String: aa-bb-cc-11-22-33-
```
hasNextLine() + nextLine().
```java
import java.util.Scanner;

public class Solution {

    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);
        System.out.println("Testing hasNextLine and nextLine, input string:");

        String s = "";
        while (scan.hasNextLine()) {
            s += scan.nextLine() + "-";
        }
        // CMD + D on Mac to supply EOF for testing in terminal
        System.out.println("String: " + s);
    }
}
```
Output.
```raw
Testing hasNextLine and nextLine, input string:
aa bb cc
11 22 33
^D
String: aa bb cc-11 22 33-
```
### 2.3 Delimiter
By default, scanner uses white space as delimiter.
```java
import java.util.Scanner;

public class Solution {

    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);
        System.out.println("Testing default delimiter, input string:");

        String s = "";
        while (scan.hasNext()) {
            s += scan.next() + "-";
        }
        // CMD + D on Mac to supply EOF for testing in terminal
        System.out.println("String: " + s);
    }
}
```
Output.
```raw
Testing default delimiter, input string:
aa bb, cc,dd ff,gg
^D
String: aa-bb,-cc,dd-ff,gg-
```
```java
import java.util.Scanner;

public class Solution {

    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);
        System.out.println("Testing delimiter, input string:");

        //Change the delimiter of this scanner
        scan.useDelimiter(",");

        String s = "";
        while (scan.hasNext()) {
            s += scan.next() + "-";
        }
        // CMD + D on Mac to supply EOF for testing in terminal
        System.out.println("String: " + s);
    }
}
```
Input 'aa bb, cc,dd ff,gg', the output looks as follows.
```raw
Testing custom delimiter, input string:
aa bb, cc,dd ff,gg
^D
String: aa bb- cc-dd ff-gg-
```

### 2.5 Read Files and Write Files
```java
System.setIn(new FileInputStream(new File("input.txt")));
...
//read from file
....

System.setOut(new PrintStream(new File("filename.txt")));
System.out.println(sum); // will be printed to the file    
```

### 2.6 Dummy servers
```raw
cd /Users/i857285/Johnny/GitHub/Tutorials/DummyServer
json-server --watch products.json --port 5000

# http://localhost:5000/products
# http://localhost:5000/images/controller.jpg
```

### 2.7 Word Counter
```java
public class WordCounter {
    public static void main(String[] args) {
        List<String> list = read();
        SortedMap<String, Integer> map = process(list);
        write(map);
    }

    public static List<String> read() {
        List<String> list = new ArrayList<>();

        Scanner sc = new Scanner(System.in);
        while (sc.hasNext()) {
            list.add(sc.next());
        }
        sc.close();

        return list;
    }

    public static SortedMap<String, Integer> process(List<String> words) {
        if (words == null || words.size() == 0) {
            return null;
        }

        SortedMap<String, Integer> map = new TreeMap<>();

        for (String word : words) {
            if (!map.containsKey(word)) {
                map.put(word, 1);
            } else {
                map.put(word, map.get(word) + 1);
            }
        }

        return map;
    }

    public static void write(SortedMap<String, Integer> map) {
        if (map == null || map.size() == 0) {
            return;
        }

        for (Map.Entry<String, Integer> entry : map.entrySet()) {
            System.out.println(entry.getKey() + " " + entry.getValue());
        }
    }
}
```
Test Class.
```java
public class WordCounterTest {

    private static final String PREFIX_INPUT_FILE = "input";
    private static final String PREFIX_OUTPUT_FILE = "output";

    @Test
    public void testWordCounter() throws IOException {
        System.out.println("testWordCounter");

        String currentDir = System.getProperty("user.dir");

        for (int i = 1; i <= 2; i++) {
            // Set system.io
            Path path = Paths.get(currentDir, "files", PREFIX_INPUT_FILE + i + ".txt");
            File file = path.toFile();
            System.setIn(new FileInputStream(file));

            // Set system.out
            Path output = Paths.get(currentDir, "files", PREFIX_OUTPUT_FILE + i + ".txt");
            File outputFile = output.toFile();
            System.setOut(new PrintStream(outputFile));

            WordCounter.main(null);
        }
    }
}
```
Input.
```raw
hello world
world hello
hello
howdy
```
Output.
```raw
hello 3
howdy 1
world 2
```
### 2.8 Image Cache
LRU
```java
public class LRU {
    public class Node {
        public String key;
        public byte[] value;
        public Node prev;
        public Node next;

        public Node(String key, byte[] value) {
            this.key = key;
            this.value = value;
            this.prev = null;
            this.next = null;
        }
    }

    private int capacity; // maximum size
    private int size;     // actual size
    private HashMap<String, Node> map; // key, node
    private Node head;                 // The latest accessed element
    private Node tail;                 // The least recently used element

    public LRU(int capacity) {
        this.capacity = capacity;
        this.size = 0;
        this.map = new HashMap<>();
        this.head = new Node("head", new byte[]{});
        this.tail = new Node("tail", new byte[]{});
        head.next = tail;
        tail.prev = head;
    }

    public void add(String key, byte[] value) {
        if (map.containsKey(key)) {
            return;
        }

        if (value.length > capacity) {
            return;
        }

        Node newNode = new Node(key, value);
        map.put(key, newNode);

        // move new node to head
        moveToHead(newNode);

        // check size
        size += value.length;
        while (size > capacity) {
            size -= tail.prev.value.length;
            map.remove(tail.prev.key);
            tail.prev = tail.prev.prev;
            tail.prev.next = tail;
        }
    }

    public boolean contains(String key) {
        return map.containsKey(key);
    }

    public byte[] get(String key) {
        if (!map.containsKey(key)) {
            return null;
        }

        // remove current
        Node current = map.get(key);
        current.prev.next = current.next;
        current.next.prev = current.prev;

        // move current node to head
        moveToHead(current);

        return map.get(key).value;
    }

    public int size() {
        return this.size;
    }

    public int count() {
        return this.map.size();
    }

    private void moveToHead(Node node) {
        node.prev = head;
        node.next = head.next;
        node.next.prev = node;
        head.next = node;
    }
}
```
Image Cache.
```java
public class ImageCache {
    public static void main(String[] args) throws IOException {
        Scanner sc = new Scanner(System.in);
        int size = sc.nextInt();
        int num = sc.nextInt();

        List<String> urls = new ArrayList<>();
        while (sc.hasNext()) {
            urls.add(sc.next());
        }
        sc.close();

        LRU lru = new LRU(size);

        for (String url : urls) {
            if (lru.contains(url)) {
                System.out.println(url + " IN_CACHE " + lru.get(url).length);
            } else {
                byte[] image = download(url);
                lru.add(url, image);
                System.out.println(url + " DOWNLOADED " + image.length);
            }
            //System.out.println("size:" +  lru.size());
            //System.out.println("count:" +  lru.count());
        }
    }

    public static byte[] download(String imageUrl) throws IOException {
        URL url = new URL(imageUrl);
        InputStream in = new BufferedInputStream(url.openStream());
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        byte[] buf = new byte[1024];
        int len = 0;
        while (-1 != (len = in.read(buf)))
        {
            out.write(buf, 0, len);
        }
        out.close();
        in.close();

        byte[] response = out.toByteArray();

        return response;
    }
}
```
Test class.
```java
public class ImageCacheTest {

    private static final String INPUT_FILE = "images.txt";
    private static final String OUTPUT_FILE = "output.txt";

    @Test
    public void tesImageCache() throws IOException {
        System.out.println("tesImageCache");

        String currentDir = System.getProperty("user.dir");

        // Set system.io
        Path path = Paths.get(currentDir, "files", INPUT_FILE);
        File file = path.toFile();
        System.setIn(new FileInputStream(file));

        // Set system.out
        Path output = Paths.get(currentDir, "files", OUTPUT_FILE);
        File outputFile = output.toFile();
        System.setOut(new PrintStream(outputFile));

        ImageCache.main(null);
    }
}
```
input.
```raw
204288
6
http://localhost:5000/images/xbox360.jpg
http://localhost:5000/images/wii.jpg
http://localhost:5000/images/xbox360.jpg
http://localhost:5000/images/xbox360.jpg
http://localhost:5000/images/controller.jpg
http://localhost:5000/images/wii.jpg
```
Output.
```raw
http://localhost:5000/images/xbox360.jpg DOWNLOADED 61584
http://localhost:5000/images/wii.jpg DOWNLOADED 108475
http://localhost:5000/images/xbox360.jpg IN_CACHE 61584
http://localhost:5000/images/xbox360.jpg IN_CACHE 61584
http://localhost:5000/images/controller.jpg DOWNLOADED 103257
http://localhost:5000/images/wii.jpg IN_CACHE 108475
```

## 3. Source Files
* [Java User Input (Scanner)](https://www.w3schools.com/java/java_user_input.asp)
* [how to redirect stdin and stdout to a text file in java](https://stackoverflow.com/questions/23886499/how-to-redirect-stdin-and-stdout-to-a-text-file-in-java)
