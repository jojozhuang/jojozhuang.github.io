---
layout: tutorial
key: programming
title: "Java Advanced - Hashmap vs WeakHashMap"
index: 2457
subcategory: java-advanced
date: 2017-03-02
tags: [WeakHashMap, Weak References]
---

> Hashmap vs WeakHashMap

## 1. HashMap
A HashMap has key-value pairs i.e. keys that are associated with the values and the keys are in arbitrary order. A HashMap object that is specified as a key is not eligible for garbage collection. This means that the **HashMap has dominance over the garbage collector**. See the example below.

First, create a class named `Resource`, which will be used as key in hashmap.
```java
public class Resource {
    public String toString() {
        return "resource";
    }

    // finalize method
    public void finalize() {
        System.out.println("Finalize method is called");
    }
}
```
Second, create a HashMap with the Resource class.
```java
import java.util.HashMap;
import java.util.Map;

public class HashMapGCExample {
    public static void main(String args[])throws Exception {
        Map<Resource, String> map = new HashMap<>();
        Resource r = new Resource();

        // puts an entry into HashMap
        map.put(r, "Hi");

        System.out.println(map);
        r = null;

        // garbage collector is called
        System.gc();

        //thread sleeps for 4 sec
        Thread.sleep(4000);

        System.out.println(map);
    }
}
```
Output. See the entry in hashmap hasn't been garbage collected.
```raw
{resource=Hi}
{resource=Hi}
```

## 2. WeakHashMap
A WeakHashMap has key-value pairs i.e. it is quite similar to a HashMap in Java. A difference is that the WeakHashMap object that is specified as a key is still eligible for garbage collection. This means that the **garbage collector has dominance over the WeakHashMap**.

The only difference of the following example is to change the HashMap to WeakHashMap.
```java
import java.util.Map;
import java.util.WeakHashMap;

public class WeakHashMapGCExample {
    public static void main(String args[])throws Exception {
        Map<Resource, String> map = new WeakHashMap<>();
        Resource r = new Resource();

        // puts an entry into HashMap
        map.put(r, "Hi");

        System.out.println(map);
        r = null;

        // garbage collector is called
        System.gc();

        //thread sleeps for 4 sec
        Thread.sleep(4000);

        System.out.println(map);
    }
}
```
Output. See the finalize method of class Resource gets called and the entry in weakhashmap hasn't been garbage collected.
```raw
{resource=Hi}
Finalize method is called
{}
```

## 3. HashMap vs. WeakHashMap
* Strong vs Weak References: `Weak Reference` Objects are not the default type/class of Reference Object and they should be explicitly specified while using them. This type of reference is used in WeakHashMap to reference the entry objects.
`Strong References`: This is the default type/class of Reference Object. Any object which has an active strong reference are not eligible for garbage collection. In HashMap, key objects have strong reference.
* Role of `Garbage Collector`: In HashMap , entry object(entry object stores key-value pairs) is not eligible for garbage collection i.e Hashmap is dominant over Garbage Collector. In WeakHashmap, when a key is discarded then its entry is automatically removed from the map, in other words, it is garbage collected.
* Clone method Implementation: HashMap implements `Cloneable` interface. WeakHashMap does not implement Cloneable interface , it only implements Map interface. Hence , there is no clone() method in the WeakHashMap class.

## 4. Source Files
* [Source files for Java WeakHashMap on GitHub](https://github.com/jojozhuang/java-programming/tree/master/java-advanced-weakhashmap)

## 5. References
* [Hashmap vs WeakHashMap in Java](https://www.geeksforgeeks.org/hashmap-vs-weakhashmap-java/)
