---
layout: tutorial
key: tutorial
title: "Deploying Full Stack Node.js App to Heroku"
index: 370
category: reactjs
image: reactjs.png
date: 2018-02-12
tags: [Nodejs, Heroku]
---

> Introduce how to deploy a Full Stack app to Heroku.

## 1. Full Stack App
In the posting [Building Online Code Editor]({% link _tutorial/react/building-online-code-editor.md %}), I introduced how to build an online code editor with [React](https://reactjs.org/) and [Node.js](https://nodejs.org/en/). In this posting, I will introduce how to deploy both the front end(Implemented with React) and the backend(Implemented with express) to [Heroku](https://www.heroku.com/). We will create two sites on Heroku. One is for the React app and another is for the express app.

## 2. Heroku
[Heroku](https://www.heroku.com/) is a platform as a service (PaaS) that enables developers to build, run, and operate applications entirely in the cloud.
### 2.1 Sign Up
Go to https://signup.heroku.com/ create a free Heroku account.
### 2.2 Installing Heroku CLI
Go to https://devcenter.heroku.com/articles/heroku-cli#download-and-install to download proper installer.
### 2.3 Getting Started
First, read the official tutorial [Getting Started on Heroku with Node.js](https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction) to get familiar with the basic functions of Heroku. Below are some of the highlights from the tutorial.  
1) Log into Heroku
```sh
$ heroku login
Enter your Heroku credentials.
Email: jojozhuang@gmail.com
Password: **********
```
2) Create Heroku App
```sh
$ heroku create                        // no name, a random name will be assigned to the app
$ heroku create online-code-editor-api // create app with the given name
```
3) View logs
```sh
$ heroku logs --tail
```
4) Scale the app
```sh
$ heroku ps //check how many dynos are running
$ heroku ps:scale web=0 // scale down
$ heroku ps:scale web=1 // scale up
```
5) Run the app locally
```sh
$ heroku local web // same as 'npm start'
```
6) Heroku Console
```sh
$ heroku run bash
Running bash on ⬢ damp-springs-52045... up, run.3598 (Free)
~ $ ls
Procfile  README.md  app.json  index.js  node_modules  package-lock.json  package.json	public	test.js  views
```
* Type 'exit' to quit the console.

## 3. Deployment
### 3.1 Server
1) Clone Source Code
```sh
$ git clone https://github.com/jojozhuang/Tutorials/tree/master/OnlineCodeEditorReact
$ cd OnlineCodeEditorReact
```
2) Create App on Heroku
```sh
$ heroku create online-code-editor-api
```
* When creating an app, a git remote (called heroku) is also created and associated with the local git repository.

3) Push files to Heroku
```sh
$ git push heroku master
Counting objects: 7, done.
Delta compression using up to 8 threads.
Compressing objects: 100% (7/7), done.
Writing objects: 100% (7/7), 68.86 KiB | 6.89 MiB/s, done.
Total 7 (delta 2), reused 0 (delta 0)
remote: Compressing source files... done.
remote: Building source:
remote:
remote: -----> Node.js app detected
remote:
remote: -----> Build failed
remote:  !     Two different lockfiles found: package-lock.json and yarn.lock
remote:
remote:        Both npm and yarn have created lockfiles for this application,
remote:        but only one can be used to install dependencies. Installing
remote:        dependencies using the wrong package manager can result in missing
remote:        packages or subtle bugs in production.
remote:
remote:        - To use npm to install your application's dependencies please delete
remote:          the yarn.lock file.
remote:
remote:          $ git rm yarn.lock
remote:
remote:        - To use yarn to install your application's dependences please delete
remote:          the package-lock.json file.
remote:
remote:          $ git rm package-lock.json
remote:     
remote:        https://kb.heroku.com/why-is-my-node-js-build-failing-because-of-conflicting-lock-files
remote:
remote:  !     Push rejected, failed to compile Node.js app.
remote:
remote:  !     Push failed
remote: Verifying deploy....
remote:
remote: !	Push rejected to online-code-editor-api.
remote:
To https://git.heroku.com/online-code-editor-api.git
 ! [remote rejected] master -> master (pre-receive hook declined)
error: failed to push some refs to 'https://git.heroku.com/online-code-editor-api.git'
```
Error occurs, we need to decide whether to use `npm` or `yarn` to manage dependencies. Notice that when the React App was created, both yarn lock file `yarn.lock` and npm lock file `package-lock.json` were generated. I decide to use npm, so remove yarn.lock from git staging and try to push again.
```sh
$ git rm yarn.lock
rm 'yarn.lock'
git commit -m "remove yarn.lock"
[master 7944b7d] remove yarn.lock
 1 file changed, 7423 deletions(-)
 delete mode 100644 yarn.lock
$ git push heroku master
```
4) Testing Server  
Open web browser, access 'https://online-code-editor-api.herokuapp.com/api/file/Java'. The API is working now.
![image](/public/tutorials/370/api.png)

### 3.2 Client
1) Build react app.
```sh
$ npm run build
```
The React app is built and exported to dist folder. All are static files(html, js and images).
![image](/public/tutorials/370/build.png){:width="800px"}  
2) Create App on Heroku
```sh
$ heroku create online-code-editor
```
3) Create git repository.
```sh
$ cd dist
$ git init
$ git add .
$ git commit -m "initial"
$ git push heroku master
```
If you changed the app name or you are deploying new changes. You need to re-connect your git repository to Heroku app.
```sh
$ git remote rm heroku
$ heroku git:remote -a online-code-editor
```
4) Testing Server  
Open web browser, access 'https://online-code-editor.herokuapp.com/'. The React app is working now.
![image](/public/tutorials/370/client.png)
* Notice, because the Client Side Routing doesn't work properly, I changed to the router rules to show editor in the root path /.

## 4. Heroku UI
### 4.1 Dashboard
Log into Heroku and go to https://dashboard.heroku.com/. The dashboard shows all the app we have created.
![image](/public/tutorials/370/dashboard.png)
### 4.2 Overview
Click one of the app and check the overview.
![image](/public/tutorials/370/overview.png)
### 4.3 Deploy
In the deploy tab, notice that we can connect GitHub and deploy projects.
![image](/public/tutorials/370/deploy.png)

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
