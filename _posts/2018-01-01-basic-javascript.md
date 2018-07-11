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

**TypeScript**
2.1 What is Type Script
TypeScript is a superset of JavaScript (written by Microsoft) that primarily provides optional static typing, classes, and interfaces. Browsers can’t run TypeScript directly—not yet anyway. TypeScript code is compiled down to JavaScript.
```raw
TypeScript = JavaScript + Types + Classes + Modules + More
```
Microsoft website for learning typescript.
http://www.typescriptlang.org/

sample
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
same logic implemented with TypeScript
```TypeScript
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
2.1 Modules
Internal Modules, External Modules
2.2 Enumerations and Generics
```TypeScript
enum Color {Red, Green, Blue};
var c: Color = Color.Green;
```
1.3 Constructors
TypeScript uses the constructor keyword to declare constructors, rather than the class name. Another difference is that TypeScript automatically assigns constructor arguments as properties. You don’t need to assign instance variables in your constructor—that’s already done for you.
```TypeScript
class Person {
    constructor(private firstName: string, private lastName: string) {
    }
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
1.4 Arrow Functions
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
1.5 `this` variable in arrow function
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
1.6 Getters and Setters
```TypeScript
class foo {
  private _bar:boolean = false;
  get bar():boolean {
    return this._bar;
  }
  set bar(theBar:boolean) {
    this._bar = theBar;
  }
}

let myFoo = new foo();
var myBar = myFoo.bar;
myFoo.bar = true;
```
1.7 Types
```javascript
var mark = 123;         // javascript
var mark: number = 123; // typescript
```
1.7.1 Primitive Types
Primitive types aren’t inherited from the Object class and aren’t extendable.
any, number, string, boolean
1.7.2 Object Types
Object types inherited from the `Object` class and are extendable.
Number, String, Boolean
```javascript
String.prototype.Foo = function() {
    // DO THIS...
}
```
check class type.
```TypeScript
myString instanceof String
```
1.7.3 Union Types
```TypeScript
var name: string|number;

// both assignments are fine
this.name = 'abc';
this.name = 22;
```
Union types can also to apply to function arguments and results:
```TypeScript
function format(value: string, padding: string | number) {  }
function getFormatted(anyValue:any): string | number {  }
```
1.7.4 Alias Types
```TypeScript
type Location = string|number;
var loc: Location;
```
1.7.5 Tuple Types
```TypeScript
var contactInfo: [string, string, number];
contactInfo = ['Mark', '12 Welton Road', 30122];
```
1.8 Compilation Options
tsconfig.json


## 2. Visual Studio Code
1.1 Download
File->Open, `code .`
1.2 Seeing Files, Commands, and Hot Keys
CMD+P, CMD+Shift+P, CMD+Shift+M, CMD+Shift+D(Debug, breakpoint)
1.3 Starting a Build
tasks.json
https://code.visualstudio.com/docs/editor/tasks
1.4 Debugging
The debugging is more useful for debugging server-side code than for browser-side code,
1.5 sdfs

## 3. Node.js
3.1 Setting Up and Running Node
3.2 Node Package Manager (npm)
check whether your modules are outdated
```sh
npm outdated
```
update modules
```sh
npm update
npm update -g #update globally installed packages
```
```sh
npm uninstall
npm uninstall -g
```
3.3 Node Module Installation Levels
Global, local
```sh
npm install -g typescript  # global
npm install express        # local
```
3.4 Updating Node Modules
3.5 The package.json File
Ways of Specifying Version Numbers

