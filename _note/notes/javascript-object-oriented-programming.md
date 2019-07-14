---
layout: tutorial
key: note
title: "JavaScript object oriented programming(Online Doc)"
index: 9132
category: notes
date: 2016-06-12
tags: [Javascript OO]
---

> Nodts for javascript


JavaScript basics
getElementById
getElementsByClassName
querySelector : Returns the first matching Element node
querySelectorAll : Returns a NodeList containing all matching Element

Introduction to Object-Oriented JavaScript
Prototype-based programming is an OOP model that doesn't use classes, but rather it first accomplishes the behavior of any class and then reuses it (equivalent to inheritance in class-based languages) by decorating (or expanding upon) existing prototype objects.

JavaScript object oriented programming
Namespace
In JavaScript a namespace is just another object containing methods, properties, and objects.
// global namespace
var MYAPP = MYAPP || {}; //first checked whether MYAPP is already defined. If yes, then use the existing MYAPP global object, otherwise create an empty object called MYAPP.

// sub namespace
MYAPP.event = {};

// Create container called MYAPP.commonMethod for common method and properties
MYAPP.commonMethod = {
  regExForName: "", // define regex for name validation
  regExForPhone: "", // define regex for phone no validation
  validateName: function(name){
    // Do something with name, you can access regExForName variable
    // using "this.regExForName"
  },

  validatePhoneNo: function(phoneNo){
    // do something with phone number
  }
}

// Object together with the method declarations
MYAPP.event = {
    addListener: function(el, type, fn) {
    // code stuff
    },
    removeListener: function(el, type, fn) {
    // code stuff
    },
    getEvent: function(e) {
    // code stuff
    }

    // Can add another method and properties
}

// Syntax for Using addListener method:
MYAPP.event.addListener("yourel", "type", callback);

Custom objects
var Person = function () {}; // create 'class', actually, a function
var person1 = new Person(); // create instances for the 'class'
var person2 = new Person();

//The constructor
var Person = function () {
  console.log('instance created');
};
//The property
var Person = function (firstName) {
  this.firstName = firstName;
  console.log('Person instantiated');
};
//The methods
In JavaScript methods are regular function objects bound to an object as a property.
var Person = function (firstName) {
  this.firstName = firstName;
};

Person.prototype.sayHello = function() {
  console.log("Hello, I'm " + this.firstName);
};

//Inheritance
In JavaScript you do this by assigning an instance of the parent class to the child class, and then specializing it.

A re-introduction to JavaScript (JS tutorial)
Numbers
parseInt
Always specify a radix to avoid this unreliable behavior.
parseInt("123", 10); // 123
parseInt("11", 2); // 3
parseInt("15,123", 10); //15, only take the first several numbers
parseInt("hello", 10); // NaN, If the first character cannot be converted to a number, parseInt returns NaN.

1 / 0; //  Infinity
-1 / 0; // -Infinity

boolean type
Any value can be converted to a boolean according to the following rules:
1. false, 0, empty strings (""), NaN, null, and undefined all become false.
2. All other values become true
1 == true; // true
1 === true;    // false

Objects
JavaScript objects can be thought of as simple collections of name-value pairs. As such, they are similar to HashMaps in Java.
var obj = {
  name: "Carrot",
  "for": "Max", // for is reserved in javascript, need double quotes
  details: {
    color: "orange",
    size: 12
  }
}
obj.details.color; // orange
obj["details"]["size"]; // 12

obj.for = "Simon"; // Syntax error, because 'for' is a reserved word
obj["for"] = "Simon"; // works fine

Arrays
Arrays in JavaScript are actually a special type of object, but they have one magic property called 'length'.
var a = ["dog", "cat", "hen"];
a.length; // 3
a[100] = "fox";
a.length; // 101
typeof a[90]; // undefined

for (var i = 0; i < a.length; i++) {
  // Do something with a[i]
}

You can iterate over an array using a for...in loop. Note that if someone added new properties to Array.prototype, they will also be iterated over by this loop.  Therefore this method is "not" recommended.

Functions
function add(x, y) {
  var total = x + y;
  return total;
}
add(3,4) // return 7
add(); // NaN, You can't perform addition on undefined
add(2, 3, 4); // 5 , added the first two; 4 was ignored

Functions that are designed to be called by new are called constructor functions.
this, new

inner function
Closures
A closure is the combination of a function and the scope object in which it was created. Closures let you save state — as such, they can often be used in place of objects.

Closures
Lexical scoping

Advanced-Inheritance and the prototype chain
Inheritance with the prototype chain
Inheriting properties

function Person(a, b) {
  this.a = a;
  this.b = b;
}
var o = new Person(1,2); // o = {a:1, b:2};
Person.prototype.b = 3;//
Person.prototype.c = 4;// o.prototype = {b:3, c:4};
//the full prototype chain looks like:
// {a:1, b:2} ---> {b:3, c:4} ---> null

console.log(o.a); // 1
console.log(o.b); // 2
// Is there a 'b' own property on o? Yes, and its value is 2.
// The prototype also has a 'b' property, but it's not visited.
// This is called "property shadowing"
console.log(o.c); // 4
console.log(o.d); // undefined

this reference
var o = {
  a: 2,
  m: function(b){
    return this.a + 1;
  }
};

console.log(o.m()); // 3
// When calling o.m in this case, 'this' refers to o

var p = Object.create(o);
// p is an object that inherits from o

p.a = 12; // creates an own property 'a' on p
console.log(p.m()); // 13
// when p.m is called, 'this' refers to p.
// So when p inherits the function m of o,
// 'this.a' means p.a, the own property 'a' of p

Advanced-Strict mode
Advanced-JavaScript typed arrays
Buffers and views
ArrayBuffer
Web APIs using typed arraysEDIT

- FileReader.prototype.readAsArrayBuffer()
- XMLHttpRequest.prototype.send()
- ImageData.data

Advanced- SIMD types
Advanced- Memory Management
Garbage collection
Reference-counting algorithm
Limitation: cycles

Mark-and-sweep algorithm
Periodically, the garbage-collector will start from these roots, find all objects that are referenced from these roots, then all objects referenced from these, etc. Starting from the roots, the garbage collector will thus find all reachable objects and collect all non-reachable objects.

Advanced- Concurrency model and Event Loop
