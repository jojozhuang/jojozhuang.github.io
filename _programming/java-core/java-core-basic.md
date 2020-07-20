---
layout: tutorial
key: programming
title: "Java Core - Basic"
index: 2301
subcategory: java-core
date: 2017-01-01
tags: [String, Integer, Array, List]
---

> Basic knowledge of java.

## 1. Basics
### 1.1 Java Access Modifiers
Class Access Levels are as follows:

Access Modifiers        | private | default | protected | public
Inside Class            | Y       | Y       | Y         | Y
Same Package Class      | N       | Y       | Y         | Y
Same Package Sub-Class  | N       | Y       | Y         | Y
Other Package Class     | N       | N       | N         | Y
Other Package Sub-Class | N       | N       | Y         | Y

### 1.2 Java Primitive Data Types
A `primitive data type` specifies the size and type of variable values, and it has no additional methods. There are eight primitive data types in Java:

Data Type | Size    | Description
----------|---------|---------------------------------------
byte      | 1 byte  | Stores whole numbers from -128 to 127
short     | 2 bytes | Stores whole numbers from -32,768 to 32,767
int       | 4 bytes | Stores whole numbers from -2,147,483,648 to 2,147,483,647
long      | 8 bytes | Stores whole numbers from -9,223,372,036,854,775,808 to 9,223,372,036,854,775,808
float     | 4 bytes | Stores fractional numbers from 3.4e−038 to 3.4e+038. Sufficient for storing 6 to 7 decimal digits
double    | 8 bytes | Stores fractional numbers from 1.7e−308 to 1.7e+038. Sufficient for storing 15 decimal digits
boolean   | 1 byte  | Stores true or false values
char      | 2 bytes | Stores a single character/letter

### 1.3 Java Non-primitive data types
Non-primitive data types are called `reference types` because they refer to objects. The main difference between `primitive` and `non-primitive` data types are:
* Primitive types are predefined (already defined) in Java. Non-primitive types are created by the programmer and is not defined by Java (except for `String`).
* Non-primitive types can be used to call methods to perform certain operations, while primitive types cannot.
* A primitive type has always a value, while non-primitve types can be `null`.
* A primitive type starts with a lowercase letter, while non-primitive types starts with an uppercase letter.
* The size of a primitive type depends on the data type, while non-primitive types have all the same size.

Examples of non-primitive types are `Strings`, `Arrays`, `Classes`, `Interface`, etc.

### 1.4 Autoboxing in Java
Autoboxing in java was introduced in Java 1.5. Autoboxing and unboxing is a convenient way to auto transform primitive data type to it’s corresponding java wrapper classes and vice versa.

**Autoboxing in Java**  
Converting a primitive data type into an object of the corresponding wrapper class is called autoboxing. For example, converting int to Integer or converting long to Long object.

Java compiler applies autoboxing when a primitive value is:
* Passed as a parameter to a method that expects an object of the corresponding wrapper class. For example a method with Integer argument can be called by passing int, java compiler will do the conversion of int to Integer.
* Assigned to a variable of the corresponding wrapper class. For example, assigning a Long object to long variable.

**Unboxing in Java**  
Converting an object of a wrapper type to its corresponding primitive data type is called unboxing.

Java compiler applies unboxing when an object of a wrapper class is:
* Passed as a parameter to a method that expects a value of the corresponding primitive type.
* Assigned to a variable of the corresponding primitive type.

Java Autoboxing Example:
```java
public static void main(String[] args) {
    int i = 6;
    long j = 105L;

    // passed the int, will get converted to Integer object at Runtime using
    // autoboxing in java
    doSomething(i);

    List<Long> list = new ArrayList<>();

    // java autoboxing to add primitive type in collection classes
    list.add(j);
}

private static void doSomething(Integer in) {
    // unboxing in java, at runtime Integer.intValue() is called implicitly to return int
    int j = in;

    // java unboxing, Integer is passed where int is expected
    doPrimitive(in);
}

private static void doPrimitive(int i) {

}
```

### 1.5 Wrapper Class in Java
Wrapper class in java are the Object representation of eight primitive types in java. All the wrapper classes in java are `immutable` and `final`. Java 5 autoboxing and unboxing allows easy conversion between primitive types and their corresponding wrapper classes in java programs.

