---
layout: tutorial
key: programming
title: "Java Core - Generics"
index: 2317
subcategory: java-core
date: 2017-01-13
tags: [Generics, Bounded Wildcards]
---

> Use Generics for java programming.

## 1. Generics Overview
Java Generics were introduced in JDK 5.0 with the aim of reducing bugs and adding an extra layer of abstraction over types.
* Java generic methods and generic classes enable programmers to specify, with a single method declaration, a set of related methods, or with a single class declaration, a set of related types, respectively.
* Generics also provide compile-time type safety that allows programmers to catch invalid types at compile time.
* Using Java Generic concept, we might write a generic method for sorting an array of objects, then invoke the generic method with Integer arrays, Double arrays, String arrays and so on, to sort the array elements.

## 2. Generic Classes
### 2.1 Generic Class
A `generic class` declaration looks like a non-generic class declaration, except that the class name is followed by a `type parameter` section.

The type parameter section of a generic class can have one or more type parameters separated by commas. These classes are known as `parameterized classes` or parameterized types because they accept one or more parameters.

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

Following example will showcase above mentioned concept.
```java
public class NamingConventionExample {
    public static void main(String[] args) {
        Box<Integer, String> box = new Box<Integer, String>();
        box.add(Integer.valueOf(10),"Hello World");
        System.out.format("Integer Value: %d\n", box.getFirst());
        System.out.format("String Value: %s\n", box.getSecond());

        Pair<String, Integer> pair = new Pair<String, Integer>();
        pair.addKeyValue("A", Integer.valueOf(20));
        System.out.format("(Pair)Integer Value: %d\n", pair.getValue("A"));

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
(Pair)Integer Value: 20
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
### 2.4 Multiple Type Parameters
A generic class can have multiple type parameters.

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
### 2.5 Parameterized Types
A generic class can have parameterized types where a type parameter can be substituted with a parameterized type.

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
        System.out.format("Integer Value: %d\n", box.getFirst());
        System.out.format("String Value: %s\n", box.getSecond());
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
String Value: [Hi, Hello, Bye]
```
### 2.6 Raw Types
A raw type is an object of a generic class or interface if its type arguments are not passed during its creation.

