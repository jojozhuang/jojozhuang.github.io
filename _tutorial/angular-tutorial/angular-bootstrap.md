---
layout: tutorial
key: tutorial
title: "Angular - Bootstrap"
index: 8316
subcategory: angular-tutorial
date: 2018-03-15
tags: [Bootstrap]
---

> Learn to use Bootstrap in Angular application.

## 1. Bootstrap
[Bootstrap](https://getbootstrap.com/) is an open source group of tools that has HTML and CSS design templates for interface elements like forms, buttons, typography, and navigation, plus optional JavaScript extensions. Bootstrap makes developing dynamic websites and web applications easier.

## 2. Bootstrap in Angular
There are two projects which rebuild the Bootstrap components for Angular.
* ng-bootstrap - https://github.com/ng-bootstrap/ng-bootstrap
* ngx-bootstrap - https://github.com/valor-software/ngx-bootstrap

The main differences are around which version of Bootstrap they support.
* ngx-bootstrap supports Bootstrap 3 and 4.
* ng-bootstrap supports Bootstrap 4 and requires Angular 5+.

This means that if you need to use Bootstrap version 3, then ngx-bootstrap is your only real option of the two. If you can use Bootstrap 4, then you can pick between the two projects.

## 3. Installing ngx-bootstrap
Run the following command to install ngx-bootstrap and Bootstrap 3.3.7. If you want to use Bootstrap 4, do not specify the version.
```raw
$ npm install --save ngx-bootstrap
$ npm install --save bootstrap@3.3.7
```
Edit `.angular-cli.json`, add bootstrap.min.css to styles.
```javascript
"styles": [
  "../node_modules/bootstrap/dist/css/bootstrap.min.css",
  "styles.css"
],
```

## 4. Using BootStrap
Edit module file `app.module.ts` and specify the modules you will use as import. Here, we want to use Alert and Modal, so import both two modules.
```typescript
import { AlertModule, ModalModule } from "ngx-bootstrap";

...

imports: [
    BrowserModule,
    AlertModule.forRoot(),
    ModalModule.forRoot()
],
```
In the html, use Alert as usual.
{% raw %}
```raw
<div class="alert alert-success alert-dismissible">
  <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
  <strong>Success!</strong> {{message}}
</div>
```
{% endraw %}

## 5. References
* [What is the difference between “ng-bootstrap” and “ngx-bootstrap”?](https://stackoverflow.com/questions/43758400/what-is-the-difference-between-ng-bootstrap-and-ngx-bootstrap)
* [Bootstrap 3 Vs Bootstrap 4 : What’s New?](https://www.bootstrapdash.com/bootstrap-3-vs-4/)
