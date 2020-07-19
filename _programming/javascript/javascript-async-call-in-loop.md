---
layout: tutorial
key: programming
title: "JavaScript - Async Call in Loop[Draft]"
index: 2705
subcategory: javascript
date: 2018-03-28
tags: [Async]
draft: true
---

> Introduce how to implement Async call in loop, like array.

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

## 8. Reference
* [Asynchronous code inside an array loop](https://codeburst.io/asynchronous-code-inside-an-array-loop-c5d704006c99)
* [JavaScript loops — how to handle async/await](https://blog.lavrton.com/javascript-loops-how-to-handle-async-await-6252dd3c795)
