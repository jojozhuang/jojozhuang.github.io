---
layout: tutorial
key: popular
title: "Algorithm - Java Best Practice"
index: 1253
subcategory: algorithm
date: 2016-04-01
tags: [Java, Stream]
---

> Useful Java tricks.

## 1. String, StringBuilder and Character
### 1.1 String
```java
// convert string to char array
char[] array = String.toCharArray();
// convert int to string
String str = new String.valueOf(1);
// concatenate strings
String s1 = "hello";
String s2 = "123";
String s3 = s1 + s2; // s3 = "hello123";
// string comparison
String s1 = "abc";
String s2 = "abc";
if (s1 == s2) {      // return false

}

if (s1.equals(s2)) { // return true;

}
// Split string to string array
String s = "I am a software engineer";
String[] array = s.split(" "); // array = {"I", "am", "a", "software", "engineer"}
//Split string with regex.
int a = "1+2i";
String[] x = a.split("\\+|i"); // x = {1, 2};

int b = "1+2i3";
String[] y = b.split("\\+|i"); // y = {1, 2, 3};
```
### 1.2 StringBuilder
```java
// concatenate strings
String s1 = "hello";
String s2 = "123";
StringBuilder sb = new StringBuilder();
sb.append(s1);
sb.append(s2);
// stringbuilder to string
sb.toString(); // return "hello123";
// delete last character of a StringBuilder
sb.setLength(sb.length() - 1);
sb.toString(); // return "hello12";
```
### 1.3 Character
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

## 7. Stream
Convert List Characters to String.
```java
List<Character> list = Arrays.asList('J','o','h','n','n','y');
String str = list.stream()
                    .map(String::valueOf)
                    .collect(Collectors.joining());

// str = "Johnny"
```
Convert Map to List.
```java
Map<String, Integer> map = new HashMap<>();
map.put("Apple", 2);
map.put("Orange", 5);
map.put("Watermelon", 3);

List<String> list = map.entrySet().stream()
                       .map(x -> (x.getKey() + " " + x.getValue()))
                       .collect(Collectors.toList());

// list = {"Apple 2", "Orange 5", "Watermelon 3"}
```
Find sum of array.
```java
int [] arr = {1,2,3,4};
int sum = Arrays.stream(arr).sum();

// sum = 10
```
Find sum of integer list.
```java
List<Integer> integers = Arrays.asList(1, 2, 3, 4, 5);
Integer sum = integers.stream()
                      .reduce(0, (a, b) -> a + b);

Integer sum = integers.stream()
                      .reduce(0, Integer::sum);
```
Convert List of Integer to array of int.
```java
List<Integer> list = Arrays.asList(1,2,3,4,5);
int[] primitive = list.stream()
                      .mapToInt(Integer::intValue)
                      .toArray();
// primitive = [1,2,3,4,5];

// Handle null with default value
int[] primitive = list.stream()
                      .mapToInt(i->(i == null ? 0 : 1))
                      .toArray();
```
Convert List of String to array of String.
```java
List<String> list = Arrays.asList("Hello", "Johnny", "Welcome")
String[] array = list.stream().toArray(String[]::new);
// array = ["Hello", "Johnny", "Welcome"];
```
## 8. Regex
Convert string to array. Ignore any characters which are not letters, split by whitespace.
```java
String paragraph = "Bob hit a ball, the hit BALL flew far after it was hit."
String[] words = paragraph.replaceAll("[^a-zA-Z ]", "").toLowerCase().split("\\s+");

// words = ["bob", "hit", "a", "ball", "the", "hit", "ball", "flew",  "far", "after", "it", "was", "hit"];
```

## 9. References
* [Summing Numbers with Java Streams](https://www.baeldung.com/java-stream-sum)
