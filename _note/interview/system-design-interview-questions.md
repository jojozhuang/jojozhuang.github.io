---
layout: programming
key: programming
title: "System Design Interview Questions"
index: 151
category: interview
image: interview.png
date: 2016-03-01
postdate: 2016-03-01
tags: [System Design]
---

> Best Practice and Common Questions for System Design.

## 0. Todo
* Implementation of Consistent Hashing
* Message Queue
* Design Calendar https://www.jiuzhang.com/qa/3498/
* Top K https://www.bookstack.cn/read/system-design/cn-bigdata-heavy-hitters.md
* https://github.com/FreemanZhang/system-design/tree/master/linkedin
* https://www.jiuzhang.com/qa/219/
* https://github.com/FreemanZhang/system-design
* https://www.interviewbit.com/courses/system-design/topics/interview-questions/

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
* Rate Limiter
* Reverse Index for search
* bloom filters for de-depulicate

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

### 1.7 References
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

### 2.2 How it works(Todo)
Http status code 301, Redirect user to original url after decoding for the tiny url.
see the picture in phone(2019/05/08).
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
![image](/public/images/note/system-design-interview-questions/tinyurl_encoding.png){:width="800px"}
b) Generating keys offline
![image](/public/images/note/system-design-interview-questions/tinyurl_offline.png){:width="800px"}

### 2.6 Cache
* Cache capacity: 20% of daily traffic
* Cache eviction policy: Least Recently Used (LRU)
* Update cache
![image](/public/images/note/system-design-interview-questions/tinyurl_cache.png){:width="800px"}

### 2.7 Load Balancer
We can add a Load balancing layer at three places in our system:
* Between Clients and Application servers
* Between Application Servers and database servers
* Between Application Servers and Cache servers

### 2.8 Purging or DB cleanup
Delete links which are expired.
![image](/public/images/note/system-design-interview-questions/tinyurl_achitecture.png){:width="800px"}

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
![image](/public/images/note/system-design-interview-questions/pastebin_highlevel.png){:width="600px"}
### 3.3 Database Design
![image](/public/images/note/system-design-interview-questions/pastebin_db.png){:width="600px"}
### 3.4 Component Design
* Application Server
* Key Generation Service
* Metadata database
* Object storage

![image](/public/images/note/system-design-interview-questions/pstebin_architecture.png){:width="800px"}

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
![image](/public/images/note/system-design-interview-questions/instagram_highlevel.png){:width="800px"}
### 4.4 Database
![image](/public/images/note/system-design-interview-questions/instagram_db.png){:width="800px"}
* Store photos in a distributed file storage like HDFS or S3.
* Store schema in a distributed key-value store, like Cassandra.

### 4.5 Component Design
![image](/public/images/note/system-design-interview-questions/instagram_component.png){:width="800px"}
### 4.6 Reliability and Redundancy
![image](/public/images/note/system-design-interview-questions/instagram_redundancy.png){:width="800px"}

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
![image](/public/images/note/system-design-interview-questions/dropbox_highlevel.png){:width="800px"}
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
![image](/public/images/note/system-design-interview-questions/dropbox_client.png){:width="800px"}
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
![image](/public/images/note/system-design-interview-questions/dropbox_messagequeue.png){:width="800px"}
* Request Queue: Clients’ requests to update the Metadata Database will be sent to the Request Queue.
* Response Queue: Response Queues that correspond to individual subscribed clients are responsible for delivering the update messages to each client.

e. Cloud/Block Storage
![image](/public/images/note/system-design-interview-questions/dropbox_block.png){:width="800px"}

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
![image](/public/images/note/system-design-interview-questions/facebook_msg_highlevel.png){:width="800px"}

Messaging workflow would look like this:
![image](/public/images/note/system-design-interview-questions/facebook_msg_flow.png){:width="800px"}
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
![image](/public/images/note/system-design-interview-questions/facebook_msg_detail.png){:width="800px"}

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
![image](/public/images/note/system-design-interview-questions/twitter_highlevel.png){:width="800px"}
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

![image](/public/images/note/system-design-interview-questions/twitter_db.png){:width="800px"}

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
![image](/public/images/note/system-design-interview-questions/twitter_cache.png){:width="800px"}

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

![image](/public/images/note/system-design-interview-questions/youtube_highlevel.png){:width="800px"}

