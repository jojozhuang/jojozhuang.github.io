---
layout: post
key: blog
title: "MathJax Cheat Sheet for Mathematical Notation and Time Complexity"
date: 2018-09-11
tags: [MathJax]
mathjax: true
---

> Cheat sheet for displaying mathematical notations with MathJax.

## 1. MathJax
[MathJax](https://www.mathjax.org/) is a cross-browser JavaScript library that displays mathematical notation in web browsers.
Read tutorial [Using MathJax in Jekyll]({% link _tutorial/githubpages/using-mathjax-in-jekyll.md %}) to learn how to use MathJax in web page and Markdown.

## 2. MathJax Cheat Sheet

Title                   | Formula                 | Markdown
------------------------|-------------------------|--------------------------------------
Variables               | $x_1$, $y_1$, $z_{3,4}$ | `$x_1$, $y_1$, $z_{3,4}$`
Square                  | $a^2$, $x^y$            | `$a^2$, $$x^y$`
Square Root             | $\sqrt{9}$, $\sqrt{x}$  | `$\sqrt{9}$, $\sqrt{x}$`
Factorial               | $n!$                    | `$n!$`
Trigonometric Functions | $\sin\theta$, $\cos\theta$, $\tan\theta$ | `$\sin\theta$, $$\cos\theta$, $\tan\theta$`
Equation                | $x=4$                   | `$x=4$`
Trinomial Equation      | $a^2 + b^2 = c^2$       | `$a^2 + b^2 = c^2$`
Matrix                  | $$\begin{vmatrix}a & b\\c & d\end{vmatrix}=ad-bc$$ | `$$\begin{vmatrix}a & b\\c & d\end{vmatrix}=ad-bc$$`
  | $ x = {-b \pm \sqrt{b^2-4ac} \over 2a} $  | `$ x = {-b \pm \sqrt{b^2-4ac} \over 2a} $`
  | $\sqrt{3x-1}+(1+x)^2$  | `$\sqrt{3x-1}+(1+x)^2$`

* Check [MathJax basic tutorial and quick reference](https://math.meta.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference) for more examples.

## 3. Big O and related notations

Name             | Notation             | Markdown
-----------------|----------------------|-------------------------
Big O [micron]   | $\mathcal{O}$ or $O$ | `$\mathcal{O}$ or $O$`
Big Omega        | $\Omega$             | `$\Omega$`
Big Theta        | $\Theta$             | `$\Theta$`
Small O [micron] | $o$                  | `$o$`
Small Omega      | $\omega$             | `$\omega$`
On the order of  | $\sim$               | `$\sim$`  

## 4. Common Time and Space Complexity

Name             | Running Time  | Markdown
-----------------|---------------|--------------------
Constant Time    | $O(1)$        | `$O(1)$`
Logarithmic Time | $O(\log{}n)$  | `$O(\log{}n)$`
Linear Time      | $O(n)$        | `$O(n)$`
Quasilinear Time | $O(n\log{}n)$ | `$O(n\log{}n)$`
Quadratic Time   | $O(n^2)$      | `$O(n^2)$`
Cubic Time       | $O(n^3)$      | `$O(n^3)$`
Factorial Time   | $O(n!)$       | `$O(n!)$`

## 5. References
* [MathJax basic tutorial and quick reference](https://math.meta.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference)
* [Time complexity - Wikipedia](https://en.wikipedia.org/wiki/Time_complexity)
