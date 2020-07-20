---
layout: tutorial
key: tutorial
title: "Continuously Deploy Angular App to Heroku using Travis-CI"
index: 8366
subcategory: angular-app
date: 2019-05-27
tags: [Heroku, Travis CI]
---

> Introduce how to continuously deploy Game Store Angular app to Heroku with Travis-CI.

## 1. Angular Project
### 1.1 Source Files
Download the source files for this Angular app. Create your own repository on GitHub and submit this project.
```raw
git clone https://github.com/jojozhuang/game-store-angular.git
```
### 1.2 Express Server
We will use express to serve our angular app in heroku. Check the posting [Deploying Angular App to Heroku with Express Server]({% link _tutorial/angular-app/deploying-angular-app-to-heroku-with-express-server.md %}) to make the required changes to Angular app.
### 1.3 Travis Config File
Create a file named '.travis.yml' in the root folder. Submit this file to GitHub as well.
```yml
language: node_js
node_js:
  - "9"
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
  app: game-store-angular
```

## 2. Travis
Go to https://travis-ci.com/ to sign up with your GitHub account. After login, go to 'Profile'. We see the 'GitHub App Integration' section, click 'Activate' button.
![image](/assets/images/frontend/8366/travis_integration.png)
Grant with GitHub authority, choose the repository you want to integrate, click 'Approve & install' button.
![image](/assets/images/frontend/8366/travis_select_repository.png)
After a while, your GitHub repository is integrated to Travis, click 'Settings'.
![image](/assets/images/frontend/8366/travis_integrated.png)
Keep the default settings for 'General' and 'Auto Cancellation'.
![image](/assets/images/frontend/8366/travis_settings.png)
In the 'Environment Variables' section, paste your GitHub token in the field ‘Value’ and name it ‘GITHUB_TOKEN’, click 'Add' button.
![image](/assets/images/frontend/8366/travis_environment_variable.png)

## 3. Deployment
Make any change to your Angular app and submit it to Github. Once Travis notice the new submission, it starts to build the app according to the instructions configured in '.travis.yml' file.
![image](/assets/images/frontend/8366/travis_build.png)
If the build is finished successfully, your site is deployed to GitHub page.
![image](/assets/images/frontend/8366/travis_deploy.png)  

If you see below error, remove the cache settings in traivs.yml.
```raw
The command "eval npm ci  " failed 3 times.
The command "npm ci " failed and exited with 127 during .
```
![image](/assets/images/frontend/8366/module_error.png)

## 4. Testing
Open web browser, access 'https://game-store-angular.herokuapp.com/'. The Angular app is working now.
![image](/assets/images/frontend/8366/gamestore_home.png)
It works properly, wee see the products.
![image](/assets/images/frontend/8366/gamestore_list.png)  

## 5. References
* [Heroku Deployment](https://docs.travis-ci.com/user/deployment/heroku/)
* [Automatically deploy with Travis CI and Heroku](https://medium.com/@felipeluizsoares/automatically-deploy-with-travis-ci-and-heroku-ddba1361647f)
* [Deploying Node.js Apps on Heroku](https://devcenter.heroku.com/articles/deploying-nodejs)
* [Script deployment](https://docs.travis-ci.com/user/deployment/script/)
* [The Procfile](https://devcenter.heroku.com/articles/procfile)
* [Deploying to Multiple Providers](https://docs.travis-ci.com/user/deployment#deploying-to-multiple-providers)
