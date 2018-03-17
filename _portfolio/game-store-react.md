---
layout: portfolio
key: portfolio
title: "Game Store(React)"
index: 160
tags: [React, Redux]
image: /public/portfolio/gamestorereact/thumbnail.png
excerpt: A web app to manage products, built with React and Redux.
category: web
---

> A web app to manage products, built with React and Redux.

## 1. ReactJS
[ReactJS](https://reactjs.org/) is a front-end library developed by Facebook. It is used for handling the view layer for web and mobile apps. ReactJS allows us to create reusable UI components. It uses the virtual DOM to track the state of the actual DOM, only re-rendering discrete sections of the DOM as changes to application state dictate.

## 2. UI
Home page.
![MIME Type](/public/portfolio/gamestorereact/homepage.png)
Click the List button. There are three products with images.
![MIME Type](/public/portfolio/gamestorereact/productlist.png)
Click the 'Create' button, input product name and price. And click 'Choose Image' to select an image from local disk. Then, click 'Upload' button to upload it to the remote server. The image will be displayed at the left side.
![MIME Type](/public/portfolio/gamestorereact/productadd.png)
Click 'Save' button, product is saved.
![MIME Type](/public/portfolio/gamestorereact/productlistafteradd.png)
Click 'Edit' button of the new added product. Change the product name and price.
![MIME Type](/public/portfolio/gamestorereact/productedit.png)
Click 'Save' button, product(ID=4) is updated.
![MIME Type](/public/portfolio/gamestorereact/productlistafteredit.png)
Click 'Delete' button of the last product. A popup window for confirming the delete operation shows up.
![MIME Type](/public/portfolio/gamestorereact/deleteconfirm.png)
Click 'OK' button, product will be deleted.
![MIME Type](/public/portfolio/gamestorereact/productlistafterdel.png)

## 3. Under the Hood
Check posting [Building Web Application with React]({% link _posts/2017-08-16-building-web-application-with-react.md %}) and [Building Web Application with React and Redux]({% link _posts/2017-08-20-building-web-application-with-react-and-redux.md %}) to learn the details of React and Redux.

## 4. Source Files
* [Source files of Game Store(React) on Github](https://github.com/jojozhuang/Tutorials/tree/master/GameStoreReact)
* [Source files of Game Store(React+Redux) on Github](https://github.com/jojozhuang/Tutorials/tree/master/GameStoreReactRedux)
