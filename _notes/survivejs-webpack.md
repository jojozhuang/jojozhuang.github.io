---
layout: note
key: note
title: "SurviveJS - Webpack"
index: 303
category: tools
---

> All about javascript.
https://survivejs.com/webpack/foreword/

## What is Webpack?
* Webpack is a `module bundler`, but you can also use it running tasks as well.
* Webpack relies on a `dependency graph` underneath. Webpack traverses through the source to construct the graph, and it uses this information and configuration to generate bundles.
* Webpack relies on `loaders` and `plugins`. Loaders operate on a module level, while plugins rely on hooks provided by webpack and have the best access to its execution process.
* Webpack’s `configuration` describes how to transform assets of the graphs and what kind of output it should generate. Part of this information can be included in the source itself if features like `code splitting` are used.
* `Hot Module Replacement` (HMR) helped to popularize webpack. It's a feature that can enhance the development experience by updating code in the browser without needing a full page refresh.
* Webpack can generate `hashes` for filenames allowing you to invalidate past bundles as their contents change.

Webpack's Execution Process
![image](/public/notes/webpack/executionprocess.png){:width="800px"}  

### Webpack Is Configuration Driven
webpack.config.js
```javascript
const webpack = require("webpack");

module.exports = {
  // Where to start bundling
  entry: {
    app: "./entry.js",
  },

  // Where to output
  output: {
    // Output to the same directory
    path: __dirname,

    // Capture name from the entry using a pattern
    filename: "[name].js",
  },

  // How to resolve encountered imports
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },

  // What extra processing to perform
  plugins: [
    new webpack.DefinePlugin({ ... }),
  ],

  // Adjust module resolution algorithm
  resolve: {
    alias: { ... },
  },
};
```
## Developing
```sh
# Setting Up the Project
$ mkdir webpack-demo
$ cd webpack-demo
$ npm init -y # -y generates *package.json*, skip for more

# Installing Webpack
$ npm install webpack webpack-cli --save-dev # -D to type less

# Executing Webpack
$ node_modules/.bin/webpack                      # default mode
$ node_modules/.bin/webpack --mode development   # development mode
$ node_modules/.bin/webpack --mode production    # production mode
```
### Configuring html-webpack-plugin
```sh
$ npm install html-webpack-plugin --save-dev
```

## 7. Reference
* [Official Documentation of Webpack](https://webpack.js.org/concepts/)
* [Source Codes for Exercise](https://github.com/jojozhuang/Note/tree/master/WebpackDemo)
