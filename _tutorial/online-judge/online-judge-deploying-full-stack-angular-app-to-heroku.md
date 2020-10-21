---
layout: tutorial
key: tutorial
title: "Online Judge - Deploying Full Stack Angular App to Heroku"
index: 9041
subcategory: online-judge
date: 2018-08-02
tags: [Angular, Heroku]
---

> Deploy online judge app built with Angular and Express to Heroku.

## 1. Full Stack App
In the posting [Online Judge - Building Web App with MEAN Stack]({% link _tutorial/online-judge/online-judge-building-web-app-with-mean-stack.md %}), I introduced how to build an online judge system with [Angular](https://angular.io/) and [ExpressJS](https://expressjs.com/). In this tutorial, I will introduce how to deploy both the front end(Implemented with Angular) and the backend(Implemented with express) to [Heroku](https://www.heroku.com/). We will create two sites on Heroku. One is for the Angular app and another is for the express app.
### 1.1 Deployment Preparation for API Server
Edit './server/config/server-config.js'.
```javascript
//mongodb_url: "mongodb://stage_dev:abc123@ds163781.mlab.com/onlinejudge_dev",
//mongodb_url: "mongodb://stage_user:abc123@ds121248.mlab.com:21248/onlinejudge_stage",

const env = process.env.NODE_ENV; // 'local', 'dev', 'stage'

const local = {
  app: {
    port: parseInt(process.env.PORT) || 5000,
    request_delay: 1, // unit: seconds, 0: no delay
    temp_directory: "compiler/temp/uploads",
    cors_client_url: "http://localhost:12080"
  },
  db: {
    host: process.env.LOCAL_DB_HOST || "testuser:abc123@localhost",
    port: parseInt(process.env.LOCAL_DB_PORT) || 27017,
    name: process.env.LOCAL_DB_NAME || "onlinejudge"
  }
};
const dev = {
  app: {
    port: parseInt(process.env.PORT) || 5000,
    request_delay: 0, // unit: seconds, 0: no delay
    temp_directory: "compiler/temp/uploads",
    cors_client_url: "http://localhost:12080"
  },
  db: {
    host: process.env.DEV_DB_HOST || "dev_user:abc123@ds163781.mlab.com",
    port: parseInt(process.env.DEV_DB_PORT) || 63781,
    name: process.env.DEV_DB_NAME || "onlinejudge_dev"
  }
};
const stage = {
  app: {
    port: parseInt(process.env.PORT) || 5000,
    request_delay: 0, // unit: seconds, 0: no delay
    temp_directory: "compiler/temp/uploads",
    cors_client_url: "http://localhost:12080"
  },
  db: {
    host: process.env.STAGE_DB_HOST || "stage_user:abc123@ds121248.mlab.com",
    port: parseInt(process.env.STAGE_DB_PORT) || 21248,
    name: process.env.STAGE_DB_NAME || "onlinejudge_stage"
  }
};
const production = {
  app: {
    port: parseInt(process.env.PORT) || 5000,
    request_delay: 0, // unit: seconds, 0: no delay
    temp_directory: "compiler/temp/uploads",
    cors_client_url: "http://localhost:12080"
  },
  db: {
    // WARNING: DO NOT MAINTAIN PRODUCTION DATABASE INFORMATION HERE
    host: process.env.PROD_DB_HOST,
    port: parseInt(process.env.PROD_DB_PORT),
    name: process.env.PROD_DB_NAME
  }
};

const config = {
  local,
  dev,
  stage,
  production
};

module.exports = config[env];
```
Edit './server/models/mongodb.js', use the config file to get DB connection url. Notice that if it's in 'production' mode, we will directly use 'MONGOLAB_URI' environment variable.
```javascript
const config = require("../config/server-config");

// mongodb url
const { db: { host, port, name } } = config;
var dbURI = `mongodb://${host}:${port}/${name}`;
if (process.env.NODE_ENV === "production") {
  dbURI = process.env.MONGOLAB_URI;
}
console.log("dbURI:", dbURI);
mongoose.connect(dbURI);
```
### 1.2 Deployment Preparation for Angular
Edit './src/environments/environment.prod.ts'
```typescript
export const environment = {
  production: true,
  http_timeout: 150, //unit: seconds, 0: no timeout
  apiUrl: "https://online-judge-api.herokuapp.com/"
};
```
Edit './src/environments/environment.ts'
```typescript
export const environment = {
  production: false,
  http_timeout: 10, //unit: seconds, 0: no timeout
  apiUrl: "http://localhost:5000/"
};
```
When calling remote API, we always get the api URL from environment. For example, edit './src/app/services/question.service.ts'.
```typescript
import { environment } from "../../environments/environment";

...

@Injectable()
export class QuestionService {
  //URL for CRUD operations
  baseUrl = environment.apiUrl;
  apiUrl = this.baseUrl + "api/admin/question";

  //Create constructor to get Http instance
  constructor(private http: HttpClient) {}
  //Fetch all questions
  getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(this.apiUrl);
  }
  //Create question
  //Create question
  createQuestion(question: Question): Observable<any> {
    return this.http
      .post(this.apiUrl, question, { observe: "response" })
      .map(res => res.status);
  }

  ...

}
```
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
### 3.1 Server
1) Clone Source Code
```raw
$ git clone https://github.com/jojozhuang/online-judge-mean.git
$ cd online-judge-mean
```
2) Create App on Heroku
```raw
$ heroku create online-judge-api
Creating ⬢ online-judge-api... done
https://online-judge-api.herokuapp.com/ | https://git.heroku.com/online-judge-api.git
```
* When creating an app, a git remote (called heroku) is also created and associated with the local git repository.

*update*
For existing git repository(remote is set to github)
```raw
cd leetcode-algorithm-mean
# Clear the link to the origin repository
git remote rm origin
# Link the local repository to the newly created NEW repository.  
git remote add origin https://git.heroku.com/leetcode-algorithm-api.git
# Push all the branches and tags to remote.
git push origin --all
```
3) Push files to Heroku
```raw
$ git push heroku master
Counting objects: 307, done.
Delta compression using up to 8 threads.
Compressing objects: 100% (296/296), done.
Writing objects: 100% (307/307), 341.26 KiB | 6.20 MiB/s, done.
Total 307 (delta 44), reused 0 (delta 0)
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
remote:        > uws@9.14.0 install /tmp/build_ad54de2eed96e8d35c4d879c71ee910b/node_modules/uws
remote:        > node-gyp rebuild > build_log.txt 2>&1 || exit 0
remote:        
remote:        
remote:        > node-sass@4.9.0 install /tmp/build_ad54de2eed96e8d35c4d879c71ee910b/node_modules/node-sass
remote:        > node scripts/install.js
remote:        
remote:        Downloading binary from https://github.com/sass/node-sass/releases/download/v4.9.0/linux-x64-57_binding.node
remote:        Download complete
remote:        Binary saved to /tmp/build_ad54de2eed96e8d35c4d879c71ee910b/node_modules/node-sass/vendor/linux-x64-57/binding.node
remote:        Caching binary to /tmp/npmcache.2z7og/node-sass/4.9.0/linux-x64-57_binding.node
remote:        
remote:        > sleep@5.1.1 install /tmp/build_ad54de2eed96e8d35c4d879c71ee910b/node_modules/sleep
remote:        > node-gyp rebuild
remote:        
remote:        make: Entering directory '/tmp/build_ad54de2eed96e8d35c4d879c71ee910b/node_modules/sleep/build'
remote:        CXX(target) Release/obj.target/node_sleep/sleep.o
remote:        SOLINK_MODULE(target) Release/obj.target/node_sleep.node
remote:        COPY Release/node_sleep.node
remote:        make: Leaving directory '/tmp/build_ad54de2eed96e8d35c4d879c71ee910b/node_modules/sleep/build'
remote:        
remote:        > uglifyjs-webpack-plugin@0.4.6 postinstall /tmp/build_ad54de2eed96e8d35c4d879c71ee910b/node_modules/webpack/node_modules/uglifyjs-webpack-plugin
remote:        > node lib/post_install.js
remote:        
remote:        
remote:        > node-sass@4.9.0 postinstall /tmp/build_ad54de2eed96e8d35c4d879c71ee910b/node_modules/node-sass
remote:        > node scripts/build.js
remote:        
remote:        Binary found at /tmp/build_ad54de2eed96e8d35c4d879c71ee910b/node_modules/node-sass/vendor/linux-x64-57/binding.node
remote:        Testing binary
remote:        Binary is fine
remote:        
remote:        > nodemon@1.17.5 postinstall /tmp/build_ad54de2eed96e8d35c4d879c71ee910b/node_modules/nodemon
remote:        > node bin/postinstall || exit 0
remote:        
remote:        Love nodemon? You can now support the project via the open collective:
remote:        > https://opencollective.com/nodemon/donate
remote:        
remote:        added 1544 packages in 58.653s
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
remote:  !     This app may not specify any way to start a node process
remote:        https://devcenter.heroku.com/articles/nodejs-support#default-web-process-type
remote:
remote: -----> Discovering process types
remote:        Procfile declares types     -> (none)
remote:        Default types for buildpack -> web
remote:
remote: -----> Compressing...
remote:        Done: 98.1M
remote: -----> Launching...
remote:        Released v3
remote:        https://online-judge-api.herokuapp.com/ deployed to Heroku
remote:
remote: Verifying deploy... done.
To https://git.heroku.com/online-judge-api.git
 * [new branch]      master -> master
