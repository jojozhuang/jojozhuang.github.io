---
layout: tutorial
key: architecture
title: "Jenkins - Introduction"
index: 3216
subcategory: softwares
date: 2018-08-10
tags: [Jenkins, CI]
---

> Jenkins Tutorial

## 1. What is Jenkins?
[Jenkins](https://jenkins.io) is an open source Continuous Integration server capable of orchestrating a chain of actions that help to achieve the Continuous Integration process (and not only) in an automated fashion.

Jenkins is free and is entirely written in Java. Jenkins is a widely used application around the world that has around 300k installations and growing day by day.

It is a server-based application and requires a web server like Apache Tomcat. The reason Jenkins became so popular is that of its monitoring of repeated tasks which arise during the development of a project. For example, if your team is developing a project, Jenkins will continuously test your project builds and show you the errors in early stages of your development.

By using Jenkins, software companies can accelerate their software development process, as Jenkins can automate build and test at a rapid rate. Jenkins supports the complete development lifecycle of software from building, testing, documenting the software, deploying and other stages of a software development lifecycle.

**Jenkins Plugins**
By default, Jenkins comes with a limited set of features. If you want to integrate your Jenkins installation with version control tools like Git, then you need to install plugins related to Git. In fact, for integration with tools like Maven, Amazon EC2, you need to install respective plugins in your Jenkins.

## 2. What is Continuous Integration?
In Continuous Integration after a code commit, the software is built and tested immediately. In a large project with many developers, commits are made many times during a day. With each commit code is built and tested. If the test is passed, build is tested for deployment. If deployment is a success, the code is pushed to production. This commit, build, test, and deploy is a continuous process and hence the name continuous integration/deployment.

A Continuous Integration Pipeline is a powerful instrument that consists of a set of tools designed to host, monitor, compile and test code, or code changes, like:
* Continuous Integration Server (Jenkins, Bamboo, CruiseControl, TeamCity, and others)
* Source Control Tool (e.g., CVS, SVN, GIT, Mercurial, Perforce, ClearCase and others)
* Build tool (Make, ANT, Maven, Ivy, Gradle, and others)
* Automation testing framework (Selenium, Appium, TestComplete, UFT, and others)

## 3. Why use Continuous Integration with Jenkins?
Some people might think that the old-fashioned way of developing the software is the better way. Let's understand the advantages of CI with Jenkins with the following example.

Let us imagine, that there are around 10 developers who are working on a shared repository. Some developer completes their task in 25 days while others take 30 days to complete.

Before Jenkins | After Jenkins
----------------|-----------------------
Once all Developers had completed their assigned coding tasks, they used to commit their code all at same time. Later, Build is tested and deployed. | The code is built and test as soon as Developer commits code. Jenkin will build and test code many times during the day.
Code commit built, and test cycle was very infrequent, and a single build was done after many days. | If the build is successful, then Jenkins will deploy the source into the test server and notifies the deployment team. If the build fails, then Jenkins will notify the errors to the developer team.
Since the code was built all at once, some developers would need to wait until other developers finish coding to check their build | The code is built immediately after any of the Developer commits.
It is not an easy task to isolate, detect, and fix errors for multiple commits. | Since the code is built after each commit of a single developer, it's easy to detect whose code caused the built to fail.
Code build and test process are entirely manual, so there are a lot of chances for failure. | Automated build and test process saving timing and reducing defects.
The code is deployed once all the errors are fixed and tested. | The code is deployed after every successful build and test.
Development Cycle is slow | The development cycle is fast. New features are more readily available to users. Increases profits.

CI with Jenkins:
![image](/assets/images/architecture/3216/jenkin-ci.jpg){:width="600px"}

## 4. Advantages of using Jenkins
* Jenkins is being managed by the community which is very open. Every month, they hold public meetings and take inputs from the public for the development of Jenkins project.
* So far around 280 tickets are closed, and the project publishes stable release every three months.
* As technology grows, so does Jenkins. So far Jenkins has around 320 plugins published in its plugins database. With plugins, Jenkins becomes even more powerful and feature rich.
* Jenkins also supports cloud-based architecture so that you can deploy Jenkins in cloud-based platforms.
* The reason why Jenkins became popular is that it was created by a developer for developers.

## 5. Disadvantages of using Jenkins
Though Jenkins is a very powerful tool, it has its flaws.

* Its interface is out dated and not user friendly compared to current UI trends.
* Though Jenkins is loved by many developers, it's not that easy to maintain it because Jenkins runs on a server and requires some skills as server administrator to monitor its activity.
* One of the reasons why many people don't implement Jenkins is due to its difficulty in installing and configuring Jenkins.
* Continuous integrations regularly break due to some small setting changes. Continuous integration will be paused and therefore requires some developer attention.

## 6. Conclusion:
* In Continuous Integration, after a code commit, the software is built and tested immediately.
* Jenkins is an open source Continuous Integration server capable of orchestrating a chain of actions.
* Before Jenkins when all developers had completed their assigned coding tasks, they used to commit their code all at same time. Later, build is tested and deployed.
* After Jenkins the code is built and test as soon as developer commits code. Jenkins will build and test code many times during the day.
* By default, Jenkins comes with a limited set of features. If you want to integrate your Jenkins installation with version control tools like Git, then you need to install plugins related to Git.
* The biggest pros of Jenkins is that it is managed by the community which holds public meetings and take inputs from the public for the development of Jenkins projects.
* The biggest con of Jenkins is that Its interface is out dated and not user friendly compared to current UI trends.

## 7. References
* [Jenkins - Overview](https://www.tutorialspoint.com/jenkins/jenkins_overview.htm)
* [What is Jenkins? Continuous Integration (CI) Tool](https://www.guru99.com/jenkin-continuous-integration.html)
