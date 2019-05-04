---
layout: programming
key: programming
title: "System Design Interview Questions"
index: 151
category: interview
image: programming/interview.png
date: 2016-03-01
postdate: 2016-03-01
tags: [System Design]
---

> Best Practice and Common Questions for System Design.

## 1. Best Practice for Onsite Interview
### 1.1 Generic Tips
* Focus on what I've already known
* Truly understand the problem
* Break down the problem
* Don't dig too deep until is asked by the interviewer
* Engage the interviewer
* Follow the hint, familiar with the trade off

### 1.2 Process Tips
* Scenario: Function Scope, Use Cases, UI, Web/Mobile
* Constraints: Data Volume, Limit of Storage, Low Performance CPU, Traffic, Memory, Storage
* High Level Design & Application: Architecture, Diagram, Services
* Data: DB Design, Store, Query, Cache
* Analyze & Go back: Constrains, Trade-off, Performance, Scalability, Robustness

### 1.3 Presentation Tips:
* Discuss the requirements and constrains
* High level design, Diagram of Architecture, including the main services or components.
* Ask/Pick up one topic to dig deep, know the trade off for different decisions you made
* Go over the common components: Caching , Load Balance, etc

### 1.4 Popular Questions
* Logging System
* File Sharing
* Online Editing
* Chatting System
* Location Service
* Rate Limiter
* Top K
* Big File Search
* Timeline, News Feeds

### 1.5 Components
* Load Balance
* Cache(LRU)
* CDNs
* Consistent hashing
* 80/20 rule

### 1.6 Basic Knowledge for System Design
Key Concepts1:
* Vertical vs Horizontal Scaling
* CAP theorem: Consistency, Availability, Partition tolerance
* ACID vs BASE
* Partitioning/Sharding Data-consistent hashing
* Optimistic vs Pessimistic Locking
* Strong vs Eventual consistency
* Relational DB vs NoSQL
* Type of NoSQL: Key value, wide column, document based, graph based
* Caching
* Data Center/Rocks/Hosts
* CPU/Memory/Hard Drive/Network bandwidth
* Random vs Sequential, read/write a disk

Key Concepts2:
* http vs http2 vs websocket
* TCP/IP model: 4 layers
* IPv4 vs IPv6
* TCP vs UDP
* DNS lookup
* Https & TCS
* Public key infrastructure & Certificate Authority
* Symmetric vs Asymmetric Encryption
* Load Balancer -L4 vs L7
* CDNs & Edge
* Bloom Filters & Count-min sketch
* Paxos-Consensus over distributed hosts-leader election
* Design patterns & Objected oriented Design
* Virtual Machine & containers
* Publiser-subscriber over queue
* Map reduce
* Multi-threading, concurrency, locks, synchronization, CAS

Tools/Softwares:
* Cassandra
* MongoDB/Couchbase
* MySQL
* Memcached
* Redis
* Zookeeper
* Kafka
* NGINX
* HAProxy
* Solr, Elastic Search
* Blobstore like Amazon S3
* Docker,Kubernets, mesos
* Hadoop/Spark, HDFS

### 1.6 References
* [System Design Introduction For Interview](https://www.youtube.com/watch?v=UzLMhqg3_Wc&t=1216s)
* [System Design Interview - Approach and structure - How To Part1](https://www.youtube.com/watch?v=0163cssUxLA&list=PLA8lYuzFlBqAy6dkZHj5VxUAaqr4vwrka)

## 2. Design TinyUrl(URL shortening service)
### 2.1 Requirements
Functional Requirements:
* Given a URL, our service should generate a `shorter` and `unique` alias of it. This is called a short link.
* When users access a short link, our service should redirect them to the `original link`.
* Users should optionally be able to pick a custom short link for their URL.
* Links will expire after a standard default timespan. Users should be able to specify the expiration time.

Non-Functional Requirements:
* The system should be `highly available`. This is required because, if our service is down, all the URL redirections will start failing.
* URL redirection should happen in `real-time` with minimal latency.
* Shortened links should not be guessable (`not predictable`).

Extended Requirements:
* Analytics; e.g., how many times a redirection happened?
* Our service should also be accessible through REST APIs by other services.

### 2.2 Capacity Estimation and Constraints
* Heavy read

Estimation:
* Traffic estimates(incoming request)
* Storage estimates
* Bandwidth estimates(read/write)
* Memory estimates

### 2.3 System APIs
* createURL(api_dev_key, original_url, custom_alias=None, user_name=None, expire_date=None)
* deleteURL(api_dev_key, url_key)

### 2.4 Database Design
We would need two tables: one for storing information about the URL mappings, and one for the user’s data who created the short link.

What kind of database should we use? Since we anticipate storing billions of rows, and we don’t need to use relationships between objects – a `NoSQL key-value` store like DynamoDB, Cassandra or Riak is a better choice.

### 2.5 Basic System Design and Algorithm
a) Encoding actual URL
![image](/public/programming/system-design-interview-questions/tinyurl_encoding.png){:width="800px"}
b) Generating keys offline
![image](/public/programming/system-design-interview-questions/tinyurl_offline.png){:width="800px"}

