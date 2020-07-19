---
layout: tutorial
key: programming
title: "Building Web Server with Netty"
index: 2506
subcategory: java-app
date: 2019-07-28
tags: [Netty]
---

> Build web servers with Netty.

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
### 3.1 Dependencies
First of all, we need to provide the Netty dependency in our pom.xml:
```xml
<dependency>
    <groupId>io.netty</groupId>
    <artifactId>netty-all</artifactId>
    <version>4.0.23.Final</version>
</dependency>
```
### 3.2 Time Server
When client connects to server, server send the current time to client.

TimeServer.java
```java
/**
 * Send current time to client.
 */
public class TimeServer {

    private int port;

    public static void main(String[] args) throws Exception {
        int port = 8090;
        if (args.length > 0) {
            port = Integer.parseInt(args[0]);
        }

        new TimeServer(port).run();
    }

    public TimeServer(int port) {
        this.port = port;
    }

    public void run() throws Exception {
        EventLoopGroup bossGroup = new NioEventLoopGroup(); // (1)
        EventLoopGroup workerGroup = new NioEventLoopGroup();
        try {
            ServerBootstrap b = new ServerBootstrap(); // (2)
            b.group(bossGroup, workerGroup)
                    .channel(NioServerSocketChannel.class) // (3)
                    .childHandler(new ChannelInitializer<SocketChannel>() { // (4)
                        @Override
                        public void initChannel(SocketChannel ch) throws Exception {
                            ch.pipeline().addLast(new TimeServerHandler());
                        }
                    })
                    .option(ChannelOption.SO_BACKLOG, 128)          // (5)
                    .childOption(ChannelOption.SO_KEEPALIVE, true); // (6)

            System.out.println("Time Server is listening on port 8090.");

            // Bind and start to accept incoming connections.
            ChannelFuture f = b.bind(port).sync(); // (7)

            // Wait until the server socket is closed.
            // In this example, this does not happen, but you can do that to gracefully
            // shut down your server.
            f.channel().closeFuture().sync();
        } finally {
            workerGroup.shutdownGracefully();
            bossGroup.shutdownGracefully();
        }
    }
}

public class TimeServerHandler extends ChannelInboundHandlerAdapter {

    @Override
    public void channelActive(final ChannelHandlerContext ctx) { // (1)
        final ByteBuf time = ctx.alloc().buffer(4); // (2)
        long currentTimeMillis = System.currentTimeMillis() / 1000L + 2208988800L;
        // 2208988800L = number of seconds since 1900/01/01 00:00:00
        System.out.println("Server - currentTimeMillis:" + currentTimeMillis);
        time.writeInt((int)currentTimeMillis);

        final ChannelFuture f = ctx.writeAndFlush(time); // (3)
        f.addListener(new ChannelFutureListener() {
            //@Override
            public void operationComplete(ChannelFuture future) {
                assert f == future;
                ctx.close();
            }
        }); // (4)
    }

    @Override
    public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) {
        cause.printStackTrace();
        ctx.close();
    }
}
```
Client.java
```java
public class TimeClient {
    public static void main(String[] args) throws Exception {
        String host = "localhost";
        if (args.length > 1) {
            host = args[0];
        }
        int port = 8090;
        if (args.length > 1) {
            port = Integer.parseInt(args[1]);
        }

        EventLoopGroup workerGroup = new NioEventLoopGroup();

        try {
            Bootstrap b = new Bootstrap(); // (1)
            b.group(workerGroup); // (2)
            b.channel(NioSocketChannel.class); // (3)
            b.option(ChannelOption.SO_KEEPALIVE, true); // (4)
            b.handler(new ChannelInitializer<SocketChannel>() {
                @Override
                public void initChannel(SocketChannel ch) throws Exception {
                    ch.pipeline().addLast(new TimeClientHandler());
                }
            });

            // Start the client.
            ChannelFuture f = b.connect(host, port).sync(); // (5)

            System.out.println("Connect to server successfully.");

            // Wait until the connection is closed.
            f.channel().closeFuture().sync();
        } finally {
            workerGroup.shutdownGracefully();
        }
    }
}
public class TimeClientHandler extends ChannelInboundHandlerAdapter {
    @Override
    public void channelRead(ChannelHandlerContext ctx, Object msg) {
        ByteBuf m = (ByteBuf) msg; // (1)
        try {
            long currentTimeMillis = (m.readUnsignedInt() - 2208988800L) * 1000L;
            System.out.print("Client - ");
            System.out.println(new Date(currentTimeMillis));
            ctx.close();
        } finally {
            m.release();
        }
    }

    @Override
    public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) {
        cause.printStackTrace();
        ctx.close();
    }
}
```
Start server first and then client.

Output.
```raw
# Output from Server
Time Server is listening on port 8090.
Server - currentTimeMillis:3773512476

# Output from Client
Connect to server successfully.
Client - Tue Jul 30 14:54:36 PDT 2019
```
### 3.3 Echo Server
Server sends the received data back to client.

