---
layout: tutorial
key: tutorial
title: "Online Judge - RichTextEditor[Draft]"
index: 336
category: angular
image: angular.png
date: 2018-04-23
tags: [ngx-editor]
---

> Learn how to use WYSIWYG Editor:ngx-editor.

## 8. Editor and font

install Font Awesome
```sh
npm install --save font-awesome
```
Add font-awesome style file to angular-cli.json
```javascript
"styles": [
  "../node_modules/font-awesome/css/font-awesome.css"
  "styles.css"
],
```



issue: initially the icon fongx-editor is small. this is because it use rem css.
```raw
.ngx-editor-button {
    background-color: #f5f5f5;
    background-color: transparent;
    padding: 0.4rem;
    min-width: 2.5rem;
    float: left;
    border: 1px solid #ddd;
    border-right: transparent;
```

Meanwhile, we are using bootstrap which sets html's font size to 10px. To fix the issue, we need to set back the html's font to the default size-16px.
```css
/*styles.css*/
html {
  font-size: 16px;
}
```
Add, make sure styles.css is after the bootstrap style file. so our style can override bootstrap's style.
```javascript
"styles": [
  "../node_modules/bootstrap/dist/css/bootstrap.min.css",
  "../node_modules/font-awesome/css/font-awesome.css",
  "styles.css"
],
```
The rem unit sets the font-size relative to the browsers base font-size, and will not inherit from its parents.


## 5. References
* [code editor-ace editor](https://github.com/fxmontigny/ng2-ace-editor)
* [WYSIWYG Editor:ngx-editor](https://github.com/Sibiraj-S/ngx-editor)
* [live demo - ngx-editor](https://ngx-editor.stackblitz.io/)
* [ngx-editor configuration](https://sibiraj-s.github.io/ngx-editor/additional-documentation/configuration.html)
* [Include Font Awesome in Angular](https://github.com/angular/angular-cli/blob/master/docs/documentation/stories/include-font-awesome.md)
* [rem sample at w3schools](https://www.w3schools.com/cssref/tryit.asp?filename=trycss_unit_rem)
* [Font sizing with rem](https://snook.ca/archives/html_and_css/font-size-with-rem)
