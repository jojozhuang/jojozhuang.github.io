---
layout: tutorial
key: programming
title: "Java Advanced - JIT Compiler"
index: 2452
subcategory: java-advanced
date: 2017-03-03
tags: [JIT]
---

> Just-in-time compiler.

## 1. The JIT Compiler
### 1.1 Compiled vs. Interpreted Languages
Languages such as C, C++ and FORTRAN are `compiled languages`. Their code is delivered as binary code targeted at the underlying machine. This means that the high-level code is compiled into binary code at once by a static compiler written specifically for the underlying architecture. The binary that is produced will not run on any other architecture.

On the other hand, `interpreted languages` like Python and Perl can run on any machine, as long as they have a valid interpreter. It goes over line-by-line over the high-level code, converting that into binary code.

Interpreted code is typically slower than compiled code. For example, consider a loop. An interpreted will convert the corresponding code for each iteration of the loop. On the other hand, a compiled code will make the translation only one. Further, since interpreters see only one line at a time, they are unable to perform any significant code such as, changing the order of execution of statements like compilers.

We shall look into an example of such optimization below −  
**Adding two numbers stored in memory.** Since accessing memory can consume multiple CPU cycles, a good compiler will issue instructions to fetch the data from memory and execute the addition only when the data is available. It will not wait and in the meantime, execute other instructions. On the other hand, no such optimization would be possible during interpretation since the interpreter is not aware of the entire code at any given time.

But then, interpreted languages can run on any machine that has a valid interpreter of that language.

**Is Java Compiled or Interpreted?**
Java tried to find a middle ground. Since the JVM sits in between the javac compiler and the underlying hardware, the javac (or any other compiler) compiler compiles Java code in the `Bytecode`, which is understood by a platform specific JVM. The JVM then compiles the Bytecode in `binary` using JIT (Just-in-time) compilation, as the code executes.
### 1.2 HotSpots
In a typical program, there’s only a small section of code that is executed frequently, and often, it is this code that affects the performance of the whole application significantly. Such sections of code are called `HotSpots`.

If some section of code is executed only once, then compiling it would be a waste of effort, and it would be faster to interpret the Bytecode instead. But if the section is a hot section and is executed multiple times, the JVM would compile it instead. For example, if a method is called multiple times, the extra cycles that it would take to compile the code would be offset by the faster binary that is generated.

Further, the more the JVM runs a particular method or a loop, the more information it gathers to make sundry optimizations so that a faster binary is generated.

Let us consider the following code −
```java
for(int i = 0 ; i <= 100; i++) {
   System.out.println(obj1.equals(obj2)); //two objects
}
```

If this code is interpreted, the interpreter would deduce for each iteration that classes of obj1. This is because each class in Java has an .equals() method, that is extended from the Object class and can be overridden. So even if obj1 is a string for each iteration, the deduction will still be done.

On the other hand, what would actually happen is that the JVM would notice that for each iteration, obj1 is of class String and hence, it would generate code corresponding to the .equals() method of the String class directly. Thus, no lookups will be required, and the compiled code would execute faster.

This kind of behavior is only possible when the JVM knows how the code behaves. Thus, it waits before compiling certain sections of the code.

Below is another example −
```java
int sum = 7;
for(int i = 0 ; i <= 100; i++) {
   sum += i;
}
```
An interpreter, for each loop, fetches the value of ‘sum’ from the memory, adds ‘i’ to it, and stores it back into memory. Memory access is an expensive operation and typically takes multiple CPU cycles. Since this code runs multiple times, it is a HotSpot.

The JIT will compile this code and make the following optimization.  
A local copy of ‘sum’ would be stored in a **register**, specific to a particular thread. All the operations would be done to the value in the register and when the loop completes, the value would be written back to the memory.

What if other threads are accessing the variable as well? Since updates are being done to a local copy of the variable by some other thread, they would see a stale value. Thread **synchronization** is needed in such cases. A very basic sync primitive would be to declare ‘sum’ as **volatile**. Now, before accessing a variable, a thread would flush its local registers and fetch the value from the memory. After accessing it, the value is immediately written to the memory.

## 2. Compilation Levels
JVM supports five compilation levels −
- Interpreter
- C1 with full optimization (no profiling)
- C1 with invocation and back-edge counters (light profiling)
- C1 with full profiling
- C2 (uses profiling data from the previous steps)
- Use `-Xint` if you want to disable all JIT compilers and use only the interpreter.

### 2.1 Client vs. Server JIT
Use `-client` and `-server` to activate the respective modes.

The client compiler (C1) starts compiling code sooner than the server compiler (C2). So, by the time C2 has started compilation, C1 would have already compiled sections of code.

