---
layout: tutorial
key: programming
title: "Java 8 - New Features"
index: 2352
subcategory: java-java8
date: 2017-05-01
tags: [Lambda, Stream, Optional]
---

> New features in java 8.

## 1. Overview
JAVA 8 is a major feature release of JAVA programming language development. Its initial version was released on 18 March 2014. With the Java 8 release, Java provided supports for functional programming, new JavaScript engine, new APIs for date time manipulation, new streaming API, etc.

New Features:
* `Lambda expression` − Adds functional processing capability to Java.
* `Method references` − Referencing functions by their names instead of invoking them directly. Using functions as parameter.
* `Default method` − Interface to have default method implementation.
* `New tools` − New compiler tools and utilities are added like ‘jdeps’ to figure out dependencies.
* `Stream API` − New stream API to facilitate pipeline processing.
* `Date Time API` − Improved date time API.
* `Optional` − Emphasis on best practices to handle null values properly.
* `Nashorn JavaScript Engine` − A Java-based engine to execute JavaScript code.

## 2. Lambda Expressions
Lambda expressions are introduced in Java 8 and are touted to be the biggest feature of Java 8. Lambda expression facilitates functional programming, and simplifies the development a lot.
### 2.1 Syntax
A lambda expression is characterized by the following syntax.
```raw
parameter -> expression body
```
* `Optional type declaration` − No need to declare the type of a parameter. The compiler can inference the same from the value of the parameter.
* `Optional parenthesis around parameter` − No need to declare a single parameter in parenthesis. For multiple parameters, parentheses are required.
* `Optional curly braces` − No need to use curly braces in expression body if the body contains a single statement.
* `Optional return keyword` − The compiler automatically returns the value if the body has a single expression to return the value. Curly braces are required to indicate that expression returns a value.

### 2.2 Example
```java
// interface with a single method only
public interface MathOperation {
    int operate(int a, int b);
}

// interface with a single method only
public interface GreetingService {
    void sayMessage(String message);
}

public class Calculator {
    public int operate(int a, int b, MathOperation mathOperation) {
        return mathOperation.operate(a, b);
    }
}

public static void main(String args[]) {
    // with type declaration
    MathOperation addition = (int a, int b) -> a + b;

    // with out type declaration
    MathOperation subtraction = (a, b) -> a - b;

    // with return statement along with curly braces
    MathOperation multiplication = (int a, int b) -> { return a * b; };

    // without return statement and without curly braces
    MathOperation division = (int a, int b) -> a / b;

    Calculator calculator = new Calculator();
    System.out.println("10 + 5 = " + calculator.operate(10, 5, addition));
    System.out.println("10 - 5 = " + calculator.operate(10, 5, subtraction));
    System.out.println("10 x 5 = " + calculator.operate(10, 5, multiplication));
    System.out.println("10 / 5 = " + calculator.operate(10, 5, division));

    // without parenthesis
    GreetingService greetService1 = message ->
            System.out.println("Hello " + message);

    // with parenthesis
    GreetingService greetService2 = (message) ->
            System.out.println("Hello " + message);

    greetService1.sayMessage("Java8");
    greetService2.sayMessage("Lambda");
}
```
Output.
```raw
10 + 5 = 15
10 - 5 = 5
10 x 5 = 50
10 / 5 = 2
Hello Java8
Hello Lambda
```

## 3. Method References
Method references help to point to methods by their names. A method reference is described using `::` symbol. A method reference can be used to point the following types of methods:
* Static methods
* Instance methods
* Constructors using new operator (TreeSet::new)

Example
```java
public class MethodReferencesExample {
    public static void main(String args[]) {

        List<Integer> nums = Arrays.asList(1,2,3,4,5,6);
        nums.forEach(System.out::println);
    }
}

```
Output.
```raw
1
2
3
4
5
6
```

## 4. Functional Interfaces
Functional interfaces have a `single` functionality to exhibit. For example, a Comparable interface with a single method ‘compareTo’ is used for comparison purpose. Java 8 has defined a lot of functional interfaces to be used extensively in lambda expressions. Following is the list of functional interfaces defined in `java.util.Function` package.

`Predicate` <T> interface is a functional interface with a method test(Object) to return a Boolean value. This interface signifies that an object is tested to be true or false.

