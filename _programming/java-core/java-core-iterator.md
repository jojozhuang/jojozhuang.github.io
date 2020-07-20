---
layout: tutorial
key: programming
title: "Java Core - Iterator"
index: 2305
subcategory: java-core
date: 2017-04-03
tags: [Iterator, Predicate]
---

> Iterator and customize it for different purposes.

## 1. Iterator Interface
The `Iterator` interface is used for iterating (looping) various collection classes such as HashMap, ArrayList, LinkedList etc. It has three methods:
* `hasNext()` - Returns true if the iteration has more elements.
* `next()` - Returns the next element in the iteration.
* `remove()` - Removes from the underlying collection the last element returned by this iterator (optional operation).

### 1.1 Getting and Using Iterator
In general, to use an iterator to cycle through the contents of a collection, follow these steps:
* Obtain an iterator to the start of the collection by calling the collection's `iterator()` method.
* Set up a loop that makes a call to `hasNext()`. Have the loop iterate as long as hasNext() returns true.
* Within the loop, obtain each element by calling `next()`.

Example for how to use iterator.
```java
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class IteratorExample {
    public static void main(String args[]){
        List<String> names = new ArrayList();
        names.add("Peter");
        names.add("Paul");
        names.add("Johnny");

        Iterator<String> it = names.iterator();

        while (it.hasNext()) {
            String str = it.next();
            System.out.println(str);
        }
    }
}
```
Output.
```raw
Peter
Paul
Johnny
```
### 1.2 ConcurrentModificationException while using Iterator
We cannot add or remove elements to the collection while using iterator over it.
```java
import java.util.ArrayList;
import java.util.List;

public class ModificationExceptionExample {
    public static void main(String args[]){
        List<String> books = new ArrayList<>();
        books.add("C");
        books.add("Java");
        books.add("Python");

        for (String book : books) {
            System.out.println(book);
            //We are adding element while iterating list
            books.add("C++");
        }
    }
}
```
ConcurrentModificationException occurs at line of `books.add("C++")`.
```raw
Exception in thread "main" java.util.ConcurrentModificationException
    at java.util.ArrayList$Itr.checkForComodification(ArrayList.java:901)
    at java.util.ArrayList$Itr.next(ArrayList.java:851)
    at johnny.java.core.iterator.ModificationExceptionExample.main(ModificationExceptionExample.java:13)
C
```

## 2. Custom Iterator
### 2.1 Sorted Iterator
Create an iterator which accepts an integer array and returns its elements in increasing order. For example, the given array is [3,6,8,2,4,7,1], this iterator returns [1,2,3,4,6,7,8] if we keep calling the next() method.

Create a class with implementing Iterator interface. Override the `hasNext()` and `next()` method.
```java
import java.util.Arrays;
import java.util.Iterator;

public class SortedIterator implements Iterator<Integer> {

    private Integer[] nums;
    private int index;
    public SortedIterator(int[] arr) {
        if (arr != null && arr.length > 0) {
            this.nums = new Integer[arr.length];
            Arrays.sort(arr);
            for (int i = 0; i < arr.length; i++) {
                nums[i] = arr[i];
            }
            index = 0;
        } else {
            nums = new Integer[]{};
            index = 0;
        }
    }

    @Override
    public boolean hasNext(){
        return index >= 0 && index < nums.length;
    }

    @Override
    public Integer next() {
        if (index < 0 || index >= nums.length) {
            return null;
        }

        return nums[index++];
    }
}
```
Testing.
```java
public class SortedIteratorExample {
    public static void main(String args[]){
        SortedIterator iterator = new SortedIterator(new int[]{3,6,8,2,4,7,1});

        while (iterator.hasNext()) {
            Integer num = iterator.next();
            System.out.println(num);
        }
    }
}
```
Output.
```raw
1
2
3
4
6
7
8
```
### 2.2 Common Element Iterator
Give two sorted iterator, implement a common element iterator.  
For example: Suppose we have iterator1, which contains int array [1,3,5,7,9]. And we also have iterator2, which contains int array [2,3,4,8,9]. The common element iterator should return the common elements in the above two iterators, [3,9].

