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


## 3. RESTful API
* [Developing a RESTful API with Node and TypeScript](http://mherman.org/blog/2016/11/05/developing-a-restful-api-with-node-and-typescript/)
* [How to Handle an OPTIONS Request in Express](http://johnzhang.io/options-request-in-express)
* [RESTful API Design: How to handle errors?](https://alidg.me/blog/2016/9/24/rest-api-error-handling)

## 4. Resources
* [Date manipulation - momentjs](http://momentjs.com/)

## 5. Server
* [How to sleep the thread in node.js without affecting other threads?](https://stackoverflow.com/questions/13448374/how-to-sleep-the-thread-in-node-js-without-affecting-other-threads)

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



## 7. security
* [Production Best Practices: Security](https://expressjs.com/en/advanced/best-practice-security.html)
* [4 Simple Steps to Secure Your Express Node Application](http://scottksmith.com/blog/2014/09/04/simple-steps-to-secure-your-express-node-application/)
* [csurf](https://www.npmjs.com/package/csurf)
* [SECCOMP wiki](https://en.wikipedia.org/wiki/Seccomp)
* [Seccomp security profiles for Docker](https://docs.docker.com/engine/security/seccomp/)
* [Compiling a program with limited library access](https://stackoverflow.com/questions/27731599/compiling-a-program-with-limited-library-access)
[Online Judge 是如何解决判题端安全性问题的？](https://www.zhihu.com/question/23067497)
https://www.zhihu.com/question/27340709




## 10. Third-part libraries
// ncp - Asynchronous recursive file & directory copying, `cp -r`
https://www.npmjs.com/package/ncp

// app-root-path
https://www.npmjs.com/package/app-root-path

## 11. Run Script
// compile java with shell script
https://alvinalexander.com/blog/post/java/unix-shell-script-i-use-for-compiling-java-programs

// ShellJS - Unix shell commands for Node.js, Can be used to create deployment script.
https://www.npmjs.com/package/shelljs

Knowledge, difference between spawn, execute in node js.

OPTIONS Request, CORS, pre-flight,
https://stackoverflow.com/questions/29954037/why-is-an-options-request-sent-and-can-i-disable-it

## 12. Angular
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


Update parent component property from child component in Angular 2
https://stackoverflow.com/questions/41464871/update-parent-component-property-from-child-component-in-angular-2
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

## 13. Javascript
Asynchronous code inside an array loop
https://codeburst.io/asynchronous-code-inside-an-array-loop-c5d704006c99



## 16. Mongo
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


* [How to parse command line arguments](https://docs.nodejitsu.com/articles/command-line/how-to-parse-command-line-arguments/)

## 17. javascript
How to read line by line of a text area
```javascript
var lines = $('textarea').val().split('\n');
for(var i = 0;i < lines.length;i++){
    //code here using lines[i] which will give you each line
}
```
* [Asynchronous code inside an array loop](https://codeburst.io/asynchronous-code-inside-an-array-loop-c5d704006c99)
* [JavaScript loops — how to handle async/await](https://blog.lavrton.com/javascript-loops-how-to-handle-async-await-6252dd3c795)




## 22. MongoDB
* [Get Most Recent Document By Type With Mongo Aggregation Query](https://stackoverflow.com/questions/48274137/get-most-recent-document-by-type-with-mongo-aggregation-query)


```raw
db.submissions.aggregate([
    { $sort: { "timecreated": -1 } },
    { $group: { _id: "$language", latest: { $first: "$$ROOT" } }},
    { $project : {_id : "$latest._id", username : "$latest.username", questionname : "$latest.questionname", solution : "$latest.solution", language : "$latest.language", status : "$latest.status", timeupdated : "$latest.timeupdated", timesubmitted : "$latest.timesubmitted", runtime : "$latest.runtime" }},
    { $sort: { "language": 1 } }
]).pretty()
```

## 23. Async in loop
async for loop in node.js
https://stackoverflow.com/questions/21184340/async-for-loop-in-node-js

 Execute in parallel.
```javascript
var results = [];
var config = JSON.parse(queries);
var onComplete = function() {
    res.writeHead( ... );
    res.end(results);
};
var keys = Object.keys(config);
var tasksToGo = keys.length;
if (tasksToGo === 0) {
   onComplete();
} else {
    // There is at least one element, so the callback will be called.
    keys.forEach(function(key) {
        var query = config[key].query;
        search(query, function(result) {
            results.push(result);
            if (--tasksToGo === 0) {
                // No tasks left, good to go
                onComplete();
            }
        });
    });
}
```
If the functions need to be called in a specific order, then you can use recursion to get the desired effect:
```javascript
var results = [];
var config = JSON.parse(queries);
var keys = Object.keys(config);
(function next(index) {
    if (index === keys.length) { // No items left
        res.writeHead( ... );
        res.end(results);
        return;
    }
    var key = keys[index];
    var query = config[key].query;
    search(query, function(result) {
        results.push(result);
        next(index + 1);
    });
})(0);
```
To simplify the above code, use `async`.
https://github.com/caolan/async
```javascript
var async = require("async");

var obj = {dev: "/dev.json", test: "/test.json", prod: "/prod.json"};
var configs = {};

async.forEachOf(obj, (value, key, callback) => {
    fs.readFile(__dirname + value, "utf8", (err, data) => {
        if (err) return callback(err);
        try {
            configs[key] = JSON.parse(data);
        } catch (e) {
            return callback(e);
        }
        callback();
    });
}, err => {
    if (err) console.error(err.message);
    // configs is now a map of JSON data
    doSomethingWith(configs);
});
```

## 24. JavaScript
run javascript with arguments
```javascript
// node SolutionTester.js 1 0 -1 -1
var twoSum = require("./Solution.js");

var args = process.argv.slice(2);          // args:   ['1','0','-1','-1']
var nums = args.slice(0, args.length - 1); // nums:   ['1','0','-1']
var target = args.slice(args.length - 1);  // target: ['-1']
var ret = twoSum(nums, target);
console.log("[result]", ret);              // result: [1,2]
```
Run javascript with node spawn.
```javascript
var argsRun = [];
argsRun[0] = file;
argsRun[1] = "1";
argsRun[2] = "0";
argsRun[3] = "-1";
argsRun[4] = "-1";
console.log("argsRun:", argsRun);  //argsRun: [OnlineJudgeMEAN/server/compiler/temp/two-sum_javascript_2018-07-07T23:10:37.605Z/SolutionTester.js','1','0','-1','-1' ]

// node SolutionTester.js 1 0 -1 -1
const executor = spawn("node", argsRun);
executor.stdout.on("data", output => {
    console.log("javascriptRunner->execute(): stdout:", String(output));
  if (out.startsWith("[result]")) {
    console.log(String(output)) // result: [1,2]
  }
});
executor.stderr.on("data", output => {
  console.log("javascriptRunner->execute(): stderr:", String(output));
});
executor.on("close", output => {
  console.log("javascriptRunner->execute(): close:", String(output));
});
```
Run in terminal.
```sh
$ node SolutionTester.js 1 0 -1 -1
```

Angular basis
* [CSS Encapsulation with Angular Components](https://coryrylan.com/blog/css-encapsulation-with-angular-components)

## 5. Reference
* [User Authentication with the MEAN Stack](https://www.sitepoint.com/user-authentication-mean-stack/)
* [Child Processes on Node.js Document](https://nodejs.org/api/child_process.html)
* [How do I create online compiler for C, C++ and Java using node.js as server language?](https://www.quora.com/How-do-I-create-online-compiler-for-C-C++-and-Java-using-node-js-as-server-language)
* [Go Tutorial](https://www.tutorialspoint.com/go/index.htm)
* [How to build Online Judge](https://www.zhihu.com/question/20343652)
* [Making a code compiler using Hackerrank API and ACE editor](http://blog.arpitdubey.com/making-a-code-compiler-using-hackerrank-api-and-ace-editor/)
* [How to build Online Judge](https://www.zhihu.com/question/20343652)

## 6. OnlineJudge
* [OnlineJudge](https://github.com/QingdaoU/OnlineJudge)
* [OnlineJudge Deploy](https://github.com/QingdaoU/OnlineJudgeDeploy)