Example
```java
public class FunctionalInterfaceExample {
    public static void main(String args[]) {
        List<Integer> list = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9);

        // Predicate<Integer> predicate = n -> true
        // n is passed as parameter to test method of Predicate interface
        // test method will always return true no matter what value n has.

        System.out.print("Print all numbers: ");

        //pass n as parameter
        evaluate(list, n->true);

        // Predicate<Integer> predicate1 = n -> n%2 == 0
        // n is passed as parameter to test method of Predicate interface
        // test method will return true if n%2 comes to be zero

        System.out.print("Print even numbers: ");
        //evaluate(list, n-> n%2 == 0 );
        evaluate(list, new evenPredicate());

        // Predicate<Integer> predicate2 = n -> n > 3
        // n is passed as parameter to test method of Predicate interface
        // test method will return true if n is greater than 3.

        System.out.print("Print numbers greater than 3: ");
        evaluate(list, n-> n > 3 );
    }

    public static void evaluate(List<Integer> list, Predicate<Integer> predicate) {
        for(Integer num: list) {
            if (predicate.test(num)) {
                System.out.print(num + ",");
            }
        }
        System.out.println();
    }

    private static class evenPredicate implements Predicate<Integer> {
        @Override
        public boolean test(Integer num) {
            return num % 2 == 0;
        }
    }
}
```
Output.
```raw
Print all numbers: 1,2,3,4,5,6,7,8,9,
Print even numbers: 2,4,6,8,
Print numbers greater than 3: 4,5,6,7,8,9,
```

## 5. Default Methods
Java provides a facility to create default methods inside the interface. Methods which are defined inside the interface and tagged with default are known as default methods. These methods are non-abstract methods.

```java
public class DefaultMethodExample {
    public static void main(String args[]) {
        Vehicle vehicle = new Car();
        vehicle.print();
    }
}

interface Vehicle {
    // default method
    default void print() {
        System.out.println("I am a vehicle!");
    }

    // static method
    static void blowHorn() {
        System.out.println("Blowing horn!!!");
    }
}

interface FourWheeler {
    default void print() {
        System.out.println("I am a four wheeler!");
    }
}

class Car implements Vehicle, FourWheeler {
    public void print() {
        Vehicle.super.print();
        FourWheeler.super.print();
        Vehicle.blowHorn();
        System.out.println("I am a car!");
    }
}
```
Output.
```raw
I am a vehicle!
I am a four wheeler!
Blowing horn!!!
I am a car!
```

## 6. Streams
### 6.1 What is Stream?
Stream represents a sequence of objects from a source, which supports aggregate operations. Following are the characteristics of a Stream:
* `Sequence of elements` − A stream provides a set of elements of specific type in a sequential manner. A stream gets/computes elements on demand. It never stores the elements.
* `Source` − Stream takes Collections, Arrays, or I/O resources as input source.
* `Aggregate operations` − Stream supports aggregate operations like filter, map, limit, reduce, find, match, and so on.
* `Pipelining` − Most of the stream operations return stream itself so that their result can be pipelined. These operations are called intermediate operations and their function is to take input, process them, and return output to the target. `collect()` method is a terminal operation which is normally present at the end of the pipelining operation to mark the end of the stream.
* `Automatic iterations` − Stream operations do the iterations internally over the source elements provided, in contrast to Collections where explicit iteration is required.

### 6.2 Generating Streams
With Java 8, Collection interface has two methods to generate a Stream.
* `stream()` − Returns a `sequential stream` considering collection as its source.
* `parallelStream()` − Returns a `parallel stream` considering collection as its source.

```java
List<String> names = Arrays.asList("Johnny", "", "Peter", "Sean", "", "George");
List<String> filtered = names.stream().filter(name -> !name.isEmpty()).collect(Collectors.toList());
List<String> filtered2 = names.parallelStream().filter(name -> !name.isEmpty()).collect(Collectors.toList());

// names = [Johnny, , Peter, Sean, , George]
// filtered = [Johnny, Peter, Sean, George]
// filtered2 = [Johnny, Peter, Sean, George]
```
### 6.3 Stream Methods
* `forEach` - iterate each element of the stream
* `map` - map each element to its corresponding result
* `filter` - eliminate elements based on a criteria
* `limit` - reduce the size of the stream
* `sorted` - sort the elements in stream

