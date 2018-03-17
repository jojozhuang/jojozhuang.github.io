---
layout: portfolio
key: portfolio
title: "Online Game Store(JSP)"
index: 290
tags: [Java, Servlet, JSP, Beans, MySQL]
image: /public/portfolio/gamestorejsp/thumbnail.png
excerpt: An online eCommerce web store, built with MySQL and Servlet/JSP in Java.
category: dotnet
---

> An online eCommerce web store, built with MySQL and Servlet/JSP in Java.

Features are described as follows:  

* Pages: Home, Consoles, Accessories, Games, Tablets
* General Functions: View Product, Search Product, View Comments of Product
* Membership: Register, Login, Logout
* Roles: Customer, Store Manager, Sales Manager

Role Based Functions:

* Customer: Add Product to Cart, Checkout, View Own Orders
* Store Manager: Create/Edit/Delete Games, Create/Edit/Delete Accessories
* Salesman: View/Edit/Delete All Order, Create/Edit/Delete User

Three Different Implementations:

* Servlet + Hard-code data in source files
* JSP + Beans + Data files
* JSP + MySQL

## 1. Pages  
### 1.1 Home Page  
![image](/public/portfolio/gamestorejsp/index.png)  
### 1.2 Consoles  
![image](/public/portfolio/gamestorejsp/consoles.png)  
### 1.3 Accessories  
![image](/public/portfolio/gamestorejsp/accessories.png)  
### 1.4 Games  
![image4](/public/portfolio/gamestorejsp/games.png)  
### 1.5 Tablets
![image](/public/portfolio/gamestorejsp/tablets.png)  

## 2. General Functions  
### 2.1 View Product  
### 2.2 Search Product  
![image](/public/portfolio/gamestorejsp/searchbox.png)  
Search Result for 'Controller'.
![image](/public/portfolio/gamestorejsp/searchresult.png)  
### 2.3 View Comments of Product  
You can check the reviews/comments for any product.  
![image](/public/portfolio/gamestorejsp/review.png){:width="250px"}  
All of the review comments are displayed at the bottom of the page. Customer can submit new comments after login.  
![image](/public/portfolio/gamestorejsp/comments.png)  

## 3. Membership
### 3.1 Register  
![image](/public/portfolio/gamestorejsp/register.png)  
### 3.2 Login  
![image](/public/portfolio/gamestorejsp/login.png)  
### 3.3 Logout
![image](/public/portfolio/gamestorejsp/logout.png)  

## 4. Role Based Functions  
### 4.1 Customer  
Customer can purchase products, add them to the shopping cart and place order finally. And they can edit the quantity of the items in the cart.  
![image](/public/portfolio/gamestorejsp/cart.png)  
Provide address and credit card information.  
![image](/public/portfolio/gamestorejsp/deliveryaddress.png)  
Order is generated.
![image](/public/portfolio/gamestorejsp/order.png)  
View My Order list. Here, you can cancel your order.
![image](/public/portfolio/gamestorejsp/orderlist.png)  
### 4.2 Store Manager  
Login with the default user ‘storemanager’ and password ‘storemanager’. Select the user type of ‘Store Manager’.  
![image](/public/portfolio/gamestorejsp/storemanager.png)  
After login, you will see two more different menu items: Accessory and Game.
You can create, edit, and delete accessories.
![image](/public/portfolio/gamestorejsp/manageaccessories.png)  
![image](/public/portfolio/gamestorejsp/addaccessory.png)  
And, you can create, edit, and delete games.
![image](/public/portfolio/gamestorejsp/managegames.png)  
![image](/public/portfolio/gamestorejsp/addgame.png)  
### 4.3 Salesman  
Login with the default user ‘salesman’ and password ‘salesman’. Select the user type of ‘Salesman’.
![image](/public/portfolio/gamestorejsp/salesman.png)  
After login, you will see two more different menu options: All Orders and User.
You can create, edit, and delete customers’ orders.
![image](/public/portfolio/gamestorejsp/manageorders.png)  
![image](/public/portfolio/gamestorejsp/editorder.png)  
And you can create, edit, and delete users.
![image](/public/portfolio/gamestorejsp/manageusers.png)  
![image](/public/portfolio/gamestorejsp/adduser.png)  

## 5. Development  
There are three versions of this Game Store web application.
* The first one is developed by pure servlets.
* The second one is developed with JSP + Beans without explicit servlets.
* The third one uses MySQL as database.  

### 5.1 Servlet + Static Data
![image](/public/portfolio/gamestorejsp/servlet.png)  
For the servlet version, data is stored in HashMap.
![image](/public/portfolio/gamestorejsp/servletdata.png)  
### 5.2 JSP + Data File
![image](/public/portfolio/gamestorejsp/jsp.png)  
For the JSP version, data is serialized and stored in files. These files are placed in WEB-INF folder. Any change to the game store will be persisted to these files.
![image](/public/portfolio/gamestorejsp/datafile.png)  
### 5.3 JSP + MySQL
For the MySQL version, data is persisted to MySQL database. Use MySQL Workbench to check data change after any operation in the UI.
![image](/public/portfolio/gamestorejsp/mysqlworkbench.png)  

## 6. Source Files
* [Source files of GameStore(Servlet) on Github](https://github.com/jojozhuang/Portfolio/tree/master/GameStoreServlet)
* [Source files of GameStore(JSP) on Github](https://github.com/jojozhuang/Portfolio/tree/master/GameStoreJSP)
* [Source files of GameStore(MySQL) on Github](https://github.com/jojozhuang/Portfolio/tree/master/GameStoreMySQL)
