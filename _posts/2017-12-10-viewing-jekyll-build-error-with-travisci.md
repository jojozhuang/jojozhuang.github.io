---
layout: post
key: blog
title: "Viewing Jekyll Build Error with Travis CI"
date: 2017-12-10
tags: [Github Pages, Travis CI]
---

> Introduce how to use [Travis CI](https://travis-ci.org) to get build error from GitHub Pages.

## 1. GitHub Pages & Jekyll
I have my person website http://jojozhuang.github.io/ hosted in [Github Pages](https://pages.github.com/). I post new blogs by creating Markdown files(.md) and submit them to the Github Pages repository on Github. Then, Github Pages( powered by [Jekyll](https://jekyllrb.com/)) starts to compile the entire website and publish it. In some cases, however, the compilation fails, and the new changes are not published. Then, GitHub Page will send a notification email to the author. This email just reminds me that there is one build failure, but doesn't tell what is the root cause.

One approach to figure out what is exactly happening with this issue is to setup Github Page website locally. I introduced the steps in blog [Setting up GitHub Pages Site Locally With Jekyll](_posts/2016-01-16-setting-up-github-pages-site-locally-with-jekyll.md).

Another approach is to use third-party service(eg. Travis CI) to display Jekyll build error messages, which is also recommended by Github Pages. I will introduce this approach in the current posting.

## 2. Travis CI
[Travis CI](https://travis-ci.org) is a hosted, distributed continuous integration service used to build and test software projects hosted at GitHub.

## 3. Configuration of GitHub Page
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

## 4. Configuration on Travis CI
Access the home page of Travis CI - https://travis-ci.org, logon with your GitHub account.
![image](/public/posts/2017-12-10/travisci_account.png)  
All the public repositories will be displayed here. Find the Github Page repository and switch on for auto building. The only left thing to do is to make some changes to your repository. Travis CI starts building the website once it detects new changes are committed.
![image](/public/posts/2017-12-10/travisci_activate.png)  

## 5. Demo
Edit some files and submit them to GitHub. Few minutes later, you will receive one notification email from GitHub Page saying the page build failed. However, there is no detailed information of the failure. We don't know what is the exact error.
![image](/public/posts/2017-12-10/notification_builderror.png)  
Then, you will get another notification email from Travis CI. It also reminds you that the build is failed.
![image](/public/posts/2017-12-10/notification_travis.png)  
Click on the 'Build was broken' link. You will see the details about the current build(which is numbered 86 in this example).
![image](/public/posts/2017-12-10/travis1.png)  
Scroll down until you see the error marked in red. The error comes from [Liquid](https://shopify.github.io/liquid/)(an open-source template language). It is complaining that the link to file '\_posts/2017-07-10-developing-ios-app.md' cannot be generated in '\_posts/2017-07-21-building-ios-app-with-xamarin.md'. The file 'developing-ios-app' doesn't exist.
![image](/public/posts/2017-12-10/travis2.png)  
Open file '\_posts/2017-07-21-building-ios-app-with-xamarin.md'. The cause is found. In the last commit, I changed the file name from 'developing-ios-app' to 'building-ios-app-with-xcode'. But I forgot to change the files which link to this file.
![image](/public/posts/2017-12-10/linkerror.png)  
Correct the file name in '\_posts/2017-07-21-building-ios-app-with-xamarin.md' and submit the change to Github. No notification email from Github, instead, only one notification email from Travis CI. The new build(#87) succeeded.
![image](/public/posts/2017-12-10/notification_fixed.png)  
Click on the 'Build was fixed' link. You will see the details about the latest build.
![image](/public/posts/2017-12-10/fix1.png)  
Scroll down, no error occurs this time.
![image](/public/posts/2017-12-10/fix2.png)  

## 6. Travis CI Dashboard
The current activated repositories are listed in the dashboard.
![image](/public/posts/2017-12-10/dashboard.png)  
Click on the repository, we get the latest build.
![image](/public/posts/2017-12-10/latestbuild.png)  
Branches.
![image](/public/posts/2017-12-10/branches.png)  
Build history.
![image](/public/posts/2017-12-10/history.png)  
![image](/public/posts/2017-12-10/history2.png)  

## 7. Reference
* [Viewing Jekyll build error messages](https://help.github.com/articles/viewing-jekyll-build-error-messages/)  
* [Build Error Sample](https://travis-ci.org/jojozhuang/jojozhuang.github.io/builds/315705267?utm_source=email&utm_medium=notification)
