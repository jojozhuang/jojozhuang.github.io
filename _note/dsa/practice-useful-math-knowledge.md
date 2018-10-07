---
layout: note
key: note
title: "Practice - Useful Math Knowledge"
index: 345
category: dsa
image: /note/dsa.png
date: 2016-04-05
postdate: 2016-04-05
tags: [Math]
---

> Common useful math knowledge used in algorithms.

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

### 1.3 Valid Perfect Square(leetcode 367)
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


## 2. Slot

## 3. Triangle

## 4. Keywords
Complex number = real parts and imaginary parts

## 5. References
* [Program to find GCD or HCF of two numbers](https://www.geeksforgeeks.org/c-program-find-gcd-hcf-two-numbers/)
* [Greatest Common Divisor(GCD)](https://blog.csdn.net/tigerisland45/article/details/51151529)
* [Greatest common divisor on wikipedia](https://en.wikipedia.org/wiki/Greatest_common_divisor)
