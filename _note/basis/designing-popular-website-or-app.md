---
layout: tutorial
key: note
title: "Designing Popular Website or App"
index: 9912
category: basis
breadcrumb: [Note, Work Space, Basic Knowledge]
image: cs.png
date: 2016-01-12
postdate: 2016-01-12
tags: [System Design]
---

> Best Practice and Common Questions for System Design.

## 1. Designing A Service Like TinyUrl
### 1.1 Why do we need URL shortening?
URL shortening is used to create shorter aliases for long URLs. We call these shortened aliases “short links.” Users are redirected to the original URL when they hit these short links. Short links save a lot of space when displayed, printed, messaged, or tweeted. Additionally, users are less likely to mistype shorter URLs.

For example, if we shorten this page through TinyURL:
```sh
https://rongzhuang.me/portfolio/online-judge-mean/
```
We would get:
```sh
http://tinyurl.com/y3uabmra
```
The shortened URL is one-half the size of the actual URL.

URL shortening is used for optimizing links across devices, tracking individual links to analyze audience and campaign performance, and hiding affiliated original URLs.

If you haven’t used [tinyurl.com](tinyurl.com) before, please try creating a new shortened URL and spend some time going through the various options their service offers.
### 1.2 Requirements and Goals of the System
Our URL shortening system should meet the following requirements:

**Functional Requirements**:
1. Given a URL, our service should generate a shorter and unique alias of it. This is called a short link.
2. When users access a short link, our service should redirect them to the original link.
3. Users should optionally be able to pick a custom short link for their URL.
4. Links will expire after a standard default timespan. Users should be able to specify the expiration time.

**Non-Functional Requirements**:
1. The system should be highly available. This is required because, if our service is down, all the URL redirections will start failing.
2. URL redirection should happen in real-time with minimal latency.
3. Shortened links should not be guessable (not predictable).

**Extended Requirements**:
1. Analytics; e.g., how many times a redirection happened?
2. Our service should also be accessible through REST APIs by other services.

### 1.3 Capacity Estimation and Constraints
Our system will be read-heavy. There will be lots of redirection requests compared to new URL shortenings. Let’s assume 100:1 ratio between read and write.
`Traffic estimates`: Assuming, we will have 500M new URL shortenings per month, with 100:1 read/write ratio, we can expect 50B redirections during the same period:
```sh
100 * 500M => 50B
```
What would be Queries Per Second (QPS) for our system? New URLs shortenings per second:
```sh
500 million / (30 days * 24 hours * 3600 seconds) = ~200 URLs/s
```
Considering 100:1 read/write ratio, URLs redirections per second will be:
```sh
100 * 200 URLs/s = 20K/s
```
`Storage estimates`: Let’s assume we store every URL shortening request (and associated shortened link) for 5 years. Since we expect to have 500M new URLs every month, the total number of objects we expect to store will be 30 billion:
```sh
500 million * 5 years * 12 months = 30 billion
```
Let’s assume that each stored object will be approximately 500 bytes (just a ballpark estimate–we will dig into it later). We will need 15TB of total storage:
```sh
30 billion * 500 bytes = 15 TB
```
`Bandwidth estimates`: For write requests, since we expect 200 new URLs every second, total incoming data for our service will be 100KB per second:
```sh
200 * 500 bytes = 100 KB/s
```
For read requests, since every second we expect ~19K URLs redirections, total outgoing data for our service would be 9MB per second.
```sh
19K * 500 bytes = ~9 MB/s
```
`Memory estimates`: If we want to cache some of the hot URLs that are frequently accessed, how much memory will we need to store them? If we follow the 80-20 rule, meaning 20% of URLs generate 80% of traffic, we would like to cache these 20% hot URLs.

Since we have 19K requests per second, we will be getting 1.7 billion requests per day:
```sh
19K * 3600 seconds * 24 hours = ~1.7 billion
```
To cache 20% of these requests, we will need 170GB of memory.
```sh
0.2 * 1.7 billion * 500 bytes = ~170GB
```
One thing to note here is that since there will be a lot of duplicate requests (of the same URL), therefore, our actual memory usage will be less than 170GB.

