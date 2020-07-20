---
layout: tutorial
key: programming
title: "Design Pattern - Template Method"
index: 2930
subcategory: design-pattern
date: 2016-05-30
tags: [Template Method Pattern]
---

> Behavioral Pattern: Template Method Pattern.

## 1. Template Method
The Template Method design pattern is to define an algorithm as skeleton of operations and leave the details to be implemented by the child classes. The overall structure and sequence of the algorithm is preserved by the parent class.

## 2. Example
### 2.1 Template
```java
public abstract class Order {
    abstract void doShopping();
    abstract void doCheckout();
    abstract void doPayment();

    //template method
    public final void processOrder(){

        //add products to shopping cart
        doShopping();

        //place the order
        doCheckout();

        //pay money
        doPayment();
    }
}

public class InStoreOrder extends Order {
    @Override
    public void doShopping()
    {
        System.out.println("Customer selects products and puts to shopping cart.");
    }

    @Override
    public void doCheckout()
    {
        System.out.println("Customer places the order.");
    }

    @Override
    public void doPayment()
    {
        System.out.println("Customer pays the money with credit card or cash.");
    }
}

public class OnlineOrder extends Order {
    @Override
    public void doShopping()
    {
        System.out.println("Customer puts products to online shopping cart.");
    }

    @Override
    public void doCheckout()
    {
        System.out.println("Customer places the online order.");
    }

    @Override
    public void doPayment()
    {
        System.out.println("Customer pays the money through online payment methods.");
    }
}
```
### 2.2 Client
```java
public class Client {
    public void run() {
        Order order = new InStoreOrder();
        order.processOrder();
        System.out.println();
        order = new OnlineOrder();
        order.processOrder();
    }
}
```
Output.
```raw
[In Store] Customer selects products and puts to shopping cart.
[In Store] Customer places the order.
[In Store] Customer pays the money with credit card or cash.

[Online] Customer puts products to online shopping cart.
[Online] Customer places the online order.
[Online] Customer pays the money through online payment methods.
```

## 3. Source Files
* [Source files for Template Method Pattern on GitHub](https://github.com/jojozhuang/design-patterns-java/tree/master/design-pattern-templatemethod)

## 4. References
* [Design Patterns - Template Method Pattern](https://www.tutorialspoint.com/design_pattern/template_pattern.htm)
* [Template Method Design Pattern](https://www.geeksforgeeks.org/template-method-design-pattern/)
