---
layout: tutorial
key: tutorial
title: "Continuously Deploy Angular App to GitHub Pages using Travis-CI"
index: 8363
subcategory: angular-app
date: 2018-08-09
tags: [GitHub Pages, Travis CI]
---

> Introduce how to continuously deploy Game Store Angular app to GitHub Page with Travis-CI.

## 1. Angular Project
### 1.1 Source Files
Download the source files for this Angular app. Create your own repository on GitHub and submit this project.
```raw
git clone https://github.com/jojozhuang/game-store-angular.git
```
### 1.2 Travis Config File
Create a file named '.travis.yml' in the root folder. Submit this file to GitHub as well.
```yml
language: node_js
node_js:
  - "8"
dist: trusty
sudo: false

branches:
  only:
  - master

cache:
  directories:
    - node_modules

before_script:
  - npm install -g @angular/cli

install:
  - npm install -g yarn
  - npm install

script:
  - yarn build --base-href https://jojozhuang.github.io/game-store-angular/
deploy:
  provider: pages
  skip_cleanup: true
  keep-history: true
  github_token: $GITHUB_TOKEN
  local_dir: dist/
  on:
    branch: master
```

## 2. GitHub
### 2.1 GitHub Token
Go to 'Settings' -> 'Developer Settings', or access link 'https://github.com/settings/developers' directly, switch to 'Personal access tokens', click 'Generate new token'.
![image](/assets/images/frontend/8363/github_developer_settings.png)
Input description and select scopes. Here, just mark the 'repo' checkbox. Scroll down the page and click 'Generate token' button.
![image](/assets/images/frontend/8363/github_token.png)
Copy the new generated token, we will use it later.
![image](/assets/images/frontend/8363/github_copy_token.png)  

## 3. Travis
Go to https://travis-ci.com/ to sign up with your GitHub account. After login, go to 'Profile'. We see the 'GitHub App Integration' section, click 'Activate' button.
![image](/assets/images/frontend/8363/travis_integration.png)
Grant with GitHub authority, choose the repository you want to integrate, click 'Approve & install' button.
![image](/assets/images/frontend/8363/travis_select_repository.png)
After a while, your GitHub repository is integrated to Travis, click 'Settings'.
![image](/assets/images/frontend/8363/travis_integrated.png)
Keep the default settings for 'General' and 'Auto Cancellation'.
![image](/assets/images/frontend/8363/travis_settings.png)
In the 'Environment Variables' section, paste your GitHub token in the field ‘Value’ and name it ‘GITHUB_TOKEN’, click 'Add' button.
![image](/assets/images/frontend/8363/travis_environment_variable.png)

## 4. Deployment
Make any change to your Angular app and submit it to Github. Once Travis notice the new submission, it starts to build the app according to the instructions configured in '.travis.yml' file.
![image](/assets/images/frontend/8363/travis_build.png)
If the build is finished successfully, your site is deployed to GitHub page.
![image](/assets/images/frontend/8363/travis_deploy.png)  

## 5. Testing
Go to your GitHub repository, there will be one more branch named 'gh-pages'.
![image](/assets/images/frontend/8363/github_gh_pages.png)
Go to 'Settings', scroll down the page to 'GitHub Pages', you should see the link, click on it.
![image](/assets/images/frontend/8363/github_page_link.png)
The Angular app is live in the GitHub page.
![image](/assets/images/frontend/8363/gamestore_home.png)
It works properly, wee see the products.
![image](/assets/images/frontend/8363/gamestore_list.png)  

## 6. References
* [Heroku Deployment](https://docs.travis-ci.com/user/deployment/heroku/)
* [GitHub Pages Deployment](https://docs.travis-ci.com/user/deployment/pages/)
* [Deploying your Angular app to GitHub Pages using Travis-CI](https://medium.com/angularmedellin/deploying-your-angular-app-to-github-pages-using-travis-ci-baca2e1c30e7)
* [Automatically deploy with Travis CI and Heroku](https://medium.com/@felipeluizsoares/automatically-deploy-with-travis-ci-and-heroku-ddba1361647f)
