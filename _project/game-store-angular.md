---
layout: project
key: project
title: "Game Store(Angular)"
index: 220
category: web
image: gamestoreangular/thumbnail.png
tags: [Angular, TypeScript]
---

> A web app to manage products, built with Angular.

## 1. Function
This application is used to manage products. It implements all CRUD operations. Below are the available features.
* Product List - Show all products in a list with Edit and Delete button.
* Product Management - Create, update and delete product.
* Image Upload - Set image for product and upload to server.
* Dynamic Data - All data is fetched from backend RESTful services.

## 2. Demo
Two available demos:
* `Live Demo on GitHub Page:` <a href="https://jojozhuang.github.io/game-store-angular/" target="\_blank">https://jojozhuang.github.io/game-store-angular/</a>
* `Live Demo on Netlify(CI):` <a href="https://game-store-angular.netlify.com/" target="\_blank">https://game-store-angular.netlify.com/</a>
* `Live Demo on Heroku(CI):` <a href="https://game-store-angular.herokuapp.com/" target="\_blank">https://game-store-angular.herokuapp.com/</a>
* `Live Demo on Azure:` <a href="https://game-store-angular.azurewebsites.net/" target="\_blank">https://game-store-angular.azurewebsites.net/</a>

*Note: The demo websites may be slow when you access them for the first time. Be patient!*

## 3. UI
Home page.
![image](/assets/images/project/gamestoreangular/homepage.png)
Click the List button. There are three products with images.
![image](/assets/images/project/gamestoreangular/productlist.png)
Click the 'Create' button, input product name and price. And click 'Choose Image' to select an image from local disk. Then, click 'Upload' button to upload it to the remote server. The image will be displayed at the left side.
![image](/assets/images/project/gamestoreangular/productadd.png)
Click 'Save' button, product is saved.
![image](/assets/images/project/gamestoreangular/productlistafteradd.png)
Click 'Edit' button of the new added product. Change the product name and price.
![image](/assets/images/project/gamestoreangular/productedit.png)
Click 'Save' button, product(ID=4) is updated.
![image](/assets/images/project/gamestoreangular/productlistafteredit.png)
Click 'Delete' button of the last product. A popup window for confirming the delete operation shows up.
![image](/assets/images/project/gamestoreangular/deleteconfirm.png)
Click 'OK' button, product will be deleted.
![image](/assets/images/project/gamestoreangular/productlistafterdel.png)

## 4. Under the Hood
Read tutorial [Building Web Application with Angular]({% link _tutorial/angular-app/building-web-application-with-angular.md %}) to learn how this angular app is built.

## 5. Source Files
* [Source files of Game Store(Angular) on Github](https://github.com/jojozhuang/game-store-angular)
