---
layout: tutorial
key: tutorial
title: "Angular - Getting Started with Angular CLI"
index: 8301
subcategory: angular-tutorial
date: 2018-03-09
tags: [Angular CLI]
---

> Learn to use Angular CLI to develop single page application.

## 1. Angular and Angular CLI
[Angular](https://angular.io/) is a JavaScript framework for building web applications and apps in JavaScript, html, and TypeScript, which is a superset of JavaScript. Angular provides built-in features for animation, http service, and materials which in turn has features such as auto-complete, navigation, toolbar, menus, etc. The code is written in TypeScript, which compiles to JavaScript and displays the same in the browser.

[Angular CLI](https://cli.angular.io/) is a command line interface tool that can create a project, add files, and perform a variety of ongoing development tasks such as testing, bundling, and deployment. Angular CLI makes it easy to start with any Angular project. Angular CLI comes with commands that help us create and start on our project very fast.

## 2. Angular CLI
### 2.1 Installing Angular CLI
Install Angular CLI globally and check the version.
```raw
$ npm install -g angular-cli
$ ng --version
```
### 2.2 Upgrading CLI
Uninstall and install again to upgrade CLI.
```raw
$ npm uninstall -g angular-cli
$ npm cache clean
$ npm install -g angular-cli
```
### 2.3 Common CLI Commands
Useful commands to create angular components, services, etc.
```raw
$ ng g component header // create a new component
$ ng g service product  // create a new service
$ ng g module shared    // create a new module
$ ng g directive sizer  // create a new directive
$ ng g pipe reverse     // create a new pipe
```
### 2.4 Useful CLI Options
When calling the CLI commands, we have following options.
* --flat
* --inline-template
* --inline-style
* --spec false
* --minimal

For example, the following command create new Angular project with inline template and inline style(No additional html and css file).
```raw
$ ng new helloworld --inline-template --inline-style
```

## 3. Starting to Code with CLI
### 3.1 Creating New Project
Generate a new project and skeleton application named 'helloworld' by running the following commands:
```raw
$ ng new helloworld
```
### 3.2 What’s in the Root Folder?

File or Folder     | What It Is
-------------------|-----------------------------------
e2e                | Folder for testing files (more on testing, Karma, and protractor)  
node_modules       | Folder for project node dependencies
src                | Folder for project source code
.editorConfig      | editor configuration file
.gitignore         | git ignore file
angular-cli.json   | CLI configuration file. You change your CLi options in this file
karma-conf.json    | Karma configuration file (more on testing, Karma, and protractor)   
package.json       | node dependencies configuration file
protractor-conf.js | Protractor configuration file (more on testing, Karma, and protractor)
readMe.md          | readme informational file, contains information on CLI commands
tslint.json        | Lint configuration file

### 3.3 CLI-Generated project code
All the source files for the Angular project are located in the folder 'src'.

File or Folder | What It Is
---------------|-------------------
app            | Folder for your application source code files
assets         | Folder for your application image and CSS files
environments   | Folder for configuration files for environments
favicon.ico    | Application icon
index.html     | The htML page for the Angular single page application  
main.ts        | Code to start the application  
styles.css     | Global style definitions
test.ts        | Code to run the application tests
tsconfig.json  | Typescript/compiler configuration file

### 3.4 Bootstrapping
Bootstrapping usually refers to a self-starting process that’s supposed to proceed without external input. In this case, it refers to how an Angular application starts up. This section takes a look at how the starter project bootstraps.

In src/app/app.module.ts, you will see the following line to tell the module to bootstrap with the AppComponent.
```javascript
@NgModule({
     ...
    bootstrap: [AppComponent]
})
```

### 3.5 Angular compilation
An Angular application consists largely of components and their HTML templates. Before the browser can render the application, the components and templates must be converted to executable JavaScript by an Angular compiler.

Angular offers two ways to compile your application:
* Just-in-Time (`JIT`), which compiles your app in the browser at runtime
* Ahead-of-Time (`AOT`), which compiles your app at build time.

JIT compilation is the default when you run the build-only or the build-and-serve-locally CLI commands:
```raw
$ ng build
$ ng serve
```
For AOT compilation, append the `--aot` flags to the build-only or the build-and-serve-locally CLI commands:
```raw
$ ng build --aot
$ ng serve --aot
```
* The `--prod` meta-flag compiles with AOT by default.

### 3.6 WebPack
The Angular CLI uses `Webpack` to transpile, compile, and deploy project code. It also uses the webpack-dev-server as its web server by default.

By default, WebPack configuration file `webpack.config.js` is hidden. The following Angular CLI command makes it available:
```raw
$ ng eject
```
* Be careful, running this command will change the commands in package.json.

## 4. References
* [Official website](https://angular.io/)
* [Ebook: Angular 5 Projects](http://www.allitebooks.in/angular-5-projects/)
* [Angular QuickStart](https://angular.io/guide/quickstart)
* [Get Started with Angular CLI](https://github.com/angular/angular-cli)
* [Angular 4 Tutorial](https://www.tutorialspoint.com/angular4/index.htm)
* [Angular Material](https://material.angular.io/)
* [Angular Components](https://material.angular.io/components/categories)
* [The Ahead-of-Time (AOT) Compile](https://angular.io/guide/aot-compiler)
