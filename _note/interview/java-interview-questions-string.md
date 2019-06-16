---
layout: tutorial
key: note
title: "Java Interview Questions - String"
index: 104
category: interview
image: interview.png
date: 2016-01-04
postdate: 2016-01-04
tags: [Java, Interview]
---

> Popular interview questions for Java.

## 1. String Questions
### 1.1 What is String in Java? String is a data type?
String is a Class in java and defined in java.lang package. It’s not a primitive data type like int and long. String class represents character Strings. String is used in almost all the Java applications and there are some interesting facts we should know about String. String is `immutable` and `final` in Java and JVM uses `String Pool` to store all the String objects. Some other interesting things about String is the way we can instantiate a String object using `double quotes` and overloading of `+` operator for concatenation.

### 1.2 What are different ways to create String Object?
We can create String object using `new` operator like any normal java class or we can use double quotes to create a String object. There are several constructors available in String class to get String from char array, byte array, StringBuffer and StringBuilder.
```java
// String creation
String s1 = "java";                                  // s1 = "java"
String s2 = new String("java");                      // s2 = "java"
String s3 = new String(new char[]{'j','a','v','a'}); // s3 = "java"

// String comparision
String str1 = "java";                                  // stored in String Pool
String str2 = "java";                                  // stored in String Pool
String str3 = new String("java");                      // created locally, it is not in String Pool
String str4 = new String(new char[]{'j','a','v','a'}); // s3 = "java"
System.out.println(str1 == str2);                      // true, both are from String Pool, same object
System.out.println(str1.equals(str2));                 // true
System.out.println(str1 == str3);                      // false, str4 is created with new keyword
System.out.println(str1.equals(str3));                 // true
System.out.println(str1 == str4);                      // false, str4 is created with new keyword
System.out.println(str1.equals(str4));                 // true
```
* When we create a String using `double quotes`, JVM looks in the `String pool` to find if any other String is stored with the same value. If found, it just returns the reference to that String object else it creates a new String object with given value and stores it in the String pool.
* When we use the `new` operator, JVM creates the String object but don’t store it into the String Pool. We can use `intern()` method to store the String object into String pool or return the reference if there is already a String with equal value present in the pool.

### 1.3 Difference between String, StringBuffer and StringBuilder?
The string is immutable and final in Java, so whenever we do String manipulation, it creates a new String. String manipulations are resource consuming, so java provides two utility classes for String manipulations – StringBuffer and StringBuilder.
StringBuffer and StringBuilder are mutable classes. StringBuffer operations are thread-safe and synchronized where StringBuilder operations are not thread-safe. So in a multi-threaded environment, we should use StringBuffer but in the single-threaded environment, we should use StringBuilder.
StringBuilder performance is fast than StringBuffer because of no overhead of synchronization.

Feature     | String | StringBuilder | StringBuffer
------------|--------|---------------|-------------
mutable     | No     | Yes           | Yes
thread-safe | Yes    | No            | Yes

### 1.4 CharSequence VS String
CharSequence is an interface that represents a sequence of characters. Mutability is not enforced by this interface. Therefore, both mutable and immutable classes implement this interface. String class implements this interface. Besides, StringBuilder and StringBuffer are both implements this interface.
![image](/public/images/note/java-string-interview-questions/charsequence.png){:width="600px"}  

### 1.5 Why String is immutable or final in Java
There are several benefits of String because it’s immutable and final.
* String Pool is possible because String is immutable in java.
* It increases security because any hacker can’t change its value and it’s used for storing sensitive information such as database username, password etc.
* Since String is immutable, it’s safe to use in multi-threading and we don’t need any synchronization.
* Strings are used in java classloader and immutability provides security that correct class is getting loaded by Classloader.

### 1.6 Why Char array is preferred over String for storing password?
String is immutable in Java and stored in String pool. Once it’s created it stays in the pool until unless garbage collected, so even though we are done with password it’s available in memory for longer duration and there is no way to avoid it. It’s a security risk because anyone having access to memory dump can find the password as clear text.
If we use a char array to store password, we can set it to blank once we are done with it. So we can control for how long it’s available in memory that avoids the security threat with String.

### 1.7 How do you check if two Strings are equal in Java?
There are two ways to check if two Strings are equal or not – using `==` operator or using `equals` method. When we use “==” operator, it checks for the value of String as well as the reference but in our programming, most of the time we are checking equality of String for value only. So we should use the equals method to check if two Strings are equal or not. There is another function `equalsIgnoreCase` that we can use to ignore case.
```java
String str1 = "java";                                  // stored in String Pool
String str2 = "java";                                  // stored in String Pool
String str3 = new String("java");                      // created locally, it is not in String Pool
System.out.println(str1 == str2);                      // true, both are from String Pool, same object
System.out.println(str1.equals(str2));                 // true
System.out.println(str1 == str3);                      // false, str4 is created with new keyword
System.out.println(str1.equals(str3));                 // true
```

### 1.8 What is String Pool?
As the name suggests, String Pool is a pool of Strings stored in Java heap memory. We know that String is a special class in Java and we can create String object using new operator as well as providing values in double quotes.

### 1.9 What does String intern() method do?
When the `intern` method is invoked, if the pool already contains a string equal to this String object as determined by the equals(Object) method, then the string from the pool is returned. Otherwise, this String object is added to the pool and a reference to this String object is returned. This method always returns a String that has the same contents as this string but is guaranteed to be from a pool of unique strings.
```java
// intern()
String strAA = "intern";
String strBB = new String("intern");
System.out.println(strAA == strBB);                    // false, strBB is created with new keyword
System.out.println(strAA.equals(strBB));               // true

// get the string from String Poll
String strCC = strBB.intern();                         // strCC is fetched from String Pool
System.out.println(strAA == strCC);                    // true, strCC is strAA
System.out.println(strAA.equals(strCC));               // true
```

### 1.10 Does String is thread-safe in Java?
Strings are immutable, so we can’t change it’s value in program. Hence it’s thread-safe and can be safely used in multi-threaded environment.

### 1.11 Why String is popular HashMap key in Java?
Since String is immutable, its hashcode is cached at the time of creation and it doesn’t need to be calculated again. This makes it a great candidate for the key in a Map and it’s processing is fast than other HashMap key objects. This is why String is mostly used Object as HashMap keys.

## 2. References
* [Java Interview Questions](https://www.tutorialspoint.com/java/java_interview_questions.htm)
* [Java Interview Questions](https://www.journaldev.com/java-interview-questions)
* [Java String Interview Questions and Answers](https://www.journaldev.com/1321/java-string-interview-questions-and-answers)
* [CharSequence VS String in Java?](https://stackoverflow.com/questions/1049228/charsequence-vs-string-in-java)
* [CharSequence vs. String in Java](https://www.baeldung.com/java-char-sequence-string)
