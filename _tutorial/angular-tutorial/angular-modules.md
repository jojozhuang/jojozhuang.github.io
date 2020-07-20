---
layout: tutorial
key: tutorial
title: "Angular - Modules"
index: 8313
subcategory: angular-tutorial
date: 2018-03-12
tags: [Angular Modules]
---

> Learn to create and use modules in Angular application.

## 1. Introducing Modules
Angular applications are made up of Angular modules and JavaScript modules.
## 2. JavaScript Modules
When we code in Angular 5 in TypeScript, we use two JavaScript module keywords:
* Export: Export module code
* Import: Import module code

### 2.1 Exporting Code
Use the `export` keyword to export objects from the module to the outside world.  
1) Export the class App.
```typescript
export class App {...}
```
2) Export a default object from a module.
```typescript
module "foo" {
  export default function() { console.log("hello!") }
}
```
### 2.2 Importing Code
`import` statements tell TypeScript to go get module code from somewhere.
### 2.3 Importing Code from Someone Else’s Module
```typescript
import { Component } from '@angular/core';
import { DatepickerModule } from 'ngx-bootstrap/datepicker';
```
### 2.4 Importing Your Project Code
When you import code from local code in the same project, you specify a relative path to that code. The following example specifies a relative path (the ./). This tells TypeScript that the code is in the same folder as the code that’s going to use that module:
```typescript
import {AppComponent} from './app.component';
```
### 2.5 More import Syntaxes
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

## 3. Angular Module System
### 3.1 Modules in the Start Project
app.module.ts
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
* `declarations`: This should be an array of the Angular components, directives, and pipes used by your module and nothing else—no ES6 classes or anything else.
* `import`: This should be an array of Angular modules required by the application here.
* `providers`: This should be an array of Angular provider objects required by the application. These provider objects are services classes and values that are injected into your classes for you using dependency injection.
* `bootstrap`: You can use modules to contain the code for your application. To run, your application needs to know how to start and with what component it should start (the root).

### 3.2 Root Module
Your Angular application can contain multiple modules. But it always has a starting point, a module that it uses to bootstrap itself. This is the root module, often called the AppModule `app.module.ts`.
### 3.3 Routing Module
Routing Module allows the user to map components to URLs and navigate the user interface. When we use the CLI to build an Angular application, it builds a separate module for your application’s routing, usually in the file `app.route.ts`
### 3.4 Shared Modules
Shared modules contain the most commonly used code that’s modularized so it can be reused as much as possible. When required, the root module can include as many shared modules as required.

Use the following CLI command to generate a new module.
```raw
$ ng g module shared
```
### 3.5 Useful Node Commands
* npm link
* npm scope

## 4. References
* [Book - Angular 5 Projects](https://www.amazon.com/Angular-Projects-Learn-Single-Applications/dp/148423278X)
* [Angular Doc - NgModules](https://angular.io/guide/ngmodules)
