---
layout: post
key: blog
title: "Tricks in Java"
date: 2016-03-25
categories:
- blog
---

> This blog records some tricky cases when using Java.

## 1. Overflow when assigning Integer value.  
As we all know, the range of Integer in java is from -2147483648(-2^31) to 2147483647(2^31 - 1). And we use constant Integer.MIN_VALUE to represent -2147483648, and Integer.MAX_VALUE to represent 2147483647. When trying to increment the max value or decrement the min value, overflow occurs. That is

```
Integer.MAX_VALUE + 1 = Integer.MIN_VALUE;
Integer.MIN_VALUE - 1 = Integer.MAX_VALUE;
```

If you try to assign Integer.MAX_VALUE + 1 to a long type variable, the result may be not what you want.

highlighttesting
{% highlight java %}
long var1 = Integer.MAX_VALUE + 1; //var1 = -2147483648
{% endhighlight %}

You will get var1 = -2147483648 instead of 2147483648. The following statement doesn't work, either.

```
long var1 = (long)(Integer.MAX_VALUE + 1);
```

The correct way to do this is:

```
long var1 = Integer.MAX_VALUE;
var1 = var1 + 1;

//or
long var1 = (long)Integer.MAX_VALUE + 1;
```

## 2. How a primitive float/double value can be -0.0?  
Float is a tricky type in java.  

### 2.1 The first issue is precision.  
You could never be able to store a floating point number of infinite precision with finite resources. You should never test if a floating point number == to some other, i.e. never write code like this:

```
if (a == b)
```

where a and b are floats. Due to rounding errors those two numbers might be stored as different values in memory. You should define a precision you want to work with:

```
private final static double EPSILON = 0.00001;
```

and then test against the precision you need

```
if (Math.abs(a - b) < epsilon)
```

### 2.2 The second is the negative zero value, -0.0.  
When I work on an algorithm problem [149. Max Points on a Line](https://leetcode.com/problems/max-points-on-a-line/) in leetcode.com, I need to calculate the slope of two points, below are the original codes.

```
slope = (double)(points[i].y - points[j].y) / (points[i].x - points[j].x);
```

My program runs failed for one test case: [2,3],[3,3],[-5,3]. After debugging, I found the root cause is because of negative -0.0. The slope between point[2,3] and point[3,3] is <span style='color:red'>-0.0</span>. And the slope between point[2,3] and point[-5,3] is <span style='color:red'>0.0</span>. But actually they are all in the same line with slope <span style='color:red'>0.0</span>.

I update my code to add 0.0 at the end of the line to make sure no negative zero appears. The problem is solved, and my program passed all test cases.

```
slope = (double)(points[i].y - points[j].y) / (points[i].x - points[j].x) + 0.0;
```
### 2.3 Reference
* [How can a primitive float value be -0.0? What does that mean?](http://stackoverflow.com/questions/6724031/how-can-a-primitive-float-value-be-0-0-what-does-that-mean)
