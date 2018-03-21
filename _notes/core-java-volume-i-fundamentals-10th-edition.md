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

### 3.3.1 Four Integer Types

 Type | Storage Requirement | Range (Inclusive)
------|---------------------|----------------------
int   | 4 bytes             | –2,147,483,648 to 2,147,483, 647 (just over 2 billion)
short | 2 bytes             | –32,768 to 32,767
long  | 8 bytes             | –9,223,372,036,854,775,808 to 9,223,372,036,854,775,807
byte  | 1 byte              | –128 to 127

* Note that Java does not have any `unsigned versions` of the int, long, short, or byte types. In Java SE 8 and later, you can use the int data type to represent an unsigned 32-bit integer, which has a minimum value of 0 and a maximum value of 2^32-1. Use the Integer class to use int data type as an unsigned integer. Static methods like `compareUnsigned`, `divideUnsigned` etc have been added to the Integer class to support the arithmetic operations for unsigned integers. https://docs.oracle.com/javase/tutorial/java/nutsandbolts/datatypes.html.

Starting with Java SE 7, you can write numbers in binary, with a prefix `0b` or `0B`. For example, 0b1001 is 9. Also starting with Java SE 7, you can add underscores to number literals, such as `1_000_000` (or 0b1111_0100_0010_0100_0000) to denote one million. The underscores are for human eyes only. The Java compiler simply removes them.

### 3.3.2 Floating-Point Types

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

### 3.3.3 The char Type
```java
'A' //char
"A" //string
```
Values of type char can be expressed as hexadecimal values that run from `\u0000` to `\uFFFF`.

Unicode Explained: Internationalize Documents, Programs, and Web Sites
https://www.amazon.com/Unicode-Explained-Internationalize-Documents-Programs/dp/059610121X/

`strictfp` keyword
```java`
public static strictfp void main(String[] args)
```

The methods in the Math class use the routines in the computer’s floating- point unit for fastest performance. If completely predictable results are more important than performance, use the `StrictMath` class instead.

### 3.5.3 Casts
```java
double x = 9.997;
int nx = (int) x; // nx = 9;
int nx = (int) Math.round(x); // nx = 10;
```

```java
int m=7;
int n=7;
int a=2*++m; //now a is 16, m is 8
int b=2*n++; //now b is 14, n is 8
```

### 3.6.6 Code Points and Code Units
```java
String greeting = "Hello";
int n = greeting.length(); // is 5.
int cpCount = greeting.codePointCount(0, greeting.length());
```

StringBuilder, StringBuffer
Input, Scanner
```java
import java.util.*;

public class InputTest
{
    public static void main(String[] args)
    {
        Scanner in = new Scanner(System.in);

        // get first input
        System.out.print("What is your name? ");
        String name = in.nextLine();

        // get second input
        System.out.print("How old are you? ");
        int age = in.nextInt();

        // display output on console
        System.out.println("Hello, " + name + ". Next year, you'll be " + (age + 1));
    }
}
```
`Console.readPassword()` for reading password from concole.
```java
import java.io.Console;

public class PasswordTest {
    public static void main(String[] args)
    {
        Console cons = System.console();
        try {
            if (cons != null) {
                String username = cons.readLine("User name: ");
                // prints
                System.out.println("User name: " + username);
                // read password into the char array
                char[] pwd = cons.readPassword("Password: ");
                // prints
                System.out.println("Password is: "+ String.valueOf(pwd));
            }
        } catch(Exception ex) {
             ex.printStackTrace();
        }

    }
}
```
Run this program in terminal.
```
Johnny@Johnny-Mac:~$ java PasswordTest
User name: Johnny
User name: Johnny
Password:
Password is: 123
Johnny@Johnny-Mac:~$
```
If you run this program in Eclipse IDE through Run As-> Java Application, `System.console()` always return null. See the discussion on StackOverflow [System.console() returns null from Eclipse but fine with Command Prompt
](https://stackoverflow.com/questions/8969990/system-console-returns-null-from-eclipse-but-fine-with-command-prompt).
It's bug of Eclipse, https://bugs.eclipse.org/bugs/show_bug.cgi?id=122429.

### 3.7.3 File Input and Output
Read
```java
Scanner in = new Scanner(Paths.get("myfile.txt"), "UTF-8");
```
Write
```java
PrintWriter out = new PrintWriter("myfile.txt", "UTF-8");
```

### 3.8.4 Determinate Loops
Caution: For loop may never end when using floating-point numbers for comparison.
```java
public class DoubleLoop {
    public static void main(String[] args)
    {
        for (double x = 0; x != 1.0; x += 0.1) {
            System.out.println(x);
        }
    }
}
```
See the below output that before x gets bigger than 2. `x` jumps from `0.9999999999999999` to `1.0999999999999999`. It never equals to `1.0`.
```sh
0.0
0.1
0.2
0.30000000000000004
0.4
0.5
0.6
0.7
0.7999999999999999
0.8999999999999999
0.9999999999999999
1.0999999999999999
1.2
1.3
1.4000000000000001
1.5000000000000002
1.6000000000000003
1.7000000000000004
1.8000000000000005
1.9000000000000006
2.0000000000000004
```

BigInteger and BigDecimal.

```java
BigInteger c = a.add(b); // c = a + b
BigInteger d = c.multiply(b.add(BigInteger.valueOf(2))); // d = c * (b + 2)
```


Increase the size of an array with `Arrays.copyOf`.
```java
int[] arr = new int[3];
arr = Arrays.copyOf(arr, 2 * arr.length);
```

## 4. Objects and Classes
Procedural vs. OO programming  
Encapsulation, Inheritance


The most common relationships between classes are:
* Dependence (“uses–a”)
* Aggregation (“has–a”)
* Inheritance (“is–a”)

The expression new Date() makes an object of type Date, and its value is a reference to that newly created object. That reference is then stored in the deadline variable.
```java
Date deadline = new Date();
```

`Constructor`
* A constructor has the same name as the class.
* A class can have more than one constructor.
* A constructor can take zero, one, or more parameters.
* A constructor has no return value.
* A constructor is always called with the new operator.

Accessor Method:  
Do not write accessor methods that return references to mutable objects.
```java
class Employee {
    private Date hireDay;
    public Date getHireDay() {
        return hireDay; // Bad
    }
}
```
As a rule of thumb, always use `clone()` whenever you need to return a copy of a mutable field.
```java
class Employee {
    private Date hireDay;
    public Date getHireDay() {
        return (Date) hireDay.clone(); // Ok
    }
}
```

A method of the Employee class is permitted to access the `private` fields of any object of type Employee.
```java
public class PrivateAccess {
    public static void main(String[] args)
    {
        Employee johnny = new Employee("Johnny");
        Employee cindy = new Employee("Cindy");

        if (johnny.equals(cindy)) {
            System.out.println("Same employee!");
        } else {
            System.out.println("They are not the same employee!");
        }
    }
}

class Employee {
    private String name;

    public Employee(String name) {
        super();
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean equals(Employee other) {
        return name.equals(other.name); }  // equals method accesses private attribute name of other.

}
```
P185/1038

Reference:
Java Home at Oracle: http://www.oracle.com/technetwork/java/index.html
