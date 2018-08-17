---
layout: note
key: note
title: "SurviveJS - Webpack(Online Doc)"
index: 503
category: tools
image: note/tools.png
date: 2017-05-03
postdate: 2017-05-03
tags: [Webpack]
---

> Comprehensive introduction of [Webpack](https://webpack.js.org/).

## 1. What is Webpack?
* Webpack is a `module bundler`, but you can also use it running tasks as well.
* Webpack relies on a `dependency graph` underneath. Webpack traverses through the source to construct the graph, and it uses this information and configuration to generate bundles.
* Webpack relies on `loaders` and `plugins`. Loaders operate on a module level, while plugins rely on hooks provided by webpack and have the best access to its execution process.
* Webpack’s `configuration` describes how to transform assets of the graphs and what kind of output it should generate. Part of this information can be included in the source itself if features like `code splitting` are used.
* `Hot Module Replacement` (HMR) helped to popularize webpack. It's a feature that can enhance the development experience by updating code in the browser without needing a full page refresh.
* Webpack can generate `hashes` for filenames allowing you to invalidate past bundles as their contents change.

### 1.1 Webpack Relies on Modules
The smallest project you can bundle with webpack consists of **input** and **output**. The bundling process begins from user-defined **entries**. Entries themselves are **modules** and can point to other modules through imports.

When you bundle a project using webpack, it traverses the imports, constructing a **dependency graph** of the project and then generates output based on the configuration. Additionally, it's possible to define **split points** to create separate bundles within the project code itself.

### 1.2 Webpack's Execution Process
![image](/public/notes/webpack/executionprocess.png){:width="800px"}  

### 1.3 Webpack Is Configuration Driven
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
## 2. Developing
### 2.1 Getting Started
**Setting Up the Project**
```sh
$ mkdir webpack-demo
$ cd webpack-demo
$ npm init -y # -y generates *package.json*, skip for more
```
**Installing Webpack**
```sh
$ npm install webpack webpack-cli --save-dev # -D to type less
```
**Executing Webpack**
```sh
$ node_modules/.bin/webpack                      # default mode
$ node_modules/.bin/webpack --mode development   # development mode
$ node_modules/.bin/webpack --mode production    # production mode
```
Examine dist/main.js, which is the output of webpack.

**Setting Up Assets**  
src/component.js
```javascript
export default (text = "Hello world") => {
  const element = document.createElement("div");

  element.innerHTML = text;

  return element;
};
```
src/index.js
```javascript
import component from "./component";

document.body.appendChild(component());
```
**Configuring html-webpack-plugin**  
Create index.html file that points to the generated file this plugin.
```sh
$ npm install html-webpack-plugin --save-dev
```
Create file 'webpack.config.js'.
```javascript
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      title: "Webpack demo",
    }),
  ],
};
```
Run
```sh
node_modules/.bin/webpack --mode production
```
In the 'dist' directory, a file named index.html will be created with the content as follows.
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Webpack demo</title>
  </head>
  <body>
  <script type="text/javascript" src="main.js"></script></body>
</html>
```
Run 'serve' in the 'dist' directory and access 'http://localhost:5000/' in browser.
![image](/public/notes/webpack/helloworld.png){:width="500px"}  

**Adding a Build Shortcut**  
Add short cut for 'node_modules/.bin/webpack'. Modify package.json, add 'build' into scripts.
```json
"scripts": {
  "build": "webpack --mode production"
},
```
Now, we can run `npm run build` instead.

**HtmlWebpackPlugin Extensions**
* `favicons-webpack-plugin` is able to generate favicons.
* `script-ext-html-webpack-plugin` gives you more control over script tags and allows you to tune script loading further.
* `style-ext-html-webpack-plugin` converts CSS references to inlined CSS. The technique can be used to serve critical CSS to the client fast as a part of the initial payload.
* `resource-hints-webpack-plugin` adds resource hints to your HTML files to speed up loading time.
* `preload-webpack-plugin` enables rel=preload capabilities for scripts and helps with lazy loading, and it combines well with techniques discussed in the Building part of this book.
* `webpack-cdn-plugin` allows you to specify which dependencies to load through a Content Delivery Network (CDN). This common technique is used for speeding up loading of popular libraries.
* `dynamic-cdn-webpack-plugin` achieves a similar result.

### 2.2 webpack-dev-server
**Webpack watch Mode and webpack-dev-server**  
```sh
npm run build -- --watch
```
**Getting Started with WDS(webpack-dev-server)**  
Install WDS.
```sh
npm install webpack-dev-server --save-dev
```
Start dev server.
```sh
node_modules/.bin/webpack-dev-server --mode development
```
Open broswer and access 'http://localhost:8080/'.
![image](/public/notes/webpack/devserver.png){:width="500px"}
If you try modifying the code, you should see the output in your terminal. The browser should also perform a hard refresh on change.

**Attaching WDS to the Project**  
To integrate WDS to the project, define an npm script in package.json for launching it.
```javascript
"scripts": {
  "start": "webpack-dev-server --mode development",
  "build": "webpack --mode production"
},
```
Then, run 'npm run start' to start the dev server.

**Configuring WDS Through Webpack Configuration**  
Add `devServer` field in `webpack.config.js`.
```javascript
module.exports = {

  devServer: {
    // Display only errors to reduce the amount of output.
    stats: "errors-only",

    // Parse host and port from env to allow customization.
    //
    // If you use Docker, Vagrant or Cloud9, set
    // host: options.host || "0.0.0.0";
    //
    // 0.0.0.0 is available to all network devices
    // unlike default `localhost`.
    host: process.env.HOST, // Defaults to `localhost`
    port: process.env.PORT, // Defaults to 8080
    open: true, // Open the page in browser
  },

  ...
};
```
Then, run the following command to start the dev server at port 1234.
```sh
$ PORT=1234 npm start
```
And, notice that the browser is opened automatically, because we set the 'open:true' in devServer.
![image](/public/notes/webpack/devserver2.png){:width="500px"}  
* [Source Codes for Dev Server](https://github.com/jojozhuang/Note/tree/master/SurvivejsWebpack/WebpackDemo)

**Enabling Error Overlay**  
Activate `overlay` to capture compilation related warnings and errors. Add **overlay: true** in webpack.config.js
```javascript
module.exports = {
  devServer: {
    ...

    overlay: true,

  },
  ...
};
```
### 2.3 Composing Configuration
**Setting Up webpack-merge**
```sh
npm install webpack-merge --save-dev
```
Create file named webpack.parts.js.
```javascript
exports.devServer = ({ host, port } = {}) => ({
  devServer: {
    stats: "errors-only",
    host, // Defaults to `localhost`
    port, // Defaults to 8080
    open: true,
    overlay: true,
  },
});
```
Update webpack.config.js.
```javascript
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const parts = require("./webpack.parts");

const commonConfig = merge([
  {
    plugins: [
      new HtmlWebpackPlugin({
        title: "Webpack demo",
      }),
    ],
  },
]);

const productionConfig = merge([]);

const developmentConfig = merge([
  parts.devServer({
    // Customize host/port here if needed
    host: process.env.HOST,
    port: process.env.PORT,
  }),
]);

module.exports = mode => {
  if (mode === "production") {
    return merge(commonConfig, productionConfig, { mode });
  }

  return merge(commonConfig, developmentConfig, { mode });
};
```
package.json  
```javascript
"scripts": {
  "start": "webpack-dev-server --env development",
  "build": "webpack --env production"
},
```
* Instead of returning a configuration directly, a function capturing the passed `env` is returned. The function returns configuration based on it and also maps webpack `mode` to it.

Run.
```sh
$ PORT=1234 npm start
```
* [Source Codes for Composing Configuration](https://github.com/jojozhuang/Note/tree/master/SurvivejsWebpack/WebpackComposing)

## 3. Styling
### 3.1 Loading Styles
**Loading CSS**  
Install css-loader and style-loader.
```sh
npm install css-loader style-loader --save-dev
```
webpack.parts.js
```javascript
exports.loadCSS = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        include,
        exclude,

        use: ["style-loader", "css-loader"],
      },
    ],
  },
});
```
Add parts.loadCSS() to commonConfig in webpack.config.js.
```javascript
const commonConfig = merge([
  {
    plugins: [
      new HtmlWebpackPlugin({
        title: "Webpack-Composing Configuration demo",
      }),
    ],
  },
  parts.loadCSS(),  
]);
```
Create src/main.css.
```css
body {
  background: cornsilk;
}
```
Add import in src/index.js.
```javascript
import "./main.css";
```
Execute 'npm start' and browse to http://localhost:8080.
![image](/public/notes/webpack/loadingstyles.png){:width="500px"}
Notice that the styles are added to the header. It is inline css.
![image](/public/notes/webpack/inlinestyle.png)  
**Loading Less**
```javascript
{
  test: /\.less$/,
  use: ["style-loader", "css-loader", "less-loader"],
},
```
**Loading Sass**
```javascript
{
  test: /\.scss$/,
  use: ["style-loader", "css-loader", "sass-loader"],
},
```
* [Source Codes for Loading Styles](https://github.com/jojozhuang/Note/tree/master/SurvivejsWebpack/WebpackLoadingStyles)

### 3.2 Separating CSS
Using `mini-css-extract-plugin` with styling solves the problem of **Flash of Unstyled Content(FOUC)**. Separating CSS from JavaScript also improves caching behavior and removes a potential attack vector.
Install the plugin first:
```sh
$ npm install mini-css-extract-plugin --save-dev
```
Update webpack.parts.js.
```javascript
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

