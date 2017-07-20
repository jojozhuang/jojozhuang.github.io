---
layout: post
key: blog
title: "Common Issues on Linux and Mac OS X"
date: 2016-08-30
categories:
- blog
---

> This blog records some common settings or issues when dealing with Bash or other shell tools on Linux or Mac OS X.

## 1. Most of the bash commands are not working, .bash_profile or .bashrc is broken.

```sh
$ ls
-bash: ls: command not found
```

Use full paths to the commands until fix the PATH:

```
$ /bin/ls
$ /usr/bin/vi ~/.bash_profile
```

Reference:
* [I've broken my .bash_profile](http://superuser.com/questions/170332/ive-broken-my-bash-profile)

## 2. Run Atom in command line on MAC OS X.
execute following script

```
sudo ln -s /Applications/Atom.app/Contents/Resources/app/atom.sh /usr/local/bin/atom
```

Reference:
* [How to open Atom editor from command line in OS X?](http://stackoverflow.com/questions/22390709/open-atom-editor-from-command-line)

## 3. Remove mount
execute the following script

```
sudo umount -f /sapmnt/rc
```

Reference:
* [How to Mount and Unmount Filesystem / Partition in Linux ](http://www.thegeekstuff.com/2013/01/mount-umount-examples/?utm_source=tuicool)
