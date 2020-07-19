---
layout: tutorial
key: programming
title: "Design Pattern - Adapter"
index: 2910
subcategory: design-pattern
date: 2016-05-10
tags: [Adapter Pattern]
---

> Structural Pattern: Adapter Pattern.

## 1. Adapter Pattern
The Adapter pattern allows otherwise incompatible classes to work together by converting the interface of one class into an interface expected by the clients.

## 2. Example
```java
public class Line {
    public void draw(int x1, int y1, int x2, int y2) {
        System.out.println("Line from point (" + x1 + "," + y1 + "), to point (" + x2 + "," + y2 + ")");
    }
}

public class Rectangle {
    public void draw(int x, int y, int width, int height) {
        System.out.println("Rectangle with coordinate left-down point (" + x + "," + y + "), width: " + width
                + ", height: " + height);
    }
}

public class ProblematicClient {
    public void run() {
        Object[] shapes = {new Line(), new Rectangle()};
        int x1 = 10, y1 = 20;
        int x2 = 30, y2 = 60;
        int width = 40, height = 40;
        for (Object shape : shapes) {
            if (shape.getClass().getSimpleName().equals("Line")) {
                ((Line)shape).draw(x1, y1, x2, y2);
            } else if (shape.getClass().getSimpleName().equals("Rectangle")) {
                ((Rectangle)shape).draw(x2, y2, width, height);
            }
        }
    }
}
```
With Adapter.
```java
public interface Shape {
    void draw(int x, int y, int z, int j);
}

public class LineAdapter implements Shape {
    private Line adaptee;

    public LineAdapter(Line line) {
        this.adaptee = line;
    }

    @Override
    public void draw(int x1, int y1, int x2, int y2) {
        adaptee.draw(x1, y1, x2, y2);
    }
}

public class RectangleAdapter implements Shape {
    private Rectangle adaptee;

    public RectangleAdapter(Rectangle rectangle) {
        this.adaptee = rectangle;
    }

    @Override
    public void draw(int x1, int y1, int x2, int y2) {
        int x = Math.min(x1, x2);
        int y = Math.min(y1, y2);
        int width = Math.abs(x2 - x1);
        int height = Math.abs(y2 - y1);
        adaptee.draw(x, y, width, height);
    }
}

public class Client {
    public void run() {
        Shape[] shapes = {new LineAdapter(new Line()),
                new RectangleAdapter(new Rectangle())};
        int x1 = 10, y1 = 20;
        int x2 = 30, y2 = 60;
        for (Shape shape : shapes) {
            shape.draw(x1, y1, x2, y2);
        }
    }
}
```

## 3. Source Files
* [Source files for Adapter Pattern on GitHub](https://github.com/jojozhuang/design-patterns-java/tree/master/design-pattern-adapter)

## 4. References
* [Adapter in Java: Before and after](https://sourcemaking.com/design_patterns/adapter/java/1)
