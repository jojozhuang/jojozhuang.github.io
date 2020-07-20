---
layout: tutorial
key: tutorial
title: "Creating RESTful Web Services with Jersey"
index: 8632
subcategory: restful-api
date: 2017-10-30
tags: [Jersey, RESTful, Maven]
---

> Build RESTful web services with Jersey in Java.

## 1. Jersey
[Jersey](https://jersey.github.io/) RESTful Web Services framework is an open source framework for developing RESTful Web Services in Java. It provides support for JAX-RS APIs and serves as a JAX-RS Reference Implementation.

## 2. Jersey Project
### 2.1 Creating Maven Project
1) In Eclipse, New -> 'Dynamic Web Project', Name: JerseyTutorial  
2) Right click project JerseyTutorial -> Configure -> Convert to Maven Project. You should see a new file pom.xml under the root of project.
### 2.2 Adding Dependency
Add jersey dependency to pom.xml.
```xml
<dependencies>
    ...

    <dependency>
        <groupId>com.sun.jersey</groupId>
        <artifactId>jersey-server</artifactId>
        <version>1.8</version>
    </dependency>
</dependencies>
```
### 2.3 Adding web.xml to project
Right click on project JerseyTutorial -> Java EE Tools -> Generate Deployment Descriptor Stub. You should see web.xml in /JerseyTutorial/WebContent/WEB-INF/.  
Register Jersey service as follows.
```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://java.sun.com/xml/ns/javaee" xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_3_0.xsd" version="3.0">
  <display-name>JerseyTutorial</display-name>
  <servlet>
      <servlet-name>jersey-serlvet</servlet-name>
      <servlet-class>com.sun.jersey.spi.container.servlet.ServletContainer</servlet-class>
      <init-param>
          <param-name>com.sun.jersey.config.property.packages</param-name>
          <param-value>Johnny.Tutorials</param-value>
      </init-param>
      <load-on-startup>1</load-on-startup>
  </servlet>

  <servlet-mapping>
      <servlet-name>jersey-serlvet</servlet-name>
      <url-pattern>/rest/*</url-pattern>
  </servlet-mapping>
</web-app>
```
### 2.4 Creating Jersey Service
1) Create Package  
Right click on project JerseyTutorial -> New -> Package, Package Name: Johnny.Tutorials  
2) Create class Product and ProductDao  
Product.java  
```java
package Johnny.Tutorials;

import java.io.Serializable;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "product")
public class Product implements Serializable {
    private int id;
    private String name;
    private double price;

    public Product() {}

    public Product(int id, String name, double price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }

    public int getId() {
        return id;
    }
    @XmlElement
    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }
    @XmlElement
    public void setName(String name) {
        this.name = name;
    }

    public double getPrice() {
        return price;
    }
    @XmlElement
    public void setPrice(double price) {
        this.price = price;
    }
}
```

ProductDao.java  
Here, we create some dummy data.
```java
package Johnny.Tutorials;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ProductDao {
    Map<Integer, Product> map = new HashMap<Integer, Product>();
    public List<Product> getAllProducts(){
        if (map == null || map.size() == 0) {
            buildProductList();
        }
        return new ArrayList<Product>(map.values());
    }

    public Product getProduct(int id){
        if (map == null || map.size() == 0) {
            buildProductList();
        }
        return map.get(id);
    }

    private void buildProductList() {
        Product product = new Product(1, "iPhone 7s", 700.00);
        map.put(1, product);
        product = new Product(2, "iPad 4", 500.00);
        map.put(2, product);
        product = new Product(3, "iPod", 300.00);
        map.put(3, product);
    }
}
```

ProductService.java  
We use Jersey to create two APIs, one to get product list, another to get product by Id.
```java
package Johnny.Tutorials;

import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/ProductService")
public class ProductService {
    ProductDao dao = new ProductDao();

    //Sample URL: http://localhost:8080/JerseyTutorial/rest/ProductService/products
    @GET
    @Path("/products")
    public List<Product> getAll() {
        return dao.getAllProducts();
    }

    //Sample URL: http://localhost:8080/JerseyTutorial/rest/ProductService/product/1
    @GET
    @Path("/product/{id}")
    public Product getProduct(@PathParam("id") int id) {
        return dao.getProduct(id);
    }
}
```
### 2.5 Project Structure
This is the final structure of this tutorial project.
![image](/assets/images/backend/8632/structure.png){:width="400px"}  
### 2.6 Running and Testing
1) Right click project JerseyTutorial -> Run As -> Run On Server.  
Choose an existing server or create a new Tomcat server.  
![image](/assets/images/backend/8632/runonserver.png){:width="600px"}  

After Tomcat is started, let's test RESTful services through web browser.  
2) Get Product List  
* http://localhost:8080/JerseyTutorial/rest/ProductService/products

![image](/assets/images/backend/8632/products.png){:width="600px"}  
3) Get Product by ID  
* http://localhost:8080/JerseyTutorial/rest/ProductService/product/1

![image](/assets/images/backend/8632/oneproduct.png){:width="600px"}  

## 3. Supporting Json
### 3.1 Adding Dependency to pom.xml
```xml
<dependencies>
    ...

    <dependency>
        <groupId>com.sun.jersey</groupId>
        <artifactId>jersey-json</artifactId>
        <version>1.8</version>
    </dependency>
</dependencies>
```

### 3.2 Adding init param to web.xml
```xml
<servlet>
    ...

    <init-param>
        <param-name>com.sun.jersey.api.json.POJOMappingFeature</param-name>
        <param-value>true</param-value>
    </init-param>
    ...
</servlet>
```

### 3.3 Adding new API to ProductService
In ProductService.java, add the following method.  
```java
@GET
@Path("/productJson/{id}")
@Produces(MediaType.APPLICATION_JSON)
public Product getProductJson(@PathParam("id") int id) {
    return dao.getProduct(id);
}
```

### 3.4 Testing Json API
Get product by id, data is returned in JSON format.
* http://localhost:8080/JerseyTutorial/rest/ProductService/productJson/1  

![image](/assets/images/backend/8632/jsonapi.png){:width="600px"}  

## 4. Source Files
* [Source files of Jersey Tutorial on Github](https://github.com/jojozhuang/Tutorials/tree/master/JerseyTutorial)

## 5. Reference
* [Jersey Official Website](https://jersey.github.io/)
* [RESTful Web Services - Java (JAX-RS)](https://www.tutorialspoint.com/restful/restful_jax_rs.htm)
* [JAX-RS Tutorial](http://www.mkyong.com/tutorials/jax-rs-tutorials/)
* [JSON example with Jersey + Jackson](https://www.mkyong.com/webservices/jax-rs/json-example-with-jersey-jackson/)
