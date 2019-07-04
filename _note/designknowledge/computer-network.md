---
layout: tutorial
key: note
title: "Computer Network"
index: 201
category: design-knowledge
breadcrumb: [Note, System Design, Design Knowledge]
image: interview.png
date: 2016-03-03
postdate: 2016-03-03
tags: [OSI, HTTP, TCP, UDP]
---

> OSI, HTTP, TCP, UDP

## 1. OSI Model
Open Systems Interconnection(OSI) 7 layer model.
<table>
    <tr>
       <th colspan="6" style="text-align:center;">OSI model</th>
    </tr>
    <tr>
       <th colspan="3" style="text-align:center;">Layer</th>
       <th style="text-align:center;">Protocol data unit (PDU)</th>
       <th style="text-align:center;">Function</th>
    </tr>
    <tr>
       <th rowspan="4">Host<br>layers</th>
       <td>7</td>
       <td>Application</td>
       <td rowspan="3">Data</td>
       <td><small>High-level APIs, including resource sharing, remote file access</small></td>
    </tr>
    <tr>
       <td>6</td>
       <td>Presentation</td>
       <td><small>Translation of data between a networking service and an application; including character encoding, data compression and encryption/decryption</small></td>
    </tr>
    <tr>
       <td>5</td>
       <td>Session</td>
       <td><small>Managing communication sessions, i.e. continuous exchange of information in the form of multiple back-and-forth transmissions between two nodes</small></td>
    </tr>
    <tr>
       <td>4</td>
       <td>Transport</td>
       <td>Segment, Datagram</td>
       <td><small>Reliable transmission of data segments between points on a network, including segmentation, acknowledgement and multiplexing</small></td>
    </tr>
    <tr>
       <th rowspan="3">Media<br>layers</th>
      <td>3</td>
      <td>Network<</td>
      <td>Packet</td>
      <td><small>Structuring and managing a multi-node network, including addressing, routing and traffic control</small></td>
    </tr>
    <tr>
       <td>2</td>
       <td>Data link</td>
       <td>Frame</td>
       <td><small>Reliable transmission of data frames between two nodes connected by a physical layer</small></td>
    </tr>
    <tr>
       <td>1</td>
       <td>Physical</td>
       <td>Symbol</td>
       <td><small>Transmission and reception of raw bit streams over a physical medium</small></td>
    </tr>
</table>

Each layer has particular protocols for communication.
![image](/public/images/note/201/osi_model.jpg){:width="750px"}
OSI is a 7 layer architecture with each layer having specific functionality to perform. All these 7 layers work collaboratively to transmit the data from one person to another across the globe.
![image](/public/images/note/201/osi_model2.png){:width="600px"}
A simple mnemonic for memorizing the names of OSI layers - `All People Seem To Need Data Processing`.
![image](/public/images/note/201/osi_memorize.png){:width="400px"}

## 2. Hypertext Transfer Protocol (HTTP)
HTTP is a method for encoding and transporting data between a client and a server.  It is a `request/response` protocol: clients issue requests and servers issue responses with relevant content and completion status info about the request.  HTTP is self-contained, allowing requests and responses to flow through many intermediate routers and servers that perform load balancing, caching, encryption, and compression.

A basic HTTP request consists of a verb (method) and a resource (endpoint).  Below are common HTTP verbs:

| Verb | Description | Idempotent* | Safe | Cacheable |
|---|---|---|---|---|
| GET | Reads a resource | Yes | Yes | Yes |
| POST | Creates a resource or trigger a process that handles data | No | No | Yes if response contains freshness info |
| PUT | Creates or replace a resource | Yes | No | No |
| PATCH | Partially updates a resource | No | No | Yes if response contains freshness info |
| DELETE | Deletes a resource | Yes | No | No |
{: .table-striped }

* `Idempotent`: Can be called many times without different outcomes.

HTTP is an `application layer` protocol relying on lower-level protocols such as **TCP** and **UDP**.

## 3. Transmission Control Protocol (TCP)
TCP is one of the main protocols in TCP/IP networks. Whereas the IP protocol deals only with `packets`, TCP enables two hosts to establish a connection and exchange streams of data. TCP guarantees delivery of data and also guarantees that packets will be delivered in the same order in which they were sent.
![image](/public/images/note/201/tcp.jpg){:width="600px"}

