---
layout: tutorial
key: programming
title: "Java Advanced - ClassNotFoundException vs. NoClassDefFoundError"
index: 2456
subcategory: java-advanced
date: 2017-03-02
tags: [ClassNotFoundException, NoClassDefFoundError]
---

> ClassNotFoundException vs. NoClassDefFoundError

## 1. Introduction
`ClassNotFoundException` and `NoClassDefFoundError` occur when a particular class is not found at runtime. However, they occur at different scenarios.
* ClassNotFoundException is an exception that occurs when you try to load a class at run time using **Class.forName()** or **loadClass()** methods and mentioned classes are not found in the classpath.
* NoClassDefFoundError is an error that occurs when a particular class is present at compile time, but was missing at run time.

## 2. ClassNotFoundException
ClassNotFoundException is a runtime exception that is thrown when an application tries to load a class at runtime using the **Class.forName()** or **loadClass()** or **findSystemClass()** methods ,and the class with specified name are not found in the classpath. For example, you may have come across this exception when you try to connect to MySQL or Oracle databases and you have not updated the classpath with required JAR files. Most of the time, this exception occurs when you try to run an application without updating the classpath with required JAR files.

For example, the below program will throw ClassNotFoundException if the mentioned class “oracle.jdbc.driver.OracleDriver” is not found in the classpath.
```java
public class ClassNotFoundExceptionExample {
    public static void main(String[] args) {
        try {
            Class.forName("oracle.jdbc.driver.OracleDriver");
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
    }
}
```
If you run the above program without updating the classpath with required JAR files, you will get an exception akin to:
```raw
java.lang.ClassNotFoundException: oracle.jdbc.driver.OracleDriver
  at java.net.URLClassLoader.findClass(URLClassLoader.java:381)
  at java.lang.ClassLoader.loadClass(ClassLoader.java:424)
  at sun.misc.Launcher$AppClassLoader.loadClass(Launcher.java:335)
  at java.lang.ClassLoader.loadClass(ClassLoader.java:357)
  at java.lang.Class.forName0(Native Method)
  at java.lang.Class.forName(Class.java:264)
  at johnny.java.advanced.classnotfound.ClassNotFoundExceptionExample.main(ClassNotFoundExceptionExample.java:6)
```

## 3. NoClassDefFoundError
NoClassDefFoundError is an error that is thrown when the Java Runtime System tries to load the definition of a class, and that class definition is no longer available. The required class definition was present at compile time, but it was missing at runtime.

For example, if we compile and run the following code, two **.class** files will be generated. One is **NoClassDefFoundErrorExample.class** and another one is **AnotherClass.class**. It runs successfully without any issue and we will get the output "from another class".
```java
package johnny.java.advanced.classnotfound;

public class AnotherClass {
    public void print() {
        System.out.println("from another class");
    }
}
```
```java
package johnny.java.advanced.classnotfound;

public class NoClassDefFoundErrorExample {
    public static void main(String[] args) {
        AnotherClass a = new AnotherClass();
        a.print();
    }
}
```
* If you are not using any IDE, you need to navigate to the folder where these two java files locate and run the following command.
```sh
javac -cp . classnotfound/*.java
```

However, if you remove the AnotherClass.class file and run the NoClassDefFoundErrorExample.class file, Java Runtime System will throw NoClassDefFoundError like below:
```raw
$ java -cp . johnny/java/advanced/classnotfound/NoClassDefFoundErrorExample
Exception in thread "main" java.lang.NoClassDefFoundError: johnny/java/advanced/classnotfound/AnotherClass
        at johnny.java.advanced.classnotfound.NoClassDefFoundErrorExample.main(NoClassDefFoundErrorExample.java:5)
Caused by: java.lang.ClassNotFoundException: johnny.java.advanced.classnotfound.AnotherClass
        at java.net.URLClassLoader.findClass(URLClassLoader.java:381)
        at java.lang.ClassLoader.loadClass(ClassLoader.java:424)
        at sun.misc.Launcher$AppClassLoader.loadClass(Launcher.java:331)
        at java.lang.ClassLoader.loadClass(ClassLoader.java:357)
        ... 1 more
```

## 4. Difference between ClassNotFoundException and NoClassDefFoundError

|ClassNotFoundException|NoClassDefFoundError|
-----------------------|--------------------|
|It is an exception. It is of type java.lang.Exception.|It is an error. It is of type java.lang.Error.|
|It occurs when an application tries to load a class at run time which is not updated in the classpath.|It occurs when java runtime system doesn’t find a class definition, which is present at compile time, but missing at run time.|
|It is thrown by the application itself. It is thrown by the methods like Class.forName(), loadClass() and findSystemClass().|It is thrown by the Java Runtime System.|
|It occurs when classpath is not updated with required JAR files.|It occurs when required class definition is missing at runtime.|

## 5. Source Files
* [Source files for Abstract Class and Interface on GitHub](https://github.com/jojozhuang/java-programming/tree/master/java-advanced-classnotfound)

## 6. References
* [ClassNotFoundException vs. NoClassDefFoundError](https://dzone.com/articles/java-classnotfoundexception-vs-noclassdeffounderro)
