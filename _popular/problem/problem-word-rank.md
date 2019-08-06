---
layout: tutorial
key: popular
title: "Problem - Word Rank"
index: 1707
subcategory: practice-problems
date: 2019-08-04
tags: [Prefix]
---

> Implement data structure for searching word based on rank.

## 1. Requirement
Design a data structure to store the given words and search words with prefix.

## 2. Solution
Word bean.
```java
public class Word {
    public String name;
    public int rank;
    public Word(String name, int rank) {
        this.name = name;
        this.rank = rank;
    }
}
```
Trie.
```java
public class Trie {
    class TrieNode {
        public Map<Character, TrieNode> children;
        public int rank; // only valid when leaf = true
        public boolean leaf;

        public TrieNode() {
            children = new HashMap<>();
            leaf = false;
        }
    }

    private TrieNode root;

    public Trie() {
        this.root = new TrieNode();
    }

    public TrieNode getRoot() {
        return this.root;
    }

    // Return true if the word is in trie
    public boolean search(String word) {
        TrieNode tn = searchNode(word);
        if (tn != null && tn.leaf) {
            return true;
        } else {
            return false;
        }
    }

    // Return true if there is any word in trie that starts with the given prefix
    public boolean startsWith(String prefix) {
        if (searchNode(prefix) == null) {
            return false;
        } else {
            return true;
        }
    }

    // Return true if there is any word in trie that starts with the given prefix
    public List<Word> searchWords(String prefix) {
        TrieNode current = root;
        StringBuilder sb = new StringBuilder();
        List<Word> list = new ArrayList<>();

        for (int i = 0; i < prefix.length(); i++) {
            char ch = prefix.charAt(i);
            if (!current.children.containsKey(ch)) {
                return null;
            } else {
                sb.append(ch);
                current = current.children.get(ch);
            }
        }

        dfs(current, sb.toString(), list);

        return list;
    }

    private void dfs(TrieNode node, String prefix, List<Word> list) {
        if (node.leaf) {
            list.add(new Word(prefix, node.rank));
        }

        for (Map.Entry<Character, TrieNode> entry : node.children.entrySet()) {
            dfs(entry.getValue(), prefix + entry.getKey(), list);
        }
    }

    private TrieNode searchNode(String str) {
        TrieNode current = root;

        for (int i = 0; i < str.length(); i++) {
            char ch = str.charAt(i);
            if (current.children.containsKey(ch)) {
                current = current.children.get(ch);
            } else {
                return null;
            }
        }

        return current;
    }

    // Insert a word into trie
    public void insert(String word, int rank) {
        TrieNode current = root;

        for (int i = 0; i < word.length(); i++) {
            char ch = word.charAt(i);
            if (!current.children.containsKey(ch)) {
                current.children.put(ch, new TrieNode());
            }
            current = current.children.get(ch);
        }

        current.rank = rank;
        current.leaf = true;
    }

    public boolean delete(String word) {
        TrieNode current = root;
        TrieNode lastBranchNode = null;
        Character lastBrachChar = null;

        for (int i = 0; i < word.length(); i++) {
            char ch = word.charAt(i);
            if (current.children.containsKey(ch)) {
                if (current.children.size() > 1) {
                    lastBranchNode = current;
                    lastBrachChar = ch;
                }
                current = current.children.get(ch);
            } else {
                // word not found
                return false;
            }
        }

        if (current.children.size() > 0) {
            // case 1: The to-be deleted word is prefix of another long word in trie.
            current.leaf = false;
            return true;
        }

        if (lastBranchNode != null) {
            // case 2: The to-be deleted word has other words as prefix
            lastBranchNode.children.remove(lastBrachChar);
            return true;
        } else {
            // case 3: The to-be deleted word present as unique word
            root.children.remove(word.charAt(0));
            return true;
        }
    }
}
```
WorkRank.
```java
public class WordRank {
    private Trie trie;

    public WordRank(List<Word> words) {
        trie = new Trie();
        for (Word word : words) {
            trie.insert(word.name, word.rank);
        }
    }

    public List<Word> search(String prefix) {
        return trie.searchWords(prefix).stream().sorted((w1, w2) -> w1.rank - w2.rank).collect(Collectors.toList());
    }
}
```
The example how to use it.
```java
public class WordRankExample {
    private static final String INPUT_FILE = "input.txt";
    private static final String PREFIX_FILE = "prefix.txt";
    private static final String OUTPUT_FILE = "output.txt";

    public static void main(String args[]) throws Exception {
        String currentDir = System.getProperty("user.dir");

        // Get words from file
        List<Word> words = new ArrayList<>();
        // Set system.io
        Path path = Paths.get(currentDir, "files", INPUT_FILE);
        File file = path.toFile();
        System.setIn(new FileInputStream(file));
        Scanner sc = new Scanner(System.in);
        while (sc.hasNextLine()) {
            words.add(new Word(sc.next(), sc.nextInt()));
        }

        // Create Work Rank object
        WordRank wr = new WordRank(words);

        // Get prefixes from file
        List<String> prefixes = new ArrayList<>();
        path = Paths.get(currentDir, "files", PREFIX_FILE);
        file = path.toFile();
        System.setIn(new FileInputStream(file));
        sc = new Scanner(System.in);
        while (sc.hasNext()) {
            prefixes.add(sc.next());
        }
        sc.close();

        // Set system.out
        Path output = Paths.get(currentDir, "files", OUTPUT_FILE);
        File outputFile = output.toFile();
        System.setOut(new PrintStream(outputFile));

        // Search
        for (String pre : prefixes) {
            System.out.println(pre + ":");
            List<Word> list = wr.search(pre);
            Collections.sort(list, (a, b)->a.rank - b.rank);
            for (Word word : list) {
                System.out.println(word.name + " " + word.rank);
            }
            System.out.println();
        }
    }
}
```
Input.
```raw
hello 6
world 10
wide 3
hell 4
worldwide 7
lyft 20
```
Prefix.
```raw
hell
world
```
Output.
```raw
hell:
hell 4
hello 6

world:
worldwide 7
world 10
```

## 3. Source Files
* [Source files of Word Rank on Github](https://github.com/jojozhuang/practice-problems/tree/master/word-rank)
