---
layout: tutorial
key: tutorial
title: "Deploying Angular App to Heroku as Static Website"
index: 8364
subcategory: angular-app
date: 2019-05-25
tags: [Angular, Heroku]
---

> Introduce how to deploy Game Store Angular app to Heroku as static website.

## 1. Angular Project
Game Store Angular is a project built with Angular.

## 2. Heroku
[Heroku](https://www.heroku.com/) is a platform as a service (PaaS) that enables developers to build, run, and operate applications entirely in the cloud.
### 2.1 Sign Up
Go to https://signup.heroku.com/ create a free Heroku account.
### 2.2 Installing Heroku CLI
Go to https://devcenter.heroku.com/articles/heroku-cli#download-and-install to download proper installer.
### 2.3 Getting Started
First, read the official tutorial [Getting Started on Heroku with Node.js](https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction) to get familiar with the basic functions of Heroku. Below are some of the highlights from the tutorial.  
1) Log into Heroku
```raw
$ heroku login
Enter your Heroku credentials.
Email: csgeek@mail.com
Password: **********
```
2) Create Heroku App
```raw
$ heroku create                     // no name, a random name will be assigned to the app
$ heroku create online-judge-api // create app with the given name
```
3) View logs
```raw
$ heroku logs --tail
```
4) Scale the app
```raw
$ heroku ps //check how many dynos are running
$ heroku ps:scale web=0 // scale down
$ heroku ps:scale web=1 // scale up
```
5) Run the app locally
```raw
$ heroku local web // same as 'npm start'
```
6) Heroku Console
```raw
$ heroku run bash
Running bash on ⬢ damp-springs-52045... up, run.3598 (Free)
~ $ ls
Procfile  README.md  app.json  index.js  node_modules  package-lock.json  package.json	public	test.js  views
```
* Type 'exit' to quit the console.

## 3. Deployment
Steps:
* Download the source files from GitHub to local.
* Build the app, get output files in `dist` folder.
* Create a new app in Heroku with Heroku CLI.
* Push all files to Heroku.

