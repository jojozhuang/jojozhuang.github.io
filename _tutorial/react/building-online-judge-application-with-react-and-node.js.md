---
layout: tutorial
key: tutorial
title: "Building Online Judge Application With React and Node.js(Draft)"
index: 360
category: reactjs
image: reactjs.png
date: 2018-04-09
tags: [React, Nodejs]
---

> Build online judge application with React.

Next app, collaborative online judge system: google doc + online compiler.

1. admin user role
2. view submission
3. unit test with mocha
4. docker

Todo: create pipe for time date, create pipe for shorten the description in table.


knowledge: type script, angular 4, rxjs,


issues:
1. how to get dev and prod, to show error message in http.interceptor.ts
2. modal confirm, for deletion.

```
npm install bootstrap@3.3.7
```
https://github.com/gdi2290/angular-starter

https://loiane.com/2017/08/angular-reactive-forms-trigger-validation-on-submit/

[Optional icons in horizontal and inline forms](https://getbootstrap.com/docs/3.3/css/)

http://jasonwatmore.com/post/2018/05/16/angular-6-user-registration-and-login-example-tutorial
https://github.com/cornflourblue/angular-6-registration-login-example
https://stackblitz.com/edit/angular-6-registration-login-example?file=app%2Fhome%2Fhome.component.ts

Login.
https://github.com/braitsch/node-login

Express form
https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/forms

Express validation
https://express-validator.github.io/docs/

Developing a RESTful API with Node and TypeScript
http://mherman.org/blog/2016/11/05/developing-a-restful-api-with-node-and-typescript/

How to Handle an OPTIONS Request in Express
http://johnzhang.io/options-request-in-express

For Alert message
https://stackoverflow.com/questions/34585453/how-to-bind-raw-html-in-angular2

RESTful API Design: How to handle errors?
https://alidg.me/blog/2016/9/24/rest-api-error-handling

Date manipulation
http://momentjs.com/

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
https://stackoverflow.com/questions/13448374/how-to-sleep-the-thread-in-node-js-without-affecting-other-threads

User Authentication with the MEAN Stack
https://www.sitepoint.com/user-authentication-mean-stack/

Version #2: Union Types
https://blog.mariusschulz.com/2016/08/18/function-overloads-in-typescript

User system, register, login.

use express middleware to implement the authentication.
Use bcrypt to hash password

Hashing Passwords with Node.js and Bcrypt
https://www.abeautifulsite.net/hashing-passwords-with-nodejs-and-bcrypt
http://www.summa.com/blog/node.js-and-password-storage-with-bcrypt

The res.render stuff will throw an error if you're not using a view engine.
https://stackoverflow.com/questions/23595282/error-no-default-engine-was-specified-and-no-extension-was-provided
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

Validator used for confirm password in 'Change Password'
https://gist.github.com/slavafomin/17ded0e723a7d3216fb3d8bf845c2f30


// remember me, cookie
1) save token to response cookie if 'Remember me' is selected.
```javascript
// If a user is found
if (user) {
  var token = user.generateJwt();
  if (req.body.remember == true) {
    console.log("remember me, save cookie");

    res.cookie("cookieToken", token, { maxAge: 900000 }); //expires after 900000 ms = 15 minutes
  }
  res.status(200);
  res.json({
    token: token
  });
}
```
2) save cookie to browser. It is done when token is saved to local storage.
```javascript
base = this.http.post(this.baseUrl + `api/authentication/${type}`, user);

const request = base.pipe(
  map((data: TokenResponse) => {
    if (refresh && data.token) {
      AuthUtil.saveToken(data.token, savecookie);
    }
    return data.token;
  })
);
```
3) In the `ngOnInit` event of login page, start auto login if cookie token is available.
```javascript
ngOnInit() {
    ...

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";

    // auto login with cookie
    const cookieToken = AuthUtil.getCookieToken();
    console.log(cookieToken);

    if (cookieToken) {
      this.authService.autologin().subscribe(
        () => {
          //this.alertService.success("Login successful!", true);
          console.log(document.cookie);
          this.router.navigate([this.returnUrl]);
        },
        err => {
          console.error(err);
          // reset login status
          this.authService.logout(false);
        }
      );
    } else {
      // reset login status
      this.authService.logout(false);
    }
  }
```
4) Add `withCredentials: true` option when sending out request. This option will make the request include cookie.
```javascript
public autologin(): Observable<any> {
   let base;
   base = this.http.post(this.baseUrl + `api/authentication/autologin`, "", {
     withCredentials: true // make request send cookie to server
   });
   const request = base.pipe(
     map((data: TokenResponse) => {
       if (data && data.token) {
         AuthUtil.saveToken(data.token, true);
       }
       if (data) {
         return data.token;
       } else {
         return data;
       }
     })
   );

   return request;
 }
```
5) Express server. To allow the server to accept cookie from client, we need to enable CORS as follows.
```javascript
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:12080");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("preflightContinue", false);
  next();
});
```
6) In server, create route for auto login
```javascript
// auto login, remember me function
router.post("/autologin", authentication_controller.autologin);
```
7) autologin in authentication controller. If token can be fetched from request cookie, use it for login.
```javascript
module.exports.autologin = function(req, res) {
  // check if the user's credentials are saved in a cookie //
  console.log("autologin");
  console.log(req.cookies);
  const token = req.cookies.cookieToken;
  console.log(token);
  if (token) {
    const userDetails = TokenUtil.decodeToken(token);
    console.log(userDetails);
    if (userDetails) {
      User.findOne({ username: userDetails.username }, function(err, user) {
        if (err) {
          res.status(200).send(err);
        }
        // Return if user not found in database
        if (!user) {
          res.status(200).send("User not found");
        }
        // Return if password is wrong
        if (user.hash != userDetails.hash) {
          res.status(200).send("Password is invalid");
        }
        // If credentials are correct, return the user object
        // If a user is found
        if (user) {
          var token = user.generateJwt();
          res.status(200);
          res.json({
            token: token
          });
        }
      });
    } else {
      res.status(200).send();
    }
  } else {
    res.status(401).send();
  }
};
```
8) Go back to client. If auto login is successful, new token will be saved to cookie.
```javascript
this.authService.autologin().subscribe(
    () => {
      //this.alertService.success("Login successful!", true);
      console.log(document.cookie);
      this.router.navigate([this.returnUrl]);
    },
    err => {
      console.error(err);
      // reset login status
      this.authService.logout(false);
    }
  );
```

