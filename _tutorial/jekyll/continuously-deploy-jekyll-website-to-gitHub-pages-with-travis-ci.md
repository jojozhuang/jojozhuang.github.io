---
layout: tutorial
key: tutorial
title: "Continuously Deploy Jekyll Website to GitHub Pages with Travis-CI"
index: 8141
subcategory: jekyll
date: 2017-12-10
tags: [Jekyll, Github Pages, Travis CI]
---

> Start continuous integration with Travis CI for Jekyll website.

## 1. GitHub Pages & Jekyll
I have my person website http://jojozhuang.github.io/ hosted on [Github Pages](https://pages.github.com/). I post new blogs by creating Markdown files(.md) and submit them to the repository on Github. Then, Github Pages(powered by [Jekyll](https://jekyllrb.com/)) starts to compile the entire website and publish it. In some cases, however, the compilation fails, and the new changes are not published. Then, GitHub Page will send a notification email to me. This email just reminds me that there is one build failure, but doesn't tell what is the root cause.

One approach to figure out what is exactly happening with this issue is to setup Jekyll website locally. I introduced the steps in [Setting up Jekyll on Ubuntu and macOS]({% link _tutorial/jekyll/setting-up-jekyll-on-ubuntu-and-macos.md %}).

Another approach is to use third-party service(eg. Travis CI) to display Jekyll build error messages, which is also recommended by Github Pages.

## 2. Travis CI
[Travis CI](https://travis-ci.org) is a hosted, distributed continuous integration service used to build and test software projects hosted at GitHub.

## 3. Configuration of GitHub Page
Add a file named `Gemfile` in the root of the GitHub Pages repository with the following content:
Gemfile
```raw
source 'https://rubygems.org'

gem 'github-pages'
```

Add another file named `.travis.yml` to the root of the GitHub Pages repository with the following content:
```yml
language: ruby
rvm:
- 2.4
script: "bundle exec jekyll build"
```

Submit these two files to GitHub repository.

## 4. Configuration on Travis CI
Access the home page of Travis CI - https://travis-ci.org, logon with your GitHub account.
![image](/assets/images/jekyll/8141/travisci_account.png)
All the public repositories will be displayed here. Find the Github Page repository and switch on for auto building. The only left thing to do is to make some changes to your repository. Travis CI starts building the website once it detects new changes are committed.
![image](/assets/images/jekyll/8141/travisci_activate.png)

## 5. Demo
Edit some files and submit them to GitHub. Few minutes later, you will receive one notification email from GitHub Page saying the page build failed. However, there is no detailed information of the failure. We don't know what is the exact error.
![image](/assets/images/jekyll/8141/notification_builderror.png)
Then, you will get another notification email from Travis CI. It also reminds you that the build is failed.
![image](/assets/images/jekyll/8141/notification_travis.png)
Click on the 'Build was broken' link. You will see the details about the current build(which is numbered 86 in this example).
![image](/assets/images/jekyll/8141/travis1.png)
Scroll down until you see the error marked in red. The error comes from [Liquid](https://shopify.github.io/liquid/)(an open-source template language). It is complaining that the link to file '\_posts/2017-07-10-developing-ios-app.md' cannot be generated in '\_posts/2017-07-21-building-ios-app-with-xamarin.md'. The file 'developing-ios-app' doesn't exist.
![image](/assets/images/jekyll/8141/travis2.png)
Open file '\_posts/2017-07-21-building-ios-app-with-xamarin.md'. The cause is found. In the last commit, I changed the file name from 'developing-ios-app' to 'building-ios-app-with-xcode'. But I forgot to change the files which link to this file.
![image](/assets/images/jekyll/8141/linkerror.png)
Correct the file name in '\_posts/2017-07-21-building-ios-app-with-xamarin.md' and submit the change to Github. No notification email from Github, instead, only one notification email from Travis CI. The new build(#87) succeeded.
![image](/assets/images/jekyll/8141/notification_fixed.png)
Click on the 'Build was fixed' link. You will see the details about the latest build.
![image](/assets/images/jekyll/8141/fix1.png)
Scroll down, no error occurs this time.
![image](/assets/images/jekyll/8141/fix2.png)

## 6. Travis CI Dashboard
The current activated repositories are listed in the dashboard.
![image](/assets/images/jekyll/8141/dashboard.png)
Click on the repository, we get the latest build.
![image](/assets/images/jekyll/8141/latestbuild.png)
Branches.
![image](/assets/images/jekyll/8141/branches.png)
Build history.
![image](/assets/images/jekyll/8141/history.png)
![image](/assets/images/jekyll/8141/history2.png)

## 7. Reference
* [Travis CI to the Jekyll site](https://jekyllrb.com/docs/continuous-integration/travis-ci/)
* [Viewing Jekyll build error messages](https://help.github.com/articles/viewing-jekyll-build-error-messages/)  
* [Build Error Sample](https://travis-ci.org/jojozhuang/jojozhuang.github.io/builds/315705267?utm_source=email&utm_medium=notification)
