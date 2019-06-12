---
layout: note
key: programming
title: "Algorithm - Sweep Line"
index: 329
category: dsa
image: /dsa.png
date: 2016-03-29
postdate: 2016-03-29
tags: [Sweep Line]
mathjax: true
---

> Sweep line approach to solve interval problems.

## 1. Sweep Line
A sweep line is an imaginary vertical line which is swept across the plane rightwards.

## 2. Problem - Maximum Population
### 2.1 Problem Description
Given some people's birth and death year, find out the maximum population. (One similar problem is how many planes are in the air, suppose you are given with an array containing the take-off time and landing time.)

For example, we have 5 persons with their birth and death year.
* A: 1938 ~ 1965
* B: 1953 ~ 2008
* C: 1984 ~ 2016
* D: 1930 ~ 1978
* E: 1945 ~ 2018

The maximum population happens between 1953 and 1965, which is 4.
![image](/public/images/dsa/algorithm-sweep-line/birth_death_year.png){:width="800px"}  
### 2.2 Brute Force Solution
First, find the first year(birth) and the last year(death) of the given persons, create an array with the same length of the year range. Then, calculate the population for each year. Finally, find the maximum population.
![image](/public/images/dsa/algorithm-sweep-line/brute_force.png)
Below is the implementation.
```java
// brute force,
// time: O(n*y), n is the number of persons, y is the year range.
// space: O(y)
public int getMostPopulationBruteForce(int[][] persons) {
    if (persons == null || persons.length == 0) {
        return 0;
    }

    // find the first year(birth) and the last year(death) of the given persons
    int yearStart = Integer.MAX_VALUE, yearEnd = Integer.MIN_VALUE;
    for (int[] person : persons) {
        yearStart = Math.min(yearStart, person[0]);
        yearEnd = Math.max(yearEnd, person[1]);
    }

    // calculate the population for each year
    int max = 0;
    int[] years = new int[yearEnd - yearStart + 1];
    for (int i = 0; i < years.length; i++) {
        for (int j = 0; j < persons.length; j++) {
            if ((persons[j][0] <= i + yearStart) &&
                (persons[j][1] > i + yearStart)) {
                years[i]++;
            }
        }
        max = Math.max(max, years[i]);
    }

    return max;
}
```
* Time complexity: $O(n*y)$, n is the number of persons, y is the year range.
* Space complexity: $O(y)$, y is the year range.

### 2.3 Time Line Solution
Create a same array as discussed in the previous solution. Sweep the time line from left to right, when we meet a birth, increment the count for that year by one; when we meet a death, decrement the count for that year by one. At last, go through the array, summarize the count for all years from left to right. Meanwhile, note down the maximum count.
![image](/public/images/dsa/algorithm-sweep-line/sweep_time_line.png)
Notice that, when decreasing the count, we don't care who was actually dead in that year. For example, if we exchange the death year for person A and person B, our algorithm produces same array.
![image](/public/images/dsa/algorithm-sweep-line/exchange_death.png)
Below is the implementation.
```java
// timeline, add 1 if born, minus 1 if dead, count the maximum of the timeline.
// time: O(p+p+y), n is the number of persons, y is the year range.
// space: O(y)
public int getMostPopulation(int[][] persons) {
    if (persons == null || persons.length == 0) {
        return 0;
    }

    // find the first year(birth) and the last year(death) of the given persons
    int yearStart = Integer.MAX_VALUE, yearEnd = Integer.MIN_VALUE;
    for (int[] person : persons) {
        yearStart = Math.min(yearStart, person[0]);
        yearEnd = Math.max(yearEnd, person[1]);
    }

    // increment if born, decrement if dead
    int[] years = new int[yearEnd - yearStart + 1];
    for (int i = 0; i < persons.length; i++) {
        years[persons[i][0] - yearStart]++;
        years[persons[i][1] - yearStart]--;
    }

    // go through and find the maximum
    int max = 0;
    int count = 0;
    for (int i = 0; i < years.length; i++) {
        count += years[i];
        max = Math.max(max, count);
    }

    return max;
}
```
* Time complexity: $O(n+y)$, n is the number of persons, y is the year range.
* Space complexity: $O(y)$, y is the year range.

## 3. Classic Problems
* [LintCode 391 - Number of Airplanes in the Sky](https://www.lintcode.com/problem/number-of-airplanes-in-the-sky/)
* [LeetCode 218 - The Skyline Problem](https://leetcode.com/problems/the-skyline-problem/)

## 4. Source Files
* [Source files for Sweep Line on GitHub](https://github.com/jojozhuang/dsa-java/tree/master/alg-sweep-line)
* [Sweep Line Diagrams(draw.io) in Google Drive](https://drive.google.com/file/d/1qh2nqRorRfF4H89DP94aU3SeywZvI17C/view?usp=sharing)

## 5. References
* [Line Sweep Technique](https://www.hackerearth.com/practice/math/geometry/line-sweep-technique/tutorial/)
* [Line Segment Intersection](https://www.youtube.com/watch?v=dePDHVovJlE)
* [The Skyline Problem at LeetCode](https://leetcode.com/problems/the-skyline-problem/)
* [The skyline problem](https://briangordon.github.io/2014/08/the-skyline-problem.html)
