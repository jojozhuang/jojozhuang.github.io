---
layout: post
key: blog
title: "Basic Knowledge of Linux"
date: 2016-08-26
tags: Shell, Bash, scp
---

> This blog records some base knowledge of linux and tools.

## 1. Most common commands in vi.
* [http://commandlinemac.blogspot.com/2008/12/vim.html](http://commandlinemac.blogspot.com/2008/12/vim.html)  

## 2. Bash Guide for Beginners.
* [http://www.tldp.org/LDP/Bash-Beginners-Guide/html/Bash-Beginners-Guide.html](http://www.tldp.org/LDP/Bash-Beginners-Guide/html/Bash-Beginners-Guide.html)  

## 3. GNU Make.
* [https://www.gnu.org/software/make/](https://www.gnu.org/software/make/)

## 4. How to set my default shell on Mac?
* [http://stackoverflow.com/questions/453236/how-to-set-my-default-shell-on-mac](http://stackoverflow.com/questions/453236/how-to-set-my-default-shell-on-mac)

## 5. .bash_profile vs .bashrc
* [http://www.joshstaiger.org/archives/2005/07/bash_profile_vs.html](http://www.joshstaiger.org/archives/2005/07/bash_profile_vs.html)

## 6. useful commands
```sh
which -a ls  // list where the command locates
             // output: /bin/ls

su -a tony   // switch to another 'tony'

sudo chown -R $USER /ariba/ssp_sp/  // grant all access rights to current user.

scp username@ip:~/Work/AppInfo.xml ~ // copy file from remote server(ip) with user(username) to local home directory(~).

ls | grep hosts // Find file with name=hosts
```
