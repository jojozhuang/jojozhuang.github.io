---
layout: programming
key: programming
title: "Java - Interview Questions(Draft)"
index: 101
category: interview
image: programming/interview.png
date: 2019-01-01
postdate: 2019-01-01
tags: [Java, Interview]
---

> Popular interview questions for Java.

## 1. Basics
### 1.1 JVM vs JRE vs JDK
* JVM - Java Virtual Machine: the virtual machine that runs the Java bytecodes.
* JRE - Java Runtime Environment: provides the libraries, the Java Virtual Machine, and other components to run applications written in the Java programming language.
* JDK - Java Development Kit: The JDK is a superset of the JRE, and contains everything that is in the JRE, plus tools such as the compilers and debuggers necessary for developing applets and applications.


![image](/public/programming/java-interview-questions/jvm_jre_jdk.png){:width="500px"}  
![image](/public/programming/java-interview-questions/jvm_jre_jdk2.png){:width="400px"}  

### 1.2 ClassLoader
Classloader is a subsystem of JVM which is used to load class files. Whenever we run the java program, it is loaded first by the classloader. There are three built-in classloaders in Java.

* `Bootstrap ClassLoader`: This is the first classloader which is the superclass of Extension classloader. It loads the rt.jar file which contains all class files of Java Standard Edition like java.lang package classes, java.net package classes, java.util package classes, java.io package classes, java.sql package classes, etc.
* `Extension ClassLoader`: This is the child classloader of Bootstrap and parent classloader of System classloader. It loads the jar files located inside $JAVA_HOME/jre/lib/ext directory.
* `System/Application ClassLoader`: This is the child classloader of Extension classloader. It loads the class files from the classpath. By default, the classpath is set to the current directory. You can change the classpath using "-cp" or "-classpath" switch. It is also known as Application classloader.

### 1.3 Access Modifiers
In Java, access specifiers are the keywords which are used to define the access scope of the method, class, or a variable. In Java, there are four access specifiers given below.

* `public`: The classes, methods, or variables which are defined as public, can be accessed by any class or method.
* `protected`: Protected can be accessed by the class of the same package, or by the sub-class of this class, or within the same class.
* `default`: Default are accessible within the package only. By default, all the classes, methods, and variables are of default scope.
* `private`: The private class, methods, or variables defined as private can be accessed within the class only.

Access Modifiers        | private | default | protected | public
------------------------|---------|---------|-----------|--------
Inside Class            | Y       | Y       | Y         | Y
Same Package Class      | N       | Y       | Y         | Y
Same Package Sub-Class  | N       | Y       | Y         | Y
Other Package Class     | N       | N       | N         | Y
Other Package Sub-Class | N       | N       | Y         | Y

### 1.4 Difference between Constructor and Method
A constructor in Java is a block of code similar to a method that’s called when an instance of an object is created.
* The constructor can't be `final`.
* The constructor can't be inherited.
* The constructor can be overloaded.

Java Constructor                                            | Java Method
------------------------------------------------------------|--------------------
A constructor is used to initialize the state of an object. | A method is used to expose the behavior of an object.
A constructor must not have a return type.                  | A method must have a return type, otherwise it will be consider as constructor.
Constructor is invoked implicitly when the `new` keyword creates an object. | Method is invoked explicitly on an object.
The Java compiler provides a default constructor if you don't have any constructor in a class. | Method is not provided by the compiler in any case.
Constructor name must be same as the class name.            | Method name may or may not be same as class name.

### 1.5 Static Method vs Instance Method

static or class method | instance method
-----------------------|-------------------------
A method that is declared as `static` is known as the static method. | A method that is not declared as static is known as the instance method.
We don't need to create the objects to call the static methods. | The object is required to call the instance methods.
Non-static (instance) members cannot be accessed in the static context (static method, static block, and static nested class) directly. | Static and non-static variables both can be accessed in instance methods.


## 1. String, StringBuilder, StringBuffer

Feature     | String | StringBuilder | StringBuffer
------------|--------|---------------|-------------
mutable     | No     | Yes           | Yes
thread-safe | Yes    | No            | Yes

