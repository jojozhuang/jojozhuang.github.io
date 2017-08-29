---
layout: post
key: blog
title: "Create Responsive Website with AngularJS"
date: 2016-02-23
tags: Directive, Expression
categories:
- blog
---

> Create Responsive Website with AngularJS.

AngularJS:
* Directives
* Expressions
* Filters
* Modules
* Controllers
* Events
* DOM
* Forms
* Input
* Validation
* Http

## 1. Directives
AngularJS extends HTML with ng-directives.
* The ng-app directive defines an AngularJS application.
* The ng-model directive binds the value of HTML controls (input, select, textarea) to application data.
* The ng-bind directive binds application data to the HTML view.

You can use data-ng-, instead of ng-, if you want to make your page HTML valid.  
Reason for: data- prefix  
HTML5 specification expects any custom attribute to be prefixed by data-.
[Embedding custom non-visible data with the data-* attributes](https://www.w3.org/TR/2011/WD-html5-20110525/elements.html#embedding-custom-non-visible-data-with-the-data-attributes)

ng-repeat

Create New Directives
```javascript
app.directive("w3TestDirective", function() {
    return {
        template : "<h1>Made by a directive!</h1>"
    };
});
```

## 2. Data binding
Data binding in AngularJS is the synchronization between the model and the view.

Two-way Binding

## 3. Controllers
AngularJS controllers control the data of AngularJS applications.

AngularJS controllers are regular JavaScript Objects.
A controller can have both properties and methods.

In AngularJS, $scope is the application object (the owner of application variables and functions).

## 4. Understanding the Scope
If we consider an AngularJS application to consist of:  
* View, which is the HTML.  
* Model, which is the data available for the current view.  
* Controller, which is the JavaScript function that makes/changes/removes/controls the data.  
Then the scope is the Model.

The scope is a JavaScript object with properties and methods, which are available for both the view and the controller.

The $rootScope is available in the entire application.
If a variable has the same name in both the current scope and in the rootScope, the application uses the one in the current scope.

## 5. Filters
Filters can be added to expressions by using the pipe character |, followed by a filter.  
[Filters](https://www.w3schools.com/angular/angular_filters.asp)

## 6. Services
```javascript
$location.absUrl();
$http.get("welcome.htm").then(function (response) {
    $scope.myWelcome = response.data;
});
```
$http is an AngularJS service for reading data from remote servers.

<select ng-model="selectedName" ng-options="x for x in names">
</select>

DOM:
<button ng-disabled="mySwitch">Click Me!</button>
<p ng-show="true">I am visible.</p>
<p ng-hide="true">I am not visible.</p>

## 7. Include
The way to create ui components.

## 8. Routing
The ngRoute module helps your application to become a Single Page Application.
templateUrl, controller

Features of Angular 2
* Components
* TypeScript
* Services

Components of Angular 2
* Modules
* Component
* Templates
* Metadata
* Service


## 9. References
* [Official website](https://angular.io/)
* [AngularJS Introduction](https://www.w3schools.com/angular/angular_intro.asp)
* https://www.tutorialspoint.com/angular2/index.htm
