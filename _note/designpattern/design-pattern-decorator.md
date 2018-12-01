---
layout: note
key: note
title: "Design Pattern - Decorator"
index: 513
category: designpattern
image: /note/designpattern.png
date: 2016-05-13
postdate: 2016-05-13
tags: [Decorator Pattern]
---

> Structural Pattern: Decorator Pattern.

## 1. Decorator Pattern

## 2. Example
### 2.1 Shapes
```java
public interface Shape {
    void draw();
}

public class Circle implements Shape {
    @Override
    public void draw() {
        System.out.println("Shape: Circle");
    }
}

public class Rectangle implements Shape {
    @Override
    public void draw() {
        System.out.println("Shape: Rectangle");
    }
}
```
### 2.2 Decorators
```java
public abstract class ShapeDecorator implements Shape {
    protected Shape decoratedShape;

    public ShapeDecorator(Shape decoratedShape){
        this.decoratedShape = decoratedShape;
    }

    public void draw(){
        decoratedShape.draw();
    }
}

public class RedShapeDecorator extends ShapeDecorator {

    public RedShapeDecorator(Shape decoratedShape) {
        super(decoratedShape);
    }

    @Override
    public void draw() {
        decoratedShape.draw();
        setRedBorder(decoratedShape);
    }

    private void setRedBorder(Shape decoratedShape){
        System.out.println("Border Color: Red");
    }
}
```
### 2.3 Client
```java
public class Client {
    public void draw() {
        Shape circle = new Circle();

        Shape redCircle = new RedShapeDecorator(new Circle());

        Shape redRectangle = new RedShapeDecorator(new Rectangle());
        System.out.println("Circle with normal border");
        circle.draw();

        System.out.println("\nCircle of red border");
        redCircle.draw();

        System.out.println("\nRectangle of red border");
        redRectangle.draw();
    }
}
```
Output.
```sh
Circle with normal border
Shape: Circle

Circle of red border
Shape: Circle
Border Color: Red

Rectangle of red border
Shape: Rectangle
Border Color: Red
```

## 3. Source Files
* [Source files for Decorator Pattern on GitHub](https://github.com/jojozhuang/design-patterns-java/tree/master/design-pattern-decorator)

## 4. References
* [Design Patterns - Decorator Pattern](https://www.tutorialspoint.com/design_pattern/decorator_pattern.htm)