Below table shows the primitive types and their wrapper class in java.

Primitive type | Wrapper class | Constructor Arguments
---------------|---------------|------------------------
byte           | Byte          | byte or String
short          | Short         | short or String
int            | Integer       | int or String
long           | Long          | long or String
float          | Float         | float, double or String
double         | Double        | double or String
char           | Character     | char
boolean        | Boolean       | boolean or String

Example.
```java
public static void main(String args[]){
    int i = 10;
    char c = 'a';

    // primitives are simple to use
    int j = i + 3;

    // polymorphism achieved by Wrapper classes, we can't pass primitive here
    doSomething(new Character(c));

    List<Integer> list = new ArrayList<>();
    // wrapper classes can be used in Collections
    Integer in = new Integer(i);
    list.add(in);

    // autoboxing takes care of primitive to wrapper class conversion
    list.add(j);

    // wrapper classes can be null
    in = null;

    Integer ix = new Integer(12);
    System.out.println(ix); // ix = 12
    modify(ix);
    System.out.println(ix); // ix is still 12
}

private static void doSomething(Object obj){

}

private static void modify(Integer ix) {
    ix = ix + 1;
    System.out.println(ix); // ix = 13
}
```
Notice, variable `ix` in main() function is not changed after the call by modify() function.

### 1.6 for loop
There are three types of for loop in java.
* General for loop
* for-each or enhanced for loop
* Java for loop with label(continue or break)

Example for 'general for loop'.
```java
// print integers 6 to 10
for (int i = 6; i <= 10; i++) {
    System.out.println("Java for loop example - " + i);
}
```
Example for 'for-each or enhanced for loop'.
```java
// print integers with 'for each'
int[] intArray = { 1, 2, 3, 4, 5 };

for (int i : intArray) {
    System.out.println("Java for each example - " + i);
}

// print strings with 'for loop'
List<String> fruits = new ArrayList<>();
fruits.add("Apple");
fruits.add("Banana");
fruits.add("Orange");

for (String f : fruits) {
    System.out.println("Java for each loop with collection - " + f);
}
```
Example for 'for loop with label'.
```java
// for loop with label, continue
int[][] intArr = { { 1, -2, 3 }, { 0, 3 }, { 9, 2, 5 }, { 1, 2, 5 }};

process: for (int i = 0; i < intArr.length; i++) {
    boolean allPositive = true;
    for (int j = 0; j < intArr[i].length; j++) {
        if (intArr[i][j] < 0) {
            allPositive = false;
            continue process;
        }
    }
    if (allPositive) {
        // process the array
        System.out.println("Array has no negative elements: " + Arrays.toString(intArr[i]));
    }
}

// for loop with label, break
search:
for (int i = 0; i < intArr.length; i++) {
    for (int j = 0; j < intArr[i].length; j++) {
        if (intArr[i][j] > 7) {
            System.out.println("Find array which contains element larger than 7: " + Arrays.toString(intArr[i]));
            break search;
        }
    }
}
```
Output.
```raw
Java for loop example - 6
Java for loop example - 7
Java for loop example - 8
Java for loop example - 9
Java for loop example - 10
Java for each example - 1
Java for each example - 2
Java for each example - 3
Java for each example - 4
Java for each example - 5
Java for each loop with collection - Apple
Java for each loop with collection - Banana
Java for each loop with collection - Orange
Array has no negative elements: [0, 3]
Array has no negative elements: [9, 2, 5]
Array has no negative elements: [1, 2, 5]
Find array which contains element larger than 7: [9, 2, 5]
```
### 1.7 while loop
```java
// while loop
int i = 6;
while (i <= 10) {
    System.out.println(i);
    i++;
}

// while loop with Iterator
List<String> veggies = new ArrayList<>();
veggies.add("Spinach");
veggies.add("Potato");
veggies.add("Tomato");

Iterator<String> it = veggies.iterator();

while(it.hasNext()) {
    System.out.println(it.next());
}

// infinite loop
while(true) {
    try {
        Thread.sleep(1000);
    } catch (InterruptedException e) {
        e.printStackTrace();
    }
    SimpleDateFormat sdf = new SimpleDateFormat("MMM dd,yyyy HH:mm:ss");
    Date current = new Date(System.currentTimeMillis());
    System.out.println(sdf.format(current));
}
```
Output.
```raw
6
7
8
9
10
Spinach
Potato
Tomato
Apr 01,2019 13:52:25
Apr 01,2019 13:52:26
Apr 01,2019 13:52:27
Apr 01,2019 13:52:28
Apr 01,2019 13:52:29
Apr 01,2019 13:52:30
...
```
### 1.8 do while loop
```java
// do while loop
int i = 6;
do {
    System.out.println(i);
    i++;
} while (i <= 10);

// infinite loop
do {
    try {
        Thread.sleep(1000);
    } catch (InterruptedException e) {
        e.printStackTrace();
    }
    SimpleDateFormat sdf = new SimpleDateFormat("MMM dd,yyyy HH:mm:ss");
    Date current = new Date(System.currentTimeMillis());
    System.out.println(sdf.format(current));
} while(true);
```
Output.
```raw
6
7
8
9
10
Apr 01,2019 14:01:06
Apr 01,2019 14:01:07
Apr 01,2019 14:01:08
Apr 01,2019 14:01:09
Apr 01,2019 14:01:10
```
### 1.9 do while vs while loop
The only time you should use `do while` loop is when you want to execute the statements inside loop `at least once`, even though condition expression returns false. Otherwise it’s always better to use while loop.

