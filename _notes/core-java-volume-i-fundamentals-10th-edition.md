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

5.7 Reflection
'getClass', 'getName'
```java
Employee e;
System.out.println(e.getClass().getName() + " " + e.getName()); // Employee Harry Hacker
```
Use `newInstance` to create a new instance of the same class type as object.
```java
object.getClass().newInstance();
```
Create a new instance with the given class name.
```java
String s = "java.util.Random";
Object m = Class.forName(s).newInstance();
```

Use `setAccessible` to change access permission.
```java
Employee harry = new Employee("Harry Hacker", 35000, 10, 1, 1989);
Class cl = harry.getClass();
// the class object representing Employee
Field f = cl.getDeclaredField("name");
// the name field of the Employee class, it is private.
f.setAccessible(true);
// now OK to call f.get(harry);
Object v = f.get(harry);
// the value of the name field of the harry object, i.e., the String object "Harry Hacker"
```

5.7.6 Invoking Arbitrary Methods
```java
Employee harry = new Employee("Harry Hacker", 35000, 10, 1, 1989);
Method m1 = Employee.class.getMethod("getName");
String n = (String) m1.invoke(harry);
```

## 6. Interfaces, Lambda Expressions, and Inner Classes
### 6.1 The `Comparable` interface.
Use Integer.compare or Double.compare to compare two variables to avoid overflowing.
```java
public int compareTo(Employee other) {
    return Double.compare(salary, other.salary);
}
```
The documentation of the Comparable interface suggests that the compareTo method should be compatible with the equals method. `That is, x.compareTo(y) should be zero exactly when x.equals(y).` Most classes in the Java API that implement Comparable follow this advice. A notable exception is BigDecimal. `Consider x = new BigDecimal("1.0") and y = new BigDecimal("1.00"). Then x.equals(y) is false because the numbers differ in precision.` But x.compareTo(y) is zero. Ideally, it shouldn’t be, but there was no obvious way of deciding which one should come first.

`Default Methods In Interface`
Before Java 8, interfaces could have only abstract methods. The implementation of these methods has to be provided in a separate class. So, if a new method is to be added in an interface then its implementation code has to be provided in the class implementing the same interface. To overcome this issue, Java 8 has introduced the concept of default methods which allow the interfaces to have methods with implementation without affecting the classes that implement the interface.
https://www.geeksforgeeks.org/default-methods-java/

### 6.2.2 The Comparator Interface
```java
public interface Comparator<T> {
    int compare(T first, T second);
}
```
### 6.2.3 The Cloneable interface
```java
protected Object clone() throws CloneNotSupportedException  
```
6.3 Lambda Expressions
```java
Arrays.sort(words, (first, second) -> first.length() - second.length());
```
6.3.4 Method References
```java
Timer t = new Timer(1000, event -> System.out.println(event));
Timer t = new Timer(1000, System.out::println);
```
The `::` operator separates the method name from the name of an object or class. There are three principal cases:
* object::instanceMethod
* Class::staticMethod
* Class::instanceMethod

6.3.5 Constructor References
`Class::new`
```java
ArrayList<String> names = . . .;
Stream<Person> stream = names.stream().map(Person::new);
List<Person> people = stream.collect(Collectors.toList());
```
6.3.8 More about Comparators
```java
Arrays.sort(people, Comparator.comparing(Person::getName));
Arrays.sort(people, Comparator.comparing(Person::getLastName).thenComparing(Person::getFirstName));
```

6.4 Inner Classes
6.5 Proxies
An `invocation handler` is an object of any class that implements the `InvocationHandler` interface. That interface has a single method:
```java
Object invoke(Object proxy, Method method, Object[] args)
```

