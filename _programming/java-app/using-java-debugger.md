---
layout: tutorial
key: programming
title: "Using Java Debugger"
index: 2512
subcategory: java-app
date: 2016-03-21
tags: [JDB, Debugging]
---

> The Java Debugger, commonly known as jdb, is a useful tool to detect bugs in Java programs.

## 1. What Is JDB?
The Java debugger (JDB) is a tool for Java classes to debug a program in command line. It implements the Java Platform Debugger Architecture. It helps in detecting and fixing bugs in a Java program using Java Debug Interface (JDI).

## 2. JDB in JDK
The following architecture defines the role of JDB in JDK. It contains mainly three units:
* Java Virtual Machine Tool Interface (JVM TI)
* Java Debug Wiring Pool (JDWP)
* Java Debugger Interface (JDI)

## 3. Using JDB
### 3.1 Syntax
The syntax of JDB is as follows.
```raw
jdb [ options ] [ class ] [ arguments ]
```
* JDB - It calls jdb.exe from the Java Development Kit.
* Options - These include the command line options used to debug a Java program in an efficient way. The JDB launcher accepts all the options (such as -D, -classpath, and -X) and some additional advanced options such as (-attach, -listen, -launch, etc.).
* Class - It is the class name on which you want to perform debugging operations.
* Arguments - These are the input values given to a program at runtime. For example, arg[0], arg[1] to the main() method.

### 3.2 Creating Test Class
Create a file named 'Sum.java' with following codes. Class `Sum` has a main method which accepts two input parameters. This method calculates the sum of these two input parameters and print the sum.
```java
public class Sum {
    public static void main(String[] args){
        int val1 = Integer.parseInt(args[0]);
        int val2 = Integer.parseInt(args[1]);
        int sum = val1 + val2;
        System.out.println("Sum is " + sum);
    }
}
```
### 3.3 Compiling and Running
Navigate to the folder where Sum.java locates, use `javac` to compile it. The `g` option adds extra debug info to the class.
```raw
$ javac -g Sum.java
```
Run `Sum` in debug mode with providing two input parameters, 3 and 4. Now we have the application listening on port 4000 waiting for connections.
```raw
$ java -Xdebug -agentlib:jdwp=transport=dt_socket,address=4000,server=y,suspend=y Sum 3 4
```
* With `suspend=y` the Java-process will wait until the debugger connects, with suspend=n you will be also able to debug the application servers startup process.
* The option `server=y` opens a socket and listens for incoming debugger requests. With server=n the debugged application will try to connect actively to a debugger and run therefore as a client.

![rundebugmode](/assets/images/programming/2512/rundebugmode.png){:width="600px"}

### 3.4 Debugging with JDB
Open another terminal, use `jdb` to start a new debug session. The `attach` option attaches the debugger to the running VM by specifying the specific port 4000.
```raw
jdb -attach 4000
```
![attachport](/assets/images/programming/2512/attachport.png){:width="600px"}

Use `stop` command to set breakpoint to line 6, which is 'System.out.println("Sum is " + sum);'.
```raw
main[1] stop at Sum:6
```
Use `step` command to step the execution to the next line.
```raw
main[1] step
```
Use `list` command to know the line in the code up to which the program control has reached. Notice the arrow mark => in the following screenshot that shows the current position of the program control.
```raw
main[1] list
```
![step](/assets/images/programming/2512/step.png){:width="600px"}
Step twice, then use `print` command to check the values of `val1` and `val2`. (If there is any object, you can use `dump` command to check the current value of each field defined in the object.)
![print](/assets/images/programming/2512/print.png){:width="600px"}
Step one more time, and use `locals` command to see all local variables.
![locals](/assets/images/programming/2512/locals.png){:width="600px"}
Use `cont` command to continue execution of the debugged application. Since there is no more lines need to be executed, application exits.
![cont](/assets/images/programming/2512/cont.png){:width="600px"}
Switch to the first terminal, you see the result is printed out and debug process is stopped as well.
![return](/assets/images/programming/2512/return.png){:width="600px"}

## 4. Source Files
* [Source files for JDBTutorial on GitHub](https://github.com/jojozhuang/Tutorials/tree/master/JDBTutorial)

## 5. Reference
* [JDB Tutorial](https://www.tutorialspoint.com/jdb/index.htm)
* [Understanding how Java Debug works](http://cscarioni.blogspot.com/2010/12/understanding-how-java-debug-works.html)
* [JDB - Command line debugger for Java](http://blog.rejeev.com/2011/04/jdb-command-line-debugger-for-java.html)
* [Remote debugging a Java application](https://stackoverflow.com/questions/975271/remote-debugging-a-java-application)
* [Java Debug Wire Protocol](https://docs.oracle.com/javase/8/docs/technotes/guides/jpda/jdwp-spec.html)
* [Java Platform Debugger Architecture (JPDA)](https://docs.oracle.com/javase/8/docs/technotes/guides/jpda/index.html)
* [WHAT ARE THE OPTIONS OF REMOTE DEBUGGING LIKE:-XRUNJDWP, SERVER, SUSPEND](http://www.adam-bien.com/roller/abien/entry/what_are_the_options_of)
