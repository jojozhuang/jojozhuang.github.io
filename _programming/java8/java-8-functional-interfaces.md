---
layout: tutorial
key: programming
title: "Java 8 - Functional Interfaces"
index: 2355
subcategory: java-java8
date: 2017-05-04
tags: [Predicate, Supplier, Consumer]
---

> Functional Interfaces in Java 8.

## 1. Functional Interface
A `functional interface` in Java is an interface that contains only a single abstract (unimplemented) method. A functional interface can contain default and static methods which do have an implementation, in addition to the single unimplemented method.

Here is a Java functional interface example:
```java
public interface MyFunctionalInterface {
    public void execute();
}
```
The above counts as a functional interface in Java because it only contains a single method, and that method has no implementation. Normally a Java interface does not contain implementations of the methods it declares, but it can contain implementations in default methods, or in static methods. Below is another example of a Java functional interface, with implementations of some of the methods:
```java
public interface MyFunctionalInterface2{
    public void execute();

    public default void print(String text) {
        System.out.println(text);
    }

    public static void print(String text, PrintWriter writer) throws IOException {
        writer.write(text);
    }
}
```
The above interface still counts as a functional interface in Java, since it only contains a single non-implemented method.

## 2. Functional Interfaces Can Be Implemented by a Lambda Expression
A Java functional interface can be implemented by a Java Lambda Expression. Here is an example that implements the functional interface MyFunctionalInterface defined in the beginning of this Java functional interface tutorial:

MyFunctionalInterface lambda = () -> {
    System.out.println("Executing...");
}
A Java lambda expression implements a single method from a Java interface. In order to know what method the lambda expression implements, the interface can only contain a single unimplemented method. In other words, the interface must be a Java functional interface.

## 3. Built-in Functional Interfaces in Java 8
Java contains a set of functional interfaces designed for commonly occuring use cases, so you don't have to create your own functional interfaces for every little use case. Some of these built-in functional interfaces:
* Function
* Predicate
* UnaryOperator
* BinaryOperator
* Supplier
* Consumer

### 3.1 Function
The Java Function interface (java.util.function.Function) interface is one of the most central functional interfaces in Java. The Function interface represents a function (method) that takes a single parameter and returns a single value. Here is how the Function interface definition looks:
```java
public interface Function<T,R> {

    public <R> apply(T parameter);
}
```
The Function interface actually contains a few extra methods in addition to the methods listed above, but since they all come with a default implementation, you do not have to implement these extra methods.

The only method you have to implement to implement the Function interface is the `apply()` method. Here is a Function implementation example:
```java
public class AddThree implements Function<Long, Long> {

    @Override
    public Long apply(Long aLong) {
        return aLong + 3;
    }
}
```
This Function implementation implements the apply() method so it takes a Long as parameter, and returns a Long. Here is an example of using the above AddThree class:
```java
Function<Long, Long> adder = new AddThree();
Long result = adder.apply((long) 4);
System.out.println("result = " + result);
```
First this example creates a new AddThree instance and assigns it to a Function variable. Second, the example calls the apply() method on the AddThree instance. Third, the example prints out the result (which is 7).

You can also implement the Function interface using a Java lambda expression. Here is how that looks:
```java
Function<Long, Long> adderLambda = (value) -> value + 3;
Long resultLambda = adder.apply((long) 8);
System.out.println("resultLambda = " + resultLambda);
```
As you can see, the Function interface implementation is now inlined in the declaration of the adderLambda variable, rather than in a separate class. This is a bit shorter, plus we can see directly in the above code what it is doing.
### 3.2 Predicate
The Java Predicate interface, java.util.function.Predicate, represents a simple function that takes a single value as parameter, and returns true or false. Here is how the Predicate functional interface definition looks:
```java
public interface Predicate {
    boolean test(T t);
}
```
The Predicate interface contains more methods than the test() method, but the rest of the methods are default or static methods which you don't have to implement.

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
### 3.3 UnaryOperator
The Java UnaryOperator interface is a functional interface that represents an operation which takes a single parameter and returns a parameter of the same type. Here is an example of a Java UnaryOperator implementation:
```java
UnaryOperator<Person> unaryOperator =
        (person) -> { person.name = "New Name"; return person; };
```
The UnaryOperator interface can be used to represent an operation that takes a specific object as parameter, modifies that object, and returns it again - possibly as part of a functional stream processing chain.
### 3.4 BinaryOperator
The Java BinaryOperator interface is a functional interface that represents an operation which takes two parameters and returns a single value. Both parameters and the return type must be of the same type.

The Java BinaryOperator interface is useful when implementing functions that sum, subtract, divide, multiply etc. two elements of the same type, and returns a third element of the same type.

Here is an example implementation of the BinaryOperator interface:
```java
BinaryOperator<MyValue> binaryOperator =
        (value1, value2) -> { value1.add(value2); return value1; };
```
### 3.5 Supplier
The Java Supplier interface is a functional interface that represents an function that supplies a value of some sorts. The Supplier interface can also be thought of as a factory interface. Here is an example implementation of the Java Supplier interface:
```java
Supplier<Integer> supplier = () -> new Integer((int) (Math.random() * 1000D));
```
This Java Supplier implementation returns a new Integer instance with a random value between 0 and 1000.
### 3.6 Consumer
The Java Consumer interface is a functional interface that represents an function that consumes a value without returning any value. A Java Consumer implementation could be printing out a value, or writing it to a file, or over the network etc. Here is an example implementation of the Java Consumer interface:
```java
Consumer<Integer> consumer = (value) -> System.out.println(value);
```
This Java Consumer implementation prints the value passed as parameter to it out to System.out.

## 4. References
* [Java Functional Interfaces](http://tutorials.jenkov.com/java-functional-programming/functional-interfaces.html)
