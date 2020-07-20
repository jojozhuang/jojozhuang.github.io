---
layout: tutorial
key: tutorial
title: "Angular - TypeScript"
index: 8302
subcategory: angular-tutorial
date: 2018-03-06
tags: [TypeScript, tsc]
---

> Introduction of TypeScript.

## 1. What is TypeScript?
[TypeScript](http://www.typescriptlang.org/) is a superset of JavaScript (written by Microsoft) that primarily provides optional static typing, classes, and interfaces. Browsers can’t run TypeScript directly. TypeScript code is compiled down to JavaScript.

For short, TypeScript = JavaScript + Types + Classes + Modules + More.

### 1.1 Components of TypeScript
TypeScript has the following three components:
* `Language` − It comprises of the syntax, keywords, and type annotations.
* `The TypeScript Compiler` − The TypeScript compiler (tsc) converts the instructions written in TypeScript to its JavaScript equivalent.
* `The TypeScript Language Service` − The "Language Service" exposes an additional layer around the core compiler pipeline that are editor-like applications. The language service supports the common set of a typical editor operations like statement completions, signature help, code formatting and outlining, colorization, etc.

### 1.2 Hello World
The first sample is written in javascript.
```javascript
var Greeter = /** @class */ (function () {
    function Greeter(message) {
        this.greeting = message;
    }
    Greeter.prototype.greet = function () {
        return "Hello, " + this.greeting;
    };
    return Greeter;
}());
var greeter = new Greeter("world");
greeter.greet() // print "Hello, world"
```
The second sample implements same logic, but it is written in TypeScript.
```typescript
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}

let greeter = new Greeter("world");
greeter.greet() // print "Hello, world"
```
### 1.3 Play Ground
You can go to http://www.typescriptlang.org/play/index.html to try it. Input TypeScript at the left side and you will see the equivalent javascript code at the right side.
![image](/assets/images/frontend/8302/playground.png)
### 1.4 Local Environment Setup
Type the following command in terminal to install TypeScript.
```raw
$ npm install -g typescript
```
Create file named hello.ts with the following content.
```typescript
// hello.ts
var message:string = "Hello World"
console.log(message)
```
Compile it to js file with `tsc` command.
```raw
$ tsc hello.ts
```
A new file named hello.js will be created in the sample folder. Open it, you will see the following javascript codes.
```javascript
// hello.js
var message = "Hello World";
console.log(message);
```

## 2. Types
In TypeScript, types can be grouped to Built-in Types and User-defined Types. Besides, it can also be grouped to Primitive Types and Object Types.
### 2.1 The Any Type
The `any` data type is the super type of all types in TypeScript.
### 2.2 Built-in Types
The following table illustrates all the built-in types in TypeScript.

 Data type | Keyword   | Description
-----------|-----------|--
Number     | number    | Double precision 64-bit floating point values. It can be used to represent both, integers and fractions.
String     | string    | Represents a sequence of Unicode characters
Boolean    | boolean   | Represents logical values, true and false
Void       | void      | Used on function return types to represent non-returning functions
Null       | null      | Represents an intentional absence of an object value.
Undefined  | undefined | Denotes value given to all uninitialized variables

### 2.3 User-defined Types
User-defined types include Enumerations (enums), classes, interfaces, arrays, and tuple.
### 2.4 Primitive Types
Primitive types aren’t inherited from the Object class and aren’t extendable. any, number, string, boolean
### 2.5 Object Types
Object types inherited from the `Object` class and are extendable. Number, String, Boolean
### 2.6 Number Type
1) Define variable in TypeScript.
```javascript
var mark = 123;         // javascript
var mark: number = 123; // typescript
```
### 2.7 Enumerations
Enums allow us to define a set of named constants.  
1) Numberic Enums
```typescript
enum Direction {
    Up = 1,                // Up is initialized with 1.
    Down,
    Left,
    Right,
}
var dir: Direction = Direction.Down;
console.log(dir);           // print 2
```
Leave off the initializers entirely.
```typescript
enum Direction {
    Up,                    // Up has the value 0.
    Down,
    Left,
    Right,
}
var dir: Direction = Direction.Down;
console.log(dir);           // print 1
```
2) String enums
```typescript
enum Direction {
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT",
}
```
3) Heterogeneous enums
```typescript
enum BooleanLikeHeterogeneousEnum {
    No = 0,
    Yes = "YES",
}
```
### 2.8 Tuple Types
Tuples enable storing multiple fields of different types.
```typescript
var contactInfo: [string, number, string]; // Name, No., Road
contactInfo = ['Johnny', 3410, "Hillview"];
console.log("length:", contactInfo.length);
contactInfo.forEach(function (value) {
    console.log(value);
});
contactInfo.pop();              // remove the last element
contactInfo.push("Palo Alto");  // add new element to the end
contactInfo.push("California"); // add another element to the end
console.log("length:", contactInfo.length);
contactInfo.forEach(function (value) {
    console.log(value);
});
```
Output.
```raw
length: 3
Johnny
3410
Hillview
length: 4
Johnny
3410
Palo Alto
California
````
### 2.9 Union Types
Union types can be one of the several types. Two or more data types are combined using the pipe symbol `|` to denote a Union Type.
```typescript
var name: string | number;

