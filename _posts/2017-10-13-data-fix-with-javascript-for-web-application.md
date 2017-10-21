---
layout: post
key: blog
title: "Data Fix with Javascript For Web Application"
date: 2017-10-13
tags: [Rhino, Javascript]
---

> Use Rhino to run javascript to fix data for a web application.

## 1. Introduction
In the previous posting [Building Website with JSP and MySQL]({% link _posts/2016-02-25-building-website-with-jsp-and-mysql.md %}), we built a web application with JSP and MySQL. Suppose it has been deployed on cloud service. Customer is using it now. However, there are some issues with this web application, and some data is incorrect. Customer requests to fix the wrong data. One problem is, for cloud service, it is not allowed to stop it. We have to fix it while the application is still running. One approach is to create scripts with javascript and run it at server side.

## 2. Setting Up Project
Get the source file of JSP application from [here](https://github.com/jojozhuang/Tutorials/tree/master/JSPTutorial), rename it to `RhinoDataFix`.
The project in Eclipse looks like as follows.
![MIME Type](/public/pics/2017-10-13/originalproject.png)
Run it in Tomcat. Access http://localhost:8080/RhinoDataFix/productlist.jsp in web browser.
![MIME Type](/public/pics/2017-10-13/originalproductlist.png)

## 3. Enhancing Project to Add Data Fix Function
Suppose the price is not correct for the listed products. We need to double the price through data fix.
### 3.1 Adding Reference of Rhino
Go to [https://developer.mozilla.org/en-US/docs/Mozilla/Projects/Rhino/Downloads_archive](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/Rhino/Downloads_archive), select the latest version to download, for example, rhino1_7R4.zip. Extract the file `js.jar` from the downloaded zip, and copy it to the `/WebContent/WEB-INF/lib` subdirectory of 'RhinoDataFix' project.
### 3.2 Creating Servlet For Running Javascript
Right-click on RhinoDataFix->Java Resources->src, create package named 'Johnny.RhinoDataFix.Servlet'. Then, create java file named `JavascriptServlet.java`. Modify the `doPost` method in JavascriptServlet.java as follows:
```java
/**
 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
 */
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
### 3.3 Create JSP Page for Data Fix
In Project Explorer, right-click on RhinoDataFix->WebContent, New->JSP File. Specify file name `datafix.jsp` and add following content into it.
```html
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <script type="text/javascript">
      function sendCode() {
        var code = $("#code").val();
        $("#output").load("/RhinoDataFix/JavascriptServlet", {"code": code});
      }
    </script>
    <title>Data Fix with Javascript</title>
  </head>

  <body>
  <jsp:include page="header.jsp" />
    <div class="container">
      <h1>Input scripts to fix data</h1>
      <form>
        <div class="form-group">
          <label for="code">Javascript:</label>
          <textarea class="form-control" rows="10" id="code"></textarea>
        </div>
        <button type="button" class="btn btn-primary" onclick="sendCode();" >Submit</button>
        <div class="form-group">
          <label for="output">Output:</label>
          <textarea class="form-control" rows="10" id="output" readonly="true"></textarea>
        </div>
      </form>
    </div>
  </body>
</html>
```
### 3.4 Adding Link
Edit 'header.jsp' in RhinoDataFix->WebContent. Add link for 'datafix.jsp'.
```html
<div class="container">
  <h2>Data Fix with Javascript - Product Management</h2>
  <a class="btn btn-info" href="productlist.jsp">List</a>
  <a class="btn btn-info" href="productadd.jsp">Create</a>
  <a class="btn btn-info" href="datafix.jsp">Data Fix</a>
</div>
<hr/>
```
### 3.5 Project Structure
Finally, the project structure looks like this.
![MIME Type](/public/pics/2017-10-13/projectstructure.png)

## 4. Running Data Fix
Right-click on RhinoDataFix->WebContent->datafix.jsp, Run As->Run On Server, specify Tomcat as web server and launch this servlet project with it. Open web browser, access http://localhost:8080/RhinoDataFix/datafix.jsp.

Input following content to the javascript textbox.
```javascript
/*
   Data fix to set price = price * 2
*/

var ProductDao = Johnny.RhinoDataFix.Dao.ProductDao;

var gDebugText = "";
var Datafix = "Update products by doubling their prices";

dfOnProduct();

function dfOnProduct ()
{
    try {
        logDebug("Data Fix with JS: " + Datafix + ": START");
        var products = ProductDao.getList();
        for (var i=0; i< products.size(); i++) {
            var product = products.get(i);
            logDebug("[fixProduct]: #" + (i + 1) + " out of " + products.size() + ", Before fix: " + product);
            product.setPrice(product.getPrice() * 2);
            logDebug("[fixProduct]: After fix: " + product);
            ProductDao.update(product);
        }
        logDebug("Summary: Fixed " + products.size() + " Products.");
    }
    catch (ex) {
        logDebug("[dfOnProduct] DF Failed ! Exception: " + ex.toString());
    }
    finally {
        logDebug("Data Fix with JS: " + Datafix + ": END");
    }
}

function logDebug(msg) {
    gDebugText += (msg + "\n");
}

show = gDebugText;
```
Click the 'Run' button, the string returned from javascript function will be displayed in the output box.
```
Data Fix with JS: Update products by doubling their prices: START
[fixProduct]: #1 out of 3, Before fix: ProductId=1, ProductName=Xbox, Price=100.0
[fixProduct]: After fix: ProductId=1, ProductName=Xbox, Price=200.0
[fixProduct]: #2 out of 3, Before fix: ProductId=2, ProductName=PS4, Price=400.0
[fixProduct]: After fix: ProductId=2, ProductName=PS4, Price=800.0
[fixProduct]: #3 out of 3, Before fix: ProductId=3, ProductName=iPhone, Price=699.0
[fixProduct]: After fix: ProductId=3, ProductName=iPhone, Price=1398.0
Summary: Fixed 3 Products.
Data Fix with JS: Update products by doubling their prices: END
```
![MIME Type](/public/pics/2017-10-13/datafix.png)

Switch to Product List Page, the prices have been doubled.
![MIME Type](/public/pics/2017-10-13/afterdfproductlist.png)

## 5. Source Files
* [Source files of RhinoDataFix on Github](https://github.com/jojozhuang/Tutorials/tree/master/RhinoDataFix)

## 6. Reference
* [Official Document of Rhino](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/Rhino)
* [Rhino on Github](https://github.com/mozilla/rhino)
* [Server-side JavaScript with Rhino](http://blog.notdot.net/2009/10/Server-side-JavaScript-with-Rhino)
* [How to wrap Custom Java classes in Rhino?](http://www.dreamincode.net/forums/topic/146360-rhino-java-javascript-engine-how-to-wrap-normal-java-classes/)
