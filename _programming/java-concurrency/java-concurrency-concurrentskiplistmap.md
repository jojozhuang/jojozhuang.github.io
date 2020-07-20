---
layout: tutorial
key: programming
title: "Java Concurrency - ConcurrentSkipListMap"
index: 2413
subcategory: java-concurrency
date: 2018-04-02
tags: [ConcurrentSkipListMap]
---

> ConcurrentSkipListMap

## 1. ConcurrentSkipListMap
`ConcurrentSkipListMap` allows us to create thread-safe logic in a lock-free way. It’s ideal for problems when we want to make an immutable snapshot of the data while other threads are still inserting data into the map.

## 2. Last One Minute Problem
We will be solving a problem of sorting a stream of events and getting a snapshot of the events that arrived in the last 60 seconds using that construct.

First, create Event class, which is used to store the event time and its content.
```java
import java.time.ZonedDateTime;

public class Event {
    private final ZonedDateTime eventTime;
    private final String content;

    public Event(ZonedDateTime eventTime, String content) {
        this.eventTime = eventTime;
        this.content = content;
    }

    public ZonedDateTime getEventTime() {
        return eventTime;
    }

    public String getContent() {
        return content;
    }
}
```
Secondly, create a `sorted window structure` with ConcurrentSkipListMap to store the events sorted by `time`.
```java
import java.time.ZonedDateTime;
import java.util.Comparator;
import java.util.concurrent.ConcurrentNavigableMap;
import java.util.concurrent.ConcurrentSkipListMap;

public class SortedEventWindow {
    private final ConcurrentSkipListMap<ZonedDateTime, String> events;

    public SortedEventWindow() {
        events = new ConcurrentSkipListMap<>(
                Comparator.comparingLong(value -> value.toInstant().toEpochMilli()));
    }

    public void acceptEvent(Event event) {
        events.put(event.getEventTime(), event.getContent());
    }

    public ConcurrentNavigableMap<ZonedDateTime, String> getAll() {
        return events;
    }

    public ConcurrentNavigableMap<ZonedDateTime, String> getLastOneMinute() {
        return events.tailMap(ZonedDateTime
                .now()
                .minusMinutes(1));
    }

    public ConcurrentNavigableMap<ZonedDateTime, String> getFirstOneMinute() {
        return events.headMap(ZonedDateTime
                .now()
                .minusMinutes(1));
    }
}
```
* getLastOneMinute - call ConcurrentSkipListMap.tailMap() to get the latest one minute events.
* getFirstOneMinute - call ConcurrentSkipListMap.headMap() to get the first one minute events.

