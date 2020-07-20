---
layout: tutorial
key: programming
title: "Design Pattern - Memento"
index: 2925
subcategory: design-pattern
date: 2016-05-25
tags: [Memento Pattern]
---

> Behavioral Pattern: Memento Pattern.

## 1. Memento Pattern
The Memento pattern is used to restore state of an object to a previous state. Normally, this pattern defines three distinct roles:
* Originator - the object that knows how to save itself.
* Caretaker - the object that knows why and when the Originator needs to save and restore itself.
* Memento - the lock box that is written and read by the Originator, and shepherded by the Caretaker.

## 2. Example
```java
public class Memento {
    private String state;

    public Memento(String state) {
        this.state = state;
    }

    public String getState() {
        return state;
    }
}

public class Caretaker {
    private ArrayList<Memento> mementos = new ArrayList<>();

    public void addMemento(Memento m) {
        mementos.add(m);
    }

    public Memento getMemento() {
        return mementos.get(1);
    }
}

public class Originator {
    private String state;

    public void setState(String state) {
        System.out.println("Originator: Setting state to " + state);
        this.state = state;
    }

    public Memento save() {
        System.out.println("Originator: Saving to Memento.");
        return new Memento(state);
    }

    public void restore(Memento m) {
        state = m.getState();
        System.out.println("Originator: State after restoring from Memento: " + state);
    }
}
```
### 2.2 Client
```java
public class Client {
    public void run() {
        Caretaker caretaker = new Caretaker();
        Originator originator = new Originator();
        originator.setState("State1");
        originator.setState("State2");
        caretaker.addMemento( originator.save() );
        originator.setState("State3");
        caretaker.addMemento( originator.save() );
        originator.setState("State4");
        originator.restore( caretaker.getMemento() );
    }
}
```
Output.
```raw
Originator: Setting state to State1
Originator: Setting state to State2
Originator: Saving to Memento.
Originator: Setting state to State3
Originator: Saving to Memento.
Originator: Setting state to State4
Originator: State after restoring from Memento: State3
```

## 3. Source Files
* [Source files for Memento Pattern on GitHub](https://github.com/jojozhuang/design-patterns-java/tree/master/design-pattern-memento)

## 4. References
* [Memento Design Pattern](https://sourcemaking.com/design_patterns/memento)
* [Memento in Java](https://sourcemaking.com/design_patterns/memento/java/1)
