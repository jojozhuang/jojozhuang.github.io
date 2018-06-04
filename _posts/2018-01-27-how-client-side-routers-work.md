---
layout: post
key: blog
title: "How Client Side Routers Work(Draft)"
date: 2018-01-27
tags: [CRS, Webpack]
---

> Introduce how to compile and run c/java in Node.js.

## 1. Routing Issue
When using webpack, there is a routing issue. When access the homepage http://localhost:3000/, everything look fine.
![image](/public/posts/2018-01-27/homepage.png){:width="800px"}
However, when clicking on the list button, we navigate to http://localhost:3000/products. the React Router is working, get the "Cannot GET /URL Error".
![image](/public/posts/2018-01-27/error.png){:width="600px"}

## 2. Client Side Routers
In the old days, things were simple. If you wanted to get the contents of /dashboard, the browser would make a GET request to your server, by inspecting the path portion of the URL the server would figure out that the user was requesting the /dashboard page. It would then grab that page and send back to the browser as a response. Then these things called client side routers (CSR) came into the picture. With a CSR (like React Router), you’re no longer making requests to your server every time you change routes. Instead, your CSR is just handling that for you locally on the browser. So when you go to /dashboard, instead of making a GET request to your server, your CSR is using a browser API called history.pushState to manually change the URL and then it renders the View for that specific route - all without causing a page refresh.

## 3. Solution on Webk-Dev-Server
Add publicPath and historyApiFallback into the configuration.
```javascript
publicPath: '/',
historyApiFallback: true,
```
Sample `webpack.config.js`.
```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const outputDirectory = 'dist';

module.exports = {
  entry: './src/client/index.js',
  output: {
    path: path.join(__dirname, outputDirectory),
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  devServer: {
    port: 3000,
    open: true,
    proxy: {
      '/api': 'http://localhost:8080',
    },
    historyApiFallback: true,
  },
  plugins: [
    new CleanWebpackPlugin([outputDirectory]),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico',
    }),
  ],
};
```
Rebuild with webpack and refresh the browser. You may need to clean web browser cache.
![image](/public/posts/2018-01-27/fixed.png){:width="900px"}

## 4. Solution on Nginx Server
```sh
try_files $uri /index.html;
```
This lets nginx serve static asset files and serves your index.html file when another file isn't found on the server.
```javascript
server {
    listen       9096;
    server_name  localhost;

    #charset koi8-r;

    #access_log  logs/host.access.log  main;

    location / {
        try_files $uri /index.html;
        root   /nginx/www;
        index  index.html index.htm;
    }
```
https://github.com/ReactTraining/react-router/blob/v2.3.0/docs/guides/Histories.md#browserhistory

## 3. Reference
* [Fixing the "cannot GET /URL" error on refresh with React Router (or how client side routers work)](https://tylermcginnis.com/react-router-cannot-get-url-refresh/)
* [How do I create online compiler for C, C++ and Java using node.js as server language?](https://www.quora.com/How-do-I-create-online-compiler-for-C-C++-and-Java-using-node-js-as-server-language)
* [Go Tutorial](https://www.tutorialspoint.com/go/index.htm)
* [How to build Online Judge](https://www.zhihu.com/question/20343652)
* [Making a code compiler using Hackerrank API and ACE editor](http://blog.arpitdubey.com/making-a-code-compiler-using-hackerrank-api-and-ace-editor/)