Thirdly, create Runnable task, which generate 50 events. To avoid generating same key event in the circumstance that two threads run simultaneously, we use `odd` flag to control the generated time objects.
```java
import java.time.ZonedDateTime;
import java.util.stream.IntStream;

public class Task implements Runnable {
    private String name;
    private boolean odd;
    private SortedEventWindow sew;

    public Task(String name, boolean odd, SortedEventWindow sew) {
        this.name = name;
        this.odd = odd;
        this.sew = sew;
    }

    public void run() {
        if (this.odd) {
            IntStream
                .rangeClosed(1, 100)
                .filter(i->i % 2 == 1)
                .forEach(index -> sew.acceptEvent(new Event(ZonedDateTime
                        .now()
                        .minusSeconds(index), name)));
        } else {
            IntStream
                .rangeClosed(1, 100)
                .filter(i->i % 2 == 0)
                .forEach(index -> sew.acceptEvent(new Event(ZonedDateTime
                        .now()
                        .minusSeconds(index), name)));
        }
    }
}
```
Finally, create a test class to run test the sorted event window and ConcurrentNavigableMap.
```java
import java.time.ZonedDateTime;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentNavigableMap;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

public class ConcurrentSkipListMapExample {
    public static void main(String[] args) throws Exception {
        // Create thread pool
        ExecutorService executorService = Executors.newFixedThreadPool(3);
        SortedEventWindow sew = new SortedEventWindow();

        executorService.execute(new Task("task1", true, sew));
        executorService.execute(new Task("task2", false, sew));

        Thread.sleep(500);

        // get all events
        System.out.println("All events:");
        Set<Map.Entry<ZonedDateTime, String>> eventSet = sew.getAll().entrySet();
        eventSet.forEach((m)->System.out.println("key=" + m.getKey()
                + " value=" + m.getValue()));

        // get latest one minute events
        ConcurrentNavigableMap<ZonedDateTime, String> events = sew.getLastOneMinute();

        System.out.println("Latest one minute events:");
        eventSet = events.entrySet();
        eventSet.forEach((m)->System.out.println("key=" + m.getKey()
                + " value=" + m.getValue()));

        long eventsLatestOneMinute = events
                .entrySet()
                .stream()
                .filter(e -> e
                        .getKey()
                        .isAfter(ZonedDateTime
                                .now()
                                .minusMinutes(1)))
                .count();
        System.out.println("Count=" + eventsLatestOneMinute);

        // get first one minute events
        events = sew.getFirstOneMinute();

        System.out.println("First one minute events:");
        eventSet = events.entrySet();
        eventSet.forEach((m)->System.out.println("key=" + m.getKey()
                + " value=" + m.getValue()));

        long eventsFirstOneMinute = events
                .entrySet()
                .stream()
                .filter(e -> e
                        .getKey()
                        .isBefore(ZonedDateTime
                                .now()
                                .minusMinutes(1)))
                .count();
        System.out.println("Count=" + eventsFirstOneMinute);

        executorService.awaitTermination(1, TimeUnit.SECONDS);
        executorService.shutdown();
    }
}
```
* Create two threads with thread pool to generate 100 events.
* Print all events, latest one minute events and first one minute events.

