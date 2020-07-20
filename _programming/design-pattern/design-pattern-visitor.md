---
layout: tutorial
key: programming
title: "Design Pattern - Visitor"
index: 2931
subcategory: design-pattern
date: 2016-05-31
tags: [Visitor Pattern]
---

> Behavioral Pattern: Visitor Pattern.

## 1. Visitor Pattern
The Visitor pattern represents an operation to be performed on the elements of an object structure without changing the classes on which it operates.

## 2. Example
### 2.1 Computer Part
```java
public interface ComputerPart {
   public void accept(ComputerPartVisitor computerPartVisitor);
}

public class Keyboard implements ComputerPart {

   @Override
   public void accept(ComputerPartVisitor computerPartVisitor) {
      computerPartVisitor.visit(this);
   }
}

public class Monitor implements ComputerPart {

   @Override
   public void accept(ComputerPartVisitor computerPartVisitor) {
      computerPartVisitor.visit(this);
   }
}

public class Mouse implements ComputerPart {

   @Override
   public void accept(ComputerPartVisitor computerPartVisitor) {
      computerPartVisitor.visit(this);
   }
}

public class Computer implements ComputerPart {

   ComputerPart[] parts;

   public Computer(){
      parts = new ComputerPart[] {new Mouse(), new Keyboard(), new Monitor()};		
   }

   @Override
   public void accept(ComputerPartVisitor computerPartVisitor) {
      for (int i = 0; i < parts.length; i++) {
         parts[i].accept(computerPartVisitor);
      }
      computerPartVisitor.visit(this);
   }
}
```
### 2.2 Visitor
```java
public interface ComputerPartVisitor {
    public void visit(Computer computer);
    public void visit(Mouse mouse);
    public void visit(Keyboard keyboard);
    public void visit(Monitor monitor);
}

public class ComputerPartDisplayVisitor implements ComputerPartVisitor {

   @Override
   public void visit(Computer computer) {
      System.out.println("Displaying Computer.");
   }

   @Override
   public void visit(Mouse mouse) {
      System.out.println("Displaying Mouse.");
   }

   @Override
   public void visit(Keyboard keyboard) {
      System.out.println("Displaying Keyboard.");
   }

   @Override
   public void visit(Monitor monitor) {
      System.out.println("Displaying Monitor.");
   }
}
```
### 2.3 Client
```java
public class Client {
    public void run() {
        ComputerPart computer = new Computer();
        computer.accept(new ComputerPartDisplayVisitor());
    }
}
```
Output.
```raw
Displaying Mouse.
Displaying Keyboard.
Displaying Monitor.
Displaying Computer.
```

## 3. Source Files
* [Source files for Visitor Pattern on GitHub](https://github.com/jojozhuang/design-patterns-java/tree/master/design-pattern-visitor)

## 4. References
* [Design Patterns - Visitor Pattern](https://www.tutorialspoint.com/design_pattern/visitor_pattern.htm)
* [Visitor Design Pattern](https://sourcemaking.com/design_patterns/visitor)
