---
layout: tutorial
key: tutorial
title: "Building Online Judge Application With Angular and ExpressJS(Draft)"
index: 331
category: angular
image: angular.png
date: 2018-04-09
tags: [Angular, Nodejs]
---

> Build online judge application with React.


Todo:
* Submission comparison(Text Compare)
* Admin user role
* Show submission
* Collaborative editor
* IM message.
* Environment variable, database url, server url.
* admin user role
* view submission
* unit test with mocha
* docker
* collaborative online judge system: google doc + online compiler.
* create pipe for time date, create pipe for shorten the description in table.
* knowledge: type script, angular 4, rxjs,
* how to get dev and prod, to show error message in http.interceptor.ts

## 1. Use Starter to Create new Project
* [Angular Webpack Starter](https://github.com/gdi2290/angular-starter)

## 2. Reactive Form
### 2.1 Form Validation
* [Angular Reactive Forms: trigger validation on submit](https://loiane.com/2017/08/angular-reactive-forms-trigger-validation-on-submit/)
* [Optional icons in horizontal and inline forms](https://getbootstrap.com/docs/3.3/css/)

### 2.2 Server side Validation
* [Express form](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/forms)
* [Express validation](https://express-validator.github.io/docs/)

### 2.3 Sign up and Login
* [Angular 6 - User Registration and Login Example & Tutorial](http://jasonwatmore.com/post/2018/05/16/angular-6-user-registration-and-login-example-tutorial)
* [angular-6-registration-login-example](https://github.com/cornflourblue/angular-6-registration-login-example)
* [Login Sample](https://stackblitz.com/edit/angular-6-registration-login-example?file=app%2Fhome%2Fhome.component.ts)
* [Login Sample Code](https://stackblitz.com/edit/angular-6-registration-login-example?file=app%2Fhome%2Fhome.component.ts)
* [Sample code for Sign up and Login](https://github.com/braitsch/node-login)
* [User Authentication with the MEAN Stack](https://www.sitepoint.com/user-authentication-mean-stack/)
* [Node.js and Password Storage with Bcrypt](http://www.summa.com/blog/node.js-and-password-storage-with-bcrypt)
* [Validator used for confirm password in 'Change Password'](https://gist.github.com/slavafomin/17ded0e723a7d3216fb3d8bf845c2f30)

### 2.4 Controls
Using ControlValueAccessor to Create Custom Form Controls in Angular, rating star
https://alligator.io/angular/custom-form-control/

Modal Dialogs
https://valor-software.com/ngx-bootstrap/#/modals

### 2.5 Angular basis
* [CSS Encapsulation with Angular Components](https://coryrylan.com/blog/css-encapsulation-with-angular-components)

### 2.6 Create 2 way data-binding with @Output.
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

## 3. Mongo
Create default user
```javascript
// Get collection names
mongoose.connection.on("open", function() {
  const users = mongoose.connection.db.collection("users");

  users.findOne({ username: "jojozhuang" }, function(err, user) {
    if (!user) {
      const defaultUser = {
        username: "jojozhuang",
        email: "jojozhuang@gmail.com",
        hash:
          "9f51bcd7a80a8da6fa02dcc9e136cd2ea5a08a24c988e4d822ebeb0b3eb430fd9a62af4fc6e1c456cb12cbc5b8792f737166ca39b3bb0fe4d34e1cd1ae134fd3",
        salt: "f8dae7c30d811b322b8763afc424fec0",
        timecreated: Date.now
      };

      users.save(defaultUser, function(err) {
        console.log(
          "[Database Initialization] New admin user 'jojozhuang' was created!"
        );
        console.log("[Default Admin] User Name: jojozhuang, Password: 111111");
      });

      users.save(defaultUser);
    } else {
      console.log("[Default Admin] User Name: jojozhuang, Password: 111111");
    }
  });
});
```

## 4. Server
### 4.1 Testing Async
Sleep the thread.

sleep
```javascript
var sleep = require('sleep');
    sleep.sleep(5)//sleep for 5 seconds, this will block the whole event loop execution
```
async
```javascript
const snooze = ms => new Promise(resolve => setTimeout(resolve, ms));

const example = async () => {
  console.log("About to snooze without halting the event loop...");
  await snooze(5000);
  console.log("done!");
};
```
* [How to sleep the thread in node.js without affecting other threads?](https://stackoverflow.com/questions/13448374/how-to-sleep-the-thread-in-node-js-without-affecting-other-threads)

### 4.2 Async Files Operations
// ncp - Asynchronous recursive file & directory copying, `cp -r`
https://www.npmjs.com/package/ncp

// app-root-path
https://www.npmjs.com/package/app-root-path

## 5. OnlineJudge
### 5.1 Sample OnlineJudge
* [OnlineJudge](https://github.com/QingdaoU/OnlineJudge)
* [OnlineJudge Deploy](https://github.com/QingdaoU/OnlineJudgeDeploy)

### 5.2 security
* [Production Best Practices: Security](https://expressjs.com/en/advanced/best-practice-security.html)
* [4 Simple Steps to Secure Your Express Node Application](http://scottksmith.com/blog/2014/09/04/simple-steps-to-secure-your-express-node-application/)
* [csurf](https://www.npmjs.com/package/csurf)
* [SECCOMP wiki](https://en.wikipedia.org/wiki/Seccomp)
* [Seccomp security profiles for Docker](https://docs.docker.com/engine/security/seccomp/)
* [Compiling a program with limited library access](https://stackoverflow.com/questions/27731599/compiling-a-program-with-limited-library-access)
[Online Judge 是如何解决判题端安全性问题的？](https://www.zhihu.com/question/23067497)
https://www.zhihu.com/question/27340709

## 6. Resources
1) Date manipulation with momentjs
* [Date manipulation - momentjs](http://momentjs.com/)

## 7. MongoDB
* [Get Most Recent Document By Type With Mongo Aggregation Query](https://stackoverflow.com/questions/48274137/get-most-recent-document-by-type-with-mongo-aggregation-query)

```raw
db.submissions.aggregate([
    { $sort: { "timecreated": -1 } },
    { $group: { _id: "$language", latest: { $first: "$$ROOT" } }},
    { $project : {_id : "$latest._id", username : "$latest.username", questionname : "$latest.questionname", solution : "$latest.solution", language : "$latest.language", status : "$latest.status", timeupdated : "$latest.timeupdated", timesubmitted : "$latest.timesubmitted", runtime : "$latest.runtime" }},
    { $sort: { "language": 1 } }
]).pretty()
```

## 8. RESTful API
* [Developing a RESTful API with Node and TypeScript](http://mherman.org/blog/2016/11/05/developing-a-restful-api-with-node-and-typescript/)
* [RESTful API Design: How to handle errors?](https://alidg.me/blog/2016/9/24/rest-api-error-handling)

OPTIONS Request, CORS, pre-flight,
* [How to Handle an OPTIONS Request in Express](http://johnzhang.io/options-request-in-express)
* [Why is an OPTIONS request sent and can I disable it?](https://stackoverflow.com/questions/29954037/why-is-an-options-request-sent-and-can-i-disable-it)

## 9. Issues
### 9.1 Error: No default engine was specified and no extension was provided
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

### 9.2 ErrorHttpInterceptor
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

## 10. Reference
* [User Authentication with the MEAN Stack](https://www.sitepoint.com/user-authentication-mean-stack/)
* [Child Processes on Node.js Document](https://nodejs.org/api/child_process.html)
* [How do I create online compiler for C, C++ and Java using node.js as server language?](https://www.quora.com/How-do-I-create-online-compiler-for-C-C++-and-Java-using-node-js-as-server-language)
* [Go Tutorial](https://www.tutorialspoint.com/go/index.htm)
* [How to build Online Judge](https://www.zhihu.com/question/20343652)
* [Making a code compiler using Hackerrank API and ACE editor](http://blog.arpitdubey.com/making-a-code-compiler-using-hackerrank-api-and-ace-editor/)
* [How to build Online Judge](https://www.zhihu.com/question/20343652)
