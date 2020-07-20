---
layout: tutorial
key: tutorial
title: "Online Judge - User Authentication"
index: 9011
subcategory: online-judge
date: 2018-04-12
tags: [Sign Up, Login, Return URL]
---

> Introduce how to implement user authentication with token.

## 1. Authentication
### 1.1 Scope
This tutorial includes three processes for authentication.
* Sign up
* Login
* Return URL

### 1.2 User model
In './server/models/user.js', define the model class for 'User'. Notice, there is no field for 'password'. Instead, we only store the hashed password - hash, which has been encrypted. Call method 'setPassword()' to encrypt the password and call method 'validPassword()' to validate the password when login. Method 'generateJwt()' is used to generated token after user successfully login.
```javascript
var UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, max: 20 },
  email: { type: String, required: true, max: 100 },
  role: {
    type: String,
    enum: ["admin", "regular"],
    default: "regular"
  },
  hash: String,
  salt: String,
  timecreated: { type: Date }
});

UserSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");
};

UserSchema.methods.validPassword = function(password) {
  var hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");
  return this.hash === hash;
};

UserSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7); // expired after 7 days

  return jwt.sign(
    {
      _id: this._id,
      username: this.username,
      email: this.email,
      role: this.role,
      hash: this.hash, // include hash in token for 'remember me' function.
      exp: parseInt(expiry.getTime() / 1000)
    },
    secret
  ); // DO NOT KEEP YOUR SECRET IN THE CODE!
};
```

## 2. Sign Up
### 2.1 Angular(Client)
Define sign up page in './src/app/components/authentication/signup.component.html'.
```html
<form class="form-horizontal" [formGroup]="baseForm" (ngSubmit)="onSubmit()">
  <div class="form-group" [ngClass]="displayFieldCss('username')">
    <label class="control-label col-sm-2 required" for="username">User Name:</label>
    <div class="col-sm-4">
      <input #username type="text" class="form-control" name="username" placeholder="Enter user name" formControlName="username">
      <app-widget-validation-message [displayError]="isFieldValid('username')" errorMsg="Please enter a user name with at least 3 characters">
      </app-widget-validation-message>
    </div>
  </div>
  <div class="form-group" [ngClass]="displayFieldCss('password')">
    <label class="control-label col-sm-2 required" for="password">Password:</label>
    <div class="col-sm-4">
      <input type="password" class="form-control" name="password" placeholder="Enter password" formControlName="password">
      <app-widget-validation-message [displayError]="isFieldValid('password')" errorMsg="Please enter a password with at least 6 characters">
      </app-widget-validation-message>
    </div>
  </div>
  <div class="form-group" [ngClass]="displayFieldCss('email')">
    <label class="control-label col-sm-2 required" for="email">Email:</label>
    <div class="col-sm-4">
      <input type="email" class="form-control" name="email" placeholder="Enter email" formControlName="email">
      <app-widget-validation-message [displayError]="isFieldValid('email')" errorMsg="Please enter a valid email address">
      </app-widget-validation-message>
    </div>
  </div>
  <div class="form-group">
    <div class="col-md-offset-2 col-md-10">
      <button type="submit" [disabled]="loading" class="btn btn-success">Register</button>
      <app-widget-loading-image [loading]="loading"></app-widget-loading-image>
      <app-widget-loading-link [loading]="loading" link="/login" title="Cancel" [inline]="true"></app-widget-loading-link>
    </div>
  </div>
</form>
```
Define method to handle submit event in './src/app/components/authentication/signup.component.ts', call service to sign up.
```typescript
onSubmit() {
  if (!this.validate()) {
    return;
  }

  let user = this.baseForm.value;
  this.credentials.username = user.username;
  this.credentials.password = user.password;
  this.credentials.email = user.email;
  this.authService.signup(this.credentials, true).subscribe(
    () => {
      this.handleSuccess("Registration successful!", true, "/profile");
    },
    error => {
      this.handleError(error);
    }
  );
}
```
Define method to call RESTful API in './src/app/services/authentication.service.ts'.
```typescript
public signup(user: TokenPayload, refresh: boolean): Observable<any> {
  return this.request("signup", user, refresh);
}

private request(
  type: "login" | "signup" | "update" | "resetpwd",
  user: TokenPayload,
  refresh: boolean,
  savecookie?: boolean
): Observable<any> {
  let base;

  base = this.http.post(this.baseUrl + `api/authentication/${type}`, user);
  console.log(base);
  const request = base.pipe(
    map((data: TokenResponse) => {
      if (refresh && data.token) {
        AuthUtil.saveToken(data.token, savecookie);
      }
      return data.token;
    })
  );

  return request;
}
```
### 2.2 Express(Server)
Define router in './server/routes/authentication.js'. Server side validation is applied.
```javascript
const { check, validationResult } = require("express-validator/check");

...

router.post(
  "/signup",
  [
    // check username
    check("username")
      .isLength({ min: 4 })
      .withMessage("User name must be at least 4 chars long"),
    // check password
    check("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 chars long")
      .matches(/\d/)
      .withMessage("Password must contain a number"),
    // check email
    check("email")
      .isEmail()
      .withMessage("Email address is invalid")
  ],
  authentication_controller.signup
);
```
Define sign up method in './server/controllers/authentication.js'. Check whether user name or email is occupied before creating the user in MongoDB.
```javascript
const { validationResult } = require("express-validator/check");

...

module.exports.signup = function(req, res) {
  SleepUtil.sleep();
  // get the validation result which is defined in router
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // return if validation fails
    return res.status(422).json({ errors: errors.array() });
  }

  var newuser = new User({
    username: req.body.username,
    email: req.body.email,
    role: req.body.role
  });

  User.findOne({ username: newuser.username }, function(err, user) {
    if (user) {
      var error = new ValidationError(
        "body",
        "username",
        newuser.username,
        "User Name is existed!"
      );
      res.status(422).json({ errors: [error] });
    } else {
      User.findOne({ email: newuser.email }, function(err, user) {
        if (user) {
          var error = new ValidationError(
            "body",
            "username",
            newuser.email,
            "Email is existed!"
          );
          res.status(422).json({ errors: [error] });
        } else {
          //set creation time
          newuser.timecreated = moment(new Date(Date.now()));
          // set hash and salt
          newuser.setPassword(req.body.password);

          console.log(newuser);
          newuser.save(function(err) {
            var token;
            token = newuser.generateJwt();
            res.status(200);
            res.json({
              token: token
            });
          });
        }
      });
    }
  });
};
```
### 2.3 Testing
Click on the 'Sign Up' menu, input user name, password and email, then click 'Register' button.
![image](/assets/images/online-judge/9011/signup_page.png)
If no validation error, new user is created and the page is navigated to user profile.
![image](/assets/images/online-judge/9011/signup_profile.png)

