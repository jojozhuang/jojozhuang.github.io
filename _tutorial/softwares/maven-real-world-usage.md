---
layout: tutorial
key: tutorial
title: "Maven - Real World Usage - Draft"
index: 3714
subcategory: softwares
date: 2018-08-10
tags: [Maven]
draft: true
---

> Maven Tutorial

## 1. Maven
* Scenario
* Configuration Steps
* Launch and Test

### 1. Configure and Manage a multi-module project
https://www.jetbrains.com/help/idea/maven-support.html#

## 2. Issues
### 2.1 Can't Download Plugin From Remote Repository
Error: "Failed to read artifact descriptor ...".
```sh
[INFO] ------------------------------------------------------------------------
[INFO] Reactor Summary:
[INFO]
[INFO] learning-maven 1.0.0-SNAPSHOT ...................... SUCCESS [  0.182 s]
[INFO] learning-maven-presidents 1.0.0-SNAPSHOT ........... FAILURE [  7.765 s]
[INFO] ------------------------------------------------------------------------
[INFO] BUILD FAILURE
[INFO] ------------------------------------------------------------------------
[INFO] Total time: 8.032 s
[INFO] Finished at: 2019-12-29T23:08:00-08:00
[INFO] ------------------------------------------------------------------------
[ERROR] Plugin org.apache.maven.plugins:maven-compiler-plugin:3.8.0 or one of its dependencies could not be resolved: Failed to read artifact descriptor for org.apache.maven.plugins:maven-compiler-plugin:jar:3.8.0: Could not transfer artifact org.apache.maven.plugins:maven-compiler-plugin:pom:3.8.0 from/to repoaws (https://repo.aws.ariba.com/libs-release-local): repo.aws.ariba.com: unknown error: Unknown host repo.aws.ariba.com: unknown error -> [Help 1]
[ERROR]
[ERROR] To see the full stack trace of the errors, re-run Maven with the -e switch.
[ERROR] Re-run Maven using the -X switch to enable full debug logging.
[ERROR]
[ERROR] For more information about the errors and possible solutions, please read the following articles:
[ERROR] [Help 1] http://cwiki.apache.org/confluence/display/MAVEN/PluginResolutionException
````
Cause:
* Your company uses a proxy to connect to the public Maven repository.
* Your company has its/their own Maven repository.

See similar [issue](https://stackoverflow.com/questions/41589002/failed-to-read-artifact-descriptor-for-org-apache-maven-pluginsmaven-source-plu) on StackOverflow.

Solution: Add mirror into Maven user settings.xml(~/.M2/settings.xml).
```xml
<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0
                      https://maven.apache.org/xsd/settings-1.0.0.xsd">
  ...
  <mirrors>
     <mirror>
       <id>UK</id>
       <name>UK Central</name>
       <url>http://uk.maven.org/maven2</url>
       <mirrorOf>central</mirrorOf>
     </mirror>
   </mirrors>
  ...
</settings>
```
Reference: http://maven.apache.org/settings.html#Mirrors


## 9. References
