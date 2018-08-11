---
layout: tutorial
key: tutorial
title: "Continuously Deploy React and Socket.IO App to Heroku with Travis-CI"
index: 370
category: reactjs
image: reactjs.png
date: 2017-06-10
postdate: 2018-08-11
tags: [Heroku, Travis CI]
---

> Introduce how to publish the course player app built with react and socket.io to Heroku with continuous deployment.

## 1. React & Socket.IO Project
### 1.1 Source Files
Download the source files for this course player app. Create your own repository on GitHub and submit this project.
```sh
git clone https://github.com/jojozhuang/course-player-react.git
```
### 1.2 Commands
In 'package.json', notice there is a command named 'start', which is used to launch the express server. Also, notice the 'test' command. It is empty as we don't need any testing for this app. Do not specify 'exit 1' in the end of this command. Otherwise, the deployment will fail.
```sh
...
  "scripts": {
    "start": "NODE_ENV=development npm run open:src",
    ...
    "test": "echo \"Error: no test specified\"",
  }
```
### 1.3 Travis Config File
In the root folder of the project, create a file named '.travis.yml'. Notice the app name is 'course-player-react'. Submit this file to GitHub.
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

install:
  - npm install

deploy:
  provider: heroku
  skip_cleanup: true
  keep-history: true
  api-key:
    secure: $HEROKU_API_KEY
  app: course-player-react
```

## 2. Heroku
Login to Heroku https://www.heroku.com/, go to 'Account settings', copy the 'API Key'.
![image](/public/tutorials/370/heroku_apikey.png)  

## 3. Travis
### 3.1 Importing New Repository from GitHub
Login to https://travis-ci.com/, then go to 'Profile', click 'Manage repositories on GitHub' and add 'course-player-react'.
![image](/public/tutorials/370/travis_add_repository.png)
Click the 'Settings' of the new repository. Keep the default settings for 'General' and 'Auto Cancellation'.
![image](/public/tutorials/370/travis_settings.png)
In the 'Environment Variables' section, paste your Heroku API Key in the field ‘Value’ and name it 'HEROKU_API_KEY', click 'Add' button.
![image](/public/tutorials/370/travis_environment_variable.png)
### 3.2 Continuous Deployment
Make any change to this app and submit it to Github. Once Travis notice the new submission, it starts to build the app according to the instructions configured in '.travis.yml' file.
![image](/public/tutorials/370/travis_build.png)
If the build is finished successfully, your site is deployed to Heroku.
![image](/public/tutorials/370/travis_deploy.png)  

## 4. Testing
Go to Heroku, you should see the new app 'course-player-react' in the dashboard.
![image](/public/tutorials/370/heroku_newapp.png)
Click on it, and switch to 'Setting' tab. You should find the link for this app, click on it.
![image](/public/tutorials/370/heroku_link.png)
Now we see the course player.
![image](/public/tutorials/370/test_home.png)
Click the 'Play' button and drag the progress bar, player is working properly.
![image](/public/tutorials/370/test_playing.png)

## 5. References
* [Heroku Deployment](https://docs.travis-ci.com/user/deployment/heroku/)
* [Automatically deploy with Travis CI and Heroku](https://medium.com/@felipeluizsoares/automatically-deploy-with-travis-ci-and-heroku-ddba1361647f)
