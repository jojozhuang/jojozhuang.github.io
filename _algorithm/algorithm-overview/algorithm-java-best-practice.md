---
layout: tutorial
key: algorithm
title: "Algorithm - Java Best Practice"
index: 1303
subcategory: algorithm-overview
date: 2016-04-01
tags: [Java, Stream, Regex]
---

> Useful Java tricks.

## 1. String, StringBuilder and Character
### 1.1 String
```java
// convert string to char array
String str = "Hello";
char[] array = str.toCharArray();  // array = ['H','e','l','l','o']

// convert int to string
String str2 = String.valueOf(123); // str2 = "123"

// concatenate strings
String sub1 = "hello";
String sub2 = "123";
String str3 = sub1 + sub2;         // str3 = "hello123";

// string comparison
String s1 = "abc";
String s2 = "abc";
if (s1 == s2) {      // return false

}

if (s1.equals(s2)) { // return true;

}
```
### 1.2 Split string to array
Split with Regex.
```java
// Split string to string array
String sentence = "I am a software engineer";
String[] words = sentence.split(" "); // words = {"I", "am", "a", "software", "engineer"}

//Split string with regex.
String complex1 = "1+2i";
String[] x = complex1.split("\\+|i"); // x = {1, 2};

String complex2 = "1+2i3";
String[] y = complex2.split("\\+|i"); // y = {1, 2, 3};

String complex3 = "1+2i3";
String[] z = complex3.split("[+i]+"); // z = {1, 2, 3};

String str4 = "word1, word2 word3@word4?word5.word6";
String[] arrWords = str4.split("[, ?.@]+"); // arrWords = {"word1", "word2", "word3", "word4", "word5", "word6"}

String str5 = "Elmo will be on every kid's wishlist!";
String[] words3 = str5.split("\\W"); // words3 = {"Elmo", "will", "be", "on", "every", "kid", "s", "wishlist"}

String[] words4 = str5.split("[^\\w]"); // words4 = {"Elmo", "will", "be", "on", "every", "kid", "s", "wishlist"}

String[] words5 = str5.split("[^\\w']"); // words5 = {"Elmo", "will", "be", "on", "every", "kid's", "wishlist"}

String[] words6 = str5.split("[ '!]+"); // words6 = {"Elmo", "will", "be", "on", "every", "kid", "s", "wishlist"}

// The W metacharacter is used to find a word character.
// A word character is a character from a-z, A-Z, 0-9, including the _ (underscore) character.
String str6 = "Could you update -my age to variable _count? I'm 18.";
String[] words7 = str6.split("\\W");
// words7 = {"Could", "you", "update", "", "my", "age", "to", "variable", "_count", "", "I","m","18"}

String[] words8 = str6.split("[^\\w]");
// words8 = {"Could", "you", "update", "", "my", "age", "to", "variable", "_count", "", "I","m","18"}

String[] words9 = str6.replaceAll("[^a-zA-Z0-9_ ]", "").split("\\s+");
// words9 = {"Could", "you", "update", "my", "age", "to", "variable", "_count", "Im","18"}

// Convert string to array. Ignore any characters which are not letters, split by whitespace.
String paragraph = "Bob hit a ball, the hit BALL flew far after it was hit.";
String[] words10 = paragraph.replaceAll("[^a-zA-Z ]", "").toLowerCase().split("\\s+");
// words10 = ["bob", "hit", "a", "ball", "the", "hit", "ball", "flew", "far", "after", "it", "was", "hit"];
```
### 1.3 StringBuilder
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
### 1.4 Character
```java
// get integer value from char
String s = "ab5d";
int x = Character.getNumericValue(s.charAt(2)); // x = 5

// check if character is number(one single character)
char c = '5';
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
int[] nums2 = new int[3];
String[] strs2 = new String[3];

// create char array from string
String s = "hello";
char[] chs = s.toCharArray(); // chs = {'h','e','l','l','o'};

// create list
List<Integer> list1 = new ArrayList<>();
List<String> list2 = new ArrayList<>();

// create list with array
Integer[] nums3 = new Integer[]{1,2,3};
List<Integer> list = Arrays.asList(nums3); // list = {1,2,3}

// loop
for (int i = 0; i < nums.length; i++) {
    int num = nums[i];
}
// or
for (int num : nums) {

}

// Sort array
int[] nums4 = {3, 7, 6, 5, 9, 2};
Arrays.sort(nums4);  // nums4 = {2,3,5,6,7,9};

// Sort collection
List<String> list3 = new ArrayList<>();
list3.add("orange");
list3.add("apple");
list3.add("banana");
Collections.sort(list3); // list3 = {"apple", "banana", "orange"}

// Binary search
int index1 = Arrays.binarySearch(new char[]{'c','d','e','f','g'}, 'f');  // index1 = 3;
int index2 = Arrays.binarySearch(new int[]{10,15,20,22,35}, 20);         // index2 = 2;
int index3 = Collections.binarySearch(Arrays.asList(new Integer[] {10,15,20,22,35}), 15); // index3 = 1;

// Binary search on array
int[] array = {10,15,20,22,35};
int index21 = Arrays.binarySearch(array,20); // index21 = 2
int index22 = Arrays.binarySearch(array,8);  // index22 = -1, (-insertion point) - 1
int index23 = Arrays.binarySearch(array,40); // index23 = -6, (-insertion point) - 1

// Binary search on collection
List list4 = new ArrayList<>(Arrays.asList(new Integer[]{10,15,20,22,35}));
int index31 = Collections.binarySearch(list4,20); // index31 = 2
int index32 = Collections.binarySearch(list4,8);  // index32 = -1, (-insertion point) - 1
int index33 = Collections.binarySearch(list4,40); // index33 = -6, (-insertion point) - 1

// print Array
int[] nums5 = {1,3,5,7};
System.out.println(Arrays.toString(nums5)); // print [1,3,5,7]
```

