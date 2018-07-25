---
layout: portfolio
key: portfolio
title: "Online Game Store(ASP.NET)"
index: 300
tags: [ASP.NET MVC, RESTful WebAPI, jQuery]
image: /public/portfolios/gamestoreaspnet/thumbnail.png
excerpt: An online eCommerce web store, built with ASP.NET MVC in C#.
category: dotnet
---

> An online eCommerce web store, built with ASP.NET MVC in C#.

## 1. Introduction
### 1.1 Function Features
* Pages: Home, Consoles, Accessories, Games
* General Functions: View Product, Search Product
* Membership: Register, Login, Logout

### 1.2 Technical Features
* C\#, ASP.NET MVC, WebAPI
* Azure Deployment
* Entity Framework (Code First)
* SQL Server for persistence
* ASP.Net Identity: User and Role, Admin Area
* Authentication and Authorization
* Cache: Output Caching, ASP.NET Cache
* Bootstrap, jQuery
* Ninject for Dependency Injection
* Third-party Payment Gateway

### 1.3 Live Demo on Azure:
[http://ect583final.azurewebsites.net/](http://ect583final.azurewebsites.net/)  (The website would be slow when you access it for the first time. Be patient!)
* admin@gamestore.com / admin
* advanced@gamestore.com / advanced
* regular@gamestore.com / regular

## 2. Pages  
### 2.1 Home Page
![image](/public/portfolios/gamestoreaspnet/homepage.png)  
### 2.2 Consoles
![image](/public/portfolios/gamestoreaspnet/console.png)  
### 2.3 Accessories
![image](/public/portfolios/gamestoreaspnet/accessory.png)  
### 2.4 Games
![image](/public/portfolios/gamestoreaspnet/games.png)  

## 3. General Functions  
### 3.1 Search Products  
You can search any product, including Console, Accessory and Game. Auto complete for the search box is implemented.
![image](/public/portfolios/gamestoreaspnet/searchproduct.png)  
Search Results for `controller`.
![image](/public/portfolios/gamestoreaspnet/searchresult.png)  

## 4. Membership
### 4.1 Register  
You can choose Regular($49.99) or Advanced($99.99) membership.
![image](/public/portfolios/gamestoreaspnet/register.png)  
Pay fees through dummy Credit Gateway.
![image](/public/portfolios/gamestoreaspnet/gateway.png)  
If the gateway works properly, the new user will finish registration and login automatically.
![image](/public/portfolios/gamestoreaspnet/demo.png)  
### 4.2 Login
Generally, you need to click the 'Log in' button at the top and right of the page.
![image](/public/portfolios/gamestoreaspnet/login.png)  
### 4.3 Profile
![image](/public/portfolios/gamestoreaspnet/profile.png)  
### 4.4 Change Password
![image](/public/portfolios/gamestoreaspnet/changepassword.png)  
### 4.5 Role Based Functions:  
All the role based functions are available only for authorized users. You will be redirected to the login page if you try to access the unauthorized pages/functions.
After successfully login, the buttons at the top right of the webpage are changed. You username will be displayed and you can logout.
* Roles: Regular, Advanced, Admin
* Regular: Add Product to Cart, Checkout, Place Order and View Own Orders
* Advanced: Create/Edit/Delete Products, Check orders from his/her products.
* Admin: View/Edit/Delete Order, Create/Edit/Delete User, etc.

## 5. Regular User
Regular user can purchase products, add item to cart and place order finally. In the product list page, the original and discounted price are both shown for each product. Click ‘Add to cart’ button to add the current item to your cart.
![image](/public/portfolios/gamestoreaspnet/addcart.png)  
### 5.1 Cart
![image](/public/portfolios/gamestoreaspnet/shoppingcart.png)  
1) You can choose any product(console, accessory or game) added to your cart.  
2) If any item added/removed from the cart, ‘Cart(n)’ will be refreshed immediately.  
3) In the cart, you can update the quantity.  
4) You can also remove the item.  
5) The price is the discounted price.  
6) The SubTotal shows the amount for each item cost(quantity may be larger than 1).  
7) The Total shows the total amount cost of all items in this cart.  
### 5.2 Checkout  
Provide the shipping information.  
![image](/public/portfolios/gamestoreaspnet/checkout.png)  
Go to another credit gateway for payment.  
![image](/public/portfolios/gamestoreaspnet/payment.png)  
### 5.3 Place Order  
1) If successful with the payment, the items in cart are removed. Meanwhile, the order count is incremented by 1.  
2) Confirmation Number is generated based on the current time: yyyyMMddHHmmss.  
3) The delivery date is 2 weeks after the order date.  
![image](/public/portfolios/gamestoreaspnet/placeorder.png)  
### 5.4 My Order  
1) Order list with detailed purchased items.  
2) You can cancel the order here.  
3) If there are multiple orders, all of them will be displayed, with detailed items and quantities.  
![image](/public/portfolios/gamestoreaspnet/myorders.png)  

