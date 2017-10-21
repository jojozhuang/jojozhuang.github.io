---
layout: post
key: blog
title: "Calling Java Class from Javascript"
date: 2017-10-12
tags: [Rhino, Javascript, Java]
---

> Use Rhino to call java class and its method with javascript at server side.

## 1. Introduction
In the previous posting [Running JavaScript at Server Side with Rhino]({% link _posts/2017-10-11-running-javascript-at-server-side-with-rhino.md %}), we learned how to run javascript at server side. In this posting, we will learn how to let javascript call java classes and methods. We will re-use the servlet project from the previous posting, but it will be renamed to `RhinoWebsiteJava`.

## 2. Start Testing Page
Right-click on RhinoWebsiteJava->WebContent->index.html, Run As->Run On Server, specify Tomcat as web server and launch this servlet project with it.
Open web browser, access http://localhost:8080/RhinoWebsiteJava/index.html.
![MIME Type](/public/pics/2017-10-12/indexpage.png)

## 3. Calling Native Java Class
Input following content to the javascript textbox.
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
![MIME Type](/public/pics/2017-10-12/gettime.png)

## 4. Calling Custom Class
### 4.1 Creating Custom Class
Create a class named `CustomClass` in the package 'Johnny.Tutorials' as follows. There are two methods, one is static level, another is instance level.
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

### 4.2 Calling Static Method of Custom Class
Input following content to the javascript textbox. Notice that we have to add `Packages` prefix to access custom class.
```javascript
var cs = Packages.Johnny.Tutorials.CustomClass;
cs.greetStatic('johnny');
```
Output:
```
Hello johnny, greetings from CustomClass.greetStatic().
```
![MIME Type](/public/pics/2017-10-12/staticmethod.png)

### 4.3 Calling Instance Method of Custom Class
Input following content to the javascript textbox. Notice that we have to add `Packages` prefix to access custom class.
```javascript
var cs = new Packages.Johnny.Tutorials.CustomClass;
cs.greet('johnny');
```
Output:
```
Hello johnny, greetings from CustomClass.greet().
```
![MIME Type](/public/pics/2017-10-12/instancemethod.png)

### 4.4 Calling Custom Class Without Packages Prefix
Input following content to the javascript textbox. Notice that we define a global package named 'Johnny'.
```javascript
var Johnny = Packages.Johnny;
var cs = Johnny.Tutorials.CustomClass;
cs.greet('johnny');
```
Same result for the Output:
```
Hello johnny, greetings from CustomClass.greet().
```
![MIME Type](/public/pics/2017-10-12/globalpackage.png)

### 4.5 Optimizing Servlet
Edit 'doPost' of 'RhinoServlet.java', add `var Johnny = Packages.Johnny;` before running the script submitted from client.
```java
protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    // TODO Auto-generated method stub
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
Input following content to the javascript textbox. Notice that we haven't defined a global package or added `Packages` prefix.
```javascript
var cs = Johnny.Tutorials.CustomClass;
cs.greetStatic('johnny');
```
Same result for the Output:
```
Hello johnny, greetings from CustomClass.greet().
```
![MIME Type](/public/pics/2017-10-12/withoutpackages.png)

## 5. Source Files
* [Source files of RhinoWebsiteJava on Github](https://github.com/jojozhuang/Tutorials/tree/master/RhinoWebsiteJava)

## 6. Reference
* [Official Document of Rhino](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/Rhino)
* [Rhino on Github](https://github.com/mozilla/rhino)
* [Server-side JavaScript with Rhino](http://blog.notdot.net/2009/10/Server-side-JavaScript-with-Rhino)
* [Scripting in Java Tutorial - Java in Scripting Languages](http://www.java2s.com/Tutorials/Java/Scripting_in_Java/0200__Java_in_Scripting_Languages.htm)
