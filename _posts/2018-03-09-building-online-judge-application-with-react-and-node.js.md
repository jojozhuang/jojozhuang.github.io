---
layout: post
key: blog
title: "Building Online Judge Application With React and Node.js(Draft)"
date: 2018-03-09
tags: [React, Nodejs]
---

> Introduce how to compile and run c/java in Node.js.

User system, register, login.

use express middleware to implement the authentication.
Use bcrypt to hash password

Hashing Passwords with Node.js and Bcrypt
https://www.abeautifulsite.net/hashing-passwords-with-nodejs-and-bcrypt
http://www.summa.com/blog/node.js-and-password-storage-with-bcrypt

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

## 5. Reference
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
