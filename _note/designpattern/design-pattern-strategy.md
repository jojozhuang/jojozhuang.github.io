---
layout: note
key: note
title: "Design Pattern - Strategy"
index: 528
category: designpattern
image: /note/designpattern.png
date: 2016-05-28
postdate: 2016-05-28
tags: [Strategy Pattern]
---

> Behavioral Pattern: Strategy Pattern.

## 1. The Strategy Pattern
As the Strategy pattern dictates, we encapsulate each of the identified algorithms in separate Impl classes, and make them interchangeable. The Strategy design pattern embodies two fundamental tenets of object-oriented (OO) design:
* Encapsulate the Concept that Varies
* Program to an Interface, Not an Implementation

Use the strategy pattern when:
* Many related classes differ only in their behavior.
* You need different variants of an algorithm.
* An algorithm uses data that client shouldn't know about.
* You need to vary a behavior’s algorithm at run-time.

## 2. Implementation
```java
// Define class as final, so it can't be inherited
public final class Singleton {
    private static Singleton instance;

    // Declare a private constructor to prevent class instances from being created in any other places
    private Singleton() {}

    // Use a static method to get instance of this class
    public static Singleton getInstance() {
        if (instance == null) {
            instance = new Singleton();
        }

        return instance;
    }
}
```
* Declares class “Singleton” as final, so that subclasses cannot be created that could provide multiple instantiations.
* Declare a private constructor – only the Singleton class itself can instantiate a Singleton object using this constructor.
* Declares a static reference to a Singleton object and invokes the private constructor.

## 3. Implementation(Thread-safe)
```java
// Define class as final, so it can't be inherited
public final class Singleton {
    private volatile static Singleton instance;

    // Declare a private constructor to prevent class instances from being created in any other places
    private Singleton() {}

    // Use a static method to get object of this class
    public static synchronized Singleton getInstance() {
        if (instance == null) {
            synchronized (Singleton.class) {
                if (instance == null) { // Double-Check!
                    instance = new Singleton();
                }
            }
        }

        return instance;
    }
}
```
* For variables marked with the “volatile” keyword, threads will be required to access the value of “ourInstance” from main memory, rather than access cached variable values in local (thread) memory.
* Double check to see if instance is null or not.

## 4. Source Files
* [Source files for Singleton Pattern on GitHub](https://github.com/jojozhuang/design-patterns-java/tree/master/design-pattern-singleton)
