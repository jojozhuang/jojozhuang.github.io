---
layout: tutorial
key: tutorial
title: "Deploying Angular App to Heroku with Express Server"
index: 8365
subcategory: angular-app
date: 2019-05-26
tags: [Angular, Express, Heroku]
---

> Introduce how to deploy Game Store Angular app to Heroku and run in express server.

## 1. Angular Project
### 1.1 Source Files
Download the source files for this Angular app. Create your own repository on GitHub and submit this project.
```raw
git clone https://github.com/jojozhuang/game-store-angular.git
```
### 1.2 Post Install
Add `postinstall` script to have the build command run after the dependencies have been installed. With this postinstall script in place, we'll get a production mode app that lives in a `dist` folder with `ahead of time(AOT)` compilation, all on the server. No need to build the app locally.
```javascript
// package.json
"scripts": {
  // ...
  "postinstall": "ng build --aot --prod"
},
```
### 1.3 Move the @angular/cli Dependency
Heroku will only install the packages listed in the `dependencies` object and will ignore those in `devDependencies`. Since we want the application build step to take place on the server rather than on our local machine, we need to adjust the `package.json` file a bit. Angular CLI apps put the `@angular/cli` module itself as a dev dependency, meaning that we won't be able to access any `ng` commands on the server. To get around this, we need to move it to dependencies.
```javascript
// package.json
"dependencies": {
  // ...
  "@angular/cli": "7.3.9",
},
```
### 1.4 Engines
It's better to use same version of nodejs and npm during development and production. Add the specific Node and npm versions in the `engines` key in package.json. This is helpful for preventing unanticipated behavior due to version issues.
```javascript
// package.json
"engines": {
  "node": "9.4.0",
  "npm": "6.9.0"
}
```
### 1.5 Running the Server
Later on, we’re going to create a simple Node server to actually serve the application. We need to specify how the app should be started in a script so that Heroku can boot up the application server at the end of the deployment process. Create `start` command in scripts.
```javascript
// package.json
"scripts": {
  // ...
  "start": "node server.js"
},
```
### 1.6 Create an Express Server
Install express.
```raw
npm install --save express
```
Create `server.js` with following content.
```javascript
// server.js
const express = require('express');
const app = express();
// Run the app by serving the static files
// in the dist directory
app.use(express.static(__dirname + '/dist'));
// Start the app by listening on the default
// Heroku port
app.listen(process.env.PORT || 12080);
```
The `start` script is the last one to be called in the deployment process. The postinstall script will run beforehand, so we'll have all the files built and ready to go in the `dist` directory.
### 1.7 Force Redirect to HTTPS
Make all requests for the application be redirected to `https`.
```javascript
// server.js
const express = require('express');
const app = express();
// If an incoming request uses
// a protocol other than HTTPS,
// redirect that request to the
// same url but with HTTPS
const forceSSL = function() {
  return function (req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(
       ['https://', req.get('Host'), req.url].join('')
      );
    }
    next();
  }
}
// Instruct the app
// to use the forceSSL
// middleware
app.use(forceSSL());
// ...
```
### 1.8 Handle PathLocationStrategy Routing
When we punch in the domain and a sub-route for our Angular app in the URL bar and hit enter, the GET request made to the server tries to serve a path that doesn't exist. Instead, we need to tell the server to always serve the index.html file for any GET request that comes in for any route. This will allow Angular to handle the routing instead of the server. Now when we navigate directly to a sub-route (instead of clicking our way there in the app), the route will be served as expected.
```javascript
// server.js
const path = require('path');
// ...
// For all GET requests, send back index.html
// so that PathLocationStrategy can be used
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});
```

