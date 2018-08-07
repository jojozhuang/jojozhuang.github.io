---
layout: tutorial
key: tutorial
title: "Deploying Text Compare Angular App to Netlify"
index: 329
category: angular
image: angular.png
date: 2017-01-29
postdate: 2018-07-29
tags: [Netlify]
---

> Introduce how to deploy angular application to Netlify.

## 1. Netlify
[Netlify](https://www.netlify.com/) is an online service which builds, deploys, and manages modern web projects.  Netlify basically initiates its own kind of repository that pushes both to a Github repository and its own services. It offers hosting for front-end projects with many options.

## 2. Deploying Application From Github Repository
In this tutorial, I will deploy my [Game Store Angular](https://github.com/jojozhuang/game-store-angular) app to Netlify.
### 2.1 New Netlify Account
Go to https://app.netlify.com/signup to create a Netlify account with your GitHub account.
### 2.2 New Site from GitHub
After login, you are in the app home page, click 'New site from Git'.
![image](/public/tutorials/329/app.png)
Choose 'Github', next.
![image](/public/tutorials/329/newsite.png)
Authorize Netlify to access your GitHub account, next.
![image](/public/tutorials/329/authorize.png)
Choose the repository 'text-compare-angular', next.
![image](/public/tutorials/329/repository.png)
Choose `master` for the Branch to deploy, set `ng build --prod` to the Build command, and set `dist` to the Publish directory, click the 'Deploy site' button.
![image](/public/tutorials/329/options.png)
Netlify will start to deploy your site.
![image](/public/tutorials/329/inprogress.png)
Switch to 'Deploy' tab to monitor the status and check the logs.
![image](/public/tutorials/329/monitor.png)
If the deployment fails, click on the FAILED build, check the log and you should see the error in details.
![image](/public/tutorials/329/errorlog.png)
If no issue occurs, the publish will be done after few seconds(or minutes).
![image](/public/tutorials/329/published.png)
### 2.3 Testing
Switch back to the 'Overview' tab, click on the green link.
![image](/public/tutorials/329/overview.png)
Our app is now running in the domain of Netlify.
![image](/public/tutorials/329/diff.png)
Try to input some texts in the two input boxes and click 'Find Difference' button. You should be able to see the difference.
![image](/public/tutorials/329/compare.png)
### 2.4 Changing Site Name
Switch to Settings tab, scroll down and click the 'Change site name' button.
![image](/public/tutorials/329/settings.png)
Change the name to 'text-compare' and save.
![image](/public/tutorials/329/changename.png)
Access your site with the new URL, it should work.
![image](/public/tutorials/329/newname.png)

## 3. Reference
* [Deploy Angular 6 Application to Netlify](https://medium.com/@geeksamu/deploy-angular-6-application-to-netlify-60b39b9df61c)
* [How I Built My Blog Using Gatsby and Netlify](https://blog.pavsidhu.com/how-i-built-my-blog-using-gatsby-and-netlify/)
* [A Step-by-Step Guide: Gatsby on Netlify](https://www.netlify.com/blog/2016/02/24/a-step-by-step-guide-gatsby-on-netlify/)