### 2.6 Cache
* Cache capacity: 20% of daily traffic
* Cache eviction policy: Least Recently Used (LRU)
* Update cache
![image](/public/programming/system-design-interview-questions/tinyurl_cache.png){:width="800px"}

### 2.7 Load Balancer
We can add a Load balancing layer at three places in our system:
* Between Clients and Application servers
* Between Application Servers and database servers
* Between Application Servers and Cache servers

### 2.8 Purging or DB cleanup
Delete links which are expired.
![image](/public/programming/system-design-interview-questions/tinyurl_achitecture.png){:width="800px"}

### 2.9 Random Id Generator
Base62 and Base36
```java
public class RandomIdGenerator {
    private static char[] _base62chars =
            "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".toCharArray();

    private static Random _random = new Random();

    public static String GetBase62(int length)
    {
        StringBuilder sb = new StringBuilder(length);

        for (int i = 0; i < length; i++)
            sb.append(_base62chars[_random.nextInt(62)]);

        return sb.toString();
    }

    public static String GetBase36(int length)
    {
        StringBuilder sb = new StringBuilder(length);

        for (int i=0; i < length; i++)
            sb.append(_base62chars[_random.nextInt(36)]);

        return sb.toString();
    }
}
```
Test class
```java
public class RandomIdGeneratorTest {

    @Test
    public void tesRandomIdGenerator() {
        System.out.println("tesRandomIdGenerator");

        // create five IDs of six, base 62 characters
        for (int i = 0; i < 5; i++) {
            System.out.println(RandomIdGenerator.GetBase62(6));
        }

        // create five IDs of eight base 36 characters
        for (int i = 0; i < 5; i++) {
            System.out.println(RandomIdGenerator.GetBase36(8));
        }
    }
}
```
Output.
```sh
kXyqhd
dj2hRs
HuuCar
NIDFdK
dc0xV1
UVCOLG33
QAOZ3ENW
I42VA1AI
BTS30GXA
CXD8AEEY
```

