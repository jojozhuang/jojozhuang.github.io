---
layout: tutorial
key: tutorial
title: "Creating Full Stack App with React and Node.js"
index: 8481
subcategory: react-app
date: 2018-05-29
tags: [React, Nodejs, Express, Webpack]
---

> Introduce how to setup a full stack app project with React, Node.js, Express and Webpack.

## 1. Introduction
Create a full stack [React](https://reactjs.org/) application with a [Node.js](https://nodejs.org/en/) and [Express](https://expressjs.com/) backend. Client side code is written in React and the backend API is written using Express. This application is configured with [Airbnb's ESLint rules](https://github.com/airbnb/javascript) and formatted through [prettier](https://prettier.io/).

### 1.1 Development mode
In the development mode, we will have 2 servers running. The front end code will be served by the [webpack dev server](https://webpack.js.org/configuration/dev-server/) which helps with hot and live reloading. The server side Express code will be served by a node server using [nodemon](https://nodemon.io/) which helps in automatically restarting the server whenever server side code changes.

### 1.2 Production mode
In the production mode, we will have only 1 server running. All the client side code will be bundled into static files using webpack and it will be served by the Node.js Express application.

## 2. Packages
### 2.1 Babel
[Babel](https://babeljs.io/) helps us to write code in the latest version of JavaScript. If an environment does not support certain features natively, Babel will help us to compile those features down to a supported version. It also helps us to convert JSX to Javascript.

Create a file named `.babelrc` in project root folder to tell our app to use React and ES2015.
```javascript
{
  "presets": ["env", "react"]
}
```
Babel requires plugins to do the transformation. Presets are the set of plugins defined by Babel. Preset **env** allows to use babel-preset-es2015, babel-preset-es2016, and babel-preset-es2017 and it will transform them to ES5. Preset **react** allows us to use JSX syntax and it will transform JSX to Javascript.

### 2.2 ESLint
[ESLint](https://eslint.org/) is a pluggable and configurable linter tool for identifying and reporting on patterns in JavaScript. Create a file named `.eslintrc.json` in project root folder to describe the configurations required for ESLint.
```javascript
{
  "extends": ["airbnb"],
  "env": {
    "browser": true,
    "node": true
  },
  "rules": {
    "no-console": "off",
    "comma-dangle": "off",
    "react/jsx-filename-extension": "off"
  }
}
```
We use the [Airbnb's Javascript Style](https://github.com/airbnb/javascript). Since we are going to write both client (browser) and server side (Node.js) code, so set the **env** to browser and node with value true. Optionally, we can override the Airbnb's configurations to suit our needs. I have turned off [no-console](https://eslint.org/docs/rules/no-console), [comma-dangle](https://eslint.org/docs/rules/comma-dangle) and [react/jsx-filename-extension](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-filename-extension.md) rules.

### 2.3 Webpack
[Webpack](https://webpack.js.org/) is a module bundler. Its main purpose is to bundle JavaScript files for usage in a browser. Create a file named `webpack.config.js` to describe the configurations required for webpack.
```javascript
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const outputDirectory = "dist";

module.exports = {
  entry: "./src/client/index.js",
  output: {
    path: path.join(__dirname, outputDirectory),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  devServer: {
    port: 3000,
    open: true,
    proxy: {
      "/api": "http://localhost:8080"
    }
  },
  plugins: [
    new CleanWebpackPlugin([outputDirectory]),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      favicon: "./public/favicon.ico"
    })
  ]
};
```
The following points need to be noted about the above code.
* `entry`: Here the application starts executing and webpack starts bundling
* `output` path and filename: the target directory and the filename for the bundled output
* `module` loaders: Module loaders are transformations that are applied on the source code of a module. We pass all the js file through [babel-loader](https://github.com/babel/babel-loader) to transform JSX to Javascript. CSS files are passed through [css-loaders](https://github.com/webpack-contrib/css-loader) and [style-loaders](https://github.com/webpack-contrib/style-loader) to load and bundle CSS files.
* `devServer`: Configurations for the webpack-dev-server which will be described in coming section.
* `plugins`: [clean-webpack-plugin](https://github.com/johnagan/clean-webpack-plugin) is a webpack plugin to remove the build folder(s) before building. [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin) simplifies creation of HTML files to serve your webpack bundles. It loads the template (public/index.html) and injects the output bundle.

### 2.4 Webpack dev server
[Webpack dev server](https://webpack.js.org/configuration/dev-server/) is used along with webpack. It provides a development server that provides live reloading for the client side code. This should be used for development only.

The devServer section of webpack.config.js contains the configuration required to run webpack-dev-server which is given below.
```javascript
devServer: {
    port: 3000,
    open: true,
    proxy: {
        "/api": "http://localhost:8080"
    }
}
```
* [Port](https://webpack.js.org/configuration/dev-server/#devserver-port) specifies the Webpack dev server to listen on this particular port (3000 in this case).
* When [open](https://webpack.js.org/configuration/dev-server/#devserver-open) is set to true, it will automatically open the home page on startup.
* [Proxying](https://webpack.js.org/configuration/dev-server/#devserver-proxy) URLs can be useful when we have a separate API backend development server and we want to send API requests on the same domain. In our case, we have a Nodejs/Express backend where we want to send the API requests to.

### 2.5 Nodemon
[Nodemon](https://nodemon.io/) is a utility that will monitor for any changes in the server source code and it automatically restart the server. This is used in development only.

Create a file named `nodemon.json` to describe the configurations required for Nodemon.
```javascript
{
  "watch": ["src/server/"]
}
```
Here, we tell nodemon to watch the files in the directory src/server where out server side code resides. Nodemon will restart the node server whenever a file under src/server directory is modified.
### 2.6 Express
[Express](https://expressjs.com/) is a web application framework for Node.js. It is used to build our backend API's. `src/server/index.js` is the entry point to the server application. Its content is shown below.
```javascript
const express = require("express");
const os = require("os");

const app = express();

app.use(express.static("dist"));
app.get("/api/getUsername", (req, res) =>
  res.send({ username: os.userInfo().username })
);
app.listen(8080, () => console.log("Listening on port 8080!"));
```

This starts a server and listens on port 8080 for connections. The app responds with `{username: <username>}` for requests to the URL (/api/getUsername). It is also configured to serve the static files from **dist** directory.

### 2.7 Concurrently
[Concurrently](https://github.com/kimmobrunfeldt/concurrently) is used to run multiple commands concurrently. We need it to run the webpack dev server and the backend node server concurrently in the development environment. Below are the npm/yarn script commands defined in 'package.json'.
```javascript
"client": "webpack-dev-server --mode development --devtool inline-source-map --hot",
"server": "nodemon src/server/index.js",
"dev": "concurrently \"npm run server\" \"npm run client\""
```

## 3. Codes
### 3.1 Folder Structure
All the source code will be inside `src` directory. Inside src, there is `client` and `server` directory. All the frontend code (react, css, js and any other assets) will be in client directory. Backend Node.js Express code will be in the server directory.
### 3.2 Setting up Server with Express
Create file ./src/server/index.js.
```javascript
const express = require('express');
const os = require('os');

const app = express();

app.use(express.static('dist'));
app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));
app.listen(8080, () => console.log('Listening on port 8080!'));
```
### 3.3 Setting up Client with React
Create file ./src/client/index.js
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));
```
Create file ./src/client/App.js
```jsx
import React, { Component } from 'react';
import './app.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { username: null };
  }

  componentDidMount() {
    fetch('/api/getUsername')
      .then(res => res.json())
      .then(user => this.setState({ username: user.username }));
  }

  render() {
    return (
      <div>
        {this.state.username ? (
          <h1>Hello {this.state.username}</h1>
        ) : (
          <h1>Loading.. please wait!</h1>
        )}
      </div>
    );
  }
}
```
Create file ./src/client/app.css
```css
h1 {
  color: green;
  text-align: center;
}
```
Create ./public/index.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Full Stack App</title>
</head>
<body>
    <div id="root"></div>
</body>
</html>
```
### 3.4 Final Project Structure
![image](/assets/images/frontend/8481/projectstructure.png){:width="350px"}

## 4. Running and Testing
Start both the client and server with 'npm run dev'.
```raw
$ npm run dev
```
Other commands.
```bash
# Install dependencies
yarn (or npm install)

# Start development server
yarn dev (or npm run dev)

# Build for production
yarn build (or npm run build)

# Start production server
yarn start (or npm start)
```
Open web browser, access 'http://localhost:3000/'.
![image](/assets/images/frontend/8481/homepage.png)
Through the debug tool, we can see, the name is fetched from the api.
![image](/assets/images/frontend/8481/api.png)

## 5. Setting up ESLint and Prettier on VS Code
[VSCode](https://code.visualstudio.com/) is a lightweight but powerful source code editor. [ESLint](https://eslint.org/) takes care of the code-quality. [Prettier](https://prettier.io/) takes care of all the formatting.
### 5.1 Installation
* Install [VSCode](https://code.visualstudio.com/)
* Install [ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
* Install [Prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

### 5.2 VSCode User Settings
Code->Preferences->Settings, add following scripts to User Settings.
```javascript
"eslint.alwaysShowStatus": true,
"eslint.autoFixOnSave": true,
"editor.formatOnSave": true,
"prettier.eslintIntegration": true
```
![image](/assets/images/frontend/8481/usersettings.png)
### 5.3 Having a Try
Restart VS Code, open any source file, try to edit any `js` file. ESLint will check your code against the Airbnb JavaScript Style Guide and warn you of any conflicts.
![image](/assets/images/frontend/8481/eslint.gif)

## 6. Source Files
* [Source files of FullStack React Node.js on Github](https://github.com/jojozhuang/Tutorials/tree/master/FullStackReactNodejs)

## 7. References
* [Full Stack Web Application using React, Node.js, Express and Webpack](https://hackernoon.com/full-stack-web-application-using-react-node-js-express-and-webpack-97dbd5b9d708)
* [Setting up ESLint on VS Code with Airbnb JavaScript Style Guide](https://travishorn.com/setting-up-eslint-on-vs-code-with-airbnb-javascript-style-guide-6eb78a535ba6)
* [Configuring ESLint](https://eslint.org/docs/user-guide/configuring)
* [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
* [Webpack Configuration](https://webpack.js.org/configuration/)
