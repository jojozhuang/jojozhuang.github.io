---
layout: note
key: note
title: "Introduction to Linux(Book)"
index: 101
category: notes
image: cs.png
date: 2016-01-01
postdate: 2016-01-01
tags: [Linux, Bash]
---

> Notes of Book: Introduction to Linux - A beginner's Guide  

Author: Machtelt Garrels  
![image](/public/images/note/introduction-to-linux/cover.jpg){:width="300px"}  

Summary:
* Linux is an implementation of UNIX.
* The Linux operating system is written in the C programming language.
* Linux uses GNU tools, a set of freely available standard tools for handling the operating system.

## 1. What is Linux?
Terminology:
* `UNIX`: Invented by Bell Labs to solve compatibility issues on software.
* `Linus`: Linus Torvalds, from university of Helsinki, Finland
* `Linux`: Linux is a full UNIX clone, fit for use on workstations as well as on middle−range and high−end servers.
* `POSIX`: Standard for linux and unix.
* `SAMBA`: Samba is the standard Windows interoperability suite of programs for Linux and Unix
* `SMB`: Server Message Block
* `CIFS`: Common Internet File System
* `GNU`: GNU is an operating system and an extensive collection of computer software. GNU is composed wholly of free software, most of which is licensed under the GNU Project's own GPL.
* `GPL`: Public License from GNU
* `RPM`: RedHat Package Manager
* `dpkg`: Debian package management system, deb
* `apt-get`: APT package handling utility - command-line interface. apt-get is a tool to automatically update your Debian machine and get and install debian packages/programs!
* `Ximian Red Carpet`: A third party implementation of RPM with a graphical front−end.
* `Gnome`: GNOME is a desktop environment composed of free and open-source software that runs on Linux and most BSD derivatives.

A list of common GNU software:
* Bash: The GNU shell
* GCC: The GNU C Compiler
* GDB: The GNU Debugger
* coreutils: a set of basic UNIX−style utilities, such as ls, cat and chmod
* Findutils: to search and find files
* Fontutils: to convert fonts from one format to another or make new fonts
* The Gimp: GNU Image Manipulation Program
* Gnome: the GNU desktop environment
* Emacs: a very powerful editor
* Ghostscript and Ghostview: interpreter and graphical frontend for PostScript files.
* GNU Photo: software for interaction with digital cameras
* Octave: a programming language, primarily intended to perform numerical computations and image
processing.
* GNU SQL: relational database system
* Radius: a remote authentication and accounting server

## 2. Quickstart
### 2.1. Logging in, activating the user interface and logging out
Terminal Window, Command Prompt
### 2.2. Absolute basics
```
[user@host dir]
```
In the above example, user will be your login name, hosts the name of the machine you are working on, and dir an indication of your current location in the file system.

Key or key combination  |  Function
------------------------|----------------------------------
`Ctrl+A`  | Move cursor to the beginning of the command line.
`Ctrl+C`  | End a running program and return the prompt.
`Ctrl+D`  | Log out of the current shell session, equal to typing exit or logout.
`Ctrl+E`  | Move cursor to the end of the command line.
`Ctrl+H`  | Generate backspace character.
`Ctrl+L`  | Clear this terminal.
`Ctrl+R`  | Search command history.
`Ctrl+Z`  | Suspend a program.
`ArrowLeft and ArrowRight` | Move the cursor one place to the left or right on the command line, so that you can insert characters at other places than just at the beginning and the end.
`ArrowUp and ArrowDown` | Browse history. Go to the line that you want to repeat, eventually edit details, and press Enter to save time.
`Shift+PageUp and Shift+PageDown` | Browse terminal buffer (to see text that has "scrolled off" the screen).
`Tab`     |  Command or filename completion; when multiple choices are possible, the system will either signal with an audio or visual bell, or, if too many choices are possible, ask you if you want to see them all.
`Tab Tab` |  Shows file or command completion possibilities.

### 2.3. Getting help
#### 2.3.2. The man pages
Find official manual pages with `man` command.
```sh
man man
man ls
```
Navigation in man.
* space bar -> next page
* b key -> previous page
* q key -> quit

