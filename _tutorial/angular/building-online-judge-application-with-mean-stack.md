---
layout: tutorial
key: tutorial
title: "Building Online Judge Application With MEAN Stack"
index: 351
category: angular
image: angular.png
date: 2017-03-01
postdate: 2018-04-09
tags: [MEAN, Angular, Express, MongoDB]
---

> Build online judge application with MEAN stack(MongoDB, Express, Angular and Node.js).

## 1. Online Judge
This online judge application is used to practice programming to solve algorithm questions. It can compile and execute code, and test them with pre-constructed data. The output of the code will be captured by the system, and compared with the standard output. The system will then return the result.

This app contains one RESTful API server and another client component built with Angular. Main functions as follows.
* User Authentication - Register, Login, Profile, Change Password, etc.
* User Management - Create, Update, Delete user.
* Question Management - Create, Update, Delete question.
* Database Management - Import and Export data, including users, questions and submissions.
* Solution Submission - Accept user's solution submissions for questions, execute them and return result.

## 2. Judging System
This is the core component of this online judge application.
### 2.1 Master Data for Solutions
For each question, we have multiple language specified solution. Currently, this online judge application supports three languages: Java, Javascript and Python. And for each solution, there is a test file to verify user's submitted solution. For each question, there is one particular test case file.
### 2.2 Judging Engine
Judging engine contains several 'runner's for different languages. It automatically detects what language of the solution submitted by user, and call specific runner to execute the solution against the pre-defined test cases.

## 3. Server
### 3.1 Express
Use express as web server to host the RESTful API.
### 3.2 MongoDB
Most of the data are stored in MongoDB. The database URL is configurable. You can either use local MongoDB or remote MongoDB hosted on cloud service.

## 4. Client
### 4.1 Angular
Use Angular as the front end stack to build the UI web pages. With the help of third party libraries, this app can
### 4.2 Controls
Progress Bar, Loading icon, WYSIWYG editor, code editor, etc.

## 5. More Tutorials
Read the following tutorials to learn more details about this online judge application.
* [Online Judge - Backend RESTful API Server]({% link _tutorial/angular/online-judge-backend-restful-api-server.md %})
* [Online Judge - Frontend UI with Angular]({% link _tutorial/angular/online-judge-frontend-ui-with-angular.md %})
* [Online Judge - Judging System]({% link _tutorial/angular/online-judge-judging-system.md %})
* [Online Judge - User Authentication]({% link _tutorial/angular/online-judge-user-authentication.md %})
* [Online Judge - Remember Me]({% link _tutorial/angular/online-judge-remember-me.md %})

## 6. Reference
* [Online Judge at Wikipedia](https://en.wikipedia.org/wiki/Online_judge)
* [How do I create online compiler for C, C++ and Java using node.js as server language?](https://www.quora.com/How-do-I-create-online-compiler-for-C-C++-and-Java-using-node-js-as-server-language)
* [How to build Online Judge](https://www.zhihu.com/question/20343652)
* [Making a code compiler using Hackerrank API and ACE editor](http://blog.arpitdubey.com/making-a-code-compiler-using-hackerrank-api-and-ace-editor/)
* [How to build Online Judge](https://www.zhihu.com/question/20343652)