## 3. Login
### 3.1 Angular(Client)
Define login page in './src/app/components/authentication/login.component.html'.
```html
<form class="form-horizontal" [formGroup]="baseForm" (ngSubmit)="onSubmit()">
  <div class="form-group" [ngClass]="displayFieldCss('username')">
    <label class="control-label col-sm-2 required" for="username">User Name:</label>
    <div class="col-sm-4">
      <input #username type="text" class="form-control" name="username" placeholder="Enter user name" formControlName="username">
      <app-widget-validation-message [displayError]="isFieldValid('username')" errorMsg="Please enter user name">
      </app-widget-validation-message>
    </div>
  </div>
  <div class="form-group" [ngClass]="displayFieldCss('password')">
    <label class="control-label col-sm-2 required" for="password">Password:</label>
    <div class="col-sm-4">
      <input type="password" class="form-control" name="password" placeholder="Enter password" formControlName="password">
      <app-widget-validation-message [displayError]="isFieldValid('password')" errorMsg="Please enter password">
      </app-widget-validation-message>
    </div>
  </div>
  <div class="form-group">
    <div class="col-md-offset-2 col-md-10">
      <div class="checkbox">
        <label><input type="checkbox" name="remember-me" formControlName="remember">Remember me?</label>
      </div>
    </div>
  </div>
  <div class="form-group">
    <div class="col-md-offset-2 col-md-10">
      <button type="submit" [disabled]="loading" class="btn btn-success">Login</button>
      <app-widget-loading-image [loading]="isLoading()"></app-widget-loading-image>
    </div>
  </div>
  <div class="form-group">
    <div class="col-md-offset-2 col-md-10">
      <app-widget-loading-link [loading]="loading" link="/signup" title="Register as a new user"></app-widget-loading-link>
    </div>
  </div>
</form>
```
Define method to handle submit event in './src/app/components/authentication/login.component.ts', call service to login.
```typescript
onSubmit() {
  if (!this.validate()) {
    return;
  }

  let user = this.baseForm.value;
  this.credentials.username = user.username;
  this.credentials.password = user.password;
  this.credentials.remember = user.remember;

  this.printLog(this.credentials);
  this.printLog("Your Cookie : " + document.cookie);

  this.authService.login(this.credentials, user.remember).subscribe(
    () => {
      this.handleSuccess("Login successful!", true, this.returnUrl);
    },
    error => {
      this.handleError(error);
    }
  );
}
```
Define method to call RESTful API in './src/app/services/authentication.service.ts'.
```typescript
public login(user: TokenPayload, savecookie): Observable<any> {
  return this.request("login", user, true, savecookie);
}
```
### 3.2 Express(Server)
We user [Passport](https://www.npmjs.com/package/passport) for user authentication. Install the relevant packages.
```raw
npm install passport passport-jwt passport-local --save
```
Define router in './server/routes/authentication.js'. Server side validation is applied.
```javascript
const { check, validationResult } = require("express-validator/check");

...

// manual login
router.post(
  "/login",
  [
    // check username
    check("username")
      .not()
      .isEmpty()
      .withMessage("User name can't be empty"),
    // check password
    check("password")
      .not()
      .isEmpty()
      .withMessage("Password can't be empty")
  ],
  authentication_controller.login
);
```
Define local strategy for passport in './server/config/passport-config.js'. Check whether user name and password are matched.
```javascript
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

...

passport.use(
  "local",
  new LocalStrategy(
    {
      usernameField: "username"
    },
    function(username, password, done) {
      User.findOne({ username: username }, function(err, user) {
        if (err) {
          return done(err);
        }
        // Return if user not found in database
        if (!user) {
          return done(null, false, "User not found");
        }
        // Return if password is wrong
        if (!user.validPassword(password)) {
          return done(null, false, "Password is not match");
        }
        // If credentials are correct, return the user object
        return done(null, user);
      });
    }
  )
);
```
Define login method in './server/controllers/authentication.js'. Call passport to verify whether user pass the authentication check. If user name and password are verified, call 'generateJwt()' to generate token and transfer to client. Later, client needs to add this token to the http request for accessing admin pages.
```javascript
module.exports.login = function(req, res) {
  SleepUtil.sleep();
  // get the validation result which is defined in router
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // return if validation fails
    return res.status(422).json({ errors: errors.array() });
  }

  const username = req.body.username;
  const password = req.body.password;

  // check with passport
  passport.authenticate("local", function(err, user, info) {
    // If Passport throws/catches an error
    if (err) {
      var error = new ValidationError("body", "password", password, err);
      return res.status(422).json({ errors: [error] });
    }
    // if no user found, meaning validation fails
    if (!user) {
      var error = new ValidationError("body", "username", username, info);
      return res.status(422).json({ errors: [error] });
    }

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
  })(req, res);
};
```
### 3.3 Testing
Click on the 'Login' menu, input user name and password, then click 'Login' button.
![image](/assets/images/online-judge/9011/login_page.png)
If no validation error, login is successful and user is navigated to home page.
![image](/assets/images/online-judge/9011/login_home.png)

## 4. Login with Return URL
### 4.1 Auth Guard
Notice, we create guard in './src/app/services/auth-guard.service.ts' to protect some components. If user has not logged in, he/she will be redirected to the login page with the return url.
```typescript
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
In './src/app/app.route.ts', add 'canActivate' attribute to route to protect admin user page.
```typescript
export const appRoutes: Routes = [
  {
    path: "admin/users",
    component: UsersComponent,
    canActivate: [AuthGuardService]
  }
  ...
];
```
### 4.2 Return URL
In 'ngOnInit()' method of login page './src/app/components/authentication/login.component.ts', get the return url.
```typescript
  ngOnInit() {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
    ...
  }
```
### 4.3 Redirect
After successful login, user will be redirected to the return url.
```typescript
onSubmit() {
  ...

  this.authService.login(this.credentials, user.remember).subscribe(
    () => {
      this.handleSuccess("Login successful!", true, this.returnUrl);
    },
    error => {
      this.handleError(error);
    }
  );
}
```
### 4.4 Testing
Try to access 'http://localhost:12080/admin/users' without login.
![image](/assets/images/online-judge/9011/returnurl_url.png)
You will be redirected to the login page. Notice the url in browser's address bar.
![image](/assets/images/online-judge/9011/returnurl_login.png)
Input admin user name and password, login. After login, you will be redirected to the admin user page.
![image](/assets/images/online-judge/9011/returnurl_users.png)

## 5. References
* [Angular 6 - User Registration and Login Example & Tutorial](http://jasonwatmore.com/post/2018/05/16/angular-6-user-registration-and-login-example-tutorial)
* [angular-6-registration-login-example](https://github.com/cornflourblue/angular-6-registration-login-example)
* [Login Sample](https://stackblitz.com/edit/angular-6-registration-login-example?file=app%2Fhome%2Fhome.component.ts)
* [Login Sample Code](https://stackblitz.com/edit/angular-6-registration-login-example?file=app%2Fhome%2Fhome.component.ts)
* [Sample code for Sign up and Login](https://github.com/braitsch/node-login)
* [User Authentication with the MEAN Stack](https://www.sitepoint.com/user-authentication-mean-stack/)
* [Node.js and Password Storage with Bcrypt](http://www.summa.com/blog/node.js-and-password-storage-with-bcrypt)
* [Validator used for confirm password in 'Change Password'](https://gist.github.com/slavafomin/17ded0e723a7d3216fb3d8bf845c2f30)
* [Learn using JWT with Passport authentication](https://medium.com/front-end-hacking/learn-using-jwt-with-passport-authentication-9761539c4314)
* [Use multiple local strategies in PassportJS](https://stackoverflow.com/questions/20052617/use-multiple-local-strategies-in-passportjs)
* [Creating Role Based Authentication with Passport in Ionic 2 – Part 1](https://www.joshmorony.com/creating-role-based-authentication-with-passport-in-ionic-2-part-1/)
* [Node, Express, Mongoose and Passport.js REST API Authentication](https://www.djamware.com/post/58eba06380aca72673af8500/node-express-mongoose-and-passportjs-rest-api-authentication)
* [passport-jwt](https://www.npmjs.com/package/passport-jwt)
