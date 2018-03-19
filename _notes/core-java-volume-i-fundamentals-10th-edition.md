---
layout: note
key: note
title: "Core Java Volume I--Fundamentals (10th Edition)"
index: 201
category: language
---

> Book: Core Java Volume I--Fundamentals (10th Edition)  
Author: Cay S. Horstmann  
![image](/public/notes/core-java-volume-i-fundamentals-10th-edition/cover.jpg){:width="300px"}  

## 1. An Introduction to Java
The Java “White Paper” Buzzwords

* 1. Simple
* 2. Object-Oriented
* 3. Distributed
* 4. Robust
* 5. Secure
* 6. Architecture-Neutral
* 7. Portable
* 8. Interpreted
* 9. High-Performance
* 10. Multithreaded
* 11. Dynamic

Java programs that work on web pages are called `applets`. It is replaced by Adobe Flash later.
Java history: Green Project in Sun by Patrick Naughton and `James Gosling`. Name: Oak -> Java.

Evolution of the Java Language

 Version | Year | New Language Features  | Number of Classes and Interfaces
---------|------|------------------------|-----------------------------------
 1.0     | 1996 | The language itself    | 211
 1.1     | 1997 | Inner classes          | 477
 1.2     | 1998 | The strictfp modifier  | 1,524
 1.3     | 2000 | None                   | 1,840
 1.4     | 2002 | Assertions             | 2,723
 5.0     | 2004 | Generic classes, “for each” loop, varargs, autoboxing, metadata, enumerations, static import | 3,279
 6       | 2006 | None                   | 3,793
 7       | 2011 | Switch with strings, diamond operator, binary literals, exception handling enhancements | 4,024
 8       | 2014 | Lambda expressions, interfaces with default methods, stream and date/time libraries | 4,240


In the early days of Java, the language was interpreted. Nowadays, the Java vir- tual machine uses a just-in-time compiler. hot spot, hot swap.

## 2. The Java Programming Environment
Download Java Development Kit(JDK), http://www.oracle.com/technetwork/java/javase/downloads/index.html.

Fortunately, in 2006, the numbering was simpli ed. The next version of the Java Standard Edition was called Java SE 6, followed by Java SE 7 and Java SE 8. However, the “internal” version numbers are 1.6.0, 1.7.0, and 1.8.0.

When Oracle makes a minor version change to  x urgent issues, it refers to the change as an update. For example, Java SE `8u31` is the 31st update of Java SE 8, and it has the internal version number `1.8.0_31`. An update does not need to be installed over a prior version—it contains the most current version of the whole JDK. Also, not all updates are released to the public, so don’t panic if update 31 isn’t followed by update 32.

Java Jargon

 Name                     | Acronym | Explanation
--------------------------|---------|-----------
 Java Development Kit     | JDK     | The software for programmers who want to write Java programs
 Java Runtime Environment | JRE     | The software for consumers who want to run Java programs
 Server JRE               | —       | The software for running Java programs on servers
 Standard Edition         | SE      | The Java platform for use on desktops and simple server applications
 Enterprise Edition       | EE      | The Java platform for complex server applications
 Micro Edition            | ME      | The Java platform for use on cell phones and other small devices
 Java FX                  | —       | An alternate toolkit for graphical user interfaces that is included in Oracle’s Java SE distribution
 OpenJDK                  | —       | A free and open source implementation of Java SE. It does not include browser integration or JavaFX.
 Java 2                   | J2      | An outdated term that described Java versions from 1998 until 2006
 Software Development Kit | SDK     | An outdated term that described the JDK from 1998 until 2006
 Update                   | u       | Oracle’s term for a bug  x release
 NetBeans                 | -       | Oracle’s integrated development environment

Building and Running Applets
```sh
javac RoadApplet.java
jar cvfm RoadApplet.jar RoadApplet.mf *.class
appletviewer RoadApplet.html
```
## 3. Fundamental Programming Structures in Java
Camel Case
```java
public class FirstSample {
public static void main(String[] args) {
    System.out.println("We will not use 'Hello, World!'"); }
}
```

Java is a `strongly typed` language.

Four Integer Types

 Type | Storage Requirement | Range (Inclusive)
------|---------------------|----------------------
int   | 4 bytes             | –2,147,483,648 to 2,147,483, 647 (just over 2 billion)
short | 2 bytes             | –32,768 to 32,767
long  | 8 bytes             | –9,223,372,036,854,775,808 to 9,223,372,036,854,775,807
byte  | 1 byte              | –128 to 127

* Note that Java does not have any `unsigned versions` of the int, long, short, or byte types. In Java SE 8 and later, you can use the int data type to represent an unsigned 32-bit integer, which has a minimum value of 0 and a maximum value of 2^32-1. Use the Integer class to use int data type as an unsigned integer. Static methods like `compareUnsigned`, `divideUnsigned` etc have been added to the Integer class to support the arithmetic operations for unsigned integers. https://docs.oracle.com/javase/tutorial/java/nutsandbolts/datatypes.html.

Starting with Java SE 7, you can write numbers in binary, with a prefix `0b` or `0B`. For example, 0b1001 is 9. Also starting with Java SE 7, you can add underscores to number literals, such as `1_000_000` (or 0b1111_0100_0010_0100_0000) to denote one million. The underscores are for human eyes only. The Java compiler simply removes them.

Floating-Point Types

Type  | Storage Requirement | Range (Inclusive)
------|---------------------|----------------------
float | 4 bytes             | Approximately ±3.40282347E+38F (6–7 significant decimal digits)
long  | 8 bytes             | Approximately ±1.79769313486231570E+308 (15 significant decimal digits)

* Numbers of type float have a suffix F or f (for example, 3.14F). `Floating-point numbers without an F suffix (such as 3.14) are always considered to be of type double.` You can optionally supply the D or d suffix (for example, 3.14D).

There are three special floating-point values to denote overflows and errors:
* Positive infinity  // 5/0
* Negative infinity  
* NaN (not a number) // 0/0 or square root of a negative number.

```java
if (x == Double.NaN) // is never true
if (Double.isNaN(x)) // check whether x is "not a number"
```

Floating-point numbers are not suitable for  financial calculations in which roundoff errors cannot be tolerated. For example, the command `System.out.println(2.0 - 1.1)` prints `0.8999999999999999`, not 0.9 as you would expect. Such roundoff errors are caused by the fact that floating-point numbers are represented in the binary number system. There is no precise binary representation of the fraction 1/10, just as there is no accurate representation of the fraction 1/3 in the decimal system. If you need precise numerical computations without roundoff errors, use the `BigDecimal` class, which is introduced later in this chapter.

P75/1038

Reference:
Java Home at Oracle: http://www.oracle.com/technetwork/java/index.html
