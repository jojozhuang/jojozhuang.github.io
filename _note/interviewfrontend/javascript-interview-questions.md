---
layout: tutorial
key: note
title: "Javascript Interview Questions"
index: 9614
category: interview-frontend
breadcrumb: [Note, Interview Questions, Frontend Questions]
image: interview.png
date: 2016-01-14
tags: [Javascript]
---

> Knowledges of front end.

## 1. Overview
* JavaScript is Case Sensitive

```javascript
var carName; // carName = undefined
```
## 1. Where To
### 1.1 The script Tag
In HTML, JavaScript code must be inserted between `<script>` and `</script>` tags.
```html
<script>
    document.getElementById("demo").innerHTML = "My First JavaScript";
</script>
```
Scripts can be placed in the `<body>`, or in the `<head>` section of an HTML page, or in both.

### 1.2 JavaScript Functions and Events
A JavaScript `function` is a block of JavaScript code, that can be executed when "called" for. For example, a function can be called when an `event` occurs, like when the user clicks a button.

### 1.3 External JavaScript
```html
<script src="myScript.js"></script>
<script src="https://www.w3schools.com/js/myScript1.js"></script>
```
You can place an external script reference in `<head>` or `<body>` as you like.

Placing scripts in external files has some advantages:
* It separates HTML and code
* It makes HTML and JavaScript easier to read and maintain
* Cached JavaScript files can speed up page loads

## 2. JavaScript Output
### 2.1 JavaScript Display Possibilities
JavaScript can "display" data in different ways:
* Writing into an HTML element, using `innerHTML`.
* Writing into the HTML output using `document.write()`.
* Writing into an alert box, using `window.alert()`.
* Writing into the browser console, using `console.log()`.

## 3. JavaScript Syntax
### 3.1 JavaScript Values
The JavaScript syntax defines two types of values: Fixed values and variable values. Fixed values are called `literals`. Variable values are called `variables`.

### 3.2 JavaScript Comparison Operators

Operator | Description
---------|--------------
==       | equal to
===      | equal value and equal type
!=       | not equal
!==      | not equal value or not equal type
>        | greater than
<        | less than
>=       | greater than or equal to
<=       | less than or equal to
?        | ternary operator

### 3.3 JavaScript Data Types
When adding a number and a string, JavaScript will treat the number as a string.
```javascript
var x = 16 + 4 + "Volvo"; // x = 20Volvo
var x = "Volvo" + 16 + 4; // x = Volvo164
```
JavaScript Types are Dynamic
```javascript
var x;           // Now x is undefined
x = 5;           // Now x is a Number
x = "John";      // Now x is a String
```
Array and Object
```javascript
var cars = ["Saab", "Volvo", "BMW"]; // arrays are written with square brackets
var person = {firstName:"John", lastName:"Doe", age:50, eyeColor:"blue"}; // JavaScript objects are written with curly braces {}
```
The `typeof` Operator
```javascript
typeof ""             // Returns "string"
typeof "John"         // Returns "string"
typeof "John Doe"     // Returns "string"

typeof 0              // Returns "number"
typeof 314            // Returns "number"
typeof 3.14           // Returns "number"
typeof (3)            // Returns "number"
typeof (3 + 4)        // Returns "number"

// Primitive Data
typeof "John"              // Returns "string"
typeof 3.14                // Returns "number"
typeof true                // Returns "boolean"
typeof false               // Returns "boolean"
typeof x                   // Returns "undefined" (if x has no value)

// Complex Data
typeof {name:'John', age:34} // Returns "object"
typeof [1,2,3,4]             // Returns "object" (not "array", see note below)
typeof null                  // Returns "object"
typeof function myFunc(){}   // Returns "function"
```
In JavaScript, a variable without a value, has the value `undefined`. The type is also `undefined`.
```javascript
var car;    // car = undefined
typeof car  // return undefined
```

