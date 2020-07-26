---
layout: tutorial
key: tutorial
title: "Creating Data Structure Diagrams with Mermaid"
index: 9723
subcategory: uncategorized
date: 2018-09-16
tags: [Mermaid, Tree]
mermaid: true
---

> Common Data Structures drawn with Mermaid.

## 1. Tree
### 1.1 General Tree
<div class="mermaid">
graph TB
    A((1))-->B((2))
    A-->C((3))
    A-->D((4))
    B-->E((5))
    B-->F((6))
    B-->G((7))
    C-->H((8))
    D-->I((9))
    D-->J((10))
</div>
~~~markdown
graph TB
    A((1))-->B((2))
    A-->C((3))
    A-->D((4))
    B-->E((5))
    B-->F((6))
    B-->G((7))
    C-->H((8))
    D-->I((9))
    D-->J((10))
~~~

### 1.2 Binary Tree
<div class="mermaid">
graph TB;
    A((1))-->B((2))
    A-->C((3));
    B-->E((4))
    B-->F((5))
    C-->H((6))
    C-->I((7))
</div>
~~~markdown
graph TB;
    A((1))-->B((2))
    A-->C((3));
    B-->E((4))
    B-->F((5))
    C-->H((6))
    C-->I((7))
~~~
### 1.3 Binary Search Tree
<div class="mermaid">
graph TB;
    A((8))-->B((3))
    A-->C((10))
    B-->D((1))
    B-->E((6))
    C-->F((9))
    C-->G((14))
    E-->H((4))
    E-->I((7))
</div>
~~~markdown
graph TB;
    A((8))-->B((3))
    A-->C((10))
    B-->D((1))
    B-->E((6))
    C-->F((9))
    C-->G((14))
    E-->H((4))
    E-->I((7))
~~~
### 1.4 Balanced Tree
<div class="mermaid">
graph TB;
    A((3))-->B((9))
    A-->C((20))
    C-->D((15))
    C-->E((7))
</div>
~~~markdown
graph TB;
    A((3))-->B((9))
    A-->C((20))
    C-->D((15))
    C-->E((7))
~~~
The following tree is not balanced.
<div class="mermaid">
graph TB;
    A((1))-->B((2))
    A-->C((2))
    B-->D((3))
    B-->E((3))
    D-->F((4))
    D-->G((4))
</div>
### 1.5 Complete Binary Tree
~~~markdown
graph TB
    A((1))-->B((2))
    A-->C((3))
    B-->D((4))
    B-->E((5))
    C-->F((6))
    C-->G((7))
    D-->H((8))
    D-->I((9))
    E-->J((10))
~~~
<div class="mermaid">
graph TB
    A((1))-->B((2))
    A-->C((3))
    B-->D((4))
    B-->E((5))
    C-->F((6))
    C-->G((7))
    D-->H((8))
    D-->I((9))
    E-->J((10))
</div>
### 1.6 Full Binary Tree
~~~markdown
graph TB
    A((1))-->B((2))
    A-->C((3))
    B-->D((4))
    B-->E((5))
    C-->F((6))
    C-->G((7))
    D-->H((8))
    D-->I((9))
    F-->J((10))
    F-->K((11))
~~~
<div class="mermaid">
graph TB
    A((1))-->B((2))
    A-->C((3))
    B-->D((4))
    B-->E((5))
    C-->F((6))
    C-->G((7))
    D-->H((8))
    D-->I((9))
    F-->J((10))
    F-->K((11))
</div>
### 1.7 Perfect Binary Tree
~~~markdown
graph TB
    A((1))-->B((2))
    A-->C((3))
    B-->D((4))
    B-->E((5))
    C-->F((6))
    C-->G((7))
    D-->H((8))
    D-->I((9))
    E-->J((10))
    E-->K((11))
    F-->L((12))
    F-->M((13))
    G-->N((14))
    G-->O((15))
~~~
<div class="mermaid">
graph TB
    A((1))-->B((2))
    A-->C((3))
    B-->D((4))
    B-->E((5))
    C-->F((6))
    C-->G((7))
    D-->H((8))
    D-->I((9))
    E-->J((10))
    E-->K((11))
    F-->L((12))
    F-->M((13))
    G-->N((14))
    G-->O((15))
</div>

## 9. References
* [Mermaid Documentation](https://mermaidjs.github.io/)
* [Mermaid Live Editor](https://mermaidjs.github.io/mermaid-live-editor)
