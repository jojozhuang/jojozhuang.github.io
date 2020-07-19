---
layout: tutorial
key: programming
title: "Java Core - Generics Type Erasure"
index: 2318
subcategory: java-core
date: 2017-01-14
tags: [Type Erasure]
---

> Learn what is Type Erasure and how generics works.

## 1. Type Erasure
Generics are used for tighter type checks at compile time and to provide a generic programming. To implement generic behavior, java compiler apply type erasure. `Type erasure` is a process in which compiler replaces a generic parameter with actual class or bridge method. In type erasure, compiler ensures that no extra classes are created and there is no runtime overhead.

Type erasure rules:
* Replace type parameters in generic type with their `bound` if bounded type parameters are used.
* Replace type parameters in generic type with `Object` if unbounded type parameters are used.
* Insert type casts to preserve type safety.
* Generate bridge methods to keep polymorphism in extended generic types.

## 2. Erasure Examples
### 2.1 Bounded Types Erasure
Java Compiler replaces type parameters in generic type with their bound if bounded type parameters are used.

Example.
```java
public class BoundedTypesErasureExample {
    public static void main(String[] args) {
        Box<Integer> integerBox = new Box<Integer>();
        Box<Double> doubleBox = new Box<Double>();

        integerBox.add(new Integer(10));
        doubleBox.add(new Double(10.0));

        System.out.format("Integer Value: %d\n", integerBox.get());
        System.out.format("Double Value: %s\n", doubleBox.get());
    }

    static class Box<T extends Number> {
        private T t;

        public void add(T t) {
            this.t = t;
        }

        public T get() {
            return t;
        }
    }
}
```
In this case, java compiler will replace `T` with `Number` class and after type erasure, compiler will generate bytecode for the following code.
```java
public class BoundedTypesErasureExample {
    public static void main(String[] args) {
        Box integerBox = new Box();
        Box doubleBox = new Box();

        integerBox.add(new Integer(10));
        doubleBox.add(new Double(10.0));

        System.out.format("Integer Value: %d\n", integerBox.get());
        System.out.format("Double Value: %s\n", doubleBox.get());
    }

    static class Box {
        private Number t;

        public void add(Number t) {
            this.t = t;
        }

        public Number get() {
            return t;
        }
    }
}
```
### 2.2 Unbounded Types Erasure
Java Compiler replaces type parameters in generic type with Object if unbounded type parameters are used.

Example.
```java
public class UnboundedTypesErasureExample {
    public static void main(String[] args) {
        Box<Integer> integerBox = new Box<Integer>();
        Box<String> stringBox = new Box<String>();

        integerBox.add(new Integer(10));
        stringBox.add(new String("Hello World"));

        System.out.format("Integer Value: %d\n", integerBox.get());
        System.out.format("String Value: %s\n", stringBox.get());
    }

    static class Box<T> {
        private T t;

        public void add(T t) {
            this.t = t;
        }

        public T get() {
            return t;
        }
    }
}
```
In this case, java compiler will replace `T` with `Object` class and after type erasure, compiler will generate bytecode for the following code.
```java
public class UnboundedTypesErasureExample {
    public static void main(String[] args) {
        Box integerBox = new Box();
        Box stringBox = new Box();

        integerBox.add(new Integer(10));
        stringBox.add(new String("Hello World"));

        System.out.format("Integer Value: %d\n", integerBox.get());
        System.out.format("String Value: %s\n", stringBox.get());
    }

    static class Box {
        private Object t;

        public void add(Object t) {
            this.t = t;
        }

        public Object get() {
            return t;
        }
    }
}
```
### 2.3 Methods Erasure
Java compiler replaces type parameters in generic type with Object if unbounded type parameters are used, and with type if bound parameters are used as method parameters.

Example.
```java
public class MethodsErasureExample {
    public static void main(String[] args) {
        Box<Integer> integerBox = new Box<Integer>();
        Box<String> stringBox = new Box<String>();

        integerBox.add(new Integer(10));
        stringBox.add(new String("Hello World"));

        printBox1(integerBox);
        printBox2(stringBox);
    }

    private static <T extends Box> void printBox1(T box) {
        System.out.println("Integer Value: " + box.get());
    }

    private static <T> void printBox2(T box) {
        System.out.println("String Value: " + ((Box)box).get());
    }

    static class Box<T> {
        private T t;

        public void add(T t) {
            this.t = t;
        }

        public T get() {
            return t;
        }
    }
}
```
In this case, java compiler will replace `T` with `Object` class and after type erasure, compiler will generate bytecode for the following code.
```java
public class MethodsErasureExample {
    public static void main(String[] args) {
        Box integerBox = new Box();
        Box stringBox = new Box();

        integerBox.add(new Integer(10));
        stringBox.add(new String("Hello World"));

        printBox1(integerBox);
        printBox2(stringBox);
    }

    //Bounded Types Erasure
    private static void printBox1(Box box) {
        System.out.println("Integer Value: " + box.get());
    }

    //Unbounded Types Erasure
    private static void printBox2(Object box) {
        System.out.println("String Value: " + ((Box)box).get());
    }

    static class Box {
        private Object t;

        public void add(Object t) {
            this.t = t;
        }

        public Object get() {
            return t;
        }
    }
}
```

## 3. Source Files
* [Source files for Java Generics Type Erasure on GitHub](https://github.com/jojozhuang/java-programming/tree/master/java-core-typeerasure)

## 4. References
* [Java Generics Tutorial](https://www.tutorialspoint.com/java_generics/index.htm)
* [Java Generics Example Tutorial – Generic Method, Class, Interface](https://www.journaldev.com/1663/java-generics-example-method-class-interface)
