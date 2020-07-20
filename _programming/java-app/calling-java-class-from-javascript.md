---
layout: tutorial
key: programming
title: "Calling Java Class from Javascript"
index: 2543
subcategory: java-app
date: 2017-10-12
tags: [Rhino, Javascript, Java]
---

> Use Rhino to call java class and its method with javascript at server side.

## 1. Introduction
In the previous posting [Running JavaScript at Server Side with Rhino]({% link _programming/java-app/running-javascript-at-server-side-with-rhino.md %}), we learned how to run javascript at server side. In this posting, we will learn how to call java classes and methods from javascript. We will re-use the servlet project from the previous posting, but it will be renamed to `RhinoWebsiteJava`.

## 2. Start Testing Page
Right-click on RhinoWebsiteJava->WebContent->index.html, Run As->Run On Server, specify Tomcat as web server and launch this servlet project with it.
Open web browser, access http://localhost:8080/RhinoWebsiteJava/index.html.
![image](/assets/images/programming/2543/indexpage.png)

## 3. Calling Native Java Class
Input following script to the javascript input box, and click Run button.
```javascript
function getTime() {
    var date = new java.util.Date();
    return date;
}
getTime();
```
Output:
```
Thu Oct 12 10:28:13 PDT 2017
```
![image](/assets/images/programming/2543/gettime.png)

## 4. Calling Custom Class
### 4.1 Creating Custom Class
Create a class named `CustomClass` in the package 'Johnny.Tutorials' as follows. There are two methods defined in this class, `greet()` is an instance method and `greetStatic()` is a static method.
```java
package Johnny.Tutorials;

public class CustomClass {
    public String greet(String myname) {
        System.out.println("Hello!");
        return "Hello " + myname + ", greetings from CustomClass.greet().";
    }
    public static String greetStatic(String myname) {
        System.out.println("Hello!");
        return "Hello " + myname + ", greetings from CustomClass.greetStatic().";
    }
}
```
### 4.2 Calling Instance Method of Custom Class
Input following content to the javascript textbox. Notice that we have to add `Packages` prefix to access custom class.
```javascript
var cs = new Packages.Johnny.Tutorials.CustomClass;
cs.greet('johnny');
```
Output:
```
Hello johnny, greetings from CustomClass.greet().
```
![image](/assets/images/programming/2543/instancemethod.png)
### 4.3 Calling Static Method of Custom Class
Input following content to the javascript textbox. Notice that we have to add `Packages` prefix to access custom class.
```javascript
var cs = Packages.Johnny.Tutorials.CustomClass;
cs.greetStatic('johnny');
```
Output:
```
Hello johnny, greetings from CustomClass.greetStatic().
```
![image](/assets/images/programming/2543/staticmethod.png)
### 4.4 Calling Custom Class Without Packages Prefix
To avoid adding `Packages` prefix when calling custom class, we can define a global package named 'Johnny', and use it to access custom packages and classes. Input following content to the javascript textbox.
```javascript
var Johnny = Packages.Johnny;
var cs = new Johnny.Tutorials.CustomClass;
cs.greet('johnny');
```
Same output:
```
Hello johnny, greetings from CustomClass.greet().
```
![image](/assets/images/programming/2543/globalpackage.png)
### 4.5 Optimizing Servlet
Edit the 'doPost()' method of 'RhinoServlet.java', add `var Johnny = Packages.Johnny;` before running the script submitted from client. By doing this, there is no need to use `Packages` prefix in the client scripts.
```java
protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    response.setContentType("text/plain");
    String code = request.getParameter("code");
    Context ctx = Context.enter();
    String packagesText = "var Johnny = Packages.Johnny; \n";
    packagesText += code;
    try {
        Scriptable scope = ctx.initStandardObjects();
        Object result = ctx.evaluateString(scope, packagesText, "<code>", 1, null);
        response.getWriter().print(Context.toString(result));
    } catch(RhinoException ex) {
        response.getWriter().println(ex.getMessage());
    } finally {
        Context.exit();
    }
}
```
Input following content to the javascript textbox. This time, we don't need to define a global package or added `Packages` prefix.
```javascript
var cs = new Johnny.Tutorials.CustomClass;
cs.greet('johnny');
```
Same output:
```
Hello johnny, greetings from CustomClass.greet().
```
![image](/assets/images/programming/2543/withoutpackages.png)

## 5. Source Files
* [Source files of RhinoWebsiteJava on Github](https://github.com/jojozhuang/Tutorials/tree/master/RhinoWebsiteJava)

## 6. Reference
* [Official Document of Rhino](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/Rhino)
* [Scripting Java](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/Rhino/Scripting_Java)
* [Scripting in Java Tutorial - Java in Scripting Languages](http://www.java2s.com/Tutorials/Java/Scripting_in_Java/0200__Java_in_Scripting_Languages.htm)
* [How to wrap Custom Java classes in Rhino?](http://www.dreamincode.net/forums/topic/146360-rhino-java-javascript-engine-how-to-wrap-normal-java-classes/)
