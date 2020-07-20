---
layout: tutorial
key: programming
title: "Design Pattern - Factory"
index: 2903
subcategory: design-pattern
date: 2016-05-03
tags: [Abstract Factory, Factory Method]
---

> Creational Pattern: Factory Pattern.

## 1. Types of Factory Pattern
* Simple Factory Pattern
* Abstract Factory Pattern
* Factory Method Pattern

## 2. Simple Factory Pattern
The Simple Factory Pattern defines a technique to encapsulate the details of object creation in a single class known as a “Factory” class whose job it is to create concrete instances of various objects that implement a given interface. The other objects in the application that need new objects created by the factory class are known as “clients” of the factory.
By doing this, we ensure the following:
* Object creation code appears in one place only (rather than multiple times as in our previous example)
* Changes to object creation code are limited to the factory class and do not affect the factory’s clients – changes are made in one place at one time.
* Clients of the factory class need not (and will not) know the actual concrete class type of the objects that are created for it – therefore they are not coupled to any concrete classes.
* The client classes are closed for modification

Aircraft Interface.
```java
public interface Aircraft {
    void load();
    void takeoff();
    String getType();
}
```
Factory Class.
```java
/*
 * Factory Pattern
 */
public class AircraftFactory {
    // Declare a private constructor to prevent class instances from being created in any other places
    private AircraftFactory() {}

    // use a static method to get object with the given type
    public static Aircraft createAircraft(String type) {
        if (type.equals("TroopTransportCraft")) {
            return new TroopTransportCraft();
        } else if (type.equals("FighterCraft")) {
            return new FighterCraft();
        } else if (type.equals("BomberCraft")) {
            return new BomberCraft();
        } else if (type.equals("GunshipCraft")) {
            return new GunshipCraft();
        } else if (type.equals("MedicHelicopterCraft")) {
            return new MedicHelicopterCraft();
        } else {
            return null;
        }
    }
}
```
Caller.
```java
public class AircraftProcessor {
    @Deprecated
    public void process(String type) {
        Aircraft acft = null;
        if (type.equals("PassengerCraft")) {
            acft = new PassengerCraft();
        } else if (type.equals("CargoCraft")) {
            acft = new CargoCraft();
        } else if (type.equals("FighterCraft")) {
            acft = new FighterCraft();
        } else if (type.equals("BomberCraft")) {
            acft = new BomberCraft();
        }

        acft.load();
        acft.takeoff();
    }
    public void processNew(String type) {
        Aircraft acft = AircraftFactory.createAircraft(type);
        acft.load();
        acft.takeoff();
    }
}
```

## 3. Abstract Factory Pattern
Create interface for factory, then create different factories with implementing the factory interface.

AircraftFactory Interface.
```java
public interface AircraftFactory {
    public Aircraft createAircraft(String type);
}
```
USAircraftFactory Class.
```java
public class USAircraftFactory implements AircraftFactory {
    public Aircraft createAircraft(String type) {
        if (type.equals("Bomber")) {
            return new USBomberCraft();
        } else if (type.equals("Fighter")) {
            return new USFighterCraft();
        } else if (type.equals("Gunship")) {
            return new USGunshipCraft();
        } else if (type.equals("Troop")) {
            return new USTroopTransportCraft();
        } else {
            return null;
        }
    }
}
```
BritishAircraftFactory Class.
```java
public class BritishAircraftFactory implements AircraftFactory {
    public Aircraft createAircraft(String type) {
        if (type.equals("Bomber")) {
            return new BritishBomberCraft();
        } else if (type.equals("Fighter")) {
            return new BritishFighterCraft();
        } else if (type.equals("Gunship")) {
            return new BritishGunshipCraft();
        } else if (type.equals("Troop")) {
            return new BritishTroopTransportCraft();
        } else {
            return null;
        }
    }
}
```
Caller.
```java
public class AircraftProcessor {
    private AircraftFactory aircraftFactory = null;

    public AircraftProcessor(AircraftFactory af) {
        aircraftFactory = af;
    }

    public void process(String type) {
        Aircraft acft = aircraftFactory.createAircraft(type);
        acft.load();
        acft.takeoff();
    }
}
```
* Use the given factory to create Aircraft by type.

## 4. Factory Method Pattern
Create abstract class for factory, then create different factories with extending the base factory class.

AircraftFactory abstract class.
```java
public abstract class AircraftFactory {
    public abstract Aircraft createAircraft(String type);
}
```
USAircraftFactory Class.
```java
public class USAircraftFactory extends AircraftFactory {
    public Aircraft createAircraft(String type) {
        if (type.equals("Bomber")) {
            return new USBomberCraft();
        } else if (type.equals("Fighter")) {
            return new USFighterCraft();
        } else if (type.equals("Gunship")) {
            return new USGunshipCraft();
        } else if (type.equals("Troop")) {
            return new USTroopTransportCraft();
        } else {
            return null;
        }
    }
}
```
BritishAircraftFactory Class.
```java
public class BritishAircraftFactory extends AircraftFactory {
    public Aircraft createAircraft(String type) {
        if (type.equals("Bomber")) {
            return new BritishBomberCraft();
        } else if (type.equals("Fighter")) {
            return new BritishFighterCraft();
        } else if (type.equals("Gunship")) {
            return new BritishGunshipCraft();
        } else if (type.equals("Troop")) {
            return new BritishTroopTransportCraft();
        } else {
            return null;
        }
    }
}
```
Caller.
```java
public class AircraftProcessor {
    private AircraftFactory aircraftFactory = null;

    public AircraftProcessor(AircraftFactory af) {
        aircraftFactory = af;
    }

    public void process(String type) {
        Aircraft acft = aircraftFactory.createAircraft(type);
        acft.load();
        acft.takeoff();
    }
}
```
* Use the given factory to create Aircraft by type.

## 5. Source Files
* [Source files for Factory Pattern on GitHub](https://github.com/jojozhuang/design-patterns-java/tree/master/design-pattern-factory)
* [Source files for Abstract Factory Pattern on GitHub](https://github.com/jojozhuang/design-patterns-java/tree/master/design-pattern-abstract-factory)
* [Source files for Factory Method Pattern on GitHub](https://github.com/jojozhuang/design-patterns-java/tree/master/design-pattern-factory-method)
