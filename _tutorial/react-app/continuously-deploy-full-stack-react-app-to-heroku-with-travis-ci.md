---
layout: tutorial
key: tutorial
title: "Continuously Deploy Full Stack React App to Heroku with Travis-CI"
index: 8486
subcategory: react-app
date: 2018-08-11
tags: [Heroku, Travis CI]
---

> Introduce how to deploy Code Editor app to Heroku with Travis-CI.

## 1. CI to Heroku
In the posting [Continuously Deploy Full Stack React App to Heroku and Netlify with Travis-CI]({% link _tutorial/react-app/continuously-deploy-full-stack-react-app-to-heroku-and-netlify-with-travis-ci.md %}), I introduced how to deploy the full stack app(server + client) to Heroku and Netlify. In this posting, we will learn how to continuously deploy this application(both the server and client) to Heroku only with Travis CI. The difficulty here is, our source files of server and client are in the same GitHub repository.
### 1.1 Deployment Target
Use Travis-CI to continuously deploy the full stack app from GitHub to cloud service Heroku. There are two parts of this app.
* './src/server', backend, built with Node.js + Express
* './src/client', frontend, built with React

Our target is to use the same GitHub repository to deploy both the client and server.
* Deploy backend RESTful API to Heroku, which will be hosted via `node src/server/index.js`.
* Deploy frontend React App to Heroku, which will be hosted via `node server.js`.

## 2. Full Stack Project
### 2.1 Source Files
Download the source files for this full stack app. Create your own repository on GitHub and submit this project.
```raw
git clone https://github.com/jojozhuang/code-editor-react.git
```
### 2.2 Engine
In 'package.json', add nodejs and npm version.
```raw
"engines": {
  "node": "9.4.0",
  "npm": "6.9.0"
}
```
### 2.3 Procfile
Heroku apps include a `Procfile` that specifies the commands that are executed by the app on startup. If there is no such file, Heroku will run `npm start` by default. The following setting tells Heroku to start the application with the given command, which will be running the server in our case.
```raw
web: node src/server/index.js
```
### 2.4 Server for React
Create a server with express to host react, the client app.
```javascript
// server.js
const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 12090;

// Run the app by serving the static files in the dist directory
app.use(express.static(`${__dirname  }/dist`));

// If an incoming request uses a protocol other than HTTPS, redirect that request to the same url but with HTTPS
const forceSSL = function () {
  return function (req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(['https://', req.get('Host'), req.url].join(''));
    }
    next();
  };
};

// For all GET requests, send back index.html so that PathLocationStrategy can be used
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

// Instruct the app to use the forceSSL middleware
app.use(forceSSL());

// Start the app by listening on the default Heroku port
app.listen(port, () => {
  console.log('Server is up and running at http://localhost:' + port + '/');
});
```
### 2.5 Travis Config File
In the root folder of the project, create a file named '.travis.yml'. I configured two providers, one is for server, another is for client. Use `after_deploy` event to run a bash script.
```yml
language: node_js
node_js:
  - "9"
sudo: true

branches:
  only:
  - master

deploy:
  # deploy app as api server
  - provider: heroku
    skip_cleanup: true
    api-key:
      secure: $HEROKU_API_KEY
    app: code-editor-api
  # deploy app as front end website
  - provider: heroku
    skip_cleanup: true
    api-key:
      secure: $HEROKU_API_KEY
    app: code-editor-react

after_deploy:
# change settings in Procfile for client
# web: node src/server/index.js
# web: node server.js
- bash ./procfile_upd.sh
```
Details of the above configuration:
* First, Travis compiles the whole project and put the output files to directory '/home/travis/build/jojozhuang/code-editor-react'. You can get the full path through environment variable `TRAVIS_BUILD_DIR`.
* Then, Travis deploys the same output files to different apps configured in `deploy` event. In our case, we have two apps `code-editor-api` and `code-editor-react`.
* When `code-editor-api` is deployed, the content in `Procfile` is still 'web: node src/server/index.js', which tells app `code-editor-api` to start the api server.
* `after_deploy` event is fired each time after build is deployed for each provider. In our case, the content in `Procfile` is updated to 'web: node server.js' after `code-editor-api` is deployed.
* When `code-editor-react` is deployed, the content in `Procfile` is 'web: node server.js', which tells app `code-editor-react` to start the react client.

### 2.6 Bash Script File
Create a file named `procfile_upd.sh` as follows. This bash script is used to update Procfile to make the deployed app to launch the client.
```raw
# Update Procfile from web: node src/server/index.js -> web: node server.js
rm Procfile
touch Procfile
echo 'web: node server.js' > Procfile
```

## 3. Heroku
### 3.1 Create App for Server
Login to Heroku https://www.heroku.com/, go to Dashboard -> New -> Create new app. Set app name 'code-editor-api', click 'Create app' button.
![image](/assets/images/frontend/8486/heroku_createapp.png)
### 3.2 Create App for Client
Create another app with name 'code-editor-react' for hosting React app.
![image](/assets/images/frontend/8486/heroku_create_client.png)
### 3.3 Heroku API Key
Go to 'Account settings', copy the 'API Key'. We will use it to setup continuous integration on Travis.
![image](/assets/images/frontend/8486/heroku_apikey.png)  

## 4. Travis
Login to https://travis-ci.com/, then go to 'Profile', click 'Manage repositories on GitHub' and add 'code-editor-react'.
![image](/assets/images/frontend/8486/travis_add_repository.png)
Click the 'Settings' of the new repository. Keep the default settings for 'General' and 'Auto Cancellation'.
![image](/assets/images/frontend/8486/travis_settings.png)
In the 'Environment Variables' section, paste your Heroku API Key in the field ‘Value’ and name it 'HEROKU_API_KEY', click 'Add' button.
![image](/assets/images/frontend/8486/travis_environment_variable.png)

## 5. Deployment
### 5.1 Triggering Build
Make any change to this app and submit it to Github. Once Travis notice the new submission, it starts to build the app according to the instructions configured in '.travis.yml' file.
![image](/assets/images/frontend/8486/travis_build.png)
If the build is finished successfully, the whole site(server + client) is deployed to Heroku.
![image](/assets/images/frontend/8486/travis_deploy.png)  
### 5.2 Testing Server
Go to Heroku, you should see the new app 'code-editor-api' in the dashboard.
![image](/assets/images/frontend/8486/heroku_newapp.png)
Click on it, and switch to 'Setting' tab. You should find the link, it is the root url of the RESTful API.
![image](/assets/images/frontend/8486/heroku_link.png)
Access https://code-editor-api.herokuapp.com/api/file/java in browser, we see it returns data.
![image](/assets/images/frontend/8486/heroku_api.png)
### 5.3 Testing Client
Access https://code-editor-react.herokuapp.com/, we see the homepage.
![image](/assets/images/frontend/8486/test_home.png)
Click 'Code Editor' button, select javascript and click Run. It works properly.
![image](/assets/images/frontend/8486/test_editor.png)
Though chrome debug tool, we see this React app is calling the RESTful API hosted on Heroku to fetch data.
![image](/assets/images/frontend/8486/test_remoteapi.png)

## 6. References
* [Heroku Deployment](https://docs.travis-ci.com/user/deployment/heroku/)
* [Deploying Node.js Apps on Heroku](https://devcenter.heroku.com/articles/deploying-nodejs)
* [Script deployment](https://docs.travis-ci.com/user/deployment/script/)
* [The Procfile](https://devcenter.heroku.com/articles/procfile)
* [Deploying to Multiple Providers](https://docs.travis-ci.com/user/deployment#deploying-to-multiple-providers)
