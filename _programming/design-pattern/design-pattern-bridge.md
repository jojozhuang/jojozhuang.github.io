---
layout: tutorial
key: programming
title: "Design Pattern - Bridge"
index: 2911
subcategory: design-pattern
date: 2016-05-11
tags: [Bridge Pattern]
---

> Structural Pattern: Bridge Pattern.

## 1. Bridge Pattern
The Bridge pattern decouples an abstraction from its implementation, so that the two can vary independently.

## 2. Example
### 2.1 Workshop
```java
public interface Workshop {
    abstract public void work();
}

public class Produce implements Workshop {
    @Override
    public void work()
    {
        System.out.print("Produced");
    }
}

public class Assemble implements Workshop {
    @Override
    public void work()
    {
        System.out.print(" And");
        System.out.println(" Assembled.");
    }
}
```
### 2.1 Vehicle
```java
public abstract class Vehicle {
    protected Workshop workShop1;
    protected Workshop workShop2;

    protected Vehicle(Workshop workShop1, Workshop workShop2)
    {
        this.workShop1 = workShop1;
        this.workShop2 = workShop2;
    }

    abstract public void manufacture();
}

public class Bike extends Vehicle {
    public Bike(Workshop workShop1, Workshop workShop2)
    {
        super(workShop1, workShop2);
    }

    @Override
    public void manufacture()
    {
        System.out.print("Bike ");
        workShop1.work();
        workShop2.work();
    }
}

public class Car extends Vehicle {
    public Car(Workshop workShop1, Workshop workShop2)
    {
        super(workShop1, workShop2);
    }

    @Override
    public void manufacture()
    {
        System.out.print("Car ");
        workShop1.work();
        workShop2.work();
    }
}
```
### 2.3 Client
```java
public class Client {
    public void run() {
        Vehicle vehicle1 = new Car(new Produce(), new Assemble());
        vehicle1.manufacture();
        Vehicle vehicle2 = new Bike(new Produce(), new Assemble());
        vehicle2.manufacture();
    }
}
```
Output.
```raw
Car Produced And Assembled.
Bike Produced And Assembled.
```

## 3. Source Files
* [Source files for Bridge Pattern on GitHub](https://github.com/jojozhuang/design-patterns-java/tree/master/design-pattern-bridge)

## 4. References
* [Bridge Design Pattern](https://www.geeksforgeeks.org/bridge-design-pattern/)
