---
layout: tutorial
key: programming
title: "Java Core - Static Block and Initialization Block"
index: 2321
subcategory: java-core
date: 2017-04-08
tags: [Static Block, Initialization Block, IIB]
---

> Static block and initialization block in java.

## 1. Static Block
Java supports a special block, called `static block` (also called static clause) which can be used for static initializations of a class. This code inside static block is executed **only once**: the first time you make an object of that class or the first time you access a static member of that class (even if you never make an object of that class).

Example.
```java
public class StaticBlockExample {
    static {
        //static block
        System.out.println("Hi, I'm a Static Block!");
    }

    public StaticBlockExample() {
        System.out.println("Hi, I'm Constructor 1!");
    }

    public StaticBlockExample(String name) {
        System.out.println("Hi, " + name + "! I'm Constructor 2!");
    }

    public static void main(String[] args) {
        StaticBlockExample object1 = new StaticBlockExample();
        StaticBlockExample object2 = new StaticBlockExample("Johnny");
    }
}
```
Output.
```raw
Hi, I'm a Static Block!
Hi, I'm Constructor 1!
Hi, Johnny! I'm Constructor 2!
```
* The static block is executed before any constructor.

## 2. Initialization Block
Instance Initialization Blocks or `IIB` are used to initialize instance variables. IIBs are executed before constructors. They run each time when object of the class is created.
- Initialization blocks are executed whenever the class is initialized and before constructors are invoked.
- They are typically placed above the constructors within braces.
- It is not at all necessary to include them in your classes.

### 2.1 Single Instance Initialization Block
```java
public class InitializationBlockExample {
    {
        System.out.println("This is Initialization Block!");
    }
    public InitializationBlockExample() {
        System.out.println("Hi, I'm Constructor!");
    }

    public static void main(String[] args) {
        InitializationBlockExample object1 = new InitializationBlockExample();
    }
}
```
Output.
```raw
This is Initialization Block!
Hi, I'm Constructor!
```

### 2.2 Multiple Instance Initialization Blocks
We can also have multiple IIBs in a single class. If compiler finds multiple IIBs, then they all are executed from top to bottom.
```java
public class InitializationBlockExample2 {
    {
        System.out.println("This is Initialization Block 1!");
    }
    {
        System.out.println("This is Initialization Block 2!");
    }
    public InitializationBlockExample2() {
        System.out.println("Hi, I'm Constructor 1!");
    }
    public InitializationBlockExample2(String name) {
        System.out.println("Hi, " + name + "! I'm Constructor 2!");
    }

    public static void main(String[] args) {
        InitializationBlockExample2 object1 = new InitializationBlockExample2();
        InitializationBlockExample2 object3 = new InitializationBlockExample2("Johnny");
    }
}
```
Output.
```raw
This is Initialization Block 1!
This is Initialization Block 2!
Hi, I'm Constructor 1!
This is Initialization Block 1!
This is Initialization Block 2!
Hi, Johnny! I'm Constructor 2!
```
* Initialization block is executed each time when class is instantiated.

### 2.3 Instance Initialization Block with Parent Class
Instance initialization block code runs immediately after the call to super() in a constructor. The compiler executes parents class’s IIB before executing current class’s IIBs.

```java
// Parent.java
public class Parent {
    {
        System.out.println("This is parent block!");
    }

    Parent() {
        System.out.println("Parent Constructor is Called.");
    }
}

// Child.java
public class Child extends Parent {
    {
        System.out.println("This is child block!");
    }

    public Child() {
        super();
        System.out.println("Child Constructor is Called.");
    }
}

// InitializationBlockExample3.java
public class InitializationBlockExample3 {
    // main function
    public static void main(String[] args) {
        Child child = new Child();
    }
}
```
Output.
```raw
This is parent block!
Parent Constructor is Called.
This is child block!
Child Constructor is Called.
```
* Parent’s IIB is executed before Child's IIB.

## 3. Source Files
* [Source files for Java Static Block on GitHub](https://github.com/jojozhuang/java-programming/tree/master/java-core-staticblock)

## 4. References
* [Java Static Block](https://www.geeksforgeeks.org/g-fact-79/)
* [Instance Initialization Block (IIB) in Java](https://www.geeksforgeeks.org/instance-initialization-block-iib-java/)