Sample
https://dzone.com/articles/java-dynamic-proxy
```java
import java.lang.reflect.InvocationHandler;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;

public class JdkProxyDemo {
    interface If {
        void originalMethod(String s);
    }
    static class Original implements If {
        public void originalMethod(String s) {
            System.out.println(s);
        }
    }
    static class Handler implements InvocationHandler {
        private final If original;
        public Handler(If original) {
            this.original = original;
        }
        public Object invoke(Object proxy, Method method, Object[] args)
                throws IllegalAccessException, IllegalArgumentException,
                InvocationTargetException {
            System.out.println("BEFORE");
            method.invoke(original, args);
            System.out.println("AFTER");
            return null;
        }
    }
    public static void main(String[] args){
        Original original = new Original();
        Handler handler = new Handler(original);
        If f = (If) Proxy.newProxyInstance(If.class.getClassLoader(),
                new Class[] { If.class },
                handler);
        f.originalMethod("Hello");
        f.originalMethod("SecondCall");
    }
}
```
Output
```sh
BEFORE
Hello
AFTER
BEFORE
SecondCall
AFTER
```
More:
https://opencredo.com/dynamic-proxies-java-part-2/
https://opencredo.com/dynamic-proxies-java/

## Chapter 7 Exceptions, Assertions, and Logging In this chapter
Throwable: Error and Exception.

As a general rule, you should catch those exceptions that you know how to handle and propagate those that you do not know how to handle.
```java
try {
    //code that might throw exceptions
}
catch (FileNotFoundException | UnknownHostException e) {
    //emergency action for missing files and unknown hosts
}
catch (IOException e) {
    //emergency action for all other I/O problems
}
```
Decouple try/catch and try/finally blocks.
```java
InputStream in = . . .;
try
{
    try {
        //code that might throw exceptions
    }
    finally {
        in.close();
    }
}
catch (IOException e) {
    //show error message
}
```
The inner try block has a single responsibility: to make sure that the input stream is closed. The outer try block has a single responsibility: to ensure that errors are reported. Not only is this solution clearer, it is also more functional: Errors in the finally clause are reported.

Caution: A finally clause can yield unexpected results when it contains return statements.
```java

public class Finally {
    public static void main(String[] args)
    {
        int res = foo(2);
        System.out.println("res=" + res);    // res = 0
        int res2 = foo2(2);
        System.out.println("res2=" + res2);  // res2 = 4
        int res3 = foo3(2);
        System.out.println("res3=" + res3);  // res3 = 4
        int res4 = foo4(2);
        System.out.println("res4=" + res4);  // res3 = 4
    }

    public static int foo(int n) {
        try {
            int res = n * n;
            return res;
        }
        finally {
            return 0; // override the value in try block.
        }
    }

    public static int foo2(int n) {
        int res = 1;
        try {
            res = n * n;
        }
        finally {
            return res;
        }
    }

    public static int foo3(int n) {
        int res = 1;
        try
        {
            try {
                res = n * n;
                res = n / 0;
                return res;
            }
            finally {
                return res; // if return statement exists in finally, exception will be hidden.
            }
        }
        catch (Exception e) {
            //show error message
            System.out.println("exception occurs in foo3:" + e);  // no exception caught because of return in finally block.
        }
        return res;
    }

    public static int foo4(int n) {
        int res = 1;
        try
        {
            try {
                res = n * n;
                res = n / 0;
                return res;
            }
            finally {
                //return res; // if return statement exists in finally, exception will be hidden.
            }
        }
        catch (Exception e) {
            //show error message
            System.out.println("exception occurs in foo4:" + e);
        }
        return res;
    }
}
```
The output:
```sh
res=0
res2=4
res3=4
exception occurs in foo4:java.lang.ArithmeticException: / by zero
res4=4
```
7.2.5 The Try-with-Resources Statement

When the try block exits, then res.close() is called automatically. Here is a typical example—reading all words of a file:
```
try (Scanner in = new Scanner(new FileInputStream("/usr/share/dict/words")), "UTF-8")
{
    while (in.hasNext()) {
        System.out.println(in.next());
    }
}
```

7.2.6 Analyzing Stack Trace Elements
`Throwable.getStackTrace`, `Thread.getAllStackTraces`, `StackTraceElement`.
```java

Map<Thread, StackTraceElement[]> map = Thread.getAllStackTraces();
for (Thread t : map.keySet())
{
    StackTraceElement[] frames = map.get(t);
    //analyze frames
}
```

7.4 Using Assertions
Has better performance and throwing exceptions.
```java
assert x >= 0;
double y = Math.sqrt(x);
```
Enable/Disable assertion
```sh
java -enableassertions MyApp  // enable MyApp
java -ea:MyClass -ea:com.mycompany.mylib... MyApp // enable MyClass, and classes in package com.mycompany.mylib
java -ea:... -da:MyClass MyApp // disable MyClass
```

