---
layout: tutorial
key: programming
title: "JavaScript - Modern"
index: 2702
subcategory: javascript
date: 2018-07-26
tags: [Promise, Observable, Axios]
---

> Advanced topics about javascript.

## 1. Promise
A `Promise` is an object representing the eventual completion or failure of an asynchronous operation.
### 1.1 Using Promise
Callback methods.
```javascript
function successCallback(result) {
  console.log("Audio file ready at URL: " + result);
}

function failureCallback(error) {
  console.log("Error generating audio file: " + error);
}

createAudioFileAsync(audioSettings, successCallback, failureCallback);
```
Re-write with promise.
```javascript
const promise = createAudioFileAsync(audioSettings);
promise.then(successCallback, failureCallback);
```
### 1.2 Chaining
Classic callback pyramid of doom for asynchronous operations.
```javascript
doSomething(function(result) {
  doSomethingElse(result, function(newResult) {
    doThirdThing(newResult, function(finalResult) {
      console.log('Got the final result: ' + finalResult);
    }, failureCallback);
  }, failureCallback);
}, failureCallback);
```
With promise chain.
```javascript
doSomething().then(function(result) {
  return doSomethingElse(result);
})
.then(function(newResult) {
  return doThirdThing(newResult);
})
.then(function(finalResult) {
  console.log('Got the final result: ' + finalResult);
})
.catch(failureCallback);

// Arrow function
doSomething()
.then(result => doSomethingElse(result))
.then(newResult => doThirdThing(newResult))
.then(finalResult => {
  console.log(`Got the final result: ${finalResult}`);
})
.catch(failureCallback);
```
### 1.3 Error propagation
Try catch for synchronous call.
```javascript
try {
  const result = syncDoSomething();
  const newResult = syncDoSomethingElse(result);
  const finalResult = syncDoThirdThing(newResult);
  console.log(`Got the final result: ${finalResult}`);
} catch(error) {
  failureCallback(error);
}
```
Use async/await in ECMAScript 2017.
```javascript
async function foo() {
  try {
    const result = await doSomething();
    const newResult = await doSomethingElse(result);
    const finalResult = await doThirdThing(newResult);
    console.log(`Got the final result: ${finalResult}`);
  } catch(error) {
    failureCallback(error);
  }
}
```

## 2. Observable
### 2.1 Observable & Observer
`Observable` is a JavaScript implementation of the observer pattern (also known as ‘publish/subscribe’). It is just a function that takes an observer and returns a function.

The `Observer` is an object, with three functions.
* next() => Observable, please call this function when you have a new value for me.
* error() => Observable, please call this function when you have a new error for me.
* complete() => Observable, please call this function when you complete your job.

```javascript
let fakeAsyncData$ = new Observable(observer => {
  setTimeout(() => {
    observer.next('New data is coming');
    observer.complete();
  }, 2000);
});

fakeAsyncData$.subscribe({
  next(val) { console.log(val) } ,
  error(e) { console.log(e) } ,
  complete() { console.log('complete') }
});
```
### 2.2 Promise VS Observable
Both Promises and Observables will help us work with the asynchronous functionalities in JavaScript.
promise:
* having one pipe line
* usually only use with async data return
* not easy to cancel

observable:
* are cancellable
* are retriable by nature such as retry and retryWhen
* stream data in multiple pipe lines
* having array-like operations like map, filter etc
* can be created from other sources like events
* they are function, which could be subscribed later on

![image](/assets/images/programming/2702/promise_vs_observable.png){:width="600px"}  

## 3. Http Request
### 3.1 Fetch API
The `Fetch API` provides a JavaScript interface for accessing and manipulating parts of the HTTP pipeline, such as requests and responses. It also provides a global `fetch()` method that provides an easy, logical way to fetch resources asynchronously across the network.

A basic fetch request.
```javascript
fetch('http://example.com/movies.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    console.log(myJson);
  });
```
* fetch() returns a promise containing the response object.

