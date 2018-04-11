---
layout: note
key: note
title: "Javascript In MDN"
index: 202
date: 2016-02-02
category: language
---

A Smarter Way to Learn JavaScript
https://www.amazon.com/Smarter-JavaScript-tech-assisted-approach-requires/dp/1497408180/ref=sr_1_14?s=books&ie=UTF8&qid=1521418986&sr=1-14&keywords=json

> Nodes for javascript

JavaScript has a prototype-based object model instead of the more common class-based object model.

JavaScript is case-sensitive and uses the Unicode character set.

Declarations: var, let, const
var: Declares a variable, optionally initializing it to a value.
let: Declares a block scope local variable, optionally initializing it to a value.
const: Declares a read-only named constant.
if (true) {
  var x = 5;
}
console.log(x);  // 5

if (true) {
  let y = 5;
}
console.log(y);  // ReferenceError: y is not defined

Variable hoisting
console.log(x === undefined); // true
var x = 3;

Same as below:
var x;
console.log(x === undefined); // true
x = 3;

JavaScript only hoists declarations, not initializations.
var x = 5;  // Initialize x
console.log(x+" "+y); // output:5 undefined
var y = 7;  // Initialize y
==>same as
var x = 5; // Initialize x
var y;     // Declare y
console.log(x+" "+y); // output:5 undefined
y = 7;     // Assign 7 to y

Function hoisting
For functions, only function declaration gets hoisted to the top and not the function expression.
// Function declaration //
foo(); // "bar"
function foo() {
  console.log("bar");
}

// Function expression //
baz(); // ReferenceError: baz is not a function
var baz = function() {
  console.log("bar2");
};

Global variables
Global variables are in fact properties of the global object. In web pages the global object is window, so you can set and access global variables using the window.variable syntax.

Constants
const PI = 3.14;
The scope rules for constants are the same as those for let block scope variables. If the const keyword is omitted, the identifier is assumed to represent a variable.
You cannot declare a constant with the same name as a function or variable in the same scope. For example:
// THIS WILL CAUSE AN ERROR
function f() {};
const f = 5;

// THIS WILL CAUSE AN ERROR ALSO
function f() {
  const g = 5;
  var g;

  //statements
}

However, object attributes are not protected, so the following statement is executed without problems.
const MY_OBJECT = {"key": "value"};
MY_OBJECT.key = "otherValue";

Data types
Six data types that are primitives:

- Boolean. true and false.
- null. A special keyword denoting a null value. Because JavaScript is case-sensitive, null is not the same as Null, NULL, or any other variant.
- undefined. A top-level property whose value is undefined.
- Number. 42 or 3.14159.
- String. "Howdy"
- Symbol (new in ECMAScript 2015). A data type whose instances are unique and immutable.

and Object

Data type conversion
x = "The answer is " + 42 // "The answer is 42"
y = 42 + " is the answer" // "42 is the answer"
"37" - 7 // 30, different with  +
"37" + 7 // "377"

Converting strings to numbers
parseInt()
parseFloat()

"1.1" + "1.1" = "1.11.1"
(+"1.1") + (+"1.1") = 2.2
// Note: the parentheses are added for clarity, not required.

Literals
You use literals to represent values in JavaScript. These are fixed values, not variables, that you literally provide in your script. This section describes the following types of literals:

- Array literals
- Boolean literals
- Floating-point literals
- Integers
- Object literals
- RegExp literals
- String literals

Extra commas in array literals
var fish = ["Lion", , "Angel"];
This array has two elements with values and one empty element (fish[0] is "Lion", fish[1] is undefined, and fish[2] is "Angel").

var myList = ['home', , 'school', ]; // three elements, the trailing comma is ignored
var myList = [ , 'home', , 'school']; // four elements
var myList = ['home', , 'school', , ]; // four elements, the last comma is ignored

Boolean literals
Do not confuse the primitive Boolean values true and false with the true and false values of the Boolean object. The Boolean object is a wrapper around the primitive Boolean data type.

Integers
Integers can be expressed in decimal (base 10), hexadecimal (base 16), octal (base 8) and binary (base 2).
0, 117 and -345 (decimal, base 10)
015, 0001 and -0o77 (octal, base 8)
0x1123, 0x00111 and -0xF1A7 (hexadecimal, "hex" or base 16)
0b11, 0b0011 and -0b11 (binary, base 2)

