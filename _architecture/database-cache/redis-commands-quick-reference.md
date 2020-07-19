---
layout: tutorial
key: architecture
title: "Redis - Commands Quick Reference"
index: 3302
subcategory: database-cache
date: 2018-08-07
tags: [Redis]
---

> Redis commands list.

## 1. Storage
### 1.1 Keys

No.  | Command  | Description
-----|----------|----------------------------------
 1 | DEL key | This command deletes the key, if it exists.
 2 | DUMP key | This command returns a serialized version of the value stored at the specified key.
 3 | EXISTS key | This command checks whether the key exists or not.
 4 | EXPIRE key seconds | Sets the expiry of the key after the specified time.
 5 | EXPIREAT key timestamp | Sets the expiry of the key after the specified time. Here time is in Unix timestamp format.
 6 | PEXPIRE key milliseconds | Set the expiry of key in milliseconds.
 7 | PEXPIREAT key milliseconds-timestamp | Sets the expiry of the key in Unix timestamp specified as milliseconds.
 8 | KEYS pattern | Finds all keys matching the specified pattern.
 9 | MOVE key db | Moves a key to another database.
 10 | PERSIST key | Removes the expiration from the key.
 11 | PTTL key | Gets the remaining time in keys expiry in milliseconds.
 12| TTL key | Gets the remaining time in keys expiry.
 13 | RANDOMKEY | Returns a random key from Redis.
 14 | RENAME key newkey |Changes the key name.
 15 | RENAMENX key newkey | Renames the key, if a new key doesn't exist.
 16 | TYPE key | Returns the data type of the value stored in the key.

### 1.2 Strings

No.  | Command  | Description
-----|----------|----------------------------------
1 | SET key value | This command sets the value at the specified key.
2 | GET key | Gets the value of a key.
3 | GETRANGE key start end | Gets a substring of the string stored at a key.
4 | GETSET key value | Sets the string value of a key and return its old value.
5 | GETBIT key offset | Returns the bit value at the offset in the string value stored at the key.
6 | MGET key1 [key2..] | Gets the values of all the given keys
7 | SETBIT key offset value | Sets or clears the bit at the offset in the string value stored at the key
8 | SETEX key seconds value | Sets the value with the expiry of a key
9 | SETNX key value | Sets the value of a key, only if the key does not exist
10 | SETRANGE key offset value | Overwrites the part of a string at the key starting at the specified offset
11 | STRLEN key | Gets the length of the value stored in a key
12 | MSET key value [key value ...] | Sets multiple keys to multiple values
13 | MSETNX key value [key value ...] | Sets multiple keys to multiple values, only if none of the keys exist
14 | PSETEX key milliseconds value | Sets the value and expiration in milliseconds of a key
15 | INCR key | Increments the integer value of a key by one
16 | INCRBY key increment | Increments the integer value of a key by the given amount
17 | INCRBYFLOAT key increment | Increments the float value of a key by the given amount
18 | DECR key | Decrements the integer value of a key by one
19 | DECRBY key decrement | Decrements the integer value of a key by the given number
20 | APPEND key value | Appends a value to a key

### 1.3 Hashes

No.  | Command  | Description
-----|----------|----------------------------------
1 | HDEL key field2 [field2] | Deletes one or more hash fields.
2 | HEXISTS key field | Determines whether a hash field exists or not.
3 | HGET key field | Gets the value of a hash field stored at the specified key.
4 | HGETALL key | Gets all the fields and values stored in a hash at the specified key
5 | HINCRBY key field increment | Increments the integer value of a hash field by the given number
6 | HINCRBYFLOAT key field increment | Increments the float value of a hash field by the given amount
7 | HKEYS key | Gets all the fields in a hash
8 | HLEN key | Gets the number of fields in a hash
9 | HMGET key field1 [field2] | Gets the values of all the given hash fields
10 | HMSET key field1 value1 [field2 value2 ] | Sets multiple hash fields to multiple values
11 | HSET key field value | Sets the string value of a hash field
12 | HSETNX key field value | Sets the value of a hash field, only if the field does not exist
13 | HVALS key | Gets all the values in a hash
14 | HSCAN key cursor [MATCH pattern] [COUNT count] | Incrementally iterates hash fields and associated values

### 1.4 Lists

No.  | Command  | Description
-----|----------|----------------------------------
1 | BLPOP key1 [key2 ] timeout | Removes and gets the first element in a list, or blocks until one is available
2 | BRPOP key1 [key2 ] timeout | Removes and gets the last element in a list, or blocks until one is available
3 | BRPOPLPUSH source destination timeout | Pops a value from a list, pushes it to another list and returns it; or blocks until one is available
4 | LINDEX key index | Gets an element from a list by its index
5 | LINSERT key BEFORE/AFTER pivot value | Inserts an element before or after another element in a list
6 | LLEN key | Gets the length of a list
7 | LPOP key | Removes and gets the first element in a list
8 | LPUSH key value1 [value2] | Prepends one or multiple values to a list
9 | LPUSHX key value | Prepends a value to a list, only if the list exists
10 | LRANGE key start stop | Gets a range of elements from a list
11 | LREM key count value | Removes elements from a list
12 | LSET key index value | Sets the value of an element in a list by its index
13 | LTRIM key start stop | Trims a list to the specified range
14 | RPOP key | Removes and gets the last element in a list
15 | RPOPLPUSH source destination | Removes the last element in a list, appends it to another list and returns it
16 | RPUSH key value1 [value2] | Appends one or multiple values to a list
17 | RPUSHX key value | Appends a value to a list, only if the list exists

