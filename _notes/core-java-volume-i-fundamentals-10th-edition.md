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
Encapsulation, Inheritance, Polymorphism


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

Method Parameters  
The term `call by value` means that the method gets just the value that the caller provides. In contrast, `call by reference` means that the method gets the location of the variable that the caller provides. The Java programming language `always` uses call by value. That means that the method gets a copy of all parameter values.

Here is a summary of what you can and cannot do with method parameters in Java:
* A method cannot modify a parameter of a primitive type (that is, numbers or boolean values).
* A method can change the state of an object parameter.
* A method cannot make an object parameter refer to a new object.

For the third one, see the example below.
```java
public static void main(String[] args) {
    Employee a = new Employee("Alice");
    Employee b = new Employee("Bob");
    swap(a, b);
    // now, does a refer to Bob, b to Alice? No.
    System.out.println("After: a=" + a.getName()); //After: a=Alice
    System.out.println("After: b=" + b.getName()); //After: b=Bob
}

public void swap(Employee x, Employee y) {
    // x refers to Alice, y to Bob  
    Employee temp = x;
    x=y;
    y = temp;
    // now x refers to Bob, y to Alice
    System.out.println("End of method: x=" + x.getName());  //End of method: x=Bob
    System.out.println("End of method: x=" + x.getName());  //End of method: y=Alice
}
```
The parameter variables x and y in swap method are swapped. But ultimately, this is a wasted effort. When the method ends, the parameter variables x and y are abandoned. The original variables a and b still refer to the same objects as they did before the method call.

For Integer, it won't work either, even if Integer is object type. Because Integer objects are immutable.
```java
public static void main(String[] args)
{
    int x = 2;
    System.out.println("Before: x=" + x); // Before: x=2
    triple(x);
    System.out.println("After: x=" + x); // After: x=2
}

private static void triple(Integer x) {
    x = 3 * x;
}
```
Class Importation
```java
import java.time.LocalDate;
import java.util.*;
LocalDate today = LocalDate.now();
```
Static Imports
```java
import static java.lang.System.*;
out.println("Goodbye, World!"); // i.e., System.out
exit(0); // i.e., System.exit
```

## 5. Inheritance
Java does not support multiple inheritance.
5.1.9 Abstract Classes
A class with one or more abstract methods must itself be declared abstract.
```java
public abstract class Person {
...
public abstract String getDescription(); }
```

Abstract methods act as placeholders for methods that are implemented in the subclasses. When you extend an abstract class, you have two choices. You can leave some or all of the abstract methods undefined; then you must tag the subclass as `abstract as well`. Or you can define all methods, and the subclass is `no longer` abstract.

* A class can even be declared as abstract though it has no abstract methods.
* Abstract classes cannot be instantiated.

Here is a summary of the four access modifiers in Java that control visibility:
* Visible to the class only (private).
* Visible to the world (public).
* Visible to the package and all subclasses (protected).
* Visible to the package—the (unfortunate) default. No modifiers are needed.

5.2 Object: The Cosmic Superclass
The `equals` method  
The Java Language Specification requires that the `equals` method has the following properties:
* It is `reflexive`: For any non-null reference x, x.equals(x) should return true.
* It is `symmetric`: For any references x and y, x.equals(y) should return true if and
only if y.equals(x) returns true.
* It is `transitive`: For any references x, y, and z, if x.equals(y) returns true and
y.equals(z) returns true, then x.equals(z) should return true.
* It is` consisten`t: If the objects to which x and y refer haven’t changed, then
repeated calls to x.equals(y) return the same value.
* For any `non-null` reference x, x.equals(null) should return false.

Here is a recipe for writing the perfect equals method:
1. Name the explicit parameter otherObject—later, you will need to cast it to another variable that you should call other.
2. Test whether this happens to be identical to otherObject:
```java
 if (this == otherObject) return true;
```
This statement is just an optimization. In practice, this is a common case. It is much cheaper to check for identity than to compare the  elds.
3. Test whether otherObject is null and return false if it is. This test is required.
```java
if (otherObject == null) return false;
```
4. Compare the classes of this and otherObject. If the semantics of equals can change in subclasses, use the getClass test:
```java
if (getClass() != otherObject.getClass()) return false;
```
If the same semantics holds for all subclasses, you can use an instanceof test:
```java
if (!(otherObject instanceof ClassName)) return false;
```

5. Cast otherObject to a variable of your class type:
```java
 ClassName other \= (ClassName) otherObject
```
6. Now compare the fields, as required by your notion of equality. Use == for primitive type fields, Objects.equals for object fields. Return true if all fields match, false otherwise.
```java
return field1 == other.field1
&& Objects.equals(field2, other.field2)
&&...;
```
If you redefine equals in a subclass, include a call to super.equals(other).

Wrong
```java
public class Employee {
    public boolean equals(Employee other) {
    }
}
```
Correct
```java
public class Employee {
    @Override // 1. should be override
    public boolean equals(Object other) { // should use Object as input parameter
    }
}
```

5.2.3 The hashCode Method
The String class uses the following algorithm to compute the hash code:
```java
int hash = 0;
for (int i = 0; i < length(); i++) {
    hash = 31 * hash + charAt(i);
}
```

```java
String s = "Ok";
StringBuilder sb = new StringBuilder(s);
System.out.println(s.hashCode() + " " + sb.hashCode()); // s=2556, sb=20526976
String t = new String("Ok");
StringBuilder tb = new StringBuilder(t);
System.out.println(t.hashCode() + " " + tb.hashCode()); // t=2556, tb=20527144
```
Note that the strings s and t have the same hash code because, `for strings, the hash codes are derived from their contents`. The string builders sb and tb have different hash codes because no hashCode method has been de ned for the StringBuilder class and the default hashCode method in the Object class derives `the hash code from the object’s memory address`.

If you redefine the equals method, you will also need to redefine the hashCode method for objects.
```java
public class Employee {
    public int hashCode() {
        return 7 * Objects.hashCode(name)
               + 11 * Double.hashCode(salary)
               + 13 * Objects.hashCode(hireDay);
    }
}
```
Or much simpler.
```java
public class Employee {
    public int hashCode() {
        return Objects.hash(name, salary, hireDay);
    }
}
```
Your definitions of `equals` and `hashCode` must be compatible: If x.equals(y) is true, then x.hashCode() must return the same value as y.hashCode().
5.2.4 The toString Method
`toString` method returns a string representing the value of this object.
```java
public String toString() {
    return getClass().getName() + "[name=" + name
    + ",salary=" + salary
    + ",hireDay=" + hireDay + "]";
}
```
```java
Point p = new Point(10, 20);
System.out.println(p); // java.awt.Point[x=10,y=20], toString() has been overrided

System.out.println(System.out) // java.io.PrintStream@2f6684, toString() hasn't been overrided
```

5.3 Generic Array Lists
Initial the capacity.
```java
ArrayList<Employee> staff = new ArrayList<>();
staff.ensureCapacity(100);

//or
ArrayList<Employee> staff = new ArrayList<>(100);
```
The first 100 calls to add will not involve any costly reallocation.

5.4 Object Wrappers and Autoboxing
Boxing: Convert primary type to object type.
Unboxing: Convert object type to primary type.

P283/1038

Reference:
Java Home at Oracle: http://www.oracle.com/technetwork/java/index.html
