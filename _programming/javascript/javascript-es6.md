---
layout: tutorial
key: programming
title: "JavaScript - ES6"
index: 2704
subcategory: javascript
date: 2018-03-25
tags: [ES6]
---

> ECMAScript 6 is also known as ES6 and ECMAScript 2015.

## 1. Constants
```javascript
const TAX = 0.06;
```
## 2. Block Scoped Variables and Functions
var vs let
```javascript
function varTest() {
  var x = 31;
  if (true) {
    var x = 71;  // same variable!
    console.log(x);  // 71
  }
  console.log(x);  // 71
}

function letTest() {
  let x = 31;
  if (true) {
    let x = 71;  // different variable
    console.log(x);  // 71
  }
  console.log(x);  // 31
}
```
## 3. Arrow Functions
```javascript
// ES5
var multiply = function(x, y) {
    return x * y;
}

// ES6
var multiply = (x, y) => { return x * y };
```
## 4. Default Parameter Values
```javascript
function multiply(a = 10, b = 20){
  return a * b;
}
console.log(multiply(1,2));  // print 2
console.log(multiply(1));    // print 20
console.log(multiply());     // print 200
```
## 5. Rest Parameters
```javascript
function multiply(...a){
  var result = 1;
  for (let arg in a){
    result = result * a[arg];
  }
  return result;
}
console.log(multiply(5,6));   // print 30
console.log(multiply(5,6,2)); // print 60
```
## 6. String Interpolation
The interpolation only works with the new quote character \` used for template literals. It doesn't work with strings enclosed in the usual quotes \" and \'.
```javascript
var person = {name: "julie", city: "atlanta"};
console.log(person.name);
// works
console.log(`${person.name} lives in ${person.city}`);
// doesnt work
console.log("${person.name} lives in ${person.city}");
console.log('${person.name} lives in ${person.city}');
```
output
```raw
produces this output:
julie
julie lives in atlanta
${person.name} lives in ${person.city}
${person.name} lives in ${person.city}
```
## 7. Modules
### 7.1 Named Exports
Module js file `mymath.js`
```javascript
export const sqrt = Math.sqrt;

export function square(x) {
    return x * x;
}

export function diag(x, y) {
    return sqrt(square(x) + square(y));
}
```
Usage
```javascript
import { square, diag } from 'mymath';

console.log(square(11)); // print 121
console.log(diag(4, 3)); // print 5
```
### 7.2 Default Exports
Module js file `mymath.js`
```javascript
export default function square(x) {
    return x * x;
}
```
usage, the name `sq` doesn’t match the function in the module. Using default exports allows you to use “nicknames”.
```javascript
import sq from 'mymath';
sq();
```

## 8. Reference
* [ES6 Tutorial](https://www.javascripttutorial.net/es6/)
* [ECMAScript 6 - JavaScript 6](https://www.w3schools.com/js/js_es6.asp)
* [ES6 Javascript: The Complete Developer's Guide](https://www.udemy.com/javascript-es6-tutorial/)
