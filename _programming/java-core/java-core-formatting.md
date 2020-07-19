---
layout: tutorial
key: programming
title: "Java Core - Formatting"
index: 2303
subcategory: java-core
date: 2017-01-03
tags: [Formatting]
---

> Formatting for String, Int and Double.

## 1. String
```java
public static void formatString() {
    System.out.println("Format String:");
    String department = "Physics";
    // 1) Print a String - no size indicator, positive size indicator, and negative size indicator
    System.out.format("%s%n", department);    // Results >Physics [Left Justified]
    System.out.format("%15s%n", department);  // Results > Physics [Right Justified]
    System.out.format("%-15s%n", department); // Results >Physics [Left Justified]
    System.out.println();
    // 2) Print a String ­- "small" size indicator, "small" size indicator with "."
    System.out.format("%4s%n", department);  // Results >Physics [Still prints full String]
    System.out.format("%.4s%n", department); // Results >Phys [Truncates the String]
    System.out.println();
    // 3) Print a String report with titles ­- hard coded labels (does not line up well):
    System.out.format("Department: %s%n", department); // Results >Department: Physics
    System.out.format("Hobby: %s%n", department);      // Results >Hobby: Physics
    System.out.format("Career: %s%n", department);     // Results >Career: Physics
    System.out.println();
    // 4) Print a String report with titles ­- formatted labels (does line up well):
    System.out.format("%-10s:%s%n", "Department", department); // Results >Department:Physics
    System.out.format("%-10s:%s%n", "Hobby", department);      // Results >Hobby     :Physics
    System.out.format("%-10s:%s%n", "Career", department);     // Results >Career    :Physics
    System.out.println();
}
```
Output.
```raw
Format String:
Physics
        Physics
Physics        

Physics
Phys

Department: Physics
Hobby: Physics
Career: Physics

Department:Physics
Hobby     :Physics
Career    :Physics
```

## 2. Int
```java
public static void formatInt() {
    System.out.println("Format Int:");
    int population = 123456;
    // 5) Print an "int" ­ Left Justified, No field width, with various formatting
    System.out.format("%d%n", population);     // Results >123456   [Left Justified]
    System.out.format("%+d%n", population);    // Results >+123456  [Left Justified, displays "+" for positive values]
    System.out.format("%,d%n", population);    // Results >123,456  [Left Justified, Inserts commas where appropriate]
    System.out.format("$%,d%n", population);   // Results >$123,456 [Left Justified, with commas -­ preceded by a "$"
    System.out.println();
    // 6) Print an "int" ­ Left Justified, Using field width, with various formatting
    System.out.format("%-9d%n", population);   // Results >123456   [Left Justified]
    System.out.format("%-+9d%n", population);  // Results >+123456  [Left Justified, displays "+" for positive values]
    System.out.format("%-,9d%n", population);  // Results >123,456  [Left Justified, Inserts commas where appropriate]
    System.out.format("$%-,9d%n", population); // Results >$123,456 [Left Justified, with commas -­ preceded by a "$"
    System.out.println();
    // 7) Print an "int" ­ Right Justified, Using field width, with various formatting
    System.out.format("%9d%n", population);    // Results >   123456 [Right Justified]
    System.out.format("%+9d%n", population);   // Results >  +123456 [Right Justified, displays "+" for positive values]
    System.out.format("%,9d%n", population);   // Results >  123,456 [Right Justified, Inserts commas where appropriate]
    System.out.format("%09d%n", population);   // Results >000123456 [Right Justified, padds blanks with Zeros]
    System.out.println();
}
```
Output.
```raw
Format Int:
123456
+123456
123,456
$123,456

123456   
+123456  
123,456  
$123,456  

   123456
  +123456
  123,456
000123456
```

## 3. Double
```java
public static void formatDouble() {
    System.out.println("Format Double:");
    double price = 1234.567;
    // 8) Print a "double" ­ Left Justified, No field width, with various formatting
    System.out.format("%f%n", price);  // Results >1234.567000  [Left Justified, 6 decimal places]
    System.out.format("%+f%n", price); // Results >+1234.567000 [Left Justified, displays "+" for positive values, 6 decimal places]
    System.out.format("%,f%n", price); // Results >1,234.567000 [Left Justified, Inserts commas where appropriate, 6 decimal places]
    System.out.println();
    // 9) Print a "double" ­ Left Justified (only), Using decimal­only field widths, with various formatting
    System.out.format("%.1f%n", price); // Results >1234.6    [Left Justified, no character max, "1" decimal place]
    System.out.format("%.2f%n", price); // Results >1234.57   [Left Justified, no character max, "2" decimal place]
    System.out.format("%.3f%n", price); // Results >1234.567  [Left Justified, no character max, "3" decimal place]
    System.out.format("%.4f%n", price); // Results >1234.5670 [Left Justified, no character max, "4" decimal place]
    System.out.println();
    // 10) Print a "double" ­ Left Justified, Using whole number and decimal field widths, with various formatting
    System.out.format("%-12.2f%n", price);  // Results >1234.57   [Left Justified, 12 character max, 2 decimal places]
    System.out.format("%-+12.3f%n", price); // Results >+1234.567 [Left Justified, displays "+" for positive values, 12 character max, 3 decimal places]
    System.out.format("%,-12.1f%n", price); // Results >1,234.6   [Left Justified, Inserts commas where appropriate, 2 decimal place]
    System.out.println();
}
```
Output.
```raw
Format Double:
1234.567000
+1234.567000
1,234.567000

1234.6
1234.57
1234.567
1234.5670

1234.57     
+1234.567   
1,234.6     
```

## 4. Source Files
* [Source files for Java Formatting on GitHub](https://github.com/jojozhuang/java-programming/tree/master/java-core-formatting)