### 2.4 References
* [System Design : Design a service like TinyUrl](https://www.youtube.com/watch?v=fMZMm_0ZhK4)
* [Generating human-readable/usable, short but unique IDs](https://stackoverflow.com/questions/9543715/generating-human-readable-usable-short-but-unique-ids)

## 3. Design Pastebin(Text Sharing)
### 3.1 Requirements
Functional Requirements:
* Users should be able to upload or “paste” their data and get a unique URL to access it.
* Data and links will expire after a specific timespan automatically; users should also be able to specify expiration time.
* Users should optionally be able to pick a custom alias for their paste.

Non-Functional Requirements:
* The system should be highly reliable, any data uploaded should not be lost.
* The system should be highly available. This is required because if our service is down, users will not be able to access their Pastes.
* Users should be able to access their Pastes in real-time with minimum latency.
* Paste links should not be guessable (not predictable).

Extended Requirements:
* Analytics, e.g., how many times a paste was accessed?
* Our service should also be accessible through REST APIs by other services.

### 3.2 High Level Design
![image](/public/programming/system-design-interview-questions/pastebin_highlevel.png){:width="600px"}
### 3.3 Database Design
![image](/public/programming/system-design-interview-questions/pastebin_db.png){:width="600px"}
### 3.4 Component Design
* Application Server
* Key Generation Service
* Metadata database
* Object storage

![image](/public/programming/system-design-interview-questions/pstebin_architecture.png){:width="800px"}

## 4. Design Instagram(Photo Sharing)
### 4.1 Requirements
Functional Requirements:
* Users should be able to `upload/download/view photos`.
* Users can perform `searches` based on photo/video titles.
* Users can follow other users.
* The system should be able to generate and display a user’s `News Feed` consisting of top photos from all the people the user follows.

Non-functional Requirements:
* Our service needs to be highly available.
* The acceptable latency of the system is 200ms for News Feed generation.
* Consistency can take a hit (in the interest of availability), if a user doesn’t see a photo for a while; it should be fine.
* The system should be highly reliable; any uploaded photo or video should never be lost.

Not in scope:
* searching photos on tags
* commenting on photos
* tagging users to photos
* who to follow, etc.

### 4.2 Key Design Considerations
* This system is read-heavy, system should retrieve photos quickly.
* Practically, users can upload as many photos as they like. Efficient management of `storage` should be a crucial factor while designing this system.
* Low latency is expected while viewing photos.

### 4.3 High Level System Design
![image](/public/programming/system-design-interview-questions/instagram_highlevel.png){:width="800px"}
### 4.4 Database
![image](/public/programming/system-design-interview-questions/instagram_db.png){:width="800px"}
* Store photos in a distributed file storage like HDFS or S3.
* Store schema in a distributed key-value store, like Cassandra.

### 4.5 Component Design
![image](/public/programming/system-design-interview-questions/instagram_component.png){:width="800px"}
### 4.6 Reliability and Redundancy
![image](/public/programming/system-design-interview-questions/instagram_redundancy.png){:width="800px"}

## 5. Design Dropbox(File Hosting)
Cloud Storage, Cloud file storage services
### 5.1 Requirements
* Users should be able to `upload` and `download` their files/photos from any device.
* Users should be able to `share` files or folders with other users.
* Our service should support `automatic synchronization` between devices, i.e., after updating a file on one device, it should get synchronized on all devices.
* The system should support storing large files up to a GB.
* ACID-ity is required. Atomicity, Consistency, Isolation and Durability of all file operations should be guaranteed.
* Our system should support offline editing. Users should be able to add/delete/modify files while offline, and as soon as they come online, all their changes should be synced to the remote servers and other online devices.

### 5.3 Some Design Considerations
* We should expect huge `read` and `write` volumes.
* Read to write ratio is expected to be nearly the same.
* Internally, files can be stored in small parts or `chunks` (say 4MB); this can provide a lot of benefits i.e. all failed operations shall only be retried for smaller parts of a file. If a user fails to upload a file, then only the failing chunk will be retried.
* We can reduce the amount of data exchange by transferring updated chunks only.
* By removing duplicate chunks, we can save storage space and bandwidth usage.
* Keeping a local copy of the metadata (file name, size, etc.) with the client can save us a lot of round trips to the server.
* For small changes, clients can intelligently upload the diffs instead of the whole chunk.

### 5.4 High Level Design
![image](/public/programming/system-design-interview-questions/dropbox_highlevel.png){:width="800px"}
* `Workspace folder` on client device.
* Any change in the workspace will be reflected to cloud storage, vice versa.
* `Metadata server` to store file name, file size, directory, etc. to `Metadata storage`(SQL or NoSQL Database).
* `Block servers` works with clients to upload/download files from `cloud storage`. Fi
* `Synchronization servers` notify all clients about different changes.

### 5.5 Component Design
a. Client:
* Upload and download files.
* Detect file changes in the workspace folder.
* Handle conflict due to offline or concurrent updates.

How can clients efficiently listen to changes happening with other clients? `HTTP long polling`.

Four parts of the client:
![image](/public/programming/system-design-interview-questions/dropbox_client.png){:width="800px"}
* Internal Metadata Database: Keep track of all the files, chunks, their versions, and their location in the file system.
* Chunker: Split the files into smaller chunks and reconstruct a file from its chunks.
* Watcher: Monitor the local workspace folders and notify the Indexer.
* Indexer: Process the events received from the Watcher and update the internal metadata database with information about the chunks of the modified files.

b. Metadata Database
* Chunks
* Files
* User
* Devices
* Workspace (sync folders)

c. Synchronization Service  
The Synchronization Service is the component that processes file updates made by a client and applies these changes to other subscribed clients. It also synchronizes clients’ local databases with the information stored in the remote Metadata DB. The Synchronization Service is the most important part of the system architecture due to its critical role in managing the metadata and synchronizing users’ files. `Only the part of the file that has been changed is transmitted.`

d. Message Queuing Service  
Two types of queues:
![image](/public/programming/system-design-interview-questions/dropbox_messagequeue.png){:width="800px"}
* Request Queue: Clients’ requests to update the Metadata Database will be sent to the Request Queue.
* Response Queue: Response Queues that correspond to individual subscribed clients are responsible for delivering the update messages to each client.

e. Cloud/Block Storage
![image](/public/programming/system-design-interview-questions/dropbox_block.png){:width="800px"}

### 5.6 File Processing Workflow
* 1) Client A uploads chunks to cloud storage.
* 2) Client A updates metadata and commits changes.
* 3) Client A gets confirmation and notifications are sent to Clients B and C about the changes.
* 4) Client B and C receive metadata changes and download updated chunks.

