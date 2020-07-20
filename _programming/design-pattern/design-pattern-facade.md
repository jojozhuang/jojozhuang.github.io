---
layout: tutorial
key: programming
title: "Design Pattern - Facade"
index: 2914
subcategory: design-pattern
date: 2016-05-14
tags: [Facade Pattern]
---

> Structural Pattern: Facade Pattern.

## 1. Facade Pattern
The Facade pattern hides the complexities of the system and provides an interface to the client using which the client can access the system.

## 2. Implementation
### 2.1 Shape
```java
public interface Shape {
    void draw();
}

public class Circle implements Shape {

    @Override
    public void draw() {
        System.out.println("Circle::draw()");
    }
}

public class Rectangle implements Shape {

    @Override
    public void draw() {
        System.out.println("Rectangle::draw()");
    }
}

public class Square implements Shape {

    @Override
    public void draw() {
        System.out.println("Square::draw()");
    }
}
```
### 2.2 Facade Class
```java

public class ShapeMaker {
    private Shape circle;
    private Shape rectangle;
    private Shape square;

    public ShapeMaker() {
        circle = new Circle();
        rectangle = new Rectangle();
        square = new Square();
    }

    public void drawCircle(){
        circle.draw();
    }
    public void drawRectangle(){
        rectangle.draw();
    }
    public void drawSquare(){
        square.draw();
    }
}
````
### 2.3 Client
```java
public class Client {
    public void run() {
        ShapeMaker shapeMaker = new ShapeMaker();

        shapeMaker.drawCircle();
        shapeMaker.drawRectangle();
        shapeMaker.drawSquare();
    }
}
```
Output.
```raw
Circle::draw()
Rectangle::draw()
Square::draw()
```

## 3. Source Files
* [Source files for Facade Pattern on GitHub](https://github.com/jojozhuang/design-patterns-java/tree/master/design-pattern-facade)

## 4. References
* [Design Patterns - Facade Pattern](https://www.tutorialspoint.com/design_pattern/facade_pattern.htm)
* [Facade Pattern Tutorial with Java Examples](https://dzone.com/articles/design-patterns-uncovered-1)