Example
```java
private static void streamMethods() {
    List<Integer> nums = Arrays.asList(3, 7, 1, 8, 2, 4, 9, 5, 6);

    // forEach
    System.out.println("forEach");
    nums.stream().forEach(System.out::println);

    List<Integer> result;

    // map
    System.out.print("map:    ");
    result = nums.stream().map(i -> i * i).collect(Collectors.toList());
    System.out.println(result);

    // filter
    System.out.print("filter: ");
    result = nums.stream().filter(i -> i > 4).collect(Collectors.toList());
    System.out.println(result);

    // limit
    System.out.print("limit:  ");
    result = nums.stream().limit(3).collect(Collectors.toList());
    System.out.println(result);

    // sorted
    System.out.print("sorted: ");
    result = nums.stream().sorted().collect(Collectors.toList());
    System.out.println(result);
}
```
Output.
```raw
forEach
3
7
1
8
2
4
9
5
6
map:    [9, 49, 1, 64, 4, 16, 81, 25, 36]
filter: [7, 8, 9, 5, 6]
limit:  [3, 7, 1]
sorted: [1, 2, 3, 4, 5, 6, 7, 8, 9]
```
### 6.4 Pipeline
Pipe the methods.
```java
private static void pipeline() {
    // pipelining
    List<Integer> nums = Arrays.asList(3, 7, 1, 8, 2, 9, 5, 6);
    System.out.print("pipelining: ");
    List<Integer> result = nums.stream().sorted().filter(i -> i > 4).limit(3).map(i->i*i).collect(Collectors.toList());
    System.out.println(result);

    // sorted:  [1,2,3,4,5,6,7,8,9]
    // filter:  [5,6,7,8,9]
    // limit:   [5,6,7]
    // map:     [25,36,49]
    // forEach: [25,36,49]
}
```
Output.
```raw
pipelining: [25, 36, 49]
```
### 6.5 Collectors
Collectors are used to combine the result of processing on the elements of a stream. Collectors can be used to return a list or a string.
```java
private static void collectors() {
    List<String> names = Arrays.asList("Johnny", "", "Peter", "Sean", "", "George");

    // convert stream to list
    List<String> filtered = names.stream().filter(name -> !name.isEmpty()).collect(Collectors.toList());
    System.out.println("Filtered List: " + filtered);

    // convert list to string with common as delimiter
    String merged = names.stream().filter(name -> !name.isEmpty()).collect(Collectors.joining(", "));
    System.out.println("Merged String: " + merged);
}
```
Output.
```raw
Filtered List: [Johnny, Peter, Sean, George]
Merged String: Johnny, Peter, Sean, George
```
### 6.6 Statistics
With Java 8, statistics collectors are introduced to calculate all statistics when stream processing is being done.
```java
private static void statistics() {
    List<Integer> nums = Arrays.asList(3, 7, 1, 8, 2, 9, 5, 6);

    IntSummaryStatistics stats = nums.stream().mapToInt((x) -> x).summaryStatistics();

    System.out.println("Maximum number in List : " + stats.getMax());
    System.out.println("Minimum number in List : " + stats.getMin());
    System.out.println("Sum of all numbers : " + stats.getSum());
    System.out.println("Average of all numbers : " + stats.getAverage());
}
```
Output.
```raw
Maximum number in List : 9
Minimum number in List : 1
Sum of all numbers : 41
Average of all numbers : 5.125
```

## 7. Optional Class
`Optional` is a container object used to contain not-null objects. Optional object is used to represent null with absent value. This class has various utility methods to facilitate code to handle values as ‘available’ or ‘not available’ instead of checking null values. It is introduced in Java 8 and is similar to what Optional is in Guava.
```java
public class OptionalClassExample {
    public static void main(String args[]) {
        Integer value1 = null;
        Integer value2 = new Integer(10);

        //Optional.ofNullable - allows passed parameter to be null.
        Optional<Integer> a = Optional.ofNullable(value1);

        //Optional.of - throws NullPointerException if passed parameter is null
        Optional<Integer> b = Optional.of(value2);
        OptionalSum os = new OptionalSum();
        System.out.println(os.sum(a,b));
    }
}

class OptionalSum {
    public Integer sum(Optional<Integer> a, Optional<Integer> b) {
        //Optional.isPresent - checks the value is present or not
        System.out.println("First parameter is present: " + a.isPresent());
        System.out.println("Second parameter is present: " + b.isPresent());

        //Optional.orElse - returns the value if present otherwise returns
        //the default value passed.
        Integer value1 = a.orElse(new Integer(0));

        //Optional.get - gets the value, value should be present
        Integer value2 = b.get();
        return value1 + value2;
    }
}
```
Output.
```raw
First parameter is present: false
Second parameter is present: true
10
```