 Version | Description
---------|--------------------------
1.2.1    | Must match version 1.2.1
\>1.2.1  | Must be later than version 1.2.1
\>=1.2.1 | Must be version 1.2.1 or later
<1.2.1   | Must be before version 1.2.1  
<=1.2.1  | Must be before or equal to version 1.2.1
~1.2.1   | Must be approximately equivalent to version 1.2.1
^1.2.1   | Must be compatible with version 1.2.1
1.2.x    | Must be any version starting with 1.2.
\*       | any version

3.6 The Folder node_modules
When you install a Node module, it’s downloaded and placed into the subfolder node_modules within your project folder.

```sh
npm install
```
package.json file.
```json
{
  "name" : "MyStaticServer",
  "version" : "0.0.1",
  "dependencies" : {
    "express" : "3.3.x"
  }
}
```
## 4. Starting to Code with the CLI
```sh
npm install -g angular-cli
ng --version
```
Upgrade CLI
```sh
npm uninstall -g angular-cli
npm cache clean
npm install -g angular-cli
```
4.1 Create a Start Project
What’s in the Root Folder?

File or Folder     | What It Is
-------------------|--
e2e                | Folder for testing files (more on testing, Karma, and protractor)  
node_modules       | Folder for project node dependencies
src                | Folder for project source code
.editorConfig      | editor configuration file
.gitignore         | git ignore file
angular-cli.json   | CLI configuration file. You change your CLi options in this file
karma-conf.json    | Karma configuration file (more on testing, Karma, and protractor)   
package.json       | node dependencies configuration file
protractor-conf.js | Protractor configuration file (more on testing, Karma, and protractor)
readMe.md          | readme informational file, contains information on CLI commands
tslint.json        | Lint configuration file

CLI-Generated project code

File or Folder | What It Is
---------------|-------------------
app            | Folder for your application source code files
assets         | Folder for your application image and CSS files
environments   | Folder for configuration files for environments
favicon.ico    | Application icon
index.html     | The htML page for the Angular single page application  
main.ts        | Code to start the application  
styles.css     | Global style definitions
test.ts        | Code to run the application tests
tsconfig.json  | Typescript/compiler configuration file


Bootstrapping
```json
@NgModule({
     ...
    bootstrap: [AppComponent]
})
```
Useful CLI Options
--flat
--inline-template
--inline-style
--spec false
--minimal

```sh
ng new components-ex100 --inline-template --inline-style
```
Ahead of Time Compilation
-aot option
```sh
ng serve -aot
```


## 5. angular component
5.1 Introducing Components
* `Include the style in the .ts class file`: This is called an inline style and it saves you having to have a style file for the component. As mentioned in the previous chapter, use the CLI --inline-style argument to generate components with inline styles.
* `Include the template in the .ts class file`: This is called an inline template and it saves you having to have a template file for the component. As mentioned in the previous chapter, use the CLI --inline-template argument to generate components with inline styles.
* `Include multiple component classes in the same file`: You can combine multiple components in the same file, like this:


```TypeScript
import { Component } from '@angular/core';
@Component({
  selector: 'Paragraph',
  template: `
  <p><ng-content></ng-content></p>
  `,
  styles: ['p { border: 1px solid #c0c0c0; padding: 10px }']
})
export class Paragraph {
}
@Component({
  selector: 'app-root',
  template: `
  <p>
  <Paragraph>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  </Paragraph>
  <Paragraph>Praesent eget ornare neque, vel consectetur eros. </Paragraph>
  </p>
  `,
  styles: ['p { border: 1px solid black }']
})
export class AppComponent {
  title = 'welcome to app!';
}
```
5.2 \@Component Annotation
```TypeScript
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
```
seperate files or all-in-one.
templateUrl/styleUrls, template/styles

5.3 Component Templates
Template Location: The template markup can be included in the same file as the Component class, or it can be in a separate file.

```typescript
@Component({
  selector: 'app-root',
  template: `
  <div class='app'>
  [app]
  <app-customer-list>
  </app-customer-list>
  </div>
  `,
  styles: ['.app {background-color:#d5f4e6;margin:10px;padding:10px;}']
})
// or
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
```
5.4 Elvis Operator
The Elvis operator is a question mark in the template expression next to the variable that may be null. This operator is also known as the ‘safe navigation operator’, which handles null values.
```raw
Total {{x.totalAmt}}     // error occurs if x is null
Total {{x?.totalAmt}}    // exit if x is null
Total {{x?.amt?.total}}  // multiple Elvis operators
```
5.5 Component Styles, Component Class
5.6 Introducing Data Binding
Data binding is what made Angular so popular—the synchronization of elements of the component UI widget to the data in  component classes, and vice versa.
There are two main types of databinding—one-way and two-way:
* One-way data binding: This can occur when the template (the View) is automatically kept up-to-date with the latest values in the class instance variables (the Model). Updates flow in only one direction. One-way data binding can also occur when the class instance variables (the Model) are automatically kept up-to-date with values input from the template (the View). Updates still flow in only one direction.
* Two-way data binding: This is when the class instance variables (the Model) and the template (the View) keep each other up-to- date.

One-Way Data Binding with {{ and }}
Those double curly braces are also known as moustaches or interpolation. The double curly braces are used for one-way binding a template expression, making a calculation from available data in the Model and including it in the View.
```typescript
• {{2+2}}
• {{firstName}}
• {{1 + 1 + getVal()}}
```
One-Way Data Binding with [ and ] or *
The square braces can be used for one-way binding.

Data Binding Target Markup

Markup  |  Description
--------------------------------------------------|--
<img [src] = "imageUrl">                          | sets image source to property imageUrl in the model.  
<div [ngClass] = "{selected: isSelected}"> </div> |  sets Css class according to property isSelected in the model.
<car-detail [car]="selectedCar"></car-detail>     |  sets the car attribute of the car-detail to property selectedCar in the model. the car-detail could be a component, and this would pass information from the current template to that component using the car attribute.
<button [style.color] = "isSpecial ? 'red' : 'green'">  |   sets the button color according to property isSpecial in the model.

Two-Way Data Binding with [( and )]
[()] is also known as banana in a box.
[(Data Binding Target)] = "Property"
“Data Binding Target” is something in the DOM (including Component and Directive tags) that can be bound to the property of the expression to the right side of the target. For the input box, the data binding target is `ngModel`, which corresponds to the text in the input box.

Event Handling
(Target Event) = "Template Statement"
The event information is available in the `$event` variable, which may or may not be utilized.

set focus
```TypeScript
ngAfterViewInit() {
    this.inputBox.nativeElement.focus()
}
```

CDK
The Angular CDK (Component Development Kit) was released in 2017 with Angular 5. Its purpose is to enable developers to create high-quality Angular custom components. The CDK is contains services, directives, components, classes and modules. The CDK contains code for component accessibility, text directionality, platform detection, and dynamic component instantiation. If you really want to get into building your own library of custom reusable components then you will need to install the `@angular/cdk` node module and get started.

## 9. Introducing Modules
Importing Code from Someone Else’s Module
```TypeScript
import { Component } from '@angular/core';
import { DatepickerModule } from 'ngx-bootstrap/datepicker';
```

JavaScript Modules
Exporting Code
```javascript
export class App {...}
module "foo" {
  export default function() { console.log("hello!") }
}
```
Importing Your Project Code
```TypeScript
import {AppComponent} from './app.component';
```

1) Import all:
```TypeScript
    import * as myModule from 'my-module';
```
2) With named import, the name needs to exactly match the name of an object exported in the module:
```TypeScript
    import { myMember } from 'my-module';
```
3) For multiple named imports from a module, the names need to exactly match the names of objects exported in the module:
```TypeScript
import { foo, bar } from 'my-module';
````
4) With a default import from a module, the name doesn’t need to match any object exported in the module. It can be an alias. It knows it has to import the default object from the module:
```TypeScript
    import myDefault from 'my-module';