The Java language gives you three mechanisms to deal with system failures:
* Throwing an exception
* Logging
* Using assertions

When should you choose assertions? Keep these points in mind:
* Assertion failures are intended to be fatal, unrecoverable errors.
* Assertion checks are turned on only during development and testing.
Assertions should only be used to locate internal program errors during testing.

7.5 Logging
7.6 Debugging Tips
```java
Thread.dumpStack();
```

## Chapter 8. Generic Programming
Restrict T to a class that implements the Comparable interface—a standard interface with a single method, compareTo.
The notation of giving a bound for the type variable T:
```java
<T extends BoundingType>
```
Sample.
```java
public static <T extends Comparable> T min(T[] a) . . .
```

In summary, you need to remember these facts about translation of Java generics:
* There are no generics in the virtual machine, only ordinary classes and methods.
* All type parameters are replaced by their bounds.
* Bridge methods are synthesized to preserve polymorphism.
* Casts are inserted as necessary to preserve type safety.

8.6 Restrictions and Limitations
Type Parameters Cannot Be Instantiated with Primitive Types, there is no Pair<double>, only Pair<Double>. The reason is, of course, `type erasure`. After erasure, the Pair class has fields of type `Object`, and you can’t use them to store double values.

```java
if (a instanceof Pair<String>) // Error, Runtime Type Inquiry Only Works with Raw Types
Pair<String>[] table = new Pair<String>[10]; // Error. cannot Create Arrays of Parameterized Types
public Pair() { first = new T(); second = new T(); } // Error, Cannot Instantiate Type Variables
public static <T extends Comparable> T[] minmax(T[] a) { T[] mm = new T[2]; . . . } // Error, Cannot Construct a Generic Array
```

8.8 Wildcard Types
```java
Pair<? extends Employee>
```
Unbounded Wildcards
```java
public static boolean hasNulls(Pair<?> p)
{
    return p.getFirst() == null || p.getSecond() == null;
}
```
Using Class<T> Parameters for Type Matching
```java
public static <T> Pair<T> makePair(Class<T> c) throws InstantiationException, IllegalAccessException
{
    return new Pair<>(c.newInstance(), c.newInstance());
}
```

## 9. Collections
The `for each` loop works with any object that implements the `Iterable` interface, an interface with a single abstract method:
```java
public interface Iterable<T> {
    Iterator<T> iterator();
    ...
}
```

* The `Collection` interface extends the `Iterable` interface.
* A List is an ordered collection.

