---
layout: tutorial
key: tutorial
title: "Authenticating Users with Passport - Draft"
index: 8760
subcategory: express-js
date: 2018-01-14
tags: [React, Nodejs]
draft: true
---

> Introduce how to implement authentication for web application hosted by express.

Setting up Passport
When setting up Passport, you’ll need to do three things:
1 Set up the Passport middleware. This is pretty easy.
2 Tell Passport how to serialize and deserialize users. This is a short amount of code
that effectively translates a user’s session into an actual user object.
3 Tell Passport how to authenticate users. In this case, this is the bulk

middlewares
body-parser—parses HTML forms
* cookie-parser—handles the parsing of cookies from browsers and is required
for user sessions
* express-session—Stores user sessions across different browsers
* connect-flash—Shows error messages
* passport.initialize—Initializes the Passport module (as you’ll learn)
* passport.session—Handles Passport sessions (as you’ll learn)
You’ve already included some of these middlewares: body-parser, cookie-

TDD: RED, GREEN, REFACTOR
Mocha testing framework
Chai

integration tests ->SuperTest
https://www.npmjs.com/package/supertest

Cheerio, jQuery in node
https://github.com/cheeriojs/cheerio

## 5. Reference
* [Writing a CRUD app with Node.js and MongoDB](https://codeburst.io/writing-a-crud-app-with-node-js-and-mongodb-e0827cbbdafb)
* [Build Node.js RESTful APIs in 10 Minutes](https://www.codementor.io/olatundegaruba/nodejs-restful-apis-in-10-minutes-q0sgsfhbd)
* [Build a Node.js API in Under 30 Minutes](https://medium.freecodecamp.org/building-a-simple-node-js-api-in-under-30-minutes-a07ea9e390d2)
