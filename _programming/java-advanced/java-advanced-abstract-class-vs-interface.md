---
layout: tutorial
key: programming
title: "Java Advanced - Abstract Class Vs Interface"
index: 2461
subcategory: java-advanced
date: 2017-04-01
tags: [Abstract Class, Interface]
---

> Abstract Class, Interface and their difference.

## 1. Abstract Class in Java
Abstract class in Java is similar to interface except that it can contain default method implementation. An abstract class can have an abstract method without body and it can have methods with implementation also.
### 1.1 Example
Base class for shape.
```java
public abstract class BaseShape {
    abstract void draw();
    abstract double area();
}
```
Circle extends BaseShape.
```java
public class CircleImp extends BaseShape {
    private double radius;

    public CircleImp(double radius) {
        this.radius = radius;
    }

    @Override
    public void draw() {
        System.out.println("Drawing circle...");
    }

    @Override
    public double area() {
        return this.radius * this.radius * Math.PI;
    }
}
```
Rectangle extends BaseShape.
```java
public class RectangleImp extends BaseShape {
    private double width;
    private double height;

    public RectangleImp(double width, double height){
        this.width = width;
        this.height = height;
    }

    @Override
    public void draw() {
        System.out.println("Drawing rectangle...");
    }

    @Override
    public double area() {
        return this.height * this.width;
    }
}
```
Test.
```java
// programming for interfaces not implementation
BaseShape shape = new CircleImp(5);
shape.draw();
System.out.println("Area = " + shape.area());

// switching from one implementation to another easily
shape = new RectangleImp(2,8);
shape.draw();
System.out.println("Area = " + shape.area());
```
Output.
```raw
Drawing circle...
Area = 78.53981633974483
Drawing rectangle...
Area = 16.0
```
### 1.2 Important Points about Interface in Java
* `abstract` keyword is used to create an `abstract class` in java.
* Abstract class in java can’t be instantiated.
* We can use abstract keyword to create an `abstract method`, an abstract method doesn’t have body.
* If a class have abstract methods, then the class should also be abstract using abstract keyword, else it will not compile.
* It’s not necessary for an abstract class to have abstract method. We can mark a class as abstract even if it doesn’t declare any abstract methods.
* If abstract class doesn’t have any method implementation, its better to use interface because java doesn’t support multiple class inheritance.
* The subclass of abstract class in java must implement all the abstract methods unless the subclass is also an abstract class.
* All the methods in an interface are implicitly abstract unless the interface methods are static or default. Static methods and default methods in interfaces are added in Java 8, for more details read Java 8 interface changes.
* Java Abstract class can implement interfaces `without` even providing the implementation of interface methods.
* Java Abstract class is used to provide common method implementation to all the subclasses or to provide default implementation.
* We can run abstract class in java like any other class if it has `main()` method.

## 2. Interface in Java
Interface in java provide a way to achieve abstraction. Java interface is also used to define the contract for the subclasses to implement.
### 2.1 Example
Shape interface.
```java
public interface Shape {
    void draw();
    double area();
}
```
Circle class implements Shape interface.
```java
public class Circle implements Shape {
    private double radius;

    public Circle(double radius) {
        this.radius = radius;
    }

    @Override
    public void draw() {
        System.out.println("Drawing circle...");
    }

    @Override
    public double area() {
        return this.radius * this.radius * Math.PI;
    }
}
```
Rectangle class implements Shape interface.
```java
public class Rectangle implements Shape {
    private double width;
    private double height;

    public Rectangle(double width, double height){
        this.width = width;
        this.height = height;
    }

    @Override
    public void draw() {
        System.out.println("Drawing rectangle...");
    }

    @Override
    public double area() {
        return this.height * this.width;
    }
}
```
Test.
```java
// programming for interfaces not implementation
Shape shape = new Circle(5);
shape.draw();
System.out.println("Area = " + shape.area());

// switching from one implementation to another easily
shape = new Rectangle(2,8);
shape.draw();
System.out.println("Area = " + shape.area());
```
Output.
```raw
Drawing circle...
Area = 78.53981633974483
Drawing rectangle...
Area = 16.0
```
### 2.2 Important Points about Interface in Java
* `interface` is the code that is used to create an interface in java.
* We can’t instantiate an interface in java.
* Interface provides absolute abstraction, no method implementations.
* Interfaces can’t have constructors because we can’t instantiate them and interfaces can’t have a method with body.
* By default any attribute of interface is `public`, `static` and `final`, so we don’t need to provide access modifiers to the attributes but if we do, compiler doesn’t complain about it either.
* By default interface methods are implicitly `abstract` and `public`, it makes total sense because the method don’t have body and so that subclasses can provide the method implementation.
* An interface can’t extend any class but it can extend another interface. Java provides multiple inheritance in interfaces, what is means is that an interface can extend multiple interfaces.
* `implements` keyword is used by classes to implement an interface.
* A class implementing an interface `must` provide implementation for all of its method `unless` it’s an abstract class.