```

Angular Module System
CLI and Webpack
Modules in the Start Project
module.ts
```TypeScript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
* declarations: This should be an array of the Angular components, directives, and pipes used by your module and nothing else—no ES6 classes or anything else.
* import: This should be an array of Angular modules required by the application here.
* providers: This should be an array of Angular provider objects required by the application. These provider objects are services classes and values that are injected into your classes for you using dependency injection.
* bootstrap: You can use modules to contain the code for your application. To run, your application needs to know how to start and with what component it should start (the root).

Root Module: app.module.ts
Routing Module: app.route.ts

ng generate module shared
* npm link
* npm scope

CHAPTER 10
Introducing Webpack
To make webpack configuration file available.
```sh
ng eject
```

## 9. Introducing Directives
Types of Directives
Angular includes several structural directives for you to use in the template:
* NgIf
* NgFor
* NgSwitch, NgSwitchWhen, NgSwitchDefault

Angular also includes several non-structural directives for use in the template:
* NgClass
* NgStyle
* NgControlName
* NgModel

ngFor Variables

 Variable   | Description
------------|--------------------------
Item itself | example: ngFor="#name of names". In this case, the item has the variable name.
Index       | Current loop iteration for each template context.  
last        | Boolean value indicating whether the item is the last one in the iteration.
last        | Boolean value indicating whether this item has an even index.
odd         | Boolean value indicating whether this item has an odd index.

