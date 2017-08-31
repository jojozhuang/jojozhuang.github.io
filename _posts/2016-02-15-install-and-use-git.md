---
layout: post
key: blog
title: "Install and Use Git"
date: 2016-02-15
tags: GitHub, SourceTree
categories:
- blog
---

> Create Responsive Website with AngularJS.

## 1. What is Git?
Git is a distributed revision control and source code management system with an emphasis on speed.

## 2. Install Git
## 2.1 Install Git On Mac OS
Install [Homebrew](https://brew.sh/) if it is not installed on your Mac.
```sh
$ ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```
Install Git with Homebrew
```sh
$ brew install git
```

Check versions
```sh
$ git --version
git version 2.11.0 (Apple Git-81)
```
Configure your Git username and email using the following commands
```sh
$ git config --global user.name "Johnny"
$ git config --global user.email "jojozhuang@gmail.com"
```

## 2.2 Install Git On Ubuntu
Update apt-get
```sh
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install -f
```

Install Git
```sh
sudo apt-get install git
sudo git --version
```

## 3. Create Repository on GitHub
To push your local git repository to remote git server, we need to use GitHub.
1) Go to https://github.com/, register a new account if you haven't got one.
2) After login, you will see the page like below.
![MIME Type](/public/pics/2016-02-15/github.png)  

Create New Repository
Click the green 'New repository' button.
Provide name and description.
Select public or private.
![MIME Type](/public/pics/2016-02-15/createrepo.png)  

repository is created. And it shows some instructions how to submit files to this repository through command line. next, we will do that.

## 4. Push Local File to GitHub
## 4.1 Create Local Repository
```sh
Johnny@Johnny-Mac:~$ mkdir GitTutorial
Johnny@Johnny-Mac:~$ cd GitTutorial/
Johnny@Johnny-Mac:~$ vi hello.txt // input 'Hello Git!'
Johnny@Johnny-Mac:~$ git init
Initialized empty Git repository in /Users/i857285/Johnny/GitHub/GitTutorial/.git/
Johnny@Johnny-Mac:~$ git status -s
?? hello.txt
Johnny@Johnny-Mac:~$ git add hello.txt
Johnny@Johnny-Mac:~$ git status -s
A  hello.txt
Johnny@Johnny-Mac:~$ git commit -m "first commit"
[master (root-commit) 92b8723] first commit
 1 file changed, 1 insertion(+)
 create mode 100644 hello.txt
```
## 4.2 Push to GitHub
```sh
Johnny@Johnny-Mac:~$ git remote add origin https://github.com/jojozhuang/github-test.git
Johnny@Johnny-Mac:~$ git push -u origin master
Username for 'https://github.com': jojozhuang
Password for 'https://jojozhuang@github.com':
Counting objects: 3, done.
Writing objects: 100% (3/3), 228 bytes | 0 bytes/s, done.
Total 3 (delta 0), reused 0 (delta 0)
To https://github.com/jojozhuang/github-test.git
 * [new branch]      master -> master
Branch master set up to track remote branch master from origin.
Johnny@Johnny-Mac:~$
```

## 4.3 Check on GitHub
There is a file named 'hello.txt' in repository 'github-test'.
![MIME Type](/public/pics/2016-02-15/pushed.png)  
Click on the file, check the content of it.
![MIME Type](/public/pics/2016-02-15/content.png)  

## 5. Pull Files From GitHub
```sh
Johnny@Johnny-Mac:~$ cd PullTest/
Johnny@Johnny-Mac:~$ ls
Johnny@Johnny-Mac:~$ git clone https://github.com/jojozhuang/github-test.git
Cloning into 'github-test'...
remote: Counting objects: 3, done.
remote: Total 3 (delta 0), reused 3 (delta 0), pack-reused 0
Unpacking objects: 100% (3/3), done.
Johnny@Johnny-Mac:~$ ls
github-test
Johnny@Johnny-Mac:~$ cd github-test/
Johnny@Johnny-Mac:~$ ls
hello.txt
Johnny@Johnny-Mac:~$
```

## 6. References
* [Git Tutorial](https://www.tutorialspoint.com/git/index.htm)
* [Install Git on Mac OS X](https://www.atlassian.com/git/tutorials/install-git)
* [Install, Configure and Use Git on Ubuntu](http://www.geeksforgeeks.org/how-to-install-configure-and-use-git-on-ubuntu/)