### 1.5 Sets

No.  | Command  | Description
-----|----------|----------------------------------
1 | SADD key member1 [member2] | Adds one or more members to a set
2 | SCARD key | Gets the number of members in a set
3 | SDIFF key1 [key2] | Subtracts multiple sets
4 | SDIFFSTORE destination key1 [key2] | Subtracts multiple sets and stores the resulting set in a key
5 | SINTER key1 [key2] | Intersects multiple sets
6 | SINTERSTORE destination key1 [key2] | Intersects multiple sets and stores the resulting set in a key
7 | SISMEMBER key member | Determines if a given value is a member of a set
8 | SMEMBERS key | Gets all the members in a set
9 | SMOVE source destination member | Moves a member from one set to another
10 | SPOP key | Removes and returns a random member from a set
11 | SRANDMEMBER key [count] | Gets one or multiple random members from a set
12 | SREM key member1 [member2] | Removes one or more members from a set
13 | SUNION key1 [key2] | Adds multiple sets
14 | SUNIONSTORE destination key1 [key2] | Adds multiple sets and stores the resulting set in a key
15 | SSCAN key cursor [MATCH pattern] [COUNT count] | Incrementally iterates set elements

### 1.6 Sorted Sets

No.  | Command  | Description
-----|----------|----------------------------------
1 | ZADD key score1 member1 [score2 member2] | Adds one or more members to a sorted set, or updates its score, if it already exists
2 | ZCARD key | Gets the number of members in a sorted set
3 | ZCOUNT key min max | Counts the members in a sorted set with scores within the given values
4 | ZINCRBY key increment member | Increments the score of a member in a sorted set
5 | ZINTERSTORE destination numkeys key [key ...] | Intersects multiple sorted sets and stores the resulting sorted set in a new key
6 | ZLEXCOUNT key min max | Counts the number of members in a sorted set between a given lexicographical range
7 | ZRANGE key start stop [WITHSCORES] | Returns a range of members in a sorted set, by index
8 | ZRANGEBYLEX key min max [LIMIT offset count] | Returns a range of members in a sorted set, by lexicographical range
9 | ZRANGEBYSCORE key min max [WITHSCORES] [LIMIT] | Returns a range of members in a sorted set, by score
10 | ZRANK key member | Determines the index of a member in a sorted set
11 | ZREM key member [member ...] | Removes one or more members from a sorted set
12 | ZREMRANGEBYLEX key min max | Removes all members in a sorted set between the given lexicographical range
13 | ZREMRANGEBYRANK key start stop | Removes all members in a sorted set within the given indexes
14 | ZREMRANGEBYSCORE key min max | Removes all members in a sorted set within the given scores
15 | ZREVRANGE key start stop [WITHSCORES] | Returns a range of members in a sorted set, by index, with scores ordered from high to low
16 | ZREVRANGEBYSCORE key max min [WITHSCORES] | Returns a range of members in a sorted set, by score, with scores ordered from high to low
17 | ZREVRANK key member | Determines the index of a member in a sorted set, with scores ordered from high to low
18 | ZSCORE key member | Gets the score associated with the given member in a sorted set
19 | ZUNIONSTORE destination numkeys key [key ...] | Adds multiple sorted sets and stores the resulting sorted set in a new key
20 | ZSCAN key cursor [MATCH pattern] [COUNT count] | Incrementally iterates sorted sets elements and associated scores

### 1.7 HyperLogLog

No.  | Command  | Description
-----|----------|----------------------------------
1 | PFADD key element [element ...] | Adds the specified elements to the specified HyperLogLog.
2 | PFCOUNT key [key ...] | Returns the approximated cardinality of the set(s) observed by the HyperLogLog at key(s).
3 | PFMERGE destkey sourcekey [sourcekey ...] | Merges N different HyperLogLogs into a single one.

## 2. Features
### 2.1 Publish Subscribe

No.  | Command  | Description
-----|----------|----------------------------------
1 | PSUBSCRIBE pattern [pattern ...] | Subscribes to channels matching the given patterns.
2 | PUBSUB subcommand [argument [argument ...]] | Tells the state of Pub/Sub system. For example, which clients are active on the server.
3 | PUBLISH channel message | Posts a message to a channel.
4 | PUNSUBSCRIBE [pattern [pattern ...]] | Stops listening for messages posted to channels matching the given patterns.
5 | SUBSCRIBE channel [channel ...] | Listens for messages published to the given channels.
6 | UNSUBSCRIBE [channel [channel ...]] | Stops listening for messages posted to the given channels.

### 2.2 Transactions

