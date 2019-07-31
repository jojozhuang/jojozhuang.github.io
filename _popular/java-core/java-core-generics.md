---
layout: tutorial
key: popular
title: "Java Core - Generics"
index: 1426
subcategory: java-core
date: 2017-01-13
tags: [Generics]
---

> Generics

## 1. Generics Overview
Java Generics were introduced in JDK 5.0 with the aim of reducing bugs and adding an extra layer of abstraction over types.
* Java Generic methods and generic classes enable programmers to specify, with a single method declaration, a set of related methods, or with a single class declaration, a set of related types, respectively.
* Generics also provide compile-time type safety that allows programmers to catch invalid types at compile time.
* Using Java Generic concept, we might write a generic method for sorting an array of objects, then invoke the generic method with Integer arrays, Double arrays, String arrays and so on, to sort the array elements.

## 2. Generic Classes
### 2.1 Generic Classes
A generic class declaration looks like a non-generic class declaration, except that the class name is followed by a `type parameter` section.

The type parameter section of a generic class can have one or more type parameters separated by commas. These classes are known as parameterized classes or parameterized types because they accept one or more parameters.

Syntax.
```java
public class Box<T> {
   private T t;
}
```
* `Box` − Box is a generic class.
* `T` − The generic type parameter passed to generic class. It can take any Object.
* `t` − Instance of generic type T.

Example.
```java
public class GenericClassExample {
    public static void main(String[] args) {
        Box<Integer> integerBox = new Box<Integer>();
        Box<String> stringBox = new Box<String>();

        integerBox.add(new Integer(10));
        stringBox.add(new String("Hello World"));

        System.out.printf("Integer Value :%d\n", integerBox.get());
        System.out.printf("String Value :%s\n", stringBox.get());
    }
}

class Box<T> {
    private T t;

    public void add(T t) {
        this.t = t;
    }

    public T get() {
        return t;
    }
}
```
Output.
```raw
Integer Value :10
String Value :Hello World
```

### 2.2 Type Parameter Naming Conventions
By convention, type parameter names are named as single, uppercase letters so that a type parameter can be distinguished easily with an ordinary class or interface name.

Following is the list of commonly used type parameter names:
* `E` − `Element`, and is mainly used by Java Collections framework.
* `K` − `Key`, and is mainly used to represent parameter type of key of a map.
* `V` − `Value`, and is mainly used to represent parameter type of value of a map.
* `N` − `Number`, and is mainly used to represent numbers.
* `T` − `Type`, and is mainly used to represent first generic type parameter.
* `S` − `Type`, and is mainly used to represent second generic type parameter.
* `U` − `Type`, and is mainly used to represent third generic type parameter.
* `V` − `Type`, and is mainly used to represent fourth generic type parameter.

Example.
```java
public class NamingConventionExample {
    public static void main(String[] args) {
        Box<Integer, String> box = new Box<Integer, String>();
        box.add(Integer.valueOf(10),"Hello World");
        System.out.format("Integer Value: %d\n", box.getFirst());
        System.out.format("String Value: %s\n", box.getSecond());

        Pair<String, Integer> pair = new Pair<String, Integer>();
        pair.addKeyValue("1", Integer.valueOf(10));
        System.out.format("(Pair)Integer Value: %d\n", pair.getValue("1"));

        CustomList<Box> list = new CustomList<Box>();
        list.addItem(box);
        System.out.format("(CustomList)Integer Value: %d\n", list.getItem(0).getFirst());
    }

    static class Box<T, S> {
        private T t;
        private S s;

        public void add(T t, S s) {
            this.t = t;
            this.s = s;
        }

        public T getFirst() {
            return t;
        }

        public S getSecond() {
            return s;
        }
    }

    static class Pair<K,V>{
        private Map<K,V> map = new HashMap<K,V>();

        public void addKeyValue(K key, V value) {
            map.put(key, value);
        }

        public V getValue(K key) {
            return map.get(key);
        }
    }

    static class CustomList<E>{
        private List<E> list = new ArrayList<E>();

        public void addItem(E value) {
            list.add(value);
        }

        public E getItem(int index) {
            return list.get(index);
        }
    }
}
```
Output.
```raw
Integer Value: 10
String Value: Hello World
(Pair)Integer Value: 10
(CustomList)Integer Value: 10
```

