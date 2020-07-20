---
layout: tutorial
key: tutorial
title: "Creating RESTful API with Dummy Server"
index: 8611
subcategory: restful-api
date: 2017-12-15
tags: [JSON Server]
---

> Setup a dummy server to provide fake data as RESTful APIs.

## 1. RESTful APIs
When developing web application, we properly need RESTful APIs to provide some JSON data to the front-end application. It takes some time to build a full backend server, e.g. by using ASP.NET Web APIs or Spring Boot as I introduced in the previous postings. Actually, another option is to setup a dummy server to provide dummy data as RESTful service.

[JSON Server](https://github.com/typicode/json-server) is a very useful tool, which helps to quickly setup RESTful APIs with CRUD operations. It returns data in JSON format.

## 2. Installing JSON Server
Use npm to install json server. Option '-g' makes it installed globally.
```raw
$ npm install -g json-server
```

Create a folder in your local machine.
```raw
$ mkdir dummyserver
$ cd dummyserver
```
Then, create a file named 'products.json' with json object.
```raw
$ touch products.json
```
```json
{
  "products": [
       {
          "id": 1,
          "productName": "Xbox 360",
          "price": 299,
          "image": "http://localhost:3000/images/xbox360.jpg"
       },
       {
          "id": 2,
          "productName": "Wii",
          "price": 269,
          "image": "http://localhost:3000/images/wii.jpg"
       },
       {
          "id": 3,
          "productName": "Wireless Controller",
          "price": 19.99,
          "image": "http://localhost:3000/images/controller.jpg"
       }
    ]
}
```

## 3. Running JSON Server
Start the dummy server.
```raw
$ json-server --watch products.json
```
![image](/assets/images/backend/8611/defaultport.png){:width="600px"}  
You can start JSON Server on other ports with the --port option.
```raw
$ json-server --watch products.json --port 5000
```
![image](/assets/images/backend/8611/differentport.png){:width="600px"}  
Open web browser to access http://localhost:5000/.
![image](/assets/images/backend/8611/home.png)  
Click on the '/products' link or directly access http://localhost:5000/products. Three products are returned in JSON format.
![image](/assets/images/backend/8611/products.png)  

## 4. Serving Static Files
JSON server supports to serve static files, including image. Create a folder named 'public' and put images into this folder.
![image](/assets/images/backend/8611/folder.png){:width="600px"}  
Restart the server and access the image url, eg.'http://localhost:5000/images/xbox360.jpg'.
![image](/assets/images/backend/8611/image.png){:width="800px"}  

## 5. Custom Routes
Create a routes.json file under the root folder, add the following route.
```json
{
  "/api/*": "/$1"
}
```
Start JSON Server with --routes option.
```raw
$ json-server --watch products.json --port 5000 --routes routes.json
```
![image](/assets/images/backend/8611/routes.png){:width="600px"}  
Now you can access resources using additional routes.
```
/api/products # → /products
/api/products/1  # → /products/1
```
Access http://localhost:5000/api/products/ in web browser.
![image](/assets/images/backend/8611/api.png){:width="600px"}  

Finally, this server provides following APIs.

API                       | Description         | Request body | Response body
--------------------------|---------------------|--------------|-------------------
GET /api/products         | Get all products    | None         | Array of Products
GET /api/products/{id}    | Get a product by ID | None         | Product
POST /api/products        | Add a new product   | Product      | Product
PUT /api/products/{id}    | Update a product    | Product      | None
DELETE /api/products/{id} | Delete a product    | None         | None

## 6. Testing with Postman
Use Postman to access http://localhost:5000/ for testing. Create new collection named 'RESTfulDummy', all requests will be saved to this collection.
### 6.1 Get All Products
Create a request, choose 'GET' method and specify 'http://localhost:5000/api/products' as the URL, click the Send button. All three products are returned in the response body.
![image](/assets/images/backend/8611/getall.png)
### 6.2 Get Product by ID
Create a new request, choose the 'GET' method and specify 'http://localhost:5000/api/products/1' as the URL, click the Send button. Product with ID equals to '1' is returned in the response body.
![image](/assets/images/backend/8611/getone.png)
### 6.3 Add New Product
Create another request, choose the 'POST' method and specify 'http://localhost:5000/api/products/' as the URL. In the Request Body, select 'raw', provide the new product information in JSON format, and choose 'JSON(application/json)'.
```json
{
    "id": "4",
    "productName": "NewProduct",
    "price": "999",
    "image": "http://localhost:5000/images/default.png"
}
```
Click the Send button. In the response body, we see the new product.
![image](/assets/images/backend/8611/add.png)
Run the 'Get all products' request to verify whether the new product is created. We see there is a new product with ID equals to 4.
![image](/assets/images/backend/8611/addcheck.png)
### 6.4 Update Product
Create a new request, choose 'PUT' method and specify 'http://localhost:5000/api/products/4' as the URL. In the Request Body, select 'raw', provide the new product information in JSON format, and choose 'JSON(application/json)'.
```json
{
    "id": "4",
    "productName": "ProductUpdated",
    "price": "1234",
    "image": "http://localhost:5000/images/default.png"
}
```
Click the Send button. In the response body, we see the product has new name and price.
![image](/assets/images/backend/8611/update.png)
Run the 'Get all products' request to verify whether the product is updated. We see product 4 has new name and price.
![image](/assets/images/backend/8611/updatecheck.png)
### 6.5 Delete Product
Create a new request, choose 'DELETE' method and specify 'http://localhost:5000/api/products/4' as the URL, click the Send button. There is no response body returned, but we see the status is '200 OK'. Product 4 should be deleted.
![image](/assets/images/backend/8611/delete.png)
Run the 'Get all products' request to verify whether product4 is deleted. We see product 4 is no longer existing.
![image](/assets/images/backend/8611/deletecheck.png)

## 7. Source Files
* [Source files of Dummy Server on Github](https://github.com/jojozhuang/Tutorials/tree/master/DummyServer)

## 8. References
* [JSON Server](https://github.com/typicode/json-server)
* [Create A REST API With JSON Server](https://medium.com/codingthesmartway-com-blog/create-a-rest-api-with-json-server-36da8680136d)
