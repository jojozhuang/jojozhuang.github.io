---
layout: tutorial
key: tutorial
title: "Getting Started with React"
index: 8401
subcategory: react-tutorial
date: 2017-08-12
tags: [React]
---

> Go through official React tutorial to build a hello world app.

## 1. ReactJS
[ReactJS](https://reactjs.org/) is a front-end library developed by Facebook. It is used for handling the view layer for web and mobile apps. ReactJS allows us to create reusable UI components. It uses the virtual DOM to track the state of the actual DOM, only re-rendering discrete sections of the DOM as changes to application state dictate. React is currently one of the most popular JavaScript libraries and has a strong foundation and large community behind it.

## 2. Creating React App
Install 'create-react-app' globally.
```raw
$ npm install create-react-app -g
```
Use 'create-react-app' to create new React application named 'react-app'
```raw
$ create-react-app react-app
```
Open 'react-app' in Visual Studio Code.
![image](/assets/images/frontend/8401/project.png){:width="350px"}

## 3. Serving the Application
Start 'react-app' through npm.
```raw
$ npm start
```
![image](/assets/images/frontend/8401/npmstart.png){:width="600px"}
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
![image](/assets/images/frontend/8401/runapp.png)

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
![image](/assets/images/frontend/8401/changeport.png)  

## 4. References
* [React Official Website](https://reactjs.org/)
* [Tutorial: Intro To React](https://reactjs.org/tutorial/tutorial.html)
* [React Official Docs](https://reactjs.org/docs/hello-world.html)
* [ReactJS Tutorial](https://www.tutorialspoint.com/reactjs/index.htm)
* [How to get "create-react-app" to work with your API](https://www.fullstackreact.com/articles/using-create-react-app-with-a-server/)
