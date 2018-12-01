---
layout: note
key: note
title: "Design Pattern - Composite"
index: 512
category: designpattern
image: /note/designpattern.png
date: 2016-05-12
postdate: 2016-05-12
tags: [Composite Pattern]
---

> Structural Pattern: Composite Pattern.

## 1. Composite Pattern

## 2. Example
```java
public class File {
    private String name;

    public File(String name) {
        this.name = name;
    }

    public void ls() {
        System.out.println("File:" + name);
    }
}

public class Directory {
    private String name;
    private ArrayList includedFiles = new ArrayList();

    public Directory(String name) {
        this.name = name;
    }

    public void add(Object obj) {
        includedFiles.add(obj);
    }

    public void ls() {
        System.out.println("Directory: " + name);
        for (Object obj : includedFiles) {
            // Recover the type of this object
            String name = obj.getClass().getSimpleName();
            if (name.equals("Directory")) {
                ((Directory)obj).ls();
            } else {
                ((File)obj).ls();
            }
        }
    }
}

public class ProblematicClient {
    public void run() {
        Directory music = new Directory("MUSIC");
        Directory scorpions = new Directory("SCORPIONS");
        Directory dio = new Directory("DIO");
        File track1 = new File("Don't wary, be happy.mp3");
        File track2 = new File("track2.m3u");
        File track3 = new File("Wind of change.mp3");
        File track4 = new File("Big city night.mp3");
        File track5 = new File("Rainbow in the dark.mp3");
        music.add(track1);
        music.add(scorpions);
        music.add(track2);
        scorpions.add(track3);
        scorpions.add(track4);
        scorpions.add(dio);
        dio.add(track5);
        music.ls();
    }
}
```
With Composite Pattern.
```java
public interface AbstractFile {
    void ls();
}

public class File implements AbstractFile {
    private String name;

    public File(String name) {
        this.name = name;
    }

    public void ls() {
        System.out.println("File:" + name);
    }
}

public class Directory implements AbstractFile {
    private String name;
    private ArrayList includedFiles = new ArrayList();

    public Directory(String name) {
        this.name = name;
    }

    public void add(Object obj) {
        includedFiles.add(obj);
    }

    public void ls() {
        System.out.println("Directory: " + name);
        for (Object includedFile : includedFiles) {
            // Leverage the "lowest common denominator"
            AbstractFile obj = (AbstractFile)includedFile;
            obj.ls();
        }
    }
}

public class Client {
    public void run() {
        Directory music = new Directory("MUSIC");
        Directory scorpions = new Directory("SCORPIONS");
        Directory dio = new Directory("DIO");
        File track1 = new File("Don't wary, be happy.mp3");
        File track2 = new File("track2.m3u");
        File track3 = new File("Wind of change.mp3");
        File track4 = new File("Big city night.mp3");
        File track5 = new File("Rainbow in the dark.mp3");
        music.add(track1);
        music.add(scorpions);
        music.add(track2);
        scorpions.add(track3);
        scorpions.add(track4);
        scorpions.add(dio);
        dio.add(track5);
        music.ls();
    }
}
```

## 3. Source Files
* [Source files for Composite Pattern on GitHub](https://github.com/jojozhuang/design-patterns-java/tree/master/design-pattern-composite)

## 4. References
* [Composite in Java: Before and after](https://sourcemaking.com/design_patterns/composite/java/1)
