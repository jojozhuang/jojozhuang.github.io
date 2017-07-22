---
layout: post
key: blog
title: "Play with Elasticsearch"
date: 2017-06-23
categories:
- blog
---

> Notes for Elastic Search.

## 1. Links
* Elastic Search
[http://localhost:9200](http://localhost:9200)
* Kibana->Dev Tools
[http://192.168.56.101:5601](http://192.168.56.101:5601)

## 2. Usage
* Add Data
```javascript
POST shop/customer/1
{
  "name": "Johnny",
  "address": "1234 Hillview Ave, Palo Alto",
  "level": "Silver"
}
```
Response:
```javascript
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
```javascript
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
* Get Data
```javascript
GET shop/customer/1
```
Response:
```javascript
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
* Update Data
```javascript
PUT shop/customer/1
{
  "name": "Johnny",
  "address": "1234 Hillview Ave, Palo Alto",
  "level": "Golden" // Change from 'Silver' to 'Golden'
}
```
Response:
```javascript
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
* Delete Data
```javascript
DELETE shop/customer/3
```
Response:
```javascript
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
```javascript
{
  "_index": "shop",
  "_type": "customer",
  "_id": "3",
  "found": false
}
```
* Search Data
```javascript
// Search all customers
GET /shop/customer/_search
```
Response:
```javascript
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
```javascript
// Search the customer named 'Johnny'
GET /shop/customer/_search?q=name:Johnny
```
Response:
```javascript
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

## 4. Reference
[https://www.tutorialspoint.com/elasticsearch/](https://www.tutorialspoint.com/elasticsearch/)
[https://blog.coding.net/blog/elastic-search](https://blog.coding.net/blog/elastic-search)  
