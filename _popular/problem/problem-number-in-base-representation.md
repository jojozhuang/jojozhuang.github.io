---
layout: tutorial
key: popular
title: "Problem - Number in Base Representation"
index: 1708
subcategory: practice-problems
date: 2019-08-04
tags: [Base Representation]
---

> Convert number into different base representation.

## 1. Requirement
Convert an integer number into positive base 2 representation and negative base 2 representation.

## 2. Solution
### 2.1 Positive Base 2
Example:
```raw
Input  : n = 13, base = 2
Output : 1101
1*(8) + 1*(4) + 0*(2) + 1*(1)  = 13
```
Implementation.
```java
public String base2(int n) {
    StringBuilder res = new StringBuilder();
    while (n != 0) {
        res.append(n & 1);
        n = n >> 1;
    }
    return res.length() > 0 ? res.reverse().toString() : "0";
}
```
### 2.2 Negative Base 2
Example:
```raw
Input  : n = 13, base = -2
Output : 11101
1*(16) + 1*(-8) + 1*(4) + 0*(-2) + 1*(1)  = 13
```
Implementation.
```java
public String baseNeg2(int n) {
    StringBuilder res = new StringBuilder();
    while (n != 0) {
        res.append(n & 1);
        n = -(n >> 1);
    }
    return res.length() > 0 ? res.reverse().toString() : "0";
}
```
Test class.
```java
public class Base2Test {

    @Test
    public void testBase2() {
        System.out.println("testBase2");
        Base2 instance = new Base2();
        assertEquals("101", instance.base2(5));
        assertEquals("1101", instance.base2(13));
        assertEquals("100000", instance.base2(32));
    }

    @Test
    public void testBaseNeg2() {
        System.out.println("testBaseNeg2");
        Base2 instance = new Base2();
        assertEquals("101", instance.baseNeg2(5));
        assertEquals("11101", instance.baseNeg2(13));
        assertEquals("1100000", instance.baseNeg2(32));
    }
}
```
### 2.3 Generic Solution
Generic solution for any base.
```java
public class GenericBase {
    public String base(int n, int base) {
        if (n == 0) {
            return "0";
        }

        String converted = "";
        while (n != 0) {
            // Get remainder by negative base, it can be negative also
            int remainder = n % base;
            n /= base;

            // if remainder is negative, add abs(base) to it and add 1 to n
            if (remainder < 0) {
                remainder += (-base);
                n += 1;
            }

            // convert remainder to string add into the result
            converted = remainder + converted;
        }

        return converted;
    }
}
```
Test class.
```java
public class GenericBaseTest {

    @Test
    public void testGenericBase() {
        System.out.println("testGenericBase");
        GenericBase instance = new GenericBase();
        assertEquals("101", instance.base(5, 2));
        assertEquals("1101", instance.base(13, 2));
        assertEquals("100000", instance.base(32, 2));

        assertEquals("101", instance.base(5, -2));
        assertEquals("11101", instance.base(13, -2));
        assertEquals("1100000", instance.base(32, -2));
    }
}
```

## 3. Source Files
* [Source files of Number in Base2 Representation on Github](https://github.com/jojozhuang/practice-problems/tree/master/number-base)

## 4. References
* [Convert a number into negative base representation](https://www.geeksforgeeks.org/convert-number-negative-base-representation/)
* [1017. Convert to Base -2](https://leetcode.com/problems/convert-to-base-2/discuss/265507/JavaC%2B%2BPython-2-lines-Exactly-Same-as-Base-2)
