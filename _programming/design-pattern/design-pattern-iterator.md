---
layout: tutorial
key: programming
title: "Design Pattern - Iterator"
index: 2923
subcategory: design-pattern
date: 2016-05-23
tags: [Iterator Pattern]
---

> Behavioral Pattern: Iterator Pattern.

## 1. Iterator Pattern
The Iterator pattern is used to get a way to access the elements of a collection object in sequential manner without any need to know its underlying representation. This pattern is widely used in Java Collection Framework. `Iterator` interface provides methods for traversing through a collection.

## 2. Example
### 2.1 Course
```java
public class Course {
    private String title;
    private int credit;

    public Course(String title, int credit) {
        this.title = title;
        this.credit = credit;
    }

    public String getTitle() {
        return this.title;
    }

    public int getCredit() {
        return this.credit;
    }

    @Override
    public String toString() {
        return "Course {" +
                "title='" + title + '\'' +
                ", credit=" + credit +
                '}';
    }
}
```
### 2.2 Iterator
```java
public interface CourseIterator {
    public boolean hasNext();
    public Course next();
}

public class CourseIteratorImpl implements CourseIterator {

    private List<Course> courses;
    private int index;

    public CourseIteratorImpl(List<Course> courseList) {
        this.courses = courseList;
    }

    @Override
    public boolean hasNext() {
        return index < courses.size();
    }

    @Override
    public Course next() {
        if (index < 0 || index >= courses.size()) {
            return null;
        } else {
            Course c = courses.get(index);
            index++;
            return c;
        }
    }
}
```
### 2.3 Collection
```java
public interface CourseCollection {
    public void add(Course c);

    public void remove(Course c);

    public CourseIterator iterator();
}

public class CourseCollectionImpl implements CourseCollection {

    private List<Course> courses;

    public CourseCollectionImpl() {
        courses = new ArrayList<>();
    }

    public void add(Course c) {
        this.courses.add(c);
    }

    public void remove(Course c) {
        this.courses.remove(c);
    }

    @Override
    public CourseIterator iterator() {
        return new CourseIteratorImpl(this.courses);
    }
}
```
### 2.4 Client
```java
public class Client {
    public void run() {
        CourseCollection courses = new CourseCollectionImpl();
        courses.add(new Course("Algorithms and Structures", 5));
        courses.add(new Course("Database Technologies", 4));
        courses.add(new Course("Mobile App Development", 3));
        courses.add(new Course("Mining Big Data", 5));
        CourseIterator iterator = courses.iterator();
        while (iterator.hasNext()) {
            Course c = iterator.next();
            System.out.println(c.toString());
        }
    }
}
```
Output
```raw
Course {title='Algorithms and Structures', credit=5}
Course {title='Database Technologies', credit=4}
Course {title='Mobile App Development', credit=3}
Course {title='Mining Big Data', credit=5}
```

## 3. Source Files
* [Source files for Iterator Pattern on GitHub](https://github.com/jojozhuang/design-patterns-java/tree/master/design-pattern-iterator)

## 4. References
* [Iterator Design Pattern in Java](https://www.journaldev.com/1716/iterator-design-pattern-java)