#### 2.3.3. More info
The Info pages
```sh
info info
info ls
```
A short index of explanations for commands is available using the `whatis` command.
```sh
whatis ls
apropos browser
```
The −−help option
```sh
cat −−help
```
## 3. About files and the file system
### 3.1. General overview of the Linux file system
#### 3.1.1. Files
Most files are just files, called `regular files`; they contain normal data, for example text files, executable files or programs, input for or output from a program and so on. And there are some `special files`:
* Directories: files that are lists of other files.
* Special files: the mechanism used for input and output. Most special files are in /dev, we will
discuss them later.
* Links: a system to make a file or directory visible in multiple parts of the system's file tree. We will
talk about links in detail.
* (Domain) sockets: a special file type, similar to TCP/IP sockets, providing inter−process networking
protected by the file system's access control.
* Named pipes: act more or less like sockets and form a way for processes to communicate with each
other, without using network socket semantics.

File types in a long list:

Symbol |  Meaning
-------|-----------
-      | Regular file
d      | Directory
l      | Link
c      | Special file
s      | Socket
p      | Named pipe
b      | Block device

#### 3.1.2. About partitioning
There are two kinds of major partitions on a Linux system:
* data partition: normal Linux system data, including the root partition containing all the data to start up and run the system; and
* swap partition: expansion of the computer's physical memory, extra memory on hard disk.

Use `fdisk` to set the partition type.
```sh
fdisk
```

Partition Samples:
* a partition for user programs (/usr)
* a partition containing the users' personal data (/home)
* a partition to store temporary data like print− and mail−queues (/var)
* a partition for third party and extra software (/opt)

Mount points: All partitions are attached to the system via a mount point. The mount point defines the place of a particular data set in the file system.
```sh
file /etc/fstab
mount command
df
```
#### 3.1.3. More file system layout
For convenience, the Linux file system is usually thought of in a tree structure. On a standard Linux system you will find the layout generally follows the scheme presented below.
![image](/public/images/note/introduction-to-linux/fs-layout.png){:width="700px"}  

Subdirectories of the root directory:

Directory   | Content
------------|--------
/bin        | Common programs, shared by the system, the system administrator and the users.
/boot       | The startup files and the kernel, vmlinuz. In some recent distributions also grub data. Grub is the GRand Unified Boot loader and is an attempt to get rid of the many different boot-loaders we know today.
/dev        | Contains references to all the CPU peripheral hardware, which are represented as files with special properties.
/etc        | Most important system configuration files are in /etc, this directory contains data similar to those in the Control Panel in Windows
/home       | Home directories of the common users.
/initrd     | (on some distributions) Information for booting. Do not remove!
/lib        | Library files, includes files for all kinds of programs needed by the system and the users.
/lost+found | Every partition has a lost+found in its upper directory. Files that were saved during failures are here.
/misc       | For miscellaneous purposes.
/mnt        | Standard mount point for external file systems, e.g. a CD-ROM or a digital camera.
/net        | Standard mount point for entire remote file systems
/opt        | Typically contains extra and third party software.
/proc       | A virtual file system containing information about system resources. More information about the meaning of the files in proc is obtained by entering the command man proc in a terminal window. The file proc.txt discusses the virtual file system in detail.
/root       | The administrative user's home directory. Mind the difference between /, the root directory and /root, the home directory of the root user.
/sbin       | Programs for use by the system and the system administrator.
/tmp        | Temporary space for use by the system, cleaned upon reboot, so don't use this for saving any work!
/usr        | Programs, libraries, documentation etc. for all user-related programs.
/var        | Storage for all variable files and temporary files created by users, such as log files, the mail queue, the print spooler area, space for temporary storage of files downloaded from the Internet, or to keep an image of a CD before burning it.

Find out which partition a directory is on?
```sh
df −h .
Filesystem Size Used Avail Use% Mounted on
/dev/hda7  980M 163M 767M  18% /
```

At the time a new file is created, it gets a free `inode`. In that inode is the following information:
* Owner and group owner of the file.
* File type (regular, directory, ...)
* Permissions on the file Section 3.4.1
* Date and time of creation, last read and change.
* Date and time this information has been changed in the inode. • Number of links to this file (see later in this chapter).
* File size
* An address defining the actual location of the file data.

