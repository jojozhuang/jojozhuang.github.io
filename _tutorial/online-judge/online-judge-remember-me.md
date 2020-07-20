---
layout: tutorial
key: tutorial
title: "Online Judge - Remember Me"
index: 9012
subcategory: online-judge
date: 2018-04-13
tags: [Token, Cookies]
---

> Introduce how to implement auto login in Angular application.

## 1. Auto Login
To implement 'Auto Login' function, we need to rely on the Cookies. The first time after user successful login, server saves a token in Cookies and returns it to client. Client save it to browser. Next, when user accesses any page, client sends out the token to server to identify the same user.

## 2. Flow
### 2.1 Remember Me Option(Client)
Create a checkbox for Remember me in the login page './src/app/componets/authentication/login.component.html'.
```html
<div class="form-group">
  <div class="col-md-offset-2 col-md-10">
    <div class="checkbox">
      <label><input type="checkbox" name="remember-me" formControlName="remember">Remember me?</label>
    </div>
  </div>
</div>
```
Send this option to server along with user name and password.
```typescript
onSubmit() {
    ...

    this.credentials.username = user.username;
    this.credentials.password = user.password;
    this.credentials.remember = user.remember;

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
### 2.2 Token(Server)
Save token to response cookie if 'Remember me' is selected. File './server/controller/authentication.js'.
```javascript
module.exports.login = function(req, res) {
  ...

  const username = req.body.username;
  const password = req.body.password;

  // check with passport
  passport.authenticate("local", function(err, user, info) {
    ...

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
### 2.3 Saving Token to Browser Cookie(Client)
Save cookie to browser. Notice 'savecookie' is set to true.
```javascript
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
It is done when token is saved to local storage in './src/utils/authutil.ts'.
```typescript
export class AuthUtil {
  ...

  static saveToken(token: string, savetocookie?: boolean): void {
    localStorage.setItem(STORAGE_TOKEN, token);
    this.token = token;
    if (savetocookie) {
      CookieUtil.setCookie(COOKIE_TOKEN, token, COOKIE_EXPIREDAYS);
    }
  }
  ...

  static getCookieToken() {
    return CookieUtil.getCookie(COOKIE_TOKEN);
  }
}
```
### 2.4 Using Token in Cookie(Client)
For the second time login, auto login is happening. In the `ngOnInit` event of login page, start auto login if cookie token is available.
```javascript
ngOnInit() {
    ...

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
### 2.5 Service(Client)
In '.src/app/services/authentication.service.ts', add `withCredentials: true` option when sending out request. This option will make the request include cookie.
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
### 2.6 CORS(Server)
In './server/server.js', to allow the express server to accept cookie from client, we need to enable CORS as follows.
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
### 2.7 Route for Auto Login(Server)
In '.server/routes/authentication.js', define routing.
```javascript
// auto login, remember me function
router.post("/autologin", authentication_controller.autologin);
```
### 2.8 User Match(Server)
In '.server/controllers/authentication.js', if token can be fetched from request cookie, use it for login.
```javascript
module.exports.autologin = function(req, res) {
  // check if the user's credentials are saved in a cookie //
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
### 2.9 Successful Login(Client)
Go back to client. If auto login is successful, new token will be saved to cookie.
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

## 3. Testing
Use select the 'Remember me' option when login for the first time.
![image](/assets/images/online-judge/9012/login_remember.png)
You should login successfully. Now close the browser and access the homepage again, http://localhost:12080/. You see the user name is already in the top menu.
![image](/assets/images/online-judge/9012/login_auto.png)

## 4. References
* [Express Cookies](http://expressjs.com/en/api.html#res.cookie)
* [Cookies Are Not Getting Created and Saved in the Browser](https://stackoverflow.com/questions/19555069/cookies-are-not-getting-created-and-saved-in-the-browser)
* [setcookie() does not set cookie in Google Chrome](https://stackoverflow.com/questions/5849013/setcookie-does-not-set-cookie-in-google-chrome)
* [jwt-decode - npm](https://www.npmjs.com/package/jwt-decode)
* [jwt-decode - GitHub](https://github.com/auth0/jwt-decode)
* [JavaScript Cookies](https://www.w3schools.com/js/js_cookies.asp)
