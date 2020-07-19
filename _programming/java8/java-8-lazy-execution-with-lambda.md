---
layout: tutorial
key: programming
title: "Java 8 - Lazy Execution with Lambda"
index: 2359
subcategory: java-java8
date: 2019-04-07
tags: [Lazy, Supplier]
draft: true
---

> Functional Interfaces in Java 8.

## 1. Examples
modern java page 222.
```java
if (logger.isLoggable(Log.FINER)) {
    logger.finer("Problem: " + generateDiagnostic());
}

logger.log(Level.FINER, "Problem: " + generateDiagnostic());

public void log(Level level, Supplier<String> msgSupplier)
logger.log(Level.FINER, () -> "Problem: " + generateDiagnostic());
```

another example
```java
public class NonLazyCodeExample {
    public static void main(String args[]) {
        final int number = 4;
        final boolean computeResult = compute(number);
        final boolean processResult = process(number);
        if (computeResult && processResult) {
            System.out.println("TRUE");
        } else {
            System.out.println("FALSE");
        }
    }
    public static boolean compute(final int number) {
        System.out.println("computing number : " + number);
        return number > 5 ? true : false;
    }
    public static boolean process(final int number) {
        System.out.println("processing number : " + number);
        return number % 3 == 0 ? true : false;
    }
}
```

logging function in lambda.
```java
List<Integer> result = numbers.stream()
         .peek(x -> System.out.println("from stream: " + x))
         .map(x -> x + 17)
         .peek(x -> System.out.println("after map: " + x))
         .filter(x -> x % 2 == 0)
         .peek(x -> System.out.println("after filter: " + x))
         .limit(3)
         .peek(x -> System.out.println("after limit: " + x))
         .collect(toList());
```
This code produces useful output at each step of the pipeline:
```raw
from stream: 2
after map: 19
from stream: 3
after map: 20
after filter: 20
after limit: 20
from stream: 4
after map: 21
from stream: 5
after map: 22
after filter: 22
after limit: 22
```

## 6. References
* [A Little Lazy Lambda Tutorial](https://dzone.com/articles/a-little-lazy-lambda-tutorial)
