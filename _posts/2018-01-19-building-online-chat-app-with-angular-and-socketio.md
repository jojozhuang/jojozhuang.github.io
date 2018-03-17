---
layout: post
key: blog
title: "Building Online Chat App with Angular and Socket.IO[Draft]"
date: 2018-01-19
tags: [Angular, Socket.IO, MongoDB]
---

> Build a chat room with Angular5, Socket.IO, MongoDB.

## 1. Chat Room
Previously, I introduced how to use JSP and MySQL/MongoDB to build web application to manage products. In this tutorial, we will learn how to use Angular and RESTful web service to build such web application.

## 2. Angular Project
### 2.1 Creating New Project
In terminal, create new angular app named 'ChatRoom'.
```sh
$ ng new ChatRoom
```
### 2.2 Dependency and Middleware
```sh
npm install --save express body-parser morgan serve-favicon
```
### 2.3 Add Express.js to the Angular 4 Project
Create a folder with the name "bin" and add a file with the name "www" on the root of the project.
```sh
mkdir bin
touch bin/www
Fill "www" file with this codes.
```js

/**
 * Module dependencies.
 */

var app = require('../app');
var debug = require('debug')('mean-app:server');
var http = require('http');

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
```
Now, open and edit "package.json" then replace "start" value.
```js
"start": "ng serve"
```
to
```js
"scripts": {
  "ng": "ng",
  "start": "node ./bin/www",
  "build": "ng build",
  "test": "ng test",
  "lint": "ng lint",
  "e2e": "ng e2e"
},
```
Next, create "app.js" in the root of the project folder.

touch app.js
Open and edit app.js then add this lines of codes.

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');

var chat = require('./routes/chat');
var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(express.static(path.join(__dirname, 'dist')));

app.use('/chat', chat);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
Create routes for the chat.

mkdir routes
touch routes/chat.js
Open and edit "chat.js" then add this lines.

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('Express REST API');
});

module.exports = router;
Now, start Express.js server by typing this command.

nodemon
or

npm start

### 2.3 MongoDB
Start mongodb service.
```sh
sudo mongod
```
Check data.
```sh
mongo
> show dbs
admin            0.000GB
chatroom         0.000GB
local            0.000GB
mean-chat        0.000GB
mongodbtutorial  0.000GB
store            0.000GB
> use chatroom
switched to db chatroom
> db
chatroom
> show collections
chats
> db.chats.find()
{ "_id" : ObjectId("5a602985dd885c5cb9395926"), "updated_at" : ISODate("2018-01-18T04:58:45.874Z"), "room" : "Java", "nickname" : "johnny", "message" : "hello", "__v" : 0 }
{ "_id" : ObjectId("5a60298edd885c5cb9395927"), "updated_at" : ISODate("2018-01-18T04:58:54.764Z"), "room" : "Java", "nickname" : "jinjing", "message" : "laogong", "__v" : 0 }
{ "_id" : ObjectId("5a602ae2dd885c5cb9395928"), "updated_at" : ISODate("2018-01-18T05:04:34.367Z"), "room" : "Python", "nickname" : "johnny", "message" : "hello", "__v" : 0 }
{ "_id" : ObjectId("5a602b22dd885c5cb9395929"), "updated_at" : ISODate("2018-01-18T05:05:38.899Z"), "room" : "Python", "nickname" : "xuyao", "message" : "haha", "__v" : 0 }
>
```
### 2.2 Components
update app.component.html
```
<router-outlet></router-outlet>
```
Then, create 5 components.
```sh
$ cd ChatRoom
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
import { RouterModule} from '@angular/router';

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
### 2.4 BootStrap CSS
Add bootstrap to the project.
```sh
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
```sh
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
```sh
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
In Angular 4.3 or higher version, you can use HttpInterceptor to intercept and modify HTTP requests globally. In this application, I use it to handle http request error globally. In folder './src/main', create file named 'http.interceptor.ts' with following content.
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
import { ProductService } from './product.service';

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
```sh
$ ng serve
```
Open web browser, access 'http://localhost:12080/'.
![image](/public/posts/2017-08-09/homepage.png)
Click the List button. There are three products with images.
![image](/public/posts/2017-08-09/productlist.png)
Click the 'Create' button, input product name and price. And click 'Choose Image' to select an image from local disk. Then, click 'Upload' button to upload it to the remote server. The image will be displayed at the left side.
![image](/public/posts/2017-08-09/productadd.png)
Click 'Save' button, product is saved.
![image](/public/posts/2017-08-09/productlistafteradd.png)
Click 'Edit' button of the new added product. Change the product name and price.
![image](/public/posts/2017-08-09/productedit.png)
Click 'Save' button, product(ID=4) is updated.
![image](/public/posts/2017-08-09/productlistafteredit.png)
Click 'Delete' button of the last product. A popup window for confirming the delete operation shows up.
![image](/public/posts/2017-08-09/deleteconfirm.png)
Click 'OK' button, product will be deleted.
![image](/public/posts/2017-08-09/productlistafterdel.png)

## 6. Source Files
* [Source files of Game Store(Angular) on Github](https://github.com/jojozhuang/Tutorials/tree/master/GameStoreAngular)
* [Source files of RESTful API(ASP.NET Core) on Github](https://github.com/jojozhuang/Tutorials/tree/master/RestfulAspNet)

## 7. References
* [Official website](https://angular.io/)
* [Angular CLI](https://github.com/angular/angular-cli)
* [Angular 4 Tutorial](https://www.tutorialspoint.com/angular4/index.htm)
* [How to add bootstrap to an angular-cli project](https://stackoverflow.com/questions/37649164/how-to-add-bootstrap-to-an-angular-cli-project)
* [Angular 4 CRUD Example](https://www.concretepage.com/angular-2/angular-4-crud-example)
* [Intercept HTTP Requests in Angular](https://juristr.com/blog/2017/08/intercept-http-requests-in-angular/)
* [How to include a file upload control in an Angular2 reactive form?](https://stackoverflow.com/questions/43444440/how-to-include-a-file-upload-control-in-an-angular2-reactive-form)


## 1. GitHub Pages & Jekyll

ng build --prod --aot=false
https://github.com/angular/angular-cli/issues/4551

https://www.djamware.com/post/58e0d15280aca75cdc948e4e/building-chat-application-using-mean-stack-angular-4-and-socketio
https://github.com/didinj/mean-angular4-chat-app

https://www.djamware.com/post/58cf4e1c80aca72df8d1cf7e/tutorial-building-crud-app-from-scratch-using-mean-stack-angular-2


## 7. Reference
* [Express middleware](https://expressjs.com/en/resources/middleware.html)
