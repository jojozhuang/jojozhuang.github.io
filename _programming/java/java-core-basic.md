---
layout: programming
key: programming
title: "Java Core - Basic"
index: 201
category: java
image: /programming/java.png
date: 2016-02-01
postdate: 2016-02-01
tags: [String, Integer, Array, List]
---

> Basic knowledge of java.

## 1. String, StringBuilder, StringBuffer and CharSequence

Feature     | String | StringBuilder | StringBuffer
------------|--------|---------------|-------------
mutable     | No     | Yes           | Yes
thread-safe | Yes    | No            | Yes

### 1.1 String
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
String s12 = s10 + s11; // s12 = "hello123";

// String comparison
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
```
### 1.2 StringBuilder
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
### 1.3 StringBuffer
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

### 1.4 CharSequence
CharSequence is an interface that represents a sequence of characters. String, StringBuilder and StringBuffer are all its implementations.
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

## 2. Character
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

## 2. Array and Collections
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

## 3. Bit Manipulation
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

## 4. HashSet, HashMap, TreeMap
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

## 5. Stack and Queue
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

## 6. Heap
```java
// create min heap
PriorityQueue<Integer> minHeap = new PriorityQueue<>();
// create max heap
PriorityQueue<Integer> maxHeap = new PriorityQueue<>((a,b)->b-a);
```


## 8. Source Files
* [Source files for Java Core Basic on GitHub](https://github.com/jojozhuang/java-programming/tree/master/java-core-basic)

## 9. References
* [Core Java Tutorial](https://www.journaldev.com/24601/java-11-features)