Floating-point literals
3.1415926
-.123456789
-3.1E+12
.1e-23

Object literals
var car = { manyCars: {a: "Saab", "b": "Jeep"}, 7: "Mazda" }; // property can be an object, and property can be a number
console.log(car.manyCars.b); // Jeep
console.log(car[7]); // Mazda

var unusualPropertyNames = {
  "": "An empty string",
  "!": "Bang!"
}
console.log(unusualPropertyNames."");   // SyntaxError: Unexpected string
console.log(unusualPropertyNames[""]);  // An empty string
console.log(unusualPropertyNames.!);    // SyntaxError: Unexpected token !
console.log(unusualPropertyNames["!"]); // Bang!

RegExp literals
var re = /ab+c/;   //A regex literal is a pattern enclosed between slashes.

Control flow and error handling
Conditional statements
Falsy values
The following values evaluate to false (also known as Falsy values):

- false
- undefined
- null
- 0
- NaN
- the empty string ("")

All other values, including all objects, evaluate to true when passed to a conditional statement.
var b = new Boolean(false);
if (b) // this condition evaluates to true
if (b == true) // this condition evaluates to false

throw statement
throw "Error2";   // String type
throw 42;         // Number type
throw true;       // Boolean type
throw {toString: function() { return "I'm an object!"; } };

try...catch statement
try {
  throw "myException"; // generates an exception
}
catch (e) {
  if (e === "myException") {
       // true
  }
}

Loops and iteration
label statement
markLoop:
while (theMark == true) {
   doSomething();
}
The break and the continue statements are the only JavaScript statements that can "jump out of" a code block.
break label;
continue label;

var x = 0;
var z = 0;
labelCancelLoops: while (true) {
  console.log("Outer loops: " + x);
  x += 1;
  z = 1;
  while (true) {
    console.log("Inner loops: " + z);
    z += 1;
    if (z === 10 && x === 10) {
      break labelCancelLoops; // end the outer looper
    } else if (z === 10) {
      break;
    }
  }
}
outer loop: 0~9, inner loop: each time 1~9. Total: 10 x 9.

outer:
for (let i = 0; i < 3; i++)
{
  console.log("outer: i="+ i);
  for (let j = 0; j < 3; j++) // inner loop
    if (j < 2) {
      console.log("inner: j="+ j);
      break; // inner
    }
    else
      continue outer;  // it will go to next iteration of outer loop
}

output:
outer: i=0
inner: j=0
outer: i=1
inner: j=0
outer: i=2
inner: j=0

for...in statement
for...of statement
Object
var person = {fname:"John", lname:"Doe", age:25};

var text = "";
var x;
for (x in person) {
    text += person[x];
}

//text = "John Doe 25"
Array:
While for...in iterates over property names, for...of iterates over property values:
var arr = [3, 5, 7];
arr.foo = "foo";

for (var i in arr) {
   console.log(i); // logs "0", "1", "2", "foo"
}
for (let i of arr) {
   console.log(i); // logs "3", "5", "7"
}

Functions
Functions are objects.

- The name of the function.
- A list of arguments to the function, enclosed in parentheses and separated by commas.
- The JavaScript statements that define the function, enclosed in curly brackets, { }.

Function declarations
function square(number) {
  return number * number;
}
Function expressions
var square = function(number) { return number * number };
var x = square(4) // x gets the value 16

arguments:
Primitive parameters (such as a number) are passed to functions by value; No effect to outside if it is changed insided the function.
Object parameters (such as Array or a user-defined object) are passed to functions by reference; Changes are visible to outside if the properties of the object are changed insided the function.

function myFunc(theObject) {
  theObject.make = "Toyota";
}

var mycar = {make: "Honda", model: "Accord", year: 1998};
var x, y;
x = mycar.make; // x gets the value "Honda"

myFunc(mycar);
y = mycar.make; // y gets the value "Toyota", while x is still "Honda"

// Declare a variable by defining an anonymous function
var square = function(number) { return number * number }; // anonymous function without name
var x = square(4) // x gets the value 16