http://expressjs.com/en/api.html#res.cookie
Cookies Are Not Getting Created and Saved in the Browser
https://stackoverflow.com/questions/19555069/cookies-are-not-getting-created-and-saved-in-the-browser
setcookie() does not set cookie in Google Chrome
https://stackoverflow.com/questions/5849013/setcookie-does-not-set-cookie-in-google-chrome

// security
https://expressjs.com/en/advanced/best-practice-security.html
http://scottksmith.com/blog/2014/09/04/simple-steps-to-secure-your-express-node-application/
https://www.npmjs.com/package/csurf
http://expressjs.com/en/api.html#res.cookie
https://www.npmjs.com/package/jwt-decode
https://github.com/auth0/jwt-decode
https://www.w3schools.com/js/js_cookies.asp

// code editor-ace editor
https://github.com/fxmontigny/ng2-ace-editor

// WYSIWYG Editor:ngx-editor
https://github.com/Sibiraj-S/ngx-editor
live demo
https://ngx-editor.stackblitz.io/
install Font Awesome
```sh
npm install --save font-awesome
```
Add font-awesome style file to angular-cli.json
```javascript
"styles": [
      "../node_modules/font-awesome/css/font-awesome.css"
      "styles.css"
    ],
```
https://github.com/angular/angular-cli/blob/master/docs/documentation/stories/include-font-awesome.md
ngx-editor configuration
https://sibiraj-s.github.io/ngx-editor/additional-documentation/configuration.html

issue: initially the icon fongx-editor is small. this is because it use rem css.
```raw
.ngx-editor-button {
            background-color: #f5f5f5;
            background-color: transparent;
            padding: 0.4rem;
            min-width: 2.5rem;
            float: left;
            border: 1px solid #ddd;
            border-right: transparent;
```


