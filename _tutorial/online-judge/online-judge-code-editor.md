---
layout: tutorial
key: tutorial
title: "Online Judge - Code Editor"
index: 9022
subcategory: online-judge
date: 2018-04-16
tags: [Monaco Editor]
---

> Introduce how to use Monaco Editor: ngx-monaco-editor for editing code.

## 1. Code Editor
When writing code to provide the solution for online judge question, it's better to have a professional code editor with features specifically designed to simplify and speed up typing of source code, such as syntax highlighting, indentation, autocomplete and brace matching functionality.

## 2. Monaco Editor
### 2.1 Monaco Editor
For this online judge app, I use [Monaco Editor](https://microsoft.github.io/monaco-editor/). It is the code editor that powers Visual Studio Code.
![image](/assets/images/online-judge/9022/monaco_editor.png)
### 2.2 Monaco Editor for Angular
Instead of using Monaco Editor directly in Angular, we can `ngx-monaco-editor` which is [Monaco Editor for Angular](https://github.com/atularen/ngx-monaco-editor).

Install package `ngx-monaco-editor`,
```raw
npm install ngx-monaco-editor --save        # By default, the latest version is Angular 6.
npm install ngx-monaco-editor@5.0.0 --save  # For angular version 5
```
Edit `.angular-cli.json`, add the glob to assets.
```typescript
{
  "apps": [
    {
      "assets": [
        { "glob": "**/*", "input": "../node_modules/ngx-monaco-editor/assets/monaco", "output": "./assets/monaco/" }
      ],
      ...
    }
    ...
  ],
  ...
}
```
Edit 'app.module.ts', import 'FormsModule' and 'MonacoEditorModule'.
```typescript
import { FormsModule } from '@angular/forms';
import { MonacoEditorModule } from 'ngx-monaco-editor';

...

@NgModule({

  ...

  imports: [
    BrowserModule,
    FormsModule,
    MonacoEditorModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  ...
})
export class AppModule { }
```
`Notice`: You must install the correct version of ngx-monaco-editor, otherwise, you will get the following error in browser and monaco editor won't work properly.
```raw
TypeError: Object(...) is not a function
```
In the 'package.json' file, make sure that the main version of `@angular/core` is same with the main version of `ngx-monaco-editor`. For example, the following package definition in 'package.json' generates the above error. Because the angular version is 5, however, the monaco version is 6.
```typescript
"dependencies": {
    "@angular/animations": "^5.2.0",
    "@angular/common": "^5.2.0",
    "@angular/compiler": "^5.2.0",
    "@angular/core": "^5.2.0",
    "@angular/forms": "^5.2.0",
    "@angular/http": "^5.2.0",
    "@angular/platform-browser": "^5.2.0",
    "@angular/platform-browser-dynamic": "^5.2.0",
    "@angular/router": "^5.2.0",
    "bootstrap": "^4.1.3",
    "core-js": "^2.4.1",
    "ngx-monaco-editor": "^6.0.0",
    "rxjs": "^5.5.6",
    "zone.js": "^0.8.19"
  },
```
### 2.3 Usage
Add '\<ngx-monaco-editor\>' to component html. For example, add it for editing java code in './src/app/components/questions/algorithm-question.component.html'.
```raw
<div *ngIf="selectedLang=='java'" class="form-group">
  <div class="col-sm-12">
    <ngx-monaco-editor class="solution-code-editor" [options]="editorOptions1" [(ngModel)]="code1" formControlName="solution1"></ngx-monaco-editor>
    <app-widget-validation-message [displayError]="isFieldValid('solution1')" errorMsg="Please enter solution">
    </app-widget-validation-message>
  </div>
</div>
```
Then, you can use 'code1' to get or set value for the editor.

### 2.4 Language
You also need to set options for this editor. The following codes set the theme to 'vs' and default language to 'java'.
```typescript
editorOptions1 = { theme: "vs", language: "java" };
```
If you need to change the language, you need to use 'Object.assign()' method, see the example below, which change the language to 'python'.
```typescript
this.editorOptions1 = Object.assign({}, this.editorOptions1, { language: "python" });
```
### 2.5 Editor Height
Define a class to change the height of the editor. For example, the below css set the height of the editor to '400px'.
```css
.solution-code-editor {
  height: 400px;
}
```

## 3. Testing
Start the app, go to question view, select one question to edit(eg. http://localhost:12080/question/two-sum). By default, the language is 'javascript'.
![image](/assets/images/online-judge/9022/javascript.png)
Select another language, 'java'.
![image](/assets/images/online-judge/9022/java.png)
Or 'python'.
![image](/assets/images/online-judge/9022/python.png)

## 4. Reference
* [Microsoft Monaco Editor](https://microsoft.github.io/monaco-editor/)
* [Monao Editor on GitHub](https://github.com/Microsoft/monaco-editor)
* [Monaco Editor for Angular](https://github.com/atularen/ngx-monaco-editor)
* [Using shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM)
* [Angular - Component Styles](https://angular.io/guide/component-styles)
