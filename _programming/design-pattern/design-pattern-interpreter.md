---
layout: tutorial
key: programming
title: "Design Pattern - Interpreter"
index: 2922
subcategory: design-pattern
date: 2016-05-22
tags: [Interpreter Pattern]
---

> Behavioral Pattern: Interpreter Pattern.

## 1. Interpreter Pattern
The Interpreter pattern defines a grammatical representation for a language and an interpreter to interpret the grammar.

## 2. Example
### 2.1 Expression
```java
public interface Expression {
    String interpret(int num);
}

public class IntToBinary implements Expression {

    @Override
    public String interpret(int num) {
        String result = Integer.toBinaryString(num);
        System.out.println(num + " in Binary = " + result);
        return result;
    }
}

public class IntToHex implements Expression {

    @Override
    public String interpret(int num) {
        String result = Integer.toHexString(num);
        System.out.println(num + " in Hexadecimal = " + result);
        return result;
    }
}

public class IntToRoman implements Expression {

    @Override
    public String interpret(int num) {
        if (num <= 0) {
            return "";
        }
        // 1000,2000,3000
        String M[] = {"", "M", "MM", "MMM"};
        // 100,200,300,400,500,600,700,800,900,1000
        String C[] = {"", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"};
        // 10,20,30,40,50,60,70,80,90
        String X[] = {"", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"};
        // 1,2,3,4,5,6,7,8,9
        String I[] = {"", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"};
        String result = M[num/1000] + C[(num%1000)/100] + X[(num%100)/10] + I[num%10];

        System.out.println(num + " in Roman = " + result);
        return result;
    }
}
```
### 2.2 Client
```java
public class Client {
    public void run() {
        List<Expression> list = new ArrayList<>();
        list.add(new IntToBinary());
        list.add(new IntToHex());
        list.add(new IntToRoman());

        for (Expression exp : list) {
            exp.interpret(28);
        }
    }
}
```
Output.
```raw
28 in Binary = 11100
28 in Hexadecimal = 1c
28 in Roman = XXVIII
```

## 3. Source Files
* [Source files for Interpreter Pattern on GitHub](https://github.com/jojozhuang/design-patterns-java/tree/master/design-pattern-interpreter)

## 4. References
* [Interpreter Design Pattern in Java](https://www.journaldev.com/1635/interpreter-design-pattern-java)
