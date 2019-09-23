---
layout: tutorial
key: note
title: "Java Interview Questions - Overview"
index: 9603
subcategory: interview-java
date: 2016-01-03
tags: [Java, Interview]
---

> Frequently asked Java questions.

## 1. JVM
### 1.1 JVM vs JRE vs JDK
* JVM - Java Virtual Machine: the virtual machine that runs the Java bytecodes.
* JRE - Java Runtime Environment: provides the libraries, the Java Virtual Machine, and other components to run applications written in the Java programming language.
* JDK - Java Development Kit: The JDK is a superset of the JRE, and contains everything that is in the JRE, plus tools such as the compilers and debuggers necessary for developing applets and applications.

![image](/assets/images/note/9603/jvm_jre_jdk.png){:width="450px"}  
![image](/assets/images/note/9603/jvm_jre_jdk2.png){:width="350px"}

### 1.2 JVM Architecture
![image](/assets/images/note/9603/jvm-architecture.png){:width="700px"}
### 1.3 ClassLoader
* Loading (`ClassNotFoundException` may occur during load)
  - BootStrap Class Loader: **jre/lib/rt.jar**
  - Extension Class Loader: **jre/lib/ext**
  - Application Class Loader: **CLASSPATH Env Variable**
* Linking
  - Verify
  - Prepare
  - Resolve (`NoClassDefFoundError` may occur during resolution)
* Initialization

![image](/assets/images/note/9603/class-loader.png){:width="600px"}

## 2. OOP
### 2.1 Access Modifiers
In Java, access specifiers are the keywords which are used to define the access scope of the method, class, or a variable. In Java, there are four access specifiers given below.

* `public`: The classes, methods, or variables which are defined as public, can be accessed by any class or method.
* `protected`: Protected can be accessed by the class of the same package, or by the sub-class of this class, or within the same class.
* `default`: Default are accessible within the package only. By default, all the classes, methods, and variables are of default scope.
* `private`: The private class, methods, or variables defined as private can be accessed within the class only.

<div class="table-responsive-sm" markdown="block">  

Access Modifiers        | private | default | protected | public
------------------------|---------|---------|-----------|--------
Inside Class            | Y       | Y       | Y         | Y
Same Package Class      | N       | Y       | Y         | Y
Same Package Sub-Class  | N       | Y       | Y         | Y
Other Package Class     | N       | N       | N         | Y
Other Package Sub-Class | N       | N       | Y         | Y
{: .table-striped }

</div>

### 2.2 Difference between Constructor and Method
A constructor in Java is a block of code similar to a method that’s called when an instance of an object is created.
* The constructor can't be `final`.
* The constructor can't be inherited.
* The constructor can be overloaded.

Java Constructor                                            | Java Method
------------------------------------------------------------|--------------------
A constructor is used to initialize the state of an object. | A method is used to expose the behavior of an object.
A constructor must not have a return type.                  | A method must have a return type, otherwise it will be consider as constructor.
Constructor is invoked implicitly when the `new` keyword creates an object. | Method is invoked explicitly on an object.
The Java compiler provides a default constructor if you don't have any constructor in a class. | Method is not provided by the compiler in any case.
Constructor name must be same as the class name.            | Method name may or may not be same as class name.

### 2.3 Static Method vs Instance Method

static or class method | instance method
-----------------------|-------------------------
A method that is declared as `static` is known as the static method. | A method that is not declared as static is known as the instance method.
We don't need to create the objects to call the static methods. | The object is required to call the instance methods.
Non-static (instance) members cannot be accessed in the static context (static method, static block, and static nested class) directly. | Static and non-static variables both can be accessed in instance methods.

## 3. Frequently Asked Questions
### 3.1 String, StringBuilder, StringBuffer

Feature     | String | StringBuilder | StringBuffer
------------|--------|---------------|-------------
mutable     | No     | Yes           | Yes
thread-safe | Yes    | No            | Yes

### 3.2 Final, Finally and Finalize
The differences are given below.

No.  | final  |  finally | finalize
-----|--------|----------|-----------
1  | Final is used to apply restrictions on class, method and variable. Final class can't be inherited, final method can't be overridden and final variable value can't be changed. | Finally is used to place important code, it will be executed no matter whether exception is handled or not. | Finalize is used to perform clean up processing just before object is garbage collected.
2  | Final is a keyword. | Finally is a block. | Finalize is a method.

