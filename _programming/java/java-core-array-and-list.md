---
layout: programming
key: programming
title: "Java Core - Array and List"
index: 203
category: java
image: /programming/java.png
date: 2016-02-03
postdate: 2016-02-03
tags: [Array, ArrayList]
---

> Array, ArrayList and their conversion.

## 1. Array of List
```java
import java.util.ArrayList;
import java.util.List;

public class ArrayOfList {
    public static void main(String[] args) {
        List<String> l1 = new ArrayList<>();
        l1.add("1");
        l1.add("2");

        List<String> l2 = new ArrayList<>();
        l2.add("3");
        l2.add("4");
        l2.add("5");

        //List<String>[] arrayOfList = new List<String>[2]; // Can’t use generics while creating the array because java doesn’t support generic array
        List<String>[] arrayOfList = new List[2];

        arrayOfList[0] = l1;
        arrayOfList[1] = l2;

        for (int i = 0; i < arrayOfList.length; i++) {
            List<String> list = arrayOfList[i];
            System.out.println(list);
        }

    }
}
```
Output
```sh
[1, 2]
[3, 4, 5]
```

## 2. List of Array
```java
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class ListOfArray {
    public static void main(String[] args) {
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
}
```
Output
```sh
[a, b, c]
[1, 2, 3, 4]
```

## 3. Array to List
There are two built-in ways to convert Array to List in Java.
* `Arrays.asList(T… a)`: This is the simplest way to convert Array to ArrayList in java but this method returns the underlying representation of the array in the form of ArrayList. The returned ArrayList is fixed-sized and any attempt to modify that will result in UnsupportedOperationException at runtime. Also, any change in the array will change the elements in ArrayList also.
* `Collections.addAll(ArrayList<T> strList, T[] strArr)`: This is the best way to convert array to ArrayList because the array data is copied to the list and both are independent object. Once the array is copied, you can modify both the objects independently. Collections is a very useful class in Java Collections Framework that provides a lot of utility methods.

```java
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class ArrayToList {
    public static void main(String[] args) {
        // approach one
        System.out.println("Example 1: Convert array to list with Arrays.asList()");
        convertByArrays();

        System.out.println("");
        // approach two
        System.out.println("Example 2: Convert array to list with Collections.addAll()");
        convertByCollections();
    }

    private static void convertByArrays() {
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
        String[] strArr = {"a", "b", "c", "d"};
        System.out.println("Original array: " + Arrays.toString(strArr));

        // convert
        List<String> strList = new ArrayList<>();
        Collections.addAll(strList, strArr);
        System.out.println("Converted ArrayList: " + strList.toString());

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
Output
```sh
Example 1: Convert array to list with Arrays.asList()
Original array: [a, b, c, d]
Converted ArrayList: [a, b, c, d]
Changed array: [z, b, c, d]
ArrayList after array is changed: [z, b, c, d], list is impacted.

Example 2: Convert array to list with Collections.addAll()
Original array: [a, b, c, d]
Converted ArrayList: [a, b, c, d]
Changed array: [z, b, c, d]
ArrayList after array is changed: [a, b, c, d], list is not impacted.
ArrayList after new element is added: [a, b, c, d, e]
```

## 4. List to Array
```java
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class ListToArray {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>();
        list.add("1");
        list.add("2");
        list.add("3");

        String[] arr1 = list.toArray(new String[list.size()]);
        System.out.println("arr1 = " + Arrays.toString(arr1));

        String[] arr2 = list.toArray(new String[0]);
        System.out.println("arr2 = " + Arrays.toString(arr2));

        String[] arr3 = list.stream().toArray(String[]::new);
        System.out.println("arr3 = " + Arrays.toString(arr3));
    }
}
```
Output.
```sh
arr1 = [1, 2, 3]
arr2 = [1, 2, 3]
arr3 = [1, 2, 3]
```

## 5. Copy Array
There are four built-in approaches to copy array.
* `Arrays.copyOf()`: If you want to copy first few elements of an array or full copy of array, you can use this method. This method internally use System.arraycopy() method.
* `Arrays.copyOfRange()`: If you want few elements of an array to be copied, where starting index is not 0, you can use this method to copy partial array. Again this method is also using System.arraycopy() method itself.
* `System.arraycopy()`: System.arraycopy() is the best way to do partial copy of an array. It provides you an easy way to specify the total number of elements to copy and the source and destination array index positions. For example System.arraycopy(source, 3, destination, 2, 5) will copy 5 elements from source to destination, beginning from 3rd index of source to 2nd index of destination.
* `Object.clone()`: Object class provides clone() method and since array in java is also an Object, you can use this method to achieve full array copy. This method will not suit you if you want partial copy of the array.

```java
import java.util.Arrays;

public class CopyArray {
    public static void main(String[] args) {
        int[] original = {1,2,3,4,5,6,7,8,9};

        System.out.println("Original array = " + Arrays.toString(original));

        int[] copy = Arrays.copyOf(original, original.length);
        System.out.println("Copy of array = " + Arrays.toString(copy));

        int[] copyRange = Arrays.copyOfRange(original, 3, 6);
        System.out.println("Range copy of array = " + Arrays.toString(copyRange));

        int[] systemCopy = new int[original.length];
        System.arraycopy(original, 0, systemCopy, 0, original.length);
        System.out.println("System copy of array = " + Arrays.toString(systemCopy));

        int[] clone = original.clone();
        System.out.println("Clone of array = " + Arrays.toString(clone));
    }
}
```
Output.
```sh
Original array = [1, 2, 3, 4, 5, 6, 7, 8, 9]
Copy of array = [1, 2, 3, 4, 5, 6, 7, 8, 9]
Range copy of array = [4, 5, 6]
System copy of array = [1, 2, 3, 4, 5, 6, 7, 8, 9]
Clone of array = [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

Note that all the inbuilt methods discussed above for array copy perform `shallow copy`, so they are good for primitive data types and immutable objects such as String. If you want to copy an array of mutable objects, you should do it by writing code for a `deep copy` yourself.

## 6. Source Files
* [Source files for Java Array and List on GitHub](https://github.com/jojozhuang/java-programming/tree/master/java-array-list)

## 7. References
* [Java Array of ArrayList, ArrayList of Array](https://www.journaldev.com/744/java-array-of-arraylist-of-array)
* [Java Array to List](https://www.journaldev.com/756/java-array-to-list-arraylist)
* [Java Copy Array – Array Copy in Java](https://www.journaldev.com/753/java-copy-array-array-copy-java)
