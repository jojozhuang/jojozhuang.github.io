---
layout: tutorial
key: tutorial
title: "Online Judge - Continuously Deploy MEAN Stack App to Heroku and Netlify with Travis-CI"
index: 9042
subcategory: online-judge
date: 2018-08-11
tags: [Heroku, Travis CI, Netlify]
---

> Deploy online judge app built with Angular and Express to Heroku and Netlify with Travis-CI.

## 1. MEAN Stack Project
### 1.1 Source Files
Download the source files for this mean stack app. Create your own repository on GitHub and submit this project.
```raw
git clone https://github.com/jojozhuang/online-judge-mean.git
```
### 1.2 Deployment Target
Use Travis-CI to continuously deploy the full stack app from GitHub to cloud service Heroku and Netlify. There are two parts of this app.
* './server', backend, built with Node.js + Express
* './src', frontend, built with Angular

Our target is to use the same GitHub repository to deploy both the client and server.
* Deploy backend RESTful API to Heroku.
* Deploy frontend Angular App to Netlify.

## 2. Server Deployment
### 2.1 Commands
In 'package.json', notice there is a command named 'start', which is used to launch the express server. Also, notice the 'test' command. It is empty as we don't need any testing for this app. Do not specify 'exit 1' in the end of this command. Otherwise, the deployment will fail.
```raw
...
  "scripts": {
    "start": "NODE_ENV=production node ./server/server",
    ...
    "test": "echo \"Error: no test specified\"",
  }
```
### 2.2 Travis Config File
In the root folder of the project, create a file named '.travis.yml'. Notice the app name is 'online-judge-api'. Submit this file to GitHub. It will be used for deploying the RESTful API(server).
```yml
language: node_js
node_js:
  - "8"
sudo: false

branches:
  only:
  - master

cache:
  directories:
    - node_modules

deploy:
  provider: heroku
  skip_cleanup: true
  keep-history: true
  api-key:
    secure: $HEROKU_API_KEY
  app: online-judge-api
```
### 2.3 Heroku
Login to Heroku https://www.heroku.com/, go to Dashboard -> New -> Create new app. Set app name 'online-judge-api', click 'Create app' button.
![image](/assets/images/online-judge/9042/heroku_createapp.png)
Then, go to Settings, click 'Reveal Config Vars' button. Add new Key: MONGOLAB_URI and Value: Your MongoDB link.
![image](/assets/images/online-judge/9042/heroku_configvar.png)
In addition, go to 'Account settings', copy the 'API Key'. We will use it to setup continuous integration on Travis.
![image](/assets/images/online-judge/9042/heroku_apikey.png)  
### 2.4 Travis
Login to https://travis-ci.com/, then go to 'Profile', click 'Manage repositories on GitHub' and add 'online-judge-mean'.
![image](/assets/images/online-judge/9042/travis_add_repository.png)
Click the 'Settings' of the new repository. Keep the default settings for 'General' and 'Auto Cancellation'.
![image](/assets/images/online-judge/9042/travis_settings.png)
In the 'Environment Variables' section, paste your Heroku API Key in the field ‘Value’ and name it 'HEROKU_API_KEY', click 'Add' button.
![image](/assets/images/online-judge/9042/travis_environment_variable.png)
### 2.5 Push
Make any change to this MEAN app and submit it to Github. Once Travis notice the new submission, it starts to build the app according to the instructions configured in '.travis.yml' file.
![image](/assets/images/online-judge/9042/travis_build.png)
If the build is finished successfully, the RESTful API service is deployed to Heroku.
![image](/assets/images/online-judge/9042/travis_deploy.png)  
### 2.6 Testing Server
Go to Heroku, you should see the new app 'online-judge-api' in the dashboard.
![image](/assets/images/online-judge/9042/heroku_newapp.png)
Click on it, and switch to 'Setting' tab. You should find the link, it is the root url of the RESTful API.
![image](/assets/images/online-judge/9042/heroku_link.png)
Access https://online-judge-api.herokuapp.com/api/submission/questions in browser, we see it returns data.
![image](/assets/images/online-judge/9042/heroku_api.png)

## 3. Client Deployment
### 3.1 Build Command
In 'package.json', notice there is a command named 'build', which is used to compile the Angular app and save the output to 'dist' folder.
```raw
...
  "scripts": {
    ...
    "build": "ng build --prod",
    ...
  }
```
### 3.2 Server URL
In './src/environments/environment.prod.ts', set the 'apiUrl' with the root url of the RESTful API, which is already deployed on Heroku.
```javascript
export const environment = {
  production: true,
  http_timeout: 150, //unit: seconds, 0: no timeout
  apiUrl: "https://online-judge-api.herokuapp.com/"
};
```
### 3.3 Netlify
Login to Netlify https://www.netlify.com/ with GitHub account, click 'New site from Git'.
![image](/assets/images/online-judge/9042/netlify_app.png)
Choose 'Github', next.
![image](/assets/images/online-judge/9042/netlify_newsite.png)
Authorize Netlify to access your GitHub account, then choose the repository 'online-judge-mean', next.
![image](/assets/images/online-judge/9042/netlify_repository.png)
Choose `master` for the Branch to deploy, set `npm run build` to the Build command, and set `dist` to the Publish directory, click the 'Deploy site' button.
![image](/assets/images/online-judge/9042/netlify_options.png)
Netlify will start to deploy your site.
![image](/assets/images/online-judge/9042/netlify_inprogress.png)
If no issue occurs, the publish will be done after few seconds(or minutes). Notice the site is given with a random name.
![image](/assets/images/online-judge/9042/netlify_published.png)
Switch to Settings tab, scroll down and click the 'Change site name' button.
![image](/assets/images/online-judge/9042/netlify_settings.png)
Change the name to 'online-judge' and save.
![image](/assets/images/online-judge/9042/netlify_changename.png)
Go back to overview, we see the new site name with the link.
![image](/assets/images/online-judge/9042/netlify_overview.png)
### 3.4 Testing Client
Access https://online-judge.netlify.com/, we see the homepage.
![image](/assets/images/online-judge/9042/test_home.png)
Click 'Questions' button, we see 5 questions are displayed.
![image](/assets/images/online-judge/9042/test_questions.png)
Though chrome debug tool, we see this Angular app is calling the RESTful API hosted on Heroku to fetch data.
![image](/assets/images/online-judge/9042/test_remoteapi.png)

## 4. References
* [Heroku Deployment](https://docs.travis-ci.com/user/deployment/heroku/)
* [Automatically deploy with Travis CI and Heroku](https://medium.com/@felipeluizsoares/automatically-deploy-with-travis-ci-and-heroku-ddba1361647f)
* [Angular 5 + Travis-CI continuous integration/deployment](https://medium.com/@swanandkeskar/angular-5-travis-ci-continuous-integration-deployment-fe9090f460c5)
* [Angular + Travis CI + Heroku](https://medium.com/@preetham_s/angular-travis-ci-heroku-85038a0bcd73)
* [Continuous Integration for Angular Projects with Travis CI](https://moduscreate.com/blog/continuous-integration-angular-projects-travisci/)
