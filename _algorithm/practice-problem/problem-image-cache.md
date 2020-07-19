---
layout: tutorial
key: algorithm
title: "Problem - Image Cache"
index: 1403
subcategory: practice-problem
date: 2019-08-01
tags: [Image Cache]
---

> Implement a cache for storing images.

## 1. Requirement
Implement a cache for image storage. We can specify the capacity. If cache reaches to the maximum storage size, it will stop accepting new images. We can also specify the the maximum numbers of images. If the number reaches to the maximum, the least recently used image will be eliminated.

## 2. Solution
LRU is the appropriate data structure which perfectly meets the above requirement. It accepts two parameters during initialization. `capacity` is the maximum size of all images, whereas `quantity` is the maximum number of images.
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
    private int quantity; // maximum number of images
    private int count;    // actual number of images
    private HashMap<String, Node> map; // key, node
    private Node head;                 // The latest accessed element
    private Node tail;                 // The least recently used element

    public LRU(int capacity, int quantity) {
        this.capacity = capacity;
        this.size = 0;
        this.quantity = quantity;
        this.count = 0;
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

        count++;
        size += value.length;
        // check size and count
        while (size > capacity || count > quantity) {
            if (size > capacity) {
                System.out.println("Current size: " + size + " exceeds the maximum capacity: " + capacity + ", delete the least recently used image:" + tail.prev.key);
            } else {
                System.out.println("Current count: " + count + " exceeds the maximum quantity: " + quantity + ", delete the least recently used image:" + tail.prev.key);
            }
            size -= tail.prev.value.length;
            count--;
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

    public String toString() {
        return "capacity=" + capacity + ", size=" + size + ", quantity=" + quantity + ", count=" + count;
    }

    private void moveToHead(Node node) {
        node.prev = head;
        node.next = head.next;
        node.next.prev = node;
        head.next = node;
    }
}
```
The ImageCache class is the wrapper of LRU class. It has two main functions.
* Accept a url list from external caller.
* Download image from internet with the given url and save it to the cache.

```java
public class ImageCache {
    private LRU lru;
    public void process(List<String> urls,  int capacity, int quantity) throws IOException, InterruptedException {
        lru = new LRU(capacity, quantity);

        for (String url : urls) {
            if (lru.contains(url)) {
                System.out.println(url + " IN_CACHE " + lru.get(url).length);
            } else {
                byte[] image = download(url);
                System.out.println(url + " DOWNLOADED " + image.length);
                lru.add(url, image);
            }
            //System.out.println("size:" +  lru.size());
            //System.out.println("count:" +  lru.count());
        }
    }

    private byte[] download(String imageUrl) throws IOException, InterruptedException {
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

    public void print() {
        System.out.println(lru);
    }
}
```
Test class.
```java
public class ImageCacheTest {
    private static final String INPUT_FILE = "images.txt";

    @Test
    public void testImageCache() {
        System.out.println("testImageCache");

        int capacity = 0;
        int quantity = 0;
        List<String> urls = new ArrayList<>();

        ClassLoader classLoader = ImageCacheExample.class.getClassLoader();
        Path path = Paths.get("files", INPUT_FILE);
        try (InputStream inputStream = classLoader.getResourceAsStream(path.toString())) {
            System.setIn(inputStream);
            Scanner sc = new Scanner(System.in);
            capacity = sc.nextInt();
            quantity = sc.nextInt();
            while (sc.hasNext()) {
                urls.add(sc.next());
            }
            sc.close();
        } catch (IOException e) {
            e.printStackTrace();
        }

        ImageCache ic = new ImageCache();
        try {
            ic.process(urls, capacity, quantity);
        } catch (Exception e) {
            e.printStackTrace();
        }
        ic.print();
    }
}
```
Input.
```raw
524288
5
https://jojozhuang.github.io/assets/images/project/tripplannerios/index.png
https://jojozhuang.github.io/assets/images/project/tripplannerios/trips.png
https://jojozhuang.github.io/assets/images/project/tripplannerios/search.png
https://jojozhuang.github.io/assets/images/project/tripplannerios/city2.png
https://jojozhuang.github.io/assets/images/project/tripplannerios/settings.png
https://jojozhuang.github.io/assets/images/project/restaurantandroid/index.png
https://jojozhuang.github.io/assets/images/project/restaurantandroid/detail.png
https://jojozhuang.github.io/assets/images/project/restaurantandroid/pad.png
https://jojozhuang.github.io/assets/images/project/restaurantandroid/backend.png
```
Output.
```raw
testImageCache
https://jojozhuang.github.io/assets/images/project/tripplannerios/index.png DOWNLOADED 189248
https://jojozhuang.github.io/assets/images/project/tripplannerios/trips.png DOWNLOADED 178584
https://jojozhuang.github.io/assets/images/project/tripplannerios/search.png DOWNLOADED 81909
https://jojozhuang.github.io/assets/images/project/tripplannerios/city2.png DOWNLOADED 278500
Current size: 728241 exceeds the maximum capacity: 524288, delete the least recently used image:https://jojozhuang.github.io/assets/images/project/tripplannerios/index.png
Current size: 538993 exceeds the maximum capacity: 524288, delete the least recently used image:https://jojozhuang.github.io/assets/images/project/tripplannerios/trips.png
https://jojozhuang.github.io/assets/images/project/tripplannerios/settings.png DOWNLOADED 28392
https://jojozhuang.github.io/assets/images/project/restaurantandroid/index.png DOWNLOADED 431474
Current size: 820275 exceeds the maximum capacity: 524288, delete the least recently used image:https://jojozhuang.github.io/assets/images/project/tripplannerios/search.png
Current size: 738366 exceeds the maximum capacity: 524288, delete the least recently used image:https://jojozhuang.github.io/assets/images/project/tripplannerios/city2.png
https://jojozhuang.github.io/assets/images/project/restaurantandroid/detail.png DOWNLOADED 336079
Current size: 795945 exceeds the maximum capacity: 524288, delete the least recently used image:https://jojozhuang.github.io/assets/images/project/tripplannerios/settings.png
Current size: 767553 exceeds the maximum capacity: 524288, delete the least recently used image:https://jojozhuang.github.io/assets/images/project/restaurantandroid/index.png
https://jojozhuang.github.io/assets/images/project/restaurantandroid/pad.png DOWNLOADED 535287
https://jojozhuang.github.io/assets/images/project/restaurantandroid/backend.png DOWNLOADED 52852
capacity=524288, size=388931, quantity=5, count=2

```

## 3. Dummy Servers
If we want to test locally, we need the dummy web server to host the images.
```raw
cd /GitHub/Tutorials/DummyServer
json-server --watch products.json --port 5000

# http://localhost:5000/products
# http://localhost:5000/images/controller.jpg
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
http://localhost:5000/images/wii.jpg DOWNLOADED 108475
```

## 4. Source Files
* [Source files of Image Cache on Github](https://github.com/jojozhuang/practice-problems/tree/master/image-cache)

## 5. References
* [Java User Input (Scanner)](https://www.w3schools.com/java/java_user_input.asp)
* [how to redirect stdin and stdout to a text file in java](https://stackoverflow.com/questions/23886499/how-to-redirect-stdin-and-stdout-to-a-text-file-in-java)