### 5.7 Data Deduplication
Data deduplication is a technique used for eliminating duplicate copies of data to improve storage utilization. It can also be applied to network data transfers to reduce the number of bytes that must be sent. For each new incoming chunk, we can calculate a hash of it and compare that hash with all the hashes of the existing chunks to see if we already have the same chunk present in our storage.

We can implement deduplication in two ways in our system:
* Post-process deduplication: new chunks are first stored on the storage device and later some process analyzes the data looking for duplication.
* In-line deduplication: If our system identifies a chunk that it has already stored, only a reference to the existing chunk will be added in the metadata, rather than a full copy of the chunk.

### 5.8 Metadata Partitioning
* Vertical Partitioning
* Range Based Partitioning
* Hash-Based Partitioning

### 5.9 Caching
Cache replacement policy: LRU.

## 6. Design Facebook Messenger
### 6.1 Requirements
Functional Requirements:
* Messenger should support one-on-one conversations between users.
* Messenger should keep track of the online/offline statuses of its users.
* Messenger should support persistent storage of chat history.

Non-functional Requirements:
* Users should have real-time chat experience with minimum latency.
* Our system should be highly consistent; users should be able to see the same chat history on all their devices.
* Messenger’s high availability is desirable; we can tolerate lower availability in the interest of consistency.

Extended Requirements:
* Group Chats: Messenger should support multiple people talking to each other in a group.
* Push notifications: Messenger should be able to notify users of new messages when they are offline.

### 6.2 Capacity Estimation and Constraints
High level estimates:

---------------|----------------------
Total messages | 20 billion per day
Storage for each day | 2TB
Storage for 5 years | 3.6PB
Incomming data | 25MB/s
Outgoing data | 25MB/s

### 6.3 High Level Design
![image](/public/programming/system-design-interview-questions/facebook_msg_highlevel.png){:width="800px"}

Messaging workflow would look like this:
![image](/public/programming/system-design-interview-questions/facebook_msg_flow.png){:width="800px"}
* 1) User-A sends a message to User-B through the chat server.
* 2) The server receives the message and sends an acknowledgment to User-A.
* 3) The server stores the message in its database and sends the message to User-B.
* 4) User-B receives the message and sends the acknowledgment to the server.
* 5) The server notifies User-A that the message has been delivered successfully to User-B.

### 6.4 Detailed Component Design
High level use cases:
* Receive incoming messages and deliver outgoing messages.
* Store and retrieve messages from the database.
* Keep a record of which user is online or has gone offline, and notify all the relevant users about these status changes.

a. Messages Handling  
How would we efficiently send/receive messages? To send messages, a user needs to connect to the server and post messages for the other users. To get a message from the server, the user has two options:
* Pull model: Users can periodically ask the server if there are any new messages for them.
* Push model: Users can keep a connection open with the server and can depend upon the server to notify them whenever there are new messages.

How will clients maintain an open connection with the server? We can use `HTTP Long Polling` or `WebSockets`.

How can the server keep track of all the opened connection to redirect messages to the users efficiently? The server can maintain a `hash table`, where “key” would be the `UserID` and “value” would be the `connection object`.

What will happen when the server receives a message for a user who has gone offline?
* Server can notify the sender about the `delivery failure`.
* Retry from client side(sender).
* Retry from server side.

