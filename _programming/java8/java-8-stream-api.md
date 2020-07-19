---
layout: tutorial
key: programming
title: "Java 8 - Stream API"
index: 2357
subcategory: java-java8
date: 2017-05-06
tags: [Stream API]
---

> Stream in Java 8.

## 1. Stream API
The Java Stream API provides a functional approach to processing collections of objects. The Java Stream API was added in Java 8 along with several other functional programming features.

The Java Stream API is not related to the Java InputStream and Java OutputStream of Java IO. The InputStream and OutputStream are related to streams of bytes. The Java Stream API is for processing streams of objects - not bytes.

A Java Stream is a component that is capable of internal iteration of its elements, meaning it can iterate its elements itself. In contrast, when you are using the Java Collections iteration features (e.g a Java Iterator or the Java for-each loop used with a Java Iterable) you have to implement the iteration of the elements yourself.

## 2. Stream Processing
You can attach listeners to a Stream. These listeners are called when the Stream iterates the elements internally. The listeners are called once for each element in the stream. That way each listener gets to process each element in the stream. This is referred to as stream processing.

The listeners of a stream form a chain. The first listener in the chain can process the element in the stream, and then return a new element for the next listener in the chain to process. A listener can either return the same element or a new, depending on what the purpose of that listener (processor) is.

## 3. Obtain a Stream
There are many ways to obtain a Java Stream. One of the most common ways to obtain a Stream is from a Java Collection. Here is an example of obtaining a Stream from a Java List:
```java
List<String> items = new ArrayList<String>();

items.add("one");
items.add("two");
items.add("three");

Stream<String> stream = items.stream();    
```
This example first creates a Java List, then adds three Java Strings to it. Finally, the example calls the stream() method to obtain a Stream instance.

## 4. Terminal and Non-Terminal Operations
The Stream interface has a selection of `terminal` and `non-terminal` operations. A non-terminal stream operation is an operation that adds a listener to the stream without doing anything else. A terminal stream operation is an operation that starts the internal iteration of the elements, calls all the listeners, and returns a result.

Here is a Java Stream example which contains both a non-terminal and a terminal operation:
```java
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

public class StreamExamples {

    public static void main(String[] args) {
        List<String> stringList = new ArrayList<String>();

        stringList.add("ONE");
        stringList.add("TWO");
        stringList.add("THREE");

        Stream<String> stream = stringList.stream();

        long count = stream
            .map((value) -> { return value.toLowerCase(); })
            .count();

        System.out.println("count = " + count);

    }
}
```
The call to the `map()` method of the Stream interface is a non-terminal operation. It merely sets a lambda expression on the stream which converts each element to lowercase. The map() method will be covered in more detail later on.

The call to the `count()` method is a terminal operation. This call starts the iteration internally, which will result in each element being converted to lowercase and then counted.

The conversion of the elements to lowercase does not actually affect the count of elements. The conversion part is just there as an example of a non-terminal operation.

## 5. Non-Terminal Operations
The non-terminal stream operations of the Java Stream API are operations that transform or filter the elements in the stream. When you add a non-terminal operation to a stream, you get a new stream back as result. The new stream represents the stream of elements resulting from the original stream with the non-terminal operation applied. Here is an example of a non-terminal operation added to a stream - which results in a new stream:
```java
List<String> stringList = new ArrayList<String>();

stringList.add("ONE");
stringList.add("TWO");
stringList.add("THREE");

Stream<String> stream = stringList.stream();

Stream<String> stringStream =
    stream.map((value) -> { return value.toLowerCase(); });
```
Notice the call to stream.map(). This call actually returns a new Stream instance representing the original stream of strings with the map operation applied.

You can only add a single operation to a given Stream instance. If you need to chain multiple operations after each other, you will need to apply the second operation to the Stream operation resulting from the first operation. Here is how that looks:
```java
Stream<String> stringStream1 =
        stream.map((value) -> { return value.toLowerCase(); });

Stream<½String> stringStream2 =
        stringStream1.map((value) -> { return value.toUpperCase(); });
```
Notice how the second call to Stream map() is called on the Stream returned by the first map() call.

