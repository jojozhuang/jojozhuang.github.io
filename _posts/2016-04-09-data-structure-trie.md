---
layout: post
key: blog
title: "Data Structure - Trie"
date: 2016-04-09
tags: [Word Search]
---

> A Trie (pronounced try) or Prefix Tree is an ordered tree in which characters are stored at each node. Each path down the tree may
represent a word.

## 1. Usage of Trie
Very commonly, a trie is used to store the entire (English) language for quick prefix lookups. While a hash table can quickly look up whether a string is a valid word, however it cannot tell us if a string is a prefix of any valid words. A trie can do this very quickly.

Below picture shows how words are stored in trie. This trie stores five words: dog, dot, pump, fat, fire. Each node has a hashmap and a flag to indicate whether the current node is a leaf(a complete path for a word).
![MIME Type](/public/pics/2017-04-09/trie.png)  

## 2. Implementing Trie
### 2.1 Trie Node Definition
```java
class TrieNode {
    public Map<Character, TrieNode> children;
    public boolean leaf; // isWord, isLeaf, isComplete, endOfWord

    public TrieNode() {
        children = new HashMap<Character, TrieNode>();
        leaf = false;
    }
}
```

### 2.2 Trie Definition
```java
private TrieNode root;

public Trie() {
    root = new TrieNode();
}
```

### 2.2 Inserting Word
The below picture shows how trie looks like after word 'dog' is inserted to trie.
![MIME Type](/public/pics/2017-04-09/insert.png)  

And here is the code for 'insert' method.
```java
// Inserts a word into the trie.
public void insert(String word) {
    TrieNode current = root;

    for (int i = 0; i < word.length(); i++){
        char ch = word.charAt(i);
        if (!current.children.containsKey(ch)){
            current.children.put(ch, new TrieNode());
        }
        current = current.children.get(ch);
    }

    current.leaf = true;
}
```
## 3. Searching in Trie
There are two kinds of search in trie.
* Find whether the given word exists.
* Find whether any word starts with the given prefix exists.

### 3.1 Searching Prefix
```java
// Returns if there is any word in the trie that starts with the given prefix.
public boolean startsWith(String prefix) {
    if (searchNode(prefix) == null) {
        return false;
    } else {
        return true;
    }
}

private TrieNode searchNode(String str){
    TrieNode current = root;

    for (int i = 0; i < str.length(); i++){
        char ch = str.charAt(i);
        if (current.children.containsKey(ch)){
            current = current.children.get(ch);
        } else {
            return null;
        }
    }

    return current;
}
```

### 3.2 Searching Entire Word
Similar with prefix search, add additional check whether the node is leaf.
```java
// Returns if the word is in the trie.
public boolean search(String word) {
    TrieNode tn = searchNode(word);
    if (tn != null && tn.leaf) {
        return true;
    } else {
        return false;
    }
}
```
## 4. Deletion in Trie
### 4.1 Deleting Word
### 4.2 Deleting Words with Prefix
todo

## 5. Reference
* [Trie 1 Insert and Search](http://www.geeksforgeeks.org/trie-insert-and-search/)
* [Trie Data Structure Video on Youtube](https://www.youtube.com/watch?v=AXjmTQ8LEoI&t=272s)
* [The Trie Data Structure (Prefix Tree)](https://medium.freecodecamp.org/trie-prefix-tree-algorithm-ee7ab3fe3413)
