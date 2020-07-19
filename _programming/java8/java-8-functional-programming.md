---
layout: tutorial
key: programming
title: "Java 8 - Functional programming"
index: 2353
subcategory: java-java8
date: 2017-05-02
tags: [Functional programming]
---

> Functional programming in Java.

## 1. Functional Programming Basics
Functional programming contains the following key concepts:
* Functions as first class objects
* Pure functions
* Higher order functions

Pure functional programming has a set of rules to follow too:
* No state
* No side effects
* Immutable variables
* Favour recursion over looping

## 2. Functions as First Class Objects
In the functional programming paradigm, functions are first class objects in the language. That means that you can create an "instance" of a function, as have a variable reference that function instance, just like a reference to a String, Map or any other object. Functions can also be passed as parameters to other functions.

In Java, methods are not first class objects. The closest we get is Java Lambda Expressions.

## 3. Pure Functions
A function is a pure function if:
* The execution of the function has no side effects.
* The return value of the function depends only on the input parameters passed to the function.

Here is an example of a pure function (method) in Java:
```java
public class ObjectWithPureFunction{

    public int sum(int a, int b) {
        return a + b;
    }
}
```
Notice how the return value of the sum() function only depends on the input parameters. Notice also that the sum() has no side effects, meaning it does not modify any state (variables) outside the function anywhere.

Contrarily, here is an example of a non-pure function:
```java
public class ObjectWithNonPureFunction{
    private int value = 0;

    public int add(int nextValue) {
        this.value += nextValue;
        return this.value;
    }
}
```
Notice how the method add() uses a member variable to calculate its return value, and it also modifies the state of the value member variable, so it has a side effect.

## 4. Higher Order Functions
A function is a higher order function if at least one of the following conditions are met:
* The function takes one or more functions as parameters.
* The function returns another function as result.

In Java, the closest we can get to a higher order function is a function (method) that takes one or more lambda expressions as parameters, and returns another lambda expression. Here is an example of a higher order function in Java:
```java
public class HigherOrderFunctionClass {

    public <T> IFactory<T> createFactory(IProducer<T> producer, IConfigurator<T> configurator) {
        return () -> {
           T instance = producer.produce();
           configurator.configure(instance);
           return instance;
        }
    }
}
```
Notice how the createFactory() method returns a lambda expression as result. This is the first condition of a higher order function.

Notice also that the createFactory() method takes two instances as parameters which are both implementations of interfaces (IProducer and IConfigurator). Java lambda expressions have to implement a functional interface, remember?

Imagine the interfaces looks like this:
```java
public interface IFactory<T> {
   T create();
}
public interface IProducer<T> {
   T produce();
}
public interface IConfigurator<T> {
   void configure(T t);
}
```
As you can see, all of these interfaces are functional interfaces. Therefore they can be implemented by Java lambda expressions - and therefore the createFactory() method is a higher order function.

## 5. No State
As mentioned in the beginning of this tutorial, a rule of the functional programming paradigm is to have no state. By "no state" is typically meant no state external to the function. A function may have local variables containing temporary state internally, but the function cannot reference any member variables of the class or object the function belongs to.

Here is an example of a function that uses no external state:
```java
public class Calculator {
    public int sum(int a, int b) {
       return a + b;
    }
}
```
Contrarily, here is an example of a function that uses external state:
```java
public class Calculator {
    private int initVal = 5;
    public int sum(int a) {
       return initVal + a;
    }
}
```
This function clearly violates the no state rule.

## 6. No Side Effects
Another rule in the functional programming paradigm is that of no side effects. This means, that a function cannot change any state outside of the function. Changing state outside of a function is referred to as a side effect.

State outside of a function refers both to member variables in the class or object the function, and member variables inside parameters to the functions, or state in external systems like file systems or databases.

## 7. Immutable Variables
A third rule in the functional programming paradigm is that of immutable variables. Immutable variables makes it easier to avoid side effects.

## 8. Favour Recursion Over Looping
A fourth rule in the functional programming paradigm is to favour recursion over looping. Recursion uses function calls to achieve looping, so the code becomes more functional.

Another alternative to loops is the Java Streams API. This API is functionally inspired.

## 9. Functional Interfaces
A functional interface in Java is an interface that only has one abstract method. By an abstract method is meant only one method which is not implemented. An interface can have multiple methods, e.g. default methods and static methods, both with implementations, but as long as the interface only has one method that is not implemented, the interface is considered a functional interface.

Here is an example of a functional interface:
```java
public interface MyInterface {
    public void run();
}
```
Here is another example of a functional interface with a default method and a static method too:
```java
public interface MyInterface2 {
    public void run();

    public default void doIt() {
        System.out.println("doing it");
    }

    public static void doItStatically() {
        System.out.println("doing it statically");
    }
}
```
Notice the two methods with implementations. This is still a functional interface, because only run() is not implemented (abstract). However, if there were more methods without implementation, the interface would no longer be a functional interface, and could thus not be implemented by a Java lambda expression.

## 10. References
* [Java 101: Functional programming for Java developers, Part 1](https://www.javaworld.com/article/3314640/java-101-functional-programming-for-java-developers-part-1.html)
* [Java Functional Programming](http://tutorials.jenkov.com/java-functional-programming/index.html)