### 8.3 Database Schema
* Video metadata storage - MySql
* User data storage - MySql

### 8.4 Detailed Component Design
![image](/public/images/note/system-design-interview-questions/youtube_detailed.png){:width="800px"}
### 8.5 Metadata Sharding
* Sharding based on UserID
* Sharding based on VideoID

### 8.6 Video Deduplication
As soon as any user starts uploading a video, our service can run `video matching algorithms` (e.g., Block Matching, Phase Correlation, etc.) to find duplications.
### 8.7 Load Balancing
Consistent Hashing.
### 8.8 Cache
80/20 rule.

## 9. Rate Limiter
### 9.1 Usage of rate limiting
* Misbehaving clients/scripts
* Security
* To prevent abusive behavior and bad design practices
* To keep costs and resource usage under control
* Revenue
* To eliminate spikiness in traffic

### 9.2 Requirements
Functional Requirements:
* Limit the number of requests an entity can send to an API within a time window, e.g., 15 requests per second.
* The APIs are accessible through a cluster, so the rate limit should be considered across different servers. The user should get an error message whenever the defined threshold is crossed within a single server or across a combination of servers.

Non-Functional Requirements:
* The system should be highly available. The rate limiter should always work since it protects our service from external attacks.
* Our rate limiter should not introduce substantial latencies affecting the user experience.

### 9.3 Throttling
`Throttling` is the process of controlling the usage of the APIs by customers during a given period. Throttling can be defined at the application level and/or API level. When a throttle limit is crossed, the server returns HTTP status `429 - Too many requests`.

Different types of throttling:
* `Hard Throttling`: The number of API requests cannot exceed the throttle limit.
* `Soft Throttling`: In this type, we can set the API request limit to exceed a certain percentage. For example, if we have rate-limit of 100 messages a minute and 10% exceed-limit, our rate limiter will allow up to 110 messages per minute.
* `Elastic or Dynamic Throttling`: Under Elastic throttling, the number of requests can go beyond the threshold if the system has some resources available. For example, if a user is allowed only 100 messages a minute, we can let the user send more than 100 messages a minute when there are free resources available in the system.

### 9.4 Algorithms used for Rate Limiting
* Fixed Window Algorithm
* Rolling Window Algorithm

![image](/public/images/note/system-design-interview-questions/ratelimiter_algorithm.png){:width="800px"}
Problem with fixed window. It may allow twice the number of requests per minute.
![image](/public/images/note/system-design-interview-questions/ratelimiter_problemoffixed.png){:width="800px"}

### 9.5 High level design
![image](/public/images/note/system-design-interview-questions/ratelimiter_highlevel.png){:width="800px"}

## 10. Design Twitter Search
### 10.1 Requirements
Assumption:
* Twitter has 1.5 billion total users with 800 million daily active users.
* On average Twitter gets 400 million tweets every day.
* The average size of a tweet is 300 bytes.
* Let’s assume there will be 500M searches every day.
* The search query will consist of multiple words combined with AND/OR.

We need to design a system that can efficiently store and query tweets.
### 10.2 High Level Design
![image](/public/images/note/system-design-interview-questions/twittersearch_highlevel.png){:width="800px"}
### 10.3 Detailed Component Design
![image](/public/images/note/system-design-interview-questions/twittersearch_detaileddesign.png){:width="800px"}

## 11. Design a Web Crawler
### 11.1 Requirements
* Access targeted websites, collect their content.
* Scalability: Our service needs to be scalable such that it can crawl the entire Web and can be used to fetch hundreds of millions of Web documents.
* Extensibility: Our service should be designed in a modular way with the expectation that new functionality will be added to it. There could be newer document types that needs to be downloaded and processed in the future.

### 11.2 Some Design Considerations
* Content: HTML pages only? images? videos?
* Protocols: Http? FTP?
* Number of pages to crawl.

The `Robots Exclusion Protocol` allows Webmasters to declare parts of their sites off limits to crawlers. It requires a Web crawler to fetch a special document called `robot.txt` which contains these declarations from a Web site before downloading any real content from it.