### 2.3 Type Inference
`Type inference` represents the Java compiler's ability to look at a method invocation and its corresponding declaration to check and determine the type argument(s). The inference algorithm checks the types of the arguments and, if available, assigned type is returned. Inference algorithms tries to find a specific type which can fulfill all type parameters.

Using `diamond operator`, compiler determines the type of the parameter. This operator is avalilable from Java SE 7 version onwards.

Syntax.
```java
Box<Integer> integerBox = new Box<>();
```
* `Box` − Box is a generic class.
* `<>` − The diamond operator denotes type inference.

Example.
```java
public class TypeInferenceExample {
    public static void main(String[] args) {
        //type inference
        Box<Integer> integerBox = new Box<>();
        //unchecked conversion warning
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
Output.
```raw
Integer Value: 10
String Value: Hello World
```
### 2.4 Generic Methods
You can write a single generic method declaration that can be called with arguments of different types. Based on the types of the arguments passed to the generic method, the compiler handles each method call appropriately.

Following are the rules to define Generic Methods:
* All generic method declarations have a type parameter section delimited by `angle brackets (< and >)` that precedes the method's return type (< E > in the next example).
* Each type parameter section contains one or more type parameters separated by commas. A type parameter, also known as a type variable, is an identifier that specifies a generic type name.
* The type parameters can be used to declare the `return type` and act as placeholders for the types of the `arguments` passed to the generic method, which are known as actual type arguments.
* A generic method's body is declared like that of any other method. Note that type parameters can represent **only** reference types, **not** primitive types (like int, double and char).

Example.
```java
public class GenericMethodsExample {
    public static void main(String args[]) {
        // Create arrays of Integer, Double and Character
        Integer[] intArray = { 1, 2, 3, 4, 5 };
        Double[] doubleArray = { 1.1, 2.2, 3.3, 4.4 };
        Character[] charArray = { 'H', 'E', 'L', 'L', 'O' };

        System.out.print("Array integerArray contains: ");
        printArray(intArray);   // pass an Integer array

        System.out.print("\nArray doubleArray contains: ");
        printArray(doubleArray);   // pass a Double array

        System.out.print("\nArray characterArray contains: ");
        printArray(charArray);   // pass a Character array
    }

    // generic method printArray
    public static < E > void printArray( E[] inputArray ) {
        // Display array elements
        for(E element : inputArray) {
            System.out.format("%s, ", element);
        }
    }
}
```
Output.
```raw
Array integerArray contains: 1, 2, 3, 4, 5,
Array doubleArray contains: 1.1, 2.2, 3.3, 4.4,
Array characterArray contains: H, E, L, L, O,
```
### 2.5 Multiple Type Parameters
A Generic class can have multiple type parameters.

Example.
```java
public class MultipleTypeParametersExample {
    public static void main(String[] args) {
        Box<Integer, String> box = new Box<Integer, String>();
        box.add(Integer.valueOf(10),"Hello World");
        System.out.format("Integer Value: %d\n", box.getFirst());
        System.out.format("String Value: %s\n", box.getSecond());

        Box<String, String> box1 = new Box<String, String>();
        box1.add("Message","Hello World");
        System.out.format("String Value: %s\n", box1.getFirst());
        System.out.format("String Value: %s\n", box1.getSecond());
    }

    static class Box<T, S> {
        private T t;
        private S s;

        public void add(T t, S s) {
            this.t = t;
            this.s = s;
        }

        public T getFirst() {
            return t;
        }