Java final example:
```java
class FinalExample {
    public static void main(String[] args){
        final int x = 100;
        x = 200; //Compile Time Error
    }
}  
```
Java finally example:
```java
class FinallyExample{
    public static void main(String[] args) {
        try {
            int x = 300;
        } catch(Exception e) {
            System.out.println(e);
        } finally {
            System.out.println("finally block is executed");
        }
    }
}
```
Java finalize example:
```java
class FinalizeExample {
    public void finalize(){
        System.out.println("finalize called");
    }

    public static void main(String[] args) {
        FinalizeExample f1 = new FinalizeExample();
        FinalizeExample f2 = new FinalizeExample();
        f1 = null;
        f2 = null;
        System.gc();
    }
}
```


### 3.3 Shallow copy VS Deep copy

Values                           | Shallow copy | Deep copy
---------------------------------|--------------|-----------
Primitive Type - Value           | Copied       | Copied
Reference Type - Reference       | Copied       | Copied
Reference Type - Referred Object | Not copied   | Copied

Object clone.
![image](/assets/images/note/9603/object_clone.jpg){:width="400px"}  

### 3.4 Errors vs Exceptions In Java
Both Errors and Exceptions are the subclasses of `java.lang.Throwable` class.

`Errors` are the conditions which cannot get recovered by any handling techniques. It surely cause termination of the program abnormally. Errors belong to unchecked type and mostly occur at runtime. Some of the examples of errors are Out of memory error or a System crash error.

`Exceptions` are the conditions that occur at runtime and may cause the termination of program. But they are recoverable using try, catch and throw keywords. Exceptions are divided into two categories : `checked` and `unchecked` exceptions. Checked exceptions like IOException known to the compiler at compile time while unchecked exceptions like ArrayIndexOutOfBoundException known to the compiler at runtime. It is mostly caused by the program written by the programmer.

Errors                                 | Exceptions
---------------------------------------|--------------------------------------------
Recovering from Error is not possible. | We can recover from exceptions by either using try-catch block or throwing exceptions back to caller.
All errors in java are unchecked type. | Exceptions include both checked as well as unchecked type.
Errors are mostly caused by the environment in which program is running. | Program itself is responsible for causing exceptions.
Errors occur at runtime and not known to the compiler. | All exceptions occurs at runtime but checked exceptions are known to compiler while unchecked are not.
They are defined in java.lang.Error package. | They are defined in java.lang.Exception package
Examples: <br> java.lang.StackOverflowError, java.lang.OutOfMemoryError | Examples : <br> Checked Exceptions : SQLException, IOException <br> Unchecked Exceptions :  ArrayIndexOutOfBoundException, NullPointerException, ArithmeticException.

## 4. Programming Paradigm
### 4.1 What is Programming Paradigms?
A programming paradigm does not refer to a specific language but rather to a way to program, a methodology. Programming paradigm is an approach to solve problem using some programming language or also we can say it is a method to solve a problem using tools and techniques that are available to us following some approach.
### 4.2 Types of Programming Paradigms
* Imperative programming paradigm
  - Procedural programming paradigm
  - Object oriented programming
  - Parallel processing approach
* Declarative programming paradigm
  - Logic programming paradigms
  - Functional programming paradigms
  - Database/Data driven programming approach

### 4.3 OOP vs Functional Programming vs Procedural Programming
Definition on Wikipedia.
* `Functional programming (FP)` is a programming paradigm — a style of building the structure and elements of computer programs — that treats computation as the evaluation of mathematical **functions** and avoids changing-state and mutable data.
* `Object-oriented programming (OOP)` is a programming paradigm based on the concept of **objects**, which may contain data, in the form of fields, often known as attributes; and code, in the form of procedures, often known as methods.
* `Procedural programming` is a programming paradigm, derived from structured programming, based upon the concept of the procedure call. Procedures, also known as routines, subroutines, or functions, simply contain a series of computational steps to be carried out.

## 5. Lamda expression

## 6. References
* [Java Interview Questions](https://www.tutorialspoint.com/java/java_interview_questions.htm)
* [Java Interview Questions](https://www.journaldev.com/java-interview-questions)
* [300 Core Java Interview Questions](https://www.javatpoint.com/corejava-interview-questions)
* [Errors V/s Exceptions In Java](https://www.geeksforgeeks.org/errors-v-s-exceptions-in-java/)
* [Introduction of Programming Paradigms](https://www.geeksforgeeks.org/introduction-of-programming-paradigms/)
* [Functional vs Object-Oriented vs Procedural Programming](https://medium.com/@LiliOuakninFelsen/functional-vs-object-oriented-vs-procedural-programming-a3d4585557f3)
* [Difference between final, finally and finalize](https://www.javatpoint.com/difference-between-final-finally-and-finalize)
