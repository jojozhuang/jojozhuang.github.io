---
layout: tutorial
key: note
title: "Front-End Interview Questions"
index: 111
category: interview-frontend
breadcrumb: [Note, Interview Questions, Frontend Questions]
image: interview.png
date: 2016-01-11
postdate: 2019-01-11
tags: [Html, CSS, javascript]
---

> Knowledges of front end.

## 1. Overview
### 1.1 Basic Knowledge for developing web application
* `HTML` to define the `content` of web pages
* `CSS` to specify the `layout` of web pages
* `JavaScript` to program the `behavior` of web pages

### 1.2 TCP Three-way handshake
* `Step 1 (SYN)` : In the first step, client wants to establish a connection with server, so it sends a segment with SYN(Synchronize Sequence Number) which informs server that client is likely to start communication and with what sequence number it starts segments with
* `Step 2 (SYN + ACK)`: Server responds to the client request with SYN-ACK signal bits set. Acknowledgement(ACK) signifies the response of segment it received and SYN signifies with what sequence number it is likely to start the segments with
* `Step 3 (ACK)` : In the final part client acknowledges the response of server and they both establish a reliable connection with which they will start eh actual data transfer

### 1.3 HTTP Status Code
* `1xx` - indicates an informational message only
* `2xx` - indicates success of some kind
* `3xx` - redirects the client to another URL
* `4xx` - indicates an error on the client’s part
* `5xx` - indicates an error on the server’s part

## 1. HTML
## 2. CSS
### 2.1 What is the use of ruleset?
The `ruleset` is used to identify that selectors can be attached with other selectors. It has two parts:
* `Selector` - Selector indicates the HTML element you want to style.
* `Declaration Block` - The declaration block can contain one or more declarations separated by a semicolon.

![image](/public/images/note/front-end-css/selector.gif){:width="500px"}  

### 2.2 Individual Sides
In CSS, there are also properties for specifying each of the borders (`top, right, bottom, and left`).

If the border-style property has four values:
```css
p {
    border-style: dotted solid double dashed;
}
```
* top border is dotted
* right border is solid
* bottom border is double
* left border is dashed

If the border-style property has three values:
```css
p {
    border-style: dotted solid double;
}
```
* top border is dotted
* right and left borders are solid
* bottom border is double

If the border-style property has two values:
```css
p {
    border-style: dotted solid;
}
```
* top and bottom borders are dotted
* right and left borders are solid

If the border-style property has one value:
```css
p {
    border-style: dotted;
}
```
* all four borders are dotted

## 3. Javascript
### 3.1 Difference of undefined, empty values and null
```javascript
var car;              // Value is undefined, type is undefined
var car = "";         // The value is "", the typeof is "string"

var person = {firstName:"John", lastName:"Doe", age:50, eyeColor:"blue"};
person = null;        // Now value is null, but type is still an object
person = undefined;   // Now both value and type is undefined

typeof undefined      // undefined
typeof null           // object

null === undefined    // false
null == undefined     // true
```
* `undefined` and `null` are equal in value but different in type.

### 3.2 Global Variable
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
### 3.3 JavaScript Hoisting
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

### 3.4 ECMAScript 5 Features
These were the new features released in 2009:
* The "use strict" Directive
* String.trim()
* Array.isArray()
* Array.forEach()
* Array.map()
* Array.filter()
* Array.reduce()
* Array.reduceRight()
* Array.every()
* Array.some()
* Array.indexOf()
* Array.lastIndexOf()
* JSON.parse()
* JSON.stringify()
* Date.now()
* Property Getters and Setters
* New Object Property Methods

### 3.5 ECMAScript 6
ECMAScript 6 is also known as ES6 and ECMAScript 2015.

This chapter will introduce some of the new features in ES6.
* JavaScript `let`
* JavaScript `const`
* Exponentiation (\*\*)
* Default parameter values
* Array.find()
* Array.findIndex()

```javascript
var x = 5;
var z = x ** 2;          // result is 25, same as Math.pow(5,2):

```

### 3.6 Javascript BOM
`BOM` stands for `Browser Object Model`. It provides interaction with the browser. The default object of a browser is a window. So, you can call all the functions of the window by specifying the window or directly. The window object provides various properties like document, history, screen, navigator, location.

![image](/public/images/note/front-end-interview-questions/javascript_bom.png){:width="800px"}  

### 3.7 HTML DOM
When a web page is loaded, the browser creates a `Document Object Model` of the page. The HTML DOM is an Object Model for HTML. It defines:
* HTML elements as objects
* Properties for all HTML elements
* Methods for all HTML elements
* Events for all HTML elements

