---
layout: post
key: blog
title: "Bash in Mac OSX"
date: 2016-08-30
tags: [Mac, Bash, Shell]
---

> This blog records some common settings or issues when dealing with Bash or other shell tools on Linux or Mac OS X.

## 1. Most of the bash commands are not working, .bash_profile or .bashrc is broken.

```sh
$ ls
-bash: ls: command not found
```

Use full paths to the commands until fix the PATH:

```sh
$ /bin/ls
$ /usr/bin/vi ~/.bash_profile
```

Reference:
* [I've broken my .bash_profile](http://superuser.com/questions/170332/ive-broken-my-bash-profile)

## 2. Run Atom in command line on MAC OS X.
execute following script

```sh
sudo ln -s /Applications/Atom.app/Contents/Resources/app/atom.sh /usr/local/bin/atom
```

Reference:
* [How to open Atom editor from command line in OS X?](http://stackoverflow.com/questions/22390709/open-atom-editor-from-command-line)

## 3. Remove mount
execute the following script

```sh
sudo umount -f /sapmnt/rc
```

Reference:
* [How to Mount and Unmount Filesystem / Partition in Linux ](http://www.thegeekstuff.com/2013/01/mount-umount-examples/?utm_source=tuicool)

## 4. Open a folder from terminal on a Mac?
Navigate to the dir and type:
```sh
open .
```
The dot represents the current location.

## 5. How to Change Your Default Terminal Prompt in Mac OS X?
Navigate to the dir and type:
```sh
cd ~
vi .bash_profile
```
Add the following line (press i)
```sh
export PS1="Johnny@Johnny-Mac:~$ "
```
Save the file (press Escape, type :wq and hit Enter), restart Terminal.
![MIME Type](/public/pics/2016-08-30/terminalname.png)  

## 6. Can I open two solutions with Visual Studio for Mac at the same time?
Navigate to the folder where Visual Studio Solution file locates. Type the following command.
```sh
open -n MySolution.sln
```

## 7. Change File's Created Date and Modified Date.
In terminal, change created date with 'SetFile' command.
```sh
SetFile -d '05/30/2017 02:15:49' default.png
```
In terminal, change modified date with 'touch' command.
```sh
touch -m -t201607081029.44 default.png
```
