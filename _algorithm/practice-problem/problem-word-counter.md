---
layout: tutorial
key: algorithm
title: "Problem - Word Counter"
index: 1402
subcategory: practice-problem
date: 2019-08-01
tags: [Word Counter]
---

> Count the number of words in file.

## 1. Requirement
Write a program to count the words in a given file. You can assume the file is very small.

## 2. Solution
Use Map to count the number for each word from the given words list.
```java
public class WordCounter {
    public SortedMap<String, Integer> process(List<String> words) {
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
}
```
Test Class.
```java
public class WordCounterTest {
    @Test
    public void testWordCounter() {
        System.out.println("testWordCounter");

        List<String> list = read("input1.txt");
        WordCounter wordCounter = new WordCounter();
        SortedMap<String, Integer> map = wordCounter.process(list);
        assertEquals(3, map.size());
        assertEquals(3, (int)map.get("hello"));
        assertEquals(1, (int)map.get("howdy"));
        assertEquals(2, (int)map.get("world"));

        List<String> list2 = read("input2.txt");
        SortedMap<String, Integer> map2 = wordCounter.process(list2);
        assertEquals(6, map2.size());
        assertEquals(1, (int)map2.get("apple"));
        assertEquals(1, (int)map2.get("banana"));
        assertEquals(7, (int)map2.get("honey"));
        assertEquals(1, (int)map2.get("mango"));
        assertEquals(1, (int)map2.get("orange"));
        assertEquals(6, (int)map2.get("world"));
    }

    private List<String> read(String filename) {
        List<String> list = new ArrayList<>();

        ClassLoader classLoader = WordCounterExample.class.getClassLoader();
        Path path = Paths.get("files", filename);
        try (InputStream inputStream = classLoader.getResourceAsStream(path.toString())) {
            System.setIn(inputStream);
            Scanner sc = new Scanner(System.in);
            while (sc.hasNext()) {
                list.add(sc.next());
            }
            sc.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return list;
    }
}
```
Input 1.
```raw
hello world
world hello
hello
howdy
```
Output 1.
```raw
hello 3
howdy 1
world 2
```

Input 2.
```raw
apple banana orange mango
world world world world world world
honey honey honey honey honey honey honey
```
Output 2.
```raw
apple 1
banana 1
honey 7
mango 1
orange 1
world 6
```

## 3. More Requirements
- 1) What if the given file is very large? Read file by chunk, NIO maybe?
- 2) What if most of the words are unique? Use Trie to reduce the memory storage.
- 3) What if you are not given a file but a stream?
- 4) If you are given many servers, how will you use them to improve the performance? Map Reduce.
- 5) What if we just need to return the first 10 popular words?
- 6) How to return the top 10 words in the last one hour? Use hashmap. Create one hashmap for every minute.

## 4. Source Files
* [Source files of Word Counter on Github](https://github.com/jojozhuang/practice-problems/tree/master/word-counter)

## 5. References
* [Java User Input (Scanner)](https://www.w3schools.com/java/java_user_input.asp)
* [how to redirect stdin and stdout to a text file in java](https://stackoverflow.com/questions/23886499/how-to-redirect-stdin-and-stdout-to-a-text-file-in-java)
