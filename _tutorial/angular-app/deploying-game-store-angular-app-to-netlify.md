---
layout: tutorial
key: tutorial
title: "Deploying Game Store Angular App to Netlify"
index: 8362
subcategory: angular-app
date: 2018-07-31
tags: [Netlify]
---

> Introduce how to deploy the Game Store(Angular) app to Netlify.

## 1. Game Store Angular
Get source code.
```raw
git clone https://github.com/jojozhuang/game-store-angular.git
```
## 2. Angular Project
### 2.1 Build Command
Update 'package.json', add '--prod' option to the build command.
```javascript
"build": "ng build --prod",
```
### 2.2 Fixing Error
Edit 'src/main.ts', add `/// <reference types="node" /> ` to the top. It solves the error 'cannot find name require and process'.
```javacript
/// <reference types="node" />
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

...

```
### 2.3 Environment Variable
Edit 'environment.prod.ts', add apiURL with production server api.
```javascript
export const environment = {
  production: true,
  apiUrl: "https://gamestore-api.azurewebsites.net/"
};
```
Edit 'environment.ts', add apiURL with local development api.
```javascript
export const environment = {
  production: false,
  apiUrl: "http://localhost:8080/"
};
```
### 2.4 Using the ENV Variable
Edit 'product.service.ts', update baseUrl with the environment variable.
```javascript
...
import { environment } from '../environments/environment';

@Injectable()
export class ProductService {
  //URL for CRUD operations
  baseUrl = environment.apiUrl;  // no hard code any more
  apiUrl = this.baseUrl + "api/products";
  uploadUrl = this.baseUrl + "api/upload";
  ...
}
```

## 3. Deployment & Test
Follow the steps described in tutorial [Deploying Text Compare Angular App to Netlify]({% link _tutorial/angular-app/deploying-text-compare-angular-app-to-netlify.md %}) to deploy this app to Netlify.

Access https://game-store-angular.netlify.com/ in browser, and click the 'List' button, everything looks fine.
![image](/assets/images/frontend/8362/productlist.png)
However, when trying to create a new product, I got this 'post() map' error.
![image](/assets/images/frontend/8362/maperror.png)
And similar error occurs for put and delete when trying to update and delete product.
```raw
ERROR TypeError: this.http.post(...).map is not a function
ERROR TypeError: this.http.put(...).map is not a function
ERROR TypeError: this.http.delete(...).map is not a function
```
This is because RxJS v5.5.2+ has moved to Pipeable operators to improve tree shaking and make it easier to create custom operators. Now operators need to be combined using the `pipe` method.

## 4. Fixing the Error
Edit 'product.service.ts', change the post method to 'http.post().pipe(map(res => {...}))'

Below are the codes before the fix.
```typescript
import { Observable } from 'rxjs';

...
@Injectable()
export class ProductService {
  //Create product
  createProduct(product: Product): Observable<any> {
    return this.http.post(this.apiUrl, product, {observe: 'response'})
           .map(success => success.status)
  }
  //Update product
  updateProduct(product: Product): Observable<any> {
    return this.http.put(this.apiUrl + "/" + product.id, product, {observe: 'response'})
           .map(success => success.status)
  }
  //Delete product
  deleteProductById(pid: number): Observable<any> {
    return this.http.delete(this.apiUrl +"/"+ pid, {observe: 'response'})
           .map(success => success.status)
  }
}
```
Below are the codes after the fix. We need to add { map } from 'rxjs/operators', and pipe the map method.
```typescript
import { Observable } from 'rxjs/Observable'; // only import the used class to minimize the size
import { map } from 'rxjs/operators';
...
@Injectable()
export class ProductService {
  ...

  //Create product
  createProduct(product: Product): Observable<any> {
    return this.http.post(this.apiUrl, product, {observe: 'response'})
           .pipe(map(success => success.status))
  }
  //Update product
  updateProduct(product: Product): Observable<any> {
    return this.http.put(this.apiUrl + "/" + product.id, product, {observe: 'response'})
           .pipe(map(success => success.status))
  }
  //Delete product
  deleteProductById(pid: number): Observable<any> {
    return this.http.delete(this.apiUrl +"/"+ pid, {observe: 'response'})
           .pipe(map(success => success.status))
  }
}
```
Submit the change to GitHub and deploy the app to Netlify again. The creation, update, deletion operations should work.
![image](/assets/images/frontend/8362/put.png)

## 5. Reference
* [Deploy Angular 6 Application to Netlify](https://medium.com/@geeksamu/deploy-angular-6-application-to-netlify-60b39b9df61c)
* [TS2304: cannot find name require and process](https://stackoverflow.com/questions/42179659/ts2304-cannot-find-name-require-and-process#42588099)
* [Separating production and development HTTP URLs using environment.ts file in Angular](https://medium.com/@balramchavan/separating-production-and-development-http-urls-using-environment-ts-file-in-angular-4c2dd0c5a8b0)
* [TypeError: this.http.post(…).map is not a function after update angular 5 to angular 6](https://stackoverflow.com/questions/50595898/typeerror-this-http-post-map-is-not-a-function-after-update-angular-5-to-a)
* [RxJS: Understanding Lettable Operators](https://blog.angularindepth.com/rxjs-understanding-lettable-operators-fe74dda186d3)
