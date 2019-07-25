---
layout: post
key: blog
title: "Git Commands"
date: 2019-01-17
subcategory: blog
tags: [Git]
---

> Common Git Commands

## 1. Git Configuration
List all git settings.
```sh
git config --list
```
Change configuration. For example, change the remote url.
```sh
git config remote.origin.url "https://github.com/jojozhuang"
```
## 2. Branch
Check current branch
```sh
git branch --list
```
Switch Branch
```sh
git checkout [name_of_branch]
```
Create new Branch
```sh
$ git checkout -b [name_of_your_new_branch]
$ git branch [name_of_your_new_branch]
```
Delete Branch
```sh
$ git branch -d <branchname>
```

## 3. Status
Check all change status
```sh
git status
```
Check log
```sh
git log
```

## 4. Files
Add file
```sh
git add [path_of_file]
```
Remove file
```sh
git checkout [path_of_file]
```

## 5. Submit change
Commit change
```sh
git commit -m "message of the commit"
```
Push to remote
```sh
git push
```

## 6. References
* [Basic Git commands](https://confluence.atlassian.com/bitbucketserver/basic-git-commands-776639767.html)
