---
layout: tutorial
key: tutorial
title: "Generating Diagrams and Flowcharts with Mermaid"
index: 9722
subcategory: uncategorized
date: 2018-09-14
tags: [Mermaid, Flowchart, Gantt]
---

> Generate diagrams on web page with Mermaid.

## 1. Mermaid
[Mermaid](https://mermaidjs.github.io/) a simple markdown-like script language for generating charts from text via javascript.

## 2. Using Mermaid on Web Pages
Two steps:
* Include mermaid js library file with script tag in the html page.
* Define diagram with mermaid syntax on the web page.

### 2.1 Loading Mermaid
The preferred way to use Mermaid on a web page is by linking to the publicly available MathJax Content Delivery Network(CDN). This can be done by adding the following code snippet into the HTML header block (the code between <head> and </head>) of your HTML or XHTML document:
```html
<script type="text/javascript"
  src="https://unpkg.com/mermaid@8.0.0-rc.8/dist/mermaid.min.js">
</script>
```
* Go to https://unpkg.com/mermaid to search the latest version or specific version.

In addition, we need to call the `initialize` method.
```html
<script>mermaid.initialize({startOnLoad:true});</script>
```
If you use dynamically loaded fonts that are loaded through CSS, such as Google fonts, mermaid should wait for the whole page to have been loaded.
```html
<script>
$(document).ready(function() {
    mermaid.initialize();
});
</script>
```

### 2.2 Defining Diagrams
Define a flow chart containing 3 nodes.
```mermaid
<div class="mermaid">
  graph LR
    A --- B
    B-->C[Happy]
    B-->D(Sad);
</div>
```
### 2.3 Simple Full Example
 A minimal example of a fully functional HTML page with Mermaid from the CDN could be the following:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
</head>
<body>
  <div class="mermaid">
  graph LR
      A --- B
      B-->C[Happy]
      B-->D(Sad);
  </div>
  <script src="https://unpkg.com/mermaid@8.0.0-rc.8/dist/mermaid.min.js"></script>
  <script>
    mermaid.initialize({
      theme: 'forest'
    });
  </script>
</body>
</html>
```
![image](/assets/images/uncategorized/9722/firstsample.png){:width="600px"}

## 3. Basic Support for fontawesome
It is possible to add icons from [fontawesome](https://fontawesome.com/) for Mermaid diagrams.
### 3.1 Including fontawesome Style File
```html
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" crossorigin="anonymous">
```
### 3.2 Defining Diagrams
Define a flow chart containing 4 nodes. The icons are accessed via the syntax `fa:#icon class name#`.
```mermaid
<div class="mermaid">
    graph TD
      B[peace]
      B-->C[fa:fa-ban forbidden]
      B-->D(fa:fa-spinner);
      B-->E(fa:fa-camera-retro perhaps?);
</div>
```
![image](/assets/images/uncategorized/9722/icon_supported.png){:width="600px"}

## 4. References
* [Mermaid Documentation](https://mermaidjs.github.io/)
* [Mermaid Live Editor](https://mermaidjs.github.io/mermaid-live-editor/)
* [Mermaid on GitHub](https://github.com/knsv/mermaid)
