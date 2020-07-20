---
layout: project
key: project
title: "Code Editor(React)"
index: 260
category: web
image: codeeditorreact/thumbnail.png
tags: [React]
---

> A full stack web application for online programming, built with React and Express.

## 1. Code Editor
This application is used for online coding. After selecting the programming language, you can start to write code. Below are the highlighted features.
* Five programming languages are supported, including c, c++, java, javascript and python.
* Syntax highlighting for different languages.
* Compilation and execution are supported. The proper result or error message will be displayed.

## 2. Demo
Two available demos:
* `Live Demo on Netlify(CI):` <a href="https://code-editor-react.netlify.com/" target="\_blank">https://code-editor-react.netlify.com/</a>
* `Live Demo on Heroku(CI):` <a href="https://code-editor-react.herokuapp.com/" target="\_blank">https://code-editor-react.herokuapp.com/</a>
* `Live Demo on Azure:` <a href="https://code-editor.azurewebsites.net/" target="\_blank">https://code-editor.azurewebsites.net/</a>

*Note: The demo websites may be slow when you access them for the first time. Be patient!*

## 3. UI
Home page.
![image](/assets/images/project/codeeditorreact/homepage.png)
Select javascript from the dropdown list. Notice, only javascript and python are supported on [Heroku](https://www.heroku.com/). If you run this application locally, then all 5 languages are supported.
![image](/assets/images/project/codeeditorreact/selectlanguage.png)
Edit the code and click 'Run' button to execute the program.
![image](/assets/images/project/codeeditorreact/execute.png)
If the code has issue and can't run properly, the error will be displayed.
![image](/assets/images/project/codeeditorreact/error.png)

## 4. Under the Hood
Check posting [Building Online Code Editor with React and Express]({% link _tutorial/react-app/building-online-code-editor-with-react-and-express.md %}) to learn the details of how this code editor is built.

## 5. Source Files
* [Source files of Code Editor(React) on Github](https://github.com/jojozhuang/code-editor-react)
