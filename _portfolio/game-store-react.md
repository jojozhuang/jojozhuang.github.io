---
layout: portfolio
key: portfolio
title: "Game Store(React)"
index: PF210
tags: [React, Redux]
image: /public/images/portfolio/gamestorereact/thumbnail.png
excerpt: A web app to manage products, built with React.
category: web
---

> A web app for managing products, built with React/Redux and RESTful API.

## 1. Function
This application is used to manage products. It implements all CRUD operations. Below are the available features.
* Product List - Show all products in a list with Edit and Delete button.
* Product Management - Create, update and delete product.
* Image Upload - Set image for product and upload to server.
* Dynamic Data - All data is fetched from backend RESTful services.

## 2. Demo
Four available demos:
* `Live Demo on Netlify(CI):` <a href="https://game-store-react.netlify.com/" target="\_blank">https://game-store-react.netlify.com/</a>
* `Live Demo on Heroku(CI):` <a href="https://game-store-react.herokuapp.com/" target="\_blank">https://game-store-react.herokuapp.com/</a>
* `Live Demo on Azure:` <a href="https://game-store-react.azurewebsites.net/" target="\_blank">https://game-store-react.azurewebsites.net/</a>
* `Live Demo(Redux) on Netlify(CI):` <a href="https://game-store-redux.netlify.com/" target="\_blank">https://game-store-redux.netlify.com/</a>
* `Live Demo(Redux) on Heroku(CI):` <a href="https://game-store-redux.herokuapp.com/" target="\_blank">https://game-store-redux.herokuapp.com/</a>
* `Live Demo(Redux) on Azure:` <a href="https://game-store-redux.azurewebsites.net/" target="\_blank">https://game-store-redux.azurewebsites.net/</a>

*Note: The demo websites may be slow when you access them for the first time. Be patient!*

## 3. UI
Home page.
![image](/public/images/portfolio/gamestorereact/homepage.png)
Click the List button. There are three products with images.
![image](/public/images/portfolio/gamestorereact/productlist.png)
Click the 'Create' button, input product name and price. And click 'Choose Image' to select an image from local disk. Then, click 'Upload' button to upload it to the remote server. The image will be displayed at the left side.
![image](/public/images/portfolio/gamestorereact/productadd.png)
Click 'Save' button, product is saved.
![image](/public/images/portfolio/gamestorereact/productlistafteradd.png)
Click 'Edit' button of the new added product. Change the product name and price.
![image](/public/images/portfolio/gamestorereact/productedit.png)
Click 'Save' button, product(ID=4) is updated.
![image](/public/images/portfolio/gamestorereact/productlistafteredit.png)
Click 'Delete' button of the last product. A popup window for confirming the delete operation shows up.
![image](/public/images/portfolio/gamestorereact/deleteconfirm.png)
Click 'OK' button, product will be deleted.
![image](/public/images/portfolio/gamestorereact/productlistafterdel.png)

## 4. Under the Hood
Read tutorial [Building Web Application with React]({% link _tutorial/reactapp/building-web-application-with-react.md %}) and [Building Web Application with React and Redux]({% link _tutorial/reactapp/building-web-application-with-react-and-redux.md %}) to learn how these two apps are built with React and Redux.

## 5. Source Files
* [Source files of Game Store(React) on Github](https://github.com/jojozhuang/game-store-react)
* [Source files of Game Store(React+Redux) on Github](https://github.com/jojozhuang/game-store-reactredux)