## 6. Advanced User
1) Advanced User has the full functions of Regular User. Besides, Advanced user can create own product and sell to others.  
2) Login with the default user ‘advanced@gamestore.com’ and password ‘advanced’.  
3) After login, you will see two more different menu options: ‘My Products’ and ‘My Product Orders’.  
![image](/public/portfolios/gamestoreaspnet/myproducts.png)  
### 6.1 My Products  
You can create, edit, and delete products for selling.  
![image](/public/portfolios/gamestoreaspnet/myproducts2.png)  
![image](/public/portfolios/gamestoreaspnet/addproductadv.png)  
![image](/public/portfolios/gamestoreaspnet/editproductadv.png)  
### 6.2 My Product Orders  
![image](/public/portfolios/gamestoreaspnet/myproductorder.png)  

## 7. Admin
1) Admin User has the full functions of Regular User. Besides, Advanced user can create user, role, product, category, cancel order and monitor the application with dashboard.  
2) Login with the default user ‘admin@gamestore.com’ and password ‘admin’.  
3) After login, you will see more menu options: Dashboard, User, Role, Product, Category and Order.  
![image](/public/portfolios/gamestoreaspnet/admin.png)  
### 7.1 Dashboard  
You can get the current status overview of the game store. Besides, you can clear the cache.  
![image](/public/portfolios/gamestoreaspnet/dashboard.png)  
### 7.2 User  
You can create, edit, and delete users.  
![image](/public/portfolios/gamestoreaspnet/users.png)  
![image](/public/portfolios/gamestoreaspnet/adduser.png)  
![image](/public/portfolios/gamestoreaspnet/edituser.png)  
### 7.3 Role  
You can create, edit, and delete roles.  
![image](/public/portfolios/gamestoreaspnet/roles.png)  
![image](/public/portfolios/gamestoreaspnet/addrole.png)  
![image](/public/portfolios/gamestoreaspnet/editrole.png)  
### 7.4 Product  
You can create, edit, and delete products.  
![image](/public/portfolios/gamestoreaspnet/products.png)  
![image](/public/portfolios/gamestoreaspnet/addproduct.png)  
![image](/public/portfolios/gamestoreaspnet/editproduct.png)  
### 7.5 Category  
You can create, edit, and delete product categories.  
![image](/public/portfolios/gamestoreaspnet/categories.png)  
![image](/public/portfolios/gamestoreaspnet/addcategory.png)  
![image](/public/portfolios/gamestoreaspnet/editcategory.png)  
### 7.6 Order  
You can view and delete order, view detail items of the order.  
![image](/public/portfolios/gamestoreaspnet/orders.png)  
![image](/public/portfolios/gamestoreaspnet/orderitem.png)  

## 8. Source Files
* [Source files of Game Store(ASP.NET MVC) on Github](https://github.com/jojozhuang/Portfolio/tree/master/GameStoreASPNETMVC)