## 2. Collections
### 2.1 How to remove element in for each loop?
It is wrong to call `List.remove()` method in the loop. `ConcurrentModificationException` will be thrown.
```java
private static void wrongWayToRemoveElement() {
    List<String> fruits = new ArrayList<>();
    fruits.add("Apple");
    fruits.add("Banana");
    fruits.add("Orange");
    fruits.add("Watermelon");
    fruits.add("Kiwi");

    // in for each loop
    for (String fruit : fruits) {
        System.out.println("Processing - " + fruit);

        if ("Orange".equals(fruit)) {
            fruits.remove("Orange");  // java.util.ConcurrentModificationException is thrown
        }
    }

    // in iterator loop
    Iterator<String> iterator = fruits.iterator();

    while (iterator.hasNext()){
        String fruit = iterator.next();
        System.out.println("Processing - " + fruit);

        if("Orange".equals(fruit)) {
            fruits.remove("Orange");  // java.util.ConcurrentModificationException is thrown
        }
    }

    System.out.println("fruits set after iteration = " + fruits);
}
```
Output.
```sh
Processing - Apple
Processing - Banana
Processing - Orange
java.util.ConcurrentModificationException
	at java.util.ArrayList$Itr.checkForComodification(ArrayList.java:901)
	at java.util.ArrayList$Itr.next(ArrayList.java:851)
	at johnny.java.collection.ArrayListExample.wrongWayToRemoveElement(ArrayListExample.java:55)
	at johnny.java.collection.ArrayListExample.main(ArrayListExample.java:20)
```
Instead, call `Iterator.remove()` method.
```java
private static void correctWayToRemoveElement() {
    List<String> fruits = new ArrayList<>();
    fruits.add("Apple");
    fruits.add("Banana");
    fruits.add("Orange");
    fruits.add("Watermelon");
    fruits.add("Kiwi");

    Iterator<String> iterator = fruits.iterator();

    while (iterator.hasNext()){
        String fruit = iterator.next();
        System.out.println("Processing - " + fruit);

        if("Orange".equals(fruit)) {
            iterator.remove();  // iterator.remove not list.remove
        }
    }

    System.out.println("fruits set after iteration = " + fruits);
}
```
Output.
```sh
Processing - Apple
Processing - Banana
Processing - Orange
Processing - Watermelon
Processing - Kiwi
fruits set after iteration = [Apple, Banana, Watermelon, Kiwi]
```
### 2.2 ArrayList VS LinkedList
1) The insert and remove operations give good performance (O(1)) in LinkedList compared to ArrayList(O(n)). Hence if there is a requirement of frequent addition and deletion in application then LinkedList is a best choice.

2) Search (get method) operations are fast in Arraylist (O(1)) but not in LinkedList (O(n)) so If there are less add and remove operations and more search operations requirement, ArrayList would be your best bet.

### 2.3 Stack and Queue
```java
Deque<String> stack = new ArrayDeque<String>();
Deque<String> queue = new ArrayDeque<String>();

stack.push("A");
stack.push("B");
stack.push("C");
stack.push("D");

while (!stack.isEmpty()) {
  System.out.print(stack.pop() + " ");
}

queue.add("A");
queue.add("B");
queue.add("C");
queue.add("D");
while (!queue.isEmpty()) {
  System.out.print(queue.remove() + " ");
}
```
Output
```raw
D C B A A B C D
```
### 2.4 Queue VS Deque
```java
Queue queue = new LinkedList();
Queue queue = new PriorityQueue();
Deque<Integer> deque = new ArrayDeque<Integer>();
Deque<Integer> deque = new LinkedList<Integer>();
```
### 2.5 Use Deque over Stack?
* Stack is concrete class, inherited from Vector. It has no interface.
* Stack is not implemented with linked list.
* Deque is interface. Deque exposes a set of operations which is all about being able to fetch/add/remove items from the start or end of a collection.

```java
Stack<Integer> stack = new Stack<Integer>();
Deque<Integer> stack = new ArrayDeque<Integer>();
Deque<Integer> stack = new LinkedList<Integer>();
Deque<Integer> queue = new ArrayDeque<Integer>();
Deque<Integer> queue = new LinkedList<Integer>();
Deque<Integer> deque = new ArrayDeque<Integer>();
Deque<Integer> deque = new LinkedList<Integer>();
```
### 2.6 ArrayDeque Vs LinkedList
ArrayDeque is new with Java 6. If you need add/remove of the both ends, ArrayDeque is significantly better than a linked list. Random access each element is also O(1) for a cyclic queue.

The only better operation of a linked list is removing the current element during iteration.

## 2. Hash Collision Resolution
* Separate chaining
* Linear Probing (Clustering problem)
* Quadratic Probing (May not find a vacant cell)

http://www.cs.cmu.edu/~ab/15-121N11/lectures/lecture16.pdf

## 3. Finalize, Final, Finally

## 4. Exception

## 5. Lamda expression

## 6. References
* [Java Interview Questions](https://www.tutorialspoint.com/java/java_interview_questions.htm)
* [Java Interview Questions](https://www.journaldev.com/java-interview-questions)
* [300 Core Java Interview Questions](https://www.javatpoint.com/corejava-interview-questions)
