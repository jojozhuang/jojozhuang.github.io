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