Johnny@Johnny-Mac:~$
```
4) Add MongoDB URL  
Login to Heroku, go to Settings, click 'Reveal Config Vars' button. Add new Key: MONGOLAB_URI and Value: Your MongoDB link.
![image](/assets/images/online-judge/9041/configvar.png)
5) Testing Server  
Open web browser, access 'https://online-judge-api.herokuapp.com/api/'. The API is working now.
```raw
{"message":"Hello! welcome to our api!"}
```
![image](/assets/images/online-judge/9041/api.png){:width="650px"}  
If you access https://online-judge-api.herokuapp.com/api/submission/questions, you should get all reqestions in json format.
![image](/assets/images/online-judge/9041/questionsjson.png)
### 3.2 Client
1) Build Angular app.
```raw
$ npm run build
```
The Angular app is built and exported to dist folder. All are static files(html, js and images).
![image](/assets/images/online-judge/9041/build.png){:width="800px"}  
2) Create App on Heroku
```raw
$ heroku create online-judge-mean
```
3) Create git repository.
```raw
$ cd dist
$ git init
$ git add .
$ git commit -m "initial"
$ git push heroku master
Counting objects: 151, done.
Delta compression using up to 8 threads.
Compressing objects: 100% (102/102), done.
Writing objects: 100% (151/151), 2.37 MiB | 697.00 KiB/s, done.
Total 151 (delta 11), reused 0 (delta 0)
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
remote: !	Push rejected to online-judge-mean.
remote:
To https://git.heroku.com/online-judge-mean.git
 ! [remote rejected] master -> master (pre-receive hook declined)
