---
layout: tutorial
key: programming
title: "Java Core - Enum"
index: 2306
subcategory: java-core
date: 2017-01-06
tags: [Enum, EnumSet, EnumMap]
---

> Enum and its advantages.

## 1. Java Enum
Enum was introduced in Java 1.5 as a new type whose fields consists of a fixed set of constants.

Enum example.
```java
enum PriorityEnum {
    LOW,
    MEDIUM,
    HIGH
}
```
Usage of enum.
```java
private static void enumLoop() {
    PriorityEnum prt = PriorityEnum.MEDIUM;
    System.out.println(prt);

    // Enum in a Switch Statement
    switch (prt) {
        case LOW:
            System.out.println("Low level");
            break;
        case MEDIUM:
            System.out.println("Medium level");
            break;
        case HIGH:
            System.out.println("High level");
            break;
    }

    // Loop Through an Enum
    for (PriorityEnum penum : PriorityEnum.values()) {
        System.out.println(penum);
    }
}
```

## 2. Enum vs Constants
Create Constants.
```java
class PriorityConstant {
    public static final int LOW = 1;
    public static final int MEDIUM = 2;
    public static final int HIGH = 3;
}
```
Example for showing the benefits of Enum over Constants.
```java
public static void main(String[] args) {
    // Compare the difference between Enum and Constant
    enumVsConstants();
}

private static void enumVsConstants() {
    //Enum values are fixed
    enumExample(PriorityEnum.LOW);
    enumExample(PriorityEnum.MEDIUM);
    enumExample(PriorityEnum.HIGH);
    enumExample(null);

    constantsExample(1);
    constantsExample(2);
    constantsExample(3);
    //we can pass any int constant
    constantsExample(4);
}

private static void enumExample(PriorityEnum p) {
    if (p == PriorityEnum.LOW) {
        System.out.println("Low level");
    } else if (p == PriorityEnum.MEDIUM) {
        System.out.println("Medium level");
    } else if (p == PriorityEnum.HIGH) {
        System.out.println("High level");
    } else {
        System.out.println("Invalid input!");
    }
}

private static void constantsExample(int p) {
    if (p == PriorityConstant.LOW) {
        System.out.println("Low level");
    } else if (p == PriorityConstant.MEDIUM) {
        System.out.println("Medium level");
    } else if (p == PriorityConstant.HIGH) {
        System.out.println("High level");
    } else {
        System.out.println("Invalid input!");
    }
}
```

Two problems with using constants that are solved by the enum.
* We can pass any int constant to the `constantsExample()` method but we can pass only fixed values to `enumExample()`, so it provides type safety.
* We can change the int constants value in `PriorityConstant` class but the above program will not throw any exception. It might not work as expected but if we change the enum constants, we will get compile time error that removes any possibility of runtime issues.

## 3. Methods in Enum
```java
import java.io.Closeable;
import java.io.IOException;

public enum ThreadStatesEnum implements Closeable {
    START(1){
        @Override
        public String toString(){
            return "START implementation. Priority="+getPriority();
        }

        @Override
        public String getDetail() {
            return "START";
        }
    },
    RUNNING(2){
        @Override
        public String getDetail() {
            return "RUNNING";
        }
    },
    WAITING(3){
        @Override
        public String getDetail() {
            return "WAITING";
        }
    },
    DEAD(4){
        @Override
        public String getDetail() {
            return "DEAD";
        }
    };

    private int priority;

    public abstract String getDetail();

    //Enum constructors should always be private.
    private ThreadStatesEnum(int i){
        priority = i;
    }

    //Enum can have methods
    public int getPriority(){
        return this.priority;
    }

    public void setPriority(int p){
        this.priority = p;
    }

    //Enum can override functions
    @Override
    public String toString(){
        return "Default ThreadStatesConstructors implementation. Priority="+getPriority();
    }

    @Override
    public void close() throws IOException {
        System.out.println("Close of Enum");
    }
}
```
Below are some of the important points for Enums in Java.
* All java enum implicitly extends `java.lang.Enum` class that extends Object class and implements Serializable and Comparable interfaces. So we can’t extend any class in enum.
* Since enum is a keyword, we can’t end package name with it, for example `johnny.java.enum` is not a valid package name.
* Enum can implement interfaces. As in above enum example, it’s implementing `Closeable` interface.
* Enum constructors are always private.
* We can’t create instance of enum using new operator.
* We can declare abstract methods in java enum, then all the enum fields must implement the abstract method. In above example getDetail() is the abstract method and all the enum fields have implemented it.
* We can define a method in enum and enum fields can override them too. For example, toString() method is defined in enum and enum field START has overridden it.
* Java enum fields has namespace, we can use enum field only with class name like ThreadStates.START
* Enums can be used in switch statement, we will see it in action in the later part of this tutorial.
* We can extend existing enum without breaking any existing functionality. For example, we can add a new field NEW in ThreadStates enum without impacting any existing functionality.
* Since enum fields are constants, java best practice is to write them in block letters and underscore for spaces. For example EAST, WEST, EAST_DIRECTION etc.
* Enum constants are implicitly static and final
* Enum constants are final but it’s variable can still be changed. For example, we can use setPriority() method to change the priority of enum constants. We will see it in usage in below example.
* Since enum constants are final, we can safely compare them using “==” and equals() methods. Both will have the same result.

