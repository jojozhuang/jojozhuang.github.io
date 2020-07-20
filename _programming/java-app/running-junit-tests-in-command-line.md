---
layout: tutorial
key: programming
title: "Running JUnit Tests in Command Line"
index: 2521
subcategory: java-app
date: 2018-02-20
tags: [JUnit]
---

> Introduce how to run JUnit tests in command line.

## 1. JUnit
[JUnit](https://junit.org/) is a test framework for Java programming language. It uses annotations to identify methods that specify a test. JUnit is an open source project hosted at [Github](https://github.com/junit-team/junit4). The following sample project is based on `JUnit 4`.

## 2. Running JUnit in Eclipse
In Eclipse, create a new Java project.
### 2.1 Java Class
Create a class with one method named 'twoSum()'. This is the solution for the first algorithm question in [LeetCode](https://leetcode.com/problems/two-sum/description/).
```java
import java.util.HashMap;
/*
Two Sum

Given an array of integers, return indices of the two numbers such that they add up to a specific target. You may assume that each input would have exactly one solution, and you may not use the same element twice.

Example:
Given nums = [2, 7, 11, 15], target = 9,
Because nums[0] + nums[1] = 2 + 7 = 9, return [0, 1].
 */
public class Solution {
    public int[] twoSum(int[] nums, int target) {
        int[] res = new int[]{0,0};
        if (nums == null || nums.length < 2) {
            return res;
        }

        HashMap<Integer, Integer> map = new HashMap<Integer, Integer>();

        for (int i = 0; i < nums.length; i++) {
            if(map.containsKey(nums[i])) {
                res[0] = map.get(nums[i]);
                res[1] = i;
                return res;
            } else {
                map.put(target - nums[i], i);
            }
        }
        return res;
    }
}
```
### 2.2 JUnit Class
Create JUnit class for the Solution class to test the 'towSum' method. We defined three test methods here.
* testInvalidInput()
* testSmallInput()
* testLargeInput();

```java
import static org.junit.Assert.*;

import org.junit.Test;

public class SolutionTest {

    Solution solution = new Solution();

    @Test
    public void testInvalidInput() {
        System.out.println("testInvalidInput");

        assertArrayEquals(new int[2], solution.twoSum(null, 0));
        assertArrayEquals(new int[2], solution.twoSum(new int[] {}, 0));
    }

    @Test
    public void testSmallInput() {
        System.out.println("testSmallInput");

        assertArrayEquals(new int[] {1, 2}, solution.twoSum(new int[] { 1, 0, -1 }, -1));
        assertArrayEquals(new int[] {8, 9}, solution.twoSum(new int[]{1,2,3,4,5,6,7,8,9,10}, 19));
    }

    @Test
    public void testLargeInput() {
        System.out.println("testLargeInput");

        int[] numbers3 = {230,863,916,585,981,404,316,785,88,12,70,435,384,778,887,755,740,337,86,92,325,422,815,650,920,125,277,336,221,847,168,23,677,61,400,136,874,363,394,199,863,997,794,587,124,321,212,957,764,173,314,422,927,783,930,282,306,506,44,926,691,568,68,730,933,737,531,180,414,751,28,546,60,371,493,370,527,387,43,541,13,457,328,227,652,365,430,803,59,858,538,427,583,368,375,173,809,896,370,789};
        assertArrayEquals(new int[]{28, 45}, solution.twoSum(numbers3, 542));
    }
}
```
### 2.3 Running JUnit
In Eclipse, select the `SolutionTest` class, right-click on it and select Run-as -> JUnit Test. You should see all the three methods passed the testing.
![image](/assets/images/programming/2521/runjunit.png)

## 3. Compile and Run Java in Command Line
Before we start learning how to run JUnit in command line, let's first learn how to run java code from a command line. Generally, we need two commands, `javac` and `java`.
* javac - compile java code
* java - run java code

### 3.1 Directory Structure
Suppose we have a stand java project that consists of three top level folders:
* /bin - empty folder that will contain compiled .class files
* /lib - contains third party .jar files
* /src - contains .java source files

Firstly, we will use `javac` command to compile the source files in `src` folder and output the compiled .class files to `bin` folder. Secondly, we will use `java` command to run the classes in `bin` folder. If these java classes are relied on other third-party libraries, then we need to put these library jar files into the `lib` folder, and include these them when compiling and running the java classes.
### 3.2 Compiling Java Code
Compile the source file Application.java with lib1.jar and output the class files to bin folder.
```raw
javac -d bin -sourcepath src -cp lib/lib1.jar src/com/example/Application.java
```
### 3.3 Running Java Code
Run the Application class with lib1.jar.
```raw
java -cp bin;lib/lib1.jar com.example.Application
```
* Notice, on Unix system, the path separation symbol is `:`. On Windows OS, the path separation symbol is `;`.

## 4. Run JUnit in Command Line
### 4.1 Directory Structure
We will create the following directory structure.
```raw
./JUnitCommandLine  
 -- bin  
 -----Solution.class  
 -----SolutionTest.class  
 -----TestRunner.class  
 -- lib  
 -----hamcrest-core-1.3.jar  
 -----junit-4.12.jar  
 -- src  
 -----Solution.java  
 -----SolutionTest.java  
 -----TestRunner.java  
```
### 4.2 JUnitCore
`JUnitCore` is an inbuilt class in JUnit package. It provides the `runClasses()` method. JUnitCore is very useful to run tests from command line. Copy Solution.java and SolutionTest.java into `src` folder, and create a class named `TestRunner` with following content.
```java
import org.junit.runner.JUnitCore;
import org.junit.runner.Result;
import org.junit.runner.notification.Failure;

public class TestRunner {
   public static void main(String[] args) {
      Result result = JUnitCore.runClasses(SolutionTest.class);

      System.out.printf("Test ran: %s, Failed: %s%n",
              result.getRunCount(), result.getFailureCount());

      for (Failure failure : result.getFailures()) {
         System.out.println(failure.toString());
      }

      // final result, pass or fail
      System.out.println("All test cases are passed? " + result.wasSuccessful());
   }
}
```
### 4.3 JUnit Jar Files
Go to https://github.com/junit-team/junit4/wiki/download-and-install, Download the following JARs and put them to the `lib` folder.
* junit.jar
* hamcrest-core.jar

### 4.4 Compiling Java Code
```raw
javac -d bin -sourcepath src -cp .:lib/junit-4.12.jar src/TestRunner.java
```
### 4.5 Running Java Code
```raw
java -cp .:bin/:lib/junit-4.12.jar:lib/hamcrest-core-1.3.jar TestRunner
```
![image](/assets/images/programming/2521/commandline.png){:width="700px"}  

## 5. Source Files
* [Source files of JUnit Command Line on Github](https://github.com/jojozhuang/Tutorials/tree/master/JUnitCommandLine)

## 6. Reference
* [How to Compile and Run Java Code from a Command Line](http://www.sergiy.ca/how-to-compile-and-launch-java-code-from-command-line/)
* [Unit Testing with JUnit - Tutorial](http://www.vogella.com/tutorials/JUnit/article.html)
* [Download and Install Junit Jar](https://github.com/junit-team/junit4/wiki/download-and-install)
* [JUnit - Executing Tests](https://www.tutorialspoint.com/junit/junit_executing_tests.htm)
* [JUnit - Different ways to run tests using JUnitCore](https://www.logicbig.com/tutorials/unit-testing/junit/junit-core.html)