// both assignments are fine
this.name = 'abc';
this.name = 22;
```
Union types can also be applied to function arguments and results:
```typescript
function format(value: string, padding: string | number) {  }
function getFormatted(anyValue:any): string | number {  }
```
Union types can also be applied to arrays, properties and interfaces. The following illustrates the use of union type with an array.
```typescript
var arr:number[]|string[];
var i:number;
arr = [1,2,4]
console.log("**numeric array**")  

for(i = 0;i<arr.length;i++) {
   console.log(arr[i])
}  

arr = ["Palo Alto","San Jose","LA"]
console.log("**string array**")  

for(i = 0;i<arr.length;i++) {
   console.log(arr[i])
}
```
On compiling,
```javascript
var arr;
var i;
arr = [1, 2, 4];
console.log("**numeric array**");
for (i = 0; i < arr.length; i++) {
    console.log(arr[i]);
}
arr = ["Palo Alto", "San Jose", "LA"];
console.log("**string array**");
for (i = 0; i < arr.length; i++) {
    console.log(arr[i]);
}
```
output.
```raw
**numeric array**
1
2
4
**string array**
Palo Alto
San Jose
LA
```
### 2.10 Type Aliases
Number or String.
```typescript
type Location = string | number;
var loc1: Location = "aaa"
console.log(loc1);           // print "aaa"
var loc2: Location = 10;     // print 10
console.log(loc2);
```
String or Function.
```typescript
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
function getName(n: NameOrResolver): Name {
    if (typeof n === "string") {
        return n;
    }
    else {
        return n();
    }
}
```
## 3. Variables
### 3.1 Variable Declaration
Four options to declare variable.
```typescript
var name1: string = "mary"  // The variable stores a value of type string
var name2: string;          // The variable is a string variable. The variable’s value is set to undefined.
var name3 = "mary";         // The variable’s type is inferred from the data type of the value. Here, the type is string
var name4;                  // The variable’s data type is any. Its value is set to undefined by default.

console.log("name1", name1); // print name1 mary
console.log("name2", name2); // print name2 undefined
console.log("name3", name3); // print name3 mary
console.log("name4", name4); // print name4 undefine
```
Equivalent javascript.
```javascript
var name1 = "mary";
var name2;
var name3 = "mary";
var name4;
console.log("name1", name1);
console.log("name2", name2);
console.log("name3", name3);
console.log("name4", name4);
```
### 3.2 Type Assertion
The reason why it's not called "type casting" is that casting generally implies some sort of runtime support while, “type assertions” are purely a compile time construct and a way for you to provide hints to the compiler on how you want your code to be analyzed.
```typescript
var str = '1'
var str2:number = <number> <any> str   //str is now of type number
console.log(str2)
```
### 3.3 Inferred Typing
``` typescript
var num = 2;    // data type inferred as  number
console.log("value of num "+num);
num = "12";     // compile error
console.log(num);
```
### 3.4 Variable Scope
* Global Scope − Global variables are declared outside the programming constructs. These variables can be accessed from anywhere within your code.
* Class Scope − These variables are also called fields. Fields or class variables are declared within the class but outside the methods. These variables can be accessed using the object of the class. Fields can also be static. Static fields can be accessed using the class name.
* Local Scope − Local variables, as the name suggests, are declared within the constructs like methods, loops etc. Local variables are accessible only within the construct where they are declared.

Sample.
```typescript
var global_num = 12          //global variable
class Numbers {
   num_val = 13;             //class variable
   static sval = 10;         //static field

