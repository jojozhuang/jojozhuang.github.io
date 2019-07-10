---
layout: tutorial
key: popular
title: "Code Highlighting with highlight.js"
index: JK910
category: jekyll
breadcrumb: [Popular, Personal Website, GitHub Pages and Jekyll]
image: github-pages.png
date: 2018-07-10
postdate: 2019-06-18
tags: [Highlighting, highlight.js]
---

> Highlighting with highlight.js.

## 1. Code Syntax Highlighting
### 1.1 Adding Code into Markdown
When insert codes to markdown, you can specify the programming language of the code. For example:
````
```java
java code
```
````

Be default, there is only a grey rectangle as background, no highlighting on the codes. See the below screenshot.
![image](/public/images/githubpages/910/withouthighlight.png)  
### 1.2 Highlighting in Jekyll Site
To enable the highlighting, you need to edit `_config.yml` file which is located in the root directory of the website, add following lines.
```
markdown: kramdown
highlighter: rouge
```
Then, create css file, for example, [highlight.scss]({% link /public/css/highlight.scss %}). And include this css file to the page.
```html
<link href="/public/css/highlight.css" rel="stylesheet" />
```
Refresh the page. The highlighting is working now.
![image](/public/images/githubpages/910/javahighlight.png)  

## 2. Generic Highlighting Solution
### 2.1 highlight.js
There is another generic solution for code highlighting. [highlight.js](https://highlightjs.org/) is a syntax highlighter written in JavaScript. It works in the browser as well as on the server. It works with pretty much any markup, doesn’t depend on any framework, and has automatic language detection.
### 2.2 Installing highlight.js
Add highlight js and css of the color scheme you want in the header page. Either you can add cdn url as shown below or copy it in your project and give local path. This will find and all highlight the code inside of `<pre><code>` tags.
```html
<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.8/styles/default.min.css">
<script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.8/highlight.min.js"></script>
<script>hljs.initHighlightingOnLoad();</script>
```
* You can download the latest highlight.js and css from https://highlightjs.org/download/.

The highlighting works as follows.
![image](/public/images/githubpages/910/highlighting_with_js.png)  

## 3. Reference
* [Code highlighting in Jekyll blog using highlight.js](http://www.vishalsinha.in/2017/04/23/highlight-code-jekyll.html)
* [Getting highlight.js](https://highlightjs.org/download/)
* [highlight.js on GitHub](https://github.com/highlightjs/highlight.js)