The only information not included in an inode, is the file name and directory. These are stored in the special directory files. By comparing file names and inode numbers, the system can make up a tree−structure that the user understands. Users can display inode numbers using the −i option to ls. The inodes have their own separate space on the disk.
```sh
ls -i  // use -i option to print the file serial number (inode number)
```
### 3.2. Orientation in the file system
#### 3.2.1. The path
The `PATH` environment variable. Use `echo` command to display the content ("$") of the variable PATH:
```sh
$ echo $PATH
/mnt/rc/ez:/usr/local/ActivePerl-5.10/bin:.:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin
```
Use `export` to change the environment variable.
```sh
export PATH=/usr/local/bin:/usr/local/sbin:/usr/X11R6/bin: /usr/bin:/usr/sbin:/bin:/sbin:/home/jumper/bin
```
Note that when using the export command in a shell, the changes are temporary and only valid for this session (until you log out). Opening new sessions, even while the current one is still running, will not result in a new path in the new session.
#### 3.2.2. Absolute and relative paths
Paths that don't start with a slash are always relative.
```sh
cd /  // go to the root directory.
```
#### 3.2.3. The most important files and directories
Shell types:
* `sh` or Bourne Shell: the original shell still used on UNIX systems and in UNIX related environments. This is the basic shell, a small program with few features. When in POSIX−compatible mode, bash will emulate this shell.
* `bash` or Bourne Again shell: the standard GNU shell, intuitive and flexible. Probably most advisable for beginning users while being at the same time a powerful tool for the advanced and professional user. On Linux, bash is the standard shell for common users. This shell is a so−called superset of the Bourne shell, a set of add−ons and plug−ins. This means that the Bourne Again shell is compatible with the Bourne shell: commands that work in sh, also work in bash. However, the reverse is not always the case. All examples and exercises in this book use bash.
* `csh` or C shell: the syntax of this shell resembles that of the C programming language. Sometimes asked for by programmers.
* `tcsh` or Turbo C shell: a superset of the common C shell, enhancing user−friendliness and speed.
* `ksh` or the Korn shell: sometimes appreciated by people with a UNIX background. A superset of the
Bourne shell; with standard configuration a nightmare for beginning users.

The file /etc/shells gives an overview of known shells on a Linux system:
```sh
$ cat /etc/shells
# List of acceptable shells for chpass(1).
# Ftpd will not allow users to connect who are not using
# one of these shells.

/bin/bash
/bin/csh
/bin/ksh
/bin/sh
/bin/tcsh
/bin/zsh
```

Which shell am I using?
```sh
$ echo $SHELL
/bin/bash
```

Find out home directory.
```sh
$ echo $HOME
/Users/johnny
```
#### 3.2.4. The most important configuration files
Most common configuration files, see [here](http://www.linuxtopia.org/online_books/introduction_to_linux/linux_The_most_important_configuration_files.html).

File | Information/service
--------|----------------
aliases | Mail aliases file for use with the Sendmail and Postfix mail server. Running a mail server on each and every system has long been common use in the UNIX world, and almost every Linux distribution still comes with a Sendmail package. In this file local user names are matched with real names as they occur in E-mail addresses, or with other local addresses.
apache | Config files for the Apache web server.
bashrc | The system-wide configuration file for the Bourne Again SHell. Defines functions and aliases for all users. Other shells may have their own system-wide config files, like cshrc.
crontab and the cron.* directories | Configuration of tasks that need to be executed periodically - backups, updates of the system databases, cleaning of the system, rotating logs etc.
default  | Default options for certain commands, such as useradd.
filesystems | Known file systems: ext3, vfat, iso9660 etc.
fstab | Lists partitions and their mount points.
ftp* | Configuration of the ftp-server: who can connect, what parts of the system are accessible etc.
group | Configuration file for user groups. Use the shadow utilities groupadd, groupmod and groupdel to edit this file. Edit manually only if you really know what you are doing.
hosts | A list of machines that can be contacted using the network, but without the need for a domain name service. This has nothing to do with the system's network configuration, which is done in /etc/sysconfig.
inittab | Information for booting: mode, number of text consoles etc.
issue | Information about the distribution (release version and/or kernel info).
ld.so.conf | Locations of library files.
lilo.conf, silo.conf, aboot.conf etc. | Boot information for the LInux LOader, the system for booting that is now gradually being replaced with GRUB.
logrotate.* | Rotation of the logs, a system preventing the collection of huge amounts of log files.
mail | Directory containing instructions for the behavior of the mail server.
modules.conf | Configuration of modules that enable special features (drivers).
motd | Message Of The Day: Shown to everyone who connects to the system (in text mode), may be used by the system admin to announce system services/maintenance etc.
mtab | Currently mounted file systems. It is advised to never edit this file.
nsswitch.conf | Order in which to contact the name resolvers when a process demands resolving of a host name.
pam.d | Configuration of authentication modules.
passwd | Lists local users. Use the shadow utilities useradd, usermod and userdel to edit this file. Edit manually only when you really know what you are doing.
printcap | Outdated but still frequently used printer configuration file. Don't edit this manually unless you really know what you are doing.
profile | System wide configuration of the shell environment: variables, default properties of new files, limitation of resources etc.
rc* | Directories defining active services for each run level.
resolv.conf | Order in which to contact DNS servers (Domain Name Servers only).
sendmail.cf | Main config file for the Sendmail server.
services | Connections accepted by this machine (open ports).
sndconfig or sound | Configuration of the sound card and sound events.
ssh | Directory containing the config files for secure shell client and server.
sysconfig | Directory containing the system configuration files: mouse, keyboard, network, desktop, system clock, power management etc. (specific to RedHat)
X11 | Settings for the graphical server, X. RedHat uses XFree, which is reflected in the name of the main configuration file, XFree86Config. Also contains the general directions for the window managers available on the system, for example gdm, fvwm, twm, etc.
xinetd.* or inetd.conf | Configuration files for Internet services that are run from the system's (extended) Internet services daemon (servers that don't run an independent daemon).