   storeNum():void {
      var local_num = 14;    //local variable
   }
}
console.log("Global num: "+global_num)  
console.log(Numbers.sval)   //static variable  
var obj = new Numbers();
console.log("Global num: "+obj.num_val)
```
```javascript
var global_num = 12; //global variable
var Numbers = /** @class */ (function () {
    function Numbers() {
        this.num_val = 13; //class variable
    }
    Numbers.prototype.storeNum = function () {
        var local_num = 14; //local variable
    };
    Numbers.sval = 10; //static field
    return Numbers;
}());
console.log("Global num: " + global_num);
console.log(Numbers.sval); //static variable  
var obj = new Numbers();
console.log("Global num: " + obj.num_val);
```
Output.
```raw
Global num: 12
10
Global num: 13
```

## 4. Functions
### 4.1 Optional Parameters
Define a function with three parameters, the third one is optional parameter.
```typescript
function showName(firstname: string, lastname: string, middlename?: string) {
    console.log("firstname:", firstname);
    console.log("lastname:",lastname);

    if(middlename!=undefined)  
    console.log("middlename:",middlename);
}
showName("John","Miller");
showName("Mary","Menlo","Suki");
```
After compiling, it will generate following JavaScript code.
```javascript
function showName(firstname, lastname, middlename) {
    console.log("firstname:", firstname);
    console.log("lastname:", lastname);
    if (middlename != undefined)
        console.log("middlename:", middlename);
}
showName("John", "Miller");
showName("Mary", "Menlo", "Suki");
```
Output
```raw
firstname: John
lastname: Miller
firstname: Mary
lastname: Menlo
middlename: Suki
```
### 4.2 Rest Parameters
Create a function with rest parameters.
```typescript
function addNumbers(...nums:number[]) {  
   var i;   
   var sum:number = 0;

   for(i = 0;i<nums.length;i++) {
      sum = sum + nums[i];
   }
   console.log("sum of the numbers:",sum)
}
addNumbers(1,2,3)
addNumbers(10,10,10,10,10)
```
After compiling, it will generate following JavaScript code.
```javascript
function addNumbers() {
    var nums = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        nums[_i] = arguments[_i];
    }
    var i;
    var sum = 0;
    for (i = 0; i < nums.length; i++) {
        sum = sum + nums[i];
    }
    console.log("sum of the numbers:", sum);
}
addNumbers(1, 2, 3);
addNumbers(10, 10, 10, 10, 10);
```
Output
```raw
sum of the numbers: 6
sum of the numbers: 50
```
### 4.3 Default Parameters
Create a function with default value for the second parameter.
```typescript
function calculate_discount(price:number,rate:number = 0.50) {
   var discount = price * rate;
   console.log("Discount Amount: ",discount);
}
calculate_discount(1000)
calculate_discount(1000,0.30)
```
After compiling, it will generate following JavaScript code.
```javascript
function calculate_discount(price, rate) {
    if (rate === void 0) { rate = 0.50; }
    var discount = price * rate;
    console.log("Discount Amount: ", discount);
}
calculate_discount(1000);
calculate_discount(1000, 0.30);
```
Output
```raw
Discount Amount:  500
Discount Amount:  300
```
### 4.4 Anonymous Function
Syntax
```typescript
var res = function( [arguments] ) { ... }
```
Anonymous function without parameters.
```typescript
var msg = function() {
   return "hello world";  
}
console.log(msg())  // print hello world
```
Anonymous function with parameters.
```typescript
var res = function(a:number,b:number) {
   return a*b;  
};
console.log(res(12,2))  // print 24
```
### 4.5 Lambda Functions / Arrow Functions
1) Lambda Expression
```typescript
var foo = (x:number)=>10 + x
console.log(foo(100))      //outputs 110
```
On compiling, it will generate following JavaScript code.
```javascript
var foo = function (x) { return 10 + x; };
console.log(foo(100));      //outputs 110
```
2) Lambda Statement
```typescript
var foo = (x:number)=> {
   x = 10 + x;
   console.log(x); // print 110
}
foo(100);
```
On compiling, it will generate following JavaScript code.
```javascript
var foo = function (x) {
   x = 10 + x;
   console.log(x); // print 110
};
foo(100);
```
3) Arrow Functions
```javascript
// regular function
var calculateInterest = function (amount, interestRate, duration) {
    return amount * interestRate * duration / 12;
}
// convert to arrow function
var calculateInterest = (amount, interestRate, duration) => {
    return amount * interestRate * duration / 12;
}
// much shorter arrow function
var calculateInterest = (amount, interestRate, duration) => amount * interestRate * duration / 12;
```
4) `this` variable in arrow function
```javascript
function Person(age) {
    this.age = age
    this.growOld = function() {
        this.age++;
    }
}
var person = new Person(1);
setTimeout(person.growOld, 1000);