## 2. Static Keyword
static keyword usage.
* static variable
* static methods
* static block
* static inner class
* Interface static method

Example.
```java
public class StaticKeywordExample {
    public static void main(String[] args) {
        StaticExample.setCount(5);

        //non-private static variables can be accessed with class name
        StaticExample.str = "abc";
        StaticExample se = new StaticExample();
        System.out.println(se.getCount());

        //class and instance static variables are same
        System.out.println(StaticExample.str + " is same as " + se.str);
        System.out.println(StaticExample.str == se.str);

        //static nested classes are like normal top-level classes
        StaticExample.MyStaticClass myStaticClass1 = new StaticExample.MyStaticClass();
        myStaticClass1.count = 10;

        StaticExample.MyStaticClass myStaticClass2 = new StaticExample.MyStaticClass();
        myStaticClass2.count = 20;

        System.out.println(myStaticClass1.count);
        System.out.println(myStaticClass2.count);
    }
}

class StaticExample {
    //static block
    static {
        //can be used to initialize resources when class is loaded
        System.out.println("StaticExample static block");
        //can access only static variables and methods
        str = "Test";
        setCount(2);
    }

    //multiple static blocks in same class
    static{
        System.out.println("StaticExample static block2");
    }

    //static variable example
    private static int count; //kept private to control its value through setter
    public static String str;

    // instance method
    public int getCount() {
        return count;
    }

    //static method example
    public static void setCount(int count) {
        if (count > 0)
            StaticExample.count = count;
    }

    //static util method
    public static int addInts(int i, int...js){
        int sum = i;
        for (int x : js) {
            sum += x;
        }
        return sum;
    }

    //static class example - used for packaging convenience only
    public static class MyStaticClass{
        public int count;
    }
}
```

## 3. String and Character
### 3.1 String
Common operations on String.
* Creation
* Concatenation
* Comparison
* Conversion
* Substring
* Replacement

