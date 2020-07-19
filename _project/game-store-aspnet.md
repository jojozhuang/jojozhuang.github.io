---
layout: project
key: project
title: "Online Game Store(ASP.NET)"
index: 350
category: dotnet
image: gamestoreaspnet/thumbnail.png
tags: [ASP.NET MVC, RESTful WebAPI, jQuery]
---

> An online eCommerce web store, built with ASP.NET MVC in C#.

## 1. Introduction
### 1.1 Function
This website has all the required functions as an eCommerce web store. Here are the available features.
* Membership: Regular User, Advanced User, Admin User.
* User Authentication - Register, Login, User Profile, Reset Password, Role, etc.
* Product Management - Create, Update, Delete product.
* User Management - Create, Update, Delete user.
* Procure System - Shopping Cart, Order, Payment, Shipping.
* Website Management - Dashboard.
* General Function - Product Search.

### 1.2 Technology
The frameworks and libraries used for this app are listed below.
* C#, ASP.NET MVC, WebAPI
* Entity Framework (Code First)
* SQL Server for persistence
* Bootstrap, jQuery
* Ninject for Dependency Injection
* ASP.Net Identity: User and Role, Admin Area
* Authentication and Authorization
* Third-party Payment Gateway
* Cache: Output Caching, ASP.NET Cache
* Azure Deployment

### 1.3 Demo:
Live Demo on Azure: <a href="http://ect583final.azurewebsites.net/" target="\_blank">http://ect583final.azurewebsites.net/</a>

*Note: The demo websites may be slow when you access them for the first time. Be patient!*

Try it out on Azure with the following accounts:
* admin@gamestore.com / admin
* advanced@gamestore.com / advanced
* regular@gamestore.com / regular

## 2. Pages  
### 2.1 Home Page
![image](/assets/images/project/gamestoreaspnet/homepage.png)  
### 2.2 Consoles
![image](/assets/images/project/gamestoreaspnet/console.png)  
### 2.3 Accessories
![image](/assets/images/project/gamestoreaspnet/accessory.png)  
### 2.4 Games
![image](/assets/images/project/gamestoreaspnet/games.png)  

## 3. General Functions  
### 3.1 Search Products  
You can search any product, including Console, Accessory and Game. Auto complete for the search box is implemented.
![image](/assets/images/project/gamestoreaspnet/searchproduct.png)  
Search Results for `controller`.
![image](/assets/images/project/gamestoreaspnet/searchresult.png)  

## 4. Membership
### 4.1 Register  
You can choose Regular($49.99) or Advanced($99.99) membership.
![image](/assets/images/project/gamestoreaspnet/register.png)  
Pay fees through dummy Credit Gateway.
![image](/assets/images/project/gamestoreaspnet/gateway.png)  
If the gateway works properly, the new user will finish registration and login automatically.
![image](/assets/images/project/gamestoreaspnet/demo.png)  
### 4.2 Login
Generally, you need to click the 'Log in' button at the top and right of the page.
![image](/assets/images/project/gamestoreaspnet/login.png)  
### 4.3 Profile
![image](/assets/images/project/gamestoreaspnet/profile.png)  
### 4.4 Change Password
![image](/assets/images/project/gamestoreaspnet/changepassword.png)  
### 4.5 Role Based Functions:  
All the role based functions are available only for authorized users. You will be redirected to the login page if you try to access the unauthorized pages/functions.
After successfully login, the buttons at the top right of the webpage are changed. You username will be displayed and you can logout.
* Roles: Regular, Advanced, Admin
* Regular: Add Product to Cart, Checkout, Place Order and View Own Orders
* Advanced: Create/Edit/Delete Products, Check orders from his/her products.
* Admin: View/Edit/Delete Order, Create/Edit/Delete User, etc.

