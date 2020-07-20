---
layout: tutorial
key: programming
title: "Dynamic Tests with JUnit 5 in Command Line"
index: 2523
subcategory: java-app
date: 2018-02-22
tags: [JUnit 5]
---

> Introduce how to create and run JUnit 5 tests in command line.

## 1. Console Launcher
The ConsoleLauncher is a command-line Java application that lets you launch the JUnit Platform from the console. For example, it can be used to run JUnit Vintage and JUnit Jupiter tests and print test execution results to the console.

## 2. Running JUnit in Console
### 2.1 Directory Structure
Create new folder named `JUnit5DynamicConsole` for our new project. And create three sub folders inside it:
* /bin - empty folder that will contain compiled .class files
* /lib - contains third party .jar files
* /src - contains .java source files

### 2.2 JUnit Platform Console Standalone
To run JUnit5 tests in command line, we need an executable `junit-platform-console-standalone-1.1.0.jar` with all dependencies included. It is published in the central [Maven repository](https://mvnrepository.com/) under the [junit-platform-console-standalone](https://mvnrepository.com/artifact/org.junit.platform/junit-platform-console-standalone) directory.

Download 'junit-platform-console-standalone-1.1.0.jar' from [here](https://mvnrepository.com/artifact/org.junit.platform/junit-platform-console-standalone/1.1.0).
![image](/assets/images/programming/2523/download.png)
Put the downloaded jar file into the `lib` folder.
### 2.3 Source Files
Reuse the java files and the test files created in the previous tutorial. Copy them to the `src` folder. Notice, we don't need the package definition, so remove it at the header of each source file. So all the java classes are in the default package.

Create file Solution.java.
```java
import java.util.HashMap;

/*
 Two Sum

 Given an array of integers, return indices of the two numbers such that they add up to a specific target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

Example:

Given nums = [2, 7, 11, 15], target = 9,

Because nums[0] + nums[1] = 2 + 7 = 9,
return [0, 1].

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
Create file SolutionDynamicTest.java.
```java
import static org.junit.jupiter.api.Assertions.*;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DynamicTest;
import org.junit.jupiter.api.TestFactory;
import org.junit.jupiter.api.function.Executable;

public class SolutionDynamicTest {

    private Solution solution;

    @BeforeEach
    public void setUp() {
        solution = new Solution();
    }

    @TestFactory
    public Collection<DynamicTest> testTwoSum() {

System.out.println("testTwoSum");
        Collection<DynamicTest> dynamicTests = new ArrayList<>();

        try {
            BufferedReader br = new BufferedReader(new FileReader("testcase.txt"));
            try {
                String line;
                while ((line = br.readLine()) != null) {
                    int[] nums = ParserUtil.stringToIntegerArray(line);
                    line = br.readLine();
                    int target = Integer.parseInt(line);
                    line = br.readLine();
                    int[] expected = ParserUtil.stringToIntegerArray(line);
                    // create an test execution
                    int[] ret = solution.twoSum(nums, target);
                    Executable exec = () -> assertArrayEquals(expected, ret);

                    //String out = ParserUtil.integerArrayToString(ret);

                    // create a test display name
                    String testCase = "Test Two Sum: Input: " + Arrays.toString(nums) + ", " + target + "; Your answer:" + Arrays.toString(ret) + "; Expected answer: " + Arrays.toString(expected);
                    // create dynamic test
                    DynamicTest dTest = DynamicTest.dynamicTest(testCase, exec);

                    // add the dynamic test to collection
                    dynamicTests.add(dTest);
                }
            }
            catch (Exception io) {
            	System.out.println(io.getMessage());
            }
            finally {
                br.close();
            }
        } catch (IOException ioe) {
            System.out.println(ioe.getMessage());
        } finally {
        }

        return dynamicTests;
    }
}
```
Create file ParserUtil.java.
```java
public class ParserUtil {
    public static int[] stringToIntegerArray(String input) {
    	// null
        if (input.equals("null")) {
            return null;
        }
        // empty array
        if (input.equals("[]")) {
            return new int[]{};
        }
        input = input.trim();
        input = input.substring(1, input.length() - 1);
        if (input.length() == 0) {
            return new int[0];
        }

        String[] parts = input.split(",");
        int[] output = new int[parts.length];
        for(int index = 0; index < parts.length; index++) {
            String part = parts[index].trim();
            output[index] = Integer.parseInt(part);
        }
        return output;
    }

    public static String integerArrayToString(int[] nums, int length) {
        if (length == 0) {
            return "[]";
        }

        String result = "";
        for(int index = 0; index < length; index++) {
            int number = nums[index];
            result += Integer.toString(number) + ", ";
        }
        return "[" + result.substring(0, result.length() - 2) + "]";
    }

    public static String integerArrayToString(int[] nums) {
        return integerArrayToString(nums, nums.length);
    }
}
```
### 2.4 Test Case File
Create file named `testcase.txt` in the root folder.
```raw
null
0
[0,0]
[]
0
[0,0]
[1,0,-1]
-1
[1,2]
[1,2,3,4,5,6,7,8,9,10]
19
[8, 9]
[230,863,916,585,981,404,316,785,88,12,70,435,384,778,887,755,740,337,86,92,325,422,815,650,920,125,277,336,221,847,168,23,677,61,400,136,874,363,394,199,863,997,794,587,124,321,212,957,764,173,314,422,927,783,930,282,306,506,44,926,691,568,68,730,933,737,531,180,414,751,28,546,60,371,493,370,527,387,43,541,13,457,328,227,652,365,430,803,59,858,538,427,583,368,375,173,809,896,370,789]
542
[28, 45]
```
### 2.5 Directory Structure
Now, our project folder looks as follows. Currently, the bin folder is empty. Class files will be generated after we compile the java files.
```raw
./JUnit5DynamicConsole  
 -- bin  
 -----ParserUtil.class  
 -----Solution.class  
 -----SolutionDynamicTest.class  
 -- lib  
 -----junit-platform-console-standalone-1.1.0.jar  
 -- src  
 -----ParserUtil.java
 -----Solution.java  
 -----SolutionDynamicTest.java  
 --testcase.txt
```

## 3. Testing
### 3.1 Compiling Java Code
In terminal, navigate to the root folder, that is JUnit5DynamicConsole. Run the following command to compile java file.
```raw
javac -d bin -sourcepath src -cp .:lib/junit-platform-console-standalone-1.1.0.jar src/SolutionDynamicTest.java
```
* Notice, on Unix system, the path separation symbol is `:`. On Windows OS, the path separation symbol is `;`.

### 3.2 Running Java Code
```raw
java -jar lib/junit-platform-console-standalone-1.1.0.jar --cp bin/ -c SolutionDynamicTest
```
All the 5 test cases defined in the `testcase.txt` are executed and passed.
![image](/assets/images/programming/2523/run.png)

## 4. Source Files
* [Source files of JUnit5 Dynamic Console on Github](https://github.com/jojozhuang/Tutorials/tree/master/JUnit5DynamicConsole)

## 5. Reference
* [How to Compile and Run Java Code from a Command Line](http://www.sergiy.ca/how-to-compile-and-launch-java-code-from-command-line/)
* [Console Launcher - JUnit 5](https://junit.org/junit5/docs/current/user-guide/#running-tests-console-launcher)
* [JUnit 5 Dynamic Tests — Generate Tests at Runtime](https://dzone.com/articles/junit-5-dynamic-tests-generate-tests-at-run-time)
