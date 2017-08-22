---
layout: post
key: blog
title: "Build RESTful Web Services with Jersey(JAX-RS)"
date: 2016-02-12
categories:
- blog
---

> Build RESTful Web API with Jersey in Java.

## 1. Prerequisites
Development environment has been setup. JDK, Eclipse and Tomcat are all installed. Otherwise, refer to [Basic Java Development Environment Setup](http://jojozhuang.github.io/blog/2016/02/05/basic-java-development-environment-setup/) to setup your development environment.

## 2. Get Jersey Framework Libraries
Download the latest version of Jersey from https://jersey.github.io/download.html.
jaxrs-ri-2.25.1.zip
unzip the download file. There are three folders.
* \jaxrs-ri\api
* \jaxrs-ri\ext
* \jaxrs-ri\lib

1. Create Project
New -> 'Dynamic Web Project', Name: JerseyTutorial
2. Create Package
Right click project JerseyTutorial -> New -> Package, Package Name: Johnny.Tutorials
3. Create class Product and ProductDao, ProductService
4. Convert Project
Right click project JerseyTutorial -> Configure -> Convert to Maven Project
5. Add dependency to pom.xml
6. Add web.xml to project
Right click project JerseyTutorial -> Java EE Tools -> Generate Deployment Descriptor Stub
7. Run Project
Right click project JerseyTutorial -> Run As -> Run On Server
Select Tomcat 9

## 3. Support Json
3.1 Add Dependency to pom.xml
```xml
<dependency>
    <groupId>com.sun.jersey</groupId>
    <artifactId>jersey-json</artifactId>
    <version>1.8</version>
</dependency>
```

3.1 Add init param to web.xml
```xml
<init-param>
    <param-name>com.sun.jersey.api.json.POJOMappingFeature</param-name>
    <param-value>true</param-value>
</init-param>
```
## 6. Reference
https://jersey.github.io/
https://www.tutorialspoint.com/restful/restful_first_application.htm
https://www.mkyong.com/webservices/jax-rs/jersey-hello-world-example/
http://www.mkyong.com/tutorials/jax-rs-tutorials/
https://stackoverflow.com/questions/9164893/how-do-i-add-a-maven-dependency-in-eclipse
http://crunchify.com/how-to-build-restful-service-with-java-using-jax-rs-and-jersey/
https://www.mkyong.com/webservices/jax-rs/json-example-with-jersey-jackson/
