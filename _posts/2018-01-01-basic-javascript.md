---
layout: post
key: blog
title: "Basic JavaScript[Draft]"
date: 2018-01-01
tags: [JavaScript]
---

> All about javascript.

https://developer.mozilla.org/en-US/docs/Web/JavaScript

https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/JavaScript_basics

data types
Variable	Explanation	Example
String	A sequence of text known as a string. To signify that the value is a string, you must enclose it in quote marks.	var myVariable = 'Bob';
Number	A number. Numbers don't have quotes around them.	var myVariable = 10;
Boolean	A True/False value. The words true and false are special keywords in JS, and don't need quotes.	var myVariable = true;
Array	A structure that allows you to store multiple values in one single reference.	var myVariable = [1,'Bob','Steve',10];
Refer to each member of the array like this:
myVariable[0], myVariable[1], etc.
Object	Basically, anything. Everything in JavaScript is an object, and can be stored in a variable. Keep this in mind as you learn.	var myVariable = document.querySelector('h1');
All of the above examples too.

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures
Data types
The latest ECMAScript standard defines seven data types:

Six data types that are primitives:
Boolean
Null
Undefined
Number
String
Symbol (new in ECMAScript 6)
and Object

Ebook: Angular 5 Projects
http://www.allitebooks.in/angular-5-projects/







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

## 18. HTTP and the HttpClient Module

## 19. Forms
The Forms module offers two main way of working with forms: template-driven forms and reactive forms. Both ways work with the same Forms module.
### 19.1 Template-Driven Forms
* Advantages: Simple, quick to get started, perfect for simple forms, don’t need to know how form model objects work
* Disadvantages: HTML and business rules are coupled, no unit testing
example
```html
aaa
```
### 19.2 Reactive Forms
* Advantages: More control, perfect for more advanced forms, enable unit testing, HTML and business rules are decoupled
* Disadvantages: Need to know how form model objects work, take more time to develop
example
```html
aaa
```

Reactive Forms: FormBuilder
FormBuilder Methods

 Method    | Purpose               | Arguments  | Returns
-----------|-----------------------|------------|--------------------------------------------------------
group      | Create a form group   | Configuration object, extra parameters (validators, async validators) | FormGroup
control    | Create a form control | Current form state (value/disabled status), array of validators, array of async validators | FormControl
array      | Create a form array   | Configuration object (array), validator, async validator | FormArray


## 20. Pipes
### 20.1 Angular Pipes
lowercase
Lowercase: {{ "The Quick Brown Fox Jumped Over The Lazy Dogs" | lowercase }}
Produces:
Lowercase: the quick brown fox jumped over the lazy dogs
uppercase
Uppercase: {{ "The Quick Brown Fox Jumped Over The Lazy Dogs" | uppercase }}
Produces:
Uppercase: THE QUICK BROWN FOX JUMPED OVER THE LAZY DOGS

Currency: {{ 2012.55 | currency }}
Produces:
Currency: USD2,012.55

UK (gbp) pound currency
```raw
UK Pound Currency:  2012.55 | currency: 'gbp':true
```
Produces:
UK Pound Currency: £2,012.55
percent
Percentage: {{ 0.5 | percent }}
Produces:
Percentage: 50%
date
```raw
Date: {\{ dt | date \}}
```
Produces:
Date: Jul 12, 2017
shortdate
Short Date: {{ dt | date:shortdate }}
Produces:
Short Date: Jul 12, 2017
Special Date Format
Special Date Format: {{ dt | date:'yMMMMEEEEd' }}
Produces:
Special Date Format: Wednesday, July 12, 2017
Table 20-1.
Name
medium
short
fullDate
longDate
mediumDate
shortDate
mediumTime
shortTime
Predefined Date Formats
Chapter 20
pipes
   Format
yMMMdjms yMdjm yMMMMeeeed yMMMMd yMMMd
yMd jms jm
Example (English/US)
sep 3, 2010, 12:05:08 pM 9/3/2010, 12:05 pM Friday, september 3, 2010 september 3, 2010
sep 3, 2010 9/3/2010 12:05:08 pM 12:05 pM


json
```raw
{\{customerName: 'Mark', 'address': '2312 welton av 30333'\} \| json }
Produces:
{ "customerName": "Mark", "address": "2312 welton av 30333" }
```
### 20.2 Custom Pipes
```sh
ng generate pipe reverse
```

Todo: create pipe for time date, create pipe for shorten the description in table.


## 21. Zones and Change Detection
### 21.1 NgZone Is Zone.js for Angular
The `NgZone` class is a wrapper around the `zone.js` framework. The dependency injector can also pass in the zone through constructor injection.

## 22. Testing
### 22.1 Karma
### 22.2 Jasmine
### 22.3 CLI Unit Test
### 22.4 Use HttpClientTestingModule to Create Fake Http Responses
### 22.5 Testing Service that Uses HttpClient
### 22.6 Testing Component that Uses Service


## 23. More Advanced Topics
### 23.1 View Encapsulation
### 23.2 Shadow DOMs
### 23.3 Component Encapsulation
Encapsulation Option
  Option
ViewEncapsulation.Emulated
ViewEncapsulation.Native
ViewEncapsulation.None
Description
Emulated Shadow DOM, the default mode for Angular Native Shadow DOM
No Shadow DOM at all

### 23.4 Styling Content Children


## 7. Reference
