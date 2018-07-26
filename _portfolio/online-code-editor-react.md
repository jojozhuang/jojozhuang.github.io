---
layout: portfolio
key: portfolio
title: "Online Code Editor(React)"
index: 230
tags: [React, Redux]
image: /public/portfolios/onlinecodeeditorreact/thumbnail.png
excerpt: A full stack web application for online programming, built with React and Express.
category: web
---

> A full stack web application for online programming, built with React and Express.

## 1. Code Editor
Use this online code editor to write programming code, compile and execute to see the result. Five languages are supported:
* C
* C++
* Java
* JavaScript
* Python

## 2. UI
I've deployed this application to [Heroku](https://www.heroku.com/). Go to https://online-code-editor.herokuapp.com/ to access the online code editor.

Home page.
![image](/public/portfolios/onlinecodeeditorreact/homepage.png)
Select javascript from the dropdown list. Notice, only javascript and python are supported in heroku. If you run this application locally, then all 5 languages are supported.
![image](/public/portfolios/onlinecodeeditorreact/selectlanguage.png)
Edit the code and click 'Run' button to execute the program.
![image](/public/portfolios/onlinecodeeditorreact/execute.png)
If the code has issue and can't run properly, the error will be displayed.
![image](/public/portfolios/onlinecodeeditorreact/error.png)

## 3. Under the Hood
Check posting [Building Online Code Editor]({% link _tutorial/react/building-online-code-editor.md %}) to learn the details of how this code editor is built.

## 4. Source Files
* [Source files of Online Code Edit(React) on Github](https://github.com/jojozhuang/Portfolio/tree/master/OnlineCodeEditorReact)
