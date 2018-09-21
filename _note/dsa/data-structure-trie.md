---
layout: note
key: note
title: "Data Structure - Trie"
index: 307
category: dsa
image: /note/dsa.png
date: 2016-03-07
postdate: 2016-03-07
tags: [Trie, Prefix Tree]
---

> Introduce to use Trie for word search.

A Trie (pronounced try) or Prefix Tree is an ordered tree in which characters are stored at each node. Each path down the tree may
represent a word.

## 1. Usage of Trie
Very commonly, a trie is used to store the entire (English) language for quick prefix lookups. While a hash table can quickly look up whether a string is a valid word, however it cannot tell us if a string is a prefix of any valid words. A trie can do this very quickly.

Below picture shows how words are stored in trie. This trie stores five words: dog, dot, pump, fat, fire. Each node has a hashmap and a flag to indicate whether the current node is a leaf(a complete path for a word).
![image](/public/notes/data-structure-trie/trie.png){:width="800px"}

Common operations on Trie.
* Search
* Insertion
* Deletion

## 2. Search
Given a trie as follows, search word 'dot'.
![image](/public/notes/data-structure-trie/search.png){:width="700px"}
There are two search approaches in trie.
* Find whether the given word exists.
* Find whether any word starts with the given prefix exists.

Both approaches have the similar search pattern. To search a given word in Trie, we first convert the word to chars. Then start comparing each of them with trie node from root. If the current character is present in the node, move forward to its children. Recursively doing this until all of the characters are found.

Trie is constructed with nodes recursively. The following example shows how Trie node is defined.
```java
public class TrieNode {
    public Map<Character, TrieNode> children;
    public boolean leaf;

    public TrieNode() {
        children = new HashMap<Character, TrieNode>();
        leaf = false;
    }
}
```
### 2.1 Searching Prefix
```java
// Return true if there is any word in trie that starts with the given prefix
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
### 2.2 Searching Entire Word
Similar with prefix search, add additional check whether the node is leaf.
```java
// Return true if the word is in trie
public boolean search(String word) {
    TrieNode tn = searchNode(word);
    if (tn != null && tn.leaf) {
        return true;
    } else {
        return false;
    }
}
```

## 3. Insertion
Given a trie as follows, insert new word 'firm' into this trie.
![image](/public/notes/data-structure-trie/insert.png)
We start searching the given word from root till we cannot find one particular character. Then we construct new trie nodes recursively for the rest characters. In the end, set the leaf attribute of the last node to true.
```java
// Insert a word into trie
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

## 4. Deletion
There are three cases when deleting a word from Trie.
* Word is prefix of other words.
* Word has prefix of other words.
* Word is unique, neither it is prefix of other words, nor it has prefix of other words.

### 4.1 Word Is Prefix of Other Words
Word 'do' is the prefix of word 'dot' and 'dog'.
![image](/public/notes/data-structure-trie/deletedo.png)
The solution is easy, just unmark the leaf node. The leaf node for word 'do' is node 'o'.
### 4.2 Word Has Prefix of Other Words
Word 'fat' has same prefix with word 'fire'. They share the prefix 'f'.
![image](/public/notes/data-structure-trie/deletefat.png)
If word has prefix of other words, then delete nodes from prefix to end of the word.
### 4.3 Word Is Unique
Word 'pump' is a standalone word. It doesn't share any prefix with others.
![image](/public/notes/data-structure-trie/deletepump.png)
If word neither is prefix of other words, nor has prefix of other words, then just delete all the nodes.

The following implementation covers all above scenarios.
```java
public boolean delete(String word) {
    TrieNode current = root;
    TrieNode lastBranchNode = null;
    Character lastBrachChar = null;

    for (int i = 0; i < word.length(); i++){
        char ch = word.charAt(i);
        if (current.children.containsKey(ch)){
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
```

## 5. Trie Variants

## 6. Source Files
* [Source files for Trie on GitHub](https://github.com/jojozhuang/DataStructure/tree/master/Trie)
* [Trie Diagrams(draw.io) in Google Drive](https://drive.google.com/file/d/1nU4ABZxZnVZytgbyiFuAZn7k4dGJxwg1/view?usp=sharing)

## 7. Reference
* [Trie - Insert and Search](http://www.geeksforgeeks.org/trie-insert-and-search/)
* [Trie - Delete](https://www.geeksforgeeks.org/trie-delete/)
* [Trie Data Structure Video on Youtube](https://www.youtube.com/watch?v=AXjmTQ8LEoI&t=272s)
* [The Trie Data Structure (Prefix Tree)](https://medium.freecodecamp.org/trie-prefix-tree-algorithm-ee7ab3fe3413)