ngSwitch, ngSwitchWhen, and ngSwitchDefault
```html
<select [(ngModel)]="selection">
  <option *ngFor="let option of options">{{option}}</option>
</select>
<div [ngSwitch]="selection">
  <div class="block1" *ngSwitchCase="options[0]">name</div>
  <div class="block2" *ngSwitchCase="options[1]">address</div>
  <div class="block3" *ngSwitchDefault>other</div>
</div>
```

9.2 Creating Directives
Directives are very useful when reused to add common behavior to user interfaces. They’re often placed into shared modules so they can be reused across applications.
```sh
ng generate directive sizer
```
Edit sizer.directive.ts: Change it to the following:
```TypeScript
import { Directive, Input, Component, ElementRef, Renderer, OnInit } from '@angular/core';
@Directive({
  selector: '[sizer]'
})
export class SizerDirective implements OnInit {
  @Input() sizer : string;
  constructor(private element: ElementRef, private renderer: Renderer) { }

  ngOnInit() {
    this.renderer.setElementStyle(this.element.nativeElement,'font-size', this.sizer);
  }
}
```
usage
```html
<div sizer="72px">
    {{title}}
</div>
```
9.3 Accessing the DOM Events in Directives
Using the Directive Element host
```TypeScript
@Directive({
  selector: 'input',
  host: {
    '(change)': 'onChange($event)',
    '(window:resize)': 'onResize($event)'
  }
})
class InputDirective {
  onChange(event:Event) {
    // invoked when the input element fires the 'change' event
  }
  onResize(event:Event) {
    // invoked when the window fires the 'resize' event
  }
}
```
HostListeners
Use HostListener annotations to bind a method in class to a DOM event.
```TypeScript
@HostListener('mouseenter') onMouseEnter() {
  this.highlight('yellow');
}
@HostListener('mouseleave') onMouseLeave() {
  this.highlight(null);
}
private highlight(color: string) {
  this.el.nativeElement.style.backgroundColor = color;
}
```
9.4 Accessing the DOM Properties in Directives
in the following code you could control the background color of the element by modifying the value of the backgroundColor instance variable:
```TypeScript
@Directive({
    selector: '[myHighlight]',
})
class MyDirective {
  @HostBinding('style.background-color') backgroundColor:string = 'yellow';
}
```

Creating a Directive with Events
```sh
ng generate directive hoverer
```
Edit hoverer.directive.ts: Change it to the following:
```TypeScript
import { Directive, Input, ElementRef, Renderer } from '@angular/core';
  @Directive({
    selector: '[hoverer]',
    host: {
      '(mouseenter)': 'onMouseEnter()',
      '(mouseleave)': 'onMouseLeave()'
    }
})

export class HovererDirective {
  @Input() hoverer;

  constructor(private elementRef:ElementRef, private renderer:Renderer) { }

  onMouseEnter(){
    this.renderer.setElementStyle(this.elementRef.nativeElement, 'color', this.hoverer);
  }

  onMouseLeave(){
    this.renderer.setElementStyle(this.elementRef.nativeElement, 'color', 'black');
  }
}
```
usage, ht should turn red when you hover over “welcome to app!”.
```html
  <h1 hoverer="red">welcome to app!</h1>
```
## 12. More Components

