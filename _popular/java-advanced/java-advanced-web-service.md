---
layout: tutorial
key: popular
title: "Java Advanced - Web Service - Draft"
index: 1452
subcategory: java-advanced
date: 2017-03-05
tags: [SOAP, WSDL]
---

> Create concurrent application with threadings.

## 1. Java Web Services
Java provides it’s own API to create both SOAP as well as REST web services.

* JAX-WS: JAX-WS stands for Java API for XML Web Services. JAX-WS is XML based Java API to build web services server and client application.
* JAX-RS: Java API for RESTful Web Services (JAX-RS) is the Java API for creating REST web services. JAX-RS uses annotations to simplify the development and deployment of web services.

Sample of JAX-WS application.
```java
package com.journaldev.jaxws.service;

import javax.jws.WebMethod;
import javax.jws.WebService;
import javax.jws.soap.SOAPBinding;
import javax.xml.ws.Endpoint;

@WebService
@SOAPBinding(style = SOAPBinding.Style.DOCUMENT)
public class TestService {

	@WebMethod
	public String sayHello(String msg){
		return "Hello "+msg;
	}

	public static void main(String[] args){
		Endpoint.publish("http://localhost:8888/testWS", new TestService());
	}
}
```
Sample of JAX-RS service.
```java

package com.journaldev.jaxrs.service;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;

@Path("/test")
public class TestService {

	@GET
	@Path("/hello/{msg}")
	public String sayHello(@PathParam(value="msg") String msg){
		return "Hello "+msg;
	}
}
```
https://www.journaldev.com/9191/java-web-services-tutorial