Function scope
Variables defined inside a function cannot be accessed from anywhere outside the function, because the variable is defined only in the scope of the function. However, a function can access all variables and functions defined inside the scope in which it is defined. In other words, a function defined in the global scope can access all variables defined in the global scope. A function defined inside another function can also access all variables defined in its parent function and any other variable to which the parent function has access.

Scope and the function stack
A function can refer to and call itself. There are three ways for a function to refer to itself:

- the function's name
- arguments.callee
- an in-scope variable that refers to the function

var foo = function bar() {
   // statements go here
};

- bar()
- arguments.callee()
- foo()

Nested functions and closures
The inner function can be accessed only from statements in the outer function.
The inner function forms a closure: the inner function can use the arguments and variables of the outer function, while the outer function cannot use the arguments and variables of the inner function.

function outside(x) {
  function inside(y) {
    return x + y;
  }
  return inside;
}
fn_inside = outside(3); // Think of it like: give me a function that adds 3 to whatever you give it
result = fn_inside(5); // returns 8
result1 = outside(3)(5); // returns 8

Name conflicts
function outside() {
  var x = 10;
  function inside(x) {
    return x;
  }
  return inside;
}
result = outside()(20); // returns 20 instead of 10
The inner-most scope takes the highest precedence, while the outer-most scope takes the lowest. This is the scope chain. The first on the chain is the inner-most scope, and the last is the outer-most scope.

The magical this variable is very tricky in closures. They have to be used carefully, as what this refers to depends completely on where the function was called, rather than where it was defined.

Using the arguments object
function myConcat(separator) {
   var result = ""; // initialize list
   var i;
   // iterate through arguments
   for (i = 1; i < arguments.length; i++) { // attention: start from 1
      result += arguments[i] + separator;  // same as : result += arguments[i] + arguments[0];
   }
   return result;
}
// returns "red, orange, blue, "
myConcat(", ", "red", "orange", "blue");

// returns "elephant; giraffe; lion; cheetah; "
myConcat("; ", "elephant", "giraffe", "lion", "cheetah");

// returns "sage. basil. oregano. pepper. parsley. "
myConcat(". ", "sage", "basil", "oregano", "pepper", "parsley");

Note: The arguments variable is "array-like", but not an array. It is array-like in that is has a numbered index and a length property. However, it does not possess all of the array-manipulation methods.

Function parameters
Default parameters(ECMAScript 6)
//Previously,
function multiply(a, b) {
  b = typeof b !== 'undefined' ?  b : 1;
  return a*b;
}
multiply(5); // 5

// Now, with default value
function multiply(a, b = 1) {
  return a*b;
}
multiply(5); // 5

Rest parameters(ECMAScript 6)
function multiply(multiplier, ...theArgs) {
  return theArgs.map(x => multiplier * x);
}

var arr = multiply(2, 1, 2, 3);
console.log(arr); // [2, 4, 6]

Arrow functions
var a = ["Hydrogen","Helium","Lithium","Beryl­lium"];
var a2 = a.map(function(s){ return s.length }); // [8,6,7,10]
var a3 = a.map( s => s.length ); // same, [8,6,7,10]

Predefined functions
eval(), uneval(), isFinite(), isNaN(), parseFloat(), parseInt(),
decodeURI(), decodeURIComponent(), encodeURI(), encodeURIComponent()
escape(), unescape() (escape is deprecated, use encodeURI or encodeURIComponent instead)

Expressions and operators
Arithmetic operators
Exponentiation operator (**)
2 ** 3 returns 8.
10 ** -1 returns 0.1.

Bitwise operators
a << b //Left shift
a >> b //Sign-propagating right shift, Copies of the leftmost bit are shifted in from the left.
a >>> b // Zero-fill right shift

9 << 2 // result is 36, 1001 -> 100100
9 >> 2 // result is 2, 1001 -> 10
-9 >> 2 // result is -3, 1111...11110111 -> 1111...11111101
19 >>> 2 // result is 4, 10011 -> 100
For non-negative numbers, zero-fill right shift and sign-propagating right shift yield the same result.

