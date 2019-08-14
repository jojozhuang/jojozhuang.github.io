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
public static String base2(int N) {
    StringBuilder res = new StringBuilder();
    while (N != 0) {
        res.append(N & 1);
        N = N >> 1;
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
public static String baseNeg2(int N) {
    StringBuilder res = new StringBuilder();
    while (N != 0) {
        res.append(N & 1);
        N = -(N >> 1);
    }
    return res.length() > 0 ? res.reverse().toString() : "0";
}
```

## 3. Generic Solution
Generic solution for any base.
```java
public class GenericBase {
    public static void main(String args[]) {
        System.out.println(base(13, 2));
        System.out.println(base(13, -2));
    }

    public static String base(int N, int base) {
        if (N == 0) {
            return "0";
        }

        String converted = "";
        while (N != 0) {
            // Get remainder by negative base, it can be negative also
            int remainder = N % base;
            N /= base;

            // if remainder is negative, add abs(base) to it and add 1 to n
            if (remainder < 0) {
                remainder += (-base);
                N += 1;
            }

            // convert remainder to string add into the result
            converted = remainder + converted;
        }

        return converted;
    }
}
```
Output.
```raw
1101
11101
```

## 4. Source Files
* [Source files of Number in Base2 Representation on Github](https://github.com/jojozhuang/practice-problems/tree/master/number-base)

## 5. References
* [Convert a number into negative base representation](https://www.geeksforgeeks.org/convert-number-negative-base-representation/)
* [1017. Convert to Base -2](https://leetcode.com/problems/convert-to-base-2/discuss/265507/JavaC%2B%2BPython-2-lines-Exactly-Same-as-Base-2)
