---
layout: note
key: note
title: "Frequently Used Commands"
index: 121
category: basis
image: cs.png
date: 2016-01-21
postdate: 2016-01-21
tags: [Linux, MacOS]
---

> Some frequently used commands in linux.

### 1. Start Local Jekyll
```sh
cd Johnny/GitHub/jojozhuang.github.io/
bundle exec jekyll serve --port 12001
```
### 2. Search Files by Name
```sh
find . -name 'filename' -R
```
* `.` - path, the current directory
* `R` - recursive

### 3. Search Files Containing Specific Text
```sh
grep -Ril "text-to-find-here" /
```
* `i` - ignore case (optional in your case).
* `R` - recursive.
* `l` - show the file name, not the result itself.
* `/` - starting at the root of your machine.

### 4. Open Finder of Current Directory from Command Line in MacOS
```sh
open .
```
### 5. Open File Manager of Current Directory from Command Line in Redhat
```sh
nautilus .
```
### 6. Sync Changelist in P4
```sh
p4 sync ...@1234567
```

https://codeyarns.com/2018/02/02/perforce-cheatsheet/

### 7. Copy Files from Remote Machine
```sh
scp -r user@your.server.example.com:/path/to/foo /home/user/Desktop/
```
* `r` - Recursively copy entire directories.

### 8. Change Owner of Entire Directory to Current User
```sh
sudo chown $USER /ariba/ssp_git/ -R
```
* `r` - Recursively change the owner for sub directories.
