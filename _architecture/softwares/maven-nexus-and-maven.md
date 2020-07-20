---
layout: tutorial
key: architecture
title: "Maven - Nexus and Maven"
index: 3212
subcategory: softwares
date: 2018-08-10
tags: [Nexus, Maven]
---

> Nexus and Maven.

## 1. Nexus vs. Maven
[Sonatype Nexus](https://www.sonatype.com/nexus-repository-sonatype) and [Apache Maven](https://maven.apache.org/) are two pieces of software that often work together but they do very different parts of the job. Nexus provides a repository while Maven uses a repository to build software.

## 2. What is Nexus?
Nexus manages software `artifacts` required for development. If you develop software, your builds can download dependencies from Nexus and can publish artifacts to Nexus creating a new way to share artifacts within an organization. While Central repository has always served as a great convenience for developers you shouldn't be hitting it directly. You should be proxying Central with Nexus and maintaining your own repositories to ensure stability within your organization. With Nexus you can completely control access to, and deployment of, every artifact in your organization from a single location.

## 3. What is Maven?
Maven leverages the concept of a repository by retrieving the artifacts necessary to build an application and deploying the result of the build process into a repository. Maven uses the concept of structured repositories so components can be retrieved to support the build. These components or dependencies include libraries, frameworks, containers, etc. Maven can identify components in repositories, understand their dependencies, retrieve all that are needed for a successful build, and deploy its output back to repositories when the build is complete.

So, when you want to use both you will have a repository managed by Nexus and Maven will access this repository.

## 4. References
* [What is the difference between Nexus and Maven?](https://stackoverflow.com/questions/23082621/what-is-the-difference-between-nexus-and-maven)
* [Nexus Repository Manager - Tutorial](https://www.vogella.com/tutorials/Nexus/article.html)
* [Getting started with the Nexus Maven repository manager - OSS version 2](https://www.youtube.com/watch?v=pn2iwxYGkhA)
