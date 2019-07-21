---
layout: tutorial
key: note
title: "Frequently Used Commands"
index: 9001
subcategory: my-space
date: 2016-01-21
tags: [Linux, macOS]
---

> Some frequently used commands in linux.

### 1. Start Local Jekyll
```sh
cd Johnny/GitHub/jojozhuang.github.io/
bundle exec jekyll serve --port 12001
```
### 2. Search Files/Directories
Search Files by Name
```sh
find . -name 'filename' -R
```
* `.` - path, the current directory
* `R` - recursive

Search Directories end with '-T'.
```sh
find . -name "*-T" -type d
```
Search Directories end with '-T' and delete them.
```sh
find . -name "*-T" -type d -exec rm -rf {} \;
```
### 3. Search Files Containing Specific Text
```sh
grep -Ril "text-to-find-here" /
```
* `i` - ignore case (optional in your case).
* `R` - recursive.
* `l` - show the file name, not the result itself.
* `/` - starting at the root of your machine.

### 4. Open Finder of Current Directory from Command Line in macOS
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
