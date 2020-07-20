---
layout: tutorial
key: tutorial
title: "First Angular App"
index: 8351
subcategory: angular-app
date: 2017-08-08
tags: [Angular4, Angular CLI]
---

> Build web application with Angular4.

## 1. Angular and Angular CLI
[Angular](https://angular.io/) is a JavaScript framework for building web applications and apps in JavaScript, html, and TypeScript, which is a superset of JavaScript. Angular provides built-in features for animation, http service, and materials which in turn has features such as auto-complete, navigation, toolbar, menus, etc. The code is written in TypeScript, which compiles to JavaScript and displays the same in the browser.

[Angular CLI](https://cli.angular.io/) is a command line interface tool that can create a project, add files, and perform a variety of ongoing development tasks such as testing, bundling, and deployment. Angular CLI makes it easy to start with any Angular project. Angular CLI comes with commands that help us create and start on our project very fast.

## 2. Installing Angular CLI
Install the Angular CLI globally.
```raw
$ npm install -g @angular/cli
```
Check CLI version.
```raw
$ ng --version
```
Update Angular CLI.
```raw
$ npm update -g @angular/cli
```

## 3. Creating New Project
Generate a new project and skeleton application named 'helloworld' by running the following commands:
```raw
$ ng new helloworld
```

Open this project in Visual Studio Code.
![image](/assets/images/frontend/8351/project.png){:width="400px"}  

## 4. Serving the Application
Start the app, server it in web server.
```raw
$ cd helloworld
$ ng serve
```
By default, angular app is served at port 4200. Open web browser access 'http://localhost:4200/'.
![image](/assets/images/frontend/8351/helloworld.png)  

You can make it serve at different port. Open `.angular-cli.json`, add 'serve' underneath 'defaults' as follows. Set the port to '12080'.
```json
"defaults": {
  "serve": {
    "port": 12080,
    "host": "localhost"
  },
  "styleExt": "css",
  "component": {}
}
```
Run 'ng serve' again. Now, this application is served at port '12080'.
![image](/assets/images/frontend/8351/serveport.png)  

## 5. References
* [Official website](https://angular.io/)
* [Angular QuickStart](https://angular.io/guide/quickstart)
* [Get Started with Angular CLI](https://github.com/angular/angular-cli)
* [Angular 4 Tutorial](https://www.tutorialspoint.com/angular4/index.htm)
* [Angular Material](https://material.angular.io/)
* [Angular Components](https://material.angular.io/components/categories)
