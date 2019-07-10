---
layout: tutorial
key: popular
title: "Deploying Jekyll Website to Netlify"
index: 922
category: jekyll
breadcrumb: [Popular, Personal Website, GitHub Pages and Jekyll]
image: github-pages.png
date: 2018-07-22
postdate: 2019-06-22
tags: [Jekyll, Netlify]
---

> Deploy static website built with Jekyll to Netlify.

## 1. Jekyll & GitHub Pages & Netlify
I'm using Jekyll to build my personal website [jojozhuang.github.io](jojozhuang.github.io). All its content are static, which are built by Jekyll. Currently, it is hosted on [GitHub Pages](https://pages.github.com/). It works fine, however, there are some limitations with GitHub Pages. For example, it is not possible to specify Http Header for caching.

On the other hand, Netlify supports more features than GitHub Pages and it is also free. [Netlify](https://www.netlify.com/) is an online service which builds, deploys, and manages modern web projects.  Netlify basically initiates its own kind of repository that pushes both to a Github repository and its own services. It offers hosting for front-end projects with many options.

## 2. Deploying Application From Github Repository
### 2.1 New Netlify Account
If you don't have netlify account yet, go to https://app.netlify.com/signup to create a Netlify account with your GitHub account. Once you have the account, follow the steps below to deploy static website to Netlify.
### 2.2 New Site from GitHub
After login, you are in the app home page, click 'New site from Git'.
![image](/public/images/githubpages/922/app.png)
Choose 'Github', next.
![image](/public/images/githubpages/922/newsite.png)
Authorize Netlify to access your GitHub account, next.
![image](/public/images/githubpages/922/authorize.png)
Choose the repository 'jojozhuang.github.io', next.
![image](/public/images/githubpages/922/repository.png)
Choose `master` for the Branch to deploy, set `jekyll build` to the Build command, and set `_site/` to the Publish directory, click the 'Deploy site' button.
![image](/public/images/githubpages/922/options.png)
Netlify will start to deploy your site.
![image](/public/images/githubpages/922/inprogress.png)
Switch to 'Deploy' tab to monitor the status and check the logs.
![image](/public/images/githubpages/922/monitor.png)
If no issue occurs, the publish will be done after few seconds(or minutes).
![image](/public/images/githubpages/922/published.png)
### 2.3 Testing
Click on the green link. Our app is now running in the domain of Netlify.
![image](/public/images/githubpages/922/homepage.png)
Try to switch other pages, all work fine.
![image](/public/images/githubpages/922/portfolio.png)
### 2.4 Changing Site Name
Switch to Settings tab, scroll down and click the 'Change site name' button.
![image](/public/images/githubpages/922/settings.png)
Change the name to 'jojozhuang' and save.
![image](/public/images/githubpages/922/changename.png)
Access your site with the new URL, it should work.
![image](/public/images/githubpages/922/newname.png)

## 3. Reference
* [A Step-by-Step Guide: Jekyll 3.0 on Netlify](https://www.netlify.com/blog/2015/10/28/a-step-by-step-guide-jekyll-3.0-on-netlify/)