setTimeout(function(){ console.log(person.age); }, 2000); // print 1,  the this variable inside the Person function doesn’t actually represent the Person function.
```

```javascript
function Person(age) {
    this.age = age
    this.growOld = () => {
        this.age++;
    }
}
var person = new Person(1);
setTimeout(person.growOld, 1000);

setTimeout(function(){ console.log(person.age); }, 2000); // print 2
```
### 4.6 Function Overloads
Declare multiple functions with the same name but different function signature. The function signature doesn’t include the function’s return type.
1) The data type of the parameter
```typescript
function disp(string):void;
function disp(number):void;
```
2) The number of parameters
```typescript
function disp(n1:number):void;
function disp(x:number,y:number):void;
```
3) The sequence of parameters
```typescript
function disp(n1:number,s1:string):void;
function disp(s:string,n:number):void;
```

## 5. Interface
### 5.1 Declaring Interfaces
```typescript
interface IPerson {
   firstName:string,
   lastName:string,
   sayHi: ()=>string
}

var customer:IPerson = {
   firstName:"Tom",
   lastName:"Hanks",
   sayHi: ():string =>{return "Hi there"}
}

console.log(customer.firstName) // print Tom
console.log(customer.lastName)  // print Hanks
console.log(customer.sayHi())   // print Hi there
```
### 5.2 Union Type and Interface
```typescript
interface RunOptions {
   program:string;
   commandline:string[]|string|(()=>string);
}

//commandline as string
var options:RunOptions = {program:"test1",commandline:"Hello"};
console.log(options.commandline)      // print Hello

//commandline as a string array
options = {program:"test1",commandline:["Hello","World"]};
console.log(options.commandline[0]);  // print Hello
console.log(options.commandline[1]);  // print World
```
### 5.3 Interfaces and Arrays
```typescript
interface namelist {
   [index:number]:string
}

var list2:namelist = ["John",1,"Bran"] //Error. 1 is not type string  

interface ages {
   [index:string]:number
}

var agelist:ages;
agelist["John"] = 15   // Ok
agelist[2] = "nine"    // Error
```
### 5.4 Interfaces and Inheritance
Simple Interface Inheritance
```typescript
interface Person {
   age:number
}

interface Musician extends Person {
   instrument:string
}

var drummer = <Musician>{};
drummer.age = 27
drummer.instrument = "Drums"
console.log("Age:  " + drummer.age)                // print Age:  27
console.log("Instrument:  " + drummer.instrument)  // print Instrument:  Drums
```
Multiple Interface Inheritance
```typescript
interface IParent1 {
   v1:string
}

interface IParent2 {
   v2:string
}

interface Child extends IParent1, IParent2 { }
var obj:Child = { v1:"morning", v2:"afternoon"}
console.log("value 1: "+obj.v1+" value 2: "+obj.v2)  // print value 1: morning value 2: afternoon
```

## 6. Classes
A class definition can include the following.
* Fields − A field is any variable declared in a class. Fields represent data pertaining to objects
* Constructors − Responsible for allocating memory for the objects of the class
* Functions − Functions represent actions an object can take. They are also at times referred to as methods

### 6.1 Create Class
```typescript
class Person {
}
```
On compiling, it will generate following JavaScript code.
```javascript
var Person = /** @class */ (function () {
    function Person() {
    }
    return Person;
}());
```
One more example.
```typescript
class Car {
   //field
   engine:string;

   //constructor
   constructor(engine:string) {
      this.engine = engine
   }  

   //function
   disp():void {
      console.log("Function displays Engine is  :   "+this.engine)
   }
}

//create an object
var obj = new Car("XXSY1")

//access the field
console.log("Reading attribute value Engine as :  "+obj.engine)  

