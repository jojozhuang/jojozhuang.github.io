---
layout: post
key: blog
title: "Build RESTful Web Services with Spring Boot"
date: 2016-02-20
tags: Web API, Spring Boot, Maven
categories:
- blog
---

> Build RESTful Web API with Spring Boot and Maven in Java.

## 1. Prerequisites
Development environment has been setup. JDK, Eclipse and Tomcat are all installed. Otherwise, refer to [Basic Java Development Environment Setup](http://jojozhuang.github.io/blog/2016/02/05/basic-java-development-environment-setup/) to setup your development environment.

In addition, we will use maven as build tool. So Maven is also required to be installed.
```sh
$ brew install maven // Mac OS
$ sudo apt-get install maven // Linux
```
## 2. Create Project
1) In Eclipse, New -> 'Maven Project', Name: SpringBootTutorial  
![MIME Type](/public/pics/2016-02-20/mavenproject.png)  
In the new created project, there are two main branches, one is for source code, another is for test.
![MIME Type](/public/pics/2016-02-20/initialproject.png)  
## 3. Configure Maven by Editing pom.xml
### 3.1 Specify Java version
Since, we will use lamda expression, specify java 8.
```xml
<properties>
  <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
  <java.version>1.8</java.version>
</properties>
```

### 3.2 Add Dependency
Add sprint boot dependency to pom.xml.
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
Use H2 in memory database
```xml
<dependency>
  <groupId>com.h2database</groupId>
  <artifactId>h2</artifactId>
  <scope>runtime</scope>
</dependency>
```
## 4. Create Service
1) Create Package  
Right click project SprintBootTutorial->src->main->java>New->Package, Package Name: com.jojostudio.tutorial.SprintBootTutorial
2) Create Executable Application  
RestApplication.java with dummy data.
```java
package com.jojostudio.tutorial.SprintBootTutorial;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.jojostudio.tutorial.SprintBootTutorial.domain.Product;
import com.jojostudio.tutorial.SprintBootTutorial.repository.ProductRepository;

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
package com.jojostudio.tutorial.SprintBootTutorial.domain;

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
package com.jojostudio.tutorial.SprintBootTutorial.repository;

import org.springframework.data.repository.CrudRepository;

import com.jojostudio.tutorial.SprintBootTutorial.domain.Product;

public interface ProductRepository extends CrudRepository<Product, Long> {

}
```

Create folder service and create interface ProductService in serice folder, and create
ProductService.java  
```java
package com.jojostudio.tutorial.SprintBootTutorial.service;

import com.jojostudio.tutorial.SprintBootTutorial.domain.Product;

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
package com.jojostudio.tutorial.SprintBootTutorial.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;

import com.jojostudio.tutorial.SprintBootTutorial.domain.Product;
import com.jojostudio.tutorial.SprintBootTutorial.repository.ProductRepository;

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
package com.jojostudio.tutorial.SprintBootTutorial.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jojostudio.tutorial.SprintBootTutorial.domain.Product;
import com.jojostudio.tutorial.SprintBootTutorial.repository.ProductRepository;

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

This is the final structure of this tutorial project.
![MIME Type](/public/pics/2016-02-20/structure.png)  

## 5. Run
run spring boot project with maven
```sh
$ mvn spring-boot:run
```
then access http://localhost:8080/products/
1) Get Product List  
URL: http://localhost:8080/products/
![MIME Type](/public/pics/2016-02-20/products.png)  
2) Get Product by ID  
URL: http://localhost:8080/product/1
![MIME Type](/public/pics/2016-02-20/oneproduct.png)  

## 6. Support XML
### 6.1 Add Dependency to pom.xml
```xml
<dependencies>
    ...

    <dependency>
      <groupId>com.fasterxml.jackson.dataformat</groupId>
      <artifactId>jackson-dataformat-xml</artifactId>
    </dependency>
</dependencies>
```

### 6.2 Test
Add Header = "application/xml".
URL: http://localhost:8080/product/1
![MIME Type](/public/pics/2016-02-20/xmlproduct.png)  

## 7. Enable Autoload
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
![MIME Type](/public/pics/2016-02-20/changeproduct.png)  
Don't restart maven. Just send request again. The new product is returned.
![MIME Type](/public/pics/2016-02-20/changeproduct.png)  
## 8. Source
[Source code files of Spring Boot Tutorial on Github](https://github.com/jojozhuang/Tutorials/tree/master/SpringBootTutorial)

## 9. Reference
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
