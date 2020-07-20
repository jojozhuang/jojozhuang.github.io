---
layout: tutorial
key: tutorial
title: "Building Web Application with Angular"
index: 8361
subcategory: angular-app
date: 2017-12-14
tags: [Angular]
---

> Build Game Store app with Angular and Angular CLI.

## 1. Game Store Web Application
Previously, I introduced how to use JSP and MySQL/MongoDB to build web application to manage products. In this tutorial, we will learn how to use Angular and RESTful web service to build such web application.

## 2. Angular Project
[Angular](https://angular.io/) is a JavaScript framework for building web applications and apps in JavaScript, html, and TypeScript, which is a superset of JavaScript. Angular provides built-in features for animation, http service, and materials which in turn has features such as auto-complete, navigation, toolbar, menus, etc.
### 2.1 Creating New Project
In terminal, create new angular app named 'game-store-angular'.
```raw
$ ng new game-store-angular
```
### 2.2 Components
Then, create 5 components.
```raw
$ cd game-store-angular
$ ng g component header
$ ng g component footer
$ ng g component mainpage
$ ng g component productlist
$ ng g component productadd
```
Add following content to 'header.component.html'. We added two buttons linked to Product List page and Product Add page. Use 'routerLink' attribute to achieve the navigation purpose.
```html
<div class="container">
  <h2>Angular 4 Tutorial - Product Management</h2>
  <a class="btn btn-info" routerLink = "productlist">List</a>
  <a class="btn btn-info" routerLink = "productadd">Create</a>
</div>
<hr/>
```
Add following content to 'mainpage.component.html'.
```html
<div class="jumbotron text-center">
  <h1>Game Store - Product Management</h1>
  <p>Built with Angular 4 and Restful APIs(SpringBoot/Asp.Net Core)</p>
</div>
```

Add following content to 'footer.component.html'.
```html
<hr/>
<footer class="container-fluid text-center">
  <p>&copy; 2017 jojozhuang.github.io, All rights reserved.</p>
</footer>
```
### 2.3 Routing
In 'app.module.ts', include the router module and define route array 'Routes'.
```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ProductaddComponent } from './productadd/productadd.component';
import { ProductlistComponent } from './productlist/productlist.component';

const appRoutes: Routes = [
  { path: '', component: MainpageComponent },
  { path: 'mainpage', component: MainpageComponent },
  { path: 'productlist', component: ProductlistComponent },
  { path: 'productadd', component: ProductaddComponent },
  { path: 'productadd/:id', component: ProductaddComponent },
  // otherwise redirect to home
  {path: '**', redirectTo: ''}
];

@NgModule({
  declarations: [
    AppComponent,
    MainpageComponent,
    HeaderComponent,
    FooterComponent,
    ProductaddComponent,
    ProductlistComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
Apply the router by updating ./app/app.component.html with the following content.
```html
<div class="mainpage">
  <app-header></app-header>
  <router-outlet></router-outlet>
  <app-footer></app-footer>
</div>
```
### 2.4 BootStrap CSS
Add bootstrap to the project.
```raw
$ npm install ngx-bootstrap bootstrap --save
```
Open 'angular-cli.json' and insert a new entry into the styles array
```javascript
  "styles": [
    "styles.css",
    "../node_modules/bootstrap/dist/css/bootstrap.min.css"
],
```
### 2.5 Install Material Package
We will use the Alert component provided by Angular. We need to install material package.
```raw
$ npm install --save @angular/material @angular/cdk
```
In 'app.module.ts', inclucde 'AlertModule'.
```typescript
import { AlertModule } from 'ngx-bootstrap';

...

@NgModule({
  ...,

  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    AlertModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
```
### 2.6 Serving at Specified Port
Open `.angular-cli.json`, add 'serve' underneath 'defaults' as follows. This app will be served at port '12080'.
```
"defaults": {
  "serve": {
    "port": 12080,
    "host": "localhost"
  },
  "styleExt": "css",
  "component": {}
}
```
### 2.7 Model Classes
Create file named 'models.ts' in the source root folder './src/app/'. Add two classes. Class ‘Product’ has four properties: id, name, price and a photo of the product. Class 'ResponseResult' has two properties, status code and message.
```typescript
export class Product {
    constructor(
        public id: number,
        public productName: string,
        public price: number,
        public image: string)
    { }
}

export class ResponseResult {
    constructor(
        public statusCode: number,
        public message: string)
    { }
}
```
## 3. Http Service
### 3.1 Http Module
In 'app.module.ts', include http module 'HttpClientModule' for sending http requests to external RESTful web services.
```typescript
import { HttpClientModule } from '@angular/common/http';

...

@NgModule({
  ...,

  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    AlertModule.forRoot(),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
```

### 3.2 Service
Create service for CRUD operations.
```raw
$ ng g service product
```
Two new files 'product.service.specs.ts' and 'product.service.ts' are created in the './src/app/' folder.

### 3.3 Http Service
Edit 'product.service.ts' as follows.
```typescript
import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Product, ResponseResult } from './models';

@Injectable()
export class ProductService {
  //URL for CRUD operations
  //baseUrl = "http://localhost:5000/";
  baseUrl = "http://localhost:8080/";
  apiUrl = this.baseUrl + "api/products";
  uploadUrl = this.baseUrl + "api/upload";

  //Create constructor to get Http instance
  constructor(private http: HttpClient) {
  }
  //Fetch all products
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl)
  }
  //Create product
  createProduct(product: Product): Observable<any> {
    return this.http.post(this.apiUrl, product, {observe: 'response'})
           .map(success => success.status)
  }
  //Fetch product by id
  getProductById(pid: number): Observable<Product> {
    return this.http.get<Product>(this.apiUrl + "/" + pid)
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
  //Upload image
  upload(fileToUpload: any): Observable<ResponseResult> {
    let input = new FormData();
    input.append("file", fileToUpload);

    return this.http.post<ResponseResult>(this.uploadUrl, input)
  }
}
```
The following points need to be noted about the above code.
* Define urls for APIs
* Use the injected HttpClient to send http requests.
* Define 5 CRUD methods(GetAll, GetOne, Create, Update and Delete).
* Use Observable as return type.

Register the http service to NgModule. In 'app.module.ts', add 'ProductService' to 'providers'.
```typescript
import { ProductService } from './product.service';

...

@NgModule({
  ...,

  providers: [ProductService],
  bootstrap: [AppComponent]
})
```

### 3.5 Intercept HTTP Requests
In Angular 4.3 or higher version, you can use HttpInterceptor to intercept and modify HTTP requests globally. In this application, I use it to handle http request error globally. In folder './src/app', create file named 'http.interceptor.ts' with following content.
```typescript
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { _throw } from 'rxjs/observable/throw';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { ResponseResult } from './models';

/**
 * Intercepts the HTTP responses, and in case that an error/exception is thrown, handles it
 * and extract the relevant information of it.
 */
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    /**
     * Intercepts an outgoing HTTP request, executes it and handles any error that could be triggered in execution.
     * @see HttpInterceptor
     * @param request the outgoing HTTP request
     * @param next a HTTP request handler
     */
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add a custom header
        const customReq = request.clone({
            //headers: request.headers.set('Content-Type', 'application/json')
        });
        //return next.handle(request);
        return next.handle(customReq)
            .do((ev: HttpEvent<any>) => {
                console.log(customReq);
                /*if (ev instanceof HttpResponse) {
                    //console.error(ev);
                    //console.log('processing response', ev);
                }*/
            })
            .catch(response => {
                let respResult = new ResponseResult(200, "");
                console.error(response);
                if (response instanceof HttpErrorResponse) {
                    const err = response.message || JSON.stringify(response.error);
                    respResult.statusCode = response.status;
                    respResult.message = `${response.statusText || ''} Details: ${err}`;
                } else {
                    respResult.statusCode = 400
                    respResult.message = response.message ? response.message : response.toString();
                }
                console.error(respResult.message);
                return _throw(respResult);
            });
    }
}

/**
 * Provider POJO for the interceptor
 */
export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};
```
If error is caught, we get the status and error message, then return the ResponseResult object.

Register the customized HttpInterceptor to NgModule. In 'app.module.ts', append 'ErrorInterceptorProvider' to 'providers'.
```typescript
import { ErrorInterceptorProvider } from './http.interceptor';

