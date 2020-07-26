---
layout: tutorial
key: programming
title: "Building Website with JSP and MySQL"
index: 2532
subcategory: java-app
date: 2016-02-26
tags: [JSP, MySQL]
---

> Build a web application with Java Server Pages (JSP) and MySQL database.

## 1. JSP & MySQL
### 1.1 JSP
Java Server Pages (JSP) is a server-side programming technology that enables the creation of dynamic, platform-independent method for building Web-based applications. JSP have access to the entire family of Java APIs, including the JDBC API to access enterprise databases.

### 1.2 MySQL
MySQL is the most popular Open Source Relational SQL Database Management System. MySQL is one of the best RDBMS being used for developing various web-based software applications.

## 2. Prerequisites
### 2.1 Java Development Environment
Development environment has been setup. JDK, Eclipse and Tomcat are all installed. Otherwise, refer to [Setting up Java Development Environment on Mac]({% link _programming/dev-environment/setting-up-java-development-environment-on-mac.md %}) to setup your development environment.
### 2.2 MySQL Database
MySQL database has been installed. Otherwise, refer to [Installing MySQL and Workbench on Mac]({% link _programming/dev-environment/installing-mysql-and-workbench-on-mac.md %}) to install MySQL database and MySQL Workbench.

## 3. Setting up JSP Project
### 3.1 Creating Dynamic Web Project
In Eclipse, File->New->Dynamic Web Project, specify project name as 'JSPTutorial'.
### 3.2 Adding Libraries to the Project
1) JSTL  
Go to [https://tomcat.apache.org/taglibs/index.html](https://tomcat.apache.org/taglibs/index.html), download JSP Standard Tag Library(JSTL). Put the jar file to `\WebContent\WEB-INF\lib`.  
2) MySQL Connector  
To let our JSP application access MySQL database, we need MySQL connector jar. It is a middleware between our JSP application and MySQL Database. MySQL Connector has many versions. `MySQL Connector/J` is the official JDBC driver for Java. Go to [https://dev.MySQL.com/downloads/connector/j/](https://dev.MySQL.com/downloads/connector/j/), download MySQL Connector/J. Extract MySQL connector jar from the zip file, put it to `\WebContent\WEB-INF\lib`.
### 3.3 Creating web.xml
Create an xml file named `web.xml` in `\WebContent\WEB-INF` with following content.
```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app version="3.1" xmlns="http://xmlns.jcp.org/xml/ns/javaee" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_3_1.xsd">
    <display-name>JSP Tutorial</display-name>
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
### 3.4 Creating context.xml
Create an xml file named `context.xml` in `\WebContent\META-INF` with following content. This file contains the information for JSP application to connect to MySQL database.
```xml
<?xml version="1.0" encoding="UTF-8"?>
<Context path="/jsptutorial">
    <Resource name="jdbc/jsptutorial" auth="Container"
        driverClassName="com.mysql.jdbc.Driver"
        url="jdbc:mysql://127.0.0.1:3306/jsptutorial"
        username="root" password="abc123"
        maxActive="100" maxIdle="30" maxWait="10000"
        logAbandoned="true" removeAbandoned="true"
        removeAbandonedTimeout="60" type="javax.sql.DataSource" />
</Context>
```
### 3.5 Creating Java Files
Right-click on JSPTutorial->Java Resources->src, create package named `Johnny.JSPTutorial.Beans`. Then, create java file named `Product.java` with the following content.
```java
package Johnny.JSPTutorial.Beans;

public class Product {
    private int productid;
    private String productname;
    private double price;

    public Product() {}

    public Product(int productid, String productname, double price) {
        this.productid = productid;
        this.productname = productname;
        this.price = price;
    }

    public int getProductId() {
        return productid;
    }
    public void setProductId(int productid) {
        this.productid = productid;
    }

    public String getProductName() {
        return productname;
    }
    public void setProductName(String productname) {
        this.productname = productname;
    }

    public double getPrice() {
        return price;
    }
    public void setPrice(double price) {
        this.price = price;
    }
}
```
Right-click on JSPTutorial->Java Resources->src, create package named `Johnny.JSPTutorial.Database`. Then, create java file named `ConnectionPool.java` with the following content.
```java
package Johnny.JSPTutorial.Database;

import java.sql.*;
import javax.sql.DataSource;
import javax.naming.InitialContext;
import javax.naming.NamingException;

public class ConnectionPool {

    private static ConnectionPool pool = null;
    private static DataSource dataSource = null;

    private ConnectionPool() {
        try {
            InitialContext ic = new InitialContext();
            dataSource = (DataSource) ic.lookup("java:/comp/env/jdbc/jsptutorial");
        } catch (NamingException e) {
            System.out.println(e);
        }
    }

    public static synchronized ConnectionPool getInstance() {
        if (pool == null) {
            pool = new ConnectionPool();
        }
        return pool;
    }

    public Connection getConnection() {
        try {
            return dataSource.getConnection();
        } catch (SQLException e) {
            System.out.println(e);
            return null;
        }
    }

    public void freeConnection(Connection c) {
        try {
            c.close();
        } catch (SQLException e) {
            System.out.println(e);
        }
    }
}
```
Create another java file named `DBUtil.java` with the following content in the same package.
```java
package Johnny.JSPTutorial.Database;

import java.sql.*;

public class DBUtil {

    public static void closeStatement(Statement s) {
        try {
            if (s != null) {
                s.close();
            }
        } catch (SQLException e) {
            System.out.println(e);
        }
    }

    public static void closePreparedStatement(Statement ps) {
        try {
            if (ps != null) {
                ps.close();
            }
        } catch (SQLException e) {
            System.out.println(e);
        }
    }

    public static void closeResultSet(ResultSet rs) {
        try {
            if (rs != null) {
                rs.close();
            }
        } catch (SQLException e) {
            System.out.println(e);
        }
    }
}
```
Right-click on JSPTutorial->Java Resources->src, create package named 'Johnny.JSPTutorial.Dao'. Then, create java file named `ProductDao.java` with the following methods for CRUD operations.
* insert()
* update()
* delete()
* exists()
* getList()
* getProduct()

```java
package Johnny.JSPTutorial.Dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import Johnny.JSPTutorial.Beans.Product;
import Johnny.JSPTutorial.Database.ConnectionPool;
import Johnny.JSPTutorial.Database.DBUtil;

public class ProductDao {
	public static int insert(Product product) {
        ConnectionPool pool = ConnectionPool.getInstance();
        Connection connection = pool.getConnection();
        PreparedStatement ps = null;
        int generatedkey = 0;

        String query
                = "INSERT INTO Product (ProductName, Price) "
                + "VALUES (?, ?)";
        try {
            connection.setAutoCommit(false); //transaction block start
            ps = connection.prepareStatement(query, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, product.getProductName());
            ps.setDouble(2, product.getPrice());
            ps.executeUpdate();
            ResultSet rs = ps.getGeneratedKeys();
            if (rs.next()) {
               generatedkey=rs.getInt(1);
            }

            if (generatedkey > 0) {

            } else {
                connection.rollback();
                return 0;
            }
            connection.commit(); //transaction block end
            return generatedkey;
        } catch (SQLException e) {
            System.out.println(e);
            return 0;
        } finally {
            DBUtil.closePreparedStatement(ps);
            pool.freeConnection(connection);
        }
    }

    public static int update(Product product) {
        ConnectionPool pool = ConnectionPool.getInstance();
        Connection connection = pool.getConnection();
        PreparedStatement ps = null;

        String query = "UPDATE Product SET "
                + "ProductName = ?, "
                + "Price = ? "
                + "WHERE ProductId = ?";
        try {
            connection.setAutoCommit(false); //transaction block start
            ps = connection.prepareStatement(query);
            ps.setString(1, product.getProductName());
            ps.setDouble(2, product.getPrice());
            ps.setInt(3, product.getProductId());
            ps.executeUpdate();
            connection.commit(); //transaction block end
            return 1;
        } catch (SQLException e) {
            System.out.println(e);
            return 0;
        } finally {
            DBUtil.closePreparedStatement(ps);
            pool.freeConnection(connection);
        }
    }

    public static int delete(int productid) {
        ConnectionPool pool = ConnectionPool.getInstance();
        Connection connection = pool.getConnection();
        PreparedStatement ps = null;

        String query = "DELETE FROM Product "
                + "WHERE ProductId = ?";
        try {
            connection.setAutoCommit(false); //transaction block start
            ps = connection.prepareStatement(query);
            ps.setInt(1, productid);
            ps.executeUpdate();
            connection.commit(); //transaction block end
            return 1;
        } catch (SQLException e) {
            System.out.println(e);
            return 0;
        } finally {
            DBUtil.closePreparedStatement(ps);
            pool.freeConnection(connection);
        }
    }

    public static boolean exists(int productid) {
        ConnectionPool pool = ConnectionPool.getInstance();
        Connection connection = pool.getConnection();
        PreparedStatement ps = null;
        ResultSet rs = null;

        String query = "SELECT ProductId FROM Product "
                + "WHERE ProductId = ?";
        try {
            ps = connection.prepareStatement(query);
            ps.setInt(1, productid);
            rs = ps.executeQuery();
            return rs.next();
        } catch (SQLException e) {
            System.out.println(e);
            return false;
        } finally {
            DBUtil.closeResultSet(rs);
            DBUtil.closePreparedStatement(ps);
            pool.freeConnection(connection);
        }
    }

    public static List<Product> getList() {
        ConnectionPool pool = ConnectionPool.getInstance();
        Connection connection = pool.getConnection();
        PreparedStatement ps = null;
        ResultSet rs = null;
        List<Product> list = new ArrayList();

        String query = "SELECT * FROM Product ";
        try {
            ps = connection.prepareStatement(query);
            rs = ps.executeQuery();
            Product product = null;
            while (rs.next()) {
                product = new Product();
                product.setProductId(rs.getInt("ProductId"));
                product.setProductName(rs.getString("ProductName"));
                product.setPrice(rs.getDouble("Price"));
                list.add(product);
            }
            return list;
        } catch (SQLException e) {
            System.out.println(e);
            return null;
        } finally {
            DBUtil.closeResultSet(rs);
            DBUtil.closePreparedStatement(ps);
            pool.freeConnection(connection);
        }
    }

    public static Product getProduct(int id) {
        ConnectionPool pool = ConnectionPool.getInstance();
        Connection connection = pool.getConnection();
        PreparedStatement ps = null;
        ResultSet rs = null;

        String query = "SELECT * FROM Product "
                + "WHERE ProductId = ?";
        try {
            ps = connection.prepareStatement(query);
            ps.setInt(1, id);
            rs = ps.executeQuery();
            Product product = null;
            while (rs.next()) {
                product = new Product();
                product.setProductId(rs.getInt("ProductId"));
                product.setProductName(rs.getString("ProductName"));
                product.setPrice(rs.getDouble("Price"));
                break;
            }

            return product;
        } catch (SQLException e) {
            System.out.println(e);
            return null;
        } finally {
            DBUtil.closeResultSet(rs);
            DBUtil.closePreparedStatement(ps);
            pool.freeConnection(connection);
        }
    }
}
```
### 3.6 Creating JSP Files
In Project Explorer, right-click on JSPTutorial->WebContent, New->JSP File. Specify file name `header.jsp` and add following content into it.
```html
<div class="container">
  <h2>JSP Tutorial - Product Management</h2>
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
<%@page import="Johnny.JSPTutorial.Beans.Product"%>
<%@page import="Johnny.JSPTutorial.Dao.ProductDao"%>
<%@page import="java.util.List"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%
    String errmsg = "";
    List<Product> products = ProductDao.getList();
    if (products == null || products.size() == 0) {
        errmsg = "There is no product!";
    }

    pageContext.setAttribute("errmsg", errmsg);
    pageContext.setAttribute("products", products);
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>JSP Tutorial</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
</head>
<body>
<jsp:include page="header.jsp" />

<div class="container">
  <h2>Products</h2>
  <p>Data from Mysql</p>
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
              <td><c:out value="${product.productId}"/></td>
              <td><c:out value="${product.productName}"/></td>
              <td><fmt:setLocale value="en_US"/><fmt:formatNumber value="${product.price}" type="currency"/></td>
              <td><a class="btn btn-success" href="productedit.jsp?id=${product.productId}">Edit</a>&nbsp;<a class="btn btn-danger" href="productdel.jsp?id=${product.productId}" onclick="return confirm('Are you sure to delete this product?')">Delete</a></td>
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
<%@page import="Johnny.JSPTutorial.Beans.Product"%>
<%@page import="Johnny.JSPTutorial.Dao.ProductDao"%>
<%@page import="java.util.List"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%
    String errmsg = "";
    String productname = "";
    String price = "";

    if ("GET".equalsIgnoreCase(request.getMethod())) {
    } else {
        productname = request.getParameter("productname");
        price = request.getParameter("price");

        if(productname == null || productname.isEmpty()){
            errmsg = "Product name can't be empty!";
        }else if(price == null || price.isEmpty()){
            errmsg = "Price can't be empty!";
        }

        double dprice = 0.0;
        if (errmsg.isEmpty()) {
            try {
                dprice = Double.parseDouble(price);
                Product product = new Product();
                product.setProductName(productname);
                product.setPrice(dprice);
                // create
                ProductDao.insert(product);
                response.sendRedirect("productlist.jsp");
            } catch (NumberFormatException nfe) {
                errmsg = "Price must be number!";
            }
        }
    }
    pageContext.setAttribute("errmsg", errmsg);
    pageContext.setAttribute("productname", productname);
    pageContext.setAttribute("price", price);
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>JSP Tutorial</title>
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
  <form class="form-horizontal" action="/JSPTutorial/productadd.jsp" method="Post">
    <div class="form-group">
      <label class="control-label col-sm-2" for="email">Product Name:</label>
      <div class="col-sm-10">
        <input class="form-control" id="productname" placeholder="Enter product name" name="productname" value="${productname}">
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
<%@page import="Johnny.JSPTutorial.Beans.Product"%>
<%@page import="Johnny.JSPTutorial.Dao.ProductDao"%>
<%@page import="java.util.List"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%
    String id = request.getParameter("id");
    String errmsg = "";
    String productname = "";
    String price = "";

    if (id == null || id.isEmpty()) {
        errmsg = "Invalid parameter!";
    } else {
        int productid = Integer.parseInt(id);
        if ("GET".equalsIgnoreCase(request.getMethod())) {
            Product product = ProductDao.getProduct(productid);
            productname = product.getProductName();
            price = Double.toString(product.getPrice());
        } else {
            productname = request.getParameter("productname");
            price = request.getParameter("price");

            if(productname == null || productname.isEmpty()){
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
                Product product = ProductDao.getProduct(productid);
                product.setProductName(productname);
                product.setPrice(dprice);
                // update
                ProductDao.update(product);
                response.sendRedirect("productlist.jsp");
            }
        }
    }

    pageContext.setAttribute("errmsg", errmsg);
    pageContext.setAttribute("id", id);
    pageContext.setAttribute("productname", productname);
    pageContext.setAttribute("price", price);
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>JSP Tutorial</title>
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
  <form class="form-horizontal" action="/JSPTutorial/productedit.jsp?id=${id}" method="Post">
    <input type="hidden" name="id" value="${id}">
    <div class="form-group">
      <label class="control-label col-sm-2" for="email">Product Name:</label>
      <div class="col-sm-10">
        <input class="form-control" id="productname" placeholder="Enter product name" name="productname" value="${productname}">
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
<%@page import="Johnny.JSPTutorial.Dao.ProductDao"%>
<%
    String id = request.getParameter("id");
    String errmsg = "";

    if (id == null || id.isEmpty()) {
        errmsg = "Invalid parameter!";
    } else {
        int productid = Integer.parseInt(id);
        if (ProductDao.exists(productid)) {
            ProductDao.delete(productid);
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
<title>JSP Tutorial</title>
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
### 3.7 Project Structure
Finally, the project structure looks like this.
![image](/assets/images/programming/2532/project.png){:width="400px"}

## 4. Setting up MySQL Database
### 4.1 Creating Connection
In MySQL Workbench, create a new connection to MySQL database, specify the connection name `JSP Tutorial`.
![image](/assets/images/programming/2532/addconnection.png){:width="800px"}
### 4.2 Creating Database and Table
In Query tab, execute following sql script to create a new database named `jsptutorial`.
```sql
CREATE DATABASE  IF NOT EXISTS `jsptutorial`
```
Create a table named `Product`, which contains three columns.
```sql
USE `jsptutorial`;
CREATE TABLE `Product` (
  `ProductId` int(11) NOT NULL AUTO_INCREMENT,
  `ProductName` varchar(50) DEFAULT NULL,
  `Price` double NOT NULL,
  PRIMARY KEY (`ProductId`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
```
Create initial data.
```sql
INSERT INTO `Product` VALUES (1,'Xbox',100),(2,'PS4',400),(3,'iPhone',699);
```
Run the following script to show all data in table `Product`.
```sql
SELECT * FROM jsptutorial.Product;
```
![image](/assets/images/programming/2532/mysqlworkbench.png)

## 5. Launching JSP Application
In Eclipse, add Tomcat server. Window->Show View->Server, click the link to add new server.
![image](/assets/images/programming/2532/eclipseserver.png){:width="600px"}
Select Tomcat 9.0.
![image](/assets/images/programming/2532/newserver.png){:width="600px"}
Add Our Project to right side.
![image](/assets/images/programming/2532/addresource.png){:width="600px"}
In eclipse project, a new server folder for tomcat is added.
![image](/assets/images/programming/2532/servers.png){:width="400px"}
Set Targeted Runtimes.  
Right click on the JSPTutorial Project->Properties->Targeted Runtimes, check Tomcat 9.0.
![image](/assets/images/programming/2532/targetedruntimes.png){:width="800px"}
Now, we can use 'Run on Server' to start our JSP Application.
![image](/assets/images/programming/2532/runonserver.png)  
There will be a browser opened in eclipse, which shows our JSP website. Or you can directly access http://localhost:8080/JSPTutorial/productlist.jsp in browser.
![image](/assets/images/programming/2532/productlist.png)

## 6. Testing
Click the 'Create' button, input product name and price.
![image](/assets/images/programming/2532/productadd.png)
Click 'Save' button, product is saved.
![image](/assets/images/programming/2532/productlistafteradd.png)
Click 'Edit' button of the new added product. Change the product name and price.
![image](/assets/images/programming/2532/productedit.png)
Click 'Save' button, product(ID=4) is updated.
![image](/assets/images/programming/2532/productlistafteredit.png)
Click 'Delete' button of the last product. A popup window for confirming the delete operation shows up.
![image](/assets/images/programming/2532/deleteconfirm.png)
Click 'OK' button, product will be deleted.
![image](/assets/images/programming/2532/productlistafterdel.png)

## 7. Source Files
* [Source files of JSP Tutorial on Github](https://github.com/jojozhuang/Tutorials/tree/master/JSPTutorial)

## 8. References
* [JSP Tutorial](https://www.tutorialspoint.com/jsp/)
* [JSP - Standard Tag Library (JSTL) Tutorial](https://www.tutorialspoint.com/jsp/jsp_standard_tag_library.htm)
* [JDBC Driver class not found: com.MySQL.jdbc.Driver](https://stackoverflow.com/questions/8779631/jdbc-driver-class-not-found-com-MySQL-jdbc-driver)
