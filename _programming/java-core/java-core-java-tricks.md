---
layout: tutorial
key: programming
title: "Java Core - Tricks"
index: 2302
subcategory: java-core
date: 2017-09-02
tags: [Java]
---

> Some tricky cases when using Java.

## 1. Overflow when assigning Integer value
As we all know, the range of Integer in java is from -2147483648(-2^31) to 2147483647(2^31 - 1). And we use constant Integer.MIN_VALUE to represent -2147483648, and Integer.MAX_VALUE to represent 2147483647. When trying to increment the max value or decrement the min value, overflow occurs. That is

```java
Integer.MAX_VALUE + 1 = Integer.MIN_VALUE;
Integer.MIN_VALUE - 1 = Integer.MAX_VALUE;
```

If you try to assign Integer.MAX_VALUE + 1 to a long type variable, the result may not be what you want.

```java
long var1 = Integer.MAX_VALUE + 1; //var1 = -2147483648
```

You will get var1 = -2147483648 instead of desired 2147483648. The following statement doesn't work, either.

```java
long var1 = (long)(Integer.MAX_VALUE + 1);
```

The correct way is to cast the variable to long type before adding. The following two approaches will work.

```java
long var1 = Integer.MAX_VALUE;
var1 = var1 + 1;

//or
long var1 = (long)Integer.MAX_VALUE + 1;
```

## 2. How a primitive float/double value can be -0.0?  
Float is a tricky type in java.  

### 2.1 The first issue is precision of float
You could never be able to store a floating point number of infinite precision with finite resources. You should never test if a floating point number == to some other, i.e. never write code like this:

```java
if (a == b)
```

where a and b are floats. Due to rounding errors those two numbers might be stored as different values in memory. You should define a precision you want to work with:

```java
private final static double EPSILON = 0.00001;
```

and then test against the precision you need

```java
if (Math.abs(a - b) < epsilon)
```

### 2.2 The second is the negative zero value, -0.0.  
When I working on an algorithm problem [149. Max Points on a Line](https://leetcode.com/problems/max-points-on-a-line/) in leetcode.com, I need to calculate the slope of two points, below are the original codes.

```java
slope = (double)(points[i].y - points[j].y) / (points[i].x - points[j].x);
```

My program runs failed for one test case: [2,3],[3,3],[-5,3]. After debugging, I found the root cause is because of negative -0.0. The slope between point[2,3] and point[3,3] is <span style='color:red'>-0.0</span>. And the slope between point[2,3] and point[-5,3] is <span style='color:red'>0.0</span>. But actually they are all in the same line with slope <span style='color:red'>0.0</span>.

I updated my code to add 0.0 at the end of the line to make sure no negative zero appears. The problem is solved, and my solution passed all test cases.

```java
slope = (double)(points[i].y - points[j].y) / (points[i].x - points[j].x) + 0.0;
```
### 2.3 Reference
* [How can a primitive float value be -0.0? What does that mean?](http://stackoverflow.com/questions/6724031/how-can-a-primitive-float-value-be-0-0-what-does-that-mean)
* [What Every Computer Scientist Should Know About Floating-Point Arithmetic](http://docs.oracle.com/cd/E19957-01/806-3568/ncg_goldberg.html)

## 3. Difference between i++ and ++i in a loop?
* i++ => add 1 to a, returns the old value.
* ++i => add 1 to a, returns the new value.

```java
String[] items = {"a","b","c","d"};
int i = 0;
for (String item : items) {
    System.out.print(++i);
}
System.out.println();

i = 0;
for (String item : items) {
    System.out.print(i++);
}
System.out.println();

//output
1234
0123
```

The below two `for` loops print the same output.
```java
for (int i = 0; i < 5; i++) {
    System.out.print(i);
}
System.out.println();
for (int i = 0; i < 5; ++i) {
    System.out.print(i);
}

//output
01234
01234
```

## 4. Is Java “pass-by-reference” or “pass-by-value”?
Everything in Java is pass-by-value. For class object, it pass its address to method.
```java
public class Main{
    public static void main(String[] args){
        Foo f = new Foo("f");
        changeReference(f); // It won't change the reference!
        System.out.println(f.val); // Prints 'f'
        modifyReference(f); // It will modify the object that the reference variable "f" refers to!
        System.out.println(f.val); // Prints 'c'
        setToNull(f); // f wont't be null
        System.out.println(f.val); // Still prints 'c'
    }
    public static void changeReference(Foo a){
        Foo b = new Foo("b");
        a = b;
    }
    public static void modifyReference(Foo c){
        c.setAttribute("c");
    }
    public static void setToNull(Foo d){
        d = null;
    }
    private static class Foo {
        public String val = "";
        public Foo (String val) {
            this.val = val;
        }
        public void setAttribute(String val) {
            this.val = val;
        }
    }
}
```
Notice, method `setToNull(Foo d)` won't work, object 'f' is still a non-null object.

### 4.2 Reference
Search the same code in the page of below link, there is an diagram explains why.
* [Is Java “pass-by-reference” or “pass-by-value”?](https://stackoverflow.com/questions/40480/is-java-pass-by-reference-or-pass-by-value)

## 5. Convert Enum to String
When using Enum, we probably encounter the situation that we need to convert it to String. We can call 'toString()' method.
```java
enum Color {
  RED, GREEN, BLUE;
}
public static void main(String[] args)
{
  Color c1 = Color.RED;
  String strColor = c1.toString();  // type cast
  System.out.println(strColor);
}
```
Better solution. Define the Enum type with String.
```java
public enum Color {
   RED("RED"),
   GREEN("GREEN"),
   BLUE("BLUE");

   private String name;
   private Color (String name)
   {
       this.name = name;
   }
   public String getName()
   {
       return name;
   }
}

public static void main(String[] args)
{
  String strColor = Color.RED.getName(); // no type cast
  System.out.println(strColor);
}
```
* [Best way to create enum of strings?](https://stackoverflow.com/questions/3978654/best-way-to-create-enum-of-strings)