It is quite common to chain the calls to non-terminal operations on a Java Stream. Here is an example of chaining the non-terminal operation calls on Java streams:
```java
Stream<String> stream1 = stream
  .map((value) -> { return value.toLowerCase(); })
  .map((value) -> { return value.toUpperCase(); })
  .map((value) -> { return value.substring(0,3); });
```
Many non-terminal Stream operations can take a Java Lambda Expression as parameter. This lambda expression implements a Java functional interface that fits the given non-terminal operation. For instance, the Function or Predicate interface. The parameter of the non-terminal operation method parameter is typically a functional interface - which is why it can also be implemented by a Java lambda expression.

### 5.1 filter()
The Java Stream `filter()` can be used to filter out elements from a Java Stream. The filter method takes a `Predicate` which is called for each element in the stream. If the element is to be included in the resulting Stream, the Predicate should return true. If the element should not be included, the Predicate should return false.

Here is an example of calling the Java Stream filter() method:
```java
Stream<String> longStringsStream = stream.filter((value) -> {
    return value.length() >= 3;
});
```
### 5.2 map()
The Java Stream `map()` method converts (maps) an element to another object. For instance, if you had a list of strings it could convert each string to lowercase, uppercase, or to a substring of the original string, or something completely else. Here is a Java Stream map() example:
```java
List<String> list = new ArrayList<String>();
Stream<String> stream = list.stream();

Stream<String> streamMapped = stream.map((value) -> value.toUpperCase());
```
### 5.3 flatMap()
The Java Stream `flatMap()` methods maps a single element into multiple elements. The idea is that you "flatten" each element from a complex structure consisting of multiple internal elements, to a "flat" stream consisting only of these internal elements.

For instance, imagine you have an object with nested objects (child objects). Then you can map that object into a "flat" stream consisting of itself plus its nested objects - or only the nested objects. You could also map a stream of Lists of elements to the elements themselves. Or map a stream of strings to a stream of words in these strings - or to the individual Character instances in these strings.

Here is an example that flatmaps a List of strings to the words in each string. This example should give you an idea about how flatMap() can be used to map a single element into multiple elements.
```java
List<String> stringList = new ArrayList<String>();

stringList.add("One flew over the cuckoo's nest");
stringList.add("To kill a muckingbird");
stringList.add("Gone with the wind");

Stream<String> stream = stringList.stream();

stream.flatMap((value) -> {
    String[] split = value.split(" ");
    return (Stream<String>) Arrays.asList(split).stream();
})
.forEach((value) -> System.out.println(value));
```
This Java Stream flatMap() example first creates a List with 3 strings containing book titles. Then a Stream for the List is obtained, and flatMap() called.

The flatMap() operation called on the Stream has to return another Stream representing the flat mapped elements. In the example above, each original string is split into words, turned into a List, and the stream obtained and returned from that List.

Note that this example finishes with a call to forEach() which is a terminal operation. This call is only there to trigger the internal iteration, and thus flat map operation. If no terminal operation was called on the Stream chain, nothing would have happened. No flat mapping would actually have taken place.

### 5.4 distinct()
The Java Stream `distinct()` method is a non-terminal operation that returns a new Stream which will only contain the distinct elements from the original stream. Any duplicates will be eliminated. Here is an example of the Java Stream distinct() method:
```java
List<String> stringList = new ArrayList<String>();

stringList.add("one");
stringList.add("two");
stringList.add("three");
stringList.add("one");

Stream<String> stream = stringList.stream();

List<String> distinctStrings = stream
        .distinct()
        .collect(Collectors.toList());

System.out.println(distinctStrings);
```
In this example the element one appears 2 times in the original stream. Only the first occurrence of this element will be included in the Stream returned by distinct(). Thus, the resulting List (from calling collect()) will only contain one, two and three. The output printed from this example will be:
```raw
[one, two, three]
```
### 5.5 limit()
The Java Stream `limit()` method can limit the number of elements in a stream to a number given to the limit() method as parameter. The limit() method returns a new Stream which will at most contain the given number of elements. Here is a Java Stream limit() example:
```java
List<String> stringList = new ArrayList<String>();

stringList.add("one");
stringList.add("two");
stringList.add("three");
stringList.add("one");

Stream<String> stream = stringList.stream();
stream
    .limit(2)
    .forEach( element -> { System.out.println(element); });
```
This example first creates a Stream, then calls limit() on it, and then calls forEach() with a lambda that prints out the elements in the stream. Only the two first elements will be printed because of the limit(2) call.