Logical operators
var a5 = "Cat" && "Dog";    // t && t returns Dog
var o5 = "Cat" || "Dog";    // t || t returns Cat
var o6 = false || "Cat";    // f || t returns Cat
var o7 = "Cat" || false;    // t || f returns Cat

Unary operators
A unary operation is an operation with only one operand.

delete
You can use the delete operator to delete variables declared implicitly but not those declared with the var statement.
If the delete operator succeeds, it sets the property or element to undefined. The delete operator returns true if the operation is possible; it returns false if the operation is not possible.

delete objectName;
delete objectName.property;
delete objectName[index];
delete property; // legal only within a with statement

x = 42;
var y = 43;
myobj = new Number();
myobj.h = 4;    // create property h
delete x;       // returns true (can delete if declared implicitly)
delete y;       // returns false (cannot delete if declared with var)
delete Math.PI; // returns false (cannot delete predefined properties)
delete myobj.h; // returns true (can delete user-defined properties)
delete myobj;   // returns true (can delete if declared implicitly)

delete array element
var trees = ["redwood", "bay", "cedar", "oak", "maple"];
delete trees[3]; //trees = ["redwood", "bay", "cedar", undefined, "maple"];
if (3 in trees) {
  // this does not get executed
  console.log(3);
}

var trees = ["redwood", "bay", "cedar", "oak", "maple"];
trees[3] = undefined;
if (3 in trees) {
  // this gets executed
}

typeof
Suppose you define the following variables:
var myFun = new Function("5 + 2");
var shape = "round";
var size = 1;
var today = new Date();

typeof myFun;     // returns "function"
typeof shape;     // returns "string"
typeof size;      // returns "number"
typeof today;     // returns "object"
typeof dontExist; // returns "undefined"

typeof true; // returns "boolean"
typeof null; // returns "object"

void
The void operator specifies an expression to be evaluated without returning a value.
The following code creates a hypertext link that does nothing when the user clicks it. When the user clicks the link, void(0) evaluates to undefined, which has no effect in JavaScript.
<a href="javascript:void(0)">Click here to do nothing</a>

The following code creates a hypertext link that submits a form when the user clicks it.
<form action="action_page.php" name="form1">
  <input type="text" name="firstname" value="Mickey">
  <a href="javascript:void(document.form1.submit())">Click here to submit</a>
</form>

Relational operators
in
propNameOrNumber in objectName

// Arrays
var trees = ["redwood", "bay", "cedar", "oak", "maple"];
0 in trees;        // returns true
3 in trees;        // returns true
6 in trees;        // returns false
"bay" in trees;    // returns false (you must specify the index number,
                   // not the value at that index)
"length" in trees; // returns true (length is an Array property)

// built-in objects
"PI" in Math;          // returns true
var myString = new String("coral");
"length" in myString;  // returns true

// Custom objects
var mycar = { make: "Honda", model: "Accord", year: 1998 };
"make" in mycar;  // returns true
"model" in mycar; // returns true

instanceof
objectName instanceof objectType

var theDay = new Date(1995, 12, 17);
if (theDay instanceof Date) {
  // statements to execute
}

Primary expressions
this
Use the this keyword to refer to the current object. In general, this refers to the calling object in a method.
this["propertyName"]
this.propertyName

function validate(obj, lowval, hival){
  if ((obj.value < lowval) || (obj.value > hival))
    console.log("Invalid Value!");
}

<p>Enter a number between 18 and 99:</p>
<input type="text" name="age" size=3 onChange="validate(this, 18, 99);">

Left-hand-side expressions
new, super, Spread operator
var objectName = new objectType([param1, param2, ..., paramN]);
super([arguments]); // calls the parent constructor.
super.functionOnParent([arguments]);

var parts = ['shoulder', 'knees'];
var lyrics = ['head', ...parts, 'and', 'toes'];

function f(x, y, z) { }
var args = [0, 1, 2];
f(...args);

Numbers
decimal, binary, octal, and hexadecimal.

1234567890  // decimal
42 //decimal

// Caution when using leading zeros:
0888 // 888 parsed as decimal
0777 // parsed as octal in non-strict mode (511 in decimal)
Note that decimal literals can start with a zero (0) followed by another decimal digit, but If the next digit after the leading 0 is smaller than 8, the number gets parsed as an octal number.