Test enum.
```java
import java.io.IOException;
import java.util.EnumMap;
import java.util.EnumSet;
import java.util.Set;

public class EnumExample {
    public static void main(String[] args) throws IOException {

        usingEnumMethods();

        usingEnumValueOf();

        usingEnumValues();

        usingEnumInSwitch(ThreadStatesEnum.START);
        usingEnumInSwitch(ThreadStatesEnum.DEAD);

        usingEnumMap();

        usingEnumSet();
    }

    private static void usingEnumSet() {
        EnumSet<ThreadStatesEnum> enumSet = EnumSet.allOf(ThreadStatesEnum.class);
        for (ThreadStatesEnum tsenum : enumSet){
            System.out.println("Using EnumSet, priority = " + tsenum.getPriority());
        }
    }

    private static void usingEnumMap() {
        EnumMap<ThreadStatesEnum, String> enumMap = new EnumMap<ThreadStatesEnum,String>(ThreadStatesEnum.class);
        enumMap.put(ThreadStatesEnum.START, "Thread is started");
        enumMap.put(ThreadStatesEnum.RUNNING, "Thread is running");
        enumMap.put(ThreadStatesEnum.WAITING, "Thread is waiting");
        enumMap.put(ThreadStatesEnum.DEAD, "Thread is dead");

        Set<ThreadStatesEnum> keySet = enumMap.keySet();
        for(ThreadStatesEnum key : keySet){
            System.out.println("key="+key.toString()+":: value="+enumMap.get(key));
        }

    }

    private static void usingEnumInSwitch(ThreadStatesEnum th) {
        switch (th){
            case START:
                System.out.println("START thread");
                break;
            case WAITING:
                System.out.println("WAITING thread");
                break;
            case RUNNING:
                System.out.println("RUNNING thread");
                break;
            case DEAD:
                System.out.println("DEAD thread");
        }
    }

    private static void usingEnumValues() {
        ThreadStatesEnum[] thArray = ThreadStatesEnum.values();

        for(ThreadStatesEnum th : thArray){
            System.out.println(th.toString() + "::priority="+th.getPriority());
        }
    }

    private static void usingEnumValueOf() {
        ThreadStatesEnum th = Enum.valueOf(ThreadStatesEnum.class, "START");
        System.out.println("th priority="+th.getPriority());
    }

    private static void usingEnumMethods() throws IOException {
        ThreadStatesEnum thc = ThreadStatesEnum.DEAD;
        System.out.println("priority is:"+thc.getPriority());

        thc = ThreadStatesEnum.DEAD;
        System.out.println("Using overriden method."+thc.toString());

        thc = ThreadStatesEnum.START;
        System.out.println("Using overriden method."+thc.toString());
        thc.setPriority(10);
        System.out.println("Enum Constant variable changed priority value="+thc.getPriority());
        thc.close();
    }
}
```
Important Points  
* The usingEnumMethods() methods shows how to create an enum object and how we can use its methods. It’s also showing use of setPriority(int i) method to change the variable of enum.
* usingEnumValueOf() shows the usage of java.util.Enum valueOf(enumType, name) through which we can create an enum object from String. It throws IllegalArgumentException if the specified enum type has no constant with the specified name, or the specified class object does not represent an enum type. It also throws NullPointerException if any of the arguments are null.
* usingEnumValues() method shows the usage of values() method that returns an array containing all of the values of the enum in the order they are declared. Note that this method is automatically generated by java compiler for every enum. You won’t find values() implementation in java.util.Enum class.
* The usingEnumInSwitch() method shows how to use enum constants in switch case.
* usingEnumMap() method shows use of java.util.EnumMap, which is introduced in Java 1.5 Collections Framework. EnumMap is Map implementation for use with enum type keys. All of the keys in an enum map must come from a single enum type that is specified, explicitly or implicitly, when the map is created. We can’t use null as key for EnumMap and EnumMap is not synchronized.
* usingEnumSet() method shows use of java.util.EnumSet, which is Set implementation for use with enum types. All of the elements in an enum set must come from a single enum type that is specified, explicitly or implicitly, when the set is created. EnumSet is not synchronized and null elements are not allowed. It also provides some useful methods like copyOf(Collection<E> c), of(E first, E... rest) and complementOf(EnumSet<E> s).

## 4. Source Files
* [Source files for Java Enum on GitHub](https://github.com/jojozhuang/java-programming/tree/master/java-core-enum)

## 5. References
* [Enum in Java](https://www.journaldev.com/716/java-enum)