### 3.3. Manipulating files
The default location of all logs is `/var/log`.  
#### 3.3.1. Viewing file properties
Show hidden files.
```sh
$ ls -a
```
Find which kind of file with `file` command.
```sh
$ file Documents/
Documents/: directory
$ file high−tech−stats.pdf
high−tech−stats.pdf: PDF document, version 1.2
```
Open file manager with `nautilus` command.
```sh
$ nautilus
```
File manipulation:
```sh
$ mkdir folder1
$ cd folder1
$ touch file1
$ touch file2
$ ls
$ rm file2
$ ls
$ cd ..
$ mv folder1 folder2
$ cp -r folder2 folder3
```
#### 3.3.3. Finding files
Use `which` command to look up files. The which command is useful when troubleshooting "Command not Found" problems. Suppose user cannot use acroread command. Use `which acroread` to find out that none of the directories in the PATH environment variable contains this command.
```sh
$ which acroread
/usr/bin/which: no acroread in (/bin:/usr/bin:/usr/bin/X11)
```
Using the which command also checks to see if a command is an alias for another command:
```sh
$ which −a ls
ls is aliased to 'ls −F −−color=auto'
ls is /bin/ls
```
Find all files in the current directory or one of its subdirectories, that are bigger than 50 MB.
```sh
$ find . -size +50000k
./EBooks/CareerCup-Cracking_The_Coding_Interview_Ed6_712pages-2016.pdf
```
Find all files in the current directory or one of its subdirectories, that their name contains string 'Interview'.
```sh
$ find . -name '*Interview*'
./EBooks/CareerCup-Cracking_The_Coding_Interview_Ed6_712pages-2016.pdf
./EBooks/Cracking the Coding Interview.pdf
./EBooks/Programming Interviews Exposed.pdf
```
`locate` command is easier to use, but more restricted than find, since its output is based on a file index database that is updated only once every day. On the other hand, a search in the locate database uses less resources than find and therefore shows the results nearly instantly.
```sh
$ locate Working_RH.txt
/home/johnny/work/Working_RH.txt
```
Most Linux distributions use `slocate` these days, security enhanced locate, the modern version of locate that prevents users from getting output they have no right to read. On most systems, locate is a symbolic link to the slocate program:
```sh
$ ls −l /usr/bin/locate
-rwx--s--x. 1 root slocate 40504 Feb  4  2016 /usr/bin/locate
```
`grep` is used for filtering input lines and returning certain patterns to the output.  
Quickly check the correct spelling of word 'penguin'.
```sh
$ grep penguin /usr/share/dict/words
penguin
penguinery
```
#### 3.3.4. More ways to view file content
Show the content of the file.
```sh
cat running.log
more running.log
less running.log  //less is more
```
#### 3.3.5. Linking files
Link types:
* Hard link: Associate two or more file names with the same inode. Hard links share the same data blocks on the hard disk, while they continue to behave as independent files. There is an immediate disadvantage: hard links can't span partitions, because inode numbers are only unique within a given partition.
* Soft link or symbolic link (or for short: symlink): a small file that is a pointer to another file. A
symbolic link contains the path to the target file instead of a physical location on the hard disk. Since inodes are not used in this system, soft links can span across partitions.

Hardlink and softlink:
- inode number, ls -i, ls -i /, ls -l
- hardlink, ln orignal hardlink1(create a new hard link to original)
- softlink, ln -s orginal hardlink1(create a new soft link to original)
- you can create soft link to directory, but not able to create hard link for directory.

