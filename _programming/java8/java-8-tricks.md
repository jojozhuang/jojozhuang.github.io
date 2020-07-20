---
layout: tutorial
key: programming
title: "Java 8 - Tricks"
index: 2351
subcategory: java-java8
date: 2017-05-01
tags: [Lamda Expression]
---

> New features in java 8

## 1. Overview
Verbose code for sorting.
```java
Collections.sort(inventory, new Comparator<Apple>() {
    public int compare(Apple a1, Apple a2){
        return a1.getWeight().compareTo(a2.getWeight());
    }
});
```
With Lamda expression.
```java
inventory.sort(comparing(Apple::getWeight));
```

## 2. Core Feature/Concepts
* stream processing
* behavior parameterization, functional programming
* default methods in interface
* method reference: `::` syntax
* anonymous functions, lambda expression
* functional interface: an interface that specifies exactly one abstract method.

![image](/assets/images/programming/2351/lambda-expression.png){:width="700px"}

A lambda expression is composed of parameters, an arrow, and a body.

```java
1 ()->{}
2 () -> "Raoul"
3 () -> { return "Mario"; }
4 (Integer i) -> return "Alan" + i;
5 (String s) -> { "Iron Man"; }
```
4 and 5 are invalid lambdas; the rest are valid. Details:
* 1 This lambda has no parameters and returns void. It’s similar to a method with an empty body:publicvoidrun(){}. Fun fact: this is usually called the burger lambda. Take a look at it from the side, and you will see it has a burger shape with two buns.
* 2 This lambda has no parameters and returns a String as an expression.
* 3 This lambda has no parameters and returns a String (using an explicit
return statement, within a block).
* 4 return is a control-flow statement. To make this lambda valid, curly braces
are required as follows:(Integeri)->{return"Alan"+i;}.
* 5 “Iron Man” is an expression, not a statement. To make this lambda valid, you can remove the curly braces and semicolon as follows:(Strings)->"Iron Man". Or if you prefer, you can use an explicit return statement as follows:
(String s) -> { return "Iron Man"; }.

Use case | Examples of lambdas
---------|---------------------
A boolean expression | (List<String> list) -> list.isEmpty()
Creating objects  |  () -> new Apple(10)
Consuming from an object   |  (Apple a) -> { System.out.println(a.getWeight()); }
Select/extract from an object | (String s) -> s.length()
 Combine two values  |  (int a, int b) -> a * b
Compare two objects  |  (Apple a1, Apple a2) -> a1.getWeight().compareTo(a2.getWeight())




Functional Interface.

Which of these interfaces are functional interfaces?
```java
public interface Adder {
    int add(int a, int b);
}
public interface SmartAdder extends Adder {
    int add(double a, double b);
}
public interface Nothing {
}
```
Answer:
* Only `Adder` is a functional interface.
* `SmartAdder` isn’t a functional interface because it specifies two abstract methods
called add (one is inherited from Adder).
* `Nothing` isn’t a functional interface because it declares no abstract method at all.


Collection
* removeIf
* replaceAll
* Map.forEach
* Entry.comparingByValue
* Entry.comparingByKey


Null check. Optional Class
```java
public String getCarInsuranceName(Person person) {
    if (person != null) {
        Car car = person.getCar();
        if (car != null) {
            Insurance insurance = car.getInsurance();
            if (insurance != null) {
              return insurance.getName();
            }
        }
    }
    return "Unknown";
}
```
java.util.Optional<T>

Manipulating a stream of optionals

```java
public Set<String> getCarInsuranceNames(List<Person> persons) {
   return persons.stream()

   Collect the result Strings into a Set to obtain only the distinct values.
   .map(Person::getCar)
   .map(optCar -> optCar.flatMap(Car::getInsurance))
   .map(optIns -> optIns.map(Insurance::getName))
   .flatMap(Optional::stream)
   .collect(toSet());
```


## 11. References
* [Java 8 Optional In Depth](https://www.mkyong.com/java8/java-8-optional-in-depth/)
