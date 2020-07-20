---
layout: tutorial
key: programming
title: "Design Pattern - Flyweight"
index: 2915
subcategory: design-pattern
date: 2016-05-15
tags: [Flyweight Pattern]
---

> Structural Pattern: Flyweight Pattern.

## 1. Flyweight Pattern
The Flyweight pattern is primarily used to reduce the number of objects created and to decrease memory footprint and increase performance.

Flyweight pattern tries to reuse already existing similar kind objects by storing them and creates new object when no matching object is found.

## 2. Example
### 2.1 Line
```java
public enum Color
{
    RED, GREEN, BLUE;
}

public interface LineFlyweight {
    Color getColor();
    void draw(int x, int y);
}

public class Line implements LineFlyweight {
    private Color color;

    public Line(Color c) {
        color = c;
    }
    public Color getColor() {
        return color;
    }

    @Override
    public void draw(int x, int y) {
        System.out.println("Line: Draw() [Color : " + color + ", x : " + x + ", y :" + y + "]");
    }
}
```
### 2.2 Factory
```java
public class LineFlyweightFactory {
    private Map<Color, LineFlyweight> lineMap;
    public LineFlyweightFactory() {
        lineMap = new HashMap();
    }
    public LineFlyweight getLine(Color c) {
        //check if we've already created a line with this color
        if (lineMap.containsKey(c)) {
            return lineMap.get(c);
        }

        //if not, create one and save it to the pool
        LineFlyweight line = new Line(c);
        lineMap.put(c, line);
        return line;
    }
}
```
### 2.3 Client
```java
public class Client {
    private LineFlyweightFactory factory ;

    public Client() {
        factory = new LineFlyweightFactory();
    }

    public void draw() {
        LineFlyweight line1 = factory.getLine(Color.RED);
        System.out.println(line1);
        LineFlyweight line2 = factory.getLine(Color.RED); //can use the lines independently
        System.out.println(line2);
        if (line1.equals(line2)){
            System.out.println("same");
        }
        line1.draw(100, 100);
        line2.draw(200, 100);
    }
}
```
Output.
```raw
testClient
johnny.designpattern.common.Line@5442a311
johnny.designpattern.common.Line@5442a311
same
Line: Draw() [Color : RED, x : 100, y :100]
Line: Draw() [Color : RED, x : 200, y :100]
```

## 3. Source Files
* [Source files for Flyweight Pattern on GitHub](https://github.com/jojozhuang/design-patterns-java/tree/master/design-pattern-flyweight)

## 4. References
* [Flyweight Pattern Tutorial with Java Examples](https://dzone.com/articles/design-patterns-flyweight)
* [Design Patterns - Flyweight Pattern](https://www.tutorialspoint.com/design_pattern/flyweight_pattern.htm)
