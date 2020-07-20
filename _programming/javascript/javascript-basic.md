---
layout: tutorial
key: programming
title: "JavaScript - Basic"
index: 2701
subcategory: javascript
date: 2018-03-21
tags: [JavaScript]
---

> Basic knowledge of JavaScript.

## 1. Introduction
* JavaScript has a **prototype-based** object model instead of the more common class-based object model.
* JavaScript is case-sensitive and uses the Unicode character set.

## 2. Grammar and types
### 2.1 Declarations
* var: Declares a variable, optionally initializing it to a value.
* let: Declares a block-scoped, local variable, optionally initializing it to a value.
* const: Declares a block-scoped, read-only named constant.

**Variable scope**
```javascript
if (true) {
  var x = 5;
}
console.log(x);  // 5

if (true) {
  let y = 5;
}
console.log(y);  // ReferenceError: y is not defined
```
**Variable hoisting**
```javascript
console.log(x === undefined); // true
var x = 3;

//Same as below:
var x;
console.log(x === undefined); // true
x = 3;
```
let behaves differently
```javascript
console.log(x); // ReferenceError
let x = 3;
````

JavaScript only hoists declarations, not initializations.
```javascript
var x = 5;             // Initialize x
console.log(x+" "+y);  // output:5 undefined
var y = 7;             // Initialize y

//==>same as
var x = 5;             // Initialize x
var y;                 // Declare y
console.log(x+" "+y);  // output:5 undefined
y = 7;                 // Assign 7 to y
```

**Function hoisting**  
For functions, only function declaration gets hoisted to the top and not the function expression.
```javascript
/* Function declaration */
foo(); // "bar"
function foo() {
  console.log('bar');
}

/* Function expression */
baz(); // TypeError: baz is not a function

var baz = function() {
  console.log('bar2');
};
```

**Global variables**  
Global variables are in fact properties of the *global object*. In web pages, the global object is window, so you can set and access global variables using the `window.variable` syntax.

**Constants**
```javascript
const PI = 3.14;
```
The scope rules for constants are the same as those for `let` block scope variables. If the `const` keyword is omitted, the identifier is assumed to represent a variable.

You cannot declare a constant with the same name as a function or variable in the same scope. For example:
```javascript
// THIS WILL CAUSE AN ERROR
function f() {};
const f = 5;

// THIS WILL CAUSE AN ERROR ALSO
function f() {
  const g = 5;
  var g;

  //statements
}
```
However, object attributes are not protected, so the following statement is executed without problems.
```javascript
const MY_OBJECT = {"key": "value"};
MY_OBJECT.key = "otherValue";
```

**Data structures and types**  
**Data types**  
The latest ECMAScript standard defines seven data types:
* Six data types that are primitives:
  * `Boolean`. true and false.
  * `null`. A special keyword denoting a null value. Because JavaScript is case-sensitive, null is not the same as Null, NULL, or any other variant.
  * `undefined`. A top-level property whose value is undefined.
  * `Number`. 42 or 3.14159.
  * `String`. "Howdy"
  * `Symbol` (new in ECMAScript 2015). A data type whose instances are unique and immutable.
* and Object

**Data type conversion**  
In expressions involving numeric and string values with the + operator, JavaScript converts numeric values to strings.
```javascript
x = "The answer is " + 42 // "The answer is 42"
y = 42 + " is the answer" // "42 is the answer"
```
In statements involving other operators, JavaScript does not convert numeric values to strings. For example:
```javascript
"37" - 7 // 30, different with  +
"37" + 7 // "377"
```

**Converting strings to numbers**  
* parseInt()
* parseFloat()

An alternative method of retrieving a number from a string is with the + (unary plus) operator:
```javascript
"1.1" + "1.1" = "1.11.1"
(+"1.1") + (+"1.1") = 2.2
// Note: the parentheses are added for clarity, not required.
```

**Literals**  
You use literals to represent values in JavaScript. These are fixed values, not variables, that you literally provide in your script. This section describes the following types of literals:
* Array literals
* Boolean literals
* Floating-point literals
* Integers
* Object literals
* RegExp literals
* String literals

**Extra commas in array literals**
```javascript
var fish = ["Lion", , "Angel"];
```
This array has two elements with values and one empty element (fish[0] is "Lion", fish[1] is undefined, and fish[2] is "Angel").

```javascript
var myList = ['home', , 'school', ];   // three elements, the trailing comma is ignored
var myList = [ , 'home', , 'school'];  // four elements
var myList = ['home', , 'school', , ]; // four elements, the last comma is ignored
```
**Boolean literals**  
Do not confuse the primitive Boolean values true and false with the true and false values of the Boolean object. The Boolean object is a wrapper around the primitive Boolean data type.

**Numeric literals**
Integers can be expressed in decimal (base 10), hexadecimal (base 16), octal (base 8) and binary (base 2).
* `A decimal integer literal` consists of a sequence of digits without a leading 0 (zero).
* `A leading 0 (zero)` on an integer literal, or a leading 0o (or 0O) indicates it is in octal. Octal integers can include only the digits 0-7.
* `A leading 0x (or 0X)` indicates a hexadecimal integer literal. Hexadecimal integers can include digits (0-9) and the letters a-f and A-F. (The case of a character does not change it's value, e.g. 0xa = 0xA = 10 and 0xf = 0xF = 15.)
* `A leading 0b (or 0B)` indicates a binary integer literal. Binary integers can only include the digits 0 and 1.
```raw
0, 117 and -345 (decimal, base 10)
015, 0001 and -0o77 (octal, base 8)
0x1123, 0x00111 and -0xF1A7 (hexadecimal, "hex" or base 16)
0b11, 0b0011 and -0b11 (binary, base 2)
```
**Floating-point literals**  
A floating-point literal can have the following parts:
* A decimal integer which can be signed (preceded by "+" or "-"),
* A decimal point ("."),
* A fraction (another decimal number),
* An exponent.

```javascript
3.1415926
-.123456789
-3.1E+12
.1e-23
```

**Object literals**
An object literal is a list of zero or more pairs of property names and associated values of an object, enclosed in curly braces (`{}`). Do not use an object literal at the beginning of a statement. This will lead to an error or not behave as you expect, because the { will be interpreted as the beginning of a block.
```javascript
var sales = 'Toyota';

