---
layout: tutorial
key: tutorial
title: "Angular - Observable and Reactive Programming - Draft"
index: 8304
subcategory: angular-tutorial
date: 2018-03-17
tags: [Observable]
draft: true
---

> Learn Observable and Reactive programs in Angular application.

## 16. Observers, Reactive Programming, and RxJS
Reactive Extensions for JavaScript (RxJS) is a Reactive streams library that allows you to work with asynchronous data streams.

`Reactive programming` is a programming paradigm focused on data flows and change. It allows you to express static or dynamic data flows with ease, and the execution model will automatically propagate changes through the data flow.

## 17. RxJS with Angular
Observables have a few advantages over promises:
• Promises only emitted one value/error. Observables can emit multiple values over time. For example, with an observable you can listen for events on a web socket for a period of time. You can only listen once with a promise.
• You can use operators with observers to map, filter, and more.
• You can cancel observables.

• Angular uses observables for handling DOM events and the results of HTTP service calls (calling an HTTP service on a server and receiving the result).
• Observables enable the user to handle streams of data using RxJS. For example, you could make an HTTP call to get some data and use the RxJS map operator to transform the result.

## 5. References
* [Book - Angular 5 Projects](https://www.amazon.com/Angular-Projects-Learn-Single-Applications/dp/148423278X)
* [Angular Doc - Routing & Navigation](https://angular.io/guide/router)