### 3.4. File security
#### 3.4.1. Access rights: Linux's first line of defense
The first character is the file type indicator. The next nine characters display the file permissions(read, write, execute) for these three user categories(the user, the group and the others).
```sh
$ ls −l To_Do
−rw−rw−r−− 1 johnny users 5 Jan 15 12:39 To_Do
```
The first file is a regular file (first dash). Users with user name johnny or users belonging to the group users can read and write (change/move/delete) the file, but they can't execute it (second and third dash). All other users are only allowed to read this file, but they can't write or execute it (fourth and fifth dash).

```sh
$ ls −l /bin/ls
−rwxr−xr−x 1 root root 45948 Aug 9 15:01 /bin/ls*
```
The second example is an executable file, the difference: everybody can read and run this program, but you need to be
root to change it.

Access mode codes:

Code   | Meaning
-------|--------
0 or − | The access right that is supposed to be on this place is not granted.
4 or r | read access is granted to the user category defined in this place
2 or w | write permission is granted to the user category defined in this place
1 or x | execute permission is granted to the user category defined in this place

User group codes:

Code | Meaning
-----|---------
u    | user permissions
g    | group permissions
o    | permissions for others

Use `id` command and USER environment variable to find out the current user name.
```sh
$ id
$ echo $USER
```
#### 3.4.2. The tools
Use `chmod` command to change permissions.
```sh
$ hello
-bash: ./hello: Permission denied
$ cat hello
echo "Hello, World"
$ ls -l hello
-rw-r--r--  1 johnny  GLOBAL\Domain Users  20 Mar  6 15:17 hello
$ chmod u+x hello
$ ls -l hello
-rwxr--r--  1 johnny  GLOBAL\Domain Users  20 Mar  6 15:17 hello
$ hello
Hello, World
$ chmod u-rwx,go+rwx hello
$ ls -l hello
----rwxrwx  1 johnny  GLOBAL\Domain Users  20 Mar  6 15:17 hello
$ hello
-bash: ./hello: Permission denied
```

File protection with chmod:

Command             | Meaning
--------------------|---------------------------
chmod 400 file      | To protect a file against accidental overwriting.
chmod 500 directory | To protect yourself from accidentally removing, renaming or moving files from this directory.
chmod 600 file      | A private file only changeable by the user who entered this command.
chmod 644 file      | A publicly readable file that can only be changed by the issuing user.
chmod 660 file      | Users belonging to your group can change this file, others don't have any access to it at all.
chmod 700 file      | Protects a file against any access from other users, while the issuing user still has full access.
chmod 755 directory | For files that should be readable and executable by others, but only changeable by the issuing user.
chmod 775 file      | Standard file sharing mode for a group.
chmod 777 file      | Everybody can do everything to this file.

File permissions:

Who\What | r(ead) | w(rite) | (e)x(ecute)
---------|--------|---------|------------
u(ser)   | 4      | 2       | 1
g(roup)  | 4      | 2       | 1
o(ther)  | 4      | 2       | 1

Use `newgrp` command to log into another group.  
```sh
asim:/var/www/html> newgrp web  // User asim use the `newgrp` to log into group `web`.
asim:/var/www/html> touch test
asim:/var/www/html> ls −l test
−rw−rw−r−− 1 asim web 0 Jun 10 15:38 test  // When asim creates new files, they will be in group web instead of group asim.
```

When a new file is saved somewhere, it is first subjected to the standard security procedure. The standard file permission is determined by the `mask` for new file creation. The value of this mask can be displayed using the umask command:
```sh
$ umask
0022
```
chown and chgrp.
```sh
# Changes ownership of the directories from root to yourself
sudo chown $USER /ariba
sudo chown $USER /ariba/ezone

# Changes the group of the directories from root to yourself
sudo chgrp `id -g` /ariba
sudo chgrp `id -g` /ariba/ezone
```

## 4. Processes
### 4.1. Processes inside out
#### 4.1.4. Displaying process information
Display process.
```sh
$ ps
$ pstree
```
#### 4.1.5. Life and death of a process
Common signals:

Signal name | Signal number | Meaning
------------|---------------|------------------------------------------------------
SIGTERM     | 15            | Terminate the process in an orderly way.
SIGINT      | 2             | Interrupt the process. A process can ignore this signal.
SIGKILL     | 9             | Interrupt the process. A process can not ignore this signal.
SIGHUP      | 1             | For daemons: reread the configuration file.

#### 4.1.6. SUID and SGID
SUID: set user ID. Enable a common user to edit the password file which is owned by the system admin.  
SGID: set group ID.
```sh
Johnny@Johnny-Mac:~$ who
Johnny  console  Mar  7 13:26
Johnny  ttys000  Mar  7 13:26
Johnny  ttys001  Mar  7 13:26
Johnny  ttys002  Mar  7 13:26
Johnny@Johnny-Mac:~$ write Johnny ttys001
hello

Message from Johnny@jojostudio on ttys000 at 16:45 ...
hello
```

