---
layout: portfolio
key: portfolio
title: "Online Judge(MEAN)"
index: 250
tags: [MongoDB, Express, Angular, Node.js]
image: /public/images/portfolio/onlinejudgemean/thumbnail.png
excerpt: A web application for online judge(Algorithm questions), built with MEAN stack.
category: web
---

> A web application for online judge, built with MEAN stack(MongoDB, Express, Angular and Node.js)

## 1. Online Judge
This application is used to solve algorithm questions. You can submit the solution to see if it passes all test cases. Below are the available features.
* Token Based Authentication - Register, Login, Auto Login, User Profile, Reset Password, etc.
* User Management - Create, Update, Delete user.
* Question Management - Create, Update, Delete question.
* Database Management - Import and Export data with csv files for users, questions and submissions.
* Judging System - Judging Engine, Solution Template, Submission History, Multi-programming language support.
* Programming Languages - Three languages are currently supported, including Java, Javascript and Python.
* UI - RichTextEditor, Code Editor, Progress Bar, Loading Image are applied.

## 2. Demo
Three available demos:
* `Live Demo on Netlify(CI):` <a href="https://online-judge.netlify.com/" target="\_blank">https://online-judge.netlify.com/</a>
* `Live Demo on Heroku(CI):` <a href="https://online-judge-mean.herokuapp.com/" target="\_blank">https://online-judge-mean.herokuapp.com/</a>
* `Live Demo on Azure:` <a href="https://online-judge.azurewebsites.net/" target="\_blank">https://online-judge.azurewebsites.net/</a>

*Note: The demo websites may be slow when you access them for the first time. Be patient!*

Try it out on any live demo website with the following accounts:
* Regular User: demo / 123456
* Administrator: admin / 123456

## 3. UI
Home page.
![image](/public/images/portfolio/onlinejudgemean/home.png)
Click the 'Questions' menu.
![image](/public/images/portfolio/onlinejudgemean/questions.png)
Create a new account.
![image](/public/images/portfolio/onlinejudgemean/signup.png)
After login, you can select one question to solve, and submit the solution.
![image](/public/images/portfolio/onlinejudgemean/solution.png)
If the solution is passed all of the test cases, the submission is successful.
![image](/public/images/portfolio/onlinejudgemean/pass.png)
Or the solutions is failed by some of the test cases.
![image](/public/images/portfolio/onlinejudgemean/fail.png)
Switch to 'Submissions' to view all your submissions.
![image](/public/images/portfolio/onlinejudgemean/submissions.png)
Click on the 'Accepted' or 'Wrong Answer' link to view the submission in details.
![image](/public/images/portfolio/onlinejudgemean/submission.png)

## 4. Under the Hood
Read tutorial [Building Online Judge Application With MEAN Stack]({% link _frontend/angular/building-online-judge-application-with-mean-stack.md %}) and [Online Judge - Judging System]({% link _frontend/angular/online-judge-judging-system.md %}) to learn how this online judge app is built.

## 5. Source Files
* [Source files of Online Judge(MEAN) on Github](https://github.com/jojozhuang/online-judge-mean)
