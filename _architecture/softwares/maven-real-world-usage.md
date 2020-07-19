---
layout: tutorial
key: architecture
title: "Maven - Real World Usage"
index: 3214
subcategory: softwares
date: 2018-08-10
tags: [Maven]
---

> Maven Usage.

## 1. Common Usagge
### 1.1 Configure and Manage a multi-module project
Parent pom.xml.
```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>johnny.java</groupId>
    <artifactId>java-programming</artifactId>
    <version>1.0-SNAPSHOT</version>
    <modules>
        <module>java-advanced-classnotfound</module>
        <module>java-advanced-shallowcopy</module>
    </modules>
    <packaging>pom</packaging>
    <dependencies>
        <dependency>
            <groupId>org.junit.jupiter</groupId>
            <artifactId>junit-jupiter-api</artifactId>
            <version>5.2.0</version>
            <scope>test</scope>
        </dependency>
    </dependencies>
    <build>
        <pluginManagement>
            <plugins>
                <plugin>
                    <groupId>org.apache.maven.plugins</groupId>
                    <artifactId>maven-compiler-plugin</artifactId>
                    <configuration>
                        <source>1.8</source>
                        <target>1.8</target>
                    </configuration>
                </plugin>
            </plugins>
        </pluginManagement>
    </build>
</project>
```
Child pom.xml.
```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>java-programming</artifactId>
        <groupId>johnny.java</groupId>
        <version>1.0-SNAPSHOT</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <artifactId>java-core-basic</artifactId>
</project>
```
See [Configure a multi-module Maven project﻿](https://www.jetbrains.com/help/idea/maven-support.html#maven_multi_module) for more details.

### 1.2 Convert to Maven project
* 1) Open an existing project, for example, a Java project.
* 2) In the Project tool window, right-click your project and select Add Framework Support.

See [Convert a regular project into a Maven project](https://www.jetbrains.com/help/idea/convert-a-regular-project-into-a-maven-project.html).

### 1.3 Generate Java Doc
1) Add javadoc plugin
```xml
<build>
    <pluginManagement>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-javadoc-plugin</artifactId>
                <version>3.1.1</version>
            </plugin>
        </plugins>
    </pluginManagement>
</build>
```
2) Run "mvn javadoc:javadoc".  
3) Open java doc in browser.
```raw
project_location/target/site/apidocs/index.html
```

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
