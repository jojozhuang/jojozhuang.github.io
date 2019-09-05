---
layout: tutorial
key: tutorial
title: "Google File System - Draft"
index: 3221
subcategory: theory
date: 2018-08-15
tags: [GFS]
draft: true
---

> Paper of Google File System.

## 1. Introduction
* Running on inexpensive commodity hardware.
* Component failures are the norm rather than the exception.
* Constant monitoring, error detection, fault tolerance, and automatic recovery must be integral to the system.
* Files are huge.
* Most files are mutated by `appending` new data rather than `overwriting` existing data.

## 2. Design Overview
### 2.1 Assumptions
* The system is built from many inexpensive commodity components that often fail.
* The system stores a modest number of large files.
* The workloads primarily consist of two kinds of reads: `large streaming` reads and `small random` reads.
* The workloads also have many large, `sequential writes` that append data to files.
* The system must efficiently implement `well-defined semantics` for multiple clients that **concurrently append** to the same file.
* High sustained bandwidth is more important than low latency.

### 2.2 Interface
Usual operations: create, delete, open, close, read, and write files.
### 2.3 Architecture
![image](/public/images/devops/3221/gfs-architecture.png)
* A GFS cluster consists of a single `master` and multiple `chunkservers` and is accessed by multiple clients.
* The master maintains all file system metadata.
* The master periodically communicates with each chunkserver in `HeartBeat` messages to give it instructions and collect its state.
* Files are divided into `fixed-size` chunks.
* For reliability, each chunk is replicated three `replica`s on multiple chunkservers.
* Clients interact with the master for metadata operations, but all data-bearing communication goes directly to the chunkservers.
* Chunkservers need **not** cache file data because chunks are stored as local files and so Linux’s buffer cache already keeps frequently accessed
data in memory.

### 2.4 Single Master
Clients never read and write file data through the master. Instead, a client asks the master which chunkservers it should contact. It caches
this information, using the **file name and chunkindex** as the key, for a limited time and interacts with the chunkservers directly for many subsequent operations.
### 2.5 Chunk Size
The default chunk size is `64MB`.
### 2.6 Metadata
The master stores three major types of metadata:
* The file and chunk namespaces.
* The mapping from files to chunks.
* The locations of each chunk’s replicas.

The first two types (namespaces and file-to-chunk mapping) are also kept persistent by logging mutations to an `operation log` stored on the master’s local disk and replicated on remote machines. Using a log allows us to update the master state simply, reliably, and without risking inconsistencies in the event of a **master crash**.



## 3. Company engineering blogs
* [PDF of The Google File System](https://static.googleusercontent.com/media/research.google.com/en//archive/gfs-sosp2003.pdf)
* [GFS/MAPREDUCE/BIGTABLE中文版论文](http://blog.bizcloudsoft.com/?p=292)