An `empty value` has nothing to do with undefined. An empty string has both a legal value and a type.
```javascript
var car = "";    // The value is "", the typeof is "string"
```

### 3.4 JavaScript Functions
Accessing a function without `()` will return the function definition instead of the function result.
```javascript
function toCelsius(f) {
  return (5/9) * (f-32);
}
var c1 = toCelsius(77); // c1 = 25
var c2 = toCelsius;     // c2 = function toCelsius(f) { return (5/9) * (f-32); }
var c2 = toCelsius();   // NaN
```

### 3.5 JavaScript Objects
```javascript
var person = {
  firstName: "John",
  lastName : "Doe",
  id       : 5566,
  fullName : function() {
    return this.firstName + " " + this.lastName;
  }
};
```
### 3.6 JavaScript String Methods
* The `length property` returns the length of a string.
* The `indexOf() method` returns the index of (the position of) the `first` occurrence of a specified text in a string.
* The `lastIndexOf()` method returns the index of the `last` occurrence of a specified text in a string.

```java
var txt = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var sln = txt.length;  // sln = 26

var str = "Please locate where 'locate' occurs!";
var pos1 = str.indexOf("locate");     // pos1 = 7
var pos2 = str.lastIndexOf("locate"); // pos2 = 21
var pos = str.lastIndexOf("John");    // pos = -1, not found
```

Extracting String Parts
There are 3 methods for extracting a part of a string:
* `slice(start, end)`
* `substring(start, end)`
* `substr(start, length)`

* substring() is similar to slice(). The difference is that substring() cannot accept negative indexes.
* substr() is similar to slice(). The difference is that the second parameter specifies the length of the extracted part.

Replacing String Content
```javascript
str = "Please visit Microsoft and Microsoft!";
var n = str.replace("Microsoft", "W3Schools");  // n = Please visit W3Schools and Microsoft!
var n = str.replace(/Microsoft/g, "W3Schools"); // n = Please visit W3Schools and W3Schools!
```
By default, the replace() method replaces only the first match.

Convert String to Character array
```javascript
var str = "Hello";
var arr = str.split("");  // arr = [H,e,l,l,o]
```

### 3.7 JavaScript Scope
In JavaScript there are two types of scope:
* Local scope
* Global scope

If you assign a value to a variable that has not been declared, it will automatically become a `GLOBAL` variable.
A variable declared outside a function, becomes GLOBAL. A global variable has global scope: All scripts and functions on a web page can access it.
```javascript
var carName = "Volvo";
// code here can use carName
function myFunction() {
  // code here can also use carName
}
```

If you assign a value to a variable that has not been declared, it will automatically become a GLOBAL variable. This code example will declare a global variable carName, even if the value is assigned inside a function.
```javascript
myFunction();

// code here can use carName

function myFunction() {
  carName = "Volvo";  // GLOBAL variable
}
```

Global Variables in HTML
With JavaScript, the global scope is the complete JavaScript environment. In HTML, the global scope is the window object. All global variables belong to the `window object`.
```javascript
var carName = "Volvo";

// code here can use window.carName
var name = window.carName; // name = "Volvo"
```
### 3.8 JavaScript Hoisting
`Hoisting` is JavaScript's default behavior of moving all declarations to the top of the current scope (to the top of the current script or the current function). A variable can be declared after it has been used. In other words; a variable can be used before it has been declared.
```javascript
x = 5; // Assign 5 to x

elem = document.getElementById("demo"); // Find an element
elem.innerHTML = x;                     // Display x in the element

var x; // Declare x
```

* Variables and constants declared with `let` or `const` are `not` hoisted!

JavaScript only hoists declarations, `not` initializations.

```javascript
var x = 5; // Initialize x

var summary = "x is " + x + " and y is " + y;  // summary = x is 5 and y is undefined

var y = 7; // Initialize y
```
* y is undefined

### 3.9 JavaScript Use Strict
```javascript
"use strict";
x = 3.14;       // This will cause an error because x is not declared

myFunction();

function myFunction() {
  y = 3.14;   // This will also cause an error because y is not declared
}
```

