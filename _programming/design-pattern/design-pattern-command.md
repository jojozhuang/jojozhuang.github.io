---
layout: tutorial
key: programming
title: "Design Pattern - Command"
index: 2921
subcategory: design-pattern
date: 2016-05-21
tags: [Command Pattern]
---

> Behavioral Pattern: Command Pattern.

## 1. Command Pattern
The Command pattern allows requests to be encapsulated as objects, thereby allowing clients to be parametrized with different requests. Command decouples the object that invokes the operation from the one that knows how to perform it.

## 2. Example
### 2.1 Command
```java
public interface Command {
    void execute();
}

public class Buy implements Command {
    public void execute() {
        System.out.println("Buy stock");
    }
}

public class Sell implements Command {
    public void execute() {
        System.out.println("Sell stock");
    }
}
```
### 2.2 Broker
```java
public class Broker {
    private List<Command> cmdList = new ArrayList<>();

    public void acceptCommand(Command cmd){
        cmdList.add(cmd);
    }

    public void executeCommand(){
        for (Command cmd : cmdList) {
            cmd.execute();
        }
        cmdList.clear();
    }
}
```
### 2.3 Client
```java
public class Client {
    public void run() {
        Buy buyStock = new Buy();
        Sell sellStock = new Sell();

        Broker broker = new Broker();
        broker.acceptCommand(buyStock);
        broker.acceptCommand(sellStock);

        broker.executeCommand();
    }
}
```
Output.
```raw
Buy stock
Sell stock
```

## 3. Source Files
* [Source files for Command Pattern on GitHub](https://github.com/jojozhuang/design-patterns-java/tree/master/design-pattern-command)

## 4. References
* [Design Patterns - Command Pattern](https://www.tutorialspoint.com/design_pattern/command_pattern.htm)
