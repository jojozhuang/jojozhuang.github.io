---
layout: tutorial
key: note
title: "Angular Interview Questions"
index: 9615
subcategory: interview-frontend
date: 2020-01-25
tags: [Angular]
---

> Knowledges of angular.

## 1. Overview
### 1.1 Difference of Versions
### 1.2 Core Features
AOT Compilation:

Angular offers two ways to compile your application:
* Just-in-Time (JIT), which compiles your app in the browser at runtime.
* Ahead-of-Time (AOT), which compiles your app at build time.

IT compilation is the default when you run the ng build (build only) or ng serve (build and serve locally) CLI commands:
```sh
ng build
ng serve
```
For AOT compilation, include the --aot option with the ng build or ng serve command:
```sh
ng build --aot
ng serve --aot
```

## 2. Comparison
### 2.1 What Are The Differences Between Angular And React?
1) Framework Vs. Library  
Angular is a complete framework while React is a JavaScript Library. Angular uses a two-directional data flow process where it updates the Real DOM directly while React updates only the Virtual DOM and is concerned with the one-directional data flow. While React can be bundled with other programming libraries, Angular is a complete solution in itself. For uni-directional data flow, React needs to be augmented by Redux.

2) Developer's Perspective  
Angular is easy to step up but takes time to deliver projects since it has a steeper learning curve and uses a lot of unnecessary syntax for the simplest things, thus increasing coding time and delaying project deliveries. React takes longer to set up than Angular but lets you create projects and build apps relatively quickly. Plus, you get to add new features with React through different libraries, unlike Angular. React also lacks model and controller components, unlike Angular.

## 6. References
* [Angular Interview Questions](https://hackr.io/blog/angular-interview-questions)
* [The Ahead-of-Time (AOT) compiler](https://angular.io/guide/aot-compiler)
