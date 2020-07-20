---
layout: tutorial
key: tutorial
title: "Running C and Java in Node.js"
index: 8712
subcategory: node-js
date: 2018-05-28
tags: [Nodejs, Java]
---

> Introduce how to compile and run c program and java application in Node.js.

## 1. Prerequisites
Install gcc and JDK to compile c and java.

## 2. Source Files
Create a new folder named NodeCompile. Then, create 'HelloC.c' with following contnent.
```c++
#include <stdio.h>
int main(){
    printf("Hello C!\n");
}
```
Create HelloJava.java
```java
class HelloJava {
    public static void main(String[] args) {
        System.out.println("Hello Java!"); // Display the string.
    }
}
```
## 3. Node Files
compiler.js
```javascript
var spawn = require('child_process').spawn;
var path = require('path');

// compile the given c source file and execute it.
exports.clang = function (srcfile) {
    // if srcfile = 'main.java'
    var filename = path.parse(srcfile).name; // main
    var extension = path.parse(srcfile).ext;  // .java
    if (extension === ".c") {
        var args_compile = []; //['codec.c', '-o','codec.out']
        args_compile[0] = srcfile;
        args_compile[1] = '-o';
        args_compile[2] = filename + '.out';
        var cmd_run = './'+filename + '.out';
        this.execute('gcc', args_compile, cmd_run, []);
    } else {
        console.log(srcfile + " is not a c file.");
    }
}

// compile the given java source file and execute it.
exports.java = function (srcfile) {
    // if srcfile = 'main.java'
    var filename = path.parse(srcfile).name; // main
    var extension = path.parse(srcfile).ext;  // .java
    if (extension === ".java") {
        var args_compile = [];
        args_compile[0] = srcfile;
        var args_run = [];
        args_run[0] = filename;
        this.execute('javac', args_compile, 'java', args_run);
    } else {
        console.log(srcfile + " is not a java file.");
    }
}

// compile source file and execute it.
exports.execute = function (cmd_compile, args_compile, cmd_run, args_run) {
    //var compile = spawn('gcc', ['codec.c', '-o','codec.out']);
    //var compile = spawn('javac', ['CodeJava.java']);
    var compile = spawn(cmd_compile, args_compile);
    compile.stdout.on('data', function (data) {
        console.log('stdout: ' + data);
    });
    compile.stderr.on('data', function (data) {
        console.log('stderr: ' + String(data));
    });
    compile.on('close', function (data) {
        if (data === 0) {
            var run = spawn(cmd_run, args_run);
            run.stdout.on('data', function (output) {
                console.log(String(output));
            });
            run.stderr.on('data', function (output) {
                console.log('stderr: ' + String(output));
            });
            run.on('close', function (output) {
                console.log('stdout: ' + output);
            })
        }
    });
};
```
run_c.js
```javascript
var compiler = require('./compiler');

compiler.clang('HelloC.c');
```
run_java.js
```javascript
var compiler = require('./compiler');

compiler.java('HelloJava.java');
```

## 4. Testing
```raw
$ node run_c.js
$ node run_java.js
```
![image](/assets/images/backend/8712/run.png){:width="650px"}

## 5. Reference
* [Child Processes on Node.js Document](https://nodejs.org/api/child_process.html)
* [How do I create online compiler for C, C++ and Java using node.js as server language?](https://www.quora.com/How-do-I-create-online-compiler-for-C-C++-and-Java-using-node-js-as-server-language)
* [Go Tutorial](https://www.tutorialspoint.com/go/index.htm)
* [How to build Online Judge](https://www.zhihu.com/question/20343652)
* [Making a code compiler using Hackerrank API and ACE editor](http://blog.arpitdubey.com/making-a-code-compiler-using-hackerrank-api-and-ace-editor/)