### 3.1 Source Files
Download the source files for this Angular app. Create your own repository on GitHub and submit this project.
```raw
git clone https://github.com/jojozhuang/game-store-angular.git
```
### 3.2 Build
Build and navigate to the output folder `dist`.
```raw
$ cd GitHub/game-store-angular
$ npm run build
$ cd dist
```
### 3.3 Create App in Heroku
Login to heroku.
```raw
$ heroku login
heroku: Press any key to open up the browser to login or q to exit:
Opening browser to https://cli-auth.heroku.com/auth/browser/d849177a-d6f2-492e-88f5-8ad8ea019a90
Logging in... done
Logged in as csgeek@mail.com
```
Create new app.
```raw
$ heroku create game-store-angular
Creating ⬢ game-store-angular... done
https://game-store-angular.herokuapp.com/ | https://git.heroku.com/game-store-angular.git
```
### 3.4 Push Files to Heroku
Use git commands to push files to Heroku.
```raw
git init
git add .
git commit -m "initial"
git push heroku master
```
If above git push doesn't work, try again with the following command.
```raw
git push --set-upstream https://git.heroku.com/text-compare-angular.git master
```
You may get the following error.
```raw
$ git push heroku master
Counting objects: 100% (243/243), done.
Delta compression using up to 8 threads
Compressing objects: 100% (238/238), done.
Writing objects: 100% (243/243), 860.53 KiB | 10.37 MiB/s, done.
Total 243 (delta 128), reused 0 (delta 0)
remote: Compressing source files... done.
remote: Building source:
remote:
remote:  !     No default language could be detected for this app.
remote: 			HINT: This occurs when Heroku cannot detect the buildpack to use for this application automatically.
remote: 			See https://devcenter.heroku.com/articles/buildpacks
remote:
remote:  !     Push failed
remote: Verifying deploy...
remote:
remote: !	Push rejected to game-store-angular.
remote:
To https://git.heroku.com/game-store-angular.git
 ! [remote rejected] master -> master (pre-receive hook declined)
error: failed to push some refs to 'https://git.heroku.com/game-store-angular.git'
```
This is because Heroku is not able to determine the language of the app. Actually, it is just a static web site since we have compiled the Angular app. The solution is: rename './dist/index.html' to './dist/index.php'. Then, push again.
```raw
mv index.html index.php
git add index.html
git add index.php
git commit -m "rename"
git push heroku master
Enumerating objects: 243, done.
Counting objects: 100% (243/243), done.
Delta compression using up to 8 threads
Compressing objects: 100% (238/238), done.
Writing objects: 100% (243/243), 860.53 KiB | 10.37 MiB/s, done.
Total 243 (delta 128), reused 0 (delta 0)
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
remote: -----> Installing dependencies
remote:        Installing node modules (package.json + package-lock)
remote:        
remote:        > node-sass@4.12.0 install /tmp/build_6227101515520e80ca28c81de035afcb/node_modules/node-sass
remote:        > node scripts/install.js
remote:        
remote:        Downloading binary from https://github.com/sass/node-sass/releases/download/v4.12.0/linux-x64-59_binding.node
remote:        Download complete
remote:        Binary saved to /tmp/build_6227101515520e80ca28c81de035afcb/node_modules/node-sass/vendor/linux-x64-59/binding.node
remote:        Caching binary to /tmp/npmcache.deIoD/node-sass/4.12.0/linux-x64-59_binding.node
remote:        
remote:        > core-js@2.6.8 postinstall /tmp/build_6227101515520e80ca28c81de035afcb/node_modules/core-js
remote:        > node -e "try { require('./scripts/postinstall'); } catch (e) { /* empty */ }"
remote:        
remote:        
remote:        > node-sass@4.12.0 postinstall /tmp/build_6227101515520e80ca28c81de035afcb/node_modules/node-sass
remote:        > node scripts/build.js
remote:        
remote:        Binary found at /tmp/build_6227101515520e80ca28c81de035afcb/node_modules/node-sass/vendor/linux-x64-59/binding.node
remote:        Testing binary
remote:        Binary is fine
remote:        
remote:        > game-store-angular@1.0.0 postinstall /tmp/build_6227101515520e80ca28c81de035afcb
remote:        > ng build --aot --prod
remote:        
remote:        
remote:        Date: 2019-05-27T04:46:21.383Z
remote:        Hash: 948729445648128b7d7c
remote:        Time: 74673ms
remote:        chunk {0} runtime.26209474bfa8dc87a77c.js (runtime) 1.41 kB [entry] [rendered]
remote:        chunk {1} main.60a2f25332636ec9523e.js (main) 421 kB [initial] [rendered]
remote:        chunk {2} polyfills.9d6088873d2a3c33ec93.js (polyfills) 41 kB [initial] [rendered]
remote:        chunk {3} styles.f0b28ad581a97540732f.css (styles) 139 kB [initial] [rendered]
remote:        added 1291 packages from 1021 contributors and audited 42714 packages in 130.923s
remote:        found 0 vulnerabilities
remote:        
remote:        
remote: -----> Build
remote:        Running build
remote:        
remote:        > game-store-angular@1.0.0 build /tmp/build_6227101515520e80ca28c81de035afcb
remote:        > ng build --prod
remote:        
remote:        
remote:        Date: 2019-05-27T04:47:12.577Z
remote:        Hash: 948729445648128b7d7c
remote:        Time: 43766ms
remote:        chunk {0} runtime.26209474bfa8dc87a77c.js (runtime) 1.41 kB [entry] [rendered]
remote:        chunk {1} main.60a2f25332636ec9523e.js (main) 421 kB [initial] [rendered]
remote:        chunk {2} polyfills.9d6088873d2a3c33ec93.js (polyfills) 41 kB [initial] [rendered]
remote:        chunk {3} styles.f0b28ad581a97540732f.css (styles) 139 kB [initial] [rendered]
remote:        
remote: -----> Caching build
remote:        - node_modules
remote:        
remote: -----> Pruning devDependencies
remote:        removed 877 packages and audited 17561 packages in 15.604s
remote:        found 0 vulnerabilities
remote:        
remote:        
remote: -----> Build succeeded!
remote: -----> Discovering process types
remote:        Procfile declares types     -> (none)
remote:        Default types for buildpack -> web
remote:
remote: -----> Compressing...
remote:        Done: 62.6M
remote: -----> Launching...
remote:        Released v3
remote:        https://game-store-angular.herokuapp.com/ deployed to Heroku
remote:
remote: Verifying deploy... done.
To https://git.heroku.com/game-store-angular.git
 * [new branch]      master -> master
```

## 4. Testing
Access https://game-store-angular.herokuapp.com/, we see the homepage.
![image](/assets/images/frontend/8364/gamestore_home.png)
It works properly, wee see the products.
![image](/assets/images/frontend/8364/gamestore_list.png)  

## 5. References
* [Deploying Node.js Apps on Heroku](https://devcenter.heroku.com/articles/deploying-nodejs)