`High level estimates`: Assuming 500 million new URLs per month and 100:1 read:write ratio, following is the summary of the high level estimates for our service:

KPI                 | Description   
--------------------|--------------------------------------------------
New URLs            | 200/s
URL redirections    | 19K/s
Incoming data       | 100KB/s
Outgoing data       | 9MB/s
Storage for 5 years | 15TB
Memory for cache    | 170GB

### 1.4 System APIs
We can have SOAP or REST APIs to expose the functionality of our service. Following could be the definitions of the APIs for creating and deleting URLs:
```sh
createURL(api_dev_key, original_url, custom_alias=None, user_name=None, expire_date=None)
```
**Parameters**:
* api_dev_key (string): The API developer key of a registered account. This will be used to, among other things, throttle users based on their allocated quota.
* original_url (string): Original URL to be shortened.
* custom_alias (string): Optional custom key for the URL.
* user_name (string): Optional user name to be used in encoding.
* expire_date (string): Optional expiration date for the shortened URL.

**Returns**: (string)
A successful insertion returns the shortened URL; otherwise, it returns an error code.
```sh
deleteURL(api_dev_key, url_key)
```
Where “url_key” is a string representing the shortened URL to be retrieved. A successful deletion returns ‘URL Removed’.

How do we detect and prevent abuse? A malicious user can put us out of business by consuming all URL keys in the current design. To prevent abuse, we can limit users via their api_dev_key. Each api_dev_key can be limited to a certain number of URL creations and redirections per some time period (which may be set to a different duration per developer key).

### 1.5 Database Design
A few observations about the nature of the data we will store:
1. We need to store billions of records.
2. Each object we store is small (less than 1K).
3. There are no relationships between records—other than storing which user created a URL.
4. Our service is read-heavy.

Database Schema:
We would need two tables: one for storing information about the URL mappings, and one for the user’s data who created the short link.
![image](/public/images/note/designing-popular-website-or-app/database.png)
What kind of database should we use? Since we anticipate storing billions of rows, and we don’t need to use relationships between objects – a NoSQL key-value store like DynamoDB, Cassandra or Riak is a better choice. A NoSQL choice would also be easier to scale. Please see SQL vs NoSQL for more details.

### 1.6 Basic System Design and Algorithm
The problem we are solving here is, how to generate a short and unique key for a given URL.

In the TinyURL example in Section 1, the shortened URL is “http://tinyurl.com/y3uabmra”. The last 8 characters of this URL is the short key we want to generate. We’ll explore two solutions here:
1) Encoding actual URL
We can compute a unique hash (e.g., MD5 or SHA256, etc.) of the given URL. The hash can then be encoded for displaying. This encoding could be base36 ([a-z ,0-9]) or base62 ([A-Z, a-z, 0-9]) and if we add ‘-’ and ‘.’ we can use base64 encoding. A reasonable question would be, what should be the length of the short key? 6, 8 or 10 characters.
* Using base64 encoding, a 6 letter long key would result in 64^6 = ~68.7 billion possible strings
* Using base64 encoding, an 8 letter long key would result in 64^8 = ~281 trillion possible strings

With 68.7B unique strings, let’s assume six letter keys would suffice for our system.

If we use the MD5 algorithm as our hash function, it’ll produce a 128-bit hash value. After base64 encoding, we’ll get a string having more than 21 characters (since each base64 character encodes 6 bits of the hash value). Since we only have space for 8 characters per short key, how will we choose our key then? We can take the first 6 (or 8) letters for the key. This could result in key duplication though, upon which we can choose some other characters out of the encoding string or swap some characters.

What are different issues with our solution? We have the following couple of problems with our encoding scheme:
* If multiple users enter the same URL, they can get the same shortened URL, which is not acceptable.
* What if parts of the URL are URL-encoded? e.g., http://www.educative.io/distributed.php?id=design, and http://www.educative.io/distributed.php%3Fid%3Ddesign are identical except for the URL encoding.

Workaround for the issues: We can append an increasing sequence number to each input URL to make it unique, and then generate a hash of it. We don’t need to store this sequence number in the databases, though. Possible problems with this approach could be an ever-increasing sequence number. Can it overflow? Appending an increasing sequence number will also impact the performance of the service.