EchoServer.java
```java
/**
 * Echo whatever received from client
 */
public class EchoServer {

    private int port;

    public static void main(String[] args) throws Exception {
        int port = 8091;
        if (args.length > 0) {
            port = Integer.parseInt(args[0]);
        }

        new EchoServer(port).run();
    }

    public EchoServer(int port) {
        this.port = port;
    }

    public void run() throws Exception {
        EventLoopGroup bossGroup = new NioEventLoopGroup(); // (1)
        EventLoopGroup workerGroup = new NioEventLoopGroup();
        try {
            ServerBootstrap b = new ServerBootstrap(); // (2)
            b.group(bossGroup, workerGroup)
                    .channel(NioServerSocketChannel.class) // (3)
                    .childHandler(new ChannelInitializer<SocketChannel>() { // (4)
                        @Override
                        public void initChannel(SocketChannel ch) throws Exception {
                            ch.pipeline().addLast(
                                    new LoggingHandler(LogLevel.TRACE),
                                    new StringEncoder(),
                                    new StringDecoder(),
                                    new EchoServerHandler());
                        }
                    })
                    .option(ChannelOption.SO_BACKLOG, 128)          // (5)
                    .childOption(ChannelOption.SO_KEEPALIVE, true); // (6)

            System.out.println("Server is listening on port 8091.");

            // Bind and start to accept incoming connections.
            ChannelFuture f = b.bind(port).sync(); // (7)

            // Wait until the server socket is closed.
            // In this example, this does not happen, but you can do that to gracefully
            // shut down your server.
            f.channel().closeFuture().sync();

        } finally {
            workerGroup.shutdownGracefully();
            bossGroup.shutdownGracefully();
        }
    }
}

/**
 * Handles a server-side channel.
 */
public class EchoServerHandler extends SimpleChannelInboundHandler<String> {

    @Override
    public void channelActive(ChannelHandlerContext ctx) throws Exception {
        String message = "message from server.";
        System.out.println("Sending message: " + message);
        ctx.writeAndFlush(message);
    }

    @Override
    public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) {
        System.out.println("Error in receiving message.");
        cause.printStackTrace();
        ctx.close();
    }

    @Override
    protected void channelRead0(ChannelHandlerContext ctx, String message) throws Exception {
        System.out.println("Received message: " + message);
        ctx.writeAndFlush(message);
    }
}
```
EchoClient.java
```java
public class EchoClient {
    public static void main(String[] args) throws Exception {
        String host = "localhost";
        if (args.length > 1) {
            host = args[0];
        }
        int port = 8091;
        if (args.length > 1) {
            port = Integer.parseInt(args[1]);
        }

        EventLoopGroup workerGroup = new NioEventLoopGroup();

        try {
            Bootstrap b = new Bootstrap(); // (1)
            b.group(workerGroup); // (2)
            b.channel(NioSocketChannel.class); // (3)
            b.option(ChannelOption.TCP_NODELAY, true);
            b.handler(new ChannelInitializer<SocketChannel>() {
                @Override
                public void initChannel(SocketChannel ch) throws Exception {
                    ch.pipeline().addLast(
                            new LoggingHandler(LogLevel.TRACE),
                            new StringEncoder(),
                            new StringDecoder(),
                            new EchoClientHandler());
                }
            });

            // Start the client.
            ChannelFuture f = b.connect(host, port).sync(); // (5)

            // Wait until the connection is closed.
            f.channel().closeFuture().sync();

            System.out.println("Message sent from client successfully.");
        } finally {
            workerGroup.shutdownGracefully();
        }
    }
}

public class EchoClientHandler extends SimpleChannelInboundHandler<String> {

    @Override
    public void channelActive(ChannelHandlerContext ctx) throws Exception {
        String message = "message from client.";
        System.out.println("Sending message: " + message);
        ctx.writeAndFlush(message);
    }

    @Override
    public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) {
        System.out.println("Error caught in the communication service: " + cause);
        ctx.close();
    }

    @Override
    protected void channelRead0(ChannelHandlerContext ctx, String msg) throws Exception {
        System.out.println("Received message: " + msg);
    }
}
```
Output.
```raw
# Output from Server
Server is listening on port 8091.
Sending message: message from server.
Received message: message from client.

# Output from Client
Sending message: message from client.
Received message: message from server.
Received message: message from client.
```

## 4. Source Files
* [Source files of Netty Server on Github](https://github.com/jojozhuang/tutorial-examples/tree/master/netty-server)

## 5. References
* [Netty - User guide for 4.x](https://netty.io/wiki/user-guide-for-4.x.html#wiki-h3-4)
* [Introduction to Netty](https://www.baeldung.com/netty)
* [Netty Tutorial](http://tutorials.jenkov.com/netty/index.html)
* [Java netty client cannot send message to server, but telnet to sever ok](https://stackoverflow.com/questions/47675650/java-netty-client-cannot-send-message-to-server-but-telnet-to-sever-ok?rq=1)