The HTML DOM is an API (Programming Interface) for JavaScript:
* JavaScript can add/change/remove HTML elements
* JavaScript can add/change/remove HTML attributes
* JavaScript can add/change/remove CSS styles
* JavaScript can react to HTML events
* JavaScript can add/change/remove HTML events

The HTML DOM Tree of Objects
![image](/public/images/note/front-end-interview-questions/html_dom.gif){:width="650px"}  

### 3.8 Popup Dialog in Window

Method       | Description
-------------|------------------------------------------------------------------------------------------------
alert()      | displays the alert box containing the message with ok button.
confirm()    | displays the confirm dialog box containing the message with ok and cancel button.
prompt()     | displays a dialog box to get input from the user.
open()       | opens the new window.
close()      | closes the current window.
setTimeout() | performs the action after specified time like calling function, evaluating expressions.

### 3.9 history object
* `history.back()` - It loads the previous page.
* `history.forward()` - It loads the next page.
* `history.go(number)` - The number may be positive for forward, negative for backward. It loads the given page number.

### 3.10 Debug
To perform debugging, we can use any of the following approaches:
* Using `console.log()` method
* Using `debugger` keyword

## 4. Questions
### 4.1 How to show text in the center of the page?
1) You can set the margin property to `auto` to horizontally center the element within its container.
```html
<!DOCTYPE html>
<html>
<head>
<style>

div {
  width: 100%;
  margin: auto;
  border: 1px solid red;
  text-align: center;
}

</style>
</head>
<body>

<div>Column 1</div>

</body>
</html>
```
2) Create three columns with three div tags and set 'text-align: center;'.
```html
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
* {
  box-sizing: border-box;
}

div {
  width: 33%;
  float: left;
  padding: 15px;
  border: 1px solid red;
  text-align: center;
}

</style>
</head>
<body>


<div>Column 1</div>
<div>Column 2</div>
<div>Column 3</div>

</body>
</html>
```
### 4.2 What is RWD?
`RWD` stands for `Responsive Web Design`. This technique is used to display the designed page perfectly on every screen size and device, for example, mobile, tablet, desktop and laptop. You don't need to create a different page for each device.
### 4.3 What are the benefits of CSS sprites?
If a web page has a large number of images that take a longer time to load because each image separately sends out an HTTP request. The concept of CSS sprites is used to reduce the loading time for a web page because it combines the various small images into one image. It `reduces` the number of HTTP requests and hence the loading time.
### 4.4 CSS Box Model
The CSS box model is essentially a box that wraps around every HTML element. It consists of: margins, borders, padding, and the actual content. The image below illustrates the box model:
![image](/public/images/note/front-end-css/box_model.css){:width="500px"}  
* `Content` - The content of the box, where text and images appear
* `Padding` - Clears an area around the content. The padding is transparent
* `Border` - A border that goes around the padding and content
* `Margin` - Clears an area outside the border. The margin is transparent

### 4.5 Explain the difference between visibility: hidden and display: none?
* `visibility: hidden` hides the element, but it occupies space and affects the layout of the document.
* `display: none` also hides the element but doesn't occupy space. It will not affect the layout of the document.

### 4.6 Is it possible to change the color of the bullet?
The color of the bullet is always the color of the `first text` of the list. So, if you want to change the color of the bullet, you must change the color of the text.

### 4.7 Explain the layout of HTML?
HTML layout specifies a way in which the web page is arranged.
![image](/public/images/note/front-end-html/html_layout.png){:width="200px"}  
* `<header>` - Defines a header for a document or a section
* `<nav>` - Defines a container for navigation links
* `<section>` - Defines a section in a document
* `<article>` - Defines an independent self-contained article
* `<aside>` - Defines content aside from the content (like a sidebar)
* `<footer>` - Defines a footer for a document or a section
* `<details>` - Defines additional details
* `<summary>` - Defines a heading for the details element


## 5. Node.js
### 5.1 What is Event Loop?
Node.js is a `single threaded` application but it support concurrency via concept of `event and callbacks`. As every API of Node.js are asynchronous and being a single thread, it uses async function calls to maintain the concurrency. Node uses `observer` pattern. Node thread keeps an event loop and whenever any task get completed, it fires the corresponding event which signals the event listener function to get executed.
### 5.2 What are the features of Node.js?
Node.js is a single-threaded but highly scalable system that utilizes JavaScript as its scripting language. It uses asynchronous, event-driven I/O instead of separate processes or threads. It is able to achieve high output via single-threaded event loop and non-blocking I/O.


## 6. References
* [CSS Interview Questions](https://www.javatpoint.com/css-interview-questions)
