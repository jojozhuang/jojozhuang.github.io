---
layout: tutorial
key: tutorial
title: "Online Judge - Remember Me[Draft]"
index: 335
category: angular
image: angular.png
date: 2017-03-05
postdate: 2018-04-22
tags: [Online Judge]
---

> Learn how to implement auto login in Angular application.

## 1. Implement remember me, cookie
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


## 5. References
* [Express Cookies](http://expressjs.com/en/api.html#res.cookie)
* [Cookies Are Not Getting Created and Saved in the Browser](https://stackoverflow.com/questions/19555069/cookies-are-not-getting-created-and-saved-in-the-browser)
* [setcookie() does not set cookie in Google Chrome](https://stackoverflow.com/questions/5849013/setcookie-does-not-set-cookie-in-google-chrome)
* * [jwt-decode - npm](https://www.npmjs.com/package/jwt-decode)
* [jwt-decode - GitHub](https://github.com/auth0/jwt-decode)
* [JavaScript Cookies](https://www.w3schools.com/js/js_cookies.asp)