How should the server process a ‘deliver message’ request?
* 1) Store the message in the database.
* 2) Send the message to the receiver.
* 3) Send an `acknowledgment` to the sender.

How does the messenger `maintain the sequencing` of the messages? Keep a `sequence number` with every message for each client. This sequence number will determine the exact ordering of messages for EACH user. With this solution both clients will see a different view of the message sequence, but this view will be consistent for them on all devices.

b. Storing and retrieving the messages from the database  
Which storage system we should use?   
We `cannot` use RDBMS like MySQL or NoSQL like MongoDB because we cannot afford to read/write a row from the database every time a user receives/sends a message. This will not only make the basic operations of our service run with high latency, but also create a huge load on databases. The solution is to use HBase.

How should clients efficiently fetch data from the server?
Pagination. Page size could be different for different clients.

c. Managing user’s status
We need to keep track of user’s `online/offline status` and notify all the relevant users whenever a status change happens.
![image](/public/programming/system-design-interview-questions/facebook_msg_detail.png){:width="800px"}

Design Summary:
* Clients will open a connection to the chat server to send a message;
* the server will then pass it to the requested user.
* All the active users will keep a connection open with the server to receive messages.
* Whenever a new message arrives, the chat server will push it to the receiving user on the long poll request.
* Messages can be stored in HBase, which supports `quick small updates`, and range based searches.
* The servers can broadcast the online status of a user to other relevant users.
* Clients can pull status updates for users who are visible in the client’s viewport on a less frequent basis.

### 6.5 Data partitioning
Partitioning based on UserID.

## 7. Design Twitter(Social Networking)
### 7.1 Requirements
Functional Requirements:
* Users should be able to `post new tweets`.
* A user should be able to `follow other users`.
* Users should be able to mark tweets as favorites.
* The service should be able to create and display a user’s `timeline` consisting of top tweets from all the people the user follows.
* Tweets can contain photos and videos.

Non-functional Requirements:
* Our service needs to be highly available.
* Acceptable latency of the system is 200ms for timeline generation.
* Consistency can take a hit (in the interest of availability); if a user doesn’t see a tweet for a while, it should be fine.

Extended Requirements:
* Searching for tweets.
* Replying to a tweet.
* Trending topics – current hot topics/searches.
* Tagging other users.
* Tweet Notification.
* Who to follow? Suggestions?
* Moments.

### 7.2 High Level Design
Read-heavy system.
![image](/public/programming/system-design-interview-questions/twitter_highlevel.png){:width="800px"}
1) Posting Twitter
* User Alice posts a twitter
* The twitter is sent to Load Balancer
* LB dispatches the posting task one application node
* The twitter is stored in high speed in-memory database Redis.
* There may be hundreds of thousands Redis servers. But only three of them contains the instances of the same twitter.
* Update the timeline of followers by adding this twitter.

2) Accessing Timeline
* User Bob access his own timeline through browser.
* The Get request is send to Load Balancer.
* BL get response from three Redis servers.
* There may be hundreds of thousands Redis servers. But one user's timeline is stored in only three of them.
* User HashMap(User, Redis IP address) to create the lookup function to locate which three Redis servers contains the timeline for particular user.

Push or Pull?

### 7.3 Database Schema
Tables:
* User
* Tweet
* UserFollow

![image](/public/programming/system-design-interview-questions/twitter_db.png){:width="800px"}

Samples for table and their content.

User:

ID | Name   | Email         | ...
---|--------|---------------|----
1  | Johnny | abc@gmail.com |
2  | Alex   | b@xyz.com     |
3  | Sean   | liee@gas.com  |

Twitter:

ID | Title    | User ID | ...
---|----------|---------|-----
1  | Hello    |  2      |
2  | Greeting |  3      |

UserFollow:

ID | Follower ID
---|----------
1  | 2    
1  | 3
2  | 3

### 7.4 Data Sharding
* Sharding based on UserID
* Sharding based on TweetID
* Sharding based on Tweet creation time
* Sharding by TweedID and Tweet creation time

### 7.5 Cache
LRU, cache the past three days tweets/images/videos only.
![image](/public/programming/system-design-interview-questions/twitter_cache.png){:width="800px"}