Meanwhile, we are using bootstrap which sets html's font size to 10px. To fix the issue, we need to set back the html's font to the default size-16px.
```css
/*styles.css*/
html {
  font-size: 16px;
}
```
Add, make sure styles.css is after the bootstrap style file. so our style can override bootstrap's style.
```javascript
"styles": [
  "../node_modules/bootstrap/dist/css/bootstrap.min.css",
  "../node_modules/font-awesome/css/font-awesome.css",
  "styles.css"
],
```
The rem unit sets the font-size relative to the browsers base font-size, and will not inherit from its parents.
https://www.w3schools.com/cssref/tryit.asp?filename=trycss_unit_rem
https://snook.ca/archives/html_and_css/font-size-with-rem

User model
```javascript
var bcrypt = require("bcrypt-nodejs");
var mongoose = require("mongoose");
var SALT_FACTOR = 10;
var userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  displayName: String,
  bio: String
});
var noop = function() {};
userSchema.pre("save", function(done) {
  var user = this;
  if (!user.isModified("password")) {
    return done();
  }
  bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
    if (err) {
      return done(err);
    }
    bcrypt.hash(user.password, salt, noop, function(err, hashedPassword) {
      if (err) {
        return done(err);
      }
      user.password = hashedPassword;
      done();
    });
  });
});
userSchema.methods.checkPassword = function(guess, done) {
  bcrypt.compare(guess, this.password, function(err, isMatch) {
    done(err, isMatch);
  });
};
userSchema.methods.name = function() {
  return this.displayName || this.username;
};
var User = mongoose.model("User", userSchema);
module.exports = User;
```

// ncp - Asynchronous recursive file & directory copying, `cp -r`
https://www.npmjs.com/package/ncp

// app-root-path
https://www.npmjs.com/package/app-root-path

// compile java with shell script
https://alvinalexander.com/blog/post/java/unix-shell-script-i-use-for-compiling-java-programs

// ShellJS - Unix shell commands for Node.js, Can be used to create deployment script.
https://www.npmjs.com/package/shelljs

Knowledge, difference between spawn, execute in node js.

OPTIONS Request, CORS, pre-flight,
https://stackoverflow.com/questions/29954037/why-is-an-options-request-sent-and-can-i-disable-it

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

Using ControlValueAccessor to Create Custom Form Controls in Angular, rating star
https://alligator.io/angular/custom-form-control/

Modal Dialogs
https://valor-software.com/ngx-bootstrap/#/modals

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

Asynchronous code inside an array loop
https://codeburst.io/asynchronous-code-inside-an-array-loop-c5d704006c99

Import export data with mongoose
http://programmerblog.net/generate-csv-using-nodejs/
```sh
mongoexport -h ds263520.mlab.com:63520 -d onlinejudge2 -c users -u testuser -p abc123 -o users.csv --csv -f _id,timecreated,username,email,salt,hash
```

AngularJS : Download Files by Sending a HTTP Request to Web API
http://jaliyaudagedara.blogspot.com/2016/05/angularjs-download-files-by-sending.html

Export database, csv-express
1) server: get data from database and send to client.
```javascript
User.find()
     .lean()
     .exec({}, function(err, users) {
       if (err) return next(err);

       res.statusCode = 200;
       res.setHeader("Content-Type", "text/csv");
       res.setHeader(
         "Content-Disposition",
         "attachment; filename=" + filename
       );
       res.csv(users, true);
     });
```
2) client: send request with 'blob' response type. Then, receive the data and create dummy link button.
```TypeScript
// Export data
  exportData(name: string) {
    return (
      this.http
        .get(this.apiUrl + "/export/" + name, {
          responseType: "blob",
          observe: "response" // to display the full response
        })
        .map(res => {
          return {
            response: res,
            filename: name + ".csv", //res.headers.get("filename");
            data: res.body
          };
        })
        .subscribe(
          res => {
            let options = { type: "text/csv;charset=utf-8;" };
            this.createAndDownloadBlobFile(res.data, options, res.filename);
          },
          err => {
            console.log(err);
          }
        )
    );
  }

  createAndDownloadBlobFile(body, options, filename) {
    console.log("createAndDownloadBlobFile");
    var blob = new Blob([body], options);
    if (navigator.msSaveBlob) {
      // IE 10+
      navigator.msSaveBlob(blob, filename);
    } else {
      var link = document.createElement("a");
      // Browsers that support HTML5 download attribute
      if (link.download !== undefined) {
        var url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", filename);
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  }
```

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
How to generate CSV using nodejs and mongodb with mongoose
http://programmerblog.net/generate-csv-using-nodejs/

