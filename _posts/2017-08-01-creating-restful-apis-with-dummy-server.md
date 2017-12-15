---
layout: post
key: blog
title: "Creating RESTful APIs with Dummy Server"
date: 2017-08-01
tags: [JSON Server]
---

> Setup a dummy server to provide fake data as RESTful APIs.

## 1. Front-End Development
When developing web application, we properly need RESTful APIs to provide some JSON data to the front-end application. It takes some time to build a full backend server, e.g. by using ASP.NET Web APIs or Spring Boot.

[JSON Server](https://github.com/typicode/json-server) is a very useful tool, which helps to quickly setup RESTful APIs with CRUD operations.

## 2. Installing JSON Server
Use npm to install json server. Option '-g' makes it installed globally.
```sh
$ npm install -g json-server
```

## 3. JSON File
Create a folder in your local machine.
```sh
$ mkdir dummyserver
$ cd dummyserver
```
Then, create a file named 'products.json' with json object.
```sh
$ vi products.json
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

## 4. Running JSON Server
Start the dummy server.
```sh
$ json-server --watch products.json
```
![MIME Type](/public/pics/2017-08-01/defaultport.png){:width="600px"}  
You can start JSON Server on other ports with the --port option.
```sh
$ json-server --watch products.json --port 5000
```
![MIME Type](/public/pics/2017-08-01/differentport.png){:width="600px"}  
Open web browser to access http://localhost:5000/.
![MIME Type](/public/pics/2017-08-01/home.png)  
Click on the '/products' link or directly access http://localhost:5000/products.
![MIME Type](/public/pics/2017-08-01/products.png)  

This server provides following APIs.

API                       | Description         | Request body | Response body
--------------------------|---------------------|--------------|-------------------
GET /products             | Get all products    | None         | Array of Products
GET /products/{id}    | Get a product by ID | None         | Product
POST /products        | Add a new product   | Product      | Product
PUT /products/{id}    | Update a product    | Product      | None
DELETE /products/{id} | Delete a product    | None         | None

## 5. Serving Static Files
JSON server supports to serve static files, including image. Create a folder named 'public' and put images into this folder.
![MIME Type](/public/pics/2017-08-01/folder.png){:width="600px"}  
Restart the server and access the image url, eg.'http://localhost:5000/images/xbox360.jpg'.
![MIME Type](/public/pics/2017-08-01/image.png){:width="800px"}  

## 6. Custom Routes
Create a routes.json file under the root folder, add the following route.
```json
{
  "/api/*": "/$1"
}
```
Start JSON Server with --routes option.
```sh
$ json-server --watch products.json --port 5000 --routes routes.json
```
![MIME Type](/public/pics/2017-08-01/routes.png){:width="600px"}  
Now you can access resources using additional routes.
```
/api/products # → /products
/api/products/1  # → /products/1
```
Access http://localhost:5000/api/products/ in web browser.
![MIME Type](/public/pics/2017-08-01/api.png){:width="600px"}  

## 7. Testing with Postman
1) Get all products.  
Select the 'RESTfulAspNet' collection, click 'Add requests' link. Provide Name and Description, save it to the new collection folder.
![MIME Type](/public/pics/2017-08-03/newrequest.png){:width="500px"}  
Edit the request, choose the 'GET' method and specify 'http://localhost:5000/api/products' as the URL, click the blue Send button. All three products are returned in the response body.
![MIME Type](/public/pics/2017-08-03/getall.png)
2) Get a product by ID.  
Create a new request, choose the 'GET' method and specify 'http://localhost:5000/api/products/1' as the URL, click the Send button. Product with ID equals to '1' is returned in the response body.
![MIME Type](/public/pics/2017-08-03/getone.png)
3) Add a new product.  
Create another request, choose the 'POST' method and specify 'http://localhost:5000/api/products/' as the URL. In the Request Body, select 'raw', provide the new product information in JSON format, and choose 'JSON(application/json)'.
```json
{
    "id": "0",
    "productName": "NewProduct",
    "price": "999",
    "image": "http://localhost:5000/images/default.png"
}
```
Click the Send button. There is no response body returned, but we see the status is '200 OK'. New product should be created.
![MIME Type](/public/pics/2017-08-03/add.png)
Run the 'Get all products' request to verify whether the new product is created. We see there is a new product with ID equals to 4.
![MIME Type](/public/pics/2017-08-03/addcheck.png)
4) Update a product.  
Create a new request, choose the 'PUT' method and specify 'http://localhost:5000/api/products/4' as the URL. In the Request Body, select 'raw', provide the new product information in JSON format, and choose 'JSON(application/json)'.
```json
{
    "id": "4",
    "productName": "ProductUpdated",
    "price": "1234",
    "image": "http://localhost:5000/images/default.png"
}
```
Click the Send button. There is no response body returned, but we see the status is '200 OK'. New product should be created.
![MIME Type](/public/pics/2017-08-03/update.png)
Run the 'Get all products' request to verify whether the product is updated. We see product 4 has new name and price.
![MIME Type](/public/pics/2017-08-03/updatecheck.png)
5) Delete a product.  
Create a new request, choose 'DELETE' method and specify 'http://localhost:5000/api/products/4' as the URL, click the Send button. There is no response body returned, but we see the status is '200 OK'. Product 4 should be deleted.
![MIME Type](/public/pics/2017-08-03/delete.png)
Run the 'Get all products' request to verify whether product4 is deleted. We see product 4 is no longer existing.
![MIME Type](/public/pics/2017-08-03/deletecheck.png)

## 8. Source Files
* [Source files of Dummy Server on Github](https://github.com/jojozhuang/Tutorials/tree/master/DummyServer)

## 9. References
* [JSON Server](https://github.com/typicode/json-server)
* [Create A REST API With JSON Server](https://medium.com/codingthesmartway-com-blog/create-a-rest-api-with-json-server-36da8680136d)