function carTypes(name) {
  if (name === 'Honda') {
    return name;
  } else {
    return "Sorry, we don't sell " + name + ".";
  }
}

var car = { myCar: 'Saturn', getCar: carTypes('Honda'), special: sales };

console.log(car.myCar);   // Saturn
console.log(car.getCar);  // Honda
console.log(car.special); // Toyota
```
Additionally, you can use a numeric or string literal for the name of a property or nest an object inside another. The following example uses these options.
```javascript
var car = { manyCars: {a: 'Saab', 'b': 'Jeep'}, 7: 'Mazda' };

console.log(car.manyCars.b); // Jeep
console.log(car[7]); // Mazda
```
Object property names can be any string, including the empty string. If the property name would not be a valid JavaScript identifier or number, it must be enclosed in quotes.
```javascript
var unusualPropertyNames = {
  "": "An empty string",
  "!": "Bang!"
}
console.log(unusualPropertyNames."");   // SyntaxError: Unexpected string
console.log(unusualPropertyNames[""]);  // An empty string
console.log(unusualPropertyNames.!);    // SyntaxError: Unexpected token !
console.log(unusualPropertyNames["!"]); // Bang!
```
**Enhanced Object literals**  
```javascript
var obj = {
    // __proto__
    __proto__: theProtoObj,
    // Shorthand for ‘handler: handler’
    handler,
    // Methods
    toString() {
     // Super calls
     return 'd ' + super.toString();
    },
    // Computed (dynamic) property names
    [ 'prop_' + (() => 42)() ]: 42
};
```
```javascript
var foo = {a: 'alpha', 2: 'two'};
console.log(foo.a);    // alpha
console.log(foo[2]);   // two
//console.log(foo.2);  // Error: missing ) after argument list
//console.log(foo[a]); // Error: a is not defined
console.log(foo['a']); // alpha
console.log(foo['2']); // two
```
**RegExp literals**  
```javascript
var re = /ab+c/;   //A regex literal is a pattern enclosed between slashes.
```
**String literals**  
A string literal is zero or more characters enclosed in double (`"`) or single (`'`) quotation marks.
**Escaping characters**  
Escape charater with backslash `\`.
```javascript
var quote = "He read \"The Cremation of Sam McGee\" by R.W. Service.";
console.log(quote); // He read "The Cremation of Sam McGee" by R.W. Service.
```

## 3. Control flow and error handling
### 3.1 Block statement
```javascript
var x = 1;
{
  var x = 2;
}
console.log(x); // outputs 2
```
### 3.2 Conditional statements
Falsy values
The following values evaluate to false (also known as Falsy values):
* false
* undefined
* null
* 0
* NaN
* the empty string ("")

All other values, including all objects, evaluate to true when passed to a conditional statement.

Do not confuse the primitive boolean values true and false with the true and false values of the Boolean object. For example:
```javascript
var b = new Boolean(false);
if (b) // this condition evaluates to true
if (b == true) // this condition evaluates to false
```
### 3.3 Exception handling statements
**throw statement**
```javascript
throw "Error2";   // String type
throw 42;         // Number type
throw true;       // Boolean type
throw {toString: function() { return "I'm an object!"; } };
```
**try...catch statement**
```javascript
try {
  throw "myException"; // generates an exception
}
catch (e) {
  if (e === "myException") {
       // true
  }
}
```
## 4. Loops and iteration
### 4.1 label statement
```javascript
markLoop:
while (theMark == true) {
   doSomething();
}
```
### 4.2 break statement
Use the break statement to terminate a loop, switch, or in conjunction with a labeled statement.
```javascript
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
```
### 4.3 continue statement
The following example shows a while loop with a continue statement that executes when the value of i is three. Thus, n takes on the values 1, 3, 7, and 12.
```javascript
var i = 0;
var n = 0;
while (i < 5) {
  i++;
  if (i == 3) {
    continue;
  }
  n += i;
}
```

### 4.4 for...in statement
```javascript
function dump_props(obj, obj_name) {
  var result = '';
  for (var i in obj) {
    result += obj_name + '.' + i + ' = ' + obj[i] + '<br>';
  }
  result += '<hr>';
  return result;
}
```
### 4.5 for...of statement
While `for...in` iterates over property names, `for...of` iterates over property values:
```javascript
var arr = [3, 5, 7];
arr.foo = 'hello';