Create a class with implementing Iterator interface. Override the `hasNext()` and `next()` method.
```java
import java.util.Iterator;

public class CommonIterator implements Iterator {

    private SortedIterator itr1;
    private SortedIterator itr2;
    private Integer common;

    public CommonIterator(SortedIterator itr1, SortedIterator itr2) {
        this.itr1 = itr1;
        this.itr2 = itr2;
    }

    @Override
    public boolean hasNext(){
        if (common != null) {
            return true;
        }

        if (!itr1.hasNext() || !itr2.hasNext()) {
            return false;
        }

        Integer num1 = itr1.next();
        Integer num2 = itr2.next();

        if (num1 == num2) {
            common = num1;
            return true;
        }

        while (num1 != num2) {
            if (num1 < num2) {
                if (!itr1.hasNext()) {
                    return false;
                }
                num1 = itr1.next();
            } else {
                if (!itr2.hasNext()) {
                    return false;
                }
                num2 = itr2.next();
            }
        }

        common = num1;
        return true;
    }

    @Override
    public Integer next() {
        if (hasNext()) {
            int temp = common;
            common = null;
            return temp;
        } else {
            return null;
        }
    }
}
```
Testing.
```java
import johnny.java.core.iterator.custom.CommonIterator;
import johnny.java.core.iterator.custom.SortedIterator;

public class CommonIteratorExample {
    public static void main(String args[]){
        SortedIterator itr1 = new SortedIterator(new int[]{1,3,5,7,9});
        SortedIterator itr2 = new SortedIterator(new int[]{2,3,4,8,9});
        CommonIterator iterator = new CommonIterator(itr1, itr2);

        while (iterator.hasNext()) {
            Integer num = iterator.next();
            System.out.println(num);
        }
    }
}
```
Output.
```raw
3
9
```
### 2.3 Removable Iterator
Given a list of integer, use it to implement iterator, override `remove` method. Notice that the remove method only remove the `last visited element`(visited by next() method).
```java
import java.util.Iterator;
import java.util.List;

public class RemovableIterator implements Iterator<Integer> {

    private List<Integer> list;
    private int last = -1;
    private int curr = 0;
    public RemovableIterator(List<Integer> list) {
        this.list = list;
    }

    @Override
    public boolean hasNext(){
        if (curr < list.size()) {
            return true;
        }

        return false;
    }

    @Override
    public Integer next() {
        if (hasNext()) {
            last = curr;
            curr++;
            return list.get(last);
        }

        return null;
    }

    @Override
    public void remove() {
        if (last > 0) {
            //throw exception
        }

        list.remove(last);
        curr = last; // keep the current position
        last = -1;
    }
}
```
Test with with deleting elements 2 and 8.
```java
import johnny.java.core.iterator.custom.RemovableIterator;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class RemovableIteratorExample {
    public static void main(String args[]){
        List<Integer> list = new ArrayList<>(Arrays.asList(new Integer[]{3,5,6,8,2,4,7,1}));
        RemovableIterator iterator = new RemovableIterator(list);
        while (iterator.hasNext()){
            Integer number = iterator.next();
            System.out.println("Processing - " + number);

            if(number == 8 || number == 2) {
                iterator.remove();
            }
        }

        System.out.println("list after iteration = " + list);
    }
}
```
Output.
```raw
Processing - 3
Processing - 5
Processing - 6
Processing - 8
Processing - 2
Processing - 4
Processing - 7
Processing - 1
list after iteration = [3, 5, 6, 4, 7, 1]
```
### 2.4 Predicate Iterator
First, create a custom `predicate`, which returns true only if the given value is larger than 5.
```java
public class BiggerThanFivePredicate implements Predicate<Integer> {
    @Override
    public boolean test(Integer val) {

        Integer five = 5;

        return val > five;
    }
}
```
Then, create the custom iterator with this predicate. Override the `hasNext()` and `next()` method. Use the custom predicate to filter out unmatched data.
```java
public class PredicateIterator implements Iterator<Integer> {
    private Iterator<Integer> itr;
    private BiggerThanFivePredicate btf;
    private Integer next;
    public PredicateIterator(Iterator<Integer> itr, BiggerThanFivePredicate btf) {
        this.itr = itr;
        this.btf = btf;
    }

    @Override
    public boolean hasNext(){
        if (next != null) {
            return true;
        }

        while (itr.hasNext()) {
            Integer num = itr.next();
            if (btf.test(num)) {
                next = num;
                return true;
            }
        }

        return false;
    }

    @Override
    public Integer next() {
        if (hasNext()) {
            int temp = next;
            next = null;
            return temp;
        }

        return null;
    }
}
```
Testing.
```java
import johnny.java.core.iterator.custom.BiggerThanFivePredicate;
import johnny.java.core.iterator.custom.PredicateIterator;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class PredicateIteratorExample {
    public static void main(String args[]){
        List<Integer> list = new ArrayList<>(Arrays.asList(new Integer[]{3,5,6,8,2,4,7,1}));
        BiggerThanFivePredicate btf = new BiggerThanFivePredicate();
        PredicateIterator iterator = new PredicateIterator(list.iterator(), btf);

        while (iterator.hasNext()) {
            Integer num = iterator.next();
            System.out.println(num);
        }
    }
}
```
Output.
```raw
6
8
7
```

## 3. Source Files
* [Source files for Java Iterator on GitHub](https://github.com/jojozhuang/java-programming/tree/master/java-core-iterator)

## 4. References
* [Java Doc - Interface Iterator](https://docs.oracle.com/javase/8/docs/api/java/util/Iterator.html)
* [Java Predicate](http://zetcode.com/java/predicate/)
* [Java Iterator with examples](https://beginnersbook.com/2014/06/java-iterator-with-examples/)
