---
layout: post
key: blog
title: "Configure Jekyll"
date: 2016-01-18
tags: Jekyll
categories: blog
---

> Configure Jekyll for my personal website hosted on GitHub Pages.

## 1. Code Snippet Highlighting
When insert codes to markdown, you can specify the programming language of the code. For example:
````
```java
java code
```
````

There is only a grey rectangle around the codes, no highlighting.
![MIME Type](/public/pics/2016-01-18/withouthighlight.png)  

Edit \_config.yml, add following lines.
```
markdown: kramdown
highlighter: rouge
```
Create css file, for example, [highlight.css]({% link /public/css/highlight.css %}).

And include highlight css file to the page.
```html
<link href="/public/css/highlight.css" rel="stylesheet" />
```
Refresh the page. The highlighting is working now.
![MIME Type](/public/pics/2016-01-18/javahighlight.png)  

## 2. Link File


## 3. References
* [Official Jekyll Document](https://jekyllrb.com/docs/home/)