for (var i in arr) {
   console.log(i); // logs "0", "1", "2", "foo"
}

for (var i of arr) {
   console.log(i); // logs 3, 5, 7
}
```

## 5. Functions
### 5.1 Defining functions
Functions are objects. A function definition (also called a function declaration, or function statement) consists of the function keyword, followed by:
* The name of the function.
* A list of arguments to the function, enclosed in parentheses and separated by commas.
* The JavaScript statements that define the function, enclosed in curly brackets, { }.

**Function declarations**
```javascript
function square(number) {
  return number * number;
}
```
Primitive parameters (such as a number) are passed to functions **by value**; the value is passed to the function, but if the function changes the value of the parameter, this change is **not** reflected globally or in the calling function.

If you pass an object (i.e. a non-primitive value, such as Array or a user-defined object) as a parameter and the function changes the object's properties, that change is visible outside the function, as shown in the following example:

```javascript
function myFunc(theObject) {
  theObject.make = "Toyota";
}

var mycar = {make: "Honda", model: "Accord", year: 1998};
var x, y;
x = mycar.make; // x gets the value "Honda"

myFunc(mycar);
y = mycar.make; // y gets the value "Toyota", while x is still "Honda"
```

**Function expressions**  
Declare a variable by defining an anonymous function.
```javascript
var square = function(number) { return number * number };
var x = square(4) // x gets the value 16
```
### 5.3 Calling functions
Functions must be in scope when they are called, but the function declaration can be hoisted (appear below the call in the code), as in this example:
```javascript
console.log(square(5));
/* ... */
function square(n) { return n * n; }
```
A function can call itself. For example, here is a function that computes factorials recursively:
```javascript
function factorial(n) {
  if ((n === 0) || (n === 1))
    return 1;
  else
    return (n * factorial(n - 1));
}

var a, b, c, d, e;
a = factorial(1); // a gets the value 1
b = factorial(2); // b gets the value 2
c = factorial(3); // c gets the value 6
d = factorial(4); // d gets the value 24
e = factorial(5); // e gets the value 120
```
### 5.4 Function scope
Variables defined inside a function cannot be accessed from anywhere outside the function, because the variable is defined only in the scope of the function. However, a function can access all variables and functions defined inside the scope in which it is defined. In other words, a function defined in the global scope can access all variables defined in the global scope. A function defined inside another function can also access all variables defined in its parent function and any other variable to which the parent function has access.
```javascript
// The following variables are defined in the global scope
var num1 = 20,
    num2 = 3,
    name = 'Chamahk';

// This function is defined in the global scope
function multiply() {
  return num1 * num2;
}

multiply(); // Returns 60

// A nested function example
function getScore() {
  var num1 = 2,
      num2 = 3;

  function add() {
    return name + ' scored ' + (num1 + num2);
  }

  return add();
}

getScore(); // Returns "Chamahk scored 5"
```
### 5.5 Scope and the function stack
**Recursion**  
A function can refer to and call itself. There are three ways for a function to refer to itself:
* the function's name
* arguments.callee
* an in-scope variable that refers to the function

```javascript
var foo = function bar() {
   // statements go here
};
```

Within the function body, the following are all equivalent:
1. bar()
2. arguments.callee()
3. foo()

**Nested functions and closures**  
* The inner function can be accessed only from statements in the outer function.
* The inner function forms a closure: the inner function can use the arguments and variables of the outer function, while the outer function cannot use the arguments and variables of the inner function.

```javascript
function addSquares(a, b) {
  function square(x) {
    return x * x;
  }
  return square(a) + square(b);
}
a = addSquares(2, 3); // returns 13
b = addSquares(3, 4); // returns 25
c = addSquares(4, 5); // returns 41
```
Since the inner function forms a closure, you can call the outer function and specify arguments for both the outer and inner function:
```javascript
function outside(x) {
  function inside(y) {
    return x + y;
  }
  return inside;
}
fn_inside = outside(3);  // Think of it like: give me a function that adds 3 to whatever you give it
result = fn_inside(5);   // returns 8
result1 = outside(3)(5); // returns 8
```

**Name conflicts**
The inner-most scope takes the highest precedence, while the outer-most scope takes the lowest. This is the `scope chain`. The first on the chain is the inner-most scope, and the last is the outer-most scope.
```javascript
function outside() {
  var x = 5;
  function inside(x) {
    return x * 2;
  }
  return inside;
}

outside()(10); // returns 20 instead of 10
```

### 5.6 Closures
Closures are one of the most powerful features of JavaScript. JavaScript allows for the nesting of functions and grants the inner function full access to all the variables and functions defined inside the outer function (and all other variables and functions that the outer function has access to). However, the outer function does not have access to the variables and functions defined inside the inner function. This provides a sort of encapsulation for the variables of the inner function. Also, since the inner function has access to the scope of the outer function, the variables and functions defined in the outer function will live longer than the duration of the inner function execution, if the inner function manages to survive beyond the life of the outer function. A closure is created when the inner function is somehow made available to any scope outside the outer function.
```javascript
var pet = function(name) {   // The outer function defines a variable called "name"
  var getName = function() {
    return name;             // The inner function has access to the "name" variable of the outer
                             //function
  }
  return getName;            // Return the inner function, thereby exposing it to outer scopes
}
myPet = pet('Vivie');

