---
layout: tutorial
key: programming
title: "Java Core - Array and List"
index: 2304
subcategory: java-core
date: 2017-01-04
tags: [Array, ArrayList]
---

> Array, ArrayList and their conversion.

## 1. Array
### 1.1 Initializing Array
An array in java is a container that can hold a `fixed` number of values of the same type. The values can be of the primitive type like int, short, byte or it can be an object like String, Integer etc.

How to initialize an Array in Java?
* Initializing an array in java – primitive type
* Initializing an array in java – object type
* Initializing a multidimensional array in java
* Initializing an array in java using shortcut syntax
* Invalid ways to initialize an array in java

Valid Examples.
```java
private static void initializeArray() {
    //initialize primitive one dimensional array
    int[] nums = new int[5];

    //initialize Object one dimensional array
    String[] strings; //declaration

    strings = new String[4]; //initialization

    //initialize multidimensional array
    int[][] matrix = new int[4][5];

    //multidimensional array initialization with only leftmost dimension
    int[][] array = new int[2][];
    array[0] = new int[2];
    array[1] = new int[3]; //complete initialization is required before we use the array

    //array initialization using shortcut syntax
    int[] nums1 = {1,2,3};
    int[][] nums2 = { {1,2}, {1,2,3} };
}
```
Some invalid examples.
```java
    //invalid because dimension is not provided
    int[] a = new int[];

    //invalid because leftmost dimension value is not provided
    int[][] aa = new int[][5];
```

### 1.2 Array of List
We can create a Java array of list, each element in the array is a list.
```java
private static void arrayOfList() {
    List<String> list1 = new ArrayList<>();
    list1.add("1");
    list1.add("2");

    List<String> list2 = new ArrayList<>();
    list2.add("3");
    list2.add("4");
    list2.add("5");

    //List<String>[] arrayOfList = new List<String>[2]; // Can’t use generics while creating the array because java doesn’t support generic array
    List<String>[] arrayOfList = new List[2];

    arrayOfList[0] = list1;
    arrayOfList[1] = list2;

    for (int i = 0; i < arrayOfList.length; i++) {
        List<String> list = arrayOfList[i];
        System.out.println(list);
    }
}
```
Output.
```raw
[1, 2]
[3, 4, 5]
```

### 1.3 List of Array
We can also create a Java list of array, each element in the list is an array.
```java
private static void listOfArray() {
    // List of String arrays
    List<String[]> list = new ArrayList<>();

    String[] arr1 = { "a", "b", "c" };
    String[] arr2 = { "1", "2", "3", "4" };
    list.add(arr1);
    list.add(arr2);
    // printing list of String arrays in the ArrayList
    for (String[] strArr : list) {
        System.out.println(Arrays.toString(strArr));
    }
}
```
Output.
```raw
[a, b, c]
[1, 2, 3, 4]
```

## 2. Conversion
### 2.1 Array to List
There are two built-in ways to convert Array to List in Java.
* `Arrays.asList(T… a)`: This is the simplest way to convert Array to ArrayList in java but this method returns the underlying representation of the array in the form of ArrayList. The returned ArrayList is `fixed-sized` and any attempt to modify that will result in `UnsupportedOperationException` at runtime. Also, any change in the array will change the elements in ArrayList also.
* `Collections.addAll(ArrayList<T> strList, T[] strArr)`: This is the best way to convert array to ArrayList because the array data is copied to the list and both are independent object - `deep copy`. Once the array is copied, you can modify both the objects independently. Collections is a very useful class in Java Collections Framework that provides a lot of utility methods.

