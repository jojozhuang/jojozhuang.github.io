---
layout: tutorial
key: programming
title: "Java 8 - Higher Order Functions"
index: 2354
subcategory: java-java8
date: 2017-05-03
tags: [Higher Order Functions]
---

> Functional programming in Java.

## 1. Higher Order Functions
A higher order function is a function that either takes a function (method) as parameter, or returns a function after its execution.

## 2. Sorting Collections
The first example of a higher order function is the Collections.sort() method which takes a Comparator as parameter. Here is an example:
```java
List<String> list = new ArrayList<>();
list.add("One");
list.add("Abc");
list.add("BCD");

Collections.sort(list, (String a, String b) -> {
    return a.compareTo(b);
});

System.out.println(list);
```

## 3. Sorting in Reverse Order
Here is another example of a higher order function. This time it is a function that returns another function as result. Here is the Java higher order function example:
```java
Comparator<String> comparator = (String a, String b) -> {
    return a.compareTo(b);
};

Comparator<String> comparatorReversed = comparator.reversed();

Collections.sort(list, comparatorReversed);

System.out.println(list);
```
This example first creates a Java lambda expression that implements the Comparator interface.

Second, the example calls the reversed() method on the Comparator lambda. The reversed() method returns a new Comparator lambda, which reverse the result returned by the first Comparator implementation.

Because the reversed() method returns a lambda (function), the reversed() method is considered a higher order function.

Third, the example sorts the List of Strings using the Collections.sort() method.

## 4. References
* [Java Higher Order Functions](http://tutorials.jenkov.com/java-functional-programming/higher-order-functions.html)