myPet();                     // Returns "Vivie"
```

### 5.7 Using the arguments object
The arguments of a function are maintained in an array-like object. Within a function, you can address the arguments passed to it as follows:
```javascript
arguments[i]
```
A function that concatenates several strings.
```javascript
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
```
Note: The arguments variable is "array-like", but not an array. It is array-like in that is has a numbered index and a length property. However, it does not possess all of the array-manipulation methods.

### 5.8 Function parameters
**Default parameters(ECMAScript 6)**  
```javascript
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
```
**Rest parameters(ECMAScript 6)**  
```javascript
function multiply(multiplier, ...theArgs) {
  return theArgs.map(x => multiplier * x);
}

var arr = multiply(2, 1, 2, 3);
console.log(arr); // [2, 4, 6]
```
### 5.9 Arrow functions
**Shorter functions**
```javascript
var a = ["Hydrogen","Helium","Lithium","Beryl­lium"];
var a2 = a.map(function(s){ return s.length }); // [8,6,7,10]
var a3 = a.map( s => s.length ); // same, [8,6,7,10]
```
**Lexical this**  
```javascript
function Person() {
  // The Person() constructor defines `this` as itself.
  this.age = 0;

  setInterval(function growUp() {
    // In nonstrict mode, the growUp() function defines `this`
    // as the global object, which is different from the `this`
    // defined by the Person() constructor.
    this.age++;
  }, 1000);
}

var p = new Person();
```
In ECMAScript 3/5, this issue was fixed by assigning the value in this to a variable that could be closed over.
```javascript
function Person() {
  var self = this; // Some choose `that` instead of `self`.
                   // Choose one and be consistent.
  self.age = 0;

  setInterval(function growUp() {
    // The callback refers to the `self` variable of which
    // the value is the expected object.
    self.age++;
  }, 1000);
}
```

### 5.10 Predefined functions
eval(), uneval(), isFinite(), isNaN(), parseFloat(), parseInt(),
decodeURI(), decodeURIComponent(), encodeURI(), encodeURIComponent()
escape(), unescape() (escape is deprecated, use encodeURI or encodeURIComponent instead)

## 6. Expressions and operators
### 6.1 Operators
* Assignment operators
* Comparison operators
* Arithmetic operators
* Bitwise operators
* Logical operators
* String operators
* Conditional (ternary) operator
* Comma operator
* Unary operators
* Relational operators

**Assignment operators**  
Destructuring makes it possible to extract data from arrays or objects using a syntax that mirrors the construction of array and object literals.
```javascript
var foo = ['one', 'two', 'three'];

// without destructuring
var one   = foo[0];
var two   = foo[1];
var three = foo[2];

// with destructuring
var [one, two, three] = foo;
```
**Comparison operators**  

Operator               | Description                                   | Examples
-----------------------|-----------------------------------------------|--------------------------------
Equal (`==`)             | Returns true if the operands are equal.     |  3 == var1 <br>"3" == var1 <br> 3 == '3'
Not equal (`!=`)         | Returns true if the operands are not equal.  |  var1 != 4 <br>var2 != "3"
Strict equal (`===`)     | Returns true if the operands are equal and of the same type.   |  3 === var1
Strict not equal (`!==`) | Returns true if the operands are of the same type but not equal, or are of different type.  | var1 !== "3" <br>3 !== '3'
Greater than (`>`)       | Returns true if the left operand is greater than the right operand.  | var2 > var1 <br> "12" > 2
Greater or equal (`>=`) | Returns true if the left operand is greater than or equal to the right operand.  | var2 >= var1 <br>var1 >= 3
Less than (`<`)          | Returns true if the left operand is less than the right operand.  |  var1 < var2 <br>"2" < 12
Less or equal (`<=`)| Returns true if the left operand is less than or equal to the right operand.  | var1 <= var2 <br> var2 <= 5

For strict equal (===), See also [Object.is](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) and [sameness in JS](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness).

**Arithmetic operators**  
```javascript
1 / 2; // 0.5
1 / 2 == 1.0 / 2.0; // this is true
```
Exponentiation operator (\**)
```javascript
2 ** 3 returns 8.
10 ** -1 returns 0.1.
```
**Bitwise operators**  
```javascript
a << b  // Left shift
a >> b  // Sign-propagating right shift, Copies of the leftmost bit are shifted in from the left.
a >>> b // Zero-fill right shift

