---
layout: project
key: project
title: "Online Judge(MEAN)"
index: 280
category: web
image: onlinejudgemean/thumbnail.png
tags: [MongoDB, Express, Angular, Node.js]
---

> A web application for online judge(Algorithm questions), built with MEAN stack.

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
![image](/assets/images/project/onlinejudgemean/home.png)
Click the 'Questions' menu.
![image](/assets/images/project/onlinejudgemean/questions.png)
Create a new account.
![image](/assets/images/project/onlinejudgemean/signup.png)
After login, you can select one question to solve, and submit the solution.
![image](/assets/images/project/onlinejudgemean/solution.png)
If the solution is passed all of the test cases, the submission is successful.
![image](/assets/images/project/onlinejudgemean/pass.png)
Or the solutions is failed by some of the test cases.
![image](/assets/images/project/onlinejudgemean/fail.png)
Switch to 'Submissions' to view all your submissions.
![image](/assets/images/project/onlinejudgemean/submissions.png)
Click on the 'Accepted' or 'Wrong Answer' link to view the submission in details.
![image](/assets/images/project/onlinejudgemean/submission.png)

## 4. Under the Hood
Read tutorial [Building Online Judge Application With MEAN Stack]({% link _tutorial/online-judge/online-judge-building-web-app-with-mean-stack.md %}) and [Online Judge - Judging System]({% link _tutorial/online-judge/online-judge-judging-system.md %}) to learn how this online judge app is built.

## 5. Source Files
* [Source files of Online Judge(MEAN) on Github](https://github.com/jojozhuang/online-judge-mean)
