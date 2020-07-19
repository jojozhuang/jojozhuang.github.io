---
layout: tutorial
key: programming
title: "Design Pattern - Null Object"
index: 2926
subcategory: design-pattern
date: 2016-05-26
tags: [Null Object]
---

> Behavioral Pattern:  Null Object Pattern.

## 1. Null Object Pattern
The Null Object pattern is used to encapsulate the absence of an object by providing a substitutable alternative that offers suitable default do nothing behavior. In short, a design where "nothing will come of nothing".

Use the Null Object pattern when:
* an object requires a collaborator. The Null Object pattern does not introduce this collaboration--it makes use of a collaboration that already exists
* some collaborator instances should do nothing
* you want to abstract the handling of null away from the client

## 2. Example of Implementation
## 2.1 Interface
```java
public interface Shape {
    double area();
    double perimeter();
    void draw();
}
```
## 2.2 Classes
```java
public class Circle implements Shape {
    private final double radius;

    public Circle (double radius) {
        this.radius = radius;
    }

    @Override
    public double area() {
        // Area = πr^2
        return Math.PI * Math.pow(radius, 2);
    }

    @Override
    public double perimeter() {
        // Perimeter = 2πr
        return 2 * Math.PI * radius;
    }
    @Override
    public void draw() {
        System.out.println("Drawing Circle with area: " + area() + " and perimeter: " + perimeter());
    }
}

public class Rectangle implements Shape {
    private final double width;
    private final double height;

    public Rectangle (double width, double height) {
        this.width = width;
        this.height = height;
    }

    @Override
    public double area() {
        // A = w * h
        return width * height;
    }

    @Override
    public double perimeter() {
        // P = 2(w + h)
        return 2 * (width + height);
    }

    @Override
    public void draw() {
    	System.out.println("Drawing Rectangle with area: " + area() + " and perimeter: " + perimeter());
    }
}

public class Triangle implements Shape {
    private final double a;
    private final double b;
    private final double c;

    public Triangle (double a, double b, double c) {
        this.a = a;
        this.b = b;
        this.c = c;
    }

    @Override
    public double area() {
        // Using Heron's formula:
        // Area = SquareRoot(s * (s - a) * (s - b) * (s - c))
        // where s = (a + b + c) / 2, or 1/2 of the perimeter of the triangle
        double s = (a + b + c) / 2;
        return Math.sqrt(s * (s - a) * (s - b) * (s - c));
    }

    @Override
    public double perimeter() {
        // P = a + b + c
        return a + b + c;
    }

    @Override public void draw() {
    	System.out.println("Drawing Triangle with area: " + area() + " and perimeter: " + perimeter());
    }
}
```
### 2.3 Problematic Usage
```java
public class ShapeFactory {
    public static Shape createShape(String shapeType) {
        Shape shape = null;
        if ("Circle".equalsIgnoreCase(shapeType)) {
            shape = new Circle(3);
        } else if ("Rectangle".equalsIgnoreCase(shapeType)) {
            shape = new Rectangle(2, 4);
        } else if ("Triangle".equalsIgnoreCase(shapeType)) {
            shape = new Triangle(3, 4, 5);
        } // else return null

        return shape;
    }
}
```
When client using this factory to get shape instance, null-check is required if it returns null object. Otherwise, NullPointerException occurs.
```java
public class ShapeProcessor {
    String[] shapeTypes = new String[] { "Circle", "Triangle", "Rectangle", null};

    public ShapeProcessor () {

    }

    public void process() {
        for (String shapeType : shapeTypes) {
            Shape shape = ShapeFactory.createShape(shapeType);
            if (shape != null) { // null-check is required if factory returns null object
                System.out.println("Shape area: " + shape.area());
                System.out.println("Shape Perimeter: " + shape.perimeter());
                shape.draw();
                System.out.println();
            }
        }
    }
}
```
### 2.4 Implementation with NullObject Pattern
Create 'null' class as default shape.
```java
public class NullShape implements Shape {

    public NullShape () {}

    @Override
    public double area() {
        return 0.0d;
    }

    @Override
    public double perimeter() {
        return 0.0d;
    }

    @Override
    public void draw() {
        System.out.println("Null object can't be drawn");
    }
}
```
Factory can now return the null object.
```java
public class ShapeFactory {
    public static Shape createShape(String shapeType) {
        Shape shape = null;
        if ("Circle".equalsIgnoreCase(shapeType)) {
            shape = new Circle(3);
        } else if ("Rectangle".equalsIgnoreCase(shapeType)) {
            shape = new Rectangle(2, 4);
        } else if ("Triangle".equalsIgnoreCase(shapeType)) {
            shape = new Triangle(3, 4, 5);
        } else {
            shape = new NullShape();
        }
        return shape;
    }
}
```
Now, client doesn't need the null check.
```java
public class ShapeProcessor {
    String[] shapeTypes = new String[] { "Circle", "Triangle", "Rectangle", null};

    public ShapeProcessor () {

    }

    public void process() {
        for (String shapeType : shapeTypes) {
            Shape shape = ShapeFactory.createShape(shapeType);
            // no null-check required since shape factory always creates shape objects
            System.out.println("Shape area: " + shape.area());
            System.out.println("Shape Perimeter: " + shape.perimeter());
            shape.draw();
            System.out.println();
        }
    }
}
```
Output.
```raw
Shape area: 28.274333882308138
Shape Perimeter: 18.84955592153876
Drawing Circle with area: 28.274333882308138 and perimeter: 18.84955592153876

Shape area: 6.0
Shape Perimeter: 12.0
Drawing Triangle with area: 6.0 and perimeter: 12.0

Shape area: 8.0
Shape Perimeter: 12.0
Drawing Rectangle with area: 8.0 and perimeter: 12.0

Shape area: 0.0
Shape Perimeter: 0.0
Null object cant be drawn
```

## 3. Source Files
* [Source files for Null Object Pattern on GitHub](https://github.com/jojozhuang/design-patterns-java/tree/master/design-pattern-nullobject)

## 4. References
* [Null Object Design Pattern](https://sourcemaking.com/design_patterns/null_object)
* [Null Object Pattern in Java](https://dzone.com/articles/null-object-pattern-in-java)
