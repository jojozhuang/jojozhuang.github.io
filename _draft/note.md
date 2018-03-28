http://blog.bittiger.io/post233

### 1. Why should java package name be lowercase?
Package names are written in all lower case to avoid conflict with the names of classes or interfaces.


BlockChain
https://www.gitbook.com/book/yeasy/blockchain_guide/details

https://learnblockchain.cn/

Proof of Work
HyperLedger


Merkle Tree(Hash Tree)
Usage: compare two tree are same.
P198


java
1. hascode, equals
2. Comparable vs Comparator in Java
https://www.geeksforgeeks.org/comparable-vs-comparator-in-java/
To summarize, if sorting of objects needs to be based on natural order then use Comparable whereas if you sorting needs to be done on attributes of different objects, then use Comparator in Java. We cab create multiple separate Comparator classes to compare different members.
3. Generic type, Wildcard types.
4. How does the Java 'for each' loop work?
Two cases here. Case 1: Iterable interface.
```java
List<String> someList = new ArrayList<String>();
for (String item : someList) {
    System.out.println(item);
}
```
equivalent to:
```java
for (Iterator<String> i = someIterable.iterator(); i.hasNext();) {
    String item = i.next();
    System.out.println(item);
}
```
Case 2: indexable objects
```java
String[] someArray = new String[10];
for (String item : someArray) {
    System.out.println(item);
}
```
equivalent to:
```java
for(int i = 0; i < someArray.length; i++) {
   System.out.println(someArray[i]);
}
```
