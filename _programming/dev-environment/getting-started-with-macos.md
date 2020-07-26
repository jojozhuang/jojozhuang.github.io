---
layout: tutorial
key: programming
title: "Getting Started with macOS"
index: 2002
subcategory: dev-environment
date: 2017-06-17
tags: [macOS, Bash, Shell]
---

> This blog records some common settings or issues when using macOS(Mac OS X).

## 1. bash Configuration File Broken
Most of the bash commands are not working, `.bash_profile` or `.bashrc` is broken.
```raw
$ ls
-bash: ls: command not found
```
Use full paths to the commands until fix the PATH:
```raw
$ /bin/ls
$ /usr/bin/vi ~/.bash_profile
```

## 2. Run Atom in Command Line on macOS
Execute following script to link atom executable to local user directory.
```raw
$ sudo ln -s /Applications/Atom.app/Contents/Resources/app/atom.sh /usr/local/bin/atom
```
Then, you can open Atom in command prompt by just typing 'atom'.
```raw
$ atom
```

## 3. Remove mount
Execute the following script

```raw
$ sudo umount -f /sapmnt/rc
```

## 4. Open a folder from terminal on Mac
Navigate to the dir and type:
```raw
open .
```
The dot represents the current location.

## 5. Change the Default Terminal Prompt in Mac OS X
Navigate to the dir and type:
```raw
cd ~
vi .bash_profile
```
Add the following line (press i)
```raw
export PS1="Johnny@Johnny-Mac:~$ "
```
Save the file (press ESC, type :wq and hit Enter), restart Terminal.
![image](/assets/images/programming/2002/terminalname.png){:width="500px"}

## 6. Open Two or More Windows of Visual Studio for Mac
Navigate to the folder where Visual Studio Solution file(.sln) locates. Type the following command.
```raw
$ open -n MySolution.sln
```

## 7. Change File's Created Date and Modified Date.
In terminal, change created date with 'SetFile' command.
```raw
SetFile -d '05/30/2017 02:15:49' default.png
```
In terminal, change modified date with 'touch' command.
```raw
touch -m -t201607081029.44 default.png
```

## 8. Paste file paths in Open, Save dialogs
Command+Shift+G, paste the path.

## 9. References
* [Free Mac guides and tutorials](http://www.macforbeginners.com/)
* [I've broken my .bash_profile](http://superuser.com/questions/170332/ive-broken-my-bash-profile)
* [How to open Atom editor from command line in OS X?](http://stackoverflow.com/questions/22390709/open-atom-editor-from-command-line)
* [How to Mount and Unmount Filesystem / Partition in Linux ](http://www.thegeekstuff.com/2013/01/mount-umount-examples/?utm_source=tuicool)