### 4.2. Boot process, Init and shutdown
GRUB, MBR  
init, /etc/inittab, run level
```raw
#
# inittab   This file describes how the INIT process should set up
#           the system in a certain run−level.
# Default runlevel. The runlevels are:
# 0−halt (Do NOT set initdefault to this)
# 1−Single user mode
# 2−Multiuser, without NFS (The same as 3, if you do not have networking)
# 3−Full multiuser mode
# 4−unused
# 5 − X11
# 6− reboot (Do NOT set initdefault to this)
#
id:5:initdefault:
<−−cut−−>
```
Commonly, `run level 3` is configured to be text mode on a Linux machine, and `run level 5` initializes the graphical login and environment.

/etc/X11/prefdm, X display manager, in run level 5

#### 4.2.6. Shutdown
shutdown, reboot, halt
### 4.3. Managing processes
IO/Resourses  
ps, vmstat, top

Kill process.
```sh
$ ps −ef | grep mozilla
$ kill −9 25915
```
### 4.4. Scheduling processes
sleep, at
### 4.5. Summary
Process handling commands:

Command    | Meaning
-----------|-------------
`at`       | Queue jobs for later execution.
`atq`      | Lists the user's pending jobs.
`atrm`     | Deletes jobs, determined by their job number.
`batch`    | Executes commands when system load level permits.
`crontab`  | Maintain crontab files for individual users.
`halt`     | Stop the system.
`init runlevel` | Process control initialization.
`jobs`     | Lists currently executing jobs.
`kill`     | Terminate a process.
`mesg`     | Control write access to your terminal.
`netstat`  | Display network connections, routing tables, interface statistics, masquerade connections and multicast memberships.
`nice`     | Run a program with modified scheduling priority.
`ps`       | Report process status.
`pstree`   | Display a tree of processes.
`reboot`   | Stop the system.
`renice`   | Alter priority of running processes.
`shutdown` | Bring the system down.
`sleep`    | Delay for a specified time.
`time`     | Time a command or report resource usage.
`top`      | Display top CPU processes.
`uptime`   | Show how long the system has been running.
`vmstat`   | Report virtual memory statistics.
`w`        | Show who is logged on and what they are doing.
`wall`     | Send a message to everybody's terminals.
`who`      | Show who is logged on.
`write`    | Send a message to another user.

## 5. I/O redirection
### 5.1. Simple redirections
#### 5.1.2. The redirection operators
Output redirection with > and |. Use `cat` command to concatenate content from two files and put them all together to the third file.
```sh
$ cat test1
some words
$ cat test2
some other words
$ cat test1 test2 > test3
$ cat test3
some words
some other words
```

To find a word within some text, display all lines matching "pattern1", and exclude lines also matching "pattern2" from being displayed:
```sh
grep pattern1 file | grep −v pattern2
```
To display output of a directory listing one page at a time:
```sh
ls −la | less
```
To find a file in a directory:
```sh
ls −l | grep part_of_file_name
```

Find the lines with containing 'level=0' in file logFieldTimingSummary.txt, and save the result to file levelzero.txt.
```sh
less logFieldTimingSummary.txt | grep -i level=0 > levelzero.txt
```
* The `−i` option is used for case−insensitive searches.

Append text to existing file.
```sh
mike:~> cat wishlist more money
less work
mike:~> date >> wishlist
mike:~> cat wishlist
more money
less work
```
### 5.2. Advanced redirection features
Get the file list and output to dirlist.
```sh
ls 2>&1 > dirlist
```

## 6. Text editors
### 6.1. Text editors
ed, edemacs, vi
### 6.2. Using the Vim editor
Moving through the text in command mode.
* `h` to move the cursor to the left
* `l` to move it to the right
* `k` to move up
* `j` to move down