        public S getSecond() {
            return s;
        }
    }
}
```
Output.
```raw
Integer Value: 10
String Value: Hello World
String Value: Message
String Value: Hello World
```

### 2.6 Parameterized Types
A Generic class can have parameterized types where a type parameter can be substituted with a parameterized type.

Example.
```java
public class ParameterizedTypesExample {
    public static void main(String[] args) {
        Box<Integer, List<String>> box
                = new Box<Integer, List<String>>();

        List<String> messages = new ArrayList<String>();

        messages.add("Hi");
        messages.add("Hello");
        messages.add("Bye");

        box.add(Integer.valueOf(10),messages);
        System.out.printf("Integer Value :%d\n", box.getFirst());
        System.out.printf("String Value :%s\n", box.getSecond());
    }

    static class Box<T, S> {
        private T t;
        private S s;

        public void add(T t, S s) {
            this.t = t;
            this.s = s;
        }

        public T getFirst() {
            return t;
        }

        public S getSecond() {
            return s;
        }
    }
}
```
Output.
```raw
Integer Value :10
String Value :[Hi, Hello, Bye]
```

### 2.7 Raw Types
A raw type is an object of a generic class or interface if its type arguments are not passed during its creation.

Example.
```java
public class RawTypesExample {
    public static void main(String[] args) {
        Box<Integer> box = new Box<Integer>();

        box.set(Integer.valueOf(10));
        System.out.printf("Integer Value :%d\n", box.getData());

        Box rawBox = new Box();

        //No warning
        rawBox = box;
        System.out.printf("Integer Value :%d\n", rawBox.getData());

        //Warning for unchecked invocation to set(T)
        rawBox.set(Integer.valueOf(10));
        System.out.printf("Integer Value :%d\n", rawBox.getData());

        //Warning for unchecked conversion
        box = rawBox;
        System.out.printf("Integer Value :%d\n", box.getData());
    }

    static class Box<T> {
        private T t;

        public void set(T t) {
            this.t = t;
        }

        public T getData() {
            return t;
        }
    }
}
```
Output.
```raw
Integer Value: 10
Integer Value: 10
Integer Value: 10
Integer Value: 10
```
### 2.8 Bounded Type Parameters
There may be times when you'll want to restrict the kinds of types that are allowed to be passed to a type parameter. For example, a method that operates on numbers might only want to accept instances of Number or its subclasses. This is what bounded type parameters are for.

To declare a bounded type parameter, list the type parameter's name, followed by the extends keyword, followed by its upper bound.

Following example illustrates how `extends` is used in a general sense to mean either "extends" (as in classes) or "implements" (as in interfaces). This example is Generic method to return the largest of three Comparable objects.

Example.
```java
public class BoundedTypeParametersExample {
    public static void main(String args[]) {
        System.out.format("Max of %d, %d and %d is %d\n",
                3, 4, 5, maximum( 3, 4, 5 ));

        System.out.format("Max of %.1f,%.1f and %.1f is %.1f\n",
                6.6, 8.8, 7.7, maximum( 6.6, 8.8, 7.7 ));

        System.out.format("Max of %s, %s and %s is %s\n","pear",
                "apple", "orange", maximum("pear", "apple", "orange"));
    }

    // determines the largest of three Comparable objects
    public static <T extends Comparable<T>> T maximum(T x, T y, T z) {
        T max = x;   // assume x is initially the largest

        if(y.compareTo(max) > 0) {
            max = y;   // y is the largest so far
        }

        if(z.compareTo(max) > 0) {
            max = z;   // z is the largest now
        }
        return max;   // returns the largest object
    }
}
```
Output.
```raw
Max of 3, 4 and 5 is 5
Max of 6.6,8.8 and 7.7 is 8.8
Max of pear, apple and orange is pear
```
### 2.9 Multiple Bounds
A type parameter can have multiple bounds.

Syntax.
```java
public static <T extends Number & Comparable<T>> T maximum(T x, T y, T z)
```
* `maximum` − maximum is a generic method.
* `T` − The generic type parameter passed to generic method. It can take any Object.

The T is a type parameter passed to the generic class Box and should be subtype of Number class and must implements Comparable interface. In case a class is passed as bound, it should be passed first before interface otherwise compile time error will occur.

Example.
```java
public class MultipleBoundsExample {
    public static void main(String[] args) {
        System.out.format("Max of %d, %d and %d is %d\n",
                3, 4, 5, maximum( 3, 4, 5 ));

        System.out.format("Max of %.1f,%.1f and %.1f is %.1f\n",
                6.6, 8.8, 7.7, maximum( 6.6, 8.8, 7.7 ));
    }