exports.extractCSS = ({ include, exclude, use }) => {
  // Output extracted CSS to a file
  const plugin = new MiniCssExtractPlugin({
    // `allChunks` is needed to extract from extracted chunks as well.
    allChunks: true,
    filename: "styles/[name].css",
  });

  return {
    module: {
      rules: [
        {
          test: /\.css$/,
          include,
          exclude,

          use: [
            MiniCssExtractPlugin.loader,
          ].concat(use),
        },
      ],
    },
    plugins: [plugin],
  };
};
```
webpack.config.js
* Move parts.loadCSS() from commonConfig to developmentConfig.
* Add parts.extractCSS into productionConfig

```javascript
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const parts = require("./webpack.parts");

const commonConfig = merge([
  {
    plugins: [
      new HtmlWebpackPlugin({
        title: "Webpack-Separating CSS demo",
      }),
    ],
  },
]);

const productionConfig = merge([
  parts.extractCSS({
    use: "css-loader",
  }),
]);

const developmentConfig = merge([
  parts.devServer({
    // Customize host/port here if needed
    host: process.env.HOST,
    port: process.env.PORT,
  }),
  parts.loadCSS(),  
]);

module.exports = mode => {
  if (mode === "production") {
    return merge(commonConfig, productionConfig, { mode });
  }

  return merge(commonConfig, developmentConfig, { mode });
};
```
Run 'npm run build'. Check the output in dist directory.  
1) File styles/main.css is generated as desired.
![image](/public/notes/webpack/separatingcssmain.png){:width="800px"}
2) In the index.html, the css file is included in the header. Now, css is separated with html and javascript.
![image](/public/notes/webpack/separatingcsshtml.png){:width="800px"}
* [Source Codes for Separating CSS](https://github.com/jojozhuang/Note/tree/master/SurvivejsWebpack/WebpackSeparatingCSS)

### 3.3 Eliminating Unused CSS
Frameworks like Bootstrap tend to come with a lot of CSS. Often you use only a small part of it. Typically, you bundle even the unused CSS. It's possible, however, to eliminate the portions you aren't using. `PurifyCSS` is a tool that can achieve this by analyzing files.

**Setting Up Pure.css(For Demo)**  
Create a sample page with using styles defined Pure.css  
Install purecss
```sh
npm install purecss --save
```
Import it in src/index.js
```javascript
import component from "./component";
import "./main.css";
import "purecss";