Examples for converting array to list.
```java
public class ArrayToList {
    public static void main(String[] args) {
        // approach one
        convertByArrays();

        System.out.println();

        // approach two
        convertByCollections();
    }

    private static void convertByArrays() {
        System.out.println("Convert array to list with Arrays.asList()");

        String[] strArr = {"a", "b", "c", "d"};
        System.out.println("Original array: " + Arrays.toString(strArr));

        // convert
        List<String> strList = Arrays.asList(strArr);
        System.out.println("Converted ArrayList: " + strList.toString());

        // change the array element
        strArr[0] = "z";
        System.out.println("Changed array: " + Arrays.toString(strArr));
        System.out.println("ArrayList after array is changed: " + strList.toString() + ", list is impacted.");
        // below code will throw java.lang.UnsupportedOperationException because
        // Arrays.asList() returns a fixed-size list backed by the specified array.
        //strList.add("5");
    }

    private static void convertByCollections() {
        System.out.println("Convert array to list with Collections.addAll()");

        String[] strArr = {"a", "b", "c", "d"};
        System.out.println("Original Array: " + Arrays.toString(strArr));

        // convert
        List<String> strList = new ArrayList<>();
        Collections.addAll(strList, strArr);
        System.out.println("Converted ArrayList: " + strList);

        // change the array element
        strArr[0] = "z";
        System.out.println("Changed array: " + Arrays.toString(strArr));
        System.out.println("ArrayList after array is changed: " + strList.toString() + ", list is not impacted.");

        // add new element to list
        strList.add("e");
        System.out.println("ArrayList after new element is added: " + strList.toString());
    }
}
```
Output.
```raw
Convert array to list with Arrays.asList()
Original array: [a, b, c, d]
Converted ArrayList: [a, b, c, d]
Changed array: [z, b, c, d]
ArrayList after array is changed: [z, b, c, d], list is impacted.

Convert array to list with Collections.addAll()
Original Array: [a, b, c, d]
Converted ArrayList: [a, b, c, d]
Changed array: [z, b, c, d]
ArrayList after array is changed: [a, b, c, d], list is not impacted.
ArrayList after new element is added: [a, b, c, d, e]
```

### 2.2 List to Array
There is three built-in ways to convert List to Array in Java. All utilize the `toArray()` method.
* Using Object Array: `Object[] List.toArray()` - This is the simplest way to convert List to Array in java but this method returns the array with Object type.
* Using Generic Type: `T[] List.toArray(T[] array)` - This is the best way to convert List to Array because it supports generic types.
* Using Stream: `stream.toArray()` - We can use stream in Java 8.

**Using Object Array**  
```java
private static void usingObject() {
    List<Integer> list = new ArrayList<>();
    list.add(1);
    list.add(2);
    list.add(3);

    Object[] arr1 = list.toArray(); //returns an array of Object
    System.out.println("Object: arr1 = " + Arrays.toString(arr1));
}
```
Output.
```raw
Object: arr1 = [1, 2, 3]
```
**Using Generic Type**  
```java
private static void usingGeneric() {
    List<Integer> list = new ArrayList<>();
    list.add(1);
    list.add(2);
    list.add(3);

    // 1. Create same type array with same size
    Integer[] arr2 = new Integer[list.size()];
    arr2 = list.toArray(arr2);
    System.out.println("Generic Type: arr2 = " + Arrays.toString(arr2));

    // Shortcut for above approach
    Integer[] arr3 = list.toArray(new Integer[list.size()]);
    System.out.println("Generic Type: arr3 = " + Arrays.toString(arr3));

    // 2. The given array has no enough space, a new array is created
    Integer[] arr4 = list.toArray(new Integer[0]);
    System.out.println("Generic Type: arr4 = " + Arrays.toString(arr4));

    // 3. The given array has more space, the right part are filled with null
    Integer[] arr5 = list.toArray(new Integer[10]);
    System.out.println("Generic Type: arr5 = " + Arrays.toString(arr5));
}
```
Output.
```raw
Generic Type: arr2 = [1, 2, 3]
Generic Type: arr3 = [1, 2, 3]
Generic Type: arr4 = [1, 2, 3]
Generic Type: arr5 = [1, 2, 3, null, null, null, null, null, null, null]
```
Note: toArray() method returns an array of type Object(Object[]). We need to `typecast` it to Integer before using as Integer objects. If we do not typecast, we get compilation error. Consider the following example:
```java
// Error: incompatible types: Object[], cannot be converted to Integer[]
Integer[] arr1 = list.toArray();
System.out.println("arr1 = " + Arrays.toString(arr1));
```
**Using Stream**  
```java
private static void usingStream() {
    List<Integer> list = new ArrayList<>();
    list.add(1);
    list.add(2);
    list.add(3);

    // Use stream in Java 8
    Integer[] arr6 = list.stream().toArray(Integer[]::new);
    System.out.println("Stream: arr6 = " + Arrays.toString(arr6));
}
```
Output.
```raw
Stream: arr6 = [1, 2, 3]
```