No.  | Command  | Description
-----|----------|----------------------------------
1 | DISCARD | Discards all commands issued after MULTI
2 | EXEC | Executes all commands issued after MULTI
3 | MULTI | Marks the start of a transaction block
4 | UNWATCH | Forgets about all watched keys
5 | WATCH key [key ...] | Watches the given keys to determine the execution of the MULTI/EXEC block

### 2.3 Scripting

No.  | Command  | Description
-----|----------|----------------------------------
1 | EVAL script numkeys key [key ...] arg [arg ...] | Executes a Lua script.
2 | EVALSHA sha1 numkeys key [key ...] arg [arg ...] | Executes a Lua script.
3 | SCRIPT EXISTS script [script ...] | Checks the existence of scripts in the script cache.
4 | SCRIPT FLUSH | Removes all the scripts from the script cache.
5 | SCRIPT KILL | Kills the script currently in execution.
6 | SCRIPT LOAD script | Loads the specified Lua script into the script cache.

### 2.4 Connections

No.  | Command  | Description
-----|----------|----------------------------------
1 | AUTH password | Authenticates to the server with the given password
2 | ECHO message | Prints the given string
3 | PING | Checks whether the server is running or not
4 | QUIT | Closes the current connection
5 | SELECT index | Changes the selected database for the current connection

### 2.5 Server

No.  | Command  | Description
-----|----------|----------------------------------
1 | BGREWRITEAOF | Asynchronously rewrites the append-only file
2 | BGSAVE | Asynchronously saves the dataset to the disk
3 | CLIENT KILL [ip:port] [ID client-id] | Kills the connection of a client
4 | CLIENT LIST | Gets the list of client connections to the server
5 | CLIENT GETNAME | Gets the name of the current connection
6 | CLIENT PAUSE timeout | Stops processing commands from the clients for a specified time
7 | CLIENT SETNAME connection-name | Sets the current connection name
8 | CLUSTER SLOTS | Gets an array of Cluster slot to node mappings
9 | COMMAND | Gets an array of Redis command details
10 | COMMAND COUNT | Gets total number of Redis commands
11 | COMMAND GETKEYS | Extracts the keys given a full Redis command
12 | BGSAVE | Asynchronously saves the dataset to the disk
13 | COMMAND INFO command-name [command-name ...] | Gets an array of specific Redis command details
14 | CONFIG GET parameter | Gets the value of a configuration parameter
15 | CONFIG REWRITE | Rewrites the configuration file with the in-memory configuration
16 | CONFIG SET parameter value | Sets a configuration parameter to the given value
17 | CONFIG RESETSTAT | Resets the stats returned by INFO
18 | DBSIZE | Returns the number of keys in the selected database
19 | DEBUG OBJECT key | Gets debugging information about a key
20 | DEBUG SEGFAULT | Makes the server crash
21 | FLUSHALL | Removes all the keys from all databases
22 | FLUSHDB | Removes all the keys from the current database
23 | INFO [section] | Gets information and statistics about the server
24 | LASTSAVE | Gets the UNIX time stamp of the last successful save to the disk
25 | MONITOR | Listens for all the requests received by the server in real time
26 | ROLE | Returns the role of the instance in the context of replication
27 | SAVE | Synchronously saves the dataset to the disk
28 | SHUTDOWN [NOSAVE] [SAVE] | Synchronously saves the dataset to the disk and then shuts down the server
29 | SLAVEOF host port | Makes the server a slave of another instance, or promotes it as a master
30 | SLOWLOG subcommand [argument] | Manages the Redis slow queries log
31 | SYNC | Command used for replication
32 | TIME | Returns the current server time

### 2.6 Client Connection

No.  | Command  | Description
-----|----------|----------------------------------
1 | CLIENT LIST | Returns the list of clients connected to Redis server
2 | CLIENT SETNAME | Assigns a name to the current connection
3 | CLIENT GETNAME | Returns the name of the current connection as set by CLIENT SETNAME
4 | CLIENT PAUSE | This is a connections control command able to suspend all the Redis clients for the specified amount of time (in milliseconds)
5 | CLIENT KILL | This command closes a given client connection

## 3. Benchmarks

Sr.No | Option | Description | Default Value
------|--------|----------------------------------------|-----------------
1  | -h | Specifies server host name                    | 127.0.0.1
2  | -p | Specifies server port                         | 6379
3  | -s | Specifies server socket                       |
4  | -c | Specifies the number of parallel connections  | 50
5  | -n | Specifies the total number of requests        | 10000
6  | -d | Specifies data size of SET/GET value in bytes | 2
7  | -k | 1=keep alive, 0=reconnect                     | 1
8  | -r | Use random keys for SET/GET/INCR, random values for SADD |
9  | -p | Pipeline <numreq> requests                    | 1
10 | -h | Specifies server host name                    |
11 | -q | Forces Quiet to Redis. Just shows query/sec values |
12 |--csv | Output in CSV format |
13 | -l | Generates loop, Run the tests forever |
14 | -t | Only runs the comma-separated list of tests |
15 | -I | Idle mode. Just opens N idle connections and wait	|

## 4. References
* [Redis - Quick Guide](https://www.tutorialspoint.com/redis/redis_quick_guide.htm)