Output.
```raw
All events:
key=2019-08-11T16:49:11.852-07:00[America/Los_Angeles] value=task2
key=2019-08-11T16:49:12.853-07:00[America/Los_Angeles] value=task1
key=2019-08-11T16:49:13.852-07:00[America/Los_Angeles] value=task2
key=2019-08-11T16:49:14.853-07:00[America/Los_Angeles] value=task1
key=2019-08-11T16:49:15.852-07:00[America/Los_Angeles] value=task2
key=2019-08-11T16:49:16.853-07:00[America/Los_Angeles] value=task1
key=2019-08-11T16:49:17.852-07:00[America/Los_Angeles] value=task2
key=2019-08-11T16:49:18.853-07:00[America/Los_Angeles] value=task1
key=2019-08-11T16:49:19.852-07:00[America/Los_Angeles] value=task2
key=2019-08-11T16:49:20.853-07:00[America/Los_Angeles] value=task1
key=2019-08-11T16:49:21.852-07:00[America/Los_Angeles] value=task2
key=2019-08-11T16:49:22.853-07:00[America/Los_Angeles] value=task1
key=2019-08-11T16:49:23.852-07:00[America/Los_Angeles] value=task2
key=2019-08-11T16:49:24.853-07:00[America/Los_Angeles] value=task1
key=2019-08-11T16:49:25.852-07:00[America/Los_Angeles] value=task2
key=2019-08-11T16:49:26.853-07:00[America/Los_Angeles] value=task1
key=2019-08-11T16:49:27.852-07:00[America/Los_Angeles] value=task2
key=2019-08-11T16:49:28.853-07:00[America/Los_Angeles] value=task1
key=2019-08-11T16:49:29.852-07:00[America/Los_Angeles] value=task2
key=2019-08-11T16:49:30.853-07:00[America/Los_Angeles] value=task1
key=2019-08-11T16:49:31.852-07:00[America/Los_Angeles] value=task2
key=2019-08-11T16:49:32.853-07:00[America/Los_Angeles] value=task1
key=2019-08-11T16:49:33.852-07:00[America/Los_Angeles] value=task2
key=2019-08-11T16:49:34.853-07:00[America/Los_Angeles] value=task1
key=2019-08-11T16:49:35.852-07:00[America/Los_Angeles] value=task2
key=2019-08-11T16:49:36.853-07:00[America/Los_Angeles] value=task1
key=2019-08-11T16:49:37.852-07:00[America/Los_Angeles] value=task2
key=2019-08-11T16:49:38.853-07:00[America/Los_Angeles] value=task1
key=2019-08-11T16:49:39.852-07:00[America/Los_Angeles] value=task2
key=2019-08-11T16:49:40.853-07:00[America/Los_Angeles] value=task1
key=2019-08-11T16:49:41.851-07:00[America/Los_Angeles] value=task2
key=2019-08-11T16:49:42.852-07:00[America/Los_Angeles] value=task1
key=2019-08-11T16:49:43.851-07:00[America/Los_Angeles] value=task2
key=2019-08-11T16:49:44.852-07:00[America/Los_Angeles] value=task1
key=2019-08-11T16:49:45.851-07:00[America/Los_Angeles] value=task2
key=2019-08-11T16:49:46.852-07:00[America/Los_Angeles] value=task1
key=2019-08-11T16:49:47.851-07:00[America/Los_Angeles] value=task2
key=2019-08-11T16:49:48.852-07:00[America/Los_Angeles] value=task1
key=2019-08-11T16:49:49.851-07:00[America/Los_Angeles] value=task2
key=2019-08-11T16:49:50.852-07:00[America/Los_Angeles] value=task1
key=2019-08-11T16:49:51.851-07:00[America/Los_Angeles] value=task2
key=2019-08-11T16:49:52.852-07:00[America/Los_Angeles] value=task1
key=2019-08-11T16:49:53.851-07:00[America/Los_Angeles] value=task2
key=2019-08-11T16:49:54.852-07:00[America/Los_Angeles] value=task1
key=2019-08-11T16:49:55.851-07:00[America/Los_Angeles] value=task2
key=2019-08-11T16:49:56.852-07:00[America/Los_Angeles] value=task1
key=2019-08-11T16:49:57.851-07:00[America/Los_Angeles] value=task2
key=2019-08-11T16:49:58.852-07:00[America/Los_Angeles] value=task1
key=2019-08-11T16:49:59.851-07:00[America/Los_Angeles] value=task2
key=2019-08-11T16:50:00.851-07:00[America/Los_Angeles] value=task1
key=2019-08-11T16:50:01.851-07:00[America/Los_Angeles] value=task2
key=2019-08-11T16:50:02.851-07:00[America/Los_Angeles] value=task1
key=2019-08-11T16:50:03.851-07:00[America/Los_Angeles] value=task2
key=2019-08-11T16:50:04.851-07:00[America/Los_Angeles] value=task1
key=2019-08-11T16:50:05.851-07:00[America/Los_Angeles] value=task2
key=2019-08-11T16:50:06.851-07:00[America/Los_Angeles] value=task1
key=2019-08-11T16:50:07.850-07:00[America/Los_Angeles] value=task2
key=2019-08-11T16:50:08.851-07:00[America/Los_Angeles] value=task1
key=2019-08-11T16:50:09.850-07:00[America/Los_Angeles] value=task2
key=2019-08-11T16:50:10.851-07:00[America/Los_Angeles] value=task1
key=2019-08-11T16:50:11.850-07:00[America/Los_Angeles] value=task2
key=2019-08-11T16:50:12.851-07:00[America/Los_Angeles] value=task1
key=2019-08-11T16:50:13.850-07:00[America/Los_Angeles] value=task2
key=2019-08-11T16:50:14.851-07:00[America/Los_Angeles] value=task1
key=2019-08-11T16:50:15.850-07:00[America/Los_Angeles] value=task2
key=2019-08-11T16:50:16.851-07:00[America/Los_Angeles] value=task1
key=2019-08-11T16:50:17.850-07:00[America/Los_Angeles] value=task2
key=2019-08-11T16:50:18.851-07:00[America/Los_Angeles] value=task1
key=2019-08-11T16:50:19.850-07:00[America/Los_Angeles] value=task2
key=2019-08-11T16:50:20.851-07:00[America/Los_Angeles] value=task1
key=2019-08-11T16:50:21.850-07:00[America/Los_Angeles] value=task2
key=2019-08-11T16:50:22.850-07:00[America/Los_Angeles] value=task1
key=2019-08-11T16:50:23.850-07:00[America/Los_Angeles] value=task2
key=2019-08-11T16:50:24.850-07:00[America/Los_Angeles] value=task1
key=2019-08-11T16:50:25.850-07:00[America/Los_Angeles] value=task2
key=2019-08-11T16:50:26.850-07:00[America/Los_Angeles] value=task1
key=2019-08-11T16:50:27.850-07:00[America/Los_Angeles] value=task2
key=2019-08-11T16:50:28.850-07:00[America/Los_Angeles] value=task1
key=2019-08-11T16:50:29.850-07:00[America/Los_Angeles] value=task2
key=2019-08-11T16:50:30.850-07:00[America/Los_Angeles] value=task1
key=2019-08-11T16:50:31.850-07:00[America/Los_Angeles] value=task2
key=2019-08-11T16:50:32.850-07:00[America/Los_Angeles] value=task1
key=2019-08-11T16:50:33.850-07:00[America/Los_Angeles] value=task2
key=2019-08-11T16:50:34.850-07:00[America/Los_Angeles] value=task1
key=2019-08-11T16:50:35.850-07:00[America/Los_Angeles] value=task2
key=2019-08-11T16:50:36.850-07:00[America/Los_Angeles] value=task1
key=2019-08-11T16:50:37.850-07:00[America/Los_Angeles] value=task2
key=2019-08-11T16:50:38.850-07:00[America/Los_Angeles] value=task1
key=2019-08-11T16:50:39.850-07:00[America/Los_Angeles] value=task2
key=2019-08-11T16:50:40.850-07:00[America/Los_Angeles] value=task1
key=2019-08-11T16:50:41.850-07:00[America/Los_Angeles] value=task2
key=2019-08-11T16:50:42.850-07:00[America/Los_Angeles] value=task1
key=2019-08-11T16:50:43.850-07:00[America/Los_Angeles] value=task2
key=2019-08-11T16:50:44.850-07:00[America/Los_Angeles] value=task1
key=2019-08-11T16:50:45.849-07:00[America/Los_Angeles] value=task2
key=2019-08-11T16:50:46.849-07:00[America/Los_Angeles] value=task1
key=2019-08-11T16:50:47.849-07:00[America/Los_Angeles] value=task2
key=2019-08-11T16:50:48.849-07:00[America/Los_Angeles] value=task1
key=2019-08-11T16:50:49.844-07:00[America/Los_Angeles] value=task2
key=2019-08-11T16:50:50.844-07:00[America/Los_Angeles] value=task1
Latest one minute events:
key=2019-08-11T16:49:52.852-07:00[America/Los_Angeles] value=task1
key=2019-08-11T16:49:53.851-07:00[America/Los_Angeles] value=task2
key=2019-08-11T16:49:54.852-07:00[America/Los_Angeles] value=task1
key=2019-08-11T16:49:55.851-07:00[America/Los_Angeles] value=task2
key=2019-08-11T16:49:56.852-07:00[America/Los_Angeles] value=task1
key=2019-08-11T16:49:57.851-07:00[America/Los_Angeles] value=task2
key=2019-08-11T16:49:58.852-07:00[America/Los_Angeles] value=task1
key=2019-08-11T16:49:59.851-07:00[America/Los_Angeles] value=task2
key=2019-08-11T16:50:00.851-07:00[America/Los_Angeles] value=task1
key=2019-08-11T16:50:01.851-07:00[America/Los_Angeles] value=task2
key=2019-08-11T16:50:02.851-07:00[America/Los_Angeles] value=task1
key=2019-08-11T16:50:03.851-07:00[America/Los_Angeles] value=task2
key=2019-08-11T16:50:04.851-07:00[America/Los_Angeles] value=task1
key=2019-08-11T16:50:05.851-07:00[America/Los_Angeles] value=task2
key=2019-08-11T16:50:06.851-07:00[America/Los_Angeles] value=task1
key=2019-08-11T16:50:07.850-07:00[America/Los_Angeles] value=task2
key=2019-08-11T16:50:08.851-07:00[America/Los_Angeles] value=task1
key=2019-08-11T16:50:09.850-07:00[America/Los_Angeles] value=task2
key=2019-08-11T16:50:10.851-07:00[America/Los_Angeles] value=task1
key=2019-08-11T16:50:11.850-07:00[America/Los_Angeles] value=task2
key=2019-08-11T16:50:12.851-07:00[America/Los_Angeles] value=task1
key=2019-08-11T16:50:13.850-07:00[America/Los_Angeles] value=task2
key=2019-08-11T16:50:14.851-07:00[America/Los_Angeles] value=task1
key=2019-08-11T16:50:15.850-07:00[America/Los_Angeles] value=task2
key=2019-08-11T16:50:16.851-07:00[America/Los_Angeles] value=task1
key=2019-08-11T16:50:17.850-07:00[America/Los_Angeles] value=task2
key=2019-08-11T16:50:18.851-07:00[America/Los_Angeles] value=task1
key=2019-08-11T16:50:19.850-07:00[America/Los_Angeles] value=task2
key=2019-08-11T16:50:20.851-07:00[America/Los_Angeles] value=task1
key=2019-08-11T16:50:21.850-07:00[America/Los_Angeles] value=task2
key=2019-08-11T16:50:22.850-07:00[America/Los_Angeles] value=task1
key=2019-08-11T16:50:23.850-07:00[America/Los_Angeles] value=task2
key=2019-08-11T16:50:24.850-07:00[America/Los_Angeles] value=task1
key=2019-08-11T16:50:25.850-07:00[America/Los_Angeles] value=task2
key=2019-08-11T16:50:26.850-07:00[America/Los_Angeles] value=task1
key=2019-08-11T16:50:27.850-07:00[America/Los_Angeles] value=task2
key=2019-08-11T16:50:28.850-07:00[America/Los_Angeles] value=task1
key=2019-08-11T16:50:29.850-07:00[America/Los_Angeles] value=task2
key=2019-08-11T16:50:30.850-07:00[America/Los_Angeles] value=task1
key=2019-08-11T16:50:31.850-07:00[America/Los_Angeles] value=task2
key=2019-08-11T16:50:32.850-07:00[America/Los_Angeles] value=task1
key=2019-08-11T16:50:33.850-07:00[America/Los_Angeles] value=task2
key=2019-08-11T16:50:34.850-07:00[America/Los_Angeles] value=task1
key=2019-08-11T16:50:35.850-07:00[America/Los_Angeles] value=task2
key=2019-08-11T16:50:36.850-07:00[America/Los_Angeles] value=task1
key=2019-08-11T16:50:37.850-07:00[America/Los_Angeles] value=task2
key=2019-08-11T16:50:38.850-07:00[America/Los_Angeles] value=task1
key=2019-08-11T16:50:39.850-07:00[America/Los_Angeles] value=task2
key=2019-08-11T16:50:40.850-07:00[America/Los_Angeles] value=task1
key=2019-08-11T16:50:41.850-07:00[America/Los_Angeles] value=task2
key=2019-08-11T16:50:42.850-07:00[America/Los_Angeles] value=task1
key=2019-08-11T16:50:43.850-07:00[America/Los_Angeles] value=task2
key=2019-08-11T16:50:44.850-07:00[America/Los_Angeles] value=task1
key=2019-08-11T16:50:45.849-07:00[America/Los_Angeles] value=task2
key=2019-08-11T16:50:46.849-07:00[America/Los_Angeles] value=task1
key=2019-08-11T16:50:47.849-07:00[America/Los_Angeles] value=task2
key=2019-08-11T16:50:48.849-07:00[America/Los_Angeles] value=task1
key=2019-08-11T16:50:49.844-07:00[America/Los_Angeles] value=task2
key=2019-08-11T16:50:50.844-07:00[America/Los_Angeles] value=task1
Count=59
First one minute events:
key=2019-08-11T16:49:11.852-07:00[America/Los_Angeles] value=task2
key=2019-08-11T16:49:12.853-07:00[America/Los_Angeles] value=task1
key=2019-08-11T16:49:13.852-07:00[America/Los_Angeles] value=task2
key=2019-08-11T16:49:14.853-07:00[America/Los_Angeles] value=task1
key=2019-08-11T16:49:15.852-07:00[America/Los_Angeles] value=task2
key=2019-08-11T16:49:16.853-07:00[America/Los_Angeles] value=task1
key=2019-08-11T16:49:17.852-07:00[America/Los_Angeles] value=task2
key=2019-08-11T16:49:18.853-07:00[America/Los_Angeles] value=task1
key=2019-08-11T16:49:19.852-07:00[America/Los_Angeles] value=task2
key=2019-08-11T16:49:20.853-07:00[America/Los_Angeles] value=task1
key=2019-08-11T16:49:21.852-07:00[America/Los_Angeles] value=task2
key=2019-08-11T16:49:22.853-07:00[America/Los_Angeles] value=task1
key=2019-08-11T16:49:23.852-07:00[America/Los_Angeles] value=task2
key=2019-08-11T16:49:24.853-07:00[America/Los_Angeles] value=task1
key=2019-08-11T16:49:25.852-07:00[America/Los_Angeles] value=task2
key=2019-08-11T16:49:26.853-07:00[America/Los_Angeles] value=task1
key=2019-08-11T16:49:27.852-07:00[America/Los_Angeles] value=task2
key=2019-08-11T16:49:28.853-07:00[America/Los_Angeles] value=task1
key=2019-08-11T16:49:29.852-07:00[America/Los_Angeles] value=task2
key=2019-08-11T16:49:30.853-07:00[America/Los_Angeles] value=task1
key=2019-08-11T16:49:31.852-07:00[America/Los_Angeles] value=task2
key=2019-08-11T16:49:32.853-07:00[America/Los_Angeles] value=task1
key=2019-08-11T16:49:33.852-07:00[America/Los_Angeles] value=task2
key=2019-08-11T16:49:34.853-07:00[America/Los_Angeles] value=task1
key=2019-08-11T16:49:35.852-07:00[America/Los_Angeles] value=task2
key=2019-08-11T16:49:36.853-07:00[America/Los_Angeles] value=task1
key=2019-08-11T16:49:37.852-07:00[America/Los_Angeles] value=task2
key=2019-08-11T16:49:38.853-07:00[America/Los_Angeles] value=task1
key=2019-08-11T16:49:39.852-07:00[America/Los_Angeles] value=task2
key=2019-08-11T16:49:40.853-07:00[America/Los_Angeles] value=task1
key=2019-08-11T16:49:41.851-07:00[America/Los_Angeles] value=task2
key=2019-08-11T16:49:42.852-07:00[America/Los_Angeles] value=task1
key=2019-08-11T16:49:43.851-07:00[America/Los_Angeles] value=task2
key=2019-08-11T16:49:44.852-07:00[America/Los_Angeles] value=task1
key=2019-08-11T16:49:45.851-07:00[America/Los_Angeles] value=task2
key=2019-08-11T16:49:46.852-07:00[America/Los_Angeles] value=task1
key=2019-08-11T16:49:47.851-07:00[America/Los_Angeles] value=task2
key=2019-08-11T16:49:48.852-07:00[America/Los_Angeles] value=task1
key=2019-08-11T16:49:49.851-07:00[America/Los_Angeles] value=task2
key=2019-08-11T16:49:50.852-07:00[America/Los_Angeles] value=task1
key=2019-08-11T16:49:51.851-07:00[America/Los_Angeles] value=task2
Count=41
```

## 3. Source Files
* [Source files for Java ConcurrentSkipListMap on GitHub](https://github.com/jojozhuang/java-programming/tree/master/java-concurrency-concurrentskiplistmap)

## 4. References
* [Guide to the ConcurrentSkipListMap](https://www.baeldung.com/java-concurrent-skip-list-map)
