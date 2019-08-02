---
layout: tutorial
key: popular
title: "Problem - Image Cache"
index: 1703
subcategory: practice-problems
date: 2019-08-01
tags: [Image Cache]
---

> Implement a cache for storing images.

## 1. Requirement
Implement a cache for image storage. We can specify the capacity. If cache reaches to the maximum storage size, it will stop accepting new images. We can also specify the the maximum numbers of images. If the number reaches to the maximum, the least recently used image will be eliminated.

## 2. Solution
Create LRU.
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
Input.
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

## 3. Dummy Servers
We need the dummy web server to host the images.
```raw
cd /GitHub/Tutorials/DummyServer
json-server --watch products.json --port 5000

# http://localhost:5000/products
# http://localhost:5000/images/controller.jpg
```

## 4. Source Files
* [Source files of Image Cache on Github](https://github.com/jojozhuang/practice-problems/tree/master/image-cache)

## 5. References
* [Java User Input (Scanner)](https://www.w3schools.com/java/java_user_input.asp)
* [how to redirect stdin and stdout to a text file in java](https://stackoverflow.com/questions/23886499/how-to-redirect-stdin-and-stdout-to-a-text-file-in-java)