## 8. Nashorn JavaScript
With Java 8, `Nashorn`, a much improved javascript engine is introduced, to replace the existing `Rhino`. Nashorn provides 2 to 10 times better performance, as it directly compiles the code in memory and passes the bytecode to JVM.
### 8.1 jjs
For Nashorn engine, JAVA 8 introduces a new command line tool, `jjs`, to execute javascript codes at console.

Create a javascript file name 'sample.js' as follows.
```javascript
// sample.js
print('Hello World from javascript!');
```
Use jjs to execute this js file.
```raw
jjs sample.js
```
Output.
```raw
Hello World from javascript!
```
### 8.2 Calling JavaScript from Java
Using ScriptEngineManager, JavaScript code can be called and interpreted in Java.

```java
public class NashornExample {
    // Call javascript from java with ScriptEngineManager
    public static void main(String args[]) {
        ScriptEngineManager scriptEngineManager = new ScriptEngineManager();
        ScriptEngine nashorn = scriptEngineManager.getEngineByName("nashorn");

        String name = "Johnny";
        Integer result = null;

        try {
            // call eval without return value
            nashorn.eval("print('" + name + "')");
            // call eval with return value
            result = (Integer) nashorn.eval("10 + 2");

        } catch(ScriptException e) {
            System.out.println("Error executing script: "+ e.getMessage());
        }
        System.out.println(result.toString());
    }
}
```
Output.
```raw
Johnny
12
```
### 8.3 Calling Java from JavaScript
Create javascript file named 'calljava.js' as follows.
```javascript
// calljava.js
var BigDecimal = Java.type('java.math.BigDecimal');

function calculate(amount, percentage) {

   var result = new BigDecimal(amount).multiply(new BigDecimal( )).divide(
      new BigDecimal("100"), 2, BigDecimal.ROUND_HALF_EVEN);

   return result.toPlainString();
}
var result = calculate(568000000000000000023,13.9);
print(result);
```
Run it with jjs.
```raw
> jjs calljava.js
78952000000000002017.94
```

## 9. New Date/Time API
With Java 8, a new Date-Time API is introduced to cover the following drawbacks of old date-time API.
* `Not thread safe` − java.util.Date is not thread safe, thus developers have to deal with concurrency issue while using date. The new date-time API is immutable and does not have setter methods.
* `Poor design` − Default Date starts from 1900, month starts from 1, and day starts from 0, so no uniformity. The old API had less direct methods for date operations. The new API provides numerous utility methods for such operations.
* `Difficult time zone handling` − Developers had to write a lot of code to deal with timezone issues. The new API has been developed keeping domain-specific design in mind.

Java 8 introduces a new date-time API under the package java.time. Following are some of the important classes introduced in java.time package.
* `Local` − Simplified date-time API with no complexity of timezone handling.
* `Zoned` − Specialized date-time API to deal with various timezones.

### 9.1 Local Date-Time API
Following three classes simplify the development where timezones are not required.
* LocalDate
* LocalTime
* LocalDateTime

