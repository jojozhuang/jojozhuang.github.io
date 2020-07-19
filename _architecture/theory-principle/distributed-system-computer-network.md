---
layout: tutorial
key: architecture
title: "Distributed System - Computer Network"
index: 3003
subcategory: theory-principle
date: 2018-08-15
tags: [OSI, HTTP, TCP, and UDP]
---

> OSI, HTTP, TCP, and UDP

## 1. OSI Model
### 1.1 Seven-Layer OSI Model
Open Systems Interconnection(OSI) 7 layer model.
<div class="table-responsive-sm">  
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
      <td>Network</td>
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
</div>
### 1.2 Protocols
Each layer has particular protocols for communication.
![image](/assets/images/note/9503/osi_model.jpg){:width="700px"}
### 1.3 Transmission Flow
OSI is a 7 layer architecture with each layer having specific functionality to perform. All these 7 layers work collaboratively to transmit the data from one person to another across the globe.
![image](/assets/images/note/9503/osi_model2.png){:width="500px"}
### 1.4 Mnemonic
A simple mnemonic for memorizing the names of OSI layers - `All People Seem To Need Data Processing`.
![image](/assets/images/note/9503/osi_memorize.png){:width="300px"}

## 2. Hypertext Transfer Protocol (HTTP)
### 2.1 What is HTTP?
HTTP is a method for encoding and transporting data between a client and a server. It is a `request/response` protocol: clients issue requests and servers issue responses with relevant content and completion status info about the request. HTTP is self-contained, allowing requests and responses to flow through many intermediate routers and servers that perform load balancing, caching, encryption, and compression. HTTP is an `application layer` protocol relying on lower-level protocols such as `TCP` and `UDP`.
### 2.2 HTTP Verbs
A basic HTTP request consists of a verb (method) and a resource (endpoint). Below are common HTTP verbs:

<div class="table-responsive-sm" markdown="block">  

| Verb | Description | Idempotent* | Safe | Cacheable |
|---|---|---|---|---|
| GET | Reads a resource | Yes | Yes | Yes |
| POST | Creates a resource or trigger a process that handles data | No | No | Yes if response contains freshness info |
| PUT | Creates or replace a resource | Yes | No | No |
| PATCH | Partially updates a resource | No | No | Yes if response contains freshness info |
| DELETE | Deletes a resource | Yes | No | No |
{: .table-striped }

</div>
* `Idempotent`: Can be called many times without different outcomes.