Basic operations
* `n dd` will delete n lines starting from the current cursor position.
* `n dw` will delete n words at the right side of the cursor.
* `x` will delete the character on which the cursor is positioned
* `:n` moves to line n of the file.
* `:w` will save (write) the file
* `:q` will exit the editor.
* `:q!` forces the exit when you want to quit a file containing unsaved changes.
* `:wq` will save and exit
* `:w` newfile will save the text to newfile.
* `:wq!` overrides read−only permission (if you have the permission to override permissions, for instance
when you are using the root account.
* `/astring` will search the string in the file and position the cursor on the first match below its position. • / will perform the same search again, moving the cursor to the next match.
* `:1, $s/word/anotherword/g` will replace word with anotherword throughout the file.
* `yy` will copy a block of text.
* `n p` will paste it n times.
* `:recover` will recover a file after an unexpected interruption.

Commands that switch the editor to insert mode
* `a` will append: it moves the cursor one position to the right before switching to insert mode
* `i` will insert
* `o` will insert a blank line under the current cursor position and move the cursor to that line.

Vim tutorial.
```sh
vimtutor
```

## 7. Home sweet /home
### 7.1. General good housekeeping
#### 7.1.2. Make space
The process of reducing an existing file to a file with the same name that is 0 bytes large is called "truncating."
empty file 'placeholder'.
```sh
$ ls −la placeholder
−rw−rw−r−− 1 andy andy 200 Jun 12 13:34 placeholder
$ > placeholder
$ ls −la placeholder
−rw−rw−r−− 1 andy andy 0 Jun 12 13:35 placeholder
```
Keep the last five items.
```sh
$ tail −5 wishlist > newlist
$ cat newlist > wishlist
$ rm newlist
```
### 7.2. Your text environment
#### 7.2.1. Environment variables
```sh
$ echo $PATH
/usr/bin:/usr/sbin:/bin:/sbin:/usr/X11R6/bin:/usr/local/bin
$ PATH=$PATH:/opt/FlightGear/bin
$ echo $PATH
/usr/bin:/usr/sbin:/bin:/sbin:/usr/X11R6/bin:/usr/local/bin:/opt/FlightGear/bin
```
export environment variable
```sh
debby:~> export PATH=$PATH:/opt/FlightGear/man
```
Common environment variables:

Variable name     | Stored information
------------------|-------------------------
`DISPLAY`         | used by the X Window system to identify the display server
`DOMAIN`          | domain name
`EDITOR`          | stores your favorite line editor
`HISTSIZE`        | size of the shell history file in number of lines
`HOME`            | path to your home directory
`HOSTNAME`        | local host name
`INPUTRC`         | location of definition file for input devices such as keyboard
`LANG`            | preferred language
`LD_LIBRARY_PATH` | paths to search for libraries
`LOGNAME`         | login name
`MAIL`            | location of your incoming mail folder
`MANPATH`         | paths to search for man pages
`OS`              | string describing the operating system
`OSTYPE`          | more information about version etc.
`PAGER`           | used by programs like man which need to know what to do in case output is more than one terminal window.
`PATH`            | search paths for commands
`PS1`             | primary prompt
`PS2`             | secondary prompt
`PWD`             | present working directory
`SHELL`           | current shell
`TERM`            | terminal type
`UID`             | user ID
`USER(NAME)`      | user name
`VISUAL`          | your favorite full−screen editor
`XENVIRONMENT`    | location of your personal settings for X behavior
`XFILESEARCHPATH` | paths to search for graphical libraries

#### 7.2.5. Shell scripts
Bash scripts often begin with `#! /bin/bash`. If the first line of a script begins with the two characters `#!`, the remainder of the line specifies an interpreter for the program. Thus, you can specify bash, awk, perl or some other interpreter or shell and write the rest of the script file in that language.

run 'bash filename ARGUMENTS' to execute the bash script.
```raw
$ cat hello.sh
#!/bin/bash
echo "Hello $USER"
$ bash hello.sh
Hello jerry
```
### 7.3. The graphical environment
#### 7.3.2. The X Window System
#### 7.3.3. X server configuration
/etc/X11
### 7.5. Installing new software
Package formats
* rpm
* deb
* apt(Advanced Package Tool)
* Yellowdog's Updater Modified (yum)

```sh
apt-get update
apt-get upgrade
apt-get install xsnow
```

Create a dual boot system that will allow you to choose which kernel to boot by updating your boot loader configuration file `grub.conf`.

Mount
```sh
mount /dev/cdrom /mnt/cdrom
```

/etc/fstab
```sh
$ grep cdrom /etc/fstab
/dev/cdrom /mnt/cdrom iso9660 noauto,owner,ro 0 0
```

## 8. Printers and printing
Skipped.

## 9. Fundamental Backup Techniques
### 9.1. Introduction
#### 9.1.1. Preparing your data
Archive with `tar` command. In Linux, this is commonly done with the tar command. tar was originally designed to archive data on tapes, but it can also make archives, known as tarballs.

Compress a directory
```sh
$ ls images/
me+tux.jpg nimf.jpg
$ tar cvf images−in−a−dir.tar images/
images/
images/nimf.jpg
images/me+tux.jpg
```

Compress files without directory.
```sh
$ cd images
$ tar cvf images−without−a−dir.tar *.jpg
me+tux.jpg
nimf.jpg
```

Compressing and unpacking with gzip or bzip2
```sh
$ ls −la | grep tar
−rw−rw−r−− 1 jimmy jimmy 61440 Jun 6 14:08 images−without−dir.tar
$ gzip images−without−dir.tar
$ ls −la images−without−dir.tar.gz
−rw−rw−r−− 1 jimmy jimmy 50562 Jun 6 14:08 images−without−dir.tar.gz
```
The GNU tar command is aware of gzipped files. Use the following command for unzipping and untarring `.tar.gz` or `.tgz` files.
```sh
tar zxvf file.tar.gz
```
Use the following command for unpacking tar archives that were compressed with bzip2.
```sh
tar jxvf file.tar.bz2
```
### 9.4. Summary
Backup commands:

Command      | Meaning
-------------|---------
`bzip2`      | A block−sorting file compressor.
`cdrecord`   | Record audio or data Compact Disks from a master.
`dd`         | Convert and copy a file
`fdformat`   | Low−level formats a floppy disk.
`gzip`       | Compress or expand files.
`mcopy`      | Copy MSDOS files to/from UNIX.
`mdir`       | Display an MSDOS directory.
`mformat`    | Add an MSDOS file system to a low−level formatted floppy disk.
`mkbootdisk` | Creates a stand−alone boot floppy for the running system.
`mount`      | Mount a file system (integrate it with the current file system by connecting it to a mount point).
`rsync`      | Synchronize directories.
`tar`        | Tape archiving utility, also used for making archives on disk instead of on tape.
`umount`     | Unmount file systems.

## 10. Networking
### 10.1. Networking Overview
Networking protocols: TCP/IP, TCP/IPv6, PPP, SLIP, PLIP, PPPOE, ISDN, smbd, nmbd  
Network configuration files:
* /etc/hosts: always contains the localhost IP address, 127.0.0.1
* /etc/resolv.conf: configure access to a DNS server.
* /etc/nsswitch.conf: defines the order in which to contact different name services.

Network configuration commands: ip, ifconfig, netstat, ping, whois
### 10.2. Internet/Intranet applications
On Linux systems, the server configuration is usually done in the `/etc/httpd` directory. The most important configuration file is `httpd.conf`.
### 10.3. Remote execution of applications
ssh, Secure SHell  
Secure remote copying: scp

## 11. Sound and Video
Skipped.

## Appendix B: DOS versus Linux commands

DOS commands    | Linux command
----------------|------------------
\<command\> /? | man \<command\> or command −−help
cd           | cd
chdir        | pwd
cls          | clear
copy         | cp
date         | date
del          | rm
dir          | ls
echo         | echo
edit         | vim (or other editor)
exit         | exit
fc           | diff
find         | grep
format       | mke2fs or mformat
mem          | free
mkdir        | mkdir
more         | more or even less
move         | mv
ren          | mv
time         | date

## Appendix C. Shell Features

Command  | Meaning
---------|-------
\>       | Redirect output
\>\>     | Append to file
<        | Redirect input
\<\<     | "Here" document (redirect input)
&#124;   | Pipe output
&        | Run process in background.
;        | Separate commands on same line
*        | Match any character(s) in filename
?        | Match single character in filename
[ ]      | Match any characters enclosed
( )      | Execute in subshell
\` \`    | Substitute output of enclosed command
" "      | Partial quote (allows variable and command expansion)
' '      | Full quote (no expansion)
\        | Quote following character
$var     | Use value for variable
$$       | Process id
$0       | Command name
$n       | nth argument (n from 0 to 9)
$*       | All arguments as a simple word
\#       | Begin comment
bg       | Background execution
break    | Break from loop statements
cd       | Change directories
continue | Resume a program loop
echo     | Display output
eval     | Evaluate arguments
exec     | Execute a new shell
fg       | Foreground execution
jobs     | Show active jobs
kill     | Terminate running jobs
newgrp   | Change to a new group
shift    | Shift positional parameters
stop     | Suspend a background job
suspend  | Suspend a foreground job
time     | Time a command
umask    | Set or list file permissions
unset    | Erase variable or function definitions
wait     | Wait for a background job to finish

Need to read more.
* bash scripts. Page 130, 7.2.5.2.
