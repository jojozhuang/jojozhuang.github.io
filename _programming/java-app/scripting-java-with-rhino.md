---
layout: tutorial
key: programming
title: "Scripting Java With Rhino"
index: 2541
subcategory: java-app
date: 2017-10-10
tags: [Rhino, Javascript]
---

> Use Rhino to run javascript at server side.

## 1. What is Rhino?
[Rhino](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/Rhino) is an open-source implementation of JavaScript written entirely in Java. It is typically embedded into Java applications to provide scripting to end users. It is embedded in J2SE 6 as the default Java scripting engine.

## 2. Usage of Scripting Java
Scripting Java has many uses. It allows us to write powerful scripts quickly by making use of the many Java libraries available. We can test Java classes by writing scripts. We can also aid our Java development by using scripting for exploratory programming. Exploratory programming is the process of learning about what a library or API can do by writing quick programs that use it. As we will see, scripting makes this process easier.

## 3. Setting up Rhino
### 3.1 Downloading Rhino
Go to [https://developer.mozilla.org/en-US/docs/Mozilla/Projects/Rhino/Download_Rhino](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/Rhino/Download_Rhino), select the latest version to download, for example, rhino1.7.7.2.zip.
### 3.2 Configuring Rhino
Extract rhino1.7.7.2.zip, copy `rhino-1.7.7.2.jar` from /rhino1.7.7.2/lib to Java's extension folder.
```raw
Library/Java/Extensions/   // On Mac
java\jdk1.8.2\jre\lib\ext  // On Windows
```
### 3.3 Running Rhino Shell
Open terminal, type following command to launch Rhino Shell.
```raw
$ java org.mozilla.javascript.tools.shell.Main
```
You will get the output as follows.
```raw
Rhino 1.7.7.2 2017 09 27
js>
```
Now you can start to type some scripts to testing Rhino.
To quit Rhino Shell, type the the following commands.
```
js> quit()
```

## 4. Testing Scripts In Shell
### 4.1 Running Javascript In Shell
```raw
js> print('hi, Johnny')
hi, Johnny
js> 4*5
20
js> function f() { return a;}
js> var a = 68;
js> f()
68
```
![image](/assets/images/programming/2541/javascript.png){:width="600px"}
### 4.2 Loading Javascript File
Create a file named `test.js` with following content.
```javascript
function hello(str) {
    var name=str;
    print("hello," + name + "!");
}
```
In terminal, run following scripts.
```
js> load('test.js')
js> hello('johnny')
hello,johnny!
js>
```
![image](/assets/images/programming/2541/loadjsfile.png){:width="600px"}
### 4.3 Working with Java
Create an object with `new` keyword.
```
js> new java.util.Date()
Tue Oct 10 08:58:14 PDT 2017
```
Static methods and fields can be accessed from the class object itself:
```
js> java.lang.Math.PI
3.141592653589793
js> java.lang.Math.cos(0)    
1
js> java.lang.Integer.MAX_VALUE
2147483647
```
If we store the new object in a JavaScript variable, we can then call methods on it:
```
js> f = new java.io.File('test.txt')
test.txt
js> f.exists()
false
js> f.getName()
test.txt
```
## 5. Running Javascript In Java
Create a file named `Embedding.java` with following contents.
```java
import org.mozilla.javascript.Context;
import org.mozilla.javascript.Scriptable;

public class Embedding {
    public static void main(String args[])
    {
        Context cx = Context.enter();
        try {
            Scriptable scope = cx.initStandardObjects();

            String jsStr="function f() { return 'hello from js function!';} f();";

            Object result = cx.evaluateString(scope, jsStr, null, 0, null);

            System.err.println(Context.toString(result));

        } finally {
            Context.exit();
        }
    }
}
```
Compile the java file and run it.
```raw
$ ls
Embedding.java
$ javac Embedding.java
$ java Embedding
hello from js function!
```
![image](/assets/images/programming/2541/embedding.png){:width="600px"}

## 5. Source Files
* [Source files of Rhino Scripting Java on Github](https://github.com/jojozhuang/Tutorials/tree/master/RhinoScriptingJava)

## 6. Reference
* [Official Document of Rhino](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/Rhino)
* [Rhino on Github](https://github.com/mozilla/rhino)
* [Scripting in Java Tutorial - Scripting in Java Intro](http://www.java2s.com/Tutorials/Java/Scripting_in_Java/index.htm)
* [Rhino -- 基于java的javascript实现](http://www.cnblogs.com/cczw/archive/2012/07/16/2593957.html)
