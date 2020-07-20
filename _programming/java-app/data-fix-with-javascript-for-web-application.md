---
layout: tutorial
key: programming
title: "Data Fix with Javascript For Web Application"
index: 2544
subcategory: java-app
date: 2017-10-13
tags: [Rhino, Javascript]
---

> Use Rhino to run javascript to fix data for a web application.

## 1. Introduction
In the previous posting [Building Website with JSP and MySQL]({% link _programming/java-app/building-website-with-jsp-and-mysql.md %}), we built a web application with JSP and MySQL. Suppose it has been deployed on cloud service and Customer is using it right now. However, there are some issues with this web application, the price of the product is incorrect. Customer requests us to fix the wrong price. The problem is, for cloud service, you are not allowed to shut it down and apply any java patch to fix the data. We have to fix the data while the application is still running. One approach is to call Java from javascript and run the script at server side.

## 2. Prerequisite
If you haven’t installed Docker and Kitematic, please install Docker Toolbox by referring to my previous posting [Install Docker Toolbox and Kitematic on Mac]({% link _architecture/docker/installing-docker-toolbox-and-kitematic-on-mac.md %}). We will use Docker to host MySQL database for this JSP Tutorial Application. Refer [Creating MySQL Image with Docker File]({% link _architecture/docker/creating-mysql-image-with-docker-file.md %}) to learn how to use Dockerfile to create image.

## 3. Setting Up MySQL Container
I've already created the Dockerfile to quickly setup MySQL container in docker. Download it from [here](https://github.com/jojozhuang/Tutorials/blob/master/RhinoDataFix/Docker/Dockerfile), save it to you local machine. Besides, download the MySQL backup file from [here](https://github.com/jojozhuang/Tutorials/blob/master/RhinoDataFix/Docker/df_backup.sql) and put it with the Dockerfile in the same folder. In Docker terminal, run the following script to launch a MySQL container.
```raw
$ docker build -t datafix-mysql:0.1 .
$ docker run --detach --name=dfmysql --publish 10202:3306 datafix-mysql:0.1
```
![image](/assets/images/programming/2544/mysqlcontainer.png){:width="700px"}

## 4. Setting Up Project
Get the source file of JSP application from [here](https://github.com/jojozhuang/Tutorials/tree/master/JSPTutorial), rename it to `RhinoDataFix`.
The project in Eclipse looks like this.
![image](/assets/images/programming/2544/originalproject.png){:width="400px"}
Start this application and access http://localhost:8080/RhinoDataFix/productlist.jsp in web browser. Initially, there are three products.
![image](/assets/images/programming/2544/originalproductlist.png)

## 5. Enhancing Project by Adding Data Fix Function
Suppose the prices of the these products are incorrect, as customer requests, we need to double it through data fix.
### 5.1 Adding Reference of Rhino to Project
Go to [https://developer.mozilla.org/en-US/docs/Mozilla/Projects/Rhino/Download_Rhino](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/Rhino/Download_Rhino), select the latest version to download, for example, rhino1.7.7.2.zip. Extract the file `rhino-1.7.7.2.jar` from the downloaded zip, and copy it to the `/WebContent/WEB-INF/lib` subdirectory of 'RhinoDataFix' project.
### 5.2 Creating Servlet For Running Javascript
Right-click on RhinoDataFix->Java Resources->src, create a new package named 'Johnny.RhinoDataFix.Servlet'. Then, right click on this package, New->Servlet, set name `JavascriptServlet.java`. Modify the `doPost()` method in JavascriptServlet.java as follows:
```java
/**
 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
 */
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
### 5.3 Create JSP Page for Data Fix
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
### 5.4 Adding Link
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
### 5.5 Project Structure
Finally, the project structure looks like this.
![image](/assets/images/programming/2544/projectstructure.png){:width="400px"}

## 6. Running Data Fix
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
Click the 'Run' button, the log of the data fix will be displayed in the output box.
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
![image](/assets/images/programming/2544/datafix.png)

Switch to Product List page, the prices have been doubled successfully.
![image](/assets/images/programming/2544/afterdfproductlist.png)

## 7. Source Files
* [MySQL Dockerfile](https://github.com/jojozhuang/Tutorials/blob/master/RhinoDataFix/Docker/Dockerfile)
* [Database Backup File](https://github.com/jojozhuang/Tutorials/blob/master/RhinoDataFix/Docker/df_backup.sql)
* [Source files of RhinoDataFix on Github](https://github.com/jojozhuang/Tutorials/tree/master/RhinoDataFix)

## 8. Reference
* [Official Document of Rhino](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/Rhino)
* [Server-side JavaScript with Rhino](http://blog.notdot.net/2009/10/Server-side-JavaScript-with-Rhino)