## 3. Bit Manipulation
```java
// flip bit with XOR, change 1 to 0 and change 0 to 1.
int bit = 0;
bit = bit ^ 1; // bit = 1
bit = bit ^ 1; // bit = 0

// find the complement of the give number
int num = 10;  // 1010
int mask = 15; // 1111
int result = num ^ mask;  // result = 5, 0101

// power
int left = 3;
int pow = 1 << left; // pow = 8, 1000

// get the value of last bit
int num2 = 5;        // num2 = 101
int last = num2 & 1; // last = 1

// right shift
int num3 = 5;     // num3 = 101
num3 = num3 >> 1; // num3 = 2, 101 -> 10

// left shift
int num4 = 5;     // num4 = 101
num4 = num4 << 1; // num4 = 10, 101 -> 1010

// number of one-bits
int n = 177;   // in binary format: 10110001
int count = 0;
while (n > 0) {
    if ((n & 1) == 1) {
        count++;
    }
    n = n >> 1;
}
System.out.println(count); // print 4;

// or use built-in method
count = Integer.bitCount(177);  // count = 4;
```

## 4. HashSet, HashMap, TreeMap
```java
// create HashSet
Set<String> setStr = new HashSet<>();
Set<Integer> setNum = new HashSet<>();

// initialize HashSet with List
List<Integer> list = Arrays.asList(1, 2);
Set<Integer> set = new HashSet<>(list); // set = {1,2}

// initialize HashSet with array
Integer[] nums = new Integer[]{1,2,3};
Set<Integer> set2 = new HashSet<>(Arrays.asList(nums)); // set = {1,2,3}

// create HashMap, key-value pair
Map<Integer, Integer> map1 = new HashMap<>();
Map<Integer, String> map2 = new HashMap<>();

// remove duplicated elements in list
List<Integer> list2 = new ArrayList<>();
list2.add(1);
list2.add(2);
list2.add(1); // duplicate element
Set<Integer> set3 = new HashSet<>(list2); // set = {1,2}
// convert set to list
list.clear();
list.addAll(set); // list = {1,2}

TreeMap<Integer, String> treeMap = new TreeMap<>();
treeMap.put(1, "Monday");
treeMap.put(2, "Tuesday");
treeMap.put(3, "Wednesday");
treeMap.put(4, "Thursday");
treeMap.put(5, "Friday");
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
Queue<Integer> queue2 = new LinkedList<>();
int sum = 0;
for (int i: queue2) {
    sum = sum + i;
}
```