    public static <T extends Number & Comparable<T>> T maximum(T x, T y, T z) {
        T max = x;
        if(y.compareTo(max) > 0) {
            max = y;
        }

        if(z.compareTo(max) > 0) {
            max = z;
        }
        return max;
    }

    // Compiler throws error in case of below declaration
   /* public static <T extends Comparable<T> & Number> T maximum1(T x, T y, T z) {
      T max = x;
      if(y.compareTo(max) > 0) {
         max = y;
      }

      if(z.compareTo(max) > 0) {
         max = z;
      }
      return max;
   }*/
}
```
Output.
```raw
Max of 3, 4 and 5 is 5
Max of 6.6,8.8 and 7.7 is 8.8
```

## 3. Wildcard
Wildcards can be used in three ways −
* Upper bound Wildcard − ? extends Type.
* Lower bound Wildcard − ? super Type.
* Unbounded Wildcard − ?

In order to decide which type of wildcard best suits the condition, let's first classify the type of parameters passed to a method as in and out parameter.
* in variable − An in variable provides data to the code. For example, copy(src, dest). Here src acts as in variable being data to be copied.
* out variable − An out variable holds data updated by the code. For example, copy(src, dest). Here dest acts as in variable having copied data.

Guidelines for Wildcards.
* Upper bound wildcard − If a variable is of in category, use extends keyword with wildcard.
* Lower bound wildcard − If a variable is of out category, use super keyword with wildcard.
* Unbounded wildcard − If a variable can be accessed using Object class method then use an unbound wildcard.
* No wildcard − If code is accessing variable in both in and out category then do not use wildcards.

Example.

### 3.1 Unbounded Wildcards
Example.
```java
```
Output.
```raw
```

### 3.2 Upper Bounded Wildcards
Example.
```java
```
Output.
```raw
```

### 3.3 Lower Bounded Wildcards
Example.
```java
```
Output.
```raw
```

## 4. Type Erasure
Type erasure is a process in which compiler replaces a generic parameter with actual class or bridge method. In type erasure, compiler ensures that no extra classes are created and there is no runtime overhead.

Generics are used for tighter type checks at compile time and to provide a generic programming. To implement generic behaviour, java compiler apply type erasure. Type erasure is a process in which compiler replaces a generic parameter with actual class or bridge method. In type erasure, compiler ensures that no extra classes are created and there is no runtime overhead.

Type Erasure rules
* Replace type parameters in generic type with their bound if bounded type parameters are used.
* Replace type parameters in generic type with Object if unbounded type parameters are used.
* Insert type casts to preserve type safety.
* Generate bridge methods to keep polymorphism in extended generic types.

### 4.1 Bound Types Erasure
Example.
```java
```
Output.
```raw
```

### 4.2 Unbounded Types Erasure
Example.
```java
```
Output.
```raw
```

### 4.3 Methods Erasure
Example.
```java
```
Output.
```raw
```

## 5. Source Files
* [Source files for Java NIO on GitHub](https://github.com/jojozhuang/java-programming/tree/master/java-core-nio)

## 6. References
* [Java Generics Tutorial](https://www.tutorialspoint.com/java_generics/index.htm)
* [Java Generics Example Tutorial – Generic Method, Class, Interface](https://www.journaldev.com/1663/java-generics-example-method-class-interface)
