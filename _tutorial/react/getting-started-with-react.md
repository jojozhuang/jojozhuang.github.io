---
layout: tutorial
key: tutorial
title: "Getting Started with React"
index: 351
category: reactjs
image: reactjs.png
date: 2017-08-12
tags: [React]
---

> Build web application with React.

## 1. ReactJS
[ReactJS](https://reactjs.org/) is a front-end library developed by Facebook. It is used for handling the view layer for web and mobile apps. ReactJS allows us to create reusable UI components. It uses the virtual DOM to track the state of the actual DOM, only re-rendering discrete sections of the DOM as changes to application state dictate. React is currently one of the most popular JavaScript libraries and has a strong foundation and large community behind it.

## 2. Node.js and NPM
Before using React, we first need to install Node.js. Refer the posting [Installing Node.js and NPM]({% link _posts/2016-03-06-installing-nodejs-and-npm.md %}) to install Node.js and NPM.

## 3. Creating React App
Install 'create-react-app' globally.
```sh
$ npm install create-react-app -g
```
Use 'create-react-app' to create new React application named 'react-app'
```sh
$ create-react-app react-app
```
Open 'react-app' in Visual Studio Code.
![image](/public/tutorials/351/project.png){:width="350px"}

## 4. Serving the Application
Start 'react-app' through npm.
```sh
$ npm start
```
![image](/public/tutorials/351/npmstart.png){:width="600px"}
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
![image](/public/tutorials/351/runapp.png)

You can make it serve at different port. Open `package.json`, add 'PORT' option to 'start' script. For example, set the port to `12090` as follows.
```json
"scripts": {
  "start": "PORT=12090 react-scripts start",
  "build": "react-scripts build",
  "test": "react-scripts test --env=jsdom",
  "eject": "react-scripts eject"
}
```
Run 'npm start' again. Now, this application is served at port '12090'.
![image](/public/tutorials/351/changeport.png)  

## 5. References
* [React Official Website](https://reactjs.org/)
* [Tutorial: Intro To React](https://reactjs.org/tutorial/tutorial.html)
* [React Official Docs](https://reactjs.org/docs/hello-world.html)
* [ReactJS Tutorial](https://www.tutorialspoint.com/reactjs/index.htm)
* [How to get "create-react-app" to work with your API](https://www.fullstackreact.com/articles/using-create-react-app-with-a-server/)
