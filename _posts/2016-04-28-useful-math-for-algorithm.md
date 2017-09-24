---
layout: post
key: blog
title: "Useful Math For Algorithm"
date: 2016-04-28
tags: Math, Sum, Slot
---

> Common useful math knowledge used in algorithms.

## 1. Formula
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

## 2. Slot

## 3. Triangle