9 << 2   // result is 36, 1001 -> 100100
9 >> 2   // result is 2, 1001 -> 10
-9 >> 2  // result is -3, 1111...11110111 -> 1111...11111101
19 >>> 2 // result is 4, 10011 -> 100
For non-negative numbers, zero-fill right shift and sign-propagating right shift yield the same result.
```
**Logical operators**  
The following code shows examples of the && (logical AND) operator.
```javascript
var a1 =  true && true;     // t && t returns true
var a2 =  true && false;    // t && f returns false
var a3 = false && true;     // f && t returns false
var a4 = false && (3 == 4); // f && f returns false
var a5 = 'Cat' && 'Dog';    // t && t returns Dog
var a6 = false && 'Cat';    // f && t returns false
var a7 = 'Cat' && false;    // t && f returns false
```
The following code shows examples of the || (logical OR) operator.
```javascript
var o1 =  true || true;     // t || t returns true
var o2 = false || true;     // f || t returns true
var o3 =  true || false;    // t || f returns true
var o4 = false || (3 == 4); // f || f returns false
var o5 = 'Cat' || 'Dog';    // t || t returns Cat
var o6 = false || 'Cat';    // f || t returns Cat
var o7 = 'Cat' || false;    // t || f returns Cat
```
The following code shows examples of the ! (logical NOT) operator.
```javascript
var n1 = !true;  // !t returns false
var n2 = !false; // !f returns true
var n3 = !'Cat'; // !t returns false
```
Short-circuit evaluation
As logical expressions are evaluated left to right, they are tested for possible "short-circuit" evaluation using the following rules:
* false && anything is short-circuit evaluated to false.
* true \|\| anything is short-circuit evaluated to true.

**String operators**
```javascript
var mystring = 'alpha';
mystring += 'bet'; // evaluates to "alphabet" and assigns this value to mystring.
```
**Conditional (ternary) operator**  
```javascript
var status = (age >= 18) ? 'adult' : 'minor';
```
**Comma operator**  
The comma operator (,) simply evaluates both of its operands and returns the value of the last operand. This operator is primarily used inside a for loop, to allow multiple variables to be updated each time through the loop.
```javascript
var x = [0,1,2,3,4,5,6,7,8,9]
var a = [x, x, x, x, x];

for (var i = 0, j = 9; i <= j; i++, j--)
  console.log('a[' + i + '][' + j + ']= ' + a[i][j]);

/* output  
a[0][9]= 9
a[1][8]= 8
a[2][7]= 7
a[3][6]= 6
a[4][5]= 5
*/
```
**Unary operators**
A unary operation is an operation with only one operand.

**delete**  
```javascript
delete objectName;
delete objectName.property;
delete objectName[index];
delete property; // legal only within a with statement
```
You can use the delete operator to delete variables declared implicitly but not those declared with the var statement.
If the delete operator succeeds, it sets the property or element to undefined. The delete operator returns true if the operation is possible; it returns false if the operation is not possible.
```javascript
x = 42;
var y = 43;
myobj = new Number();
myobj.h = 4;    // create property h
delete x;       // returns true (can delete if declared implicitly)
delete y;       // returns false (cannot delete if declared with var)
delete Math.PI; // returns false (cannot delete predefined properties)
delete myobj.h; // returns true (can delete user-defined properties)
delete myobj;   // returns true (can delete if declared implicitly)
```
**deleting array element**  
```javascript
// trees[3] is removed with delete. However, trees[3] is still addressable and returns undefined.
var trees = ["redwood", "bay", "cedar", "oak", "maple"];
delete trees[3]; //trees = ["redwood", "bay", "cedar", undefined, "maple"];
if (3 in trees) {
  // this does not get executed
  console.log(3);
}

// trees[3] is assigned the value undefined, but the array element still exists
var trees = ["redwood", "bay", "cedar", "oak", "maple"];
trees[3] = undefined;
if (3 in trees) {
  // this gets executed
}
```

**typeof**  
Suppose you define the following variables:
```javascript
var myFun = new Function('5 + 2');
var shape = 'round';
var size = 1;
var foo = ['Apple', 'Mango', 'Orange'];
var today = new Date();

typeof myFun;       // returns "function"
typeof shape;       // returns "string"
typeof size;        // returns "number"
typeof foo;         // returns "object"
typeof today;       // returns "object"
typeof doesntExist; // returns "undefined"
```
More examples.
```javascript
// the keywords true and null
typeof true; // returns "boolean"
typeof null; // returns "object"

// number or string
typeof 62;            // returns "number"
typeof 'Hello world'; // returns "string"

// property values
typeof document.lastModified; // returns "string"
typeof window.length;         // returns "number"
typeof Math.LN2;              // returns "number"

// methods and functions
typeof blur;        // returns "function"
typeof eval;        // returns "function"
typeof parseInt;    // returns "function"
typeof shape.split; // returns "function"

// predefined objects
typeof Date;     // returns "function"
typeof Function; // returns "function"
typeof Math;     // returns "object"
typeof Option;   // returns "function"
typeof String;   // returns "function"
```
**void**  
The void operator specifies an expression to be evaluated without returning a value.
The following code creates a hypertext link that does nothing when the user clicks it. When the user clicks the link, void(0) evaluates to undefined, which has no effect in JavaScript.
```html
<a href="javascript:void(0)">Click here to do nothing</a>
```
The following code creates a hypertext link that submits a form when the user clicks it.
```html
<form action="action_page.php" name="form1">
  <input type="text" name="firstname" value="Mickey">
  <a href="javascript:void(document.form1.submit())">Click here to submit</a>
