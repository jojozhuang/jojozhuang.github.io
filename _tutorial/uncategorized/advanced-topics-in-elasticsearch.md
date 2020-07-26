---
layout: tutorial
key: tutorial
title: "Advanced Topics in Elasticsearch"
index: 9711
subcategory: uncategorized
date: 2017-06-29
tags: [Elasticsearch]
---

> Advanced Search Queries in Elastic Search.

## 1. Links on Local ES Setup
* Elastic Search -> [http://localhost:9200](http://localhost:9200)
* Kibana->Dev Tools -> [http://192.168.56.101:5601](http://192.168.56.101:5601)

## 2. Inverted Index
* https://www.elastic.co/guide/en/elasticsearch/guide/current/inverted-index.html
tokenization
normalization

## 3. Dive to DSL
DSL: Domain-specific Language

The following queries are based on the sample employee data, created by [Indexing Employee Document](https://www.elastic.co/guide/en/elasticsearch/guide/current/_indexing_employee_documents.html) from ES Official Website, started from [Search with Query DSL](https://www.elastic.co/guide/en/elasticsearch/guide/current/_search_with_query_dsl.html).

### Query-string Search
Search for employees who have “Smith” in their last name.
```
GET /megacorp/employee/_search?q=last_name:Smith
```

### DSL Query
Same with the above one.
```
GET /megacorp/employee/_search
```
```json
{
    "query" : {
        "match" : {
            "last_name" : "Smith"
        }
    }
}
```

### DSL Query with Filter
```
GET /megacorp/employee/_search
```
```java
{
    "query" : {
        "bool" : {
            "must" : {
                "match" : {
                    "last_name" : "smith"
                }
            },
            "filter" : {
                "range" : {
                    "age" : { "gt" : 30 } //range filter: older than 30
                }
            }
        }
    }
}
```

### Full-Text Search
```java
GET /megacorp/employee/_search
{
    "query" : {
        "match" : {
            "about" : "rock climbing"
        }
    }
}
```

Response:
```java
{
   ...
   "hits": {
      "total":      2,
      "max_score":  0.16273327,
      "hits": [
         {
            ...
            "_score":         0.16273327,
            "_source": {
               "first_name":  "John",
               "last_name":   "Smith",
               "age":         25,
               "about":       "I love to go rock climbing", //exact hit
               "interests": [ "sports", "music" ]
            }
         },
         {
            ...
            "_score":         0.016878016,
            "_source": {
               "first_name":  "Jane",
               "last_name":   "Smith",
               "age":         32,
               "about":       "I like to collect rock albums", // why? rock = rock climbing?
               "interests": [ "music" ]
            }
         }
      ]
   }
}
```
The scores of each hit are different. Hits are sorted by score in descending order.

### Phrase Search
Match exact sequences of words or phrases. The below query only returns one hit, the first one in above sample.
```java
GET /megacorp/employee/_search
{
    "query" : {
        "match_phrase" : {              //match exact "rock climbing"
            "about" : "rock climbing"
        }
    }
}
```

### Highlight the Result
```java
GET /megacorp/employee/_search
{
    "query" : {
        "match_phrase" : {
            "about" : "rock climbing"
        }
    },
    "highlight": {
        "fields" : {
            "about" : {}
        }
    }
}
```

Response:
```java
{
   ...
   "hits": {
      "total":      1,
      "max_score":  0.23013961,
      "hits": [
         {
            ...
            "_score":         0.23013961,
            "_source": {
               "first_name":  "John",
               "last_name":   "Smith",
               "age":         25,
               "about":       "I love to go rock climbing",
               "interests": [ "sports", "music" ]
            },
            "highlight": {
               "about": [
                  "I love to go <em>rock</em> <em>climbing</em>"  // wrapped in <em></em> HTML tags
               ]
            }
         }
      ]
   }
}
```

### Aggregations
find the most popular interests enjoyed by our employees:
```java
GET /megacorp/employee/_search
{
  "aggs": {
    "all_interests": {
      "terms": { "field": "interests" }
    }
  }
}
```

Response:
```java
{
   ...
   "hits": { ... },
   "aggregations": {
      "all_interests": {
         "buckets": [
            {
               "key":       "music",
               "doc_count": 2
            },
            {
               "key":       "forestry",
               "doc_count": 1
            },
            {
               "key":       "sports",
               "doc_count": 1
            }
         ]
      }
   }
}
```

## 4. Additional Chapters
* [Life Inside a Cluster](https://www.elastic.co/guide/en/elasticsearch/guide/current/distributed-cluster.html)
* [Distributed Document Store](https://www.elastic.co/guide/en/elasticsearch/guide/current/distributed-docs.html)
* [Distributed Search Execution](https://www.elastic.co/guide/en/elasticsearch/guide/current/distributed-search.html)
* [Inside a Shard](https://www.elastic.co/guide/en/elasticsearch/guide/current/inside-a-shard.html)
