---
layout: tutorial
key: note
title: "Java Interview Questions - Overview"
index: 9603
subcategory: interview-java
date: 2016-01-03
tags: [Java, Interview]
---

> Popular interview questions for Java.

## 1. Basics
### 1.1 JVM vs JRE vs JDK
* JVM - Java Virtual Machine: the virtual machine that runs the Java bytecodes.
* JRE - Java Runtime Environment: provides the libraries, the Java Virtual Machine, and other components to run applications written in the Java programming language.
* JDK - Java Development Kit: The JDK is a superset of the JRE, and contains everything that is in the JRE, plus tools such as the compilers and debuggers necessary for developing applets and applications.

![image](/public/images/note/9603/jvm_jre_jdk.png){:width="500px"}  
![image](/public/images/note/9603/jvm_jre_jdk2.png){:width="400px"}  

### 1.2 ClassLoader
Classloader is a subsystem of JVM which is used to load class files. Whenever we run the java program, it is loaded first by the classloader. There are three built-in classloaders in Java.

* `Bootstrap ClassLoader`: This is the first classloader which is the superclass of Extension classloader. It loads the rt.jar file which contains all class files of Java Standard Edition like java.lang package classes, java.net package classes, java.util package classes, java.io package classes, java.sql package classes, etc.
* `Extension ClassLoader`: This is the child classloader of Bootstrap and parent classloader of System classloader. It loads the jar files located inside $JAVA_HOME/jre/lib/ext directory.
* `System/Application ClassLoader`: This is the child classloader of Extension classloader. It loads the class files from the classpath. By default, the classpath is set to the current directory. You can change the classpath using "-cp" or "-classpath" switch. It is also known as Application classloader.

### 1.3 Access Modifiers
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

### 1.4 Difference between Constructor and Method
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

### 1.5 Static Method vs Instance Method

static or class method | instance method
-----------------------|-------------------------
A method that is declared as `static` is known as the static method. | A method that is not declared as static is known as the instance method.
We don't need to create the objects to call the static methods. | The object is required to call the instance methods.
Non-static (instance) members cannot be accessed in the static context (static method, static block, and static nested class) directly. | Static and non-static variables both can be accessed in instance methods.

## 2. Frequently Asked Questions
### 2.1 String, StringBuilder, StringBuffer

Feature     | String | StringBuilder | StringBuffer
------------|--------|---------------|-------------
mutable     | No     | Yes           | Yes
thread-safe | Yes    | No            | Yes

### 2.2 Errors vs Exceptions In Java
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

### 2.3 Shallow copy VS Deep copy

Values                           | Shallow copy | Deep copy
---------------------------------|--------------|-----------
Primitive Type - Value           | Copied       | Copied
Reference Type - Reference       | Copied       | Copied
Reference Type - Referred Object | Not copied   | Copied

Object clone.
![image](/public/images/java/java-core-shallow-copy-vs-deep-copy/object_clone.jpg){:width="400px"}  


### 2.4 OOP vs Functional Programming vs Procedural Programming


### 2.5 Finalize, Final, Finally

### 2.6 Exception

## 3. Lamda expression

## 4. References
* [Java Interview Questions](https://www.tutorialspoint.com/java/java_interview_questions.htm)
* [Java Interview Questions](https://www.journaldev.com/java-interview-questions)
* [300 Core Java Interview Questions](https://www.javatpoint.com/corejava-interview-questions)
* [Errors V/s Exceptions In Java](https://www.geeksforgeeks.org/errors-v-s-exceptions-in-java/)
* [Comparable and Comparator in Java Example](https://www.journaldev.com/780/comparable-and-comparator-in-java-example)
