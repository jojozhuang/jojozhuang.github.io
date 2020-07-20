---
layout: tutorial
key: tutorial
title: "Continuously Deploy Spring Boot App to Heroku with Travis-CI"
index: 8624
subcategory: restful-api
date: 2018-08-10
tags: [Heroku, Travis CI]
---

> Introduce how to deploy Spring Boot RESTful API to Heroku with Travis-CI.

## 1. Spring Boot
### 1.1 Source Files
Download the source files for this Spring Boot app. Create your own repository on GitHub and submit this project.
```raw
git clone https://github.com/jojozhuang/restful-api-springboot.git
```
### 1.2 Procfile
To teach Heroku how to deploy the app correctly, create a new file with name `Procfile` in the root path of our project. Submit this file to GitHub.
```raw
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
Login to Heroku https://www.heroku.com/, go to Dashboard -> New -> Create new app. Set app name 'gamestore-api', click 'Create app' button.
![image](/assets/images/backend/8624/heroku_createapp.png)
In addition, go to 'Account settings', copy the 'API Key'. We will use it to setup continuous integration on Travis.
![image](/assets/images/backend/8624/heroku_apikey.png)  

**In case, the continuous deployment doesn't work. Try to deploy it to Heroku manually first.**
```raw
cd restful-api-springboot
heroku create gamestore-api
git push heroku master
```

## 3. Travis
Login to https://travis-ci.com/, then go to 'Profile', click 'Manage repositories on GitHub'.
![image](/assets/images/backend/8624/travis_profile.png)
You will be navigated to GitHub, select 'restful-api-springboot' and save.
![image](/assets/images/backend/8624/github_add_repository.png)
Go back to Travis, refresh, 'restful-api-springboot' is integrated to Travis.
![image](/assets/images/backend/8624/travis_add_repository.png)
Click the 'Settings' of the new repository. Keep the default settings for 'General' and 'Auto Cancellation'.
![image](/assets/images/backend/8624/travis_settings.png)
In the 'Environment Variables' section, paste your Heroku API Key in the field ‘Value’ and name it 'HEROKU_API_KEY', click 'Add' button.
![image](/assets/images/backend/8624/travis_environment_variable.png)

## 4. Deployment
Make any change to your Spring Boot app and submit it to Github. Once Travis notice the new submission, it starts to build the app according to the instructions configured in '.travis.yml' file.
![image](/assets/images/backend/8624/travis_build.png)
If the build is finished successfully, your site is deployed to Heroku.
![image](/assets/images/backend/8624/travis_deploy.png)  

## 5. Testing
Go to Heroku, you should see the new app in the dashboard.
![image](/assets/images/backend/8624/heroku_newapp.png)
Click on it, and switch to 'Setting' tab. You should find the link, it is the root url of the RESTful API.
![image](/assets/images/backend/8624/heroku_link.png)
Access https://gamestore-api.herokuapp.com/api/products in browser, we see it returns data.
![image](/assets/images/backend/8624/heroku_api.png)

## 6. References
* [Heroku Deployment](https://docs.travis-ci.com/user/deployment/heroku/)
* [Getting started with Spring Boot, Travis and Heroku](https://medium.com/@felippepuhle/getting-started-with-spring-boot-travis-and-heroku-4562a723fd0e)
* [Automatically deploy with Travis CI and Heroku](https://medium.com/@felipeluizsoares/automatically-deploy-with-travis-ci-and-heroku-ddba1361647f)
