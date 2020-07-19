---
layout: tutorial
key: programming
title: "Java Advanced - Process and ProcessBuilder - Draft"
index: 2474
subcategory: java-advanced
date: 2017-03-06
tags: [Runtime, ProcessBuilder]
draft: true
---

> Create multiple processes in Java.

## 1. The Runtime Class
```java
public class ProcessDemo {

   public static void main(String[] args) throws Exception {

      Runtime r=Runtime.getRuntime();

      System.out.println("No of Processor: "+
         r.availableProcessors());
      System.out.println("Total memory: "+r.totalMemory());
      System.out.println("Free memory: "+r.freeMemory());
      System.out.println("Memory occupied: "+
         (r.totalMemory()-r.freeMemory()));

      for(int i=0;i<=10000;i++){
         new Object();
      }

      r.gc();

      System.out.println("::Memory status::");
      System.out.println("Total memory: "+r.totalMemory());
      System.out.println("Free memory: "+r.freeMemory());
      System.out.println("Memory occupied: "+
         (r.totalMemory()-r.freeMemory()));
   }
}
```

## 2. The Process Class
```java
import java.util.concurrent.TimeUnit;

public class ProcessDemo {

   public static void main(String[] args) throws Exception {

      Runtime r = Runtime.getRuntime();
      Process p = r.exec("firefox");
      p.waitFor(10, TimeUnit.SECONDS);
      p.destroy();
   }
}
```

## 3. The ProcessBuilder Class
```java
import java.io.BufferedReader;
import java.io.InputStreamReader;

public class ProcessDemo {

   public static void main(String[] args) {

      System.out.println
         ("*************Calendar for Year**********");
      try {
         ProcessBuilder pb = new
            ProcessBuilder("cal", "2022");
         final Process p=pb.start();
         BufferedReader br=new BufferedReader(
            new InputStreamReader(
               p.getInputStream()));
            String line;
            while((line=br.readLine())!=null){
               System.out.println(line);
            }
      } catch (Exception ex) {
         System.out.println(ex);
      }
      System.out.println
         ("************************************");
   }
}
```

## 4. References
* [Understanding Java Process and Java ProcessBuilder](https://www.developer.com/java/data/understanding-java-process-and-java-processbuilder.html)
