---
layout: tutorial
key: tutorial
title: "Building Online Text Compare Tool with Angular"
index: 8371
subcategory: angular-app
date: 2018-07-28
tags: [Angular, Monaco Editor]
---

> Tutorial for how to build a text compare tool with Angular.

## 1. Text Compare
Text compare tool is very useful when find the different content of two files, or two strings. We will use Angular to build a tool like [diffchecker](https://www.diffchecker.com/) or [text-compare](https://text-compare.com/). The application is based on Angular 5 and we will use [Monaco Editor](https://github.com/Microsoft/monaco-editor) as the diff editor.

## 2. Angular Project
### 2.1 Creating New Project
In terminal, create new angular app named 'text-compare-angular' through Angular-CLI.
```raw
$ ng new text-compare-angular
```
### 2.2 Components
Then, create 4 components.
```raw
$ cd text-compare-angular
$ ng g component header
$ ng g component footer
$ ng g component home
$ ng g component textcompare
```
Add following content to 'header.component.html'. We added two menus for `Home` page and `Text Compare` page. Use 'routerLink' attribute to achieve the navigation purpose.
{% raw %}
```raw
<nav class="navbar navbar-expand-sm bg-dark navbar-dark">
  <!-- Links -->
  <ul class="navbar-nav">
    <li [ngClass]="{'nav-item': true, 'active': router.url === '/'}">
      <a class="nav-link nav-home" routerLink="/">Home</a>
    </li>
    <li [ngClass]="{'nav-item': true, 'active': router.url === '/textcompare'}">
      <a class="nav-link" routerLink="textcompare">Text Compare</a>
    </li>
  </ul>
</nav>
<br>
```
{% endraw %}
Add following content to 'home.component.html'.
```html
<div class="jumbotron text-center">
  <h1> Angular - Text Compare Tool</h1>
  <p>Built with Angular 5 and Monaco Editor</p>
</div>
```
Add following content to 'footer.component.html'.
```html
<hr/>
<footer class="container-fluid text-center">
  <p>&copy; 2018 jojozhuang.github.io, All rights reserved.</p>
</footer>
```
### 2.3 Routing
Create file named 'app.route.ts', add the following content.
```typescript
import { RouterModule, Routes } from "@angular/router";

// components
import { HomeComponent } from './home/home.component';
import { TextCompareComponent } from './textcompare/textcompare.component';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'textcompare', component: TextCompareComponent },
  // otherwise redirect to home
  {path: '**', redirectTo: ''}
];
```
Edit 'app.module.ts', include the route file and import routes into routeModule.
```typescript
// routes
import { appRoutes } from "./app.route";

...

@NgModule({

  ...

  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],

  ...
})
```
Apply the router by updating ./app/app.component.html with the following content.
```html
<div class="mainpage">
  <app-header></app-header>
  <router-outlet></router-outlet>
  <app-footer></app-footer>
</div>
```
### 2.4 Monaco Editor
Install package `ngx-monaco-editor`, which is [Monaco Editor for Angular](https://github.com/atularen/ngx-monaco-editor).
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
### 2.5 BootStrap CSS
Add bootstrap to the project.
```raw
$ npm install bootstrap --save
```
Open 'angular-cli.json' and insert a new entry into the styles array.
```javascript
  "styles": [
    "../node_modules/bootstrap/dist/css/bootstrap.min.css"
    "styles.css"
],
```

## 3. TextCompare Component
### 3.1 Html
Edit 'textcompare.component.html', add the following content.
{% raw %}
```raw
<div class="container-fluid container-diff">
  <h1>Text Compare</h1>
  <div *ngIf="isCompared" class="row">
    <div class="col-md-12">
      <form class="form-inline" role="form">
        <label for="lang" class="mb-2 mr-sm-2">Language:</label>
        <select id="lang" name="lang" class="form-control mb-2 mr-sm-2" [(ngModel)]="selectedLang" (change)="onChangeLanguage($event.target.value)">
          <option *ngFor="let option of languages" [value]="option">{{option}}</option>
        </select>
        <label for="theme" class="mb-2 mr-sm-2">Theme:</label>
        <select id="theme" name="theme" class="form-control mb-2 mr-sm-2" [(ngModel)]="selectedTheme" (change)="onChangeTheme($event.target.value)">
          <option *ngFor="let option of themes" [value]="option.value">{{option.name}}</option>
        </select>
        <div class="form-check mb-2 mr-sm-2">
          <label class="form-check-label">
            <input class="form-check-input "type="checkbox" (change)="onChangeInline($event.target.checked)"> Inline Diff
          </label>
        </div>
      </form>
    </div>
  </div>
  <div *ngIf="isCompared" class="row">
    <div class="col-md-12 editor">
      <ngx-monaco-diff-editor id="diffeditor" [options]="diffOptions" [originalModel]="originalModel" [modifiedModel]="modifiedModel"></ngx-monaco-diff-editor>
    </div>
  </div>
  <div class="row">
    <div class="col-md-6">
      <div class="input-title">
        <label>Original Text</label>
      </div>
      <ngx-monaco-editor id="editor1" [options]="inputOptions" [(ngModel)]="text1"></ngx-monaco-editor>
    </div>
    <div class="col-md-6">
      <div class="input-title">
        <label>Changed Text</label>
      </div>
      <ngx-monaco-editor id="editor2" [options]="inputOptions" [(ngModel)]="text2"></ngx-monaco-editor>
    </div>
  </div>
  <div class="row">
    <div class="col-md-12" style="text-align:center">
      <button type="button" class="btn btn-primary" (click)="onCompare()">Find Difference</button>
    </div>
  </div>
</div>
<br>
<br>
```
{% endraw %}
The following points need to be noted about the above code.
* Define selector for languages and themes in the first line.
* Define one diff editor in the second line.
* Define two text editors in the third line.
* Define a button to trigger the compare in the forth line.
* The first and the second lines are visible only when compare occurs.

### 3.2 TypeScript
Edit 'textcompare.component.ts', add the following content.
```typescript
import {
  Component,
  ViewEncapsulation,
  Input,
  Output,
  OnInit
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DiffEditorModel } from 'ngx-monaco-editor';

@Component({
  selector: 'textcompare',
  styleUrls: ["./textcompare.component.css"],
  templateUrl: "./textcompare.component.html",
  encapsulation: ViewEncapsulation.None,
})
export class TextCompareComponent implements OnInit {

  text1 = "";
  text2 = "";
  isCompared = false;

  @Output()
  selectedLang = "plaintext";
  @Output()
  selectedTheme = "vs";

  @Input()
  languages = [
    "bat",
    "c",
    "coffeescript",
    "cpp",
    "csharp",
    "csp",
    "css",
    "dockerfile",
    "fsharp",
    "go",
    "handlebars",
    "html",
    "ini",
    "java",
    "javascript",
    "json",
    "less",
    "lua",
    "markdown",
    "msdax",
    "mysql",
    "objective-c",
    "pgsql",
    "php",
    "plaintext",
    "postiats",
    "powershell",
    "pug",
    "python",
    "r",
    "razor",
    "redis",
    "redshift",
    "ruby",
    "rust",
    "sb",
    "scss",
    "sol",
    "sql",
    "st",
    "swift",
    "typescript",
    "vb",
    "xml",
    "yaml"
  ];

  @Input()
  themes = [
    {
      value: "vs",
      name: "Visual Studio"
    },
    {
      value: "vs-dark",
      name: "Visual Studio Dark"
    },
    {
      value: "hc-black",
      name: "High Contrast Dark"
    }
  ];

  // input
  inputOptions = { theme: "vs", language: 'plaintext' };
  // compare, output
  diffOptions = { theme: "vs", language: "plaintext", readOnly: true, renderSideBySide: true };
  originalModel: DiffEditorModel = {
    code: '',
    language: 'plaintext'
  };

  modifiedModel: DiffEditorModel = {
    code: '',
    language: 'plaintext'
  };

  public ngOnInit() {

  }

  onChangeLanguage(language) {
    this.inputOptions = Object.assign({}, this.inputOptions, { language: language });
    this.originalModel = Object.assign({}, this.originalModel, { language: language });
    this.modifiedModel = Object.assign({}, this.modifiedModel, { language: language });
  }
  onChangeTheme(theme) {
    this.inputOptions = Object.assign({}, this.inputOptions, { theme: theme });
    this.diffOptions = Object.assign({}, this.diffOptions, { theme: theme });
  }

  onChangeInline(checked) {
    this.diffOptions = Object.assign({}, this.diffOptions, { renderSideBySide: !checked });
  }

  onCompare() {
    this.originalModel = Object.assign({}, this.originalModel, { code: this.text1 });
    this.modifiedModel = Object.assign({}, this.originalModel, { code: this.text2 });
    this.isCompared = true;
    window.scrollTo(0, 0); // scroll the window to top
  }
}
```
The following points need to be noted about the above code.
* Define arrays for for languages and themes.
* Define options and themes for editors.
* Define two methods to handle the event that language and theme are changed.
* Define a method to handle the inline style change for diff editor.
* Define a method to handle text compare.

### 3.3 Style
Edit 'textcompare.component.css', add the following content.
```css
.container-diff {
  width: 90%;
}
#editor1,
#editor2 {
  height: 500px;
}
#diffeditor {
  height: 500px;
}

.editor-container {
  border: 1px solid #ddd;
}
.input-title {
  text-align: center;
  color: #585858;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 12px;
  border: 1px solid #ccc;
  background-color: #ecebeb;
}
.input-title label {
  margin-top: 6px;
}
```
The following points need to be noted about the above code.
* The default editor height is '200px', which is set because of 'Angular Component Styles'. To change the height of the monaco editors, we have to define IDs for them and set the height to '500px' in style.
* We also add border line to three monaco editors. Otherwise, if the theme is 'vs', it's not possible to see the border.

## 4. Running and Testing
Start this app, serve it in web server.
```raw
$ npm start
```
Open web browser, access ‘http://localhost:4200/’.
![image](/assets/images/frontend/8371/home.png)
Click the 'Text Compare' menu.
![image](/assets/images/frontend/8371/textcompare.png)
Input some text in both the original and modified text boxes, and click 'Find Difference' button.
![image](/assets/images/frontend/8371/plaintext.png)
Check the 'Inline Style' to view the difference in inline mode.
![image](/assets/images/frontend/8371/inline.png)
Input some typescripts and set the language to 'typescript'.
![image](/assets/images/frontend/8371/typescript.png)
Change theme to 'Visual Studio Dark'.
![image](/assets/images/frontend/8371/darktheme.png)

## 5. Source Files
* [Source files of Text Compare on Github](https://github.com/jojozhuang/text-compare-angular)

## 6. Reference
* [A Generic Text Comparison Tool Implementation with LCS Approach](https://dzone.com/articles/generic-text-comparison-tool)
* [Microsoft Monaco Editor](https://microsoft.github.io/monaco-editor/)
* [Monao Editor on GitHub](https://github.com/Microsoft/monaco-editor)
* [Monaco Editor for Angular](https://github.com/atularen/ngx-monaco-editor)
* [Using shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM)
* [Angular - Component Styles](https://angular.io/guide/component-styles)
