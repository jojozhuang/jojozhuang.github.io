---
layout: post
key: blog
title: "JavaScript - Modern [Draft]"
date: 2018-01-02
tags: [JavaScript]
---

> All about javascript.

## 1. Using Promise
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises

Promise VS Observable
https://stackoverflow.com/questions/37364973/angular-promise-vs-observable

## 2. Http Request
Fetch vs. Axios.js for making http requests

## 3. HTML5 local storage
Does HTML5 local storage separate data per user?
localStorage is stored separately for each browser user profile, just like cookies, passwords, stored form data, etc. If two people log into different accounts on a shared computer and both visit the same site, each person's localStorage data will be stored in a separate place.

However, this should not be used to store sensitive data! Also, when a user logs out the localStorage will still be there.
https://stackoverflow.com/questions/31871227/does-html5-local-storage-separate-data-per-user
https://www.w3schools.com/html/html5_webstorage.asp

## 4. Working with Environment Variables in Node.js
https://www.twilio.com/blog/2017/08/working-with-environment-variables-in-node-js.html

## 5. How to use ExpressJS and Socket.io on a same port?
var app = express()
  , server = require('http').createServer(app)
  , io = io.listen(server);

server.listen(80);
https://stackoverflow.com/questions/12235406/how-to-use-expressjs-and-socket-io-on-a-same-port

## 6. Deployment
Deploying to production
https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/deployment

## 7. ES6 vs ES2015
ES6 Javascript: The Complete Developer's Guide
https://www.udemy.com/javascript-es6-tutorial/

## 8. Webpack

## 9. Server-side website programming
https://developer.mozilla.org/en-US/docs/Learn/Server-side

## 10. Dockerizing a Node.js web app
https://nodejs.org/en/docs/guides/nodejs-docker-webapp/

## 7. Reference
* [The Modern JavaScript Tutorial](https://javascript.info/)
* [Using promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)  
* [Fetch vs. Axios.js for making http requests](https://medium.com/@thejasonfile/fetch-vs-axios-js-for-making-http-requests-2b261cdd3af5)
* [4 ways for making HTTP(S) requests with Node.js](https://codeburst.io/4-ways-for-making-http-s-requests-with-node-js-c524f999942d)