...

@NgModule({
  ...,

  providers: [ProductService, ErrorInterceptorProvider],
  bootstrap: [AppComponent]
})
```
## 4. Products Management
### 4.1 Product List
Edit 'productlist.component.ts' as follows.
```typescript
import { Component, OnInit } from '@angular/core';
import { ProductService } from './../product.service';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent implements OnInit {

  constructor(private service: ProductService) { }
  products;
  statusCode: number;
  errmsg: string;

  ngOnInit() {
    this.getProducts();
  }
  //Fetch all products
  getProducts() {
    this.service.getProducts().subscribe(
      data => this.products = data,
      error => {this.statusCode = error.statusCode; this.errmsg = error.message});   
    }

  deleteProduct(event) {
    if(window.confirm('Are you sure to delete this product?')){
      //console.log(event.id);
      this.service.deleteProductById(event.id).subscribe(successCode => {
        this.statusCode = successCode;
        this.getProducts();
      },
      error => {this.statusCode = error.statusCode; this.errmsg = error.message});
    }
  }
}
```
The following points need to be noted about the above code.
* Include ProductService for sending http requests to get data.
* Two methods are defined, getProducts() and deleteProduct(event).
* Define a variable 'products' to pass data to html.

Add following content to 'productlist.component.html'.
```html
<div class="container">
  <h2>Products</h2>
  <p>Data from Restful API</p>
  <div *ngIf="statusCode || errmsg">
      <alert *ngIf="statusCode != 200" type="danger">{{errmsg}}</alert>
      <alert *ngIf="statusCode === 200" type="success">Product has been deleted successfully.</alert>
  </div>
  <table class="table">
    <thead>
      <tr>
        <th>Product ID</th>
        <th>Product Name</th>
        <th>Price</th>
        <th>Image</th>
        <th>Operations</th>
      </tr>
    </thead>
    <tbody *ngFor = "let product of products">
        <tr>
          <td>{{product.id}}</td>
          <td>{{product.productName}}</td>
          <td>${{product.price}}</td>
          <td><img src="{{product.image}}" class="img-thumbnail" width="80" height="80"></td>
          <td><a class="btn btn-success" [routerLink]="['/productadd', product.id ]">Edit</a>&nbsp;<a class="btn btn-danger" (click)="deleteProduct({ event:$event, id: product.id })">Delete</a></td>
        </tr>
     </tbody>
  </table>