Another solution could be to append user id (which should be unique) to the input URL. However, if the user has not signed in, we would have to ask the user to choose a uniqueness key. Even after this, if we have a conflict, we have to keep generating a key until we get a unique one.

2) Generating keys offline
We can have a standalone Key Generation Service (KGS) that generates random six letter strings beforehand and stores them in a database (let’s call it key-DB). Whenever we want to shorten a URL, we will just take one of the already-generated keys and use it. This approach will make things quite simple and fast. Not only are we not encoding the URL, but we won’t have to worry about duplications or collisions. KGS will make sure all the keys inserted into key-DB are unique

Can concurrency cause problems? As soon as a key is used, it should be marked in the database to ensure it doesn’t get used again. If there are multiple servers reading keys concurrently, we might get a scenario where two or more servers try to read the same key from the database. How can we solve this concurrency problem?

Servers can use KGS to read/mark keys in the database. KGS can use two tables to store keys: one for keys that are not used yet, and one for all the used keys. As soon as KGS gives keys to one of the servers, it can move them to the used keys table. KGS can always keep some keys in memory so that it can quickly provide them whenever a server needs them.

For simplicity, as soon as KGS loads some keys in memory, it can move them to the used keys table. This ensures each server gets unique keys. If KGS dies before assigning all the loaded keys to some server, we will be wasting those keys–which is acceptable, given the huge number of keys we have.

KGS also has to make sure not to give the same key to multiple servers. For that, it must synchronize (or get a lock on) the data structure holding the keys before removing keys from it and giving them to a server

What would be the key-DB size? With base64 encoding, we can generate 68.7B unique six letters keys. If we need one byte to store one alpha-numeric character, we can store all these keys in:
```sh
6 (characters per key) * 68.7B (unique keys) = 412 GB.
```
Isn’t KGS a single point of failure? Yes, it is. To solve this, we can have a standby replica of KGS. Whenever the primary server dies, the standby server can take over to generate and provide keys.

Can each app server cache some keys from key-DB? Yes, this can surely speed things up. Although in this case, if the application server dies before consuming all the keys, we will end up losing those keys. This can be acceptable since we have 68B unique six letter keys.

How would we perform a key lookup? We can look up the key in our database or key-value store to get the full URL. If it’s present, issue an “HTTP 302 Redirect” status back to the browser, passing the stored URL in the “Location” field of the request. If that key is not present in our system, issue an “HTTP 404 Not Found” status or redirect the user back to the homepage.

Should we impose size limits on custom aliases? Our service supports custom aliases. Users can pick any ‘key’ they like, but providing a custom alias is not mandatory. However, it is reasonable (and often desirable) to impose a size limit on a custom alias to ensure we have a consistent URL database. Let’s assume users can specify a maximum of 16 characters per customer key (as reflected in the above database schema).
![image](/public/images/note/designing-popular-website-or-app/tinyurl_high_level.png)

### 1.7 Data Partitioning and Replication
To scale out our DB, we need to partition it so that it can store information about billions of URLs. We need to come up with a partitioning scheme that would divide and store our data to different DB servers.

`Range Based Partitioning`: We can store URLs in separate partitions based on the first letter of the URL or the hash key. Hence we save all the URLs starting with letter ‘A’ in one partition, save those that start with letter ‘B’ in another partition and so on. This approach is called range-based partitioning. We can even combine certain less frequently occurring letters into one database partition. We should come up with a static partitioning scheme so that we can always store/find a file in a predictable manner.

The main problem with this approach is that it can lead to unbalanced servers. For example: we decide to put all URLs starting with letter ‘E’ into a DB partition, but later we realize that we have too many URLs that start with letter ‘E’.

`Hash-Based Partitioning`: In this scheme, we take a hash of the object we are storing. We then calculate which partition to use based upon the hash. In our case, we can take the hash of the ‘key’ or the actual URL to determine the partition in which we store the data object.

Our hashing function will randomly distribute URLs into different partitions (e.g., our hashing function can always map any key to a number between [1…256]), and this number would represent the partition in which we store our object.

