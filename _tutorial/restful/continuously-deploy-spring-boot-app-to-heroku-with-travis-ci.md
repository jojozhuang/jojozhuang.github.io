---
layout: tutorial
key: tutorial
title: "Continuously Deploy Spring Boot App to Heroku with Travis-CI"
index: 158
category: restful
image: restfulapi.png
date: 2016-07-08
postdate: 2018-08-10
tags: [Heroku, Travis CI]
---

> Introduce how to deploy Spring Boot RESTful API to Heroku with Travis-CI.

## 1. Spring Boot
### 1.1 Source Files
Download the source files for this Spring Boot app. Create your own repository on GitHub and submit this project.
```sh
git clone https://github.com/jojozhuang/restful-api-springboot.git
```
### 1.2 Procfile
To teach Heroku how to deploy the app correctly, create a new file with name `Procfile` in the root path of our project. Submit this file to GitHub.
```sh
web: java $JAVA_OPTS -Dserver.port=$PORT -jar target/*.jar -Dspring.profiles.active=prod
```
### 1.3 Travis Config File
Create a file named '.travis.yml' in the root folder. Submit this file to GitHub as well.
```yml
language: java
jdk:
 - oraclejdk8
deploy:
  provider: heroku
  api-key:
    secure: $HEROKU_API_KEY
  app: gamestore-api
```

## 2. Heroku
Login to Heroku, go to 'Account settings', copy the 'API Key'.
![image](/public/tutorials/158/heroku_apikey.png)  

## 3. Travis
Login to https://travis-ci.com/, then go to 'Profile', click 'Manage repositories on GitHub'.
![image](/public/tutorials/158/travis_profile.png)
You will be navigated to GitHub, select 'restful-api-springboot' and save.
![image](/public/tutorials/158/github_add_repository.png)
Go back to Travis, refresh, 'restful-api-springboot' is integrated to Travis.
![image](/public/tutorials/158/travis_add_repository.png)
Click the 'Settings' of the new repository. Keep the default settings for 'General' and 'Auto Cancellation'.
![image](/public/tutorials/158/travis_settings.png)
In the 'Environment Variables' section, paste your Heroku API Key in the field ‘Value’ and name it 'HEROKU_API_KEY', click 'Add' button.
![image](/public/tutorials/158/travis_environment_variable.png)

## 4. Deployment
Make any change to your Spring Boot app and submit it to Github. Once Travis notice the new submission, it starts to build the app according to the instructions configured in '.travis.yml' file.
![image](/public/tutorials/158/travis_build.png)
If the build is finished successfully, your site is deployed to Heroku.
![image](/public/tutorials/158/travis_deploy.png)  

## 5. Testing
Go to Heroku, you should see the new app in the dashboard.
![image](/public/tutorials/158/heroku_newapp.png)
Click on it, and switch to 'Setting' tab. You should find the link, it is the root url of the RESTful API.
![image](/public/tutorials/158/heroku_link.png)
Access https://gamestore-api.herokuapp.com/api/products in browser, we see it returns data.
![image](/public/tutorials/158/heroku_api.png)

## 6. References
* [Heroku Deployment](https://docs.travis-ci.com/user/deployment/heroku/)
* [Getting started with Spring Boot, Travis and Heroku](https://medium.com/@felippepuhle/getting-started-with-spring-boot-travis-and-heroku-4562a723fd0e)
* [Deploying your Angular app to GitHub Pages using Travis-CI](https://medium.com/angularmedellin/deploying-your-angular-app-to-github-pages-using-travis-ci-baca2e1c30e7)
* [Automatically deploy with Travis CI and Heroku](https://medium.com/@felipeluizsoares/automatically-deploy-with-travis-ci-and-heroku-ddba1361647f)
* [Heroku Deployment](https://docs.travis-ci.com/user/deployment/heroku/)
* [Angular 5 + Travis-CI continuous integration/deployment](https://medium.com/@swanandkeskar/angular-5-travis-ci-continuous-integration-deployment-fe9090f460c5)
* [Angular + Travis CI + Heroku](https://medium.com/@preetham_s/angular-travis-ci-heroku-85038a0bcd73)
* [Continuous Integration for Angular Projects with Travis CI](https://moduscreate.com/blog/continuous-integration-angular-projects-travisci/)
