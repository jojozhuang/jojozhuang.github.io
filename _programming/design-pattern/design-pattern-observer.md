---
layout: tutorial
key: programming
title: "Design Pattern - Observer"
index: 2927
subcategory: design-pattern
date: 2016-05-27
tags: [Observer Pattern]
---

> Behavioral Pattern: Observer Pattern.

## 1. Observer Pattern
The Observer pattern defines a one-to-many relationship so that when one object changes state, the others are notified and updated automatically.

## 2. Example
### 2.1 Observer
```java
public interface Observer {
    public void update(String message);
}

public class User implements Observer {
    private String name;
    private String message;

    public User(String name) {
        this.name = name;
    }

    @Override
    public void update(String message) {
        this.message = message;
        read();
    }

    public void read() {
        System.out.println(name + " received message from server: " + message);
    }
}
```
### 2.2 Observerable
```java
public interface Observerable {
    public void registerObserver(Observer o);
    public void removeObserver(Observer o);
    public void notifyObserver();
}

public class MessageServer implements Observerable {
    private List<Observer> observers;
    private String message;

    public MessageServer() {
        observers = new ArrayList<Observer>();
    }

    @Override
    public void registerObserver(Observer o) {
        observers.add(o);
    }

    @Override
    public void removeObserver(Observer o) {
        if(!observers.isEmpty())
            observers.remove(o);
    }

    @Override
    public void notifyObserver() {
        for(int i = 0; i < observers.size(); i++) {
            Observer oserver = observers.get(i);
            oserver.update(message);
        }
    }

    public void setMessage(String s) {
        this.message = s;
        System.out.println("Message Server is updating message: " + s);
        // Notify all observers
        notifyObserver();
    }
}
```
### 2.3 Client
```java
public class Client {
    public void run() {
        MessageServer server = new MessageServer();

        Observer user1 = new User("Johnny");
        Observer user2 = new User("George");
        Observer user3 = new User("Sean");

        server.registerObserver(user1);
        server.registerObserver(user2);
        server.registerObserver(user3);
        server.setMessage("Hello from Rong!");

        System.out.println("----------------------------------------------");
        server.removeObserver(user3);
        server.setMessage("We are using Java to send message!");
    }
}
```
Output.
```raw
Message Server is updating message: Hello from Rong!
Johnny received message from server: Hello from Rong!
George received message from server: Hello from Rong!
Sean received message from server: Hello from Rong!
----------------------------------------------
Message Server is updating message: We are using Java to send message!
Johnny received message from server: We are using Java to send message!
George received message from server: We are using Java to send message!
```

## 3. Source Files
* [Source files for Observer Pattern on GitHub](https://github.com/jojozhuang/design-patterns-java/tree/master/design-pattern-observer)

## 4. References
* [Design Patterns - Observer Pattern](https://www.tutorialspoint.com/design_pattern/observer_pattern.htm)
* [Observer Design Pattern](https://sourcemaking.com/design_patterns/observer)