## 8. Design Youtube(Video Sharing)
### 8.1 Requirements
Functional Requirements:
* Users should be able to upload videos.
* Users should be able to share and view videos.
* Users should be able to perform searches based on video titles.
* Our services should be able to record stats of videos, e.g., likes/dislikes, total number of views, etc.
* Users should be able to add and view comments on videos.

Non-Functional Requirements:
* The system should be highly reliable, any video uploaded should not be lost.
* The system should be highly available. Consistency can take a hit (in the interest of availability); if a user doesn’t see a video for a while, it should be fine.
* Users should have a real time experience while watching videos and should not feel any lag.

Not in scope:
* Video recommendations, most popular videos, channels, subscriptions, watch later, favorites, etc.

### 8.2 High Level Design
At a high-level we would need the following components:
* `Processing Queue`: Each uploaded video will be pushed to a processing queue to be de-queued later for encoding, thumbnail generation, and storage.
* `Encoder`: To encode each uploaded video into multiple formats.
* `Thumbnails generator`: To generate a few thumbnails for each video.
* `Video and Thumbnail storage`: To store video and thumbnail files in some distributed file storage.
* `User Database`: To store user’s information, e.g., name, email, address, etc.
* `Video metadata storage`: A metadata database to store all the information about videos like title, file path in the system, uploading user, total views, likes, dislikes, etc. It will also be used to store all the video comments.

![image](/public/programming/system-design-interview-questions/youtube_highlevel.png){:width="800px"}

### 8.3 Database Schema
* Video metadata storage - MySql
* User data storage - MySql

### 8.4 Detailed Component Design
![image](/public/programming/system-design-interview-questions/youtube_detailed.png){:width="800px"}
### 8.5 Metadata Sharding
* Sharding based on UserID
* Sharding based on VideoID

### 8.6 Video Deduplication
As soon as any user starts uploading a video, our service can run `video matching algorithms` (e.g., Block Matching, Phase Correlation, etc.) to find duplications.
### 8.7 Load Balancing
Consistent Hashing.
### 8.8 Cache
80/20 rule.

## 4. Design a Parking Lot
### 4.1 Questions/Clarification
* How many parking lots?
* Located in multiple levels?
* Free or cost?
* Size? S/M/L/XL? Motor? Car? Truck? Bus?

### 4.2 Features/Functions
* Search free spots
* Place vehicle
* Remove vehicle
* Pricing? Hourly/Whole Day?

### 4.3 Classes
Vehicle:
* License Plate
* Color

ParkingLot(zipcode: int):
-Spot: placeVehicle(Vehicle: vehicle);

Spot(id, size):
-Status: Free/Occupied
-Location

## 5. Messenger service like Whatsapp or WeChat
### 5.1 Questions/Clarification
* Text/Audio/Video?
* One to One? Group Chatting
* History?
* Asynchronous/instant？

### 5.2 Features/Functions
* Send message
* Push notifications

### 5.3 Infrastructure
* User -> Server(n) -> User
* Message Queue
* Handle if receiver is offline, keep the message in sequence

### 5.4 Class
User
-Id
Message
-Status: Draft/Sent/Delivered/Read by receiver

## 6. Uber Lyft ride sharing services
QUIC protocol(Quick UDP internet connections)
![image](/public/programming/system-design-interview-questions/uber_architecture.jpg)
* [Understanding QUIC wire protocol](https://medium.com/@nirosh/understanding-quic-wire-protocol-d0ff97644de7)

* [Geohash Intro](http://www.bigfastblog.com/geohash-intro)
* [Designing a Spacial Index](https://dzone.com/articles/designing-spacial-index)

QuadTree
* [An interactive explanation of quadtrees](https://jimkang.com/quadtreevis/)

### 6.1 Questions/Clarification

### 6.2 Features/Functions
* Match Driver and Rider

### 6.3 Infrastructure

### 6.4 Class
Driver
Rider
Trip

## 7. Rate Limiter
API Rate Limiter throttles users based upon the number of the requests they are sending.
Http State Code: 429 - Too Many Requests
* [Designing an API Rate Limiter](https://www.educative.io/collection/page/5668639101419520/5649050225344512/5707274949492736)

### 7.1 Why rate limiting is necessary?
* Avoid Abuse of the system: Denial-of-service (DOS) attacks, brute-force password attempt
* Build Reliable System: keep costs and resource usage under control


## 9. Key Words
* Queries Per Second (QPS)