### 3.10 JavaScript this Keyword
The JavaScript `this` keyword refers to the object it belongs to. It has different values depending on where it is used:
* In a `method`, this refers to the `owner object`.
* Alone, this refers to the `global object`.
* In a `function`, this refers to the `global object`.
* In a `function`, in strict mode, this is `undefined`.
* In an `event`, this refers to the `element` that received the event.
* Methods like call(), and apply() can refer this to `any object`.

### 3.11 JavaScript Closures
```javascript
var add = (function () {
  var counter = 0;
  return function () {counter += 1; return counter}
})();

add();
add();
add();

// the counter is now 3
```
* The variable add is assigned the return value of a `self-invoking` function.
* The self-invoking function only runs once. It sets the counter to zero (0), and returns a function expression.
* This way add becomes a function. The "wonderful" part is that it can access the counter in the parent scope.
* This is called a JavaScript closure. It makes it possible for a function to have `private` variables.
* The counter is protected by the scope of the anonymous function, and can only be changed using the add function.


## 1. Event Bubbling and Capturing
Event bubbling and capturing are two ways of event propagation in the HTML DOM API, when an event occurs in an element inside another element, and both elements have registered a handle for that event. The event propagation mode determines in which order the elements receive the event.
* With bubbling, the event is first captured and handled by the innermost element and then propagated to outer elements.
* With capturing, the event is first captured by the outermost element and propagated to the inner elements.

Capturing is also called "trickling", which helps remember the propagation order:
```sh
trickle down, bubble up
```
Back in the old days, Netscape advocated event capturing, while Microsoft promoted event bubbling. Both are part of the W3C Document Object Model Events standard (2000).

IE < 9 uses only event bubbling, whereas IE9+ and all major browsers support both. On the other hand, the performance of event bubbling may be slightly lower for complex DOMs.

We can use the `addEventListener(type, listener, useCapture)` to register event handlers for in either bubbling (default) or capturing mode. To use the capturing model pass the third argument as true.

Example
```html
<div>
    <ul>
        <li></li>
    </ul>
</div>
```
In the structure above, assume that a click event occurred in the `li` element.

In capturing model, the event will be handled by the `div` first (click event handlers in the div will fire first), then in the `ul`, then at the last in the target element `li`.

In the bubbling model, the opposite will happen: the event will be first handled by the `li`, then by the `ul`, and at last by the `div` element.

### 1.1 Stop Event Bubbling :
If you want to stop the event bubbling, this can be achieved by the use of the `event.stopPropagation()` method. If you want to stop the event flow from event target to top element in DOM, event.stopPropagation() method stops the event to travel to the bottom to top.

## 2. Event delegation
Event delegation is a technique for listening to events where you delegate a parent element as the listener for all of the events that happen inside it.

For example, if you wanted to detect any time any field changed in value inside a specific form, you could do this:
```javascript
var form = document.querySelector('#hogwarts-application');

// Listen for changes to fields inside the form
form.addEventListener('input', function (event) {

    // Log the field that was changed
    console.log(event.target);

}, false);
```

## 3. Class Inheritance vs Prototypal Inheritance

## 6. References
* [JavaScript Tutorial - w3schools](https://www.w3schools.com/js/default.asp)
* [What is event bubbling and capturing?](https://stackoverflow.com/questions/4616694/what-is-event-bubbling-and-capturing)
* [Event delegation](https://javascript.info/event-delegation)
* [What's the difference between JavaScript event delegation, bubbling, and capturing?](https://gomakethings.com/whats-the-difference-between-javascript-event-delegation-bubbling-and-capturing/)
* [What’s the Difference Between Class & Prototypal Inheritance?](https://medium.com/javascript-scene/master-the-javascript-interview-what-s-the-difference-between-class-prototypal-inheritance-e4cd0a7562e9)