</div>
```
The following points need to be noted about the above code.
* Define a table to display products.
* Add two buttons for each row for editing or deleting product.
* Show error message if applicable.

### 4.2 Product Add
Edit 'productadd.component.ts' as follows.
```typescript
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ProductService } from './../product.service';

@Component({
  selector: 'app-productadd',
  templateUrl: './productadd.component.html',
  styleUrls: ['./productadd.component.css']
})
export class ProductaddComponent implements OnInit {
  statusCode: number;
  errmsg: string;
  filename: string;
  id;

  //Create form
  productForm = new FormGroup({
    id: new FormControl(""),
    productName: new FormControl("", Validators.compose([
        Validators.required,
        Validators.minLength(3)
    ])),
    price: new FormControl("0", Validators.compose([
        Validators.required,
        Validators.min(0),
        Validators.max(2147483647)
    ])),
    image:new FormControl(this.service.baseUrl+"images/default.png")
  });

  constructor(private service: ProductService, private router: Router, private route: ActivatedRoute) { }
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    //console.log(this.id);
    if (this.id != null) {
      this.service.getProductById(this.id).subscribe(product => {
        //console.log(product);
        this.productForm.setValue({ id: product.id, productName: product.productName, price: product.price, image: product.image });  
      },
      error => {this.statusCode = error.statusCode; this.errmsg = error.message});   
    }
  }

  //Handle create and update product
  onClickSubmit() {
    if (this.productForm.invalid) {
      return; //Validation failed, exit from method.
    }   
      //Form is valid, now perform create or update
    let product = this.productForm.value;
    console.log(product);
    if (product.id == null || product.id == "") {  
      //Create product
      product.id = 0;
      this.service.createProduct(product).subscribe(successCode => {
          this.statusCode = successCode;
          this.router.navigate(['productlist'])
        },
        error => {this.statusCode = error.statusCode; this.errmsg = error.message});
    } else {  
      //Update product
      this.service.updateProduct(product).subscribe(successCode => {
          this.statusCode = successCode;
          this.router.navigate(['productlist'])
        },
        error => {this.statusCode = error.statusCode; this.errmsg = error.message});
    }
  }
}
```
The following points need to be noted about the above code.
* Use FormGroup to transfer data to UI.
* In method 'ngOnInit()', get the product and assign values to form group.
* Method 'onClickSubmit()' handles two operations, create product or update product.

Add following content to 'productadd.component.html'.
```html
<div class="container">
  <h2 *ngIf="!id" >Create New Product</h2>
  <h2 *ngIf="id" >Edit Product</h2>
  <div *ngIf="statusCode">
      <alert *ngIf="statusCode != 200" type="danger">{{errmsg}}</alert>
      <alert *ngIf="statusCode === 200 && !id" type="success">200: Product has been created successfully.</alert>
      <alert *ngIf="statusCode === 200 && id" type="success">200: Product has been updated successfully.</alert>
  </div>
  <form *ngIf="statusCode != 404" class="form-horizontal" [formGroup]="productForm" (ngSubmit) = "onClickSubmit()" >
    <div *ngIf="id" class="form-group" >
      <label class="control-label col-sm-2" for="id">Product ID:</label>
      <div class="col-sm-10">
        <input class="form-control" disabled type="text" name="id" formControlName="id"/>
      </div>
    </div>
    <div class="form-group">
      <label class="control-label col-sm-2" for="name">Product Name:</label>
      <div class="col-sm-10">
        <input class="form-control" placeholder="Enter product name" type="text" name="productName" formControlName="productName"/>
      </div>
    </div>
    <div class="form-group">
      <label class="control-label col-sm-2" for="price">Price:</label>
      <div class="col-sm-10">
          <input class="form-control" placeholder="Enter price" type="text" name="price" formControlName="price"/>
      </div>
    </div>
    <div class="form-group">
      <label class="control-label col-sm-2" for="image">Image:</label>
      <div class="col-sm-10">
          <input type="hidden" name="image" formControlName="image" />
          <img src="{{productForm.value.image}}" #productImage class="img-thumbnail" width="80" height="80">
          <label class="btn btn-success" for="fileSelector">
              <input id="fileSelector" type="file" #fileInput style="display:none"
              (change)="filechanged($event)">
              Choose Image
          </label>
          <span class='label label-info'>{{ filename }}</span>
          <span><button type="button" class="btn btn-primary" (click)="upload()">Upload</button></span>
      </div>
    </div>
    <div class="form-group">
      <div class="col-sm-offset-2 col-sm-10">
        <input type="submit" [disabled] = "!productForm.valid" class="btn btn-primary" value="Save">
      </div>
    </div>
  </form>
