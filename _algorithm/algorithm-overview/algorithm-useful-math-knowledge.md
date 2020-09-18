---
layout: tutorial
key: algorithm
title: "Algorithm - Useful Math Knowledge"
index: 1304
subcategory: algorithm-overview
date: 2016-04-05
tags: [Math, GCD]
---

> Useful math knowledge for algorithm problems.

## 1. Formulas
### 1.1 Sum of Integers 1 through N
Q: What is 1 + 2 + 3 + ... + n?  
A: Sum = n(n + 1)/2  

Proofs:

* n is even

|#pair| a | b | sum |
|---|---|---|---|
| 1 | 1 | n | 1+n |
| 2 | 2 | n-1 | 1+n |
| 3 | 3 | n-2 | 1+n |
| ... | ... | ... | ... |
| n/2 | n/2 | n/2 + 1 | 1+n |

Sum = n/2 * (n + 1)

* n is odd

Take n out of the list, pair the rest.

#pair| a | b | sum
--|---|---|--
 1 | 1  | n-1 | n
 2 | 2  | n-2 | n
 3 | 3  | n-3 | n
 ... | ... | ... | ...
 (n-1)/2 | (n-1)/2 | (n-1)/2 + 1 | n

Sum = (n-1)/2 * n + n = n(n + 1)/2  

Or, use the above conclusion for even, 1 + 2 + 3 + ... + n = 1 + 2 + 3 + ... + (n-1) + n = (n-1)/2 * (n - 1 + 1) + n = n(n + 1)/2.  

### 1.2 Sum of Powers of 2
Q: What is 2^0 + 2^1 + 2^2 + ... + 2^n?  
A: 2^(n+1) - 1

Proofs:
Look at these values in binary way.  

|   |Power  | Binary|Decimal|
|---|-------|-------|-------|
|   | 2^0   | 00001 | 1     |
|   | 2^1   | 00010 | 2     |
|   | 2^2   | 00100 | 4     |
|   | 2^3   | 01000 | 8     |
|   | 2^4   | 10000 | 16    |
|Sum| 2^5-1 | 11111 | 32 - 1|

Sum = 2^(n+1) - 1

### 1.3 GCD(greatest common divisor)
```java
private int gcd(int x, int y) {
    return y == 0 ? x : gcd(y, x % y);
}
```
All common divisors of two given numbers.
```java
// method to calculate all common divisors of two given numbers
private List<Integer> commDiv(int a, int b)
{
    Set<Integer> set = new HashSet();
    // find gcd of a, b
    int n = gcd(a, b);
    set.add(n);

    for (int i = 1; i <= Math.sqrt(n); i++) {
        // if 'i' is factor of n
        if (n % i == 0) {
            // check if divisors are equal
            if (n / i == i) {
                set.add(i);
            } else {
                set.add(i);
                set.add(n/i);
            }
        }
    }
    return new ArrayList<>(set);
}
```
All dividers of the given number.
```java
private List<Integer> divider(int num)
{
    List<Integer> list = new ArrayList<>();
    for (int i = 1; i < num; i++) {
        if (num % i == 0) {
            list.add(i);
        }
    }
    return list;
}
```

### 1.4 Valid Perfect Square(leetcode 367)
```java
// Newton Method
public boolean isPerfectSquare(int num) {
    long x = num;
    while (x * x > num) {
        x = (x + num / x) >> 1;
    }
    return x * x == num;
}
```
### 1.5 Check Integer is Prime
Prime number: 2,3,5,7,11,13,17,19,23,29 ...

Naive approach.
```java
// time: O(n)
private boolean isPrime(int n) {
    if (n < 2) {
        return false;
    }
    for (int i = 2; i < n; i++) {
        if (n % i == 0) {
            return false;
        }
    }
    return true;
}
```
Improved by setting the ceiling to square root of n, see [here](https://www.mkyong.com/java/how-to-determine-a-prime-number-in-java/).
```java
 // time: sqrt(n)
private boolean isPrime(int n) {
    if (n < 2) {
        return false;
    }
    int sqrt = (int)Math.sqrt(n);
    for (int i = 2; i <= sqrt; i++) {
        if (n % i == 0) {
            return false;
        }
    }
    return true;
}
```
Same idea but without using sqrt.
```java
// time: sqrt(n)
private boolean isPrime(int n) {
    if (n < 2) {
        return false;
    }
    for (int i = 2; i*i <= n; i++) {
        if (n % i == 0) {
            return false;
        }
    }
    return true;
}
```

## 2. Slot

## 3. Triangle

## 4. Keywords
Complex number = real parts and imaginary parts

## 5. References
* [Program to find GCD or HCF of two numbers](https://www.geeksforgeeks.org/c-program-find-gcd-hcf-two-numbers/)
* [Greatest Common Divisor(GCD)](https://blog.csdn.net/tigerisland45/article/details/51151529)
* [Greatest common divisor on wikipedia](https://en.wikipedia.org/wiki/Greatest_common_divisor)
* [How to determine a prime number in Java](https://www.mkyong.com/java/how-to-determine-a-prime-number-in-java/)