### 11.3 High Level design
* 1) Pick a URL from the unvisited URL list.
* 2) Determine the IP Address of its host-name.
* 3) Establish a connection to the host to download the corresponding document.
* 4) Parse the document contents to look for new URLs.
* 5) Add the new URLs to the list of unvisited URLs.
* 6) Process the downloaded document, e.g., store it or index its contents, etc.
* 7) Go back to step 1

How to crawl? BFS, DFS, Path-ascending crawling

For example, when given a seed URL of http://foo.com/a/b/page.html, it will attempt to crawl `/a/b/`, `/a/`, and `/`.

Difficulties in implementing efficient web crawler  
Two important characteristics   
* Large volume of Web pages: Can only download fraction of the web pages, crawler must be intelligent.
* Rate of change on web pages: Web pages change frequently.

Components for a minimum crawler:
1. URL frontier: To store the list of URLs to download and also prioritize which URLs should be crawled first.
2. HTTP Fetcher: To retrieve a web page from the server.
3. Extractor: To extract links from HTML documents.
4. Duplicate Eliminator: To make sure the same content is not extracted twice unintentionally.
5. Datastore: To store retrieved pages, URLs, and other metadata.

![image](/public/images/note/system-design-interview-questions/webcrawler_highlevel.png){:width="800px"}

### 11.4 Detailed Component Design
![image](/public/images/note/system-design-interview-questions/webcrawler_detaileddesign.png){:width="800px"}
Document Dedupe test: To prevent processing of a document more than once, we perform a dedupe test on each document to remove duplication.
URL filters: Blacklist websites.
URL dedupe test: Multiple links to the same document.

### 12. Design Facebook’s Newsfeed
### 12.1 Requirements
Functional requirements:
* Newsfeed will be generated based on the posts from the people, pages, and groups that a user follows.
* A user may have many friends and follow a large number of pages/groups.
* Feeds may contain images, videos, or just text.
* Our service should support appending new posts as they arrive to the newsfeed for all active users.

Non-functional requirements:
* Our system should be able to generate any user’s newsfeed in real-time - maximum latency seen by the end user would be 2s.
* A post shouldn’t take more than 5s to make it to a user’s feed assuming a new newsfeed request comes in.

### 12.2 System APIs
```java
getUserFeed(api_dev_key, user_id, since_id, count, max_id, exclude_replies)
```
Parameters:
* `api_dev_key` (string): The API developer key of a registered can be used to, among other things, throttle users based on their allocated quota.
* `user_id` (number): The ID of the user for whom the system will generate the newsfeed.
* `since_id` (number): Optional; returns results with an ID higher than (that is, more recent than) the specified ID.
* `count` (number): Optional; specifies the number of feed items to try and retrieve up to a maximum of 200 per distinct request.
* `max_id` (number): Optional; returns results with an ID less than (that is, older than) or equal to the specified ID.
* `exclude_replies` (boolean): Optional; this parameter will prevent replies from appearing in the returned timeline.

Returns: (JSON) Returns a JSON object containing a list of feed items.

### 12.3 Database Design
There are three primary objects:
* User
* Entity (e.g. page, group, etc.)
* FeedItem (or Post)

Relationships between these entities:
* A User can follow other entities and can become friends with other users.
* Both users and entities can post FeedItems which can contain text, images, or videos.
* Each FeedItem will have a UserID which will point to the User who created it. For simplicity, let’s assume that only users can create feed items, although, on Facebook Pages can post feed item too.
* Each FeedItem can optionally have an EntityID pointing to the page or the group where that post was created.

![image](/public/images/note/system-design-interview-questions/facebooknewsfeed_database.png){:width="800px"}

### 12.4 High Level Design
At a high level this problem can be divided into two parts:
`Feed generation`: Newsfeed is generated from the posts (or feed items) of users and entities (pages and groups) that a user follows. So, whenever our system receives a request to generate the feed for a user (say Jane), we will perform the following steps:
* Retrieve IDs of all users and entities that Jane follows.
* Retrieve latest, most popular and relevant posts for those IDs. These are the potential posts that we can show in Jane’s newsfeed.
* Rank these posts based on the relevance to Jane. This represents Jane’s current feed.
Store this feed in the cache and return top posts (say 20) to be rendered on Jane’s feed.
* On the front-end, when Jane reaches the end of her current feed, she can fetch the next 20 posts from the server and so on.