TCP is a connection-oriented protocol over an [IP network](https://en.wikipedia.org/wiki/Internet_Protocol).  Connection is established and terminated using a [handshake](https://en.wikipedia.org/wiki/Handshaking).  All packets sent are guaranteed to reach the destination in the original order and without corruption through:

* Sequence numbers and [checksum fields](https://en.wikipedia.org/wiki/Transmission_Control_Protocol#Checksum_computation) for each packet
* [Acknowledgement](https://en.wikipedia.org/wiki/Acknowledgement_(data_networks)) packets and automatic retransmission

If the sender does not receive a correct response, it will resend the packets.  If there are multiple timeouts, the connection is dropped.  TCP also implements [flow control](https://en.wikipedia.org/wiki/Flow_control_(data)) and [congestion control](https://en.wikipedia.org/wiki/Network_congestion#Congestion_control).  These guarantees cause delays and generally result in less efficient transmission than UDP.

To ensure high throughput, web servers can keep a large number of TCP connections open, resulting in high memory usage.  It can be expensive to have a large number of open connections between web server threads and say, a [memcached](https://memcached.org/) server.  [Connection pooling](https://en.wikipedia.org/wiki/Connection_pool) can help in addition to switching to UDP where applicable.

TCP is useful for applications that require high reliability but are less time critical.  Some examples include web servers, database info, SMTP, FTP, and SSH.

Use TCP over UDP when:
* You need all of the data to arrive intact
* You want to automatically make a best estimate use of the network throughput

### 3.1 TCP 3-Way Handshakes
To establish a connection, TCP uses a `three-way handshake`. Before a client attempts to connect with a server, the server must first bind to and listen at a port to open it up for connections: this is called a `passive open`. Once the passive open is established, a client may initiate an `active open`. To establish a connection, the three-way (or 3-step) handshake occurs:
* `SYN`: The active open is performed by the client sending a SYN to the server. The client sets the segment's sequence number to a random value A.
* `SYN-ACK`: In response, the server replies with a SYN-ACK. The acknowledgment number is set to one more than the received sequence number i.e. A+1, and the sequence number that the server chooses for the packet is another random number, B.
* `ACK`: Finally, the client sends an ACK back to the server. The sequence number is set to the received acknowledgement value i.e. A+1, and the acknowledgement number is set to one more than the received sequence number i.e. B+1.

At this point, both the client and server have received an acknowledgment of the connection. The steps 1, 2 establish the connection parameter (sequence number) for one direction and it is acknowledged. The steps 2, 3 establish the connection parameter (sequence number) for the other direction and it is acknowledged. With these, a full-duplex communication is established.

![image](/public/images/note/201/three_way_handshake.gif){:width="600px"}


## 4. User Datagram Protocol (UDP)
User Datagram Protocol (UDP) is part of the Internet Protocol suite used by programs running on different computers on a network. UDP is used to send short messages called datagrams but overall, it is an unreliable, connectionless protocol.
![image](/public/images/note/201/udp.jpg){:width="600px"}

UDP is connectionless. Datagrams (analogous to packets) are guaranteed only at the `datagram` level.  Datagrams might reach their destination out of order or not at all.  UDP does not support congestion control.  Without the guarantees that TCP support, UDP is generally more efficient.

UDP can broadcast, sending datagrams to all devices on the subnet.  This is useful with [DHCP](https://en.wikipedia.org/wiki/Dynamic_Host_Configuration_Protocol) because the client has not yet received an IP address, thus preventing a way for TCP to stream without the IP address.

UDP is less reliable but works well in real time use cases such as VoIP, video chat, streaming, and realtime multiplayer games.

Use UDP over TCP when:

* You need the lowest latency
* Late data is worse than loss of data
* You want to implement your own error correction

# 5. Reference
* [Wikipedia - OSI model](https://en.wikipedia.org/wiki/OSI_model)
* [OSI Model Layers](https://medium.com/@madhavbahl10/osi-model-layers-explained-ee1d43058c1f)
* [Computer Network - Layers of OSI Model](https://www.geeksforgeeks.org/layers-osi-model/)
* [TCP 3-way handshake](https://ddos-guard.net/en/terminology/protocols/tcp-3-way-handshake)

#### Source(s) and further reading: HTTP
* [What is HTTP?](https://www.nginx.com/resources/glossary/http/)
* [Difference between HTTP and TCP](https://www.quora.com/What-is-the-difference-between-HTTP-protocol-and-TCP-protocol)
* [Difference between PUT and PATCH](https://laracasts.com/discuss/channels/general-discussion/whats-the-differences-between-put-and-patch?page=1)

#### Source(s) and further reading: TCP and UDP
* [Networking for game programming](http://gafferongames.com/networking-for-game-programmers/udp-vs-tcp/)
* [Key differences between TCP and UDP protocols](http://www.cyberciti.biz/faq/key-differences-between-tcp-and-udp-protocols/)
* [Difference between TCP and UDP](http://stackoverflow.com/questions/5970383/difference-between-tcp-and-udp)
* [Transmission control protocol](https://en.wikipedia.org/wiki/Transmission_Control_Protocol)
* [User datagram protocol](https://en.wikipedia.org/wiki/User_Datagram_Protocol)
* [Scaling memcache at Facebook](http://www.cs.bu.edu/~jappavoo/jappavoo.github.com/451/papers/memcache-fb.pdf)