### 2.3 Source(s) and further reading: HTTP
* [What is HTTP?](https://www.nginx.com/resources/glossary/http/)
* [Difference between HTTP and TCP](https://www.quora.com/What-is-the-difference-between-HTTP-protocol-and-TCP-protocol)
* [Difference between PUT and PATCH](https://laracasts.com/discuss/channels/general-discussion/whats-the-differences-between-put-and-patch?page=1)

## 3. Transmission Control Protocol (TCP)
### 3.1 What is TCP?
TCP is one of the main protocols in TCP/IP networks. Whereas the IP protocol deals only with `packets`, TCP enables two hosts to establish a connection and exchange streams of data. TCP guarantees delivery of data and also `guarantees` that packets will be delivered in the same order in which they were sent.
![image](/assets/images/note/9503/tcp.jpg){:width="550px"}
### 3.2 How TCP works?
TCP is a connection-oriented protocol over an [IP network](https://en.wikipedia.org/wiki/Internet_Protocol). Connection is established and terminated using a [handshake](https://en.wikipedia.org/wiki/Handshaking). All packets sent are guaranteed to reach the destination in the original order and without corruption through:
* Sequence numbers and [checksum fields](https://en.wikipedia.org/wiki/Transmission_Control_Protocol#Checksum_computation) for each packet
* [Acknowledgement](https://en.wikipedia.org/wiki/Acknowledgement_(data_networks)) packets and automatic retransmission

If the sender does not receive a correct response, it will resend the packets. If there are multiple timeouts, the connection is dropped. TCP also implements [flow control](https://en.wikipedia.org/wiki/Flow_control_(data)) and [congestion control](https://en.wikipedia.org/wiki/Network_congestion#Congestion_control). These guarantees cause delays and generally result in less efficient transmission than UDP.

To ensure high throughput, web servers can keep a large number of TCP connections open, resulting in high memory usage. It can be expensive to have a large number of open connections between web server threads and say, a [memcached](https://memcached.org/) server. [Connection pooling](https://en.wikipedia.org/wiki/Connection_pool) can help in addition to switching to UDP where applicable.
### 3.3 TCP Connection Establishment
To establish a connection, TCP uses a `3-way handshake`.
![image](/assets/images/note/9503/three_way_handshake.gif){:width="600px"}
Before a client attempts to connect with a server, the server must first bind to and listen at a port to open it up for connections: this is called a `passive open`. Once the passive open is established, a client may initiate an `active open`. To establish a connection, the three-way (or 3-step) handshake occurs:
* `SYN`: The active open is performed by the client sending a SYN to the server. The client sets the segment's sequence number to a random value A.
* `SYN-ACK`: In response, the server replies with a SYN-ACK. The acknowledgment number is set to one more than the received sequence number i.e. A+1, and the sequence number that the server chooses for the packet is another random number, B.
* `ACK`: Finally, the client sends an ACK back to the server. The sequence number is set to the received acknowledgement value i.e. A+1, and the acknowledgement number is set to one more than the received sequence number i.e. B+1.

At this point, both the client and server have received an acknowledgment of the connection. The steps 1, 2 establish the connection parameter (sequence number) for one direction and it is acknowledged. The steps 2, 3 establish the connection parameter (sequence number) for the other direction and it is acknowledged. With these, a full-duplex communication is established.
### 3.4 TCP Connection Termination
Termination of TCP Connection, which uses `4-way handshake`.
![image](/assets/images/note/9503/four_way_handshake.png){:width="500px"}
* Step 1 (FIN From Client) – Suppose that the client application decides it wants to close the connection. (Note that the server could also choose to close the connection). This causes the client send a TCP segment with the FIN bit set to 1 to server and to enter the FIN_WAIT_1 state. While in the FIN_WAIT_1 state, the client waits for a TCP segment from the server with an acknowledgment (ACK).
* Step 2 (ACK From Server) – When Server received FIN bit segment from Sender (Client), Server Immediately send acknowledgement (ACK) segment to the Sender (Client).
* Step 3 (Client waiting) – While in the FIN_WAIT_1 state, the client waits for a TCP segment from the server with an acknowledgment. When it receives this segment, the client enters the FIN_WAIT_2 state. While in the FIN_WAIT_2 state, the client waits for another segment from the server with the FIN bit set to 1.
* Step 4 (FIN from Server) – Server sends FIN bit segment to the Sender(Client) after some time when Server send the ACK segment (because of some closing process in the Server).
* Step 5 (ACK from Client) – When Client receive FIN bit segment from the Server, the client acknowledges the server’s segment and enters the TIME_WAIT state. The TIME_WAIT state lets the client resend the final acknowledgment in case the ACK is lost.The time spent by client in the TIME_WAIT state is depend on their implementation, but their typical values are 30 seconds, 1 minute, and 2 minutes. After the wait, the connection formally closes and all resources on the client side (including port numbers and buffer data) are released.

### 3.5 When Use TCP?
TCP is useful for applications that require high reliability but are less time critical. Some examples include web servers, database info, SMTP, FTP, and SSH.

Use TCP over UDP when:
* You need all of the data to arrive intact
* You want to automatically make a best estimate use of the network throughput

## 4. User Datagram Protocol (UDP)
### 4.1 What is UDP?
User Datagram Protocol (UDP) is part of the Internet Protocol suite used by programs running on different computers on a network. UDP is used to send short messages called `datagrams` but overall, it is an `unreliable`, connectionless protocol.
![image](/assets/images/note/9503/udp.jpg){:width="550px"}
### 4.2 How it Works?
UDP is `connectionless`. Datagrams (analogous to packets) are guaranteed only at the `datagram` level. Datagrams might reach their destination out of order or not at all. UDP does not support congestion control. Without the guarantees that TCP support, UDP is generally more efficient.

UDP can broadcast, sending datagrams to all devices on the subnet. This is useful with [DHCP](https://en.wikipedia.org/wiki/Dynamic_Host_Configuration_Protocol) because the client has not yet received an IP address, thus preventing a way for TCP to stream without the IP address.

### 4.3 When use UDP?
UDP is less reliable but works well in real time use cases such as VoIP, video chat, streaming, and realtime multiplayer games.

Use UDP over TCP when:
* You need the lowest latency
* Late data is worse than loss of data
* You want to implement your own error correction

### 4.4 Source(s) and further reading: TCP and UDP
* [Networking for game programming](http://gafferongames.com/networking-for-game-programmers/udp-vs-tcp/)
* [Key differences between TCP and UDP protocols](http://www.cyberciti.biz/faq/key-differences-between-tcp-and-udp-protocols/)
* [Difference between TCP and UDP](http://stackoverflow.com/questions/5970383/difference-between-tcp-and-udp)
* [Transmission control protocol](https://en.wikipedia.org/wiki/Transmission_Control_Protocol)
* [User datagram protocol](https://en.wikipedia.org/wiki/User_Datagram_Protocol)
* [Scaling memcache at Facebook](http://www.cs.bu.edu/~jappavoo/jappavoo.github.com/451/papers/memcache-fb.pdf)

# 5. Reference
* [The System Design Primer - Communication](https://github.com/donnemartin/system-design-primer/blob/master/README.md#communication)
* [Wikipedia - OSI model](https://en.wikipedia.org/wiki/OSI_model)
* [OSI Model Layers](https://medium.com/@madhavbahl10/osi-model-layers-explained-ee1d43058c1f)
* [Computer Network - Layers of OSI Model](https://www.geeksforgeeks.org/layers-osi-model/)
* [Computer Network - TCP 3-Way Handshake Process](https://www.geeksforgeeks.org/computer-network-tcp-3-way-handshake-process/)
* [Computer Network - TCP Connection Termination](https://www.geeksforgeeks.org/computer-network-tcp-connection-termination/)
* [TCP 3-way handshake](https://ddos-guard.net/en/terminology/protocols/tcp-3-way-handshake)