</form>
```
**Relational operators**  
**in**  
```javascript
// Arrays
var trees = ['redwood', 'bay', 'cedar', 'oak', 'maple'];
0 in trees;        // returns true
3 in trees;        // returns true
6 in trees;        // returns false
'bay' in trees;    // returns false (you must specify the index number,
                   // not the value at that index)
'length' in trees; // returns true (length is an Array property)

// built-in objects
'PI' in Math;          // returns true
var myString = new String('coral');
'length' in myString;  // returns true

// Custom objects
var mycar = { make: 'Honda', model: 'Accord', year: 1998 };
'make' in mycar;  // returns true
'model' in mycar; // returns true
```
**instanceof**  
```javascript
var theDay = new Date(1995, 12, 17);
if (theDay instanceof Date) {
  // statements to execute
}
```
### 6.2 Expressions
**Primary expressions**  
**this**  
Use the this keyword to refer to the current object. In general, this refers to the calling object in a method.
```javascript
this["propertyName"]
this.propertyName
```
A function called validate validates an object's value property, given the object and the high and low values:
```javascript
function validate(obj, lowval, hival){
  if ((obj.value < lowval) || (obj.value > hival))
    console.log("Invalid Value!");
}
```
Call validate in each form element's onChange event handler, using this to pass it the form element:
```html
<p>Enter a number between 18 and 99:</p>
<input type="text" name="age" size=3 onChange="validate(this, 18, 99);">
```
**Left-hand-side expressions**  
new, super, Spread operator
```javascript
var objectName = new objectType([param1, param2, ..., paramN]);
super([arguments]); // calls the parent constructor.
super.functionOnParent([arguments]);

var parts = ['shoulder', 'knees'];
var lyrics = ['head', ...parts, 'and', 'toes'];

function f(x, y, z) { }
var args = [0, 1, 2];
f(...args);
```

## 7. Numbers and dates
### 7.1 Numbers
**Decimal numbers**  
```javascript
1234567890  // decimal
42 //decimal

// Caution when using leading zeros:
0888 // 888 parsed as decimal
0777 // parsed as octal in non-strict mode (511 in decimal)
```
Note that decimal literals can start with a zero (0) followed by another decimal digit, but If the next digit after the leading 0 is smaller than 8, the number gets parsed as an octal number.
**Binary numbers**  
```javascript
var FLT_SIGNBIT  = 0b10000000000000000000000000000000; // 2147483648
var FLT_EXPONENT = 0b01111111100000000000000000000000; // 2139095040
var FLT_MANTISSA = 0B00000000011111111111111111111111; // 8388607
```
**Octal numbers**  
```javascript
var n = 0755; // 493
var m = 0644; // 420
```
Strict mode in ECMAScript 5 forbids octal syntax. Octal syntax isn't part of ECMAScript 5
```javascript
var a = 0o10; // ES6: Octal
```
**Hexadecimal numbers**  
```javascript
0xFFFFFFFFFFFFFFFFF // 295147905179352830000
0x123456789ABCDEF   // 81985529216486900
0XA                 // 10
```
**Exponentiation**  
```javascript
1E3   // 1000
2e6   // 2000000
0.1e2 // 10
```
### 7.2 Number object
```javascript
var biggestNum = Number.MAX_VALUE;
var smallestNum = Number.MIN_VALUE;
var infiniteNum = Number.POSITIVE_INFINITY;
var negInfiniteNum = Number.NEGATIVE_INFINITY;
var notANum = Number.NaN;

Number.parseFloat()
Number.parseInt()
```
### 7.3 Math object
```javascript
Math.abs()
Math.min(), Math.max();
Math.floor(), Math.ceil();
Math.sqrt();
```
### 7.4 Date object
Date is stored as the number of milliseconds since January 1, 1970, 00:00:00.
```javascript
var today = new Date();
var endYear = new Date(1995, 11, 31, 23, 59, 59, 999); // Set day and month
endYear.setFullYear(today.getFullYear()); // Set year to this year
var msPerDay = 24 * 60 * 60 * 1000; // Number of milliseconds per day
var daysLeft = (endYear.getTime() - today.getTime()) / msPerDay;
var daysLeft = Math.round(daysLeft); //returns days left in the year
```
Javascript Clock
```javascript
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
```
## 8. Text formatting
### 8.1 Strings
**String literals**  
```javascript
'\xA9' // "©", Hexadecimal escape sequences
'\u00A9' // "©", Unicode escape sequences
```
**String objects**  
```javascript
var s = new String("foo"); // Creates a String object
console.log(s); // Displays: { '0': 'f', '1': 'o', '2': 'o'}
typeof s; // Returns 'object'
```
Counterintuitive behavior of String objects.
```javascript
var s1 = "2 + 2"; // Creates a string literal value
var s2 = new String("2 + 2"); // Creates a String object
eval(s1); // Returns the number 4
eval(s2); // Returns the string "2 + 2"
```
Strings are immutable array-like objects
```javascript
var mystring = 'Hello, World!';
var x = mystring.length;
mystring[0] = 'L'; // This has no effect, because strings are immutable
mystring[0];       // This returns "H"
```
Methods of String
```javascript
String.charAt()
String.indexOf()
String.startWith()
String.concat()
String.substring(), String.substr()
String.trim();
String.toLowerCase();
String.toUpperCase();
```
**Multi-line template literals**  
```javascript
console.log("string text line 1\n\
string text line 2");
// "string text line 1
// string text line 2"