Octal numbers
var n = 0755; // 493
var m = 0644; // 420

Strict mode in ECMAScript 5 forbids octal syntax. Octal syntax isn't part of ECMAScript 5
var a = 0o10; // ES6: Octal

Number object
var biggestNum = Number.MAX_VALUE;
var smallestNum = Number.MIN_VALUE;
var infiniteNum = Number.POSITIVE_INFINITY;
var negInfiniteNum = Number.NEGATIVE_INFINITY;
var notANum = Number.NaN;

Number.parseFloat()
Number.parseInt()

Math object
Math.abs()
Math.min(), Math.max();
Math.floor(), Math.ceil();
Math.sqrt();

Date object
Date is stored as the number of milliseconds since January 1, 1970, 00:00:00.
var today = new Date();
var endYear = new Date(1995, 11, 31, 23, 59, 59, 999); // Set day and month
endYear.setFullYear(today.getFullYear()); // Set year to this year
var msPerDay = 24 * 60 * 60 * 1000; // Number of milliseconds per day
var daysLeft = (endYear.getTime() - today.getTime()) / msPerDay;
var daysLeft = Math.round(daysLeft); //returns days left in the year

Javascript Clock
function JSClock() {
  var time = new Date();
  var hour = time.getHours();
  var minute = time.getMinutes();
  var second = time.getSeconds();
  var temp = "" + ((hour > 12) ? hour - 12 : hour);
  if (hour == 0)
    temp = "12";
  temp += ((minute < 10) ? ":0" : ":") + minute;
  temp += ((second < 10) ? ":0" : ":") + second;
  temp += (hour >= 12) ? " P.M." : " A.M.";
  return temp;
}

Text formatting
Strings
'\xA9' // "©", Hexadecimal escape sequences
'\u00A9' // "©", Unicode escape sequences

String objects
var s = new String("foo"); // Creates a String object
console.log(s); // Displays: { '0': 'f', '1': 'o', '2': 'o'}
typeof s; // Returns 'object'

var s = new String("foo"); // Creates a String object
console.log(s); // Displays: { '0': 'f', '1': 'o', '2': 'o', length:3, ...},
typeof s; // Returns 'object'

var s1 = "2 + 2"; // Creates a string literal value
var s2 = new String("2 + 2"); // Creates a String object
eval(s1); // Returns the number 4
eval(s2); // Returns the string "2 + 2"

var mystring = "Hello, World!";
var x = mystring.length;

String.charAt()
String.indexOf()
String.startWith()
String.concat()
String.substring(), String.substr()
String.trim();
String.toLowerCase();
String.toUpperCase();

Multi-line template literals
console.log("string text line 1\n\
string text line 2");
console.log(`string text line 1
string text line 2`); //back-tick (` `)

var gasPrice = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 3 });
console.log(gasPrice.format(5.259)); // $5.259

var hanDecimalRMBInChina = new Intl.NumberFormat("zh-CN-u-nu-hanidec", { style: "currency", currency: "CNY" });
console.log(hanDecimalRMBInChina.format(1314.25)); // ￥ 一,三一四.二五

Regular Expressions
var re = /ab+c/;   // better performance
var re = new RegExp("ab+c");  // use constructor function if it may be changed or it only be known at runtime.

var re = /(\w+)\s(\w+)/;
var str = "John Smith";
var newstr = str.replace(re, "$2, $1");
console.log(newstr); //This prints "Smith, John".

Indexed collections
Array object

var arr = new Array(element0, element1, ..., elementN);
var arr = Array(element0, element1, ..., elementN);
var arr = [element0, element1, ..., elementN]; //array literal

The bracket syntax is called an "array literal" or "array initializer."

To create an array with non-zero length, but without any items, either of the following can be used:
var arr = new Array(arrayLength);
var arr = Array(arrayLength);

// This has exactly the same effect
var arr = [];
arr.length = arrayLength; // arrayLength must be a Number, otherwise, it became

non-whole number(整数) whose fractional portion（小数）

var arr = [];
arr[3.4] = "Oranges"; // a property will be created in the object representing the array, instead of an array element
console.log(arr.length);                // 0
console.log(arr.hasOwnProperty(3.4));   // true