document.body.appendChild(component());
```
Update src/component.js, set className with the pure button.
```javascript
export default (text = "Hello world, Unused CSS!") => {
  const element = document.createElement("div");

  element.className = "pure-button";  
  element.innerHTML = text;

  return element;
};
```
Run 'npm start' and take a look the UI change.
![image](/public/notes/webpack/purebutton.png){:width="600px"}
Run 'npm run build' to build the application.
```sh
Hash: 72fa55ecdebc33f6635a
Version: webpack 4.5.0
Time: 833ms
Built at: 4/8/2018 9:18:13 AM
          Asset       Size  Chunks             Chunk Names
        main.js  760 bytes       0  [emitted]  main
styles/main.css   16.1 KiB       0  [emitted]  main
     index.html  241 bytes          [emitted]  
```
The size of the main.css grows to 16.1 KiB. Before using purecss, the size is only 33 byte.

**Enabling PurifyCSS**  
Install glob and purifycss-webpack.
```sh
npm install glob purifycss-webpack purify-css --save-dev
```
Update webpack.parts.js, create purifyCSS configuration.
```javascript
const PurifyCSSPlugin = require("purifycss-webpack");

exports.purifyCSS = ({ paths }) => ({
  plugins: [new PurifyCSSPlugin({ paths })],
});
```
Update webpack.config.js.
* Add references of path and glob.
* Set path of the src folder.
* Add purifyCSS in productionConfig.

```javascript
...

