---
layout: tutorial
key: programming
title: "Java Concurrency - Reading Files in Parallel"
index: 2417
subcategory: java-concurrency
date: 2017-04-05
tags: [Read File]
---

> Different implementations to read files in parallel.

## 1. Introduction
Use different approaches to read files in parallel, and combine the results.

## 2. Naive with Runnable
RunnableTask.
```java
public class RunnableTask implements Runnable {
    private String filename;
    private String content;

    public RunnableTask(String filename) {
        this.filename = filename;
        this.content = "";
        System.out.println("Create Task to get content from " + filename);
    }

    public String getFileName() {
        return filename;
    }

    public void run() {
        try {
            String currentDir = System.getProperty("user.dir");
            Path path = Paths.get(currentDir, "java-concurrency-readfiles", "files", filename);
            File file = path.toFile();

            BufferedReader br = new BufferedReader(new FileReader(file));

            String line;
            while ((line = br.readLine()) != null) {
                content += line;
            }

        } catch (FileNotFoundException e1) {
            e1.printStackTrace();
        } catch (IOException e1) {
            e1.printStackTrace();
        }
    }

    public String getContent() { return content; }
}
```
Test class.
```java
public class RunnableExample {
    public static void main(String[] args) {
        // create tasks
        List<RunnableTask> tasks = new ArrayList<>();
        List<Thread> threads = new ArrayList<>();
        for (int i = 0; i < 5; i++) {
            RunnableTask task = new RunnableTask("test" + (i + 1) + ".txt");
            Thread t = new Thread(task);
            t.start();
            tasks.add(task);
            threads.add(t);
        }

        // wait for threads to finish
        try {
            for (int i = 0; i < 5; i++) {
                threads.get(i).join();
            }
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        // collect results
        String content = "";
        for (int i = 0; i< 5; i++) {
            content += tasks.get(i).getContent() + System.lineSeparator();
        }

        System.out.println("Result:");
        System.out.println(content);
    }
}
```
Output.
```raw
Create Task to get content from test1.txt
Create Task to get content from test2.txt
Create Task to get content from test3.txt
Create Task to get content from test4.txt
Create Task to get content from test5.txt
Result:
Hello world!
You're awesome!
Too young, too simple!
Have a nice day!
Look forward to talking with you.
```
## 3. Callable + Future
CallableTask.
```java
public class CallableTask implements Callable<String> {
    private String filename;

    public CallableTask(String filename) {
        this.filename = filename;
        System.out.println("Create Callable task to get content from " + filename);
    }

    public String getFileName() {
        return filename;
    }

    public String call() {
        String content = "";
        try {
            String currentDir = System.getProperty("user.dir");
            Path path = Paths.get(currentDir, "java-concurrency-readfiles", "files", filename);
            File file = path.toFile();

            BufferedReader br = new BufferedReader(new FileReader(file));

            String line;
            while ((line = br.readLine()) != null) {
                content += line;
            }

        } catch (FileNotFoundException e1) {
            e1.printStackTrace();
        } catch (IOException e1) {
            e1.printStackTrace();
        } finally {
            return content;
        }
    }
}
```
Test class.
```java
public class CallableExample {
    public static void main(String[] args) throws Exception {
        // create tasks
        List<Callable<String>> tasks = new ArrayList<>();
        for (int i = 0; i < 5; i++) {
            tasks.add(new CallableTask("test" + (i + 1) + ".txt"));
        }

        // create threads for each task
        ExecutorService exec = Executors.newFixedThreadPool(2);
        List<Future<String>> results = exec.invokeAll(tasks);
        exec.shutdown();

        // collect results
        System.out.println("Result:");
        String content = "";
        try {
            for (Future<String> future : results) {
                content += future.get() + System.lineSeparator();
            }
        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (ExecutionException e) {
            e.printStackTrace();
        }
        System.out.println(content);
    }

    public static void main2(String[] args) {
        List<Future<String>> list = new ArrayList<Future<String>>();

        // create threads for each task
        ThreadPoolExecutor executor = (ThreadPoolExecutor) Executors.newFixedThreadPool(2);

        for (int i = 1; i <= 5; i++) {
            CallableTask task = new CallableTask("test" + i + ".txt");

            Future<String> future = executor.submit(task);
            list.add(future);
        }
        executor.shutdown();

        // collect results
        System.out.println("Result:");
        String content = "";
        try {
            for (Future<String> future : list) {
                content += future.get() + System.lineSeparator();
            }
        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (ExecutionException e) {
            e.printStackTrace();
        }
        System.out.println(content);
    }
}
```
Output.
```raw
Create Callable task to get content from test1.txt
Create Callable task to get content from test2.txt
Create Callable task to get content from test3.txt
Create Callable task to get content from test4.txt
Create Callable task to get content from test5.txt
Result:
Hello world!
You're awesome!
Too young, too simple!
Have a nice day!
Look forward to talking with you.
```
## 4. CyclicBarrier
CyclicBarrierTask.
```java
public class CyclicBarrierTask implements Runnable {
    private String filename;
    private String content;
    private final CyclicBarrier cyclicBarrier;

    public CyclicBarrierTask(String filename, CyclicBarrier cyclicBarrier) {
        this.filename = filename;
        this.content = "";
        this.cyclicBarrier = cyclicBarrier;
        System.out.println("Create Task to get content from " + filename);
    }

    public void run() {
        try {
            String currentDir = System.getProperty("user.dir");
            Path path = Paths.get(currentDir, "java-concurrency-readfiles", "files", filename);
            File file = path.toFile();

            BufferedReader br = new BufferedReader(new FileReader(file));

            String line;
            while ((line = br.readLine()) != null) {
                content += line;
            }
            cyclicBarrier.await();
        } catch (FileNotFoundException nfe) {
            nfe.printStackTrace();
        } catch (IOException ioe) {
            ioe.printStackTrace();
        } catch (InterruptedException | BrokenBarrierException e) {
            e.printStackTrace();
        }
    }

    public String getContent() { return content; }
}
```
Test class.
```java
public class CyclicBarrierExample {
    public static void main(String[] args) {
        CyclicBarrier barrier = new CyclicBarrier(6);
        System.out.println("Number of parties required to trip the barrier = " +
                barrier.getParties());

        // create tasks
        List<CyclicBarrierTask> tasks = new ArrayList<>();
        for (int i = 0; i < 5; i++) {
            CyclicBarrierTask task = new CyclicBarrierTask("test" + (i + 1) + ".txt", barrier);
            Thread t = new Thread(task);
            t.start();
            tasks.add(task);
        }

        try {
            barrier.await();
        }
        catch (InterruptedException | BrokenBarrierException e) {
            e.printStackTrace();
        }

        // number of parties waiting at the barrier
        System.out.println("Number of parties waiting at the barrier "+
                "at this point = " + barrier.getNumberWaiting());
        // barrier breaks as the number of thread waiting for the barrier at this point = 0

        // collect results
        String content = "";
        for (int i = 0; i< 5; i++) {
            content += tasks.get(i).getContent() + System.lineSeparator();
        }

        System.out.println("Result:");
        System.out.println(content);
    }
}
```
Output.
```raw
Number of parties required to trip the barrier = 6
Create Task to get content from test1.txt
Create Task to get content from test2.txt
Create Task to get content from test3.txt
Create Task to get content from test4.txt
Create Task to get content from test5.txt
Number of parties waiting at the barrier at this point = 0
Result:
Hello world!
You're awesome!
Too young, too simple!
Have a nice day!
Look forward to talking with you.
```
## 5. CountDownLatch
CountDownLatchTask.
```java
public class CountDownLatchTask extends Thread {
    private String filename;
    private String content;
    private CountDownLatch latch;

    public CountDownLatchTask(String filename, CountDownLatch latch) {
        this.filename = filename;
        this.content = "";
        this.latch = latch;
        System.out.println("Create Task to get content from " + filename);
    }

    @Override
    public void run() {
        try {
            String currentDir = System.getProperty("user.dir");
            Path path = Paths.get(currentDir, "java-concurrency-readfiles", "files", filename);
            File file = path.toFile();

            BufferedReader br = new BufferedReader(new FileReader(file));

            String line;
            while ((line = br.readLine()) != null) {
                content += line;
            }
            latch.countDown();

        } catch (FileNotFoundException nfe) {
            nfe.printStackTrace();
        } catch (IOException ioe) {
            ioe.printStackTrace();
        }
    }

    public String getContent() { return content; }
}
```
Test class.
```java
public class CountDownLatchExample {
    public static void main(String args[]) throws InterruptedException {
        // Create task that is going to wait for five threads before it starts
        CountDownLatch latch = new CountDownLatch(5);

        // create tasks
        List<CountDownLatchTask> tasks = new ArrayList<>();
        for (int i = 0; i < 5; i++) {
            CountDownLatchTask task = new CountDownLatchTask("test" + (i + 1) + ".txt", latch);
            Thread t = new Thread(task);
            t.start();
            tasks.add(task);
        }

        // The main task waits for four threads
        latch.await();

        // collect results
        String content = "";
        for (int i = 0; i< 5; i++) {
            content += tasks.get(i).getContent() + System.lineSeparator();
        }

        System.out.println("Result:");
        System.out.println(content);
    }
}
```
Output.
```raw
Create Task to get content from test1.txt
Create Task to get content from test2.txt
Create Task to get content from test3.txt
Create Task to get content from test4.txt
Create Task to get content from test5.txt
Result:
Hello world!
You're awesome!
Too young, too simple!
Have a nice day!
Look forward to talking with you.
```

## 6. Source Files
* [Source files for Reading Files in Parallel on GitHub](https://github.com/jojozhuang/java-programming/tree/master/java-concurrency-readfiles)

## 7. References
* [Java Thread Pool – ThreadPoolExecutor Example](https://howtodoinjava.com/java/multi-threading/java-thread-pool-executor-example/)
* [Multithreading a massive file read](https://stackoverflow.com/questions/10624899/multithreading-a-massive-file-read)
* [Java Callable Future Example](https://www.journaldev.com/1090/java-callable-future-example)
* [Different ways of Reading a text file in Java](https://www.geeksforgeeks.org/different-ways-reading-text-file-java/)
