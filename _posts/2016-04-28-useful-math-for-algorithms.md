---
layout: post
title: "Useful Math For Algorithms"
date: 2016-04-28
categories:
- blog
---

> Common useful math knowledge used in algorithms.

## 1. Slot
## 2. Formula
### 2.1 Sum of Integers 1 through N
What is 1 + 2 + 3 + ... + n?
sum = n(n + 1)/2
Proofs:
* n is even
|#pair| a | b | sum |
|---|---|---|---|
| 1 | 1 | n | 1+n |
| 2 | 2 | n-1 | 1+n |
| 3 | 3 | n-2 | 1+n |
| ... | ... | ... | ... |
| n/2 | n/2 | n/2 + 1 | 1+n |

### 2.1 Sum of Powers of 2
What is 2^0 + 2^1 + 2^2 + ... + 2^n?
