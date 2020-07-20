---
layout: tutorial
key: programming
title: "Java Core - Comparable vs Comparator"
index: 2316
subcategory: java-core
date: 2019-08-02
tags: [Comparable, Comparator]
---

> Comparable, Comparator and their difference.

## 1. Comparable vs Comparator
A comparable object is capable of comparing itself with another object. The class itself must implements the `java.lang.Comparable` interface to compare its instances.

Below is the definition of `Comparable` Interface.
```java
public interface Comparable<T> {
    public int compareTo(T o); // the only method
}
```
Below is the definition of `Comparator` Interface.
```java
public interface Comparator<T> {
    int compare(T o1, T o2);
    // other methods
}
```
## 2. Example
### 2.1 Comparable
We define a class named Employee.
```java
public class Employee {
    private int id;
    private String name;
    private int age;
    private int salary;

    public Employee(int id, String name, int age, int salary) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.salary = salary;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public int getAge() {
        return age;
    }

    public int getSalary() {
        return salary;
    }

    @Override
    //this is overridden to print the user-friendly information about the Employee
    public String toString() {
        return "[id=" + this.id + ", name=" + this.name + ", age=" + this.age + ", salary=" +
                this.salary + "]";
    }
}
```
Then we use this class to create an employee array and use `Arrays.sort()` to sort this array.
```java
public static void main(String[] args) {
    // Create object array
    Employee[] empArr = new Employee[3];
    empArr[0] = new Employee(10, "Johnny", 21, 5000);
    empArr[1] = new Employee(5, "George", 40, 4000);
    empArr[2] = new Employee(1, "Terry", 33, 7000);

    // Sort employee array using Comparable interface implementation
    Arrays.sort(empArr);
    System.out.println("Sort Employee list with default Comparable interface:\n" + Arrays.toString(empArr));
}
```
We will get following error. This is because the `Arrays.sort()` or `Collections.sort()` method rely on Comparable interface.
```raw
Exception in thread "main" java.lang.ClassCastException: johnny.java.core.comparator.Employee cannot be cast to java.lang.Comparable
    at java.util.ComparableTimSort.countRunAndMakeAscending(ComparableTimSort.java:320)
    at java.util.ComparableTimSort.sort(ComparableTimSort.java:188)
    at java.util.Arrays.sort(Arrays.java:1246)
    at johnny.java.compare.CompareTest.main(CompareTest.java:17)
```
We need to implement `Comparable` interface in Employee class by overriding the `compareTo` method.
```java
public class Employee implements Comparable<Employee> {
    ...

    public Employee(int id, String name, int age, int salary) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.salary = salary;
    }

    ...

    @Override
    public int compareTo(Employee emp) {
        // sort the employee based on id, in ascending order
        // return negative(less than), zero(equal to), positive(greater than)
        return (this.id - emp.id);
    }
    ...
}
```
Run the test again and we get the following output. Now, we see the employee array is sorted by id in ascending order.
```raw
Sort employee list with default Comparable interface:
[[id=1, name=Terry, age=33, salary=7000], [id=5, name=George, age=40, salary=4000], [id=10, name=Johnny, age=21, salary=5000]]
```
### 2.2 Comparator
If we need to sort this array based on different fields, we can use the `Comparator` interface. We can either create a custom comparator in Employee class, like the following example. AgeComparator is a custom comparator base on age.
```java
public class Employee implements Comparable<Employee> {
    ...

    @Override
    public int compareTo(Employee emp) {
        // sort the employee based on id, in ascending order
        // return negative(less than), zero(equal to), positive(greater than)
        return (this.id - emp.id);
    }

    // Compare employee based on age.
    public static Comparator<Employee> AgeComparator = new Comparator<Employee>() {
        @Override
        public int compare(Employee e1, Employee e2) {
            return e1.getAge() - e2.getAge();
        }
    };

    ...
}
```
Or we can create the custom comparator in anywhere. SalaryComparator is a separate class. It compares employee based on salary.
```java
import java.util.Comparator;

public class SalaryComparator implements Comparator<Employee> {
    @Override
    public int compare(Employee e1, Employee e2) {
        return e1.getSalary() - e2.getSalary();
    }
}
```
When calling the Arrays.sort method, we can provide a custom comparator as second parameter.
```java
public static void main(String[] args) {
    // Create object array
    Employee[] empArr = new Employee[3];
    empArr[0] = new Employee(10, "Johnny", 21, 5000);
    empArr[1] = new Employee(5, "George", 40, 4000);
    empArr[2] = new Employee(1, "Terry", 33, 7000);

    // Sort employee array using Comparable interface implementation
    Arrays.sort(empArr);
    System.out.println("Sort employee list with default Comparable interface:\n" + Arrays.toString(empArr));

    // Sort employee with custom comparator based on age
    Arrays.sort(empArr, Employee.AgeComparator);
    System.out.println("Sort employee list with custom Comparator interface(on Age):\n" + Arrays.toString(empArr));

    // Sort employee with custom comparator based on salary
    Arrays.sort(empArr, new SalaryComparator());
    System.out.println("Sort employee list with custom Comparator interface(on Salary):\n" + Arrays.toString(empArr));
}
```
See the result. The second array is sorted by age and the third array is sorted by salary.
```raw
Sort employee list with default Comparable interface:
[[id=1, name=Terry, age=33, salary=7000], [id=5, name=George, age=40, salary=4000], [id=10, name=Johnny, age=21, salary=5000]]
Sort employee list with custom Comparator interface(on Age):
[[id=10, name=Johnny, age=21, salary=5000], [id=1, name=Terry, age=33, salary=7000], [id=5, name=George, age=40, salary=4000]]
Sort employee list with custom Comparator interface(on Salary):
[[id=5, name=George, age=40, salary=4000], [id=10, name=Johnny, age=21, salary=5000], [id=1, name=Terry, age=33, salary=7000]]
```

## 3. Conclusion
Comparable vs Comparator:
* Comparable interface can be used to provide `single` way of sorting whereas Comparator interface is used to provide `different` ways of sorting.
* For using Comparable, Class needs to implement it whereas for using Comparator we don’t need to make any change in the class.
* Comparable interface is in `java.lang` package whereas Comparator interface is present in `java.util` package.
* We don’t need to make any code changes at client side for using Comparable, `Arrays.sort()` or `Collection.sort()` methods automatically uses the `compareTo()` method of the class. For Comparator, client needs to provide the Comparator class to use in compare() method.

## 4. Source Files
* [Source files for Java Comparable and Comparator on GitHub](https://github.com/jojozhuang/java-programming/tree/master/java-core-comparator)

## 5. References
* [Comparable and Comparator in Java Example](https://www.journaldev.com/780/comparable-and-comparator-in-java-example)
