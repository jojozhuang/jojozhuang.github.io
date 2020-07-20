---
layout: tutorial
key: tutorial
title: "Deploying React and Socket.IO App to Heroku"
index: 8479
subcategory: react-app
date: 2018-07-30
tags: [Nodejs, Heroku]
---

> Introduce how to deploy a React and Socket.IO app to Heroku.

## 1. Socket.IO App
In the posting [Building Course Player with React and Socket.IO]({% link _tutorial/react-app/building-course-player-with-react-and-socketio.md %}), I introduced how to build an course player with [React](https://reactjs.org/) and [Socket.IO](https://socket.io/). In this posting, I will introduce how to deploy this app to [Heroku](https://www.heroku.com/).

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
$ heroku create                        // no name, a random name will be assigned to the app
$ heroku create course-player-react // create app with the given name
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
### 3.1 Cloning Source Code
```raw
$ git clone https://github.com/jojozhuang/course-player-react
$ cd course-player-react
```
### 3.2 Creating App on Heroku
```raw
$ heroku create course-player-react
Creating ⬢ course-player-react... done
https://course-player-react.herokuapp.com/ | https://git.heroku.com/course-player-react.git
```
* When creating an app, a git remote (called heroku) is also created and associated with the local git repository.

### 3.3 Pushing Files to Heroku
```raw
$ git push heroku master
Counting objects: 89, done.
Delta compression using up to 8 threads.
Compressing objects: 100% (81/81), done.
Writing objects: 100% (89/89), 14.55 MiB | 625.00 KiB/s, done.
Total 89 (delta 15), reused 0 (delta 0)
remote: Compressing source files... done.
remote: Building source:
remote:
remote: -----> Node.js app detected
remote:
remote: -----> Creating runtime environment
remote:        
remote:        NPM_CONFIG_LOGLEVEL=error
remote:        NODE_VERBOSE=false
remote:        NODE_ENV=production
remote:        NODE_MODULES_CACHE=true
remote:
remote: -----> Installing binaries
remote:        engines.node (package.json):  unspecified
remote:        engines.npm (package.json):   unspecified (use default)
remote:        
remote:        Resolving node version 8.x...
remote:        Downloading and installing node 8.11.3...
remote:        Using default npm version: 5.6.0
remote:
remote: -----> Restoring cache
remote:        Skipping cache restore (not-found)
remote:
remote: -----> Building dependencies
remote:        Installing node modules (package.json + package-lock)
remote:        
remote:        > uglifyjs-webpack-plugin@0.4.6 postinstall /tmp/build_be3dc5293418ccdd9f30ac4b62a5e876/node_modules/uglifyjs-webpack-plugin
remote:        > node lib/post_install.js
remote:        
remote:        added 808 packages in 14.998s
remote:
remote: -----> Caching build
remote:        Clearing previous node cache
remote:        Saving 2 cacheDirectories (default):
remote:        - node_modules
remote:        - bower_components (nothing to cache)
remote:
remote: -----> Pruning devDependencies
remote:        Skipping because npm 5.6.0 sometimes fails when running 'npm prune' due to a known issue
remote:        https://github.com/npm/npm/issues/19356
remote:        
remote:        You can silence this warning by updating to at least npm 5.7.1 in your package.json
remote:        https://devcenter.heroku.com/articles/nodejs-support#specifying-an-npm-version
remote:
remote: -----> Build succeeded!
remote: -----> Discovering process types
remote:        Procfile declares types     -> (none)
remote:        Default types for buildpack -> web
remote:
remote: -----> Compressing...
remote:        Done: 44.1M
remote: -----> Launching...
remote:        Released v3
remote:        https://course-player-react.herokuapp.com/ deployed to Heroku
remote:
remote: Verifying deploy... done.
To https://git.heroku.com/course-player-react.git
 * [new branch]      master -> master
```
If you need to push some updated files, run following commands.
```raw
$ git add .
$ git commit -m "<comments>"
$ git push heroku master
```
## 4. Testing
Open web browser, access 'https://course-player-react.herokuapp.com/'. The player is working now.
![image](/assets/images/frontend/8479/home.png)  
Click the 'Play' button and drag to slider bar.
![image](/assets/images/frontend/8479/play.png)  

## 5. Reference
* [Getting Started on Heroku with Node.js](https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction)
* [Deploy Static Site Heroku](https://gist.github.com/wh1tney/2ad13aa5fbdd83f6a489)
* [How to Deploy a Static Site to Heroku](http://blog.teamtreehouse.com/deploy-static-site-heroku)
* [Deploy React and Express to Heroku](https://daveceddia.com/deploy-react-express-app-heroku/)
* [Lessons learned from deploying my first full-stack web application](https://medium.freecodecamp.org/lessons-learned-from-deploying-my-first-full-stack-web-application-34f94ec0a286)
* [Using config and environment variables for client and back-end use with Javascript](https://www.jaygould.co.uk/devops/2017/08/18/using-environment-config-variables-node.html)
* [Working with Environment Variables in Node.js](https://www.twilio.com/blog/2017/08/working-with-environment-variables-in-node-js.html)
* [Express Tutorial Part 7: Deploying to production](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/deployment)
* [Deployment @ create-react-app](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#deployment)
* [Updating Git remotes](https://devcenter.heroku.com/articles/renaming-apps#updating-git-remotes)
