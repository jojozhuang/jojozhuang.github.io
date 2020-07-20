---
layout: tutorial
key: programming
title: "Java Advanced - Web Service"
index: 2472
subcategory: java-advanced
date: 2017-03-05
tags: [SOAP, WSDL]
---

> Create concurrent application with threadings.

## 1. Java Web Services
Java provides it’s own API to create both SOAP as well as REST web services.
* `JAX-WS`: JAX-WS stands for Java API for XML Web Services. JAX-WS is XML based Java API to build web services server and client application.
* `JAX-RS`: Java API for RESTful Web Services (JAX-RS) is the Java API for creating REST web services. JAX-RS uses annotations to simplify the development and deployment of web services.

Both of these APIs are part of standard JDK installation, so we don’t need to add any jars to work with them. Both of these APIs use annotations very heavily.

## 2. Hello World JAX-WS Application
Create a maven project in intellij.
### 2.1 Server
First, create a Web Service Endpoint Interface
```java
import javax.jws.WebMethod;
import javax.jws.WebService;

@WebService
public interface HelloService {

    @WebMethod
    public String helloWorld();

    @WebMethod
    public String hi(String name);
}
```
Second, create a Web Service Endpoint Implementation.
```java
import javax.jws.WebMethod;
import javax.jws.WebService;

@WebService(endpointInterface = "johnny.java.advanced.webservice.server.HelloService")
public class HelloServiceImpl implements HelloService {
    @WebMethod
    public String helloWorld() {
        return "Hello World";
    }

    @WebMethod
    public String hi(String name) {
        return "Hi " + name;
    }
}
```
Last, create a server by publishing the web service.
```java
import javax.xml.ws.Endpoint;

public class WSServer {
    static final String host = "http://localhost:8888/ws/demo";
    public static void main(String[] args){
        Endpoint.publish(host, new HelloServiceImpl());
        System.out.println("Web service started at: " + host);
    }
}
```
Launch the server and visit http://localhost:8888/ws/demo?wsdl in web browser. You will see WSDL as follows, note down the **name space** and **location**, we will use them in web service client.
![image](/assets/images/programming/2472/wsdl.png)

### 2.2 Client
Create web service client to access to the published service. Without tool, you can create a Java web service client like this. The name space and location are used for constructing Qname.
```java
import johnny.java.advanced.webservice.server.HelloService;

import javax.xml.namespace.QName;
import javax.xml.ws.Service;
import java.net.URL;

public class WSClient {
    public static void main(String[] args) throws Exception {

        URL url = new URL("http://localhost:8888/ws/demo?wsdl");

        // You can get the namespace and local part from the wsdl
        QName qname = new QName("http://server.webservice.advanced.java.johnny/", "HelloServiceImplService");

        Service service = Service.create(url, qname);

        HelloService hello = service.getPort(HelloService.class);

        System.out.println(hello.helloWorld());
        System.out.println(hello.hi("johnny"));
    }
}
```
Output.
```raw
Hello World
Hi johnny
```

## 3. Source Files
* [Source files for Java Web Service on GitHub](https://github.com/jojozhuang/java-programming/tree/master/java-advanced-webservice)

## 4. References
* [Java Web Services Tutorial](https://www.journaldev.com/9191/java-web-services-tutorial)
* [Building Java Web Services with JAX-WS](https://www.youtube.com/watch?v=XFWoHayjMnE)
* [JAX-WS Hello World Example – RPC Style](https://www.mkyong.com/webservices/jax-ws/jax-ws-hello-world-example/)
