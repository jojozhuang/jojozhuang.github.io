---
layout: tutorial
key: programming
title: "Building Website with JSP and MongoDB"
index: 2533
subcategory: java-app
date: 2016-11-22
tags: [JSP, MongoDB, Maven]
---

> Build a web application with Java Server Pages (JSP) and MongoDB.

## 1. Prerequisites
### 1.1 Java Development Environment
Development environment has been setup. JDK, Eclipse and Tomcat are all installed. Otherwise, refer to [Setting up Java Development Environment on Mac]({% link _programming/dev-environment/setting-up-java-development-environment-on-mac.md %}) to setup your development environment.
### 1.2 MongoDB
MongoDB database has been installed. Otherwise, refer to [Installing MongoDB on Ubuntu and Mac]({% link _programming/dev-environment/installing-mongodb-on-ubuntu-and-mac.md %}) to install MongoDB.

## 2. Setting up JSP Project
### 2.1 Creating Dynamic Web Project
In Eclipse, File->New->Dynamic Web Project, specify project name as 'MongoDBTutorial'. Then, right click project MongoDBTutorial -> Configure -> Convert to Maven Project.
![image](/assets/images/programming/2533/converttomaven.png){:width="550px"}  
### 2.2 Adding Libraries to the Project
1) JSTL  
Go to [https://tomcat.apache.org/taglibs/index.html](https://tomcat.apache.org/taglibs/index.html), download JSP Standard Tag Library(JSTL). Put the jar file to `\WebContent\WEB-INF\lib`.  
2) MongoDB Java Driver  
To let our JSP application access MongoDB database, we need MongoDB Driver. It is a bridge between our JSP application and MongoDB Database. Go to [https://mongodb.github.io/mongo-java-driver/](https://mongodb.github.io/mongo-java-driver/), download mongodb driver, eg. 'mongodb-driver-3.1.1.jar', put it to `\WebContent\WEB-INF\lib`.
### 2.3 Creating web.xml
Create a file named `web.xml` in `\WebContent\WEB-INF` with following content. Notice, we set the 'MONGODB_HOST' and 'MONGODB_PORT'.
```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app version="3.1" xmlns="http://xmlns.jcp.org/xml/ns/javaee" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_3_1.xsd">
    <display-name>MongoDB Tutorial</display-name>
    <context-param>
        <param-name>MONGODB_HOST</param-name>
        <param-value>localhost</param-value>
    </context-param>
    <context-param>
        <param-name>MONGODB_PORT</param-name>
        <param-value>27017</param-value>
    </context-param>
    <welcome-file-list>
        <welcome-file>productlist.jsp</welcome-file>
    </welcome-file-list>
    <session-config>
        <session-timeout>
            30
        </session-timeout>
    </session-config>
</web-app>
```
### 2.4 Adding Dependencies in pom.xml
Edit `pom.xml`, add dependencies for MongoDB and JSTL.
```xml
<dependencies>
  <!-- MongoDB Java Driver -->
  <dependency>
    <groupId>org.mongodb</groupId>
    <artifactId>mongo-java-driver</artifactId>
    <version>3.1.1</version>
  </dependency>
  <!-- JSTL libraries for JSP pages -->
  <dependency>
    <groupId>jstl</groupId>
    <artifactId>jstl</artifactId>
    <version>1.2</version>
  </dependency>
  <dependency>
    <groupId>taglibs</groupId>
    <artifactId>standard</artifactId>
    <version>1.1.2</version>
  </dependency>
</dependencies>
```
### 2.5 Creating Java Files
Right-click on MongoDBTutorial->Java Resources->src, create package named `johnny.mongodbtutorial.model`. Then, create java file named `Product.java` with the following content.
```java
package johnny.mongodbtutorial.model;

public class Product {
    private String id;
    private String name;
    private double price;

    public Product() {}

    public Product(String id, String name, double price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }
}
```
Create package named `johnny.mongodbtutorial.converter`. Then, create java file named `ProductConverter.java` with the following content.
```java
package johnny.mongodbtutorial.converter;

import org.bson.Document;
import org.bson.types.ObjectId;

import johnny.mongodbtutorial.model.Product;

public class ProductConverter {

    // convert Product Object to MongoDB Document
    // take special note of converting id String to ObjectId
    public static Document toDocument(Product p) {
        Document doc = new Document("name", p.getName()).append("price", p.getPrice());
        if (p.getId() != null) {
            doc.append("_id", new ObjectId(p.getId()));
        }
        return doc;
    }

    // convert MongoDB Document to Product
    // take special note of converting ObjectId to String
    public static Product toProduct(Document doc) {
        Product p = new Product();
        p.setName((String) doc.get("name"));
        p.setPrice((Double) doc.get("price"));
        p.setId(((ObjectId) doc.get("_id")).toString());
        return p;
    }
}
```
Create package named `johnny.mongodbtutorial.dao`. Then, create java file named `ProductDao.java` with the following methods for CRUD operations.
* create()
* update()
* delete()
* exists()
* getList()
* getProduct()

```java
package johnny.mongodbtutorial.dao;

import java.util.ArrayList;
import java.util.List;

import org.bson.Document;
import org.bson.types.ObjectId;

import com.mongodb.MongoClient;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.model.Filters;

import johnny.mongodbtutorial.converter.ProductConverter;
import johnny.mongodbtutorial.model.Product;

public class ProductDao {
    private MongoCollection<Document> coll;

    public ProductDao(MongoClient mongo) {
        this.coll = mongo.getDatabase("mongodbtutorial").getCollection("product");
    }

    public Product create(Product p) {
        Document doc = ProductConverter.toDocument(p);
        this.coll.insertOne(doc);
        ObjectId id = (ObjectId) doc.get("_id");
        p.setId(id.toString());
        return p;
    }

    public void update(Product p) {
        this.coll.updateOne(Filters.eq("_id", new ObjectId(p.getId())), new Document("$set", ProductConverter.toDocument(p)));
    }

    public void delete(String id) {
        this.coll.deleteOne(Filters.eq("_id", new ObjectId(id)));
    }

    public boolean exists(String id) {
        FindIterable<Document>  doc = this.coll.find(Filters.eq("_id", id)).limit(1);
        return doc != null;
    }

    public List<Product> getList() {
        List<Product> list = new ArrayList<Product>();
        MongoCursor<Document>  cursor = coll.find().iterator();
        try {
            while (cursor.hasNext()) {
                Document doc = cursor.next();
                Product p = ProductConverter.toProduct(doc);
                list.add(p);
            }
        } finally {
            cursor.close();
        }
        return list;
    }

    public Product getProduct(String id) {
        Document doc = this.coll.find(Filters.eq("_id", new ObjectId(id))).first();
        return ProductConverter.toProduct(doc);
    }
}
```
Create package named `johnny.mongodbtutorial.listener`. Then, create java file named `MongoDBContextListener.java` with following content.
```java
package johnny.mongodbtutorial.listener;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

import com.mongodb.MongoClient;
import com.mongodb.MongoException;

@WebListener
public class MongoDBContextListener implements ServletContextListener {

    @Override
    public void contextInitialized(ServletContextEvent sce) {
        try {
            ServletContext ctx = sce.getServletContext();
            MongoClient mongo = new MongoClient(
                    ctx.getInitParameter("MONGODB_HOST"),
                    Integer.parseInt(ctx.getInitParameter("MONGODB_PORT")));
            System.out.println("MongoClient initialized successfully");
            sce.getServletContext().setAttribute("MONGO_CLIENT", mongo);
        } catch (MongoException e) {
            throw new RuntimeException("MongoClient init failed");
        }
    }

    @Override
    public void contextDestroyed(ServletContextEvent sce) {
        MongoClient mongo = (MongoClient) sce.getServletContext()
                            .getAttribute("MONGO_CLIENT");
        mongo.close();
        System.out.println("MongoClient closed successfully");
    }

}
```
### 3.6 Creating JSP Files
In Project Explorer, right-click on MongoDBTutorial->WebContent, New->JSP File. Specify file name `header.jsp` and add following content into it.
```html
<div class="container">
  <h2>MongoDB Tutorial - Product Management</h2>
  <a class="btn btn-info" href="productlist.jsp">List</a>
  <a class="btn btn-info" href="productadd.jsp">Create</a>
</div>
<hr/>
```
Create another JSP file named `productlist.jsp` with following content.
```raw
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@page import="johnny.mongodbtutorial.model.Product"%>
<%@page import="johnny.mongodbtutorial.dao.ProductDao"%>
<%@page import="java.util.List"%>
<%@page import="com.mongodb.MongoClient"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%
    String errmsg = "";
    MongoClient mongo = (MongoClient) request.getServletContext()
    .getAttribute("MONGO_CLIENT");
    ProductDao productDao = new ProductDao(mongo);

    List<Product> products = productDao.getList();
    if (products == null || products.size() == 0) {
        errmsg = "There is no product!";
    }

    pageContext.setAttribute("errmsg", errmsg);
    pageContext.setAttribute("products", products);
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>MongoDB Tutorial</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
</head>
<body>
<jsp:include page="header.jsp" />

<div class="container">
  <h2>Products</h2>
  <p>Data from MongoDB</p>
  <table class="table">
    <thead>
      <tr>
        <th>Product ID</th>
        <th>Product Name</th>
        <th>Price</th>
        <th>Operations</th>
      </tr>
    </thead>
    <tbody>
      <c:choose>
        <c:when test="${not empty errmsg}">
          <tr style='color:red'><td>${errmsg}</td></tr>
        </c:when>
        <c:otherwise>
          <c:forEach var="product" items="${products}">
            <tr>
              <td><c:out value="${product.id}"/></td>
              <td><c:out value="${product.name}"/></td>
              <td><fmt:setLocale value="en_US"/><fmt:formatNumber value="${product.price}" type="currency"/></td>
              <td><a class="btn btn-success" href="productedit.jsp?id=${product.id}">Edit</a>&nbsp;<a class="btn btn-danger" href="productdel.jsp?id=${product.id}" onclick="return confirm('Are you sure to delete this product?')">Delete</a></td>
            </tr>
          </c:forEach>
        </c:otherwise>
      </c:choose>
    </tbody>
  </table>
</div>
</body>
</html>
```
Create another JSP file named `productadd.jsp` with following content.
```raw
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@page import="johnny.mongodbtutorial.model.Product"%>
<%@page import="johnny.mongodbtutorial.dao.ProductDao"%>
<%@page import="java.util.List"%>
<%@page import="com.mongodb.MongoClient"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%
    String errmsg = "";
    String name = "";
    String price = "";

    if ("GET".equalsIgnoreCase(request.getMethod())) {
    } else {
        name = request.getParameter("name");
        price = request.getParameter("price");

        if(name == null || name.isEmpty()){
            errmsg = "Product name can't be empty!";
        }else if(price == null || price.isEmpty()){
            errmsg = "Price can't be empty!";
        }

        double dprice = 0.0;
        if (errmsg.isEmpty()) {
            try {
                dprice = Double.parseDouble(price);
                Product product = new Product();
                product.setName(name);
                product.setPrice(dprice);
                // create
                MongoClient mongo = (MongoClient) request.getServletContext()
                    .getAttribute("MONGO_CLIENT");
                ProductDao productDao = new ProductDao(mongo);
                productDao.create(product);
                response.sendRedirect("productlist.jsp");
            } catch (NumberFormatException nfe) {
                errmsg = "Price must be number!";
            }
        }
    }
    pageContext.setAttribute("errmsg", errmsg);
    pageContext.setAttribute("name", name);
    pageContext.setAttribute("price", price);
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>MongoDB Tutorial</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
</head>
<body>
<jsp:include page="header.jsp" />
<div class="container">
  <h2>Add New Product</h2>
  <h3 style='color:red'>${errmsg}</h3>
  <form class="form-horizontal" action="productadd.jsp" method="Post">
    <div class="form-group">
      <label class="control-label col-sm-2" for="email">Product Name:</label>
      <div class="col-sm-10">
        <input class="form-control" id="name" placeholder="Enter product name" name="name" value="${name}">
      </div>
    </div>
    <div class="form-group">
      <label class="control-label col-sm-2" for="pwd">Price:</label>
      <div class="col-sm-10">
        <input class="form-control" id="price" placeholder="Enter price" name="price" value="${price}">
      </div>
    </div>
    <div class="form-group">
      <div class="col-sm-offset-2 col-sm-10">
        <button type="submit" class="btn btn-primary">Save</button>
      </div>
    </div>
  </form>
</div>
</body>
</html>
```
Create another JSP file named `productedit.jsp` with following content.
```raw
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@page import="johnny.mongodbtutorial.model.Product"%>
<%@page import="johnny.mongodbtutorial.dao.ProductDao"%>
<%@page import="java.util.List"%>
<%@page import="com.mongodb.MongoClient"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%
    String id = request.getParameter("id");
    String errmsg = "";
    String name = "";
    String price = "";

    if (id == null || id.isEmpty()) {
        errmsg = "Invalid parameter!";
    } else {
        MongoClient mongo = (MongoClient) request.getServletContext()
                .getAttribute("MONGO_CLIENT");
        ProductDao productDao = new ProductDao(mongo);
        if ("GET".equalsIgnoreCase(request.getMethod())) {
            Product product = productDao.getProduct(id);
            name = product.getName();
            price = Double.toString(product.getPrice());
        } else {
            name = request.getParameter("name");
            price = request.getParameter("price");

            if(name == null || name.isEmpty()){
                errmsg = "Product name can't be empty!";
            }else if(price == null || price.isEmpty()){
                errmsg = "Price can't be empty!";
            }

            double dprice = 0.0;
            if (errmsg.isEmpty()) {
                try {
                    dprice = Double.parseDouble(price);
                } catch (NumberFormatException nfe) {
                    errmsg = "Price must be number!";
                }
                Product product = productDao.getProduct(id);
                product.setName(name);
                product.setPrice(dprice);
                // update
                productDao.update(product);
                response.sendRedirect("productlist.jsp");
            }
        }
    }

    pageContext.setAttribute("errmsg", errmsg);
    pageContext.setAttribute("id", id);
    pageContext.setAttribute("name", name);
    pageContext.setAttribute("price", price);
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>MongoDB Tutorial</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
</head>
<body>
<jsp:include page="header.jsp" />
<div class="container">
  <h2>Edit Product</h2>
  <h3 style='color:red'>${errmsg}</h3>
  <form class="form-horizontal" action="productedit.jsp?id=${id}" method="Post">
    <input type="hidden" name="id" value="${id}">
    <div class="form-group">
      <label class="control-label col-sm-2" for="email">Product Name:</label>
      <div class="col-sm-10">
        <input class="form-control" id="name" placeholder="Enter product name" name="name" value="${name}">
      </div>
    </div>
    <div class="form-group">
      <label class="control-label col-sm-2" for="pwd">Price:</label>
      <div class="col-sm-10">
        <input class="form-control" id="price" placeholder="Enter price" name="price" value="${price}">
      </div>
    </div>
    <div class="form-group">
      <div class="col-sm-offset-2 col-sm-10">
        <button type="submit" class="btn btn-primary">Save</button>
      </div>
    </div>
  </form>
</div>
</body>
</html>
```
Create another JSP file named `productedel.jsp` with following content.
```raw
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@page import="johnny.mongodbtutorial.dao.ProductDao"%>
<%@page import="com.mongodb.MongoClient"%>
<%
    String id = request.getParameter("id");
    String errmsg = "";

    if (id == null || id.isEmpty()) {
        errmsg = "Invalid parameter!";
    } else {
        MongoClient mongo = (MongoClient) request.getServletContext()
                .getAttribute("MONGO_CLIENT");
        ProductDao productDao = new ProductDao(mongo);
        if (productDao.exists(id)) {
            productDao.delete(id);
            response.sendRedirect("productlist.jsp");
        } else {
            errmsg = "No Product found!";
        }
    }

    pageContext.setAttribute("errmsg", errmsg);
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>MongoDB Tutorial</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
</head>
<body>
<jsp:include page="header.jsp" />
<div>
  <h3>Delete Product</h3>
  <h3 style='color:red'>${errmsg}</h3>
</div>
</body>
</html>
```
### 2.6 Project Structure
Finally, the project structure looks like this.
![image](/assets/images/programming/2533/project.png){:width="400px"}

## 3. Setting up MongoDB
### 3.1 Starting MongoDB
Start MongoDB service.
```raw
$ sudo mongod
```
Open another terminal, launch MongoDB Shell with `mongo` command.
```raw
$ mongo
>
```
### 3.2 Creating Database and Documents
Create a database named `mongodbtutorial` and three documents for collection `product`.
```raw
> db.product.insert([{name: 'Xbox', price: 100},{name: 'PS4',price: 400},{name: 'iPhone',price: 699}])
```
![image](/assets/images/programming/2533/initialization.png){:width="800px"}  

## 4. Testing
Launch the MongoDB Tutorial application, access http://localhost:8080/MongoDBTutorial/productlist.jsp in browser.
![image](/assets/images/programming/2533/productlist.png)
Click the 'Create' button, input product name and price.
![image](/assets/images/programming/2533/productadd.png)
Click 'Save' button, product is saved.
![image](/assets/images/programming/2533/productlistafteradd.png)
Click 'Edit' button of the new added product. Change the product name and price.
![image](/assets/images/programming/2533/productedit.png)
Click 'Save' button, product(ID=4) is updated.
![image](/assets/images/programming/2533/productlistafteredit.png)
Click 'Delete' button of the last product. A popup window for confirming the delete operation shows up.
![image](/assets/images/programming/2533/deleteconfirm.png)
Click 'OK' button, product will be deleted.
![image](/assets/images/programming/2533/productlistafterdel.png)

## 5. Source Files
* [Source files of MongoDB Tutorial on Github](https://github.com/jojozhuang/Tutorials/tree/master/MongoDBTutorial)

## 6. Reference
* [MongoDB Driver Quick Start](http://mongodb.github.io/mongo-java-driver/3.4/driver/getting-started/quick-start/)
* [MongoDB Java CRUD Example Tutorial](https://www.journaldev.com/3963/mongodb-java-crud-example-tutorial)
* [MongoDB Java Servlet Web Application Example Tutorial](https://www.journaldev.com/4011/mongodb-java-servlet-web-application-example-tutorial)