AngularJS : Download Files by Sending a HTTP Request to Web API
http://jaliyaudagedara.blogspot.com/2016/05/angularjs-download-files-by-sending.html

How to parse command line arguments
https://docs.nodejitsu.com/articles/command-line/how-to-parse-command-line-arguments/
Download file using Ajax in Angular 4
https://medium.com/@radicalloop/download-file-using-ajax-in-angular-4-50109564bf17
Angular 4 download file from server via http
http://jslim.net/blog/2018/03/13/Angular-4-download-file-from-server-via-http/

How to read line by line of a text area
```javascript
var lines = $('textarea').val().split('\n');
for(var i = 0;i < lines.length;i++){
    //code here using lines[i] which will give you each line
}
```
Asynchronous code inside an array loop
https://codeburst.io/asynchronous-code-inside-an-array-loop-c5d704006c99
JavaScript loops — how to handle async/await
https://blog.lavrton.com/javascript-loops-how-to-handle-async-await-6252dd3c795

upload file, express
https://www.npmjs.com/package/formidable(not used)
https://www.npmjs.com/package/multer
https://github.com/expressjs/multer
https://ciphertrick.com/2015/12/07/file-upload-with-angularjs-and-nodejs/
https://github.com/rahil471/file-upload-with-angularjs-and-nodejs/blob/master/server/app.js
https://scotch.io/tutorials/angular-file-uploads-with-an-express-backend
https://malcoded.com/posts/angular-file-upload-component-with-express
https://nehalist.io/uploading-files-in-angular2/

// additional form data apart from file, progress event.
https://www.codingforentrepreneurs.com/blog/file-upload-with-angular/

upload file
1) html
```html
<form [formGroup]="uploadForm" (ngSubmit)="onSubmit()">
   <div class="form-group">
     <label for="fileupd">fileupd</label>
     <input type="file" id="fileupd" (change)="onFileChange($event)" name="fileupd" formControlName="fileupd">
     <button type="button" class="btn btn-sm btn-default" (click)="clearFile()">clear file</button>
   </div>
   <button type="submit" [disabled]="loading" class="btn btn-success">Submit <i class="fa fa-spinner fa-spin fa-fw" *ngIf="loading"></i></button>
 </form>
```
2) angular component.ts
```TypeScript
//upload file  
  fileToUpload: File = null;

  onFileChange(event) {
    if (event.target.files.length > 0) {
      this.fileToUpload = event.target.files[0];
    }
  }

  clearFile() {
    this.fileToUpload = null;
  }

  loading: boolean = false;
  onSubmit() {
    console.log(this.fileToUpload);
    this.loading = true;
    const formData = new FormData();
    // 'fileitem' must match with the backen api
    formData.append("fileitem", this.fileToUpload, this.fileToUpload.name);

    // In a real-world app you'd have a http request / service call here like
    this.databaseSerivce.importData(formData).subscribe(
      data => (this.loading = false),
      error => {
        console.log(error);
        this.loading = false;
      }
    );
  }
```
3) http service
```javascript
importData(formData: any) {
    console.log(formData);
    return this.http.post(this.apiUrl + "/import", formData, {
      observe: "response"
    });
  }
```
4) router
```javascript
router.post("/import", database_controller.collection_import);
```
5) controller
```javascript
exports.collection_import = function(req, res, next) {
  var storage = multer.diskStorage({
    //multers disk storage settings
    destination: function(req, file, cb) {
      console.log(file);
      var filepath = path.join(__dirname, "./uploads/"); // make sure this folder exists
      console.log(filepath);
      cb(null, filepath);
    },
    filename: function(req, file, cb) {
      var datetimestamp = Date.now();
      var filename =
        file.fieldname +
        "-" +
        datetimestamp +
        "." +
        file.originalname.split(".")[file.originalname.split(".").length - 1];
      console.log(filename);
      cb(null, filename);
    }
  });

  var upload = multer({
    //multer settings
    storage: storage
}).single("fileitem"); // match the name at client side.

  upload(req, res, function(err) {
    if (err) {
      res.json({ error_code: 1, err_desc: err });
      return;
    }
    res.json({ error_code: 0, err_desc: null });
  });
};
```
error 1: If you see this error, check
```json
{"error_code":1,"err_desc":{"code":"LIMIT_UNEXPECTED_FILE","field":"fileitem","storageErrors":[]}}
```
check if the settings are correct, change file to fileitem.
```javascript
var upload = multer({
  //multer settings
  storage: storage
}).single("file"); // must match the name at client side.
```
error 2: If you get following error when using multer, check whether the folder defined in destination of multer exists.
```json
{"error_code":1,"err_desc":{"errno":-2,"code":"ENOENT","syscall":"open","path":"uploads/fileitem-1530761053796.txt","storageErrors":[]}}
```
Use 'path.join(__ dirname, ...)' to the the full path.
```javascript
var filepath = path.join(__dirname, "./uploads/"); // make sure this folder exists
```
You see, the folder is in controller folder, create uploads folder in it or change to another exsitign folder.
```json
{"error_code":1,"err_desc":{"errno":-2,"code":"ENOENT","syscall":"open","path":"/Users/Johnny/GitHub/Tutorials/OnlineJudgeMEAN/server/controllers/uploads/fileitem-1530761500560.txt","storageErrors":[]}}
```

