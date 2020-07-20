---
layout: tutorial
key: programming
title: "Checking Which JDK Eclipse is Using"
index: 2511
subcategory: java-app
date: 2018-05-12
tags: [JDK, Eclipse]
---

> How to check which JDK Eclipse is using.

## 1. JDK & Eclipse
For some reasons, we may install multiple versions of [JDK](http://www.oracle.com/technetwork/java/javase/downloads/index.html) on the same development machine. In this case, we may want to know which JDK version is used by [Eclipse](https://www.eclipse.org/ide/).

## 2. Checking Version
To check with what Java version (JRE or JDK) Eclipse is running, do the following:
* Open the menu item `Help > About Eclipse`. (On the Mac, it’s in the Eclipse-menu, not the Help-menu)
* Click on `Installation Details`.
* Switch to the `Configuration` tab.
* Search for a line that starts with `-vm`. The line following it shows which Java binary is used.

```raw
-vm
/Library/Java/JavaVirtualMachines/jdk1.8.0_131.jdk/Contents/Home/bin/../jre/lib/server/libjvm.dylib
```

![image](/assets/images/programming/2511/jdkversion.png){:width="650px"}

## 3. References
* [Run Eclipse with a JDK](https://matsim.org/docs/devguide/eclipse/jdk)