## 2. Deployment
Switch to root directory of the app.
```raw
cd game-store-angular/
```
Create new app.
```raw
$ heroku create game-store-angular
Creating ⬢ game-store-angular... done
https://game-store-angular.herokuapp.com/ | https://git.heroku.com/game-store-angular.git
```
Or connect to the existing app.
```raw
heroku git:remote -a game-store-angular
```
Then push all files to heroku.
```raw
$ git push heroku master
Enumerating objects: 5, done.
Counting objects: 100% (5/5), done.
Delta compression using up to 8 threads
Compressing objects: 100% (3/3), done.
Writing objects: 100% (3/3), 289 bytes | 289.00 KiB/s, done.
Total 3 (delta 2), reused 0 (delta 0)
remote: Compressing source files... done.
remote: Building source:
remote:
remote: -----> Node.js app detected
remote:        
remote: -----> Creating runtime environment
remote:        
remote:        NPM_CONFIG_LOGLEVEL=error
remote:        NODE_ENV=production
remote:        NODE_MODULES_CACHE=true
remote:        NODE_VERBOSE=false
remote:        
remote: -----> Installing binaries
remote:        engines.node (package.json):  9.4.0
remote:        engines.npm (package.json):   6.9.0
remote:        
remote:        Resolving node version 9.4.0...
remote:        Downloading and installing node 9.4.0...
remote:        Bootstrapping npm 6.9.0 (replacing 5.6.0)...
remote:        npm 6.9.0 installed
remote:        
remote: -----> Restoring cache
remote:        Cached directories were not restored due to a change in version of node, npm, yarn or stack
remote:        Module installation may take longer for this build
remote:        
remote: -----> Installing dependencies
remote:        Installing node modules (package.json + package-lock)
remote:        
remote:        > node-sass@4.12.0 install /tmp/build_569b1b33b9cbf28efb5bdb7305e14fba/node_modules/node-sass
remote:        > node scripts/install.js
remote:        
remote:        Downloading binary from https://github.com/sass/node-sass/releases/download/v4.12.0/linux-x64-59_binding.node
remote:        Download complete
remote:        Binary saved to /tmp/build_569b1b33b9cbf28efb5bdb7305e14fba/node_modules/node-sass/vendor/linux-x64-59/binding.node
remote:        Caching binary to /tmp/npmcache.ZH229/node-sass/4.12.0/linux-x64-59_binding.node
remote:        
remote:        > core-js@2.6.8 postinstall /tmp/build_569b1b33b9cbf28efb5bdb7305e14fba/node_modules/core-js
remote:        > node -e "try { require('./scripts/postinstall'); } catch (e) { /* empty */ }"
remote:        
remote:        
remote:        > node-sass@4.12.0 postinstall /tmp/build_569b1b33b9cbf28efb5bdb7305e14fba/node_modules/node-sass
remote:        > node scripts/build.js
remote:        
remote:        Binary found at /tmp/build_569b1b33b9cbf28efb5bdb7305e14fba/node_modules/node-sass/vendor/linux-x64-59/binding.node
remote:        Testing binary
remote:        Binary is fine
remote:        
remote:        > game-store-angular@1.0.0 postinstall /tmp/build_569b1b33b9cbf28efb5bdb7305e14fba
remote:        > ng build --aot --prod
remote:        
remote:        
remote:        Date: 2019-05-27T17:09:31.304Z
remote:        Hash: 948729445648128b7d7c
remote:        Time: 74045ms
remote:        chunk {0} runtime.26209474bfa8dc87a77c.js (runtime) 1.41 kB [entry] [rendered]
remote:        chunk {1} main.60a2f25332636ec9523e.js (main) 421 kB [initial] [rendered]
remote:        chunk {2} polyfills.9d6088873d2a3c33ec93.js (polyfills) 41 kB [initial] [rendered]
remote:        chunk {3} styles.f0b28ad581a97540732f.css (styles) 139 kB [initial] [rendered]
remote:        added 1291 packages from 1021 contributors and audited 42714 packages in 129.957s
remote:        found 0 vulnerabilities
remote:        
remote:        
remote: -----> Build
remote:        Running build
remote:        
remote:        > game-store-angular@1.0.0 build /tmp/build_569b1b33b9cbf28efb5bdb7305e14fba
remote:        > ng build --prod
remote:        
remote:        
remote:        Date: 2019-05-27T17:10:22.346Z
remote:        Hash: 948729445648128b7d7c
remote:        Time: 43051ms
remote:        chunk {0} runtime.26209474bfa8dc87a77c.js (runtime) 1.41 kB [entry] [rendered]
remote:        chunk {1} main.60a2f25332636ec9523e.js (main) 421 kB [initial] [rendered]
remote:        chunk {2} polyfills.9d6088873d2a3c33ec93.js (polyfills) 41 kB [initial] [rendered]
remote:        chunk {3} styles.f0b28ad581a97540732f.css (styles) 139 kB [initial] [rendered]
remote:        
remote: -----> Caching build
remote:        - node_modules
remote:        
remote: -----> Pruning devDependencies
remote:        removed 877 packages and audited 17561 packages in 14.644s
remote:        found 0 vulnerabilities
remote:        
remote:        
remote: -----> Build succeeded!
remote: -----> Discovering process types
remote:        Procfile declares types     -> (none)
remote:        Default types for buildpack -> web
remote:
remote: -----> Compressing...
remote:        Done: 62.5M
remote: -----> Launching...
remote:        Released v6
remote:        https://game-store-angular.herokuapp.com/ deployed to Heroku
remote:
remote: Verifying deploy... done.
To https://git.heroku.com/game-store-angular.git
   82080a5..7e8d68d  master -> master
```

## 3. Testing
Open web browser, access 'https://game-store-angular.herokuapp.com/'. The Angular app is working now.
![image](/assets/images/frontend/8365/gamestore_home.png)
It works properly, wee see the products.
![image](/assets/images/frontend/8365/gamestore_list.png)  

## 4. References
* [Angular CLI Deployment: Host Your Angular 2 App on Heroku](https://medium.com/@ryanchenkie_40935/angular-cli-deployment-host-your-angular-2-app-on-heroku-3f266f13f352)
* [How do you deploy Angular apps?](https://stackoverflow.com/questions/35539622/how-do-you-deploy-angular-apps)
