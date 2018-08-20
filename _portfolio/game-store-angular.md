---
layout: portfolio
key: portfolio
title: "Game Store(Angular)"
index: 170
tags: [Angular, TypeScript]
image: /public/portfolios/gamestoreangular/thumbnail.png
excerpt: A web app to manage products, built with Angular.
category: web
---

> A web app for managing products, built with Angular and RESTful API.

## 1. Function
This application is used to manage products. It implements all CRUD operations. Below are the available features.
* Product List - Show all products in a list with Edit and Delete button.
* Product Management - Create, update and delete product.
* Image Upload - Set image for product and upload to server.
* Dynamic Data - All data is fetched from backend RESTful services.

## 2. Demo
Two available demos:
* `Live Demo on Netlify(CI):` <a href="https://game-store-angular.netlify.com/" target="\_blank">https://game-store-angular.netlify.com/</a>
* `Live Demo on Azure:` <a href="https://game-store-angular.azurewebsites.net/" target="\_blank">https://game-store-angular.azurewebsites.net/</a>

*Note: The demo websites may be slow when you access them for the first time. Be patient!*

## 3. UI
Home page.
![image](/public/portfolios/gamestoreangular/homepage.png)
Click the List button. There are three products with images.
![image](/public/portfolios/gamestoreangular/productlist.png)
Click the 'Create' button, input product name and price. And click 'Choose Image' to select an image from local disk. Then, click 'Upload' button to upload it to the remote server. The image will be displayed at the left side.
![image](/public/portfolios/gamestoreangular/productadd.png)
Click 'Save' button, product is saved.
![image](/public/portfolios/gamestoreangular/productlistafteradd.png)
Click 'Edit' button of the new added product. Change the product name and price.
![image](/public/portfolios/gamestoreangular/productedit.png)
Click 'Save' button, product(ID=4) is updated.
![image](/public/portfolios/gamestoreangular/productlistafteredit.png)
Click 'Delete' button of the last product. A popup window for confirming the delete operation shows up.
![image](/public/portfolios/gamestoreangular/deleteconfirm.png)
Click 'OK' button, product will be deleted.
![image](/public/portfolios/gamestoreangular/productlistafterdel.png)

## 4. Under the Hood
Read tutorial [Building Web Application with Angular]({% link _tutorial/angular/building-web-application-with-angular.md %}) to learn how this angular app is built.

## 5. Source Files
* [Source files of Game Store(Angular) on Github](https://github.com/jojozhuang/game-store-angular)
