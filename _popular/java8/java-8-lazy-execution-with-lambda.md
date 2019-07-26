---
layout: tutorial
key: popular
title: "Java 8 - Lazy Execution with Lambda"
index: 1459
subcategory: java-java8
date: 2019-04-07
tags: [Lazy, Supplier]
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

## 6. References
* [A Little Lazy Lambda Tutorial](https://dzone.com/articles/a-little-lazy-lambda-tutorial)
