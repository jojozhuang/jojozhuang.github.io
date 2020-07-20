---
layout: tutorial
key: tutorial
title: "Deploying Game Store React App to Netlify"
index: 8454
subcategory: react-app
date: 2018-07-31
tags: [Netlify]
---

> Introduce how to deploy React application to Netlify.

## 1. Netlify
[Netlify](https://www.netlify.com/) is an online service which builds, deploys, and manages modern web projects.  Netlify basically initiates its own kind of repository that pushes both to a Github repository and its own services. It offers hosting for front-end projects with many options.

## 2. Deploying Application From Github Repository
In this tutorial, I will deploy my [Game Store React](https://github.com/jojozhuang/game-store-react) app to Netlify.
### 2.1 New Netlify Account
Go to https://app.netlify.com/signup to create a Netlify account with your GitHub account.
### 2.2 New Site from GitHub
After login, you are in the app home page, click 'New site from Git'.
![image](/assets/images/frontend/8454/app.png)
Choose 'Github', next.
![image](/assets/images/frontend/8454/newsite.png)
Authorize Netlify to access your GitHub account, next.
![image](/assets/images/frontend/8454/authorize.png)
Choose the repository 'game-store-react', next.
![image](/assets/images/frontend/8454/repository.png)
Choose `master` for the Branch to deploy, set `npm run build` to the Build command, and set `dist` to the Publish directory, click the 'Deploy site' button.
![image](/assets/images/frontend/8454/options.png)
Netlify will start to deploy your site.
![image](/assets/images/frontend/8454/inprogress.png)
Switch to 'Deploy' tab to monitor the status and check the logs.
![image](/assets/images/frontend/8454/monitor.png)
If the deployment fails, click on the FAILED build, check the log and you should see the error in details.
![image](/assets/images/frontend/8454/errorlog.png)
If no issue occurs, the publish will be done after few seconds(or minutes).
![image](/assets/images/frontend/8454/published.png)
### 2.3 Testing
Switch back to the 'Overview' tab, click on the green link.
![image](/assets/images/frontend/8454/overview.png)
Our app is now running in the domain of Netlify.
![image](/assets/images/frontend/8454/home.png)
However, we got 'Page Not found' error when access the 'products' page. The same error occurs when access the 'productpage' page.
![image](/assets/images/frontend/8454/pagenotfound.png)
Actually, I've already discussed this issue in tutorial [React Router and Client Side Routing]({% link _tutorial/react-app/react-router-and-client-side-routing.md %}).
### 2.4 Fixing the Issue
To solve this React Routing issue on Netlify, we need to handling redirects for single page apps, see below. Read more about it in [Netlify Document](https://www.netlify.com/docs/redirects/#history-pushstate-and-single-page-apps).

Create a file named '\_redirects' to the 'public' folder of the React project with the following content.
```raw
/*    /index.html   200
```
Then we need this file to be copied to 'dist' folder when building. To do so, we can use library 'copy-webpack-plugin'.
```raw
npm i -D copy-webpack-plugin
```
Edit 'webpack.parts.js', add the following codes.
```javascript
const CopyWebpackPlugin = require("copy-webpack-plugin");

exports.loadStatic = () => ({
  plugins: [
    new CopyWebpackPlugin([
      {
        from: "./public/_redirects",
        to: "./_redirects",
        toType: "file"
      }
    ])
  ]
});
```
Edit 'webpack.config.js', call 'loadStatic' method in production merge.
```javascript
const productionConfig = merge([
  // parts.loadEnv('https://online-code-editor-api.herokuapp.com'),
  parts.extractCSS({
    use: "css-loader"
  }),

  ...

  parts.loadStatic()
]);
```
Run 'npm run build'. The '\_redirects' file is copied from './public' folder to the root folder of 'dist'.
![image](/assets/images/frontend/8454/dist.png){:width="700px"}
In Netlify, switch to 'Deploy' tab, click the 'Trigger Deploy' button to deploy again.
![image](/assets/images/frontend/8454/triggerdeploy.png)
After the deployment is finished, retry to access the 'products' page, it's working now.
![image](/assets/images/frontend/8454/worked.png)
The 'Add Product' page also works now.
![image](/assets/images/frontend/8454/add.png)
### 2.5 Changing Site Name
Switch to Settings tab, scroll down and click the 'Change site name' button.
![image](/assets/images/frontend/8454/settings.png)
Change the name to 'game-store-react' and save.
![image](/assets/images/frontend/8454/changename.png)
Access your site with the new URL, it should work.
![image](/assets/images/frontend/8454/newname.png)
### 2.6 Hot Module Replacement Error
In addition, I got the following HMR issue somehow after I changed the build command.
```raw
VM72 bundle.js:16 Uncaught Error: locals[0] does not appear to be a `module` object with Hot Module replacement API enabled. You should disable react-transform-hmr in production by using `env` section in Babel configuration. See the example in README: https://github.com/gaearon/react-transform-hmr
```
![image](/assets/images/frontend/8454/hmr.png)
The below 'build' command triggers this HMR issue.
```javascript
"build": "webpack --env production ",
```
To fix the issue, add 'NODE_ENV=production' into the build command. Submit the change to Github, Netlify will automatically deploy again, and the HMR issue should be solved.
```javascript
"build": "NODE_ENV=production webpack --env production ",
```
## 3. Reference
* [Netlify - History Pushstate and Single Page Apps](https://www.netlify.com/docs/redirects/#history-pushstate-and-single-page-apps)
* [Production build of React app use wrong development env with HMR](https://stackoverflow.com/questions/36153628/why-does-production-build-of-react-app-with-webpack-and-babel-use-wrong-develo)
* [How do you handle frontend routing with Netlify and React Router v4?](https://www.reddit.com/r/Frontend/comments/6h34h0/how_do_you_handle_frontend_routing_with_netlify/)
* [One-Page App Routing on Netlify](https://www.crookm.com/2018/02/one-page-app-routing-on-netlify.html)
* [CopyWebpackPlugin - Copies individual files or entire directories to the build directory](https://webpack.js.org/plugins/copy-webpack-plugin/)
* [Why does production build of React app (with Webpack and Babel) use wrong development env with HMR, which causes errors?](https://stackoverflow.com/questions/36153628/why-does-production-build-of-react-app-with-webpack-and-babel-use-wrong-develo)
