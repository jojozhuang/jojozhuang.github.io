---
layout: tutorial
key: tutorial
title: "Building Online Text Compare Tool[Draft]"
index: 326
category: angular
image: angular.png
date: 2018-02-25
tags: [ngx-progressbar]
---

> Add progress bar for each http request call in Angular application.

## 20. string diff



```raw
<ngx-monaco-diff-editor [options]="options" [originalModel]="originalModel" [modifiedModel]="modifiedModel"></ngx-monaco-diff-editor>
import { Component } from '@angular/core';
import { DiffEditorModel } from 'ngx-monaco-editor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  options = {
    theme: 'vs-dark'
  };
  originalModel: DiffEditorModel = {
    code: 'heLLo world!',
    language: 'text/plain'
  };

  modifiedModel: DiffEditorModel = {
    code: 'hello orlando!',
    language: 'text/plain'
  };
}
```



## 7. Reference
monaco editor for angular
* https://github.com/atularen/ngx-monaco-editor
* https://github.com/Microsoft/monaco-editor
* https://github.com/atularen/ngx-monaco-editor
* https://microsoft.github.io/monaco-editor/
