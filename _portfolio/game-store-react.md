---
layout: portfolio
key: portfolio
title: "Game Store(React)"
index: 160
tags: [React, Redux]
image: /public/portfolios/gamestorereact/thumbnail.png
excerpt: A web app to manage products, built with React and Redux.
category: web
---

> A web app to manage products, built with React and Redux.

## 1. ReactJS
[ReactJS](https://reactjs.org/) is a front-end library developed by Facebook. It is used for handling the view layer for web and mobile apps. ReactJS allows us to create reusable UI components. It uses the virtual DOM to track the state of the actual DOM, only re-rendering discrete sections of the DOM as changes to application state dictate.

## 2. UI
Home page.
![image](/public/portfolios/gamestorereact/homepage.png)
Click the List button. There are three products with images.
![image](/public/portfolios/gamestorereact/productlist.png)
Click the 'Create' button, input product name and price. And click 'Choose Image' to select an image from local disk. Then, click 'Upload' button to upload it to the remote server. The image will be displayed at the left side.
![image](/public/portfolios/gamestorereact/productadd.png)
Click 'Save' button, product is saved.
![image](/public/portfolios/gamestorereact/productlistafteradd.png)
Click 'Edit' button of the new added product. Change the product name and price.
![image](/public/portfolios/gamestorereact/productedit.png)
Click 'Save' button, product(ID=4) is updated.
![image](/public/portfolios/gamestorereact/productlistafteredit.png)
Click 'Delete' button of the last product. A popup window for confirming the delete operation shows up.
![image](/public/portfolios/gamestorereact/deleteconfirm.png)
Click 'OK' button, product will be deleted.
![image](/public/portfolios/gamestorereact/productlistafterdel.png)

## 3. Under the Hood
Check posting [Building Web Application with React]({% link _tutorial/react/building-web-application-with-react.md %}) and [Building Web Application with React and Redux]({% link _tutorial/react/building-web-application-with-react-and-redux.md %}) to learn the details of React and Redux.

## 4. Source Files
* [Source files of Game Store(React) on Github](https://github.com/jojozhuang/game-store-react)
* [Source files of Game Store(React+Redux) on Github](https://github.com/jojozhuang/game-store-reactredux)
