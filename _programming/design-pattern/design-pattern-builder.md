---
layout: tutorial
key: programming
title: "Design Pattern - Builder"
index: 2904
subcategory: design-pattern
date: 2016-05-04
tags: [Builder Pattern]
---

> Creational Pattern: Builder Pattern.

## 1. Builder Pattern
The Builder pattern separates the construction of a complex object from its representation so that the same construction process can create different representations.

## 2. Example
### 2.1 Pizza
```java
public class Pizza {
    private String dough = "";
    private String sauce = "";
    private String topping = "";

    public void setDough(String dough) {
        this.dough = dough;
    }

    public void setSauce(String sauce) {
        this.sauce = sauce;
    }

    public void setTopping(String topping) {
        this.topping = topping;
    }

    @Override
    public String toString() {
        return "Dough: " + dough + ",Sauce: " + sauce + ",Topping: " + topping;
    }
}
```
### 2.2 Pizza Builder
```java
public abstract class PizzaBuilder {
    protected Pizza pizza;

    public Pizza getPizza() {
        return pizza;
    }

    public void createPizza() {
        pizza = new Pizza();
    }

    public abstract void buildDough();
    public abstract void buildSauce();
    public abstract void buildTopping();
}

public class CheesePizzaBuilder extends PizzaBuilder {
    public void buildDough() {
        pizza.setDough("cross");
    }

    public void buildSauce() {
        pizza.setSauce("tomato");
    }

    public void buildTopping() {
        pizza.setTopping("cheese");
    }
}

public class PepperoniPizzaBuilder extends PizzaBuilder {
    public void buildDough() {
        pizza.setDough("pan baked");
    }

    public void buildSauce() {
        pizza.setSauce("hot");
    }

    public void buildTopping() {
        pizza.setTopping("pepperoni + salami");
    }
}
```
### 2.3 Waiter
```java
public class Waiter {
    private PizzaBuilder pizzaBuilder;

    public void setPizzaBuilder(PizzaBuilder pb) {
        pizzaBuilder = pb;
    }

    public Pizza getPizza() {
        return pizzaBuilder.getPizza();
    }

    public void constructPizza() {
        pizzaBuilder.createPizza();
        pizzaBuilder.buildDough();
        pizzaBuilder.buildSauce();
        pizzaBuilder.buildTopping();
    }
}
```
### 2.4 Client
```java
public class Client {
    public void run() {
        Waiter waiter = new Waiter();
        PizzaBuilder cheesePizzaBuilder = new CheesePizzaBuilder();
        PizzaBuilder pepperoniPizzaBuilder = new PepperoniPizzaBuilder();

        waiter.setPizzaBuilder( pepperoniPizzaBuilder );
        waiter.constructPizza();

        Pizza pizza = waiter.getPizza();
        System.out.println(pizza);
    }
}
```
Output
```raw
Dough: pan baked,Sauce: hot,Topping: pepperoni + salami
```

## 3. Source Files
* [Source files for Builder Pattern on GitHub](https://github.com/jojozhuang/design-patterns-java/tree/master/design-pattern-builder)

## 4. References
* [Builder Design Pattern](https://sourcemaking.com/design_patterns/builder)
* [Builder in Java](https://sourcemaking.com/design_patterns/builder/java/2)
