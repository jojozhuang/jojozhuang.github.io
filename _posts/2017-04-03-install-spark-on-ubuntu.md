---
layout: post
key: blog
title: "Install Spark on Ubuntu"
date: 2017-04-03
tags: [Spark, Scala]
---

> Install Spark, Scala on Ubuntu

## 1. Install Java
Refer to [Setup Java Development Environment]({% link _posts/2016-02-10-setup-java-development-environment.md %}) to install JDK on Linux.
Check java version with the following command.
```sh
$ java -version
java version "1.8.0_144"
Java(TM) SE Runtime Environment (build 1.8.0_144-b01)
Java HotSpot(TM) 64-Bit Server VM (build 25.144-b01, mixed mode)
```

## 2. Install Scala
Go to [http://www.scala-lang.org/download/](http://www.scala-lang.org/download/), download scala-2.12.3.deb.
Navigate to the folder where the new installation file locates. Install Scala with following command.
```sh
sudo dpkg -i cala-2.12.3.deb
```
Verify Scala installation by checking Scala version.
```sh
$ scala -version
Scala code runner version 2.12.3 -- Copyright 2002-2017, LAMP/EPFL and Lightbend, Inc.
```

## 3. Install Spark
### 3.1 Download Spark
Go to [https://spark.apache.org/downloads.html](https://spark.apache.org/downloads.html), select release and package type, download  spark-2.2.0-bin-hadoop2.7.tgz.

Extract the spark tar file with the following command.
```sh
$ tar xvf spark-2.2.0-bin-hadoop2.7.tgz
```
Move spark files to `/usr/local/spark`.
```sh
$ mv spark-2.2.0-bin-hadoop2.7 /usr/local/spark
```

### 3.2 Setting up the environment for Spark
Open `~/.bashrc` file with any text editor.
```sh
$ nano ~/.bashrc
```

Add the following line to ~/.bashrc file.
```sh
export PATH = $PATH:/usr/local/spark/bin
```

Source the bash file
```sh
$ source ~/.bashrc
```

### 3.3 Verifying the Spark Installation
Launch Spark Shell with following command.
```sh
$ spark-shell
```
You will get the following output if spark is installed successfully.
![MIME Type](/public/pics/2017-04-03/sparklaunched.png)

Access [http://10.0.2.15:4040/jobs/](http://10.0.2.15:4040/jobs/) in web browser to open Spark Web UI.
![MIME Type](/public/pics/2017-04-03/sparkwebui.png)

## 4. References
* [Apache Spark - Installation](https://www.tutorialspoint.com/apache_spark/apache_spark_installation.htm)
