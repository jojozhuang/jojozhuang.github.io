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





## 5. angular component
5.1 Introducing Components
* `Include the style in the .ts class file`: This is called an inline style and it saves you having to have a style file for the component. As mentioned in the previous chapter, use the CLI --inline-style argument to generate components with inline styles.
* `Include the template in the .ts class file`: This is called an inline template and it saves you having to have a template file for the component. As mentioned in the previous chapter, use the CLI --inline-template argument to generate components with inline styles.
* `Include multiple component classes in the same file`: You can combine multiple components in the same file, like this:


```typescript
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
```typescript
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
```typescript
ngAfterViewInit() {
    this.inputBox.nativeElement.focus()
}
```

CDK
The Angular CDK (Component Development Kit) was released in 2017 with Angular 5. Its purpose is to enable developers to create high-quality Angular custom components. The CDK is contains services, directives, components, classes and modules. The CDK contains code for component accessibility, text directionality, platform detection, and dynamic component instantiation. If you really want to get into building your own library of custom reusable components then you will need to install the `@angular/cdk` node module and get started.

## 9. Introducing Modules
Importing Code from Someone Else’s Module
```typescript
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
```typescript
import {AppComponent} from './app.component';
```

1) Import all:
```typescript
    import * as myModule from 'my-module';
```
2) With named import, the name needs to exactly match the name of an object exported in the module:
```typescript
    import { myMember } from 'my-module';
```
3) For multiple named imports from a module, the names need to exactly match the names of objects exported in the module:
```typescript
import { foo, bar } from 'my-module';
````
4) With a default import from a module, the name doesn’t need to match any object exported in the module. It can be an alias. It knows it has to import the default object from the module:
```typescript
    import myDefault from 'my-module';
```

Angular Module System
CLI and Webpack
Modules in the Start Project
module.ts
```typescript
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
```typescript
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
```typescript
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
```typescript
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
```typescript
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
```typescript
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
```typescript
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
```typescript
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
```typescript
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
```typescript
providers: [{
  provide: 'language',
  useValue: 'en'
}]
```

Injector API
```typescript
import { Injector } from '@angular/core';
const injector = Injector.resolveAndCreate([Car, Engine, Tires, Doors]);
const car = injector.get(Car);
```
```typescript
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
Bootstrap and Material

## 15. Routes and Navigation
### 15.1 Router Module
Objects in the Router Module

Object           | Type      | Description
-----------------|-----------|------------------
RouterModule     | Module    | A separate angular module that provides the necessary service providers and directives for navigating through application views.
Router           |           | Displays the application component for the active urL. Manages navigation from one component to the next.
Routes           |           | Defines an array of routes, each mapping a urL path to a component.
Route            |           | Defines how the router should navigate to a component based on a urL pattern. Most routes consist of a path and a component type.
RouterOutlet     | Directive | The directive (\<router-outlet\>) that marks where the router displays a view.
RouterLink       | Directive | The directive for binding a clickable htML element to a route. Clicking an element with a RouterLink directive that’s bound to a string or a link parameters array triggers a navigation.
RouterLinkActive | Directive | The directive for adding/removing classes from an htML element when an associated RouterLink contained on or inside the element becomes active/inactive.
ActivatedRoute   |           | A service that’s provided to each route component that contains route-specific information such as route parameters, static data, resolve data, global query params, and the global fragment.  
RouterState      |           | The current state of the router including a tree of the currently activated routes together with convenience methods for traversing the route tree.

### 15.2 Route Path Parameters
URL: http://www.example.com/customer/123

You can read the parameter from the route snapshot.
```typescript
constructor(route: ActivatedRoute) {
    this.customerId = route.snapshot.paramMap.get('id');
}
```
You can read the parameter by subscribing to an observable parameter map.
```typescript
constructor(route: ActivatedRoute) {
  route.paramMap.subscribe(
    params => this.customerId = params.get('id')
  );
}
```

### 15.3 Route Query Parameters
URL: http://www.example.com/customer?id=123.

You can read the query parameter from the route snapshot.
```typescript
constructor(route: ActivatedRoute) {
  this.customerId = route.snapshot.queryParams['id'];
}
```
You can read the parameter by subscribing to an observable query parameter map.
```typescript
constructor(route: ActivatedRoute) {
  route.queryParams.subscribe(
    params => this.customerId = params.get('id')
  );
}
```

### 15.4 Router Imperative Navigation
The two methods are Router.navigate() and Router.navigateByUrl().

* Router.navigate: This navigates to a component relatively (to the current route) or absolutely based on an array of commands or route elements.
* Router.navigateByUrl: This navigates to a complete absolute URL string. If the given URL begins with a /, the router will navigate absolutely. If the given URL doesn’t begin with /, the router will navigate relative to this component.

### 15.5 Router: Extracting Data
Extracting Data from Router

 Property           | Description
--------------------|-------------------
errorHandler        | Error handler that’s invoked when a navigation errors
navigated           | Indicates if at least one navigation happened
urlHandlingStrategy | URL handling strategy
routeReuseStrategy  | Route reuse strategy
routerState         | Current router state
url events          | Current URL
error               | An observable of router events, allows you to add callbacks to router events

### 15.6 Route Guards
There are two main types of route guards:
* CanActivate: Can the user navigate to a route? In this class, you can inject the router. This is useful to navigate the user away to another resource if the user isn’t allowed to navigate to a route.
* CanDeactivate: Can the user move away from a route? Useful for prompting to save changes.

Allow to access only if user has logged in.
```typescript
import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { AuthenticationService } from "./authentication.service";

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private auth: AuthenticationService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.auth.isLoggedIn()) {
      // not logged in so redirect to login page with the return url
      this.router.navigate(["/login"], {
        queryParams: { returnUrl: state.url }
      });
      return false;
    }
    return true;
  }
}
```
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