```java
// Local Date-Time API
private static void testLocalDateTime() {
    // Get the current date and time
    LocalDateTime currentDT = LocalDateTime.now();
    System.out.println("Current DateTime: " + currentDT);

    LocalDate date1 = currentDT.toLocalDate();
    System.out.println("Current Date: " + date1);

    Month month = currentDT.getMonth();
    int day = currentDT.getDayOfMonth();
    int seconds = currentDT.getSecond();

    System.out.println("Month: " + month +", day: " + day +", seconds: " + seconds);

    // Update year and month
    LocalDateTime date2 = currentDT.withDayOfMonth(10).withYear(2012);
    System.out.println("New DateTime: " + date2);

    // Local Date
    LocalDate date = LocalDate.of(2014, Month.DECEMBER, 12);
    System.out.println("New Local Date: " + date);

    // 22 hour 15 minutes
    LocalTime time = LocalTime.of(22, 15);
    System.out.println("New Local Time: " + time);

    // Parse a string
    LocalTime timeParse = LocalTime.parse("20:15:30");
    System.out.println("Time from String: " + timeParse);
}
```
Output.
```raw
Current DateTime: 2019-04-14T10:15:37.325
Current Date: 2019-04-14
Month: APRIL, day: 14, seconds: 37
New DateTime: 2012-04-10T10:15:37.325
New Local Date: 2014-12-12
New Local Time: 22:15
Time from String: 20:15:30
```
### 9.2 Zoned Date-Time API
Zoned date-time API is to be used when `time zone` is to be considered.
```java
// Zoned Date-Time API
public static void testZonedDateTime() {
    // Get the current date and time
    ZonedDateTime zdt = ZonedDateTime.parse("2007-12-03T10:15:30+05:30[Asia/Shanghai]");
    System.out.println("Zone DateTime: " + zdt);
    System.out.println("Zone Id: " + zdt.getZone());

    ZoneId id = ZoneId.of("Europe/Paris");
    System.out.println("ZoneId: " + id);

    ZoneId currentZone = ZoneId.systemDefault();
    System.out.println("CurrentZone: " + currentZone);
}
```
Output.
```raw
Zone DateTime: 2007-12-03T10:15:30+08:00[Asia/Shanghai]
Zone Id: Asia/Shanghai
ZoneId: Europe/Paris
CurrentZone: America/Los_Angeles
```
### 9.3 Chrono Units Enum
java.time.temporal.ChronoUnit enum is added in Java 8 to replace the integer values used in old API to represent day, month, etc. Let us see them in action.
```java
// Chrono Units Enum
public static void testChromoUnits() {
    // Get the current date
    LocalDate today = LocalDate.now();
    System.out.println("Current date: " + today);

    // Add 1 week to the current date
    LocalDate nextWeek = today.plus(1, ChronoUnit.WEEKS);
    System.out.println("Next week: " + nextWeek);

    // Add 1 month to the current date
    LocalDate nextMonth = today.plus(1, ChronoUnit.MONTHS);
    System.out.println("Next month: " + nextMonth);

    // Add 1 year to the current date
    LocalDate nextYear = today.plus(1, ChronoUnit.YEARS);
    System.out.println("Next year: " + nextYear);

    // Add 10 years to the current date
    LocalDate nextDecade = today.plus(1, ChronoUnit.DECADES);
    System.out.println("Date after ten year: " + nextDecade);
}
```
Output.
```raw
Current date: 2019-04-14
Next week: 2019-04-21
Next month: 2019-05-14
Next year: 2020-04-14
Date after ten year: 2029-04-14
```
### 9.4 Period and Duration
With Java 8, two specialized classes are introduced to deal with the time differences.
* `Period` − It deals with date based amount of time.
* `Duration` − It deals with time based amount of time.

```java
// Period
public static void testPeriod() {
    //Get the current date
    LocalDate date1 = LocalDate.now();
    System.out.println("Current date: " + date1);

    //add 1 month to the current date
    LocalDate date2 = date1.plus(1, ChronoUnit.MONTHS);
    System.out.println("Next month: " + date2);

    Period period = Period.between(date2, date1);
    System.out.println("Period: " + period);
}

// Duration
public static void testDuration() {
    LocalTime time1 = LocalTime.now();
    Duration twoHours = Duration.ofHours(2);

    LocalTime time2 = time1.plus(twoHours);
    Duration duration = Duration.between(time1, time2);

    System.out.println("Duration: " + duration);
}
```
Output.
```raw
Current date: 2019-04-14
Next month: 2019-05-14
Period: P-1M
Duration: PT2H
```
### 9.5 Temporal Adjusters
TemporalAdjuster is used to perform the date mathematics. For example, get the "Second Saturday of the Month" or "Next Tuesday".
```java
// Temporal Adjusters
public static void testAdjusters() {
    //Get the current date
    LocalDate localDate = LocalDate.now();
    System.out.println("Current date: " + localDate);

    //get the next tuesday
    LocalDate nextTuesday = localDate.with(TemporalAdjusters.next(DayOfWeek.TUESDAY));
    System.out.println("Next Tuesday on : " + nextTuesday);

    //get the second saturday of next month
    LocalDate firstInYear = LocalDate.of(localDate.getYear(), localDate.getMonth(), 1);
    LocalDate secondSaturday = firstInYear.with(TemporalAdjusters.nextOrSame(
            DayOfWeek.SATURDAY)).with(TemporalAdjusters.next(DayOfWeek.SATURDAY));
    System.out.println("Second Saturday on : " + secondSaturday);
}
```
Output.
```raw
Current date: 2019-04-14
Next Tuesday on : 2019-04-16
Second Saturday on : 2019-04-13
```
### 9.6 Backward Compatibility
A `toInstant()` method is added to the original Date and Calendar objects, which can be used to convert them to the new Date-Time API. Use an `ofInstant(Insant,ZoneId)` method to get a LocalDateTime or ZonedDateTime object.
```java
// Backward Compatibility with ofInstant
public static void testBackwardCompatability() {
    //Get the current date
    Date currentDate = new Date();
    System.out.println("Current date: " + currentDate);

    //Get the instant of current date in terms of milliseconds
    Instant now = currentDate.toInstant();
    ZoneId currentZone = ZoneId.systemDefault();

    LocalDateTime localDateTime = LocalDateTime.ofInstant(now, currentZone);
    System.out.println("Local date: " + localDateTime);

    ZonedDateTime zonedDateTime = ZonedDateTime.ofInstant(now, currentZone);
    System.out.println("Zoned date: " + zonedDateTime);
}
```
Output.
```raw
Current date: Sun Apr 14 10:30:19 PDT 2019
Local date: 2019-04-14T10:30:19.572
Zoned date: 2019-04-14T10:30:19.572-07:00[America/Los_Angeles]
```