```java
// String creation
String s1 = "java";                                  // s1 = "java"
String s2 = new String("java");                      // s2 = "java"
String s3 = new String(new char[]{'j','a','v','a'}); // s3 = "java", created by char array
String s4 = String.valueOf(5);                       // s4 = "5", created by int

// concatenate strings
String s10 = "hello";
String s11 = "123";
String s12 = s10 + s11;                                // s12 = "hello123";

// String comparison
String str1 = "java";                                  // str1 is stored in String Pool
String str2 = "java";                                  // str2 is stored in String Pool
String str3 = new String("java");                      // str3 is created locally, it is not in String Pool
String str4 = new String(new char[]{'j','a','v','a'}); // str4 = "java"
System.out.println(str1 == str2);                      // true, both are from String Pool, same object
System.out.println(str1.equals(str2));                 // true
System.out.println(str1 == str3);                      // false, str3 is created with new keyword
System.out.println(str1.equals(str3));                 // true
System.out.println(str1 == str4);                      // false, str4 is created with new keyword
System.out.println(str1.equals(str4));                 // true

// Substring
String s = "hello, world";
String substring = s.substring(0, 5);             // substring = "hello"
System.out.println(substring);
CharSequence subSequence = s.subSequence(0, 5);   // subSequence = "hello"
System.out.println(subSequence);

// Split string to string array
String sentence = "I am a software engineer";
String[] array = sentence.split(" ");      // array = {"I", "am", "a", "software", "engineer"}

// Split string with regex
String a = "1+2i";
String[] x = a.split("\\+|i");             // x = {"1", "2"};
System.out.println(Arrays.toString(x));

String b = "1+2i3";
String[] y = b.split("\\+|i");             // y = {"1", "2", "3"};
System.out.println(Arrays.toString(y));

// Replace string
String strA = "hello, world";
strA = strA.replaceAll("o","tt");          // strA = "helltt, wttld";
System.out.println(strA);

// Convert string to upper case
String strB = "Hello, World!";
strB = strB.toUpperCase();                 // strB = "HELLO, WORLD!"
System.out.println(strB);

// Convert string to lower case
String strC = "Hello, World!";
strC = strC.toLowerCase();                 // strC = "hello, world!"
System.out.println(strC);

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
### 3.2 StringBuilder
StringBuilder is mainly used to concatenate strings, as it has better performance than String.
```java
// StringBuilder creation
StringBuilder sb1 = new StringBuilder();
StringBuilder sb2 = new StringBuilder(20);     // Set capacity
StringBuilder sb3 = new StringBuilder("Hello, world!"); // Creation with initial value

StringBuilder sb = new StringBuilder("Have");
// append
sb.append(" a");
sb.append(" nice");
sb.append(" day!");
System.out.println(sb); // sb.toString() = "Have a nice day!"
sb.append(1);
sb.append(2);
sb.append(3);
System.out.println(sb); // sb.toString() = "Have a nice day!123"

// insert
sb.insert(0, "Johnny, ");
System.out.println(sb); // sb.toString() = "Johnny, Have a nice day!123"

// replace
sb.replace(8, 12, "have"); // change H to lower case
System.out.println(sb); // sb.toString() = "Johnny, have a nice day!123"

// delete
sb.delete(sb.length() - 2, sb.length());
System.out.println(sb); // sb.toString() = "Johnny, have a nice day!1"

// Delete last character
sb.setLength(sb.length() - 1);
System.out.println(sb); // sb.toString() = "Johnny, have a nice day!"

// reverse
sb.reverse();
System.out.println(sb); // sb.toString() = "!yad ecin a evah ,ynnhoJ"

// convert to String
String str = sb.toString();
System.out.println(str); // str = "!yad ecin a evah ,ynnhoJ";
```
### 3.3 StringBuffer
StringBuffer is mainly used to concatenate strings, as it has better performance than String.
```java
// StringBuffer creation
StringBuffer sb1 = new StringBuffer();
StringBuffer sb2 = new StringBuffer(20);     // Set capacity
StringBuffer sb3 = new StringBuffer("Hello, world!"); // Creation with initial value

StringBuffer sb = new StringBuffer("Have");
// append
sb.append(" a");
sb.append(" nice");
sb.append(" day!");
System.out.println(sb); // sb.toString() = "Have a nice day!"
sb.append(1);
sb.append(2);
sb.append(3);
System.out.println(sb); // sb.toString() = "Have a nice day!123"

// insert
sb.insert(0, "Johnny, ");
System.out.println(sb); // sb.toString() = "Johnny, Have a nice day!123"

// replace
sb.replace(8, 12, "have"); // change H to lower case
System.out.println(sb); // sb.toString() = "Johnny, have a nice day!123"

// delete
sb.delete(sb.length() - 2, sb.length());
System.out.println(sb); // sb.toString() = "Johnny, have a nice day!1"

// Delete last character
sb.setLength(sb.length() - 1);
System.out.println(sb); // sb.toString() = "Johnny, have a nice day!"

// reverse
sb.reverse();
System.out.println(sb); // sb.toString() = "!yad ecin a evah ,ynnhoJ"

