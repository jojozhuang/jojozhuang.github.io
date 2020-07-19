---
layout: tutorial
key: programming
title: "Design Pattern - Proxy"
index: 2916
subcategory: design-pattern
date: 2016-05-16
tags: [Proxy Pattern]
---

> Structural Pattern: Proxy Pattern.

## 1. Proxy Pattern
In proxy pattern, a class represents functionality of another class. The Proxy class provides a surrogate or place holder to provide access to an object.

## 2. Example
### 2.1 Internet
```java
public interface Internet {
    public void connect(String host) throws Exception;
}

public class RealInternet implements Internet
{
    @Override
    public void connect(String host)
    {
        System.out.println("Connecting to '"+ host + "' ...");
    }
}
```
### 2.2 Proxy
```java
public class ProxyInternet implements Internet
{
    private Internet internet = new RealInternet();
    private static List<String> bannedSites;

    static
    {
        bannedSites = new ArrayList<String>();
        bannedSites.add("abc.com");
        bannedSites.add("def.com");
        bannedSites.add("ijk.com");
        bannedSites.add("lnm.com");
    }

    @Override
    public void connect(String host) throws Exception
    {
        if(bannedSites.contains(host.toLowerCase()))
        {
            throw new Exception("Access Denied: unable to connect to '" + host + "'");
        }

        internet.connect(host);
    }
}
```
### 2.3 Client
```java
public class ClientTest {

    @Test
    public void testClient() {
        Internet internet = new ProxyInternet();
        System.out.println("Internet is working now ...");
        try
        {
            internet.connect("jojozhuang.github.io");
            internet.connect("abc.com");
        }
        catch (Exception e)
        {
            System.out.println(e.getMessage());
        }
    }
}
```
Output.
```raw
Internet is working now ...
Connecting to 'jojozhuang.github.io' ...
Access Denied: unable to connect to 'abc.com'
```
## 4. Source Files
* [Source files for Proxy Pattern on GitHub](https://github.com/jojozhuang/design-patterns-java/tree/master/design-pattern-proxy)

## 5. References
* [Proxy Design Pattern](https://www.geeksforgeeks.org/proxy-design-pattern/)
* [Proxy Pattern Tutorial with Java Examples](https://dzone.com/articles/design-patterns-proxy)