// get the same effect with back-tick
console.log(`string text line 1
string text line 2`); //back-tick (` `)
```
### 8.2 Internationalization
**Date and time formatting**
```javascript
var msPerDay = 24 * 60 * 60 * 1000;

// July 17, 2014 00:00:00 UTC.
var july172014 = new Date(msPerDay * (44 * 365 + 11 + 197));

var options = { year: '2-digit', month: '2-digit', day: '2-digit',
                hour: '2-digit', minute: '2-digit', timeZoneName: 'short' };
var americanDateTime = new Intl.DateTimeFormat('en-US', options).format;

console.log(americanDateTime(july172014)); // 07/16/14, 5:00 PM PDT
```
**Number formatting**  
```javascript
var gasPrice = new Intl.NumberFormat('en-US',
                        { style: 'currency', currency: 'USD',
                          minimumFractionDigits: 3 });

console.log(gasPrice.format(5.259)); // $5.259

var hanDecimalRMBInChina = new Intl.NumberFormat('zh-CN-u-nu-hanidec',
                        { style: 'currency', currency: 'CNY' });

console.log(hanDecimalRMBInChina.format(1314.25)); // ￥ 一,三一四.二五
```

## 9. Regular Expressions
### 9.1 Creating a regular expression
```javascript
var re = /ab+c/;              // better performance
var re = new RegExp("ab+c");  // use constructor function if it may be changed or it only be known at runtime.
```
### 9.2 Working with regular expressions
```javascript
var myRe = /d(b+)d/g;
var myArray = myRe.exec('cdbbdbsbz');
console.log('The value of lastIndex is ' + myRe.lastIndex);

// "The value of lastIndex is 5"

var myArray = /d(b+)d/g.exec('cdbbdbsbz');
console.log('The value of lastIndex is ' + /d(b+)d/g.lastIndex);

// "The value of lastIndex is 0"
```
**Using parenthesized substring matches**
```javascript
var re = /(\w+)\s(\w+)/;
var str = 'John Smith';
var newstr = str.replace(re, '$2, $1');
console.log(newstr);

// "Smith, John"
```

## 10. Indexed collections
### 10.1 Array object
**Creating an array**  
```javascript
var arr = new Array(element0, element1, ..., elementN);
var arr = Array(element0, element1, ..., elementN);
var arr = [element0, element1, ..., elementN]; //array literal
```
The bracket syntax is called an "array literal" or "array initializer."

To create an array with non-zero length, but without any items, either of the following can be used:
```javascript
var arr = new Array(arrayLength);
var arr = Array(arrayLength);

// This has exactly the same effect
var arr = [];
arr.length = arrayLength; // arrayLength must be a Number, otherwise, it became
```
**Populating an array**
```javascript
var arr = [];
arr[3.4] = "Oranges"; // a property will be created in the object representing the array, instead of an array element
console.log(arr.length);                // 0
console.log(arr.hasOwnProperty(3.4));   // true
```
**Referring to array elements**  
```javascript
var arr = ["one", "two", "three"];
arr[2];  // three
arr["length"];  // 3, access the property
```
**Understanding length**  
```javascript
var cats = ['Dusty', 'Misty', 'Twiggy'];
console.log(cats.length); // 3

cats.length = 2;
console.log(cats); // logs "Dusty,Misty" - Twiggy has been removed

cats.length = 0;
console.log(cats); // logs nothing; the cats array is empty

cats.length = 3;
console.log(cats); // [undefined, undefined, undefined]
```
Unassigned values are not iterated in a forEach loop.
```javascript
var array = ['first', 'second', , 'fourth'];

array.forEach(function(element) { // element is skipped in forEach if it is not listed in the array.
  console.log(element);
});
// first
// second
// fourth

if (array[2] === undefined) {
  console.log('array[2] is undefined'); // true
}

array = ['first', 'second', undefined, 'fourth'];

array.forEach(function(element) {
  console.log(element);
});
// first
// second
// undefined
// fourth
```
Issue when using `for...in` loop on Array.
```javascript
var arr = [3, 5, , 7];
for (var i in arr) {
   console.log(i); // logs "0", "1", "3"
}

var arr = [3, 5, , 7];
arr[3.5] = "aa";
for (var i in arr) {
   console.log(i); // logs "0", "1", "3", "3.5"
}
```
It is not advisable to iterate through JavaScript arrays using for...in loops because normal elements and all enumerable properties will be listed. Instead, use general `for loop`.
```javascript
var arr = [3, 5, , 7];
for (var i = 0; i < arr.length; i++) {
  console.log(i); // logs "0", "1", "2", "3"
}
for (var i = 0; i < arr.length; i++) {
  console.log(arr[i]); // logs "3", "5", "undefined", "7"
}
```
**Array methods**  
```javascript
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
```
The callback function is actually called with three arguments. The first is the value of the current item, the second is its array index, and the third is a reference to the array itself.
```javascript
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
```
### 10.2 Typed Arrays
* Buffers and views
* ArrayBuffer

## 11. Keyed collections
### 11.1 Maps
**Map object**  
ECMAScript 2015 introduces a new data structure to map values to values. A Map object is a simple key/value map and can iterate its elements in insertion order.
```javascript
var sayings = new Map();
sayings.set('dog', 'woof');
sayings.set('cat', 'meow');
sayings.set('elephant', 'toot');
sayings.size; // 3
sayings.get('fox'); // undefined
sayings.has('bird'); // false
sayings.delete('dog');
sayings.has('dog'); // false

