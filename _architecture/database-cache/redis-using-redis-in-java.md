---
layout: tutorial
key: architecture
title: "Redis - Using Redis in Java"
index: 3303
subcategory: database-cache
date: 2018-08-08
tags: [Redis]
---

> Using Redis in Java programs

## 1. Redis Java Driver
There are many redis clients. We will use Jedis.jar which is for java. Download Jedis.jar from [here](http://central.maven.org/maven2/redis/clients/jedis/2.9.0/jedis-2.9.0.jar). Then, include the jedis.jar in java project.

## 2. Redis Connection
If redis is installed in Ubuntu Virtual Machine, we need to find the ip address of Ubuntu. Settings->Network, click the setting icon.
![image](/assets/images/architecture/3303/network.png){:width="800px"}
See the ip address, eg. '192.168.182.130'.
![image](/assets/images/architecture/3303/ipaddress.png){:width="500px"}

Edit file `/etc/redis/redis.conf` in Ubuntu. Change bind from '127.0.0.1 ::1' to '0.0.0.0 ::1'. Or directly comment out.
```raw
bind 127.0.0.1 ::1
```
Restart redis server.
```raw
sudo systemctl restart redis
```
Check if redis can be access with non-local ip address.
```raw
$ redis-cli -h 192.168.182.130
192.168.182.130:6379>ping
PONG
```

## 3. Java Program
Three operations.
* Connect to Redis Server
* Write data to Redis
* Read data from Redis

```java
package johnny.java.redis;

import redis.clients.jedis.Jedis;

import java.util.List;
import java.util.Set;

public class RedisExample {
    public static void main(String[] args) {
        //Connecting to Redis server on localhost
        Jedis jedis = new Jedis("192.168.182.130");
        System.out.println("Connection to server successfully");
        //check whether server is running or not
        System.out.println("Server is running: "+jedis.ping());

        //set the data in redis string
        jedis.set("tutorial-name", "Redis tutorial");
        System.out.println("Stored string in redis:: "+ jedis.get("username"));

        //store data in redis list
        jedis.lpush("tutorial-list", "Redis");
        jedis.lpush("tutorial-list", "Mongodb");
        jedis.lpush("tutorial-list", "Mysql");
        // Get the stored data and print it
        List<String> list = jedis.lrange("tutorial-list", 0 ,5);

        for(int i = 0; i<list.size(); i++) {
            System.out.println("Stored string in redis:: "+list.get(i));
        }

        //store data in redis list
        // Get the stored data and print it
        Set<String> set = jedis.keys("*");

        for (String key : set) {
            System.out.println("List of stored keys:: "+key);
        }
    }
}
```
Output.
```raw
Connection to server successfully
Server is running: PONG
Stored string in redis:: Redis tutorial
Stored string in redis:: Mysql
Stored string in redis:: Mongodb
Stored string in redis:: Redis
List of stored keys:: tutorial-name
List of stored keys:: tutorial-list
```

## 4. Source Files
* [Source files for Redis Java on GitHub](https://github.com/jojozhuang/java-programming/tree/master/java-redis)

## 5. References
* [Redis Clients](https://redis.io/clients)
* [Jedis on GitHub](https://github.com/xetorthio/jedis)
* [How to Check IP Address on Ubuntu](https://tecadmin.net/check-ip-address-ubuntu-18-04-desktop/)
* [Cannot connect to Redis installed on VirtualBox running Ubuntu from Windows 7](https://serverfault.com/questions/248248/cannot-connect-to-redis-installed-on-virtualbox-running-ubuntu-from-windows-7)
* [How to start and stop Redis server on Mac, Linux, and Windows?](https://tableplus.io/blog/2018/10/how-to-start-stop-restart-redis.html)