error: failed to push some refs to 'https://git.heroku.com/online-judge-mean.git'
```
Error occurs, Heroku is not able to determine the language of the app. Actually, it is just a static web site since we compile the Angular app. The solution is: rename './dist/index.html' to './dist/index.php'. Then, push again.
```raw
Johnny@Johnny-Mac:~$ git init
Reinitialized existing Git repository in /Users/Johnny/GitHub/online-judge-mean/dist/.git/
Johnny@Johnny-Mac:~$ git add .
Johnny@Johnny-Mac:~$ git commit -m "initial"
[master be554ec] initial
 1 file changed, 0 insertions(+), 0 deletions(-)
 rename index.html => index.php (100%)
Johnny@Johnny-Mac:~$ git push heroku master
Counting objects: 153, done.
Delta compression using up to 8 threads.
Compressing objects: 100% (104/104), done.
Writing objects: 100% (153/153), 2.37 MiB | 714.00 KiB/s, done.
Total 153 (delta 12), reused 0 (delta 0)
remote: Compressing source files... done.
remote: Building source:
remote:
remote: -----> PHP app detected
remote:
remote:  !     WARNING: No 'composer.json' found!
remote:  !     
remote:  !     Your project only contains an 'index.php', no 'composer.json'.
remote:  !     
remote:  !     Using 'index.php' to declare app type as PHP is deprecated and
remote:  !     may lead to unexpected behavior.
remote:  !     
remote:  !     Please consider updating your codebase to utilize Composer and
remote:  !     modern dependency management in order to benefit from the latest
remote:  !     PHP runtimes and improved application performance, as well as
remote:  !     control over the PHP versions and extensions available.
remote:  !     
remote:  !     For an introduction to dependency management with Composer and
remote:  !     how to get the most out of PHP on Heroku, refer to the docs at
remote:  !     https://getcomposer.org/doc/00-intro.md and
remote:  !     https://devcenter.heroku.com/articles/getting-started-with-php
remote:
remote: -----> Bootstrapping...
remote: -----> Installing platform packages...
remote:        NOTICE: No runtime required in composer.lock; using PHP ^5.5.17
remote:        - nginx (1.8.1)
remote:        - php (5.6.37)
remote:        - apache (2.4.34)
remote: -----> Installing dependencies...
remote:        Composer version 1.6.5 2018-05-04 11:44:59
remote: -----> Preparing runtime environment...
remote:        NOTICE: No Procfile, using 'web: heroku-php-apache2'.
remote: -----> Checking for additional extensions to install...
remote: -----> Discovering process types
remote:        Procfile declares types -> web
remote:
remote: -----> Compressing...
remote:        Done: 16.2M
remote: -----> Launching...
remote:        Released v3
remote:        https://online-judge-mean.herokuapp.com/ deployed to Heroku
remote:
remote: Verifying deploy... done.
To https://git.heroku.com/online-judge-mean.git
 * [new branch]      master -> master
```
The push is successful.

If you changed the app name or you are deploying new changes. You need to re-connect your git repository to Heroku app.
```raw
$ git remote rm heroku
$ heroku git:remote -a online-judge-mean
```
4) Testing Client  
Open web browser, access 'https://online-judge-mean.herokuapp.com/'. The Angular app is working now.
![image](/assets/images/online-judge/9041/home.png)
Click on the 'Questions' menu.
![image](/assets/images/online-judge/9041/questions.png)
Go to the question details.
![image](/assets/images/online-judge/9041/question.png)

## 4. Reference
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
