---
layout: post
key: blog
title: "Basic Queries in Elasticsearch"
date: 2017-06-23
tags: [Elasticsearch]
---

> Notes for Elastic Search.

## 1. Links on Local ES Setup
* Elastic Search -> [http://localhost:9200](http://localhost:9200)
* Kibana->Dev Tools -> [http://192.168.56.101:5601](http://192.168.56.101:5601)

## 2. Usage
### 2.1 Create
```java
POST shop/customer/1
{
  "name": "Johnny",
  "address": "1234 Hillview Ave, Palo Alto",
  "level": "Silver"
}
```
Response:
```java
{
  "_index": "shop",
  "_type": "customer",
  "_id": "1",
  "_version": 1,
  "result": "created",
  "_shards": {
    "total": 2,
    "successful": 1,
    "failed": 0
  },
  "created": true
}
```

Create another two user
```java
POST shop/customer/2
{
  "name": "Sean",
  "address": "1010 Steven Creek Ave, Cupertino",
  "level": "Bronze"
}

POST shop/customer/3
{
  "name": "Norah",
  "address": "340 Lawrence Station Rd, Sunnyvale",
  "level": "Bronze"
}
```

### 2.2 Get
```java
GET shop/customer/1
```
Response:
```java
{
  "_index": "shop",
  "_type": "customer",
  "_id": "1",
  "_version": 1,
  "found": true,
  "_source": {
    "name": "Johnny",
    "address": "1234 Hillview Ave, Palo Alto",
    "level": "Silver"
  }
}
```

### 2.3 Update
```java
PUT shop/customer/1
{
  "name": "Johnny",
  "address": "1234 Hillview Ave, Palo Alto",
  "level": "Golden" // Change from 'Silver' to 'Golden'
}
```
Response:
```java
{
  "_index": "shop",
  "_type": "customer",
  "_id": "1",
  "_version": 2,
  "result": "updated",
  "_shards": {
    "total": 2,
    "successful": 1,
    "failed": 0
  },
  "created": false
}
```
### 2.4 Delete
```java
DELETE shop/customer/3
```
Response:
```java
{
  "found": true,
  "_index": "shop",
  "_type": "customer",
  "_id": "3",
  "_version": 2,
  "result": "deleted",
  "_shards": {
    "total": 2,
    "successful": 1,
    "failed": 0
  }
}
```
Search
```javascript
Get shop/customer/3
```
Response:
```java
{
  "_index": "shop",
  "_type": "customer",
  "_id": "3",
  "found": false
}
```
### 2.5 Search
a) Search all customers
```javascript
GET /shop/customer/_search
```
Response:
```java
{
  "took": 4,
  "timed_out": false,
  "_shards": {
    "total": 5,
    "successful": 5,
    "failed": 0
  },
  "hits": {
    "total": 2,
    "max_score": 1,
    "hits": [
      {
        "_index": "shop",
        "_type": "customer",
        "_id": "2",
        "_score": 1,
        "_source": {
          "name": "Sean",
          "address": "1010 Steven Creek Ave, Cupertino",
          "level": "Bronze"
        }
      },
      {
        "_index": "shop",
        "_type": "customer",
        "_id": "1",
        "_score": 1,
        "_source": {
          "name": "Johnny",
          "address": "1234 Hillview Ave, Palo Alto",
          "level": "Golden"
        }
      }
    ]
  }
}
```
a) Search the customer named 'Johnny'
```javascript
GET /shop/customer/_search?q=name:Johnny
```
Response:
```java
{
  "took": 3,
  "timed_out": false,
  "_shards": {
    "total": 5,
    "successful": 5,
    "failed": 0
  },
  "hits": {
    "total": 1,
    "max_score": 0.2876821,
    "hits": [
      {
        "_index": "shop",
        "_type": "customer",
        "_id": "1",
        "_score": 0.2876821,
        "_source": {
          "name": "Johnny",
          "address": "1234 Hillview Ave, Palo Alto",
          "level": "Golden"
        }
      }
    ]
  }
}
```

## 3. Conclusion
Query is powerful and complex.

## 4. Reference
* [https://www.tutorialspoint.com/elasticsearch/](https://www.tutorialspoint.com/elasticsearch/)
* [https://www.elastic.co/guide/en/elasticsearch/reference/current/search-search.html](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-search.html)
* [https://blog.coding.net/blog/elastic-search](https://blog.coding.net/blog/elastic-search)  