This approach can still lead to overloaded partitions, which can be solved by using Consistent Hashing.

### 1.8 Cache
We can cache URLs that are frequently accessed. We can use some off-the-shelf solution like Memcache, which can store full URLs with their respective hashes. The application servers, before hitting backend storage, can quickly check if the cache has the desired URL.

`How much cache should we have?` We can start with 20% of daily traffic and, based on clients’ usage pattern, we can adjust how many cache servers we need. As estimated above, we need 170GB memory to cache 20% of daily traffic. Since a modern-day server can have 256GB memory, we can easily fit all the cache into one machine. Alternatively, we can use a couple of smaller servers to store all these hot URLs.

`Which cache eviction policy would best fit our needs?` When the cache is full, and we want to replace a link with a newer/hotter URL, how would we choose? Least Recently Used (LRU) can be a reasonable policy for our system. Under this policy, we discard the least recently used URL first. We can use a Linked Hash Map or a similar data structure to store our URLs and Hashes, which will also keep track of the URLs that have been accessed recently.

To further increase the efficiency, we can replicate our caching servers to distribute load between them.

`How can each cache replica be updated?` Whenever there is a cache miss, our servers would be hitting a backend database. Whenever this happens, we can update the cache and pass the new entry to all the cache replicas. Each replica can update their cache by adding the new entry. If a replica already has that entry, it can simply ignore it.

### 1.9. Load Balancer (LB)
We can add a Load balancing layer at three places in our system:
1. Between Clients and Application servers
2. Between Application Servers and database servers
3. Between Application Servers and Cache servers

Initially, we could use a simple Round Robin approach that distributes incoming requests equally among backend servers. This LB is simple to implement and does not introduce any overhead. Another benefit of this approach is that if a server is dead, LB will take it out of the rotation and will stop sending any traffic to it.

A problem with Round Robin LB is that server load is not taken into consideration. If a server is overloaded or slow, the LB will not stop sending new requests to that server. To handle this, a more intelligent LB solution can be placed that periodically queries the backend server about its load and adjusts traffic based on that.

### 1.10 Purging or DB cleanup
Should entries stick around forever or should they be purged? If a user-specified expiration time is reached, what should happen to the link?

If we chose to actively search for expired links to remove them, it would put a lot of pressure on our database. Instead, we can slowly remove expired links and do a lazy cleanup. Our service will make sure that only expired links will be deleted, although some expired links can live longer but will never be returned to users.
* Whenever a user tries to access an expired link, we can delete the link and return an error to the user.
* A separate Cleanup service can run periodically to remove expired links from our storage and cache. This service should be very lightweight and can be scheduled to run only when the user traffic is expected to be low.
* We can have a default expiration time for each link (e.g., two years).
* After removing an expired link, we can put the key back in the key-DB to be reused.
* Should we remove links that haven’t been visited in some length of time, say six months? This could be tricky. Since storage is getting cheap, we can decide to keep links forever.

![image](/public/images/note/designing-popular-website-or-app/tinyurl_component.png)

### 1.11 Telemetry
How many times a short URL has been used, what were user locations, etc.? How would we store these statistics? If it is part of a DB row that gets updated on each view, what will happen when a popular URL is slammed with a large number of concurrent requests?

Some statistics worth tracking: country of the visitor, date and time of access, web page that refers the click, browser, or platform from where the page was accessed.

### 1.12 Security and Permissions
Can users create private URLs or allow a particular set of users to access a URL?

We can store permission level (public/private) with each URL in the database. We can also create a separate table to store UserIDs that have permission to see a specific URL. If a user does not have permission and tries to access a URL, we can send an error (HTTP 401) back. Given that we are storing our data in a NoSQL wide-column database like Cassandra, the key for the table storing permissions would be the ‘Hash’ (or the KGS generated ‘key’). The columns will store the UserIDs of those users that have permissions to see the URL.

## 1. Design Twitter
### 1.1 Features/Functions
* Following
* Tweeting(User, Home)
* Timeline

### 1.2 Tables
User

