---
layout: portfolio
key: portfolio
title: "Online Game Store(JSP)"
index: 340
category: dotnet
image: gamestorejsp/thumbnail.png
tags: [Java, Servlet, JSP, Beans, MySQL]
---

> An online eCommerce web store, built with MySQL and Servlet/JSP in Java.

## 1. Introduction
### 1.1 Function
This website has all the required functions as an eCommerce web store. Here are the available features.
* Pages - Home, Consoles, Accessories, Games and Tablets.
* Membership - Customer, Store Manager, Sales Manager.
* User Authentication - Register, Login, User Profile, Reset Password, etc.
* Procure System - Shopping Cart, Order, Payment, Shipping.
* General Function - View Product, Search Product, View Comments of Product.

Role Based Functions:
* Customer - Add Product to Cart, Checkout, View Own Orders.
* Store Manager - Product Management for Consoles, Games, Accessories and Tablets.
* Salesman - Order Management, User Management

### 1.2 Three Different Implementations
* Servlet + Hard-code data in source files
* JSP + Beans + Data files
* JSP + MySQL

## 2. Pages  
### 2.1 Home Page  
![image](/assets/images/portfolio/gamestorejsp/index.png)  
### 2.2 Consoles  
![image](/assets/images/portfolio/gamestorejsp/consoles.png)  
### 2.3 Accessories  
![image](/assets/images/portfolio/gamestorejsp/accessories.png)  
### 2.4 Games  
![image4](/assets/images/portfolio/gamestorejsp/games.png)  
### 2.5 Tablets
![image](/assets/images/portfolio/gamestorejsp/tablets.png)  

## 3. General Functions  
### 3.1 View Product  
### 3.2 Search Product  
![image](/assets/images/portfolio/gamestorejsp/searchbox.png)  
Search Result for 'Controller'.
![image](/assets/images/portfolio/gamestorejsp/searchresult.png)  
### 3.3 View Comments of Product  
You can check the reviews/comments for any product.  
![image](/assets/images/portfolio/gamestorejsp/review.png){:width="250px"}  
All of the review comments are displayed at the bottom of the page. Customer can submit new comments after login.  
![image](/assets/images/portfolio/gamestorejsp/comments.png)  

## 4. Membership
### 4.1 Register  
![image](/assets/images/portfolio/gamestorejsp/register.png)  
### 4.2 Login  
![image](/assets/images/portfolio/gamestorejsp/login.png)  
### 4.3 Logout
![image](/assets/images/portfolio/gamestorejsp/logout.png)  

## 5. Role Based Functions  
### 5.1 Customer  
Customer can purchase products, add them to the shopping cart and place order finally. And they can edit the quantity of the items in the cart.  
![image](/assets/images/portfolio/gamestorejsp/cart.png)  
Provide address and credit card information.  
![image](/assets/images/portfolio/gamestorejsp/deliveryaddress.png)  
Order is generated.
![image](/assets/images/portfolio/gamestorejsp/order.png)  
View My Order list. Here, you can cancel your order.
![image](/assets/images/portfolio/gamestorejsp/orderlist.png)  
### 5.2 Store Manager  
Login with the default user ‘storemanager’ and password ‘storemanager’. Select the user type of ‘Store Manager’.  
![image](/assets/images/portfolio/gamestorejsp/storemanager.png)  
After login, you will see two more different menu items: Accessory and Game.
You can create, edit, and delete accessories.
![image](/assets/images/portfolio/gamestorejsp/manageaccessories.png)  
![image](/assets/images/portfolio/gamestorejsp/addaccessory.png)  
And, you can create, edit, and delete games.
![image](/assets/images/portfolio/gamestorejsp/managegames.png)  
![image](/assets/images/portfolio/gamestorejsp/addgame.png)  
### 5.3 Salesman  
Login with the default user ‘salesman’ and password ‘salesman’. Select the user type of ‘Salesman’.
![image](/assets/images/portfolio/gamestorejsp/salesman.png)  
After login, you will see two more different menu options: All Orders and User.
You can create, edit, and delete customers’ orders.
![image](/assets/images/portfolio/gamestorejsp/manageorders.png)  
![image](/assets/images/portfolio/gamestorejsp/editorder.png)  
And you can create, edit, and delete users.
![image](/assets/images/portfolio/gamestorejsp/manageusers.png)  
![image](/assets/images/portfolio/gamestorejsp/adduser.png)  

## 6. Development  
There are three versions of this Game Store web application.
* The first one is developed by pure servlets.
* The second one is developed with JSP + Beans without explicit servlets.
* The third one uses MySQL as database.  

### 6.1 Servlet + Static Data
![image](/assets/images/portfolio/gamestorejsp/servlet.png)  
For the servlet version, data is stored in HashMap.
![image](/assets/images/portfolio/gamestorejsp/servletdata.png)  
### 6.2 JSP + Data File
![image](/assets/images/portfolio/gamestorejsp/jsp.png)  
For the JSP version, data is serialized and stored in files. These files are placed in WEB-INF folder. Any change to the game store will be persisted to these files.
![image](/assets/images/portfolio/gamestorejsp/datafile.png)  
### 6.3 JSP + MySQL
For the MySQL version, data is persisted to MySQL database. Use MySQL Workbench to check data change after any operation in the UI.
![image](/assets/images/portfolio/gamestorejsp/mysqlworkbench.png)  

## 7. Source Files
* [Source files of GameStore(Servlet) on Github](https://github.com/jojozhuang/game-store-servlet)
* [Source files of GameStore(JSP) on Github](https://github.com/jojozhuang/game-store-jsp)
* [Source files of GameStore(MySQL) on Github](https://github.com/jojozhuang/game-store-mysql)
