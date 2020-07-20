---
layout: tutorial
key: tutorial
title: "React Router and Client Side Routing"
index: 8453
subcategory: react-app
date: 2018-06-05
tags: [Routing, CSR, Webpack, Nginx]
---

> Introduce client side routing and how to fix the issue when using React Router.

## 1. Routing Issue
When using [React Router](https://www.npmjs.com/package/react-router-dom) and [Webpack](https://webpack.js.org/) for my React app, I encountered a routing issue. When accessing the homepage http://localhost:3000/, everything looks fine.
![image](/assets/images/frontend/8453/homepage.png)
However, when clicking on the Code Editor button, we are navigated to http://localhost:3000/editor. The routing is not working, instead, "Cannot GET /URL Error" appears.
![image](/assets/images/frontend/8453/error.png)

## 2. Client Side Routers
In the old days, things were simple. If you wanted to get the contents of /dashboard, the browser would make a GET request to your server, by inspecting the path portion of the URL the server would figure out that the user was requesting the /dashboard page. It would then grab that page and send back to the browser as a response. Then these things called client side routers (CSR) came into the picture. With a CSR (like React Router), you’re no longer making requests to your server every time you change routes. Instead, your CSR is just handling that for you locally on the browser. So when you go to /dashboard, instead of making a GET request to your server, your CSR is using a browser API called history.pushState to manually change the URL and then it renders the View for that specific route - all without causing a page refresh.

## 3. Solutions
The solution is to force web browser access the index page. This can be done at server side.
### 3.1 Webpack-Dev-Server
Add `publicPath` and `historyApiFallback` into the webpack configuration.
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
![image](/assets/images/frontend/8453/fixed.png){:width="900px"}
### 3.2 Nginx Server
Add following line to the Nginx configuration file /usr/local/etc/nginx/nginx.conf.
```raw
try_files $uri /index.html;
```
This lets nginx serve static asset files and serves your index.html file when any file isn't found on the server.
```raw
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


## 4. Reference
* [A Brief Overview of React Router and Client-Side Routing](https://medium.com/@marcellamaki/a-brief-overview-of-react-router-and-client-side-routing-70eb420e8cde)
* [Server-side vs Client-side Routing](https://medium.com/@wilbo/server-side-vs-client-side-routing-71d710e9227f)
* [Fixing the "cannot GET /URL" error on refresh with React Router (or how client side routers work)](https://tylermcginnis.com/react-router-cannot-get-url-refresh/)
* [react-router Histories](https://github.com/ReactTraining/react-router/blob/v2.3.0/docs/guides/Histories.md#browserhistory)