`Feed publishing`: Whenever user loads newsfeed page, he/she has to request and pull feed items from the server.
At a high level, we will need following components in our Newsfeed service:
* `Web servers`: To maintain a connection with the user. This connection will be used to transfer data between the user and the server.
* `Application server`: To execute the workflows of storing new posts in the database servers. We will also need some application servers to retrieve and to push the newsfeed to the end user.
* `Metadata database and cache`: To store the metadata about Users, Pages, and Groups.
* `Posts database and cache`: To store metadata about posts and their contents.
* `Video and photo storage, and cache`: Blob storage, to store all the media included in the posts.
* `Newsfeed generation service`: To gather and rank all the relevant posts for a user to generate newsfeed and store in the cache. This service will also receive live updates and will add these newer feed items to any user’s timeline.
* `Feed notification service`: To notify the user that there are newer items available for their newsfeed.

![image](/public/images/note/system-design-interview-questions/facebooknewsfeed_highlevel.png){:width="800px"}

### 12.5 Detailed Component Design
a. Feed generation
* 1) Offline generation for newsfeed
* 2) How many feed items should we store in memory for a user’s feed? 10 pages * 20 posts/page = 200 posts/per user.
* 3) Should we generate (and keep in memory) newsfeeds for all users? LRU + Pregeneration based on login pattern.

b. Feed publishing
* Pull Mode: Pull the feed data on a regular basis. Drawback: Wasting resources.
* Push Mode: Push new post to all follows. Drawback: Server has to maintain long pulling requests, which requires large memory. Problem with celebrity user who has large number of followers.
* Hybrid: Only push data for those users who have a few hundred (or thousand) followers. For celebrity users, we can let the followers pull the updates.

## 13. Design Yelp(Nearby Friend)
### 13.1 Requirements
Functional Requirements:
* Users should be able to add/delete/update Places.
* Given their location (longitude/latitude), users should be able to find all nearby places within a given radius.
* Users should be able to add feedback/review about a place. The feedback can have pictures, text, and a rating.

Non-functional Requirements:
* Users should have a real-time search experience with minimum latency.
* Our service should support a heavy search load. There will be a lot of search requests compared to adding a new place.

### 13.2 Database Schema
location:

LocationID  | Name        | Latitude   | Longitude   | Description | Category    |
------------|-------------|--------------------------|-------------|-------------|
1           | Starbucks   | 37.337034, | -122.035963 | Starbucks   | Coffee Shop |
2           | Burger King | 37.309433, | -121.993708 | Burger King | Restaurant  |

reviews:

LocationID | ReviewID | ReviewText   | Rating |
-----------|----------|--------------|--------|
1          | 1        | Fancy        | 4      |
1          | 2        | slow service | 1      |
2          | 1        | nice food    | 5      |

### 13.3 System APIs
```java
search(api_dev_key, search_terms, user_location, radius_filter, maximum_results_to_return, category_filter, sort, page_token)
```
Parameters:
* `api_dev_key` (string): The API developer key of a registered account. This will be used to, among other things, throttle users based on their allocated quota.
* `search_terms` (string): A string containing the search terms.
* `user_location` (string): Location of the user performing the search.
* `radius_filter` (number): Optional search radius in meters.
* `maximum_results_to_return` (number): Number of business results to return.
* `category_filter` (string): Optional category to filter search results, e.g., Restaurants, Shopping Centers, etc.
* `sort` (number): Optional sort mode: Best matched (0 - default), Minimum distance (1), Highest rated (2).
* `page_token` (string): This token will specify a page in the result set that should be returned.

Returns: (JSON)
A JSON containing information about a list of businesses matching the search query. Each result entry will have the business name, address, category, rating, and thumbnail.

### 13.4 Basic System Design and Algorithm
Different ways to store locations and search them which are nearby me.
* SQL solution: Store longitude and latitude separately in two different columns, and index them.
* Grids: Divide the whole map into smaller grids to group locations into smaller sets. Search the neighboring eight grids of the given location.
![image](/public/images/note/system-design-interview-questions/yelp_gridmap.png){:width="800px"}
* Dynamic size grids: QuadTree. It is not guaranteed that we will have an equal number of places in any given grid.
![image](/public/images/note/system-design-interview-questions/yelp_quadtree.png){:width="800px"}

### 13.5 Data Partitioning
* Sharding based on regions
* Sharding based on LocationID

