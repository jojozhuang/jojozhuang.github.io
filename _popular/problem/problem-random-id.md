---
layout: tutorial
key: popular
title: "Problem - Random ID"
index: 1703
subcategory: practice-problems
date: 2019-08-01
tags: [Random ID]
---

> Implement a random id generator.

## 1. Requirement
Implement an ID generator, which can generate random unique id. You are able to specify the length of the IDs.
* ID should be human-readable, short but unique.
* Ideally should be 5 or 6 chars long.
* Scalable.

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
public class RandomIdGeneratorExample {
    public static void main(String[] args) {
        System.out.println("Create 5 IDs with length of 6, base62");
        // Create 5 IDs with length of 6, base62
        for (int i = 0; i < 5; i++) {
            System.out.println(RandomIdGenerator.GetBase62(6));
        }

        System.out.println();

        System.out.println("Create 5 IDs with length of 8, base36");
        // Create 5 IDs with length of 8, base36
        for (int i = 0; i < 5; i++) {
            System.out.println(RandomIdGenerator.GetBase36(8));
        }
    }
}
```
Output.
```raw
Create 5 IDs with length of 6, base62
naVtP1
UYQRn5
ksGMIl
QX9Ma8
FqTJKB

Create 5 IDs with length of 8, base36
V7LD8CMD
A9CMC7J1
1SJ0ZRR3
O4PTJAXV
A8X8Y324
```

## 3. Source Files
* [Source files of Random ID Generator on Github](https://github.com/jojozhuang/practice-problems/tree/master/random-id)

## 4. References
* [Generating human-readable/usable, short but unique IDs](https://stackoverflow.com/questions/9543715/generating-human-readable-usable-short-but-unique-ids)
