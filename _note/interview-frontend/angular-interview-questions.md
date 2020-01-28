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

## 6. References
* [Angular Interview Questions](https://hackr.io/blog/angular-interview-questions)
* [The Ahead-of-Time (AOT) compiler](https://angular.io/guide/aot-compiler)