We will have different QuadTree structure on different partitions.
![image](/public/images/note/system-design-interview-questions/yelp_highlevel.png){:width="800px"}

## 14. Design Uber(Ride Sharing)
### 14.1 Requirements
There are two kinds of users in our system: `Drivers` and `Riders`.
* Drivers need to regularly notify the service about their current location and their availability to pick passengers.
* Passengers get to see all the nearby available drivers.
* Customer can request a ride; nearby drivers are notified that a customer is ready to be picked up.
* Once a driver and a customer accept a ride, they can constantly see each other’s current location until the trip finishes.
* Upon reaching the destination, the driver marks the journey complete to become available for the next ride.

### 14.2 Basic System Design and Algorithm
![image](/public/images/note/system-design-interview-questions/uber_highlevel.png){:width="800px"}
* 1) The customer will put a request for a ride.
* 2) One of the Aggregator servers will take the request and asks QuadTree servers to return nearby drivers.
* 3) The Aggregator server collects all the results and sorts them by ratings.
* 4) The Aggregator server will send a notification to the top (say three) drivers simultaneously, whichever driver accepts the request first will be assigned the ride. The other drivers will receive a cancellation request. If none of the three drivers respond, the Aggregator will request a ride from the next three drivers from the list.
* 5) Once a driver accepts a request, the customer is notified.

## 15. Design Ticketmaster(Online Ticketing)
### 15.1 Requirements
Functional Requirements:
* Our ticket booking service should be able to list different cities where its affiliate cinemas are located.
* Once the user selects the city, the service should display the movies released in that particular city.
* Once the user selects a movie, the service should display the cinemas running that movie and its available show times.
* The user should be able to choose a show at a particular cinema and book their tickets.
* The service should be able to show the user the seating arrangement of the cinema hall. The user should be able to select multiple seats according to their preference.
* The user should be able to distinguish available seats from booked ones.
* Users should be able to put a hold on the seats for five minutes before they make a payment to finalize the booking.
* The user should be able to wait if there is a chance that the seats might become available, e.g., when holds by other users expire.
* Waiting customers should be serviced in a fair, first come, first serve manner.

Non-Functional Requirements:
* The system would need to be highly concurrent. There will be multiple booking requests for the same seat at any particular point in time. The service should handle this gracefully and fairly.
* The core thing of the service is ticket booking, which means financial transactions. This means that the system should be secure and the database ACID compliant.

### 15.2 System APIs
```java
SearchMovies(api_dev_key, keyword, city, lat_long, radius, start_datetime, end_datetime, postal_code, includeSpellcheck, results_per_page, sorting_order)
```
Parameters:
* `api_dev_key` (string): The API developer key of a registered account. This will be used to, among other things, throttle * users based on their allocated quota.
* `keyword` (string): Keyword to search on.
* `city` (string): City to filter movies by.
* `lat_long` (string): Latitude and longitude to filter by. radius (number): Radius of the area in which we want to search for events.
* `start_datetime` (string): Filter movies with a starting datetime.
* `end_datetime` (string): Filter movies with an ending datetime.
* `postal_code` (string): Filter movies by postal code / zipcode.
* `includeSpellcheck` (Enum: “yes” or “no”): Yes, to include spell check suggestions in the response.
* `results_per_page` (number): Number of results to return per page. Maximum is 30.
* `sorting_order` (string): Sorting order of the search result. Some allowable values : ‘name,asc’, ‘name,desc’, ‘date,asc’, ‘date,desc’, ‘distance,asc’, ‘name,date,asc’, ‘name,date,desc’, ‘date,name,asc’, ‘date,name,desc’.

Returns: (JSON)
Here is a sample list of movies and their shows:
```json
[
  {
    "MovieID": 1,
    "ShowID": 1,
    "Title": "Cars 2",
    "Description": "About cars",
    "Duration": 120,
    "Genre": "Animation",
    "Language": "English",
    "ReleaseDate": "8th Oct. 2014",
    "Country": USA,
    "StartTime": "14:00",
    "EndTime": "16:00",
    "Seats":
    [
      {  
        "Type": "Regular"
        "Price": 14.99
        "Status: "Almost Full"
      },
      {  
        "Type": "Premium"
        "Price": 24.99
        "Status: "Available"
      }
    ]
  },
  {
    "MovieID": 1,
    "ShowID": 2,
    "Title": "Cars 2",
    "Description": "About cars",
    "Duration": 120,
    "Genre": "Animation",
    "Language": "English",
    "ReleaseDate": "8th Oct. 2014",
    "Country": USA,
    "StartTime": "16:30",
    "EndTime": "18:30",
    "Seats":
    [
        {  
          "Type": "Regular"
          "Price": 14.99
          "Status: "Full"
      },
        {  
          "Type": "Premium"
        "Price": 24.99
        "Status: "Almost Full"
      }
    ]
  },
 ]
```

