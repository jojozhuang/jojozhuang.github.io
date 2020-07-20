---
layout: tutorial
key: tutorial
title: "Creating RESTful Web Services with Spring Boot"
index: 8621
subcategory: restful-api
date: 2017-10-30
tags: [Spring Boot, RESTful, Maven]
---

> Build RESTful Web Service with Spring Boot and Maven in Java.

## 1. Setup
### 1.1 Java Development Environment
Install JDK, Eclipse and Tomcat first.
### 1.2 Maven
In addition, we will use maven as build tool. So Maven is also required to be installed.
```raw
$ brew install maven // Mac OS
$ sudo apt-get install maven // Linux
```
Check maven version.
```raw
$ mvn -version
Apache Maven 3.5.0 (ff8f5e7444045639af65f6095c62210b5713f426; 2016-02-20T12:39:06-07:00)
Maven home: /usr/local/Cellar/maven/3.5.0/libexec
Java version: 1.8.0_101, vendor: Oracle Corporation
Java home: /Library/Java/JavaVirtualMachines/jdk1.8.0_101.jdk/Contents/Home/jre
Default locale: en_US, platform encoding: UTF-8
OS name: "mac os x", version: "10.12.6", arch: "x86_64", family: "mac"
```

## 2. SpringBoot Project
### 2.1 Enabling Maven Index
In Eclipse, top menu Eclipse -> Preferences, and then choose Maven in the left side. Check the box 'Download repository index updates on startup'. Optionally, check the boxes 'Download Artifact Sources' and 'Download Artifact JavaDoc'.
![image](/assets/images/backend/8621/mavenindex.png){:width="700px"}  
### 2.2 Rebuilding Index
In Eclipse, Window -> Show View -> Other -> Maven -> Maven Repositories, tick 'Full Index Enabled' and then 'Rebuild Index' for 'Global Repositories'.
![image](/assets/images/backend/8621/rebuildindex.png){:width="700px"}  

### 2.2 Creating Maven Project
1) In Eclipse, File -> New -> 'Maven Project', check the box 'Create a simple project'-> Next, Name: SpringBootTutorial  
![image](/assets/images/backend/8621/mavenproject.png){:width="700px"}  
In the new created project, there are two main branches, one is for source code, another is for test.
![image](/assets/images/backend/8621/initialproject.png){:width="400px"}  
### 2.2 Specifying Java Version
Since, we will use lamda expression, specify java version to java 8 in pom.xml.
```xml
<properties>
  <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
  <java.version>1.8</java.version>
</properties>
```
### 2.3 Adding Dependency
Add spring boot dependency to pom.xml.
```xml
<dependencies>
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
  </dependency>
</dependencies>
```
Starter for using Spring Data JPA with Hibernate.
```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
```
Use H2 in-memory database.
```xml
<dependency>
  <groupId>com.h2database</groupId>
  <artifactId>h2</artifactId>
  <scope>runtime</scope>
</dependency>
```
### 2.4 Creating Service
1) Create Package  
Right click project SpringBootTutorial->src->main->java>New->Package, Package Name: johnny.tutorial.SpringBootTutorial  
2) Create Executable Application  
RestApplication.java with dummy data.
```java
package johnny.tutorial.SpringBootTutorial;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import johnny.tutorial.SpringBootTutorial.domain.Product;
import johnny.tutorial.SpringBootTutorial.repository.ProductRepository;

@SpringBootApplication
public class RestApplication {

    public static void main(String[] args) {
        SpringApplication.run(RestApplication.class, args);
    }

    @Bean
    CommandLineRunner runner(ProductRepository productRepository) {
        return args -> {

            Product product1 = new Product("iPhone 7s");
            product1.setPrice(700.00);
            productRepository.save(product1);

            Product product2 = new Product("iPad 4");
            product2.setPrice(500.00);
            productRepository.save(product2);

            Product product3 = new Product("iPod");
            product3.setPrice(300.00);
            productRepository.save(product3);

        };
    }

}
```

Create folder domain and create class Product in domain.  
Product.java  
```java
package johnny.tutorial.SpringBootTutorial.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Product {
    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private double price;

    @SuppressWarnings("unused")
    private Product(){}

    public Product(String name) {
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    @Override
    public String toString() {
        return "Product [name=" + name + ", price=" + price + "]";
    }

}
```

Create folder repository and create interface ProductRepository in repository.
ProductRepository.java
```java
package johnny.tutorial.SpringBootTutorial.repository;

import org.springframework.data.repository.CrudRepository;

import johnny.tutorial.SpringBootTutorial.domain.Product;

public interface ProductRepository extends CrudRepository<Product, Long> {

}
```

