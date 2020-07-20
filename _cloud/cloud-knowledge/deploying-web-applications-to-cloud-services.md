---
layout: tutorial
key: cloud
title: "Deploying Web Applications to Cloud Services"
index: 4002
subcategory: cloud-knowledge
date: 2018-08-05
tags: [Heroku, Azure, EC2, Netlify, Travis CI]
---

> Tutorial for how to deploy Angular, React and Node.js applications to cloud services.

## 1. Deployment
### 1.1 Deployment Types
Before deploy your apps, you need to first understand what is the app type.
* Static Sites(built with Angular, React, or other front-end frameworks)
* Server(built with Node Express, ASP.NET, PHP, Python, Spring, etc.)
* Full Stack(including both client and server)

### 1.2 Cloud Services
There are many cloud services where you can deploy angular, react or express applications. Your web applications are served by their servers and can be accessed globally through internet. Some of them provide free cost for hosting your sites. Also, they provide paid options for more advanced features.
* Heroku: https://www.heroku.com/
* Azure: https://portal.azure.com/
* Amazon EC2: https://aws.amazon.com/ec2/
* Netlify(Static sites only): https://www.netlify.com/

## 2. Tutorials for Deployment
### 2.1 Static Sites
Angular or React app will be compiled to static files when these kinds of apps are deployed to server. Even if they may call backend server(eg. RESTful services) to fetch data, they are still static sites from the deployment perspective.
* [Deploying Text Compare Angular App to Netlify]({% link _tutorial/angular-app/deploying-text-compare-angular-app-to-netlify.md %})
* [Deploying Game Store Angular App to Netlify]({% link _tutorial/angular-app/deploying-game-store-angular-app-to-netlify.md %})
* [Deploying Game Store React App to Netlify]({% link _tutorial/react-app/deploying-game-store-react-app-to-netlify.md %})
* [Deploying Game Store React App to Azure with FTP]({% link _tutorial/react-app/deploying-game-store-react-app-to-azure-with-ftp.md %})

### 2.2 Server Sites
In the most of cases, when we are talking about Node.js apps, we are actually talking about Express applications. As every productive Node.js app has a web server and express is the best web server for Node.js.
* [Deploying Socket.IO App to Heroku]({% link _tutorial/react-app/deploying-socketio-app-to-heroku.md %})
* [Deploying Socket.IO App to Azure]({% link _tutorial/react-app/deploying-socketio-app-to-azure.md %})
* [Deploying React and Socket.IO App to Heroku]({% link _tutorial/react-app/deploying-react-and-socketio-app-to-heroku.md %})

### 2.3 Full Stack Sites
We may have the capability to build the entire web application from backend to front end. For example, we use so called MEAN stack (MongoDB+Express+Angular+Node.js) to build an online judge application. In this case, we need to deploy both the client and the server.
* [Online Judge - Deploying Full Stack Angular App to Heroku]({% link _tutorial/online-judge/online-judge-deploying-full-stack-angular-app-to-heroku.md %})
* [Deploying Full Stack React App to Heroku]({% link _tutorial/react-app/deploying-full-stack-react-app-to-heroku.md %})

### 2.4 Three Ways to Deploy Angular App to Heroku
For Angular or React apps, we can deploy them as static websites after build them locally. Or, we can let the server to build and serve them with express server. In addition, we can use Travis to deploy them continuously.
* [Deploying Angular App to Heroku as Static Website]({% link _tutorial/angular-app/deploying-angular-app-to-heroku-as-static-website.md %})
* [Deploying Angular App to Heroku with Express Server]({% link _tutorial/angular-app/deploying-angular-app-to-heroku-with-express-server.md %})
* [Continuously Deploy Angular App to Heroku using Travis-CI]({% link _tutorial/angular-app/continuously-deploy-angular-app-to-heroku-using-travis-ci.md %})

## 3. CI/CD
Continuous integration and continuous delivery.
* [Continuously Deploy Angular App to GitHub Pages using Travis-CI]({% link _tutorial/angular-app/continuously-deploy-angular-app-to-github-pages-using-travis-ci.md %})
* [Continuously Deploy Spring Boot App to Heroku with Travis-CI]({% link _tutorial/restful-api/continuously-deploy-spring-boot-app-to-heroku-with-travis-ci.md %})
* [Continuously Deploy Full Stack React App to Heroku and Netlify with Travis-CI]({% link _tutorial/react-app/continuously-deploy-full-stack-react-app-to-heroku-and-netlify-with-travis-ci.md %})
* [Continuously Deploy React and Socket.IO App to Heroku with Travis-CI]({% link _tutorial/react-app/continuously-deploy-react-and-socketio-app-to-heroku-with-travis-ci.md %})
* [Online Judge - Continuously Deploy MEAN Stack App to Heroku and Netlify with Travis-CI]({% link _tutorial/online-judge/online-judge-continuously-deploy-mean-stack-app-to-heroku-and-netlify-with-travis-ci.md %})
* [Continuously Deploy Full Stack React App to Heroku with Travis-CI]({% link _tutorial/react-app/continuously-deploy-full-stack-react-app-to-heroku-with-travis-ci.md %})

## 4. References
* [Deploying to production](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/deployment)