Supplying request options.
```javascript
fetch(`http://example.com/answer`, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, cors, *same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, same-origin, *omit
    headers: {
        "Content-Type": "application/json; charset=utf-8",
        // "Content-Type": "application/x-www-form-urlencoded",
    },
    redirect: "follow", // manual, *follow, error
    referrer: "no-referrer", // no-referrer, *client
    body: JSON.stringify(data), // body data type must match "Content-Type" header
})
.then(response => response.json()) // parses response to JSON
.catch(error => console.error(`Fetch Error =\n`, error));
```
### 3.2 Axios.js
[Axios](https://github.com/axios/axios) is a promise-based HTTP client that works both in the browser and in a node.js environment. It basically provides a single API for dealing with XMLHttpRequests and node’s http interface.

A single request call.
```javascript
var axios = require('axios')
// Performing a GET request
axios.get('https://api.github.com/users/' + username)
  .then(function(response){
    console.log(response.data); // ex.: { user: 'Your User'}
    console.log(response.status); // ex.: 200
  });
```

Performing Multiple Requests simultaneously
```javascript
// Requests will be executed in parallel...
axios.all([
    axios.get('https://api.github.com/users/codeheaven-io');
    axios.get('https://api.github.com/users/codeheaven-io/repos')
  ])
  .then(axios.spread(function (userResponse, reposResponse) {
    //... but this callback will be executed only when both requests are complete.
    console.log('User', userResponse.data);
    console.log('Repositories', reposResponse.data);
  }));
```
### 3.3 Fetch vs. Axios.js
Using Axios has quite a few advantages over the native Fetch API:
* supports older browsers (Fetch needs a polyfill)
* has a way to abort a request
* has a way to set a response timeout
* has built-in CSRF protection
* supports upload progress
* performs automatic JSON data transformation
* works in Node.js

## 4. HTML5 local storage
### 4.1 What is HTML Web Storage?
With `web storage`, web applications can store data locally within the user's browser. Before HTML5, application data had to be stored in cookies, included in every server request. Web storage is more secure, and large amounts of data can be stored locally, without affecting website performance. Unlike cookies, the storage limit is far larger (at least 5MB) and information is never transferred to the server. Web storage is per origin (per domain and protocol). All pages, from one origin, can store and access the same data.
### 4.2 Does HTML5 local storage separate data per user?
`localStorage` is stored separately for each browser user profile, just like cookies, passwords, stored form data, etc. If two people log into different accounts on a shared computer and both visit the same site, each person's localStorage data will be stored in a separate place.

However, this should not be used to store sensitive data! Also, when a user logs out the localStorage will still be there.
### 4.3 HTML Web Storage Objects
HTML web storage provides two objects for storing data on the client:
* window.localStorage - stores data with no expiration date
* window.sessionStorage - stores data for one session (data is lost when the browser tab is closed)

### 4.4 The localStorage Object
The `localStorage` object stores the data with no expiration date. The data will not be deleted when the browser is closed, and will be available the next day, week, or year.
```javascript
// Store
localStorage.setItem("lastname", "Smith");
// Retrieve
document.getElementById("result").innerHTML = localStorage.getItem("lastname");
```
### 4.5 The sessionStorage Object
The `sessionStorage` object is equal to the localStorage object, **except** that it stores the data for only one session. The data is deleted when the user closes the specific browser tab.
```javascript
if (sessionStorage.clickcount) {
    sessionStorage.clickcount = Number(sessionStorage.clickcount) + 1;
} else {
    sessionStorage.clickcount = 1;
}
document.getElementById("result").innerHTML = "You have clicked the button " +
sessionStorage.clickcount + " time(s) in this session.";
```

## 5. Reference
* [The Modern JavaScript Tutorial](https://javascript.info/)
* [Using promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)  
* [JavaScript — Observables Under The Hood](https://netbasal.com/javascript-observables-under-the-hood-2423f760584)
* [Promise vs Observable](https://stackoverflow.com/questions/37364973/angular-promise-vs-observable)
* [Using Fetch - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
* [How to Use Axios as Your HTTP Client](http://codeheaven.io/how-to-use-axios-as-your-http-client/)
* [HTTP REQUESTS USING AXIOS](https://flaviocopes.com/axios/)
* [4 ways for making HTTP(S) requests with Node.js](https://codeburst.io/4-ways-for-making-http-s-requests-with-node-js-c524f999942d)
* [HTML5 Web Storage](https://www.w3schools.com/html/html5_webstorage.asp)
* [Does HTML5 local storage separate data per user?](https://stackoverflow.com/questions/31871227/does-html5-local-storage-separate-data-per-user)
