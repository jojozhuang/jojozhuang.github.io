---
layout: tutorial
key: programming
title: "Design Pattern - Singleton"
index: 2902
subcategory: design-pattern
date: 2016-05-02
tags: [Singleton Pattern]
---

> Creational Pattern: Singleton Pattern.

## 1. Singleton Pattern
The Singleton design pattern is designed to restrict instantiation of a class to one object. The singleton pattern is implemented by creating a class with a method that creates a new instance of the object only if one does not already exist. If one does exist, it returns a reference to the object that already exists. If not, a new instance is created and a reference to that new object is returned. To make sure that the object cannot be instantiated any other way the constructor is made either private or protected.

The 2 key points that are supported in the Singleton pattern are:
* Create a class that can only have one instance and allow the class to manage the one instance
* Provide a global access point to the instance

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

## 3. Optimization with Thread-safe
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
