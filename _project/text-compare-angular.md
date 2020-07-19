---
layout: project
key: project
title: "Text Compare(Angular)"
index: 270
category: web
image: textcompareangular/thumbnail.png
tags: [Angular, Monaco Editor]
---

> A web application for text compare, built with Angular and Monaco Editor.

## 1. Text Compare
This app can determine the different content for the given 'Original Text' and 'Changed Text'. It is based on [Monaco Diff Editor](https://microsoft.github.io/monaco-editor/index.html) and currently supporting the following features:
* Syntax highlighting for 45+ languages, including c, c++, java, javascript, html, typescript, etc.
* Three editor themes: Visual Studio, Visual Studio Dark and High Contrast Dark.
* Diff Mode: Side by Side Diff, Inline Diff.

## 2. Demo
Two available demos:
* `Live Demo on Netlify(CI):` <a href="https://text-compare.netlify.com/" target="\_blank">https://text-compare.netlify.com/</a>
* `Live Demo on Heroku(CI):` <a href="https://text-compare-angular.herokuapp.com/" target="\_blank">https://text-compare-angular.herokuapp.com/</a>
* `Live Demo on Azure:` <a href="https://text-compare.azurewebsites.net/" target="\_blank">https://text-compare.azurewebsites.net/</a>

*Note: The demo websites may be slow when you access them for the first time. Be patient!*

## 3. UI
Home page.
![image](/assets/images/project/textcompareangular/home.png)
Click the 'Text Compare' menu.
![image](/assets/images/project/textcompareangular/textcompare.png)
Input some text in both the original and modified text boxes, and click 'Find Difference' button.
![image](/assets/images/project/textcompareangular/plaintext.png)
Check the 'Inline Style' to view the difference in inline mode.
![image](/assets/images/project/textcompareangular/inline.png)
Input some typescripts and set the language to 'typescript'.
![image](/assets/images/project/textcompareangular/typescript.png)
Change theme to 'Visual Studio Dark'.
![image](/assets/images/project/textcompareangular/darktheme.png)

## 4. Under the Hood
Read tutorial [Building Online Text Compare Tool with Angular]({% link _tutorial/angular-app/building-online-text-compare-tool-with-angular.md %}) to learn how this text compare tool is built.

## 5. Source Files
* [Source files of Text Compare on Github](https://github.com/jojozhuang/text-compare-angular)