Create folder service and create interface ProductService in serice folder, and create
ProductService.java  
```java
package johnny.tutorial.SpringBootTutorial.service;

import johnny.tutorial.SpringBootTutorial.domain.Product;

public interface ProductService {
    Iterable<Product> list();

    Product create(Product product);

    Product read(long id);

    Product update(long id, Product product);

    void delete(long id);
}
```
ProductServiceImpl.java
```java
package johnny.tutorial.SpringBootTutorial.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;

import johnny.tutorial.SpringBootTutorial.domain.Product;
import johnny.tutorial.SpringBootTutorial.repository.ProductRepository;

public class ProductServiceImpl implements ProductService {
    private ProductRepository productRepository;

    @Autowired
    public ProductServiceImpl(ProductRepository postRepository){
        this.productRepository = productRepository;
    }

    @Override
    public Iterable<Product> list() {
        return productRepository.findAll();
    }

    @Override
    public Product read(long id) {
        return productRepository.findOne(id);
    }

    @Override
    @Transactional
    public Product create(Product product) {
        // save the new product
        return productRepository.save(product);
    }

    @Override
    public void delete(long id) {
        productRepository.delete(id);
    }

    @Override
    public Product update(long id, Product update) {
        Product product = productRepository.findOne(id);
        if( update.getName() != null ) {
            product.setName(update.getName());
        }
        return productRepository.save(product);
    }
}
```
Finally, create controller folder and create ProductController in controller.
```java
package johnny.tutorial.SpringBootTutorial.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import johnny.tutorial.SpringBootTutorial.domain.Product;
import johnny.tutorial.SpringBootTutorial.repository.ProductRepository;

@RestController
@RequestMapping("/products")
public class ProductController {
    ProductRepository productRepository;

    @Autowired
    public ProductController(ProductRepository productRepository){
        this.productRepository = productRepository;
    }

    @RequestMapping("/")
    public Iterable<Product> list(){
        return productRepository.findAll();
    }

    @RequestMapping("/{id}")
    public Product read(@PathVariable(value="id") long id){
        return productRepository.findOne(id);
    }
}
```
### 2.5 Project Structure
This is the final structure of this tutorial project.
![image](/assets/images/backend/8621/structure.png){:width="400px"}  

### 2.6 Running and Testing
run spring boot project with maven
```raw
$ mvn spring-boot:run
```
Use Postman to access http://localhost:8080/ for testing.  
1) Get Product List  
URL: http://localhost:8080/products/
![image](/assets/images/backend/8621/products.png)  
2) Get Product by ID  
URL: http://localhost:8080/product/1
![image](/assets/images/backend/8621/oneproduct.png)  

## 3. Supporting XML
### 3.1 Adding Dependency to pom.xml
```xml
<dependencies>
    ...

    <dependency>
      <groupId>com.fasterxml.jackson.dataformat</groupId>
      <artifactId>jackson-dataformat-xml</artifactId>
    </dependency>
</dependencies>
```

### 3.2 Running and Testing
restart spring boot.
```raw
$ mvn spring-boot:run
```
In Postman, add Accept = "application/xml" to Header.  
URL: http://localhost:8080/products/1
![image](/assets/images/backend/8621/xmlproduct.png)  

## 4. Enabling Autoload
Add dependency of Spring Dev-Tool in pom.xml
```xml
<dependencies>
    ...
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-devtools</artifactId>
    </dependency>
</dependencies>
```
change the name and price of product1.
![image](/assets/images/backend/8621/changeproduct.png)  
Don't restart maven. Just send request again. The new product is returned.
![image](/assets/images/backend/8621/newprice.png)  

## 5. Debugging
1) In Eclipse, set breakpoint inside the method(eg. StringController.java->reverse()) you want to debug.  
2) Right click on the RestApplication.java, choose "Debug As" -> "Java Application".  
3) In postman, access the url to trigger method being called. You should see breakpoint is activated.  

## 6. Source Files
* [Source files of Spring Boot Tutorial on Github](https://github.com/jojozhuang/Tutorials/tree/master/SpringBootTutorial)

## 7. Reference
* [Spring Boot Official Website](http://projects.spring.io/spring-boot/)
* [Building an Application with Spring Boot](https://spring.io/guides/gs/spring-boot/)
* [Developing your first Spring Boot application](https://docs.spring.io/spring-boot/docs/current/reference/html/getting-started-first-application.html)
* [Free Introducing Spring Boot Course on Udemy](https://www.udemy.com/spring-boot-getting-started)
* [Building a RESTful Web Service](https://spring.io/guides/gs/rest-service/)
* [Building a RESTful Web Service with Spring Boot Actuator](https://spring.io/guides/gs/actuator-service/)
* [DevTools in Spring Boot 1.3](https://spring.io/blog/2015/06/17/devtools-in-spring-boot-1-3)
* [H2 Database Tutorial](https://www.tutorialspoint.com/h2_database/index.htm)
* [JUnit and Maven in Eclipse](https://www.youtube.com/watch?v=ye1hMZCbYjg)
* [Spring Boot Rest API Example](http://websystique.com/spring-boot/spring-boot-rest-api-example/)
* [SPRING BOOT DEVELOPMENT WITH DOCKER](https://blog.docker.com/2017/05/spring-boot-development-docker/)
* [Spring Boot Tutorials](http://www.mkyong.com/tutorials/spring-boot-tutorials/)
* [Maven Tutorial](ttps://www.tutorialspoint.com/maven/index.htm)
