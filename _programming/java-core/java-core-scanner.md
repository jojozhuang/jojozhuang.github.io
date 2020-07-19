---
layout: tutorial
key: programming
title: "Java Core - Scanner"
index: 2307
subcategory: java-core
date: 2017-01-02
tags: [Scanner]
---

> Scanner, System.io, System.out

## 1. Input Types
Scanner methods.

Method          | Description
----------------|-------------------------------------
`nextBoolean()` | Reads a `boolean` value from the user
`nextByte()`    | Reads a `byte` value from the user
`nextDouble()`  | Reads a `double` value from the user
`nextFloat()`   | Reads a `float` value from the user
`nextInt() `    | Reads a `int` value from the user
`nextLine()`    | Reads a `String` value from the user
`nextLong()`    | Reads a `long` value from the user
`nextShort()`   | Reads a `short` value from the user

## 2. Examples
### 2.1 Common Usage
```java
import java.util.Scanner;

public class ScannerExample {
    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);

        // String input
        System.out.println("Enter name:");
        String name = scan.nextLine();
        System.out.println("Your name is: " + name);

        // Int input
        System.out.println("Enter age:");
        int age = scan.nextInt();
        System.out.println("Your age is: " + age);

        // Double input
        System.out.println("Enter salary:");
        double salary = scan.nextDouble();
        System.out.println("Your salary is: " + salary);
    }
}
```
Test by typing name, age and salary, check the output.
```raw
Enter name:
johnny
Your name is: johnny
Enter age:
29
Your age is: 29
Enter salary:
8065
Your salary is: 8065.0
```
### 2.2 Read Long String(hasNext + next)
Use while loop to read input by words(space is the delimiter) and use `hasNext()` method to check if there is any more token. When the input is `quit`, exit the loop.
```java
import java.util.Scanner;

public class NextExample {
    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);
        System.out.println("Testing hasNext and next, input string:");

        String s = "";
        while (scan.hasNext()) {
            String next = scan.next();
            if (next.equals("quit")) {
                break;
            }
            s += next + "-";
        }
        // Input 'quit' to stop the input
        System.out.println("String: " + s);
    }
}
```
Input two sentences and check the output.
```raw
Testing hasNext and next, input string:
Hi Johnny, how are you?
I'm good, Lucy. Nice to see you again.
quit
String: Hi-Johnny,-how-are-you?-I'm-good,-Lucy.-Nice-to-see-you-again.-
```
### 2.3 Read Long String(hasNextLine + nextLine)
We can also read the input by lines with `hasNextLine()` and `nextLine()`.
```java
import java.util.Scanner;

public class NextLineExample {
    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);
        System.out.println("Testing hasNextLine and nextLine, input string:");

        String s = "";
        while (scan.hasNextLine()) {
            String nextline = scan.nextLine();
            if (nextline.equals("quit")) {
                break;
            }
            s += nextline + "-";
        }
        // Input 'quit' to stop the input
        System.out.println("String: " + s);
    }
}
```
Input the same two sentences and check the difference.
```raw
Testing hasNextLine and nextLine, input string:
Hi Johnny, how are you?
I'm good, Lucy. Nice to see you again.
quit
String: Hi Johnny, how are you?-I'm good, Lucy. Nice to see you again.-
```
### 2.4 Default Delimiter
By default, scanner uses white space as delimiter.
```java
import java.util.Scanner;

public class DefaultDelimiterExample {
    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);
        System.out.println("Testing default delimiter, input string:");

        String s = "";
        while (scan.hasNext()) {
            s += scan.next() + "-";
        }
        // CMD + D on Mac to supply EOF for testing in terminal
        System.out.println("String: " + s);
    }
}
```
Input 'It's a nice day, isn't it?', the output looks as follows.
```raw
Testing default delimiter, input string:
It's a nice day, isn't it?
^D
String: It's-a-nice-day,-isn't-it?-
```
### 2.5 Custom Delimiter
We can specify any string as the delimiter by calling `useDelimiter()` method.
```java
import java.util.Scanner;

public class CustomDelimiterExample {
    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);
        System.out.println("Testing custom delimiter, input string:");

        // change the delimiter of this scanner
        scan.useDelimiter(",");

        String s = "";
        while (scan.hasNext()) {
            s += scan.next() + "-";
        }
        // CMD + D on Mac to supply EOF for testing in terminal
        System.out.println("String: " + s);
    }
}
```
Input 'It's a nice day, isn't it?' again, see the difference.
```raw
Testing custom delimiter, input string:
It's a nice day, isn't it?
^D
String: It's a nice day- isn't it?
-
```

## 3. Read and Write File
The above examples show how to read input from screen and print output to screen. We can also use Scanner to read and write with files, if the standard in/out is set to file channel.

### 3.1 Example
Suppose we have a file with following content. Each line is an order item, which contains name, price and quantity. We will use Scanner to read this file, calculate the cost(price * quantity) and write the result to another file.
```raw
apple 4.2 2
pear 5.0 3
peach 10.3 1
blueberry 15.0 2
coconut 8.6 1
```
OrderItem bean.
```java
public class OrderItem {
    public String name;
    public double price;
    public int quantity;

    public OrderItem(String name, double price, int quantity) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }
}
```
ScannerFileExample.
```java
import java.io.File;
import java.io.FileInputStream;
import java.io.PrintStream;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class ScannerFileExample {
    private static final String INPUT_FILE = "input.txt";
    private static final String OUTPUT_FILE = "output.txt";

    public static void main(String args[]) throws Exception {
        String currentDir = System.getProperty("user.dir");

        List<OrderItem> items = new ArrayList<>();
        // Set system.io
        Path path = Paths.get(currentDir, "java-core-scanner", "files", INPUT_FILE);
        File file = path.toFile();
        System.setIn(new FileInputStream(file));

        // Get items from file
        Scanner sc = new Scanner(System.in);
        while (sc.hasNextLine()) {
            items.add(new OrderItem(sc.next(), sc.nextDouble(), sc.nextInt()));
        }
        sc.close();

        // Set system.out
        Path output = Paths.get(currentDir, "java-core-scanner", "files", OUTPUT_FILE);
        File outputFile = output.toFile();
        System.setOut(new PrintStream(outputFile));

        // Calculate the cost
        for (OrderItem item : items) {
            System.out.print(item.name + ": ");
            System.out.println(item.price * item.quantity);
        }
    }
}
```
After executing this program, we can get the result in file output.txt.
```raw
apple: 8.4
pear: 15.0
peach: 10.3
blueberry: 30.0
coconut: 8.6
```

## 4. Source Files
* [Source files for Java Scanner on GitHub](https://github.com/jojozhuang/java-programming/tree/master/java-core-scanner)

## 5. References
* [Java User Input (Scanner)](https://www.w3schools.com/java/java_user_input.asp)
* [how to redirect stdin and stdout to a text file in java](https://stackoverflow.com/questions/23886499/how-to-redirect-stdin-and-stdout-to-a-text-file-in-java)