Bulk Import a CSV File Into MongoDB Using Mongoose With Node.js
https://code.tutsplus.com/articles/bulk-import-a-csv-file-into-mongodb-using-mongoose-with-nodejs--cms-29574
https://www.npmjs.com/package/fast-csv

string diff
https://github.com/atularen/ngx-monaco-editor
https://microsoft.github.io/monaco-editor/
```raw
<ngx-monaco-diff-editor [options]="options" [originalModel]="originalModel" [modifiedModel]="modifiedModel"></ngx-monaco-diff-editor>
import { Component } from '@angular/core';
import { DiffEditorModel } from 'ngx-monaco-editor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  options = {
    theme: 'vs-dark'
  };
  originalModel: DiffEditorModel = {
    code: 'heLLo world!',
    language: 'text/plain'
  };

  modifiedModel: DiffEditorModel = {
    code: 'hello orlando!',
    language: 'text/plain'
  };
}
```

monaco editor for angular
https://github.com/atularen/ngx-monaco-editor
https://github.com/Microsoft/monaco-editor

Get Most Recent Document By Type With Mongo Aggregation Query
https://stackoverflow.com/questions/48274137/get-most-recent-document-by-type-with-mongo-aggregation-query
```json
db.submissions.aggregate([
    { $sort: { "timecreated": -1 } },
    { $group: { _id: "$language", latest: { $first: "$$ROOT" } }},
    { $project : {_id : "$latest._id", username : "$latest.username", questionname : "$latest.questionname", solution : "$latest.solution", language : "$latest.language", status : "$latest.status", timeupdated : "$latest.timeupdated", timesubmitted : "$latest.timesubmitted", runtime : "$latest.runtime" }},
    { $sort: { "language": 1 } }
]).pretty()
```

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
CSS Encapsulation with Angular Components
https://coryrylan.com/blog/css-encapsulation-with-angular-components

## 5. Reference
* [User Authentication with the MEAN Stack](https://www.sitepoint.com/user-authentication-mean-stack/)
* [Child Processes on Node.js Document](https://nodejs.org/api/child_process.html)
* [How do I create online compiler for C, C++ and Java using node.js as server language?](https://www.quora.com/How-do-I-create-online-compiler-for-C-C++-and-Java-using-node-js-as-server-language)
* [Go Tutorial](https://www.tutorialspoint.com/go/index.htm)
* [How to build Online Judge](https://www.zhihu.com/question/20343652)
* [Making a code compiler using Hackerrank API and ACE editor](http://blog.arpitdubey.com/making-a-code-compiler-using-hackerrank-api-and-ace-editor/)
* * [How to build Online Judge](https://www.zhihu.com/question/20343652)


SECCOMP
https://github.com/QingdaoU/OnlineJudge
https://github.com/QingdaoU/OnlineJudgeDeploy
[Compiling a program with limited library access](https://stackoverflow.com/questions/27731599/compiling-a-program-with-limited-library-access)

[Online Judge 是如何解决判题端安全性问题的？](https://www.zhihu.com/question/23067497)
https://www.zhihu.com/question/27340709