// convert to String
String str = sb.toString();
System.out.println(str); // str = "!yad ecin a evah ,ynnhoJ";
```
### 3.4 String vs StringBuilder vs StringBuffer

Feature     | String | StringBuilder | StringBuffer
------------|--------|---------------|-------------
mutable     | No     | Yes           | Yes
thread-safe | Yes    | No            | Yes

### 3.5 CharSequence
CharSequence is an `interface` that represents a sequence of characters. String, StringBuilder and StringBuffer are all its implementations.
```java
// CharSequence creation, instantiated by implementation class(String, StringBuffer or  StringBuilder)
CharSequence string = "hello, String!";
CharSequence stringbuffer = new StringBuffer("hello, StringBuffer!");
CharSequence stringbuilder = new StringBuilder("hello, StringBuilder!");

// Comparison
CharSequence cs1 = "java";                      // created by String, fetched from String Pool
String str1 = "java";                           // fetched from String Pool
StringBuilder sb1 = new StringBuilder("java");
StringBuffer sb2 = new StringBuffer("java");
System.out.println(cs1 == str1);                // true, since they are both from String Pool
System.out.println(cs1.equals(str1));           // true, their values are same
System.out.println(cs1.equals(sb1));            // false
System.out.println(cs1.equals(sb1.toString())); // true
System.out.println(cs1.equals(sb2));            // false
System.out.println(cs1.equals(sb2.toString())); // true

CharSequence cs2 = new String("java");          // new string object, not in String Pool
System.out.println(cs2 == str1);                // false
System.out.println(cs2.equals(str1));           // true
```
Note, whether the object created by CharSequence is equal to other strings depends on how this object is created. If we know which class instantiated these objects, it is easy to apply the comparison rules.
### 3.6 Character
```java
// get integer value from char
String s = "ab5d";
int x = Character.getNumericValue(s.charAt(2)); // x = 5
// check if character is number(one single character)
Character.isDigit(c);
// same as
if (c >= '0' && c <= '9') {

}
// check if character is number or letter
Character.isLetterOrDigit(c);
// same as
if (c >= '0' && c <= '9' || c >= 'a' && c <= 'z' || c >= 'A' && c <= 'Z') {

}
```

## 4. Bit Manipulation
```java
// flip bit with XOR, change 1 to 0 and change 0 to 1.
int bit = 0;
bit = bit ^ 1; // bit = 1;
bit = bit ^ 1; // bit = 0;
// find the complement of the give number
int num = 10;  // 1010
int mask = 15; // 1111
int result = num ^ mask;  // result = 5, 0101

// power
int left = 3;
int pow = 1 << left; // pow = 8, 1000

// shift
int num = 5;
// get the value of last bit
int last = num & 1; // last = 1
// right shift
num >> 1; // return 2, 101 -> 10
// left shift
num << 1: // return 10, 101 -> 1010

// number of one-bits
int n = 177   // in binary format: 10110001
int count = 0;
while (n > 0) {
    if (n & 1) {
        count++;
    }
    n = n >> 1;
}
return count; // count = 4;

// or use built-in method
Integer.bitCount(177); // return 4
```

## 5. Array and Collections
### 5.1 Array and List
```java
// create empty array
int[] nums = new int[]{};
String[] strs = new String[]{};
// create array with length = 3
int[] nums = new int[3];
String[] strs = new String[3];
// create char array from string
String s = "hello";
char[] chs = s.toCharArray(); // chs = {'h','e','l','l','o'};

// create list
List<Integer> list1 = new ArrayList<>();
List<String> list2 = new ArrayList<>();
// create list with array
int[] nums = new int[]{1,2,3};
List<Integer> list = Arrays.asList(nums); // list = {1,2,3}

// loop
for (int i = 0; i < nums.length; i++) {
    int num = nums[i];
}
// or
for (int num : nums) {

}

// Sort array
int[] nums = {3, 7, 6, 5, 9, 2};
Arrays.sort(nums);  // nums = {2,3,5,6,7,9};

// Sort collection
List<String> list = new ArrayList<String>();
list.add("orange");
list.add("apple");
list.add("banana");
Collections.sort(list); // list = {"apple", "banana", "orange"}