//access the function
obj.disp()
```
On compiling, it will generate following JavaScript code.
```javascript
var Car = (function () {
   //constructor
   function Car(engine) {
      this.engine = engine;
   }

   //function
   Car.prototype.disp = function () {
      console.log("Function displays Engine is  :   " + this.engine);
   };
   return Car;
}());

//create an object
var obj = new Car("XXSY1");

//access the field
console.log("Reading attribute value Engine as :  " + obj.engine);

//access the function
obj.disp();
```
### 6.2 Constructors
TypeScript uses the `constructor` keyword to declare constructors, rather than the class name. Another difference is that TypeScript automatically assigns constructor arguments as properties. You don’t need to assign instance variables in your constructor—that’s already done for you.
```typescript
class Person {
    constructor(private firstName: string, private lastName: string) { }
}
//equals this:
class Person {
    private firstName: string;
    private lastName: string;
    constructor(firstName: string, lastName: string) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
}
```

### 6.3 Class Inheritance
```typescript
class Shape {
   area:number

   constructor(area:number) {
      this.area = area
   }
}

class Circle extends Shape {
   disp():void {
      console.log("Area of the circle:  "+this.area)
   }
}

var obj = new Circle(100);
obj.disp()    // print Area of the circle:  100
```
On compiling, it will generate following JavaScript code.
```javascript
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Shape = /** @class */ (function () {
    function Shape(area) {
        this.area = area;
    }
    return Shape;
}());
var Circle = /** @class */ (function (_super) {
    __extends(Circle, _super);
    function Circle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Circle.prototype.disp = function () {
        console.log("Area of the circle:  " + this.area);
    };
    return Circle;
}(Shape));
var obj = new Circle(100);
obj.disp();
```
check class type.
Type Operators
```typescript
var num = 12
console.log(typeof num);   //output: number
var str = "hello";
console.log(typeof str);   //output: string
```
### 6.4 Class inheritance and Method Overriding
```typescript
class PrinterClass {
   doPrint():void {
      console.log("doPrint() from Parent called…")
   }
}

class StringPrinter extends PrinterClass {
   doPrint():void {
      super.doPrint()
      console.log("doPrint() is printing a string…")
   }
}

var obj = new StringPrinter()
obj.doPrint()
```
output.
```raw
doPrint() from Parent called…
doPrint() is printing a string…
```
### 6.5 The static Keyword
The `static` keyword can be applied to the data members of a class. A static variable retains its values till the program finishes execution. Static members are referenced by the class name.
```typescript
class Person {  
   static max:number;

   static disp():void {
      console.log("The value of num is: "+ Person.max)
   }
}

Person.max = 101     // initialize the static variable
Person.disp()        // invoke the static method
```
Output
```raw
The value of num is: 101
```
### 6.6 The instanceof operator
The `instanceof` operator returns true if the object belongs to the specified type.
```typescript
class Person{ }
var obj = new Person()
var isPerson = obj instanceof Person;  // true
console.log(" obj is an instance of Person " + isPerson);
```
### 6.7 Encapsulation and Access Specifiers
* public - A public data member has universal accessibility. Data members in a class are public by default.
* private - Private data members are accessible only within the class that defines these members. If an external class member tries to access a private member, the compiler throws an error.
* protected - A protected data member is accessible by the members within the same class as that of the former and also by the members of the child classes.

```typescript
class Encapsulate {
   str:string = "hello"
   private str2:string = "world"
}

var obj = new Encapsulate()
console.log(obj.str)     //accessible
console.log(obj.str2)   //compilation Error as str2 is private
```
### 6.8 Classes and Interfaces
```typescript
interface IPizza {
  name: string;
  toppings: string[];
}

class Pizza implements IPizza {
  constructor(public name: string, public toppings: string[]) {}
}

var obj = new Pizza('Inferno', ['cheese', 'peppers'])
console.log("Pizza is : "+obj.name+" with topping : "+obj.toppings )
```
output
```raw
Pizza is : Inferno with topping : cheese,peppers
```

## 7. Modules
Modules are broadly divided into −
* Internal Modules
* External Modules

### 7.1 Internal Module
Internal modules are obsolete instead we can use `namespace`. Internal modules are still supported, but its recommended to use namespace over internal modules.

Internal Module Syntax (Old)
```typescript
module MathUtils {
    export function add(x, y) {  
        console.log(x + y);
    }
}
```
Namespace Syntax (New)
```typescript
namespace MathUtils {
    export function add(x, y) {
        console.log(x + y);
    }
}
```
### 7.2 External Module
External modules in TypeScript exists to specify and load dependencies between multiple external js files.
### 7.3 Module Loader
To support loading external JavaScript files, we need a module loader. For browser the most common library used is RequieJS. This is an implementation of AMD (Asynchronous Module Definition) specification. Instead of loading files one after the other, AMD can load them all separately, even when they are dependent on each other.

### 7.4 Example
```typescript
// IShape.ts
export interface IShape {
   draw();
}

