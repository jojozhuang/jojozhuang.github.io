---
layout: note
key: note
title: "Math Used in Algorithm Questions(Draft)"
index: 203
date: 2016-02-03
category: language
---

## 1. How to calculate GCD(greatest common divisor)

```java
private int gcd(int x, int y) {
    return y == 0 ? x : gcd(y, x % y);
}
```

## 2. Valid Perfect Square(leetcode 367)
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

https://www.geeksforgeeks.org/c-program-find-gcd-hcf-two-numbers/
https://blog.csdn.net/tigerisland45/article/details/51151529
https://en.wikipedia.org/wiki/Greatest_common_divisor
## 9. References
* [Java Interview Questions](https://www.tutorialspoint.com/java/java_interview_questions.htm)