var arr = ["one", "two", "three"];
arr[2];  // three
arr["length"];  // 3, access the property

var cats = ['Dusty', 'Misty', 'Twiggy'];
console.log(cats.length); // 3

cats.length = 2;
console.log(cats); // logs "Dusty,Misty" - Twiggy has been removed

cats.length = 0;
console.log(cats); // logs nothing; the cats array is empty

cats.length = 3;
console.log(cats); // [undefined, undefined, undefined]

var array = ['first', 'second', , 'fourth'];
// returns ['first', 'second', 'fourth'];
array.forEach(function(element) { // element is skipped in forEach if it is not listed in the array.
  console.log(element);
})

if(array[2] === undefined) { console.log('array[2] is undefined'); } // true

var array = ['first', 'second', undefined, 'fourth'];
// returns ['first', 'second', undefined, 'fourth']; // little bit different with above
array.forEach(function(element) {
  console.log(element);
})

Issue when using for...in loop on Array.
var arr = [3, 5, , 7];
for (var i in arr) {
   console.log(i); // logs "0", "1", "3"
}

var arr = [3, 5, , 7];
arr[3.5] = "aa";
for (var i in arr) {
   console.log(i); // logs "0", "1", "3", "3.5"
}
It is not advisable to iterate through JavaScript arrays using for...in loops because normal elements and all enumerable properties will be listed.

Instead, use general for loop.
for (var i = 0; i < arr.length; i++) {
  console.log(i); // logs "0", "1", "2", "3"
}
for (var i = 0; i < arr.length; i++) {
  console.log(arr[i]); // logs "3", "5", "undefined", "7"
}

Array methods
var myArray = new Array("1", "2", "3");
myArray = myArray.concat("a", "b", "c"); // myArray is now ["1", "2", "3", "a", "b", "c"]

var myArray = new Array("Wind", "Rain", "Fire");
var list = myArray.join(" - "); // list is "Wind - Rain - Fire"

var myArray = new Array("1", "2");
myArray.push("3"); // myArray is now ["1", "2", "3"]

var myArray = new Array("1", "2", "3");
var last = myArray.pop(); // myArray is now ["1", "2"], removes the last element

var myArray = new Array ("1", "2", "3");
var first = myArray.shift(); // myArray is now ["2", "3"], removes the first element

var myArray = new Array ("1", "2", "3");
myArray.unshift("4", "5"); // myArray becomes ["4", "5", "1", "2", "3"], adds one or more elements to the front of an array

var myArray = new Array ("a", "b", "c", "d", "e");
myArray = myArray.slice(1, 4); // returning [ "b", "c", "d"], start inclusive, end exclusive

var myArray = new Array ("1", "2", "3", "4", "5");
myArray.splice(1, 3, "a", "b", "c", "d"); // myArray is now ["1", "a", "b", "c", "d", "5"], replace 2,3,4 with a,b,c,d

var myArray = new Array ("1", "2", "3");
myArray.reverse();
// transposes the array so that myArray = [ "3", "2", "1" ]

var myArray = new Array("Wind", "Rain", "Fire");
myArray.sort();
// sorts the array so that myArray = [ "Fire", "Rain", "Wind" ]
myArray.sort(comparator);
var comparator = function(a, b){
  return a-b;
}

var a = ['a', 'b', 'a', 'b', 'a'];
console.log(a.indexOf('b')); // logs 1
// Now try again, starting from after the last match
console.log(a.indexOf('b', 2)); // logs 3
console.log(a.indexOf('z')); // logs -1, because 'z' was not found

// forEach callback
var a = ['a', 'b', 'c'];
a.forEach(function(element) { console.log(element);} );
// logs each item in turn

var a1 = ['a', 'b', 'c'];
var a2 = a1.map(function(item) { return item.toUpperCase(); });
console.log(a2); // logs A,B,C

var a1 = ['a', 10, 'b', 20, 'c', 30];
var a2 = a1.filter(function(item) { return typeof item === 'number'; });
console.log(a2); // logs 10,20,30

