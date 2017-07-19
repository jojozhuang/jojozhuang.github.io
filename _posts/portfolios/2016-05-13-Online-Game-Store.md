---
layout: software
key: portfolio
title: "Online Game Store"
date: 2016-05-13
tags: Java, Servlet, JSP, Beans, MySQL
image: /assets/gamestore/thumbnail.png
shortdesc: An online eCommerce web store, developed with MySQL and Servlet/JSP in Java.
subcateogry: java
categories:
- portfolio
---


> This web application is developed by Servlet and JSP in Java.

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
![image1](/assets/gamestore/image1.png)  
### 1.2 Consoles  
![image2](/assets/gamestore/image2.png)  
### 1.3 Accessories  
![image3](/assets/gamestore/image3.png)  
### 1.4 Games  
![image4](/assets/gamestore/image4.png)  
### 1.5 Tablets
![image5](/assets/gamestore/image5.png)  

## 2. General Functions  
### 2.1 View Product  
### 2.2 Search Product  
![image6](/assets/gamestore/image6.png)  
Search Result.  
![image7](/assets/gamestore/image7.png)  
### 2.3 View Comments of Product  
You can check the reviews/comments for any product.  
![image8](/assets/gamestore/image8.png)  
All of the review comments are displayed at the bottom of the page. Customer can submit new comments after login.  
![image9](/assets/gamestore/image9.png)  

## 3. Membership
### 3.1 Register  
![image10](/assets/gamestore/image10.png)  
### 3.2 Login  
![image11](/assets/gamestore/image11.png)  
### 3.3 Logout
![image12](/assets/gamestore/image12.png)  

## 4. Role Based Functions  
### 4.1 Customer  
Customer can purchase products, add them to the shopping cart and place order finally. And they can edit the quantity of the items in the cart.  
![image13](/assets/gamestore/image13.png)  
Provide address and credit card information.  
![image14](/assets/gamestore/image14.png)  
Order is generated.
![image15](/assets/gamestore/image15.png)  
View My Order list. Here, you can cancel your order.
![image16](/assets/gamestore/image16.png)  
### 4.2 Store Manager  
Login with the default user ‘storemanager’ and password ‘storemanager’. Select the user type of ‘Store Manager’.  
![image17](/assets/gamestore/image17.png)  
After login, you will see two more different menu items: Accessory and Game.
You can create, edit, and delete accessories.
![image18](/assets/gamestore/image18.png)  
![image19](/assets/gamestore/image19.png)  
And, you can create, edit, and delete games.
![image20](/assets/gamestore/image20.png)  
![image21](/assets/gamestore/image21.png)  
### 4.3 Salesman  
Login with the default user ‘salesman’ and password ‘salesman’. Select the user type of ‘Salesman’.
![image22](/assets/gamestore/image22.png)  
After login, you will see two more different menu options: All Orders and User.
You can create, edit, and delete customers’ orders.
![image23](/assets/gamestore/image23.png)  
And you can create, edit, and delete users.
![image24](/assets/gamestore/image24.png)  
![image25](/assets/gamestore/image25.png)  

## 5. Development  
I used NetBeans IDE 8.1 as development tool. And there are three versions of this Game Store web application. The first one is developed by pure servlets. The second one is developed with JSP + Beans without explicit servlets. And the third one uses MySQL as database.  
### 5.1 Servlet  
![image26](/assets/gamestore/image26.png)  
For the servlet version, data is stored in hashmap, in memory.
![image27](/assets/gamestore/image27.png)  
### 5.2 JSP + Beans
![image28](/assets/gamestore/image28.png)  
For the JSP version, data is serialized and stored in files. The files are placed in WEB-INF folder. Any change to the game store will be persisted to these files.
![image29](/assets/gamestore/image29.png)  
### 5.3 JSP + MySQL
![image30](/assets/gamestore/image30.png)  

## 6. Source Code Files
* [Servlet](https://github.com/jojozhuang/Course/tree/master/SE452/Homework2/hw2)
* [JSP+Beans](https://github.com/jojozhuang/Course/tree/master/SE452/Homework3/hw3)
* [JSP+MySQL](https://github.com/jojozhuang/Course/tree/master/SE452/Homework4/hw4)