</div>
```
The following points need to be noted about the above code.
* For each property of the product, we define a label and input box for it.
* Use productForm to display product if it is in edit mode.
* If Save button is clicked. Function 'onClickSubmit()' will be called.
* Show error message if applicable.

As we use the `formGroup` attribute in form tag, we need to import `ReactiveFormsModule`. Otherwise, you will get **Can't bind to 'formGroup' since it isn't a known property of 'form'** error and the page will be blank.

In 'app.module.ts', include 'ReactiveFormsModule'.
```typescript
import { ReactiveFormsModule } from '@angular/forms';

...

@NgModule({
  ...,

  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    AlertModule.forRoot(),
    HttpClientModule
  ],
  ...
})
```

## 4. Uploading Image
Following html contains one image control to display product's photo. There is a file control to allow user select image from local disk. And button 'Upload' is to upload the selected image to remote server.
```html
<div class="form-group">
  <label class="control-label col-sm-2" for="image">Image:</label>
  <div class="col-sm-10">
      <input type="hidden" name="image" formControlName="image" />
      <img src="{{productForm.value.image}}" #productImage class="img-thumbnail" width="80" height="80">
      <label class="btn btn-success" for="fileSelector">
          <input id="fileSelector" type="file" #fileInput style="display:none"
          (change)="filechanged($event)">
          Choose Image
      </label>
      <span class='label label-info'>{{ filename }}</span>
      <span><button type="button" class="btn btn-primary" (click)="upload()">Upload</button></span>
  </div>
