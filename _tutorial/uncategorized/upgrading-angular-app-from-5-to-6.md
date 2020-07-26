---
layout: tutorial
key: tutorial
title: "Upgrading Angular App from 5 to 6"
index: 9717
subcategory: uncategorized
date: 2018-07-05
tags: [Angular]
---

> Upgrade Angular App from 5 to 6

## 1. Angular 5 Vs Angular 6
Angular 6 was released on May 4th, 2018. That is 6 months after its predecessor's (Angular 5) release. The highlights of Angular 6 include the Angular Command Line Interface (CLI), The Component Development KIT (CDK) and the Angular Material package update.

## 2. Upgrade
### 2.1 Upgrade Angular CLI
Update Angular CLI from globally. In my local, Angular CLI is upgraded from 1.7.4 to 6.1.3.
```raw
npm uninstall -g angular-cli
npm cache clean
npm install -g @angular/cli@latest
```
Update Angular CLI dev. Go to the root folder of the Angular project, then run following commands.
```raw
npm uninstall --save-dev angular-cli
npm install --save-dev @angular/cli@latest
npm install
```
### 2.2 Upgrade Angular Core 5 to Angular 6
```raw
ng update @angular/core
```
* Note, after upgrading, `.angular-cli.json` will be deleted, instead, `angular.json` will be created.

Install all related packages.
```raw
npm install
```

## 3. Angular Starter
Use Starter to Create new Project, read details at [Angular Webpack Starter](https://github.com/gdi2290/angular-starter).

## 4. Reference
* [Angular 6 Release vs. Angular 5: New Features and Improvements](https://dzone.com/articles/angular-6-release-vs-angular-5-new-features-and-im)
* [Want to upgrade project from Angular v5 to Angular v6](https://stackoverflow.com/questions/48970553/want-to-upgrade-project-from-angular-v5-to-angular-v6)
* [Error: Local workspace file ('angular.json') could not be found](https://stackoverflow.com/questions/49810580/error-local-workspace-file-angular-json-could-not-be-found)
* [Angular Webpack Starter](https://github.com/gdi2290/angular-starter)