```java
ReserveSeats(api_dev_key, session_id, movie_id, show_id, seats_to_reserve[])
```
Parameters:
* `api_dev_key` (string): same as above
* `session_id` (string): User’s session ID to track this reservation. Once the reservation time expires, user’s reservation on the server will be removed using this ID.
* `movie_id` (string): Movie to reserve.
* `show_id` (string): Show to reserve.
* `seats_to_reserve` (number): An array containing seat IDs to reserve.

Returns: (JSON)
Returns the status of the reservation, which would be one of the following: 1) “Reservation Successful” 2) “Reservation Failed - Show Full,” 3) “Reservation Failed - Retry, as other users are holding reserved seats”.

### 15.3 Database Design
Here are a few observations about the data we are going to store:
* Each City can have multiple Cinemas.
* Each Cinema will have multiple halls.
* Each Movie will have many Shows and each Show will have multiple Bookings.
* A user can have multiple bookings.

![image](/public/images/note/system-design-interview-questions/ticketmaster_db.png){:width="800px"}

### 15.4 High Level Design
![image](/public/images/note/system-design-interview-questions/ticketmaster_highlevel.png){:width="800px"}

### 15.5 Detailed Component Design
![image](/public/images/note/system-design-interview-questions/ticketmaster_detailed.png){:width="800px"}

## 16. Design a Parking Lot
### 16.1 Questions/Clarification
* How many parking lots?
* Located in multiple levels?
* Free or cost?
* Size? S/M/L/XL? Motor? Car? Truck? Bus?

### 16.2 Features/Functions
* Search free spots
* Place vehicle
* Remove vehicle
* Pricing? Hourly/Whole Day?

### 16.3 Classes
Vehicle:
* License Plate
* Color

ParkingLot(zipcode: int):
-Spot: placeVehicle(Vehicle: vehicle);

Spot(id, size):
-Status: Free/Occupied
-Location

## 17. Messenger service like Whatsapp or WeChat
### 17.1 Questions/Clarification
* Text/Audio/Video?
* One to One? Group Chatting
* History?
* Asynchronous/instant？

### 17.2 Features/Functions
* Send message
* Push notifications

### 17.3 Infrastructure
* User -> Server(n) -> User
* Message Queue
* Handle if receiver is offline, keep the message in sequence

### 17.4 Class
User
-Id
Message
-Status: Draft/Sent/Delivered/Read by receiver

## 18. Uber Lyft ride sharing services
QUIC protocol(Quick UDP internet connections)
![image](/public/images/note/system-design-interview-questions/uber_architecture.jpg)
* [Understanding QUIC wire protocol](https://medium.com/@nirosh/understanding-quic-wire-protocol-d0ff97644de7)

* [Geohash Intro](http://www.bigfastblog.com/geohash-intro)
* [Designing a Spacial Index](https://dzone.com/articles/designing-spacial-index)

QuadTree
* [An interactive explanation of quadtrees](https://jimkang.com/quadtreevis/)

### 18.1 Questions/Clarification

### 18.2 Features/Functions
* Match Driver and Rider

### 18.3 Infrastructure

### 18.4 Class
Driver
Rider
Trip

## 19. Rate Limiter
API Rate Limiter throttles users based upon the number of the requests they are sending.
Http State Code: 429 - Too Many Requests
* [Designing an API Rate Limiter](https://www.educative.io/collection/page/5668639101419520/5649050225344512/5707274949492736)

### 19.1 Why rate limiting is necessary?
* Avoid Abuse of the system: Denial-of-service (DOS) attacks, brute-force password attempt
* Build Reliable System: keep costs and resource usage under control


## 9. Key Words
* Queries Per Second (QPS)