const path = require("path");
const glob = require("glob");

const parts = require("./webpack.parts");

const PATHS = {
  app: path.join(__dirname, "src"),
};

...

const productionConfig = merge([
  parts.extractCSS({
    use: "css-loader",
  }),
  parts.purifyCSS({
    paths: glob.sync(`${PATHS.app}/**/*.js`, { nodir: true }),
  }),
]);
```
Run 'npm run build' again to build the application.
```sh
Hash: 72fa55ecdebc33f6635a
Version: webpack 4.5.0
Time: 642ms
Built at: 4/8/2018 9:23:03 AM
          Asset       Size  Chunks             Chunk Names
        main.js  760 bytes       0  [emitted]  main
styles/main.css   2.07 KiB       0  [emitted]  main
     index.html  241 bytes          [emitted]  
```
The size of the main.css is reduced to 2.07 KiB.
* [Source Codes for Eliminating Unused CSS](https://github.com/jojozhuang/Note/tree/master/SurvivejsWebpack/WebpackUnusedCSS)

### 3.4 Autoprefixing
Skipped

## 4. Loading Assets
### 4.1 Loading Images
**Integrating Images to the Project**  
Add background image to the page. Update main.css as follows. Create an image in folder images.
```css
body {
  background: cornsilk;

  background-image: url("./images/background.jpg");
  background-repeat: no-repeat;
  background-position: center;
}
```
Install file-loader and url-loader.
```sh
npm install file-loader url-loader --save-dev
```
Update webpack.parts.js, create loadImages module.
```javascript
exports.loadImages = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(png|jpg)$/,
        include,
        exclude,
        use: {
          loader: "url-loader",
          options,
        },
      },
    ],
  },
});
```
Update webpack.parts.js, add `publicPath` option to extractCSS module.
```javascript
use: [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        publicPath: '../'
      },
    },
].concat(use),
```
Update webpack.config.js.
* Add loadImages in productionConfig, specify the limit to 15000. If size is less than 15KB, image will be converted to Base64 strings and embedded to JavaScript bundles.
* Add loadImages in developmentConfig.

```javascript
...
const productionConfig = merge([
  parts.extractCSS({
    use: "css-loader",
  }),
  parts.purifyCSS({
    paths: glob.sync(`${PATHS.app}/**/*.js`, { nodir: true }),
  }),
  parts.loadImages({
    options: {
      limit: 15000,
      name: "images/[name].[ext]",
    },
  }),
]);

const developmentConfig = merge([
  parts.devServer({
    // Customize host/port here if needed
    host: process.env.HOST,
    port: process.env.PORT,
  }),
  parts.loadCSS(),  
  parts.loadImages(),  
]);
```
Run 'npm run build' to build the application. You see the background image is put into images folder.
```sh
Hash: 0a719c3df65f97a6cc27
Version: webpack 4.5.0
Time: 646ms
Built at: 5/27/2018 2:08:28 PM
                Asset       Size  Chunks             Chunk Names
images/background.jpg   79.8 KiB          [emitted]  
    ./styles/main.css   2.18 KiB       0  [emitted]  main
              main.js  766 bytes       0  [emitted]  main
           index.html  244 bytes          [emitted]  
Entrypoint main = ./styles/main.css main.js
```
Deploy all of the output files into nginx server. The background image is displayed. And we can see browser send a separate request to fetch this image.
![image](/public/notes/webpack/loadingimages.png)

Change the limit to 85000, which is larger than the image size. The image will be converted to base64 string.
```javascript
...
const productionConfig = merge([
  ...

  parts.loadImages({
    options: {
      limit: 85000,
      name: "images/[name].[ext]",
    },
  }),

  ...
]);
```
Run 'npm run build' again to build the application. This time, the background image is not in the output list.
```sh
Hash: e64d69c06992d29282a6
Version: webpack 4.5.0
Time: 743ms
Built at: 5/27/2018 2:32:09 PM
            Asset       Size  Chunks             Chunk Names
./styles/main.css    109 KiB       0  [emitted]  main
          main.js  766 bytes       0  [emitted]  main
       index.html  244 bytes          [emitted]  
