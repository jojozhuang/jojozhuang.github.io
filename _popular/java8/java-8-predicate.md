---
layout: tutorial
key: popular
title: "Java 8 - Predicate"
index: 1458
subcategory: java-java8
date: 2017-04-07
tags: [Predicate]
---

> BlockingQueue interface and its implementations.

## 1. Predicate
The Java `Predicate` interface, java.util.function.Predicate, represents a simple function that takes a single value as parameter, and returns true or false. Here is how the Predicate functional interface definition looks:
```java
public interface Predicate {
    boolean test(T t);
}
```
The Predicate interface contains more methods than the `test()` method, but the rest of the methods are default or static methods which you don't have to implement.

You can implement the Predicate interface using a class, like this:
```java
public class CheckForNull implements Predicate {
    @Override
    public boolean test(Object o) {
        return o != null;
    }
}
```
You can also implement the Java Predicate interface using a Lambda expression. Here is an example of implementing the Predicate interface using a Java lambda expression:
```java
Predicate predicate = (value) -> value != null;
```
This lambda implementation of the Predicate interface effectively does the same as the implementation above that uses a class.

## 2. Predicate + Iterator
Implement an iterator with predicate interface.
### 2.1 Custom Predicate
Create a custom predicate, which returns true only if the given value is larger than 5.
```java
import java.util.function.Predicate;

public class BiggerThanFivePredicate implements Predicate<Integer> {
    @Override
    public boolean test(Integer val) {

        Integer five = 5;

        return val > five;
    }
}
```
### 2.2 Predicate Iterator
Create a class, implement Iterator interface. Override the `hasNext()` and `next()` method. Use the custom predicate to filter out unmatched data.
```java
import java.util.Iterator;

public class PredicateIterator implements Iterator<Integer> {

    private Iterator<Integer> itr;
    private BiggerThanFivePredicate btf;
    private Integer next;
    public PredicateIterator(Iterator<Integer> itr, BiggerThanFivePredicate btf) {
        this.itr = itr;
        this.btf = btf;
    }

    @Override
    public boolean hasNext(){
        if (next != null) {
            return true;
        }

        while (itr.hasNext()) {
            Integer num = itr.next();
            if (btf.test(num)) {
                next = num;
                return true;
            }
        }

        return false;
    }

    @Override
    public Integer next() {
        if (hasNext()) {
            int temp = next;
            next = null;
            return temp;
        }

        return null;
    }
}
```
Test PredicateIterator.
```java
public static void main(String args[]) {
    List<Integer> list = new ArrayList<>(Arrays.asList(new Integer[]{3,5,6,8,2,4,7,1}));
    BiggerThanFivePredicate btf = new BiggerThanFivePredicate();
    PredicateIterator iterator = new PredicateIterator(list.iterator(), btf);

    while (iterator.hasNext()) {
        Integer num = iterator.next();
        System.out.println(num);
    }
}
```
Output.
```java
6
8
7
```

## 3. Source Files
* [Source files for Java 8 Predicate on GitHub](https://github.com/jojozhuang/java-programming/tree/master/java-java8-predicate)

## 4. References
* [Java Predicate](http://zetcode.com/java/predicate/)
* [Java Predicate – Java 8 Predicate](https://www.journaldev.com/17072/java-predicate)
* [Java 8 - Functional Interfaces](https://www.tutorialspoint.com/java8/java8_functional_interfaces.htm)