## 5. Regular User
Regular user can purchase products, add item to cart and place order finally. In the product list page, the original and discounted price are both shown for each product. Click ‘Add to cart’ button to add the current item to your cart.
![image](/assets/images/project/gamestoreaspnet/addcart.png)  
### 5.1 Cart
![image](/assets/images/project/gamestoreaspnet/shoppingcart.png)  
1) You can choose any product(console, accessory or game) added to your cart.  
2) If any item added/removed from the cart, ‘Cart(n)’ will be refreshed immediately.  
3) In the cart, you can update the quantity.  
4) You can also remove the item.  
5) The price is the discounted price.  
6) The SubTotal shows the amount for each item cost(quantity may be larger than 1).  
7) The Total shows the total amount cost of all items in this cart.  
### 5.2 Checkout  
Provide the shipping information.  
![image](/assets/images/project/gamestoreaspnet/checkout.png)  
Go to another credit gateway for payment.  
![image](/assets/images/project/gamestoreaspnet/payment.png)  
### 5.3 Place Order  
1) If successful with the payment, the items in cart are removed. Meanwhile, the order count is incremented by 1.  
2) Confirmation Number is generated based on the current time: yyyyMMddHHmmss.  
3) The delivery date is 2 weeks after the order date.  
![image](/assets/images/project/gamestoreaspnet/placeorder.png)  
### 5.4 My Order  
1) Order list with detailed purchased items.  
2) You can cancel the order here.  
3) If there are multiple orders, all of them will be displayed, with detailed items and quantities.  
![image](/assets/images/project/gamestoreaspnet/myorders.png)  

## 6. Advanced User
1) Advanced User has the full functions of Regular User. Besides, Advanced user can create own product and sell to others.  
2) Login with the default user ‘advanced@gamestore.com’ and password ‘advanced’.  
3) After login, you will see two more different menu options: ‘My Products’ and ‘My Product Orders’.  
![image](/assets/images/project/gamestoreaspnet/myproducts.png)  
### 6.1 My Products  
You can create, edit, and delete products for selling.  
![image](/assets/images/project/gamestoreaspnet/myproducts2.png)  
![image](/assets/images/project/gamestoreaspnet/addproductadv.png)  
![image](/assets/images/project/gamestoreaspnet/editproductadv.png)  
### 6.2 My Product Orders  
![image](/assets/images/project/gamestoreaspnet/myproductorder.png)  

## 7. Admin
1) Admin User has the full functions of Regular User. Besides, Advanced user can create user, role, product, category, cancel order and monitor the application with dashboard.  
2) Login with the default user ‘admin@gamestore.com’ and password ‘admin’.  
3) After login, you will see more menu options: Dashboard, User, Role, Product, Category and Order.  
![image](/assets/images/project/gamestoreaspnet/admin.png)  
### 7.1 Dashboard  
You can get the current status overview of the game store. Besides, you can clear the cache.  
![image](/assets/images/project/gamestoreaspnet/dashboard.png)  
### 7.2 User  
You can create, edit, and delete users.  
![image](/assets/images/project/gamestoreaspnet/users.png)  
![image](/assets/images/project/gamestoreaspnet/adduser.png)  
![image](/assets/images/project/gamestoreaspnet/edituser.png)  
### 7.3 Role  
You can create, edit, and delete roles.  
![image](/assets/images/project/gamestoreaspnet/roles.png)  
![image](/assets/images/project/gamestoreaspnet/addrole.png)  
![image](/assets/images/project/gamestoreaspnet/editrole.png)  
### 7.4 Product  
You can create, edit, and delete products.  
![image](/assets/images/project/gamestoreaspnet/products.png)  
![image](/assets/images/project/gamestoreaspnet/addproduct.png)  
![image](/assets/images/project/gamestoreaspnet/editproduct.png)  
### 7.5 Category  
You can create, edit, and delete product categories.  
![image](/assets/images/project/gamestoreaspnet/categories.png)  
![image](/assets/images/project/gamestoreaspnet/addcategory.png)  
![image](/assets/images/project/gamestoreaspnet/editcategory.png)  
### 7.6 Order  
You can view and delete order, view detail items of the order.  
![image](/assets/images/project/gamestoreaspnet/orders.png)  
![image](/assets/images/project/gamestoreaspnet/orderitem.png)  

## 8. Source Files
* [Source files of Game Store(ASP.NET MVC) on Github](https://github.com/jojozhuang/game-store-aspnet)
