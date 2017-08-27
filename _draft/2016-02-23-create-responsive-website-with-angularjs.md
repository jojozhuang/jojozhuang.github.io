---
layout: post
key: blog
title: "Create Responsive Website with AngularJS"
date: 2016-02-23
tags: Install, Directive, Expression
categories:
- blog
---

> Create Responsive Website with AngularJS.

AngularJS: directives, expressions, filters, modules, and controllers.
Events, DOM, Forms, Input, Validation, Http, and more.

AngularJS extends HTML with ng-directives.
The ng-app directive defines an AngularJS application.
The ng-model directive binds the value of HTML controls (input, select, textarea) to application data.
The ng-bind directive binds application data to the HTML view.

You can use data-ng-, instead of ng-, if you want to make your page HTML valid.
reason for: data- prefix
HTML5 specification expects any custom attribute to be prefixed by data-.
https://www.w3.org/TR/2011/WD-html5-20110525/elements.html#embedding-custom-non-visible-data-with-the-data-attributes

ng-repeat

Create New Directives
app.directive("w3TestDirective", function() {
    return {
        template : "<h1>Made by a directive!</h1>"
    };
});

Data binding in AngularJS is the synchronization between the model and the view.

Two-way Binding

AngularJS controllers control the data of AngularJS applications.

AngularJS controllers are regular JavaScript Objects.
A controller can have both properties and methods.

In AngularJS, $scope is the application object (the owner of application variables and functions).

Understanding the Scope
If we consider an AngularJS application to consist of:

View, which is the HTML.
Model, which is the data available for the current view.
Controller, which is the JavaScript function that makes/changes/removes/controls the data.
Then the scope is the Model.

The scope is a JavaScript object with properties and methods, which are available for both the view and the controller.

The $rootScope is available in the entire application.
If a variable has the same name in both the current scope and in the rootScope, the application uses the one in the current scope.

Filters can be added to expressions by using the pipe character |, followed by a filter.

https://www.w3schools.com/angular/angular_filters.asp

Services:
$location.absUrl();
$http.get("welcome.htm").then(function (response) {
    $scope.myWelcome = response.data;
});
$http is an AngularJS service for reading data from remote servers.

<select ng-model="selectedName" ng-options="x for x in names">
</select>

DOM:
<button ng-disabled="mySwitch">Click Me!</button>
<p ng-show="true">I am visible.</p>
<p ng-hide="true">I am not visible.</p>

Include:
The way to create ui components.

Routing:
The ngRoute module helps your application to become a Single Page Application.
templateUrl, controller
