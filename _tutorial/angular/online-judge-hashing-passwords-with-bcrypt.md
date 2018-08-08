---
layout: tutorial
key: tutorial
title: "Online Judge - Hashing Passwords with Bcrypt[Draft]"
index: 334
category: angular
image: angular.png
date: 2017-03-04
postdate: 2018-04-11
tags: [ngx-editor]
---

> Learn how to use WYSIWYG Editor:ngx-editor.

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

## 5. References
* [Hashing Passwords with Node.js and Bcrypt](https://www.abeautifulsite.net/hashing-passwords-with-nodejs-and-bcrypt)
* [Learn using JWT with Passport authentication](https://medium.com/front-end-hacking/learn-using-jwt-with-passport-authentication-9761539c4314)
* [Use multiple local strategies in PassportJS](https://stackoverflow.com/questions/20052617/use-multiple-local-strategies-in-passportjs)
* [Creating Role Based Authentication with Passport in Ionic 2 – Part 1](https://www.joshmorony.com/creating-role-based-authentication-with-passport-in-ionic-2-part-1/)
* [Node, Express, Mongoose and Passport.js REST API Authentication](https://www.djamware.com/post/58eba06380aca72673af8500/node-express-mongoose-and-passportjs-rest-api-authentication)
https://www.npmjs.com/package/passport-jwt