for (var [key, value] of sayings) {
  console.log(key + ' goes ' + value);
}
// "cat goes meow"
// "elephant goes toot"

sayings.clear();
sayings.size; // 0
```
**WeakMap object**  
The WeakMap object is a collection of key/value pairs in which the keys are objects only and the values can be arbitrary values. The object references in the keys are held *weakly*, meaning that they are a target of garbage collection (GC) if there is no other reference to the object anymore. The WeakMap API is the same as the Map API.
```javascript
const privates = new WeakMap();

function Public() {
  const me = {
    // Private data goes here
  };
  privates.set(this, me);
}

Public.prototype.method = function() {
  const me = privates.get(this);
  // Do stuff with private data in `me`...
};

module.exports = Public;
```
### 11.2 Set
**Set**
```javascript
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
```
**Converting between Array and Set**
```javascript
Array.from(mySet);
[...mySet2];
mySet2 = new Set([1,2,3,4]);
```
**WeakSet object**

## 12. Working with objects
### 12.1 Objects overview
In JavaScript, an object is a standalone entity, with properties and type.
### 12.2 Objects and properties
```javascript
var myCar = new Object();
myCar.make = "Ford";
myCar.model = "Mustang";
myCar.year = 1969;
```
use for...in loop to iterate all enumerable properties.
```javascript
function showProps(obj, objName) {
  var result = '';
  for (var i in obj) {
    // obj.hasOwnProperty() is used to filter out properties from the object's prototype chain
    if (obj.hasOwnProperty(i)) {
      result += objName + '.' + i + ' = ' + obj[i] + '\n';
    }
  }
  return result;
}
showProps(myCar, "myCar")

myCar.make = Ford
myCar.model = Mustang
myCar.year = 1969
```
### 12.3 Enumerate the properties of an object
* for...in loops
* Object.keys(o)
* Object.getOwnPropertyNames(o)

### 12.4 Creating new objects
**Using object initializers**  
```javascript
var myHonda = {color: "red", wheels: 4, engine: {cylinders: 4, size: 2.2}};
```
**Using a constructor function**  
```javascript
function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
}
var mycar = new Car("Eagle", "Talon TSi", 1993);
```
**Using the Object.create method**  
```javascript
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
```
### 12.4 Defining properties for an object type
You can add a property to a previously defined object type by using the prototype property.This defines a property that is shared by all objects of the specified type, rather than by just one instance of the object.
```javascript
Car.prototype.color = null;
car1.color = 'black';
```
### 12.5 Defining methods
```javascript
function displayCar() {
  var result = 'A Beautiful ' + this.year + ' ' + this.make
    + ' ' + this.model;
  pretty_print(result);
}

function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
  this.displayCar = displayCar;
}
var car = new Car('Nissan', '300ZX', 1992);
```
Now we can call the method for car object.
```javascript
car1.displayCar();
```
### 12.6 Using this for object references
```javascript
function validate(obj, lowval, hival) {
  if ((obj.value < lowval) || (obj.value > hival)) {
    alert('Invalid Value!');
  }
}
```
Call validate in each form element's onchange event handler, using this to pass it the element.
```html
<input type="text" name="age" size="3"
  onChange="validate(this, 18, 99)">
```
### 12.7 Defining getters and setters
```javascript
var o = {
  a: 7,
  get b() {
    return this.a + 1;
  },
  set c(x) {
    this.a = x / 2;
  }
};

console.log(o.a); // 7
console.log(o.b); // 8
o.c = 50;
console.log(o.a); // 25
```
### 12.8 Deleting properties
```javascript
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
```
### 12.9 Comparing Objects
In JavaScript objects are a reference type. Two distinct objects are never equal, even if they have the same properties. Only comparing the same object reference with itself yields true.
```javascript
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
```

## 13. Details of the object model
### 13.1 Class-based(java) vs. prototype-based languages(javascript)

## 14. Using promises

## 15. Iterators and generators
* Iteration protocols
* for...of
* function* and Generator
* yield and yield*

### 15.1 Iterators
```javascript
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
```
### 15.2 Generators
```javascript
function* idMaker() {
  var index = 0;
  while(true)
    yield index++;
}

var gen = idMaker();

console.log(gen.next().value); // 0
console.log(gen.next().value); // 1
console.log(gen.next().value); // 2
// ...
```

## 16. References
* [JavaScript Introduction on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Introduction)
* [JavaScript basics](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/JavaScript_basics)
* [A Smarter Way to Learn JavaScript](https://www.amazon.com/Smarter-JavaScript-tech-assisted-approach-requires/dp/1497408180/)