But while it waits, C2 profiles the code to know about it more than the C1 does. Hence, the time it waits if offset by the optimizations can be used to generate a much faster binary. From the perspective of a user, the trade-off is between the startup time of the program and the time taken for the program to run. If startup time is the premium, then C1 should be used. If the application is expected to run for a long time (typical of applications deployed on servers), it is better to use C2 as it generates much faster code which greatly offsets any extra startup time.

For programs such as IDEs (NetBeans, Eclipse) and other GUI programs, the startup time is critical. NetBeans might take a minute or longer to start. Hundreds of classes are compiled when programs such as NetBeans are started. In such cases, C1 compiler is the best choice.

Note that there are two versions of C1 − 32-bit and 64-bit. C2 comes only in 64-bit.

### 2.2 Tiered Compilation
In older versions on Java, the user could have selected one of the following options −
* Interpreter (-Xint)
* C1 (-client)
* C2 (-server)

Tiered Compilation came in Java 7. It uses the C1 compiler to startup, and as the code gets hotter, switches to the C2. It can be activated with the following JVM options: `-XX:+TieredCompilation`. The default value is set to false in Java 7, and to true in Java 8.

Even though there are only two basic compilers (+ interpreter) in Java, there are five levels of execution, because the Client compiler (C1) has three different levels of compilation and the Server compiler (C2) has only one.
* Level 0 – interpreted code
* Level 1 – simple C1 compiled code (with no profiling)
* Level 2 – limited C1 compiled code (with light profiling)
* Level 3 – full C1 compiled code (with full profiling)
* Level 4 – C2 compiled code (uses profile data from the previous steps)

The usual path is **0 -> 3 -> 4**, so the code is interpreted first, then, when it gets hot enough, it’s compiled by C1 with full profiling enabled and, finally, C2 compiles the code using profile data collected by C1.

### 2.3 32-bit vs. 64-bit
On a 32-bit machine, only the 32-bit version of the JVM can be installed. On a 64-bit machine, the user has a choice between the 32-bit and the 64-bit version. But there are certain nuances to this that can affect how our Java applications perform.

If the Java application uses less than **4GB** of memory, we should use the 32-bit JVM even on 64-bit machines. This is because memory references in this case would only be 32-bit and manipulating them would be less expensive than manipulating 64-bit addresses. In this case, the 64-bit JVM would perform worse even if we are using OOPS (ordinary object pointers). Using OOPS, the JVM can use 32-bit addresses in the 64-bit JVM. However, manipulating them would be slower than the real 32-bit references since the underlying native references would still be 64-bit.

If our application is going to consume more than 4G memory, we will have to use the 64-bit version as the 32-bit references can address no more than 4G of memory. We can have **both** the versions installed on the same machine and can switch between them using the **PATH** variable.

## 3. JIT Optimisations
Below are some general optimizations that are done by the JIT compilers −
- Method inlining
- Dead code elimination
- Heuristics for optimizing call sites
- Constant folding

### 3.1 Method Inlining
In this optimization technique, the compiler decides to replace your function calls with the function body. Below is an example for the same −
```java
int sum3;

static int add(int a, int b) {
   return a + b;
}

public static void main(String…args) {
   sum3 = add(5,7) + add(4,2);
}

//after method inlining
public static void main(String…args) {
   sum3 = 5 + 7 + 4 + 2;
}
```
Using this technique, the compiler saves the machine from the overhead of making any function calls (it requires pushing and popping parameters to the stack). Thus, the generated code runs faster.

Method inlining can only be done for `non-virtual` functions (functions that are not overridden). Consider what would happen if the ‘add’ method was overridden in a sub class and the type of the object containing the method is not known until runtime. In this case, the compiler would not know what method to inline. But if the method was marked as `final`, then the compiler would easily know that it can be inline because it cannot be over-ridden by any sub-class. Note that it is not at all guaranteed that a final method would be always in-lined.

### 3.2 Unreachable and Dead Code Elimination
Unreachable code is code that cannot be reached at by any possible execution flows. We shall consider the following example −
```java
void foo() {
   if (a) return;
   else return;
   foobar(a,b); //unreachable code, compile time error
}
```
Dead code is also unreachable code, but the compiler does spit an error out in this case. Instead, we just get a warning. Each block of code such as constructors, functions, try, catch, if, while, etc., have their own rules for unreachable code defined in the JLS (Java Language Specification).

### 3.3 Constant Folding
To understand the constant folding concept, see the below example.
```java
final int num = 5;
int b = num * 6; //compile-time constant, num never changes
//compiler would assign b a value of 30.
```

## 4. References
* [Java Virtual Machine Tutorial](https://www.tutorialspoint.com/java_virtual_machine/index.htm)
* [Client, Server, and Tiered Compilation](https://dzone.com/articles/client-server-and-tiered-compilation)