</div>
```

Add following scripts to the end of 'productadd.component.ts'.
```javascript
//Image upload
@ViewChild("fileInput") fileInput;
@ViewChild("productImage") productImage;

filechanged(event): void {
  var name = this.fileInput.nativeElement.files[0].name;
  //console.log(name);
  this.filename = name;
}

upload(): void {
  let fi = this.fileInput.nativeElement;
  if (fi.files && fi.files[0]) {
    let fileToUpload = fi.files[0];
    this.service.upload(fileToUpload)
      .subscribe(res => {
        //console.log("fileupload:" + res.statusCode);
        //console.log("fileupload:" + res.message);
        this.productForm.patchValue({image: res.message});
        this.productImage.src = res.message;
      },
      error => {this.statusCode = error.statusCode; this.errmsg = error.message});
  }
}
```
Method filechanged() shows file name after user selects local image. Method upload() calls remote API to upload image.

## 5. Running and Testing
Start the RESTful service first, and start this Angular app, serve it in web server.
```raw
$ ng serve
```
Open web browser, access 'http://localhost:12080/'.
![image](/assets/images/frontend/8361/homepage.png)
Click the List button. There are three products with images.
![image](/assets/images/frontend/8361/productlist.png)
Click the 'Create' button, input product name and price. And click 'Choose Image' to select an image from local disk. Then, click 'Upload' button to upload it to the remote server. The image will be displayed at the left side.
![image](/assets/images/frontend/8361/productadd.png)
Click 'Save' button, product is saved.
![image](/assets/images/frontend/8361/productlistafteradd.png)
Click 'Edit' button of the new added product. Change the product name and price.
![image](/assets/images/frontend/8361/productedit.png)
Click 'Save' button, product(ID=4) is updated.
![image](/assets/images/frontend/8361/productlistafteredit.png)
Click 'Delete' button of the last product. A popup window for confirming the delete operation shows up.
![image](/assets/images/frontend/8361/deleteconfirm.png)
Click 'OK' button, product will be deleted.
![image](/assets/images/frontend/8361/productlistafterdel.png)

## 6. Source Files
* [Source files of Game Store(Angular) on Github](https://github.com/jojozhuang/game-store-angular)
* [Source files of RESTful API(ASP.NET Core) on Github](https://github.com/jojozhuang/restful-api-aspnet)
* [Source files of RESTful API(Spring Boot) on Github](https://github.com/jojozhuang/restful-api-springboot)

## 7. References
* [Official website](https://angular.io/)
* [Angular CLI](https://github.com/angular/angular-cli)
* [Angular 4 Tutorial](https://www.tutorialspoint.com/angular4/index.htm)
* [How to add bootstrap to an angular-cli project](https://stackoverflow.com/questions/37649164/how-to-add-bootstrap-to-an-angular-cli-project)
* [Angular 4 CRUD Example](https://www.concretepage.com/angular-2/angular-4-crud-example)
* [Intercept HTTP Requests in Angular](https://juristr.com/blog/2017/08/intercept-http-requests-in-angular/)
* [How to include a file upload control in an Angular2 reactive form?](https://stackoverflow.com/questions/43444440/how-to-include-a-file-upload-control-in-an-angular2-reactive-form)
