---
layout: tutorial
key: algorithm
title: "Problem - Versioned Key‐Value Store"
index: 1406
subcategory: practice-problem
date: 2019-08-03
tags: [Key‐Value]
---

> Implement a versioned Key‐Value store data structure.

## 1. Versioned Key‐Value Store
### 1.1 Requirement
You are to build a simple `key‐value` store for storing integers (keys are strings, values are integers) and a **global** version
(integer). You will not persist data to disk. You will store the data in memory.

The version number is an integer that increases monotonically. Every time any key is written with a value, the version
number is increased. The first write is version number 1 . The second write is version number 2 , and so on. Assume
that all inputs are case sensitive.
### 1.2 Operations
The store supports three operations:
* `PUT(key, value)`: Set the key name to the value, returns the version number of this write. Key strings will not contain spaces.
* `GET(key)`: Get the value mapped to the key with the latest version number.
* `GET(key, version number)`: Get the value mapped to the key at the time of the version number. If the version number has not yet been recorded, return the most recent value for the key.

### 1.3 Output Format
* PUT(key, value): Print out the version number, the key and the value in format `PUT(#<version number>) <key> = <value> `.
* GET(key): Print out the key and the last value of the key in format `GET <key> = <value>`, or `<NULL>` if that key has never been set.
* GET(key, version number): Print out the key, the version number and the value in format `GET <key>(#version) = <value>`, or `<NULL>` if that key was not set at that time.

Sample Input.
```raw
PUT key1 5
PUT key2 6
GET key1
GET key1 1
GET key2 2
PUT key1 7
GET key1 1
GET key1 2
GET key1 3
GET key4
GET key1 4
```
Sample Output
```raw
PUT(#1) key1 = 5
PUT(#2) key2 = 6
GET key1 = 5
GET key1(#1) = 5
GET key2(#2) = 6
PUT(#3) key1 = 7
GET key1(#1) = 5
GET key1(#2) = 5
GET key1(#3) = 7
GET key4 = <NULL>
GET key1(#4) = 7
```

## 2. Solution
The KeyValueStore data structure.
```java
import java.util.HashMap;
import java.util.Map;
import java.util.TreeMap;

/*
 * A versioned Key-Value Store
 */
public class KeyValueStore {

    // Define a map to store versioned values for key, use TreeMap to maintain
    // a sorted map based on version number
    Map<String, TreeMap<Integer, String>> map;
    // version number
    int version;

    // Constructor
    public KeyValueStore() {
        map = new HashMap<>();
        version = 0;
    }

    /*
     * Save key value pair
     * @param key
     * @param value
     * @return version, increments each time
     */
    public int put(String key, String value) {
        if (!map.containsKey(key)) {
            map.put(key, new TreeMap<>());
        }

        map.get(key).put(++version, value);

        System.out.println("PUT" + "(#" + version + ") " + key + " = " + value);
        return version;
    }

    /*
     * Get value by key
     * @param key
     * @return value
     */
    public String get(String key) {
        if (!map.containsKey(key)) {
            System.out.println("GET " + key + " = <NULL>");
            return null;
        }

        TreeMap<Integer, String> treeMap = map.get(key);
        String value = treeMap.lastEntry().getValue();
        System.out.println("GET " + key + " = " + value);
        return value;
    }

    /*
     * Get value by key and version
     * @param key
     * @param version
     * @return value
     */
    public String get(String key, int version) {
        if (!map.containsKey(key)) {
            System.out.println("GET " + key + "(#"+version+") = <NULL>");
            return null;
        }

        TreeMap<Integer, String> treeMap = map.get(key);
        String value;
        if (treeMap.containsKey(version)) {
            value = treeMap.get(version);
        } else {
            // find the largest smaller version
            Map.Entry<Integer, String>  entry = treeMap.lowerEntry(version);
            if (entry == null) {
                System.out.println("GET " + key + "(#"+version+") = <NULL>");
                return null;
            }
            value = entry.getValue();
        }

        System.out.println("GET " + key + "(#"+version+") = " + value);

        return value;
    }
}
```
The example how to use it.
```java
public class KeyValueStoreExample {
    private static final String PREFIX_INPUT_FILE = "input";
    private static final String PREFIX_OUTPUT_FILE = "output";

    public static void main(String[] args) {

        try {
            ClassLoader classLoader = KeyValueStoreExample.class.getClassLoader();

            for (int i = 1; i <= 2; i++) {

                // Create VersionedStore object
                KeyValueStore kvs = new KeyValueStore();
                Path path = Paths.get("files", PREFIX_INPUT_FILE + i + ".txt");
                InputStream inputStream = classLoader.getResourceAsStream(path.toString());
                System.setIn(inputStream);

                // Set system.out
                //Path output = Paths.get("files", PREFIX_OUTPUT_FILE + i + ".txt");
                //File outputFile = output.toFile();
                //System.setOut(new PrintStream(outputFile));

                // Read from stdin
                Scanner sc = new Scanner(System.in);
                while (sc.hasNextLine()) { // check by line
                    String operator = sc.next();
                    // Check operation first
                    if (operator.equals("PUT")) {
                        String key = sc.next();
                        String value = sc.next();
                        kvs.put(key, value);
                    } else { // the GET case
                        String key = sc.next();
                        Integer version = null;
                        // Check if version is specified
                        if (sc.hasNextInt()) {
                            version = sc.nextInt();
                        }
                        if (version == null) {
                            kvs.get(key);
                        } else {
                            kvs.get(key, version);
                        }
                    }
                }
                sc.close();
                System.out.println();
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }
}
```
Input.
```raw
PUT key1 5
PUT key2 6
GET key1
GET key1 1
GET key2 2
PUT key1 7
GET key1 1
GET key1 2
GET key1 3
GET key4
GET key1 4
```
Output.
```raw
PUT(#1) key1 = 5
PUT(#2) key2 = 6
GET key1 = 5
GET key1(#1) = 5
GET key2(#2) = 6
PUT(#3) key1 = 7
GET key1(#1) = 5
GET key1(#2) = 5
GET key1(#3) = 7
GET key4 = <NULL>
GET key1(#4) = 7
```

## 3. Source Files
* [Source files of Versioned Key-value Store on Github](https://github.com/jojozhuang/practice-problems/tree/master/key-value-store)
