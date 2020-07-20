---
layout: tutorial
key: tutorial
title: "Calling spawn with Arguments[Draft]"
index: 8713
subcategory: node-js
date: 2018-05-29
tags: [Node.js]
draft: true
---

> Tutorial for how to use environment variables in Node.js.

## 24. Run spawn
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
console.log("argsRun:", argsRun);  //argsRun: [online-judge-mean/server/compiler/temp/two-sum_javascript_2018-07-07T23:10:37.605Z/SolutionTester.js','1','0','-1','-1' ]

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
```raw
$ node SolutionTester.js 1 0 -1 -1
```



Knowledge, difference between spawn, execute in node js.

## 4. References
* [How to parse command line arguments](https://docs.nodejitsu.com/articles/command-line/how-to-parse-command-line-arguments/)