The callback function is actually called with three arguments. The first is the value of the current item, the second is its array index, and the third is a reference to the array itself.
var arr = [1, 2, 3, 4, 5];
var ar1 = arr.map(function(val, ind, arr){
    console.log("arr[" + ind + "]: " + Math.pow(val,2));
    return val;
});
arr[0]: 1
arr[1]: 4
arr[2]: 9
arr[3]: 16
arr[4]: 25

Typed Arrays
Buffers and views
ArrayBuffer

Keyed collections
Map, WeakMap
ECMAScript 6 introduces a new data structure to map values to values. A Map object is a simple key/value map and can iterate its elements in insertion order.

var sayings = new Map();
sayings.set("dog", "woof");
sayings.set("cat", "meow");
sayings.set("elephant", "toot");
sayings.size; // 3
sayings.get("fox"); // undefined
sayings.has("bird"); // false
sayings.delete("dog");
sayings.has("dog"); // false

for (var [key, value] of sayings) {
  console.log(key + " goes " + value);
}
// "cat goes meow"
// "elephant goes toot"

sayings.clear();
sayings.size; // 0

Set, WeakSet
var mySet = new Set();
mySet.add(1);
mySet.add("some text");
mySet.add("foo");

mySet.has(1); // true
mySet.delete("foo");
mySet.size; // 2

for (let item of mySet) console.log(item);
// 1
// "some text"

Converting between Array and Set
Array.from(mySet);
[...mySet2];
mySet2 = new Set([1,2,3,4]);

Working with objects
Objects overview
var myCar = new Object();
myCar.make = "Ford";
myCar.model = "Mustang";
myCar.year = 1969;

Enumerating all properties of an object
for...in loops, Object.keys(o), Object.getOwnPropertyNames(o)

use for...in loop to iterate all enumerable properties.
function showProps(obj, objName) {
  var result = "";
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      result += objName + "." + i + " = " + obj[i] + "\n";
    }
  }
  return result;
}
myCar.make = Ford
myCar.model = Mustang
myCar.year = 1969

Creating new objects
1) Using object initializers
var myHonda = {color: "red", wheels: 4, engine: {cylinders: 4, size: 2.2}};

2) Using a constructor function
function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
}
var mycar = new Car("Eagle", "Talon TSi", 1993);

3) Using the Object.create method
// Animal properties and method encapsulation
var Animal = {
  type: "Invertebrates", // Default value of properties
  displayType : function() {  // Method which will display type of Animal
    console.log(this.type);
  }
}

// Create new animal type called animal1
var animal1 = Object.create(Animal);
animal1.displayType(); // Output:Invertebrates

// Create new animal type called Fishes
var fish = Object.create(Animal);
fish.type = "Fishes";
fish.displayType(); // Output:Fishes

Using this for object references
Deleting properties

// Creates a new object, myobj, with two properties, a and b.
var myobj = new Object;
myobj.a = 5;
myobj.b = 12;

// Removes the a property, leaving myobj with only the b property.
delete myobj.a;
console.log ("a" in myobj) // yields "false"

//delete a global variable
g = 17;
delete g;

Comparing Objects
In JavaScript objects are a reference type. Two distinct objects are never equal, even if they have the same properties. Only comparing the same object reference with itself yields true.

// Two variables, two distinct objects with the same properties
var fruit = {name: "apple"};
var fruitbear = {name: "apple"};

fruit == fruitbear // return false
fruit === fruitbear // return false
// Two variables, a single object
var fruit = {name: "apple"};
var fruitbear = fruit;  // assign fruit object reference to fruitbear

// here fruit and fruitbear are pointing to same object
fruit == fruitbear // return true
fruit === fruitbear // return true

Details of the object model
Class-based(java) vs. prototype-based languages(javascript)
JavaScript does not have difference of technical meaning between classes and instances.

Iterators and generators

- Iteration protocols
- for...of
- function* and Generator
- yield and yield*

Iterators
function makeIterator(array){
    var nextIndex = 0;
    return {
       next: function(){
           return nextIndex < array.length ?
               {value: array[nextIndex++], done: false} :
               {done: true};
       }
    }
}

var it = makeIterator(['yo', 'ya']);
console.log(it.next().value); // 'yo'
console.log(it.next().value); // 'ya'
console.log(it.next().done);  // true

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

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Introduction
