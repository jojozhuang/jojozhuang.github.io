---
layout: tutorial
key: programming
title: "Java 8 - Functional Composition"
index: 2356
subcategory: java-java8
date: 2017-05-05
tags: [Functional Composition]
---

> Functional Interfaces in Java 8.

## 1. Functional Composition
Functional composition is a technique to combine multiple functions into a single function which uses the combined functions internally. You can compose individual functions (typically one or more Java Lambda Expressions) into a single function yourself, but Java also comes with built-in support for functional composition to make the job easier for you.

## 2. Java Functional Composition Example
To get started, let me show you an example of Java functional composition. Here is a single function composed from two other functions:
```java
Predicate<String> startsWithA = (text) -> text.startsWith("A");
Predicate<String> endsWithX   = (text) -> text.endsWith("x");

Predicate<String> startsWithAAndEndsWithX =
        (text) -> startsWithA.test(text) && endsWithX.test(text);

String  input  = "A hardworking person must relax";
boolean result = startsWithAAndEndsWithX.test(input);
System.out.println(result);
```
This functional composition example first creates two Predicate implementations in the form of two lambda expressions. The first Predicate returns true if the String you pass to it as parameter starts with an uppercase a (A). The second Predicate returns true if the String passed to it ends with a lowercase x . Note, that the Predicate interface contains a single unimplemented method named test() which returns a boolean. It is this method the lambda expressions implement.

After creating the two basic functions, a third Predicate is composed, which calls the test() methods of the two first functions. This third function returns true if both of the basic functions return true, and false otherwise.

Finally, this example calls the composed function and prints out the result. Since the text both starts with an uppercase a (A) and ends with a lowercase x, the composed function will return true when called with the String "A hardworking person must relax".

## 3. Java Functional Composition Support
The example in the previous section showed you how to compose a new function from two other functions. Several of the functional interfaces in Java already has support for functional composition built into them. The functional composition support comes in the shape of default and static methods in the functional interfaces.

## 4. Predicate Composition
The Predicate interface (java.util.function.Predicate) contains a few methods that help you compose new Predicate instances from other Predicate instances.
### 4.1 and()
The Predicate `and()` method is a default method. The and() method is used to combine two other Predicate functions in the same way I showed in the beginning of this Java functional composition tutorial. Here is an example of functional composition with the Predicate and() method:
```java
Predicate<String> startsWithA = (text) -> text.startsWith("A");
Predicate<String> endsWithX   = (text) -> text.endsWith("x");

Predicate<String> composed = startsWithA.and(endsWithX);

String input = "A hardworking person must relax";
boolean result = composed.test(input);
System.out.println(result);
```
This Predicate composition example composes a new Predicate from two other Predicate instances using the and() method of one of the basic Predicate instances.

The composed Predicate will return true from it's test() method if both of the Predicate instances it was composed from also return true. In other words, if both Predicate one and Predicate two return true.
### 4.2 or()
The Predicate `or()` method is used to combine a Predicate instance with another, to compose a third Predicate instance. The composed Predicate will return true if either of the Predicate instances it is composed from return true, when their test() methods are called with same input parameter as the composed Predicate. Here is a Java Predicate or() functional composition example:
```java
Predicate<String> startsWithA = (text) -> text.startsWith("A");
Predicate<String> endsWithX   = (text) -> text.endsWith("x");

Predicate<String> composed = startsWithA.or(endsWithX);

String input = "A hardworking person must relax sometimes";
boolean result = composed.test(input);
System.out.println(result);
```
This Predicate or() functional composition example first creates two basic Predicate instances. Second, the example creates a third Predicate composed from the first two, by calling the or() method on the first Predicate and passing the second Predicate as parameter to the or() method.

The output of running the above example will be true because the first of the two Predicate instances used in the composed Predicate will return true when called with the String "A hardworking person must relax sometimes".

## 5. Function Composition
The Java Function interface (java.util.function.Function) also contains a few methods that can be used to compose new Function instances from existing ones.
### 5.1 compose()
The Java Function compose() method composes a new Function instance from the Function instance it is called on, and the Function instance passed as parameter to the compose() method.

The Function returned by compose() will first call the Function passed as parameter to compose(), and then it will call the Function which compose() was called on. This is easier to understand with an example, so here is a Java Function compose() example:
```java
Function<Integer, Integer> multiply = (value) -> value * 2;
Function<Integer, Integer> add      = (value) -> value + 3;

Function<Integer, Integer> addThenMultiply = multiply.compose(add);

Integer result1 = addThenMultiply.apply(3);
System.out.println(result1);
```
When called with the value 3, the composed Function will first call the add Function and then the multiply Function. The resulting calculation will be (3 + 3) * 2 and the result will be 12.
### 5.2 andThen()
The Java Function `andThen()` method works opposite of the compose() method. A Function composed with andThen() will first call the Function that andThen() was called on, and then it will call the Function passed as parameter to the andThen() method. Here is a Java Function andThen() example:
```java
Function<Integer, Integer> multiply = (value) -> value * 2;
Function<Integer, Integer> add      = (value) -> value + 3;

Function<Integer, Integer> multiplyThenAdd = multiply.andThen(add);

Integer result2 = multiplyThenAdd.apply(3);
System.out.println(result2);
```
This example first creates a multiply Function and an add Function. Then the andThen() method is called on the multiply Function to compose a new Function, passing the add Function as parameter to andThen().

Calling the Function composed by andThen() with the value 3 will result in the following calculation
3 * 2 + 3 and the result will be 9.

Note: As mentioned in the beginning, andThen() works opposite of compose(). Therefore, calling a.andThen(b) is actually the same as calling b.compose(a) .

## 6. References
* [Java Functional Composition](http://tutorials.jenkov.com/java-functional-programming/functional-composition.html)
