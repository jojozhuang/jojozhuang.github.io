---
layout: post
key: blog
title: "Check Which JDK Eclipse is Using(Draft)"
date: 2018-05-12
tags: [JDK, Eclipse]
---

> How to check which JDK Eclipse is using.

To check with what Java version (JRE or JDK) Eclipse is running, do the following:

Open the menu item Help > About Eclipse. (On the Mac, it’s in the Eclipse-menu, not the Help-menu)
Click on Installation Details.
Switch to the tab Configuration
Search for a line that starts with -vm. The line following it shows which Java binary is used.


## 5. References
* [Run Eclipse with a JDK](https://matsim.org/docs/devguide/eclipse/jdk)