![image](/public/notes/core-java-volume-i-fundamentals-10th-edition/collections.png){:width="800px"}  
* [Diagrams on Google Slides](https://docs.google.com/presentation/d/1JQm4fmR0wIOm11OqS4H4qyhb_z96WnDzaLI0u28CYWc/edit?usp=sharing)

9.2.1 Linked Lists
Add item to Linked List. The add method adds the new element before the iterator position.
```java
public static void main(String[] args)
{
    List<String> staff = new LinkedList<>();
    staff.add("Amy");
    staff.add("Bob");
    staff.add("Carl");
    ListIterator<String> iter = staff.listIterator();
    iter.next(); // skip past first element
    iter.add("Juliet");
    iter.add("John");

    for(String item: staff) {
        System.out.println(item);
    }
}
```
If you call the add method multiple times, the elements are simply added in the order in which you supplied them. They are all added in turn before the current iterator position(eg. 'Bob').
```sh
Amy
Juliet
John
Bob
Carl
```
`ConcurrentModificationException` exception may occur.

The only reason to use a linked list is to minimize the cost of insertion and removal in the middle of the list. If you have only a few elements, you can just use an ArrayList. If you want random access into a collection, use an array or ArrayList, not a linked list.

9.2.2 Array Lists
We recommend that you use an `ArrayList` instead of a `Vector` whenever you don’t need synchronization.
9.2.3 Hash Sets
In Java, hash tables are implemented as arrays of linked lists.  
hash collision, rehash,  load factor at 0.75,
![image](/public/notes/core-java-volume-i-fundamentals-10th-edition/hashtable.png){:width="800px"}  
* [Diagrams on Google Slides](https://docs.google.com/presentation/d/1JQm4fmR0wIOm11OqS4H4qyhb_z96WnDzaLI0u28CYWc/edit#slide=id.g35eabee3aa_0_0?usp=sharing)
9.2.4 Tree Sets
A tree set is a sorted collection. It is implemented by red-black tree.

```java
SortedSet<String> sorter = new TreeSet<>(); // TreeSet implements SortedSet
sorter.add("Bob");
sorter.add("Amy");
sorter.add("Carl");
for (String s : sorter) System.println(s); // output: Amy Bob Carl.
```

9.2.6 Priority Queues
Implemented by heap. The iteration does not visit the elements in sorted order. However, removal always yields the smallest remaining element.
```java
PriorityQueue<LocalDate> pq = new PriorityQueue<>();
pq.add(LocalDate.of(1906, 12, 9)); // G. Hopper
pq.add(LocalDate.of(1815, 12, 10)); // A. Lovelace
pq.add(LocalDate.of(1903, 12, 3)); // J. von Neumann
pq.add(LocalDate.of(1910, 6, 22)); // K. Zuse
System.out.println("Iterating over elements...");
for (LocalDate date : pq) {
    System.out.println(date); // not in order
}
System.out.println("Removing elements...");
while (!pq.isEmpty()) {
    System.out.println(pq.remove()); // in order
}
```
output
```sh
Iterating over elements...
1815-12-10
1906-12-09
1903-12-03
1910-06-22
Removing elements...
1815-12-10
1903-12-03
1906-12-09
1910-06-22
```

9.3 Maps
HashMap, TreeMap
```java
// construct hashmap
Map<String, Employee> staff = new HashMap<>(); // HashMap implements Map
Employee harry = new Employee("Harry Hacker");
staff.put("987-98-9996", harry);
// get value by key
String id = "987-98-9996";
Employee emp = staff.get(id); // gets harry
```
`getOrDefault` method.
```java
HashMap<Integer, String> mapStudent = new HashMap<>();
// put contents to our HashMap
mapStudent.put(12001, "Eric");
mapStudent.put(12002, "Johnny");

String name = mapStudent.getOrDefault(12003, "DefaultName");
System.out.println(name);

mapStudent.forEach((k, v) -> System.out.println("key=" + k + ", value=" + v));
```
Update. getOrDefault and putIfAbsent.
```java
counts.put(word, counts.getOrDefault(word, 0) + 1);
//or
counts.putIfAbsent(word, 0);
counts.put(word, counts.get(word) + 1); // Now we know that get will succeed
/or
counts.merge(word, 1, Integer::sum);
```
9.3.3 Map Views
* Set<K> keySet()
* Collection<V> values()
* Set<Map.Entry<K, V>> entrySet()

```java
// iterate keys
Set<String> keys = map.keySet();
for (String key : keys)
{
    //do something with key
}

// iterate pairs
for (Map.Entry<String, Employee> entry : staff.entrySet()) {
    String k = entry.getKey();
    Employee v = entry.getValue();
    //do something with k, v
}

//or
counts.forEach((k, v) -> {
    //do something with k, v
});
```
9.3.4 Weak Hash Maps
The `WeakHashMap` class was designed to solve an interesting problem. What happens with a value whose key is no longer used anywhere in your program? Suppose the last reference to a key has gone away. Then, there is no longer any way to refer to the value object. But, as no part of the program has the key any more, the key/value pair cannot be removed from the map. Why can’t the garbage collector remove it? Isn’t it the job of the garbage collector to remove unused objects?  
Unfortunately, it isn’t quite so simple. The garbage collector traces live objects. As long as the map object is live, all buckets in it are live and won’t be reclaimed. Thus, your program should take care to remove unused values from long-lived maps. Or, you can use a WeakHashMap instead. This data structure cooperates with the garbage collector to remove key/value pairs when the only reference to the key is the one from the hash table entry.  
Here are the inner workings of this mechanism. The WeakHashMap uses `weak references` to hold keys. A `WeakReference` object holds a reference to another object—in our case, a hash table key. Objects of this type are treated in a special way by the garbage collector. Normally, if the garbage collector finds that a particular object has no references to it, it simply reclaims the object. However, if the object is reachable only by a WeakReference, the garbage collector still reclaims the object, but places the weak reference that led to it into a queue. The operations of the WeakHashMap periodically check that queue for newly arrived weak references. The arrival of a weak reference in the queue signifies that the key was no longer used by anyone and has been collected. The WeakHashMap then removes the associated entry.

HashMap                      | WeakHashMap
-----------------------------|-------------------
Map h = new HashMap(); <br />     Object key = new Object;<br />   h.put(key, "xyz");<br />         key = null; | Map h = new WeakHashMap(); <br /> Object key = new Object; <br /> h.put(key, "xyz");<br /> key = null; <br /> //Conceptually, this is similar to inserting a line before the put() call like this: <br /> key = new WeakReferenkey(key); <br />
The key is referenced directly by the HashMap. | The key is not referenced directly by the WeakHashMap. Instead, a WeakReference object is referenced directly by the WeakHashMap, and the key is referenced weakly from the WeakReference object.
The value is referenced directly by the HashMap. | The value is referenced directly by the HashMap.
The key is not garbage collectable, since the map contains a strong reference to the key. The key could be obtained by iterating over the keys of the HashMap. | The key is garbage collectable, as nothing else in the application refers to it, and the WeakReference only holds the key weakly. Iterating over the keys of the WeakHashMap might obtain the key, but might not, if the key has been garbage collected.
The value is similarly not garbage collectable. | The value is not directly garbage collectable. However, when the key is collected by the garbage collector, the WeakReference object is subsequently removed from the WeakHashMap as a key, thus making the value garbage collectable too.

http://www.onjava.com/pub/a/onjava/2001/07/09/optimization.html?page=2
Sample:
```java
public static void main(String[] args) {
    try {
        testHashMap();
        testWeakHashMap();
    }
    catch (InterruptedException iex) {
        System.out.println(iex);
    }
}

private static void testHashMap() throws InterruptedException {
    Map<Object, String> hm = new HashMap<Object, String>();

    Object key = new Object();
    hm.put(key, "xyz");
    System.out.println(hm.size());  // 1
    key = null;
    System.gc();
    Thread.sleep(2000);
    System.out.println(hm.size());  // 1
}

private static void testWeakHashMap() throws InterruptedException {
    Map<Object, String> whm = new WeakHashMap<Object, String>();

    Object key = new Object();
    whm.put(key, "xyz");

    System.out.println(whm.size()); // 1
    key = null;
    System.gc();
    Thread.sleep(2000);
    System.out.println(whm.size()); // 0, the only item has been garbage collected
}
```
9.3.5 Linked Hash Sets and Maps
Insertion Order, Access Order.  
Syntax
```java
LinkedHashMap<K, V>(initialCapacity, loadFactor, true)
```
Samples
```java
public static void main(String[] args) {
    testInsertionOrder();
    testAccessOrder();
}

private static void testInsertionOrder() {
    System.out.println("Insertion Order of LinkedHashMap...");
    LinkedHashMap<Integer, String> lhm = new LinkedHashMap<Integer, String>();
    lhm.put(1, "Peter");
    lhm.put(2, "Mike");
    lhm.put(3, "Johnny");
    lhm.put(4, "Cindy");

    lhm.forEach((k, v) -> System.out.println("key=" + k + ", value=" + v));
}

private static void testAccessOrder() {
    System.out.println("Access Order of LinkedHashMap...");
    LinkedHashMap<Integer, String> lru = new LinkedHashMap<Integer, String>(16, .75f, true); // LRU
    lru.put(1, "Peter");
    lru.put(2, "Mike");
    lru.put(3, "Johnny");
    lru.put(4, "Cindy");

    // initial sequence
    lru.forEach((k, v) -> System.out.println("initial sequence: key=" + k + ", value=" + v));
    System.out.println("Keys1:" + lru.keySet().toString());

    lru.get(3);
    System.out.println("Keys2:" + lru.keySet().toString());

    lru.get(1);
    System.out.println("Keys3:" + lru.keySet().toString());
}
```
Output:
```sh
Insertion Order of LinkedHashMap...
key=1, value=Peter
key=2, value=Mike
key=3, value=Johnny
key=4, value=Cindy
Access Order of LinkedHashMap...
initial sequence: key=1, value=Peter
initial sequence: key=2, value=Mike
initial sequence: key=3, value=Johnny
initial sequence: key=4, value=Cindy
Keys1:[1, 2, 3, 4]
Keys2:[1, 2, 4, 3]
Keys3:[2, 4, 3, 1]
```
9.3.6 Enumeration Sets and Maps
```java
import java.util.EnumSet;

public class EnumerationSetAndMapDemo {
    enum Weekday { MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY };
    static EnumSet<Weekday> always = EnumSet.allOf(Weekday.class);
    static EnumSet<Weekday> never = EnumSet.noneOf(Weekday.class);
    static EnumSet<Weekday> workday = EnumSet.range(Weekday.MONDAY, Weekday.FRIDAY);
    static EnumSet<Weekday> mwf = EnumSet.of(Weekday.MONDAY, Weekday.WEDNESDAY, Weekday.FRIDAY);

    public static void main(String[] args) {
        System.out.println(java.util.Arrays.asList(Weekday.values())); // [MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY]
        System.out.println(always);  // [MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY]
        System.out.println(never);   // []
        System.out.println(workday); // [MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY]
        System.out.println(mwf);     // [MONDAY, WEDNESDAY, FRIDAY]
    }
}
```
9.3.7 Identity Hash Maps
The hash values for the keys should not be computed by the `hashCode` method but by the `System.identityHashCode` method. That’s the method that Object.hashCode uses to compute a hash code from the object’s memory address. Also, for comparison of objects, the IdentityHashMap uses `==`, not `equals`.
```java
// HashMap
Map hm = new HashMap();
hm.put("hmkey","hmvalue");
hm.put(new String("hmkey"),"hmvalue1"); // same key but different value

// prints 1 since it compares the objects logically and both the keys are same
System.out.println("Size of HashMap--"+hm.size()); // 1

// IdentityHashMap
Map ihm = new IdentityHashMap();
ihm.put("ihmkey","ihmvalue");
ihm.put(new String("ihmkey"),"ihmvalue1"); // same key but different value

//ihm.size() will print 2 since it compares the objects by reference
System.out.println("Size of IdentityHashMap--"+ihm.size());  // 2
```
It is faster and uses less memory than HashMap or TreeMap.
9.4 Views and Wrappers
9.4.1 Lightweight Collection Wrappers
The returned object by `Arrays.asList` is not an ArrayList.  
All methods that would change the size of the array (such as the add and remove methods of the associated iterator) throw an UnsupportedOperationException.
```java
Card[] cardDeck = new Card[52];
List<Card> cardList = Arrays.asList(cardDeck); // The returned object is not an ArrayList.
cardList.add(new Card(1, 3));  // java.lang.UnsupportedOperationException will be thrown
```
The following call creates a List containing 100 strings, all set to "DEFAULT":
```java
List<String> settings = Collections.nCopies(100, "DEFAULT");
```
Use `Collections.singleton()` to get an immutable single-element.
```java
String[] numbers = {"1", "2", "4", "2", "1", "2", "3", "1", "3", "4", "3", "3"};

/* Creating list and removing its elements */
List numList = new ArrayList(Arrays.asList(numbers));
System.out.println("Original: " + numList);
numList.remove("1");
System.out.println("numList after removal of 1 " + numList);
numList.remove("1");
System.out.println("numList after removal of 1  " + numList);
numList.remove("2");
System.out.println("numList after removal of 2 " + numList);

/* Creating another list and removing its elements using singleton() method */
List numList2 = new ArrayList(Arrays.asList(numbers));
System.out.println("Original: " + numList2);

// Selectively delete "1" from all it's occurrences
numList2.removeAll(Collections.singleton("1"));
System.out.println("numList2 after removal of 1 with singleton:" + numList2);

// Selectively delete "4" from all it's occurrences
numList2.removeAll(Collections.singleton("4"));
System.out.println("numList2 after removal of 4 with singleton:" + numList2);

// Selectively delete "3" from all it's occurrences
numList2.removeAll(Collections.singleton("3"));
System.out.println("numList2 after removal of 3 with singleton: " + numList2);
```
Output:
```sh
Original: [1, 2, 4, 2, 1, 2, 3, 1, 3, 4, 3, 3]
numList after removal of 1 [2, 4, 2, 1, 2, 3, 1, 3, 4, 3, 3]
numList after removal of 1  [2, 4, 2, 2, 3, 1, 3, 4, 3, 3]
numList after removal of 2 [4, 2, 2, 3, 1, 3, 4, 3, 3]
Original: [1, 2, 4, 2, 1, 2, 3, 1, 3, 4, 3, 3]
numList2 after removal of 1 with singleton:[2, 4, 2, 2, 3, 3, 4, 3, 3]
numList2 after removal of 4 with singleton:[2, 2, 2, 3, 3, 3, 3]
numList2 after removal of 3 with singleton: [2, 2, 2]
```
9.4.2 Subranges
The first index is inclusive, the second exclusive—just like the parameters for the substring operation of the String class.
```java
// list
List group2 = staff.subList(10, 20);
// set
SortedSet<E> subSet(E from, E to)
SortedSet<E> headSet(E to)
SortedSet<E> tailSet(E from)
// map
SortedMap<K, V> subMap(K from, K to)
SortedMap<K, V> headMap(K to)
SortedMap<K, V> tailMap(K from)
// NavigableSet
NavigableSet<E> subSet(E from, boolean fromInclusive, E to, boolean toInclusive)
NavigableSet<E> headSet(E to, boolean toInclusive)
NavigableSet<E> tailSet(E from, boolean fromInclusive)
```
9.4.3 Unmodi able Views
```java
Collections.unmodifiableCollection
Collections.unmodifiableList
Collections.unmodifiableSet
Collections.unmodifiableSortedSet
Collections.unmodifiableNavigableSet
Collections.unmodifiableMap
Collections.unmodifiableSortedMap
Collections.unmodifiableNavigableMap
```
Create a untouchable list.
```java
List<Card> cardList = new LinkedList<>();
List<Card> unml = Collections.unmodifiableList(cardList);
```
9.4.4 Synchronized Views
```java
Map<String, Employee> map = Collections.synchronizedMap(new HashMap<String, Employee>());
```
9.4.5 Checked Views
Use `Collections.checkedList` to create a safe list.
```java
// Example 1
ArrayList<String> strings = new ArrayList<>();
ArrayList rawList = strings; // warning only, not an error, for compatibility with legacy code
rawList.add(new Date()); // now strings contains a Date object!
// Example 2
List myList = new ArrayList();
myList.add("one");
myList.add("two");
myList.add("three");
myList.add("four");
//you can add any type of elements to myList object
myList.add(10);

List chkList = Collections.checkedList(myList, String.class);
System.out.println("Checked list content: "+chkList); // [one, two, three, four, 10]
chkList.add(10); //throws java.lang.ClassCastException: Attempt to insert class java.lang.Integer element into collection with element type class java.lang.String
```
9.5.1 Sorting and Shuffling
```java
Collections.sort(cards);
Collections.shuffle(cards);
```
9.5.2 Binary Search
```java
i = Collections.binarySearch(c, element);
i = Collections.binarySearch(c, element, comparator);
```
9.5.3 Simple Algorithms
```java
Collections.replaceAll("C++", "Java");
words.removeIf(w -> w.length() <= 3);
words.replaceAll(String::toLowerCase);
```
9.5.4 Bulk Operations
```java
coll1.removeAll(coll2); // removes all elements from coll1 that are present in coll2
coll1.retainAll(coll2); // removes all elements from coll1 that are not present in coll2
```
Find the intersection of two sets—the elements that two sets have in common.
```java
String[] nameA = new String[] {"Peter","Mike","Johnny","Cindy"};
String[] nameB = new String[] {"Mike","Eric","Cindy","Allan","Talor"};
List<String> listA = Arrays.asList(nameA);
List<String> listB = Arrays.asList(nameB);
Set<String> result = new HashSet<>(listA);
result.retainAll(listB);
System.out.println(result); // [Mike, Cindy]
````
9.5.5 Converting between Collections and Arrays

P552/1038

Reference:
Java Home at Oracle: http://www.oracle.com/technetwork/java/index.html
