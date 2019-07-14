---
layout: tutorial
key: note
title: "System Design Interview Questions"
index: 9502
subcategory: design-knowledge
date: 2019-01-03
tags: [Tradeoffs]
---

> How to tackle a system design interview question.

## 1. Approaching System Design Interview Question
The system design interview is an **open-ended conversation**.  You are expected to lead it.

You can use the following steps to guide the discussion.  To help solidify this process, work through the [System design interview questions with solutions](#system-design-interview-questions-with-solutions) section using the following steps.

### 1.1 Step 1: Outline use cases, constraints, and assumptions
Gather requirements and scope the problem.  Ask questions to clarify use cases and constraints.  Discuss assumptions.
* Who is going to use it?
* How are they going to use it?
* How many users are there?
* What does the system do?
* What are the inputs and outputs of the system?
* How much data do we expect to handle?
* How many requests per second do we expect?
* What is the expected read to write ratio?

### 1.2 Step 2: Create a high level design
Outline a high level design with all important components.
* Sketch the main components and connections
* Justify your ideas

### 1.3 Step 3: Design core components
Dive into details for each core component.  For example, if you were asked to [design a url shortening service](solutions/system_design/pastebin/README.md), discuss:

* Generating and storing a hash of the full url
    * [MD5](solutions/system_design/pastebin/README.md) and [Base62](solutions/system_design/pastebin/README.md)
    * Hash collisions
    * SQL or NoSQL
    * Database schema
* Translating a hashed url to the full url
    * Database lookup
* API and object-oriented design

### 1.4 Step 4: Scale the design
Identify and address bottlenecks, given the constraints.  For example, do you need the following to address scalability issues?

* Load balancer
* Horizontal scaling
* Caching
* Database sharding

Discuss potential solutions and trade-offs.  Everything is a trade-off.  Address bottlenecks using [principles of scalable system design](#index-of-system-design-topics).

### 1.5 Back-of-the-envelope calculations
You might be asked to do some estimates by hand.  Refer to the [Appendix](#appendix) for the following resources:
* [Use back of the envelope calculations](http://highscalability.com/blog/2011/1/26/google-pro-tip-use-back-of-the-envelope-calculations-to-choo.html)
* [Powers of two table](#powers-of-two-table)
* [Latency numbers every programmer should know](#latency-numbers-every-programmer-should-know)

### 1.6 Source(s) and further reading
Check out the following links to get a better idea of what to expect:
* [How to ace a systems design interview](https://www.palantir.com/2011/10/how-to-rock-a-systems-design-interview/)
* [The system design interview](http://www.hiredintech.com/system-design)
* [Intro to Architecture and Systems Design Interviews](https://www.youtube.com/watch?v=ZgdS0EUmn70)

## 2. System design interview questions with solutions
Common system design interview questions with sample discussions, code, and diagrams.

| Question | Solution |
|---|---|
| Design Pastebin.com (or Bit.ly) | [Solution](https://github.com/donnemartin/system-design-primer/blob/master/solutions/system_design/pastebin/README.md) |
| Design the Twitter timeline and search (or Facebook feed and search) | [Solution](https://github.com/donnemartin/system-design-primer/blob/master/solutions/system_design/twitter/README.md) |
| Design a web crawler | [Solution](https://github.com/donnemartin/system-design-primer/blob/master/solutions/system_design/web_crawler/README.md) |
| Design Mint.com | [Solution](https://github.com/donnemartin/system-design-primer/blob/master/solutions/system_design/mint/README.md) |
| Design the data structures for a social network | [Solution](https://github.com/donnemartin/system-design-primer/blob/master/solutions/system_design/social_graph/README.md) |
| Design a key-value store for a search engine | [Solution](https://github.com/donnemartin/system-design-primer/blob/master/solutions/system_design/query_cache/README.md) |
| Design Amazon's sales ranking by category feature | [Solution](https://github.com/donnemartin/system-design-primer/blob/master/solutions/system_design/sales_rank/README.md) |
| Design a system that scales to millions of users on AWS | [Solution](https://github.com/donnemartin/system-design-primer/blob/master/solutions/system_design/scaling_aws/README.md) |

### 2.1 Design Pastebin.com (or Bit.ly)
[View exercise and solution](https://github.com/donnemartin/system-design-primer/blob/master/solutions/system_design/pastebin/README.md)
![image](/public/images/note/9502/pastebin.png){:width="600px"}
### 2.2 Design the Twitter timeline and search (or Facebook feed and search)
[View exercise and solution](https://github.com/donnemartin/system-design-primer/blob/master/solutions/system_design/twitter/README.md)
![image](/public/images/note/9502/twitter_timeline.png){:width="800px"}
### 2.3 Design a web crawler
[View exercise and solution](https://github.com/donnemartin/system-design-primer/blob/master/solutions/system_design/web_crawler/README.md)
![image](/public/images/note/9502/webcrawler.png){:width="700px"}
### 2.4 Design Mint.com
[View exercise and solution](https://github.com/donnemartin/system-design-primer/blob/master/solutions/system_design/mint/README.md)
![image](/public/images/note/9502/mint.png){:width="800px"}
### 2.5 Design the data structures for a social network
[View exercise and solution](https://github.com/donnemartin/system-design-primer/blob/master/solutions/system_design/social_graph/README.md)
![image](/public/images/note/9502/socialnetwork.png){:width="600px"}
### 2.6 Design a key-value store for a search engine
[View exercise and solution](https://github.com/donnemartin/system-design-primer/blob/master/solutions/system_design/query_cache/README.md)
![image](/public/images/note/9502/keyvaluestore.png){:width="450px"}
### 2.7 Design Amazon's sales ranking by category feature
[View exercise and solution](https://github.com/donnemartin/system-design-primer/blob/master/solutions/system_design/sales_rank/README.md)
![image](/public/images/note/9502/salesrank.png){:width="600px"}
### 2.8 Design a system that scales to millions of users on AWS
[View exercise and solution](https://github.com/donnemartin/system-design-primer/blob/master/solutions/system_design/scaling_aws/README.md)
![image](/public/images/note/9502/millionsuser.png){:width="800px"}

## 3. Object-oriented design interview questions with solutions
Common object-oriented design interview questions with sample discussions, code, and diagrams.

| Question | Solution |
|---|---|
| Design a hash map | [Solution](https://github.com/donnemartin/system-design-primer/blob/master/solutions/object_oriented_design/hash_table/hash_map.ipynb)  |
| Design a least recently used cache | [Solution](https://github.com/donnemartin/system-design-primer/blob/master/solutions/object_oriented_design/lru_cache/lru_cache.ipynb)  |
| Design a call center | [Solution](https://github.com/donnemartin/system-design-primer/blob/master/solutions/object_oriented_design/call_center/call_center.ipynb)  |
| Design a deck of cards | [Solution](https://github.com/donnemartin/system-design-primer/blob/master/solutions/object_oriented_design/deck_of_cards/deck_of_cards.ipynb)  |
| Design a parking lot | [Solution](https://github.com/donnemartin/system-design-primer/blob/master/solutions/object_oriented_design/parking_lot/parking_lot.ipynb)  |
| Design a chat server | [Solution](https://github.com/donnemartin/system-design-primer/blob/master/solutions/object_oriented_design/online_chat/online_chat.ipynb)  |

## 4. Additional system design interview questions
Common system design interview questions, with links to resources on how to solve each.

| Question | Reference(s) |
|---|---|
| Design a file sync service like Dropbox | [youtube.com](https://www.youtube.com/watch?v=PE4gwstWhmc) |
| Design a search engine like Google | [queue.acm.org](http://queue.acm.org/detail.cfm?id=988407)<br/>[stackexchange.com](http://programmers.stackexchange.com/questions/38324/interview-question-how-would-you-implement-google-search)<br/>[ardendertat.com](http://www.ardendertat.com/2012/01/11/implementing-search-engines/)<br/>[stanford.edu](http://infolab.stanford.edu/~backrub/google.html) |
| Design a scalable web crawler like Google | [quora.com](https://www.quora.com/How-can-I-build-a-web-crawler-from-scratch) |
| Design Google docs | [code.google.com](https://code.google.com/p/google-mobwrite/)<br/>[neil.fraser.name](https://neil.fraser.name/writing/sync/) |
| Design a key-value store like Redis | [slideshare.net](http://www.slideshare.net/dvirsky/introduction-to-redis) |
| Design a cache system like Memcached | [slideshare.net](http://www.slideshare.net/oemebamo/introduction-to-memcached) |
| Design a recommendation system like Amazon's | [hulu.com](https://web.archive.org/web/20170406065247/http://tech.hulu.com/blog/2011/09/19/recommendation-system.html)<br/>[ijcai13.org](http://ijcai13.org/files/tutorial_slides/td3.pdf) |
| Design a tinyurl system like Bitly | [n00tc0d3r.blogspot.com](http://n00tc0d3r.blogspot.com/) |
| Design a chat app like WhatsApp | [highscalability.com](http://highscalability.com/blog/2014/2/26/the-whatsapp-architecture-facebook-bought-for-19-billion.html)
| Design a picture sharing system like Instagram | [highscalability.com](http://highscalability.com/flickr-architecture)<br/>[highscalability.com](http://highscalability.com/blog/2011/12/6/instagram-architecture-14-million-users-terabytes-of-photos.html) |
| Design the Facebook news feed function | [quora.com](http://www.quora.com/What-are-best-practices-for-building-something-like-a-News-Feed)<br/>[quora.com](http://www.quora.com/Activity-Streams/What-are-the-scaling-issues-to-keep-in-mind-while-developing-a-social-network-feed)<br/>[slideshare.net](http://www.slideshare.net/danmckinley/etsy-activity-feeds-architecture) |
| Design the Facebook timeline function | [facebook.com](https://www.facebook.com/note.php?note_id=10150468255628920)<br/>[highscalability.com](http://highscalability.com/blog/2012/1/23/facebook-timeline-brought-to-you-by-the-power-of-denormaliza.html) |
| Design the Facebook chat function | [erlang-factory.com](http://www.erlang-factory.com/upload/presentations/31/EugeneLetuchy-ErlangatFacebook.pdf)<br/>[facebook.com](https://www.facebook.com/note.php?note_id=14218138919&id=9445547199&index=0) |
| Design a graph search function like Facebook's | [facebook.com](https://www.facebook.com/notes/facebook-engineering/under-the-hood-building-out-the-infrastructure-for-graph-search/10151347573598920)<br/>[facebook.com](https://www.facebook.com/notes/facebook-engineering/under-the-hood-indexing-and-ranking-in-graph-search/10151361720763920)<br/>[facebook.com](https://www.facebook.com/notes/facebook-engineering/under-the-hood-the-natural-language-interface-of-graph-search/10151432733048920) |
| Design a content delivery network like CloudFlare | [figshare.com](https://figshare.com/articles/Globally_distributed_content_delivery/6605972) |
| Design a trending topic system like Twitter's | [michael-noll.com](http://www.michael-noll.com/blog/2013/01/18/implementing-real-time-trending-topics-in-storm/)<br/>[snikolov .wordpress.com](http://snikolov.wordpress.com/2012/11/14/early-detection-of-twitter-trends/) |
| Design a random ID generation system | [blog.twitter.com](https://blog.twitter.com/2010/announcing-snowflake)<br/>[github.com](https://github.com/twitter/snowflake/) |
| Return the top k requests during a time interval | [cs.ucsb.edu](https://www.cs.ucsb.edu/sites/cs.ucsb.edu/files/docs/reports/2005-23.pdf)<br/>[wpi.edu](http://davis.wpi.edu/xmdv/docs/EDBT11-diyang.pdf) |
| Design a system that serves data from multiple data centers | [highscalability.com](http://highscalability.com/blog/2009/8/24/how-google-serves-data-from-multiple-datacenters.html) |
| Design an online multiplayer card game | [indieflashblog.com](http://www.indieflashblog.com/how-to-create-an-asynchronous-multiplayer-game.html)<br/>[buildnewgames.com](http://buildnewgames.com/real-time-multiplayer/) |
| Design a garbage collection system | [stuffwithstuff.com](http://journal.stuffwithstuff.com/2013/12/08/babys-first-garbage-collector/)<br/>[washington.edu](http://courses.cs.washington.edu/courses/csep521/07wi/prj/rick.pdf) |
| Design an API rate limiter | [https://stripe.com/blog/](https://stripe.com/blog/rate-limiters) |
| Add a system design question | [Contribute](#contributing) |