## 6. Heap
```java
// create min heap
PriorityQueue<Integer> minHeap = new PriorityQueue<>();
minHeap.offer(1);
minHeap.offer(2);
minHeap.offer(3);
while(!minHeap.isEmpty()) {
    System.out.println(minHeap.poll()); // print [1,2,3]
}

// create max heap
PriorityQueue<Integer> maxHeap = new PriorityQueue<>((a, b)->b-a);
minHeap.offer(1);
minHeap.offer(2);
minHeap.offer(3);
while(!minHeap.isEmpty()) {
    System.out.println(minHeap.poll()); // print [3,2,1]
}

// create max heap with comparator
PriorityQueue<Integer> pq = new PriorityQueue<>(Comparator.reverseOrder());
pq.offer(1);
pq.offer(2);
pq.offer(3);
while(!pq.isEmpty()) {
    System.out.println(pq.poll()); // print [3,2,1]
}

// custom comparator
PriorityQueue<int[]> pq2 = new PriorityQueue<>((a, b) -> a[0] - b[0]);
pq2.offer(new int[]{2, 15});
pq2.offer(new int[]{2, 20});
pq2.offer(new int[]{3, 30});
pq2.offer(new int[]{1, 10});
while(!pq2.isEmpty()) {
    System.out.println(pq2.poll()[1]); // print [10, 20, 15, 30]
}

// custom comparator
PriorityQueue<int[]> pq3 = new PriorityQueue<>((a, b) -> {
    if (a[0] == b[0]) {
        return a[1] - b[1];
    } else {
        return a[0] - b[0];
    }
});
pq3.offer(new int[]{2, 15});
pq3.offer(new int[]{2, 20});
pq3.offer(new int[]{3, 30});
pq3.offer(new int[]{1, 10});
while(!pq3.isEmpty()) {
    System.out.println(pq3.poll()[1]); // print [10, 15, 20, 30]
}
```

## 7. Stream
```java
// #1. Convert character list to string
List<Character> list = Arrays.asList('J','o','h','n','n','y');
String str = list.stream()
        .map(String::valueOf)
        .collect(Collectors.joining());

//str = "Johnny"

// #2. Convert map to list
Map<String, Integer> map = new HashMap<>();
map.put("Apple", 2);
map.put("Orange", 5);
map.put("Watermelon", 3);

List<String> list2 = map.entrySet().stream()
                        .map(x -> (x.getKey() + " " + x.getValue()))
                        .collect(Collectors.toList());

// list2 = {"Apple 2", "Orange 5", "Watermelon 3"}

// #3. Find sum of array
int [] arr = {1,2,3,4};
int sum = Arrays.stream(arr).sum();

// sum = 10

// #4. Find sum of integer list
List<Integer> integers = Arrays.asList(1, 2, 3, 4, 5);
Integer sum2 = integers.stream()
                       .reduce(0, (a, b) -> a + b);

Integer sum3 = integers.stream()
                       .reduce(0, Integer::sum);

// #5. Convert list of integer to array of int
List<Integer> list3 = Arrays.asList(1,2,3,4,5);
int[] primitive = list3.stream()
                       .mapToInt(Integer::intValue)
                       .toArray();
// primitive = [1,2,3,4,5];

// Handle null with default value
List<Integer> list4 = Arrays.asList(1,null,3,4,5);
int[] primitive2 = list4.stream()
                        .mapToInt(i->(i == null ? 0 : i))
                        .toArray();
// primitive2 = [1,0,3,4,5];

// #6. Convert List of String to array of String.
List<String> list5 = Arrays.asList("Hello", "Johnny", "Welcome");
String[] array = list5.stream().toArray(String[]::new);
// array = ["Hello", "Johnny", "Welcome"];
```

## 8. Source Files
* [Source files for Java Best Practice on GitHub](https://github.com/jojozhuang/dsa-java/tree/master/alg-best-practice)

## 9. References
* [Summing Numbers with Java Streams](https://www.baeldung.com/java-stream-sum)
