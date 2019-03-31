---
layout: note
key: note
title: "Java - Shallow Copy and Deep Copy"
index: 204
category: java
image: /note/programming.png
date: 2016-02-04
postdate: 2016-02-04
tags: [Shallow Copy, Deep Copy]
---

> Compare the difference between shallow copy and deep copy.

## 1. Model Class
```java
class Person {
    private String name;

    public Person(String n) {
        this.name = n;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return this.name;
    }
}
```
## 2. Shallow Copy
```java
private static void shallowCopy() {
    Person p1 = new Person("Johnny");
    Person p2 = new Person("Sean");

    List<Person> pList = new ArrayList<>();
    pList.add(p1);
    pList.add(p2);

    //convert ArrayList to Array using shallow copy
    Person[] pArray = pList.toArray(new Person[0]);

    System.out.println("Original List = " + pList);
    System.out.println("Array from ArrayList = " + Arrays.toString(pArray));

    //let's change the list and array
    pList.get(0).setName("David");
    pArray[1].setName("Peter");

    System.out.println("Modified List = " + pList);
    System.out.println("Modified Array = " + Arrays.toString(pArray));
}
```
## 3. Deep Copy
```java
private static void deepCopy() {
    Person p1 = new Person("Johnny");
    Person p2 = new Person("Sean");

    List<Person> pList = new ArrayList<>();
    pList.add(p1);
    pList.add(p2);

    //convert ArrayList to Array using deep copy
    Person[] pArray = new Person[pList.size()];

    for (int i = 0; i < pList.size(); i++) {
        Person p = pList.get(i);
        Person temp = new Person(p.getName());
        pArray[i] = temp;
    }

    System.out.println("Original List = " + pList);
    System.out.println("Array from ArrayList = " + Arrays.toString(pArray));

    //let's change the list and array
    pList.get(0).setName("David");
    pArray[1].setName("Peter");

    System.out.println("Modified List = " + pList);
    System.out.println("Modified Array = " + Arrays.toString(pArray));
}
```

## 4. Test
```java
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class ShallowCopy {
    public static void main(String[] args) {
        System.out.println("Shallow copy example:");
        shallowCopy();
        System.out.println("---------------------------------------------");
        System.out.println("Deep copy example:");
        deepCopy();
    }
}
```
Output
```sh
Shallow copy example:
Original List = [Johnny, Sean]
Array from ArrayList = [Johnny, Sean]
Modified List = [David, Peter]
Modified Array = [David, Peter]
---------------------------------------------
Deep copy example:
Original List = [Johnny, Sean]
Array from ArrayList = [Johnny, Sean]
Modified List = [David, Sean]
Modified Array = [Johnny, Peter]
```

## 5. Source Files
* [Source files for Java Array and List on GitHub](https://github.com/jojozhuang/java-programming/tree/master/java-array-list)

## 6. References
* [Java ArrayList to Array](https://www.journaldev.com/760/java-arraylist-to-array)
