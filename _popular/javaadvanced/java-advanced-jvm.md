---
layout: tutorial
key: popular
title: "Java Advanced - JVM - Draft"
index: 237
category: advanced
image: java.png
date: 2017-03-07
postdate: 2017-03-07
tags: [JVM]
---

> Java Virtual Machine

## 1. Static Block vs Initialization Block vs Constructor
### 1.1 Static Block
Code inside static block is executed only once.
```java
public class StaticBlockTest {
    static {
        //static block
        System.out.println("Hi, I'm a Static Block!");
    }
    public StaticBlockTest() {
        System.out.println("Constructor 1 Says Hi!");
    }
    public StaticBlockTest(String name) {
        System.out.println("Constructor 2 Says Hi!" + name);
    }

    public static void main(String[] args) {
        StaticBlockTest object1 = new StaticBlockTest();
        StaticBlockTest object2 = new StaticBlockTest();
        StaticBlockTest object3 = new StaticBlockTest("Johnny");
    }
}
```
Output.
```sh
Hi, I\'m a Static Block!
Constructor 1 Says Hi!
Constructor 1 Says Hi!
Constructor 2 Says Hi!Johnny
```
### 1.2 Initialization Block
* Instance Initialization Blocks run every time a new instance is created.
* Initialization Blocks run in the order they appear in the program.
* The Instance Initialization Block is invoked after the parent class constructor is invoked (i.e. after super() constructor call)

```java
public class InitializationBlockTest {
    {
        System.out.println("This is Initialization Block 1!");
    }
    {
        System.out.println("This is Initialization Block 2!");
    }
    public InitializationBlockTest() {
        System.out.println("Constructor 1 Says Hi!");
    }
    public InitializationBlockTest(String name) {
        System.out.println("Constructor 2 Says Hi!" + name);
    }

    public static void main(String[] args) {
        InitializationBlockTest object1 = new InitializationBlockTest();
        InitializationBlockTest object2 = new InitializationBlockTest();
        InitializationBlockTest object3 = new InitializationBlockTest("Johnny");
    }
}
```
Output.
```sh
This is Initialization Block 1!
This is Initialization Block 2!
Constructor 1 Says Hi!
This is Initialization Block 1!
This is Initialization Block 2!
Constructor 1 Says Hi!
This is Initialization Block 1!
This is Initialization Block 2!
Constructor 2 Says Hi!Johnny
```

### 1.3 Instance Initialization Block with parent class
```java
// Parent Class
public class Parent {
    {
        System.out.println("This is parent block");
    }

    Parent() {
        System.out.println("Parent Constructor is Called");
    }
}


// Child Class
public class Child extends Parent {
    {
        System.out.println("This is child block");
    }
    Child() {
        super();
        System.out.println("Child Constructor is Called");
    }
}

public class InitializationBlockTest2 {
    // main function
    public static void main(String[] args)
    {
        Child child = new Child();
    }
}
```
Output.
```sh
This is parent block
Parent Constructor is Called
This is child block
Child Constructor is Called
```
Order of execution in this case will be as follows:
* I. Instance Initialization Block of super class
* II. Constructors of super class
* III. Instance Initialization Blocks of the class
* IV. Constructors of the class

### 1.4 References
* [Static blocks in Java](https://www.geeksforgeeks.org/g-fact-79/)
* [Instance Initialization Block (IIB) in Java](https://www.geeksforgeeks.org/instance-initialization-block-iib-java/)

## 2. JVM

* [Java Virtual Machine Tutorial](https://www.tutorialspoint.com/java_virtual_machine/index.htm)
* [ClassNotFoundException vs. NoClassDefFoundError](https://dzone.com/articles/java-classnotfoundexception-vs-noclassdeffounderro)
