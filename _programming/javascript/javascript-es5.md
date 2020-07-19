---
layout: tutorial
key: programming
title: "JavaScript - ES5"
index: 2703
subcategory: javascript
date: 2018-03-24
tags: [ES5]
---

> ECMAScript 5 is also known as ES5 and ECMAScript 2009.

## 1. Most Important Features of ES5.
* The "use strict" Directive
* String.trim()
* Array.isArray()
* Array.forEach()
* Array.map()
* Array.filter()
* Array.reduce()
* Array.every()
* Array.indexOf()
* Array.lastIndexOf()
* JSON.parse()

## 2. String.trim()
String.trim() removes whitespace from both sides of a string.
```javascript
var str = "       Hello World!        ";
console.log(str.trim());  // print Hello World!
```
To remove the whitespace in the middle of a string, we need to use 'replace' method with Regular Expression.
```javascript
var str = "       Hello World!        ";
console.log(str.replace(/\s/g, ''));  // print HelloWorld!
```
`\s` is the regex for "whitespace", and `g` is the "global" flag, meaning match ALL \s (whitespaces).

## 3. Array.isArray()
```javascript
var fruits = ["Banana", "Orange", "Apple", "Mango"];
console.log(Array.isArray(fruits)); // print true
```
## 4. Array.forEach()
```javascript
var array1 = ['a', 'b', 'c'];

array1.forEach(function(element) {
  console.log(element);
});

// expected output: "a"
// expected output: "b"
// expected output: "c"
```

## 5. Array.map()
```javascript
var nums = [1, 4, 9, 16];

// pass a function to map
const map = nums.map(x => x * 2);

console.log(map);
// expected output: Array [2, 8, 18, 32]
```

## 6. Array.filter()
```javascript
var words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];

const result = words.filter(word => word.length > 6);

console.log(result);
// expected output: Array ["exuberant", "destruction", "present"]
```

## 7. Array.reduce()
The reduce() method applies a function against an accumulator and each element in the array (from left to right) to reduce it to a single value.
```javascript
const array1 = [1, 2, 3, 4];
const reducer = (accumulator, currentValue) => accumulator + currentValue;

// 1 + 2 + 3 + 4
console.log(array1.reduce(reducer));
// expected output: 10

// 5 + 1 + 2 + 3 + 4
console.log(array1.reduce(reducer, 5));
// expected output: 15
```

## 8. Array.every()
The every() method tests whether all elements in the array pass the test implemented by the provided function.
```javascript
var array1 = [1, 30, 39, 29, 10, 13];

function isBelowThreshold(currentValue) {
  return currentValue < 40;
}

console.log(array1.every(isBelowThreshold));
// expected output: true
```

## 9. Array.indexOf()
The indexOf() method returns the first index at which a given element can be found in the array, or -1 if it is not present.
```javascript
var beasts = ['ant', 'bison', 'camel', 'duck', 'bison'];

console.log(beasts.indexOf('bison'));
// expected output: 1

// start from index 2
console.log(beasts.indexOf('bison', 2));
// expected output: 4

console.log(beasts.indexOf('giraffe'));
// expected output: -1
```

## 10. Array.lastIndexOf()
The lastIndexOf() method returns the last index at which a given element can be found in the array, or -1 if it is not present. The array is searched backwards, starting at fromIndex.
```javascript
var animals = ['Dodo', 'Tiger', 'Penguin', 'Dodo'];

console.log(animals.lastIndexOf('Dodo'));
// expected output: 3

console.log(animals.lastIndexOf('Tiger'));
// expected output: 1
```

## 11. JSON.parse()
JSON.parse() is used to convert the text into a JavaScript object.
```javascript
var str = '{ "name":"John", "age":30, "city":"New York"}';
var obj = JSON.parse('{ "name":"John", "age":30, "city":"New York"}');
console.log(obj.name); // print John
console.log(obj.age);  // print 30
console.log(obj.city); // print New York
```

## 12. Reference
* [ECMAScript 5](https://www.w3schools.com/js/js_es5.asp)
* [Array - Mozilla MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