## 10. Base64
Java 8 now has inbuilt encoder and decoder for Base64 encoding. In Java 8, we can use three types of Base64 encoding.
* `Simple` − Output is mapped to a set of characters lying in `A-Za-z0-9+/`. The encoder does not add any line feed in output, and the decoder rejects any character other than A-Za-z0-9+/.
* `URL` − Output is mapped to set of characters lying in `A-Za-z0-9+_`. Output is URL and filename safe.
* `MIME` − Output is mapped to MIME friendly format. Output is represented in lines of no more than 76 characters each, and uses a carriage return '\r' followed by a linefeed '\n' as the line separator. No line separator is present to the end of the encoded output.

Example
```java
public static void main(String args[]) {
    try {
        // Original
        String original = "jojozhuang.github.io?java8";
        System.out.println("Original String: " + original);

        // Encode using basic encoder
        String strEncoded = Base64.getEncoder().encodeToString(
                original.getBytes("utf-8"));
        System.out.println("Base64 Encoded String (Basic) :" + strEncoded);

        // Decode
        byte[] base64decodedBytes = Base64.getDecoder().decode(strEncoded);
        System.out.println("Decoded String: " + new String(base64decodedBytes, "utf-8"));
        strEncoded = Base64.getUrlEncoder().encodeToString(
                original.getBytes("utf-8"));
        System.out.println("Base64 Encoded String (URL) :" + strEncoded);

        // MIME Example
        String uuid = UUID.randomUUID().toString();
        System.out.println("Original UUID: " + uuid);
        byte[] mimeBytes = uuid.getBytes("utf-8");
        String mimeEncodedString = Base64.getMimeEncoder().encodeToString(mimeBytes);
        System.out.println("Base64 Encoded String (MIME) :" + mimeEncodedString);

        base64decodedBytes = Base64.getDecoder().decode(mimeEncodedString);
        System.out.println("Decoded UUID: " + new String(base64decodedBytes, "utf-8"));

    } catch(UnsupportedEncodingException e) {
        System.out.println("Error :" + e.getMessage());
    }
}
```
Output.
```raw
Original String: jojozhuang.github.io?java8
Base64 Encoded String (Basic) :am9qb3podWFuZy5naXRodWIuaW8/amF2YTg=
Decoded String: jojozhuang.github.io?java8
Base64 Encoded String (URL) :am9qb3podWFuZy5naXRodWIuaW8_amF2YTg=
Original UUID: 565ce125-6615-441e-8719-f7cd721e0077
Base64 Encoded String (MIME) :NTY1Y2UxMjUtNjYxNS00NDFlLTg3MTktZjdjZDcyMWUwMDc3
Decoded UUID: 565ce125-6615-441e-8719-f7cd721e0077
```

## 11. Source Files
* [Source files for Java 8 New Features on GitHub](https://github.com/jojozhuang/java-programming/tree/master/java-java8-newfeatures)

## 12. References
* [Java 8 - Overview](https://www.tutorialspoint.com/java8/java8_overview.htm)
* [Java Method References](https://www.javatpoint.com/java-8-method-reference)