Entrypoint main = ./styles/main.css main.js
```
Open the main.css in the dist directory. You will see the background images is embedded into this file in base64 format.
![image](/public/notes/webpack/base64.png){:width="800px"}

Deploy again the output files into nginx server. The background image is displayed as well. However, we can see no separate request this time.
![image](/public/notes/webpack/loadingimages2.png)

* [Source Codes for Loading Images](https://github.com/jojozhuang/Note/tree/master/SurvivejsWebpack/WebpackLoadingImages)

### 4.2 Loading Fonts
Download sansation_light.woff and sansation_bold.woff font files, put them into /src/fonts. Update main.css as follows.
```css
@font-face {
  font-family: myFirstFont;
  src: url("./fonts/sansation_light.woff");
}

@font-face {
  font-family: myFirstFont;
  src: url("./fonts/sansation_bold.woff");
  font-weight: bold;
}

* {
  font-family: myFirstFont;
}

body {
  background: cornsilk;

  background-image: url("./images/background.jpg");
  background-repeat: no-repeat;
  background-position: center;
}
```
Edit index.js, add new text into DOM tree.
```javascript
import component from "./component";
import "./main.css";
import "purecss";

document.body.appendChild(component());

//<p>Testing @ new font.</p>
var p = document.createElement("P");                        // Create a <p> node
var t = document.createTextNode("Testing @ new font.");     // Create a text node
p.appendChild(t);                                           // Append the text to <p>
document.body.appendChild(p);

//<p><b>Testing @ new font.</b></p>
var p2 = document.createElement("P");                       // Create a <p> node
var b = document.createElement("B");                        // Create a <b> node
var t2 = document.createTextNode("Testing @ bond font.");   // Create a text node
b.appendChild(t2);                                          // Append the text to <b>
p2.appendChild(b);                                          // Append the <b> to <p>
document.body.appendChild(p2);  
```
Update webpack.parts.js, create loadFonts module.
```javascript
exports.loadFonts= ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        include,
        exclude,
        use: {
          loader: "url-loader",
          options,
        },
      },
    ],
  },
});
```
Update webpack.parts.js, add `publicPath` option to extractCSS module. Or you can set it to options of loadFonts module in webpack.config.js.
```javascript
use: [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        publicPath: '../'
      },
    },
].concat(use),
```
Update webpack.config.js.
* Add loadFonts in productionConfig, specify the limit to 10000. If size is less than 10KB, font files will be embedded to JavaScript bundles.
* Add loadFonts in developmentConfig.

```javascript
...
const productionConfig = merge([
  ...
  parts.loadImages({
    options: {
      limit: 15000,
      name: "images/[name].[ext]",
      publicPath: "../", // Take the directory into account
    },
  }),
  parts.loadFonts({
    options: {
      limit: 10000,
      name: "fonts/[name].[ext]",
      publicPath: "../", // Take the directory into account
    },
  }),
]);

const developmentConfig = merge([
  parts.devServer({
    // Customize host/port here if needed
    host: process.env.HOST,
    port: process.env.PORT,
  }),
  parts.loadCSS(),  
  parts.loadImages(),  
  parts.loadFonts(),  
]);
```
Run 'npm run build' to build the application. You see the two font files are put into fonts folder.
```sh
Hash: ad5cd87f63994dd3046a
Version: webpack 4.5.0
Time: 918ms
Built at: 5/27/2018 4:31:45 PM
                     Asset       Size  Chunks             Chunk Names
     images/background.jpg   79.8 KiB          [emitted]  
 fonts/sansation_bold.woff   10.9 KiB          [emitted]  
fonts/sansation_light.woff   10.9 KiB          [emitted]  
         ./styles/main.css   2.49 KiB       0  [emitted]  main
                   main.js   1.05 KiB       0  [emitted]  main
                index.html  243 bytes          [emitted]  
Entrypoint main = ./styles/main.css main.js
```
Deploy all of the output files into nginx server. The new font is working now.
![image](/public/notes/webpack/loadingfonts.png)

* [Source Codes for Loading Fonts](https://github.com/jojozhuang/Note/tree/master/SurvivejsWebpack/WebpackLoadingFonts)

## 5. Building
### 5.1 Source Maps
### 5.2 Bundle Splitting
### 5.3 Code Splitting
### 5.4 Tidying Up

## 6. Optimizing
### 6.1 Minifying

## 7. Reference
* [Webpack Book](https://survivejs.com/webpack/foreword/)
* [Official Documentation of Webpack](https://webpack.js.org/concepts/)
* [Source Codes Used for This Posting](https://github.com/jojozhuang/Note/tree/master/SurvivejsWebpack)
* [how to override webpack.output.publicPath](https://github.com/webpack-contrib/mini-css-extract-plugin/issues/44)