## 3. Copy Array
There are four built-in approaches to copy array.
* `Arrays.copyOf()`: If you want to copy first few elements of an array or full copy of array, you can use this method. This method internally use System.arraycopy() method.
* `Arrays.copyOfRange()`: If you want few elements of an array to be copied, where starting index is not 0, you can use this method to copy partial array. Again this method is also using System.arraycopy() method itself.
* `System.arraycopy()`: System.arraycopy() is the best way to do partial copy of an array. It provides you an easy way to specify the total number of elements to copy and the source and destination array index positions. For example System.arraycopy(source, 3, destination, 2, 5) will copy 5 elements from source to destination, beginning from 3rd index of source to 2nd index of destination.
* `Object.clone()`: Object class provides clone() method and since array in java is also an Object, you can use this method to achieve full array copy. This method will not suit you if you want partial copy of the array.

Examples for copying arrays.
```java
public class CopyArray {
    public static void main(String[] args) {
        int[] original = {1,2,3,4,5,6,7,8,9};

        System.out.println("Original array = " + Arrays.toString(original));

        int[] copy = Arrays.copyOf(original, original.length);
        System.out.println("Arrays.copyOf(): copy = " + Arrays.toString(copy));

        int[] copyRange = Arrays.copyOfRange(original, 3, 6);
        System.out.println("Arrays.copyOfRange(): copyRange = " + Arrays.toString(copyRange));

        int[] systemCopy = new int[original.length];
        System.arraycopy(original, 0, systemCopy, 0, original.length);
        System.out.println("System.arraycopy(): systemCopy = " + Arrays.toString(systemCopy));

        int[] clone = original.clone();
        System.out.println("Object.clone(): clone = " + Arrays.toString(clone));
    }
}
```
Output.
```raw
Original array = [1, 2, 3, 4, 5, 6, 7, 8, 9]
Arrays.copyOf(): copy = [1, 2, 3, 4, 5, 6, 7, 8, 9]
Arrays.copyOfRange(): copyRange = [4, 5, 6]
System.arraycopy(): systemCopy = [1, 2, 3, 4, 5, 6, 7, 8, 9]
Object.clone(): clone = [1, 2, 3, 4, 5, 6, 7, 8, 9]
```
Note that all the inbuilt methods discussed above for array copy perform `shallow copy`, so they are good for primitive data types and immutable objects such as String. If you want to copy an array of mutable objects, you should do it by writing code for a `deep copy` yourself.

## 4. Source Files
* [Source files for Java Array and List on GitHub](https://github.com/jojozhuang/java-programming/tree/master/java-core-arraylist)

## 5. References
* [Java Array of ArrayList, ArrayList of Array](https://www.journaldev.com/744/java-array-of-arraylist-of-array)
* [ArrayList to Array Conversion in Java : toArray() Methods](https://www.geeksforgeeks.org/arraylist-array-conversion-java-toarray-methods/)
* [Java Array to List](https://www.journaldev.com/756/java-array-to-list-arraylist)
* [Java Copy Array – Array Copy in Java](https://www.journaldev.com/753/java-copy-array-array-copy-java)