// Binary search on sorted array or collection
int index1 = Arrays.binarySearch(new char[]{'c','d','e','f','g'}, 'f');  // index1 = 3;
int index2 = Arrays.binarySearch(new int[]{10,15,20,22,35}, 20); // index2 = 2;
int index3 = Collections.binarySearch(Arrays.asList(new Integer[] {10,15,20,22,35}), 15); // index3 = 1;

// Binary search on array
int[] array = {10,15,20,22,35};
int index1 = Arrays.binarySearch(array,20); // index1 = 2
int index2 = Arrays.binarySearch(array,8);  // index2 = -1, (-insertion point) - 1
int index3 = Arrays.binarySearch(array,40); // index3 = -6, (-insertion point) - 1

// Binary search on collection
List list = new ArrayList<>(Arrays.asList(new Integer[]{10,20,15,22,35}));
int index1 = Collections.binarySearch(list,20); // index1 = 2
int index2 = Collections.binarySearch(list,8);  // index2 = -1, (-insertion point) - 1
int index3 = Collections.binarySearch(list,40); // index3 = -6, (-insertion point) - 1

// print Array
int[] nums = {1,3,5,7};
System.out.println(Arrays.toString(nums)); // print [1,3,5,7]
```

## 5.2 HashSet, HashMap, TreeMap
```java
// create HashSet
Set<String> set = new HashSet<>();
Set<Integer> set = new HashSet<>();
// initialize HashSet with List
List<Integer> list = new ArrayList<>();
list.add(1);
list.add(2);
Set<Integer> set = new HashSet<>(list); // set = {1,2}
// initialize HashSet with array
int[] nums = new int[]{1,2,3};
Set<Integer> set = new HashSet<>(Arrays.asList(nums)); // set = {1,2,3}
// create HashMap, key-value pair
Map<Integer, Integer> map = new HashMap<>();
Map<Integer, String> map = new HashMap<>();

// remove duplicated elements in list
List<Integer> list = new ArrayList<>();
list.add(1);
list.add(2);
list.add(1); // duplicate element
Set<Integer> set = new HashSet<>(list); // set = {1,2}
list.clear();
list.addAll(set); // list = {1,2}

TreeMap<Integer, String> treeMap = new TreeMap<>();
treeMap.put(1, "Monday")
treeMap.put(2, "Tuesday")
treeMap.put(3, "Wednesday")
treeMap.put(4, "Thursday")
treeMap.put(5, "Friday")
String day = treeMap.get(3); // day = "Wednesday"
Integer lowKey = treeMap.lowerKey(3); // lowKey = 2
Integer highKey = treeMap.higherKey(3); // lowKey = 4
Map.Entry<Integer, String> lowEntry = treeMap.lowerEntry(3); // lowEntry = <3, Wednesday>
Map.Entry<Integer, String> highEntry = treeMap.higherEntry(3); // lowEntry = <4, Thursday>
```
### 5.3 Stack and Queue
```java
// create stack
Stack<Integer> stack = new Stack<>();
// create queue
Queue<Integer> queue = new LinkedList<>();
// create Deque
Deque<Integer> deque = new LinkedList<>();

// Loop elements in queue
Queue<Integer> queue = new LinkedList<>();
int sum = 0;
for (int i: queue) {
    sum = sum + i;
}
```
## 5.4 Heap
```java
// create min heap
PriorityQueue<Integer> minHeap = new PriorityQueue<>();
// create max heap
PriorityQueue<Integer> maxHeap = new PriorityQueue<>((a,b)->b-a);
```

## 6. Source Files
* [Source files for Java Core Basic on GitHub](https://github.com/jojozhuang/java-programming/tree/master/java-core-basic)

## 7. References
* [Java Doc - Controlling Access to Members of a Class](https://docs.oracle.com/javase/tutorial/java/javaOO/accesscontrol.html)
* [Core Java Tutorial](https://www.journaldev.com/24601/java-11-features)
* [Java Data Types](https://www.w3schools.com/java/java_data_types.asp)
* [Primitive Wrapper Classes are Immutable in Java](https://www.geeksforgeeks.org/primitive-wrapper-classes-are-immutable-in-java/)
* [Java Arrays](https://www.journaldev.com/750/initialize-array-java)