ID | Name   | Email | ...
---|--------|-------|----
1  | Johnny |       |
2  | Alex   |       |
3  | Sean   |       |

Twitter

ID | Title    | User ID
---|----------|---------
1  | Hello    |  2
2  | Greeting |  3

Followers

ID | Follower ID
---|----------
1  | 2    
1  | 3
2  | 3

### 1.3 Posting Twitter
* User Alice posts a twitter
* The twitter is sent to Load Balancer
* LB dispatches the posting task one application node
* The twitter is stored in high speed in-memory database Redis.
* There may be hundreds of thousands Redis servers. But only three of them contains the instances of the same twitter.
* Update the timeline of followers by adding this twitter.

### 1.4 Accessing Timeline
* User Bob access his own timeline through browser.
* The Get request is send to Load Balancer.
* BL get response from three Redis servers.
* There may be hundreds of thousands Redis servers. But one user's timeline is stored in only three of them.
* User HashMap(User, Redis IP address) to create the lookup function to locate which three Redis servers contains the timeline for particular user.

### 1.5 Push or Pull

## 2. Design a Parking Lot
### 2.1 Questions/Clarification
* How many parking lots?
* Located in multiple levels?
* Free or cost?
* Size? S/M/L/XL? Motor? Car? Truck? Bus?

### 2.2 Features/Functions
* Search free spots
* Place vehicle
* Remove vehicle
* Pricing? Hourly/Whole Day?

### 2.3 Classes
Vehicle:
* License Plate
* Color

ParkingLot(zipcode: int):
-Spot: placeVehicle(Vehicle: vehicle);

Spot(id, size):
-Status: Free/Occupied
-Location

## 3. Messenger service like Whatsapp or WeChat
### 3.1 Questions/Clarification
* Text/Audio/Video?
* One to One? Group Chatting
* History?
* Asynchronous/instant？

### 3.2 Features/Functions
* Send message
* Push notifications

### 3.3 Infrastructure
* User -> Server(n) -> User
* Message Queue
* Handle if receiver is offline, keep the message in sequence

### 3.4 Class
User
-Id
Message
-Status: Draft/Sent/Delivered/Read by receiver

## 4. Uber Lyft ride sharing services
### 4.1 Questions/Clarification

### 4.2 Features/Functions
* Match Driver and Rider

### 4.3 Infrastructure

### 4.4 Class
Driver
Rider
Trip

## 1. Java
### 1.1 Collection in Java
Interface: Map, Queue, Deque
Class: HashMap, HashSet, LinkedList

Concurrent Collection

## 2. Basis of Computer Science
### 2.1 How Addition Is Implemented in Program?
```java

```
## 1. Object-Oriented Programming

## 2. Design Pattern

## 3. Database Design
### 3.1 Entity-Relationship Diagram
### 3.2 Key, Index(Cluster Index), Constraints
Cluster Index, B-Tree Index, Inverted Index  
Shard

### 3.3 Normalization
Normalized databases are designed to minimize redundancy, while denormalized databases are designed
to optimize read time.
### 3.4 Denormalization
Denormalization means adding redundant information into a database to speed up reads.
* Denormalization is a time-space trade-off.
* Allow redundant data in database to avoid 'Join' in queries for improving performance.
* Need to solve the problem: data consistency. Constraints on tables.
* Can speed-up reads(SELECT in SQL) while slowing down writes(INSERT, UPDATE and DELETE). So use Denormalization only when reading frequency is more than writing frequency.
* One approach in practice is to use view in database.

### 3.5 Database Partitioning (Sharding)
Sharding means splitting the data across multiple machines while ensuring you have a way of figuring out
which data is on which machine.
* Vertical Partitioning
* Key-Based (or Hash-Based) Partitioning
* Directory-Based Partitioning

## 4. Networking Metrics
* Bandwidth
* Throughput
* Latency

## 5. MapReduce
* Map takes in some data and emits a <key J value> pair.
* Reduce takes a key and a set of associated values and "reduces"them in some way, emitting a new key and value.

## 6. References
* [System Design : Design a service like TinyUrl](https://www.youtube.com/watch?v=fMZMm_0ZhK4)