// Circle.ts
import shape = require("./IShape");
export class Circle implements shape.IShape {
   public draw() {
      console.log("Cirlce is drawn (external module)");
   }
}

// Triangle.ts
import shape = require("./IShape");
export class Triangle implements shape.IShape {
   public draw() {
      console.log("Triangle is drawn (external module)");
   }
}

// TestShape.ts
import shape = require("./IShape");
import circle = require("./Circle");
import triangle = require("./Triangle");  

function drawAllShapes(shapeToDraw: shape.IShape) {
   shapeToDraw.draw();
}

drawAllShapes(new circle.Circle());
drawAllShapes(new triangle.Triangle());
```
Compile for AMD systems.
```raw
tsc --module amd TestShape.ts
```
On compiling, it will generate following JavaScript code for AMD.
File:IShape.js
```javascript
define(["require", "exports"], function (require, exports) {
});
```
File:Circle.js
```javascript
define(["require", "exports"], function (require, exports) {
   var Circle = (function () {
      function Circle() {
      }
      Circle.prototype.draw = function () {
         console.log("Cirlce is drawn (external module)");
      };
      return Circle;
   })();
   exports.Circle = Circle;
});
```
File:Triangle.js
```javascript
define(["require", "exports"], function (require, exports) {
   var Triangle = (function () {
      function Triangle() {
      }
      Triangle.prototype.draw = function () {
         console.log("Triangle is drawn (external module)");
      };
      return Triangle;
   })();
   exports.Triangle = Triangle;
});
```
File:TestShape.js
```javascript
define(["require", "exports", "./Circle", "./Triangle"],
   function (require, exports, circle, triangle) {

   function drawAllShapes(shapeToDraw) {
      shapeToDraw.draw();
   }
   drawAllShapes(new circle.Circle());
   drawAllShapes(new triangle.Triangle());
});
```

The command to compile the TypeScript file for Commonjs systems is
```raw
tsc --module commonjs TestShape.ts
```
On compiling, it will generate following JavaScript code for Commonjs.

File:Circle.js
```javascript
var Circle = (function () {
   function Circle() {
   }
   Circle.prototype.draw = function () {
      console.log("Cirlce is drawn");
   };
   return Circle;
})();

exports.Circle = Circle;
```
File:Triangle.js
```javascript
var Triangle = (function () {
   function Triangle() {
   }
   Triangle.prototype.draw = function () {
      console.log("Triangle is drawn (external module)");
   };
   return Triangle;
})();
exports.Triangle = Triangle;
```
File:TestShape.js
```javascript
var circle = require("./Circle");
var triangle = require("./Triangle");

function drawAllShapes(shapeToDraw) {
   shapeToDraw.draw();
}
drawAllShapes(new circle.Circle());
drawAllShapes(new triangle.Triangle());
```
Output
```raw
Cirlce is drawn (external module)
Triangle is drawn (external module)
```

## 8. Others
### 8.1 Type Guard
Check type of variable with `typeof`.
```typescript
var var1: number | string;
var1 = "hello";
console.log(typeof var1 === "string") // print true
```
For classes you would use `instanceof`.
```typescript
class Person{ }
var obj = new Person()
console.log(obj instanceof Person);   // print true
```
### 8.2 tsconfig.json
The presence of a `tsconfig.json` file in a directory indicates that the directory is the root of a TypeScript project. The tsconfig.json file specifies the root files and the compiler options required to compile the project.

## 9. Reference
* [TypeScript Official Website](http://www.typescriptlang.org/)
* [TypeScript Tutorial](https://www.tutorialspoint.com/typescript/index.htm)
* [Enums](https://www.typescriptlang.org/docs/handbook/enums.html)
* [Union Types](https://blog.mariusschulz.com/2016/08/18/function-overloads-in-typescript)
* [tsconfig.json](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)
