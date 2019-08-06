---
layout: tutorial
key: popular
title: "Problem - Word Counter(Draft)"
index: 1702
subcategory: practice-problems
date: 2019-08-01
tags: [Word Counter]
draft: true
---

> Count the number of word in file.

## 0. More Requirements
- 1) What if the given file is very large? Read file by chunk, NIO maybe?
- 2) What if most of the words are unique? Use Trie to reduce the memory storage.
- 3) What if you are not given a file but a stream?
- 4) If you are given many servers, how will you use them to improve the performance? Map Reduce.
- 5) What if we just need to return the first 10 popular words?
- 6) How to return the top 10 words in the last one hour? Use hashmap. Create one hashmap for every minute.

## 1. Requirement
Write a program to count the words in a given file. You can assume the file is very small.

## 2. Solution
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

## 3. Source Files
* [Source files of Word Counter on Github](https://github.com/jojozhuang/practice-problems/tree/master/word-counter)

## 4. References
* [Java User Input (Scanner)](https://www.w3schools.com/java/java_user_input.asp)
* [how to redirect stdin and stdout to a text file in java](https://stackoverflow.com/questions/23886499/how-to-redirect-stdin-and-stdout-to-a-text-file-in-java)
