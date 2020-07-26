---
layout: tutorial
key: algorithm
title: "Algorithm - Bit Manipulation"
index: 1203
subcategory: algorithm-algorithm
date: 2016-04-03
tags: [Xor, Shifting]
---

> Bit Manipulation.

## 1. Operations for Bit
* & (And)
* \| (OR)
* ^ (XOR)
* ~ (Negative)

## 2. Common Facts

 XOR        | AND        | OR
------------|------------|-----------
x ^ 0s = x  | x & 0s = 0 | x \| 0s = x
x ^ 1s = ~x | x & 1s = x | x \| 1s = 1
x ^ x = 0   | x & x = x  | x \| x = x

## 3. Shifting
* Arithmetic Right Shift (take the sign bit to most significant bit)
* Logical Right Shift (alway shift zero to most significant bit)

See the difference through the below sample.
```java
public static void main(String[] args) {
    // output 0, shift 0, since it is positive, finally becomes to 00000000 00000000 00000000 00000000
    System.out.println(repeatArithmeticShift(34543,40));
    // output 0, logical shift always append a zero into the most significant bit repeatedly.
    System.out.println(repeatLogicShift(34543,40));
    // output -1, shift 1, since it is negative, finally becomes to 11111111 11111111 11111111 11111111
    System.out.println(repeatArithmeticShift(-34543,40));
    // output 0, logical shift always append a zero into the most significant bit repeatedly.
    System.out.println(repeatLogicShift(-34543,40));
}

public static int repeatArithmeticShift(int x, int count) {
    for (int i = 0; i < count; i++) {
        x >>= 1; //Arithmetic shift by 1
    }
    return x;
}

public static int repeatLogicShift(int x, int count) {
    for (int i = 0; i < count; i++) {
        x >>>= 1; //Logical shift by 1
    }
    return x;
}
```

## 4. Common Bit Methods
### 4.1 Getting Bit
Given an integer and a specific position, check whether the bit at this position of the given number is one.
```java
boolean getBit(int num, int i) { // i range is {0, 31}, 0 is the rightest
    return (num & (1 << i)) != 0; // if i = 4, (1 << i) => 00010000
}
```

### 4.2 Setting Bit
Given an integer and a specific position, set the bit at this position of the given number to one.
```java
int setBit(int num, int i) {
    return num | (1 << i); // if i = 4, (1 << i) => 00010000
}
```

### 4.3 Clearing Bit
Given an integer and a specific position, set the bit at this position of the given number to zero.
```java
int clearBit(int num, int i) {
    int mask = ~(1 << i); // if i = 4, (1 << i) => 00010000, mask = 11101111
    return num & mask;
}
```

### 4.4 Clearing Bit(Left Part)
Given an integer and a specific position, clear all bits from the most significant bit through i (inclusive).
```java
int clearBitsMSthroughI(int num, int i) {
    int mask = (1 << i) - 1; // if i = 4, (1 << i) => 00010000, mask = 00001111
    return num & mask;
}
```

### 4.5 Clearing Bit(Right Part)
Given an integer and a specific position, clear all bits from i (inclusive) through 0 (inclusive).
```java
int clearBitsIthrough0(int num, int i) {
    int mask = -1 << (i + 1); // if i = 4, mask = 11100000
    return num & mask;
}
```

### 4.6 Updating Bit
Given an integer and a specific position, set the bit at this position of to a given value(0 or 1).
```java
int updateBit(int num, int i, boolean bitIsOne) {
    int value = bitIsOne ? 1 : 0;
    int mask = ~(1 << i); // if i = 4, mask = 11101111
    return (num & mask) | (value << i); // if i = 4, and value = 1, (value < i) =  00010000
}
```

### 4.7 Pairwise Swap
Given an integer, swap its odd and even bits with as few instructions as possible (e.g., bit 0 and bit 1 are swapped, bit 2 and bit 3 are swapped, and so on).
```java
int swapOddEvenBits(int num) { // solution based on 32-bit system
    // a => 1010, 5 => 0101
    return (((num & 0xaaaaaaaa) >>> 1) | ((num & 0x55555555) << 1));
}
```

## 5. Arithmetic Implementation
```java
// It works for both positive as well as negative numbers
public int add(int a, int b) {  
    while (b != 0) {
        int c = a & b;  // Find the carry bits
        a = a ^ b;  // Add the bits without considering the carry
        b = c << 1;  // Propagate the carry
    }
    return a;
}

public int sub(int a, int b) {
    return add(a, -b);
}

public int multiply(int a, int b) {
    todo
}
public int divide(int a, int b) {
    todo
}
```

### 5.1 Checking If An Integer is Power of Two.
```java
n & (n-1) == 0;
```
Example:
If n = 8, then 1000 & 111 == 0
If n = 9, then 1001 & 1000 == 1000 != 0
If n = 10, then 1010 & 1001 == 1000 != 0

### 5.2 Getting the last 1 for a number
Or we can say find the biggest factor with power of two for number x.
```java
x &= -x;
```
Examples:
if x = 5, then x = 0101 & (1011) = 0001 = 1 = 2^0
if x = 6, then x = 0110 & (1010) = 0010 = 2 = 2^1
if x = 28, then x = 00011100 & 11100100 = 00000100 = 4 = 2^2

### 5.2 Implementing mathematic addition
```java
int add(int a, int b) {  
    while (b != 0) {
        int c = a & b;  // Find the carry bits
        a = a ^ b;  // Add the bits without considering the carry
        b = c << 1;  // Propagate the carry
    }
    return a;
}
```
The code shown above is actually the way how we calculate sum of two numbers in decimal.
For example:
a = 138, b = 296
Step 1: Calculate sum of two number without taking the carry, 138 + 296 = 324
Step 2: Calculate sum of two number by only getting the carry, 138 + 296 = 011
Step 3: Shift the carry result to left by 1 then add sum1, 0324 + 0110 = 434.

## 6. Decimal to Binary
```raw
 2147483647 = 011111111111111111111111111111111
          3 = 000000000000000000000000000000011
          2 = 000000000000000000000000000000010
          1 = 000000000000000000000000000000001
          0 = 000000000000000000000000000000000
         -1 = 111111111111111111111111111111111
         -2 = 111111111111111111111111111111110
         -3 = 111111111111111111111111111111101
-2147483647 = 100000000000000000000000000000001
-2147483648 = 100000000000000000000000000000000
```
## 7. Reference
