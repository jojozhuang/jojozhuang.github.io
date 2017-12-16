---
layout: post
key: blog
title: "Viewing Jekyll Build Error with Travis CI"
date: 2017-12-10
tags: [Github Pages, Travis CI]
---

> Introduce how to use Travis CI to get build error from GitPages.

## 1. GitHub Pages
I have my person website http://jojozhuang.github.io/ hosted in Github Pages. I post new blogs by check in the 'md' file(in Markdown format) to the Github Pages repository on Github. Github Pages will start to compile the entire directory and publish the new website. In some cases, however, the compilation fails. And your changes will not be published. GitHub Page will send out the notification email telling the compilation fails. But without details information. There is one way to get the detailed build error by using Travis CI.

## 2. Configuration of GitHub Page
Add a file named `Gemfile` to the root of the GitHub Pages repository with the following content:
Gemfile
```gem
source 'https://rubygems.org'

gem 'github-pages'
```

Add another file named `.travis.yml` to the root of the GitHub Pages repository with the following content:
```yml
language: ruby
rvm:
- 2.1
script: "bundle exec jekyll build"
```

Check in these two files to GitHub Page repository.

## 3. Configuration on Travis CI
Access https://travis-ci.org, logon with your GitHub account.
![MIME Type](/public/pics/2017-12-10/travisci_account.png)  
All the public repositories will be displayed here. Find the Github Page repository, switch on for building. The only left thing to do is to make some change to your repository. Travis CI will try to build the new website.
![MIME Type](/public/pics/2017-12-10/travisci_activate.png)  

## 4. Testing
I edit one file and check in to the GitHub Page. Few minutes later, I got one notification email from GitHub Page saying Page build failure. However, there is no valuable information from the description. I don't know what is the exact error.
![MIME Type](/public/pics/2017-12-10/notification_builderror.png)  
Then, I got another notification email from Travis CI. It also remind me that the build is failed.
![MIME Type](/public/pics/2017-12-10/notification_travis.png)  
Click on the 'Build was broken' link. You will see the details about the current build(which is numbered 86 here.
![MIME Type](/public/pics/2017-12-10/travis1.png)  
Scroll down until you see the error marked in red. The error comes from Liquid. It is complaining that the link to file '\_posts/2017-07-10-developing-ios-app.md' fails in '\_posts/2017-07-21-building-ios-app-with-xamarin.md'.
![MIME Type](/public/pics/2017-12-10/travis2.png)  
Open file '\_posts/2017-07-21-building-ios-app-with-xamarin.md'. The cause is found. In the last commit, I renamed the file name for July 10's blog from 'developing-ios-app' to 'building-ios-app-with-xcode'. But I forgot to change the files which linked to this file.
![MIME Type](/public/pics/2017-12-10/linkerror.png)  
Correct the file name in '\_posts/2017-07-21-building-ios-app-with-xamarin.md' and submit the change to Github. No notification email from Github, instead, only one notification email from Travis CI. The new build(#87) succeeded.
![MIME Type](/public/pics/2017-12-10/notification_fixed.png)  
Click on the 'Build was fixed' link. You will see the details about the latest build.
![MIME Type](/public/pics/2017-12-10/fix1.png)  
Scroll down, there is no error this time.
![MIME Type](/public/pics/2017-12-10/fix2.png)  

## 5. Reference
* [Viewing Jekyll build error messages](https://help.github.com/articles/viewing-jekyll-build-error-messages/)  
* [Sample Build Error](https://travis-ci.org/jojozhuang/jojozhuang.github.io/builds/315705267?utm_source=email&utm_medium=notification)