### 5.6 peek()
The Java Stream `peek()` method is a non-terminal operation that takes a `Consumer` (java.util.function.Consumer) as parameter. The Consumer will get called for each element in the stream. The peek() method returns a new Stream which contains all the elements in the original stream.

The purpose of the peek() method is, as the method says, to peek at the elements in the stream, not to transform them. Keep in mind that the peek method does not start the internal iteration of the elements in the stream. You need to call a terminal operation for that. Here is a Java Stream peek() example:
```java
List<String> stringList = new ArrayList<String>();

stringList.add("abc");
stringList.add("def");

Stream<String> stream = stringList.stream();

Stream<String> streamPeeked = stream.peek((value) -> {
    System.out.println("value");
});
```

## 6. Terminal Operations
The terminal operations of the Java Stream interface typically return a `single value`. Once the terminal operation is invoked on a Stream, the iteration of the Stream and any of the chained streams will get started. Once the iteration is done, the result of the terminal operation is returned.

A terminal operation typically does not return a new Stream instance. Thus, once you call a terminal operation on a stream, the chaining of Stream instances from non-terminal operation ends. Here is an example of calling a terminal operation on a Java Stream:
```java
long count = stream
  .map((value) -> { return value.toLowerCase(); })
  .map((value) -> { return value.toUpperCase(); })
  .map((value) -> { return value.substring(0,3); })
  .count();
```
It is the call to count() at the end of the example that is the terminal operation. Since count() returns a long, the Stream chain of non-terminal operations (the map() calls) is ended.
### 6.1 anyMatch()
The Java Stream `anyMatch()` method is a terminal operation that takes a single `Predicate` as parameter, starts the internal iteration of the Stream, and applies the Predicate parameter to each element. If the Predicate returns true for any of the elements, the anyMatch() method returns true. If no elements match the Predicate, anyMatch() will return false. Here is a Java Stream anyMatch() example:
```java
List<String> stringList = new ArrayList<String>();

stringList.add("One flew over the cuckoo's nest");
stringList.add("To kill a muckingbird");
stringList.add("Gone with the wind");

Stream<String> stream = stringList.stream();

boolean anyMatch = stream.anyMatch((value) -> { return value.startsWith("One"); });
System.out.println(anyMatch);
```
In the example above, the anyMatch() method call will return true, because the first string element in the stream starts with "One".
### 6.2 allMatch()
The Java Stream `allMatch()` method is a terminal operation that takes a single `Predicate` as parameter, starts the internal iteration of elements in the Stream, and applies the Predicate parameter to each element. If the Predicate returns true for all elements in the Stream, the allMatch() will return true. If not all elements match the Predicate, the allMatch() method returns false. Here is a Java Stream allMatch() example:
```java
List<String> stringList = new ArrayList<String>();

stringList.add("One flew over the cuckoo's nest");
stringList.add("To kill a muckingbird");
stringList.add("Gone with the wind");

Stream<String> stream = stringList.stream();

boolean allMatch = stream.allMatch((value) -> { return value.startsWith("One"); });
System.out.println(allMatch);
```
In the example above, the allMatch() method will return false, because only one of the strings in the Stream starts with "One".
### 6.3 noneMatch()
The Java Stream `noneMatch()` method is a terminal operation that will iterate the elements in the stream and return true or false, depending on whether no elements in the stream matches the `Predicate` passed to noneMatch() as parameter. The noneMatch() method will return true if no elements are matched by the Predicate, and false if one or more elements are matched. Here is a Java Stream noneMatch() example:
```java
List<String> stringList = new ArrayList<String>();

stringList.add("abc");
stringList.add("def");

Stream<String> stream = stringList.stream();

boolean noneMatch = stream.noneMatch((element) -> {
    return "xyz".equals(element);
});

System.out.println("noneMatch = " + noneMatch);
```
### 6.4 collect()
The Java Stream `collect()` method is a terminal operation that starts the internal iteration of elements, and collects the elements in the stream in a collection or object of some kind. Here is a simple Java Stream collect() method example:
```java
List<String> stringList = new ArrayList<String>();

stringList.add("One flew over the cuckoo's nest");
stringList.add("To kill a muckingbird");
stringList.add("Gone with the wind");

Stream<String> stream = stringList.stream();

List<String> stringsAsUppercaseList = stream
.map(value -> value.toUpperCase())
.collect(Collectors.toList());

System.out.println(stringsAsUppercaseList);
```
The collect() method takes a `Collector` (java.util.stream.Collector) as parameter. Implementing a Collector requires some study of the Collector interface. Luckily, the Java class java.util.stream.Collectors contains a set of pre-implemented Collector implementations you can use, for the most common operations. In the example above, it was the Collector implementation returned by Collectors.toList() that was used. This Collector simply collects all elements in the stream in a standard Java List
### 6.5 count()
The Java Stream `count()` method is a terminal operation which starts the internal iteration of the elements in the Stream, and counts the elements. Here is a Java Stream count() example:
```java
List<String> stringList = new ArrayList<String>();

stringList.add("One flew over the cuckoo's nest");
stringList.add("To kill a muckingbird");
stringList.add("Gone with the wind");

Stream<String> stream = stringList.stream();

long count = stream.flatMap((value) -> {
    String[] split = value.split(" ");
    return (Stream<String>) Arrays.asList(split).stream();
}).count();
System.out.println("count = " + count);
```
This example first creates a List of strings, then obtain the Stream for that List, adds a flatMap() operation for it, and then finishes with a call to count(). The count() method will start the iteration of the elements in the Stream which will result in the string elements being split up into words in the flatMap() operation, and then counted. The final result that will be printed out is 14.
### 6.6 findAny()
The Java Stream `findAny()` method can find a single element from the Stream. The element found can be from anywhere in the Stream. There is no guarantee about from where in the stream the element is taken. Here is a Java Stream findAny() example:
```java
List<String> stringList = new ArrayList<String>();

stringList.add("one");
stringList.add("two");
stringList.add("three");
stringList.add("one");

Stream<String> stream = stringList.stream();

Optional<String> anyElement = stream.findAny();

System.out.println(anyElement.get());
```
Notice how the findAny() method returns an `Optional`. The Stream could be empty - so no element could be returned. You can check if an element was found via the Optional isPresent() method.
### 6.7 findFirst()
The Java Stream `findFirst()` method finds the first element in the Stream, if any elements are present in the Stream. The findFirst() method returns an `Optional` from which you can obtain the element, if present. Here is a Java Stream findFirst() example:
```java
List<String> stringList = new ArrayList<String>();

stringList.add("one");
stringList.add("two");
stringList.add("three");
stringList.add("one");

Stream<String> stream = stringList.stream();

Optional<String> result = stream.findFirst();

System.out.println(result.get());
```
You can check if the Optional returned contains an element via its isPresent() method.
### 6.8 forEach()
The Java Stream `forEach()` method is a terminal operation which starts the internal iteration of the elements in the Stream, and applies a `Consumer` (java.util.function.Consumer) to each element in the Stream. The forEach() method returns void. Here is a Java Stream forEach() example:
```java
List<String> stringList = new ArrayList<String>();

stringList.add("one");
stringList.add("two");
stringList.add("three");
stringList.add("one");

Stream<String> stream = stringList.stream();

stream.forEach( element -> { System.out.println(element); });
```
### 6.9 min()
The Java Stream `min()` method is a terminal operation that returns the smallest element in the Stream. Which element is the smallest is determined by the `Comparator` implementation you pass to the min() method. Here is a Java Stream min() example:
```java
List<String> stringList = new ArrayList<String>();

stringList.add("abc");
stringList.add("def");

Stream<String> stream = stringList.stream();

Optional<String> min = stream.min((val1, val2) -> {
    return val1.compareTo(val2);
});

String minString = min.get();

System.out.println(minString);
```
Notice how the min() method returns an `Optional` which may or may not contain a result. If the Stream is empty, the Optional get() method will throw a NoSuchElementException.
### 6.10 max()
The Java Stream `max()` method is a terminal operation that returns the largest element in the Stream. Which element is the largest is determined by the `Comparator` implementation you pass to the max() method. Here is a Java Stream max() example:
```java
List<String> stringList = new ArrayList<String>();

stringList.add("abc");
stringList.add("def");

Stream<String> stream = stringList.stream();

Optional<String> max = stream.max((val1, val2) -> {
    return val1.compareTo(val2);
});

String maxString = max.get();

System.out.println(maxString);
```
Notice how the max() method returns an `Optional` which may or may not contain a result. If the Stream is empty, the Optional get() method will throw a NoSuchElementException.
### 6.11 reduce()
The Java Stream reduce() method is a terminal operation that can reduce all elements in the stream to a single element. Here is a Java Stream reduce() example:
```java
List<String> stringList = new ArrayList<String>();

stringList.add("One flew over the cuckoo's nest");
stringList.add("To kill a muckingbird");
stringList.add("Gone with the wind");

Stream<String> stream = stringList.stream();

Optional<String> reduced = stream.reduce((value, combinedValue) -> {
    return combinedValue + " + " + value;
});

System.out.println(reduced.get());
```
Notice the `Optional` returned by the reduce() method. This Optional contains the value (if any) returned by the lambda expression passed to the reduce() method. You obtain the value by calling the Optional get() method.
### 6.12 toArray()
The Java Stream `toArray()` method is a terminal operation that starts the internal iteration of the elements in the stream, and returns an array of Object containing all the elements. Here is a Java Stream toArray() example:
```java
List<String> stringList = new ArrayList<String>();

stringList.add("One flew over the cuckoo's nest");
stringList.add("To kill a muckingbird");
stringList.add("Gone with the wind");

Stream<String> stream = stringList.stream();

Object[] objects = stream.toArray();
```

## 7. Concatenate Streams
The Java Stream interface contains a static method called `concat()` which can concatenate two streams into one. The result is a new Stream which contains all of the elements from the first stream, followed by all of the elements from the second stream. Here is an example of using the Java Stream concat() method:
```java
List<String> stringList = new ArrayList<String>();

stringList.add("One flew over the cuckoo's nest");
stringList.add("To kill a muckingbird");
stringList.add("Gone with the wind");

Stream<String> stream1 = stringList.stream();

List<String> stringList2 = new ArrayList<>();
stringList2.add("Lord of the Rings");
stringList2.add("Planet of the Rats");
stringList2.add("Phantom Menace");

Stream<String> stream2 = stringList2.stream();

Stream<String> concatStream = Stream.concat(stream1, stream2);

List<String> stringsAsUppercaseList = concatStream
        .collect(Collectors.toList());

System.out.println(stringsAsUppercaseList);
```

## 8. Create Stream From Array
The Java Stream interface contains a static method called `of()` which can be used to create a Stream from one or more objects. Here is an example of using the Java Stream of() method:
```java
Stream<String> streamOf = Stream.of("one", "two", "three");
```

## 9. References
* [Java Stream API](http://tutorials.jenkov.com/java-functional-programming/streams.html)