Example.
```java
public class RawTypesExample {
    public static void main(String[] args) {
        Box<Integer> box = new Box<Integer>();

        box.set(Integer.valueOf(10));
        System.out.format("Integer Value: %d\n", box.getData());

        Box rawBox = new Box();

        //No warning
        rawBox = box;
        System.out.format("Integer Value: %d\n", rawBox.getData());

        //Warning for unchecked invocation to set(T)
        rawBox.set(Integer.valueOf(10));
        System.out.format("Integer Value: %d\n", rawBox.getData());

        //Warning for unchecked conversion
        box = rawBox;
        System.out.format("Integer Value: %d\n", box.getData());
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
### 2.7 Generic Methods
You can write a single generic method declaration that can be called with arguments of different types. Based on the types of the arguments passed to the generic method, the compiler handles each method call appropriately.

Following are the rules to define Generic Methods:
* All generic method declarations have a type parameter section delimited by `angle brackets`(< and >) that precedes the method's `return type` (\<E\> in the next example).
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
    public static <E> void printArray(E[] inputArray) {
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

## 3. Generic Collections
### 3.1 Generic List
Java has provided generic support in `List` interface.

Syntax.
```java
List<T> list = new ArrayList<T>();
```
* `T` − The generic type parameter passed during list declaration.
* `list` − object of List interface.

Example.
```java
public class GenericListExample {
    public static void main(String[] args) {

        List<Integer> integerList = new ArrayList<Integer>();
        integerList.add(Integer.valueOf(10));
        integerList.add(Integer.valueOf(11));

        List<String> stringList = new ArrayList<String>();
        stringList.add("Hello World");
        stringList.add("Hi World");

        // access by index
        System.out.format("Integer Value: %d\n", integerList.get(0));
        System.out.format("String Value: %s\n", stringList.get(0));

        // for loop
        for(Integer data: integerList) {
            System.out.format("Integer Value: %d\n", data);
        }

        // iterator
        Iterator<String> stringIterator = stringList.iterator();
        while(stringIterator.hasNext()) {
            System.out.format("String Value: %s\n", stringIterator.next());
        }
    }
}
```
Output.
```raw
Integer Value: 10
String Value: Hello World
Integer Value: 10
Integer Value: 11
String Value: Hello World
String Value: Hi World
```
### 3.2 Generic Set
Java has provided generic support in `Set` interface.

Syntax.
```java
Set<T> set = new HashSet<T>();
```
* `T` − The generic type parameter passed during set declaration.
* `set` − object of Set Interface.

Example.
```java
public class GenericSetExample {
    public static void main(String[] args) {

        Set<Integer> integerSet = new HashSet<Integer>();
        integerSet.add(Integer.valueOf(10));
        integerSet.add(Integer.valueOf(11));

        Set<String> stringSet = new HashSet<String>();
        stringSet.add("Hello World");
        stringSet.add("Hi World");

        // for loop
        for(Integer data: integerSet) {
            System.out.format("Integer Value: %d\n", data);
        }

        // iterator
        Iterator<String> stringIterator = stringSet.iterator();
        while(stringIterator.hasNext()) {
            System.out.format("String Value: %s\n", stringIterator.next());
        }
    }
}
```
Output.
```raw
Integer Value: 10
Integer Value: 11
String Value: Hello World
String Value: Hi World
```
### 3.3 Generic Map
Java has provided generic support in `Map` interface.

Syntax.
```java
Map<K, V> map = new HashSet<K, V>();
```
* `T` − The generic type parameter passed during map declaration.
* `map` − object of Map Interface.

Example.
```java
public class GenericMapExample {
    public static void main(String[] args) {

        Map<Integer,Integer> integerMap = new HashMap<Integer,Integer>();
        integerMap.put(1, 10);
        integerMap.put(2, 11);

        Map<String,String> stringMap = new HashMap<String,String>();
        stringMap.put("A", "Hello World");
        stringMap.put("B","Hi World");

        // access by key
        System.out.format("Integer Value: %d\n", integerMap.get(1));
        System.out.format("String Value: %s\n", stringMap.get("A"));

        // iterate keys.
        Iterator<Integer> integerIterator   = integerMap.keySet().iterator();
        while(integerIterator.hasNext()) {
            System.out.format("Integer Value: %d\n", integerIterator.next());
        }

        // iterate values.
        Iterator<String> stringIterator   = stringMap.values().iterator();
        while(stringIterator.hasNext()) {
            System.out.format("String Value: %s\n", stringIterator.next());
        }
    }
}
```
Output.
```raw
Integer Value: 10
String Value: Hello World
Integer Value: 1
Integer Value: 2
String Value: Hello World
String Value: Hi World
```

## 4. Bounded Type
There may be times when you'll want to `restrict` the kinds of types that are allowed to be passed to a type parameter. For example, a method that operates on numbers might only want to accept instances of Number or its subclasses. This is what bounded type parameters are for.
### 4.1 Bounded Type Parameters
To declare a bounded type parameter, list the type parameter's name, followed by the `extends` keyword, followed by its upper bound.

Following example illustrates how **extends** is used in a general sense to mean either "extends" (as in classes) or "implements" (as in interfaces). This example is generic method to return the largest of three Comparable objects.

Example.
```java
public class BoundedTypeParametersExample {
    public static void main(String args[]) {
        System.out.format("Max of %d, %d and %d is %d\n",
                3, 4, 5, maximum(3, 4, 5));

        System.out.format("Max of %.1f,%.1f and %.1f is %.1f\n",
                6.6, 8.8, 7.7, maximum(6.6, 8.8, 7.7));

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
### 4.2 Multiple Bounds
A type parameter can have multiple bounds.

For example, we can define a generic method with multiple bounds as follows. The T is a type parameter passed to the generic method and should be subtype of Number class and must implements Comparable interface. In case a class is passed as bound, it should be passed first before interface otherwise compile time error will occur.
```java
public static <T extends Number & Comparable<T>> T maximum(T x, T y, T z)
```
* `T` − The generic type parameter passed to generic method. It can take any Object.
* `maximum` − The name of the generic method.

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

## 5. Wildcards
### 5.1 Using Wildcards
Wildcards can be used in three ways −
* Unbounded Wildcard − `?`
* Upper Bounded Wildcard − `? extends` Type.
* Lower Bounded Wildcard − `? super` Type.

See the difference between upper bound wildcard and lower bound wildcard.
![image](/assets/images/programming/2317/wildcards.png)

### 5.2 Unbounded Wildcards
The question mark (?), represents the wildcard, stands for `unknown` type in generics. There may be times when any object can be used when a method can be implemented using functionality provided in the Object class or When the code is independent of the type parameter. To declare a Unbounded Wildcard parameter, list the `?` only.

Example.
```java
public class UnboundedWildcardsExample {
    public static void main(String args[]) {
        List<Integer> integerList = Arrays.asList(1, 2, 3);
        printAll(integerList);
        List<Double> doubleList = Arrays.asList(1.1, 2.5, 3.8);
        printAll(doubleList);
    }

    public static void printAll(List<?> list) {
        for (Object item : list) {
            System.out.print(item + ", ");
        }
        System.out.println();
    }
}
```
Output.
```raw
1, 2, 3,
1.1, 2.5, 3.8,
```
### 5.3 Upper Bounded Wildcards
Upper bounded wildcards is used to restrict the kinds of types that are allowed to be passed to a type parameter. To declare a upper bounded wildcard parameter, list the `?`, followed by the `extends` keyword, followed by its upper bound.

Example.
```java
public class UpperBoundedWildcardsExample {
    public static void print(List<? extends Fruit> list, String type) {
        System.out.println(type + " list is printed");
    }

    public static void main(String[] args) {
        List<Food> foods = new ArrayList<>();
        List<Fruit> fruits = new ArrayList<>();
        List<Apple> apples = new ArrayList<>();
        List<Banana> bananas = new ArrayList<>();

        //compile time error: can't call print method
        //print(foods, "food" );

        //add fruit list
        print(fruits, "fruit");

        //add apple list
        print(apples, "apple");

        //add banana list
        print(bananas, "banana");
    }

    static class Food {}

    static class Fruit extends Food {}

    static class Apple extends Fruit {}

    static class Banana extends Fruit {}
}
```
Output.
```raw
fruit list is printed
apple list is printed
banana list is printed
```
### 5.4 Lower Bounded Wildcards
Lower bounded wildcards is also used to restrict the kinds of types that are allowed to be passed to a type parameter. To declare a lower bounded wildcard parameter, list the `?`, followed by the `super` keyword, followed by its lower bound.

Example.
```java
public class LowerBoundedWildcardsExample {
    public static void print(List<? super Fruit> list, String type) {
        System.out.println(type + " list is printed");
    }

    public static void main(String[] args) {
        List<Food> foods = new ArrayList<>();
        List<Fruit> fruits = new ArrayList<>();
        List<Apple> apples = new ArrayList<>();
        List<Banana> bananas = new ArrayList<>();

        //add food list
        print(foods, "food" );

        //add fruit list
        print(fruits, "fruit");

        //compile time error: can't call print method
        //print(apples, "apple");

        //compile time error: can't call print method
        //print(bananas, "banana");
    }

    static class Food {}

    static class Fruit extends Food {}

    static class Apple extends Fruit {}

    static class Banana extends Fruit {}
}
```
Output.
```raw
food list is printed
fruit list is printed
```

## 6. Source Files
* [Source files for Java Generics on GitHub](https://github.com/jojozhuang/java-programming/tree/master/java-core-generics)
* [Java Generic Diagrams(draw.io) in Google Drive](https://drive.google.com/file/d/1ZWtwBb5SGvGWUGzRgYw8YuXdGofBXdK4/view?usp=sharing)

## 7. References
* [Java Generics Tutorial](https://www.tutorialspoint.com/java_generics/index.htm)
* [Java Generics Example Tutorial – Generic Method, Class, Interface](https://www.journaldev.com/1663/java-generics-example-method-class-interface)
