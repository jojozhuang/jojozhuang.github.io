---
layout: tutorial
key: architecture
title: "Redis - Tutorial"
index: 3301
subcategory: database-cache
date: 2018-08-06
tags: [Redis]
---

> Tutorial for Redis

## 1. Redis
Redis is an open source, BSD licensed, advanced key-value store. It is often referred to as a data structure server, since the keys can contain strings, hashes, lists, sets and sorted sets. Redis is written in C.

Redis has three main peculiarities that sets it apart.
* Redis holds its database entirely in the memory, using the disk only for persistence.
* Redis has a relatively rich set of data types when compared to many key-value data stores.
* Redis can replicate data to any number of slaves.

## 2. Install Redis on Ubuntu
### 2.1 Install Redis
```raw
$sudo apt-get update
$sudo apt-get install redis-server
```
Open redis prompt.
```raw
$ redis-cli
redis 127.0.0.1:6379>
```
Test connection.
```raw
redis 127.0.0.1:6379> ping
PONG
```
Syntax for remote server.
```raw
$ redis-cli -h host -p port -a password
```
Example for connecting to remote redis server.
```raw
$redis-cli -h 127.0.0.1 -p 6379 -a "mypass"
redis 127.0.0.1:6379>
redis 127.0.0.1:6379> PING  
PONG
```
### 2.2 Connect Redis installed in Ubuntu Virtual Machine
First, find the ip address of Ubuntu. Settings->Network, click the setting icon, see the ip address, eg. '192.168.182.129'.

Edit file /etc/redis/redis.conf in Ubuntu. Change bind from '127.0.0.1 ::1' to '0.0.0.0 ::1'. Or directly comment out.
```raw
bind 127.0.0.1 ::1
```
Restart redis server.
```raw
sudo systemctl restart redis
```
Check if redis can be access with non-local ip address.
```raw
$ redis-cli -h 192.168.182.129
192.168.182.129:6379>ping
PONG
```

### 2.3 Redis Desktop Manager
Go to https://redisdesktop.com/download download and install Redis Desktop Manager.
### 2.4 Configuration
Syntax.
```raw
CONFIG GET CONFIG_SETTING_NAME
CONFIG SET CONFIG_SETTING_NAME NEW_CONFIG_VALUE
```
Example.
```raw
redis 127.0.0.1:6379> CONFIG SET loglevel "notice"
OK
redis 127.0.0.1:6379> CONFIG GET loglevel  
1) "loglevel"
2) "notice"
```
## 3. Date Type
### 3.1 Strings
Redis string is a sequence of bytes.
```raw
redis 127.0.0.1:6379> SET name "johnny"
OK
redis 127.0.0.1:6379> GET name
"johnny"
```
### 3.2 Hashes
Redis hash is a collection of key value pairs. Redis Hashes are maps between string fields and string values. Hence, they are used to represent `objects`.
```raw
redis 127.0.0.1:6379> HMSET user:1 username johnny password 123456 email csgeek@mail.com
OK
redis 127.0.0.1:6379> HGETALL user:1  
1) "username"
2) "johnny"
3) "password"
4) "123456"
5) "email"
6) "csgeek@mail.com"
```
### 3.3 Lists
Redis Lists are simply lists of strings, sorted by insertion order. You can add elements to a Redis List on the head or on the tail.
```raw
redis 127.0.0.1:6379> lpush database redis
(integer) 1
redis 127.0.0.1:6379> lpush database mongodb
(integer) 2
redis 127.0.0.1:6379> lpush database mysql
(integer) 3
redis 127.0.0.1:6379> lrange database 0 10  

1) "mysql"
2) "mongodb"
3) "redis"
```
### 3.4 Sets
Redis Sets are an unordered collection of strings.
```raw
redis 127.0.0.1:6379> sadd database redis
(integer) 1
redis 127.0.0.1:6379> sadd database mongodb
(integer) 1
redis 127.0.0.1:6379> sadd database mysql
(integer) 1
redis 127.0.0.1:6379> sadd database mysql
(integer) 0
redis 127.0.0.1:6379> smembers database  

1) "mysql"
2) "mongodb"
3) "redis"
```
* mysql is added twice, however due to unique property of the set, it is added only once.

### 3.5 Sorted Sets
Redis Sorted Sets are similar to Redis Sets, non-repeating collections of Strings. The difference is, every member of a Sorted Set is associated with a score, that is used in order to take the sorted set ordered, from the smallest to the greatest score. While members are unique, the scores may be repeated.
```raw
redis 127.0.0.1:6379> zadd database 0 redis
(integer) 1
redis 127.0.0.1:6379> zadd database 0 mongodb
(integer) 1
redis 127.0.0.1:6379> zadd database 0 mysql
(integer) 1
redis 127.0.0.1:6379> zadd database 0 mysql
(integer) 0
redis 127.0.0.1:6379> ZRANGEBYSCORE tutoriallist 0 1000  

1) "redis"
2) "mongodb"
3) "mysql"
```

## 4. References
* [Redis Tutorial](https://www.tutorialspoint.com/redis/index.htm)
