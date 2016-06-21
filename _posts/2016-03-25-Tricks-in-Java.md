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

```
long var1 = Integer.MAX_VALUE + 1; //var1 = -2147483648
```
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
