---
layout: post
key: blog
title: "Git Commands[Draft]"
date: 2019-01-17
tags: [Git]
---

> Common Git Commands

## 1. Branch
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

## 2. Status
Check all change status
```sh
git status
```
Check log
```sh
git log
```

## 3. Files
Add file
```sh
git add [path_of_file]
```
Remove file
```sh
git checkout [path_of_file]
```

## 4. Submit change
Commit change
```sh
git commit -m "message of the commit"
```
Push to remote
```sh
git push
```

## 5. References
https://confluence.atlassian.com/bitbucketserver/basic-git-commands-776639767.html