## 3. Difference between Abstract Class and Interface
* `abstract` keyword is used to create an abstract class and it can be used with methods also whereas `interface` keyword is used to create interface and it can’t be used with methods.
* Subclasses use `extends` keyword to extend an abstract class and they need to provide implementation of all the declared methods in the abstract class unless the subclass is also an abstract class whereas subclasses use `implements` keyword to implement interfaces and should provide implementation for all the methods declared in the interface.
* Abstract classes can have methods with implementation whereas interface provides absolute abstraction and can’t have any method implementations.
* Abstract classes can have constructors but interfaces can’t have constructors.
* Abstract class have all the features of a normal java class except that we can’t instantiate it. We can use abstract keyword to make a class abstract but interfaces are a completely different type and can have only public static final constants and method declarations.
* Abstract classes methods can have access modifiers as public, private, protected, static but interface methods are implicitly public and abstract, we can’t use any other access modifiers with interface methods.
* A subclass can extend only one abstract class but it can implement multiple interfaces.
* Abstract classes can extend other class and implement interfaces but interface can only extend other interfaces.
* We can run an abstract class if it has `main()` method but we can’t run an interface because they can’t have main method implementation.
* Interfaces are used to define contract for the subclasses whereas abstract class also define contract but it can provide other methods implementations for subclasses to use.

## 4. Interface or Abstract Class
Whether to chose between Interface or abstract class for providing contract for subclasses is a design decision and `depends` on many factors, lets see when Interfaces are best choice and when can we use abstract classes.
* Java doesn’t support multiple class level inheritance, so every class can extend only one superclass. But a class can implement multiple interfaces. So most of the times Interfaces are a good choice for providing base for class hierarchy and contract. Also coding in terms of interfaces is one of the best practices for coding in java.
* If there are a lot of methods in the contract, then abstract class is more useful because we can provide default implementation for some of the methods that are common for all the subclasses. Also if subclasses don’t need to implement particular method, they can avoid providing the implementation but in case of interface, the subclass will have to provide implementation for all the methods even though it’s of no use and implementation is just empty block.
* If our base contract keeps on changing then interfaces can cause issues because we can’t declare additional methods to the interface without changing all the implementation classes, with abstract class we can provide the default implementation and only change the implementation classes that are actually going to use the new methods.

## 5. Use Abstract classes and Interface both
Actually most of the times, using Interfaces and abstract classes together is the best approach for designing a system, for example in JDK `java.util.List` is an interface that contains a lot of methods, so there is an abstract class `java.util.AbstractList` that provides skeletal implementation for all the methods of List interface so that any subclass can extend this class and implement only required methods.

We should always start with an interface as base and define methods that every subclasses should implement and then if there are some methods that only certain subclass should implement, we can extend the base interface and create a new interface with those methods. The subclasses will have option to chose between the base interface or the child interface to implement according to its requirements. If the number of methods `grows a lot`, its not a bad idea to provide a skeletal `abstract class` implementing the child interface and providing flexibility to the subclasses to chose between interface and abstract class.

## 6. Java 8 interface changes
From Java 8 onwards, we can have method implementations in the interfaces. We can create default as well as static methods in the interfaces and provide implementation for them. This has bridge the gap between abstract classes and interfaces and now `interfaces are the way to go` because we can extend it further by providing default implementations for new methods.

## 7. Source Files
* [Source files for Abstract Class and Interface on GitHub](https://github.com/jojozhuang/java-programming/tree/master/java-core-basic)

## 8. References
* [Difference between Abstract Class and Interface in Java](https://www.journaldev.com/1607/difference-between-abstract-class-and-interface-in-java)
* [Abstract Class in Java](https://www.journaldev.com/1582/abstract-class-in-java)
* [Interface in Java](https://www.journaldev.com/1601/interface-in-java)
