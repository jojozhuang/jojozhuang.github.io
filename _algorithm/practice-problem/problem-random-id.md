---
layout: tutorial
key: algorithm
title: "Problem - Random ID"
index: 1404
subcategory: practice-problem
date: 2019-08-01
tags: [Random ID]
---

> Implement a random id generator.

## 1. Requirement
Implement an ID generator, which can generate random unique id. You are able to specify the length of the IDs.
* ID should be human-readable, short but unique.
* Ideally should be 5 or 6 chars long.
* Scalable.

## 2. Solution
Total characters = 10 numbers + 26 upper case letters + 26 lower case letters. Randomly pickup characters within these 62 letters for the given length.
```java
public class RandomIdGenerator {
    private static char[] base62chars =
            "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".toCharArray();

    private static Random random = new Random();

    public static String GetBase62(int length)
    {
        StringBuilder sb = new StringBuilder(length);

        for (int i = 0; i < length; i++)
            sb.append(base62chars[random.nextInt(62)]);

        return sb.toString();
    }

    public static String GetBase36(int length)
    {
        StringBuilder sb = new StringBuilder(length);

        for (int i=0; i < length; i++)
            sb.append(base62chars[random.nextInt(36)]);

        return sb.toString();
    }
}
```
Test Class.
```java
public class RandomIdGeneratorTest {
    @Test
    public void testRandomIdGenerator() {
        System.out.println("testRandomIdGenerator");

        // Create 5 IDs with length of 6, base62
        System.out.println("Create 5 IDs with length of 6, base62");
        for (int i = 0; i < 5; i++) {
            String base62ID = RandomIdGenerator.GetBase62(6);
            System.out.println(base62ID);
            assertEquals(6, base62ID.length());
        }

        System.out.println();

        // Create 5 IDs with length of 8, base36
        System.out.println("Create 5 IDs with length of 8, base36");
        for (int i = 0; i < 5; i++) {
            String base36ID = RandomIdGenerator.GetBase36(8);
            System.out.println(base36ID);
            assertEquals(8, base36ID.length());
        }
    }
}
```
Output.
```raw
Create 5 IDs with length of 6, base62
S3oss6
5tTbvF
FQ0282
7Zvv8U
qx7xni

Create 5 IDs with length of 8, base36
PYO7W1RM
ASSXF1UI
GI6STYE9
81BQJKR8
M5QDTUMM
```

## 3. Source Files
* [Source files of Random ID Generator on Github](https://github.com/jojozhuang/practice-problems/tree/master/random-id)

## 4. References
* [Generating human-readable/usable, short but unique IDs](https://stackoverflow.com/questions/9543715/generating-human-readable-usable-short-but-unique-ids)
