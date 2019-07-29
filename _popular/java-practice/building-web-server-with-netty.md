---
layout: tutorial
key: popular
title: "Building Web Server with Netty"
index: 1506
subcategory: java-practice
date: 2019-07-28
tags: [Netty]
---

> Build a tiny web server with Netty.

## 1. Netty
[Netty](https://netty.io) is an asynchronous event-driven network application framework.

The main purpose of Netty is building high-performance protocol servers based on `NIO` (or possibly NIO.2) with separation and loose coupling of the network and business logic components. It might implement a widely known protocol, such as HTTP, or your own specific protocol.

## 2. Core Concepts
Netty is a non-blocking framework. This leads to high throughput compared to blocking IO. Understanding non-blocking IO is crucial to understanding Netty’s core components and their relationships.
### 2.1 Channel
Channel is the base of Java NIO. It represents an open connection which is capable of IO operations such as reading and writing.
### 2.2 Future
Every IO operation on a Channel in Netty is non-blocking. This means that every operation is returned immediately after the call. There is a `Future` interface in the standard Java library, but it’s not convenient for Netty purposes — we can only ask the Future about the completion of the operation or to block the current thread until the operation is done.

That’s why Netty has its own `ChannelFuture` interface. We can pass a `callback` to ChannelFuture which will be called upon operation completion.
### 2.3 Events and Handlers
Netty uses an event-driven application paradigm, so the pipeline of the data processing is a chain of events going through handlers. Events and handlers can be related to the inbound and outbound data flow. Inbound events can be the following:
- Channel activation and deactivation
- Read operation events
- Exception events
- User events

Outbound events are simpler and, generally, are related to opening/closing a connection and writing/flushing data.

Netty applications consist of a couple of networking and application logic events and their handlers. The base interfaces for the channel event handlers are `ChannelHandler` and its ancestors `ChannelOutboundHandler` and `ChannelInboundHandler`.

Netty provides a huge hierarchy of implementations of ChannelHandler. It is worth noting the `adapters` which are just empty implementations, e.g. `ChannelInboundHandlerAdapter` and `ChannelOutboundHandlerAdapter`. We could extend these adapters when we need to process only a subset of all events.

Also, there are many implementations of specific protocols such as HTTP, e.g. `HttpRequestDecoder`, `HttpResponseEncoder`, `HttpObjectAggregator`.
### 2.4 Encoders and Decoders
As we work with the network protocol, we need to perform data serialization and deserialization. For this purpose, Netty introduces special extensions of the `ChannelInboundHandler` for **decoders** which are capable of decoding incoming data. The base class of most decoders is `ByteToMessageDecoder`.

For encoding outgoing data, Netty has extensions of the `ChannelOutboundHandler` called **encoders**. `MessageToByteEncoder` is the base for most encoder implementations. We can convert the message from byte sequence to Java object and vice versa with encoders and decoders.

## 3. Example Server Application
Let’s create a project representing a simple protocol server which receives a request, performs a calculation and sends a response.
### 3.1. Dependencies
First of all, we need to provide the Netty dependency in our pom.xml:
```xml
<dependency>
    <groupId>io.netty</groupId>
    <artifactId>netty-all</artifactId>
    <version>4.0.23.Final</version>
</dependency>
```

## 6. Source Files
* [Source files of Web Server on Github](https://github.com/jojozhuang/web-server-java)

## 7. References
* [Netty - User guide for 4.x](https://netty.io/wiki/user-guide-for-4.x.html#wiki-h3-4)
* [Introduction to Netty](https://www.baeldung.com/netty)
* [Netty Tutorial](http://tutorials.jenkov.com/netty/index.html)
