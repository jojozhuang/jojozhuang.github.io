---
layout: software
key: portfolio
title: "Online Game Store"
date: 2016-06-02
tags: C#, ASP.NET MVC, RESTful WebAPI, jQuery
image: /assets/gamestoreaspnet/thumbnail.png
shortdesc: An online eCommerce web store, developed with ASP.NET MVC in C#.
subcateogry: dotnet
categories:
- portfolio
---

> This web application is developed by ASP.NET MVC & Web API in C\#.

Features are described as follows:  

* Pages: Home, Consoles, Accessories, Games
* General Functions: View Product, Search Product
* Membership: Register, Login, Logout

Live Demo on Azure:
* [http://ect583final.azurewebsites.net/](http://ect583final.azurewebsites.net/)  (The website would be slow when you access it for the first time. Be patient!)

## 1. Pages  
### 1.1 Home Page
![image1](/assets/gamestoreaspnet/image1.png)  
### 1.2 Consoles
![image2](/assets/gamestoreaspnet/image2.png)  
### 1.3 Accessories
![image3](/assets/gamestoreaspnet/image3.png)  
### 1.4 Games
![image4](/assets/gamestoreaspnet/image4.png)  

## 2. General Functions  
### 2.1 Search Products  
You can search any product, including Console, Accessory and Game.
![image5](/assets/gamestoreaspnet/image5.png)  
Auto complete is implemented.
![image6](/assets/gamestoreaspnet/image6.png)  
Search Results.
![image7](/assets/gamestoreaspnet/image7.png)  

## 3. Membership
### 3.1 Register  
You can choose Regular($49.99) or Advanced($99.99) membership.
![image8](/assets/gamestoreaspnet/image8.png)  
Pay fees through dummy Credit Gateway.
![image9](/assets/gamestoreaspnet/image9.png)  
If the gateway works properly, the new user will finish registration and login automatically.
![image10](/assets/gamestoreaspnet/image10.png)  
### 3.2 Login
![image11](/assets/gamestoreaspnet/image11.png)  
### 3.3 Profile
![image12](/assets/gamestoreaspnet/image12.png)  
### 3.4 Change Password
![image13](/assets/gamestoreaspnet/image13.png)  

### 3.5 Role Based Functions:  
All the role based functions are available only for authorized users. You will be redirected to the login page if you try to access the unauthorized pages/functions.
After successfully login, the buttons at the top right of the webpage are changed. You username will be displayed and you can logout.

* Roles: Regular, Advanced, Admin
* Regular: Add Product to Cart, Checkout, Place Order and View Own Orders
* Advanced: Create/Edit/Delete Products, Check orders from his/her products.
* Admin: View/Edit/Delete Order, Create/Edit/Delete User, etc.

## 4. Regular User
Regular user can purchase products, add item to cart and place order finally. In the product list page, the original and discounted price are both shown for each product. Click ‘Add to cart’ button to add the current item to your cart.
![image14](/assets/gamestoreaspnet/image14.png)  
### 4.1 Cart
![image15](/assets/gamestoreaspnet/image15.png)  
1) You can choose any product(console, accessory or game) added to your cart.  
2) If any item added/removed from the cart, ‘Cart(n)’ will be refreshed immediately.  
3) In the cart, you can update the quantity.  
4) You can also remove the item.  
5) The price is the discounted price.  
6) The SubTotal shows the amount for each item cost(quantity may be larger than 1).  
7) The Total shows the total amount cost of all items in this cart.  
### 4.2 Checkout  
Provide the shipping information.  
![image16](/assets/gamestoreaspnet/image16.png)  
Go to another credit gateway for payment.  
![image17](/assets/gamestoreaspnet/image17.png)  
### 4.3 Place Order  
1) If successful with the payment, the items in cart are removed. Meanwhile, the order count is incremented by 1.  
2) Confirmation Number is generated based on the current time: yyyyMMddHHmmss.  
3) The delivery date is 2 weeks after the order date.  
![image18](/assets/gamestoreaspnet/image18.png)  
### 4.4 My Order  
1) Order list with detailed purchased items.  
2) You can cancel the order here.  
3) If there are multiple orders, all of them will be displayed, with detailed items and quantities.  
![image19](/assets/gamestoreaspnet/image19.png)  

## 5. Advanced User
1) Advanced User has the full functions of Regular User. Besides, Advanced user can create own product and sell to others.  
2) Login with the default user ‘advanced@gamestore.com’ and password ‘advanced’.  
3) After login, you will see two more different menu options: ‘My Products’ and ‘My Product Orders’.  
![image20](/assets/gamestoreaspnet/image20.png)  
### 5.1 My Products  
You can create, edit, and delete products for selling.  
![image21](/assets/gamestoreaspnet/image21.png)  
![image22](/assets/gamestoreaspnet/image22.png)  
![image23](/assets/gamestoreaspnet/image23.png)  
The new product will be displayed in the front page.  
![image24](/assets/gamestoreaspnet/image24.png)  
### 5.2 My Product Orders  
![image25](/assets/gamestoreaspnet/image25.png)  

## 6. Admin
1) Admin User has the full functions of Regular User. Besides, Advanced user can create user, role, product, category, cancel order and monitor the application with dashboard.  
2) Login with the default user ‘admin@gamestore.com’ and password ‘admin’.  
3) After login, you will see more menu options: Dashboard, User, Role, Product, Category and Order.  
![image26](/assets/gamestoreaspnet/image26.png)  
### 6.1 Dashboard  
You can get the current status overview of the game store. Besides, you can clear the cache.  
![image27](/assets/gamestoreaspnet/image27.png)  
### 6.2 User  
You can create, edit, and delete users.  
![image28](/assets/gamestoreaspnet/image28.png)  
![image29](/assets/gamestoreaspnet/image29.png)  
![image30](/assets/gamestoreaspnet/image30.png)  
### 6.3 Role  
You can create, edit, and delete roles.  
![image31](/assets/gamestoreaspnet/image31.png)  
![image32](/assets/gamestoreaspnet/image32.png)  
![image33](/assets/gamestoreaspnet/image33.png)  
### 6.4 Product  
You can create, edit, and delete products.  
![image34](/assets/gamestoreaspnet/image34.png)  
![image35](/assets/gamestoreaspnet/image35.png)  
![image36](/assets/gamestoreaspnet/image36.png)  
### 6.5 Category  
You can create, edit, and delete product categories.  
![image37](/assets/gamestoreaspnet/image37.png)  
![image38](/assets/gamestoreaspnet/image38.png)  
![image39](/assets/gamestoreaspnet/image39.png)  
### 6.6 Order  
You can view and delete order, view detail items of the order.  
![image40](/assets/gamestoreaspnet/image40.png)  
![image41](/assets/gamestoreaspnet/image41.png)  

## 7. Summary
### 7.1 Default User Account

* admin@gamestore.com / admin
* advanced@gamestore.com / advanced
* regular@gamestore.com / regular

### 7.2 Technical Feature

* C\#, ASP.NET MVC, WebAPI
* Azure Deployment
* Entity Framework (Code First)
* SQL Server for persistence
* ASP.Net Identity: User and Role, Admin Area
* Authentication and Authorization
* Cache: Output Caching, ASP.NET Cache
* Bootstrap, jQuery
* Third-party Payment Gateway

## 8. Source Code Files
* [Source code files of Game Store on Github](https://github.com/jojozhuang/Course/tree/master/ECT583/Final/GameStore)
