---
layout: tutorial
key: tutorial
title: "Online Judge - Others"
index: 9032
subcategory: online-judge
date: 2018-04-17
tags: [MEAN, Angular, Express, MongoDB]
---

> Build online judge application with MEAN stack(MongoDB, Express, Angular and Node.js).

## 1. Reactive Form
### 1.1 Form Validation
* [Angular Reactive Forms: trigger validation on submit](https://loiane.com/2017/08/angular-reactive-forms-trigger-validation-on-submit/)
* [Optional icons in horizontal and inline forms](https://getbootstrap.com/docs/3.3/css/)

### 1.2 Server side Validation
* [Express form](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/forms)
* [Express validation](https://express-validator.github.io/docs/)

### 1.3 Controls
Using ControlValueAccessor to Create Custom Form Controls in Angular, rating star
https://alligator.io/angular/custom-form-control/

### 1.4 Angular basis
* [CSS Encapsulation with Angular Components](https://coryrylan.com/blog/css-encapsulation-with-angular-components)

### 1.5 Two Way Data-Binding
Create 2 way data-binding with @Output.
```typescript
//result-panel.component.ts
@Input() testResult: number;
@Output() testResultChange = new EventEmitter<number>();
```
Notify parent if value changes.
```typescript
//result-panel.component.ts
close() {
  this.testResult = 0;
  this.testResultChange.emit(0); // notify parent
}
```
Use [(testResult)]="testResult", not [testResult]="testResult" to accept value change from child component.
```html
<!-- algorithm-question.component.html -->
<app-widget-result-panel [(testResult)]="testResult" [resultMessage]="resultMessage"></app-widget-result-panel>
```
* [Update parent component property from child component in Angular 2](https://stackoverflow.com/questions/41464871/update-parent-component-property-from-child-component-in-angular-2)

## 2. MongoDB
### 2.1 Aggregation
```raw
db.submissions.aggregate([
    { $sort: { "timecreated": -1 } },
    { $group: { _id: "$language", latest: { $first: "$$ROOT" } }},
    { $project : {_id : "$latest._id", username : "$latest.username", questionname : "$latest.questionname", solution : "$latest.solution", language : "$latest.language", status : "$latest.status", timeupdated : "$latest.timeupdated", timesubmitted : "$latest.timesubmitted", runtime : "$latest.runtime" }},
    { $sort: { "language": 1 } }
]).pretty()
```
* [Get Most Recent Document By Type With Mongo Aggregation Query](https://stackoverflow.com/questions/48274137/get-most-recent-document-by-type-with-mongo-aggregation-query)

## 3. RESTful API
* [Developing a RESTful API with Node and TypeScript](http://mherman.org/blog/2016/11/05/developing-a-restful-api-with-node-and-typescript/)
* [RESTful API Design: How to handle errors?](https://alidg.me/blog/2016/9/24/rest-api-error-handling)
* [How to Handle an OPTIONS Request in Express](http://johnzhang.io/options-request-in-express)
* [Why is an OPTIONS request sent and can I disable it?](https://stackoverflow.com/questions/29954037/why-is-an-options-request-sent-and-can-i-disable-it)

## 4. Issues
### 4.1 Error: No default engine was specified and no extension was provided
The res.render stuff will throw an error if you're not using a view engine.
* [Error: No default engine was specified and no extension was provided](https://stackoverflow.com/questions/23595282/error-no-default-engine-was-specified-and-no-extension-was-provided)

If you just want to serve json replace the res.render('error', { error: err }); lines in your code with:
```javascript
res.json({ error: err })
PS: People usually also have message in the returned object:

res.status(err.status || 500);
res.json({
  message: err.message,
  error: err
});
```

### 4.2 ErrorHttpInterceptor
when using HttpInterceptor to handle http request error, do not call
```javascript
//ErrorHttpInterceptor.intercept()
return next.handle(request);
```
It will make zone.js to send second same request to server. Instead, throw the error.
```javascript
//ErrorHttpInterceptor.intercept()
return _throw(this.messages);
```

## 5. Todo
* Collaborative editor
* IM message.
* unit test with mocha
* docker
* collaborative online judge system: google doc + online compiler.
* create pipe for time date, create pipe for shorten the description in table.
* knowledge: type script, angular 4, rxjs,
* how to get dev and prod, to show error message in http.interceptor.ts

## 6. Reference
* [Child Processes on Node.js Document](https://nodejs.org/api/child_process.html)
* [How do I create online compiler for C, C++ and Java using node.js as server language?](https://www.quora.com/How-do-I-create-online-compiler-for-C-C++-and-Java-using-node-js-as-server-language)
* [How to build Online Judge](https://www.zhihu.com/question/20343652)
* [Making a code compiler using Hackerrank API and ACE editor](http://blog.arpitdubey.com/making-a-code-compiler-using-hackerrank-api-and-ace-editor/)
* [How to build Online Judge](https://www.zhihu.com/question/20343652)