12.1 Template Reference Variables
A template reference variable is a reference to one or more elements within a template. You can use the `ref-` prefix instead of `#`.
ViewChild:
```html
<h1 #title></h1>
The title is {{title.innerHTML}}
```
```TypeScript
export class AppComponent implements AfterViewInit  {
  @ViewChild('title') title: ElementRef;
  ngAfterViewInit(){
    this.title.nativeElement.innerHTML = 'app works differently!'
  }
}
```
ViewChildren:
```html
<p #paragraph1>hello, world</p>
<p #paragraph2>Good morning</p>
<p *ngIf="note">{{note}}</p>
```
```TypeScript
export class AppComponent implements AfterViewInit{
  @ViewChildren('paragraph1, paragraph2') paragraphs;
  note: string = '';
  ngAfterViewInit(){
    setTimeout(_ => this.note = 'Number of Paragraphs:' +
    this.paragraphs.length);
  }
}
```
You should see two paragraphs of text, with a paragraph count beneath.

12.2 NgContent and Transclusion
ContentChild
ContentChildren
12.3 Component Class Lifecycle
Constructor vs. OnInit, ngAfterViewInit
Interfaces and Methods

 Interface          | Method                | Description
--------------------|-----------------------|--------------------------------------------------------
OnChanges           | ngOnChanges           | Called when an input or output binding value changes
OnInit              | ngOnInit              | After the first ngOnChanges
DoCheck             | ngDoCheck             | Developer’s custom change detection
AfterContentInit    | ngAfterContentInit    | After component content initialized
AfterContentChecked | ngAfterContentChecked | After every check of component content
AfterViewInit       | ngAfterViewInit       | After component's view(s) are initialized
AfterViewChecked    | ngAfterViewChecked    | After every check of a component's view(s)
OnDestroy           | ngOnDestroy           | Just before the directive is destroyed

## 13. Dependency Injection
Some of the advantages of dependency injection include the following:
• Your code is cleaner and more readable.
• Objects are loosely coupled.
• Possible to eliminate, or at least reduce, a component’s unnecessary dependencies.
• Reducing a component’s dependencies typically makes it easier to reuse in a different context.
• Increases a component’s testability.
• Moves the dependencies to the interface of components, so you don’t reference the dependencies explicitly—you reference them via interfaces.

. @Injectable()

There are three types of providers: class providers, factory providers, and value providers.

13.1 Convert App to Share One Instance of Service
push service class to app component or to the app.module.ts to avoid creating duplicated service instances.

13.2 Class Providers
```TypeScript
class Watch {
  getTime(): string {
    return new Date() + "";
  }
}
class Seiko extends Watch {
   getTime(): string{
     return "Seiko Time:" + super.getTime();
   }
}
@Component({
  selector: 'app-root',
  template: `
  <h1>
	{{watch.getTime()}}
  </h1>
  `,
  styles: [],
  providers: [{
	provide: Watch,
	useClass: Seiko
  }]
})
export class AppComponent {
  constructor(private watch:Watch){}
}
```
Notice the providers, useClass.
Factory Provider
```raw
providers: [{
  provide: LoggingService,
  useFactory: () => new LoggingService(LOGGING_USE_DATE);
]}
```

Value Provider
```TypeScript
providers: [{
  provide: 'language',
  useValue: 'en'
}]
```

Injector API
```TypeScript
import { Injector } from '@angular/core';
const injector = Injector.resolveAndCreate([Car, Engine, Tires, Doors]);
const car = injector.get(Car);
```
```TypeScript
import { Injector } from '@angular/core';
const injector = Injector.resolveAndCreate(
  [
    provide(Car, useClass: Car)),
    provide(Engine, useClass: Engine)),
    provide(Tires, useClass: Tires)),
    provide(Doors, useClass: Doors))
 ]
);
const car = injector.get(Car);
```

## 14. Angular and UI Widgets


## 7. Reference
